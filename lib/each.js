// .each() async implementation
module.exports = function(collection,iteratee,callback){
  let i = 0;
  var errorOccuredCounter = 0;
  var errorOccuredData = [];
  var errorMessage = null;

  // Middleware setup for achieving redudant callbacks to origin  
  function middlewareCallback(counter){
    while(counter === collection.length - 1){
      callback(null);
      return;
    }
  }

  // middleware Error Callback Handler to intercept mulitple callbacks going through
  function errorCallbackHandler(errData,counter){
    while(counter === collection.length - 1){
        var finalError = errData.join(',');
        callback(finalError);
        return;
    }
  }
  
  // main function for .each() operation
  function renderEach(){
    for (let index = 0; index < collection.length; index++) {
      const element = collection[index];

      // calling iteratee to execute tasks and provide necessary feedback and errors if
      iteratee(element,(err) =>{

        if(index === collection.length - 1){
          if(err || errorOccuredData.length > 0){
            errorMessage = err;
            errorOccuredData.push(element);
            errorCallbackHandler(errorOccuredData,index);
          } else{
            middlewareCallback(index);
          }
        } else{
            if(err){
              errorMessage = err;

              // gathering name of the elements from array causing errors 
              errorOccuredData.push(element);

              // to avoid multiple callbacks, errorCallbackHandler utility acts as middleware
              errorCallbackHandler(errorOccuredData,index);
            } else{
              middlewareCallback(index);
            }
        }
        
      })
    }
  }
  renderEach();
}