import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register"
import Users from "./pages/Users";
import Gaji from "./pages/Gaji";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddGaji from "./pages/AddGaji";
import EditGaji from "./pages/EditGaji";
import Lembur from "./pages/Lembur";
import AddLembur from "./pages/AddLembur";
import EditLembur from "./pages/EditLembur";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/authSlice";
import { useEffect } from "react";
import Reimburst from "./pages/Reimburst";
import AddReimburst from "./pages/AddReimburst";
import EditReimburst from "./pages/EditReimburst";
import Info from "./pages/Info";
import AddInfo from "./pages/AddInfo";
import EditInfo from "./pages/EditInfo";
import Absensi from "./pages/Absensi";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  const isHR = user && (user.role === "HR");
  const isAdmin = user && (user.role === "admin");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {isHR ? (
            <>
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/users" element={<Users />} />
              <Route path="/info" element={<Info />} />
              <Route path="/info/add" element={<AddInfo />} />
              <Route path="/info/edit/:id" element={<EditInfo />} />
              <Route path="/gaji/edit/:id" element={<EditGaji />} />
            </>
          ) : (
            <>
              <Route path="/users" element={<Dashboard />} />
              <Route path="/users/add" element={<Dashboard />} />
              <Route path="/users/edit/:id" element={<Dashboard />} />
              {isAdmin ? (
                <Route path="/gaji/edit/:id" element={<EditGaji />} />
              ) : (
                <Route path="/gaji/edit/:id" element={<Dashboard />} />
              )}
            </>
          )}

          <Route path="/register" element={<Register />} />
          <Route path="/gaji" element={<Gaji />} />
          <Route path="/gaji/add" element={<AddGaji />} />
          <Route path="/lembur" element={<Lembur />} />
          <Route path="/lembur/add" element={<AddLembur />} />
          <Route path="/lembur/edit/:id" element={<EditLembur />} />

          <Route path="/reimburst" element={<Reimburst />} />
          <Route path="/reimburst/add" element={<AddReimburst />} />
          <Route path="/reimburst/edit/:id" element={<EditReimburst />} />

          <Route path="/absensi" element={<Absensi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
