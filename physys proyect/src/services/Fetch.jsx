const BASE_URL = 'http://localhost:3001';

export const obtenerCategoriasAPI = async () => {
  const respuesta = await fetch(`${BASE_URL}/categorias`);
  if (!respuesta.ok) throw new Error("Error al obtener categorías");
  return await respuesta.json();
};

export const obtenerConsejosPorCategoriaAPI = async (categoriaId) => {
  const respuesta = await fetch(`${BASE_URL}/consejos?categoriaId=${categoriaId}`);
  if (!respuesta.ok) throw new Error("Error al obtener consejos");
  return await respuesta.json();
};