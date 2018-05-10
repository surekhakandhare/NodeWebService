var oracledb = require("oracledb");

function GetConnection(poolNme,callback){
  var pool=oracledb.getPool(poolNme);
  pool.getConnection(function(error, connection) {
    if (error) { 
      console.log("errorOR: Cannot get a connection: ", error);
      connection.release();
      return callback(error);
    }
    return callback(null,connection);
  });

}

function ExcuteSql(connection,sql , params ,fmt,callback){
   connection.execute(sql, params,fmt , function(error, result) {

            if (error) { 
                console.log("errorOR: Unable To Excute Query: ", error);
                connection.release();
                return callback(error);
              }
            
    
      return callback(null,result);

     });

}  


function doRelease(connection) {
  
  connection.release(function(error) {
    if (error) {
      console.log("errorOR: Unable to RELEASE the connection: ", error);
    }
    return;
  });

}
module.exports.GetConnection = GetConnection;
module.exports.ExcuteSql = ExcuteSql;
module.exports.doRelease = doRelease;