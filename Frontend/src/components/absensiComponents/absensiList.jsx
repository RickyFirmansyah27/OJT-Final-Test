import React, { useEffect, useState } from "react";
import axios from "axios";

const AbsensiList = () => {
    const [absensis, setAbsensis] = useState([]);
    const [msg, setMsg] = useState();
    const [requestCount, setRequestCount] = useState(0)

    useEffect(() => {
        getAbsensi();
    }, []);

    const getAbsensi = async () => {
        const response = await axios.get("http://localhost:5000/absensi");
        setAbsensis(response.data);
    };

    const handleRequest = async (absensiId) => {
        const now = new Date();
        const hour = now.getHours();
        const updatedJam = now.toLocaleTimeString([], {hour12: false});
      
        try {
          const res = await axios.get(`http://localhost:5000/absensi/${absensiId}`);
          const status = res.data.status;
      
          if (status === "Pulang" || status === "Lembur") {
            setMsg("Anda telah melaukan 2x absen hari ini");
            return;
          }
      
          if (status === '-') {
            const updatedStatus = hour < 10 ? "Tepat waktu" : "Telat";
            await axios.patch(`http://localhost:5000/absensi/${absensiId}`, {
                jamMasuk: updatedJam,
                status: updatedStatus,
            });
            setRequestCount(requestCount + 1);
            getAbsensi();
          }
          if (status === 'Tepat waktu' || status === 'Telat') {
              if (hour <= 19) {
                const updatedStatus = "Pulang";
                await axios.patch(`http://localhost:5000/absensi/${absensiId}`, {
                  jamKeluar: updatedJam,
                  status: updatedStatus,
                });
              } else {
                const updatedStatus = "Lembur";
                await axios.patch(`http://localhost:5000/absensi/${absensiId}`, {
                  jamKeluar: updatedJam,
                  status: updatedStatus,
                });
              }
            
            setRequestCount(requestCount + 1);
            getAbsensi();
          }
          
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      };
      
      
   

    const buatAbsensi = async () => {
        const now = new Date();
        const date = now.toISOString().slice(0, 10);
        try {
            await axios.post("http://localhost:5000/absensi", {
                jamMasuk: "",
                jamKeluar: "",
                date: date
            });
            setMsg("Absensi berhasil dibuat");
            getAbsensi();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h2 className="subtitle">Daftar Absensi</h2>
            <button
                onClick={buatAbsensi}
                className="button is-small is-success mb-2"
            >
                Buat Absen
            </button>
            <p className="has-text-centered">{msg}</p>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Jam Masuk</th>
                        <th>Jam Keluar</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {absensis && absensis.map((absensi, index) => (
                        <tr key={absensi.uuid}>
                            <td>{index + 1}</td>
                            <td>{absensi.user.name}</td>
                            <td>{absensi.jamMasuk}</td>
                            <td>{absensi.jamKeluar}</td>
                            <td>{absensi.date}</td>
                            <td>{absensi.status}</td>
                            <td>
                                <button
                                    onClick={() => handleRequest(absensi.uuid)}
                                    className="button is-small is-info"
                                >
                                    Absen
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AbsensiList;
