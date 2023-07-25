const animalCrossingApi = "http://acnhapi.com/v1/villagers/"
const previewList = document.getElementById("previewCardContainer")

const fetchAnimals =
    fetch(animalCrossingApi)
        .then(r => r.json())
        .then(allChar => previewCard(allChar))

function previewCard(allChar) {
    for (let char in allChar) {
        const singleChar = allChar[char]

        const previewCard = document.createElement("div")
        previewCard.classList.add("previewCard")
        previewList.appendChild(previewCard)

        const previewIcon = document.createElement("img")
        previewIcon.classList.add("previewIcon")
        previewIcon.src = singleChar['icon_uri']
        previewCard.appendChild(previewIcon)

        const previewName = document.createElement("p")
        previewName.innerText = singleChar.name['name-USen']
        previewName.classList.add("previewName")
        previewCard.appendChild(previewName)

        const previewId = document.createElement("p")
        previewId.setAttribute("id", singleChar.id)
        previewId.style.display = "none"
        previewCard.appendChild(previewId)

        const previewSpecies = document.createElement("p")
        previewSpecies.setAttribute("id", singleChar.species)
        previewSpecies.style.display = "none"
        previewCard.appendChild(previewSpecies)

        previewCard.onclick = () => {
            renderBigCard(singleChar.id)
        }
    }
    renderBigCard(Math.floor(Math.random() * (391 - 1 + 1) + 1))
}

function renderBigCard(id) {
    fetch(animalCrossingApi + id)
        .then(r => r.json())
        .then(oneChar => {
            bigCardImage.src = oneChar.image_uri
            bigName.innerText = oneChar.name['name-USen']
            bigSpecies.innerText = 'Villager Species: ' + oneChar.species
            bigPersonality.innerText = 'Villager Personality: ' + oneChar.personality
            bigBirthday.innerText = 'Villager Birthday: ' + oneChar['birthday-string']
            bigCatchphrase.innerText = 'Villager Catchphrase: ' + oneChar['catch-phrase']
        })
}

/////Function for Filter Menu//////

function filterBar() {
    document.getElementById("filterBar").classList.toggle("show");
}

//search bar
const searchBar = document.getElementById("searchField")
searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase()
    const animals = document.querySelectorAll("p.previewName")
    animals.forEach(animal => {
        if (animal.textContent.toLowerCase().includes(searchValue)) {
            animal.parentNode.style.display = "block"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
})
//Favorite button below
const favoriteButton = document.getElementById("favoriteButton")
const favoriteAnimal = document.querySelectorAll("p.favorite")
favoriteButton.addEventListener("click", () => {
    if (favoriteAnimal.innerText == 0) {
        favoriteAnimal.innerText += 1
    } else (favoriteAnimal.innerText == 1); {
        favoriteAnimal.innerText -= 0
    }
})

// //MyVillagersButton
// const MyVillagersButton = document.getElementById("myVillagersButton")
// MyVillagersButton.addEventListener("click",()=>{
//     console.log("hi")
// })

