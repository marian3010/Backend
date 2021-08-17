import express from "express";
const port = 8080;
const app = express();

const server = app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`);
});

server.on("error", (error) => {
    console.error(error);
});

app.get('/', (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>");
})

let visitas = 0;
app.get("/visitas", (_, response) => {
    visitas = visitas + 1;
    response.send(`La cantidad de visitas es ${visitas}`);
});

app.get("/fyh", (_, response) => {
    response.json({
        fyh: new Date().toLocaleString("es-AR", "DD-M-YYYY HH:MM:SS"),
    });
});