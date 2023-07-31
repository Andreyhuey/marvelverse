import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Loader } from "../../components";

export default function Events() {
  const { eventId } = useParams();
  const [characters, setCharacters] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState(" ");
  const [isLoading, setLoading] = useState(true);

  // Pagination useState(s)
  const [currentEventCharacterPage, setCurrentEventCharacterPage] = useState(
    parseInt(sessionStorage.getItem("currentEventCharacterPage")) || 1
  );
  const limit = 12;

  const handlePageClick = (number) => {
    setCurrentEventCharacterPage(number);
    sessionStorage.setItem(currentEventCharacterPage, number);
  };

  useEffect(() => {
    async function fetchCharacters(currentEventCharacterPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/events/${eventId}/characters?&limit=${limit}&offset=${
          (currentEventCharacterPage - 1) * limit
        }&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setCount(data.data.count);
          setTotal(data.data.total);
          const results = data.data.results;
          setCharacters(results);
          console.log(results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    fetchCharacters(currentEventCharacterPage);
    sessionStorage.setItem(
      "currentEventCharacterPage",
      currentEventCharacterPage
    );

    document.title = "Event Characters";
  }, [currentEventCharacterPage, limit, eventId]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  // loading state component
  if (isLoading) return <Loader />;

  return (
    <section className="container-fluid bg-dark">
      <div className="container vh-auto">
        <h3 className="text-bold fw-bold text-center py-3">Event Characters</h3>
        <div>{isLoading}</div>
        <div className="d-flex justify-content-between">
          <div className="">Total Characters Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentEventCharacterPage} of {totalPages()}
          </div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>

        <div className="row">
          {characters.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center vh-100">
              <p className="h5 fw-bold ">No Results Found</p>
            </div>
          ) : (
            characters.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-white card my-3 bg-dark">
                    <Link
                      key={c.id}
                      to={`/characters/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={c.thumbnail.path + ".jpg"}
                          className="card-img-top"
                          alt="...img"
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-white py-3">
                            {c.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
          <div className="container d-flex overflow-auto pt-5">
            <nav aria-label="Page navigation example ">
              <ul className="pagination ">
                {Array.from(
                  { length: Math.ceil(total / limit) },
                  (_, i) => i + 1
                ).map((number) => (
                  <li
                    key={number}
                    className={`page-item ${
                      currentEventCharacterPage === number ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        {/*  */}
      </div>
    </section>
  );
}
