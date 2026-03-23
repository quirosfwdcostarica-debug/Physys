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
    const respuesta = await fetch(`${BASE_URL}/consejos?categoriaId=${categoriaId}`);
    if (!respuesta.ok) throw new Error("Error en la conexión con la API de Consejos.");
    const data = await respuesta.json();
    return data[0]; // Retornamos el primer consejo asociado
  } catch (error) {
    console.error(error);
    throw error;
  }
};