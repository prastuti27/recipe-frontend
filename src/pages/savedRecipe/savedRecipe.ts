import axios
 from "axios";
interface SavedRecipe {
    id: number;
    title: string;
    description: string;
    photo: string;
    // Add other properties as needed
}

// ...

document.addEventListener('DOMContentLoaded', () => {
    // Fetch saved recipes from the server
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

        // Display saved recipes by creating cards
      

        savedRecipes.forEach(savedRecipe => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';

            card.innerHTML = `
                <img src="${savedRecipe.photo}" class="card-img-top" alt="${savedRecipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${savedRecipe.title}</h5>
                    <p class="card-text">${savedRecipe.description}</p>
                    <!-- Add other details as needed -->
                </div>
            `;

            savedRecipesContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error fetching saved recipes:', error);
    });
}});
