import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Loader } from "../.././components";
import "../../components/styles.css";

const ComicCreators = () => {
  const { comicId } = useParams();
  const [creators, setCreators] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics/${comicId}/creators?&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setCreators(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchData();
  }, [comicId]);

  // fetches Data from server and stores in setCharacters(array) due to the handle search function
  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      `https://gateway.marvel.com/v1/public/creators?nameStartsWith=${searchTerm.toLowerCase()}&limit=40&orderBy=-modified&ts=1&apikey=${
        process.env.REACT_APP_API_KEY
      }&hash=${process.env.REACT_APP_HASH}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCount(data.data.count);
        setTotal(data.data.total);
        const results = data.data.results;
        setCreators(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <section className="container-fluid bg-dark">
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">Marvel Creators</h3>
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
        <div>{isLoading}</div>
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div className="row">
          {creators.map((c) => {
            return (
              <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <div className="border border-info card my-3 bg-dark">
                  <Link
                    key={c.id}
                    to={`/creators/${c.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-info py-3">
                        {c.fullName}
                      </h4>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className="card-img-top"
                        alt="...img"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ComicCreators;
