# Aplicación de eCommerce para el curso de Backend

## Configuraciones
    MODE_ENV: process.env.MODE_ENV,
    PORT: process.env.PORT,
    EXP_TIME: process.env.EXP_TIME,
    PERSISTENCIA: process.env.PERSISTENCIA,
    MODO_CLUSTER: process.env.MODO_CLUSTER,
    TWILIO_ID: process.env.TWILIO_ID,
    TWILIO_PASS: process.env.TWILIO_PASS,
    TWILIO_SMS: process.env.TWILIO_SMS,
    TWILIO_WAPP: process.env.TWILIO_WAPP,
    GMAIL_PASS: process.env.GMAIL_PASS,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_CEL_SMS: process.env.ADMIN_CEL_SMS,
    ADMIN_CEL_WAPP: process.env.ADMIN_CEL_WAPP,
    MONGO_DBNAME: process.env.MONGO_DBNAME,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS

## Persistencias
#### En entorno de desarrollo, FileSystem
#### En entorno productivo, mongoAtlas
#### Funcionan todos los dao, salvo la ruta "carrito/comprar/:id_carrito" que solo está hecho en fileSystem y mongoAtlas

## Rutas para las pruebas
### Login
#### "ecommerce/registro" --> muestra formulario de registro, y una vez registrado queda logueado con botón para desloguear
#### "ecommerce/login" --> muestra formulario de login, y una vez logueado muestra los datos del user logueado con botón para desloguear
#### "ecommerce/logout" --> muestra saludo y luego el form para login.
#### "ecommerce/info" --> muestra los datos de proceso

### Productos
#### "productos/" --> muestra filtros (no funciona por el front, si funciona por postman con los filtros en el body), muestra lista de productos, y muestra y funciona el chat
#### "productos/guardar" --> muestra formulario para cargar un nuevo producto, devuelve producto cargado en formato json.
#### "productos/listar/:id?" --> devuelve la lista de productos en json
#### "productos/borrar/:id" --> devuelve producto borrado en formato json
#### "productos/actualizar/:id" --> recibe datos a modificar en el body en formato json, devuelve producto actualizado en formato json
#### "productos/graphql" --> tiene implementados los metodos para guardarProducto, getProducto por Id, y getProductos

### Carrito
#### "carrito/listar/:id?" --> devuelve lista de productos o producto por id en formato json
#### "carrito/agregar/:id_producto/:cant" --> agrega al carrito un producto por su id, y con la cantidad pasada por parámetro. Devuelve producto agregado en formato json.
#### "carrito/borrar/:id" --> elimina un producto del carrito, devuelve producto eliminado en formato json.
#### "carrito/comprar/:id" --> genera una orden para el user logueado, con los productos del carrito del id pasado como parámetro. Envía comunicaciones vía Twilio. Devuelve los productos comprados en formato json.

## Chat de Mensajes
#### Para la prueba del chat, entrar a la ruta "/productos/" 
