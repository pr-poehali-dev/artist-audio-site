import Icon from "@/components/ui/icon";
import { Section, Track, tracks, albums, photos, posts, ARTIST_IMG, STUDIO_IMG } from "./data";

interface SectionsProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  playerTrack: Track;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
}

const TrackRow = ({
  track, index, playerTrack, isPlaying, playTrack,
}: {
  track: Track; index: number; playerTrack: Track; isPlaying: boolean; playTrack: (t: Track) => void;
}) => (
  <div
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
          <span className="font-mono text-xs text-white/30 group-hover:hidden">{String(index + 1).padStart(2, "0")}</span>
          <Icon name="Play" size={14} className="hidden group-hover:block text-neon-purple mx-auto" />
        </>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-display text-sm font-semibold truncate ${playerTrack.id === track.id ? "text-neon-purple" : "text-white"}`}>
        {track.title}
      </p>
    </div>
  </div>
);

const HomeSection = ({ setActiveSection, playerTrack, isPlaying, playTrack }: Omit<SectionsProps, "activeSection">) => (
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
          <TrackRow key={track.id} track={track} index={i} playerTrack={playerTrack} isPlaying={isPlaying} playTrack={playTrack} />
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
);

const MusicSection = ({ playerTrack, isPlaying, playTrack }: Pick<SectionsProps, "playerTrack" | "isPlaying" | "playTrack">) => (
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
          <TrackRow key={track.id} track={track} index={i} playerTrack={playerTrack} isPlaying={isPlaying} playTrack={playTrack} />
        ))}
      </div>
    </div>
  </div>
);

const GallerySection = () => (
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
);

const BlogSection = () => (
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
);

const Sections = ({ activeSection, setActiveSection, playerTrack, isPlaying, playTrack }: SectionsProps) => (
  <main className="pt-16 pb-28 min-h-screen">
    {activeSection === "home"    && <HomeSection    setActiveSection={setActiveSection} playerTrack={playerTrack} isPlaying={isPlaying} playTrack={playTrack} />}
    {activeSection === "music"   && <MusicSection   playerTrack={playerTrack} isPlaying={isPlaying} playTrack={playTrack} />}
    {activeSection === "gallery" && <GallerySection />}
    {activeSection === "blog"    && <BlogSection />}
  </main>
);

export default Sections;
