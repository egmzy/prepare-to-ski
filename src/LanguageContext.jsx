import { createContext, useContext, useState, useEffect } from 'react';
import translations from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        // Check localStorage for saved preference
        const saved = localStorage.getItem('ski-prep-language');
        return saved || 'en';
    });

    useEffect(() => {
        // Save language preference
        localStorage.setItem('ski-prep-language', language);

        // Set document direction
        document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = translations[language];
    const isRTL = language === 'he';

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
