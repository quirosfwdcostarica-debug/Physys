import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import HomeFooter from '../components/HomeFooter';

const Home = ({ onGoToAuth }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-accent selection:text-white font-sans overflow-x-hidden">
      
      {/* Pasamos la función al componente de navegación */}
      <HomeNavbar onGoToAuth={onGoToAuth} />

      {/* --- HERO SECTION --- */}
      <header className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 mt-10">
          Optimiza tu <span className="text-accent drop-shadow-[0_0_20px_var(--accent-primary)]">Potencial Humano</span>
        </h1>
        <p className="text-lg text-gray-400 mb-12">
          El sistema definitivo para reestructurar tus vectores biológicos, cognitivos y rutinarios. 
          No es motivación, es ingeniería del comportamiento.
        </p>
      </header>

      {/* --- SECCIÓN DE CARDS --- */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-colors group">
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800" alt="El Inicio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              <h3 className="absolute bottom-4 left-6 z-20 text-2xl font-black text-white tracking-wide">La Intención</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                El cambio es la única constante biológica. Dar el primer paso siempre genera vértigo, pero hay algo muchísimo más atemorizante: <span className="text-accent font-bold">la parálisis del status quo</span>. Quedarse inmóvil mientras el tiempo avanza es el verdadero riesgo. Hoy decides evolucionar.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-colors group">
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=800" alt="El Camino" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              <h3 className="absolute bottom-4 left-6 z-20 text-2xl font-black text-white tracking-wide">La Misión</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Confiar tu proceso a Physis es embarcarte en un recorrido retador y disfrutable. No solo reestructurarás el área elegida; este camino forjará en ti una <span className="font-bold text-white">resiliencia inquebrantable</span>, una disciplina implacable y una claridad que trascenderá.
              </p>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-colors group">
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="La Trascendencia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
              <h3 className="absolute bottom-4 left-6 z-20 text-2xl font-black text-white tracking-wide">La Visión</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                Culminar el Protocolo Physis no es el final, sino el verdadero comienzo. Has tomado una decisión valiente. Ahora, esa energía de transformación se propagará como una red neuronal, <span className="text-accent font-bold">impactando tu entorno y tu realidad para siempre.</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default Home;