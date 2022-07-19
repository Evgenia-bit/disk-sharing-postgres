const bodyParser = require('body-parser')
const express = require('express')
const expressSession = require('express-session')

const addAuthRoutes = require('./routes/auth-routes')
const addDisksRoutes = require('./routes/disks-routes')

require('dotenv').config()

const port = process.env.PORT

const app = express()

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use('/', addDisksRoutes)
app.use('/', addAuthRoutes)

app.use((req, res)=> {
    res.status(404)
    res.json({status: 'error', msg: 'Такой страницы не существует'})
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.json({status: 'error', msg: 'Произошла ошибка сервера'})
})

app.listen(port, () => {
    console.log(`The server started on port ${port}`)
})

process.on('uncaughtException', err => {
    console.error('НЕПЕРЕХВАЧЕНОЕ ИСКЛЮЧЕНИЕ\n', err.stack)
    process.exit(1)
})