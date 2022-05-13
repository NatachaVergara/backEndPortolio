const express = require('express');
const app = express();
var logger = require("morgan");
const PORT = process.env.PORT || 3002;

//Routes
const usersRoutes = require('./src/routes/usersRoutes')
const proyectsRouter = require('./src/routes/proyectsRoutes')

//middleware
app.use(logger("dev"));
app.use(express.json());

app.use('/users', usersRoutes)
app.use('/proyects', proyectsRouter)


app.listen(PORT, () => { console.log(`Server active at port: ${PORT}`) })