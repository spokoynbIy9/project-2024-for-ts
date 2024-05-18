import { useEffect, useState } from "react"
import styles from "./UsersPage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FC } from 'react'
import {IUser} from "../../types/user"
import vkImg from "../../assets/vk-zaglushka.jpg"
import Pagination from "../Pagination/Pagination"
import { Link } from "react-router-dom"
const UsersPage: FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<IUser[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('');
  const [startsWithLetter, setStartsWithLetter] = useState("");
  const [notStartsWithLetter, setNotStartsWithLetter] = useState("");

  const jumpUser = (userId : number)=>{
    navigate(`/users/${userId}`)
  }
  
  useEffect(() => {
    const fetchPage = async () => {
      const response = await axios.get(`http://localhost:3000/users`,{
        params:{
          currentPage,
          filter,
          searchTerm,
          startsWithLetter,
          notStartsWithLetter,
        }
      })
      const {totalPages, users: fetchUsers} = response.data;
      setTotalPages(totalPages)
      setUsers(fetchUsers)
    }
    fetchPage()
  }, [currentPage, searchTerm, filter, startsWithLetter, notStartsWithLetter])
  
  const searchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  } 
  const filterChange = (selectedFilter: string) => {
    setFilter(selectedFilter)
  }

  const startsWithChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartsWithLetter(e.target.value);
  };

  const notStartsWithChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotStartsWithLetter(e.target.value);
  };
  

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{display:"flex", gap:"20px"}}>
          <input type="text" placeholder="Поиск" value={searchTerm} onChange={searchChange}/>
          <input
              type="text"
              placeholder="Имя должно начинаться с данной буквы"
              value={startsWithLetter}
              onChange={startsWithChange}
            />
          <input
            type="text"
            placeholder="Имя не должно начинаться с этой буквы"
            value={notStartsWithLetter}
            onChange={notStartsWithChange}
          />
          <button onClick={() => filterChange('even')}>Четные id</button>
          <button onClick={() => filterChange('odd')}>Нечетные id</button>
          <button onClick={() => filterChange('all')}>Все id</button>
        </div>
        <Link to="/profile" style={{fontSize:"24px", textDecoration:"none", color: "black"}}>Перейти к просмотру своего профиля</Link>
      </div>
      <div className={styles["another-users"]} style={{marginTop: "20px"}}>
        {users.map((user) => (
          <div key={user.id} className={styles["card"]} onClick={() => jumpUser(user.id)}>
            <img className={styles["card-img"]} src={ user.avatar != "" ?  user.avatar : vkImg} alt="" />
            <p>{user.first_name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></Pagination>
    </div>
  )
}

export default UsersPage