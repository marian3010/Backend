import fs from "fs";

let info = {};
let size;
fs.stat("./package.json", (error, stats) => {
    if (error) {
        "hubo un error en stat"
        return;
    };
    size = stats.size;
});


fs.readFile("./package.json", "utf-8", (error, contenido) => {
    if (error) {
        "hubo un error leyendo el archivo"
        return
    };

    info.contenidoStr = contenido;
    info.contenidoObj = JSON.parse(contenido);
    info.size = size;
    console.log(info);

    fs.writeFile("info.txt", JSON.stringify(info, null, "\t"), "utf-8", (error) => {
        if (error) {
            "hubo un error en la escritura del archivo"
            return
        };

    });

});