module.exports = function(tasks,limit,callback){
  let i =0;
  let arrayData = [];
  let objData = {};
  let allTasks = tasks;
  let tasksPopped = [];
  let tasksRemaining = tasks;
  let counter = 0;

  // Middleware setup for achieving redudant callbacks to origin  
  function middlewareCallback(data){
    while(data.length === allTasks.length){
      callback(null,data);
      return;
    }
  }
  function runParallelLimit(counter){

    if(tasksRemaining.length > 0){
      if(tasksRemaining.length >= limit){
        
        // To run all functions till limit pointer hits
        // as concurrency limit will be expected
        console.log('Next '+ limit + ' functions' + ' and counter' + counter);
        for(let j = 0;j<=limit - 1;j++){
          if(j === limit - 1){
            // popping off all those tasks in queue for expected limit
            console.log('HERE 1',tasksRemaining[j],arrayData);
            tasksRemaining[j]((err,data) => {
              if(err){
                callback(err,null);
              } else{
                tasksPopped.push(tasksRemaining[j]);
                arrayData.splice(j,0,data);
                tasksRemaining.splice(0,limit);
                console.log('Tasks Popped',tasksPopped,' and tasks remaining ',tasksRemaining);
                middlewareCallback(arrayData);
                counter++;
                runParallelLimit(counter);
              }
              
            })
            
            
          } else{
            // execute functions till limit number
            console.log('HERE 2');
            tasksRemaining[j]((err,data) => {
              tasksPopped.push(tasksRemaining[j]);
              arrayData.splice(j,0,data);
              middlewareCallback(arrayData);
            })
            
          }
          
        }
      }
      else{
        // that same parallel approach
        tasksRemaining.forEach((item,index) => {
          if(index === tasksRemaining.length - 1){
            tasksRemaining[index]((err,data) => {
              tasksPopped.push(tasksRemaining[j]);
              arrayData.splice(index,0,data);
              middlewareCallback(arrayData);
              counter++;
              runParallelLimit(counter);
            })
           
          } else{
            tasksRemaining[index]((err,data) => {
              tasksPopped.push(tasksRemaining[j]);
              arrayData.splice(index,0,data);
              middlewareCallback(arrayData);
            })
          }
          
        })
      }
      
    } else{
      return ;
    }

  }

  runParallelLimit(counter)
}