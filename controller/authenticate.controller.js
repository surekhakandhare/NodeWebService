const DBMgr = require('../dbmanger/oracle.dbmgr');
var oracledb = require("oracledb");

exports.authenticate = function(req, res) {
var username = req.body.username;
var password = req.body.password;
var outJson = {};
var status;
var massage;
var UserId = "0";
if(username!='' && password!=''){
    DBMgr.GetConnection('KGTPOOL',function(err,connection){
        if(err){
            console.log("DB Connection Fail");
        }
        var params = {username,password};
        var fmt = {outFormat: oracledb.OBJECT};
        var query = "select a.usr_id , b.nme_idn, a.rel_idn,Initcap(fnme) nme from web_usrs a , mnme b , nmerel c where a.rel_idn = c.nmerel_idn and c.nme_idn = b.nme_idn and a.to_dt is null and b.vld_dte is null and upper(a.usr) = upper(:username) and upper(a.pwd) = upper(:password)";
        DBMgr.ExcuteSql(connection,query,params,fmt,function(err,result){
            if(err){
                console.log("error");
            }else{
                console.log(result.rows);
                var areas= result.rows;
                areas.forEach(function(e) {
                    Object.keys(e).forEach(function(key) {
                    var value = e[key]
                    if(key=="USR_ID"){
                        UserId = value;
                    }
                    console.log(key)
                    console.log(value)
                    })
                    })
                console.log("UserId"+UserId);
                outJson["UserDetails"]=result.rows;
                res.send(outJson);
                DBMgr.doRelease(connection);
            }

        });
    });
}else{
    status="FAIL";
    massage="Please specified username and password";
    console.log("status"+status);
}
};