import {Operaciones} from "../interfaces/Operaciones";
import { Producto } from "../../modelo/productos";
import options from '../../db/mariaDB';
import knex from "knex";
const knexMariaDB = knex(options);

class MariaDBDao implements Operaciones {

    constructor() {
        knexMariaDB.schema.hasTable("productos")
        .then(response => {
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
           /* .update("title", title)
            .update("description", description)
            .update("price", price)
            .update("thumbnail", thumbnail)
            .update("stock", stock)
            .update("timestamp", Date.now())*/
            console.log("producto actualizado", response)
        }
        catch (error) {
            console.log(error);
            response = false;
        }
        return response;
    }
}

export default MariaDBDao;