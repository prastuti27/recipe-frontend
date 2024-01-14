


import axios from "axios";

export async function handleLikeButtonClick(likeButton: HTMLElement, recipeId: number, isLiked: boolean) {
  let response; 

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not available');
      return;
    }

   
    isLiked = !isLiked;

  
    likeButton.style.color = isLiked ? 'blue' : 'black';

    const endpoint = isLiked ? 'like' : 'unlike';
         response = await axios.post(`http://localhost:8000/api/recipe/likes/${recipeId}/${endpoint}`, {
      recipeId,
      isLiked,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

 
    if (response.data.success) {
      likeButton.classList.toggle('liked', isLiked);
     
    }
  } catch (error) {
    console.error('Error updating like status:', error);
    console.log('Server response:', response); 
    
  }
}
