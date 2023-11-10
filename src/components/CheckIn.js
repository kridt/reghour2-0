import React, { useEffect } from "react";
import { database } from "../firebase";

export default function CheckIn({ id }) {
  console.log(id);
  const [todaysCheckIn, setTodaysCheckIn] = React.useState(null);

  useEffect(() => {
    fetch("https://reghour-express.vercel.app/api/getDagensKode")
      .then((res) => res.json())
      .then((data) => {
        setTodaysCheckIn(data.dagensKode);
      });
  }, []);

  function handleCheckIn() {
    var options = {
      checkIn: new Date().toLocaleDateString().replaceAll(".", "-"),
      location: {
        lat: 0,
        lng: 0,
      },
    };

    var todayCode = new Date().toLocaleDateString().replaceAll(".", "-");
    const realCode =
      todayCode.split("-")[2] +
      "-" +
      todayCode.split("-")[1] +
      "-" +
      todayCode.split("-")[0];
    console.log(realCode);
    navigator.geolocation.getCurrentPosition(function (position) {
      options.location.lat = position.coords.latitude;
      options.location.lng = position.coords.longitude;
      console.log(options.location.lat, options.location.lng);

      database
        .collection("users")
        .doc(id)
        .collection("nystempling")
        .doc(todaysCheckIn)
        .set(options);
    });
  }

  return <button onClick={() => handleCheckIn()}>Stemple Ind</button>;
}
