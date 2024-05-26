import { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../LoginPage/LoginPage.module.css";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../redux/reducers";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);
  const makeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
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
      console.error("Ошибка при входе:", error);
    }
  };
  return (
    <>
      <h1 className={styles.title}>Авторизация</h1>
      <form onSubmit={submit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={makeChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={makeChange}
          required
        />
        <button type="submit">Войти</button>
        <Link to="/">Нет аккаунта, хотел бы зарегистрироваться</Link>
      </form>
    </>
  );
};

export default LoginPage;
