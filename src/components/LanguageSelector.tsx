import { useState } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en' as Language, name: 'English', flag: 'https://img.icons8.com/color/48/usa-circular.png' },
  { code: 'ru' as Language, name: 'Русский', flag: 'https://img.icons8.com/color/48/russian-federation-circular.png' },
  { code: 'uz' as Language, name: "O'zbek", flag: 'https://img.icons8.com/color/48/uzbekistan-circular.png' },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border hover:bg-secondary transition-colors"
      >
        <img src={currentLang.flag} alt={currentLang.name} className="w-5 h-5 rounded-full" />
        <span className="text-sm font-medium text-foreground hidden sm:inline">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-40 rounded-lg bg-card border border-border shadow-lg z-50 overflow-hidden animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-secondary transition-colors ${
                  language === lang.code ? 'bg-accent/10 text-accent' : 'text-foreground'
                }`}
              >
                <img src={lang.flag} alt={lang.name} className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
