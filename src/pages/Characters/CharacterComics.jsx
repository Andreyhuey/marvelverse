import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?&limit=4&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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
    <div className="container-fluid my-5">
      <div className="container py-3 my-5">
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
                  <div className="border border-warning card my-3 bg-dark">
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-warning py-3">
                        {c.title}
                      </h4>
                      <img
                        src={c.thumbnail.path + ".jpg"}
                        className="card-img-top"
                        alt="...img"
                      />
                      <div>{loading}</div>
                      <div className="card-body">
                        <span className="border-bottom border-white">
                          <p className="card-text text-white">
                            {c.description}
                          </p>
                        </span>
                        <span className="border-bottom border-white">
                          <b className="text-center d-flex justify-content-center py-3">
                            Comic character(s) : {c.characters.available}
                          </b>
                          {c.characters.items.map((ch) => {
                            return (
                              <li key={ch.name}>
                                <a href={ch.resourceURI}>{ch.name}</a>
                              </li>
                            );
                          })}
                        </span>
                        <span className="border-bottom border-white">
                          <b className="text-center d-flex justify-content-center py-3">
                            Comic Creator(s) : {c.creators.available}
                          </b>
                          {c.creators.items.map((cr) => {
                            return (
                              <li key={cr.name}>
                                <a href={cr.resourceURI}>{cr.name}</a>
                              </li>
                            );
                          })}
                        </span>
                        <span className="border-bottom border-white">
                          <b className="text-center d-flex justify-content-center py-3">
                            Comic Event(s) : {c.events.available}
                          </b>
                          {c.events.items.map((ev) => {
                            return (
                              <li key={ev.name}>
                                <a href={ev.resourceURI}>{ev.name}</a>
                              </li>
                            );
                          })}
                        </span>
                        <span className="border-bottom border-white">
                          <b className="text-center d-flex justify-content-center py-3">
                            Comic Stories : {c.stories.available}
                          </b>
                          {c.stories.items.map((st) => {
                            return (
                              <li key={st.name}>
                                <a href={st.resourceURI}>{st.name}</a>
                              </li>
                            );
                          })}
                        </span>
                        <span className="border-bottom border-white">
                          <b className="text-center d-flex justify-content-center py-3">
                            Comic Series :{" "}
                            <a href={c.series.resourceURI}>{c.series.name}</a>
                          </b>
                        </span>
                      </div>
                      <ul className="list-group list-group-flush d-flex justify-content-between">
                        <li className="list-group-item bg-dark text-muted d-flex justify-content-between">
                          Comic ID : <b>{c.id}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Last modified :{" "}
                          <b>{moment(c.modified).format("DD/MM/YYYY")}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Issue Number : <b>{c.issueNumber}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Format : <b>{c.format}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Pages : <b>{c.pageCount}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Published :
                          <b>{moment(c.dates[0].date).format("DD/MM/YYYY")}</b>
                        </li>

                        <button className="list-group-item bg-dark text-warning text-capitalize pt-4">
                          <a
                            href={c.urls[0].url}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-warning text-capitalize"
                          >
                            <b>${c.prices[0].price}</b>
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

export default CharacterComics;
