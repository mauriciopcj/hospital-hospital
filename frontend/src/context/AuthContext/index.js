import React, { useContext, createContext, useState, useEffect } from "react";
import AuthService from "../../services/AuthService/index";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (AuthService.isLoggedIn()) {
      return true;
    }

    return false;
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isLoggedIn) {
      setUser(AuthService.getUser());
    }
  }, [isLoggedIn]);

  const login = async ({ username, password }) => {
    await AuthService.login({ username, password });
    setIsLoggedIn(true);
    setUser(AuthService.getUser());
  };

  const logout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUser({});
  };

  const isAuthenticated = () => {
    return isLoggedIn;
  };

  const getUser = () => {
    return user;
  };

  const isAdmin = () => {
    return AuthService.getUser().authority === "ADMIN";
  };

  return {
    login,
    logout,
    isAuthenticated,
    getUser,
    isAdmin,
  };
}
