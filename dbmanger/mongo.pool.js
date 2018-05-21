var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url=require('../config/app.config').mongodbNmeUrl;
var connection=[];

function  EstablishConnection (url, callback){
    
    MongoClient.connect(url, function(error, db) {
        if (error){
          throw error;
          return callback(error);
        } else{
            assert.equal(null, err);
             connection = db
            return callback(null,connection);
        }
      });
  
  }

  function  GetConnection(client,dbName){
    return connection;
  }

  module.exports.EstablishConnection=EstablishConnection;
  module.exports.GetConnection=GetConnection;
