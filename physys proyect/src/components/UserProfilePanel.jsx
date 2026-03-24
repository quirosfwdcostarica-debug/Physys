// src/components/UserProfilePanel.jsx
import React from 'react';
import '../styles/UserProfilePanel.css';
import { useAuth } from '../context/AuthContext';

const UserProfilePanel = ({ totalTasks, completedTasks }) => {
  // Traemos los datos del usuario y la función para salir
  const { usuario, logout } = useAuth();

  const totalTareas = totalTasks || 0;
  const tareasCompletadas = completedTasks || 0;
  const porcentajeOptimizacion = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;
  
  let nivel = "Iniciado";
  if (porcentajeOptimizacion >= 80) nivel = "Optimizado";
  else if (porcentajeOptimizacion >= 50) nivel = "Avanzado";
  else if (porcentajeOptimizacion > 0) nivel = "En Evolución";

  // Obtenemos la primera letra del nombre para el Avatar
  const inicial = usuario?.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';

  return (
    <div className="user-profile-panel mb-8 relative">
      
      {/* Botón de Cerrar Sesión */}
      <button 
        onClick={logout}
        className="absolute top-4 right-4 text-xs font-bold bg-white/10 hover:bg-red-500/80 text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
        title="Desconectar Enlace"
      >
        Desconectar
      </button>

      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-accent text-3xl font-bold">
          {inicial}
        </div>
        <div>
          {/* Mostramos el nombre real del usuario */}
          <h3 className="text-xl font-bold text-gray-100">{usuario?.nombre || 'Usuario Desconocido'}</h3>
          <p className="text-sm text-gray-400">ID Neuronal: #{usuario?.id?.substring(0,6) || '---'}</p>
        </div>
        <div className="ml-auto mr-12 flex flex-col items-end">
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
          <div 
            className="progress-bar-fill" 
            style={{ width: `${porcentajeOptimizacion}%` }}
          />
        </div>
      </div>
      
    </div>
  );
};

export default UserProfilePanel;