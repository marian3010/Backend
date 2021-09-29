import options from '../db/sqlite3';
import knex from "knex";
const knexo = knex(options);

export interface Mensaje {
  id?: number;
  author: string;
  fecha: Date;
  text: string;
} 

export class Mensajes {
  constructor() {
      knexo.schema.hasTable("mensajes")
        .then(response => {
          if(!response) {
              knexo.schema.createTable("mensajes", (table:any) => {
              table.string("author")
              table.integer("fecha")
              table.string("text")
              table.increments("id")
            })
            .then(() => console.log("tabla mensajes creada"))
            .catch((error) => {
                console.log(error);
            })
          }
        })
    };

  public async leerMensajes() {
    try {
      const mensajesArray: Mensaje[] | undefined = [];
      const response = await knexo.from("mensajes").select("*");
      for (const row of response) {
        mensajesArray.push({author:row["author"],fecha:row["fecha"],text:row["text"]});
        
      }
      return mensajesArray;
    } catch (error) {
        console.log(error);
    } 
  };

  public async guardarMensajes(mensaje: Mensaje) {
      try {
        console.log("mensaje a guardar en tabla mensajes", mensaje);
        const response = await knex("mensajes").insert(mensaje);
        console.log(response);
        return response;
         
      } catch (error) {
          console.log(error);
      } 
  };
};


