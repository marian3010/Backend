import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/mariaDB';
import knex from "knex";
const knexMariaDB = knex(options);

knexMariaDB.schema.hasTable("productos")
    .then(response => {
        console.log("respuesta al create table productos",response)
        if(!response) {
            knexMariaDB.schema.createTable("productos", (table:any) => {
                table.increments("id",{primaryKey:true})
                table.string("code");
                table.string("title").notNullable();
                table.string("description");
                table.integer("price").notNullable();
                table.string("thumbnail");
                table.integer("stock");
                table.integer("timestamp");
            })
        .then(() => console.log("tabla productos creada en mariaDB"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexMariaDB.schema.hasTable("mensajes")
    .then(res => {
        console.log("respuesta al create table mensajes",res)
        if(!res) {
            knexMariaDB.schema.createTable("mensajes", (table:any) => {
                table.string("author");
                table.string("fecha");
                table.string("text");
            })
        .then(() => console.log("tabla mensajes creada en mariaDB"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexMariaDB.schema.hasTable("carrito")
    .then(resp => {
        console.log("respuesta al create table carrito",resp)
        if(!resp) {
            knexMariaDB.schema.createTable("carrito", (table:any) => {
                table.increments("id",{primaryKey:true});
                table.integer("timestamp");
            })
        .then(() => console.log("tabla carrito creada en mariaDB"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexMariaDB.schema.hasTable("productosCarrito")
    .then(respo => {
        console.log("respuesta al create table productosCarrito",respo)
        if(!respo) {
            knexMariaDB.schema.createTable("productosCarrito", (table:any) => {
                table.increments("id",{primaryKey:true});
                table.integer('idCarrito').notNullable();
                table.integer('idProducto').notNullable();
                
            })
        .then(() => console.log("tabla productosCarrito creada en mariaDB"))
        .catch((error) => {
            console.log(error);
            })
        }
    });

class MariaDBDao implements Operaciones {

    async agregarProducto(producto: Producto): Promise<boolean> {
        let response = true;
        try {
            console.log('agregar por mariaDB')
            await knexMariaDB("productos").insert(producto);
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
    }

    async buscarProducto(id:any) {
        try {
            console.log('buscar por mariaDB')
            const prod = await knexMariaDB.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            console.log("productos encontrados", prod)
            return prod;
        }
        catch (error) {
            console.log(error);
        }
    }

    async listarProductos() {
        try {
            console.log("listar productos por mariaDB")
            const rows = await knexMariaDB.from("productos")
            .select("*")
            console.log("productos encontrados", rows)
            return rows;
        } 
        catch (error) {
            console.log(error)
        }
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let response = true;
        try {
            await knexMariaDB.from("productos")
            .where("id", "=", parseInt(id))
            .del();
        }
        catch (error){
            console.log(error);
            response = false;
        }
        return response;
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = false;
        try {
            const response = await knexMariaDB.from("productos").where("id","=",parseInt(id))
            .update(producto)
            console.log("producto actualizado", response)
            resultado = true;
        }
        catch (error) {
            console.log(error);
        }
        return resultado;
    }

    async leerMensajes() {
        try {
            const rows = await knexMariaDB.from("mensajes")
            .select("*")
            console.log("mensajes encontrados", rows)
            return rows;
        }
        catch(error) {
             console.log(error);
        } 
    };   

    async guardarMensajes(mensaje: Mensaje): Promise<boolean> {
        let response = true;
        try {
            console.log('agregar mensaje por mariaDB')
            await knexMariaDB("mensajes").insert(mensaje);
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
    };

    async agregarProdsCarrito(id:any): Promise<boolean> {
        let response = true;
        try {
            //verifico si el producto existe
            const prodAgregar = await knexMariaDB("productos").select("id").where("id", "=", parseInt(id));
            if (prodAgregar.length == 0){
                console.log("producto no encontrado")
                response = false;
                return response;
            }
            //verifico si el producto ya existe en el carrito
            const prodCart = await knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id));
            if (prodCart.length > 0) {
                console.log("el producto ingresado ya existe en el carrito");
                response = false;
                return response;
            }
            // verifico si existe el carrito
            let carritoID = await knexMariaDB("carrito").select("id");
            // si no existe el carrito lo creo
            if (carritoID.length == 0) {
                carritoID = await knexMariaDB("carrito").insert({timestamp: Date.now()}).returning('id');
            } else {
                let prods=JSON.parse(JSON.stringify(carritoID))
                console.log("carritoID cuando existe el carrito",carritoID)
                for (const prod of prods) {
                    carritoID = prod.id
                }
            }
            const producto = {
                idCarrito: carritoID,
                idProducto: id
            }
            await knexMariaDB("productosCarrito").insert(producto)
        } catch (error){
            console.log(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        try {
            const productoCart = await knexMariaDB("productosCarrito").select("id").where("idProducto", "=", parseInt(id))
            if (productoCart.length == 0) {
                console.log("el producto no está en el carrito")
                return producto;
            } 
            producto = await knexMariaDB("productos").select("*").where("id", "=", parseInt(id))
            console.log("id producto encontrado", producto)
            return producto;
        }
        catch (error) {
            console.log(error);
            return producto;
        }
    }; 
    
    async listarProdsCarrito() {
        let productosArray = [];
        try {
            console.log("listar productos carrito por mariaDB")
            const rows = await knexMariaDB("productosCarrito").select("*")
            let results=JSON.parse(JSON.stringify(rows))
            let productoInsert
            for (const row of results) {
                let prods = await knexMariaDB("productos").select("*").where("id", "=", row.idProducto) 
                prods=JSON.parse(JSON.stringify(prods))
                for (const prod of prods ) {
                    productoInsert = {
                        id: prod.id,
                        code: prod.code,
                        title: prod.title,
                        description: prod.description,
                        price: prod.price,
                        thumbnail: prod.thumbnail,
                        stock: prod.stock,
                        timestamp: prod.timestamp
                    }
                }
                productosArray.push(productoInsert);
            }
        } 
        catch (error) {
            console.log(error)
        }
        return productosArray;
    };

    async borrarProdsCarrito(id:any): Promise<boolean> {
        let response = false;
        try {
            await knexMariaDB.from("productosCarrito")
            .where("idProducto", "=", parseInt(id))
            .del();
            response = true;
        }
        catch (error){
            console.log(error);
        }
        return response;
    };
        
}
export default MariaDBDao;