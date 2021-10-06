import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
const mongoose = require("mongoose");
const prodModel = require("../../model/prods");


class MongoDBDao implements Operaciones {
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            console.log('agregar por mongoDB')
            await mongoose.connect("mongodb://localhost:27017/ecommerce")
            console.log("Base de datos conectada");
            //let numId = await prodModel.default.find({},{_id:1}).sort({_id:-1}).limit(1)
            //numId ++
            await prodModel.default.insert(producto);
        }
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
                console.log("Base de datos desconectada");
              });
              return resultado;
        }
    }

    async buscarProducto(id:any) {
        let producto: Producto[] = []
        try {
          await mongoose.connect("mongodb://localhost:27017/ecommerce")
          console.log("Base de datos conectada");
          producto = await prodModel.default.find({_id: id}, {_id:1, code:1,title:1,price:1,stock:1 })
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
            return producto;
        };
    }

    async listarProductos() {
        let productosArray: Producto[] = []
        try {
          await mongoose.connect("mongodb://localhost:27017/ecommerce")
          console.log("Base de datos conectada");
          productosArray = await prodModel.default.find();
          return productosArray;
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
            //return productosArray;
        };
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = true;
        try {
            await mongoose.connect("mongodb://localhost:27017/ecommerce")
            console.log("Base de datos conectada");
            await prodModel.default.deleteMany({_id: id})
        }
        catch(error) {
            console.log(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
            console.log("Base de datos desconectada");
            });
            return resultado;
        };
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = true;
        try {
            await prodModel.default.findByIdAndUpdate(id,producto, ()=>{console.log("algo")} )
            //await prodModel.default.findOneAndReplace({ _id: id }, producto, ()=>{console.log("error")})
        }
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
                console.log("Base de datos desconectada");
            });
            return resultado;
        }
    }
}

export default MongoDBDao;