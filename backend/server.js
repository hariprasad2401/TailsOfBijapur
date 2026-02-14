require("dotenv").config();

// 🔹 Fix SRV DNS issue
const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const CloudinaryStorage = require("multer-storage-cloudinary");

const cloudinary = require("./config/cloudinary");

const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "tails_of_bijapur", allowed_formats: ["jpg", "png", "jpeg"], }, });


const upload = multer({ storage });



const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;



/* ==============================
   MongoDB Connection
============================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

/* ==============================
   Adoption Schema
============================== */
const adoptionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: String,
    gender: String,
    vaccinated: String,
    location: String,
    phone: String,
    description: String,
    imageUrl: String,
    public_id: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Adoption = mongoose.model("Adoption", adoptionSchema);

/* ==============================
   Volunteer Schema
============================== */
const volunteerSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    role: String,
    time: String,
    why: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

/* ==============================
   SMTP Transporter
============================== */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error("SMTP ERROR:", err);
  else console.log("SMTP Ready");
});

/* ==============================
   Submit Adoption (Cloudinary)
============================== */
app.post("/api/adopt-submissions", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      email,
      age,
      gender,
      vaccinated,
      location,
      phone,
      description,
    } = req.body;

    if (!location || !phone) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields",
      });
    }

    const newSubmission = new Adoption({
      name,
      email,
      age,
      gender,
      vaccinated,
      location,
      phone,
      description,
      imageUrl: req.file ? req.file.path : null,
      public_id: req.file ? req.file.filename : null,
    });

    await newSubmission.save();

    // 🔹 Send email but don't crash if it fails
    try {
      await transporter.sendMail({
        from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🐾 New Adoption Submission - ${name || "Unknown"}`,
        text: `New Adoption Submission from ${name}`,
      });
    } catch (mailErr) {
      console.error("Email failed but submission saved:", mailErr.message);
    }

    res.json({ ok: true });

  } catch (err) {
    console.error("ADOPTION ERROR:", err.message);
    res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
});


/* ==============================
   Submit Volunteer
============================== */
app.post("/api/volunteer", async (req, res) => {
  try {
    const { name, email, phone, role, time, why } = req.body;

    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      role,
      time,
      why,
    });

    await newVolunteer.save();
    res.json({ ok: true });
  } catch (err) {
    console.error("VOLUNTEER ERROR:", err);
    res.status(500).json({ error: "Submission failed" });
  }
});

/* ==============================
   Admin Login
============================== */
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

/* ==============================
   Admin Middleware
============================== */
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

/* ==============================
   Admin - Get Pending Adoptions
============================== */
app.get("/api/admin/pending", verifyAdmin, async (req, res) => {
  try {
    const adoptions = await Adoption.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch adoptions" });
  }
});

/* ==============================
   Admin - Update Adoption Status
============================== */
app.patch("/api/admin/adoptions/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Adoption.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (status === "approved" && updated.email) {
      await transporter.sendMail({
        from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
        to: updated.email,
        subject: "🐾 Your Adoption Submission Has Been Approved!",
        text: `Hello ${updated.name}, your adoption request is approved!`,
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

/* ==============================
   Get Approved Puppies
============================== */
app.get("/api/approved-puppies", async (req, res) => {
  try {
    const approved = await Adoption.find({ status: "approved" })
      .sort({ createdAt: -1 });

    res.json(approved);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch approved puppies" });
  }
});

/* ==============================
   Server Start
============================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
