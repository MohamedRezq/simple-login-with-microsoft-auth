import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

// Import all components needed
import TFA from "./components/TFA/index.jsx";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home.jsx";
import Cookies from "js-cookie";

const EXPIRY_TIME_IN_MIN = 30;

function App() {
  // Check user's inactivity time
  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * EXPIRY_TIME_IN_MIN,
    onIdle: handleInactiveUser,
  });

  // Run this if user is not active for 30 minutes
  function handleInactiveUser() {
    // Log out the user and redirect to sign-in page
    localStorage.removeItem("user");
    Cookies.remove("jwt");
    window.location.reload(false); // Reload the page
  }

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/tfa" element={<TFA />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
