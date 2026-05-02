import Icon from "@/components/ui/icon";
import { Section } from "./data";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

const navItems: { key: Section; label: string }[] = [
  { key: "home",    label: "Главная" },
  { key: "music",   label: "Музыка" },
  { key: "gallery", label: "Галерея" },
  { key: "blog",    label: "Блог" },
];

const Navbar = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) => {
  return (
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
  );
};

export default Navbar;
