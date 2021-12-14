"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionHandler = exports.loginRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var numCPUs = require('os').cpus().length;
var fork = require('child_process').fork;
var logger_js_1 = require("../logger.js");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'sadye.schneider6@ethereal.email',
        pass: 'QHYK9X3FZE18mpm1Rv',
    },
});
var mailOptions = {
    from: 'Servidor Node.js',
    to: 'mhiba3010@gmail.com',
    subject: '',
    html: '',
};
var transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mhiba3010@gmail.com',
        // ! Con 2FA, necesario Contraseña de Aplicación
        // ! Sin 2FA Aplicacion Poco Segura https://www.google.com/settings/security/lesssecureapps
        pass: '...',
    },
});
var mailOptionsGmail = {
    from: 'Servidor Node.js',
    to: '',
    subject: '',
    html: '',
    attachments: [
        {
            path: '',
        },
    ],
};
//declare module "express-session" {
/* interface Session {
   nombre: string;
 }*/
//  }
//const bCrypt = require('bcrypt');
var passport = require('passport');
//const passportLocal = require('passport-local');
//import {Users, IUsuario} from '../model/users';
//const mongoose = require("mongoose");
exports.loginRouter = express_1.default.Router();
//import path from "path";
//const __dirname = path.resolve();
//import MongoStore from 'connect-mongo';
//const advancedOptions: any = {useNewUrlParser: true, useUnifiedTopology: true}
exports.sessionHandler = (0, express_session_1.default)({
    /* store: MongoStore.create({
       mongoUrl: 'mongodb+srv://admin:12345@cluster0.jbzno.mongodb.net/ecommerce?retryWrites=true&w=majority',
       mongoOptions: advancedOptions}),*/
    secret: 'secreto',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    /*cookie: {
        maxAge: 60000,
      },*/
});
exports.loginRouter.use(exports.sessionHandler);
exports.loginRouter.use(passport.initialize());
exports.loginRouter.use(passport.session());
////////
/*async function connectMongoose() {
    console.log("conexión a mongoLocal");
    try {
        await mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log("Base de datos Mongo conectada");
    } catch(error) {
        console.log(error)
    }
}*/
///////
//const createHash = (password: string) => bCrypt.hashSync(password, bCrypt.genSaltSync(10));
//const isValidPassword = (user: any, password: string) => bCrypt.compareSync(password, user.password);
var FacebookStrategy = require('passport-facebook').Strategy;
/*let FACEBOOK_CLIENT_ID:string = '273751394685780';
if (process.argv[3]){
  FACEBOOK_CLIENT_ID = process.argv[3].toString()
}
let FACEBOOK_CLIENT_SECRET:string = 'bdc22f2dd51fd93cdaf053b722598c31';
if (process.argv[4]){
  FACEBOOK_CLIENT_SECRET = process.argv[4].toString()
}*/
var FACEBOOK_CLIENT_ID = Number(process.argv[3]) || '273751394685780';
var FACEBOOK_CLIENT_SECRET = Number(process.argv[4]) || 'bdc22f2dd51fd93cdaf053b722598c31';
logger_js_1.consoleLogger.info("facebook client ID " + FACEBOOK_CLIENT_ID);
logger_js_1.consoleLogger.info("facebook client secret " + FACEBOOK_CLIENT_SECRET);
//const loginStrategyName = 'login';
//const signUpStrategyName = 'signup';
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/ecommerce/oklogin',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
}, function (_accessToken, _refreshToken, profile, done) {
    logger_js_1.consoleLogger.info("profile " + profile);
    return done(null, profile);
})
/*async (_request: express.Request, username: string, password: string, done: any) => {
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
},*/
);
/*passport.use(
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
          console.log("verificando errores linea 78")
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
);*/
passport.serializeUser(function (user, done) { return done(null, user); });
passport.deserializeUser(function (user, done) { return done(null, user); });
/*passport.deserializeUser((id: any, done: any) => {
  Users.findById(id, (error: string, user: any) => done(error, user));
});*/
////////////////////////
/*const checkAuthentication = (request: any, response: express.Response, next: any) => {
  if (request.isAuthenticated()) {
    return next();
  }

  return response
    .redirect(302, '/login');
};*/
////////////////////////
//process.on('exit', (code) => console.log('exit ${code}'),);
/*loginRouter.get('/login', (req: any, res: express.Response) => {

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
      });
  }
  console.log('user NO logueado');
  return res
    .status(200)
    .sendFile(`${__dirname}/public/formlogin.html`);
});*/
/*loginRouter.post('/login',passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' }), (req: express.Request, res: express.Response) => {
  
  const { username } = req.body;
  if (!username) {
      return res.send('Login failed');
  }
  req.session.nombre = username;
  console.log("usuario", req.session.nombre)
  return res.redirect('/ecommerce/login');
  
});*/
exports.loginRouter.get('/', function (req, res) {
    if (req.isAuthenticated()) {
        return res.render('datos', {
            id: req.user.id,
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
        });
    }
    return res.render('registro');
});
exports.loginRouter.post('/login', passport.authenticate('facebook', {
    scope: 'email',
    authType: 'reauthenticate',
    authNonce: 'foo123'
}));
exports.loginRouter.get('/oklogin', passport.authenticate('facebook', {
    successRedirect: '/ecommerce/datos',
    failureRedirect: '/ecommerce/faillogin',
}));
exports.loginRouter.get('/datos', function (req, res) {
    if (req.isAuthenticated()) {
        console.log("req.user", req.user);
        mailOptions.subject = 'Log in';
        mailOptions.html = "<h1> " + req.user.displayName + " - " + Date() + " </h1>";
        console.log("mail options", mailOptions);
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            }
            console.log(info);
        });
        mailOptionsGmail.to = req.user.emails[0].value;
        mailOptionsGmail.subject = 'Log in';
        mailOptionsGmail.html = "<h1> " + req.user.displayName + " - " + Date() + " </h1>";
        mailOptionsGmail.attachments[0].path = req.user.photos[0].value;
        transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            }
            return console.log(info);
        });
        res.render('datos', {
            id: req.user.id,
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
        });
    }
    return res.redirect('/ecommerce/');
});
exports.loginRouter.get('/faillogin', function (req, res) {
    logger_js_1.consoleLogger.info('error en login');
    logger_js_1.warningLogger.warn('hubo un error en el login');
    return res
        .status(500)
        .render('error-login', {});
});
/*loginRouter.get('/registro', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/formRegistro.html");
});

loginRouter.post('/registro', passport.authenticate(signUpStrategyName, { failureRedirect: '/ecommerce/failsignup' }), async (req: express.Request, res: express.Response) => {
  return res.redirect('/ecommerce/login');
});*/
/*loginRouter.get('/failsignup', (req: express.Request, res: express.Response) => {
    console.log('error en registro');
    return res
      .status(500)
      .render('error-registro', {});
  }
);*/
/*loginRouter.get('/ruta-protegida', checkAuthentication, (req: any, res: express.Response) => {
  const { user } = req;
  console.log(user);
  return res
    .status(200)
    .send('<h1>Ruta OK!</h1>');
});*/
/*loginRouter.get('/logout', async (req: express.Request, res: express.Response) => {
  const { nombre } = req.session;
  req.session.destroy((error) => {
      if (error) {
        return res.send({
            status: 'Logout error',
            body: error,
          });
      }
      res.render("byebye", {username: nombre})
  });
});*/
exports.loginRouter.get('/logout', function (req, res) {
    var username = req.user.displayName;
    mailOptions.subject = 'Log out';
    mailOptions.html = "<h1> " + req.user.displayName + " - " + Date() + " </h1>";
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return error;
        }
        return console.log(info);
    });
    req.logOut();
    res.render("byebye", { username: username });
    //return res.redirect('/ecommerce/');
});
exports.loginRouter.get('/info', function (req, res) {
    /*consoleLogger.info(`argumentos: ${process.argv.slice(2)}, plataforma: ${process.platform},
     version: ${process.version}, uso memoria: ${JSON.stringify(process.memoryUsage())}
    , path: ${process.execPath}, pid: ${process.pid}, CPUs: ${numCPUs}`);*/
    res.render("datosProceso", {
        argumentos: process.argv.slice(2),
        plataforma: process.platform,
        version: process.version,
        usomemo: JSON.stringify(process.memoryUsage()),
        path: process.execPath,
        pid: process.pid,
        numCPUs: numCPUs,
    });
});
exports.loginRouter.get('/random/:cant?', function (req, res) {
    var cant = 100000;
    if (req.params.cant) {
        cant = parseInt(req.params.cant);
    }
    var child = fork('./random.js');
    logger_js_1.consoleLogger.info("parametro a enviar " + cant);
    child.send(cant, function () { logger_js_1.consoleLogger.info("parametro enviado por el padre " + cant); });
    child.on('message', function (message) {
        res.json({ message: message });
    });
});
