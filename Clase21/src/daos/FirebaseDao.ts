import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import { database } from "firebase-admin";

const admin = require("firebase-admin");
const serviceAccount = require("../../data/ecommerce-43372-firebase-adminsdk-sakea-fd16d38086.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ecommerce-43372.firebaseio.com",
  });
console.log("Base de datos conectada");
const firestoreAdmin = admin.firestore();

class FirebaseDao implements Operaciones {
    
    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        const collection = firestoreAdmin.collection("productos");
        try {
            console.log("agregar por firebase");
            await collection.doc().create(producto);
        }
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        };
    };

    async buscarProducto(id:string) {
        let productosArray: Producto[] = []
        const collection = firestoreAdmin.collection("productos");
        try {
            const query = await collection.get();
            const response = query.docs.map((doc:any) => {
                const data = doc.data();
                if (doc.id == id) {
                    const producto = {
                        id: doc.id,
                        code: data.code,
                        title: data.title,
                        description: data.description,
                        price: data.price,
                        thumbnail: data.thumbnail,
                        stock: data.stock,
                        timestamp: data.timestamp
                      };
                      productosArray.push(producto);
                }
            });
            if (productosArray.length === 0) {
                console.log("no encontro el producto");
            }
            return productosArray;
        }
        catch(error) {
             console.log(error);
        };
    };

    async listarProductos() {
        let productosArray: Producto[] = []
        const collection = firestoreAdmin.collection("productos");
        try {
            const query = await collection.get();
            const response = query.docs.map((doc:any) => {
                const data = doc.data();
                const producto = {
                  id: doc.id,
                  code: data.code,
                  title: data.title,
                  description: data.description,
                  price: data.price,
                  thumbnail: data.thumbnail,
                  stock: data.stock,
                  timestamp: data.timestamp
                };
                productosArray.push(producto);
              });
            return productosArray;
        }
        catch(error) {
             console.log(error);
        };
    };   
    
    async borrarProducto(id:string): Promise<boolean> {
        let resultado = false;
        const collection = firestoreAdmin.collection("productos");
        try {
            //busco el producto para ver si existe
            const query = await collection.get();
            const response = query.docs.map((doc:any) => {
                const data = doc.data();
                if (doc.id === id) {
                    //si lo encuentra lo borra
                    collection.doc(id).delete();
                    resultado = true;
                    return resultado;
                }
            });
        }
        catch(error) {
            console.log(error);
        } finally {
            return resultado;
        };
    };

    async actualizarProducto(id:string, producto:Producto): Promise<boolean> {
        let resultado = false;
        const collection = firestoreAdmin.collection("productos");
        try {
            //busco el producto para ver si existe
            const query = await collection.get();
            const response = query.docs.map((doc:any) => {
                //const data = doc.data();
                if (doc.id === id) {
                    //si lo encuentra lo actualiza
                    collection.doc(id).update(producto);
                    resultado = true;
                }
            });
        }
        catch (error) {
            console.log(error);
        } finally {
            return resultado;
        };
    };

    async leerMensajes() {
        let mensajesArray: Mensaje[] = []
        const collection = firestoreAdmin.collection("mensajes");
        try {
            const query = await collection.get();
            const response = query.docs.map((doc:any) => {
                const data = doc.data();
                console.log(response);
                const mensaje = {
                  id: doc.id,
                  author: data.author,
                  fecha: data.fecha,
                  text: data.text
                };
                mensajesArray.push(mensaje);
              });
            return mensajesArray;
        }
        catch(error) {
             console.log(error);
        };
    };   

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let resultado = true;
        const collection = firestoreAdmin.collection("mensajes");
        try {
            console.log("agregar por firebase");
            await collection.doc().create(mensaje);
        }
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        };
    };

    async agregarProdsCarrito(id:string): Promise<boolean> {
        let resultado = false;
        try {
            const collProds = firestoreAdmin.collection("productos");
            const collCart = firestoreAdmin.collection("carrito");
            const collCartProd = firestoreAdmin.collection("productosCarrito");
            console.log("Base de datos conectada");
            //me fijo primero si el producto a agregar existe en colecci??n de productos
            const query = await collProds.get();
            let existe;
            const datosProductos = query.docs.map ((doc:any) => {
                const datos = doc.data();
                console.log("datos de producto", datos);
                console.log("id del producto", doc.id);
                if (doc.id == id) {
                    console.log ("el producto existe")
                    existe = true;
                }
            });
            if (existe) {
                // me fijo si existe el carrito
                let carritoID  
                const nuevaQuery = await collCart.get()
                nuevaQuery.docs.map ((docs:any) => {
                    carritoID = docs.id
                })
                let existeCart
                if (carritoID) {
                    console.log("existe el carrito", carritoID)
                    //me fijo si el producto a agregar ya existe en el carrito
                    const query = await collCartProd.get();
                    const datosCarrito = query.docs.map ((doc:any) => {
                        const datos = doc.data();
                        if (datos.idProd == id) {
                            console.log("el producto ya existe en el carrito")
                            existeCart = true;
                            return;
                        }
                    });
                } else {
                    await collCart.doc().create({timestamp:Date.now()});
                    const query = await collCart.get()
                    query.docs.map ((docs:any) => {
                        carritoID = docs.id
                    })
                }    
                if (!existeCart) {
                    const producto = {
                        idCarrito: carritoID,
                        idProd: id
                    }
                    const resp = await collCartProd.doc().create(producto);
                    console.log("respuesta de agregar prod en carrito", resp)
                    if (resp) {
                        resultado = true;
                    }    
                }
            }
        }    
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        }
    };

    async buscarProdCarrito(id:string) {
        let productosArray: Producto[] = []
        const collProds = firestoreAdmin.collection("productos");
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            // Traigo carrito con productos
            const query = await collCartProd.get();
            // extraigo del carrito los productos
            const datosProductos = query.docs.map ((doc:any) => {
                const datos = doc.data();
                return datos;
            });
            // Traigo productos
            const newQuery = await collProds.get();
            // Como la comparacion es via id, extraigo los id una unica vez
            const prodsIds = newQuery.docs.map((docu:any) => {
                const data = docu.data();
                return docu.id;
            })
            // Extraigo productos que coincidan con productos del carrito
            datosProductos.map((datos: any) => {
            //solo en el caso que coincida el id del producto con el id par??metro, devuelvo los datos del producto
                if (datos.idProd == id) {
                    const indexProdc = prodsIds.indexOf(datos.idProd);
                    if (indexProdc === -1) {
                        console.log('no existe')
                    } else {
                        const data = newQuery.docs[indexProdc].data();
                        const producto = {
                            id: data.id,
                            code: data.code,
                            title: data.title,
                            description: data.description,
                            price: data.price,
                            thumbnail: data.thumbnail,
                            stock: data.stock,
                            timestamp: data.timestamp
                        };
                        productosArray.push(producto);
                    };
                };    
            });
            return productosArray;
        }
        catch(error) {
             console.log(error);
             return productosArray;
        };
    };
     
    async listarProdsCarrito() {
        let productosArray: Producto[] = []
        const collProds = firestoreAdmin.collection("productos");
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            // Traigo carrito con productos
            const query = await collCartProd.get();
            // extraigo del carrito los productos
            const datosProductos = query.docs.map ((doc:any) => {
                const datos = doc.data();
                return datos;
            });
            // Traigo productos
            const newQuery = await collProds.get();
            // Como la comparacion es via id, extraigo los id una unica vez
            // para comparar todas las veces que necesite
            const prodsIds = newQuery.docs.map((docu:any) => {
                const data = docu.data();
                return docu.id;
            })
            // Extraigo productos que coincidan con productos del carrito
            datosProductos.map((datos: any) => {
                // por cada producto en carrito, busco si existe en mi array
                // de ids de productos, creados anteriormente
                // chequeo si hay coincidencia usando el indexOf para obtener el index.
                const indexProdc = prodsIds.indexOf(datos.idProd);
                if (indexProdc === -1) {
                    console.log('no existe')
                } else {
                    const data = newQuery.docs[indexProdc].data();
                    const producto = {
                        id: data.id,
                        code: data.code,
                        title: data.title,
                        description: data.description,
                        price: data.price,
                        thumbnail: data.thumbnail,
                        stock: data.stock,
                        timestamp: data.timestamp
                    };
                    productosArray.push(producto);
                };
            });
            return productosArray;
        }
        catch(error) {
             console.log(error);
             return productosArray;
        };
    };
 
    async borrarProdsCarrito(id:string): Promise<boolean> {
        let resultado = false;
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            const query = await collCartProd.get();
            const datosProductos = query.docs.map ((doc:any) => {
                const datos = doc.data();
                const idBorrar = doc.id
                if (datos.idProd === id) {
                    collCartProd.doc(idBorrar).delete();
                    resultado = true;
                    return;
                }
            });
        } catch(error) {
             console.log(error);
        };
        return resultado;
    };

};

export default FirebaseDao;