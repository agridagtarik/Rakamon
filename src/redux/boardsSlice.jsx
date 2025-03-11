import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: JSON.parse(localStorage.getItem("allData")) || [],
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
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
      const allData = JSON.parse(localStorage.getItem("allData"));

      const updatedTasks = allData.columns.map((col, i) =>
        i === newColIndex ? { ...col, tasks: [...col.tasks, task] } : col
      );
      const newAllData = { ...allData, columns: updatedTasks };
      localStorage.setItem("allData", JSON.stringify(newAllData));
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

      const board = state.find((board) => board.isActive);
      const column = board.columns.find((col, index) => index === prevColIndex);
      const task = column.tasks.find((task, index) => index === taskIndex);
      task.title = title;
      task.status = status;
      task.description = description;
      task.personel = personel;

      if (prevColIndex === newColIndex) return;
      column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
      const newCol = board.columns.find((col, index) => index === newColIndex);
      newCol.tasks.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.isActive);
      const col = board.columns.find((col, i) => i === payload.colIndex);
      col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    },
  },
});

export default boardsSlice;
