const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mascotas = [];
const personas = [];
const mascotasRouter = express.Router();
app.use('/mascotas', mascotasRouter);
const personasRouter = express.Router();
app.use('/personas', personasRouter);
app.use('/public', express.static("public"));
mascotasRouter.get("/listar", (req, res) => {
    res.json(mascotas);
});
mascotasRouter.post("/guardar", (req, res) => {
    console.log(req.body)
    const mascota = req.body;
    mascotas.push(mascota);
    res.json(mascota);
});
personasRouter.get("/listar", (req, res) => {
    res.json(personas);
});
personasRouter.post("/guardar", (req, res) => {
    const persona = req.body;
    personas.push(persona);
    res.json(persona);
});
const server = app.listen(port, () =>
    console.log(`Server listen on port ${port}`)
);
server.on("error", (error) => console.error(error));