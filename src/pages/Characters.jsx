import React, { useEffect, useState } from "react";
// import millify from "millify";
// import { Card, Row, Col} from "antd";
import { Link } from "react-router-dom";
import { useGetCharactersLimitQuery } from "../services/CharacterApi";

const Characters = () => {
  const { data, isFetching } = useGetCharactersLimitQuery();
  console.log(data.data.results);
  const [characters, setCharacters] = useState();
  const characterList = data.data;
  console.log(characterList);

  useEffect(() => {
    setCharacters(characterList?.data?.results);
  }, []);

  if (isFetching) return "...loading";

  return (
    <>
      <div className="row">
        {characters.map((char) => {
          return (
            <div className="col-lg-4 col-md-6 col-xs-6">
              <div className="card my-3">
                <div key={char.id} className="p-2 my-3">
                  <h1 className="text-warning ms-4">
                    {char.name} <br />
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Characters;
