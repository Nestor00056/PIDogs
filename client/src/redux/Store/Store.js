import { configureStore } from "@reduxjs/toolkit";
import DataReducer from "../Reducer/MainReducer";
import thunk from "redux-thunk";

const Store = configureStore({
  reducer: {
    data: DataReducer,
  },
  middleware: [thunk],
});

export default Store;
