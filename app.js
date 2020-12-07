const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const sql = require("mssql");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDocument = require("./swagger.json");
const cors = require("cors");
require("dotenv").config();
const cool = require("cool-ascii-faces");

const productRoutes = require("./api/routes/product");
const orderRoutes = require("./api/routes/order");
const categoryRoutes = require("./api/routes/category");
const accountRoutes = require("./api/routes/account");
const roleRoutes = require("./api/routes/role");

var config = {
  user: "sa",
  password: "123",
  server: "localhost",
  database: "Shop_V2",
};
sql.connect(config, function (err) {
  if (err) console.log(err);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
// var options = {
//   explorer: true,
// };
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocument, options)
// );

app.use("/uploads", express.static("uploads"));

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", categoryRoutes);
app.use("/api", accountRoutes);
app.use("/api", roleRoutes);
app.get("/cool", (req, res) => res.send(cool()));

app.use((req, res, next) => {
  const error = new Error("URL not found!");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
module.exports = app;
