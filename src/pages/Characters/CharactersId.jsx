import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import { Link } from "react-router-dom";

const CharactersId = () => {
  const { characterId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          const results = data.data.results;
          setDetails(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchData();
  }, [characterId]);

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
    <section className="container-fluid py-5">
      <div className="container py-5">
        <div className="row">
          {details.map((d) => {
            return (
              <div key={d.id} className="row">
                <div className="col-lg-6">
                  <img
                    src={d.thumbnail.path + ".jpg"}
                    className="card-img-top"
                    alt={"image of" + d.name}
                  />
                </div>
                <div className="col-lg-6">
                  <div className="py-3">
                    <p>
                      <b>ID</b>: {d.id}
                    </p>
                    <p>
                      <b>Name</b> :{" "}
                      <span className="text-warning fw-bold">{d.name}</span>
                    </p>
                    <p>
                      <b>Description</b> : {d.description}
                    </p>
                    <p>
                      <b>Date Modified</b> :{" "}
                      {moment(d.modified).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="border border-warning border-0">
                    <ul className="list-group list-group-flush d-flex justify-content-between">
                      <li className="list-group-item bg-warning text-white d-flex justify-content-between align-items-center">
                        <b>Comics : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/characters/${d.id}/comics`}
                        >
                          {d.comics.available}
                        </Link>
                      </li>
                      <li className="list-group-item bg-warning text-white d-flex justify-content-between align-items-center">
                        <b>Events : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/characters/${d.id}/events`}
                        >
                          {d.events.available}
                        </Link>
                      </li>
                      <li className="list-group-item bg-warning text-white d-flex justify-content-between align-items-center">
                        <b>Series : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/characters/${d.id}/series`}
                        >
                          {d.series.available}
                        </Link>
                      </li>
                      <li className="list-group-item bg-warning text-white d-flex justify-content-between align-items-center">
                        <b>Stories : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/characters/${d.id}/stories`}
                        >
                          {d.stories.available}
                        </Link>
                      </li>
                    </ul>
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

export default CharactersId;
