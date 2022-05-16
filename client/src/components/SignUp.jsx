import React, { useState } from "react";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";

import axiosInstance from "../utils/axiosInstance";
import validePasswordSchema from "../utils/passwordValidator";

const SignUp = () => {
  // Use "navigate" to link programatically to another route
  const navigate = useNavigate();
  // "showPassword" state to show/hide password when toggling "eye" icon
  const [showPassword, setShowPassword] = useState(false);
  // "isValidPassword" to detect if the user is typing a valid password or not
  const [isValidPassword, setIsValidPassword] = useState(false);
  // "passwordErrorsList" to all the mistakes while the user is typing a password
  const [passwordErrorsList, setPasswordErrorsList] = useState([
    "min",
    "lowercase",
    "uppercase",
    "symbols",
    "digits",
  ]);
  // "isValidPassword" to detect if the user is typing a valid email address or not
  const [isValidEmail, setIsValidEmail] = useState(false);
  // "inputs" object to store the sign-in form input values
  const [inputs, setInputs] = useState({});

  // This function handles any change in the sign-in form input values
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // This function handles the form submit to sign-in the user
  const handleSubmit = async (e) => {
    // Prevent the default behavior of submitting a form (reloading the page)
    e.preventDefault();
    if (
      isValidEmail &&
      isValidPassword &&
      inputs.first_name !== "" &&
      inputs.last_name !== ""
    ) {
      // Call the API to sign-up the user
      const res = await axiosInstance.post(
        `http://localhost:4000/api/accounts/signup`,
        inputs
      );
      // If the user is signed up correctly, redirect to sign-in page
      if (res.status === 200) {
        navigate("/");
      } else {
        console.log("Internal server error");
      }
    } else {
      console.log("Please fill out all the required fields");
    }
  };
  return (
    <div className="SignUp">
      <section className="max-w-4xl mt-20 p-6 mx-auto bg-white rounded-md shadow-md text-xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="first_nameInput"
                name="first_name"
                type="text"
                placeholder="First Name"
                className="block w-full focus:outline-none"
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="last_nameInput"
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="block w-full focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="emailInput"
                name="email"
                type="text"
                placeholder="Email"
                className="block w-full focus:outline-none"
                onChange={(e) => {
                  if (validator.isEmail(e.target.value)) {
                    setIsValidEmail(true);
                    handleChange(e);
                  } else {
                    setIsValidEmail(false);
                  }
                }}
              />
            </div>

            <div className="w-full flex flex-row items-center px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-green-500 focus:border-opacity-40 focus:outline-none">
              <input
                id="passwordInput"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="block w-full focus:outline-none"
                onChange={(e) => {
                  const passwordErrors = validePasswordSchema.validate(
                    e.target.value,
                    { details: true }
                  );
                  let errorsList = [];
                  passwordErrors.map((mistake) => {
                    errorsList.push(mistake.validation);
                  });
                  setPasswordErrorsList(errorsList);
                  if (passwordErrors.length === 0) {
                    setIsValidPassword(true);
                    handleChange(e);
                  } else {
                    setIsValidPassword(false);
                  }
                }}
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
            <div></div>
            <div className="passwordValidationTicks grid grid-cols-3 text-xs space-y-2">
              <div className="flex items-center">
                {passwordErrorsList.includes("lowercase") ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
                <div className="mx-2">Lowercase</div>
              </div>
              <div className="flex items-center">
                {passwordErrorsList.includes("uppercase") ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
                <div className="mx-2">Uppercase</div>
              </div>
              <div className="flex items-center">
                {passwordErrorsList.includes("symbols") ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
                <div className="mx-2">Special characters</div>
              </div>
              <div className="flex items-center">
                {passwordErrorsList.includes("digits") ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
                <div className="mx-2">Number</div>
              </div>
              <div className="flex items-center">
                {passwordErrorsList.includes("min") ? (
                  <i class="fas fa-times"></i>
                ) : (
                  <i className="fas fa-check"></i>
                )}
                <div className="mx-2">Min 8 characters</div>
              </div>
            </div>
          </div>

          <div className="flex mt-6 px-2 w-1/2 mx-auto">
            <button className="px-6 w-full py-4 font-bold leading-5 text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700">
              Sign Up
            </button>
          </div>
          <div className="haveAccountSection flex flex-row mt-6 space-x-4 px-2 justify-center">
            <div>Have an account?</div>
            <div>
              <a className="text-green-600 font-bold hover:underline" href="/">
                <Link to="/login">Login</Link>
              </a>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
