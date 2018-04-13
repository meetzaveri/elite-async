
// Every async implementation
exports.every = function(arr, truthTest, callback) {
  let i = 0;
  function renderEvery(i) {
    console.log('Arr',arr[i]);
    truthTest(arr[i], (dummyparams, bool) => {
      console.log('i(in truthtest) - ',i);
      // Normal Setup for flow in truthtest
      if (bool === true) {
        console.log('Bool',bool);
        // Custom Setup for last element in arr
        if (i === arr.length - 1) {
          truthTest(arr[i], (dummyparams, bool) => {
            if(bool === true){
              // return result in final function with boolean flag
              return callback(null, bool);
            }
            else{
              // return final function with err
              return callback('false', null);
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
        return callback('false', null);
      }
    });
  }
  renderEvery(i);
}

// Waterfall implementation
exports.waterfall = function(arr,callback){
    let i = 0;
    // captures data to pass onto next function
    let capturerOfI = [];
    function renderWaterFall(i){
      if(i === 0){
        console.log('I',i)
        var item = arr[i];
        item((cont,caption)=>{
          if(cont !== null){
            console.log('After err occured',cont)
            return callback(cont,null);
          }
          else{
            console.log('Is it',caption);
            capturerOfI.push(caption);
            i++;
            renderWaterFall(i);
          }
        })
        
      }
      else if(i === arr.length - 1){
        console.log('I',i)
        var item = arr[i];
        item(capturerOfI[i-1],(cont,caption)=>{
          if(cont !== null){
            console.log('After err occured',cont)
            return callback(cont,null);
          }
          else{
            capturerOfI.push(caption);
            console.log('Capturer',capturerOfI)
          }
        })
      }
      else if(i < arr.length - 1){
        console.log('I',i)
        var item = arr[i];
        item(capturerOfI[i-1],(cont,caption)=>{
          if(cont !== null){
            console.log('After err occured',cont)
            return callback(cont,null);
          }
          else{
            capturerOfI.push(caption);
            i++;
            renderWaterFall(i);
          }
        })
      }
    }
    renderWaterFall(i);
}



