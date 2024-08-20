import "./App.scss";
import { Routes, Route } from "react-router-dom";
import AuthRequires from "./Components/AuthRequires/AuthRequires";
import GetUsers from "./Components/GetUsers";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layouts/Layout";
import { useAuth } from "./Hooks/useAuth";
import Login from "./Components/login/Login";
import ForgotPassword from "./Components/forgotPassword/ForgotPassword";
import ResetPassword from "./Components/resetPassword/ResetPassword";
import UserProfileInfo from "./Components/userProfileInfo/userProfileInfo";
import store from "./Store/store";
import { Provider } from "react-redux";
import Vetinfo from "./Components/usersInformationCOmponents/VetInfo/Vetinfo";
import SignUpParent from "./Components/SignUp/SignUpParent";

const ROLES = {
  ADMIN: "Admin",
  USER: "User",
  COMPANY: "Company",
  VET: "Vet",
};


function App() {
  const { user } = useAuth();
  return (
    <Provider store={store}>
      <Routes>
        <Route element={<Layout />}>
          {!user && <Route path="/login" element={<Login />} />}
          {!user && <Route path="/signup" element={<SignUpParent />} />}
          <Route path="/" element={<Home />} />
          <Route
            path="/userprofileinfo"
            element={user? <UserProfileInfo /> : <Login />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/vetInfo/:id" element={<Vetinfo />} />
          <Route element={<AuthRequires allowedRoles={[ROLES.ADMIN]} />}>
            <Route path="/getusers" element={<GetUsers />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
