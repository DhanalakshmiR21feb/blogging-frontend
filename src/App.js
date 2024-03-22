import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dasboard/Dashboard"
function App() {
  return (
    <>    <Router>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route exact path="/logout" Component={Logout} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/" Component={Login} />
        <Route exact path="/dashboard" Component={Dashboard} />
        </Routes>
    </Router></>

  );
}

export default App;
