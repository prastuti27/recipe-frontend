
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
 
  const urlSearchParams = new URLSearchParams(window.location.search);
  const recipeId = urlSearchParams.get('id');

  if (!recipeId) {
    console.error('Recipe ID not found in URL parameters.');
    return;
  }

  const apiUrl = `http://localhost:8000/api/recipe/recipes/${recipeId}`;

  if (!document) {
    console.error('Document object is not available.');
    return;
  }


axios.get(apiUrl)
  .then(response => {
    console.log('Full Response:', response);

    if (response.status === 200) {
      const data = response.data;

      console.log('Response Data:', data);

      const titleElement = document.getElementById('title') as HTMLInputElement | null;
      const descriptionElement = document.getElementById('description') as HTMLTextAreaElement | null;
      const ingredientsTable = document.querySelector('#ingredients-table') as HTMLTableElement | null;
      const instructionsTable = document.querySelector('#instructions-table') as HTMLTableElement | null;
      const photoElement = document.getElementById('editimg') as HTMLImageElement | null;
      const categoriesElement = document.getElementById('categories') as HTMLInputElement | null;

      console.log('titleElement:', titleElement);
      console.log('descriptionElement:', descriptionElement);
      console.log('ingredientsTable:', ingredientsTable);
      console.log('instructionsTable:', instructionsTable);
      console.log('photoElement:', photoElement);
      console.log('categoriesElement:', categoriesElement);

     
    
      const titleValue = titleElement ? data.title : 'Default Title';
      if (titleElement) {
        titleElement.value = titleValue;
      }

      if (descriptionElement) {
        descriptionElement.value = data.description || ''; 
      }

      if (ingredientsTable) {
        if (data.ingredients && data.ingredients.length > 0) {
            data.ingredients.forEach((ingredient: { name: string; quantity: string }) => {
            const row = ingredientsTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
      
            cell1.textContent = ingredient.name;
            cell2.textContent = ingredient.quantity;
          });
        } else {
          console.warn('No ingredients found.');
        }
      } else {
        console.warn('Ingredients table not found. Skipping population.');
      }

    
      if (instructionsTable) {
       
        instructionsTable.innerHTML = '';

      
        if (data.instructions && data.instructions.length > 0) {
          data.instructions.forEach((instruction: string) => {
            const row = instructionsTable.insertRow();
            const cell1 = row.insertCell(0);

            cell1.textContent = instruction;
          });
        } else {
          console.warn('No instructions found.');
        }
      } else {
        console.warn('Instructions table not found. Skipping population.');
      }
      interface Category {
        categoryName: string;
        
      }
      
   
      if (photoElement) {
       
        if (data.photo) {
          photoElement.src = data.photo;
        } else {
          console.warn('No photo URL found.');
        }
      } else {
        console.warn('Photo element not found. Skipping population.');
      }

      interface Category {
        categoryName: string;
        
      }
    if (categoriesElement) {
  if (data.categories && data.categories.length > 0) {
    const categoryNames = data.categories.map((category: Category) => category.categoryName);
    categoriesElement.value = categoryNames.join(', ');
  } else {
    console.warn('No categories found.');
  }
} else {
  console.warn('Categories element not found. Skipping population.');
}
console.log('Recipe details retrieved successfully');
      
  }})
  .catch(error => {
    console.error('Error fetching recipe details:', error);
  });})
  const ingredientsTable = document.querySelector('#ingredients-table') as HTMLTableElement | null;
  console.log('ingredientsTable:', ingredientsTable);
