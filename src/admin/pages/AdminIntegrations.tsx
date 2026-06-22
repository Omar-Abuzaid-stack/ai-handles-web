import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, Send, RefreshCw } from 'lucide-react';

interface IntegrationStatus {
  name: string;
  label: string;
  configured: boolean;
  message: string;
}

export default function AdminIntegrations() {
  const [statuses, setStatuses] = useState<IntegrationStatus[]>([
    { name: 'supabase', label: 'Supabase', configured: false, message: 'Checking...' },
    { name: 'mistral', label: 'Mistral AI', configured: false, message: 'Checking...' },
    { name: 'telegram', label: 'Telegram Bot', configured: false, message: 'Checking...' },
    { name: 'telegram_notify', label: 'Telegram Notifications', configured: false, message: 'Checking...' },
    { name: 'jarvis', label: 'Jarvis Sync', configured: false, message: 'Checking...' },
  ]);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    checkStatuses();
  }, []);

  const checkStatuses = async () => {
    // Check Supabase
    try {
      const mod = await import('../../lib/supabase');
      const sb = mod.supabase;
      if (!sb) { updateStatus('supabase', false, 'Supabase client is null'); return; }
      const { error } = await sb.from('site_settings').select('id').limit(1);
      updateStatus('supabase', !error, error ? error.message : 'Connected');
    } catch (e: any) {
      updateStatus('supabase', false, e.message || 'Connection failed');
    }

    // Check Mistral (via the chat API)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: 'ping' }] }),
      });
      if (response.status === 500) {
        const data = await response.json();
        updateStatus('mistral', data.error !== 'API key not configured', data.error === 'API key not configured' ? 'Not configured' : 'Ready');
      } else {
        updateStatus('mistral', true, 'API responding');
      }
    } catch {
      updateStatus('mistral', false, 'Cannot reach API endpoint');
    }

    // Check Telegram status via the Telegram notify API
    updateStatus('telegram', false, 'Check via server (not available client-side)');
    updateStatus('telegram_notify', false, 'Check via server (not available client-side)');

    // Check Jarvis via the Jarvis sync API
    try {
      const response = await fetch('/api/jarvis-sync');
      if (response.ok) {
        updateStatus('jarvis', true, 'Endpoint responding');
      } else {
        updateStatus('jarvis', false, 'Endpoint unreachable');
      }
    } catch {
      updateStatus('jarvis', false, 'Cannot reach API');
    }
  };

  const updateStatus = (name: string, configured: boolean, message: string) => {
    setStatuses((prev) =>
      prev.map((s) => (s.name === name ? { ...s, configured, message } : s))
    );
  };

  const sendTestNotification = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/telegram-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'operational_alert',
          data: {
            type: 'Test Notification',
            source: 'Admin Panel',
            detail: 'This is a test message from AI Handle admin.',
          },
        }),
      });
      const data = await response.json();
      setTestResult(data.sent ? 'Test notification sent successfully!' : 'Failed: ' + (data.error || 'Unknown error'));
    } catch (e: any) {
      setTestResult('Error: ' + e.message);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono text-[#F5F0EB]">Integrations</h1>
          <p className="text-sm text-white/50 mt-1">Connected services and their status</p>
        </div>
        <button
          onClick={checkStatuses}
          className="btn-secondary text-xs py-2 px-4"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {statuses.map((status) => (
          <div
            key={status.name}
            className="bg-[#111111] border border-white/5 rounded-lg p-5 flex items-start gap-4"
          >
            <div className="mt-0.5">
              {status.message === 'Checking...' ? (
                <Loader2 size={18} className="text-white/30 animate-spin" />
              ) : status.configured ? (
                <CheckCircle size={18} className="text-green-500" />
              ) : (
                <XCircle size={18} className="text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-white text-sm">{status.label}</h3>
              <p className={`text-xs mt-1 ${status.configured ? 'text-green-400/70' : 'text-red-400/70'}`}>
                {status.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Test Telegram */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-mono text-white mb-2">Test Telegram Notifications</h2>
        <p className="text-sm text-white/40 mb-4">
          Send a test notification to verify the Telegram integration is working.
        </p>
        <button
          onClick={sendTestNotification}
          disabled={testing}
          className="btn-primary text-xs py-2 px-4"
        >
          {testing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
          {testing ? ' Sending...' : ' Send Test Notification'}
        </button>
        {testResult && (
          <p className={`text-sm mt-3 ${testResult.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
            {testResult}
          </p>
        )}
      </div>

      {/* Telegram Webhook Setup */}
      <div className="bg-[#111111] border border-white/5 rounded-lg p-6">
        <h2 className="text-lg font-mono text-white mb-2">Telegram Webhook Setup</h2>
        <p className="text-sm text-white/40 mb-4">
          To set up the Telegram bot webhook, run this command (replace TOKEN and URL):
        </p>
        <div className="bg-black border border-white/10 rounded-lg p-4 mb-4">
          <code className="text-xs text-green-400 font-mono break-all">
            curl -X POST "https://api.telegram.org/bot&lt;YOUR_BOT_TOKEN&gt;/setWebhook" \
            -d "url=https://aihandle.cloud/api/telegram-webhook" \
            -d "secret_token=&lt;YOUR_WEBHOOK_SECRET&gt;"
          </code>
        </div>
        <p className="text-xs text-white/30">
          The webhook secret must match the TELEGRAM_WEBHOOK_SECRET environment variable.
        </p>
      </div>
    </div>
  );
}
