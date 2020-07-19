  
const express = require("express");
const path = require("path");
const logger = require("morgan");
const methodOverride = require("method-override");
const mainRouter = require("./routes/main");
const cohortsRouter = require("./routes/cohorts");
const app = express();

app.set('view engine', 'ejs');

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  methodOverride((req, res) => {
    console.log(req.body);
    if (req.body && req.body._method) {
      const method = req.body._method;
      return method;
    }
  })
);

app.use("/", mainRouter);
app.use("/cohorts", cohortsRouter);

const PORT = 3000;
const ADDRESS = "localhost"; 
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});