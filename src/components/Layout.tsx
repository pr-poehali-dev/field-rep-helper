import { useState } from "react";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "chemistry", label: "Бытовая химия" },
    { id: "food", label: "Продукты питания" },
    { id: "price", label: "Прайс-лист" },
    { id: "about", label: "О компании" },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="border-b border-orange-100 sticky top-0 bg-white z-50 shadow-sm shadow-orange-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => handleNav("home")}
            className="text-sm font-bold tracking-widest uppercase text-orange-500 hover:text-orange-400 transition-colors"
          >
            ИП Гаврилова Долосков
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`text-sm transition-colors ${
                  currentPage === item.id
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400 hover:text-orange-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-orange-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-6 py-4 text-sm border-b border-orange-50 transition-colors ${
                  currentPage === item.id
                    ? "text-orange-500 font-semibold bg-orange-50"
                    : "text-gray-500 hover:text-orange-500 hover:bg-orange-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-orange-100 mt-20 bg-orange-50">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-orange-400 tracking-widest uppercase font-semibold">ИП Гаврилова Долосков</span>
          <span className="text-xs text-gray-400">© 2026</span>
        </div>
      </footer>
    </div>
  );
}