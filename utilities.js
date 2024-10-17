//Store data
let storeData = [];

//Load Spinner
const loadSpinner=(state)=>{
    const showSpinner = document.getElementById("spinner");

    if(state){
        const showCardContainer = document.getElementById("card-container");
        showCardContainer.innerHTML=""
        showSpinner.style.visibility="visible"
        showSpinner.innerHTML=`
      <span class="loading loading-infinity loading-lg"></span>
        `
    }else{
        showSpinner.style.visibility='hidden'  
    }

}

//Show like images
const showLikeImage = (image) =>{

    const showLikeContainer = document.getElementById('image-card');
    const div = document.createElement('div')
    div.innerHTML=`
    <div>
    <img class="rounded-xl" src="${image}">
    </div>
    `
    showLikeContainer.appendChild(div)
}

//sort button functionality
const handleSortButton = () =>{
    loadSpinner(true)
    const storedData = storeData.sort((a,b)=>b.price - a.price)
    setTimeout(()=>{
        displayAllPets(storedData);
        loadSpinner(false);
    },500)
}

//add active class
const addActiveClass = (id)=>{
const button = document.getElementById(`btn-${id}`)
button.classList.add('bg-green-400')
}

//remove active class
const removeActiveClass = ()=>{
    
    const allButton = document.getElementsByClassName('btn-category')
    for(let btn of allButton){
        btn.classList.remove('bg-green-400')  
    }
}

const loadPetDetails = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then(res => res.json())
    .then(data => showDetailsModal(data))
}

const showDetailsModal = (data) =>{
    const btnDetails= document.getElementById('details-modal')
    const btn = data.petData
    btnDetails.innerHTML=`
    <div class="my-4">
    <div>
    <img class="w-full rounded-xl" src="${btn.image}">
    </div>
    <h1 class="text-2xl font-bold">${btn.pet_name}</h1>
    <div class="grid grid-cols-2 gap-6 mb-3">
    <div>
     <p>Breed: ${btn.breed?btn.breed:"N/A"}</p>
     <p>Gender: ${btn.gender?btn.gender:"N/A"}</p>
     <p>Category: ${btn.category?btn.category:"N/A"}</p>
    </div>
    <div>
    <p>DOB: ${btn.date_of_birth?btn.date_of_birth:"N/A"}</p>
     <p>Price: ${btn.price?btn.price:"N/A"}</p>
    </div>
    </div>
    <h1 class="font-bold">DETAILS<h1>
    <p>${btn.pet_details}</p>
    </div>
    `
    my_modal_5.showModal()
}

//adopt button 
const adoptModal = (event) =>{
    let count =3
    const countContainer = document.getElementById('countdown-container')
    countContainer.innerText=count
    my_modal_2.show()
    const interval = setInterval(()=>{
      count--
      if(count!==0)countContainer.innerText = count;
      if(count<1){
        clearInterval(interval)
        my_modal_2.close()
        event.textContent = 'Adopted'
        event.disabled = true
      }
    },1000)

    }