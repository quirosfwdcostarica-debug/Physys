// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { iniciarSesionAPI, registrarUsuarioAPI } from '../services/Fetch';
import { toast } from 'sonner';

// Creamos el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto fácilmente en cualquier parte
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  // EFECTO DE MEMORIA: Al recargar, revisa si ya estábamos logueados
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('physis_session');
    if (sesionGuardada) {
      setUsuario(JSON.parse(sesionGuardada));
    }
    setCargandoAuth(false);
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
      const newUser = {
        id: crypto.randomUUID(),
        nombre,
        email,
        password,
        rol: 'usuario' // Por defecto, todos son usuarios normales
      };
      const user = await registrarUsuarioAPI(newUser);
      setUsuario(user);
      localStorage.setItem('physis_session', JSON.stringify(user));
      toast.success(`Perfil creado. Bienvenido a Physis, ${user.nombre}.`);
      return true;
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('physis_session');
    toast.info("Desconexión exitosa. Sistema en reposo.");
  };

  return (
    <AuthContext.Provider value={{ usuario, cargandoAuth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};