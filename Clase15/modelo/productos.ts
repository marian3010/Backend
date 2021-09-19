import fs from "fs";

interface Producto {
    id: number;
    timestamp: number;
    code: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
}  
    
class Productos {
    private productos: Producto[];
  
    public constructor() {
      this.productos = new Array<Producto>();
    }
  
    public agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number) {
        fs.readFile("./data/productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return;
            };
            this.productos = JSON.parse(contenido);
        });
        let nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
       
        const producto: Producto = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock, id:nuevoId, timestamp: Date.now()};
        this.productos.push(producto);
        fs.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
            if (error) {
                "hubo un error en la escritura del archivo de productos"
                return;
            };
        });
        return this.productos;
    };

    public buscarProducto(id:number) {
        fs.readFile("./data/productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            };
        };
        return this.productos = [];
    };

    public listarProductos(): Producto[] {
        fs.readFile("./data/productos.txt", "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.productos = JSON.parse(contenido);
        });
        return this.productos;
    };

    public borrarProducto(id:number) {
        fs.readFile("./data/productos.txt", "utf-8", (error, contenido) => {
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
                fs.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
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
        fs.readFile("./data/productos.txt", "utf-8", (error, contenido) => {
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
                this.productos[i].timestamp = Date.now();
                const prodActualizado = this.productos[i];
                fs.writeFile("./data/productos.txt", JSON.stringify(this.productos, null, "\t"), "utf-8", (error) => {
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
