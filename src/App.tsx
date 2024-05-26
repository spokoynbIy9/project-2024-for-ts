import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserPage from "./pages/UserPage/UserPage";
import { FC } from "react";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useEffect } from "react";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginPage from "./pages/LoginPage/LoginPage";
const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const publicPaths = ["/", "/login"];

    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:userId" element={<UserPage />}></Route>
      <Route path="/" element={<RegisterPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<Navigate to="/users" />}></Route>
    </Routes>
  );
};

export default App;
