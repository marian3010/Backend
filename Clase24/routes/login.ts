import express from "express";
import session from 'express-session';
declare module "express-session" {
    interface Session {
      nombre: string;
    }
  }
export const loginRouter = express.Router();
import path from "path";
const __dirname = path.resolve();

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
loginRouter.use(sessionHandler);

loginRouter.get('/login', (req: express.Request, res: express.Response) => {
  if (req.session.nombre) {
    return res.render("welcome", {username: req.session.nombre})
  } else res.sendFile(__dirname + "/public/formLogin.html");
});

loginRouter.post('/login', (req: express.Request, res: express.Response) => {
  const { username } = req.body;
  if (!username) {
      return res.send('Login failed');
  }
  req.session.nombre = username;
  console.log("usuario", req.session.nombre)
  return res.redirect('/ecommerce/login');
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
      res.render("byebye", {username: nombre})
  });
});
