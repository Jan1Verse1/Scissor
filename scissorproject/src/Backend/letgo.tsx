// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const shortid = require("shortid");
// const cors = require("cors");

// app.use(cors());
// app.use(bodyParser.json());

// let urlMappings = {}; // This should be replaced with a database in production

// app.post("/api/shorten", (req, res) => {
//   const { longUrl } = req.body;
//   if (!longUrl) {
//     return res.status(400).json({ error: "URL is required" });
//   }
//   const shortCode = shortid.generate();
//   urlMappings[shortCode] = longUrl;
//   res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });
// });

// app.get("/api/resolve/:shortCode", (req, res) => {
//   const { shortCode } = req.params;
//   const longUrl = urlMappings[shortCode];
//   if (longUrl) {
//     res.redirect(longUrl);
//   } else {
//     res.status(404).json({ error: "URL not found" });
//   }
// });

// app.listen(3001, () => {
//   console.log("Server running on port 3001");
// });
