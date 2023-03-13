import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
    const [gajipokok, setgajipokok] = useState("");
    const [userId, setuserId] = useState('');
    const [gajilembur, setgajilembur] = useState("");
    const [claimbiaya, setclaimbiaya] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getGajiById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/gaji/${id}`
                );
                setuserId(response.data.userId)
                setgajipokok(response.data.gajipokok);
                setgajilembur(response.data.gajilembur);
                setclaimbiaya(response.data.claimbiaya);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getGajiById();
    }, [id]);

    const updateGaji = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/gaji/${userId}`, {
                gajipokok: gajipokok,
                gajilembur: gajilembur,
                claimbiaya: claimbiaya
            });
            navigate("/gaji");
            console.log(response)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Gaji</h1>
            <h2 className="subtitle">Edit Gaji</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateGaji}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Gaji Pokok</label>
                                <div className="control">
                                    <input
                                        type="integer"
                                        className="input"
                                        value={gajipokok}
                                        onChange={(e) => setgajipokok(e.target.value)}
                                        placeholder="Gaji Anda"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gaji Lembur</label>
                                <div className="control">
                                    <input
                                        type="Integer"
                                        className="input"
                                        value={gajilembur}
                                        onChange={(e) => setgajilembur(e.target.value)}
                                        placeholder="Gaji Lembur"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Claim Biaya</label>
                                <div className="control">
                                    <input
                                        type="Integer"
                                        className="input"
                                        value={claimbiaya}
                                        onChange={(e) => setclaimbiaya(e.target.value)}
                                        placeholder="Gaji Lembur"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormEditProduct;
