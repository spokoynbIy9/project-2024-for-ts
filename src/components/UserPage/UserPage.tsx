
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { FC } from 'react'

const UserPage: FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({first_name : '', email: ''})
    const {userId} = useParams()
    const fetchData = async () =>{
        const response = await axios.get(`http://localhost:3000/users/${userId}`)
        setUser(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])


    const editInfo = async (e : React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await axios.patch(`http://localhost:3000/users/${userId}`, user);
        setTimeout(() => alert('Данные пользователя успешно обновлены'), 500);
    }

    return (
    <div>
        <button onClick={() => navigate("/users")}>Назад</button>
        <h2>{user.first_name}</h2>
        <p>{user.email}</p>
        <form onSubmit={editInfo}>
            <input type="text" placeholder='Имя' value={user.first_name} onChange={(e) => setUser({...user, first_name:e.target.value})}/>
            <input type="email" placeholder='e-mail' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
            <button type='submit'>Сохранить изменения</button>
        </form>
        
    </div>
  )
}

export default UserPage