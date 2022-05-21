const express = require('express');
const app = express();
const path = require("path");
const logger = require("morgan");
const createError = require("http-errors");
const cors = require("cors");
const cookieParser = require("cookie-parser");





const PORT = process.env.PORT || 3002;

//Routes
const signinRoutes = require('./src/routes/signinRoutes')
const signupRoutes = require('./src/routes/signupRoutes')
const proyectsRouter = require('./src/routes/proyectsRoutes')



// /***************** */
// const corsOptions = {
//   origin: '*',
//   credentials: true,
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }


//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// view engine setup
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));




app.use('/signin', cors(), signinRoutes)
app.use('/signup', cors(), signupRoutes)
app.use('/proyects', cors(), proyectsRouter)




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