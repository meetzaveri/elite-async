module.exports =  function(arr,callback){
  let i = 0;
  // captures data to pass onto next function
  let capturerOfI = [];
  function renderWaterFall(i){
    if(i === 0){
      var item = arr[i];
      item((cont,caption)=>{
        if(cont !== null){
          return callback(cont,null);
        }
        else{
          capturerOfI.push(caption);
          i++;
          renderWaterFall(i);
        }
      })
      
    }
    else if(i === arr.length - 1){
      var item = arr[i];
      item(capturerOfI[i-1],(cont,caption)=>{
        if(cont !== null){
          return callback(cont,null);
        }
        else{
          capturerOfI.push(caption);
        }
      })
    }
    else if(i < arr.length - 1){
      var item = arr[i];
      item(capturerOfI[i-1],(cont,caption)=>{
        if(cont !== null){
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
