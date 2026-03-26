// src/components/FocusTimer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

// Diccionario de Sonidos Ambientales (URLs directas para pruebas)
const AMBIENT_SOUNDS = {
  none: { name: '🔇 Silencio', url: '' },
  lluvia: { name: '🌧️ Lluvia Zen', url: 'https://assets.mixkit.co/active_storage/sfx/2505/2505-preview.mp3' },
  bosque: { name: '🌲 Bosque Profundo', url: 'https://assets.mixkit.co/active_storage/sfx/2501/2501-preview.mp3' },
  ruido: { name: '📻 Ruido Blanco', url: 'https://assets.mixkit.co/active_storage/sfx/2561/2561-preview.mp3' }
};

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [ambient, setAmbient] = useState('none'); // Estado del sonido elegido
  
  const audioRef = useRef(new Audio()); // Referencia al reproductor HTML5

  const RADIUS = 85;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  // Efecto para configurar el reproductor
  useEffect(() => {
    audioRef.current.loop = true; // El sonido ambiental debe repetirse infinito
    audioRef.current.volume = 0.15; // Volumen bajito para no molestar el enfoque
    return () => {
      audioRef.current.pause(); // Limpiamos si el componente se destruye
    };
  }, []);

  // Efecto para controlar el Play/Pause del audio según el temporizador
  useEffect(() => {
    if (isActive && ambient !== 'none') {
      audioRef.current.src = AMBIENT_SOUNDS[ambient].url;
      audioRef.current.play().catch(e => console.log("El navegador bloqueó el audio automático."));
    } else {
      audioRef.current.pause();
    }
  }, [isActive, ambient]);

  // El Reloj Principal
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const nextPhaseIsWork = !isWorkPhase;
      setIsWorkPhase(nextPhaseIsWork);
      setTimeLeft(nextPhaseIsWork ? 25 * 60 : 5 * 60);
      setIsActive(false); 
      
      // Alarma de finalización
      try {
        const alarma = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        alarma.volume = 0.4;
        alarma.play();
      } catch (e) {}

      if (nextPhaseIsWork) {
        toast.success("Descanso finalizado. Reiniciando ciclo de Enfoque Profundo.");
      } else {
        toast.success("Ciclo completado. Iniciando fase de Homeostasis.");
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkPhase]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorkPhase ? 25 * 60 : 5 * 60);
  };

  const switchMode = (mode) => {
    if ((mode === 'work' && isWorkPhase) || (mode === 'break' && !isWorkPhase)) return;
    setIsActive(false);
    setIsWorkPhase(mode === 'work');
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const totalTime = isWorkPhase ? 25 * 60 : 5 * 60;
  const offset = CIRCUMFERENCE - ( (timeLeft / totalTime) * CIRCUMFERENCE );

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/5 bg-black/60 backdrop-blur-2xl shadow-2xl w-full transition-all duration-500 h-full relative overflow-hidden">
      
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-accent rounded-full mix-blend-screen filter blur-[80px] opacity-20 transition-opacity duration-1000 ${isActive ? 'opacity-40' : 'opacity-10'}`}></div>

      {/* Selectores de Modo */}
      <div className="flex gap-1 mb-8 bg-black/50 p-1.5 rounded-xl border border-white/10 w-full relative z-10">
        <button onClick={() => switchMode('work')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${isWorkPhase ? 'bg-accent/20 text-accent border border-accent/50 shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Enfoque</button>
        <button onClick={() => switchMode('break')} className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${!isWorkPhase ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'}`}>Reposo</button>
      </div>

      {/* Reloj */}
      <div className="relative flex items-center justify-center w-56 h-56 mb-8 z-10">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={RADIUS} className="stroke-white/5 fill-none" strokeWidth="4" />
          <circle 
            cx="100" cy="100" r={RADIUS}
            className={`fill-none transition-all duration-1000 ease-linear ${isWorkPhase ? 'stroke-accent' : 'stroke-emerald-400'}`}
            strokeWidth="6" strokeLinecap="round"
            style={{ strokeDasharray: CIRCUMFERENCE, strokeDashoffset: offset, filter: `drop-shadow(0 0 8px ${isWorkPhase ? 'var(--accent-primary)' : '#34d399'})` }}
          />
        </svg>

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-6xl font-mono font-light tracking-tighter drop-shadow-lg text-white">{timeString}</span>
          <span className={`text-[10px] tracking-[0.3em] uppercase mt-3 font-bold ${isWorkPhase ? 'text-accent/80' : 'text-emerald-400/80'}`}>{isActive ? 'En Progreso' : 'En Espera'}</span>
        </div>
      </div>

      {/* Controles de Reproducción */}
      <div className="flex items-center gap-6 z-10 mt-2">
        <button onClick={toggleTimer} className={`relative group flex items-center justify-center w-20 h-20 rounded-full transition-all duration-500 cursor-pointer active:scale-90 ${isActive ? 'bg-black/80 border border-accent/50 text-accent shadow-[inset_0_0_20px_rgba(var(--accent-primary-rgb),0.2)]' : 'bg-accent/20 border-2 border-accent text-white backdrop-blur-md hover:bg-accent hover:shadow-[0_0_30px_var(--accent-primary)]'}`}>
          <div className={`absolute inset-0 rounded-full border border-accent transition-all duration-1000 ${isActive ? 'animate-ping opacity-30 scale-[1.3]' : 'group-hover:scale-[1.15] opacity-0 group-hover:opacity-50'}`}></div>
          <div className={`absolute inset-0 rounded-full border border-white/30 transition-all duration-1000 ${isActive ? 'animate-spin opacity-50 border-t-accent' : 'opacity-0'}`}></div>
          {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-[0_0_8px_var(--accent-primary)]"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 ml-1.5 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
          )}
        </button>
        <button onClick={resetTimer} className="relative flex items-center justify-center w-12 h-12 rounded-full bg-black/40 text-gray-400 hover:text-white border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer active:scale-90 group" title="Reiniciar Ciclo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
        </button>
      </div>

      {/* NUEVO: SELECTOR DE SONIDO AMBIENTAL */}
      <div className="mt-6 w-full z-10 flex flex-col items-center">
        <label className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Ondas Cerebrales</label>
        <select 
          value={ambient} 
          onChange={(e) => setAmbient(e.target.value)}
          className="bg-black/50 border border-white/10 text-xs text-gray-300 rounded-full px-4 py-2 outline-none focus:border-accent cursor-pointer transition-all hover:bg-white/5"
        >
          {Object.entries(AMBIENT_SOUNDS).map(([key, data]) => (
            <option key={key} value={key} className="bg-black text-gray-200">{data.name}</option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default FocusTimer;