import React, { useEffect, useState } from "react";

const FetchComics = () => {
  const [global, setGlobal] = useState("");
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    fetch(
      "https://gateway.marvel.com/v1/public/comics?limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        console.log(data.data.total);
        setComics(data.data.results);
        setGlobal(data.data.total);
        setCount(data.data.count);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="container-fluid border h2 p-3 text-center text-uppercase">
        Comics Collection
      </div>
      <div className="container mt-2 py-3 bg-dark text-end">
        <h2 className="text-success ">
          Total Characters : <b>{global}</b>
        </h2>
        <h3 className="text-warning m-2">
          Total Displayed : <b>{count}</b>
        </h3>
      </div>
    </div>
  );
};

export default FetchComics;
