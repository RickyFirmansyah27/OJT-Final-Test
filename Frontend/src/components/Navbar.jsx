import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <div className="navbar-item">
              <img alt="logo" src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
            </div>
          </NavLink>


        </div>

        {/* <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <h3>Profile</h3>
            </div>
            <div className="navbar-item">
              <h3>About Me</h3>
            </div>
            <div className="navbar-item">
              <h3>Contact</h3>
            </div>
            <div className="navbar-item">
              <h3>Notification</h3>
            </div>
          </div>
        </div> */}


        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={() => window.open('https://wa.me/+6282281282646')} className="button is-light">
                  Contact Admin
                </button>

                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
