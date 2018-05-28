## Using .every()

```js
every(['yes','yes','yes'],function(answer,callback){
    if(answer === 'yes'){
      callback(null, true)
    }
    else{
      var err = 'Error occurred'
      callback(null,false);
    }
},function(err,result){
    if(err){
        console.log('err: ',err);
    }
    else {
        console.log('Result : ',result)
    }
});
```

## Using .filter()

```js
filter(['file1','file2','file1'],function(path,callback){
  if(path !== 'file1'){
    setTimeout(function() {
        callback(null, true);
    }, 1000);
  } else{
    setTimeout(function() {
      var err = 'Error occurred'
      callback(err);
    }, 1000);
  }
},function(err,result){
  if(err){
      console.log('err: ',err);
  } else {
      console.log('Result : ',result)
  }
});
```


## Using .waterfall()

```js
waterfall([
    function(callback) {
        callback(null, 'yess');
    },
    function(arg, callback) {
      console.log('Use prevData 1',arg)
      var caption = 'works 0' 
      if(arg === 'yes'){
        callback(null, caption);
      } else{
        console.log('arg else',arg)
        var err = 'Some error occured in fn.2'
        callback(err, null);
      }
    },
    function(caption, callback) {
      console.log('Use prevData 2',caption)
      var caption = false;
      callback(null, caption);
    },
    function(bool, callback) {
      if(bool){
        console.log('Use prevData 3',bool)
        var caption = ' works 2!';
        callback(null, caption);
      } else{
        var err = 'Some error occured in fn.3'
        callback(err, null);
      }
      
    }
],function(err,results){
  console.log(err,results);
    if(err){
      console.log('ERR === ',err)
    }
    else{
      console.log('Return')
    }
});

```

## Using .auto()
```js
auto({
  get_data: function(callback) {
    console.log('in get_data');
    // async code to get some data
    
    setTimeout(function() {
      callback(null, 'data', 'converted to array');
    }, 3000);
  },
  make_folder: function(callback) {
    console.log('in make_folder');
    // async code to create a directory to store a file in
    // this is run at the same time as getting the data
    
    setTimeout(function() {
      callback(null, 'folder');
    }, 2000);
  },
  write_file: ['get_data', 'make_folder', function(results, callback) {
    console.log('in write_file', JSON.stringify(results));
    // once there is some data and the directory exists,
    // write the data to a file in the directory
    callback(null, 'filename');
  }],
  make_file: ['write_file', function(results, callback) {
    console.log('in make_file', JSON.stringify(results));
    // once there is some data and the directory exists,
    // write the data to a file in the directory
    callback(null, {'file':results, 'email':'user@example.com'});
  }]
}, function(err, results) {
  console.log('err = ', err);
  console.log('results = ', results);
});
```

### Using .each()
```js
var openFiles = ['dijkstra','prims','kruskal','bellman-ford']
// assuming openFiles is an array of file names
each(openFiles, function(file, callback) {

    // Perform operation on file here.
    console.log('Processing file ' + file);
    
    // Simulating async behaviour with setTimeout
    setTimeout(function(){
      if( file.length > 9 ) {
        console.log('This file name is too long',file);
        callback('File name too long');
      } else {
        // Do work to process file here
        console.log('File processed');
        callback();
      }
  },2000)
}, function(err) {
    // if any of the file processing produced an error, err would equal that error
    if( err ) {
      // One of the iterations produced an error.
      // All processing will now stop.
      console.log('A file(s) failed to process : ',err );
      return;
    } else {
      console.log('All files have been processed successfully');
    }
});
```


### Using .series()
```js
series([
  function(callback) {
      // do some stuff ...
      setTimeout(()=>{
        callback(null, 'one');
      },1000)
  },
  function(callback) {
    // do some stuff ...
    setTimeout(()=>{
      callback(null, 'two');
    },2000)
  },
  function(callback) {
      // do some more stuff ...
      callback(null, 'three');
  }
],
// optional callback
function(err, results) {
  if (err) console.log('Err:',err);
  else console.log('Results : ',results);
  // results is now equal to ['one', 'two']
});
```


### Using .parallelLimit()
```js
parallelLimit([
  function(callback) {
      setTimeout(function() {
          callback(null, 'one');
      }, 4200);
  },
  function(callback) {
      setTimeout(function() {
          callback(null, 'two');
      }, 200);
  },
  function(callback) {
    setTimeout(function() {
        callback(null, 'three');
    }, 4200);
  },
  function(callback) {
    setTimeout(function() {
        callback(null, 'four');
    }, 200);
  },
],2,
// optional callback
function(err, results) {
  if(err){
    console.log('Err',err);
    return;
  } else{
    console.log('Results ',results);
  }
});
```


