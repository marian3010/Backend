import Productos from "./productos.js";

class Carrito extends Productos{
  private static contador: number = 1;  
  public fileLocation: string;
       
    public constructor(){
        super();
        this.archivo = {
          productos: [],
          id: Carrito.contador,
          timestamp: Date.now()
        };
        Carrito.contador ++;
        this.fileLocation = "./data/carritos.txt"
    };
};

export default Carrito;

