// src/components/FocusTimer.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos en segundos
  const [isActive, setIsActive] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  // Parámetros del SVG (La Rueda Gradual)
  const RADIUS = 80;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Cambio de fase automático
      const nextPhaseIsWork = !isWorkPhase;
      setIsWorkPhase(nextPhaseIsWork);
      setTimeLeft(nextPhaseIsWork ? 25 * 60 : 5 * 60);
      setIsActive(false); 
      
      // Notificaciones HCI
      if (nextPhaseIsWork) {
        toast.success("Descanso finalizado. Reiniciando ciclo de Enfoque Profundo.", { icon: '🧠' });
      } else {
        toast.success("Ciclo completado. Iniciando fase de Homeostasis (Descanso).", { icon: '🧘' });
      }

      // Sonido sutil de alerta
      try {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.3;
        audio.play();
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isWorkPhase]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.info(`Módulo de Enfoque Activado (${isWorkPhase ? '25 min' : '5 min'})`);
    } else {
      toast.info("Ciclo Pausado.");
    }
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isWorkPhase ? 25 * 60 : 5 * 60);
    toast.info("Temporizador Reiniciado.");
  };

  const switchMode = (mode) => {
    if ((mode === 'work' && isWorkPhase) || (mode === 'break' && !isWorkPhase)) return;
    setIsActive(false);
    setIsWorkPhase(mode === 'work');
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    toast.info(`Cambiando a modo ${mode === 'work' ? 'Enfoque Profundo' : 'Homeostasis'}.`);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // --- NUEVA LÓGICA DE SVG PARA LA RUEDA GRADUAL ---
  const totalTime = isWorkPhase ? 25 * 60 : 5 * 60;
  // Calculamos el desplazamiento exacto del borde (stroke-dashoffset)
  const offset = CIRCUMFERENCE - ( (timeLeft / totalTime) * CIRCUMFERENCE );

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg w-full transition-all duration-300">
      
      {/* Cabecera / Selector de Modo (Botones Blindados) */}
      <div className="flex gap-2 mb-6 bg-white/5 p-1 rounded-full border border-white/10">
        <button 
          onClick={() => switchMode('work')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${isWorkPhase ? 'bg-accent text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
        >
          🧠 Enfoque
        </button>
        <button 
          onClick={() => switchMode('break')}
          className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${!isWorkPhase ? 'bg-green-500 text-white shadow-md' : 'text-gray-400 hover:text-green-300'}`}
        >
          🧘 Descanso
        </button>
      </div>

      {/* --- DISPLAY DEL RELOJ CON SVG GRADUAL --- */}
      <div className="relative flex items-center justify-center w-52 h-52 mb-6">
        
        {/* Contenedor SVG (Rotado -90deg para que empiece arriba al centro) */}
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 180 180">
          {/* Círculo de Fondo (Track gris sutil) */}
          <circle 
            cx="90" cy="90" r={RADIUS}
            className="stroke-white/5 fill-none"
            strokeWidth="6"
          />
          
          {/* Círculo de Progreso Activo (EL MOTOR GRADUAL) */}
          <circle 
            cx="90" cy="90" r={RADIUS}
            className={`fill-none transition-all duration-1000 ease-linear ${isWorkPhase ? 'stroke-accent' : 'stroke-green-500'}`}
            strokeWidth="6"
            strokeLinecap="round" // Puntas redondeadas premium
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: offset, // Se actualiza suavemente cada segundo
              filter: `drop-shadow(0 0 4px ${isWorkPhase ? 'var(--accent-primary)' : '#22c55e'})`
            }}
          />
        </svg>

        {/* Círculo decorativo exterior pulsante cuando está activo */}
        <div className={`absolute inset-0 rounded-full border border-accent/20 transition-all duration-500 ${isActive ? 'scale-105 opacity-60 animate-pulse' : 'scale-100 opacity-20'}`}></div>

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-mono font-bold tracking-tighter drop-shadow-md text-white">
            {timeString}
          </span>
          <span className={`text-xs tracking-widest uppercase mt-2 font-medium ${isWorkPhase ? 'text-accent' : 'text-green-400'}`}>
            {isWorkPhase ? 'Ciclo Activo' : 'Homeostasis'}
          </span>
        </div>
      </div>

      {/* Controles Principales (Botones Blindados) */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTimer}
          className={`flex items-center justify-center w-16 h-16 rounded-full text-3xl transition-all duration-200 shadow-xl cursor-pointer active:scale-95 hover:shadow-accent/40 ${isActive ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10' : 'bg-accent text-white hover:shadow-[0_0_15px_var(--accent-primary)]'}`}
          title={isActive ? "Pausar" : "Iniciar Enfoque Profundo"}
        >
          {isActive ? '⏸' : '▶'}
        </button>
        <button 
          onClick={resetTimer}
          className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 border border-white/5 transition-all duration-200 cursor-pointer active:scale-95"
          title="Reiniciar Ciclo Actual"
        >
          🔄
        </button>
      </div>

    </div>
  );
};

export default FocusTimer;