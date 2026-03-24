// src/services/Fetch.jsx
const BASE_URL = 'http://localhost:3001';

export const obtenerCategoriasAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/categorias`);
  if (!respuesta.ok) throw new Error("Error en la conexión.");
  return await respuesta.json();
};

export const obtenerConsejoPorCategoriaAPI = async (categoriaId) => {
  const respuesta = await fetch(`${BASE_URL}/consejos`);
  if (!respuesta.ok) throw new Error("Error en la conexión.");
  const todosLosConsejos = await respuesta.json();
  return todosLosConsejos.find(c => String(c.categoriaId) === String(categoriaId)); 
};

// --- CRUD DE METAS (ACTUALIZADO PARA PRIVACIDAD: OPCIÓN A) ---
export const obtenerMetasAPI = async (userId) => {
  // Ahora filtramos por userId directamente en la URL
  const respuesta = await fetch(`${BASE_URL}/metas_usuario?userId=${userId}`);
  if (!respuesta.ok) throw new Error("Error al obtener las metas.");
  return await respuesta.json();
};

export const agregarMetaAPI = async (meta) => {
  const respuesta = await fetch(`${BASE_URL}/metas_usuario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meta)
  });
  if (!respuesta.ok) throw new Error("Error al guardar la meta.");
  return await respuesta.json();
};

export const actualizarMetaAPI = async (id, completada) => {
  const respuesta = await fetch(`${BASE_URL}/metas_usuario/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada })
  });
  if (!respuesta.ok) throw new Error("Error al actualizar la meta.");
  return await respuesta.json();
};

export const eliminarMetaAPI = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/metas_usuario/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error("Error al eliminar la meta.");
  return true;
};

// --- AUTENTICACIÓN Y PERFIL (OPCIÓN C) ---
export const iniciarSesionAPI = async (email, password) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios?email=${email}&password=${password}`);
  const usuarios = await respuesta.json();
  if (usuarios.length === 0) throw new Error("Credenciales bio-métricas incorrectas.");
  return usuarios[0];
};

export const registrarUsuarioAPI = async (nuevoUsuario) => {
  const checkRespuesta = await fetch(`${BASE_URL}/usuarios?email=${nuevoUsuario.email}`);
  const checkUsuarios = await checkRespuesta.json();
  if (checkUsuarios.length > 0) throw new Error("Este enlace neuronal (email) ya está registrado.");

  const respuesta = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoUsuario)
  });
  return await respuesta.json();
};

export const actualizarUsuarioAPI = async (id, datosNuevos) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosNuevos)
  });
  if (!respuesta.ok) throw new Error("Error al actualizar el perfil.");
  return await respuesta.json();
};

export const eliminarUsuarioAPI = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error("Error al eliminar la cuenta.");
  return true;
};

// --- PODERES DE ADMINISTRADOR ---
export const obtenerTodosLosUsuariosAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/usuarios`);
  return await respuesta.json();
};

export const agregarCategoriaAPI = async (categoria) => {
  const respuesta = await fetch(`${BASE_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  });
  return await respuesta.json();
};

export const eliminarCategoriaAPI = async (id) => {
  await fetch(`${BASE_URL}/categorias/${id}`, { method: 'DELETE' });
  return true;
};

// Para la Opción B que viene en el siguiente paso:
export const agregarConsejoAPI = async (consejo) => {
  const respuesta = await fetch(`${BASE_URL}/consejos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consejo)
  });
  return await respuesta.json();
};