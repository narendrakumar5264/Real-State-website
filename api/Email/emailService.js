import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// Create a transporter using your email service (e.g., Gmail or SendGrid)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use another email service like SendGrid
  auth: {
    user: 'nkestate.nk@gmail.com',  // Your email address
    pass:  process.env.EMAIL_PASS,   // Your email password or use environment variables
  },
});

// Function to send the welcome email
export const sendWelcomeEmail = (email, username) => {
    const mailOptions = {
      from: 'nkestate.nk@gmail.com',
      to: email,
      subject: 'Welcome to Our Real Estate Platform!',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .container {
                width: 80%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
              }
              .header img {
                width: 100px;
              }
              .content {
                font-size: 16px;
                line-height: 1.5;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 14px;
                color: #777;
              }
              .button {
                display: inline-block;
                background-color: #4CAF50;
                color: #fff;
                padding: 12px 25px;
                text-align: center;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                
              </div>
              <div class="content">
                <h2>Hello ${username},</h2>
                <p>Thank you for signing up with us! We're excited to have you onboard.</p>
                <p>Explore our platform and find your perfect property with ease. Our team is always here to assist you in your real estate journey.</p>
                <a href="https://real-state-website-y2ru.onrender.com/" class="button">Start Exploring</a>
              </div>
              <div class="footer">
                <p>Best regards,</p>
                <p><strong>NKEstate Team(Narendra Kumar)</strong></p>
                <p>Contact us: <a href="mailto:jangidnarendra858@gmail.com">jangidnarendra858@gmail.com</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

