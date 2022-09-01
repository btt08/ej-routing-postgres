const client = require('../modules/postgresDB')

const getAllProducts = async () => {
  const query = 'SELECT p.name AS brand, p.cif AS cif, price, color, m.name AS mName, addres FROM public.products p JOIN public.manufacturers m ON m.cif = p.cif;';
  return await client.query(query);
};

const filterProducts = async (brand, color, price, manufacturer) => {
  brand = brand ? brand.toUpperCase() : brand;
  let query = `SELECT * FROM products WHERE name LIKE '%${brand ?? ''}%' AND color LIKE '%${color ?? ''}%' ${price ? `AND price < ${price} ` : ''} AND cif LIKE '%${manufacturer ?? ''}%'`;
  return await client.query(query);

};

function formatResponse(res) {
  let formatedRes = null;
  if (Array.isArray(res)) {
    formatedRes = res.map(elem => (
      {
        ...elem._doc,
        manufacturer: {
          ...elem._doc.manufacturer._id._doc
        }
      }
    ));
  } else {
    formatedRes = [{
      ...res._doc,
      manufacturer: {
        ...res._doc.manufacturer._id._doc
      }
    }];
  }
  return formatedRes;
}

module.exports = {
  getAllProducts,
  filterProducts
};