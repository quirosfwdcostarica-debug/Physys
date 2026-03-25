// src/components/UserProfilePanel.jsx
import React, { useState } from 'react';
import '../styles/UserProfilePanel.css';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const UserProfilePanel = ({ totalTasks, completedTasks }) => {
  const { usuario, logout, actualizarPerfil, eliminarCuenta } = useAuth();
  
  // Estados para el Modal de Ajustes
  const [showSettings, setShowSettings] = useState(false);
  const [editNombre, setEditNombre] = useState('');
  const [editPassword, setEditPassword] = useState('');

  const totalTareas = totalTasks || 0;
  const tareasCompletadas = completedTasks || 0;
  const porcentajeOptimizacion = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;
  
  let nivel = "Iniciado";
  if (porcentajeOptimizacion >= 80) nivel = "Optimizado";
  else if (porcentajeOptimizacion >= 50) nivel = "Avanzado";
  else if (porcentajeOptimizacion > 0) nivel = "En Evolución";

  const inicial = usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';

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
    <div className="user-profile-panel mb-8 relative">
      
      {/* Botones de Control Superiores */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => {
            setEditNombre(usuario.nombre);
            setEditPassword('');
            setShowSettings(true);
          }}
          className="text-xs font-bold bg-white/10 hover:bg-accent/80 text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          ⚙️ Perfil
        </button>
        <button 
          onClick={logout}
          className="text-xs font-bold bg-white/10 hover:bg-red-500/80 text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        >
          Desconectar
        </button>
      </div>

      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-accent text-3xl font-bold">
          {inicial}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-100">{usuario?.nombre || 'Sujeto Desconocido'}</h3>
          <p className="text-sm text-gray-400">ID Neuronal: #{usuario?.id?.substring(0,6) || '---'}</p>
        </div>
        <div className="ml-auto mr-36 md:mr-48 flex flex-col items-end">
          <span className="level-indicator">{nivel}</span>
          <span className="text-sm text-accent mt-1 font-mono">{Math.round(porcentajeOptimizacion)}%</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2 mt-4">
          <p className="text-sm font-medium text-gray-200">Progreso de Optimización Total</p>
          <p className="text-xs text-gray-400 font-mono">
            {tareasCompletadas} / {totalTareas} protocolos cumplidos
          </p>
        </div>
        <div className="progress-track">
          <div className="progress-bar-fill" style={{ width: `${porcentajeOptimizacion}%` }} />
        </div>
      </div>

      {/* MODAL DE AJUSTES (OPCIÓN C) */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-black/80 border border-accent/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
            <button onClick={() => setShowSettings(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">✖</button>
            <h3 className="text-xl font-bold text-accent mb-4">Ajustes Neuronales</h3>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Modificar Nombre</label>
                <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Nueva Contraseña (Opcional)</label>
                <input type="password" value={editPassword} onChange={e => setEditPassword(e.target.value)} placeholder="Dejar en blanco para mantener" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:border-accent outline-none" />
              </div>
              
              <button type="submit" className="w-full bg-accent text-white font-bold py-2 rounded-xl hover:shadow-[0_0_15px_var(--accent-primary)] transition-all cursor-pointer">
                Guardar Cambios
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-4">
              <button onClick={handleDelete} className="w-full bg-red-500/10 text-red-500 border border-red-500/20 font-bold py-2 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                Purgar Cuenta Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default UserProfilePanel;