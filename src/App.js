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
  Events,
  EventDetails,
  EventsCharacters,
  EventComics,
  EventCreators,
} from "./pages";
import EventSeries from "./pages/EventSeries";

const App = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          {/* Characters */}
          <Route exact path="/characters">
            <Characters />
          </Route>
          {/* CharacterDetails */}
          <Route exact path="/characters/:characterId/:title">
            <CharacterDetails />
          </Route>
          {/* Character Comics */}
          <Route exact path="/characters/:characterId/:title/comics">
            <CharacterComics />
          </Route>
          {/* Character Comics */}
          <Route exact path="/characters/:characterId/:title/events">
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
        </Switch>
      </div>
    </div>
  );
};

export default App;
