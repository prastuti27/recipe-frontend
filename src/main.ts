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
document.addEventListener('DOMContentLoaded', function () {
  // Your code here




// axios.get("http://localhost:8000/api/recipe/recipes")
//   .then((response) => {
//     const { title, description } = response.data.data;
    

//     if (title !== null && description !== null) {
//       const titleElement = document.querySelector('.card-title'); // Use querySelector to find elements within the card
//       const descriptionElement = document.querySelector('.card-text'); // Use querySelector to find el
//       if (titleElement && descriptionElement) {
//         titleElement.textContent = title;
//         descriptionElement.textContent = description;
//       } else {
//         console.error('Card title or description element not found.');
//       }
//     } else {
//       console.error('Recipe title or description is null.');
//     }
//   })
 
//   .catch((error) => {
//     console.error('Error fetching recipe data:', error);
//   });

interface createRecipePayloadInterface {
  id: number;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  photo: string;
  createdBy: number;
  categories:string[]
};


axios.get("http://localhost:8000/api/recipe/recipes")
  .then((response) => {
    const recipes: createRecipePayloadInterface[] = response.data.data;

    const recipeContainer = document.querySelector('.recipeContainer');

    console.log(recipes)

    recipes.forEach((recipe: createRecipePayloadInterface) => { 
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';

      card.innerHTML = `
        <img src="${recipe.photo}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">${recipe.description}</p>
          <a href="./pages/RecipeDetails/details.html?id=${recipe.id}" class="btn btn-primary">Details</a>
          <i class="ph ph-heart"></i>
          <i class="ph ph-thumbs-up"></i>
          <i class="ph ph-chat-centered-dots"></i>
        </div>
      `;

      recipeContainer?.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error fetching recipe data:', error);
  });

    })
    
