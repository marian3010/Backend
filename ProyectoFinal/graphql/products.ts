const { buildSchema } = require("graphql");
import { consoleLogger } from "../logger.js";
import Productos from "../modelo/productos.js";
export const prods = new Productos();

interface IGuardarProducto {
  code: string;
  title: string;
  description: string,
  price: number,
  thumbnail: string,
  stock: number;
}

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
    return await prods.listarProductos(filtro, valorDesde, valorHasta)
  } catch(err) {
    console.log(err);
  }
 
};

export const guardarProducto = async ({code, title, description, price, thumbnail, stock}: IGuardarProducto) => {
  try {
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

