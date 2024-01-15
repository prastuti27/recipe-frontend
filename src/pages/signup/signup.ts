import axios from "axios";
import * as yup from "yup";

const firstname = document.querySelector<HTMLInputElement>("#firstname");
const lastname = document.querySelector<HTMLInputElement>("#lastname");
const email = document.querySelector<HTMLInputElement>("#Email");
const password = document.querySelector<HTMLInputElement>("#password");
const signupButton = document.querySelector<HTMLButtonElement>("button");
const togglePassword = document.querySelector<HTMLAnchorElement>(
  ".password-toggle-icon"
);
const signupUrl = "http://localhost:8000/api/auth/register";

// Define Yup schema for form validation
const schema = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

togglePassword?.addEventListener("click", (e) => {
  e.preventDefault();
  const type =
    password?.getAttribute("type") === "password" ? "text" : "password";
  password?.setAttribute("type", type);
});

signupButton?.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Validate form data using Yup schema
    await schema.validate(
      {
        firstname: firstname?.value,
        lastname: lastname?.value,
        email: email?.value,
        password: password?.value,
      },
      { abortEarly: false }
    );

    const userData = {
      firstname: firstname?.value,
      lastname: lastname?.value,
      email: email?.value,
      password: password?.value,
    };

    console.log("Sending signup request...");
    const res = await axios.post(signupUrl, userData);
    console.log("Signup response:", res);

    if (res.status === 200) {
      // Display a success message
      alert("Registration successful! You can now log in.");
      console.log("Navigating to login page...");
      window.location.href = "../login/login.html";
    }
  } catch (error: any) {
    // Handle validation errors
    console.error("Signup failed:", error.errors);

    // Display an error message
    alert("Registration failed. Please check your inputs.");
  }
});
