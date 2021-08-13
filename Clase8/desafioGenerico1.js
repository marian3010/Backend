// import express from 'express';
const express = require('express');
const app = express();

const port = 8080;
const frase = "Hola mundo como estan";
const url1 = "/api/getFrase";

const server = app.listen(port, () => {
    console.log(`Puerto ${port} levantado!`)
});

//frase completa
app.get(url1, (req, res) => {
    res.status(200).json(frase)
})

//obtenemos la primer letra
app.get("/api/getLetra/:num", (req, res) => {
    console.log("Letraaaa")
    const numLetra = req.params.num - 1;
    const obetenerLetra = frase[numLetra]
    res.status(200).json(obetenerLetra)
})

//obtenemos la primer palabra
app.get("/api/getPalabra/:num", (req, res) => {
    console.log("Palabraaaa")
    const numLetra = req.params.num - 1;
    const obetenerLetra = frase.split(" ")[numLetra]
    res.status(200).json(obetenerLetra)
})