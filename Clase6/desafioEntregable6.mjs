import fs from "fs";

class Archivo {
    constructor(nombreArchivo) {
        this.nombre = nombreArchivo;
    }

    async leerArch() {
        try {
            const productos = JSON.parse(await fs.promises.readFile(this.nombre, "utf-8"));
            if (productos.length > 0) {
                console.log("Productos leerArch", productos);
            } else {
                console.log("No hay productos");
            }
            return productos;
        } catch (err) {
            console.log("hubo un error", err);
        }
    };

    async guardarArch(nuevoProducto) {
        let productosStr = {};
        try {
            let productos = await this.leerArch();
            nuevoProducto.id = productos.length + 1;
            productos.push(nuevoProducto);
            productosStr = JSON.stringify(productos, null, "\t");
            await fs.promises.writeFile(
                this.nombre,
                productosStr);
        } catch (err) {
            console.log("Hubo un error al guardar el archivo")
        }
    };

    async borrarArch() {
        try {
            await fs.promises.unlink(this.nombre);
        } catch (err) {
            console.log("hubo un error", err)
        }
    };
};

const archivo = new Archivo("./productos.txt")
archivo.leerArch();

const nuevoProducto = {
    "title": 'Calculadora',
    "price": 345.50,
    "thumbnail": 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
}

archivo.guardarArch(nuevoProducto);

//archivo.borrarArch();