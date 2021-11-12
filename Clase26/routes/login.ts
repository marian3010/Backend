import express from "express";
import session from 'express-session';
declare module "express-session" {
    interface Session {
      nombre: string;
    }
  }
import bodyParser from "body-parser";
const bCrypt = require('bcrypt');
const passport = require('passport')
const passportLocal = require('passport-local');
import {Users, IUsuario} from '../model/users';
const mongoose = require("mongoose");

export const loginRouter = express.Router();
import path from "path";
const __dirname = path.resolve();

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

const loginStrategyName = 'login';
const signUpStrategyName = 'signup';

passport.use(
  loginStrategyName,
  new passportLocal.Strategy(
    {
      passReqToCallback: true,
    },
    (_request: express.Request, username: string, password: string, done: any) => {
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
    (request: express.Request, username: string, password: string, done: any) => {
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
);

passport.serializeUser((user: any, done: any) => {
  done(null, user._id);
});

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

import MongoStore from 'connect-mongo';
const advancedOptions: any = {useNewUrlParser: true, useUnifiedTopology: true}

/*export const sessionHandler = session(
  {
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://admin:12345@cluster0.jbzno.mongodb.net/ecommerce?retryWrites=true&w=majority',
      mongoOptions: advancedOptions}),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
      },
  },
);*/
//loginRouter.use(sessionHandler);

loginRouter.get('/login', (req: express.Request, res: express.Response) => {
  //if (req.session.nombre) {
    //return res.render("welcome", {username: req.session.nombre})
   res.sendFile(__dirname + "/public/formLogin.html");
});

loginRouter.post('/login', (req: express.Request, res: express.Response) => {
  //passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' })
  return res.redirect('/ecommerce/login');
});

loginRouter.get('/faillogin', (req: express.Request, res: express.Response) => {
    console.log('error en login');
    return res
      .status(500)
      .render('login-error', {});
  }
);

loginRouter.get('/registro', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/formRegistro.html");
});

loginRouter.post('/registro', async (req: express.Request, res: express.Response) => {
  console.log("va a conectar a mongoose para registrar");
  await connectMongoose();
  console.log("mostrar el body del front", req.body.username);
  //passport.authenticate(signUpStrategyName, { failureRedirect: '/ecommerce/failsignup' })
  return res.redirect('/ecommerce/login');
 
});

loginRouter.get('/failsignup', (req: express.Request, res: express.Response) => {
    console.log('error en signup');
    return res
      .status(500)
      .render('signup-error', {});
  }
);

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
