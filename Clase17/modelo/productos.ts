
const { options } = require("../db/mariaDB");
const knex = require("knex")(options);

export interface Producto {
    
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
    //public listaProductos: AProductos;
    public ready:boolean;
    public constructor() {
        //this.listaProductos = {
        //    productos: []
        //  };
        
        this.ready = false;
        this.iniciarTabla();
    }
    
    private async iniciarTabla() {
        try {
            const bd = await knex.schema.hasTable("productos");
            if (!bd) {
                await knex.schema.createTable("productos", (table:any) => {
                    table.increments("id",{primaryKey:true})
                    table.string("code");
                    table.string("title").notNullable();
                    table.string("description");
                    table.integer("price").notNullable();
                    table.string("thumbnail");
                    table.integer("stock");
                    table.integer("timestamp");
                })
                console.log("tabla creada");
                this.ready = true;
            };
        } 
        catch (error) {
            console.log(error);
        }
        finally {
           knex.destroy();
        }
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
            const response = await knex.from("productos").insert(producto);
            console.log("respuesta del insert", response)
            return response;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            knex.destroy();
        }
    };

    public async buscarProducto(id:number) {
        try {
            const response = await knex.from("productos").where("id", "=", id);
            console.log("respuesta del insert", response)
            return response;
        } 
        catch (error) {
            console.log(error);
        }
        finally {
            knex.destroy();
        }
    };

    public async listarProductos() {
        try {
           const response = await knex.from("productos").select("*");
           //let listaProductos = [];
           //for (const prod of response) {
           //     const producto: Producto[] = {
           //         {prod["code"]},
           //         {prod["title"]},
           //         {prod["description"]},
           //         {prod["price"]},
           //         {prod["thumbnail"]},
           //         {prod["stock"]},
           //         {prod["timestamp"]} 
           //     }
           //     listaProductos.push(producto);
           return response;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            knex.destroy();
        }    
    };            

    public async borrarProducto(id:number) {
        try {
            const response = await knex.from("productos").where("id", "=", id).del();
            console.log("respuesta del delete", response)
            return response;
        } 
        catch (error) {
            console.log(error);
        }
        finally {
            knex.destroy();
        }
    };

    public async actualizarProducto(code:string, title:string, description:string, price:number, thumbnail:string, stock:number, id:number) {
        try {
            const response = await knex.from("productos").where("id","=",id)
            .update("code", code)
            .update("title", title)
            .update("description", description)
            .update("price", price)
            .update("thumbnail", thumbnail)
            .update("stock", stock)
            .upadte("timestamp", Date.now())
            return response;
        } 
        catch (error) {
            console.log(error);
        }
        finally {
            knex.destroy();
        }
    };        
};

export default Productos;
