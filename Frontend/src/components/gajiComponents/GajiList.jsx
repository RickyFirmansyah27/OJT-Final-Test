import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import { getDataGaji } from "../../features/gajiSlice";

const GajiList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
 
  useEffect(() => {
    dispatch(getDataGaji());
  }, [dispatch]);

  const gajis = useSelector((state) => state.gaji.data);

  const user = useSelector((state) => state.auth.user);

  const deleteProduct = async (gajiId) => {
    await axios.delete(`http://localhost:5000/gaji/${gajiId}`);
    dispatch(getDataGaji());
  };

  return (
    <div>
      <h1 className="title">Pendanaan</h1>
      <h2 className="subtitle">Daftar gaji</h2>
      <Link to="/gaji/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Gaji Pokok</th>
            <th>Gaji Lembur</th>
            <th>Claim Biaya</th>
            <th>Nama</th>
            {(user.role === "admin" || user.role === "HR") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {gajis && gajis.map((gaji, index) => (
            <tr key={gaji.uuid}>
              <td>{index + 1}</td>
              <td>{gaji.gajipokok}</td>
              <td>{gaji.gajilembur}</td>
              <td>{gaji.claimbiaya}</td>
              <td>{gaji.user.name}</td>
              {(user.role === "admin" || user.role === "HR") && (
                <td>
                  <Link
                    to={`/gaji/edit/${gaji.uuid}`}
                    className="button is-small is-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(gaji.uuid)}
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

export default GajiList;
