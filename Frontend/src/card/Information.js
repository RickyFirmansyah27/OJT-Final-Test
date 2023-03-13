import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataInfo } from "../features/infoSlice";
import { getMe } from "../features/authSlice";

const ShowInfo = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      dispatch(getDataInfo());
    }, [dispatch]);
  
    const infos = useSelector((state) => state.info.data);

    return (
        <>
            <div className="column">
            <h2 className="subtitle">Information</h2>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Konten</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {infos && infos.map((info, index) => (
                            <tr key={info.id}>
                                <td>{index + 1}</td>
                                <td>{info.judul}</td>
                                <td>{info.konten}</td>
                                <td>{info.date}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShowInfo;
