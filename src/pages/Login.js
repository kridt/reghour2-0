import React, { useContext, useEffect, useState } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }

    /*  fetch("https://reghour-express.vercel.app/api/getDagensKode")
      .then((res) => res.json())
      .then((data) => console.log(data)); */
  }, []);

  async function handleSubmit(data) {
    const { email, password } = data.target.elements;
    data.preventDefault();

    try {
      setError("");
      await login(email.value, password.value);
      navigate("/dashboard");
    } catch (error) {
      setError("Noget gik galt");
    }
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Log ind</h1>
      <br />
      <br />

      <form
        onSubmit={(data) => handleSubmit(data)}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "350px" }}>
          <div>
            <input type="text" placeholder="Email" name="email" />
          </div>
          <br />
          <div>
            <input type="password" placeholder="adgangskode" name="password" />
          </div>
          <br />
          <br />
          <br />
          <div>
            <input type="submit" value={"Log ind"} />
          </div>
        </div>
      </form>
    </div>
  );
}
