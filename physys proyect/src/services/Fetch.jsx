// src/services/Fetch.jsx
const BASE_URL = 'http://localhost:3001';

export const obtenerCategoriasAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/categorias`);
  if (!respuesta.ok) throw new Error("Error en la conexión con la red de Physis.");
  return await respuesta.json();
};

export const obtenerConsejoPorCategoriaAPI = async (categoriaId) => {
  const respuesta = await fetch(`${BASE_URL}/consejos`);
  if (!respuesta.ok) throw new Error("Error en la conexión con el núcleo de datos.");
  const todosLosConsejos = await respuesta.json();
  return todosLosConsejos.find(c => String(c.categoriaId) === String(categoriaId)); 
};

// --- CRUD DE METAS MULTITENANT ---
export const obtenerMetasAPI = async (userId) => {
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

// --- AUTENTICACIÓN Y PERFIL ---
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

// ACTUALIZADO: agregarCategoriaAPI ya soporta el nuevo payload {icono, imagen, ...}
export const agregarCategoriaAPI = async (categoriaPayload) => {
  const respuesta = await fetch(`${BASE_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoriaPayload)
  });
  if (!respuesta.ok) throw new Error("Fallo al inyectar el nuevo vector.");
  return await respuesta.json();
};

export const eliminarCategoriaAPI = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/categorias/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error("Fallo al purgar el vector.");
  return true;
};

export const agregarConsejoAPI = async (consejo) => {
  const respuesta = await fetch(`${BASE_URL}/consejos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(consejo)
  });
  if (!respuesta.ok) throw new Error("Fallo al inyectar la directriz.");
  return await respuesta.json();
};

export const obtenerReportes = async () => {
  const respuesta = await fetch(`${BASE_URL}/reportes`);
  if (!respuesta.ok) throw new Error("Error en la conexión con la red de Physis.");
  return await respuesta.json();
};

export const registrarReprotes = async (objReporte) => {
  const respuesta = await fetch(`${BASE_URL}/reportes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(objReporte)
  });
  const reportes = respuesta.json();
  return reportes;
};

export const actualizarReporte = async (id, datosNuevos) => {
  const respuesta = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosNuevos)
  });
  if (!respuesta.ok) throw new Error("Error al actualizar el reporte.");
  return await respuesta.json();
};

export const eliminarReportes = async (id) => {
  const respuesta = await fetch(`${BASE_URL}/reportes/${id}`, { method: 'DELETE' });
  if (!respuesta.ok) throw new Error("Error al eliminar el reporte.");
  return true;
};

export default { obtenerReportes, registrarReprotes, actualizarReporte, eliminarReportes }