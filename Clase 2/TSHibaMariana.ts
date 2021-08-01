
function operacion(num1:number, num2:number, tipo:string) {
    return new Promise(async(resolve, rejected) => {
       try {
        if (tipo === "suma"){
            const claseSuma = (await import("./suma")).Suma;
            const suma = new claseSuma(num1, num2);
            const resultado = suma.getResultado();
            resolve (resultado);
        } else if (tipo === "resta") {
            const claseResta = (await import("./resta")).Resta;
            const resta = new claseResta(num1, num2);
            const resultado = resta.getResultado();
            resolve (resultado);
        } else throw new Error ("el tipo de operación no es válido");
       }
       catch(e){
        rejected(e.message); 
       }
    });
};

function operaciones() {
    operacion(10, 25, "pepe").then(x => console.log(x)).catch(x => console.log(x));
    operacion(20, 12, "resta").then(x => console.log(x)).catch(x => console.log(x)); 
    operacion(100, 32, "suma").then(x => console.log(x)).catch(x => console.log(x));   
};

operaciones();


