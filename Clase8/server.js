import express from "express";
import path from "path";
import productos from "./productos.js";


const __dirname = path.resolve();
const port = 8080;
const app = express();
const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

server.on("error", (error) => {
    console.error(error);
});


app.get('/api/productos/listar', (req, res) => {
    try {
        const listProductos = productos.listarProductos();
        if (listProductos.length === 0) {
            res.send({ error: 'no hay productos cargados' });
            return;
        }
        res.send(listProductos);
    } catch (err) {
        console.log("hubo un error", err);
    }
})

app.get('/api/productos/listar/:id', (req, res) => {
    try {
        const producto = productos.buscarProducto(req.params.id);
        if (producto) {
            res.send(producto);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        }
    } catch (err) {
        console.log("hubo un error", err);
    }
});

app.post('/api/productos/guardar', (req, res) => {
    const producto = productos.agregarProducto(req.body.title, req.body.price, req.body.thumbnail);
    res.send(producto);
});

app.get("/api", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});