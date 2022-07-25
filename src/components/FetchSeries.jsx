import React, { useState, useEffect } from "react";

const FetchSeries = () => {
  const [global, setGlobal] = useState("");
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(
      "https://gateway.marvel.com/v1/public/series?&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        console.log(data.data.total);
        setSeries(data.data.results);
        setGlobal(data.data.total);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Total Series : {global}</h2>
      </div>
    </div>
  );
};

export default FetchSeries;
