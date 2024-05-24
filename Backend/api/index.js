const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
  origin: "https://movie-explorer-in21.vercel.app", 
  optionsSuccessStatus: 200,
};
//
app.use(cors(corsOptions));

app.use(bodyParser.json());

const movieRoutes = require("../routes/movie");

app.use("/movie", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
