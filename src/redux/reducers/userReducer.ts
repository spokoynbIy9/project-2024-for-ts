import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { User } from "../types";
import { UserState } from "../types";

const initialState: UserState = {
    user: null,
    token: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      },
      setToken: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
      },
      updateUser: (state, action: PayloadAction<User>) => {
        if (state.user) {
          state.user = { ...state.user, ...action.payload };
        }
      },
      resetUser: (state) => {
        state.user = null;
        state.token = null;
      },
    },
  });
  
  export const { setUser, setToken, updateUser, resetUser } = userSlice.actions;
  
  export default userSlice.reducer;