import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditReimburst = () => {
    const [keterangan, setKeterangan] = useState('');
    const [kategori, setKategori] = useState("Transport");
    const [jumlahBiaya, setjumlahBiaya] = useState("");
    const [date, setDate] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getReimburstById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/reimburst/${id}`
                );
                setKategori(response.data.kategori);
                setjumlahBiaya(response.data.jumlahBiaya);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getReimburstById();
    }, [id]);

    const updateReimburst = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/reimburst/${id}`, {
                kategori: kategori,
                jumlahBiaya: jumlahBiaya,
            });
            navigate("/reimburst");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Form reimburst</h1>
            <h2 className="subtitle">Edit reimburst</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateReimburst}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Keterangan</label>
                                <div className="control">
                                    <input
                                        type="Integer"
                                        className="input"
                                        value={keterangan}
                                        onChange={(e) => setKeterangan(e.target.value)}
                                        placeholder="Keterangan"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Kategori</label>
                                <div className="select is-fullwidth">
                                    <select
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                    >
                                        <option value="Tranport">Transport</option>
                                        <option value="Internet">Internet</option>
                                        <option value="Snack">Snack</option>
                                        <option value="Makan">Makan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jumlah Biaya</label>
                                <div className="control">
                                    <input
                                        type="Integer"
                                        className="input"
                                        value={jumlahBiaya}
                                        onChange={(e) => setjumlahBiaya(e.target.value)}
                                        placeholder="Biaya"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">date</label>
                                <div className="control">
                                    <input
                                        type="Date"
                                        className="input"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="date"
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

export default FormEditReimburst;
