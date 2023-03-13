import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../features/authSlice';
import { getDataInfo } from '../../features/infoSlice'
import { Link } from 'react-router-dom';
import axios from 'axios';


function InfoList() {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDataInfo());
  }, [dispatch]);

  const infos = useSelector((state) => state.info.data);
  const user = useSelector((state) => state.auth.user);

  const deleteInfo = async (infoId) => {
    await axios.delete(`http://localhost:5000/info/${infoId}`);
    dispatch(getDataInfo());
  };

  const handleFileChange = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const response = await axios.post('http://localhost:5000/info', formData);
      if (response.status === 200) {
        dispatch(getDataInfo());
        setMsg('Success Add Info')
      }
    } catch (err) {
      console.error(err);
      setMsg('Failed Upload Data')
    }
  };



  return (
    <div>
     <h2 className="subtitle">Information</h2>
      <Link to="/info/add" className="button is-primary mb-2">
        Add New
      </Link>
      <button
        className="button is-primary is-success ml-2 mb-2"
      >
        <input
          className="file-input"
          type="file"
          onChange={handleFileChange}
          name="upload"
          accept=".xlsx"
          required
        />
        Import
      </button>
      <p className="has-text-centered">{msg}</p>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Konten</th>
            <th>Tanggal</th>
            {(user.role === "HR") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {infos && infos.map((info, index) => (
            <tr key={info.id}>
              <td>{index + 1}</td>
              <td>{info.judul}</td>
              <td>{info.konten}</td>
              <td>{info.date}</td>
              {(user.role === "HR") && (
                <td>
                  <Link
                    to={`/info/edit/${info.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteInfo(info.id)}
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



export default InfoList;
