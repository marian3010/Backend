import express from "express";
import session from 'express-session';
import fs from "fs";
import {Users, IUsuario} from '../model/users';
import {consoleLogger, errorLogger, warningLogger} from '../logger.js'
import {emailLogout, gmailRegistro} from '../comunicacion';
import MongoStore from 'connect-mongo';
const advancedOptions: any = {useNewUrlParser: true, useUnifiedTopology: true}

import path from "path";
const __dirname = path.resolve(); 

const bCrypt = require('bcrypt');
const passport = require('passport')
const passportLocal = require('passport-local');
const numCPUs = require ('os').cpus().length;
const mongoose = require("mongoose");

const config = require("../config");
const mongoUser = config.MONGO_USER;
const mongoPass = config.MONGO_PASS;
const mongoDbName = config.MONGO_DBNAME;
const expTime = parseInt(config.EXP_TIME);

declare module "express-session" {
  interface Session {
    nombre: string;
  }
}

export const sessionHandler = session(
  {
    store: MongoStore.create({
    mongoUrl: `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.jbzno.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions}),
    secret: 'secreto',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: expTime,
      },
  },
);

export const loginRouter = express.Router();
loginRouter.use(sessionHandler);
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

////////
async function connectMongoose() {
    consoleLogger.info("conexión a mongoAtlas");
    try {
        await mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.jbzno.mongodb.net/${mongoDbName}?retryWrites=true&w=majority`)
        consoleLogger.info("Base de datos Mongo conectada");
    } catch(error) {
        errorLogger.error(error)
    }    
}
///////
const createHash = (password: string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10));
const isValidPassword = (user: any, password: string) => bCrypt.compareSync(password, user.password);

const loginStrategyName = 'login';
const signUpStrategyName = 'signup';

export let nombreUsuario = "";

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
          warningLogger.warn(`User Not Found with username ${username}`);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          consoleLogger.info('Invalid Password');
          return done(null, false);
        }
        nombreUsuario = user.username;
        consoleLogger.info("mostrar el user logueado",nombreUsuario);
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
      consoleLogger.info("va a verificar si existe");
      await connectMongoose();
      Users.findOne(
        {
          username,
        },
        (error: string, user: any) => {
          if (error) {
            errorLogger.error(`Error in SignUp: ${error}`);
            consoleLogger.error(`Error in SignUp: ${error}`);
            return done(error);
          }
          if (user) {
            consoleLogger.info('User already exists');
            return done(
              null,
              false,
            );
          }
          consoleLogger.info("creando objeto usuario");
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
              errorLogger.error(`Error in Saving user: ${error}`);
              consoleLogger.error(`Error in Saving user: ${error}`);
              throw error;
            }
            consoleLogger.info('User Registration succesful');
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

process.on('exit', (code) => console.log(`exit ${code}`),);

loginRouter.get('/login', (req: any, res: express.Response) => {

  if (req.isAuthenticated()) {
    const { user } = req;
    consoleLogger.info('user logueado', user.username);
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
  consoleLogger.info('user NO logueado');
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
  gmailRegistro(req.body.firstName,req.body.lastName,req.body.email,req.body.address,req.body.phone,req.body.age)
  fs.promises.writeFile(`./public/${req.body.avatar}`, req.body.avatar, "utf-8");
  return res.redirect('/ecommerce/login');
});

loginRouter.get('/failsignup', (req: express.Request, res: express.Response) => {
    consoleLogger.error('error en registro');
    return res
      .status(500)
      .render('error-registro', {});
  }
);

loginRouter.get('/ruta-protegida', checkAuthentication, (req: any, res: express.Response) => {
  const { user } = req;
  consoleLogger.info(user);
  return res
    .status(200)
    .send('<h1>Ruta OK!</h1>');
});

loginRouter.get('/logout', async (req: express.Request, res: express.Response) => {
  const { nombre } = req.session;
  emailLogout(nombre);
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

