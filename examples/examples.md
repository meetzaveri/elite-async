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


