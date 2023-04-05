import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "html-react-parser";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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

    fetchData();
  }, [characterId]);

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   fetch(
  //     `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?&titleStartsWith=${searchTerm}&limit=25&orderBy=issueNumber&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //       setCount(data.data.count);
  //       setTotal(data.data.total);
  //       const results = data.data.results;
  //       setComics(results);
  //       console.log(results);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  if (loading)
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
    <div className="container-fluid py-5">
      <div className="container py-5">
        {/* <form
          className="d-flex justify-content-center py-3"
          onSubmit={handleSearch}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchTerm}
            placeholder="e.g search for comics"
            onChange={(event) => setSearchTerm(event.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit" value="submit">
            Search
          </button>
        </form> */}
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div>
          <div className="row">
            {comics.map((c) => {
              return (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="border border-primary card my-3 bg-primary">
                    <Link
                      key={c.id}
                      to={`/comics/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-3">
                        <h4 className="card-header text-center text-white py-3">
                          {c.title}
                        </h4>
                        <img
                          src={
                            c.thumbnail.path
                              ? c.thumbnail.path + ".jpg"
                              : loading
                          }
                          className="card-img-top"
                          alt="...img"
                        />
                        <div>{loading}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterComics;
