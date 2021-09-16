import moment from "moment";
import fs from "fs";

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
        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        let nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        const producto = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock, id:nuevoId, fechaAlta:moment().format('DD/MM/YYYY, hh:mm:ss'), fechaActualizacion:moment().format('DD/MM/YYYY, hh:mm:ss') };
        this.productos.push(producto);
        fs.writeFile("./productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
            if (error) {
                "hubo un error en la escritura del archivo de productos"
                return
            };
        });
        return this.productos;
    };

    public buscarProducto(id:number) {
        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === id) {
                return this.productos[i];
            };
        };
    };

    public listarProductos(): Producto[] {
        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        return this.productos;
    };

    public borrarProducto(id:number) {
        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                const prodBorrado = this.productos[i];
                this.productos.splice(i, 1);
                fs.writeFile("./productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
                    if (error) {
                        "hubo un error en la escritura del archivo de productos"
                        return
                    };
                });
                return prodBorrado;
            };
        };
    };

    public actualizarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, id:number) {
        fs.readFile("./productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
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
                fs.writeFile("./productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
                    if (error) {
                        "hubo un error en la escritura del archivo de productos"
                        return
                    };
                });
                return prodActualizado;
            };
        };
    };
};

export default Productos;
