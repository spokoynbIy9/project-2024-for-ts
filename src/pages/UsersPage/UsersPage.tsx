import { useEffect, useReducer, useState } from "react";
import styles from "./UsersPage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { IUser } from "../../types/user";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import SingleLetterInput from "../../components/SingleLetterInput/SingleLetterInput";
import UserInfo from "../../components/UserInfo/UserInfo";
import { FormState } from "../../types/formState";
import { Action } from "../../types/action";
const UsersPage: FC = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState<IUser[]>([]);
  const startedState: FormState = {
    currentPage: 1,
    searchTerm: "",
    filter: "",
    startsWithLetter: "",
    notStartsWithLetter: "",
  };
  const reducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
      case "SET_CURRENT_PAGE":
        return { ...state, currentPage: action.payload };
      case "SET_SEARCH_TERM":
        return { ...state, searchTerm: action.payload };
      case "SET_FILTER":
        return { ...state, filter: action.payload };
      case "SET_STARTS_WITH_LETTER":
        return { ...state, startsWithLetter: action.payload };
      case "SET_NOT_STARTS_WITH_LETTER":
        return { ...state, notStartsWithLetter: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, startedState);

  const jumpUser = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  useEffect(() => {
    const fetchPage = async () => {
      const response = await axios.get(`http://localhost:3000/users`, {
        params: {
          currentPage: state.currentPage,
          filter: state.filter,
          searchTerm: state.searchTerm,
          startsWithLetter: state.startsWithLetter,
          notStartsWithLetter: state.notStartsWithLetter,
        },
      });
      const { totalPages, users: fetchUsers } = response.data;
      setTotalPages(totalPages);
      setUsers(fetchUsers);
    };
    fetchPage();
  }, [
    state.currentPage,
    state.searchTerm,
    state.filter,
    state.startsWithLetter,
    state.notStartsWithLetter,
  ]);

  const makeInputChange = (type: Action["type"], value: any) => {
    dispatch({ type, payload: value });
  };

  return (
    <div className={styles["usersPage-container"]}>
      <div className={styles["searching-filters"]}>
        <label>
          Поиск
          <input
            type="text"
            value={state.searchTerm}
            onChange={(e) => makeInputChange("SET_SEARCH_TERM", e.target.value)}
          />
        </label>
        <SingleLetterInput
          title="Имя должно начинаться с данной буквы"
          value={state.startsWithLetter}
          onChange={(value) => makeInputChange("SET_STARTS_WITH_LETTER", value)}
        />
        <SingleLetterInput
          title="Имя не должно начинаться с этой буквы"
          value={state.notStartsWithLetter}
          onChange={(value) =>
            makeInputChange("SET_NOT_STARTS_WITH_LETTER", value)
          }
        />

        <button onClick={() => makeInputChange("SET_FILTER", "even")}>
          Четные id
        </button>
        <button onClick={() => makeInputChange("SET_FILTER", "odd")}>
          Нечетные id
        </button>
        <button onClick={() => makeInputChange("SET_FILTER", "all")}>
          Все id
        </button>
      </div>
      <div>
        <div className={styles["another-users"]}>
          {users.map((user) => (
            <UserInfo key={user.id} user={user} jumpUser={jumpUser} />
          ))}
        </div>
        <Pagination
          currentPage={state.currentPage}
          setCurrentPage={(page) => makeInputChange("SET_CURRENT_PAGE", page)}
          totalPages={totalPages}
        ></Pagination>
      </div>
      <Link to="/profile" className={styles["link"]}>
        Перейти к просмотру своего профиля
      </Link>
    </div>
  );
};

export default UsersPage;
