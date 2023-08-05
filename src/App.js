import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Homepage,
  Events,
  EventDetails,
  EventsOrder,
  EventsCharacters,
  EventComics,
  EventCreators,
} from "./pages";

const App = () => {
  return (
    <div>
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>

          {/* Events Routes */}
          <Route exact path="/events">
            <Events />
          </Route>
          <Route exact path="/events/:eventId">
            <EventDetails />
          </Route>
          <Route exact path="/events?order=:order">
            <EventsOrder />
          </Route>
          <Route exact path="/events/:eventId/characters">
            <EventsCharacters />
          </Route>
          <Route exact path="/events/:eventId/comics">
            <EventComics />
          </Route>
          <Route exact path="/events/:eventId/creators">
            <EventCreators />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default App;
