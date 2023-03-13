import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditLembur = () => {
    const [keterangan, setketerangan] = useState("");
    const [jamMasuk, setjamMasuk] = useState("");
    const [jamKeluar, setjamKeluar] = useState("");
    const [gajilembur, setgajilembur] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getlemburById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/lembur/${id}`
                );
                setketerangan(response.data.keterangan);
                setjamMasuk(response.data.jamMasuk);
                setjamKeluar(response.data.jamKeluar);
                setgajilembur(response.data.gajilembur);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getlemburById();
    }, [id]);

    const updatelembur = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/lembur/${id}`, {
                keterangan: keterangan,
                jamMasuk: jamMasuk,
                jamKeluar: jamKeluar,
                gajilembur: gajilembur,
            });
            navigate("/lembur");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Form Lembur</h1>
            <h2 className="subtitle">Edit Lembur</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updatelembur}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Keterangan</label>
                                <div className="control">
                                    <input
                                        type="integer"
                                        className="input"
                                        value={keterangan}
                                        onChange={(e) => setketerangan(e.target.value)}
                                        placeholder="Tambah Keterangan"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jam Masuk</label>
                                <div className="control">
                                    <input
                                        type="Date"
                                        className="input"
                                        value={jamMasuk}
                                        onChange={(e) => setjamMasuk(e.target.value)}
                                        placeholder="Jam Masuk"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Jam Keluar</label>
                                <div className="control">
                                    <input
                                        type="Date"
                                        className="input"
                                        value={jamKeluar}
                                        onChange={(e) => setjamKeluar(e.target.value)}
                                        placeholder="Jam Keluar"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Gaji Lembur</label>
                                <div className="control">
                                    <input
                                        type="inteher"
                                        className="input"
                                        value={gajilembur}
                                        onChange={(e) => setgajilembur(e.target.value)}
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

export default FormEditLembur;
