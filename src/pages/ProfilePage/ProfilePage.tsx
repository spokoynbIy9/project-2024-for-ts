import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styles from "../ProfilePage/ProfilePage.module.css";
import { FormData } from "../../types/formData";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/reducers";
import { resetUser } from "../../redux/reducers";
type FormKeys = keyof FormData;

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
    label: "Ссылка на аватарку",
    name: "avatar",
    type: "text",
  },
  {
    label: "Старый Пароль",
    name: "password",
    type: "password",
  },
  {
    label: "Новый пароль",
    name: "newPassword",
    type: "password",
  },
];
const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    avatar: "",
    password: "",
    newPassword: "",
  });
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        password: "",
        newPassword: "",
      });
    }
  }, [user]);

  const renderField = (el: { label: string; name: FormKeys; type: string }) => (
    <div key={el.name}>
      <label>
        {el.label}:
        <input
          type={el.type}
          name={el.name}
          value={formData[el.name]}
          onChange={makeChange}
        />
      </label>
    </div>
  );

  const renderPasswordFields = () => (
    <div className={styles["password-container"]}>
      <p className={styles["password-message"]}>
        Для изменения пароля, введите сначала старый
      </p>
      {config
        .filter((el) => el.name === "password" || el.name === "newPassword")
        .map((el) => (
          <label key={el.name}>
            {el.label}
            <input
              type="password"
              name={el.name}
              value={formData[el.name]}
              onChange={makeChange}
            />
          </label>
        ))}
    </div>
  );

  const makeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.put(
      "http://localhost:3000/profile",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    localStorage.setItem("user", JSON.stringify(response.data.user));
    dispatch(updateUser(response.data.user));
    navigate("/profile");
    setTimeout(() => alert("Профиль успешно обновлен"), 500);
  };
  return (
    <div>
      <div className={styles.header}>
        <Link to="/users" className={styles.link}>
          Просмотр других пользователей
        </Link>
        <button
          className={styles["btn-leave"]}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            dispatch(resetUser());
            navigate("/");
          }}
        >
          ВЫЙТИ ИЗ ПРОФИЛЯ
        </button>
      </div>
      <h1 className={styles.title}>Профиль пользователя</h1>

      <div className={styles["flex-container"]}>
        <div>
          <h2>Текущая информация</h2>
          <p>Имя: {user ? user.name : ""}</p>
          <p>Email: {user ? user.email : ""}</p>
          <p>
            Аватар:{" "}
            <img className={styles.img} src={user ? user.avatar : ""} alt="" />
          </p>
        </div>
        <div>
          <h2 className={styles.title}>Редактирование профиля</h2>
          <form onSubmit={submit} className={styles["flex-container"]}>
            {config
              .filter(
                (el) => el.name !== "password" && el.name !== "newPassword"
              )
              .map(renderField)}
            {renderPasswordFields()}
            <button type="submit">Обновить профиль</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
