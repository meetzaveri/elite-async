var {every ,waterfall} = require('./utils.js');
// every(['yes','yes','yes'],function(answer,callback){
//     if(answer === 'yes'){
//         callback(null, true)
//     }
//     else{
//         callback(null, false)
//     }
// },function(err,result){
//     if(err){
//         console.log('err: ',err);
//     }
//     else if(result){
//         console.log('Result : ',result)
//     }
// });

waterfall([
    function(callback) {
        callback(null, 'yess');
    },
    function(arg, callback) {
      console.log('Use prevData 1',arg)
      var caption = 'works 0' 
      if(arg === 'yes'){
        callback(null, caption);
      } else{
        console.log('arg else',arg)
        var err = 'Some error occured in fn.2'
        callback(err, null);
      }
    },
    function(caption, callback) {
      console.log('Use prevData 2',caption)
      var caption = false;
      callback(null, caption);
    },
    function(bool, callback) {
      if(bool){
        console.log('Use prevData 3',bool)
        var caption = ' works 2!';
        callback(null, caption);
      } else{
        var err = 'Some error occured in fn.3'
        callback(err, null);
      }
      
    }
],function(err,results){
  console.log(err,results);
    if(err){
      console.log('ERR === ',err)
    }
    else{
      console.log('Return')
    }
});
console.log('In')
