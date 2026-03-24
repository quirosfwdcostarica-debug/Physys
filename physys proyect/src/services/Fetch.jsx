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
    // 1. Traemos TODOS los consejos de golpe (evitamos el bug de json-server)
    const respuesta = await fetch(`${BASE_URL}/consejos`);
    if (!respuesta.ok) throw new Error("Error en la conexión con la API de Consejos.");
    const todosLosConsejos = await respuesta.json();
    
    // 2. Buscamos manualmente el que coincida (A prueba de balas)
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