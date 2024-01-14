// import axios from "axios";
// // import jwt_decode from "jwt-decode";





// interface createRecipePayloadInterface {
//   id: number;
//   title: string;
//   description: string;
//   ingredients: { name: string; quantity: string }[];
//   instructions: string[];
//   photo: string;
//   createdBy: number
    
//     firstname: string;
//     lastname: string;
  
//   categories:string[]
// };



// interface DecodedToken {
//   id: number; // Adjust this based on your actual token structure
//   // Add other fields if needed
// }

// // Function to get the user ID from the decoded token
// const getUserIdFromToken = (token: string): number | null => {
//   try {
//     const decodedToken = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
//     return decodedToken.id;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };

// document.addEventListener('DOMContentLoaded', async function () {
   
//   try {
//     // Get the token from local storage
//     const token = localStorage.getItem('token');

//     if (!token) {
//       // Handle the case where the token is not available
//       console.error('Token not available');
//       return;
//     }

//     // Extract the user ID from the token
//     const userId = getUserIdFromToken(token);

//     if (userId === null) {
//       console.error('Error extracting user ID from token');
//       return;
//     }

//     // Make the API request using the user ID
//     const response = await axios.get(`http://localhost:8000/api/recipe/user/${userId}/recipes`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const recipes: createRecipePayloadInterface[] = response.data.data;

//     const myRecipeContainer = document.querySelector('.myRecipeContainer');

//     recipes.forEach((recipe: createRecipePayloadInterface) => {
//       const card = document.createElement('div');
//       card.classList.add('card');
//       card.style.width = '18rem';

//       card.innerHTML = `
//         <img src="${recipe.photo}" class="card-img-top" alt="${recipe.title}">
//         <div class="card-body">
//           <h5 class="card-title">${recipe.title}</h5>
//           <p class="card-text">${recipe.description}</p>
//           <i class="ph ph-heart"></i>
//           <i class="ph ph-thumbs-up"></i>
//           <i class="ph ph-chat-centered-dots"></i>
         
    
//   </div>
        
//       `;
   
//       myRecipeContainer?.appendChild(card);
//     });
//   } catch (error) {
//     console.error('Error fetching recipe data:', error);
//   }
// });
import axios from "axios";

// Define the recipe payload interface
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

// Define the decoded token interface
interface DecodedToken {
  id: number;
  // Add other fields if needed
}

// Function to get the user ID from the decoded token
const getUserIdFromToken = (token: string): number | null => {
  try {
    const decodedToken = JSON.parse(atob(token.split('.')[1])) as DecodedToken;
    return decodedToken.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case where the token is not available
      console.error('Token not available');
      return;
    }

    // Extract the user ID from the token
    const userId = getUserIdFromToken(token);

    if (userId === null) {
      console.error('Error extracting user ID from token');
      return;
    }

    // Make the API request using the user ID
    const response = await axios.get(`http://localhost:8000/api/recipe/user/${userId}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Extract recipes from the API response
    const recipes: CreateRecipePayloadInterface[] = response.data.data;

    // Get the container element where recipes will be displayed
    const myRecipeContainer = document.querySelector('.myRecipeContainer');

   

    // Iterate through recipes and create cards for each
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

      // Append the card to the recipe container
      myRecipeContainer?.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching or displaying recipe data:', error);
  }
});
