import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { opcionCapa } from "../../server";
const mongoose = require("mongoose");
const prodModel = require("../../model/prods");


class MongoDBDao implements Operaciones {
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('agregar por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
                
            }
            console.log("Base de datos conectada");
            await prodModel.default.insertMany(producto);
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
            if (opcionCapa == 4) {
                console.log('agregar por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
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
            if (opcionCapa == 4) {
                console.log('agregar por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
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
            if (opcionCapa == 4) {
                console.log('agregar por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
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
            if (opcionCapa == 4) {
                console.log('agregar por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            await prodModel.default.findOneAndUpdate(id,producto)
            console.log("producto actualizado")
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