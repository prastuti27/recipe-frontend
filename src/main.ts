import axios from "axios";
import  "./stylesheet/home.css"
import { handleLikeButtonClick } from "./handleLike";
import { handleSave } from "./handleSave";
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
const searchContainer = document.querySelector('.search');

if (searchContainer) {
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search for recipes...';

  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';

 
  searchContainer.appendChild(searchInput);
  searchContainer.appendChild(searchButton);
}

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




document.addEventListener('DOMContentLoaded', function () {








interface createRecipePayloadInterface {
  id: number;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  photo: string;
  createdBy: number
    
    firstname: string;
    lastname: string;
  
  categories:string[]
};


axios.get("http://localhost:8000/api/recipe/recipes")
  .then((response) => {
    const recipes: createRecipePayloadInterface[] = response.data.data;

    const recipeContainer = document.querySelector('.recipeContainer');

 

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
          <div class="save-button" data-recipe-id="${recipe.id}">
          <i class="ph ph-heart"></i>
        </div>
          <div class="like-button" data-recipe-id="${recipe.id}">
          <i class="ph ph-thumbs-up"></i>
        </div>
          <i class="ph ph-chat-centered-dots"></i>
          <h1 class="card-title">By${recipe.createdBy ? recipe.firstname : ''} ${recipe.createdBy ? recipe.lastname : ''}</h1>



        </div>
      `;
      const likeButton = card.querySelector('.like-button') as HTMLElement;
      console.log(response.data)
      const isLiked = response.data.isLiked; 
    
      const saveButton = card.querySelector('.save-button') as HTMLElement;
      saveButton?.addEventListener('click', (event) => handleSave(event));

      likeButton?.addEventListener('click', () => handleLikeButtonClick(likeButton, recipe.id, isLiked));
      recipeContainer?.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error fetching recipe data:', error);
  });

})
    
