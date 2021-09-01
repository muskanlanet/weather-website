const express = require("express");
const path = require("path");

const hbs = require("hbs");

const geocode = require("./utilis/geocode");
const forecast = require("./utilis/forecast");

const port = process.env.PORT || 3000;

const app = express();

const pathDir = path.join(__dirname, "../static");
const viewspathDir = path.join(__dirname, "../templates/views");
const partialpathDir = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewspathDir);
hbs.registerPartials(partialpathDir);

app.use(express.static(pathDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Muskan Soni",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help !!!!!!!!!!",
    name: "Muskan Soni",
    helpMessage: "Help Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Muskan Soni",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a location",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Muskan Soni",
    message: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404",
    name: "Muskan Soni",
    message: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("server is up");
});
