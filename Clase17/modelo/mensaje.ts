const { options } = require("../db/SQLite3");
const knex = require("knex")(options);

interface Mensaje{
    author: string;
    fecha: Date;
    text: string;
}

(async () => {
  try {
    const bd = await knex.schema.hasTable("mensajes")
    if (!bd) {
        await knex.schema.createTable("mensajes", (table:any) => {
            table.string("author").notNullable()
            table.number("fecha").notNullable()
            table.string("text").notNullable()
            table.increments("id", { primaryKey: true })
        })
        console.log("tabla creada");
    }
  } catch(error) {
    console.log (error);
  } finally {
    knex.destroy();
  }
})();

export default Mensaje;
