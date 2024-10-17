//fetch all pets
const loadAllCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await res.json();
  loadSpinner(true)
  setTimeout(()=>{
    displayAllPets(data.pets);
    storeData=data.pets;
    loadSpinner(false)
  },2000)
};
//fetch buttons
const loadCategoryButton = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await res.json();
  displayCategoryButton(data.categories);
};
//display all pets
const displayAllPets = (pets) => {
    
  const showCardContainer = document.getElementById("card-container");
  showCardContainer.innerHTML='';
  if(pets.length===0){
    showCardContainer.classList.remove("grid");
    const div = document.createElement('div');
    div.classList.add("item-center")
    div.innerHTML=`
    <img src="./images/error.webp">
    <h1 class="text=3xl font-bold">NO CONTENT AVAILABLE</h1>
    `
    
    showCardContainer.appendChild(div)
    
  }else{
    showCardContainer.classList.add("grid")
  }
  pets.forEach((pet) => {
    const div = document.createElement('div')
    div.classList.add("flex","flex-col","gap-4","shadow-xl","p-4")
    div.innerHTML=`
    <img class="h-[200px] w-full object-fill rounded-xl" src="${pet.image}">
    <h3 class="font-bold text-2xl">${pet.pet_name? pet.pet_name:"N/A"}<h3>
    <p class="text-gray-500">Breed: ${pet.breed? pet.breed : "N/A"}</p>
    <p class="text-gray-500">Gender: ${pet.gender? pet.gender : "N/A"}</p>
    <p class="text-gray-500">DOB: ${pet.date_of_birth? pet.date_of_birth : "N/A"}</p>
    <p class="text-gray-500">Price: ${pet.price? '$'+ pet.price : "N/A"}</p>

    <div class="flex gap-3 mt-3">
    <button onclick="showLikeImage('${pet.image}')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
    <button onclick="adoptModal(this)" class="btn">Adopt</button>
    <button onclick="loadPetDetails('${pet.petId}')" class="btn">Details</button>
    </div>

    `
    showCardContainer.appendChild(div)
  });
};

//display buttons
const displayCategoryButton = (data) => {
  const buttonsContainer = document.getElementById("category");

  data.forEach((pet) => {
    
  
    const div = document.createElement("div");
    div.innerHTML = `
        <button id="btn-${pet.category}" onclick="loadCategory('${pet.category}')" class="btn btn-category  flex justify-center item-center gap-4 text-center text-3xl">
        <img class="h-10 w-10" src="${pet.category_icon}"> ${pet.category}
        </button>
        `;
    buttonsContainer.appendChild(div);
  });
};
//load category data
const loadCategory = async (id) => {

 
  removeActiveClass()
  addActiveClass(id)
  
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    const data = await res.json()
loadSpinner(true)
  setTimeout(()=>{
    displayAllPets(data.data)
    storeData= data.data;
    loadSpinner(false)
  },2000)
}





loadCategoryButton();

loadAllCategory();
