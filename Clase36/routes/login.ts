import express from "express";
import session from 'express-session';
import fs from "fs";
const numCPUs = require ('os').cpus().length;
const { fork } = require('child_process');
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'
const mailAdmin = 'mhiba3010@gmail.com';
const nodemailer = require('nodemailer');

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


declare module "express-session" {
    interface Session {
      nombre: string;
    }
}
const bCrypt = require('bcrypt');
const passport = require('passport')
const passportLocal = require('passport-local');

import {Users, IUsuario} from '../model/users';
const mongoose = require("mongoose");

export const loginRouter = express.Router();
import path from "path";
const __dirname = path.resolve();


import MongoStore from 'connect-mongo';
const advancedOptions: any = {useNewUrlParser: true, useUnifiedTopology: true}
export const sessionHandler = session(
  {
    store: MongoStore.create({
    mongoUrl: 'mongodb+srv://admin:12345@cluster0.jbzno.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions: advancedOptions}),
    secret: 'secreto',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
      },
  },
);
loginRouter.use(sessionHandler);
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

////////
async function connectMongoose() {
    console.log("conexión a mongoLocal");
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log("Base de datos Mongo conectada");
    } catch(error) {
        console.log(error)
    }    
}
///////
const createHash = (password: string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10));
const isValidPassword = (user: any, password: string) => bCrypt.compareSync(password, user.password);

//const FacebookStrategy = require('passport-facebook').Strategy;
//const FACEBOOK_CLIENT_ID = Number(process.argv[3]) || '273751394685780';
//const FACEBOOK_CLIENT_SECRET = Number(process.argv[4]) || 'bdc22f2dd51fd93cdaf053b722598c31';
//consoleLogger.info(`facebook client ID ${FACEBOOK_CLIENT_ID}`);
//consoleLogger.info(`facebook client secret ${FACEBOOK_CLIENT_SECRET}`);

const loginStrategyName = 'login';
const signUpStrategyName = 'signup';

passport.use(
  loginStrategyName,
  new passportLocal.Strategy(
    {
      passReqToCallback: true,
    },
    async (_request: express.Request, username: string, password: string, done: any) => {
      await connectMongoose();
      Users.findOne({
        username,
      },
      (error: string, user: any) => {
        if (error) {
          return done(error);
        }

        if (!user) {
          console.log(`User Not Found with username ${username}`);

          return done(null, false);
        }

        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');

          return done(null, false);
        }

        return done(null, user);
      });
    },
  ),
);

passport.use(
  signUpStrategyName,
  new passportLocal.Strategy(
    {
      passReqToCallback: true,
    },
    async (request: express.Request, username: string, password: string, done: any) => {
      console.log("va a verificar si existe");
      await connectMongoose();
      Users.findOne(
        {
          username,
        },
        (error: string, user: any) => {
         
          if (error) {
            console.log(`Error in SignUp: ${error}`);

            return done(error);
          }

          if (user) {
            console.log('User already exists');

            return done(
              null,
              false,
            );
          }
          console.log ("creando objeto usuario");
          const newUser: IUsuario = new Users();
 
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = request.body.email;
          newUser.firstName = request.body.firstName;
          newUser.lastName = request.body.lastName;
          newUser.address = request.body.address;
          newUser.age = request.body.age;
          newUser.phone = request.body.phone;
     
          return newUser.save((error: any) => {
            if (error) {
              console.log(`Error in Saving user: ${error}`);

              throw error;
            }

            console.log('User Registration succesful');

            return done(null, newUser);
          });
        },
      );
    },
  ),
);

passport.serializeUser((user:any, done:any) => done(null, user));
passport.deserializeUser((user:any, done:any) => done(null, user));

passport.deserializeUser((id: any, done: any) => {
  Users.findById(id, (error: string, user: any) => done(error, user));
});

////////////////////////
const checkAuthentication = (request: any, response: express.Response, next: any) => {
  if (request.isAuthenticated()) {
    return next();
  }

  return response
    .redirect(302, '/login');
};
////////////////////////

process.on('exit', (code) => console.log('exit ${code}'),);

loginRouter.get('/login', (req: any, res: express.Response) => {

  if (req.isAuthenticated()) {
    const { user } = req;
    console.log('user logueado');
    return res
      .status(200)
      .render('welcome', {
        usuario: user.username,
        nombre: user.firstName,
        apellido: user.lastName,
        email: user.email,
        direccion: user.address,
        edad: user.age,
        telefono: user.phone,
      });
  }
  console.log('user NO logueado');
  return res
    .status(200)
    .sendFile(`${__dirname}/public/formlogin.html`);
});

loginRouter.post('/login',passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' }), (req: express.Request, res: express.Response) => {
  
  const { username } = req.body;
  if (!username) {
      return res.send('Login failed');
  }
  req.session.nombre = username;
  console.log("usuario", req.session.nombre)
  return res.redirect('/ecommerce/login');
  
});

loginRouter.get('/faillogin', (req: express.Request, res: express.Response) => {
  consoleLogger.info('error en login'); 
  warningLogger.warn('hubo un error en el login'); 
    return res
      .status(500)
      .render('error-login', {});
  }
);

loginRouter.get('/registro', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/formRegistro.html");
});

loginRouter.post('/registro', passport.authenticate(signUpStrategyName, { failureRedirect: '/ecommerce/failsignup' }), async (req: express.Request, res: express.Response) => {
  mailOptionsGmail.to = mailAdmin;
  mailOptionsGmail.subject = 'Nuevo registro';
  mailOptionsGmail.html = `<h1> Se ha registrado un nuevo usuario con los siguientes datos: </h1>
    <h2>Nombre: ${req.body.firstName}</h2>
    <h2>Apellido: ${req.body.lastName}</h2>
    <h2>eMail: ${req.body.email}</h2>
    <h2>Dirección: ${req.body.address}</h2>
    <h2>Teléfono: ${req.body.phone}</h2>
    <h2>Edad: ${req.body.age}</h2>`;
  //mailOptionsGmail.attachments[0].path = req.body.avatar;
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
  fs.promises.writeFile(`./public/${req.body.avatar}`, req.body.avatar, "utf-8");
  return res.redirect('/ecommerce/login');
});

loginRouter.get('/failsignup', (req: express.Request, res: express.Response) => {
    console.log('error en registro');
    return res
      .status(500)
      .render('error-registro', {});
  }
);

loginRouter.get('/ruta-protegida', checkAuthentication, (req: any, res: express.Response) => {
  const { user } = req;
  console.log(user);
  return res
    .status(200)
    .send('<h1>Ruta OK!</h1>');
});

loginRouter.get('/logout', async (req: express.Request, res: express.Response) => {
  const { nombre } = req.session;
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
  req.session.destroy((error) => {
      if (error) {
        return res.send({
            status: 'Logout error',
            body: error,
          });
      }
      res.render("byebye", {username: nombre})
  });
});

loginRouter.get('/info', (req:express.Request, res: express.Response) => {
  /*consoleLogger.info(`argumentos: ${process.argv.slice(2)}, plataforma: ${process.platform},
   version: ${process.version}, uso memoria: ${JSON.stringify(process.memoryUsage())}
  , path: ${process.execPath}, pid: ${process.pid}, CPUs: ${numCPUs}`);*/

  res.render("datosProceso", {
    argumentos: process.argv.slice(2),
    plataforma: process.platform,
    version: process.version,
    usomemo: JSON.stringify(process.memoryUsage()),
    path: process.execPath,
    pid:process.pid,
    numCPUs: numCPUs,
  });
});

loginRouter.get('/random/:cant?', (req:express.Request, res: express.Response) => {
  let cant = 100000;
  if (req.params.cant) {
    cant = parseInt(req.params.cant)
  }
  const child = fork('./random.js');
  consoleLogger.info(`parametro a enviar ${cant}`);
  child.send(cant, () => {consoleLogger.info(`parametro enviado por el padre ${cant}`)},)
  
  child.on(
    'message',
    (message:[]) => {
      res.json({message})}
  );  
   
});