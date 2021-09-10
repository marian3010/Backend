class Producto {
    public id: number;
    public title: string;
    public price: number;
    public thumbnail: string;
  
    constructor(id: number, title: string, price: number, thumbnail: string) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.thumbnail = thumbnail;
    }
  }

class Productos {
    private productos: Array<Producto>;
  
    constructor() {
      this.productos = new Array<Producto>();
    }
  
    public agregarProducto(title: string, price:number, thumbnail:string) {
        let nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        const producto = { title: title, price: price, thumbnail: thumbnail, id: nuevoId };
        this.productos.push(producto);
        return this.productos[this.productos.length - 1];
    };

    public buscarProducto(id:number) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            };
        };
    };

    public listarProductos() {
        return this.productos;
    };

    public borrarProducto(id:number) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                const prodBorrado = this.productos[i];
                this.productos.splice([i], 1);
                return prodBorrado;
            };
        };
    };

    public actualizarProducto(title:string, price:number, thumbnail:string, id:number) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                this.productos[i].title = title;
                this.productos[i].price = price;
                this.productos[i].thumbnail = thumbnail;
                const prodActualizado = this.productos[i];
                return prodActualizado;
            };
        };
    };
};

export default Productos;
