const client = require('../modules/postgresDB')

const getAllProducts = async () => {
  const query = 'SELECT p.name AS brand, price, color, m.name AS Manufacturer, p.cif AS cif, addres AS Address FROM public.products p JOIN public.manufacturers m ON m.cif = p.cif;';
  return await client.query(query);
};

const filterProducts = async (brand, color, price, manufacturer) => {
  let query = `SELECT * FROM products WHERE name LIKE '%${brand ? brand.toUpperCase() : ''}%' AND color LIKE '%${color ?? ''}%' ${price ? `AND price < ${price} ` : ''} AND cif LIKE '%${manufacturer ?? ''}%'`;
  return await client.query(query);
};

module.exports = {
  getAllProducts,
  filterProducts
};