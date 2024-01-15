import axios from "axios"


const title = document.querySelector<HTMLInputElement>("#title") as HTMLInputElement;
const description= document.querySelector<HTMLInputElement>("#description") as HTMLInputElement;
// const ingredients = document.querySelector<HTMLInputElement>("#ingredients")as HTMLInputElement;
const photoInput = document.querySelector<HTMLInputElement>("#photo")as HTMLInputElement;
// const instructions = document.querySelector<HTMLInputElement>("#instructions")as HTMLInputElement;
const categories = document.querySelector<HTMLInputElement>("#categories")as HTMLInputElement;
const submitButton = document.querySelector<HTMLButtonElement>("#submit-btn")as HTMLButtonElement;

const addRecipeUrl = "http://localhost:8000/api/recipe/recipes";
let imageData =""
photoInput.addEventListener("change",handleFileSelect)
function handleFileSelect(event:any){
 
  const fileInput = event.target;
  const selectedFile = fileInput?.files[0];
  if (selectedFile) {
    // const file = photoInput.files && photoInput.files[0];
    // if(file){
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {imageData= reader.result as string};
    // }
    console.log('File selected:', selectedFile);
    // You can perform additional actions with the selected file here
  } else {
    console.log('No file selected');
  }
}

const ingredientsArray:{ name: string; quantity: string }[] = [];
const instructionsArray:string[] = []

export interface createRecipePayloadInterface {
  title: string;
  description: string;
  ingredients: Array<{ name: string; quantity: string }>;
  instructions: string[];
  photo: string;
  // createdBy: number;
  categories:string[]
};

submitButton?.addEventListener("click", async (e) => {
try{
  e.preventDefault();

  console.log(ingredientsArray)

  
  const userData:createRecipePayloadInterface = {
    title: title.value,
    description: description.value,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    photo:imageData,
    categories: categories.value.split(",").map(category => category.trim()),
    // createdBy:
  };
  
  const token = localStorage.getItem('token')
  console.log(userData);
  // const imageUrl = await uploadPhotoToCloudinary();
  // userData.photo = imageUrl;
  console.log(token)
  const res = await axios.post(addRecipeUrl, userData, {headers: {Authorization: `Bearer ${token}`}});
  const userDatas = res.data.user;
  
    // window.location.href = "../login/login.html";
  
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
    const ingredient = ingredientInput.value.trim();
    const qty = quantity.value.trim();
    if (ingredient !== ""&& qty !==""){
    ingredientsArray.push({name:ingredient,quantity:qty})
    ingredientInput.value = "";
    quantity.value= "";

    const table = document.querySelector("table") as HTMLTableElement;
    const tableRow = document.createElement("tr") as HTMLTableRowElement;
    const ingredientData = document.createElement("td") as HTMLElement;

    ingredientData.innerText = ingredient;
    
    const qtyData = document.createElement("td") as HTMLElement;

    qtyData.innerText = qty;
    
    tableRow.appendChild(ingredientData);
    tableRow.appendChild(qtyData);
    table.appendChild(tableRow)}
    else {
      console.error("ingredients and quantity cannot be empty")
    }
})


const instructionsInput= document.querySelector("#steps")as HTMLInputElement
const addStepsBtn = document.querySelector("#add-instruction") as HTMLButtonElement
const instructionsTable = document.querySelector("#instructions-table") as HTMLTableElement;


addStepsBtn.addEventListener("click",(e:Event)=>{
    e.preventDefault();
    const instruction = instructionsInput.value.trim();
 if (instruction !==""){
    instructionsArray.push(instruction)
    instructionsInput.value = "";


   
    const tableRow = document.createElement("tr") as HTMLTableRowElement;
    const instructionData = document.createElement("td") as HTMLElement;

    instructionData.innerText = instruction;
 


    tableRow.appendChild(instructionData);
  
    instructionsTable.appendChild(tableRow)
 }
 else{
  console.error("instructions cant be empty")
 }
})







