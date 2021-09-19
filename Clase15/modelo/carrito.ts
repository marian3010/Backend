import Productos from "./productos.js";

class Carrito extends Productos{
    public id: number;
    public fecha: any;
       
    constructor(id:number, fecha:any){
        super();
        this.id = id;
        this.fecha = fecha;
    };
  };

export default Carrito;
