import { FC, useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '', 
  });

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
      const response = await axios.post('http://localhost:3000/register', formData);
      const token = response.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/profile');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };
  return (
    <>
    <h1 style={{textAlign:"center"}}>Регистрация</h1>
    <form onSubmit={submit} style={{display: 'flex', flexDirection:'column', alignItems: 'center', gap:"20px"}}>
      <label>
        Имя:
        <input type="text" name="name" value={formData.name} onChange={makeChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={makeChange} />
      </label>
      <label>
        Пароль:
        <input type="password" name="password" value={formData.password} onChange={makeChange} />
      </label>
      <label>
        Ссылка на аватарку:
        <input type="text" name="avatar" value={formData.avatar} onChange={makeChange} />
      </label>
      <button type="submit">Зарегистрироваться</button>
      <Link to="/login">Аккаунт уже есть</Link>
    </form>
    </>
  )
}

export default RegisterPage