import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetSeriesDetailsQuery } from "../../services/seriesApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";

const SeriesDetails = () => {
  const { seriesId, title } = useParams();
  const { data, isFetching } = useGetSeriesDetailsQuery(seriesId);
  const [comic, setComic] = useState();

  useEffect(() => {
    const comicDetails = data?.data?.results;
    console.log(comicDetails);
    setComic(comicDetails);
    document.title = `${title} | Comics | Marvel-Verse`;
    document.body.scrollTop = 0;
  }, [data, title]);

  if (isFetching) return <Loader />;

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white">
        <div>
          {comic ? (
            comic.map((d) => {
              return (
                <div
                  key={d.id}
                  className="flex items-center lg:items-start justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
                >
                  <div className="flex-1 flex items-center justify-center">
                    <img
                      src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                      className="h-auto w-auto"
                      alt={"...image of " + d.title}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col justify-center items-start gap-4">
                      <h5 className="font-extrabold text-[30px] capitalize text-center">
                        {d.title}
                      </h5>

                      <div className="font-serif">
                        <p className="text-lg font-bold">Overview </p>

                        {d.description ? (
                          <p className="text-slate-300">
                            {HTMLReactParser(d.description)}
                          </p>
                        ) : (
                          <div className="text-slate-300 flex gap-2 items-center italic">
                            <BiSolidInfoCircle className="text-red-500" /> No
                            description provided by
                            <span className="text-red-500">MARVEL</span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-x-6  gap-y-3 justify-between w-full">
                        {d.type && (
                          <p className="font-semibold">
                            Type:
                            <span className="text-slate-300"> {d.type}</span>
                          </p>
                        )}

                        {d.rating && (
                          <p className="font-semibold">
                            Rating:
                            <span className="text-slate-300"> {d.rating}</span>
                          </p>
                        )}

                        <p className="font-semibold">
                          Start Year:{" "}
                          <span className="text-slate-300">{d.startYear}</span>
                        </p>

                        <p className="font-semibold">
                          End Year:{" "}
                          <span className="text-slate-300">{d.endYear}</span>
                        </p>

                        <p className="font-semibold w-full">
                          Modified:{" "}
                          <span className="text-slate-300">
                            {moment(d.modified).format("MMM DD, YYYY")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="items-center justify-center flex">
                      <div className="grid grid-cols-2 md:grid-cols-4  gap-10 py-6 items-center justify-between w-full">
                        {d.characters.available !== 0 && (
                          <Link to={`/series/${d.id}/${d.title}/characters`}>
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.characters.available}
                              </p>
                              <p className="font-semibold">
                                {d.characters.available === 1 ? (
                                  <>Character</>
                                ) : (
                                  d.characters.available > 1 && <>Characters</>
                                )}
                              </p>
                            </div>
                          </Link>
                        )}

                        {d.comics.available !== 0 && (
                          <Link to={`/series/${d.id}/${d.title}/comics`}>
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.comics.available}
                              </p>
                              <p className="font-semibold">
                                {d.comics.available === 1 ? (
                                  <>Comic</>
                                ) : (
                                  d.comics.available > 1 && <>Comics</>
                                )}
                              </p>
                            </div>
                          </Link>
                        )}

                        {d.events.available !== 0 && (
                          <Link to={`/series/${d.id}/${d.title}/events`}>
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.events.available}
                              </p>
                              <p className="font-semibold">
                                {d.events.available === 1 ? (
                                  <>Event</>
                                ) : (
                                  d.events.available > 1 && <>Events</>
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
                        {d.creators.items.map((c) => {
                          return (
                            <div key={c.role} className="">
                              <div className="">
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
            })
          ) : (
            <>
              <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 min-h-screen text-white flex items-center justify-center">
                <p>No details provided</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SeriesDetails;
