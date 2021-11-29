"use strict";
var min = 1;
var numRandom;
var cant;
function numAleatorio(min, max) {
    return numRandom = Math.floor(min + Math.random() * (max - min + 1));
}
;
process.on('message', function (cant) {
    console.log("max recibido del proceso padre", cant);
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
