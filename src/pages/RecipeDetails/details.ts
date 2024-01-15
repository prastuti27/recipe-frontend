import axios from "axios";
import  "../../stylesheet/detail.css"
interface createRecipePayloadInterface {
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  photo: string;
  createdBy: number;
  firstname: string;
  lastname: string;

  categories:{ categoryName: string }[];
}

console.log(window.location.search);

const query = window.location.search;
const id = query.split('=')[1];

axios.get(`http://localhost:8000/api/recipe/recipes/${id}`)
  .then(async (response) => {
    console.log('After recipe request');
    const recipe: createRecipePayloadInterface = response.data;
    const userResponse = await axios.get(`http://localhost:8000/api/users/${recipe.createdBy}`);
    console.log('User Data:', userResponse.data);
    const user = userResponse.data.data;
    
    const recipeDetail = document.querySelector('.recipeDetails');

console.log(recipe);

    const detail = document.createElement('div');
    detail.classList.add('detail'); 
    // card.style.width = '18rem';

    const ingredientDetails = recipe.ingredients.map((ingredient) => `
      <p class="detail-ingredients">${ingredient.name}</p>
      <p class="detail-ingredients">${ingredient.quantity}</p>
    `);
    const categoryDetails = recipe.categories.map((category) => `
    <p class="detail-categories">${category.categoryName}</p>`)
    detail.innerHTML = `
      <img src="${recipe.photo}" alt="${recipe.title}">
      <div class="detail-body">
        <h5>Title: ${recipe.title}</h5>
        <p class="detail-text">description: ${recipe.description}</p>
       Ingredients:  ${ingredientDetails} 
        <p class="detail-instructions">Steps:${recipe.instructions}</p>
        ${categoryDetails}
       
        <h1 class="card-title">By${user.firstname } ${ user.lastname}</h1>
      </div>
    `;
    console.log(response.data);

    recipeDetail?.appendChild(detail);
  })
  .catch((err) => {
    console.error(err);
  });
