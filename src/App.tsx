import './App.css'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import UsersPage from './components/UsersPage/UsersPage'
import UserPage from './components/UserPage/UserPage'
import { FC } from 'react'
import RegisterPage from './components/RegisterPage/RegisterPage'
import { useEffect } from 'react'
import ProfilePage from './components/ProfilePage/ProfilePage'
import LoginPage from './components/LoginPage/LoginPage'
const App: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const publicPaths = ['/', '/login'];

    if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/');
    }
  }, [location.pathname]);
  return (
    <Routes>
      <Route path="/users" element={<UsersPage></UsersPage>} />
      <Route path="/users/:userId" element={<UserPage></UserPage>}></Route>
      <Route path="/" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    </Routes>
  )
}

export default App
