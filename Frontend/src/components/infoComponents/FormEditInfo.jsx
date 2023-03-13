import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditInfo = () => {
    const [judul, setjudul] = useState("");
    const [konten, setkonten] = useState("");
    const [date, setdate] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getInfoById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/info/${id}`
                );
                setjudul(response.data.judul);
                setkonten(response.data.konten);
                setdate(response.data.date);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getInfoById();
    }, [id]);

    const updateinfo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/info/${id}`, {
                judul: judul,
                konten: konten,
                date: date
            });
            navigate("/info");
            console.log(response)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className="title">Information</h1>
            <h2 className="subtitle">Edit info</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateinfo}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Judul</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={judul}
                                        onChange={(e) => setjudul(e.target.value)}
                                        placeholder="Judul"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Konten</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={konten}
                                        onChange={(e) => setkonten(e.target.value)}
                                        placeholder="add issue"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Tanggal</label>
                                <div className="control">
                                    <input
                                        type="Date"
                                        className="input"
                                        value={date}
                                        onChange={(e) => setdate(e.target.value)}
                                        placeholder="info Lembur"
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

export default FormEditInfo;
