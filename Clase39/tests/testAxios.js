"use strict";
var axios = require("axios").default;
/*
// listar productos
axios
  .get("http://localhost:8080/productos/listar")
  .then((response:any) => {
    console.log("GET todos");
    return console.log(response.data);
  })
  .catch((error:string) => console.error(error));


// listar producto por id
axios
  .get("http://localhost:8080/productos/listar/2")
  .then((response:any) => {
    console.log("GET id = 2");
    return console.log(response.data);
  })
  .catch((error:string) => console.error(error));

  
// guardar producto
axios
  .post("http://localhost:8080/productos/guardar", {
    code: "AX03",
    title: "prueba Axios",
    description: "descripción de la prueba Axios",
    price: 350,
    thumbnail: "www.pruebaAxios333.com",
    stock: 17
  })
  .then((response:any) => console.log("POST", response.data))
  .catch((error:string) => console.error(error));

*/
// modificar producto
/*
axios
    .put ("http://localhost:8080/productos/actualizar/3", {
        body: {
          code: "A101",
          title: "Pelota",
          description: "Pelota para uso escolar",
          price: 950,
          thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
          stock: 4,
          timestamp: 1641582201443,
          id: 3
        },
    })
    .then((response:any) => console.log("PUT", response.data))
    .catch((error:string) => console.error(error));
*/
axios({
    method: 'put',
    url: 'http://localhost:8080/productos/actualizar/3',
    data: {
        "code": "A101",
        "title": "Pelota",
        "description": "Pelota para uso escolar",
        "price": 950,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "stock": 4,
        "timestamp": 1641582201443,
        "id": 3
    }
});
/*
// Borrar Producto
axios
    .delete('http://localhost:8080/productos/borrar/5')
    .then((response:any) => console.log("DELETE", response.data))
    .catch((error:string) => console.error(error));
*/
