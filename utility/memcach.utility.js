var appConfig = require('../config/application.config');
var memcache = require('memcached');
var cachedUrl = appConfig.memcachedurl;


exports.get = function(key,callback) {
  var client  = new memcache(cachedUrl);
  console.log('MemKey ='+key);  
  client.get(key, function (err, data) {
  if(err)
     callback(err);
  else {
      
     console.log('@getmem = '+ data); 
    callback(null,data);
    }
  });
 };


 exports.set = function(key, value) {
    var client  = new memcache(cachedUrl);
    client.set(key, value, 10000, function (err) { 
        if(err) throw new err;
    });
   
};