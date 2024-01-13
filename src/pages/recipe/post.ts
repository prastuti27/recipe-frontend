import axios from "axios"


const title = document.querySelector<HTMLInputElement>("#title") as HTMLInputElement;
const description= document.querySelector<HTMLInputElement>("#description") as HTMLInputElement;
// const ingredients = document.querySelector<HTMLInputElement>("#ingredients")as HTMLInputElement;
const photoInput = document.querySelector<HTMLInputElement>("#photo")as HTMLInputElement;
// const instructions = document.querySelector<HTMLInputElement>("#instructions")as HTMLInputElement;
const categories = document.querySelector<HTMLInputElement>("#categories")as HTMLInputElement;
const submitButton = document.querySelector<HTMLButtonElement>("#submit-btn")as HTMLButtonElement;

const addRecipeUrl = "http://localhost:8000/api/recipe/recipes";


const ingredientsArray:{ name: string; quantity: string }[] = [];
const instructionsArray:string[] = []


export interface createRecipePayloadInterface {
    title: string;
    description: string;
    ingredients: { name: string; quantity: string }[];
    instructions: string[];
    photo: string;
    // createdBy: number;
    categories:string
  };

submitButton?.addEventListener("click", async (e) => {
try{
    e.preventDefault();
    const userData:createRecipePayloadInterface = {
      title: title.value,
      description: description.value,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      photo: "",
      categories: categories.value,
    };
    console.log(userData);
    const imageUrl = await uploadPhotoToCloudinary();
    userData.photo = imageUrl;
    const res = await axios.post(addRecipeUrl, userData);
    const userDatas = res.data.user;
    
      window.location.href = "../login/login.html";
    
    console.log(userDatas);
    console.log(photoInput.files);
}catch(error){
    console.log(error);
}

});


const ingredientInput = document.querySelector("#ingredient") as HTMLInputElement;
const quantity = document.querySelector("#quantity") as HTMLInputElement;
const addBtn = document.querySelector("#add-ingredient") as HTMLButtonElement;

addBtn.addEventListener("click",(e:Event)=>{
    e.preventDefault();
    const ingredient = ingredientInput.value;
    const qty = quantity.value;
    ingredientsArray.push({name:ingredient,quantity:qty})
    ingredientInput.value = "";
    quantity.value= "";

    const table = document.querySelector("table") as HTMLTableElement;
    const tableRow = document.createElement("tr") as HTMLTableRowElement;
    const ingredientData = document.createElement("td") as HTMLElement;

    ingredientData.innerText = ingredient;
    
    const qtyData = document.createElement("td") as HTMLElement;

    qtyData.innerText = ingredient;
    
    tableRow.appendChild(ingredientData);
    tableRow.appendChild(qtyData);
    table.appendChild(tableRow)
})


const instructionsInput= document.querySelector("#steps")as HTMLInputElement
const addStepsBtn = document.querySelector("#add-instruction") as HTMLButtonElement
const instructionsTable = document.querySelector("#instructions-table") as HTMLTableElement;


addStepsBtn.addEventListener("click",(e:Event)=>{
    e.preventDefault();
    const instruction = instructionsInput.value;
 
    instructionsArray.push(instruction)
    instructionsInput.value = "";


   
    const tableRow = document.createElement("tr") as HTMLTableRowElement;
    const instructionData = document.createElement("td") as HTMLElement;

    instructionData.innerText = instruction;
 


    tableRow.appendChild(instructionData);
  
    instructionsTable.appendChild(tableRow)
})

async function uploadPhotoToCloudinary(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const file = photoInput.files && photoInput.files[0];
    console.log(file)

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

    
      axios.post(`https://api.cloudinary.com/v1_1/dvzvehmau/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': '581965853338769',
        },
      })
        .then((response) => {
          resolve(response.data.secure_url);
        })
        .catch((error) => {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        });
    } else {
      reject(new Error("No file selected"));
    }
  });
}



