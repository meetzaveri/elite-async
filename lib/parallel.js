// .parallel() async implementation
module.exports =  function (tasks,callback){
  let i =0;
  let arrayData = [];
  let objData = {};

  // Middleware setup for achieving redudant callbacks to origin  
  function middlewareCallback(data){
    while(data.length === tasks.length){
      callback(null,data);
      return;
    }
  }

  // As its parallel in nature, we need looping mechanism 
  // to carry on calling function simultaneously
  tasks.forEach((item,index) =>{
    item((err,data) => {
      if(index < tasks.length - 1){
        if(err){
          callback(err,null);
        } else{
          if(arrayData.length  === tasks.length){
            // do nothing
          }
          else{
            arrayData.splice(index,0,data);
            middlewareCallback(arrayData);
          }
        }
      } else if(index === tasks.length - 1) {
        if(err){
          callback(err,null);
        } else{
          if(arrayData.length  === tasks.length){
            // do nothing
          }
          else{
            arrayData.splice(index,0,data);
            middlewareCallback(arrayData);
          }
        }
      }
    })
  })
}
