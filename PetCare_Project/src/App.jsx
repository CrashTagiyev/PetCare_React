import "./App.css";
import Login from "./Components/AuthComponents/Login";
import { Routes, Route } from "react-router-dom";
import AuthRequires from "./Components/AuthRequires";
import GetUsers from "./Components/GetUsers";
import Home from "./Components/ClassicComponents/Home";
import AdminLayout from "./Components/Layouts/AdminLayout";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthProvider } from "./Hooks/useAuth";

const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  COMPANY: "Company",
  VET: "Vet",
};

function App() {
  const [currentRoles, setCurrentRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const tokenRoles = decodedToken.role;
        setCurrentRoles(Array.isArray(tokenRoles) ? tokenRoles : [tokenRoles]);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <AuthProvider>
      <Routes>
        {/* Admin layout */}
        <Route path="/login" element={<Login />} />
        <Route element={<AuthRequires allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Home />} />
            <Route path="/getusers" element={<GetUsers />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
