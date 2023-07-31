import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Loader } from "../../components";

const CharacterEvents = () => {
  const { characterId } = useParams();
  const [events, setEvents] = useState([]);
  const [count, setCount] = useState("");
  const [total, setTotal] = useState("");
  const [isLoading, setLoading] = useState(true);

  //   Pagination useState(s)
  const [currentCharacterEventPage, setCurrentCharacterEventPage] = useState(
    parseInt(sessionStorage.getItem("currentCharacterEventPage")) || 1
  );
  const limit = 20;

  useEffect(() => {
    async function fetchData(currentCharacterEventPage) {
      setLoading(true);
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${characterId}/events?&limit=${limit}&offset=${
          (currentCharacterEventPage - 1) * limit
        }&orderBy=-modified&ts=1&apikey=${process.env.REACT_APP_API_KEY}&hash=${
          process.env.REACT_APP_HASH
        }`
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

    fetchData(currentCharacterEventPage);
    sessionStorage.setItem(
      "currentCharacterEventPage",
      currentCharacterEventPage
    );
  }, [characterId, currentCharacterEventPage, limit]);

  function totalPages() {
    let Pages = total / limit;
    Pages = Math.ceil(Pages);
    return Pages;
  }

  const handlePageClick = (number) => {
    setCurrentCharacterEventPage(number);
    sessionStorage.setItem(currentCharacterEventPage, number);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <h3 className="text-bold fw-bold text-center py-3">
          Marvel Characters
        </h3>

        <div className="d-flex justify-content-between">
          <div className="text-center h6">Total Characters Found : {total}</div>
          <div className="text-center h6 fw-bold bg-black p-3">
            Page {currentCharacterEventPage} of {totalPages()}
          </div>
          <div className="text-center h6">
            Total Characters Rendered : {count}
          </div>
        </div>

        <div>{isLoading}</div>

        <div>
          <div className="row">
            {events.map((c) => {
              return (
                <div key={c.id} className="col-lg-3 col-md-4 col-sm-6 col-xs-6">
                  <div className="border border-light card my-3 bg-black">
                    <Link
                      key={c.id}
                      to={`/events/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="p-2 my-1">
                        <img
                          src={
                            c.thumbnail.path.loading
                              ? { isLoading }
                              : c.thumbnail.path + ".jpg"
                          }
                          className="card-img-top"
                          alt={"img of " + c.title}
                        />
                        <div className="d-flex justify-content-center">
                          <h4 className="card-body text-center text-light py-3">
                            {c.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            <div className="container d-flex overflow-auto pt-5">
              <nav aria-label="Page navigation example ">
                <ul className="pagination">
                  {Array.from({ length: totalPages() }, (_, i) => i + 1).map(
                    (number) => (
                      <li
                        key={number}
                        className={`page-item ${
                          currentCharacterEventPage === number ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(number)}
                        >
                          {number}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterEvents;
