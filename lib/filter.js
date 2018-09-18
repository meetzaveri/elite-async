// .filter() async implementation
module.exports = function(arr, truthTest, callback) {
  // Actual Array that will contain data which was passed on true condition
  let arr = [];
  // Dummy Array to be used for conditional purpose
  let conditionCompareArr = [];

  // Middleware setup for achieving redudant callbacks to origin
  function middlewareCallback(data) {
    while (data.length === arr.length) {
      callback(null, arr);
      return;
    }
  }

  // As its parallel in nature, we need for loop mechanism to carry on calling function
  arr.forEach((item, index) => {
    // TruthTest to be tested for every data in array
    truthTest(arr[index], (err, bool) => {
      if (err === null && bool === true) {
        // Custom Setup for last element in arr
        if (index === arr.length - 1) {
          truthTest(arr[index], (err, bool) => {
            if (err === null && bool === true) {
              // return result in final function with boolean flag
              arr.push(arr[index]);
              conditionCompareArr.push(arr[index]);
              middlewareCallback(conditionCompareArr);
            } else {
              // return final function with err
              conditionCompareArr.push(arr[index]);
              middlewareCallback(conditionCompareArr);
            }
          });
        }
        // else when it's not last element, then use callbacks
        else if (index < arr.length - 1) {
          arr.push(arr[index]);
          conditionCompareArr.push(arr[index]);
          middlewareCallback(conditionCompareArr);
        }
      } else {
        // whenever error is not null or error occurs
        conditionCompareArr.push(arr[index]);
        middlewareCallback(conditionCompareArr);
      }
    });
  });
};
