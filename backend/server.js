require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

// ✅ SMTP transporter (Gmail)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// ✅ Verify SMTP on server start
transporter.verify((err, success) => {
    if (err) {
        console.error('SMTP ERROR:', err)
    } else {
        console.log('SMTP ready to send emails ✅')
    }
})

// ✅ Volunteer API
app.post('/api/volunteer', async(req, res) => {
    try {
        const { name, email, phone, role, why } = req.body

        if (!name || !email) {
            return res.status(400).json({ ok: false, error: 'Missing fields' })
        }

        const message = `\nNew Volunteer Application\n\nName: ${name}\nEmail: ${email}   \nPhone: ${phone}\n\nWhy:\n${why}\n`

        await transporter.sendMail({
            from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
            to: ADMIN_EMAIL,
            subject: `🐾 New Volunteer Application – ${name}`,
            text: message
        })

        res.json({ ok: true })
    } catch (err) {
        console.error('MAIL ERROR:', err)
        res.status(500).json({ ok: false, error: 'Email failed' })
    }
})

// ✅ Adopt submissions (file upload + email to admins)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const ADOPT_RECIPIENT = process.env.ADMIN_EMAIL || ''

app.post('/api/adopt-submissions', upload.single('image'), async(req, res) => {
    try {
        const { name, age, gender, vaccinated, location, phone, description } = req.body

        if (!location || !phone) {
            return res.status(400).json({ ok: false, error: 'Missing required fields' })
        }

        const file = req.file

        const message = `New adoption submission\n\nName: ${name || '—'}\nAge: ${age || '—'}\nGender: ${gender || '—'}\nVaccinated: ${vaccinated || '—'}\nLocation: ${location}\nPhone: ${phone}\n\nDescription:\n${description || '—'}\n`

        const mailOptions = {
            from: `"Tails of Bijapur" <${process.env.SMTP_USER}>`,
            to: ADOPT_RECIPIENT,
            subject: `New Adoption Submission${name ? ' – ' + name : ''}`,
            text: message,
            attachments: []
        }

        if (file) {
            mailOptions.attachments.push({ filename: file.originalname || file.filename, path: file.path, contentType: file.mimetype })
        }

        await transporter.sendMail(mailOptions)

        // Respond with success and the saved filename so admin can find it
        res.json({ ok: true, file: file ? file.filename : null })
    } catch (err) {
        console.error('ADOPT SUBMISSION ERROR:', err)
        res.status(500).json({ ok: false, error: 'Submission failed' })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})