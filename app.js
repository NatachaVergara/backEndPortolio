const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const cors = require("cors");


//Routes
// const indexRouter = require('./src/routes/index');
const signinRoutes = require("./src/routes/signinRoutes");
const signupRoutes = require("./src/routes/signupRoutes");
const proyectsRouter = require("./src/routes/proyectsRoutes");
const contactoRouter = require("./src/routes/contactoRoutes");
const footerRouter = require("./src/routes/footerRoutes");
const imageRouter = require("./src/routes/imagesRoutes");
const slidersRouter = require("./src/routes/sliderRoutes");
const aboutMeRouter = require("./src/routes/aboutMeRoutes");
const preciosRouter = require("./src/routes/preciosRoutes");

/***************** */
const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Routes
// app.use('/', indexRouter);
app.use("/signin", signinRoutes);
app.use("/signup", signupRoutes);
app.use("/proyects", proyectsRouter);
app.use("/contacto", contactoRouter);
app.use("/footer", footerRouter);
app.use("/upload", imageRouter);
app.use("/upload", slidersRouter);
app.use("/aboutme", aboutMeRouter);
app.use("/precios", preciosRouter);





module.exports = app