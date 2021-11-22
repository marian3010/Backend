import express from "express";
import session from 'express-session';
const { fork } = require('child_process');

//declare module "express-session" {
   /* interface Session {
      nombre: string;
    }*/
//  }
//const bCrypt = require('bcrypt');
const passport = require('passport')
//const passportLocal = require('passport-local');

//import {Users, IUsuario} from '../model/users';
//const mongoose = require("mongoose");

export const loginRouter = express.Router();
//import path from "path";
//const __dirname = path.resolve();


//import MongoStore from 'connect-mongo';
//const advancedOptions: any = {useNewUrlParser: true, useUnifiedTopology: true}
export const sessionHandler = session(
  {
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
  },
);
loginRouter.use(sessionHandler);
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

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

const FacebookStrategy = require('passport-facebook').Strategy;
/*let FACEBOOK_CLIENT_ID:string = '273751394685780';
if (process.argv[3]){
  FACEBOOK_CLIENT_ID = process.argv[3].toString()
}
let FACEBOOK_CLIENT_SECRET:string = 'bdc22f2dd51fd93cdaf053b722598c31';
if (process.argv[4]){
  FACEBOOK_CLIENT_SECRET = process.argv[4].toString()
}*/
const FACEBOOK_CLIENT_ID = Number(process.argv[3]) || '273751394685780';
const FACEBOOK_CLIENT_SECRET = Number(process.argv[4]) || 'bdc22f2dd51fd93cdaf053b722598c31';
console.log("facebook client ID", FACEBOOK_CLIENT_ID);
console.log("tipo - facebook client ID", typeof(FACEBOOK_CLIENT_ID));
console.log("facebook client secret", FACEBOOK_CLIENT_SECRET);
console.log("tipo - facebook client secret", typeof(FACEBOOK_CLIENT_SECRET));
//const loginStrategyName = 'login';
//const signUpStrategyName = 'signup';

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: '/ecommerce/oklogin',
      profileFields: ['id', 'displayName', 'photos', 'emails'],
    },
    (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
      console.log(profile);

      return done(
        null,
        profile,
      );
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

passport.serializeUser((user:any, done:any) => done(null, user));
passport.deserializeUser((user:any, done:any) => done(null, user));

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


loginRouter.get('/', (req: any, res:express.Response) => {
    if (req.isAuthenticated()) {
        return res.render('datos', {
        id: req.user.id,
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
      })
    }
    return res.render('registro');
  },
);

loginRouter.post('/login',passport.authenticate('facebook', {
  scope: 'email',
  authType: 'reauthenticate',
  authNonce: 'foo123'
})
);

loginRouter.get('/oklogin',passport.authenticate(
    'facebook',
    {
      successRedirect: '/ecommerce/datos',
      failureRedirect: '/ecommerce/faillogin',
    },
  ),
);

loginRouter.get('/datos', (req: any, res: express.Response) => {
    if (req.isAuthenticated()) {
        return res.render('datos', {
        id: req.user.id,
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
      })
    }

    return res.redirect('/ecommerce/');
  },
);

loginRouter.get('/faillogin', (req: express.Request, res: express.Response) => {
    console.log('error en login');
    return res
      .status(500)
      .render('error-login', {});
  }
);

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


loginRouter.get('/logout', (req: any, res: express.Response) => {
  let username =  req.user.displayName;
  req.logOut();
  res.render("byebye", {username}) 
    //return res.redirect('/ecommerce/');
  },
);

loginRouter.get('/info', (req:express.Request, res: express.Response) => {
  res.render("datosProceso", {
    argumentos: process.argv.slice(2),
    plataforma: process.platform,
    version: process.version,
    usomemo: JSON.stringify(process.memoryUsage()),
    path: process.execPath,
    pid:process.pid,
  });
});

loginRouter.get('/random/:cant?', (req:express.Request, res: express.Response) => {
  let cant = 100000;
  if (req.params.cant) {
    cant = parseInt(req.params.cant)
  }
 
  const child = fork('./random.js');
  console.log("parametro a enviar", cant);
  child.send(cant, () => {console.log("max parametro enviado por el padre", cant)},)

  child.on(
    'message',
    (message:[]) => {
      res.json({message})}
  );  
});