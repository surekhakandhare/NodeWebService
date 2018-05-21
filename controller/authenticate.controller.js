const DBMgr = require('../dbmanger/oracle.dbmgr');
var oracledb = require("oracledb");

exports.authenticate = function(req, res,callback) {
var username = req.body.username;
var password = req.body.password;
var outJson = {};
var status;
var massage;
var UserId = "0";
if(username!='' && password!=''){
    DBMgr.GetConnection('KGTPOOL',function(error,connection){
        if(error){
            callback(error);
        }
        var params = {username,password};
        var fmt = {outFormat: oracledb.OBJECT};
        var query = "select a.usr_id , b.nme_idn, a.rel_idn,Initcap(fnme) nme from web_usrs a , mnme b , nmerel c where a.rel_idn = c.nmerel_idn and c.nme_idn = b.nme_idn and a.to_dt is null and b.vld_dte is null and upper(a.usr) = upper(:username) and upper(a.pwd) = upper(:password)";
        DBMgr.ExcuteSql(connection,query,params,fmt,function(error,result){
            if(error){
                DBMgr.doRelease(connection);
                callback(error);
                
            }else{
                console.log(result.rows);
                outJson["UserDetails"]=result.rows;
                outJson["STATUS"]="SUCCESS";
                outJson["MASSAGE"]="SUCCESS";
              
                DBMgr.doRelease(connection);
            }

        });
    });
}else{
    status="FAIL";
    massage="Please specified username and password";
    outJson["STATUS"]=status;
    outJson["MASSAGE"]=massage;
    callback(null,outJson);
}



};