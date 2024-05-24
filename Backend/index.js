const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: "http://your-frontend-domain.com",
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

const movieRoutes = require("./routes/movie");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());
app.use("/movie", movieRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
