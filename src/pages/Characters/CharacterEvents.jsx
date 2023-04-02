import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";

const CharacterEvents = () => {
  const { characterId } = useParams();
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/events?&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setEvents(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchData();
  }, [characterId]);

  const handleSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      `https://gateway.marvel.com/v1/public/characters/${characterId}/events?nameStartsWith=${searchTerm}&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setCount(data.data.count);
        setTotal(data.data.total);
        const results = data.data.results;
        setEvents(results);
        console.log(results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
        <form
          className="d-flex justify-content-center py-3"
          onSubmit={handleSearch}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            value={searchTerm}
            placeholder="e.g search for events"
            onChange={(event) => setSearchTerm(event.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit" value="submit">
            Search
          </button>
        </form>
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div>
          <div className="row">
            {events.map((c) => {
              return (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="border border-warning card my-3 bg-dark">
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-warning py-3">
                        {c.title}
                      </h4>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className="card-img-top"
                        alt={"..img of" + c.title}
                      />
                      <div>{loading}</div>

                      <ul className="list-group list-group-flush d-flex justify-content-between">
                        <li className="list-group-item bg-dark text-muted d-flex justify-content-between">
                          events ID : <b>{c.id}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Date modified :{" "}
                          <b>{moment(c.modified).format("DD/MM/YYYY")}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Start: <b>{moment(c.start).format("DD/MM/YYYY")}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          End: <b>{moment(c.end).format("DD/MM/YYYY")}</b>
                        </li>
                        <button className="list-group-item bg-dark text-warning text-capitalize pt-4">
                          <a
                            href={c.urls[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-warning text-capitalize"
                          >
                            <b>{c.urls[0].type}</b>
                          </a>
                        </button>
                      </ul>
                    </div>
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

export default CharacterEvents;
