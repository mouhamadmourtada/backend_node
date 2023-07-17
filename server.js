const express = require("express");
const cors = require("cors");
// const { sequelize } = require('./models/index.js');

const app = express();

var corsOptions = {origin: "http://localhost:8081"};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




// simple route
app.get("/", (req, res) => {
  console.log("requetes recu")
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/mdTest.routes")(app);
require("./routes/client.routes")(app);
require("./routes/taxi.routes")(app);
require("./routes/taximan.routes")(app);
require("./routes/course.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
