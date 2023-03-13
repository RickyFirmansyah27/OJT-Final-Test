import React from "react";
import { useSelector } from "react-redux";
import ShowInfo from "../card/Information";

import AbsensiList from "./absensiComponents/absensiList";


const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="column">
      <div className="box">

        <h3 className="is-bold">
          Welcome Back <strong>{user && user.name}</strong>
        </h3>
      </div>

      <div className="container">
        <div className="columns ml-1">
          <div className="box">
            <ShowInfo />
          </div>
          <div className="column is-pulled-right">
          <div className="box">
            <AbsensiList />
          </div>
        </div>
        </div>
        

      </div>
    </div>

  );
};

export default Welcome;
