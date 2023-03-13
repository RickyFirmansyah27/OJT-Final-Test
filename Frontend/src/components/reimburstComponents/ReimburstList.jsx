import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import { getDataReimburst } from "../../features/reimburstSlice";

const ReimburstList = () => {
    const [msg, setMsg] = useState("");
    const [gajiReimburst, setGajiReimburst] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    // const [Reimbursts, setReimburst] = useState([]);

    // useEffect(() => {
    //     getReimburst();
    // }, [gajiReimburst]);

    useEffect(() => {
        dispatch(getDataReimburst());
      }, [dispatch]);
    
      const Reimbursts = useSelector((state) => state.reimburst.data);
    


    const user = useSelector((state) => state.auth.user);

    // const getReimburst = async () => {
    //     const response = await axios.get("http://localhost:5000/Reimburst");
    //     setReimburst(response.data);
    //     console.log(response.data);
    // };

    const deleteData = async (ReimburstId, email) => {
        await axios.delete(`http://localhost:5000/reimburst/${ReimburstId}`);
        await axios.post("http://localhost:5000/reimburst-rejected", {
            email: email,
        });
        // getReimburst();
        dispatch(getDataReimburst());
    };

    const removeData = async (ReimburstId) => {
        await axios.delete(`http://localhost:5000/reimburst/${ReimburstId}`);
        // getReimburst();
        dispatch(getDataReimburst());
    };

    const handleApproveAdmin = async (ReimburstId) => {
        const updatedStatus = "Approved LV1";
        try {
            await axios.patch(`http://localhost:5000/reimburst/${ReimburstId}`, {
                status: updatedStatus,
            });
            // getReimburst();
            dispatch(getDataReimburst());
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const handleApproveHR = async (ReimburstId, email) => {
        const updatedStatus = "Approved";
        try {
            await axios.patch(`http://localhost:5000/reimburst/${ReimburstId}`, {
                status: updatedStatus,
            });
            await axios.post("http://localhost:5000/reimburst-approved", {
                email: email,
            });
            // getReimburst();
            dispatch(getDataReimburst());
            await updateGaji(ReimburstId);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const updateGaji = async (ReimburstId) => {
        try {
            const response = await axios.get(`http://localhost:5000/reimburst/${ReimburstId}`);
            console.log("Data Approved User =", response.data.userId);
            const Approved = response.data.userId;
            const Reimburst = Reimbursts.find((item) => item.userId === Approved);
            console.log(Reimburst)
            const updatedGajiReimburst = gajiReimburst + Reimburst.jumlahBiaya;
            await axios.patch(`http://localhost:5000/gaji/${Approved}`, {
                claimbiaya: updatedGajiReimburst,
            });
            console.log(updatedGajiReimburst);
            setGajiReimburst(updatedGajiReimburst);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (

        <div>
            <h1 className="title">Form Reimburst</h1>
            <h2 className="subtitle">Daftar Reimburst</h2>

            <Link to="/Reimburst/add" className="button is-primary mb-2">
                Add New
            </Link>
            <p className="has-text-centered">{msg}</p>

            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Keterangan</th>
                        <th>Kategori</th>
                        <th>Jumlah Biaya</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                        {(user.role === "admin" || user.role === "HR") && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                {Reimbursts && Reimbursts.map((reimburst, index) => (
                        <tr key={reimburst.uuid}>
                            <td>{index + 1}</td>
                            <td>{reimburst.user.name}</td>
                            <td>{reimburst.keterangan}</td>
                            <td>{reimburst.kategori}</td>
                            <td>{reimburst.jumlahBiaya}</td>
                            <td>{reimburst.date}</td>
                            <td>{reimburst.status}</td>
                            {/* {(user.role === "admin" || user.role === "HR") && (
                                <td>
                                    <Link
                                        to={`/Reimburst/edit/${Reimburst.uuid}`}
                                        className="button is-small is-info"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteData(Reimburst.uuid)}
                                        className="button is-small is-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )} */}


                            {(user.role === "admin" && reimburst.status === 'Pending') && (
                                <td>
                                    <button
                                        onClick={() => handleApproveAdmin(reimburst.uuid)}
                                        className="button is-small is-success"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => deleteData(reimburst.uuid, reimburst.user.email)}
                                        className="button is-small is-danger ml-2"
                                    >
                                        Reject
                                    </button>
                                </td>
                            )}

                            {(user.role === "HR" && reimburst.status === "Approved LV1") && (
                                <td>
                                    <button
                                        onClick={() => handleApproveHR(reimburst.uuid, reimburst.user.email)}
                                        className="button is-small is-success mr-1"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => deleteData(reimburst.uuid, reimburst.user.email)}
                                        className="button is-small is-danger"
                                    >
                                        Reject
                                    </button>
                                </td>
                            )}

                            {((user.role === "HR" ) && reimburst.status === "Approved") && (
                                <td>
                                    <button
                                        onClick={() => removeData(reimburst.uuid)}
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

export default ReimburstList;
