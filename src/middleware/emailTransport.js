const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: "fc.fenomen@mail.ru",
            pass: "Aqn3cTqMhmDqdV8cUUdm"
        },
    },
    {
        from: 'Музыкотерапия <fc.fenomen@mail.ru>',
    }
);