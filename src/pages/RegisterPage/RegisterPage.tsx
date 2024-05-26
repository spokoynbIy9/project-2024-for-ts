import { FC, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../RegisterPage/RegisterPage.module.css";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const defaultForm = {
    name: "",
    email: "",
    password: "",
    avatar: "",
  } as const;
  type FormKeys = keyof typeof defaultForm;
  const config: { label: string; name: FormKeys; type: string }[] = [
    {
      label: "Имя",
      name: "name",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Пароль",
      name: "password",
      type: "password",
    },
    {
      label: "Ссылка на аватарку",
      name: "avatar",
      type: "text",
    },
  ];
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, []);

  const makeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser(JSON.parse(localStorage.getItem("user") || "{}")));
      dispatch(setToken(localStorage.getItem("token") || ""));

      navigate("/profile");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };
  return (
    <>
      <h1 className={styles.title}>Регистрация</h1>
      <form onSubmit={submit} className={styles.form}>
        {config.map((el: { label: string; name: FormKeys; type: string }) => (
          <div key={el.name}>
            <label>
              {el.label}
              <input
                type={el.type}
                name={el.name}
                value={formData[el.name]}
                onChange={makeChange}
              />
            </label>
          </div>
        ))}
        <button type="submit">Зарегистрироваться</button>
        <Link to="/login">Аккаунт уже есть</Link>
      </form>
    </>
  );
};

export default RegisterPage;
