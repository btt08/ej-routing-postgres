/*
ENUNCIADO PRÁCTICA POSTGRESQL
  Debemos replicar el funcionamiento de nuestra aplicación "concesionario" sustituyendo la base de datos MongoDB por Postgresql.
  Deberemos adaptar nuestro servidor de Node a la nueva base de datos (editar servicios, editar conexión, editar script para crear tabla, borrar esquemas de mongo y cualquier funcionalidad perteneciente a esto)
  Os proporcionamos el script para crear nuestras tablas *IMPORTANTE: debemos crear primero nuestra base de datos llamada concesionario a través de pgAdmin)
  Por lo tanto: Siempre que queramos resetear nuestra BBDD deberemos borrar las tablas pero nunca la BBDD, si no, no funcionará.
*/

const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/productsRouter')
const bp = require('body-parser');

const config = require('./modules/config');
const hostName = config.HOST;
const port = config.PORT;

const app = express();

app.use(cors());

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/products', productsRouter);

app.listen(port, hostName, () => {
  console.log(`Servidor lanzado en http://${hostName}:${port}`)
});