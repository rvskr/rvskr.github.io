import React from 'react';
import { Terminal, Languages, Menu, X } from 'lucide-react';

interface HeaderProps {
  t: any;
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
}

const Header: React.FC<HeaderProps> = ({ t, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[#161b22]/80 backdrop-blur-lg p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div  onClick={() => scrollToSection('about')} className="flex items-center gap-2">
          <Terminal className="w-8 h-8" />
          <h1 className="text-xl font-bold">Voskreseiev Portfolio</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t.menu.about}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t.menu.skills}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t.menu.projects}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {t.menu.contact}
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors"
          >
            <Languages className="w-4 h-4" />
            {language.toUpperCase()}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#238636] hover:bg-[#2ea043] transition-colors"
          >
            <Languages className="w-4 h-4" />
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4 p-4 bg-[#1f2937] rounded-lg">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors text-left"
            >
              {t.menu.about}
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-gray-300 hover:text-white transition-colors text-left"
            >
              {t.menu.skills}
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-white transition-colors text-left"
            >
              {t.menu.projects}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors text-left"
            >
              {t.menu.contact}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
