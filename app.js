// Фреймворк веб-приложений.
const express = require("express");
const app = express();
// HTTP request logger middleware for node.js.
// Логгирование деталей запросов.
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const FileStore = require("session-file-store")(session);
const { cookiesCleaner } = require("./middleware/auth");

app.use(morgan("dev"));
// Обработка POST запросов.
// urlencoded.
app.use(express.urlencoded({ extended: true }));
// json.
app.use(express.json());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

const fileStoreOptions = {};

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    key: "user_sid",
    secret: "anything here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use(cookiesCleaner);

// Импорт маршрутов.
const indexRouter = require("./routes/index");

// Подключаем mongoose.
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://vadim:123@cluster0-mm3y1.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

// Подключаем статику
app.use(express.static(path.join(__dirname, "public")));

// Подключаем views(hbs)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Подключаем импортированные маршруты с определенным url префиксом.
app.use("/", indexRouter);

// Обработка ошибок.
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
