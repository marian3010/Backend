import {Producto} from "./productos.js";

class Carrito {
  private static contador: number = 1;  
  public fileLocation: string;
  public productos: Array<Producto>;
  private id: number;
  private timestamp: number;
       
    public constructor(){
        this.productos = [];
        this.id = Carrito.contador;
        this.timestamp = Date.now();
        Carrito.contador ++;
        this.fileLocation = "./data/carritos.txt"
    };
};

export default Carrito;

