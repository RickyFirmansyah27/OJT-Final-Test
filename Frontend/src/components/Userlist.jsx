import React, {  useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getDataUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Userlist = () => {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getUsers = async () => {
  //   const response = await axios.get("http://localhost:5000/users");
  //   setUsers(response.data);
  // };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataUser());
  }, [dispatch]);

  const users = useSelector((state) => state.user.data);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    // getUsers();
    dispatch(getDataUser());
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {users && users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
