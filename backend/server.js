require("dotenv").config();

// 🔹 Fix SRV DNS issue
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
const adoptionSchema = new mongoose.Schema({
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
}, { timestamps: true });

const Adoption = mongoose.model("Adoption", adoptionSchema);

/* ==============================
   Volunteer Schema
============================== */
const volunteerSchema = new mongoose.Schema({
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
}, { timestamps: true });


const Volunteer = mongoose.model("Volunteer", volunteerSchema);

/* ==============================
   Zoho SMTP Transporter
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
        console.error("SMTP ERROR:", err);
    } else {
        console.log("SMTP Ready");
    }
});

/* ==============================
   File Upload (Multer)
============================== */
const upload = multer({ dest: "uploads/" });

/* ==============================
   Submit Adoption
============================== */
app.post(
    "/api/adopt-submissions",
    upload.single("image"),
    async(req, res) => {
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
                to: process.env.ADMIN_EMAIL,
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
app.post("/api/volunteer", async(req, res) => {
    try {
        const { name, email, phone, role, time, why } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
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
            to: process.env.ADMIN_EMAIL,
            subject: "🐾 New Volunteer Application",
            text: `
New Volunteer Application

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}
Occupation: ${role || "-"}
Availability: ${time || "-"}
Why:
${why || "-"}
      `,
        });

        res.json({ ok: true });
    } catch (err) {
        console.error("VOLUNTEER ERROR:", err);
        res.status(500).json({ error: "Submission failed" });
    }
});

/* ==============================
   Get All Adoption Submissions
============================== */
app.get("/api/adopt-submissions", async(req, res) => {
    try {
        const submissions = await Adoption.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
});

/* ==============================
   Get All Volunteer Applications
============================== */
app.get("/api/volunteers", async(req, res) => {
    try {
        const volunteers = await Volunteer.find().sort({ createdAt: -1 });
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch volunteers" });
    }
});

/* ==============================
   Approve / Reject Volunteer
============================== */
app.patch("/api/volunteers/:id", async(req, res) => {
    try {
        const { status } = req.body;

        const updated = await Volunteer.findByIdAndUpdate(
            req.params.id, { status }, { new: true }
        );

        if (status === "APPROVED" && updated.email) {
            await transporter.sendMail({
                from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
                to: updated.email,
                subject: "🐾 Volunteer Application Approved!",
                text: `
Hello ${updated.name},

Your volunteer application has been approved!

We will contact you soon.

Thank you,
Tails of Bijapur
                `,
            });
        }

        res.json(updated);
    } catch (err) {
        console.error("VOLUNTEER STATUS ERROR:", err);
        res.status(500).json({ error: "Failed to update status" });
    }
});

/* ==============================
   Approve / Reject Adoption
============================== */
app.patch("/api/adopt-submissions/:id", async(req, res) => {
    try {
        const { status } = req.body;

        const updated = await Adoption.findByIdAndUpdate(
            req.params.id, { status }, { new: true }
        );

        if (status === "APPROVED" && updated.email) {
            await transporter.sendMail({
                from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
                to: updated.email,
                subject: "🐾 Your Adoption Submission Has Been Approved!",
                text: `
Hello ${updated.name || ""},

Good news!

Your adoption submission has been approved.

We will contact you shortly.

Thank you for supporting Tails of Bijapur
        `,
            });
        }

        res.json(updated);
    } catch (err) {
        console.error("STATUS UPDATE ERROR:", err);
        res.status(500).json({ error: "Failed to update status" });
    }
});

/* ==============================
   Server Start
============================== */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});