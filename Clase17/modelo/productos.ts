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

interface Cart {
    id: number;
    timestamp: number;
    productos: Producto[];
}
    
interface AProductos {
    productos: Producto[];
}

class Productos {
    public archivo: AProductos | Cart
    public fileLocation: string;
  
    public constructor() {
      this.archivo = {
        productos: []
      };
      this.fileLocation = "./data/productos.txt"
    }
  
    public agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number) {
        fs.readFile(this.fileLocation, "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return;
            };
            this.archivo = JSON.parse(contenido);
        });
        let nuevoId = 1;
        if (this.archivo.productos.length !== 0) {
            nuevoId = this.archivo.productos[this.archivo.productos.length - 1].id + 1;
        }
        const producto: Producto = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock, id:nuevoId, timestamp: Date.now()};
        this.archivo.productos.push(producto);
        fs.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", (error) => {
            if (error) {
                "hubo un error en la escritura del archivo de productos"
                return;
            };
        });
        return this.archivo.productos;
    };

    public buscarProducto(id:number) {
        fs.readFile(this.fileLocation, "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.archivo = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                return this.archivo.productos[i];
            };
        };
        return this.archivo.productos = [];
    };

    public listarProductos(): Producto[] {
        fs.readFile(this.fileLocation, "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.archivo = JSON.parse(contenido);
        });
        return this.archivo.productos;
    };

    public borrarProducto(id:number) {
        fs.readFile(this.fileLocation, "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.archivo = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                const prodBorrado = this.archivo.productos[i];
                this.archivo.productos.splice(i, 1);
                fs.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", (error) => {
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
        fs.readFile(this.fileLocation, "utf-8", (error, contenido) => {
            if (error) {
                "hubo un error leyendo el archivo de productos"
                return
            };
            this.archivo = JSON.parse(contenido);
        });
        for (let i:number = 0; i < this.archivo.productos.length; i++) {
            if (this.archivo.productos[i].id == id) {
                this.archivo.productos[i].code = code;
                this.archivo.productos[i].title = title;
                this.archivo.productos[i].description = description;
                this.archivo.productos[i].price = price;
                this.archivo.productos[i].thumbnail = thumbnail;
                this.archivo.productos[i].stock = stock;
                this.archivo.productos[i].timestamp = Date.now();
                const prodActualizado = this.archivo.productos[i];
                fs.writeFile(this.fileLocation, JSON.stringify(this.archivo, null, "\t"), "utf-8", (error) => {
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
