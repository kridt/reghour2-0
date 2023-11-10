import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import AdminNav from "../components/AdminNav";
import { Link } from "react-router-dom";
import GoogleMaps from "../components/GoogleMaps";

export default function Admin() {
  const { currentUser } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    database
      .collection("users")
      .get()
      .then((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAllUsers(users);
      });
  }, []);

  console.log(allUsers);
  return (
    <div>
      <h1>Admin</h1>
      <AdminNav />

      <div>
        <h2>Users</h2>
        <p>Here you can see all users.</p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.name}>
                <td>
                  <Link
                    style={{ color: "white" }}
                    to={`/adminlonkort/${user.uid}`}
                  >
                    {" "}
                    {user.name}{" "}
                  </Link>
                </td>
                <br />
                <br />
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
