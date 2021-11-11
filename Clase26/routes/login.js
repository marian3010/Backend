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
var bCrypt = require('bcrypt');
var passport = require('passport');
var passportLocal = require('passport-local');
var User = require('./model/users');
var mongoose = require("mongoose");
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
                    console.log("Base de datos conectada");
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
var loginStrategyName = 'login';
var signUpStrategyName = 'signup';
passport.use(loginStrategyName, new passportLocal.Strategy({
    passReqToCallback: true,
}, function (_request, username, password, done) {
    User.findOne({
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
}));
passport.use(signUpStrategyName, new passportLocal.Strategy({
    passReqToCallback: true,
}, function (request, username, password, done) {
    User.findOne({
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
        var newUser = new User();
        newUser.username = username;
        newUser.password = createHash(password);
        newUser.email = request.body.email;
        newUser.firstName = request.body.firstName;
        newUser.lastName = request.body.lastName;
        return newUser.save(function (error) {
            if (error) {
                console.log("Error in Saving user: " + error);
                throw error;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
        });
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (error, user) { return done(error, user); });
});
/// ///////////////////
//const checkAuthentication = (request: express.Request, response: express.Response, next: any) => {
//  if (request.isAuthenticated()) {
//    return next();
//  }
//  return response
//    .redirect(302, '/login');
//};
///////////////////
connectMongoose();
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
exports.loginRouter = express_1.default.Router();
var path_1 = __importDefault(require("path"));
var __dirname = path_1.default.resolve();
exports.sessionHandler = (0, express_session_1.default)({
    store: connect_mongo_1.default.create({
        mongoUrl: 'mongodb+srv://admin:12345@cluster0.jbzno.mongodb.net/ecommerce?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
    },
});
exports.loginRouter.use(exports.sessionHandler);
exports.loginRouter.get('/login', function (req, res) {
    if (req.session.nombre) {
        return res.render("welcome", { username: req.session.nombre });
    }
    else
        res.sendFile(__dirname + "/public/formLogin.html");
});
exports.loginRouter.post('/login', function (req, res) {
    passport.authenticate(loginStrategyName, { failureRedirect: '/ecommerce/faillogin' });
    return res.redirect('/ecommerce/login');
});
exports.loginRouter.get('/faillogin', function (req, res) {
    console.log('error en login');
    return res
        .status(500)
        .render('login-error', {});
});
exports.loginRouter.get('/registro', function (req, res) {
    res.sendFile(__dirname + "/public/formRegistro.html");
});
exports.loginRouter.post('/registro', function (req, res) {
    passport.authenticate(signUpStrategyName, { failureRedirect: '/ecommerce/failsignup' });
    location.href = "/ecommerce/login";
});
exports.loginRouter.get('/failsignup', function (req, res) {
    console.log('error en signup');
    return res
        .status(500)
        .render('signup-error', {});
});
exports.loginRouter.get('/logout', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nombre;
    return __generator(this, function (_a) {
        nombre = req.session.nombre;
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