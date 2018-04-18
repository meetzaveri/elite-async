// .every() async implementation
module.exports = function(arr, truthTest, callback) {
  let i = 0;
  function renderEvery(i) {
    truthTest(arr[i], (err, bool) => {
      // Normal Setup for flow in truthtest
      console.log(arr[i])
      if (err === null) {
        // Custom Setup for last element in arr
        if (i === arr.length - 1) {
          truthTest(arr[i], (err, bool) => {
            if(err === null){
              // return result in final function with boolean flag
              return callback(null, bool);
            }
            else{
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
      }
      else {
        return callback(err, null);
      }
    });
  }
  renderEvery(i);
}