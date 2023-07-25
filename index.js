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
        previewCard.setAttribute("id", singleChar.name['name-USen'])
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
        previewSpecies.setAttribute("class", "species")
        previewSpecies.style.display = "none"
        previewSpecies.innerText = singleChar.species
        previewCard.appendChild(previewSpecies)

        const previewPersonality = document.createElement("p")
        previewPersonality.setAttribute("class", "personality")
        previewPersonality.style.display = "none"
        previewPersonality.innerText = singleChar.personality
        previewCard.appendChild(previewPersonality)

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
            bigSpecies.innerText = 'Species:  ' + oneChar.species
            bigPersonality.innerText = 'Personality:  ' + oneChar.personality
            bigBirthday.innerText = 'Birthday:  ' + oneChar['birthday-string']
            bigCatchphrase.innerText = 'Catchphrase:  ' + '"' + oneChar['catch-phrase'] + '"'
        })
}

///Function for Sorting Small Cards by Character Name Alphabetically/////

function sortAlphabeticallyAZ() {
    const animals = Array.from(document.getElementsByClassName("previewCard"))
    animals.sort(function (a, b) {
        if (a.id > b.id) {
            return 1;
        }
        if (b.id > a.id) {
            return -1;
        }
        return 0;
    });
    console.log(animals)
}

function sortAlphabeticallyZA() {
    const animals = Array.from(document.getElementsByClassName("previewCard"))
    animals.sort(function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (b.id > a.id) {
            return 1;
        }
        return 0;
    });
    console.log(animals)
}

///Function for Personality Filter//////

function searchByPersonality(personality) {
    const animals = document.getElementsByClassName("personality")
    Array.from(animals).forEach(animal => {
        if (animal.innerText === personality) {
            animal.parentNode.style.display = "block"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
}

///Function for Species Filter//////

function searchBySpecies(species) {
    const animals = document.getElementsByClassName("species")
    Array.from(animals).forEach(animal => {
        if (animal.innerText === species) {
            animal.parentNode.style.display = "block"
        } else {
            animal.parentNode.style.display = "none"
        }
    })
}

function clearSpecies() {
    const animals = document.getElementsByClassName("previewCard")
    Array.from(animals).forEach(animal => {
    if (animal.style.display = "none") {
        animal.style.display = "block"
    }
    })
}

//search bar
const searchBar = document.getElementById("searchField")
searchBar.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase()
    const animals = document.getElementsByClassName("previewName")
    Array.from(animals).forEach(animal => {
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