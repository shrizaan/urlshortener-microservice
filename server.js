require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const isUrl = require("is-url");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use("/api/shorturl", bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// endpoint
let counter = 1;
const shortendUrls = {};

app.post("/api/shorturl", function(req, res) {
  const url = req.body.url;
  if (!isUrl(url)) {
    res.send({ error: "invalid url" })
  } else {
    shortendUrls[counter] = url;
    res.send({
      original_url: req.body.url,
      short_url: counter
    })
    counter++
  }
})

app.get("/api/shorturl/:id", function(req, res) {
  const id = req.params.id;
  const url = shortendUrls[id];
  res.redirect(url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
