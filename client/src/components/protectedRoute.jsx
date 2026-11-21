import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/dashboard", {
      withCredentials: true
    })
      .then((response) => {
        console.log(response.data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error(error.message);
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;