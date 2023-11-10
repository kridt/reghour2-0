import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import { listOfDates } from "../components/GetListOfArrays";
import ReturnOfSaleryDay from "../components/ReturnOfSaleryDay";
import GoogleMaps from "../components/GoogleMaps";

export default function AdminLonkort() {
  const { id } = useParams();
  const [coworker, setCoworker] = useState({});
  const [lonkort, setLonkort] = useState([]);
  const dates = listOfDates;
  const [listOfDayIds, setListOfDayIds] = useState([]);

  function addStregToDate(date) {
    let day = 0;
    let month = 0;
    let year = 0;

    if (date.length === 8) {
      day = date.substring(0, 2);
      month = date.substring(2, 4);
      year = date.substring(4, 8);
    } else if (date.length === 7) {
      day = date.substring(0, 1);
      month = date.substring(1, 3);
      year = date.substring(3, 7);
    } else if (date.length === 6) {
      day = date.substring(0, 1);
      month = date.substring(1, 2);
      year = date.substring(2, 6);
    }
    return day + "-" + month + "-" + year;
  }

  useEffect(() => {
    // fetch data from firestore
    database
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        setCoworker(doc.data());
      })
      .then(() => {
        database
          .collection("users")
          .doc(id)
          .collection("stempel")
          .get()
          .then((querySnapshot) => {
            setLonkort(querySnapshot.docs);

            setListOfDayIds(querySnapshot.docs.map((doc) => doc.id));
          });
      });
    dates.map((date) => {
      const dateCode =
        `${date.getDate()}` + date.getMonth() + date.getFullYear();

      const tester = lonkort.filter((lonkort) => {
        const lonkortDate = parseInt(lonkort.id);
        return lonkortDate === parseInt(dateCode);
      });
      //console.log(tester);
    });
  }, []);

  function tidsberegner(start, slut) {
    if (slut === undefined) {
      slut = "15.00.00";
    }

    var startTidSplit = start.split(".");
    var slutTidSplit = slut.split(".");

    // Omdan tidspunkterne til Date-objekter
    var startTid = new Date(
      0,
      0,
      0,
      startTidSplit[0],
      startTidSplit[1],
      startTidSplit[2]
    );
    var slutTid = new Date(
      0,
      0,
      0,
      slutTidSplit[0],
      slutTidSplit[1],
      slutTidSplit[2]
    );

    var tidsInterval = slutTid - startTid;

    var timer = Math.floor(tidsInterval / (1000 * 60 * 60));
    var minutter = Math.floor((tidsInterval % (1000 * 60 * 60)) / (1000 * 60));
    var sekunder = Math.floor((tidsInterval % (1000 * 60)) / 1000);

    var done =
      timer + " timer, " + minutter + " minutter og " + sekunder + " sekunder.";

    return done;
  }

  //start
  var stampEntries = [
    "2023-10-01",
    "2023-10-02",
    "2023-10-15",
    "2023-10-16",
    "2023-10-03",
    "2023-09-04",
    "2023-09-27",
    "2023-08-07",
  ];

  const periodStartDate = new Date(
    dates[0].getFullYear() +
      "-" +
      dates[1].getMonth() +
      "-" +
      dates[0].getDate()
  );
  const periodEndDate = new Date(
    dates[dates.length - 1].getFullYear() +
      "-" +
      dates[dates.length - 2].getMonth() +
      "-" +
      dates[dates.length - 1].getDate()
  );

  console.log(formatDato(periodStartDate), periodEndDate);

  const filterStamps = () => {
    const startDate = new Date(periodStartDate);
    const endDate = new Date(periodEndDate);

    const filteredStamps = listOfDayIds.filter((stampEntry) => {
      const stampDate = new Date(stampEntry);
      return stampDate >= startDate && stampDate <= endDate;
    });

    // Nu indeholder filteredStamps stempeldata for den aktuelle periode.
    return filteredStamps;
  };

  const filteredStamps = filterStamps();
  //console.log(filteredStamps);
  const testerafstreg = addStregToDate("5102023");

  //slut

  function makeAstempel(e) {
    e.preventDefault();
    const ind = e.target.ind.value;
    const ud = e.target.ud.value;
    const date =
      e.target.date.value.split("-")[2] +
      "-" +
      e.target.date.value.split("-")[1] +
      "-" +
      e.target.date.value.split("-")[0];

    /* database
      .collection("users")
      .doc(id)
      .collection("stempel")
      .doc(date)
      .set({
        stempleInd: {
          dato: date,
          funktion: "stempling ind",
          location: "lavet fra admin",
          time: ind
        },
      }); */

    console.log(ind, ud, date);
  }

  function formatDato(dato) {
    // Få dagen, måneden og år fra den givne dato
    const dag = dato.getDate();
    const måned = dato.getMonth() + 1; // Måneder tælles fra 0 til 11, så tilføj 1
    const år = dato.getFullYear();

    // Opret en streng med formatet "DD/MM"
    const format = `${dag < 10 ? "0" : ""}${dag}/${
      måned < 10 ? "0" : ""
    }${måned}`;

    return format;
  }

  return (
    <div>
      <h1>AdminLonkort</h1>

      <h2>Medarbejder: {coworker?.name}</h2>

      <p>
        valgte periode:{" "}
        {`${formatDato(dates[0])}` +
          " til den " +
          `${formatDato(dates[dates.length - 1])}`}
      </p>
      {/* <div>
        {dates.map((date) => {
          const dateCode =
            date.getDate() + "." + date.getMonth() + "." + date.getFullYear();

          return (
            <>
              <ReturnOfSaleryDay
                lonkort={lonkort}
                dateCode={dateCode}
                date={dates}
              />

            </>
          );
        })}
      </div> */}
      {filteredStamps?.map((lonkorter) => {
        console.log(filterStamps());

        const lonkorts = lonkort.find((e) => e.id === lonkorter);
        /* let inCurretPeriod = dates.sort((date) => {
          let dateCode =
            date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();

          return lonkort?.id === dateCode;
        }); */
        // console.log(inCurretPeriod);
        const latitude = lonkorts.data()?.stemplingInd?.location?.latitude;
        const longitude = lonkorts.data()?.stemplingInd?.location?.longitude;

        const stempleInd = lonkorts.data().stemplingInd?.time;
        const stempleUd = lonkorts.data().stemplingUd?.time;

        const workedHours =
          parseInt(stempleUd?.split(":")[0]) -
          parseInt(stempleInd?.split(":")[0]);

        const workedMinutes =
          parseInt(stempleUd?.split(".")[1]) -
          parseInt(stempleInd?.split(".")[1]);

        const totalWorkHours = workedHours + ":" + workedMinutes;

        const test = tidsberegner(stempleInd, stempleUd);

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "500px",
              border: "1px solid White",
              marginBottom: "7em",
            }}
          >
            <div>
              <strong>{lonkorts?.id}</strong>
              <p>{lonkorts.data().stemplingInd.dato} </p>
              <p> - </p>
              <p> {lonkorts.data().stemplingInd?.time} </p>
              <p> - </p>
              <p> {lonkorts.data().stemplingUd?.time} </p>

              <p>{test}</p>
            </div>

            {/* <GoogleMaps latitude={latitude} longitude={longitude} /> */}
          </div>
        );
      })}

      <div>lav et stempel for denne Medarbejder</div>
      <form onSubmit={(e) => makeAstempel(e)}>
        <div>
          <input id="date" type="date" />
        </div>
        <div>
          <p>ind</p>
          <input id="ind" type="time" />
        </div>
        <div>
          <p>ud</p>
          <input id="ud" type="time" />
        </div>

        <button type="submit">lav stempel</button>
      </form>
    </div>
  );
}
