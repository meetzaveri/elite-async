// .auto() async implementation
module.exports = function(tasks,callback){
  let i = 0;
  let taskNames = Object.keys(tasks);
  let taskData = Object.values(tasks);
  let completedTaskNames = [];
  let completedTaskData = [];
  let totalTasksPresent = 0;
  let pushedCompletedTaskData = 0;
  let setOfTasks= {};

  // Just to calculate tasks present in the 'tasks' object
  for(var key in tasks){
    totalTasksPresent++
  }
  
  function renderAuto(i){
    // The middleWare callback acts like an agent only who
    // can handle final callback for sending data
    // except if there is error 
    function middlewareCallback(data){
        console.log('setOfTasks',setOfTasks);
        callback(null,setOfTasks);
        return;
    }
    if(typeof(taskData[i]) === 'function'){
      // Sort of carrying on recursive fashion for starting tasks
      // not written logic here as I wanted to handle them 
      // directly in array of tasks thing or can say dependent tasks 
      // Let them be as it is we'll handle them purely in later 
      // dependent tasks call for these solo function task!!!
      if(i === taskData.length - 1){
        i++;
        renderAuto(i)
      }
      else if(i < taskData.length - 1){
        i++;
        renderAuto(i)
      }
    } else if(typeof(taskData[i]) === 'object'){
      // console.log('Object hitted')
      // console.log('TaskData[i]',taskData[i][0],typeof(taskData[i][0]),typeof(taskData[i][taskData.length - 1]));
      let arrayData = [];
      let j = 0;
      function renderInnerAuto(j){
        allInnerTasksAreDone = false;
        // console.log('RenderInnerAuto Running...');
        // console.log('taskData[i]',taskData[i]);
        
        if(typeof(taskData[i][j]) === 'string' && j < taskData[i].length){
          // console.log('completedTaskNames.length ',completedTaskNames.length )
          if(completedTaskNames.length === 0){
            // If it is the first time we are encountering the array of dependent tasks,
            // it is likely that we perform the first "Stringed" function given and 
            // perform a recursion to move on 
            tasks[taskData[i][j]]((err,...data) =>{
              if(err){
                return callback(err,null);
              } else{
                arrayData.splice(j,0,data);
                j++;
                renderInnerAuto(j);
              }
              
            })
          } else{
            completedTaskNames.forEach((item,index) =>{
              if(item === taskData[i][j]){
               // If its matched, then set up arrayData(pushing data) with 
               // last data filled from the previous task
               // this means it will setup with 0th position having data
               // from the previous task and let it recurse to finally
               // reach the callback function already present in the respective task
               arrayData.splice(j,0,completedTaskData[pushedCompletedTaskData - 1]);
               j++;
               renderInnerAuto(j);
              } else{
                // console.log('ITs NOT mATCHED')
                // If its not matched then 
                tasks[taskData[i][j]]((err,...data) =>{
                  if(err){
                    return callback(err,null);
                  } else{
                    arrayData.splice(j,0,data);
                    j++;
                    renderInnerAuto(j);
                  }
                })
              }
            })
          }
        } else {
          // All the dependent tasks are completed for respective task,
          // and now time for the main function i.e. callback to be executed
          // Eg. task3 : ['task1','task2',function(results,callback){}] <-- this last
          // function will take on here!!
          console.log('ArrayData',arrayData);
          taskData[i][j](arrayData,(err,...data)=>{
            if(err){
              return callback(err,null);
            } else{
             
              if(j === taskData[i].length - 1){
                if(totalTasksPresent - 1 === i){
                  // if task is the last one in the 'tasks' object then
                  // call middleware callback to pass final callback to client side
                  completedTaskNames.push(taskNames[i]);
                  setOfTasks[taskNames[i]] = data;
                  completedTaskData.push(data);
                  middlewareCallback(data);
                } else{
                  // If task is already done then simply
                  // trigger the counter(i.e. pushedCompletedTaskData)
                  // and also push taskData and taskName as part
                  // of completion for the future use
                  setOfTasks[taskNames[i]] = data;
                  completedTaskData.push(data);
                  pushedCompletedTaskData++;
                  completedTaskNames.push(taskNames[i]);
                  i++;
                  renderAuto(i)
                }
                
              } else {
                completedTaskData.splice(i,0,data);
                i++;
                renderAuto(i)
              }
            }
          })
        }
      }
      renderInnerAuto(j);
    }
  }
  renderAuto(i)
}
