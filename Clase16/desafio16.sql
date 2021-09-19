CREATE DATABASE prueba;
CREATE TABLE prueba.items(nombre VARCHAR(80) NOT NULL, categoria VARCHAR(60) NOT NULL, stock INT, id INT PRIMARY KEY NOT NULL AUTO_INCREMENT);
INSERT INTO prueba.items(nombre,categoria,stock) VALUES('Fideos', 'Harina', 20);
INSERT INTO prueba.items(nombre,categoria,stock) VALUES('Leche', 'Lacteos', 30);
INSERT INTO prueba.items(nombre,categoria,stock) VALUES('Crema', 'Lacteos', 15);
SELECT * FROM prueba.items;
DELETE FROM prueba.items WHERE id = 1;
UPDATE prueba.items SET stock = 45 WHERE id = 2;
SELECT * FROM prueba.items;
