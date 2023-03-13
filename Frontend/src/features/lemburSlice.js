import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getDatalembur = createAsyncThunk(
  "lembur/getDatalembur",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/lembur");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const lemburSlice = createSlice({
  name: "lembur",
  initialState,
  reducers: {},
  extraReducers: {
    [getDatalembur.pending]: (state) => {
      state.isLoading = true;
    },
    [getDatalembur.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getDatalembur.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    },
  },
});

export default lemburSlice.reducer;
