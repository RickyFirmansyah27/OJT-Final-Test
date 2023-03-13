import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getDataUser = createAsyncThunk(
  "user/getDataUser",
  async (thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getDataUser.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.isSuccess = true;
      state.isLoading = false;
    },
    [getDataUser.rejected]: (state, { payload }) => {
      state.isError = true;
      state.isLoading = false;
      state.message = payload;
    },
  },
});

export default userSlice.reducer;
