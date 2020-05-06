document.addEventListener("DOMContentLoaded", function(){

  const toyUrl = "http://localhost:3000/toys/"
  const toyCollection = document.querySelector("#toy-collection")
  const headersApi = {
    "Content-type": "application/json",
    Accept: "application/json"
}
const newBtn = document.querySelector("#new-toy-btn")

  function fetchToys(){
    return fetch(toyUrl)
    .then(function(response){
      return response.json()
    })
  }  

  function renderToys(){
    fetchToys()
    .then(function(toys){
      for (let i = 0; i < toys.length; i++)
      {renderToy(toys[i])}
    })
  }

  function renderToy(toy){
    const toyDiv = document.createElement("div")
    toyDiv.className = "card"
    const toyH2 = document.createElement("h2")
    toyH2.innerText = toy.name
    const img = document.createElement("img")
    img.className = "toy-avatar"
    img.src = toy.image
    const para = document.createElement("p")
    para.innerText = toy.likes
    const btn = document.createElement("button")
    btn.className = "like-btn"
    btn.innerText = "Like <3"
    toyDiv.append(toyH2, img, para, btn)
    toyCollection.appendChild(toyDiv)
    btn.addEventListener("click", function(){
      toy.likes += 1
      patchToy(toy)
      para.innerText = toy.likes
    })
  }

  function postToy(toy){
    const configObj = {
      method: "POST",
      headers: headersApi,
      body: JSON.stringify(toy)
    }
    fetch(toyUrl, configObj)
    .then(function(response){
      response.json()
    })
  }

  newBtn.addEventListener("click", function(){
    const toy = {
      name: "Jessie",
  image: "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
  likes: 0
    }
    postToy(toy)
  })

  function patchToy(toy){
    const configObj = {
      method: "PATCH",
      headers: headersApi,
      body: JSON.stringify(toy)
    }
    fetch(toyUrl + `${toy.id}`, configObj)
    .then(function(response){
      response.json()
    })
  }



  renderToys()
})