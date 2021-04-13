import { StrictMode } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import PrimeReact from "primereact/api";

import App from "./App";
import PublicImages from "./components/pages/publicImages";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
// import 'jquery/dist/jquery';
// import 'popper.js/dist/popper'; //TODO: remove if not needed
// import 'bootstrap/dist/js/bootstrap';

import "fontsource-roboto";

import "primereact/resources/themes/vela-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

export default IndexPortPage;
