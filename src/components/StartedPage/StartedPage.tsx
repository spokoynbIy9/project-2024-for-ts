import { useEffect, useState } from "react"
import styles from "./StartedPage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const StartedPage = () => {
  const navigate = useNavigate()
  const handleUserClick = (userId : number)=>{
    navigate(`/user/${userId}`)
  }
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
    .get("https://reqres.in/api/users?page=2")
    .then((res) => res.data)
    .then((data) => {
      console.log(data.data);
      setUsers(data.data)})
  }, []);

  return (
    <div>
      <input type="text" placeholder="Поиск" />
      <div className={styles["another-users"]}>
        {users.map((user) => (
          <div key={user.id} className={styles["card"]} onClick={() => handleUserClick(user.id)}>
            <img src={ user.avatar} alt="" />
            <p>{user.first_name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StartedPage