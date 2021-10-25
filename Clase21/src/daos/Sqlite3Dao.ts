import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/sqlite3';
import knex from "knex";
const knexSQLite3 = knex(options);

knexSQLite3.schema.hasTable("productos")
    .then(response => {
        console.log("respuesta al create table productos",response)
        if(!response) {
            knexSQLite3.schema.createTable("productos", (table:any) => {
                table.increments("id",{primaryKey:true})
                table.string("code");
                table.string("title").notNullable();
                table.string("description");
                table.integer("price").notNullable();
                table.string("thumbnail");
                table.integer("stock");
                table.integer("timestamp");
            })
        .then(() => console.log("tabla productos creada en SQLite"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexSQLite3.schema.hasTable("mensajes")
    .then(res => {
        console.log("respuesta al create table mensajes",res)
        if(!res) {
            knexSQLite3.schema.createTable("mensajes", (table:any) => {
                table.string("author");
                table.string("fecha");
                table.string("text");
            })
        .then(() => console.log("tabla mensajes creada en SQLite"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexSQLite3.schema.hasTable("carrito")
    .then(resp => {
        console.log("respuesta al create table carrito",resp)
        if(!resp) {
            knexSQLite3.schema.createTable("carrito", (table:any) => {
                table.increments("id",{primaryKey:true});
                table.integer("timestamp");
            })
        .then(() => console.log("tabla carrito creada en SQLite"))
        .catch((error) => {
            console.log(error);
            })
        }
    });
knexSQLite3.schema.hasTable("productosCarrito")
    .then(respo => {
        console.log("respuesta al create table productosCarrito",respo)
        if(!respo) {
            knexSQLite3.schema.createTable("productosCarrito", (table:any) => {
                table.increments("id",{primaryKey:true});
                table.integer('idCarrito').notNullable();
                table.integer('idProducto').notNullable();
                
            })
        .then(() => console.log("tabla productosCarrito creada en SQLite"))
        .catch((error) => {
            console.log(error);
            })
        }
    });

class Sqlite3Dao implements Operaciones {

    async agregarProducto(producto: Producto): Promise<boolean> {
        let resultado = true;
        try {
            console.log('agregar por SQLite3')
            const response = await knexSQLite3("productos").insert(producto);
            console.log("Id del producto agregado", response)
        }
        catch (error) {
            resultado = false;
            console.log(error);
        }
        return resultado;
    }

    async buscarProducto(id:any) {
        let productos = [];
        try {
            console.log('buscar por SQLite3')
            const prod = await knexSQLite3.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            console.log("productos encontrados", prod)
            productos.push(prod)
            return productos;
        }
        catch (error) {
            console.log(error);
        }
    }

    async listarProductos() {
        try {
            console.log("listar productos por SQLite3")
            const rows = await knexSQLite3.from("productos")
            .select("*")
            console.log("productos encontrados", rows)
            return rows;
        } 
        catch (error) {
            console.log(error)
        }
    }    
    
    async borrarProducto(id:any): Promise<boolean> {
        let resultado = true;
        try {
            const response = await knexSQLite3.from("productos")
            .where("id", "=", parseInt(id))
            .del();
            console.log("respuesta del delete", response)
        }
        catch (error){
            console.log(error);
            resultado = false;
        }
        return resultado;
    }

    async actualizarProducto(id:any, producto:Producto): Promise<boolean> {
        let resultado = false;
        try {
            const response = await knexSQLite3.from("productos").where("id","=",parseInt(id))
            .update(producto)
            resultado = true;
            console.log("producto actualizado", response)
        }
        catch (error) {
            console.log(error);
            resultado = false;
        }
        return resultado;
    }

    async leerMensajes() {
        try {
            const rows = await knexSQLite3.from("mensajes")
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
            await knexSQLite3("mensajes").insert(mensaje);
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
            const prodAgregar = await knexSQLite3("productos").select("id").where("id", "=", parseInt(id));
            if (prodAgregar.length == 0){
                console.log("producto no encontrado")
                response = false;
                return response;
            }
            //verifico si el producto ya existe en el carrito
            const prodCart = await knexSQLite3("productosCarrito").select("id").where("idProducto", "=", parseInt(id));
            if (prodCart.length > 0) {
                console.log("el producto ingresado ya existe en el carrito");
                response = false;
                return response;
            }
            // verifico si existe el carrito
            let carritoID = await knexSQLite3("carrito").select("id");
            // si no existe el carrito lo creo
            if (carritoID.length == 0) {
                carritoID = await knexSQLite3("carrito").insert({timestamp: Date.now()}).returning('id');
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
            await knexSQLite3("productosCarrito").insert(producto)
        } catch (error){
            console.log(error);
            response = false;
        }
        return response;
    };
    
    async buscarProdCarrito(id:any) {
        let producto: Producto[] = []
        try {
            const productoCart = await knexSQLite3("productosCarrito").select("id").where("idProducto", "=", parseInt(id))
            if (productoCart.length == 0) {
                console.log("el producto no está en el carrito")
                return producto;
            } 
            producto = await knexSQLite3("productos").select("*").where("id", "=", parseInt(id))
            console.log("id producto encontrado", producto)
            return producto;
        }
        catch (error) {
            console.log(error);
            return producto;
        }
    }; 
    
    async listarProdsCarrito() {
        let productosArray: Producto [] = [];
        try {
            console.log("listar productos carrito por SQLite")
            const rows = await knexSQLite3("productosCarrito").select("*")
            let productoInsert
            for (const row of rows) {
                let prods = await knexSQLite3("productos").select("*").where("id", "=", row.idProducto) 
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
                    productosArray.push(productoInsert);
                }
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
            await knexSQLite3.from("productosCarrito")
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
export default Sqlite3Dao;