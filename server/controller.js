let comics = require('./db.json')

let globalID = 4

module.exports = {
    getComics: (req, res) => {
        res.status(200).send(comics)
    },

    addComic : (req, res) => {
        const{title, cover} = req.body

        let newComic = {
            id: globalID,
            title: title,
            cover: cover,
            rating: 3
        }

        comics.push(newComic)

        globalID++

        res.status(200).send(comics)
    },

    deleteComic: (req, res) => {
        const index = comics.findIndex((el) => el.id === +req.params.id)
        
        comics.splice(index,1)

        res.status(200).send(comics)
    },

    updateComic: (req, res) => {
        const index = comics.findIndex((el) => el.id === +req.params.id)

        const {type} = req.body

        if(type === 'uprate'){
            comics[index].rating++
        }else if(type === 'downrate'){
            comics[index].rating--
        }

        res.status(200).send(comics)
    }
}