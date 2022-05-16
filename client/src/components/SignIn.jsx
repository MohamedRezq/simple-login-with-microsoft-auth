import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import axiosInstance for authorized connection with API
import axiosInstance from "../utils/axiosInstance";

const SignIn = () => {
  // Use "navigate" to link programatically to another route
  const navigate = useNavigate();
  // "invalidCredentialsMsg" to show one of the invalid email/password messages
  const [invalidCredentialsMsg, setInvalidCredentialsMsg] = useState("");
  // "showPassword" state to show/hide password when toggling "eye" icon
  const [showPassword, setShowPassword] = useState(false);
  // "inputs" object to store the sign-in form input values
  const [inputs, setInputs] = useState({});

  // This function handles any change in the sign-in form input values
  const handleChange = (event) => {
    // Get the name and value of the input field changed
    const name = event.target.name;
    const value = event.target.value;
    // Update "inputs" state with the changed field value
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // This function handles the form submit to sign-in the user
  const handleSubmit = async (e) => {
    // Prevent the default behavior of submitting a form (reloading the page)
    e.preventDefault();
    // Call the API to sign-in the user
    try {
      const res = await axiosInstance.post(
        `http://localhost:4000/api/accounts/signin`,
        inputs
      );
      // If the user credentials are correct, redirect to two-factor-auth page (QR-Code)
      const user = res?.data?.user;
      console.log("user rx: ", user);
      navigate(`/tfa?id=${user?.id}`);
    } catch (error) {
      // If the user credentials are invalid, show an error message
      //setInvalidCredentialsMsg(res?.data?.message);
      setInvalidCredentialsMsg(error?.response?.data?.message);
      console.log("Error happened while trying the sign-in: ", error);
    }
  };
  return (
    <div className="SignIn">
      <section className="max-w-xl mt-20 p-6 mx-auto bg-white rounded-md shadow-md text-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="emailInput"
                name="email"
                type="text"
                placeholder="Email"
                className="block w-full"
                onChange={handleChange}
              />
            </div>

            <div className="w-full flex flex-row items-center px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="passwordInput"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="block w-full"
                onChange={handleChange}
              />
              <div
                className="showPasswordToggler cursor-pointer"
                onClick={(e) => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </div>
            </div>
          </div>
          <div className="rememberMeSection flex flex-row px-1 py-2 mt-4 space-x-4">
            <input
              id="rememberMeCheckBox"
              type="checkbox"
              className="h-8 w-8 rounded-xl"
            />
            <div>Remember Me</div>
          </div>
          <div className="flex justify-center mt-6 px-2">
            <p className="text-red-600 text-lg">{invalidCredentialsMsg}</p>
          </div>
          <div className="flex justify-end mt-6 px-2">
            <button className="px-6 w-full py-4 font-bold leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
              Login
            </button>
          </div>
          <div className="notMemberSection flex flex-row mt-6 space-x-4 px-2">
            <div>Not a Member?</div>
            <div>
              <a className="text-green-600 font-bold hover:underline" href="/">
                <Link to="/signup">Create an account</Link>
              </a>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
