import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams, useLocation } from "react-router-dom";
import { useGetEventDetailsQuery } from "../services/eventsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";
import ScrollManager from ".././components/ScrollManager";

const DataDetails = () => {
  const location = useLocation();
  const { eventId, title } = useParams();
  const { data, isFetching } = useGetEventDetailsQuery(eventId);

  const eventDetails = data?.data?.results;

  document.title = `${title} | Events | Marvel-Verse`;

  if (isFetching) return <Loader />;

  console.log(eventDetails);

  return (
    <>
      <div className="bg-gray-950 px-4 md:px-8 lg:px-20 py-10 text-white">
        <div>
          {eventDetails?.map((d) => {
            return (
              <div
                key={d.id}
                className="flex items-center justify-center flex-col lg:flex-row gap-x-5 gap-y-8"
              >
                <ScrollManager scrollKey={d.id} />
                <div className="flex-1">
                  <img
                    src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                    className="card-img-top"
                    alt={"...image of " + d.title}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col justify-center items-start gap-4">
                    <h5 className="font-extrabold text-[40px] uppercase text-center">
                      {d.title}
                    </h5>
                    <p className="font-semibold text-slate-300 font-mono">
                      {moment(d.end).format("YYYY")}
                    </p>
                    <p className="font-serif">
                      {HTMLReactParser(d.description)}
                    </p>
                  </div>

                  <div className="items-center justify-center flex">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-6 items-center justify-center">
                      <div>
                        {d.characters.available !== 0 ? (
                          <Link to={`/events/${d.id}/${d.title}/characters`}>
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.characters.available}
                              </p>
                              <p className="font-mono">Characters</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {d.comics.available !== 0 ? (
                          <Link to={`/events/${d.id}/${d.title}/comics`}>
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.comics.available}
                              </p>
                              <p className="font-mono">Comics</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      {/* <div>
                        {d.creators.available !== 0 ? (
                          <Link to={`/events/${d.id}/${d.title}/creators`}>
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.creators.available}
                              </p>
                              <p className="font-mono">Creators</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {d.series.available !== 0 ? (
                          <Link to={`/events/${d.id}/${d.title}/series`}>
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.series.available}
                              </p>
                              <p className="font-mono">Series</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {d.stories.available !== 0 ? (
                          <Link
                            to={`/events/${d.id}/${d.title}/stories
`}
                          >
                            <div className="bg-slate-900 hover:bg-slate-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                              <p className="font-mono text-[#c0bdbd]">
                                {d.stories.available}
                              </p>
                              <p className="font-mono">Stories</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div> */}
                    </div>
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

export default DataDetails;
