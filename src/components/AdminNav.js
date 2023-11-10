import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/createUser">Lav ny medarbejder</Link>
        </li>
        <li>
          <Link to="/createCustomer">Lav ny kunde</Link>
        </li>
        <li>
          <Link to="/lonkort">Lønkort</Link>
        </li>
      </ul>
    </nav>
  );
}
