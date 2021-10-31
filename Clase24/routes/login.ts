import express from "express";
import session from 'express-session';
declare module "express-session" {
    interface Session {
      nombre: string;
      contador: number;
    }
  }
export const loginRouter = express.Router();
import path from "path";
const __dirname = path.resolve();

const app = express();


export const sessionHandler = session(
  {
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60_000,
      },
  },
);
app.use(sessionHandler);

loginRouter.get('/login', (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/public/formLogin.html");
});

loginRouter.post('/login', (req: express.Request, res: express.Response) => {

    console.log("estoy en el post del login")
    
    if (req.session.contador) {
        console.log("muestro el contador", req.session.contador)
        req.session.contador += 1;
    
        if (!req.session.nombre) {
          return res.redirect('ecommerce/login');
        }
    
        return res.sendFile(__dirname + "/public/agregoProd.html");
    }
    console.log("contador en 0")
    req.session.contador = 1;
    const { username } = req.body.userName;
    console.log("muestro el nombre ingresado", username)
    if (!username) {
        return res.send('Login failed');
    }
    req.session.nombre = username;
    return res.sendFile(__dirname + "/public/agregoProd.html");
});
  
loginRouter.get('/logout', async (req: express.Request, res: express.Response) => {
    const { nombre } = req.session;
    req.session.destroy((error) => {
        if (error) {
          return res.send({
              status: 'Logout error',
              body: error,
            });
        }
        return res.sendFile(__dirname + "/public/deslogueo.html");
           
    });
});


