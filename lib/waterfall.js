// .waterfall() async implementation
module.exports =  function(arr,callback){
  let i = 0;
  // captures data to pass onto next function
  let dataStore = [];

  function renderWaterFall(i){
    if(i === 0){
      var item = arr[i];
      item((err,caption)=>{
        if(err !== null){
          return callback(err,null);
        }
        else{
          dataStore.push(caption);
          i++;
          renderWaterFall(i);
        }
      })
      
    }
    else if(i === arr.length - 1){
      var item = arr[i];
      item(dataStore[i-1],(err,caption)=>{
        if(err !== null){
          return callback(err,null);
        }
        else{
          dataStore.push(caption);
          callback(null,dataStore);
        }
      })
    }
    else if(i < arr.length - 1){
      var item = arr[i];
      item(dataStore[i-1],(err,caption)=>{
        if(err !== null){
          return callback(err,null);
        }
        else{
          dataStore.push(caption);
          i++;
          renderWaterFall(i);
        }
      })
    }
  }
  renderWaterFall(i);
}
