import { RefObject } from "react";
import Icon from "@/components/ui/icon";
import { Track } from "./data";

interface AudioPlayerProps {
  playerTrack: Track;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  audioRef: RefObject<HTMLAudioElement | null>;
  togglePlay: () => void;
  prevTrack: () => void;
  nextTrack: () => void;
  setVolume: (v: number) => void;
}

const formatTime = (s: number) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({
  playerTrack, isPlaying, progress, currentTime, duration,
  volume, audioRef, togglePlay, prevTrack, nextTrack, setVolume,
}: AudioPlayerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl">
      <div
        className="h-1 bg-border/30 cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = (e.clientX - rect.left) / rect.width;
          if (audioRef.current && audioRef.current.duration) {
            audioRef.current.currentTime = pct * audioRef.current.duration;
          }
        }}
      >
        <div
          className="h-full bg-neon-purple group-hover:bg-neon-cyan transition-colors"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className={`w-10 h-10 rounded border flex-shrink-0 flex items-center justify-center ${isPlaying ? "border-neon-purple/50 bg-neon-purple/10 glow-purple" : "border-border/50 bg-muted"}`}>
            <Icon name="Music2" size={16} className={isPlaying ? "text-neon-purple" : "text-white/30"} />
          </div>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-white truncate">{playerTrack.title}</p>
            <p className="font-mono text-xs text-white/40">{formatTime(currentTime)} / {formatTime(duration)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button onClick={prevTrack} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <Icon name="SkipBack" size={18} />
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-neon-purple hover:bg-white transition-colors glow-purple"
          >
            <Icon name={isPlaying ? "Pause" : "Play"} size={18} className="text-black" />
          </button>
          <button onClick={nextTrack} className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <Icon name="SkipForward" size={18} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <Icon name={volume === 0 ? "VolumeX" : volume < 50 ? "Volume1" : "Volume2"} size={16} className="text-white/30 flex-shrink-0" />
          <div
            className="relative w-24 h-1 bg-border/40 rounded cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setVolume(Math.max(0, Math.min(100, pct)));
            }}
          >
            <div className="h-full bg-white/40 rounded" style={{ width: `${volume}%` }} />
          </div>
          <span className="font-mono text-xs text-white/20 w-8">{volume}%</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
