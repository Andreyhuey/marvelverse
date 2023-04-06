import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import moment from "moment";

const CharacterStories = () => {
  const { characterId } = useParams();
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/stories?&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setStories(results);
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
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>
        <div>
          <div className="row">
            {stories.map((c) => {
              return (
                <div key={c.id} className="col-lg-4 col-md-6">
                  <div className="border border-warning card my-3 bg-dark">
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-warning py-3">
                        {c.title}
                      </h4>
                      <div>{loading}</div>
                      <ul className="list-group list-group-flush d-flex justify-content-between">
                        <li className="list-group-item bg-dark text-muted d-flex justify-content-between">
                          Comic ID : <b>{c.id}</b>
                        </li>
                        <li className="list-group-item bg-dark text-white d-flex justify-content-between">
                          Last modified :{" "}
                          <b>{moment(c.modified).format("DD/MM/YYYY")}</b>
                        </li>
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

export default CharacterStories;
