const initializeDatabases = require('../dbmanger/oracle.dbmgr');
var oracledb = require("oracledb");

exports.addLoginData = function(req, res) {
var usrId = req.body.usrId;
var outJson = {};
var status;
var massage;
var logId = 0;
if(usrId!=''){
     initializeDatabases.GetConnection('KGTPOOL',function(err,connection){
        if(err){
            console.log("DB Connection Fail");
        }
        var params = [];
        var fmt = {outFormat: oracledb.Integer};
        var query = "select log_id_seq.nextval logid from dual";
        initializeDatabases.ExcuteSql(connection,query,params,fmt,function(err,result){
            if(err){
                console.log("error");
            }else{
                logId = result.rows[0][0];
                console.log("logId"+logId);
                //outJson["LoginDetails"]=result.rows;
                //res.send(outJson);
            }
        });

        



    });
}else{
    status="FAIL";
    massage="Please specified user Id";
    console.log("status"+status);
}
};