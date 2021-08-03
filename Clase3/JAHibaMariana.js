function muestroPalabras(texto, callback, demora = 1000) {
    const palabras = texto.split(" ");
    let indice = 0;
    const intervalId = setInterval(() => {
        console.log(palabras[indice]);
        if (indice === palabras.length - 1) {
            clearInterval(intervalId);
            callback(palabras.length);
            return;
        }
        indice++;
    }, demora)
}

muestroPalabras("Aquí me pongo a cantar", (palabras) => {
    let cantPalabras = palabras;
    muestroPalabras("al compás de la biguela", (palabras) => {
        cantPalabras = cantPalabras + palabras;
        muestroPalabras("y se va la última frase de este ejercicio", (palabras) => {
            cantPalabras = cantPalabras + palabras;
            console.log("Cantidad total de palabras", cantPalabras)
        });

    }, 800);
}, 300);