import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  //
  Characters,
  CharacterDetails,
  CharacterComics,
  CharacterEvents,
  //
  Comics,
  ComicDetails,
  //
  Events,
  EventDetails,
  EventsCharacters,
  EventComics,
  Search,
  Series,
  SeriesDetails,
  //
} from "./pages";
import { Footer, Navbar } from "./components";

const App = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="md:pt-20 pt-12">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          <Route exact path={"/search"}>
            <Search />
          </Route>

          {/* Characters */}
          <Route exact path="/characters">
            <Characters />
          </Route>
          {/* CharacterDetails */}
          <Route exact path="/characters/:characterId/:name">
            <CharacterDetails />
          </Route>
          {/* Character Comics */}
          <Route exact path="/characters/:characterId/:name/comics">
            <CharacterComics />
          </Route>
          {/* Character Comics */}
          <Route exact path="/characters/:characterId/:name/events">
            <CharacterEvents />
          </Route>

          {/* #Marvel Events Routes */}
          {/* Events */}
          <Route exact path="/events">
            <Events />
          </Route>
          {/* Event Details */}
          <Route exact path="/events/:eventId/:title">
            <EventDetails />
          </Route>
          {/* Event Character */}
          <Route exact path="/events/:eventId/:title/characters">
            <EventsCharacters />
          </Route>
          {/* Event Comics */}
          <Route exact path="/events/:eventId/:title/comics">
            <EventComics />
          </Route>

          {/* Comics */}
          <Route exact path="/comics">
            <Comics />
          </Route>
          <Route exact path="/comics/:comicId/:title">
            <ComicDetails />
          </Route>
          <Route exact path="/comics/:comicId/:title/characters">
            <ComicDetails />
          </Route>
          <Route exact path="/comics/:comicId/:title/events">
            <ComicDetails />
          </Route>
          <Route exact path="/comics/:comicId/:title/series">
            <ComicDetails />
          </Route>

          {/*  */}
          <Route exact path="/series">
            <Series />
          </Route>
          <Route exact path="/series/:seriesId/:title">
            <SeriesDetails />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
