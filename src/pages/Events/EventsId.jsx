import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";

export default function EventsId() {
  const { eventId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/events/${eventId}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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
  }, [eventId]);

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
    <>
      <section className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            {details.map((d) => {
              return (
                <div key={d.id} className="row">
                  <div className="col-lg-6">
                    <img
                      src={
                        d.thumbnail.path ? d.thumbnail.path + ".jpg" : loading
                      }
                      className="card-img-top"
                      alt={"...image of " + d.name}
                    />
                  </div>
                  <div className="col-lg-6 mt-3">
                    <h3 className="text-center py-2">
                      <span className=" fw-bold">{d.title}</span>
                    </h3>
                    <div className="py-3">
                      <p className="bg-secondary d-inline p-2 mb-5">
                        <b>Modified</b> :{" "}
                        {moment(d.modified).format("MMMM Do YYYY, h:mma")}
                      </p>
                      <p className="mt-4">
                        {d.description ? (
                          <span>{HTMLReactParser(d.description)}</span>
                        ) : (
                          <span className="fst-italic text-secondary text-center">
                            Sorry, No description provided.
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="py-1">
                      <p>
                        Start Date :{" "}
                        {moment(d.start).format("h:mma, Do MMMM YYYY")}{" "}
                      </p>
                      <p>
                        End Date : {moment(d.end).format("h:mma, Do MMMM YYYY")}{" "}
                      </p>
                    </div>
                    <div className="border border-white border-0">
                      <ul className="list-group list-group-flush d-flex justify-content-between bg-white border border-white">
                        <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                          <b>Characters : </b>
                          <Link
                            className="btn btn-dark"
                            key={d.id}
                            to={`/events/${d.id}/characters`}
                          >
                            {d.characters.available}
                          </Link>
                        </li>
                        <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                          <b>Comics : </b>
                          <Link
                            className="btn btn-dark"
                            key={d.id}
                            to={`/events/${d.id}/comics`}
                          >
                            {d.comics.available}
                          </Link>
                        </li>
                        <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                          <b>Creators : </b>
                          <Link
                            className="btn btn-dark"
                            key={d.id}
                            to={`/events/${d.id}/creators`}
                          >
                            {d.creators.available}
                          </Link>
                        </li>
                        <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                          <b>Series : </b>
                          <Link
                            className="btn btn-dark"
                            key={d.id}
                            to={`/events/${d.id}/series`}
                          >
                            {d.series.available}
                          </Link>
                        </li>
                        <li className="list-group-item bg-white text-black d-flex justify-content-between align-items-center">
                          <b>Stories : </b>
                          <Link
                            className="btn btn-dark"
                            key={d.id}
                            to={`/events/${d.id}/stories`}
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
    </>
  );
}
