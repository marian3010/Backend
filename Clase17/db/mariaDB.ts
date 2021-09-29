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

export default options;