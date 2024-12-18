import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.min.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployeeDetails from "./pages/EditEmployeeDetails";
import AddEmployee from "./pages/AddEmployee";
import Employee from "./pages/Employee";
import Profile from "./pages/Profile";
import Accounts from "./pages/Accounts";
import AddAccount from "./pages/AddAccount";

function App() {
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div className="App">
      {user ? (
        <Switch>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/employee" component={Employee} />
            <Route exact path="/add_employee" component={AddEmployee} />
            <Route
              exact
              path="/edit_employee/:id"
              component={EditEmployeeDetails}
            />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/accounts" component={Accounts} />
            <Route exact path="/add_account" component={AddAccount} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch>
      ) : (
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
