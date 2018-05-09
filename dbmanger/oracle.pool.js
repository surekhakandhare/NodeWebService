var mongoMgr = require('../dbmanger/mongo.dbmgr');
var mongodbUrl = require('../config/app.config').mongodbUrl;
var mongodbName = require('../config/app.config').mongodbName;
var oracledb = require('oracledb');


function initializeDatabasesPool(accountname){
    var query = {};
    query["status"]=1;
    if(accountname!='')
    query["accountname"]=accountname;
    query["db"]="ORACLE";
    query["dbtype"]="TRNS";
    query["environment"]="PRODUCTION";
 
    mongoMgr.GetClient(mongodbUrl, function(error,client ) {
      if(error) throw error
      else{
         var db = mongoMgr.GetConnection(client,mongodbName);
        mongoMgr.ExcuteQuery(db,"DBCONFIG",[],query,{} , function (error, result) {
            if(error) throw error
            
            
            for(var i=0;i<result.length;i++){
               var config =result[i];
               var accpool = oracledb.createPool ({
                poolAlias:  config["poolAlias"],
                user:       config["username"],
                password:     config["password"],
                connectString:   config["connectionString"],
                poolMax:         parseInt(config["poolMax"]),
                poolMin:        parseInt( config["poolMin"]),
                poolIncrement:   parseInt(config["poolIncrement"]),
                poolTimeout:     parseInt(config["poolTimeout"])
                
               });
             
               Promise.all([accpool])
               .then(function(pools) {
                 console.log("Pool Created")
               })
               .catch(function(err) {
                 console.log("ERROR in Pool creation"+err);
               });
              

            }
            mongoMgr.doClose(client);
         });
        }
         });
    }

    module.exports.initializeDatabasesPool = initializeDatabasesPool;