import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicDetailsQuery } from "../../services/comicsApi";
import { Link } from "react-router-dom";
import { BiSolidInfoCircle } from "react-icons/bi";
import moment from "moment";
import Loader from "../../components/Loader";

const ComicDetails = () => {
  const { comicId, title } = useParams();
  const { data, isFetching } = useGetComicDetailsQuery(comicId);
  const [comic, setComic] = useState();

  useEffect(() => {
    const comicDetails = data?.data?.results;
    console.log(comicDetails);
    setComic(comicDetails);
    document.title = `${title} | Comics | Marvelverse`;
    document.body.scrollTop = 0;
  }, [data, title]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white">
        <div>
          {comic &&
            comic?.map((comic, index) => {
              const {
                id,
                thumbnail,
                title,
                description,
                series,
                issueNumber,
                pageCount,
                format,
                prices,
                modified,
                characters,
                events,
                creators,
              } = comic;
              return (
                <div
                  key={index}
                  className="flex items-center lg:items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
                >
                  <div className="flex-1">
                    <img
                      src={thumbnail.path && thumbnail.path + ".jpg"}
                      className="card-img-top"
                      alt={"...image of " + title}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-center items-start gap-4">
                      <h5 className="font-extrabold text-[30px] capitalize text-center">
                        {title}
                      </h5>

                      <div className="font-serif">
                        <p className="text-lg font-bold">Overview </p>

                        {description ? (
                          <p className="text-slate-300">
                            {HTMLReactParser(description)}
                          </p>
                        ) : (
                          <div className="text-slate-300 flex gap-2 items-center italic">
                            <BiSolidInfoCircle className="text-red-500" /> No
                            description provided by
                            <span className="text-red-500">MARVEL</span>
                          </div>
                        )}
                      </div>

                      {series.available !== 0 && (
                        <div className="text-center text-white flex flex-col gap-1 items-start justify-center font-bold rounded-xl">
                          <p className="text-md">Series</p>
                          <Link to={`/series/${series.name.slice(0, 10)}`}>
                            <p className="font-mono text-slate-300 text-center">
                              {series.name}
                            </p>
                          </Link>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-x-6  gap-y-3 justify-between w-full">
                        {issueNumber > 0 ? (
                          <p className="font-semibold">
                            Issue Number:
                            <span className="text-slate-300">
                              {" "}
                              {issueNumber}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}

                        <p className="font-semibold">
                          Page Count:
                          <span className="text-slate-300"> {pageCount}</span>
                        </p>

                        <p className="font-semibold">
                          Format:
                          <span className="text-slate-300"> {format}</span>
                        </p>

                        <p className="font-semibold">
                          Price:
                          <span className="text-slate-300">
                            {" "}
                            ${prices[0].price}
                          </span>
                        </p>

                        <p className="font-semibold">
                          Date:{" "}
                          <span className="text-slate-300">
                            {moment(modified).format("MMM DD, YYYY")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="items-center justify-center flex">
                      <div className="grid grid-cols-2 md:grid-cols-4  gap-10 py-6 items-center justify-between w-full">
                        {characters.available !== 0 && (
                          <Link
                            to={`/comics/${id}/${title.replace(
                              /#/g,
                              "Issue "
                            )}/characters`}
                          >
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {characters.available}
                              </p>
                              <p className="font-semibold">
                                {characters.available === 1 ? (
                                  <>Character</>
                                ) : (
                                  characters.available > 1 && <>Characters</>
                                )}
                              </p>
                            </div>
                          </Link>
                        )}

                        {events.available !== 0 && (
                          <Link
                            to={`/comics/${id}/${title.replace(
                              /#/g,
                              "Issue "
                            )}/events`}
                          >
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {events.available}
                              </p>
                              <p className="font-semibold">
                                {events.available === 1 ? (
                                  <>Event</>
                                ) : (
                                  events.available > 1 && <>Events</>
                                )}
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* creators */}
                    <div className="font-semibold">
                      <p className="text-2xl">Creators</p>
                      <span className="pb-1 grid grid-cols-2 w-full justify-between gap-1">
                        {creators.items.map((c, index) => {
                          return (
                            <div key={index}>
                              <div>
                                <div className="flex items-center justify-start gap-2">
                                  <p className="capitalize">
                                    {c.role}:{" "}
                                    <span className="text-slate-300">
                                      {c.name}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ComicDetails;
