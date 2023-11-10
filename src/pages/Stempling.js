import React from "react";
import { Link } from "react-router-dom";
import CheckIn from "../components/CheckIn";
import { useAuth } from "../context/AuthContext";
import CheckOut from "../components/CheckOut";

export default function Stempling() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Link style={{ color: "white" }} to={"/dashboard"}>
        Back
      </Link>
      <h1>Stempling</h1>

      <CheckIn id={currentUser.uid} />
      <CheckOut id={currentUser.uid} />
    </div>
  );
}
