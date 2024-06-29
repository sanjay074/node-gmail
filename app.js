const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  // Transporter configuration (example with Gmail)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    },
  });

  // Email options
  let mailOptions = {
    from: 'anonymous@example.com', // Custom "From" address
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
