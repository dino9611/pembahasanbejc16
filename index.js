const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
require("dotenv").config();
// main app
const app = express();

// apply middleware
app.use(bearerToken());
app.use(
  cors({
    exposedHeaders: [
      "Content-Length",
      "x-token-access",
      "x-token-refresh",
      "x-total-count",
    ],
  })
);
app.use(express.json());

// main route
const response = (req, res) =>
  res.status(200).send("<h1>REST API JCWM1604</h1>");
app.get("/", response);

const { AuthRoutes, MovieRoutes } = require("./src/routes");

app.use("/user", AuthRoutes);
app.use("/movies", MovieRoutes);

// bind to local machine
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CONNECTED : port ${PORT}`));

// select m.name,m.release_date,
// m.release_month,m.release_year,
// m.duration_min,m.genre,m.description,
// ms.status,sh.time,l.location
// from schedules s
// 	join movies m on s.movie_id = m.id
// 	join movie_status ms on m.status = ms.id
// 	join show_times sh on s.time_id=sh.id
// 	join locations l on s.location_id = l.id;
