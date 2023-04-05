import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  // fetches Data from server and stores in setCharacters(array) due to the handle search function
  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   fetch(
  //     `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchTerm.toLowerCase()}&limit=${perPage}&offset=${
  //       (currentPage - 1) * perPage
  //     }&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
  //       process.env.REACT_APP_HASH
  //     }`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //       setCount(data.data.count);
  //       setTotal(data.data.total);
  //       const results = data.data.results;
  //       setCharacters(results);
  //       console.log(results);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  useEffect(() => {
    async function fetchCharacters(pageNumber) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters?limit=${perPage}&offset=${
          (pageNumber - 1) * perPage
        }&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
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
    }

    fetchCharacters(currentPage);

    document.title = "Marvel Characters";
  }, [currentPage, perPage]);

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
        {/* <form
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
        </form> */}
        {/* <div>{isLoading}</div> */}
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div className="row">
          {characters.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <p className="h5 fw-bold ">No Results Found</p>
            </div>
          ) : (
            characters.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-warning card my-3 bg-dark">
                    <Link
                      key={c.id}
                      to={`/characters/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className="card-img-top"
                          alt="...img"
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-warning py-3">
                            {c.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/*  */}
        <div className="container d-flex overflow-auto pt-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array.from(
                { length: Math.ceil(total / perPage) },
                (_, i) => i + 1
              ).map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Characters;
