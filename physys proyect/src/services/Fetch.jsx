// src/services/Fetch.jsx
const BASE_URL = 'http://localhost:3001';

export const obtenerCategoriasAPI = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/categorias`);
    if (!respuesta.ok) throw new Error("Error en la conexión con la API de Categorías.");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const obtenerConsejoPorCategoriaAPI = async (categoriaId) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/consejos`);
    if (!respuesta.ok) throw new Error("Error en la conexión con la API de Consejos.");
    const todosLosConsejos = await respuesta.json();
    const consejoEncontrado = todosLosConsejos.find(
      c => String(c.categoriaId) === String(categoriaId)
    );
    return consejoEncontrado; 
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --- CRUD DE METAS ---
export const obtenerMetasAPI = async () => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario`);
    if (!respuesta.ok) throw new Error("Error al obtener las metas.");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
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
  } catch (error) {
    console.error(error);
    throw error;
  }
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const eliminarMetaAPI = async (id) => {
  try {
    const respuesta = await fetch(`${BASE_URL}/metas_usuario/${id}`, {
      method: 'DELETE'
    });
    if (!respuesta.ok) throw new Error("Error al eliminar la meta.");
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// --- NUEVAS FUNCIONES DE AUTENTICACIÓN (FASE 2) ---

export const iniciarSesionAPI = async (email, password) => {
  try {
    // Buscamos si existe un usuario con ese email y contraseña
    const respuesta = await fetch(`${BASE_URL}/usuarios?email=${email}&password=${password}`);
    if (!respuesta.ok) throw new Error("Error al conectar con la base de datos.");
    const usuarios = await respuesta.json();
    
    if (usuarios.length === 0) {
      throw new Error("Credenciales bio-métricas incorrectas.");
    }
    return usuarios[0]; // Retorna el usuario autenticado
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registrarUsuarioAPI = async (nuevoUsuario) => {
  try {
    // Primero verificamos que el email no esté ya en uso
    const checkRespuesta = await fetch(`${BASE_URL}/usuarios?email=${nuevoUsuario.email}`);
    const checkUsuarios = await checkRespuesta.json();
    
    if (checkUsuarios.length > 0) {
      throw new Error("Este enlace neuronal (email) ya está registrado.");
    }

    const respuesta = await fetch(`${BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });
    if (!respuesta.ok) throw new Error("Error al crear el perfil.");
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};