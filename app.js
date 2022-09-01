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