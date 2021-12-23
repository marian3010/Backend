import usuario from './routes/login.js';
console.log("usuario en comunicacion recibido de login", usuario);
const nodemailer = require('nodemailer');
const twilio = require('twilio');

const mailAdmin = 'mhiba3010@gmail.com';
const client = twilio(
    'AC330b46057cc4a08728f3f09fcec2a142',
    '599cda18b6c7024e3546d80fb3171010',
  );

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'mateo.hilll92@ethereal.email',
      pass: 'MhDabT9mADsA5e8zPK',
    },
  },
);

const mailOptions = {
  from: 'Servidor Node.js',
  to: mailAdmin,
  subject: '',
  html: '',
};

const transporterGmail = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: mailAdmin,
      // ! Con 2FA, necesario Contraseña de Aplicación
      // ! Sin 2FA Aplicacion Poco Segura https://www.google.com/settings/security/lesssecureapps
      pass: 'andtleriqhfvcvhv',
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
  mailOptions.subject = 'Log out';
  mailOptions.html = `<h1> ${nombre} - ${Date()} </h1>`;
  transporter.sendMail(
    mailOptions,
    (error:any, info:any) => {
      if (error) {
        console.log(error);
        return error;
      }
      return console.log(info);
    },
  );
}

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
          console.log(error);
          return error;
        }
        return console.log(info);
      },
    );
}

export function smsMensajeAdmin(texto:string, autor:string) {
    client.messages.create(
        {
            body: `Mensaje recibido de ${autor} - texto recibido: ${texto}`,
            from: '+17404956791',
            to: '+5401130252875',
        },
    )
    .then((message:any) => console.log(message.sid))
    .catch((error:any) => console.log(error));
     
}

export function gmailCompra(productos:any) {
    mailOptionsGmail.to = mailAdmin;
    mailOptionsGmail.subject = `Nuevo pedido de ${usuario.nombre} - ${usuario.email}`;
    mailOptionsGmail.html = `<h1> Se ha registrado un pedido con los siguientes productos: </h1>
      <h2>${productos}</h2>`;
    
    transporterGmail.sendMail(
      mailOptionsGmail,
      (error:any, info:any) => {
        if (error) {
          console.log(error);
          return error;
        }
        return console.log(info);
      },
    );
}

export function wappCompra(productos:any) {
    client.messages.create(
        {
            body: `Nuevo pedido de ${usuario.nombre} - ${usuario.email} - lista de productos: ${productos}`,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491130252875',
        },
    )
    .then((message:any) => console.log(message.sid))
    .catch((error:any) => console.log(error));
}

export function smsCompra() {
    client.messages.create(
        {
            body: `Su pedido ha sido recibido y se encuentra en proceso`,
            from: '+17404956791',
            to: usuario.telefono,
        },
    )
    .then((message:any) => console.log(message.sid))
    .catch((error:any) => console.log(error));
}

