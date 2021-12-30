import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje, Mensajes } from "../../modelo/mensaje";
import { opcionCapa } from "../../server";
import {consoleLogger, errorLogger, warningLogger} from '../../logger.js'
const mongoose = require("mongoose");
const prodModel = require("../../model/prods");
const modelMensajes = require("../../model/messages.js");
const cartModel = require("../../model/cart");
const cartProdModel = require("../../model/cartProd");
const connectStrLocal =  "mongodb://localhost:27017/ecommerce"

async function connectMongoose(connect:string) {
    consoleLogger.info("conexión a mongoLocal");
    try {
        await mongoose.connect(connect)
        consoleLogger.info("Base de datos conectada");
    } catch(error) {
        errorLogger.error(error);
    }    
}

async function connectMongooseAtlas() {
    consoleLogger.info("conexión a mongoAtlas");
    try {
        const dbname = 'ecommerce'
        const password = '12345'
        const user = 'admin'
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
        consoleLogger.info("Base de datos conectada");
    } catch(error) {
        errorLogger.error(error);
    }    
}

class MongoDBDao implements Operaciones {
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('agregar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("agregar producto por mongoAtlas");
                await connectMongooseAtlas()
                
            }
            await prodModel.default.insertMany(producto);
        }
        catch (error) {
            errorLogger.error(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
                consoleLogger.info("Base de datos desconectada");
              });
              return resultado;
        }
    }

    async buscarProducto(id:string) {
        let producto: Producto[] = []
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('buscar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info('buscar producto por mongoAtlas')
                await connectMongooseAtlas()
            }
            producto = await prodModel.default.find({_id:id}, {_id:1, code:1, title:1, description:1, price:1, thumbnail:1, stock:1, timestamp:1})
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
            return producto;
        };
    }

    async listarProductos() {
        let productosArray: Producto[] = []
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('listar productos por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("listar productos por mongoAtlas");
                await connectMongooseAtlas()
            }
            productosArray = await prodModel.default.find();
            consoleLogger.info(`productos encontrados ${productosArray}`);
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
            return productosArray;
            
        };
    }    
    
    async borrarProducto(id:string): Promise<boolean> {
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('borrar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("borrar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
            const resp = await prodModel.default.deleteMany({_id: id})
            consoleLogger.info(`producto borrado  ${resp.deletedCount}`);
            if (resp.deletedCount == 1) {
                resultado = true;
            }
        }
        catch(error) {
            errorLogger.error(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
            consoleLogger.info("Base de datos desconectada");
            });
            return resultado;
        };
    }

    async actualizarProducto(id:string, producto:Producto): Promise<boolean> {
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('actualizar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("actualizar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
            const resp = await prodModel.default.findByIdAndUpdate(id,producto)
            consoleLogger.info(`producto actualizado ${resp}`)
            if (resp) {
                resultado = true;
            }
        }
        catch (error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
                consoleLogger.info("Base de datos desconectada");
            });
            return resultado;
        };
    };

    async leerMensajes() {
        let mensajesArray: Mensajes[] = []
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('listar mensajes por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("listar mensajes por mongoAtlas");
                await connectMongooseAtlas()
            }
            mensajesArray = await modelMensajes.default.find();
            return mensajesArray;
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
        };
    };  

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('listar mensajes por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("listar mensajes por mongoAtlas");
                await connectMongooseAtlas()
            }
            consoleLogger.info(`mensaje a insertar en Mongodb ${mensaje}`);
            await modelMensajes.default.insertMany(mensaje) 
        }
        catch(error) {
            errorLogger.error(error);
            resultado = false;
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
            return resultado;
        };
    };   

    async agregarProdsCarrito(id:string): Promise<boolean> {
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('agregar producto en carrito por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("agregar producto en carrito por mongoAtlas");
                await connectMongooseAtlas()
            }
            //me fijo si existe el producto a agregar
            const prodAgregar =  await prodModel.default.find({_id: id}, {_id:1})
            if (prodAgregar.length > 0){
                let carritoID = await cartModel.default.find({}, { _id:1 })
                if (carritoID.length == 0) {
                    consoleLogger.info("no encontró carrito, va a crear uno")
                    await cartModel.default.insertMany({timestamp: Date.now()});
                    carritoID = await cartModel.default.find({}, { _id:1 })
                } else {
                    //verifico si el producto ya está en el carrito
                    const prodExist = await cartProdModel.default.find({idProd:id});
                    if (prodExist.length>0) {
                        consoleLogger.info("el producto ya existe en el carrito");
                        
                    } else {
                        carritoID = JSON.parse(JSON.stringify(carritoID))
                        const producto = {
                            idCart: carritoID[0]._id,
                            idProd: id
                        }
                        const result = await cartProdModel.default.insertMany(producto);
                        if (result) {
                            resultado = true;
                        }
                    }
                }
            }
            
        }
        catch (error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
                consoleLogger.info("Base de datos desconectada");
              });
              return resultado;
        }
    };

    async buscarProdCarrito(id:string) {
        let producto:Producto[] = [] 
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('buscar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("buscar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
            const prodID = await cartProdModel.default.find({idProd: id}, {_id:1})
            if (prodID.length == 0) {
                consoleLogger.warn("el producto no está en el carrito");
            } else {
                producto = await prodModel.default.find({_id:id}, {_id:1, code:1, title:1, description:1, price:1, thumbnail:1, stock:1, timestamp:1})
                
            }
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
            return producto;
        };
    }; 
    
    async listarProdsCarrito() {
        let productosArray: Producto[] = []
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('listar productos por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("listar productos por mongoAtlas");
                await connectMongooseAtlas()
            }
            const rows = await cartProdModel.default.find({}, {idProd:1});
            for (const row of rows) {
                const regProd = await prodModel.default.find({_id:row.idProd})
                let producto = {
                    _id: regProd[0]._id,
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
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
              consoleLogger.info("Base de datos desconectada");
            });
            return productosArray;
        };
    }    
 
    async borrarProdsCarrito(id:string): Promise<boolean> {
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                consoleLogger.info('borrar producto del carrito por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                consoleLogger.info("borrar producto del carrito por mongoAtlas");
                await connectMongooseAtlas()
            }
            const resp = await cartProdModel.default.deleteMany({idProd: id})
            consoleLogger.info(`producto borrado ${resp.deletedCount}`);
            if (resp.deletedCount == 1) {
                resultado = true;
            }
        }
        catch(error) {
            errorLogger.error(error);
        } finally {
            mongoose.disconnect().then(() => {
            consoleLogger.info("Base de datos desconectada");
            });
            return resultado;
        };
    };
}

export default MongoDBDao;