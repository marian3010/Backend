"use strict";
var axios = require("axios").default;
// listar productos
axios
    .get("http://localhost:8080/productos/listar")
    .then(function (response) {
    console.log("GET todos");
    return console.log(response.data);
})
    .catch(function (error) { return console.error(error); });
// listar producto por id
axios
    .get("http://localhost:8080/productos/listar?id=1")
    .then(function (response) {
    console.log("GET id = 1");
    return console.log(response.data);
})
    .catch(function (error) { return console.error(error); });
// guardar producto
axios
    .post("http://localhost:8080/productos/guardar", {
    code: "AX01",
    title: "prueba Axios",
    description: "descripción de la prueba Axios",
    price: 500,
    thumbnail: "www.pruebaAxios.com",
    stock: 1
})
    .then(function (response) { return console.log("POST", response.data); })
    .catch(function (error) { return console.error(error); });
// modificar producto
axios
    .put("http://localhost:8080/productos/actualizar/:1", {
    params: {
        price: 950,
        stock: 4,
    },
})
    .then(function (response) { return console.log("PUT", response.data); })
    .catch(function (error) { return console.error(error); });
// Borrar Producto
axios
    .delete("http://localhost:8080/productos/borrar/:1")
    .then(function (response) { return console.log("DELETE", response.data); })
    .catch(function (error) { return console.error(error); });
