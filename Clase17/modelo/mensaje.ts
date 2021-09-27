const options = {
  client: "sqlite3",
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
const knexo = knex(options);


interface Mensaje {
    author: string;
    fecha: Date;
    text: string;
}

(async () => {
  try {
    const bd = await knexo.schema.hasTable("mensajes")
    if (!bd) {
        await knexo.schema.createTable("mensajes", (table:any) => {
            table.string("author").notNullable()
            table.number("fecha").notNullable()
            table.string("text").notNullable()
            table.increments("id", { primaryKey: true })
        })
        console.log("tabla creada");
    } else {
      const mensajes = await knexo.from("mensajes").select("*");
    }
  } catch(error) {
    console.log (error);
  } finally {
    knexo.destroy();
  }
})();

export default Mensaje;
