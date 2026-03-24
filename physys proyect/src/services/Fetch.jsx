// src/services/Fetch.jsx
const BASE_URL = 'http://localhost:3001';

export const obtenerCategoriasAPI = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/categorias`);
    if (!respuesta.ok) throw new Error("Error en la conexión con la API.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const obtenerConsejoPorCategoriaAPI = async (categoriaId) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/consejos`);
    if (!respuesta.ok) throw new Error("Error en la conexión.");
    const todosLosConsejos = await respuesta.json();
    return todosLosConsejos.find(c => String(c.categoriaId) === String(categoriaId)); 
  } catch (error) { console.error(error); throw error; }
};

// --- CRUD DE METAS ---
export const obtenerMetasAPI = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario`);
    if (!respuesta.ok) throw new Error("Error al obtener las metas.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const agregarMetaAPI = async (meta) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meta)
    });
    if (!respuesta.ok) throw new Error("Error al guardar la meta.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const actualizarMetaAPI = async (id, completada) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completada })
    });
    if (!respuesta.ok) throw new Error("Error al actualizar la meta.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const eliminarMetaAPI = async (id) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario/${id}`, { method: 'DELETE' });
    if (!respuesta.ok) throw new Error("Error al eliminar la meta.");
    return true;
  } catch (error) { console.error(error); throw error; }
};

// --- AUTENTICACIÓN ---
export const iniciarSesionAPI = async (email, password) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/usuarios?email=${email}&password=${password}`);
    if (!respuesta.ok) throw new Error("Error al conectar con la base de datos.");
    const usuarios = await respuesta.json();
    if (usuarios.length === 0) throw new Error("Credenciales bio-métricas incorrectas.");
    return usuarios[0];
  } catch (error) { console.error(error); throw error; }
};

export const registrarUsuarioAPI = async (nuevoUsuario) => {
  try {
    const checkRespuesta = await fetch(`${BASE_URL}/usuarios?email=${nuevoUsuario.email}`);
    const checkUsuarios = await checkRespuesta.json();
    if (checkUsuarios.length > 0) throw new Error("Este enlace neuronal (email) ya está registrado.");

    const respuesta = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });
    if (!respuesta.ok) throw new Error("Error al crear el perfil.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

// --- NUEVOS PODERES DE ADMINISTRADOR (FASE 3) ---
export const obtenerTodosLosUsuariosAPI = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/usuarios`);
    if (!respuesta.ok) throw new Error("Error al obtener la red de usuarios.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const agregarCategoriaAPI = async (categoria) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/categorias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoria)
    });
    if (!respuesta.ok) throw new Error("Error al inyectar el nuevo vector.");
    return await respuesta.json();
  } catch (error) { console.error(error); throw error; }
};

export const eliminarCategoriaAPI = async (id) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/categorias/${id}`, { method: 'DELETE' });
    if (!respuesta.ok) throw new Error("Error al purgar el vector.");
    return true;
  } catch (error) { console.error(error); throw error; }
};