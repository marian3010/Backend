async function operacion(num1:number, num2:number, tipo:string){
    if (tipo == "suma"){
        const claseSuma = (await import("./suma")).Suma;
        let resultado = claseSuma.getResultado(num1, num2);
    } else {
        if (tipo =="resta") {
            const claseResta = (await import("./resta")).Resta;
            let resultado = claseResta.getResultado
        }
    }
};

function operaciones(valor1:number,valor2:number,operador:string) {
    return new Promise((resolve) => {
        setTimeout(() =>{
            resolve(operacion(valor1, valor2, operador));
            console.log("resultado", resultado);
        }, 2000);
    });
      
};


const valor1: number = 30;
const valor2: number = 10;
const operador:string = "suma";