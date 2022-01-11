const { buildSchema } = require("graphql");
import { consoleLogger } from "../logger.js";
import Productos from "../modelo/productos.js";
export const prods = new Productos();

// GraphQL Schema

export const schema = buildSchema(`
  type Query {
    producto(id:ID!): Producto,
    productos(filtro:String, valorDesde:String, valorHasta:String): [Producto],
  },
  type Mutation {
    guardarProducto(code: String!, title: String!, description: String!, price: Int!, thumbnail: String!, stock: Int!): Producto
  },
  type Producto {
    id: ID,
    code: String,
    title: String,
    description: String,
    price: Int,
    thumbnail: String,
    stock: Int
  }
`);

export const getProducto = async ({id}: any) => {
  try {
    const producto = await prods.buscarProducto(id);
    consoleLogger.info(`producto graphql ${JSON.stringify(producto)}`);
    const p = producto[0];
    delete p.timestamp;
    return p;
  } catch(err) {
    console.log(err);
  }
  return;   
  
};

export const getProductos = async (filtro:any, valorDesde:any, valorHasta:any) => {
  try {
    const productos = await prods.listarProductos(filtro, valorDesde, valorHasta)
    return productos;
  } catch(err) {
    console.log(err);
  }
  return;   
  
};

export const guardarProducto = async (code:string, title:string, description:string, price:number, thumbnail:string, stock:number) => {
  try {
      consoleLogger.info(`parametros para guardar el producto graphql ${code} ${title} ${price}`)
      const prod = await prods.agregarProducto(code, title, description, price, thumbnail, stock);
      consoleLogger.info(`producto guardado ${JSON.stringify(prod)}`)
      if (prod) {
          return prod;
      }  
  } catch(err) {
      console.log(err);
  }    
  return [];
};

export const root = {
  producto: getProducto,
  productos: getProductos,
  guardarProducto,
};

