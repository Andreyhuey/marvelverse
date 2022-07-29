import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route } from "react-router-dom";
import { Homepage } from "./characters";
import { NameSearch } from "./pages";
import { Navbar, Footer } from "./components";

import { library } from "@fortawesome/fontawesome-svg-core";

import { faEnvelopeOpen, faSearch } from "@fortawesome/free-solid-svg-icons";

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

library.add(faGithub, faLinkedin, faEnvelopeOpen, faSearch);

function App() {
  return (
    <div className="bg-dark">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/search">
            <NameSearch />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
