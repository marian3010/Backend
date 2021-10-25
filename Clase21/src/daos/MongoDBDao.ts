import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje, Mensajes } from "../../modelo/mensaje";
import { opcionCapa } from "../../server";
const mongoose = require("mongoose");
const prodModel = require("../../model/prods");
const modelMensajes = require("../../model/messages.js");
const cartModel = require("../../model/cart");
const cartProdModel = require("../../model/cartProd");
const connectStrLocal =  "mongodb://localhost:27017/ecommerce"

async function connectMongoose(connect:string) {
    console.log("conexión a mongoLocal");
    try {
        await mongoose.connect(connect)
        console.log("Base de datos conectada");
    } catch(error) {
        console.log(error)
    }    
}

async function connectMongooseAtlas() {
    console.log("conexión a mongoAtlas");
    try {
        const dbname = 'ecommerce'
        const password = '12345'
        const user = 'admin'
        await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.jbzno.mongodb.net/${dbname}?retryWrites=true&w=majority`)
        console.log("Base de datos conectada");
    } catch(error) {
        console.log(error)
    }    
}

class MongoDBDao implements Operaciones {
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('agregar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("agregar producto por mongoAtlas");
                await connectMongooseAtlas()
                
            }
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

    async buscarProducto(id:string) {
        let producto: Producto[] = []
        try {
            if (opcionCapa == 4) {
                console.log('buscar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log('buscar producto por mongoAtlas')
                await connectMongooseAtlas()
            }
            producto = await prodModel.default.find({_id:id}, {_id:1, code:1, title:1, price:1, stock:1})
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
                await connectMongoose(connectStrLocal);
            } else {
                console.log("listar productos por mongoAtlas");
                await connectMongooseAtlas()
            }
            productosArray = await prodModel.default.find();
            console.log("productos encontrados", productosArray);
        }
        catch(error) {
             console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
              console.log("Base de datos desconectada");
            });
            return productosArray;
            
        };
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('borrar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("borrar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
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
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                console.log('actualizar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("actualizar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
            await prodModel.default.findOneAndUpdate(id,producto)
            console.log("producto actualizado")
            resultado = true;
        }
        catch (error) {
            console.log(error);
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
                await connectMongoose(connectStrLocal);
            } else {
                console.log("listar mensajes por mongoAtlas");
                await connectMongooseAtlas()
            }
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
                await connectMongoose(connectStrLocal);
            } else {
                console.log("listar mensajes por mongoAtlas");
                await connectMongooseAtlas()
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

    async agregarProdsCarrito(id:string): Promise<boolean> {
        let resultado = true;
        try {
            if (opcionCapa == 4) {
                console.log('agregar producto en carrito por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("agregar producto en carrito por mongoAtlas");
                await connectMongooseAtlas()
            }
            const prodAgregar =  await prodModel.default.find({_id: id}, {_id:1})
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

    async buscarProdCarrito(id:string) {
        let producto: Producto[] = []
        try {
            if (opcionCapa == 4) {
                console.log('buscar producto por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("buscar producto por mongoAtlas");
                await connectMongooseAtlas()
            }
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
                await connectMongoose(connectStrLocal);
            } else {
                console.log("listar productos por mongoAtlas");
                await connectMongooseAtlas()
            }
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
 
    async borrarProdsCarrito(id:string): Promise<boolean> {
        let resultado = false;
        try {
            if (opcionCapa == 4) {
                console.log('borrar producto del carrito por mongoDB')
                await connectMongoose(connectStrLocal);
            } else {
                console.log("borrar producto del carrito por mongoAtlas");
                await connectMongooseAtlas()
            }
            await cartProdModel.default.deleteMany({idProd: id})
            resultado = true;
            console.log("producto borrado");
        }
        catch(error) {
            console.log(error);
        } finally {
            mongoose.disconnect().then(() => {
            console.log("Base de datos desconectada");
            });
            return resultado;
        };
    };
}

export default MongoDBDao;