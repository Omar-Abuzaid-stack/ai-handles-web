import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  action?: { type: string; target: string } | null;
}

const DAILY_LIMIT = 30;
const RATE_LIMIT_KEY = 'aihandle_chat_rate';
const MESSAGES_KEY = 'aihandle_chat_history';

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function getChatCount(): number {
  try {
    const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
    return data[getTodayKey()] || 0;
  } catch {
    return 0;
  }
}

function incrementChatCount(): number {
  const count = getChatCount() + 1;
  try {
    const data = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '{}');
    data[getTodayKey()] = count;
    const keys = Object.keys(data);
    if (keys.length > 7) {
      const sorted = keys.sort();
      sorted.slice(0, sorted.length - 7).forEach(k => delete data[k]);
    }
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
  return count;
}

function loadHistory(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    const messages: ChatMessage[] = JSON.parse(raw);
    const today = getTodayKey();
    return messages.filter(m => new Date(m.timestamp).toISOString().split('T')[0] === today);
  } catch {
    return [];
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  } catch { /* ignore */ }
}

const NAVIGATION_MAP: Record<string, string> = {
  'services': '#services',
  'agents': '#agents',
  'ai-agents': '#agents',
  'workforce': '#agents',
  'industries': '#industries',
  'work': '#work',
  'projects': '#work',
  'team': '#founder',
  'founder': '#founder',
  'contact': '#contact',
  'demo': '#demo',
  'video': '#demo',
  'safety': '#safety',
};

/** Safe markdown renderer — no dangerouslySetInnerHTML */
function ChatMessageContent({ content }: { content: string }) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className="whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        const lines = part.split(/\u2022/g);
        return lines.map((line, j) => {
          if (j > 0) {
            return <span key={`${i}-${j}`}><span className="text-[#C9A96E]">{'\u2022'}</span> {line}</span>;
          }
          return <span key={`${i}-${j}`}>{line}</span>;
        });
      })}
    </span>
  );
}

function parseActionFromResponse(content: string): { text: string; action: ChatMessage['action'] } {
  const jsonMatch = content.match(/\{"action":\s*"navigate",\s*"target":\s*"([^"]+)"[^}]*\}/);
  if (jsonMatch) {
    const target = jsonMatch[1];
    const cleanedText = content.replace(/\n?\n?\{"action":\s*"navigate"[^}]+\}/, '').trim();
    return { text: cleanedText, action: { type: 'navigate', target } };
  }
  return { text: content, action: null };
}

function executeAction(action: ChatMessage['action']) {
  if (!action || action.type !== 'navigate') return;
  const selector = NAVIGATION_MAP[action.target] || `#${action.target}`;
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitMessage, setRateLimitMessage] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const history = loadHistory();
    if (history.length > 0) {
      setMessages(history);
      setHasGreeted(true);
    }
    const count = getChatCount();
    if (count >= DAILY_LIMIT) {
      setIsRateLimited(true);
      setRateLimitMessage('Too Much Chats Done Today, Come Again Later');
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const greetUser = useCallback(() => {
    if (hasGreeted) return;
    setHasGreeted(true);
    setMessages([{
      id: `msg-greeting-${Date.now()}`,
      role: 'assistant',
      content: `Welcome to AI Handle. 👋\n\nI'm your AI assistant, ready to help you understand how our coordinated AI workforce can transform your business.\n\nHere's what I can help with:\n• **Services** — AI agents, automations, websites, growth systems\n• **Industries** — Real estate, clinics, B2B, agencies, and more\n• **The AI Team** — Meet our 12 specialised AI agents\n• **How It Works** — Our 9-step implementation process\n• **Getting Started** — Book a discovery session\n\nWhat would you like to know?`,
      timestamp: Date.now(),
      action: null,
    }]);
  }, [hasGreeted]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    if (!hasGreeted) greetUser();
  }, [hasGreeted, greetUser]);

  /** Core send logic — shared by input and quick actions */
  const sendText = useCallback(async (text: string, historyContext: ChatMessage[]) => {
    // isLoading guard checked at call sites (sendMessage + quick actions)
    if (isRateLimited) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const newCount = incrementChatCount();
    if (newCount >= DAILY_LIMIT) {
      setIsRateLimited(true);
      setRateLimitMessage('Too Much Chats Done Today, Come Again Later');
    }

    try {
      const apiMessages = [...historyContext, userMessage]
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .slice(-10)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (response.status === 429) {
        setIsRateLimited(true);
        setRateLimitMessage('Too Much Chats Done Today, Come Again Later');
        setMessages(prev => [...prev, {
          id: `msg-system-${Date.now()}`,
          role: 'assistant',
          content: 'Too Much Chats Done Today, Come Again Later',
          timestamp: Date.now(),
        }]);
        return;
      }

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          id: `msg-error-${Date.now()}`,
          role: 'assistant',
          content: data.message || 'Sorry, something went wrong. Please try again.',
          timestamp: Date.now(),
        }]);
        return;
      }

      const { text: responseText, action } = parseActionFromResponse(data.content);
      setMessages(prev => [...prev, {
        id: `msg-assistant-${Date.now()}`,
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
        action,
      }]);

      if (action) setTimeout(() => executeAction(action), 500);
    } catch {
      setMessages(prev => [...prev, {
        id: `msg-error-${Date.now()}`,
        role: 'assistant',
        content: 'Connection error. Please check your internet and try again.',
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [isRateLimited]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isLoading) return;
    sendText(text, messages);
  }, [input, isLoading, messages, sendText]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: 'Services', text: 'What services does AI Handle offer?' },
    { label: 'AI Agents', text: 'Tell me about the AI agents' },
    { label: 'Industries', text: 'What industries do you work with?' },
    { label: 'Get Started', text: 'How do I get started with AI Handle?' },
  ];

  return (
    <>
      {/* Chat FAB */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#A8884E] text-[#0A0A0A] shadow-[0_4px_30px_rgba(201,169,110,0.3)] hover:shadow-[0_4px_40px_rgba(201,169,110,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open AI chat assistant"
        >
          <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute inset-0 rounded-full border-2 border-[#C9A96E]/40 animate-ping opacity-30" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_60px_rgba(0,0,0,0.6)] animate-chat-in"
          style={{
            background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.99) 100%)',
            backdropFilter: 'blur(40px)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 bg-[#141414]/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#A8884E] flex items-center justify-center shadow-[0_0_20px_rgba(201,169,110,0.2)]">
                <Bot size={18} className="text-[#0A0A0A]" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-sm text-[#F5F0EB]">AI Handle</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                  <span className="font-body text-[10px] text-[#5A5550]">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5A5550] hover:text-[#F5F0EB] hover:bg-white/5 transition-all"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,169,110,0.2) transparent' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-msg-in`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={12} className="text-[#C9A96E]" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-body ${
                    msg.role === 'user'
                      ? 'bg-[#C9A96E] text-[#0A0A0A] rounded-br-md'
                      : 'bg-white/5 text-[#F5F0EB] border border-white/5 rounded-bl-md'
                  }`}
                >
                  <ChatMessageContent content={msg.content} />
                  {msg.action?.type === 'navigate' && (
                    <button
                      onClick={() => executeAction(msg.action)}
                      className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[#C9A96E] hover:text-[#F5F0EB] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      Take me there →
                    </button>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={12} className="text-white/60" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start animate-msg-in">
                <div className="w-7 h-7 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={12} className="text-[#C9A96E]" />
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 size={14} className="text-[#C9A96E] animate-spin" />
                    <span className="text-xs text-[#5A5550] font-body animate-pulse">Thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && !isRateLimited && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map((qa) => (
                <button
                  key={qa.label}
                  onClick={() => sendText(qa.text, messages)}
                  disabled={isLoading}
                  className="text-[11px] font-body px-2.5 py-1.5 rounded-full border border-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/10 transition-colors disabled:opacity-40"
                >
                  {qa.label}
                </button>
              ))}
            </div>
          )}

          {/* Rate limit banner */}
          {isRateLimited && (
            <div className="px-4 py-3 bg-[#C9A96E]/10 border-t border-[#C9A96E]/20">
              <p className="text-xs font-body text-[#C9A96E] text-center font-medium">
                {rateLimitMessage}
              </p>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/8 bg-[#111111]/80">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRateLimited ? 'Come back tomorrow...' : 'Ask about AI Handle...'}
                disabled={isLoading || isRateLimited}
                className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm font-body text-[#F5F0EB] placeholder:text-[#3A3A3A] focus:border-[#C9A96E]/40 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading || isRateLimited}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A96E] to-[#A8884E] text-[#0A0A0A] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            <p className="text-[9px] text-[#3A3A3A] font-body text-center mt-2">
              AI Handle Assistant · Powered by Mistral AI
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-chat-in { animation: chatIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-msg-in { animation: msgIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </>
  );
}
