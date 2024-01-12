import axios from "axios"

const firstname = document.querySelector<HTMLInputElement>("#firstname");
const lastname= document.querySelector<HTMLInputElement>("#lastname");
const email = document.querySelector<HTMLInputElement>("#Email");
const password = document.querySelector<HTMLInputElement>("#password");
const signupButton = document.querySelector<HTMLButtonElement>("button");
const togglePassword = document.querySelector<HTMLAnchorElement>(
  ".password-toggle-icon"
);
const signinUrl = "http://localhost:8000/api/auth/register";

togglePassword?.addEventListener("click", (e) => {
  console.log("hii");
  e.preventDefault();
  const type =
    password?.getAttribute("type") === "password" ? "text" : "password";
  password?.setAttribute("type", type);
});

signupButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  const userData = {
    firstname : firstname?.value,
    lastname: lastname?.value,
    email: email?.value,
    password: password?.value,
  };
  console.log(firstname?.value, lastname?.value,email?.value, password?.value);
  const res = await axios.post(signinUrl, userData);
  const userDatas = res.data.user;
  
    window.location.href = "../login/login.html";
  
  console.log(userDatas);
});
