import React from "react";
import Cookies from "js-cookie";

const WelcomeUser = ({ user }) => {
  // Function to log-out the user when pressing "back" button
  const handleLogout = (e) => {
    localStorage.removeItem("user");
    Cookies.remove("jwt");
    window.location.reload(false); // Reload the page
  };
  
  return (
    <div className="WelcomeUser">
      <section className="max-w-3xl mt-20 p-8 mx-auto bg-white rounded-md shadow-md text-lg flex flex-col space-y-6">
        <div className="text-center text-2xl">
          Welcome {user.first_name} {user.last_name}
        </div>
        <div className="mx-auto w-60">
          <button
            onClick={handleLogout}
            className="px-6 w-full py-4 font-bold leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default WelcomeUser;
