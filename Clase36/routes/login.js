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
exports.sessionHandler = exports.loginRouter = void 0;
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var fs_1 = __importDefault(require("fs"));
var numCPUs = require('os').cpus().length;
var fork = require('child_process').fork;
var logger_js_1 = require("../logger.js");
var mailAdmin = 'mhiba3010@gmail.com';
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mateo.hilll92@ethereal.email',
        pass: 'MhDabT9mADsA5e8zPK',
    },
});
var mailOptions = {
    from: 'Servidor Node.js',
    to: mailAdmin,
    subject: '',
    html: '',
};
var transporterGmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailAdmin,
        // ! Con 2FA, necesario Contraseña de Aplicación
        // ! Sin 2FA Aplicacion Poco Segura https://www.google.com/settings/security/lesssecureapps
        pass: 'andtleriqhfvcvhv',
    },
});
var mailOptionsGmail = {
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
var bCrypt = require('bcrypt');
var passport = require('passport');
var passportLocal = require('passport-local');
var users_1 = require("../model/users");
var mongoose = require("mongoose");
exports.loginRouter = express_1.default.Router();
var path_1 = __importDefault(require("path"));
var __dirname = path_1.default.resolve();
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
exports.sessionHandler = (0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: 'mongodb+srv://admin:12345@cluster0.jbzno.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    rolling: true,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
});
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
                    console.log("conexión a mongoLocal");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mongoose.connect("mongodb://localhost:27017/ecommerce")];
                case 2:
                    _a.sent();
                    console.log("Base de datos Mongo conectada");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
///////
var createHash = function (password) { return bCrypt.hashSync(password, bCrypt.genSaltSync(10)); };
var isValidPassword = function (user, password) { return bCrypt.compareSync(password, user.password); };
//const FacebookStrategy = require('passport-facebook').Strategy;
//const FACEBOOK_CLIENT_ID = Number(process.argv[3]) || '273751394685780';
//const FACEBOOK_CLIENT_SECRET = Number(process.argv[4]) || 'bdc22f2dd51fd93cdaf053b722598c31';
//consoleLogger.info(`facebook client ID ${FACEBOOK_CLIENT_ID}`);
//consoleLogger.info(`facebook client secret ${FACEBOOK_CLIENT_SECRET}`);
var loginStrategyName = 'login';
var signUpStrategyName = 'signup';
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
                        console.log("User Not Found with username " + username);
                        return done(null, false);
                    }
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false);
                    }
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
                console.log("va a verificar si existe");
                return [4 /*yield*/, connectMongoose()];
            case 1:
                _a.sent();
                users_1.Users.findOne({
                    username: username,
                }, function (error, user) {
                    if (error) {
                        console.log("Error in SignUp: " + error);
                        return done(error);
                    }
                    if (user) {
                        console.log('User already exists');
                        return done(null, false);
                    }
                    console.log("creando objeto usuario");
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
                            console.log("Error in Saving user: " + error);
                            throw error;
                        }
                        console.log('User Registration succesful');
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
        .sendFile(__dirname + "/public/formlogin.html");
});
exports.loginRouter.post('/login', passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' }), function (req, res) {
    var username = req.body.username;
    if (!username) {
        return res.send('Login failed');
    }
    req.session.nombre = username;
    console.log("usuario", req.session.nombre);
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
        mailOptionsGmail.to = mailAdmin;
        mailOptionsGmail.subject = 'Nuevo registro';
        mailOptionsGmail.html = "<h1> Se ha registrado un nuevo usuario con los siguientes datos: </h1>\n    <h2>Nombre: " + req.body.firstName + "</h2>\n    <h2>Apellido: " + req.body.lastName + "</h2>\n    <h2>eMail: " + req.body.email + "</h2>\n    <h2>Direcci\u00F3n: " + req.body.address + "</h2>\n    <h2>Tel\u00E9fono: " + req.body.phone + "</h2>\n    <h2>Edad: " + req.body.age + "</h2>";
        //mailOptionsGmail.attachments[0].path = req.body.avatar;
        transporterGmail.sendMail(mailOptionsGmail, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            }
            return console.log(info);
        });
        fs_1.default.promises.writeFile("./public/" + req.body.avatar, req.body.avatar, "utf-8");
        return [2 /*return*/, res.redirect('/ecommerce/login')];
    });
}); });
exports.loginRouter.get('/failsignup', function (req, res) {
    console.log('error en registro');
    return res
        .status(500)
        .render('error-registro', {});
});
exports.loginRouter.get('/ruta-protegida', checkAuthentication, function (req, res) {
    var user = req.user;
    console.log(user);
    return res
        .status(200)
        .send('<h1>Ruta OK!</h1>');
});
exports.loginRouter.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        nombre = req.session.nombre;
        mailOptions.subject = 'Log out';
        mailOptions.html = "<h1> " + nombre + " - " + Date() + " </h1>";
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return error;
            }
            return console.log(info);
        });
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
