const express = require("express");
const { getLocation } = require("./utils/getLocation");
const path = require("path");
const { ifError } = require("assert");
const port = 3000;
const app = express();

//set up template engine
app.set("view engine", "hbs");

//setup static
const pathPublic = path.join(__dirname, "../public");
app.use(express.static(pathPublic));

app.get("/", async (req, res) => {
  const { address } = req.query;
  if (address) {
    const map = await getLocation(address);
    const { coordinates, text, place_name } = map;
    res.render("weather", {
      isSearch: true,
      latitude: coordinates[0],
      longitude: coordinates[1],
      text,
      place_name,
    });
  } else {
    res.render("weather", {
      isSearch: false,
    });
  }
});

app.listen(port, () => console.log(`server listening on port ${port}`));
