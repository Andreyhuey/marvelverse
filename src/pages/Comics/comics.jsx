import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);

  // fetches Data from server and stores in setcomics(array) due to the handle search function
  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${searchTerm.toLowerCase()}&limit=50&orderBy=-modified&ts=1&apikey=${
        process.env.REACT_APP_API_KEY
      }&hash=${process.env.REACT_APP_HASH}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCount(data.data.count);
        setTotal(data.data.total);
        const results = data.data.results;
        setComics(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    async function fetchComics() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics?&limit=25&dateRange=2022-01-01%2C2023-04-01&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setComics(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchComics();
  }, []);

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
      <div>{isLoading}</div>
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">Marvel comics</h3>
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
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total comics Found : {total}</div>
          <div className="text-center h6">Total comics Rendered : {count}</div>
        </div>
        <div className="row">
          {comics.map((c) => {
            return (
              <div key={c.id} className="col-lg-4 col-md-6">
                <div className="border border-primary card my-3 bg-dark">
                  <div className="p-2 my-3">
                    <h4 className="card-header text-center text-primary py-3">
                      {c.title}
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
                        to={`/comics/${c.id}`}
                        className="btn btn-primary"
                      >
                        <b className="text-light">Read More</b>
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

export default Comics;
