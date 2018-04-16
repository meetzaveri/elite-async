var {every ,waterfall,parallel} = require('./utils.js');
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

// waterfall([
//     function(callback) {
//         callback(null, 'yess');
//     },
//     function(arg, callback) {
//       console.log('Use prevData 1',arg)
//       var caption = 'works 0' 
//       if(arg === 'yes'){
//         callback(null, caption);
//       } else{
//         console.log('arg else',arg)
//         var err = 'Some error occured in fn.2'
//         callback(err, null);
//       }
//     },
//     function(caption, callback) {
//       console.log('Use prevData 2',caption)
//       var caption = false;
//       callback(null, caption);
//     },
//     function(bool, callback) {
//       if(bool){
//         console.log('Use prevData 3',bool)
//         var caption = ' works 2!';
//         callback(null, caption);
//       } else{
//         var err = 'Some error occured in fn.3'
//         callback(err, null);
//       }
      
//     }
// ],function(err,results){
//   console.log(err,results);
//     if(err){
//       console.log('ERR === ',err)
//     }
//     else{
//       console.log('Return')
//     }
// });


parallel([
  function(callback) {
      setTimeout(function() {
          callback(null, 'one');
      }, 200);
  },
  function(callback) {
      setTimeout(function() {
          callback(null, 'two');
      }, 2000);
  },
  function(callback) {
    setTimeout(function() {
        callback(null, 'three');
    }, 4000);
  },
  function(callback) {
    if(true === true){
      setTimeout(function() {
        callback(null, 'four');
    }, 1000);
    } else{
      setTimeout(function() {
        var err = 'Some Error Occured'
        callback(err);
    }, 1000);
    }
    
  }
],
// optional callback
function(err, results) {
  if(err){
    console.log('Err',err);
    return;
  } else{
    console.log('Results ',results);
  }
});
console.log('In')

// async.waterfall([
//     function(asyncCB){
//       verifyEmail(email, function(err, userStatus){
//         console.log('In if verify email ')
//           if(err){
//             return callback(null,err);
//           }
//           else if(userStatus.userExists && userStatus.isActive){
//             asyncCB(null,userStatus);
//           }
//           else {
//             return callback(null,failureResponse);
//           }
//       })
//     },
//     function(userStatus, asyncCB){

//       const { passwordHash, salt } = utils.saltHashPassword(password);
//       const { id } = userStatus.userExistsData;
//         var userObj = {
//           email: email,
//           salt: salt,
//           password: passwordHash,
//           id: id,
//         }
//       if(userStatus.userExists && userStatus.isActive){
//         updateUser(userObj.email, userObj.password, userObj.salt, userObj.id,function(err,data){
//           if (err) {
//             return callback(err,null);
//           } else {
//             return asyncCB(null,response);
//           }
//         })
//       }
//       else {
//         callback(err,null);
//       }
//     },
//     function(response,asyncCB) {
//       sendNewPassword(email, password,  function(err,isEmailSent){
//         if (err){
//           asyncCB(err);
//         } else {
//           if(isEmailSent){
//             asyncCB(null, true);
//           } else {
//             asyncCB(null,false);
//           }
//         }
//       });
//     }
// ], function (err, result) {
//     // result now equals 'done'
//     if(err){
//       return callback(null,failureResponse);
//     }
//     else {
//       return callback(null, successResponse);
//   }
// });
