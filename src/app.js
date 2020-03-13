const express = require('express')
const DatabaseHelper = require('./db')

const app = express()
const port = 8080

app.get('/', async (req, res) => {
    let database = new DatabaseHelper()
    let data = database.getAll()
    res.status(200).json(data)
})

app.listen(port, () => console.log(`App is listening on port ${port}!`))