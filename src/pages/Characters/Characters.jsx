import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState();

  // fetches Data from server and stores in setCharacters(array) due to the handle search function
  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm.toLowerCase()}&limit=20&orderBy=-modified&ts=1&apikey=${
        process.env.REACT_APP_API_KEY
      }&hash=${process.env.REACT_APP_HASH}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCount(data.data.count);
        setTotal(data.data.total);
        const results = data.data.results;
        setCharacters(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // loading state component
  if (isLoading)
    return (
      <div
        className="display-1 d-flex align-items-center justify-content-center"
        style={{ height: "100vh", backgroundColor: "#000000" }}
      >
        <BeatLoader
          color="#ffff"
          size={13}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    <section className="container-fluid bg-dark">
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">
          Marvel Characters
        </h3>
        <form
          className="d-flex justify-content-center py-3"
          onSubmit={handleSearch}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchTerm}
            placeholder="e.g spider-man, ant-man, iron man, hulk, hawkeye"
            onChange={(event) => setSearchTerm(event.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit" value="submit">
            Search
          </button>
        </form>
        {/* <div>{isLoading}</div> */}
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div className="row">
          {characters.map((c) => {
            return (
              <div key={c.id} className="col-lg-4 col-md-6">
                <div className="border border-warning card my-3 bg-dark">
                  <div className="p-2 my-3">
                    <h4 className="card-header text-center text-warning py-3">
                      {c.name}
                    </h4>
                    <img
                      src={c.thumbnail.path + ".jpg"}
                      className="card-img-top"
                      alt="...img"
                    />
                    <p className="text-muted text-center"></p>
                    <div className="d-flex justify-content-center">
                      <Link
                        key={c.id}
                        to={`/characters/${c.id}`}
                        className="btn btn-warning"
                      >
                        <b className="text-light">Learn More</b>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Characters;
