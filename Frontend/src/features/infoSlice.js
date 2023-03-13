import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getDataInfo = createAsyncThunk(
  "info/getDataInfo",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/info");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataInfo.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataInfo.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getDataInfo.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    },
  },
});

export default infoSlice.reducer;
