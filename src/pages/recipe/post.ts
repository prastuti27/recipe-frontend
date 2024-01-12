import axios from "axios"

const title = document.querySelector<HTMLInputElement>("#title") as HTMLInputElement;
const description= document.querySelector<HTMLInputElement>("#description") as HTMLInputElement;
const ingredients = document.querySelector<HTMLInputElement>("#ingredients")as HTMLInputElement;
const photo = document.querySelector<HTMLInputElement>("#photo")as HTMLInputElement;
const instructions = document.querySelector<HTMLInputElement>("#instructions")as HTMLInputElement;
const categories = document.querySelector<HTMLInputElement>("#categories")as HTMLInputElement;
const submitButton = document.querySelector<HTMLButtonElement>("button")as HTMLButtonElement;

const addRecipeUrl = "http://localhost:8000/api/recipe/recipes";


const ingredientsArray:{ name: string; quantity: number }[] = [];

export interface createRecipePayloadInterface {
    title: string;
    description: string;
    ingredients: { name: string; quantity: number }[];
    instructions: string[];
    photo: string;
    createdBy: number;
  }

submitButton?.addEventListener("click", async (e) => {
try{
    e.preventDefault();
    const userData:createRecipePayloadInterface = {
      title: title.value,
      description: description.value,
      ingredients: ingredientsArray,
      instructions: instructions.value,
      photo: photo.value,
      categories: categories?.value,
    };
    console.log(userData);
    const res = await axios.post(addRecipeUrl, userData);
    const userDatas = res.data.user;
    
      window.location.href = "../login/login.html";
    
    console.log(userDatas);
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
    ingredientsArray.push({ingredient:ingredient,quantity:qty})
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
