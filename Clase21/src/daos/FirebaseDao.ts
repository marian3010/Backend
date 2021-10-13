import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";

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

    async buscarProducto(id:any) {
        const collection = firestoreAdmin.collection("productos");
        try {
            const doc = collection.doc(`${id}`)
            const item = await doc.get()
            const response = item.data
            console.log("resultado query", response);
            return response;
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
                console.log(response);
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
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = true;
        const collection = firestoreAdmin.collection("productos");
        try {
            let doc = await collection.doc(id).delete();
            console.log("producto borrado", doc);
        }
        catch(error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        };
    };

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = true;
        const collection = firestoreAdmin.collection("productos");
        try {
            let doc = await collection.doc(id).update(producto);
            console.log("producto actualizado", doc);
        }
        catch (error) {
            console.log(error);
            resultado = false;
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

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let resultado = true;
        try {
            const collProds = firestoreAdmin.collection("productos");
            const collCart = firestoreAdmin.collection("carrito");
            const collCartProd = firestoreAdmin.collection("productosCarrito");
            console.log("Base de datos conectada");
            const doc = await collProds.doc(`${id}`)
            const item = await doc.get()
            const prodAgregarId = item.data.id
            if (!prodAgregarId){
                console.log("producto no encontrado")
                resultado = false;
                return resultado;
            }
            let carritoID = await collCart.get()
            if (!carritoID) {
                await collCart.doc().create({timestamp:Date.now()});
                carritoID = await collCart.get()
            }
            const producto = {
                idCarrito: carritoID,
                idProd: prodAgregarId
            }
            await collCartProd.doc().create(producto);
        }
        catch (error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        }
    };

    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        const collProds = firestoreAdmin.collection("productos");
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            
            const query = await collCartProd.get(id);
            query.docs.map ((doc:any) => {
                const newQuery = await collProds.get(doc.id)
            producto = await prodModel.default.find({_id:prodID})
            })
        }
        catch(error) {
             console.log(error);
        } 
            return producto;
        };
     
    
    async listarProdsCarrito() {
        let productosArray: Producto[] = []
        const collProds = firestoreAdmin.collection("productos");
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            const query = await collCartProd.get();
            query.docs.map ((doc:any) => {
                const newQuery = collProds.get(doc.id)
                newQuery.docs.map((docu:any)=> {
                    const data = docu.data();
                    const producto = {
                        id: docu.id,
                        code: data.code,
                        title: data.title,
                        description: data.description,
                        price: data.price,
                        thumbnail: data.thumbnail,
                        stock: data.stock,
                        timestamp: data.timestamp
                      };
                      productosArray.push(producto);
                })
            });
            return productosArray;
        }
        catch(error) {
             console.log(error);
        };
    }    
 
    async borrarProdsCarrito(id:any): Promise<boolean> {
        let resultado = true;
        const collCartProd = firestoreAdmin.collection("productosCarrito");
        try {
            let doc = await collCartProd.doc(id).delete();
            console.log("producto borrado", doc);
        }
        catch(error) {
            console.log(error);
            resultado = false;
        } finally {
            return resultado;
        };
    };


};

export default FirebaseDao;