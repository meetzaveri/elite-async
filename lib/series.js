var utils = require('../utils/utils');
// .filter() async implementation
module.exports = function(tasks,callback) {
  let  i = 0;
  let totalTasksPresent = 0;
  // In case if tasks is an object data structure, 
  // just to calculate tasks present in the 'tasks' object
  for(var key in tasks){
    totalTasksPresent++
  }

  if(Array.isArray(tasks)){
    /* IF TASK's DATA STRUCTURE IS ARRAY */
    let results = [];
    // function to push results into arrayOfResults and do recursion
    function pushResultAndRecurse(result){
      
      if(i === tasks.length - 1 ){
        results.push(result);
        return callback(null,results);
      } else{
        i++;
        results.push(result);
        renderSeries(i);
      }
    }

    // Main function for rendering functions into series control-flow
    function renderSeries(i){
      tasks[i]((err,data)=>{
        if(err){
          callback(err,null);
        } else{
          pushResultAndRecurse(data);
        }
      })  
    }
    renderSeries(i);
    
  } else if(utils.isObject(tasks)){
    /* IF TASK's DATA STRUCTURE IS OBJECT */
    var resultantObj = {};
    var keys = Object.keys(tasks);

    // function to appending results(in case if its object) into arrayOfResults and do recursion
    function appendResultAndRecurse(taskName,result){
      if(i === totalTasksPresent - 1 ){
        resultantObj[taskName] = result
        return callback(null,resultantObj);
      } else{
        i++;
        resultantObj[taskName] = result
        renderSeries(i);
      }
    }

    // Main function for rendering functions into series control-flow
    function renderSeries(i){
      tasks[keys[i]]((err,data)=>{
        if(err){
          callback(err,null);
        } else{
          var taskName = keys[i];
          appendResultAndRecurse(taskName,data);
        }
      })  
    }
    renderSeries(i);
  } else{
    var err = 'Invalid tasks. Should be of Array or Object'
    console.log('Err:',err)
  }
  
}