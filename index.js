const every = require('./lib/every');
const waterfall =  require('./lib/waterfall');
const parallel = require('./lib/parallel');
const filter = require('./lib/filter');
const auto = require('./lib/auto')

/* 
.every() example 
*/

// every(['yes','yes','yes'],function(answer,callback){
//     if(answer === 'yes'){
//       callback(null, true)
//     }
//     else{
//       var err = 'Error occurred'
//       callback(null,false);
//     }
// },function(err,result){
//     if(err){
//         console.log('err: ',err);
//     }
//     else {
//         console.log('Result : ',result)
//     }
// });

/* 
.waterfall() example 
*/

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

/* 
.parallel() example 
*/

// parallel([
//   function(callback) {
//       setTimeout(function() {
//           callback(null, 'one');
//       }, 7200);
//   },
//   function(callback) {
//       setTimeout(function() {
//           callback(null, 'two');
//       }, 200);
//   },
//   function(callback) {
//     setTimeout(function() {
//         callback(null, 'three');
//     }, 200);
//   },
//   function(callback) {
//     if(true === true){
//       setTimeout(function() {
//         callback(null, 'four');
//     }, 200);
//     } else{
//       setTimeout(function() {
//         var err = 'Some Error Occured'
//         callback(err);
//     }, 1000);
//     }
    
//   }
// ],
// // optional callback
// function(err, results) {
//   if(err){
//     console.log('Err',err);
//     return;
//   } else{
//     console.log('Results ',results);
//   }
// });

/* 
.filter() example 
*/

// filter(['file1','file2','file1'],function(path,callback){
//   if(path !== 'file1'){
//     setTimeout(function() {
//         callback(null, true);
//     }, 1000);
//   } else{
//     setTimeout(function() {
//       var err = 'Error occurred'
//       callback(err);
//     }, 1000);
//   }
// },function(err,result){
//   if(err){
//       console.log('err: ',err);
//   } else {
//       console.log('Result : ',result)
//   }
// });

auto({
  get_data: function(callback) {
      console.log('in get_data');
      // async code to get some data
      callback(null, 'data', 'converted to array');
  },
  make_folder: function(callback) {
      console.log('in make_folder');
      // async code to create a directory to store a file in
      // this is run at the same time as getting the data
      callback(null, 'folder');
  },
  write_file: ['get_data', 'make_folder', function(results, callback) {
      console.log('in write_file', JSON.stringify(results));
      // once there is some data and the directory exists,
      // write the data to a file in the directory
      callback(null, 'filename');
  }],
  go_file: ['write_file', function(results, callback) {
    console.log('in go_file', JSON.stringify(results));
    // once there is some data and the directory exists,
    // write the data to a file in the directory
    callback(null, 'go_file','Done');
  }]
}, function(err, results) {
  console.log('err = ', err);
  console.log('results = ', results);
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
