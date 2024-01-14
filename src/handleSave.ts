import axios from "axios";

export function handleSave(event: Event) {
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token not available');
        return;
    }

    const saveButton = event.currentTarget as HTMLElement;
    const recipeId = saveButton.getAttribute('data-recipe-id');

    if (!recipeId) {
        console.error('Recipe ID not available');
        return;
    }

    const heartIcon = saveButton.querySelector('.ph-heart') as HTMLElement;

    axios.post(`http://localhost:8000/api/recipe/saved-recipes/${recipeId}/save`, {
            recipeId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Recipe saved successfully:', response.data);
            // Update UI or provide feedback to the user
            if (heartIcon) {
                heartIcon.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error saving the recipe:', error);
            // Handle the error case if needed, e.g., display an error message
        });
}
