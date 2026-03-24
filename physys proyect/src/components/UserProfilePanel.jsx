// src/components/UserProfilePanel.jsx
import React from 'react';
import '../styles/UserProfilePanel.css';

const UserProfilePanel = ({ totalTasks, completedTasks }) => {
  // Cálculo dinámico de métricas
  const totalTareas = totalTasks || 0;
  const tareasCompletadas = completedTasks || 0;
  const porcentajeOptimizacion = totalTareas > 0 ? (tareasCompletadas / totalTareas) * 100 : 0;
  
  // Lógica simple para determinar el "Nivel de Optimización"
  let nivel = "Iniciado";
  if (porcentajeOptimizacion >= 80) nivel = "Optimizado";
  else if (porcentajeOptimizacion >= 50) nivel = "Avanzado";
  else if (porcentajeOptimizacion > 0) nivel = "En Evolución";

  return (
    <div className="user-profile-panel mb-8">
      
      {/* Cabecera del Perfil */}
      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border border-accent/40 text-accent text-3xl font-bold animate-pulse">
          U
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-100">Usuario de Physis</h3>
          <p className="text-sm text-gray-400">ID Neuronal: #US-735</p>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="level-indicator">{nivel}</span>
          <span className="text-sm text-accent mt-1 font-mono">{Math.round(porcentajeOptimizacion)}%</span>
        </div>
      </div>

      {/* Métricas de Progreso */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-gray-200">Progreso de Optimización Total</p>
          <p className="text-xs text-gray-400 font-mono">
            {tareasCompletadas} / {totalTareas} protocolos cumplidos
          </p>
        </div>
        <div className="progress-track" title={`Nivel de Optimización: ${Math.round(porcentajeOptimizacion)}%`}>
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