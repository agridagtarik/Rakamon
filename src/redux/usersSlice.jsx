import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: JSON.parse(localStorage.getItem("allData"))?.personel || [],
  reducers: {
    addUser: (state, action) => {
      const { name, identification, userName, password, status } =
        action.payload;
      const task = {
        name,
        identification,
        userName,
        password,
        status,
      };
      console.log(task);
    },
    // editTask: (state, action) => {
    //   //   const { name, identification, userName, password, status } =
    //   //     action.payload;
    //   //   user.name = name;
    //   //   user.identification = identification;
    //   //   user.userName = userName;
    //   //   user.password = password;
    //   //   user.status = status;
    // },
  },
});

export default usersSlice;
