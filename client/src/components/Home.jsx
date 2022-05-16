import { useState, useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import Cookies from "js-cookie";
import { useJwt } from "react-jwt";

import WelcomeUser from "./WelcomeUser";
import SignIn from "./SignIn";

const Home = () => {
  // Define two states "user" and "isLoading"
  // If (user === null) => Redirect to sign-in page
  // If (user !== null) => Redirect to welcome page
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1- Check if a user JWT is stored
  const userJWT = Cookies.get("jwt");
  const { decodedToken, isTokenExpired } = useJwt(userJWT);

  // Run this code once before the React app loads
  useEffect(() => {
    if (userJWT) {
      // User JWT is found
      // 2- Check if it is valid and not expired yet
      if (isTokenExpired) {
        // (If JWT expired) 3- Remove the expired token from browser
        Cookies.remove("jwt");
        localStorage.removeItem("user");
        // (If JWT expired) 4- Redirect the user to sign-in
        setUser(null);
      }
    }
    // (If JWT valid) 3- Get the user's data
    const loggedUser = localStorage.getItem("user");
    // (If JWT valid) 4- Redirect the user to welcome page
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? (
        // render loading status until the useEffect code is executed
        <p>Loading...</p>
      ) : user ? (
        // If a user exists in the localStorage with valid JWT in the cookies
        // Then render the welcome page
        <WelcomeUser user={user} />
      ) : (
        // If not: redirect the user to sign-in page
        <SignIn />
      )}
    </div>
  );
};

export default Home;
