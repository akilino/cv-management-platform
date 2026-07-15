/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from "react";
import { getRefreshToken, getStatusRequest, logoutRequest } from "../api/services/auth";

// 1. Create the Context object
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when the app starts
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    checkUserStatus();
  }, []);

  const setUser = (authData) => {
    if (authData && authData.access_token) {
      // Guarda o token no localStorage para o intercetor do Axios usar
      localStorage.setItem("access_token", authData.access_token);
      // Guarda os dados do utilizador no estado do React
      setUserState(authData.user);
    } else {
      localStorage.removeItem("access_token");
      setUserState(null);
    }
  };

  const checkUserStatus = async () => {
    try {
      const resRefresh = await getRefreshToken();
      const { access_token } = resRefresh.data;
      localStorage.setItem("access_token", access_token);

      const resStatus = await getStatusRequest();
      setUserState(resStatus.data);
    } catch (err) {
      console.error("Auth check failed:", err.response?.data || err.message);
      localStorage.removeItem("access_token");
      setUserState(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      localStorage.removeItem("access_token");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, loading, checkUserStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAuth = () => useContext(AuthContext);
