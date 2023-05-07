// server.js
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

// configure bodyParser to handle POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require("dotenv").config();

// Connect to MongoDB database
mongoose
  .connect(process.env.mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Set up CORS
app.use(cors());

// Define image schema
const imageSchema = new mongoose.Schema({
  title: String,
  ImgData: String,
  description: String,
},
{collection:'Images'});

// Define image model
const Image = mongoose.model("Images", imageSchema);

// GET API endpoint
app.get("/api/images", async (req, res) => {
  const images = await Image.find({});
  res.json(images);
});

// POST API endpoint
app.post('/api/images', (req, res) => {
  const images = new Image({
    title: req.body.title,
    ImgData: req.body.ImgData,
    description: req.body.description
  });

  // save data to MongoDB
  images.save()
    .then(() => {
      console.log('Data saved to MongoDB');
      res.status(201).json({
        message: 'Data saved successfully'
      });
    })
    .catch((err) => {
      console.log('Error saving data to MongoDB', err);
      res.status(500).json({
        error: err
      });
    });
});

app.delete("/api/images/:id", async (req, res) => {
  const { id } = req.params;

  const image = await Image.findByIdAndDelete(id);
  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.json({ success: true });
});

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
