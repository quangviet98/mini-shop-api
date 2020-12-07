const sql = require("mssql");

exports.getAllOrders = (req, res) => {
  const request = new sql.Request();
  request
    .query(`SELECT * FROM Orders`)
    .then((response) => {
      res
        .status(200)
        .json({ data: response.recordset, total: response.rowsAffected[0] });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getOrderByAccountId = (req, res) => {
  const { id } = req.params;

  const request = new sql.Request();
  request
    .input("AccountId", sql.VarChar(20), id)
    .execute("GetOrderByAccountId")
    .then((response) => {
      res
        .status(200)
        .json({ data: response.recordset, total: response.rowsAffected[0] });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getOrderDetail = (req, res) => {
  const { id } = req.params;

  const request = new sql.Request();
  request
    .input("Id", sql.VarChar(20), id)
    .execute("GetOrderById")
    .then((response) => {
      res
        .status(200)
        .json({ data: response.recordset, total: response.rowsAffected[0] });
    })
    .catch((err) => res.status(500).json(err));
};

exports.getOrderItems = (req, res) => {
  const { id } = req.params;

  const request = new sql.Request();
  request
    .input("Id", sql.VarChar(20), id)
    .execute("GetOrderItemsByAccountId")
    .then((response) => {
      res
        .status(200)
        .json({ data: response.recordset, total: response.rowsAffected[0] });
    })
    .catch((err) => res.status(500).json(err));
};

exports.updateProcessOrder = (req, res) => {
  const { id } = req.params;
  const { Id, Status, DeliverId, AccountId } = req.body;

  const request = new sql.Request();
  request
    .input("Id", sql.VarChar(20), id)
    .input("AccountId", sql.VarChar(20), AccountId)
    .input("DeliverId", sql.VarChar(20), DeliverId)
    .input("Status", sql.VarChar(15), Status)
    // .query(
    //   `UPDATE Orders SET Status = @Status, DeliverID = @DeliverId, Staff_ID = @AccountId WHERE Id = @Id`
    // )
    .execute("OrderProcess")
    .then((response) => {
      res
        .status(200)
        .json({ data: response.recordset, total: response.rowsAffected[0] });
    })
    .catch((err) => res.status(500).json(err));
};
