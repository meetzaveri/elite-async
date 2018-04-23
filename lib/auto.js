// .auto() async implementation
module.exports = function(tasks,callback){
  let i = 0;
  let nestedTasksCounter = 0;
  let objData = {};
  let results = [];
  let taskNames = Object.keys(tasks);
  let taskData = Object.values(tasks);

  taskData.forEach((item,index) => {
    if(typeof(item) === 'object'){
      nestedTasksCounter++;
    }
  })
  let arrayFnData = [];
  function renderAuto(i){
    
    function arrFnMiddlewareCallback(data){
      console.log('data.length ',data.length ,nestedTasksCounter)
      while(data.length === nestedTasksCounter){
        callback(null,data);
        return;
      }
    }
    if(typeof(taskData[i]) === 'function'){
      if(i === taskData.length - 1){
        i++;
        renderAuto(i)
      }
      else if(i < taskData.length - 1){
        i++;
        renderAuto(i)
      }
    } else if(typeof(taskData[i]) === 'object'){
      console.log('Object hitted')
      // console.log('TaskData[i]',taskData[i][0],typeof(taskData[i][0]),typeof(taskData[i][taskData.length - 1]));
      
      let inArrayTasks = taskData[i].length - 1 ;
      let arrayData = [];
      
      function middlewareCallback(data){
        while(data.length === inArrayTasks){
          return;
        }
      }

      taskData[i].forEach((item,index) => {
        if(typeof(item) === 'string'){
          if(typeof(tasks[item]) === 'object'){
            if(typeof(item) === 'string'){
              // do nothing
            }  
          } else{
            tasks[item]((err,...data)=>{
              if(err) {
                return callback(err,null);
              } else{
                arrayData.splice(index,0,data);
                middlewareCallback(arrayData);
              }
            })
          }
        } else{
          console.log('FN occured index',index);
          item(arrayData,(err,...data)=>{
            arrayFnData.splice(index,0,data);
            arrFnMiddlewareCallback(arrayFnData);
          })
        }
      })
      console.log('ArrayData',arrayData);
      console.log('arrayFnData',arrayFnData);
      i++;
      renderAuto(i)
    }
  }
  renderAuto(i)
}
