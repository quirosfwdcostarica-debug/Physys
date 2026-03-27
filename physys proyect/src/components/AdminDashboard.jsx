// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  obtenerTodosLosUsuariosAPI, 
  obtenerCategoriasAPI, 
  agregarCategoriaAPI, 
  eliminarCategoriaAPI,
  agregarConsejoAPI,
  obtenerFeedbackAPI,
  eliminarFeedbackAPI
} from '../services/Fetch';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { usuario, logout } = useAuth();
  const [vistaActiva, setVistaActiva] = useState('vectores'); 
  
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [listaFeedback, setListaFeedback] = useState([]); 
  
  const [nuevaCat, setNuevaCat] = useState({ nombre: '', rubro: '', icono: '⚡', descripcion: '' });
  const [nuevoConsejo, setNuevoConsejo] = useState({ categoriaId: '', texto: '' });

  useEffect(() => {
    cargarDatosAdmin();
  }, []);

  const cargarDatosAdmin = async () => {
    try {
      const [users, cats, feedbacks] = await Promise.all([
        obtenerTodosLosUsuariosAPI(), 
        obtenerCategoriasAPI(),
        obtenerFeedbackAPI()
      ]);
      setListaUsuarios(users);
      setListaCategorias(cats);
      setListaFeedback(feedbacks.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
    } catch (error) {
      toast.error("Error al sincronizar datos de administrador.");
    }
  };

  const handleCrearCategoria = async (e) => {
    e.preventDefault();
    try {
      const catPayload = { ...nuevaCat, id: crypto.randomUUID() };
      const catGuardada = await agregarCategoriaAPI(catPayload);
      setListaCategorias([...listaCategorias, catGuardada]);
      setNuevaCat({ nombre: '', rubro: '', icono: '⚡', descripcion: '' });
      toast.success("Área de Diagnóstico creada con éxito.");
    } catch (error) {
      toast.error("Fallo al crear el área. Revisa tu servidor.");
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await eliminarCategoriaAPI(id);
      setListaCategorias(listaCategorias.filter(c => c.id !== id));
      toast.info("Área de Diagnóstico purgada.");
    } catch (error) {
      toast.error("Error al eliminar.");
    }
  };

  const handleCrearConsejo = async (e) => {
    e.preventDefault();
    if (!nuevoConsejo.categoriaId) {
      return toast.error("Selecciona un Área base para anclar la tarea.");
    }
    try {
      const consejoPayload = { ...nuevoConsejo, id: crypto.randomUUID() };
      await agregarConsejoAPI(consejoPayload);
      setNuevoConsejo({ categoriaId: '', texto: '' });
      toast.success("Tarea diaria añadida al plan de esta área.");
    } catch (error) {
      toast.error("Fallo al inyectar la tarea.");
    }
  };

  const handleEliminarFeedback = async (id) => {
    try {
      await eliminarFeedbackAPI(id);
      setListaFeedback(listaFeedback.filter(f => f.id !== id));
      toast.info("Señal eliminada del registro.");
    } catch (error) {
      toast.error("Error al purgar la señal.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-8">
      
      {/* HEADER ADMIN */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-3xl border border-accent/40 bg-accent/10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl drop-shadow-[0_0_15px_var(--accent-primary)]">👑</span>
          <div>
            <h2 className="text-2xl font-bold text-accent">Centro de Comando Physis</h2>
            <p className="text-sm text-gray-300">Autenticado como: Arquitecto {usuario.nombre}</p>
          </div>
        </div>
        <button onClick={logout} className="mt-4 md:mt-0 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500/40 transition-colors cursor-pointer font-bold">
          Cerrar Sesión Admin
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => setVistaActiva('vectores')} className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${vistaActiva === 'vectores' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
          1. Opciones de Diagnóstico
        </button>
        <button onClick={() => setVistaActiva('conocimiento')} className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${vistaActiva === 'conocimiento' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
          2. Generador de Planes
        </button>
        <button onClick={() => setVistaActiva('usuarios')} className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${vistaActiva === 'usuarios' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
          👥 Monitor de Usuarios
        </button>
        <button onClick={() => setVistaActiva('feedback')} className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer relative ${vistaActiva === 'feedback' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
          📡 Señales Recibidas
          {listaFeedback.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black animate-pulse">
              {listaFeedback.length}
            </span>
          )}
        </button>
      </div>

      {vistaActiva === 'vectores' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-fit">
            <h3 className="text-xl font-bold text-accent mb-2">Crear Área de Transformación</h3>
            <p className="text-xs text-gray-400 mb-6">Estas opciones las verá el usuario en su diagnóstico.</p>
            
            <form onSubmit={handleCrearCategoria} className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/3">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Icono (Emoji)</label>
                  <input type="text" value={nuevaCat.icono} onChange={e => setNuevaCat({...nuevaCat, icono: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Ej. 💰" />
                </div>
                <div className="w-2/3">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nombre</label>
                  <input required type="text" value={nuevaCat.nombre} onChange={e => setNuevaCat({...nuevaCat, nombre: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Ej. Financiero" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rubro</label>
                <input required type="text" value={nuevaCat.rubro} onChange={e => setNuevaCat({...nuevaCat, rubro: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Ej. Dinero" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Descripción Corta</label>
                <textarea required value={nuevaCat.descripcion} onChange={e => setNuevaCat({...nuevaCat, descripcion: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent resize-none h-24" placeholder="Para qué sirve..." />
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 hover:shadow-[0_0_20px_var(--accent-primary)] transition-all cursor-pointer">
                + Crear Área
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Áreas Activas</h3>
            {listaCategorias.map(cat => (
              <div key={cat.id} className="relative overflow-hidden flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/50 transition-colors group">
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-black/50 rounded-lg border border-white/10 text-2xl">
                    {cat.icono}
                  </div>
                  <div>
                    <h4 className="font-bold text-white drop-shadow-md">{cat.nombre}</h4>
                    <p className="text-xs text-gray-300 drop-shadow-md">{cat.rubro}</p>
                  </div>
                </div>
                <button onClick={() => handleEliminarCategoria(cat.id)} className="relative z-10 text-gray-500 hover:text-red-500 hover:bg-red-500/20 p-2 rounded-lg transition-colors cursor-pointer" title="Eliminar">
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {vistaActiva === 'conocimiento' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-fit">
            <h3 className="text-xl font-bold text-accent mb-2">Construir Plan de Tareas</h3>
            
            <form onSubmit={handleCrearConsejo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">¿Para qué Área es esta tarea?</label>
                <select required value={nuevoConsejo.categoriaId} onChange={e => setNuevoConsejo({...nuevoConsejo, categoriaId: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent cursor-pointer">
                  <option value="" className="text-black">-- Selecciona el Área --</option>
                  {listaCategorias.map(cat => (
                    <option key={cat.id} value={cat.id} className="text-black">{cat.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tarea / Directriz</label>
                <textarea required value={nuevoConsejo.texto} onChange={e => setNuevoConsejo({...nuevoConsejo, texto: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent resize-none h-32" placeholder="Ej. Tomar 2L de agua..." />
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 hover:shadow-[0_0_20px_var(--accent-primary)] transition-all cursor-pointer">
                + Añadir Tarea al Plan
              </button>
            </form>
          </div>
        </div>
      )}

      {vistaActiva === 'usuarios' && (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-accent mb-4">Red de Sujetos Conectados</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="p-4">ID Neuronal</th>
                  <th className="p-4">Nombre de Sujeto</th>
                  <th className="p-4">Rango</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuarios.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">#{u.id.substring(0,8)}</td>
                    <td className="p-4 font-bold text-gray-200">{u.nombre}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${u.rol === 'admin' ? 'bg-accent/20 text-accent border border-accent/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                        {u.rol}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vistaActiva === 'feedback' && (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-accent mb-4">Bandeja de Transmisiones (Feedback)</h3>
          
          {listaFeedback.length === 0 ? (
            <p className="text-gray-400 text-center py-8">La red está en silencio. No hay transmisiones nuevas.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listaFeedback.map(fb => (
                <div key={fb.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-accent/50 transition-colors">
                  <div className="w-full">
                    <p className="text-xs text-gray-500 mb-2 font-mono">
                      ID Transmisión: {fb.id.substring(0,8)} | Recibido: {new Date(fb.fecha).toLocaleString()}
                    </p>
                    <p className="text-gray-200 bg-black/30 p-4 rounded-xl text-sm border border-white/5 italic">
                      "{fb.mensaje}"
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEliminarFeedback(fb.id)} 
                    className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer"
                  >
                    Purgar Señal
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;