import axios from "axios"
 export async function deleteRecipe(recipeId:number) {
    try {
      const token = localStorage.getItem('token');
  
      if (!token) {
        console.error('Token not available');
        return;
      }
  
      const response = await axios.delete(`http://localhost:8000/api/recipe/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Assuming your API returns some indication of success
      if (response.data.success) {
        // Assuming you want to remove the deleted recipe from the UI
        const deletedCard = document.getElementById(`recipe-${recipeId}`);
        if (deletedCard) {
          deletedCard.remove();
        
  
          console.log('Recipe deleted successfully');
        } else {
          console.error('Error: Deleted card not found in the UI');
        }
      } else {
        console.error('Server reported an error:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  }