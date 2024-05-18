import { FC } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);
  const makeChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submit = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', formData);
      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при входе:', error);
    }
  };
  return (
    <>
    <h1 style={{textAlign: "center"}}>Авторизация</h1>
    <form onSubmit={submit} style={{display:"flex", flexDirection:"column", alignItems: "center", gap:"20px"}}>
      <input type="email" name="email" placeholder="Email" onChange={makeChange} required />
      <input type="password" name="password" placeholder="Password" onChange={makeChange} required />
      <button type="submit">Войти</button>
      <Link to="/">Нет аккаунта, хотел бы зарегистрироваться</Link>
    </form>
    </>
  )
}

export default LoginPage