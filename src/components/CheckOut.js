import React from "react";
import { database } from "../firebase";

export default function CheckOut({ id }) {
  function handleCheckOut() {
    var options = {
      checkIn: new Date(),
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
    navigator.geolocation.getCurrentPosition(function (position) {
      options.location.lat = position.coords.latitude;
      options.location.lng = position.coords.longitude;
      console.log(options.location.lat, options.location.lng);

      console.log({
        options,
        todayCode,
      });
      database
        .collection("users")
        .doc(id)
        .collection("stempelOut")
        .doc(realCode)
        .set(options);
    });
  }

  return <button onClick={() => handleCheckOut()}>Stemple Ud</button>;
}
