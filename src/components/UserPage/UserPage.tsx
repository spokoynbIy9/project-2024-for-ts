
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const UserPage: React.FC = () => {
    const [user, setUser] = useState({first_name : '', email: ''})
    const {userId} = useParams()
    const fetchData = async () =>{
        const response = await axios.get(`https://reqres.in/api/users/${userId}`)
        setUser(response.data.data)
    }
    useEffect(() => {
        fetchData()
    }, [])


    const handleSubmit = (e : React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        axios.put(`https://reqres.in/api/users/${userId}`, user)
        .then(res =>{
            console.log('User updated successfullt:', res.data)
        })
        .catch(err => {
            console.error('Error updating user: ', err)
        })
    }

    return (
    <div>
        <h2>{user.first_name}</h2>
        <p>{user.email}</p>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Имя' value={user.first_name} onChange={(e) => setUser({...user, first_name:e.target.value})}/>
            <input type="email" placeholder='e-mail' value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
            <button type='submit'>Сохранить изменения</button>
        </form>
    </div>
  )
}

export default UserPage