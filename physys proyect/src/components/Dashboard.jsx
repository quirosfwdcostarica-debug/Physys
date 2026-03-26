// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import UserProfilePanel from './UserProfilePanel';
import FocusTimer from './FocusTimer';
import DiagnosticForm from './DiagnosticForm';
import { toast } from 'sonner';

const Dashboard = () => {
  const [tareas, setTareas] = useState([]);
  const [areaElegida, setAreaElegida] = useState(null);
  const [tienePlan, setTienePlan] = useState(false);

  useEffect(() => {
    const planGuardado = localStorage.getItem('physis_plan_activo');
    const areaGuardada = localStorage.getItem('physis_area_activa');
    
    if (planGuardado && areaGuardada) {
      setTareas(JSON.parse(planGuardado));
      setAreaElegida(JSON.parse(areaGuardada));
      setTienePlan(true);
    }
  }, []);

  const handlePlanGenerado = (nuevasTareas, areaObj) => {
    setTareas(nuevasTareas);
    setAreaElegida(areaObj);
    setTienePlan(true);
    
    localStorage.setItem('physis_plan_activo', JSON.stringify(nuevasTareas));
    localStorage.setItem('physis_area_activa', JSON.stringify(areaObj));
    toast.success(`Plan ${areaObj.nombre} activado con éxito.`);
  };

  const toggleTarea = (id) => {
    const tareasActualizadas = tareas.map(t => {
      if(t.id === id) return { ...t, completada: !t.completada };
      return t;
    });
    setTareas(tareasActualizadas);
    localStorage.setItem('physis_plan_activo', JSON.stringify(tareasActualizadas));
  };

  const completadas = tareas.filter(t => t.completada).length;
  const totales = tareas.length;

  if (!tienePlan) {
    return (
      <div className="w-full max-w-6xl mx-auto pb-24">
        <DiagnosticForm onPlanGenerado={handlePlanGenerado} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 animate-in fade-in duration-700">
      
      <UserProfilePanel totalTasks={totales} completedTasks={completadas} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: LISTA DE TAREAS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
            <h2 className="text-2xl font-bold text-accent flex items-center gap-3">
              <span className="text-3xl bg-white/5 p-2 rounded-xl">{areaElegida?.icono || '⚡'}</span>
              Protocolo: {areaElegida?.nombre || 'Optimización'}
            </h2>
          </div>
          
          <div className="space-y-4">
            {tareas.map((tarea, index) => (
              <div 
                key={tarea.id} 
                onClick={() => toggleTarea(tarea.id)}
                className={`p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center group shadow-lg ${tarea.completada ? 'bg-accent/10 border-accent/40 opacity-60' : 'bg-black/40 border-white/10 hover:border-accent hover:bg-white/5'}`}
              >
                {/* CHECKBOX */}
                <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${tarea.completada ? 'border-accent bg-accent text-white shadow-[0_0_10px_var(--accent-primary)]' : 'border-gray-500 group-hover:border-accent'}`}>
                  {tarea.completada && <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
                
                {/* TEXTO */}
                <div className="flex-1">
                  <p className="text-[10px] md:text-xs text-accent font-bold uppercase tracking-widest mb-1">
                    Directriz {index + 1}
                  </p>
                  <p className={`text-sm md:text-base transition-colors ${tarea.completada ? 'text-gray-500 line-through' : 'text-gray-200 group-hover:text-white'}`}>
                    {tarea.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: RELOJ */}
        <div className="lg:col-span-1">
          <FocusTimer />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;