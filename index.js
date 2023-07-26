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
            bigCardImage.style
            bigName.innerText = oneChar.name['name-USen']
            bigSpecies.innerText = 'Species:  ' + oneChar.species
            bigPersonality.innerText = 'Personality:  ' + oneChar.personality
            bigBirthday.innerText = 'Birthday:  ' + oneChar['birthday-string']
            bigCatchphrase.innerText = 'Catchphrase:  ' + '"' + oneChar['catch-phrase'] + '"'
            bigId.innerText = oneChar.id
        })
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

// 'bigId' will be the id for the id on the big card
const newFavoriteId = document.getElementById('bigId')

favoriteButton.addEventListener("click", () => {
    //    console.log(localStorage.getItem('favorites').length)
    const favoriteIdArray = []

    if (localStorage.favorites === undefined) {
        localStorage.setItem('favorites', JSON.stringify(favoriteIdArray))
    }

    const currentFavorites = JSON.parse(localStorage.getItem('favorites'))
    console.log(currentFavorites)

    const updatedFavorites = [...currentFavorites, newFavoriteId.innerText]

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))

    renderFavoriteCards(updatedFavorites)
})

function renderFavoriteCards(updatedFavorites) {
    console.log(updatedFavorites)
}