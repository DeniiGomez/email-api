require('dotenv').config()
const nodemailer = require('nodemailer')

const sendMail = async (name, email, code) => {
  //const testAccount = await nodemailer.createTestAccount()
  //console.log(testAccount)
  //console.log(process.env.CLIENT)

  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.CLIENT,
      pass: process.env.PASS,
    }
  })

  const url = `http://localhost:3333/api/qa/v1/users/confirm/${code}`

  const mailOptions = {
    from: `"Prueba QA enviar email" <${process.env.USER}>`,
    to: email,
    subject: 'Confirmación de correo',
    text: url,
    html: `
     <h1>Confirmación de correo</h1>
     <h2>Hola ${name}</h2>
     <p>Gracias por registrarte, por favor confirma tu correo dando click en el siguiente link</p>
     <a href="${url}" target="_blank">Click aqui</a>
    `
  }

  const info = await transport.sendMail(mailOptions)
  console.log(nodemailer.getTestMessageUrl(info))

  return info
}

module.exports = sendMail
