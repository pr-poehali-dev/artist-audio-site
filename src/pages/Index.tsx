import { useState, useRef, useEffect } from "react";
import { tracks, Section, Track } from "@/components/music/data";
import Navbar from "@/components/music/Navbar";
import Sections from "@/components/music/Sections";
import AudioPlayer from "@/components/music/AudioPlayer";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [playerTrack, setPlayerTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.ontimeupdate = () => {
        const a = audioRef.current!;
        setCurrentTime(a.currentTime);
        setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
      };
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current!.duration);
      };
      audioRef.current.onended = () => {
        const idx = tracks.findIndex((t) => t.id === playerTrack.id);
        const next = tracks[(idx + 1) % tracks.length];
        setPlayerTrack(next);
        setProgress(0);
        setCurrentTime(0);
      };
    }
    return () => { audioRef.current?.pause(); };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playerTrack.src;
    audio.load();
    if (isPlaying) audio.play();
  }, [playerTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.play(); } else { audio.pause(); }
  }, [isPlaying]);

  const playTrack = (track: Track) => {
    if (playerTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayerTrack(track);
      setProgress(0);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const prevTrack = () => {
    const idx = tracks.findIndex((t) => t.id === playerTrack.id);
    setPlayerTrack(tracks[(idx - 1 + tracks.length) % tracks.length]);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const idx = tracks.findIndex((t) => t.id === playerTrack.id);
    setPlayerTrack(tracks[(idx + 1) % tracks.length]);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <Sections
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        playerTrack={playerTrack}
        isPlaying={isPlaying}
        playTrack={playTrack}
      />
      <AudioPlayer
        playerTrack={playerTrack}
        isPlaying={isPlaying}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        audioRef={audioRef}
        togglePlay={togglePlay}
        prevTrack={prevTrack}
        nextTrack={nextTrack}
        setVolume={setVolume}
      />
    </div>
  );
};

export default Index;
