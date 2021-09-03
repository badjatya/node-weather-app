const express = require("express");
const path = require("path");
const hbs = require("hbs");
const PORT = process.env.PORT || 3000;

// Importing local modules
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
console.log(__dirname);

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Archit badjatya",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Archit badjatya",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This if for your help",
    title: "Help",
    name: "Archit badjatya",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData.forecast,
          temperature: forecastData.temperature,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Archit badjatya",
    errorMessage: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Archit badjatya",
    errorMessage: "Error 404 page",
  });
});

// Creating Server
app.listen(PORT, () => {
  console.log("server listening to port " + PORT);
});
