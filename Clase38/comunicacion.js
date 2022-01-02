"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsCompra = exports.wappCompra = exports.gmailCompra = exports.smsMensajeAdmin = exports.gmailRegistro = exports.emailLogout = void 0;
var logger_js_1 = require("./logger.js");
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var mailAdmin = 'mhiba3010@gmail.com';
var client = twilio('AC330b46057cc4a08728f3f09fcec2a142', '5edf226aa5e4fd516f9bc01ddaf0d689');
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
            logger_js_1.errorLogger.error(error);
            return error;
        }
        return logger_js_1.consoleLogger.info(info);
    });
}
exports.emailLogout = emailLogout;
function gmailRegistro(nom, ape, email, dire, fono, edad) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = 'Nuevo registro';
    mailOptionsGmail.html = "<h1> Se ha registrado un nuevo usuario con los siguientes datos: </h1>\n      <h2>Nombre: " + nom + "</h2>\n      <h2>Apellido: " + ape + "</h2>\n      <h2>eMail: " + email + "</h2>\n      <h2>Direcci\u00F3n: " + dire + "</h2>\n      <h2>Tel\u00E9fono: " + fono + "</h2>\n      <h2>Edad: " + edad + "</h2>";
    transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
        if (error) {
            logger_js_1.errorLogger.error(error);
            return error;
        }
        return logger_js_1.consoleLogger.info(info);
    });
}
exports.gmailRegistro = gmailRegistro;
function smsMensajeAdmin(texto, autor) {
    client.messages.create({
        body: "Mensaje recibido de " + autor + " - texto recibido: " + texto,
        from: '+17404956791',
        to: '+5401130252875',
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.smsMensajeAdmin = smsMensajeAdmin;
function gmailCompra(productos, nombre, email) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = "Nuevo pedido de " + nombre + " - " + email;
    mailOptionsGmail.html = "<h1> Se ha registrado un pedido con los siguientes productos: </h1>\n      <h2>" + productos + "</h2>";
    transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
        if (error) {
            logger_js_1.errorLogger.error(error);
            return error;
        }
        return logger_js_1.consoleLogger.info(info);
    });
}
exports.gmailCompra = gmailCompra;
function wappCompra(productos, nombre, email) {
    client.messages.create({
        body: "Nuevo pedido de " + nombre + " - " + email + " - lista de productos: " + productos,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5491130252875'
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.wappCompra = wappCompra;
function smsCompra(telefono) {
    client.messages.create({
        body: "Su pedido ha sido recibido y se encuentra en proceso",
        from: '+17404956791',
        to: telefono,
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.smsCompra = smsCompra;
