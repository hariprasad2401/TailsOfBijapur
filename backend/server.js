require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/* ==============================
   MongoDB Connection
============================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

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
    image: String,
    status: {
      type: String,
      default: "PENDING",
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
      default: "PENDING",
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
  if (err) {
    console.error("❌ SMTP ERROR:", err);
  } else {
    console.log("✅ SMTP ready to send emails");
  }
});

/* ==============================
   File Upload
============================== */
const upload = multer({ dest: "uploads/" });

/* ==============================
   Submit Adoption
============================== */
app.post(
  "/api/adopt-submissions",
  upload.single("image"),
  async (req, res) => {
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
        return res
          .status(400)
          .json({ ok: false, error: "Missing required fields" });
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
        image: req.file ? req.file.filename : null,
      });

      await newSubmission.save();

      await transporter.sendMail({
        from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
        to: ADMIN_EMAIL,
        subject: `🐾 New Adoption Submission - ${name || "Unknown"}`,
        text: `
New Adoption Submission

Name: ${name || "-"}
Email: ${email || "-"}
Age: ${age || "-"}
Gender: ${gender || "-"}
Vaccinated: ${vaccinated || "-"}
Location: ${location}
Phone: ${phone}

Description:
${description || "-"}
        `,
      });

      res.json({ ok: true });
    } catch (err) {
      console.error("ADOPTION ERROR:", err);
      res.status(500).json({ ok: false, error: "Submission failed" });
    }
  }
);

/* ==============================
   Submit Volunteer
============================== */
app.post("/api/volunteer", async (req, res) => {
  try {
    const { name, email, phone, role, time, why } = req.body;

    if (!name || !email) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const newVolunteer = new Volunteer({
      name,
      email,
      phone,
      role,
      time,
      why,
    });

    await newVolunteer.save();

    await transporter.sendMail({
      from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `🐾 New Volunteer Application – ${name}`,
      text: `
New Volunteer Application

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Role: ${role || "-"}
Availability: ${time || "-"}

Why:
${why || "-"}
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("VOLUNTEER ERROR:", err);
    res.status(500).json({ ok: false, error: "Submission failed" });
  }
});

/* ==============================
   Get All Submissions
============================== */
app.get("/api/adopt-submissions", async (req, res) => {
  const submissions = await Adoption.find().sort({ createdAt: -1 });
  res.json(submissions);
});

app.get("/api/volunteers", async (req, res) => {
  const volunteers = await Volunteer.find().sort({ createdAt: -1 });
  res.json(volunteers);
});

/* ==============================
   Update Status
============================== */
app.patch("/api/volunteers/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await Volunteer.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
});

app.patch("/api/adopt-submissions/:id", async (req, res) => {
  const { status } = req.body;
  const updated = await Adoption.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updated);
});

/* ==============================
   Start Server
============================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
