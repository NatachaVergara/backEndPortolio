const express = require('express');
const app = express();
const logger = require("morgan");
const createError = require("http-errors");


const PORT = process.env.PORT || 3002;

//Routes
const usersRoutes = require('./src/routes/usersRoutes')
const proyectsRouter = require('./src/routes/proyectsRoutes')

//middleware
app.use(logger("dev"));
app.use(express.json());
// view engine setup
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");



app.use('/users', usersRoutes)
app.use('/proyects', proyectsRouter)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });


app.listen(PORT, () => { console.log(`Server active at port: ${PORT}`) })