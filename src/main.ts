import axios from "axios";
const user = document.createElement("button");
const logout = document.querySelector<HTMLButtonElement>("#logout");
const btndiv =
  (document.getElementById("btn-div") as HTMLElement) ||
  document.createElement("div");
btndiv.appendChild(user);

logout?.addEventListener("click", async (e) => {
  e.preventDefault();

  localStorage.removeItem("token");
  btndiv.innerHTML = "";

  console.log(res);
});

const userData = JSON.parse(localStorage.getItem("user")!);
const accessToken = localStorage.getItem("token");
if (!accessToken) {
  console.error("No access token found");
}
const username = userData.fullname;
const res = axios.get("http://localhost:8000/api/users", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
if (user) {
  user.textContent = username;
}



// main.ts

const title = document.querySelector<HTMLHeadingElement>(".card-title");
const description = document.querySelector<HTMLParagraphElement>(".card-text");

if (title && description) {
  axios.get('your_recipe_api_url')
    .then((response) => {
      const { title, description } = response.data;

     
      if (title !== null && description !== null) {
      title.textContent = title;
        description.textContent = description;
      } else {
        console.error('Recipe title or description is null.');
      }
    })
    .catch((error) => {
      console.error('Error fetching recipe data:', error);
    });
} else {
  console.error('Card title or description element not found.');
}
