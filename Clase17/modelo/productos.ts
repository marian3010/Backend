import options from '../db/mariaDB';
import knex from "knex";
const knexo = knex(options);


export interface Producto {
    id?: number;
    code: string;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    timestamp: number;
} 

interface AProductos {
    productos: Producto[];
}

class Productos {
    public constructor() {
        knexo.schema.hasTable("productos")
        .then(response => {
            if(!response) {
                knexo.schema.createTable("productos", (table:any) => {
                    table.increments("id",{primaryKey:true})
                    table.string("code");
                    table.string("title").notNullable();
                    table.string("description");
                    table.integer("price").notNullable();
                    table.string("thumbnail");
                    table.integer("stock");
                    table.integer("timestamp");
                })
                .then(() => console.log("tabla productos creada"))
                .catch((error) => {
                  console.log(error);
                })
            }
        });
    };
    
    public async agregarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, timestamp:number = Date.now()) {
        try {
            const producto: Producto = {
                code,
                title,
                description,
                price,
                thumbnail,
                stock,
                timestamp 
            }
            const response = await knexo("productos").insert(producto);
            console.log("Id del producto agregado", response)
            return producto;
        }
        catch (error) {
            console.log(error);
        }
    };

    public async buscarProducto(id:number) {
        try {
            const prodsArray: Producto[] | undefined = [];
            await knexo.from("productos")
            .select("*")
            .where("id", "=", id)
            .then((rows) => {
              for (const row of rows) {
                prodsArray.push({code:row["code"],title:row["title"],description:row["description"],price:row["price"],thumbnail:row["thumbnail"],stock:row["stock"],timestamp:row["timestamp"]});
                console.log("producto encontrado",prodsArray);
              }
              console.log("muestro producto antes de devolver",prodsArray)
              return prodsArray;
            })
        } 
        catch (error) {
            console.log(error);
        }
    };

    public async listarProductos() {
        try {
            const listaProductos: Producto[] = [];
            await knexo.from("productos")
            .select("*")
            .then((rows) => {
                console.log("rows",rows)
                for (const row of rows) {
                    listaProductos.push({code:row["code"],title:row["title"],description:row["description"],price:row["price"],thumbnail:row["thumbnail"],stock:row["stock"],timestamp:row["timestamp"],id:row["id"]});
                }
                console.log("respuesta del knex",listaProductos);
                return listaProductos;
            })
        }
        catch (error) {
            console.log(error);
        }
    };            

    public async borrarProducto(id:number) {
        try {
            const response = await knexo.from("productos")
            .where("id", "=", id)
            .del();
            console.log("respuesta del delete", response)
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    };

    public async actualizarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, id:number) {
        try {
            const response = await knexo.from("productos").where("id","=",id)
            .update("code", code)
            .update("title", title)
            .update("description", description)
            .update("price", price)
            .update("thumbnail", thumbnail)
            .update("stock", stock)
            .update("timestamp", Date.now())
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    };        
};

export default Productos;
