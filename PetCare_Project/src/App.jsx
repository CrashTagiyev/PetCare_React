import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthRequires from "./Components/AuthRequires/AuthRequires";
import GetUsers from "./Components/GetUsers";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layouts/Layout";
import { useAuth } from "./Hooks/useAuth";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/login/Login";
import ForgotPassword from "./Components/forgotPassword/ForgotPassword";
import ResetPassword from "./Components/resetPassword/ResetPassword";
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
        {!user && <Route path="/login" element={<Login/>} />}
        {!user && <Route path="/signup" element={<SignUp />} />}
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route element={<AuthRequires allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="/getusers" element={<GetUsers />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
