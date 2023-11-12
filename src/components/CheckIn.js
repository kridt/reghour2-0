import axios from "axios";
import React from "react";
//import { database } from "../firebase";

export default function CheckIn({ id }) {
  console.log(id);
  // const [todaysCheckIn, setTodaysCheckIn] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  function handleCheckIn() {
    setLoading(true);
    try {
      /* fetch(
        "https://firebase-express.vercel.app/api/checkin/5wLPctIE9lc8vU7ELNAIw6kevZE2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: "0",
            name: "test",
            time: "test",
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          console.log(data);
        }); */

      axios
        .post(
          "https://firebase-express.vercel.app/api/checkin/5wLPctIE9lc8vU7ELNAIw6kevZE2",
          {
            uid: "0",
            name: "test",
            time: "test",
          }
        )
        .then((res) => {
          setLoading(false);
          console.log(res);
        });
    } catch (error) {
      alert(error);
    }
    /* var options = {
      checkIn: {
        time: new Date().toLocaleTimeString(),
        checkInDate: new Date().toLocaleDateString().replaceAll(".", "-"),
      },
      checkOut: null,
      location: {
        lat: 0,
        lng: 0,
      },
    }; */

    /*  var todayCode = new Date().toLocaleDateString().replaceAll(".", "-");
    const realCode =
      todayCode.split("-")[2] +
      "-" +
      todayCode.split("-")[1] +
      "-" +
      todayCode.split("-")[0];
    console.log(realCode); */
    /* 
    navigator.geolocation.getCurrentPosition(function (position) {
      options.location.lat = position.coords.latitude;
      options.location.lng = position.coords.longitude;
      console.log(options.location.lat, options.location.lng);

      etch("https://reghour-express.vercel.app/api/getDagensKode")
        .then((res) => res.json())
        .then((data) => {
          database
            .collection("users")
            .doc(id)
            .collection("tester")
            .doc(data.dagensKode)
            .set(options);
        })
        .finally(() => {
          setLoading(false);
        }); 
      });
      */
  }

  return (
    <>
      <div>
        {loading ? (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            Loading...
          </div>
        ) : (
          <div>
            <button onClick={() => handleCheckIn()}>Stemple Ind</button>
          </div>
        )}
      </div>
    </>
  );
}
