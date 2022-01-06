const { buildSchema } = require("graphql");
import Productos from "../modelo/productos.js";
export const prods = new Productos();

// GraphQL Schema

export const schema = buildSchema(`
  type Query {
    producto(id): Producto,
    productos: [Producto],
  },
  type Mutation {
    guardarProducto(code: String!, title: String!, description: String!, price: Number!, thumbnail: String!, stock: Number!): Boolean
  },
  type Producto {
    code: string,
    title: string,
    description: string,
    price: number,
    thumbnail: string,
    stock: number,
    timestamp: number
  }
`);

/*export const getProducto = async (id: any) => {
    const producto = await prods.buscarProducto(id)
    return producto;
};

export const getProductos = async (filtro: any, valorDesde: any, valorHasta: any) => {
    const productos = await prods.listarProductos(filtro, valorDesde, valorHasta)
    return productos;
};*/

export const guardarProducto = async ( code: string, title: string, description: string, price: number, thumbnail: string, stock: number) => {
    try {
        const prod = await prods.agregarProducto(code, title, description, price, thumbnail, stock);
        if (prod) {
            return true;
        }  
    } catch(err) {
        console.log(err);
    }    
    return false;
};

export const root = {
  
  guardarProducto,
};

