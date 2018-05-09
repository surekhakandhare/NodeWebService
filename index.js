const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const stock = require('./router/stock.router');
const auth = require('./router/authenticate.router');
const dbInit=require('./dbmanger/oracle.pool');
const app = express();
const hostname = 'localhost';
const port = 5002;
const accountName = "KG";
app.use(compression());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());
//app.use("/stock",stock);
 app.use("/auth",auth);


// listen for requests
app.listen(port, hostname, () => {
  dbInit.initializeDatabasesPool(accountName)
  console.log(`Server running at http://${hostname}:${port}/`);
});
