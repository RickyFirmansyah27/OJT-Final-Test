import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddReimburst = () => {
    const [keterangan, setKeterangan] = useState("");
    const [kategori, setKategori] = useState('Transport');
    const [date, setDate] = useState("");
    const [jumlahBiaya, setjumlahBiaya] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveReimburst = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("http://localhost:5000/role/HR");
            const email = response.data.email;
            console.log(email);
            await axios.post("http://localhost:5000/reimburst", {
                date: date,
                keterangan: keterangan,
                kategori: kategori,
                jumlahBiaya: jumlahBiaya,
            });
            await axios.post("http://localhost:5000/reimburst-request", {
                email: email,
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
            <h2 className="subtitle">Add New Form</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={saveReimburst}>
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
                                        placeholder="Jumlah Biaya"
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
                                        Save
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

export default FormAddReimburst;
