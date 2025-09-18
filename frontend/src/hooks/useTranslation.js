import { useState, useEffect, createContext, useContext } from 'react';
import { zh } from '../locales/zh';
import { en } from '../locales/en';

// 语言配置
const languages = {
  zh: { name: '中文', flag: '🇨🇳', data: zh },
  en: { name: 'English', flag: '🇺🇸', data: en }
};

// 创建语言上下文
const LanguageContext = createContext();

// 语言提供者组件
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // 从localStorage获取保存的语言设置，默认为中文
    const saved = localStorage.getItem('preferred-language');
    return saved && languages[saved] ? saved : 'zh';
  });

  const [t, setT] = useState(languages[currentLanguage].data);

  // 切换语言
  const changeLanguage = (lang) => {
    if (languages[lang]) {
      console.log('Changing language to:', lang);
      setCurrentLanguage(lang);
      setT(languages[lang].data);
      localStorage.setItem('preferred-language', lang);
    }
  };

  // 获取当前语言信息
  const getCurrentLanguageInfo = () => {
    return {
      code: currentLanguage,
      name: languages[currentLanguage].name,
      flag: languages[currentLanguage].flag
    };
  };

  // 获取所有可用语言
  const getAvailableLanguages = () => {
    return Object.keys(languages).map(code => ({
      code,
      name: languages[code].name,
      flag: languages[code].flag
    }));
  };

  const value = {
    t,
    currentLanguage,
    changeLanguage,
    getCurrentLanguageInfo,
    getAvailableLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// 使用语言的Hook
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

// 语言切换组件
export const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage, getAvailableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const availableLanguages = getAvailableLanguages();

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="language-switcher">
      <button 
        className="language-switcher-button"
        onClick={() => setIsOpen(!isOpen)}
        title="切换语言 / Switch Language"
      >
        <span className="language-flag">
          {availableLanguages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
        <span className="language-name">
          {availableLanguages.find(lang => lang.code === currentLanguage)?.name}
        </span>
        <span className="language-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map(lang => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === currentLanguage ? 'active' : ''}`}
              onClick={() => {
                console.log('Changing language to:', lang.code);
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
