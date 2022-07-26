import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchCharacterName = () => {
  const [character, setCharacter] = useState([]);
  const [global, setGlobal] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a`
      )
      .then((res) => {
        setCharacter(res.data.data.results);
        setGlobal(res.data.data.total);
        setCount(res.data.data.count);
        console.log(res.data.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-white">
      <div className="container-fluid h1 p-3 mt-4 text-center text-uppercase">
        Character Collection
      </div>

      <div className="container mt-2 py-3 bg-dark ">
        <h3 className="text-muted ">
          Total Characters <p className="mx-2 text-info">{global}</p>
        </h3>
        <h4 className="text-muted">
          Total Displayed <p className="mx-2 text-info">{count}</p>
        </h4>
      </div>

      <div className=" row">
        {character.map((c) => {
          return (
            <div className="col-lg-4 col-md-6 col-xs-6">
              <div className="border border-warning card my-3 bg-dark">
                <div key={c.id} className="p-2 my-3">
                  <h4 className="card-header text-center text-warning py-3">
                    {c.name}
                  </h4>
                  <img
                    src={c.thumbnail.path + "/standard_fantastic.jpg"}
                    className="card-img-top"
                    alt="...img"
                  />
                  <div className="card-body my-2">
                    <span class="border-bottom border-white">
                      <h4 className="card-title text-muted">Description </h4>
                      <p className="card-text ">{c.description}</p>
                    </span>
                    {/* 
                    <p>URL type : {c.urls[0].type}</p>
                    <p>Modified : {c.modified}</p> 
                    <p>thumbnail.path {c.thumbnail.path}</p>
                    */}
                  </div>

                  <ul className="list-group list-group-flush ">
                    <li className="list-group-item bg-dark text-muted">
                      ID : {c.id}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Stories : {c.stories["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Series : {c.series["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Comics : {c.comics["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Available Events : {c.events["available"]}
                    </li>
                  </ul>

                  <div className="card-body text-end">
                    <a
                      href={c.urls[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-warning"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FetchCharacterName;
