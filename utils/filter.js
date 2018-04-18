// .filter() async implementation
module.exports = function(arr, truthTest, callback) {
  let acc = [];
  let dummyacc = [];
  function middlewareCallback(data){
    while(data.length === arr.length){
      callback(null,acc);
      return;
    }
  }
  arr.forEach((item,index) => {
    truthTest(arr[index], (err, bool) => {
      // Normal Setup for flow in truthtest
      if (err === null) {
        if(bool === true){
          // Custom Setup for last element in arr
          if (index === arr.length - 1) {
            truthTest(arr[index], (err, bool) => {
              if(err === null){
                if(bool === true){
                  // return result in final function with boolean flag
                  acc.push(arr[index]);
                  dummyacc.push(arr[index]);
                  middlewareCallback(dummyacc);
                } else{
                  dummyacc.push(arr[index]);
                  middlewareCallback(dummyacc);
                }
              } else{
                // return final function with err
                dummyacc.push(arr[index]);
                middlewareCallback(dummyacc);
              }
            })
          }
          // else when it's not last element, then use callbacks
          else if(index < arr.length - 1) {
            acc.push(arr[index]);
            dummyacc.push(arr[index]);
            middlewareCallback(dummyacc);
          }
        } else{
          dummyacc.push(arr[index]);
          middlewareCallback(dummyacc);
        }
      } else {
        dummyacc.push(arr[index]);
        middlewareCallback(dummyacc);
      }
    });
  })
}