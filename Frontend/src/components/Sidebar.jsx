import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoPricetag, IoHome, IoLogOut, IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 has-shadow">

        {user && user.role === "user" && (
          <div>
            <p className="menu-label">User</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/dashboard"}>
                  <IoHome /> Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to={"/lembur"}>
                  <IoPerson /> Pengajuan Lembur
                </NavLink>
              </li>

              <li>
                <NavLink to={"/reimburst"}>
                  <IoPerson /> Claim Reimburst
                </NavLink>
              </li>


              <li>
                <NavLink to={"/gaji"}>
                  <IoPricetag /> Report Gaji
                </NavLink>
              </li>

            </ul>
          </div>
        )}

        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/dashboard"}>
                  <IoHome /> Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to={"/lembur"}>
                  <IoPerson /> Pengajuan Lembur
                </NavLink>
              </li>

              <li>
                <NavLink to={"/reimburst"}>
                  <IoPerson /> Claim Reimburst
                </NavLink>
              </li>

              <li>
                <NavLink to={"/gaji"}>
                  <IoPricetag /> Report Gaji
                </NavLink>
              </li>

            </ul>
          </div>
        )}

        {user && user.role === "HR" && (
          <div>
            <p className="menu-label">HRD</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/dashboard"}>
                  <IoHome /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/lembur"}>
                  <IoPerson /> Pengajuan Lembur
                </NavLink>
              </li>
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Data Pengguna
                </NavLink>
              </li>

              <li>
                <NavLink to={"/gaji"}>
                  <IoPerson /> Report Gaji
                </NavLink>
              </li>

              <li>
                <NavLink to={"/reimburst"}>
                  <IoPerson /> Claim Reimburst
                </NavLink>
              </li>

              <li>
                <NavLink to={"/info"}>
                  <IoPerson /> Informasi
                </NavLink>
              </li>

            </ul>
          </div>
        )}

          <p className="menu-label">Form Absensi</p>
          <ul className="menu-list">
            <li>
              <NavLink to={"/absensi"}>
                <IoAdd /> Absensi
              </NavLink>
            </li>

           
          </ul>
        


        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
