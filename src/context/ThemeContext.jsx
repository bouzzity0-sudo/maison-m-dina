import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [cursorVariant, setCursorVariant] = useState('default');
    const [cursorText, setCursorText] = useState('');

    // Fonction pour changer l'état du curseur
    const setCursor = (variant, text = '') => {
        setCursorVariant(variant);
        setCursorText(text);
    };

    const value = {
        cursorVariant,
        cursorText,
        setCursor,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
