import fs from 'fs';

const fecha = new Date().toLocaleString("es-AR")

try {
    fs.writeFileSync('./fyh.txt', fecha);
    console.log(fs.readFileSync('./fyh.txt', "utf-8"));
} catch (error) {
    console.log("hubo un error")
}