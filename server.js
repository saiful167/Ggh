const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json({ limit: "10mb" })); // base64 large support

// Folder to save photos
const uploadDir = path.join(__dirname, "photos");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(express.static("public"));

// API endpoint
app.post("/api/upload", (req, res) => {
  try {
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    const filename = path.join(uploadDir, `${Date.now()}.jpg`);
    fs.writeFileSync(filename, base64Data, "base64");
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
