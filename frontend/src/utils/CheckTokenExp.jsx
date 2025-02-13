import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

const CheckTokenExp = ({ setvalidUser, setRole }) => {
  const navigation = useNavigate();
  const location = useLocation();

  // Define role-based access paths and their redirects
  const roleAccess = {
    admin: {
      paths: ["/adminPanel"],
      defaultRedirect: "/adminPanel/dashboard"
    },
    translator: {
      paths: ["/translatorPanel"],
      defaultRedirect: "/translatorPanel/dashboard"
    },
    user: {
      paths: ["/userPanel"],
      defaultRedirect: "/userPanel/dashboard"
    }
  };

  const checkPathAccess = (userRole, currentPath) => {
    const allProtectedPaths = Object.values(roleAccess)
      .flatMap(({ paths }) => paths);
    
    const isProtectedRoute = allProtectedPaths.some(path => 
      currentPath.startsWith(path)
    );

    if (!isProtectedRoute) {
      return true;
    }

    const allowedPaths = roleAccess[userRole]?.paths || [];
    return allowedPaths.some(path => currentPath.startsWith(path));
  };

  const redirectToRoleDashboard = (userRole) => {
    const defaultPath = roleAccess[userRole]?.defaultRedirect;
    if (defaultPath) {
      navigation(defaultPath);
    }
  };

  const checkTokenExp = async () => {
    try {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("role");

      // Handle no token case
      if (!token) {
        if (location.pathname !== "/Login") {
          const isProtectedRoute = Object.values(roleAccess)
            .flatMap(({ paths }) => paths)
            .some(path => location.pathname.startsWith(path));
          
          if (isProtectedRoute) {
            navigation("/Login");
          }
        }
        if (typeof setvalidUser === 'function') {
          setvalidUser(false);
        }
        if (typeof setRole === 'function') {
          setRole(null);
        }
        return false;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // Check token expiration
      if (decodedToken.exp < currentTime) {
        console.log("Token expired");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        if (typeof setvalidUser === 'function') {
          setvalidUser(false);
        }
        if (typeof setRole === 'function') {
          setRole(null);
        }
        alert("Session expired, please login again!");
        navigation("/Login");
        return false;
      }

      const tokenRole = decodedToken.role;
      if (typeof setRole === 'function') {
        setRole(tokenRole);
      }

      // Verify role from token matches stored role
      if (tokenRole !== storedRole) {
        console.log("Role mismatch");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        if (typeof setvalidUser === 'function') {
          setvalidUser(false);
        }
        if (typeof setRole === 'function') {
          setRole(null);
        }
        alert("Invalid session, please login again!");
        navigation("/Login");
        return false;
      }

      // Check role-based access
      if (!checkPathAccess(tokenRole, location.pathname)) {
        // alert("You don't have permission to access this page!");
        redirectToRoleDashboard(tokenRole);
        return false;
      }

      // Handle login page access for authenticated users
      if (location.pathname === "/Login") {
        redirectToRoleDashboard(tokenRole);
        return true;
      }

      if (typeof setvalidUser === 'function') {
        setvalidUser(true);
      }
      return true;

    } catch (error) {
      console.error("Error in checkTokenExp:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      if (typeof setvalidUser === 'function') {
        setvalidUser(false);
      }
      if (typeof setRole === 'function') {
        setRole(null);
      }
      navigation("/Login");
      return false;
    }
  };

  useEffect(() => {
    checkTokenExp();
  }, [location.pathname]);

  return null;
};

export default CheckTokenExp;