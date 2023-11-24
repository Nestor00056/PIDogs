import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../helpers/Fetch";

export const GetData = createAsyncThunk("data/getAllData", fetchData);
