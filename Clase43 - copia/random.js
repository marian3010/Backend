"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_js_1 = require("./logger.js");
var min = 1;
var numRandom;
function numAleatorio(min, max) {
    return numRandom = Math.floor(min + Math.random() * (max - min + 1));
}
;
process.on('message', function (cant) {
    logger_js_1.consoleLogger.info("valor max recibido del proceso padre " + cant);
    var resultado = {};
    for (var i = 1; i < cant; i++) {
        numAleatorio(min, cant);
        if (!resultado[numRandom]) {
            resultado[numRandom] = 1;
        }
        else {
            resultado[numRandom]++;
        }
    }
    ;
    process.send(resultado);
});
