//Require Packages

const express = require('express')
const cors = require('cors')

//App instance
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

//Endpoints
const {getComics, addComic, deleteComic, updateComic} = require('./controller')

app.get('/comics', getComics)
app.post('/comics', addComic)
app.delete('/comics/:id', deleteComic)
app.put('/comics/:id', updateComic)



//Start server with app.listen

app.listen(5678, () => console.log('Listening on port 5678'))