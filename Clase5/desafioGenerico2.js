const productos = [
    { id: 1, nombre: 'Escuadra', precio: 323.45 },
    { id: 2, nombre: 'Calculadora', precio: 234.56 },
    { id: 3, nombre: 'Globo Terraqueo', precio: 45.67 },
    { id: 4, nombre: 'Paleta Pintura', precio: 456.78 },
    { id: 5, nombre: 'Reloj', precio: 67.89 },
    { id: 6, nombre: 'Agenda', precio: 78.90 }
]

function getNombres() {
    const newProductos = [];
    for (var i = 0; i < productos.length; i++) {
        newProductos.push(productos[i].nombre)
    }
    console.log(newProductos)
}

function precioTotal() {
    let precioTotal = 0;
    for (var i = 0; i < productos.length; i++) {
        precioTotal += productos[i].precio
    }
    console.log(precioTotal.toFixed(2))
        //Promedio
    console.log(precioTotal / productos.length)
}

function precioMenor() {
    let menorPrecio = productos[0].precio;
    for (var i = 1; i < productos.length; i++) {
        if (productos[i].precio < menorPrecio) {
            menorPrecio = productos[i].precio
        }
    }
    console.log(menorPrecio);
};

getNombres();​
precioTotal();
precioMenor();