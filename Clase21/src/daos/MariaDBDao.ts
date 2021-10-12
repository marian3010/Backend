import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import { Mensaje } from "../../modelo/mensaje";
import options from '../../db/mariaDB';
import knex from "knex";
const knexMariaDB = knex(options);

class MariaDBDao implements Operaciones {

    constructor() {
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
        knexMariaDB.schema.hasTable("carrito_producto")
        .then(respo => {
            console.log("respuesta al create table carrito_producto",respo)
            if(!respo) {
                knexMariaDB.schema.createTable("carrito_producto", (table:any) => {
                    table.increments("id",{primaryKey:true});
                    table.integer("idProd");
                    table.integer("idCarrito");
                })
                .then(() => console.log("tabla carrito creada en mariaDB"))
                .catch((error) => {
                  console.log(error);
                })
            }
        });
    }

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
            const producto = await knexMariaDB.from("productos")
            .select("*")
            .where("id", "=", parseInt(id))
            console.log("productos encontrados", producto)
            return producto;
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
        let response = true;
        try {
            const response = await knexMariaDB.from("productos").where("id","=",parseInt(id))
            .update(producto)
            console.log("producto actualizado", response)
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
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
        
}
export default MariaDBDao;