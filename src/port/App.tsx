/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import * as H from "history";

import ProtectedRoute from "./common/protectedRoute";
import CreateDrawing from "./components/drawingActions/createDrawing";
import EditDrawing from "./components/drawingActions/editDrawing";
import { MyDrawings, MyFavorites } from "./components/galleries";
import Browse from "./components/galleries/browseDB";
import Footer from "./components/layout/footer";
import Navbar from "./components/layout/nav-bar";
import About from "./components/pages/about";
import Profile from "./components/pages/acount/profile";
import Home from "./components/pages/home";
import PainterSignup from "./components/signAndLog/painterSignup";
import Signin from "./components/signAndLog/signin";
import Signup from "./components/signAndLog/signup";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser, logout } from "./services/userService";

export interface Location {
  location: H.Location;
}
class App extends Component {
  state = { user: null };

  componentDidMount(): void {
    const user = getCurrentUser();
    this.setState({ user });
  }

  componentDidUpdate(prevProps: Location): void {
    const { location } = this.props as Location;
    if (location !== prevProps.location) {
      const user = getCurrentUser();
      this.setState({ user });
    }
  }

  render(): React.ReactNode {
    const { user } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main className="container-fluid flex-fill" style={{ padding: 0 }}>
          <Switch>
            <ProtectedRoute
              component={EditDrawing}
              painter="true"
              path="/edit/:id"
            />
            <ProtectedRoute
              component={CreateDrawing}
              painter="true"
              path="/create-drawing"
            />
            <ProtectedRoute
              component={MyDrawings}
              painter="true"
              path="/my-drawings"
            />
            <Route component={MyFavorites} path="/my-favorites" />
            <Route component={Signup} path="/sign-up" />
            <Route component={PainterSignup} path="/painter-sign-up" />
            <Route component={Signin} path="/sign-in" />
            <Route
              path="/logout"
              render={({ history }) => {
                logout();
                this.setState({ user: getCurrentUser() }, () =>
                  history.push("/")
                );
                return null;
              }}
            />
            <Route component={About} path="/about" />
            <Route component={Profile} path="/me" />
            <Route path="/user/:id">
              <Profile owner={false} />
            </Route>
            <Route component={Browse} path="/browse" />
            <Route component={Home} exact path="/" />
            <Redirect to="/" /> {/* TODO: add 404 page not found */}
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
