import React, { useEffect, useState } from "react";

export default function ReturnOfSaleryDay({ date, lonkort, dateCode }) {
  const newDateCode = dateCode.replaceAll(".", "");

  const [todaysWorkHours, setTodaysWorkHours] = useState({});

  console.log(lonkort);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "250px",
        }}
      >
        {/* <p>{dateCode}</p>
        <p>{todaysWorkHours?.totalWorkHours}</p> */}
      </div>
    </div>
  );
}
