import express from "express";
import fs from "fs";

const port = 8080;
const app = express();
const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`);
});
server.on("error", (error) => {
    console.error(error);
});

let visitasItem = 0;
let visitasItemRandom = 0;

async function leerArch() {
    try {
        const productos = JSON.parse(await fs.promises.readFile("./productos.txt", "utf-8"));
        return productos;
    } catch (err) {
        console.log("hubo un error", err);
    }
};

app.get('/items', async(req, res) => {
    visitasItem++;
    try {
        const productos = await leerArch();
        res.send({ items: productos, cantidad: productos.length });
    } catch (err) {
        console.log("hubo un error", err);
    }
})

app.get("/item-random", async(req, res) => {
    visitasItemRandom++;
    try {
        const productos = await leerArch();
        const nroRandom = Math.trunc(Math.random() * productos.length);
        console.log(nroRandom);
        res.send({ item: productos[nroRandom] });
    } catch (err) {
        console.log("hubo un error", err);
    }
});

app.get("/visitas", (req, res) => {
    res.send({ visitas: { items: visitasItem, item: visitasItemRandom } });
});