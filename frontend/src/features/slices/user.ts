import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  user: any;
}

const initialState: User = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = {};
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
