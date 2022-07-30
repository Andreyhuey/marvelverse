import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import "moment-timezone";

const NameSearch = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("spider-man");
  const [count, setCount] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm}&orderBy=-modified&limit=100&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.total);
        setCount(data.data.count);
        const Results = data.data.results;
        console.log(Results);

        setCharacters(Results);

        const filteredData = Results?.filter((character) =>
          character?.name?.toLowerCase()?.includes(searchTerm)
        );
        setCharacters(filteredData);
        console.log(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [searchTerm]);

  if (isLoading)
    return (
      <h1
        className="display-5 text-warning d-flex align-items-center justify-content-center text-center"
        style={{ height: "80vh" }}
      >
        ...Search Marvel's Database
      </h1>
    );

  return (
    <div className="container text-white mt-5 pt-3" style={{ height: "auto" }}>
      <div className="text-warning text-left h2 pt-3">
        Total Marvel Characters : 1562
      </div>
      <div className="d-flex justify-content-center text-white my-3 py-2">
        <input
          placeholder="Find A Character"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value?.toLowerCase())}
        />
      </div>
      <div className="text-muted text-center h5">Find {searchTerm}</div>
      <div className="text-muted text-center h6">
        Total Characters Found : {count}
      </div>
      <div className="row">
        {characters.map((c) => {
          return (
            <div key={c.id} className="col-lg-4 col-md-6 col-xs-6">
              <div className="border border-warning card my-3 bg-dark">
                <div className="p-2 my-3">
                  <h4 className="card-header text-center text-warning py-3">
                    {c.name}
                  </h4>
                  <img
                    src={c.thumbnail.path + "/standard_fantastic.jpg"}
                    className="card-img-top"
                    alt="...img"
                  />
                  <p className="text-muted text-center"></p>
                  <div className="card-body">
                    <span className="border-bottom border-white">
                      <p className="card-text text-white">
                        {HTMLReactParser(c.description)}
                      </p>
                    </span>
                  </div>

                  <ul className="list-group list-group-flush ">
                    <li className="list-group-item bg-dark text-muted">
                      ID : {c.id}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Comics : {c.comics["available"]}
                    </li>
                    <li className="list-group-item bg-dark text-white">
                      Events : {c.events["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Series : {c.series["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Stories : {c.stories["available"]}
                    </li>

                    <li className="list-group-item bg-dark text-white">
                      Last modified : {c.modified}
                    </li>
                    <li className="list-group-item bg-dark text-warning text-capitalize d-flex justify-content-between pt-4">
                      <a
                        href={c.urls[1].url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-warning text-capitalize"
                      >
                        {c.urls[1].type}
                      </a>

                      <a
                        href={c.urls[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-warning"
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

export default NameSearch;
