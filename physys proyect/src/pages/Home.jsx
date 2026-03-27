// src/pages/Home.jsx
import React, { useState } from 'react';
import { toast } from 'sonner';
import { enviarFeedbackAPI } from '../services/Fetch';

const Home = ({ onGoToAuth }) => {
  const [feedback, setFeedback] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setEnviando(true);
    try {
      // AQUÍ ESTÁ LA MAGIA: Conectamos con tu Fetch.jsx real
      await enviarFeedbackAPI(feedback);
      toast.success("Feedback enviado a los Arquitectos. ¡Gracias!");
      setFeedback(''); 
    } catch (error) {
      toast.error("Error en la transmisión. Inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 selection:bg-accent selection:text-white font-sans overflow-x-hidden flex flex-col">
      
      {/* --- NAVBAR --- */}
      <nav className="w-full bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center z-50 relative">
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

      {/* --- HERO SECTION --- */}
      <header className="pt-24 pb-16 px-6 text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 mt-10">
          Optimiza tu <span className="text-accent drop-shadow-[0_0_20px_var(--accent-primary)]">Potencial Humano</span>
        </h1>
        <p className="text-lg text-gray-400 mb-12">
          El sistema definitivo para reestructurar tus vectores biológicos, cognitivos y rutinarios. 
          No es motivación, es ingeniería del comportamiento.
        </p>
      </header>

      {/* --- SECCIÓN DE CARDS --- */}
      <section className="px-6 py-12 max-w-7xl mx-auto flex-grow relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-black/40 border border-white/10 rounded-3xl overflow-hidden hover:border-accent/50 transition-colors group">
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
              <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800" alt="La Intención" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
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
              <img src="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=800" alt="La Misión" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
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
              <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" alt="La Visión" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
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

      {/* --- FOOTER --- */}
      <footer className="mt-10 border-t border-white/10 bg-black/80 backdrop-blur-md pt-16 pb-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-2xl font-black text-white mb-4">
              PHY<span className="text-accent">SIS</span>
            </h4>
            <p className="text-gray-400 text-sm mb-8 max-w-sm">
              Conectando la biología humana con la eficiencia sistemática. Únete a la red de optimización.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h4 className="text-lg font-bold text-white mb-2">Transmite tus señales (Feedback)</h4>
            <form onSubmit={handleFeedback} className="flex flex-col gap-3">
              <textarea 
                placeholder="Escribe tu comentario o reporte aquí..." 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-accent resize-none h-24"
                disabled={enviando}
                required
              />
              <button 
                type="submit" 
                disabled={enviando}
                className={`self-end px-6 py-2 rounded-xl text-sm font-bold transition-all ${enviando ? 'bg-gray-600 cursor-not-allowed' : 'bg-white/10 hover:bg-accent text-white cursor-pointer'}`}
              >
                {enviando ? 'Transmitiendo...' : 'Enviar'}
              </button>
            </form>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;