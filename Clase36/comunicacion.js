"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsCompra = exports.wappCompra = exports.gmailCompra = exports.smsMensajeAdmin = exports.gmailRegistro = exports.emailLogout = void 0;
var login_js_1 = __importDefault(require("./routes/login.js"));
console.log("usuario en comunicacion recibido de login", login_js_1.default);
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var mailAdmin = 'mhiba3010@gmail.com';
var client = twilio('AC330b46057cc4a08728f3f09fcec2a142', '599cda18b6c7024e3546d80fb3171010');
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mateo.hilll92@ethereal.email',
        pass: 'MhDabT9mADsA5e8zPK',
    },
});
var mailOptions = {
    from: 'Servidor Node.js',
    to: mailAdmin,
    subject: '',
    html: '',
};
var transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailAdmin,
        // ! Con 2FA, necesario Contraseña de Aplicación
        // ! Sin 2FA Aplicacion Poco Segura https://www.google.com/settings/security/lesssecureapps
        pass: 'andtleriqhfvcvhv',
    },
});
var mailOptionsGmail = {
    from: 'Servidor Node.js',
    to: mailAdmin,
    subject: '',
    html: '',
    attachments: [
        {
            path: '',
        },
    ],
};
function emailLogout(nombre) {
    mailOptions.subject = 'Log out';
    mailOptions.html = "<h1> " + nombre + " - " + Date() + " </h1>";
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        }
        return console.log(info);
    });
}
exports.emailLogout = emailLogout;
function gmailRegistro(nom, ape, email, dire, fono, edad) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = 'Nuevo registro';
    mailOptionsGmail.html = "<h1> Se ha registrado un nuevo usuario con los siguientes datos: </h1>\n      <h2>Nombre: " + nom + "</h2>\n      <h2>Apellido: " + ape + "</h2>\n      <h2>eMail: " + email + "</h2>\n      <h2>Direcci\u00F3n: " + dire + "</h2>\n      <h2>Tel\u00E9fono: " + fono + "</h2>\n      <h2>Edad: " + edad + "</h2>";
    transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        }
        return console.log(info);
    });
}
exports.gmailRegistro = gmailRegistro;
function smsMensajeAdmin(texto, autor) {
    client.messages.create({
        body: "Mensaje recibido de " + autor + " - texto recibido: " + texto,
        from: '+17404956791',
        to: '+5401130252875',
    })
        .then(function (message) { return console.log(message.sid); })
        .catch(function (error) { return console.log(error); });
}
exports.smsMensajeAdmin = smsMensajeAdmin;
function gmailCompra(productos) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = "Nuevo pedido de " + login_js_1.default.nombre + " - " + login_js_1.default.email;
    mailOptionsGmail.html = "<h1> Se ha registrado un pedido con los siguientes productos: </h1>\n      <h2>" + productos + "</h2>";
    transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        }
        return console.log(info);
    });
}
exports.gmailCompra = gmailCompra;
function wappCompra(productos) {
    client.messages.create({
        body: "Nuevo pedido de " + login_js_1.default.nombre + " - " + login_js_1.default.email + " - lista de productos: " + productos,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491130252875',
    })
        .then(function (message) { return console.log(message.sid); })
        .catch(function (error) { return console.log(error); });
}
exports.wappCompra = wappCompra;
function smsCompra() {
    client.messages.create({
        body: "Su pedido ha sido recibido y se encuentra en proceso",
        from: '+17404956791',
        to: login_js_1.default.telefono,
    })
        .then(function (message) { return console.log(message.sid); })
        .catch(function (error) { return console.log(error); });
}
exports.smsCompra = smsCompra;
