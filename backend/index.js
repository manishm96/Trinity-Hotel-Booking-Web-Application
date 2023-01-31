const config = require("config");
require("./db/Mongo");
const cors = require("cors");
const express = require('express')
const app = express()

const User = require("./models/mongo/user");


if (!config.get("jwtPrivateKey")) {
  console.log("JWTPrivateKey not set");
  process.exit(1);
}


app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hotel Booking Application." });
});

require("./routes/hotelRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/roomRoutes")(app);
require("./routes/reservationRoutes")(app);


app.post("/signup", async function (req, res) {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  console.log("Registering New User");
  const newUser = {
    firstName: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    rewards: 0,
  };
  new User(newUser).save((error, data) => {
    if (error) {
      res.status(500).end("Error Occured");
    } else {
      data.password = "";
      var JSONStr = JSON.stringify(data);
      res.status(200).end(JSONStr);
    }
  });
});

app.post("/login", async function (req, res) {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) {
      res.status(500).end("User Not Found");
    }
    if (user) {
      bcrypt.compare(
        req.body.password,
        user.password,
        function (err, matchPassword) {
          if (err) return error;
          if (matchPassword) {
            user.password = "";
            var JSONStr = JSON.stringify(user);
            res.status(200).end(JSONStr);
          } else {
            res.status(500).end("UnSuccessful Login");
          }
        }
      );
    } else {
      res.status(500).end("UnSuccessful Login");
    }
  });
});


const port = config.get("port");
app.listen(port, () => console.log(`Listening to port ${port}...`));
