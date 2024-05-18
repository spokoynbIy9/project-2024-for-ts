import { FC } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const ProfilePage: FC = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : {} 
    
    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        password: "",
        newPassword: ""
    })

    const makeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:3000/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate("/profile");
            setTimeout(() => alert('Профиль успешно обновлен'), 500);
        } catch (error: any) {
            if (error.response) {
                console.error('Ошибка при обновлении профиля:', error.response.data);
            } else if (error.request) {
                console.error('Сервер не ответил:', error.request);
            } else {
                console.error('Произошла ошибка при настройке запроса:', error.message);
            }
        }
    };
  return (
    <div>
        <div style={{display:"flex", justifyContent:"space-between"
        }}>
            <Link to="/users" style={{fontSize:"24px", color:"black", textDecoration:"none"}}>Просмотр других пользователей</Link>
            <button style={{fontSize:"18px"}}
            onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate("/")
            }}>ВЫЙТИ ИЗ ПРОФИЛЯ</button>
        </div>
        <h1 style={{textAlign:"center"}}>Профиль пользователя</h1>

        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px" }}>
            <div>
                <h2>Текущая информация</h2>
                <p>Имя: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Аватар: <img style={{ width: "200px", height: "200px" }} src={user.avatar} alt="" /></p>
            </div>
            <div>
                <h2 style={{textAlign: "center"}}>Редактирование профиля</h2>
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <label>
                        Имя:
                        <input type="text" name="name" value={formData.name} onChange={makeChange} />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={makeChange} />
                    </label>
                    <label>
                        Ссылка на аватарку:
                        <input type="text" name="avatar" value={formData.avatar} onChange={makeChange} />
                    </label>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                        <p style={{textAlign: "center", fontWeight:"bolder", color:"red"}}>Для изменения пароля, введите сначала старый</p>
                    <label>
                        Старый Пароль:
                        <input type="password" name="password" value={formData.password} onChange={makeChange} />
                    </label>
                    <label>
                        Новый пароль:
                        <input type="password" name="newPassword" value={formData.newPassword} onChange={makeChange} />
                    </label>
                    </div>

                    <button type="submit">Обновить профиль</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage