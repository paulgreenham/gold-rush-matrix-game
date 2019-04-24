const express = require('express')
// const bodyParser = require('body-parser')
const path = require('path')
// const api = require('./server/routes/api')


// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost/DBNAME', {useNewUrlParser: true})


const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false}))
// app.use('/', api)


const port = 3723
app.listen(process.env.PORT || port)