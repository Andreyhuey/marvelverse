import React, { useState, useEffect } from "react";

const FetchStories = () => {
  const [global, setGlobal] = useState("");
  const [count, setCount] = useState("");
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(
      "https://gateway.marvel.com/v1/public/stories?limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        console.log(data.data.total);
        setStories(data.data.results);
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
        Stories Collection
      </div>
      <div className="container mt-2 py-3 bg-dark text-end">
        <h2 className="text-success ">
          Total Characters : <b>{global}</b>
        </h2>
        <h3 className="text-warning m-2">
          Total Displayed : <b>{count}</b>
        </h3>
      </div>

      <div className=" row">
        {stories.map((s) => {
          return (
            <div className="col-lg-4 col-md-6 col-xs-6">
              <div className="card my-3 bg-dark">
                <div key={s.id} className="p-2 my-3">
                  <h4 className="card-header text-center text-warning py-3">
                    {s.originalIssue.name}
                  </h4>
                  {/* <img
                    src={s.thumbnail.path + "/standard_fantastis.jpg"}
                    className="card-img-top"
                    alt="...img"
                  /> */}
                  <div className="card-body my-2">
                    <h4 className="card-title text-info">Description </h4>
                    <p className="card-text">{s.title}</p>
                    {/* 
                    <p>URL type : {s.urls[0].type}</p>
                    <p>Modified : {s.modified}</p> 
                    <p>thumbnail.path {s.thumbnail.path}</p>
                    */}
                  </div>

                  <ul className="list-group list-group-flush ">
                    <li className="list-group-item bg-dark text-white">
                      <h4 className="text-muted">Details</h4>
                    </li>
                    <li className="list-group-item bg-dark text-white ">
                      <p className="text-capitalize text-muted">ID : {s.id}</p>
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Series : {s.series["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Comics : {s.comics["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Available Creators : {s.creators["available"]}
                    </li>
                  </ul>

                  <div className="card-body text-end">
                    <a
                      href={s.resourceURI}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary text-white"
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

export default FetchStories;
