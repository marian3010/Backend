import {isAdmin} from '../server.js';
import express from "express";

export const authorizationMiddleware = () => (_req: express.Request, _res: express.Response, next: express.NextFunction) => {if (!isAdmin) {return next(_res.status(403).json('No autorizado'));}  next();};