const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("../Schema/User");
const Project = require("../Schema/project");
const isAuthenticated = require("../Middleware/isAuthenticated");
const notAuthenticated = require("../Middleware/notAuthenticated");
require("dotenv").config();

const app = express();
const router = express.Router();
app.use(express.static("src"));

app.use(cors());
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

const mongooseConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, mongooseConnectionOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

router.get("/", notAuthenticated , (req, res) => {
    res.redirect("/login");
  }
);

router.get("/login", notAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.get("/add-project", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "project.html"));
});

router.post("/send", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
          req.session.userId = user._id;

          res.redirect("/dashboard");
        } else {

          res.redirect("/login?message=Invalid%20credentials%20password");
        }
    } else {

        res.redirect("/login?message=Invalid%20credentials%20user");
    }
  } catch (error) {
    res.redirect("/login?message=An%20error%20occurred");
  }
});

router.get('/logout', (req, res) => {

    req.session.destroy(() => {
      res.redirect('/login')
  });
});

router.get("/project", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.post("/insert", isAuthenticated, async (req, res) => {
  const {
    title,
    type,
    image,
    description,
    link_github,
    formattedDate,
    image_list,
    video,
  } = req.body;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }
  const created_at = formatDate(formattedDate);
  try {
    // Create a new instance of the Mongoose model and save it to the database
    const newProject = new Project({
      title,
      type,
      image,
      description,
      link_github,
      created_at,
      image_list: JSON.parse(image_list),
      video,
    });
    await newProject.save();
    res.redirect('/dashboard')
    console.log("Data inserted successfully!");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data.");
  }
});

app.use("/", router);
