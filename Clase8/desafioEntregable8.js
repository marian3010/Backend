import express from "express";
import fs from "fs";



const port = 8080;
const app = express();
const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.on("error", (error) => {
    console.error(error);
});

async function leerArch() {
    try {
        const productos = JSON.parse(await fs.promises.readFile("./productos.txt", "utf-8"));
        return productos;
    } catch (err) {
        console.log("hubo un error", err);
    }
};
async function guardarArch(nuevoProducto) {
    let productosStr = {};
    try {
        let productos = await leerArch();
        nuevoProducto.id = productos.length + 1;
        productos.push(nuevoProducto);
        productosStr = JSON.stringify(productos, null, "\t");
        await fs.promises.writeFile(
            "./productos.txt",
            productosStr);
    } catch (err) {
        console.log("Hubo un error al guardar el archivo")
    }
};

app.get('/api/productos/listar', async(req, res) => {

    try {
        const productos = await leerArch();
        res.send({ items: productos });
    } catch (err) {
        console.log("hubo un error", err);
    }
})

app.get('/api/productos/listar/:id', async(req, res) => {

    try {
        const productos = await leerArch();
        console.log(productos);
        console.log(productos.length);
        for (let i = 0; i > productos.length; i++) {
            console.log("paso por aca");
            if (productos[i].id === req.params.id) {
                console.log(productos[i]);
                res.send({ item: productos[i] });
                return;
            }
        }


    } catch (err) {
        console.log("hubo un error", err);
    }
});