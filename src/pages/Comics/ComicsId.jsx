import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";
import HTMLReactParser from "html-react-parser";
import { Link } from "react-router-dom";

const ComicsId = () => {
  const { comicId } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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
    window.scrollTo(0, 0);
  }, [comicId]);

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
                <h2 className="text-center text-primary fw-bold py-3">
                  {d.title}
                </h2>
                <div className="col-lg-6">
                  <img
                    src={d.thumbnail.path + ".jpg"}
                    className="card-img-top"
                    alt={"...image of " + d.name}
                  />
                </div>
                <div className="col-lg-6">
                  <h5 className="text-center fw-bold pt-2">About</h5>
                  <div className="pb-3 pt-2">
                    <p>
                      <b>Description</b> :{" "}
                      {d.description ? (
                        <p>{HTMLReactParser(d.description)}</p>
                      ) : (
                        <p className="fst-italic text-secondary text-center">
                          Sorry, No description provided.
                        </p>
                      )}
                    </p>
                    <p>
                      <b>Format</b> : {d.format}
                    </p>
                    <p>
                      <b>Issue Number</b> : {d.issueNumber}
                    </p>
                    <p>
                      <b>Page Count</b> : {d.pageCount}
                    </p>
                    <div className="">
                      {d.prices.map((price) => {
                        return (
                          <p key={price.type}>
                            <span className="fw-bold">{price.type}</span> : $
                            {price.price}
                          </p>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pb-3">
                    <h5 className="text-center fw-bold p-1">Dates</h5>
                    <p>
                      <b>dateModified</b> :{" "}
                      {moment(d.modified).format("DD/MM/YYYY")}
                    </p>
                    {d.dates.map((da) => {
                      return (
                        <p key={da.type}>
                          <span className="fw-bold">{da.type}</span> :{" "}
                          {moment(da.date).format("DD/MM/YYYY")}
                        </p>
                      );
                    })}
                  </div>

                  <div className="border border-primary border-0">
                    <h5 className="text-center fw-bold p-1">Links</h5>
                    <ul className="list-group list-group-flush d-flex justify-content-between">
                      {/* <li className="list-group-item bg-primary text-white d-flex justify-content-between align-items-center">
                        <b>Series : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/series/${d.id}`}
                          to={d.series.resourceURI}
                        >
                          {d.series.name}
                        </Link>
                      </li> */}
                      <li className="list-group-item bg-primary text-white d-flex justify-content-between align-items-center">
                        <b>Characters : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/comics/${d.id}/characters`}
                        >
                          {d.characters.available}
                        </Link>
                      </li>
                      <li className="list-group-item bg-primary text-white d-flex justify-content-between align-items-center">
                        <b>Creators : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/comics/${d.id}/creators`}
                        >
                          {d.creators.available}
                        </Link>
                      </li>
                      <li className="list-group-item bg-primary text-white d-flex justify-content-between align-items-center">
                        <b>Events : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/comics/${d.id}/events`}
                        >
                          {d.events.available}
                        </Link>
                      </li>

                      <li className="list-group-item bg-primary text-white d-flex justify-content-between align-items-center">
                        <b>Stories : </b>
                        <Link
                          className="btn btn-light"
                          key={d.id}
                          to={`/comics/${d.id}/stories`}
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

export default ComicsId;
