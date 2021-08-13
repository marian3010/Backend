const http = require("http");

function numAleatorio(min, max) {
    let number;
    return number = Math.floor(min + Math.random() * (max - min + 1));
};

function generoObjeto() {
    return {
        id: `${numAleatorio(1,10)}`,
        title: "Producto" + `${numAleatorio(1,10)}`,
        price: `${numAleatorio(0,9999.99)}`,
        thumbnail: "Foto" + `${numAleatorio(1,10)}`
    }
};

const server = http.createServer((request, response) => {
    response.end(JSON.stringify(generoObjeto()));
});

const port = 6400;
server.listen(port, () => {
    console.log(`Servidor escuchando en ${port}`);
});