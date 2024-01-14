import axios from "axios";

interface createRecipePayloadInterface {
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  photo: string;
  createdBy: number;
  categories: string[];
}

console.log(window.location.search);

const query = window.location.search;
const id = query.split('=')[1];

axios.get(`http://localhost:8000/api/recipe/recipes/${id}`)
  .then((response) => {
    const recipe: createRecipePayloadInterface = response.data;

    const recipeDetail = document.querySelector('.recipeDetails');

console.log(recipe);

    const detail = document.createElement('div');
    detail.classList.add('detail'); // Adding a class for styling
    // card.style.width = '18rem';

    // Using map to iterate through ingredients array
    const ingredientDetails = recipe.ingredients.map((ingredient) => `
      <p class="detail-ingredients">${ingredient.name}</p>
      <p class="detail-ingredients">${ingredient.quantity}</p>
    `); // Joining the array into a single string

    detail.innerHTML = `
      <img src="${recipe.photo}" alt="${recipe.title}">
      <div class="detail-body">
        <h5>${recipe.title}</h5>
        <p class="detail-text">${recipe.description}</p>
        ${ingredientDetails} <!-- Inserting ingredient details -->
        <p class="detail-instructions">${recipe.instructions}</p>
        <p class="detail-categories">${recipe.categories}</p>
        <p class="author">${recipe.createdBy}</p>
      </div>
    `;

    recipeDetail?.appendChild(detail);
  })
  .catch((err) => {
    console.error(err);
  });
