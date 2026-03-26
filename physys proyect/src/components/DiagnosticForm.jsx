// src/components/DiagnosticForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

const DiagnosticForm = ({ onPlanGenerado }) => {
  const [paso, setPaso] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [edadCustom, setEdadCustom] = useState('');
  
  // NUEVO: Estados para guardar los datos del Admin
  const [areasAdmin, setAreasAdmin] = useState([]);
  const [tareasAdmin, setTareasAdmin] = useState([]);
  
  const [respuestas, setRespuestas] = useState({
    areaObj: null, // Guardaremos el objeto completo del área seleccionada
    genero: '',
    edad: '',
    fechaLimite: ''
  });

  const hoy = new Date();
  const minDate = new Date(hoy); minDate.setMonth(minDate.getMonth() + 1);
  const maxDate = new Date(hoy); maxDate.setMonth(maxDate.getMonth() + 3);
  const formatearFecha = (fecha) => fecha.toISOString().split('T')[0];

  // NUEVO: Cargar las áreas y tareas creadas por el Admin
  useEffect(() => {
    fetch('http://localhost:3001/categorias').then(res => res.json()).then(data => setAreasAdmin(data));
    fetch('http://localhost:3001/consejos').then(res => res.json()).then(data => setTareasAdmin(data));
  }, []);

  const seleccionarArea = (areaObj) => { setRespuestas({ ...respuestas, areaObj }); setPaso(2); };
  const seleccionarGenero = (genero) => { setRespuestas({ ...respuestas, genero }); setPaso(3); };
  
  const seleccionarEdad = (rango) => {
    if (rango === '66+') {
      if (!edadCustom || isNaN(edadCustom) || parseInt(edadCustom) < 66) return toast.error("Ingresa una edad válida mayor a 65.");
      setRespuestas({ ...respuestas, edad: edadCustom });
    } else {
      setRespuestas({ ...respuestas, edad: rango });
    }
    setPaso(4);
  };

  const procesarDiagnostico = () => {
    if (!respuestas.fechaLimite) return toast.error("Debes seleccionar una fecha objetivo.");
    const diferenciaDias = (new Date(respuestas.fechaLimite) - hoy) / (1000 * 60 * 60 * 24);
    if (diferenciaDias < 28) return toast.error("El cambio biológico requiere al menos 1 mes.");

    setIsProcessing(true);
    setTimeout(() => { generarPrograma(respuestas); }, 3500);
  };

  const generarPrograma = (datos) => {
    // MAGIA: Filtramos las tareas que el Admin creó específicamente para el Área seleccionada
    const tareasDelArea = tareasAdmin.filter(t => t.categoriaId === datos.areaObj.id);
    
    // Si el Admin olvidó ponerle tareas, le ponemos unas por defecto para que no se rompa
    const planFinal = tareasDelArea.length > 0 
      ? tareasDelArea.map(t => ({ id: t.id, texto: t.texto, completada: false }))
      : [{ id: '1', texto: "Beber agua", completada: false }, { id: '2', texto: "Meditar", completada: false }];

    // Le enviamos al Dashboard el Plan y toda la información del Área (incluyendo su IMAGEN)
    onPlanGenerado(planFinal, datos.areaObj);
  };

  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-700 mt-8 border border-white/10">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-background-32547-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl m-4 text-center">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-6 py-12 animate-in fade-in duration-500">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin"></div>
              <span className="text-3xl animate-pulse">🧬</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Procesando Datos</h3>
            <p className="text-accent max-w-sm font-mono text-sm leading-relaxed">Conectando con la base de conocimiento de los Arquitectos...</p>
          </div>
        ) : (
          <div className="transition-all duration-300">
            <div className="w-full bg-white/10 h-1.5 rounded-full mb-8 overflow-hidden">
              <div className="bg-accent h-full transition-all duration-500" style={{ width: `${(paso / 4) * 100}%` }}></div>
            </div>

            {/* PASO 1: AHORA MUESTRA LAS ÁREAS REALES DEL ADMIN */}
            {paso === 1 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-white mb-2">Fase 1: Enfoque</h2>
                <p className="text-gray-400 mb-8">¿Qué vector de tu vida requiere re-estructuración inmediata?</p>
                
                {areasAdmin.length === 0 ? (
                  <p className="text-accent">Esperando que el Admin cree áreas de diagnóstico...</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {areasAdmin.map(area => (
                      <button key={area.id} onClick={() => seleccionarArea(area)} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all text-lg font-bold text-gray-200 cursor-pointer flex flex-col items-center gap-2">
                        <span className="text-2xl">{area.icono}</span>
                        {area.nombre}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PASO 2: GÉNERO */}
            {paso === 2 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-white mb-2">Fase 2: Biología</h2>
                <div className="flex gap-4 justify-center mt-8">
                  <button onClick={() => seleccionarGenero('Femenino')} className="flex-1 p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all text-xl font-bold text-gray-200 cursor-pointer">Femenino ♀️</button>
                  <button onClick={() => seleccionarGenero('Masculino')} className="flex-1 p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all text-xl font-bold text-gray-200 cursor-pointer">Masculino ♂️</button>
                </div>
              </div>
            )}

            {/* PASO 3: EDAD */}
            {paso === 3 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-white mb-2">Fase 3: Cronométrica</h2>
                <div className="grid grid-cols-2 gap-4 mb-4 mt-8">
                  {['22-30', '31-45', '46-65'].map(rango => (
                    <button key={rango} onClick={() => seleccionarEdad(rango)} className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-accent transition-all text-lg font-bold text-gray-200 cursor-pointer">{rango} años</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="number" placeholder="Edad (>65)" value={edadCustom} onChange={e => setEdadCustom(e.target.value)} className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:border-accent outline-none" min="66" />
                  <button onClick={() => seleccionarEdad('66+')} className="px-6 rounded-2xl bg-white/10 hover:bg-accent text-white font-bold transition-colors cursor-pointer">Confirmar</button>
                </div>
              </div>
            )}

            {/* PASO 4: FECHA */}
            {paso === 4 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-black text-white mb-2">Fase 4: El Contrato</h2>
                <div className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6 mt-8">
                  <input type="date" min={formatearFecha(minDate)} max={formatearFecha(maxDate)} value={respuestas.fechaLimite} onChange={e => setRespuestas({...respuestas, fechaLimite: e.target.value})} className="w-full bg-transparent border-b-2 border-white/20 pb-2 text-2xl text-center text-white focus:border-accent outline-none font-mono cursor-pointer" />
                </div>
                <button onClick={procesarDiagnostico} className="w-full py-4 rounded-2xl bg-accent text-white font-black text-lg tracking-widest uppercase hover:shadow-[0_0_30px_var(--accent-primary)] transition-all cursor-pointer">Iniciar Protocolo</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticForm;