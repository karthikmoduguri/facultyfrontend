import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const adminLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/v1/admin/login",
        { email, password }
      );
      if (data.token) {
        const adminUser = { role: "admin", token: data.token };
        setUser(adminUser);
        localStorage.setItem("user", JSON.stringify(adminUser));
        navigate("/admin-dashboard");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    }
  };

  const googleLogin = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:7000/api/v1/auth/h"
      );
      if (data) {
        console.log(data);
        const studentUser = { role: "student", token: "google-auth" };
        setUser(studentUser);
        localStorage.setItem("user", JSON.stringify(studentUser));
      }
    } catch (error) {
      console.error(error);
      alert("Google Login Failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Axios instance with token
  const authAxios = axios.create({
    baseURL: "http://localhost:7000/api/v1",
  });

  authAxios.interceptors.request.use((config) => {
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  });

  return (
    <AuthContext.Provider
      value={{ user, adminLogin, googleLogin, logout, loading, authAxios }}
    >
      {children}
    </AuthContext.Provider>
  );
};
