import Productos from "./productos.js";

class Carrito extends Productos{
  private static contador: number = 1;  
  private id: number;
  private timestamp: number;
       
    public constructor(){
        super();
        this.id = Carrito.contador;
        Carrito.contador ++;
        this.timestamp = Date.now();
    };
    public getId() {
      return this.id;
    }
  
    public getTimestamp() {
      return this.timestamp;
    }
  };

export default Carrito;

  

const carrito1: Carrito = new Carrito();
console.log(`Carrito 1 ID: ${carrito1.getId()}`);
console.log(`Carrito 1 Timestamp: ${carrito1.getTimestamp()}`);
console.log(`Carrito 1 Timestamp: ${carrito1.getTimestamp()}`);
console.log(`Carrito 1 Timestamp: ${carrito1.getTimestamp()}`);

const carrito2: Carrito = new Carrito();
console.log(`Carrito 2 ID: ${carrito2.getId()}`);
console.log(`Carrito 2 Timestamp: ${carrito2.getTimestamp()}`);
