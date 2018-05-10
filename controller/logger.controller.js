const DBMgr = require('../dbmanger/oracle.dbmgr');
var oracledb = require("oracledb");

exports.addLoginData = function(req, res) {
var usrId = "50561";
var outJson = {};
var status;
var message;
var logId = 0;
var remoteAddr =  "localhost";
var remoteUsr = "Nilam";
var flg="API";
var browser = "Chrome";

if(usrId!=''){
    DBMgr.GetConnection('KGTPOOL',function(err,connection){
        if(err){
            console.log("DB Connection Fail");
        }
        var params = [];
        var fmt = {outFormat: oracledb.Integer};
        var query = "select log_id_seq.nextval logid from dual";
        DBMgr.ExcuteSql(connection,query,params,fmt,function(err,result){
            if(err){
                console.log("error");
            }else{
                logId = result.rows[0][0];
                console.log("logId"+logId);
                //outJson["LoginDetails"]=result.rows;
                //res.send(outJson);
            }
        });
        var insLogQ = " insert into web_login_log (log_id, usr_id, dt_tm,  cl_ip, cl_usr, flg, cl_browser) "+
        " select :logId, :usrId, sysdate, :remoteAddr,:remoteUsr,:flg,:browser from dual ";
        params = {logId,usrId,remoteAddr,remoteUsr,flg,browser};
        fmt = {};
        DBMgr.ExcuteSql(connection,insLogQ,params,fmt,function(err,result){
            if(err){
                console.log("error");
            }else{               
                console.log("Log Inserted for Log ID: "+logId);
                message="Log Inserted";
                console.log("Rows inserted " + result.rowsAffected);  
                outJson["Message"] = message;
                res.send(outJson);
                DBMgr.doRelease(connection);
            }
        });

       

    });
}else{
    status="FAIL";
    message="Please specified user Id";
    console.log("status"+status);
}
};