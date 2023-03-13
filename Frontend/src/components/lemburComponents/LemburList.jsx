import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import { getDatalembur } from "../../features/lemburSlice";

const LemburList = () => {
    const [msg, setMsg] = useState("");
    const [gajilembur, setGajiLembur] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    // const [Lemburs, setLembur] = useState([]);

    // useEffect(() => {
    //     getLembur();
    // }, [gajilembur]);

    useEffect(() => {
        dispatch(getDatalembur());
    }, [dispatch]);

    const Lemburs = useSelector((state) => state.lembur.data);



    const user = useSelector((state) => state.auth.user);

    // const getLembur = async () => {
    //     const response = await axios.get("http://localhost:5000/lembur");
    //     setLembur(response.data);
    //     console.log(response.data);
    // };

    const deleteData = async (lemburId, email) => {
        console.log("Email User - ",email)
        await axios.delete(`http://localhost:5000/lembur/${lemburId}`);
        await axios.post("http://localhost:5000/overtime-rejected", {
            email: email,
        });

        // getLembur();
        dispatch(getDatalembur());
    };

    const removeData = async (lemburId) => {
        await axios.delete(`http://localhost:5000/lembur/${lemburId}`);
        // getLembur();
        dispatch(getDatalembur());
    };

    const handleApproveAdmin = async (lemburId) => {
        const updatedStatus = "Approved LV1";
        try {
            await axios.patch(`http://localhost:5000/lembur/${lemburId}`, {
                status: updatedStatus,
            });
            // getLembur();
            dispatch(getDatalembur());
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleApproveHR = async (lemburId, email) => {
        const updatedStatus = "Approved";
        try {
            await axios.patch(`http://localhost:5000/lembur/${lemburId}`, {
                status: updatedStatus,
            });
            await axios.post("http://localhost:5000/overtime-approved", {
                email: email,
            });
            // getLembur();
            dispatch(getDatalembur());
            await updateGaji(lemburId);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const updateGaji = async (lemburId) => {
        try {
            const response = await axios.get(`http://localhost:5000/lembur/${lemburId}`);
            console.log("Data Approved User =", response.data.userId);
            const Approved = response.data.userId;
            const lembur = Lemburs.find((item) => item.userId === Approved);
            console.log(lembur)
            const updatedGajiLembur = gajilembur + lembur.gajilembur;
            await axios.patch(`http://localhost:5000/gaji/${Approved}`, {
                gajilembur: updatedGajiLembur,
            });
            console.log(updatedGajiLembur);
            setGajiLembur(updatedGajiLembur);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (

        <div>
            <h1 className="title">Form Lembur</h1>
            <h2 className="subtitle">Daftar Lembur</h2>

            <Link to="/lembur/add" className="button is-primary mb-2">
                Add New
            </Link>
            <p className="has-text-centered">{msg}</p>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Keterangan</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar</th>
                        <th>Gaji Lembur</th>
                        <th>Nama</th>
                        <th>Status</th>
                        {(user.role === "admin" || user.role === "HR") && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {Lemburs && Lemburs.map((lembur, index) => (
                        <tr key={lembur.uuid}>
                            <td>{index + 1}</td>
                            <td>{lembur.keterangan}</td>
                            <td>{lembur.jamMasuk}</td>
                            <td>{lembur.jamKeluar}</td>
                            <td>{lembur.gajilembur}</td>
                            <td>{lembur.user.name}</td>
                            <td>{lembur.status}</td>
                            {/* {(user.role === "admin" || user.role === "HR") && (
                                <td>
                                    <Link
                                        to={`/lembur/edit/${lembur.uuid}`}
                                        className="button is-small is-info"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteData(lembur.uuid)}
                                        className="button is-small is-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )} */}


                            {(user.role === "admin" && lembur.status === 'Pending') && (
                                <td>
                                    <button
                                        onClick={() => handleApproveAdmin(lembur.uuid)}
                                        className="button is-small is-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => deleteData(lembur.uuid, lembur.user.email)}
                                        className="button is-small is-danger ml-2"
                                    >
                                        Reject
                                    </button>

                                </td>
                            )}

                            {(user.role === "HR" && lembur.status === "Approved LV1") && (
                                <td>
                                    <button
                                        onClick={() => handleApproveHR(lembur.uuid)}
                                        className="button is-small is-success"
                                    >
                                        Approved
                                    </button>
                                    <button
                                        onClick={() => deleteData(lembur.uuid, lembur.user.email)}
                                        className="button is-small is-danger ml-1"
                                    >
                                        Reject
                                    </button>
                                </td>
                            )}

                            {((user.role === "HR") && lembur.status === "Approved") && (
                                <td>
                                    <button
                                        onClick={() => removeData(lembur.uuid)}
                                        className="button is-small is-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LemburList;
