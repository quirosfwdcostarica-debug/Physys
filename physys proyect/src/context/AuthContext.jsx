// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { iniciarSesionAPI, registrarUsuarioAPI, actualizarUsuarioAPI, eliminarUsuarioAPI } from '../services/Fetch';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    // BLINDAJE: Si el LocalStorage está corrupto, lo atrapamos y no dejamos que congele la app.
    try {
      const sesionGuardada = localStorage.getItem('physis_session');
      if (sesionGuardada) {
        setUsuario(JSON.parse(sesionGuardada));
      }
    } catch (error) {
      console.error("Datos de sesión corruptos detectados. Limpiando caché neuronal...");
      localStorage.removeItem('physis_session'); // Borramos la basura
    } finally {
      // Esta línea SIEMPRE se ejecutará ahora, liberándote de la pantalla de carga
      setCargandoAuth(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const user = await iniciarSesionAPI(email, password);
      setUsuario(user);
      localStorage.setItem('physis_session', JSON.stringify(user));
      toast.success(`Acceso concedido. Bienvenido, ${user.nombre}.`);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const register = async (nombre, email, password) => {
    try {
      const newUser = { id: crypto.randomUUID(), nombre, email, password, rol: 'usuario' };
      await registrarUsuarioAPI(newUser);
      toast.success("Perfil creado exitosamente. Por favor, inicia sesión para continuar.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const actualizarPerfil = async (nuevoNombre, nuevaPassword) => {
    try {
      const datosNuevos = {};
      if (nuevoNombre) datosNuevos.nombre = nuevoNombre;
      if (nuevaPassword) datosNuevos.password = nuevaPassword;
      
      const userActualizado = await actualizarUsuarioAPI(usuario.id, datosNuevos);
      setUsuario(userActualizado);
      localStorage.setItem('physis_session', JSON.stringify(userActualizado));
      toast.success("Perfil neuronal actualizado con éxito.");
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const eliminarCuenta = async () => {
    try {
      await eliminarUsuarioAPI(usuario.id);
      logout();
      toast.info("Enlace neuronal purgado permanentemente.");
      return true;
    } catch (error) {
      toast.error("Fallo al eliminar el perfil.");
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('physis_session');
    toast.info("Desconexión exitosa. Sistema en reposo.");
  };

  return (
    <AuthContext.Provider value={{ usuario, cargandoAuth, login, register, actualizarPerfil, eliminarCuenta, logout }}>
      {children}
    </AuthContext.Provider>
  );
};