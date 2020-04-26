let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
})

function getToys(){
  return fetch(`http://localhost:3000/toys`)
  .then(function(response){
    return response.json()
  })
}

function renderToys(){
  getToys()
  .then(function(toys){
    for (const toy of toys){
      renderToy(toy)
      console.log(toy)
    }
  })
}

function renderToy(toy){
const toyDiv = document.createElement('div')
toyDiv.classList.add('card')
const toyName = document.createElement('h2')
toyName.innerHTML = `${toy.name}`
const toyImg = document.createElement('img')
toyImg.src = `${toy.image}`
toyImg.classList.add('toy-avatar')
const toyLikes = document.createElement('p')
toyLikes.innerHTML = `${toy.likes} Likes`
const toyButton = document.createElement('button')
toyButton.innerText = "Like <3"
toyButton.classList.add('like-btn')


toyDiv.appendChild(toyName)
toyDiv.appendChild(toyImg)
toyDiv.appendChild(toyLikes)
toyDiv.appendChild(toyButton)

const toyCollection = document.querySelector("#toy-collection")
toyCollection.appendChild(toyDiv)

toyButton.addEventListener('click', function(e){
  e.preventDefault()
  likes(toy, e)
  // likes(toy)
})

}

function likes(toy, e){
  let newLikes = toy.likes +=1
// console.log(e.target)
  const configurationObject = {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    likes: newLikes
  })
  }

  return fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
  .then(function(response){
    return response.json()
  })
  .then (function(newToy){
    e.target.previousElementSibling.innerText = `${newLikes} likes`;
  //  renderToy(newToy)
  })
}


const toySubmit = document.querySelector('.add-toy-form')

toySubmit.addEventListener("submit", function(e){
  e.preventDefault()
  const newToyName = document.querySelector('input[name="name"]').value
  const newToyImg = document.querySelector('input[name="image"]').value 
  
  const newToy = {
    name: newToyName,
    image: newToyImg,
    likes: 0
  }

renderNewToy(newToy)

  
})

function renderNewToy(newToy){
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify(newToy)
  }

  return fetch('http://localhost:3000/toys', configurationObject)
  .then(function(response){
    return response.json()
  })
  .then (function(createdToy){
    renderToy(createdToy)
  })
}





renderToys()
})














// });

// document.addEventListener("DOMContentLoaded", () => {
  
//   function getToys() {
//     return fetch('http://localhost:3000/toys')
//       .then(function(response){
//           return response.json()
//       })
//   }


// // Fetch the array of toys objects from the database and pass it to a function which iterates through them
// // and passes each one into a function called renderToy.


//   function renderToys(){
//     getToys()
//     .then(function(toys){
//       for (let i = 0; i < toys.length; i++){
        
//        renderToy(toys[i])
        
//       }
//     })
// }

// // write a function for render Toy
// function renderToy(toy){

//   const newDiv = document.createElement('div')
//   newDiv.classList.add('card')
  

//   newDiv.innerHTML =  ` 
//   <h2> ${toy.name} </h2>
//   <img src = ${toy.image} class="toy-avatar" />
//   ` 
//   const like = document.createElement('p')
//   like.innerText = `${toy.likes} likes`
//   newDiv.appendChild(like)
//   const newButton = document.createElement('button')
//   newButton.innerText = "Like"
//   newButton.classList.add('like-btn')
 
//   const toyCollection = document.querySelector('#toy-collection')
// newDiv.appendChild(newButton)
// toyCollection.appendChild(newDiv)

// // newButton eventListener
// newButton.addEventListener("click", function(e){
//   e.preventDefault()

//   likes(toy)
//
// })
  
// }

// function likes(toy){
//   const currentLikes = parseInt(toy.likes)
//   toy.likes = `${currentLikes + 1}`
  

// // patch request to server
// fetch(`http://localhost:3000/toys/${toy.id}`,{
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   },
//   body: JSON.stringify({
//     likes: `${toy.likes}`
//   })
// })

// .then(function(response){
//   return(response.json())
// })


// }


// // THEN do below

// //find current toys likes 

// // increment by one




  


//   //find form
//   const theToyForm = document.querySelector(".add-toy-form")
//   console.log(theToyForm)
//   //find outputs of form create Event Listener
// theToyForm.addEventListener("submit", function(e){
// e.preventDefault();

// const toyName = document.querySelector('input[name="name"]').value 
// const toyImage = document.querySelector('input[name="image"]').value 

// const newToy = {
//   name: toyName,
//   image: toyImage,
//   likes: 0
// }

// renderNewToy(newToy)
// .then(function(toy){
//   renderToy(toy)
// })


// })

// function renderNewToy(newToy){
//   const configurationObject = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(newToy)
//   }


//   return fetch('http://localhost:3000/toys', configurationObject)
//     .then(function(response){
//       return response.json()
//     })
// }



//   // make an object with output values

//   // send a fetch with POST request











//   renderToys()
// });
