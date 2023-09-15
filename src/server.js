const express = require("express");

const server = express();

const staticHandler = express.static("public");

function logger(request, response, next) {
  console.log(request.method + " " + request.url);
  next();
}

server.use(logger);
server.use(staticHandler);

// challenge 1

server.get("/", (request, response) => {
  response.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Home</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <h1>Hello Express</h1>
      </body>
    </html>
  `);
});

// challenge 2

/* server.get("/colour", (req, res) => {
  const hexColour = req.query.hex || "ffffff"; // Default to white if hexColour is missing

  res.send(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Hex</title>
          <style>
          body {
            background-color: #${hexColour};
          }
        </style>
        </head>
        <body>
          <h1>Hello Express</h1>
        </body>
      </html>
    `);
}); */

// challenge 3

server.get("/colour", (req, res) => {
  const hex = req.query.hex || "ffffff"; // defaults to white
  res.send(`
  <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Hex Form</title>
      <style>
        body {
          background-color: #${hex};
        }
      </style>
      </head>
      <body>
      <h1>Enter a Hex Colour Code</h1>
      <form>
        <label for="hex">Enter a hex </label>
        <input name="hex" value="${hex}">
        <button type="submit">Submit</button>
      </form>
      </body>
      </html>
    `);
});

// challenge 4

const cheeses = [];

function generateStars(rating) {
  return "⭐".repeat(rating);
}

server.get("/cheese", (req, res) => {
  const list = cheeses.map((cheese) => {
    const stars = generateStars(cheese.rating);
    return `<li>${cheese.name} | ${stars}</li>`;
  });
  res.send(`
  <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Cheese Form</title>
          <link rel="stylesheet" href="/style.css">
      <body>
      <h1>The Big Cheese</h1>
      <form method="POST">
      <p>
        <label for="name">Cheese name</label>
        <input name="name">
      </p>
      <p>
        <label for="rating">Cheese rating</label>
        <input name="rating" type="range" min="1" max="5" step="1">
      </p>
      <button>Rate cheese</button>
    </form>
    <ul>
    ${list.join("")}
    </ul>
      </body>
      </html>
    `);
});

const bodyParser = express.urlencoded();

server.post("/cheese", bodyParser, (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;

  cheeses.push({ name, rating });

  res.redirect("/cheese");
});

module.exports = server;
