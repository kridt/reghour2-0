import React from "react";
import { Link } from "react-router-dom";
import { listOfDates } from "../components/GetListOfArrays";

export default function Lonkort() {
  const timePeriode = listOfDates;

  return (
    <div>
      <Link style={{ color: "white" }} to={"/dashboard"}>
        Back
      </Link>
      <h1>Lonkort</h1>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Dato</h4>
          <h4>Stempel Ind</h4>
          <h4>Stempel Ud</h4>
        </div>
        {timePeriode.map((date) => {
          const dateId = date.toISOString().slice(0, 10);
          console.log(dateId);
          return (
            <>
              <div key={date}>
                <p>{date.toLocaleDateString()}</p>
              </div>
            </>
          );
        })}
      </section>
    </div>
  );
}
