import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import gajiSlice from '../features/gajiSlice';
import infoSlice from '../features/infoSlice';
import lemburSlice from '../features/lemburSlice';
import ReimburstSlice from '../features/reimburstSlice';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gaji: gajiSlice,
    lembur: lemburSlice,
    user: userSlice,
    reimburst: ReimburstSlice,
    info: infoSlice
  },
});
