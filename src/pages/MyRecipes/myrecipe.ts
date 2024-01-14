

import axios from "axios";
import { deleteRecipe } from './delete';


interface CreateRecipePayloadInterface {
  id: number;
  title: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string[];
  photo: string;
  createdBy: number;
  firstname: string;
  lastname: string;
  categories: string[];
}


interface DecodedToken {
  id: number;
  
}


const getUserIdFromToken = (token: string): number | null => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
    return decodedToken.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

window.addEventListener('load', async function () {

  try {
  
    const token = localStorage.getItem('token');

    if (!token) {
      
      console.error('Token not available');
      return;
    }

   
    const userId = getUserIdFromToken(token);

    if (userId === null) {
      console.error('Error extracting user ID from token');
      return;
    }


    const response = await axios.get(`http://localhost:8000/api/recipe/user/${userId}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const recipes: CreateRecipePayloadInterface[] = response.data.data;

    
    const myRecipeContainer = document.querySelector('.myRecipeContainer');

   

    
    recipes.forEach((recipe: CreateRecipePayloadInterface) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';
    
 
 

      card.innerHTML = `
        <img src="${recipe.photo}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">${recipe.description}</p>
          <i class="ph ph-heart"></i>
          <i class="ph ph-thumbs-up"></i>
          <i class="ph ph-chat-centered-dots"></i>
         
        </div>
      `;
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', async() => {
        await deleteRecipe(recipe.id)});
      //   const editButton = document.createElement('button');
      // editButton.type = 'button';
      // editButton.classList.add('btn', 'btn-primary');
      // editButton.textContent = 'Edit';
      // editButton.addEventListener('click', () => edit(recipe));
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        // cardBody.appendChild(editButton);
        cardBody.appendChild(deleteButton);
       
      }

      
   
      myRecipeContainer?.appendChild(card);
    }
    );
  } catch (error) {
    console.error('Error fetching or displaying recipe data:', error);
  }
});
