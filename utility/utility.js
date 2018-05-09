var appConfig = require('../config/application.config');
var queryCreate =  require('../query/query.create.js');
var queryExcute = require('../query/query.excute.js');

exports.Get_Rep_prp = function(req,res,mdl, db ,callback) {
    var filter = {};
    filter["MDL"]=mdl ;
    filter["FLG"]="Y" ;
   
    var queryJson=queryCreate.report_query_create(filter);
    var column = ["PRP"];
    var rnk="RNK";
    var collection = "REPPRP";
    var viewPrpLst =[];
   queryExcute.mongodb_report_query(db,collection,column,queryJson,rnk,res, function (err, document) {
       if(err){
        callback(err);
       }else{
       for(var i=0;i<document.length;i++){
        var doc = document[i];
        viewPrpLst.push(doc.PRP);
      }
     
      callback(null,viewPrpLst);
      }
   });
   
};

