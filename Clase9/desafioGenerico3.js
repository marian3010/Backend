const express = require("express");
const app = express();
const multer = require('multer')
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        const nuevoNombre = Date.now() + '-' + file.originalname;
        cb(null, nuevoNombre);
    }
})
const upload = multer({ storage: storage })
app.post('/uploadfile', upload.single('myFile1'), (req, res) => {
    const file = req.file;
    res.send(file);
})
const server = app.listen(port, () =>
    console.log(`Server listen on port ${port}`)
);
server.on("error", (error) => console.error(error));