import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from "react-router-dom";
import { Footer } from "./components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  Characters,
  CharactersId,
  CharacterComics,
  CharacterEvents,
  CharacterSeries,
  CharacterStories,
} from "./pages";

library.add(faGithub, faLinkedin, faEnvelopeOpen, faSearch);

function App() {
  return (
    <div className="bg-dark text-white">
      <div>
        <Switch>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <CharactersId />
          </Route>
          <Route exact path="/characters/:characterId/comics">
            <CharacterComics />
          </Route>
          <Route exact path="/characters/:characterId/events">
            <CharacterEvents />
          </Route>
          <Route exact path="/characters/:characterId/series">
            <CharacterSeries />
          </Route>
          <Route exact path="/characters/:characterId/stories">
            <CharacterStories />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
