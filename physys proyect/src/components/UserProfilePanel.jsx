// src/components/UserProfilePanel.jsx
import React, { useState } from 'react';
import '../styles/UserProfilePanel.css';
import { useAuth } from '../context/AuthContext';
import { RadialBarChart, RadialBar, ResponsiveContainer } from  'recharts';


const UserProfilePanel = ({ totalTasks, completedTasks }) => {
  const { usuario, logout, actualizarPerfil, eliminarCuenta } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [editNombre, setEditNombre] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const totalTareas = totalTasks || 0;
  const tareasCompletadas = completedTasks || 0;
  const tareasPendientes = totalTareas - tareasCompletadas;
  const porcentajeOptimizacion = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;
  
  let nivel = "Sujeto Base";
  let colorNivel = "#94a3b8"; 

  if (porcentajeOptimizacion >= 95) {
    nivel = "🌟 Bio-Hacker Elite";
    colorNivel = "#facc15"; 
  } else if (porcentajeOptimizacion >= 75) {
    nivel = "🧬 Optimizado";
    colorNivel = "var(--accent-primary)"; 
  } else if (porcentajeOptimizacion >= 40) {
    nivel = "⚙️ En Evolución";
    colorNivel = "#38bdf8"; 
  } else if (porcentajeOptimizacion > 0) {
    nivel = "🌱 Iniciado";
    colorNivel = "#a78bfa"; 
  }

  const inicial = usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';

  const data = [
    { name: 'Completadas', value: tareasCompletadas, fill: colorNivel },
    { name: 'Total', value: totalTareas, fill: '#1e293b' }
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    await actualizarPerfil(editNombre, editPassword);
    setShowSettings(false);
  };

  const handleDelete = async () => {
    if(window.confirm("CRÍTICO: ¿Estás seguro de que deseas purgar tu enlace neuronal? Esta acción es irreversible.")) {
      await eliminarCuenta();
    }
  };

  return (
    <>
      <div className="user-profile-panel mb-8 relative animate-in fade-in duration-500 w-full">
        
        {/* AJUSTE MÓVIL: En móvil se centran arriba, en PC se pegan a la derecha */}
        <div className="w-full flex justify-center md:justify-end md:absolute md:top-4 md:right-4 gap-2 z-20 mb-6 md:mb-0">
          <button 
            onClick={() => { setEditNombre(usuario.nombre); setEditPassword(''); setShowSettings(true); }}
            className="text-xs font-bold bg-white/5 hover:bg-accent/80 text-white px-4 py-2 md:px-3 md:py-1.5 rounded-full transition-colors cursor-pointer border border-white/10"
          >
            ⚙️ Ajustes
          </button>
          <button 
            onClick={logout}
            className="text-xs font-bold bg-white/5 hover:bg-red-500/80 text-white px-4 py-2 md:px-3 md:py-1.5 rounded-full transition-colors cursor-pointer border border-white/10"
          >
            Desconectar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 items-center">
          
          {/* COLUMNA 1 */}
          <div className="md:col-span-1 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-4 h-full">
            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-accent/10 border-2 border-accent/30 text-accent text-3xl md:text-4xl font-bold mb-3 shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.2)]">
              {inicial}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-1 px-2">{usuario?.nombre || 'Sujeto Desconocido'}</h3>
            <p className="text-[10px] md:text-xs text-gray-500 font-mono mb-3">ID: #{usuario?.id?.substring(0,6) || '---'}</p>
            
            <div className="w-full bg-white/5 border border-white/10 p-2 md:p-3 rounded-xl mt-1 flex flex-col items-center overflow-hidden">
              <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest mb-1">Rango</p>
              <div 
                className="font-bold text-[10px] md:text-[11px] px-2 py-1 rounded-full text-center w-full whitespace-nowrap overflow-hidden text-ellipsis" 
                style={{ backgroundColor: `${colorNivel}20`, color: colorNivel, border: `1px solid ${colorNivel}40` }}
                title={nivel} 
              >
                {nivel}
              </div>
            </div>
          </div>

          {/* COLUMNA 2 Y 3: Gráfico */}
          {/* AJUSTE MÓVIL: Altura reducida en móviles (h-48) para no ocupar toda la pantalla */}
          <div className="md:col-span-2 flex items-center justify-center h-48 md:h-56 relative w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={10} data={data} startAngle={180} endAngle={0}>
                <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="absolute flex flex-col items-center justify-center text-center translate-y-[-5px]">
              <p className="text-4xl md:text-5xl font-mono font-light text-accent drop-shadow-[0_0_10px_var(--accent-primary)]">
                {Math.round(porcentajeOptimizacion)}%
              </p>
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 mt-1">Nivel de Optimización</p>
            </div>
          </div>

          {/* COLUMNA 4: Stats */}
          <div className="md:col-span-1 flex flex-row md:flex-col gap-2 md:gap-3 justify-center h-full border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-4">
            <div className="stat-card p-2 md:p-3 rounded-xl bg-black/40 border border-white/5 flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-bold text-gray-100 font-mono">{tareasCompletadas}</p>
              <p className="text-[9px] md:text-xs text-gray-400 leading-tight">Cumplidos</p>
            </div>
            <div className="stat-card p-2 md:p-3 rounded-xl bg-black/40 border border-white/5 flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-bold text-gray-100 font-mono">{tareasPendientes}</p>
              <p className="text-[9px] md:text-xs text-gray-400 leading-tight">Pendientes</p>
            </div>
            <div className="stat-card p-2 md:p-3 rounded-xl bg-black/40 border border-white/5 flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-bold text-accent font-mono">{totalTareas}</p>
              <p className="text-[9px] md:text-xs text-gray-400 leading-tight">Totales</p>
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE AJUSTES (AHORA LIBRE DE CLIPPING) */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-black/90 border border-accent/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer p-2">✖</button>
            <h3 className="text-xl font-bold text-accent mb-4">Ajustes Neuronales</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Modificar Nombre</label>
                <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nueva Contraseña</label>
                <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} placeholder="En blanco para mantener" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none" />
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold py-3 rounded-xl hover:shadow-[0_0_15px_var(--accent-primary)] transition-all cursor-pointer">Guardar Cambios</button>
            </form>
            <div className="mt-6 border-t border-white/10 pt-4">
              <button onClick={handleDelete} className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">Purgar Cuenta</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfilePanel;