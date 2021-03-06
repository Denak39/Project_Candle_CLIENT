import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ActivitiesDIY from "./pages/ActivitiesDIY";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import OneActivity from "./pages/OneActivity";
import Favorites from "./pages/Favorites";
import StepbyStep from "./pages/StepbyStep";
import RandomActivity from "./components/Forms/discover/RandomActivity";
import DiscoverOneGif from "./components/Forms/discover/DiscoverOneGif";

function App() {
  return (
    <div className="App">
      {/* <NavMain /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/activities/DIY" component={ActivitiesDIY}></Route>
        <Route exact path="/activities/:id/steps" component={StepbyStep} />
        <Route exact path="/activities/:id" component={OneActivity} />
        <Route exact path="/discover/:id" component={DiscoverOneGif} />
        <Route exact path="/discover" component={RandomActivity} />
        <ProtectedRoute exact path="/favorites" component={Favorites} />
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
