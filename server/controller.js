let comics = require('./db.json')

let globalID = 4

module.exports = {
    getComics: (req, res) => {
        res.status(200).send(comics)
    },

    addComic: (req, res) => {
        const {name, url, chaptersRead} = req.body

        let newComic = {
            id: globalID,
            name: name, 
            picture: url,
            chaptersRead: chaptersRead
        }

        comics.push(newComic)

        globalID++

        res.status(200).send(comics)

    }, 

    deleteComic: (req, res) => {
        const index = comics.findIndex((el) => el.id === +req.params.id)

        comics.splice(index, 1)

        res.status(200).send(comics)
    },

    updateComic: (req, res) => {
        const index = comics.findIndex((el) => el.id === +req.params.id)

        const {type} = req.body

        if(type === 'upChaptersRead'){
            comics[index].chaptersRead++
        }else if(type === 'downChaptersRead'){
            comics[index].chaptersRead--
        }

        res.status(200).send(comics)

    }
}