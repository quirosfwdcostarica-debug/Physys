import React, { useState, useEffect } from 'react';
// ¡Importamos los estilos separados!
import '../styles/Navbar.css';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [activeTheme, setActiveTheme] = useState('Orgánico');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [glassOpacity, setGlassOpacity] = useState(40);
  
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const themes = ['Orgánico', 'Sintético', 'Neuronal', 'Bioluminiscente', 'Cuántico'];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); setShowThemeMenu(false); setShowSettings(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // 1. INYECTAR EL TEMA GLOBAL EN TODA LA PÁGINA
  useEffect(() => {
    document.body.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // 2. INYECTAR EL MODO OSCURO GLOBAL
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // 3. ACTUALIZAR LA OPACIDAD GLOBAL (CSS Variable)
  useEffect(() => {
    document.documentElement.style.setProperty('--glass-opacity', glassOpacity / 100);
  }, [glassOpacity]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 flex h-20 items-center justify-between px-8 transition-transform duration-300 ease-in-out navbar-glass ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tighter cursor-pointer">
          PHY<span className="text-accent">SIS</span>
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button onClick={() => { setShowThemeMenu(!showThemeMenu); setShowSettings(false); }} className="rounded-full px-4 py-2 text-sm font-medium transition-colors shadow-sm cursor-pointer btn-icon">
            Tema: {activeTheme}
          </button>
          
          {showThemeMenu && (
            <div className="absolute top-12 left-0 w-40 rounded-xl overflow-hidden backdrop-blur-md dropdown-menu">
              {themes.map(theme => (
                <button key={theme} onClick={() => { setActiveTheme(theme); setShowThemeMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover-bg-accent transition-colors">
                  {theme}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex h-10 w-10 items-center justify-center rounded-full transition-colors shadow-sm cursor-pointer btn-icon">
          {isDarkMode ? '🌞' : '🌙'}
        </button>

        <div className="relative">
          <button onClick={() => { setShowSettings(!showSettings); setShowThemeMenu(false); }} className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm cursor-pointer bg-accent">
            ⚙️
          </button>
          
          {showSettings && (
            <div className="absolute top-12 right-0 w-48 p-4 rounded-xl backdrop-blur-md dropdown-menu">
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider text-accent">Opacidad Glass</p>
              <input type="range" min="0" max="100" value={glassOpacity} onChange={(e) => setGlassOpacity(e.target.value)} className="w-full" />
              <p className="text-xs text-right mt-1 opacity-70">{glassOpacity}%</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;