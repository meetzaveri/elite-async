var utils = require('./utils.js');

utils.every(['yes','yes','yes'],function(answer,callback){
    if(answer === 'yes'){
        callback(null, true)
    }
    else{
        callback(null, false)
    }
},function(err,result){
    if(err){
        console.log('err: ');
    }
    else if(result){
        console.log('Result : ',result)
    }
});
console.log('In')

// async.every(arrayOfArray25, function(arrayOf25, callback) {
//     var params = {
//       RequestItems: {
//         [table]: []
//       }
//     };
//     arrayOf25.forEach(function(item){
//       params.RequestItems[table].push({
//         PutRequest:{
//           Item: item
//         }
//       })
//     });
//     docClient.batchWrite(params, function(err, data) {
//       if (err){ 
//         console.log(err);
//         callback(err);
//       } else {
//         callback(null, true);
//       };
//     });
//   }, function(err,result){
//     if(err){
//       cb(err);
//     } else {
//       cb(null);
//     }
//   });