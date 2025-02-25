import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userD/User";
import Logout from "./userD/User";
export const store = configureStore({
    reducer: {
        user: userReducer,
        logout: Logout,
    },
});
