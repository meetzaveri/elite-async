// .every() async implementation
module.exports = function(arr, truthTest, callback) {
  let i = 0;
  function renderEvery(i) {
    truthTest(arr[i], (err, bool) => {
      // Normal Setup for flow in truthtest
      if (err === null) {
        if(bool === true){
          // Custom Setup for last element in arr
          if (i === arr.length - 1) {
            
            // REPEAT WHOLE FUNCTION FOR ONE LAST TIME
            truthTest(arr[i], (err, bool) => {
              if(err === null){
                if(bool === true){
                  // return result in final function with boolean flag
                  return callback(null, bool);
                } else{
                  return callback('Some error, result : false', null);
                }
              } else{
                // return final function with err
                return callback(err, null);
              }
            })
          }
          // else when it's not last element, then use callbacks
          else if(i < arr.length - 1) {
            ++i;
            renderEvery(i);
          }
        } else{
          return callback('Some error, result : false', null);
        }
      } else {
        return callback(err, null);
      }
    });
  }
  renderEvery(i);
}