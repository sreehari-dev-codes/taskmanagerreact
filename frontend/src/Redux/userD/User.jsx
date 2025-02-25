import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        email: "",
        id: "",
        role: "",
    },

    reducers: {
        setUser: (state, action) => {
            console.log("Action Payload:", action.payload);
            const { _id, name, email, role } = action.payload;
            console.log("_idddddddd",_id);
            state.name = name;
            state.email = email;
            state.id = _id;
            state.role = role;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
