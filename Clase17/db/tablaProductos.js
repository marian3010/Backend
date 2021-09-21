const { options } = require("./db/mariaDB");
const knex = require("knex")(options);

knex.schema
    .createTable("productos", (table) => {
        table.increments("id");
        table.string("code");
        table.string("title");
        table.string("description");
        table.integer("price");
        table.string("thumbnail");
        table.integer("stock");
    })
    .then(() => console.log("table created"))
    .catch((error) => {
        console.log(error);
        throw error;
    })
    .finally(() => {
        knex.destroy();
    });