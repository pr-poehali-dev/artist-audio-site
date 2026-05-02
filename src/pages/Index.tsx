import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const ARTIST_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/f6b80b0a-4787-4064-9d35-1a1a2e2da7e1.jpg";
const STUDIO_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/4cffebb8-cd39-44dc-b913-d474c9ce4730.jpg";
const CONCERT_IMG = "https://cdn.poehali.dev/projects/9992db9f-301f-43aa-836c-991a69170ed5/files/370ad1c8-0234-4711-9b25-7c83bed2c6fb.jpg";

const tracks = [
  { id: 1, title: "Тёмная материя", album: "VOID EP", duration: "3:47", genre: "Dark Ambient" },
  { id: 2, title: "Ночной горизонт", album: "Singularity", duration: "4:12", genre: "Electronic" },
  { id: 3, title: "Пустота / Свет", album: "VOID EP", duration: "5:03", genre: "Cinematic" },
  { id: 4, title: "Резонанс 440Hz", album: "Singularity", duration: "3:29", genre: "Dark Ambient" },
  { id: 5, title: "Последний сигнал", album: "VOID EP", duration: "6:18", genre: "Electronic" },
  { id: 6, title: "Глубина", album: "Fragments", duration: "4:44", genre: "Experimental" },
];

const albums = [
  { id: 1, title: "VOID EP", year: "2024", tracks: 5, cover: ARTIST_IMG },
  { id: 2, title: "Singularity", year: "2023", tracks: 8, cover: STUDIO_IMG },
  { id: 3, title: "Fragments", year: "2022", tracks: 6, cover: CONCERT_IMG },
];

const photos = [
  { id: 1, src: ARTIST_IMG, label: "Студия, 2024" },
  { id: 2, src: STUDIO_IMG, label: "Запись альбома" },
  { id: 3, src: CONCERT_IMG, label: "Концерт, Москва" },
  { id: 4, src: ARTIST_IMG, label: "За кулисами" },
  { id: 5, src: STUDIO_IMG, label: "Творческий процесс" },
  { id: 6, src: CONCERT_IMG, label: "Фестиваль 2023" },
];

const posts = [
  {
    id: 1,
    date: "28 апреля 2026",
    tag: "Релиз",
    title: "Новый EP «VOID» уже доступен",
    excerpt: "Пять треков, записанных в тишине ночного студийного марафона. Это самый личный материал за всё время.",
  },
  {
    id: 2,
    date: "12 апреля 2026",
    tag: "События",
    title: "Концерт в Москве: итоги",
    excerpt: "Больше тысячи человек, три часа музыки, один момент — когда всё замолкло и осталась только частота.",
  },
  {
    id: 3,
    date: "03 марта 2026",
    tag: "Процесс",
    title: "Как рождается звук: взгляд изнутри",
    excerpt: "Заметки о создании атмосферных текстур, работе с синтезаторами и том, почему тишина — тоже инструмент.",
  },
];

type Section = "home" | "music" | "gallery" | "blog";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [playerTrack, setPlayerTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.3;
        });
      }, 100);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const playTrack = (track: typeof tracks[0]) => {
    if (playerTrack.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayerTrack(track);
      setProgress(0);
      setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    const idx = tracks.findIndex((t) => t.id === playerTrack.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    setPlayerTrack(prev);
    setProgress(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const idx = tracks.findIndex((t) => t.id === playerTrack.id);
    const next = tracks[(idx + 1) % tracks.length];
    setPlayerTrack(next);
    setProgress(0);
    setIsPlaying(true);
  };

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "music", label: "Музыка" },
    { key: "gallery", label: "Галерея" },
    { key: "blog", label: "Блог" },
  ];

  return (
    <div className="min-h-screen bg-background grid-bg relative">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="font-display text-xl font-black tracking-widest text-white glow-text-purple select-none"
          >
            VOID
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`nav-link font-mono text-sm tracking-widest uppercase transition-colors ${
                  activeSection === item.key ? "text-neon-purple active" : "text-white/50 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/40 hover:text-neon-purple transition-colors">
              <Icon name="Instagram" size={18} />
            </button>
            <button className="text-white/40 hover:text-neon-cyan transition-colors">
              <Icon name="Youtube" size={18} />
            </button>
            <button className="text-white/40 hover:text-neon-pink transition-colors">
              <Icon name="Music" size={18} />
            </button>
          </div>

          <button
            className="md:hidden text-white/60 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                  className={`text-left font-mono text-sm tracking-widest uppercase transition-colors ${
                    activeSection === item.key ? "text-neon-purple" : "text-white/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 pb-28 min-h-screen">
        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ARTIST_IMG})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>

              <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-purple opacity-5 blur-[120px] animate-pulse" />
              <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-neon-cyan opacity-5 blur-[100px]" />

              <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs tracking-[0.4em] text-neon-cyan uppercase mb-6 animate-fade-in">
                    — Официальный сайт артиста
                  </p>
                  <h1 className="font-display text-7xl md:text-9xl font-black tracking-tighter text-white mb-4 leading-none animate-fade-in animate-delay-100">
                    VOID
                  </h1>
                  <div className="w-24 h-px bg-neon-purple mb-6 glow-purple animate-fade-in animate-delay-200" />
                  <p className="font-mono text-white/60 text-base leading-relaxed max-w-md mb-10 animate-fade-in animate-delay-300">
                    Тёмная электроника, атмосферные пространства и звуки на грани слышимого. Музыка, которая существует между светом и тьмой.
                  </p>
                  <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-400">
                    <button
                      onClick={() => setActiveSection("music")}
                      className="flex items-center gap-2 px-6 py-3 bg-neon-purple text-black font-display text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors glow-purple"
                    >
                      <Icon name="Play" size={14} />
                      Слушать музыку
                    </button>
                    <button
                      onClick={() => setActiveSection("blog")}
                      className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 font-mono text-xs tracking-widest uppercase hover:border-neon-purple hover:text-neon-purple transition-colors"
                    >
                      <Icon name="Rss" size={14} />
                      Новости
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase mb-2">// последние треки</p>
                  <h2 className="font-display text-3xl font-bold text-white">Свежие релизы</h2>
                </div>
                <button
                  onClick={() => setActiveSection("music")}
                  className="font-mono text-xs text-white/40 hover:text-neon-purple transition-colors tracking-widest uppercase flex items-center gap-2"
                >
                  Все треки <Icon name="ArrowRight" size={14} />
                </button>
              </div>

              <div className="space-y-2">
                {tracks.slice(0, 4).map((track, i) => (
                  <div
                    key={track.id}
                    className={`track-hover flex items-center gap-4 p-4 border rounded cursor-pointer group ${
                      playerTrack.id === track.id && isPlaying
                        ? "border-neon-purple/40 bg-neon-purple/5"
                        : "border-border/30 bg-card/30"
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="w-8 text-center flex-shrink-0">
                      {playerTrack.id === track.id && isPlaying ? (
                        <div className="flex items-end justify-center gap-0.5 h-5">
                          {[1, 2, 3].map((b) => (
                            <div key={b} className="w-1 bg-neon-purple rounded-sm animate-bar-dance" style={{ animationDelay: `${b * 0.15}s` }} />
                          ))}
                        </div>
                      ) : (
                        <>
                          <span className="font-mono text-xs text-white/30 group-hover:hidden">{String(i + 1).padStart(2, "0")}</span>
                          <Icon name="Play" size={14} className="hidden group-hover:block text-neon-purple mx-auto" />
                        </>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-display text-sm font-semibold truncate ${playerTrack.id === track.id ? "text-neon-purple" : "text-white"}`}>
                        {track.title}
                      </p>
                      <p className="font-mono text-xs text-white/40 mt-0.5">{track.album}</p>
                    </div>
                    <span className="hidden sm:block font-mono text-xs px-2 py-1 border border-border/50 text-white/30 rounded">
                      {track.genre}
                    </span>
                    <span className="font-mono text-xs text-white/30 flex-shrink-0">{track.duration}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-10 pb-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase mb-4">// об артисте</p>
                  <h2 className="font-display text-4xl font-bold text-white mb-6 leading-tight">
                    Между частотой<br />и тишиной
                  </h2>
                  <p className="font-mono text-white/50 text-sm leading-relaxed mb-4">
                    VOID — проект на стыке тёмной электроники, экспериментального звукодизайна и кинематографических текстур. За несколько лет выпущено три EP и множество синглов, собравших тысячи слушателей по всему миру.
                  </p>
                  <p className="font-mono text-white/50 text-sm leading-relaxed">
                    Каждый трек — это путешествие в пространство, где нет чётких границ между жанрами, только ощущение и атмосфера.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-neon-purple/5 blur-2xl rounded-full" />
                  <img
                    src={STUDIO_IMG}
                    alt="Студия"
                    className="relative rounded border border-border/30 w-full aspect-video object-cover glow-purple"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur border border-border/50 rounded p-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                    <span className="font-mono text-xs text-white/60">В работе над новым альбомом</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* MUSIC */}
        {activeSection === "music" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3">// дискография</p>
              <h1 className="font-display text-5xl font-black text-white">Музыка</h1>
            </div>

            <div className="mb-16">
              <h2 className="font-display text-lg font-semibold text-white/60 tracking-widest uppercase mb-6">Альбомы & EP</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <div key={album.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded border border-border/30 aspect-square mb-4">
                      <img
                        src={album.cover}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                        <div>
                          <p className="font-display text-white font-bold">{album.title}</p>
                          <p className="font-mono text-white/60 text-xs">{album.tracks} треков</p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-neon-purple flex items-center justify-center glow-purple">
                          <Icon name="Play" size={16} className="text-black ml-0.5" />
                        </button>
                      </div>
                    </div>
                    <p className="font-display text-sm font-bold text-white">{album.title}</p>
                    <p className="font-mono text-xs text-white/40">{album.year} · {album.tracks} треков</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-semibold text-white/60 tracking-widest uppercase mb-6">Все треки</h2>
              <div className="space-y-2">
                {tracks.map((track, i) => (
                  <div
                    key={track.id}
                    className={`track-hover flex items-center gap-4 p-4 border rounded cursor-pointer group ${
                      playerTrack.id === track.id && isPlaying
                        ? "border-neon-purple/40 bg-neon-purple/5"
                        : "border-border/30 bg-card/30"
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="w-8 text-center flex-shrink-0">
                      {playerTrack.id === track.id && isPlaying ? (
                        <div className="flex items-end justify-center gap-0.5 h-5">
                          {[1, 2, 3].map((b) => (
                            <div key={b} className="w-1 bg-neon-purple rounded-sm animate-bar-dance" style={{ animationDelay: `${b * 0.15}s` }} />
                          ))}
                        </div>
                      ) : (
                        <>
                          <span className="font-mono text-xs text-white/30 group-hover:hidden">{String(i + 1).padStart(2, "0")}</span>
                          <Icon name="Play" size={14} className="hidden group-hover:block text-neon-purple mx-auto" />
                        </>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-display text-sm font-semibold truncate ${playerTrack.id === track.id ? "text-neon-purple" : "text-white"}`}>
                        {track.title}
                      </p>
                      <p className="font-mono text-xs text-white/40 mt-0.5">{track.album}</p>
                    </div>
                    <span className="hidden sm:block font-mono text-xs px-2 py-1 border border-border/50 text-white/30 rounded">
                      {track.genre}
                    </span>
                    <span className="font-mono text-xs text-white/30 flex-shrink-0">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* GALLERY */}
        {activeSection === "gallery" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3">// фотографии</p>
              <h1 className="font-display text-5xl font-black text-white">Галерея</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.map((photo, i) => (
                <div
                  key={photo.id}
                  className={`group relative overflow-hidden rounded border border-border/30 cursor-pointer ${
                    i === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      i === 0 ? "aspect-video sm:h-full sm:min-h-[400px]" : "aspect-video"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-mono text-white text-xs tracking-widest">{photo.label}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full border border-white/30 bg-black/40 backdrop-blur flex items-center justify-center">
                      <Icon name="ZoomIn" size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {activeSection === "blog" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-neon-cyan uppercase mb-3">// новости</p>
              <h1 className="font-display text-5xl font-black text-white">Блог</h1>
            </div>

            <div className="grid gap-6 max-w-3xl">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group border border-border/30 bg-card/30 rounded p-6 hover:border-neon-purple/30 hover:bg-neon-purple/5 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs px-2 py-1 border border-neon-purple/40 text-neon-purple rounded tracking-widest">
                      {post.tag}
                    </span>
                    <span className="font-mono text-xs text-white/30">{post.date}</span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-neon-purple transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-mono text-sm text-white/50 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-neon-purple/60 group-hover:text-neon-purple transition-colors">
                    <span className="font-mono text-xs tracking-widest">Читать далее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Fixed Player */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/95 backdrop-blur-xl">
        <div
          className="h-0.5 bg-border/30 cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(pct);
          }}
        >
          <div
            className="h-full bg-neon-purple transition-all duration-100 group-hover:bg-neon-cyan relative"
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
              <p className="font-mono text-xs text-white/40 truncate">{playerTrack.album}</p>
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
    </div>
  );
};

export default Index;
