import { IUser } from "./user";

export type UserInfoProps = {
    user: IUser
    jumpUser: (id: number) => void;
}