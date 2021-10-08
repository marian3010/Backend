import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import productosRouter from "../../routes/products";
import { database } from "firebase-admin";

const admin = require("firebase-admin");
const serviceAccount = require("../../data/ecommerce-43372-firebase-adminsdk-sakea-fd16d38086.json");

class FirebaseDao implements Operaciones {
    constructor () {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://ecommerce-43372.firebaseio.com",
          });
          console.log("Base de datos conectada");
    };

    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        const firestoreAdmin = admin.firestore();
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
        const firestoreAdmin = admin.firestore();
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
        const firestoreAdmin = admin.firestore();
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
        const firestoreAdmin = admin.firestore();
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
        const firestoreAdmin = admin.firestore();
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
};

export default FirebaseDao;