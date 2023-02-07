
const baseURL = 'http://localhost:5678'

const displayComics = document.querySelector('#comicDisplay')
const addNewComic = document.querySelector('#addComic')


const createComicCard = (comic) => {

    const newComicCard = document.createElement('section')
    newComicCard.classList.add('comic-card')

    newComicCard.innerHTML = `
    <section class = "grid-item">
        <img id='coverpicture' alt = "cover image" src="${comic.picture}"/>
        <div id = "comic name">${comic.name}</div>

        <div>
            Last Chapter Read:  
            <button onclick="updateComic(${comic.id}, 'downChaptersRead')" >-</button> 
            ${comic.chaptersRead}
            <button onclick="updateComic(${comic.id}, 'upChaptersRead')">+</button>
        </div>

        </br>
        </br>
        
        <button onclick="deleteComic(${comic.id})">Delete</button>

    </section>
    `

    displayComics.appendChild(newComicCard)

}

const displayAllComics = (arr) => {
    for(let i = 0; i < arr.length; i++){
        createComicCard(arr[i])
    }
}


const getAllComics = () => {
    axios.get(`${baseURL}/Comics`)
        .then((res) => {
            console.log(res.data)

            displayAllComics(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}


const addComic = () => {

    displayComics.innerHTML = ``

    const name = document.querySelector('#comicName')
    const picture = document.querySelector('#comicPicture')
    const chaptersRead = document.querySelector('#comicNumber')

    let bodyObj = {
        name: name.value,
        url: picture.value,
        chaptersRead: chaptersRead.value
    }

    axios.post(`${baseURL}/comics`, bodyObj)
        .then((res) => {
            console.log(res.data)

            displayAllComics(res.data)

            name.value = ''
            picture.value = ''
            chaptersRead.value = 0
        })
        .catch((err) => {
            console.log(err)
        })

}


const deleteComic = (id) => {

    axios.delete(`${baseURL}/comics/${id}`)
        .then((res) => {
            console.log(res.data)

            displayComics.innerHTML = ``

            displayAllComics(res.data)
        })
        .catch((err) => {
            console.log(err)
        })      
}

const updateComic = (id, type) => {

    let bodyObj = {
        type: type
    }

    axios.put(`${baseURL}/comics/${id}`, bodyObj)
        .then((res) => {
            console.log(res.data)

            displayComics.innerHTML = ``

            displayAllComics(res.data)
        })
        .catch((err) => {
            console.log(err)
        })  
}


addNewComic.addEventListener('click', addComic)

getAllComics()