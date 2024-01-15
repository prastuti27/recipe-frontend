import axios from "axios";
import "../../stylesheet/home.css";

interface SavedRecipe {
    id: number;                // ID of the saved recipe
    userId: number;            // User ID
    savedRecipeId: number;     // ID of the saved recipe (if needed)
    photo: string;             // Photo URL
    title: string;             // Recipe title
    description: string;       // Recipe description
    recipeId: number;          // Actual recipe ID
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not available');
        return;
    }

    const savedRecipesContainer = document.getElementById('savedRecipesContainer');

    if (savedRecipesContainer) {
        axios.get<SavedRecipe[]>('http://localhost:8000/api/recipe/saved-recipes', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            const savedRecipes = response.data;

            savedRecipes.forEach(savedRecipe => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.width = '18rem';

                const unsaveButton = document.createElement('button');
                unsaveButton.classList.add('btn', 'btn-danger');
                unsaveButton.textContent = 'Unsave';

                unsaveButton.addEventListener('click', () => unsaveRecipe(savedRecipe.recipeId, card));

                card.innerHTML = `
                    <img src="${savedRecipe.photo}" class="card-img-top" alt="${savedRecipe.title}">
                    <div class="card-body">
                        <h5 class="card-title">${savedRecipe.title}</h5>
                        <p class="card-text">${savedRecipe.description}</p>
                        <a href="../RecipeDetails/details.html?id=${savedRecipe.recipeId}" class="btn btn-primary">Details</a>
                    </div>
                `;

                savedRecipesContainer.appendChild(card);
                const cardBody = card.querySelector('.card-body');
                
                if (cardBody) {
                    cardBody.appendChild(unsaveButton);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching saved recipes:', error);
        });
    }
});

function unsaveRecipe(recipeId: number, card: HTMLElement) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not available');
        return;
    }

    axios.delete(`http://localhost:8000/api/recipe/saved-recipes/${recipeId}/unsave`,  {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log('Recipe successfully unsaved:', response.data);
        // Remove the card from the DOM
        card.remove();
        // You can update the UI or take other actions as needed
    })
    .catch(error => {
        console.error('Error unsaving recipe:', error);
    });
}
