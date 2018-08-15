const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./models");
const ApiRoutes = require("./routes/apiRoutes");


const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use("/api", ApiRoutes);
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({force: false})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});