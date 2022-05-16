import PasswordValidator from "password-validator";

const validePasswordSchema = new PasswordValidator();
const specialCharactersRegExp = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
validePasswordSchema
  .is()
  .min(8) // Minimum length 8 characters
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must contain numbers
  .has()
  .not()
  .spaces() // Should not have spaces
  .has()
  .symbols(); // Should have special characters
//.is().not().oneOf(["Passw0rd", "Password123"]); // Blacklist these values

export default validePasswordSchema;
