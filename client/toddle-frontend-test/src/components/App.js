import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
//import UserDashboard from "../screens/UserDashboard";
import TutorDashboard from "../screens/TutorDashboard";
import TutorRoute from "./TutorRoute";
//import UserRoute from "./UserRoute";
import NotFound from "../screens/NotFound";
import TutorEditAssignment from "../screens/TutorEditAssignment";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />  
          <TutorRoute
            exact
            path="/tutor/dashboard"
            component={TutorDashboard}
          />
          <TutorRoute
            exact
            path="/Tutor/edit/assignment/:assignmentId"
            component={TutorEditAssignment}
          />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
