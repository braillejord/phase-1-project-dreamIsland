const animalCrossingApi = "http://acnhapi.com/v1/villagers/"
const previewList = document.getElementById("previewCardContainer")


const fetchAnimals = 
fetch(animalCrossingApi)
.then(r => r.json())
.then(allChar => previewCard(allChar))


function previewCard(allChar) {
    for(let char in allChar){
    const singleChar = allChar[char]
    // console.log(singleChar.name.name-USen)
    console.log(singleChar.name['name-USen'])
    console.log(singleChar)
    console.log(singleChar['icon_uri'])

    const previewCard = document.createElement("div")
    previewCard.classList.add("previewCard")
    previewList.appendChild(previewCard)

    const previewName = document.createElement("h3")
    previewName.innerText = singleChar.name['name-USen']
    previewName.classList.add("previewName")
    previewCard.appendChild(previewName)

    const previewIcon = document.createElement("img")
    previewIcon.src = singleChar['icon_uri']
    previewCard.appendChild(previewIcon)
    }
}