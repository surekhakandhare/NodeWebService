var MongoClient = require('mongodb').MongoClient;

function  GetClient(url,callback){
    MongoClient.connect(url, function(error, client) {
        if (error){
          throw error;
          return callback(error);
        } else{
            return callback(null,client);
        }
      });
  
  }

  function  GetConnection(client,dbName){
    var db =client.db(dbName);
    return db;
  }

function ExcuteQuery(db,table,column,query,sort,callback){
    var projection = new Map();
    for (var i = 0; i < column.length; i++) {
        projection.set(column[i],1.0);
    }
    projection.set("-id",0);
    var sort = [];
    for (var i = 0; i < sort.length; i++) {
        var srt = [sort[i],1];
        sort.push(srt);
    }
    
    db.collection(table).find(query).project(projection).sort(sort).toArray(function(error, documents) {
        if( error )  return callback(error)
        else return callback(null, documents);
     });
 }  


 function doClose(client) {
  
    client.close(function(error) {
      if (error) {
        console.log("errorOR: Unable to Close the connection: ", error);
      }
      return;
    });
  
  }
  module.exports.GetClient = GetClient;
module.exports.GetConnection = GetConnection;
module.exports.ExcuteQuery = ExcuteQuery;
module.exports.doClose = doClose;