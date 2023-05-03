const { parentPort, workerData } = require('worker_threads');
const nodemailer = require('nodemailer');

const { email, message } = workerData;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Job Completed',
    text: message
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        parentPort.postMessage({ status: 'error', error: error.message });
    } else {
        parentPort.postMessage({ status: 'success', info });
    }
});
