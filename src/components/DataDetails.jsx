import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../services/eventsApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "./Loader";

const DataDetails = () => {
  const { eventId } = useParams();
  const { data, isFetching } = useGetEventDetailsQuery(eventId);

  const eventDetails = data?.data?.results;

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
                <div className="flex-1">
                  <img
                    src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                    className="card-img-top"
                    alt={"...image of " + d.title}
                  />
                </div>
                <div className="flex-1 text-left  flex flex-col justify-start items-start gap-4">
                  <h5 className="font-extrabold text-[40px] uppercase">
                    {d.title}
                  </h5>
                  <p className="font-serif">{HTMLReactParser(d.description)}</p>

                  <div className="flex items-center justify-center">
                    <div className="flex flex-row items-center justify-center gap-4">
                      <div>
                        {d.characters.available !== 0 ? (
                          <Link to={`/events/${d.id}/characters`}>
                            <div className="bg-black w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-full">
                              <p>{d.characters.available}</p>
                              <p>Characters</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {d.comics.available !== 0 ? (
                          <Link to={`/events/${d.id}/comics`}>
                            <div className="bg-black w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-full">
                              <p>{d.comics.available}</p>
                              <p>Comics</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <div>
                        {d.creators.available !== 0 ? (
                          <Link to={`/events/${d.id}/creators`}>
                            <div className="bg-black w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-full">
                              <p>{d.creators.available}</p>
                              <p>Creators</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {d.stories.available !== 0 ? (
                          <Link
                            to={`/events/${d.id}/stories
`}
                          >
                            <div className="bg-black w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-full">
                              <p>{d.stories.available}</p>
                              <p>Stories</p>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div> */}
                    </div>
                  </div>
                  <p className="bg-zinc-900 text-slate-300 rounded-md inline p-2 font-semibold">
                    {moment(d.start).format("YYYY")}
                  </p>
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
