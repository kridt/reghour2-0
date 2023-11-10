import React, { useEffect } from "react";
import "./Dashboard.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [admin, setAdmin] = React.useState(false);

  useEffect(() => {
    currentUser?.uid === "onl32JzYaOPSOVofAU45o7HCzMs2"
      ? setAdmin(true)
      : setAdmin(false);
  }, []);

  console.log(admin);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Menu</h1>

      {admin ? (
        <div>
          <h1>admin</h1>

          <nav>
            <li>
              <Link to="/admin">Admin</Link>
            </li>

            <li>
              <Link to="/stempling">Stempling</Link>
            </li>
            <li>
              <Link to="/lonkort">Lønkort</Link>
            </li>
            <li>
              <Link to="/settings">Instillinger</Link>
            </li>
            <li
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
            >
              Log ud
            </li>
          </nav>
        </div>
      ) : (
        <div>
          <nav>
            <li>
              <Link to="/stempling">Stempling</Link>
            </li>
            <li>
              <Link to="/lønkort">Lønkort</Link>
            </li>
            <li>
              <Link to="/settings">Instillinger</Link>
            </li>
            <li
              onClick={() => {
                auth.signOut();
                navigate("/");
              }}
            >
              Log ud
            </li>
          </nav>
        </div>
      )}
    </div>
  );
}
