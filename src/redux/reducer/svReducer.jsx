import { createSlice } from "@reduxjs/toolkit";
const studentStore =
  localStorage.getItem("arrSV") !== null
    ? JSON.parse(localStorage.getItem("arrSV"))
    : [];
const initialState = {
  arrList: studentStore,
  arrEdit: { id: "0", name: "", phone: "", email: "" },
  arrSearch: [],
};
const svReducer = createSlice({
  name: "svReducer",
  initialState,
  reducers: {
    //Add student
    studentNew: (state, action) => {
      state.arrList.push(action.payload);
      //Store in LocalStorage
      localStorage.setItem(
        "arrSV",
        JSON.stringify(state.arrList.map((sv) => sv))
      );
    },
    //Delete student
    studentDel: (state, action) => {
      const studentDel = action.payload;
      state.arrList = state.arrList.filter(
        (student) => student.id !== studentDel
      );
      //Store in LocalStorage
      localStorage.setItem(
        "arrSV",
        JSON.stringify(state.arrList.map((sv) => sv))
      );
    },
    //Get value student
    studentEdit: (state, action) => {
      state.arrEdit = action.payload;
    },
    //Update student
    studentUpdate: (state, action) => {
      const svUpdate = action.payload;
      const index = state.arrList.findIndex((x) => x.id === svUpdate.id);
      if (index !== -1) {
        state.arrList[index] = action.payload;
      }
      //Store in LocalStorage
      localStorage.setItem(
        "arrSV",
        JSON.stringify(state.arrList.map((sv) => sv))
      );
    },
    //Search student
    studentSearch: (state, action) => {
      const keyStudent = action.payload;
      const searchKey = state.arrList.filter(
        (sv) =>
          sv.name === keyStudent ||
          sv.phone === keyStudent ||
          sv.email === keyStudent
      );
      state.arrSearch = searchKey;
    },
  },
});
export const {
  studentDel,
  studentNew,
  studentEdit,
  studentUpdate,
  studentSearch,
} = svReducer.actions;
export default svReducer.reducer;
