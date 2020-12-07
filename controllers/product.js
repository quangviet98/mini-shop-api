const sql = require("mssql");

exports.get_all_products = (req, res) => {
  let request = new sql.Request();
  request.query("select * from Products", function (err, recordset) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    res.status(200).json({ data: recordset.recordset });
  });
};

exports.get_one_product = (req, res) => {
  const id = req.params.id;
  let request = new sql.Request();
  request.query(
    `SELECT * from Products WHERE Id = ${id}`,
    function (err, recordset) {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      res.status(200).json({ data: recordset.recordset });
    }
  );
};

exports.post_insert = (req, res) => {
  //console.log(req.body);
  const {
    Name,
    CategoryId,
    Price,
    ImageUrl,
    Discount,
    Description,
    Quantity,
  } = req.body;

  let request = new sql.Request();
  request
    .input("CategoryId", sql.Int, CategoryId)
    .input("Name", sql.NVarChar(128), Name)
    .input("Description", sql.NVarChar(sql.MAX), Description)
    .input("Price", sql.Int, Price)
    .input("Quantity", sql.Int, Quantity)
    .input("ImageUrl", sql.NVarChar(128), ImageUrl)
    .input("Discount", sql.Float, Discount)
    .execute("AddProduct")
    .then((response) => {
      res.status(201).json({ message: "create success", response });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.patch_update_product = (req, res) => {
  const {
    Name,
    CategoryId,
    Price,
    ImageUrl,
    Discount,
    Description,
    Quantity,
  } = req.body;

  const id = req.params.id;

  let request = new sql.Request();
  request
    .input("Id", sql.Int, id)
    .input("CategoryId", sql.Int, CategoryId)
    .input("Name", sql.NVarChar(128), Name)
    .input("Description", sql.NVarChar(sql.MAX), Description)
    .input("Price", sql.Int, Price)
    .input("Quantity", sql.Int, Quantity)
    .input("ImageUrl", sql.NVarChar(128), ImageUrl)
    .input("Discount", sql.Float, Discount)
    .execute("EditProduct")
    .then((response) => {
      return res.status(200).json({ message: "update success", response });
    })
    .catch((err) => res.status(500).json(err));
};

exports.delete_one = (req, res) => {
  const id = req.params.id;
  let request = new sql.Request();
  request
    .input("Id", sql.Int, id)
    .execute("DeleteProduct")
    .then((response) => {
      return res.status(200).json({ message: "delete success", response });
    })
    .catch((err) => res.status(500).json(err));
};
