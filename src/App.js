import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  Events,
  EventDetails,
  // EventsOrder,
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

          {/* #Marvel Events Routes */}

          {/* Events */}
          <Route exact path="/events">
            <Events />
          </Route>
          {/* Events Order*/}
          <Route exact path="/events?order=:order">
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
          <Route exact path="/events/:eventId/:title/characters?order=:order">
            <EventsCharacters />
          </Route>

          {/* Event Comics Details */}
          <Route exact path="/events/:eventId/:title/comics?order=:order">
            <EventComics />
          </Route>
          {/* Event Details */}
          <Route exact path="/events/:eventId/:title/creators?order=:order">
            <EventCreators />
          </Route>
          <Route exact path="/events/:eventId/:title/series?order=:order">
            <EventSeries />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
