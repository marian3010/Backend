import moment from "moment";

class Producto {
    public id: number;
    public fechaAlta: any;
    public fechaActualizacion: any;
    public code: string;
    public title: string;
    public description: string;
    public price: number;
    public thumbnail: string;
    public stock: number;
  
    constructor(id: number, fechaAlta: any, fechaActualizacion: any, code: string, title: string, description: string, price: number, thumbnail: string, stock:number) {
      this.id = id;
      this.fechaAlta = fechaAlta;
      this.fechaActualizacion = fechaActualizacion;
      this.code = code;
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.stock = stock;
    }
  }

class Productos {
    private productos: Producto[];
  
    constructor() {
      this.productos = new Array<Producto>();
    }
  
    public agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number) {
        let nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        const producto = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock, id:nuevoId, fechaAlta:moment().format('DD/MM/YYYY, hh:mm:ss'), fechaActualizacion:moment().format('DD/MM/YYYY, hh:mm:ss') };
        this.productos.push(producto);
        return this.productos[this.productos.length - 1];
    };

    public buscarProducto(id:number) {
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            };
        };
    };

    public listarProductos(): Producto[] {
        return this.productos;
    };

    public borrarProducto(id:number) {
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                const prodBorrado = this.productos[i];
                this.productos.splice(i, 1);
                return prodBorrado;
            };
        };
    };

    public actualizarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, id:number) {
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].code = code;
                this.productos[i].title = title;
                this.productos[i].description = description;
                this.productos[i].price = price;
                this.productos[i].thumbnail = thumbnail;
                this.productos[i].stock = stock;
                this.productos[i].fechaActualizacion = moment().format('DD/MM/YYYY, hh:mm:ss');
                const prodActualizado = this.productos[i];
                return prodActualizado;
            };
        };
    };
};

export default Productos;
