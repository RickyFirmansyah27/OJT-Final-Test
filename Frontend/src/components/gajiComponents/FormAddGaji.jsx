import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddGaji = () => {
  const [gajipokok, setgajipokok] = useState(2100000);
  const [gajilembur, setgajilembur] = useState(0);
  const [claimbiaya, setclaimbiaya] = useState(0);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveGaji = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/gaji", {
        gajipokok: gajipokok,
        gajilembur: gajilembur,
        claimbiaya: claimbiaya
      });
      navigate("/gaji");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Gaji</h1>
      <h2 className="subtitle">Add New Gaji</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveGaji}>
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
                    type="inteher"
                    className="input"
                    value={gajilembur}
                    onChange={(e) => setgajilembur(e.target.value)}
                    placeholder="Gaji Lembur"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Gaji Lembur</label>
                <div className="control">
                  <input
                    type="inteher"
                    className="input"
                    value={claimbiaya}
                    onChange={(e) => setclaimbiaya(e.target.value)}
                    placeholder="Claim Biaya"
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

export default FormAddGaji;
