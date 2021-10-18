import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje, Mensajes } from "../../modelo/mensaje";
import { opcionCapa } from "../../server";
const mongoose = require("mongoose");
const prodModel = require("../../model/prods");
const modelMensajes = require("../../model/messages.js");
const cartModel = require("../../model/cart");
const cartProdModel = require("../../model/cartProd");


class MongoDBDao implements Operaciones {
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('agregar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar producto por mongoAtlas");
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
                console.log('buscar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("buscar producto por mongoAtlas");
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
                console.log('listar productos por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("listar productos por mongoAtlas");
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
                console.log('borrar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("borrar producto por mongoAtlas");
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
                console.log('actualizar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("actualizar producto por mongoAtlas");
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
        };
    };

    async leerMensajes() {
        let mensajesArray: Mensajes[] = []
        try {
            if (opcionCapa == 4) {
                console.log('listar mensajes por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("listar mensajes por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            mensajesArray = await modelMensajes.default.find();
            return mensajesArray;
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
        };
    };  

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('listar mensajes por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("listar mensajes por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("mensaje a insertar en Mongodb", mensaje);
            await modelMensajes.default.insertMany(mensaje) 
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
    };   

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('agregar producto en carrito por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("agregar producto en carrito por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            const prodAgregar =  await prodModel.default.find({_id: id}, {_id:1})
            console.log("producto a agregar",prodAgregar)
            if (!prodAgregar){
                console.log("producto no encontrado")
                resultado = false;
                return resultado;
            }
            let carritoID = await cartModel.default.find({}, { _id:1 })
                       
            if (carritoID.length == 0) {
                console.log("no encontró carrito, va a crear uno")
                await cartModel.default.insertMany({timestamp: Date.now()});
                carritoID = await cartModel.default.find({}, { _id:1 })
            } else {
                const prodExist = await cartProdModel.default.find({idProd:id});
                console.log("prodexist", prodExist);
                console.log("long de prodexist", prodExist.length);
                if (prodExist.length>0) {
                    console.log ("el producto ya existe en el carrito");
                    resultado = false;
                    return resultado;
                }
            }
            carritoID = JSON.parse(JSON.stringify(carritoID))
            const producto = {
                idCart: carritoID[0]._id,
                idProd: id
            }
            await cartProdModel.default.insertMany(producto);
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
    };

    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        try {
            if (opcionCapa == 4) {
                console.log('buscar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("buscar producto por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            const prodID = await cartProdModel.default.find({idProd: id}, {_id:1})
            if (prodID.length == 0) {
                console.log("el producto no está en el carrito");
                return producto;
            }
            producto = await prodModel.default.find({_id:id}, {_id:1, code:1, title:1, price:1, thumbnail:1})
            console.log("producto encontrado", producto);
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
            return producto;
        };
    }; 
    
    async listarProdsCarrito() {
        let productosArray: Producto[] = []
        try {
            if (opcionCapa == 4) {
                console.log('listar productos por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("listar productos por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            const rows = await cartProdModel.default.find({}, {idProd:1});
            for (const row of rows) {
                const regProd = await prodModel.default.find({_id:row.idProd})
                let producto = {
                    code: regProd[0].code,
                    title: regProd[0].title,
                    description: regProd[0].description,
                    price: regProd[0].price,
                    thumbnail: regProd[0].thumbnail,
                    stock: regProd[0].stock,
                    timestamp: regProd[0].timestamp
                }
                productosArray.push(producto);
            }
            return productosArray;
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
        };
    }    
 
    async borrarProdsCarrito(id:any): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('borrar producto por mongoDB')
                await mongoose.connect("mongodb://localhost:27017/ecommerce")
            } else {
                console.log("borrar producto por mongoAtlas");
                const dbname = 'ecommerce'
                const password = '12345'
                const user = 'admin'
                await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
            }
            console.log("Base de datos conectada");
            await cartProdModel.default.deleteMany({idProd: id})
            console.log("producto borrado");
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
    };
}

export default MongoDBDao;