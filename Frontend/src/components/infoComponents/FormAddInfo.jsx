import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddInfo = () => {
  const [judul, setjudul] = useState('');
  const [konten, setkonten] = useState('');
  const [date, setdate] = useState('');
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/add/info", {
        judul: judul,
        konten: konten,
        date: date
      });
      console.log(response)
      navigate("/info");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Information</h1>
      <h2 className="subtitle">Add New Information</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveInfo}>
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
                <label className="label">Kontent</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={konten}
                    onChange={(e) => setkonten(e.target.value)}
                    placeholder="Konten"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    type="DATE"
                    className="input"
                    value={date}
                    onChange={(e) => setdate(e.target.value)}
                    placeholder="Tanggal"
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

export default FormAddInfo;
