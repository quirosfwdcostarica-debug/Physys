// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { iniciarSesionAPI, registrarUsuarioAPI } from '../services/Fetch';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

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
        rol: 'usuario' 
      };
      
      // SOLO REGISTRAMOS EN LA BASE DE DATOS, NO INICIAMOS SESIÓN
      await registrarUsuarioAPI(newUser);
      
      toast.success("Perfil creado exitosamente. Por favor, inicia sesión para continuar.");
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