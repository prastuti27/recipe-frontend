import axios from "axios";
import * as yup from "yup";

const email = document.querySelector<HTMLInputElement>("#Email");
const password = document.querySelector<HTMLInputElement>("#password");
const loginButton = document.querySelector<HTMLButtonElement>("button");
const togglePassword = document.querySelector<HTMLAnchorElement>(".password-toggle-icon");
const loginUrl = "http://localhost:8000/api/auth/login";
const schema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

togglePassword?.addEventListener("click", (e) => {
  e.preventDefault();
  const type =
    password?.getAttribute("type") === "password" ? "text" : "password";
  password?.setAttribute("type", type);
});

loginButton?.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    // Validate form data using Yup schema
    await schema.validate({ email: email?.value, password: password?.value }, { abortEarly: false });

    const userData = {
      email: email?.value,
      password: password?.value,
    };

    const res = await axios.post(loginUrl, userData);
    const userDatas = res.data.user;

    localStorage.setItem("user", JSON.stringify(userDatas));
    localStorage.setItem("token", res.data.user.accessToken);

    if (res.status === 200) {
      // Display a success message
      alert("Login successful!");
      localStorage.setItem("token", res.data.user.accessToken);
      window.location.href = "../../";
    }
  } catch (error:any) {
    // Handle validation errors
    console.error(error.errors);

    alert("Login failed. Please check your credentials.");
  }
});
