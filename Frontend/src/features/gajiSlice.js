import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getDataGaji = createAsyncThunk(
  "gaji/getDataGaji",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/gaji");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const gajiSlice = createSlice({
  name: "gaji",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataGaji.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataGaji.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getDataGaji.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    },
  },
});

export default gajiSlice.reducer;
