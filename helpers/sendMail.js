const nodemailer = require("nodemailer");
module.exports.sendMail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // Gmail của Linh
            pass: process.env.EMAIL_PASSWORD,  // Dán App Password vào đây
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Đổi thành email người nhận
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Lỗi gửi email:", err);
        } else {
            console.log("Email đã gửi:", info.response);
        }
    });
}
