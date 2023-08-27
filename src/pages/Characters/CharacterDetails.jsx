import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useGetCharacterDetailsQuery } from "../../services/charactersApi";
import { Link } from "react-router-dom";
import moment from "moment";
import Loader from "../../components/Loader";
import ScrollPositionManager from "../../components/ScrollManager";

const CharacterDetails = () => {
  const [character, setCharacter] = useState();
  const { characterId, name } = useParams();
  const { data, isFetching } = useGetCharacterDetailsQuery(characterId);

  useEffect(() => {
    const characterDetails = data?.data?.results;
    console.log(characterDetails);
    setCharacter(characterDetails);
    document.title = `${name} | Characters | Marvel-Verse`;
    document.body.scrollTop = 0;
  }, [document, name, data]);

  if (isFetching) return <Loader />;

  return (
    <div>
      <>
        <div className="bg-gray-950 backdrop-blur-lg px-4 md:px-8 lg:px-20 py-10 text-white">
          <div>
            {character &&
              character?.map((d) => {
                return (
                  <div
                    key={d.id}
                    className={`flex md:items-center backdrop-blur-lg md:justify-center flex-col md:flex-row gap-x-5 gap-y-8`}
                  >
                    <ScrollPositionManager scrollKey={`${d.id + d.name}`} />
                    <div className="flex-1 flex items-center justify-center gap-4 flex-col">
                      <img
                        src={d.thumbnail.path && d.thumbnail.path + ".jpg"}
                        className="card-img-top scale-75"
                        alt={"...image of " + d.name}
                      />
                    </div>

                    <div className="flex-1">
                      <h5 className="font-bold text-[26px] text-center md:text-start md:text-[33px] lg:text-[40px] capitalize ">
                        {d.name}
                      </h5>
                      <div className="flex flex-col justify-center items-start gap-4 max-w-lg">
                        <p className="font-serif">
                          {d.description && (
                            <>
                              <p className="font-bold pb-2">Overview:</p>
                              <p className="text-[#212529]"></p>
                              {HTMLReactParser(d.description)}
                            </>
                          )}
                        </p>
                        <p className="font-semibold text-slate-300 font-mono">
                          Date: {moment(d.modified).format("MMM DD, YYYY")}
                        </p>
                      </div>

                      <div className="items-center justify-center flex">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-6 items-center justify-center">
                          {d.events.available !== 0 ? (
                            <Link to={`/characters/${d.id}/${d.name}/events`}>
                              <div className="bg-slate-900 hover:bg-red-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.events.available}
                                </p>
                                <p className="font-mono">Events</p>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}

                          {d.comics.available !== 0 ? (
                            <Link to={`/characters/${d.id}/${d.name}/comics`}>
                              <div className="bg-slate-900 hover:bg-red-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.comics.available}
                                </p>
                                <p className="font-mono">Comics</p>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}

                          {d.series.available !== 0 ? (
                            <Link to={`/characters/${d.id}/${d.name}/series`}>
                              <div className="bg-slate-900 hover:bg-red-800 w-[100px] h-[100px] text-center text-white flex flex-col items-center justify-center font-bold rounded-xl">
                                <p className="font-mono text-[#c0bdbd]">
                                  {d.series.available}
                                </p>
                                <p className="font-mono">Series</p>
                              </div>
                            </Link>
                          ) : (
                            ""
                          )}

                          {/* <div>
                        {d.creators.available !== 0 ? (
                          <Link to={`/characters/${d.id}/${d.name}/creators`}>
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

                      

                       */}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </div>
  );
};

export default CharacterDetails;
