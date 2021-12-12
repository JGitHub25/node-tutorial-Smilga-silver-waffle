const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "nils.zboncak79@ethereal.email",
      pass: "nkCGXXAjeeRUTDteVe",
    },
  });

  let info = await transporter.sendMail({
    from: '"Jairo Espine 👻" <jairo25509@hotmail.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world?</b>", // html body
  });

  res.send({ info });
};

module.exports = sendEmail;
