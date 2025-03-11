import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const slices = createSlice({
  name: "slices",
  initialState: JSON.parse(localStorage.getItem("allData")) || {
    isAuthenticated: false,
    user: null,
    allData: null,
    users: null,
  },
  reducers: {
    login: (state, action) => {
      const user = data.personel.find(
        (person) =>
          person.userName === action.payload.userName &&
          person.identification === action.payload.identification &&
          person.password === action.payload.password
      );
      console.log(user.role, "user");
      if (user) {
        if (user.role === "admin") {
          const newState = {
            isAuthenticated: true,
            user: user,
            allData: data,
            users: data.personel,
          };

          localStorage.setItem("allData", JSON.stringify(newState));

          toast.success("Login Successfull !");
          return newState;
        } else {
          const newState = {
            isAuthenticated: true,
            user: user,
            allData: {
              ...data,
              columns: data.columns.map((column) => ({
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.personel.id === user.id
                ),
              })),
            },
            users: data.personel,
          };

          localStorage.setItem("allData", JSON.stringify(newState));

          toast.success("Login Successfull !");
          return newState;
        }
      } else {
        toast.error("Invalid username, password or identity number !🚨");
      }
    },
    logout: () => {
      toast.warning("Logout Successfull !");

      localStorage.removeItem("allData");

      return { isAuthenticated: false, user: null };
    },
    addTask: (state, action) => {
      const { title, status, description, personel, newColIndex } =
        action.payload;
      const task = {
        title,
        description,
        personel,
        status,
        newColIndex,
      };
      const datas = JSON.parse(localStorage.getItem("allData"));

      const updatedTasks = datas?.allData?.columns.map((col, i) =>
        i === newColIndex ? { ...col, tasks: [...col.tasks, task] } : col
      );
      const newAllData = {
        ...datas,
        allData: { columns: updatedTasks, personel },
      };
      localStorage.setItem("allData", JSON.stringify(newAllData));
      state.allData = newAllData.allData;
    },
    editTask: (state, action) => {
      const {
        title,
        status,
        description,
        personel,
        taskIndex,
        prevColIndex,
        newColIndex,
      } = action.payload;

      const datas = JSON.parse(localStorage.getItem("allData"));
      let updatedData = datas.allData;
      let prevColumn = updatedData.columns[prevColIndex];
      let task = prevColumn.tasks[taskIndex];

      task.title = title;
      task.status = status;
      task.description = description;
      task.personel = personel;

      prevColumn.tasks.splice(taskIndex, 1);
      let newColumn = updatedData.columns[newColIndex];
      newColumn.tasks.push(task);
      task.newColIndex = newColIndex;

      state.allData = updatedData;
      localStorage.setItem(
        "allData",
        JSON.stringify({ ...datas, allData: state.allData })
      );
    },
    deleteTask: (state, action) => {
      const { taskIndex, colIndex } = action.payload;

      const datas = JSON.parse(localStorage.getItem("allData"));
      let updatedData = datas.allData;

      let column = updatedData.columns[colIndex];
      if (!column || !column.tasks[taskIndex]) return;

      column.tasks.splice(taskIndex, 1);

      state.allData = updatedData;
      localStorage.setItem(
        "allData",
        JSON.stringify({ ...datas, allData: state.allData })
      );
    },
    addUser: (state, action) => {
      const { title, identification, userName, password, status } =
        action.payload;
      const user = {
        title,
        identification,
        userName,
        password,
        status,
      };
      const allData = JSON.parse(localStorage.getItem("allData"));
      const allUsers = allData.users;
      const updatedUsers = [
        ...allUsers,
        {
          ...user,
          img: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          id: allUsers.length + 1,
        },
      ];

      state.users = updatedUsers;
      localStorage.setItem(
        "allData",
        JSON.stringify({ ...allData, users: state.users })
      );
    },
  },
});
export default slices;
