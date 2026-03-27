import React from 'react';

const HomeNavbar = ({ onGoToAuth }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl font-black tracking-tighter text-white">
          PHY<span className="text-accent">SIS</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onGoToAuth} 
          className="text-white hover:text-accent font-bold transition-colors cursor-pointer text-sm"
        >
          Iniciar Sesión
        </button>
        <button 
          onClick={onGoToAuth} 
          className="bg-accent text-white px-5 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_var(--accent-primary)] hover:shadow-[0_0_25px_var(--accent-primary)] transition-all cursor-pointer"
        >
          Registrarse
        </button>
      </div>
    </nav>
  );
};

export default HomeNavbar;