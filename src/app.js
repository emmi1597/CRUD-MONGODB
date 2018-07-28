const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const express = require('express')

const app = express();

// connecting to db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then( db => console.log('db connected'))
    .catch( err => console.log(err))

// settings
app.set("port", process.env.PORT || 3000) // lee el puerto
app.set('views', path.join(__dirname, 'views')) // obtiene la direccion de las vista principal
app.set('view engine', 'ejs') // utiliza ejs para hacer los rendes

// import routes
const indexRoutes = require('./routes/index')

// middlewares
app.use(morgan('dev')) // obtiene las peticiones
app.use(express.urlencoded({ extended: false })) // obtener los datos de los formularios

// routes
app.use('/', indexRoutes); // al ingresar se redirecciona a las funciones de rutas

// start server
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
})