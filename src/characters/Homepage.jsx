import React from "react";
import {
  Moonknight,
  Hulk,
  Spider,
  Thor,
  Venom,
  Deadpool,
  Wolverine,
  Thanos,
  Captains,
  Nova,
} from ".";

const Homepage = () => {
  return (
    <div className="container-fluid bg-dark">
      <Thor />
      <Moonknight />
      <Hulk />
      <Deadpool />
      <Spider />
      <Wolverine />
      <Nova />
      <Venom />
      <Captains />
      <Thanos />
    </div>
  );
};

export default Homepage;
