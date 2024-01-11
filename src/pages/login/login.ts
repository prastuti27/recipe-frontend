import axios from "axios";

const email = document.querySelector<HTMLInputElement>("#Email");
const password = document.querySelector<HTMLInputElement>("#password");
const loginButton = document.querySelector<HTMLButtonElement>("button");
const togglePassword = document.querySelector<HTMLAnchorElement>(
  ".password-toggle-icon"
);
const loginUrl = "http://localhost:8000/api/auth/login";

togglePassword?.addEventListener("click", (e) => {
  console.log("hii");
  e.preventDefault();
  const type =
    password?.getAttribute("type") === "password" ? "text" : "password";
  password?.setAttribute("type", type);
});

loginButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  const userData = {
    email: email?.value,
    password: password?.value,
  };
  console.log(email?.value, password?.value);
  const res = await axios.post(loginUrl, userData);
  const userDatas = res.data.user;
  localStorage.setItem("user", JSON.stringify(userDatas));
  localStorage.setItem("token", res.data.user.accessToken);
  if (res.status === 200) {
    localStorage.setItem("token", res.data.user.accessToken);
    window.location.href = "../../";
  }
  console.log(res);
});
