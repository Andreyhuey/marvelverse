import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetComicDetailsQuery } from "../../services/comicsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import { BiSolidInfoCircle } from "react-icons/bi";

const ComicDetails = () => {
  const { comicId, title } = useParams();
  const { data, isFetching } = useGetComicDetailsQuery(comicId);
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
                  <div className="flex-1">
                    <img
                      src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                      className="card-img-top"
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
                        {d.issueNumber > 0 ? (
                          <p className="font-semibold">
                            Issue Number:
                            <span className="text-slate-300">
                              {" "}
                              {d.issueNumber}
                            </span>
                          </p>
                        ) : (
                          ""
                        )}

                        <p className="font-semibold">
                          Page Count:
                          <span className="text-slate-300"> {d.pageCount}</span>
                        </p>

                        <p className="font-semibold">
                          Format:
                          <span className="text-slate-300"> {d.format}</span>
                        </p>

                        <p className="font-semibold">
                          Price:
                          <span className="text-slate-300">
                            {" "}
                            ${d.prices[0].price}
                          </span>
                        </p>

                        <p className="font-semibold">
                          Date:{" "}
                          <span className="text-slate-300">
                            {moment(d.modified).format("MMM DD, YYYY")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="items-center justify-center flex">
                      <div className="grid grid-cols-2 md:grid-cols-4  gap-10 py-6 items-stretch justify-between w-full">
                        {d.series.available !== 0 ? (
                          <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out  text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                            <p className="italic text-left">Series</p>
                            <p className="font-mono text-[#c0bdbd] text-center">
                              {d.series.name}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        {d.characters.available !== 0 ? (
                          <Link to={`/comics/${d.id}/${d.title}/characters`}>
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.characters.available}
                              </p>
                              <p className="font-semibold">Characters</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}

                        {d.events.available !== 0 ? (
                          <Link to={`/comics/${d.id}/${d.title}/events`}>
                            <div className="bg-slate-900 hover:scale-110 transition duration-300 ease-in-out w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.events.available}
                              </p>
                              <p className="font-semibold">Events</p>
                            </div>
                          </Link>
                        ) : (
                          ""
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

export default ComicDetails;
