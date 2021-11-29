let min:number = 1;
let numRandom: number;
let cant: number;

function numAleatorio(min:number, max:number) {
    return numRandom = Math.floor(min + Math.random() * (max - min + 1));
};

process.on(
    'message',
    (cant:number) => { 
        console.log("max recibido del proceso padre", cant);
        let resultado:any = {};
        for (let i=1; i< cant; i++) {
            numAleatorio(min,cant);
            if (!resultado[numRandom]) {
                resultado[numRandom] = 1;
            } else {
                resultado[numRandom]++;
            }            
        }; 
        (<any> process).send(resultado);
    },
);






