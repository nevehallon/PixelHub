import { StrictMode } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import PrimeReact from "primereact/api";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "fontsource-roboto";

import "primereact/resources/themes/vela-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.scss";

PrimeReact.ripple = true;

const IndexPortPage = (): JSX.Element => (
  <StrictMode>
    <HashRouter>
      <Switch>
        {/* <Route component={PublicImages} path="/public-images" /> */}
        <Route path="*" render={({ location }) => <App {...{ location }} />} />
      </Switch>
    </HashRouter>
  </StrictMode>
);

export default IndexPortPage;
