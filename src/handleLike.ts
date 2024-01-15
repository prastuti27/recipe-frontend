import axios from "axios";

export async function handleLikeButtonClick(likeButton: HTMLElement, recipeId: number, isLiked: boolean) {
  let response = null; 

  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not available');
      return;
    }
  
    const endpoint = isLiked ?  'unlike':'like';
    console.log(isLiked)
    console.log('Endpoint:', endpoint);
    console.log('Before Axios request');
    response = await axios.post(`http://localhost:8000/api/recipe/likes/${recipeId}/${endpoint}`, {
      recipeId
      
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('After Axios request');
    console.log('Server Response:', response);

    if (response.data.success) {
      isLiked = !isLiked; 
      likeButton.classList.toggle('liked', isLiked);
      likeButton.style.color = isLiked ? 'blue' : 'black';
    }

  } catch (error:any) {
  
    if (error.response && error.response.status === 500 && error.response.data.message === 'User has already liked this recipe') {
 
      likeButton.classList.remove('liked');
      likeButton.style.color = 'black';
      isLiked = false;
    } else {
      
      console.error('Error updating like status:', error);
      console.log('Server response:', response);
    }
  }
}

