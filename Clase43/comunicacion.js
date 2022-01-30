"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smsCompra = exports.wappCompra = exports.gmailCompra = exports.smsMensajeAdmin = exports.gmailRegistro = exports.emailLogout = void 0;
var logger_js_1 = require("./logger.js");
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var config = require("./config");
var mailAdmin = config.ADMIN_EMAIL;
var client = twilio(config.TWILIO_ID, config.TWILIO_PASS);
var transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailAdmin,
        pass: config.GMAIL_PASS,
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
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = 'Logout';
    mailOptionsGmail.html = "<h1> " + nombre + " - " + Date() + " </h1>";
    transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
        if (error) {
            logger_js_1.errorLogger.error(error);
            return error;
        }
        return logger_js_1.consoleLogger.info(info);
    });
}
exports.emailLogout = emailLogout;
;
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
;
function smsMensajeAdmin(texto, autor) {
    client.messages.create({
        body: "Mensaje recibido de " + autor + " - texto recibido: " + texto,
        from: config.TWILIO_SMS,
        to: config.ADMIN_CEL_SMS,
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.smsMensajeAdmin = smsMensajeAdmin;
;
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
;
function wappCompra(productos, nombre, email) {
    client.messages.create({
        body: "Nuevo pedido de " + nombre + " - " + email + " - lista de productos: " + productos,
        from: "whatsapp:" + config.TWILIO_WAPP,
        to: "whatsapp:" + config.ADMIN_CEL_WAPP
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.wappCompra = wappCompra;
;
function smsCompra(telefono) {
    client.messages.create({
        body: "Su pedido ha sido recibido y se encuentra en proceso",
        from: config.TWILIO_SMS,
        to: telefono,
    })
        .then(function (message) { return logger_js_1.consoleLogger.info(message.sid); })
        .catch(function (error) { return logger_js_1.errorLogger.error(error); });
}
exports.smsCompra = smsCompra;
;
