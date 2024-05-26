export const SET_USER = "SET_USER"
export const SET_TOKEN = "SET_TOKEN"

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}
export interface UserState{
    user: User | null;
    token: string | null;
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SetTokenAction {
    type: typeof SET_TOKEN;
    payload: string;
}

export type UserActionTypes = SetUserAction | SetTokenAction

