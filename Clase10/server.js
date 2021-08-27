import express from "express";
import path from "path";
import productos from "./productos.js";
import handlebars from "express-handlebars";

const router = express.Router();
const __dirname = path.resolve();
const port = 8080;
const app = express();

const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`);
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use('/api', router);

const ENGINE_NAME = "hbs";
app.engine(ENGINE_NAME, handlebars({
    extname: ".hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    defaultLayout: "index.hbs",
}));
app.set("view engine", ENGINE_NAME);
app.set("views", path.join(__dirname, 'views'));

server.on("error", (error) => {
    console.error(error);
});

//listo todos los productos
router.get('/productos/listar', (req, res) => {
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

//busco el producto por id y lo muestro
router.get('/productos/listar/:id', (req, res) => {
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

//guardo un nuevo producto
router.post('/productos/guardar', (req, res) => {
    const producto = productos.agregarProducto(req.body.title, req.body.price, req.body.thumbnail);
    res.send(producto);
});

//busco un producto por id y lo borro
router.delete('/productos/borrar/:id', (req, res) => {
    try {
        const productoBorrado = productos.borrarProducto(req.params.id);
        if (productoBorrado) {
            res.send(productoBorrado);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    };
});

// busco un producto por id y lo actualizo
router.put('/productos/actualizar/:id', (req, res) => {
    try {
        const prodAct = productos.actualizarProducto(req.body.title, req.body.price, req.body.thumbnail, req.params.id);
        if (prodAct) {
            res.send(prodAct);
            return;
        } else {
            res.send({ error: 'producto no encontrado' });
        };
    } catch (err) {
        console.log("hubo un error", err);
    }
})

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

router.get('/productos/vista', (req, res) => {
    const listaProductos = productos.listarProductos();
    if (listaProductos.length == 0) {
        res.render("main.hbs", {
            listExists: false,
            error: true,
            mensaje: "No hay productos!"
        });
    } else {
        res.render("main.hbs", {
            listExists: true,
            error: false,
            listaProductos: listaProductos
        });
    }
});