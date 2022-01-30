"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nombreUsuario = exports.sessionHandler = exports.loginRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var fs_1 = __importDefault(require("fs"));
var numCPUs = require('os').cpus().length;
var logger_js_1 = require("../logger.js");
var comunicacion_1 = require("../comunicacion");
var bCrypt = require('bcrypt');
var passport = require('passport');
var passportLocal = require('passport-local');
var path_1 = __importDefault(require("path"));
var __dirname = path_1.default.resolve();
var users_1 = require("../model/users");
var mongoose = require("mongoose");
exports.loginRouter = express_1.default.Router();
var config = require("../config");
var mongoUser = config.MONGO_USER;
var mongoPass = config.MONGO_PASS;
var mongoDbName = config.MONGO_DBNAME;
var expTime = parseInt(config.EXP_TIME);
logger_js_1.consoleLogger.info("expiration time " + config.EXP_TIME);
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
exports.sessionHandler = (0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: "mongodb+srv://" + mongoUser + ":" + mongoPass + "@cluster0.jbzno.mongodb.net/" + mongoDbName + "?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: expTime,
    },
});
//export const loginRouter = express.Router();
exports.loginRouter.use(exports.sessionHandler);
exports.loginRouter.use(passport.initialize());
exports.loginRouter.use(passport.session());
////////
function connectMongoose() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger_js_1.consoleLogger.info("conexión a mongoAtlas");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongoose.connect("mongodb+srv://" + mongoUser + ":" + mongoPass + "@cluster0.jbzno.mongodb.net/" + mongoDbName + "?retryWrites=true&w=majority")];
                case 2:
                    _a.sent();
                    logger_js_1.consoleLogger.info("Base de datos Mongo conectada");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    logger_js_1.errorLogger.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
///////
var createHash = function (password) { return bCrypt.hashSync(password, bCrypt.genSaltSync(10)); };
var isValidPassword = function (user, password) { return bCrypt.compareSync(password, user.password); };
var loginStrategyName = 'login';
var signUpStrategyName = 'signup';
exports.nombreUsuario = "";
passport.use(loginStrategyName, new passportLocal.Strategy({
    passReqToCallback: true,
}, function (_request, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectMongoose()];
            case 1:
                _a.sent();
                users_1.Users.findOne({
                    username: username,
                }, function (error, user) {
                    if (error) {
                        return done(error);
                    }
                    if (!user) {
                        logger_js_1.warningLogger.warn("User Not Found with username " + username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        logger_js_1.consoleLogger.info('Invalid Password');
                        return done(null, false);
                    }
                    exports.nombreUsuario = user.username;
                    logger_js_1.consoleLogger.info("mostrar el user logueado", exports.nombreUsuario);
                    return done(null, user);
                });
                return [2 /*return*/];
        }
    });
}); }));
passport.use(signUpStrategyName, new passportLocal.Strategy({
    passReqToCallback: true,
}, function (request, username, password, done) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logger_js_1.consoleLogger.info("va a verificar si existe");
                return [4 /*yield*/, connectMongoose()];
            case 1:
                _a.sent();
                users_1.Users.findOne({
                    username: username,
                }, function (error, user) {
                    if (error) {
                        logger_js_1.errorLogger.error("Error in SignUp: " + error);
                        logger_js_1.consoleLogger.error("Error in SignUp: " + error);
                        return done(error);
                    }
                    if (user) {
                        logger_js_1.consoleLogger.info('User already exists');
                        return done(null, false);
                    }
                    logger_js_1.consoleLogger.info("creando objeto usuario");
                    var newUser = new users_1.Users();
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.email = request.body.email;
                    newUser.firstName = request.body.firstName;
                    newUser.lastName = request.body.lastName;
                    newUser.address = request.body.address;
                    newUser.age = request.body.age;
                    newUser.phone = request.body.phone;
                    return newUser.save(function (error) {
                        if (error) {
                            logger_js_1.errorLogger.error("Error in Saving user: " + error);
                            logger_js_1.consoleLogger.error("Error in Saving user: " + error);
                            throw error;
                        }
                        logger_js_1.consoleLogger.info('User Registration succesful');
                        return done(null, newUser);
                    });
                });
                return [2 /*return*/];
        }
    });
}); }));
passport.serializeUser(function (user, done) { return done(null, user); });
passport.deserializeUser(function (user, done) { return done(null, user); });
passport.deserializeUser(function (id, done) {
    users_1.Users.findById(id, function (error, user) { return done(error, user); });
});
////////////////////////
var checkAuthentication = function (request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    return response
        .redirect(302, '/login');
};
////////////////////////
process.on('exit', function (code) { return console.log('exit ${code}'); });
exports.loginRouter.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        var user = req.user;
        logger_js_1.consoleLogger.info('user logueado', user.username);
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
    logger_js_1.consoleLogger.info('user NO logueado');
    return res
        .status(200)
        .sendFile(__dirname + "/public/formlogin.html");
});
exports.loginRouter.post('/login', passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' }), function (req, res) {
    var username = req.body.username;
    if (!username) {
        return res.send('Login failed');
    }
    req.session.nombre = username;
    return res.redirect('/ecommerce/login');
});
exports.loginRouter.get('/faillogin', function (req, res) {
    logger_js_1.consoleLogger.info('error en login');
    logger_js_1.warningLogger.warn('hubo un error en el login');
    return res
        .status(500)
        .render('error-login', {});
});
exports.loginRouter.get('/registro', function (req, res) {
    res.sendFile(__dirname + "/public/formRegistro.html");
});
exports.loginRouter.post('/registro', passport.authenticate(signUpStrategyName, { failureRedirect: '/ecommerce/failsignup' }), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, comunicacion_1.gmailRegistro)(req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.phone, req.body.age);
        fs_1.default.promises.writeFile("./public/" + req.body.avatar, req.body.avatar, "utf-8");
        return [2 /*return*/, res.redirect('/ecommerce/login')];
    });
}); });
exports.loginRouter.get('/failsignup', function (req, res) {
    logger_js_1.consoleLogger.error('error en registro');
    return res
        .status(500)
        .render('error-registro', {});
});
exports.loginRouter.get('/ruta-protegida', checkAuthentication, function (req, res) {
    var user = req.user;
    logger_js_1.consoleLogger.info(user);
    return res
        .status(200)
        .send('<h1>Ruta OK!</h1>');
});
exports.loginRouter.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        nombre = req.session.nombre;
        (0, comunicacion_1.emailLogout)(nombre);
        req.session.destroy(function (error) {
            if (error) {
                return res.send({
                    status: 'Logout error',
                    body: error,
                });
            }
            res.render("byebye", { username: nombre });
        });
        return [2 /*return*/];
    });
}); });
exports.loginRouter.get('/info', function (req, res) {
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
