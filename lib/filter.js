// .filter() async implementation
module.exports = function(arr, truthTest, callback) {
  // Actual Array that will contain data which was passed on true condition
  let arr = []; 
  // Dummy Array to be used for conditional purpose
  let dummyArr = []; 

  // Middleware setup for achieving redudant callbacks to origin  
  function middlewareCallback(data){
    while(data.length === arr.length){
      callback(null,arr);
      return;
    }
  }

  // As its parallel in nature, we need for loop mechanism to carry on calling function
  arr.forEach((item,index) => {

    // TruthTest to be tested for every data in array
    truthTest(arr[index], (err, bool) => {
      if (err === null) {
        if(bool === true){
          // Custom Setup for last element in arr
          if (index === arr.length - 1) {
            truthTest(arr[index], (err, bool) => {
              if(err === null){
                if(bool === true){
                  // return result in final function with boolean flag
                  arr.push(arr[index]);
                  dummyArr.push(arr[index]);
                  middlewareCallback(dummyArr);
                } else{
                  dummyArr.push(arr[index]);
                  middlewareCallback(dummyArr);
                }
              } else{
                // return final function with err
                dummyArr.push(arr[index]);
                middlewareCallback(dummyArr);
              }
            })
          }
          // else when it's not last element, then use callbacks
          else if(index < arr.length - 1) {
            arr.push(arr[index]);
            dummyArr.push(arr[index]);
            middlewareCallback(dummyArr);
          }
        } else{
          dummyArr.push(arr[index]);
          middlewareCallback(dummyArr);
        }
      } else {
        // whenever error is not null or error occurs
        dummyArr.push(arr[index]);
        middlewareCallback(dummyArr);
      }
    });
  })
}