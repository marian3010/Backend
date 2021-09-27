//import { options } from "../db/mariaDB";
const options = {
    client: "mysql",
    connection: {
        port: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "test",
    },
    pool: {
        min: 0,
        max: 10,
    }
};
import knex from "knex";
//const knex = require("knex")(options)

const knexo = knex(options);

class Productos {

    constructor() {
        this.ready = false;
        this.iniciarTabla();
    }

    async agregarProducto(title, price) {
        console.log(this.ready);
        if (!this.ready) {
            return;
        }
        //const producto: Producto = {code:code, title:title, description:description, price:price, thumbnail:thumbnail, stock:stock, timestamp: Date.now()};

        const producto = {
            title,
            price
        }

        const response = await knexo("productos").insert(producto);
        console.log("respuesta del insert", response)
        await knexo.destroy();
    };
    async iniciarTabla() {
        try {
            const bd = await knexo.schema.hasTable("productos")
            if (!bd) {
                await knexo.schema.createTable("productos", (table) => {
                    table.string("title").notNullable()
                    table.integer("price").notNullable()
                    table.increments("id", { primaryKey: true })
                })
                console.log("tabla creada");
                await knexo.destroy();
                this.ready = true;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const producto = new Productos();

await producto.agregarProducto("pelota", 120);
setTimeout(async function pepe() { await producto.agregarProducto("pelota", 120) }, 3000)