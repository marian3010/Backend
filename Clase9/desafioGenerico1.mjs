import express from "express";
const app = express();
const router = express.router();

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Puerto ${port} levantado!`)
});
server.on("error", (error) => {
    console.error(error);
});

const
    router.get("/personas", (req, res) => {
        res.send();
    })

router.get("/mascotas", (req, res) => {
    res.send();
})