class Productos {
    constructor() {
        this.productos = [];
    }

    agregarProducto(title, price, thumbnail) {
        const producto = { title: title, price: price, thumbnail: thumbnail, id: this.productos.length + 1 };
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
};

const productos = new Productos();

export default productos;