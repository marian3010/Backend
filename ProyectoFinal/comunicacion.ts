import {consoleLogger, errorLogger, warningLogger} from './logger.js'
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const config = require("./config");

const mailAdmin = config.ADMIN_EMAIL;

const client = twilio(
  config.TWILIO_ID,
  config.TWILIO_PASS
)

const transporterGmail = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: mailAdmin,
      pass: config.GMAIL_PASS,
    },
  },
);

const mailOptionsGmail = {
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

export function emailLogout(nombre:string){
  mailOptionsGmail.to = mailAdmin;
  mailOptionsGmail.subject = 'Logout';
  mailOptionsGmail.html = `<h1> ${nombre} - ${Date()} </h1>`;
  transporterGmail.sendMail(
    mailOptionsGmail,
    (error:any, info:any) => {
      if (error) {
        errorLogger.error(error);
        return error;
      }
      return consoleLogger.info(info);
    },
  );
};

export function gmailRegistro(nom:string,ape:string,email:string,dire:string,fono:string,edad:number) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = 'Nuevo registro';
    mailOptionsGmail.html = `<h1> Se ha registrado un nuevo usuario con los siguientes datos: </h1>
      <h2>Nombre: ${nom}</h2>
      <h2>Apellido: ${ape}</h2>
      <h2>eMail: ${email}</h2>
      <h2>Dirección: ${dire}</h2>
      <h2>Teléfono: ${fono}</h2>
      <h2>Edad: ${edad}</h2>`;
    
    transporterGmail.sendMail(
      mailOptionsGmail,
      (error:any, info:any) => {
        if (error) {
          errorLogger.error(error);
          return error;
        }
        return consoleLogger.info(info);
      },
    );
};

export function smsMensajeAdmin(texto:string, autor:string) {
    client.messages.create(
        {
            body: `Mensaje recibido de ${autor} - texto recibido: ${texto}`,
            from: config.TWILIO_SMS,
            to: config.ADMIN_CEL_SMS,
        },
    )
    .then((message:any) => consoleLogger.info(message.sid))
    .catch((error:any) => errorLogger.error(error));
     
};

export function gmailCompra(productos:any, nombre:string, email:string, orden:any) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = `Nuevo pedido número ${orden} de ${nombre} - ${email}`;
    mailOptionsGmail.html = `<h1> Se ha registrado el pedido número ${orden} con los siguientes productos: </h1>
      <h2>${productos}</h2>`;
    
    transporterGmail.sendMail(
      mailOptionsGmail,
      (error:any, info:any) => {
        if (error) {
          errorLogger.error(error);
          return error;
        }
        return consoleLogger.info(info);
      },
    );
};

export function wappCompra(productos:any, nombre:string, email:string, orden:any) {
    client.messages.create(
        {
            body: `Nuevo pedido Nro ${orden} de ${nombre} - ${email} - lista de productos: ${productos}`,
            from: `whatsapp:${config.TWILIO_WAPP}`,
            to: `whatsapp:${config.ADMIN_CEL_WAPP}`
        }
    )
    .then((message:any) => consoleLogger.info(message.sid))
    .catch((error:any) => errorLogger.error(error));
};

export function smsCompra(telefono:string, orden:any) {
    client.messages.create(
        {
            body: `Su pedido Nro ${orden} ha sido recibido y se encuentra en proceso`,
            from: config.TWILIO_SMS,
            to: telefono,
        },
    )
    .then((message:any) => consoleLogger.info(message.sid))
    .catch((error:any) => errorLogger.error(error));
};

