// import express from 'express';
const express = require('express');
const app = express();

const port = 8080;
let frase = "Hola mundo como estan";
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

//sumar params
app.get("/api/sumar/:num1/:num2", (req, res) => {
    const numero1 = Number(req.params.num1)
    const numero2 = Number(req.params.num2)
    const suma = numero1 + numero2;

    res.status(200).json(suma);
})

//sumar querys
app.get("/api/sumar", (req, res) => {
    const numero1 = Number(req.query.num1)
    const numero2 = Number(req.query.num2)
    const suma = numero1 + numero2;

    res.status(200).json(suma);
})

//put 
app.put("/api", (req, res) => {
    const palabra = req.query.Nuevapalabra
    frase = frase + " " + palabra
    res.status(200).json(frase);
})

//delete
app.delete("/api", (req, res) => {
    const arrayPalabras = frase.split(" ");
    arrayPalabras.pop()
    frase = arrayPalabras.join(" ")
    res.status(200).json(frase);
})