import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser, reset } from "../features/authSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [password, setPassword] = useState("");
    const [confPassword, setconfPassword] = useState("");
    const [role, setRole] = useState("user");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(RegisterUser({ name, email, gender, password, confPassword, role }));
        navigate("/");
    };

    const handleClick = () => {
        window.location.assign("/");
    };


    return (
        <section className="hero is-fullheight is-fullwidth">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <form onSubmit={Auth} className="box">
                                {isError && <p className="has-text-centered">{message}</p>}
                                <h1 className="title is-2">Sign Up</h1>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Name"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Gender</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                            >

                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="******"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            className="input"
                                            value={confPassword}
                                            onChange={(e) => setconfPassword(e.target.value)}
                                            placeholder="******"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Role</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button
                                        type="submit"
                                        className="button is-success is-fullwidth"
                                    >
                                        {isLoading ? "Loading..." : "Login"}
                                    </button>
                                </div>

                            </form>
                            <p className="has-text-centered">
                                Sudah punya akun? <Link onClick={handleClick}> Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
