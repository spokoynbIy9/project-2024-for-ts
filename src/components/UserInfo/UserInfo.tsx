import { FC } from "react";
import { UserInfoProps } from "../../types/userInfoProps";
import vkImg from "../../assets/vk-zaglushka.jpg";
import styles from "../UserInfo/UserInfo.module.css";
const UserInfo: FC<UserInfoProps> = ({ user, jumpUser }) => {
  return (
    <div className={styles["card"]} onClick={() => jumpUser(user.id)}>
      <img className={styles["card-img"]} src={user.avatar || vkImg} alt="" />
      <p>{user.first_name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserInfo;
