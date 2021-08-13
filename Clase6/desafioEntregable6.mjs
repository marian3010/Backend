import fs from "fs";

class Archivo {
    constructor(nombreArchivo) {
        this.nombre = nombreArchivo;
    }
}

const nombreArchivo = (new Archivo("./productos.txt")).nombre;

async function leerArch() {
    try {
        const productos = await fs.promises.readFile(nombreArchivo, "utf-8");
        if (productos.length > 0) {
            console.log(productos);
        } else {
            console.log("no hay productos");
        }
        const productosObj = JSON.parse(productos);
        productosObj.push({
            title: "Calculadora",
            price: "345,50",
            thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            id: productos.length + 1
        })

        fs.promises.writeFile(
            nombreArchivo,
            JSON.stringify(productosObj, null)
        );

    } catch (err) {
        console.log("hubo un error", err)
    };


};


//async function Borrar() {
//    try {
//        await fs.promises.unlink(nombreArchivo);
//    } catch (err) {
//        console.log("hubo un error", err)
//    };
//};

leerArch();