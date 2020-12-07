const sql = require("mssql");

exports.get_all_categories = (req, res) => {
  let request = new sql.Request();

  request
    .execute("GetCategories")
    .then((response) => {
      res.status(200).json({ data: response.recordset });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.get_one_category = (req, res) => {
  const id = req.params.id;
  let request = new sql.Request();
  request
    .input("id", sql.Int, id)
    .execute("GetCategoryById")
    .then((response) => {
      res.status(200).json({ data: response.recordset });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.post_insert = (req, res) => {
  const { Name, Description } = req.body;

  let request = new sql.Request();
  request
    .input("Name", sql.NVarChar(64), Name)
    .input("Description", sql.NVarChar(512), Description)

    .execute("AddCategory")
    .then((response) => {
      res.status(201).json({ message: "create success", response });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.update_category = (req, res) => {
  const { Name, Description } = req.body;

  const id = req.params.id;

  let request = new sql.Request();
  request
    .input("Id", sql.Int, id)
    .input("Name", sql.NVarChar(64), Name)
    .input("Description", sql.NVarChar(512), Description)
    .execute("EditCategory")
    .then((response) => {
      return res.status(200).json({ message: "update success", response });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.delete_one = (req, res) => {
  const id = req.params.id;
  let request = new sql.Request();
  request
    .input("Id", sql.Int, id)
    .execute("DeleteCategory")
    .then((response) => {
      return res.status(200).json({ message: "delete success", response });
    })
    .catch((err) => res.status(500).json(err));
};
