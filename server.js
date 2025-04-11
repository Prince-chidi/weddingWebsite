const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
require("dotenv").config();
const port = process.env.PORT || 8000;
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
// Middleware to serve static files from the 'public' directory
app.use(express.static(path.resolve("public")));
app.use(express.json());

// Function to generate a hash for a given file
const generateFileHash = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("md5").update(fileBuffer).digest("hex").substring(0, 8);
};

// Middleware to append cache-busting query strings
app.use((req, res, next) => {
  res.locals.cacheBuster = (filePath) => {
    const absolutePath = path.join(__dirname, "public", filePath);
    if (fs.existsSync(absolutePath)) {
      const hash = generateFileHash(absolutePath);
      return `${filePath}?v=${hash}`;
    }
    return filePath;
  };
  next();
});

// Function to serve HTML with cache-busted assets
const serveHTMLWithCacheBusting = (filePath, res) => {
  let htmlContent = fs.readFileSync(filePath, "utf-8");

  // Replace static asset references with cache-busted URLs
  htmlContent = htmlContent
    .replace(/href="\/css\/(.*?)"/g, (match, file) => `href="${res.locals.cacheBuster(`css/${file}`)}"`)
    .replace(/src="\/js\/(.*?)"/g, (match, file) => `src="${res.locals.cacheBuster(`js/${file}`)}"`);

  res.send(htmlContent);
};

// Routes to serve HTML files with cache busting
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/toast", (req, res) => {
  const filePath = path.join(__dirname, "public", "toast.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/schedule", (req, res) => {
  const filePath = path.join(__dirname, "public", "schedule.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/livestream", (req, res) => {
  const filePath = path.join(__dirname, "public", "livestream.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/moments", (req, res) => {
  const filePath = path.join(__dirname, "public", "moments.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/support", (req, res) => {
  const filePath = path.join(__dirname, "public", "support.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/RSVP", (req, res) => {
  const filePath = path.join(__dirname, "public", "RSVP.html");
  serveHTMLWithCacheBusting(filePath, res);
});

app.get("/crew", (req, res) => {
  const filePath = path.join(__dirname, "public", "guests.html");
  serveHTMLWithCacheBusting(filePath, res);
});
app.get("/stream2", (req, res) => {
  const filePath = path.join(__dirname, "public", "s2.html");
  serveHTMLWithCacheBusting(filePath, res);
});

// POST route to handle RSVP submissions
app.post("/submit-rsvp", async (req, res) => {
  const { name, attendance, email } = req.body;

  try {
    const { data, error } = await supabase.from("rsvp").insert([{ name, attendance, email }]);

    if (error) {
      console.error("Error inserting data into Supabase:", error);
      return res.status(500).json({ error: "Error saving RSVP" });
    }

    res.status(200).json({ message: "RSVP successfully submitted!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error submitting RSVP" });
  }
});

// POST route to upload memories
app.post("/upload-memory", async (req, res) => {
  const { url, alt } = req.body;

  try {
    const { data, error } = await supabase.from("memories").insert([{ url, alt }]);

    if (error) {
      console.error("Error inserting into Supabase:", error);
      return res.status(500).json({ error: "Failed to save memory" });
    }

    res.status(200).json({ message: "Memory saved successfully!", data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET route to fetch all memories
app.get("/memories", async (req, res) => {
  try {
    const { data, error } = await supabase.from("memories").select("*");

    if (error) {
      console.error("Error fetching from Supabase:", error);
      return res.status(500).json({ error: "Failed to fetch memories" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
