import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import "../../components/styles.css";

const ComicStories = () => {
  const { comicId } = useParams();
  const [creators, setCreators] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/comics/${comicId}/stories?&limit=25&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${process.env.REACT_APP_HASH}`
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
        <h3 className="text-bold fw-bold text-center py-3">Marvel Stories</h3>
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
                <div className="border border-success card my-3 bg-black">
                  <Link
                    key={c.id}
                    to={`/creators/${c.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="p-2 my-3">
                      <h4 className="card-header text-center text-success py-3">
                        {c.title}
                      </h4>
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

export default ComicStories;
