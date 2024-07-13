import "./App.css";
import Login from "./Components/AuthComponents/Login";
import { Routes, Route } from "react-router-dom";
import AuthRequires from "./Components/AuthRequires/AuthRequires";
import GetUsers from "./Components/GetUsers";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layouts/Layout";
import { useAuth } from "./Hooks/useAuth";
const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  COMPANY: "Company",
  VET: "Vet",
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Admin layout */}
      <Route element={<Layout />}>
        {!user && <Route path="/login" element={<Login />} />}
        <Route path="/" element={<Home />} />
        
        <Route element={<AuthRequires allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/getusers" element={<GetUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
