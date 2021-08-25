class Productos {
    constructor() {
        this.productos = [];
    }

    agregarProducto(title, price, thumbnail) {
        let nuevoId = 1;
        if (this.productos.length !== 0) {
            nuevoId = this.productos[this.productos.length - 1].id + 1;
        }
        const producto = { title: title, price: price, thumbnail: thumbnail, id: nuevoId };
        this.productos.push(producto);
        return this.productos[this.productos.length - 1];
    };

    buscarProducto(id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                return this.productos[i];
            };
        };
    };

    listarProductos() {
        return this.productos;
    };

    borrarProducto(id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id == id) {
                const prodBorrado = this.productos[i];
                this.productos.splice([i], 1);
                return prodBorrado;
            };
        };
    };

    actualizarProducto(title, price, thumbnail, id) {
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

const productos = new Productos();

export default productos;