// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  obtenerTodosLosUsuariosAPI, 
  obtenerCategoriasAPI, 
  agregarCategoriaAPI, 
  eliminarCategoriaAPI 
} from '../services/Fetch';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { usuario, logout } = useAuth();
  const [vistaActiva, setVistaActiva] = useState('usuarios'); // 'usuarios' o 'vectores'
  
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  
  // Estado para el formulario de nueva categoría
  const [nuevaCat, setNuevaCat] = useState({ nombre: '', rubro: '', icono: '⚡', descripcion: '' });

  useEffect(() => {
    cargarDatosAdmin();
  }, []);

  const cargarDatosAdmin = async () => {
    try {
      const [users, cats] = await Promise.all([obtenerTodosLosUsuariosAPI(), obtenerCategoriasAPI()]);
      setListaUsuarios(users);
      setListaCategorias(cats);
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
      toast.success("Nuevo Vector inyectado a la red con éxito.");
    } catch (error) {
      toast.error("Fallo al crear el vector.");
    }
  };

  const handleEliminarCategoria = async (id) => {
    try {
      await eliminarCategoriaAPI(id);
      setListaCategorias(listaCategorias.filter(c => c.id !== id));
      toast.info("Vector purgado del sistema.");
    } catch (error) {
      toast.error("Error al eliminar.");
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-bottom-8">
      
      {/* HEADER ADMIN */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-6 rounded-3xl border border-accent/40 bg-accent/10 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <span className="text-4xl">👑</span>
          <div>
            <h2 className="text-2xl font-bold text-accent">Centro de Comando de Arquitectos</h2>
            <p className="text-sm text-gray-300">Autenticado como: {usuario.nombre}</p>
          </div>
        </div>
        <button onClick={logout} className="mt-4 md:mt-0 bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl hover:bg-red-500/40 transition-colors cursor-pointer font-bold">
          Cerrar Sesión Admin
        </button>
      </div>

      {/* PESTAÑAS DE NAVEGACIÓN */}
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setVistaActiva('usuarios')}
          className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${vistaActiva === 'usuarios' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
        >
          👥 Monitor de Enlaces (Usuarios)
        </button>
        <button 
          onClick={() => setVistaActiva('vectores')}
          className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer ${vistaActiva === 'vectores' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-primary)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
        >
          ⚙️ Gestor de Vectores
        </button>
      </div>

      {/* VISTA 1: MONITOR DE USUARIOS */}
      {vistaActiva === 'usuarios' && (
        <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-accent mb-4">Red de Sujetos Conectados</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase text-xs tracking-wider">
                  <th className="p-4">ID Neuronal</th>
                  <th className="p-4">Nombre de Sujeto</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Rango</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuarios.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">#{u.id.substring(0,8)}</td>
                    <td className="p-4 font-bold text-gray-200">{u.nombre}</td>
                    <td className="p-4 text-gray-400">{u.email}</td>
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

      {/* VISTA 2: GESTOR DE VECTORES (CATEGORÍAS) */}
      {vistaActiva === 'vectores' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Formulario Nueva Categoría */}
          <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl h-fit">
            <h3 className="text-xl font-bold text-accent mb-4">Inyectar Nuevo Vector</h3>
            <form onSubmit={handleCrearCategoria} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Icono (Emoji)</label>
                <input type="text" value={nuevaCat.icono} onChange={e => setNuevaCat({...nuevaCat, icono: e.target.value})} className="w-20 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-center focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nombre del Vector</label>
                <input required type="text" value={nuevaCat.nombre} onChange={e => setNuevaCat({...nuevaCat, nombre: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Ej. Nutrición Celular" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Rubro</label>
                <input required type="text" value={nuevaCat.rubro} onChange={e => setNuevaCat({...nuevaCat, rubro: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" placeholder="Ej. Dieta" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Descripción</label>
                <textarea required value={nuevaCat.descripcion} onChange={e => setNuevaCat({...nuevaCat, descripcion: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent resize-none h-24" placeholder="Breve descripción del impacto..." />
              </div>
              <button type="submit" className="w-full bg-accent text-white font-bold rounded-xl px-4 py-3 hover:shadow-[0_0_20px_var(--accent-primary)] transition-all cursor-pointer">
                + Crear Vector
              </button>
            </form>
          </div>

          {/* Lista de Vectores Existentes */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-200 mb-4">Vectores Activos en el Sistema</h3>
            {listaCategorias.map(cat => (
              <div key={cat.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{cat.icono}</span>
                  <div>
                    <h4 className="font-bold text-white">{cat.nombre}</h4>
                    <p className="text-xs text-gray-400">{cat.rubro}</p>
                  </div>
                </div>
                <button onClick={() => handleEliminarCategoria(cat.id)} className="text-gray-500 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors cursor-pointer" title="Eliminar Vector">
                  🗑️
                </button>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminDashboard;