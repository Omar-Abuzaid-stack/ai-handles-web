import { useRef, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';

interface DemoVideoProps {
  videoUrl?: string;
  posterImage?: string;
  title?: string;
  description?: string;
}

const DEMO_VIDEO_DEFAULT = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4';
const END_TIME = 566; // 09:26

export default function DemoVideo({
  videoUrl,
  posterImage,
  title = 'See the AI Handle System in Action',
}: DemoVideoProps) {
  const ref = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const src = videoUrl || DEMO_VIDEO_DEFAULT;

  // Stop at 09:26
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasStarted) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.currentTime >= END_TIME) {
        video.pause();
        setIsPlaying(false);
        video.currentTime = END_TIME;
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [hasStarted]);

  const handlePlay = () => {
    if (videoRef.current) {
      setIsLoading(true);
      videoRef.current.play()
        .then(() => {
          setHasStarted(true);
          setIsPlaying(true);
          setIsLoading(false);
          setHasError(false);
        })
        .catch(() => {
          setHasError(true);
          setIsLoading(false);
        });
    }
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <section id="demo" className="section-padding bg-black">
      <div ref={ref} className="content-max">
        <div className="text-center mb-12 animate-item">
          <p className="label-text text-purple mb-4">System Demonstration</p>
          <h2 className="heading-section">{title}</h2>
        </div>

        <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#070707] border border-white/5 animate-item">
          <video
            ref={videoRef}
            src={src}
            poster={posterImage}
            preload="metadata"
            className="w-full h-full object-cover"
            onPlay={() => { setIsPlaying(true); setIsLoading(false); setHasError(false); }}
            onPause={() => setIsPlaying(false)}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onError={() => { setHasError(true); setIsLoading(false); }}
          />

          {/* Play overlay — only shows before first play */}
          {!hasStarted && !hasError && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/30 transition-colors group"
              aria-label="Play demo video"
            >
              {isLoading ? (
                <Loader2 size={48} className="text-white/80 animate-spin" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                  <Play size={28} className="text-white ml-1" fill="white" />
                </div>
              )}
              <p className="text-sm text-white/60 mt-4 font-body">Play the system demonstration</p>
            </button>
          )}

          {/* Custom controls (shown after play starts) */}
          {hasStarted && !hasError && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
              <div className="flex items-center gap-3">
                <button onClick={isPlaying ? handlePause : handlePlay} className="text-white hover:text-purple transition-colors" aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" />}
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple rounded-full transition-all"
                    style={{ width: `${(currentTime / END_TIME) * 100}%` }}
                  />
                </div>

                <span className="text-[10px] text-white/40 font-mono">{formatTime(currentTime)} / 9:26</span>

                <button onClick={toggleMute} className="text-white/50 hover:text-white transition-colors" aria-label={isMuted ? 'Unmute' : 'Mute'}>
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
            </div>
          )}

          {/* Error state */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070707]">
              <AlertCircle size={36} className="text-white/30 mb-3" />
              <p className="text-sm text-white/50 mb-4">Unable to load the video</p>
              <button onClick={() => { setHasError(false); setHasStarted(false); }} className="btn-secondary text-xs py-2 px-4">
                Try Again
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-white/20 mt-6 animate-item">
          Full system walkthrough · Audio starts on play · 9 minutes 26 seconds
        </p>
      </div>
    </section>
  );
}
