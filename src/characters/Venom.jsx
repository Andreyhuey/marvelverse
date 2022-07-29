import React, { useEffect, useState } from "react";

const Venom = () => {
  const [characters, setCharacters] = useState([]);
  //   const [global, setGlobal] = useState(" ");
  const [count, setCount] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://gateway.marvel.com/v1/public/characters?nameStartsWith=venom&orderBy=-modified&limit=100&ts=1&apikey=47c728e2933b98677639c9ef3bcbed3c&hash=e926e192b0df9aaff901a57cb66e154a"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        console.log(data.data.total);
        setCharacters(data.data.results);
        // setGlobal(data.data.total);
        setCount(data.data.count);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  if (isLoading)
    return (
      <h1
        className="display-1 text-white d-flex align-items-center justify-content-center"
        style={{ height: "80vh" }}
      >
        ...Venom Loading
      </h1>
    );

  // # fetch parameters
  // name
  // nameStartsWith
  // orderBy
  // modifiedSince
  // limit
  // offset

  return (
    <div className="container-fluid bg-dark text-white my-3 py-3">
      <div className="container-fluid h1 py-3 mt-4 bg-black border text-center text-uppercase">
        Venom Collection
      </div>

      <div className="container mt-2 py-3 bg-dark ">
        {/* <h3 className="text-muted ">
          Total Characters <p className="mx-2 text-white">{global}</p>
        </h3> */}
        <h4 className="text-muted">
          Total Displayed <p className="mx-2 text-white">{count}</p>
        </h4>
      </div>

      <div className=" row">
        {characters.map((c) => {
          return (
            <div className="col-lg-4 col-md-6 col-xs-6">
              <div className="border border-white card my-3 bg-dark">
                <div key={c.id} className="p-2 my-3">
                  <h4 className="card-header text-center text-white py-3">
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
                      <p className="card-text ">
                        {HTMLReactParser(c.description)}
                      </p>
                    </span>
                  </div>

                  <ul className="list-group list-group-flush ">
                    <li className="list-group-item bg-dark text-muted">
                      ID : {c.id}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Last Modified : {c.modified}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Stories : {c.stories["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Series : {c.series["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Comics : {c.comics["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Events : {c.events["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white text-capitalize d-flex justify-content-between pt-4">
                      <a
                        href={c.urls[1].url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-light text-capitalize"
                      >
                        {c.urls[1].type}
                      </a>

                      <a
                        href={c.urls[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-light"
                      >
                        {c.urls[0].type}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Venom;
