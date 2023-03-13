import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getDataReimburst = createAsyncThunk(
  "reimburst/getDatareimburst",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/reimburst");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const reimburstSlice = createSlice({
  name: "reimburst",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataReimburst.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataReimburst.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getDataReimburst.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    },
  },
});

export default reimburstSlice.reducer;
