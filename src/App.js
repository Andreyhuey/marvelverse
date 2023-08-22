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
  EventCreators,

  //
} from "./pages";
import EventSeries from "./pages/EventSeries";
import { Footer, Navbar } from "./components";

const App = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-20">
        <Switch>
          <Route exact path="/">
            <Homepage />
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
          {/* Event Character Details */}
          <Route exact path="/events/:eventId/:title/characters">
            <EventsCharacters />
          </Route>

          {/* Event Comics Details */}
          <Route exact path="/events/:eventId/:title/comics">
            <EventComics />
          </Route>
          {/* Event Details */}
          <Route exact path="/events/:eventId/:title/creators">
            <EventCreators />
          </Route>
          <Route exact path="/events/:eventId/:title/series">
            <EventSeries />
          </Route>

          {/* Comics */}
          <Route exact path="/comics">
            <Comics />
          </Route>
          <Route exact path="/comics/:comicId/:title">
            <ComicDetails />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
