require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

const addDisksRoutes = require('./routes/disks-routes')
const addAuthRoutes = require('./routes/auth-routes')

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
},)

app.listen(port, () => {
    console.log(`Сервер стартовал на порту ${port}`)
})

process.on('uncaughtException', err => {
    console.error('НЕПЕРЕХВАЧЕНОЕ ИСКЛЮЧЕНИЕ\n', err.stack)
    process.exit(1)
})