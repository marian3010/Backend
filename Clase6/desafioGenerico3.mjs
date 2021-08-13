import fs from "fs";

async function leerArch() {
    try {
        const info = JSON.parse(await fs.promises.readFile("./info.txt", "utf-8"));
        console.log(info);
        info.contenidoObj.author = "Coderhouse";

        fs.promises.writeFile(
            "./package.json.coder",
            JSON.stringify(info.contenidoObj, null, "\t")
        );

    } catch (err) {
        console.log("hubo un error", err)
    };

};

leerArch();