# vanilla-async
With pure vanilla JS, I have been able to develop **[caolan's async](https://github.com/caolan/async)** library's some of the **most used** collections or control flow methods. It is not that sophisticated as caolan's async, but I have managed to scrape out core functionalities of respective collections/control-flow methods.I am looking to improve this repo by adding new methods especially using ES6's Async/await utility

## Collections/ Control-Flow methods 
#### Currently implemented
- [X] .parallel()
- [X] .every()
- [X] .waterfall()
- [X] .filter()
- [X] .auto()

#### Will implement
- [ ] .each()
- [ ] .reduceRight()

## Seeking what's behind the `.auto()` function
With help of this article - http://ketangupta.in/blog/development/2018/01/19/async-auto/ I came to know that it's that traditional DFS algorithm which pioneered this `.auto()` implementation.
#### Code
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
    // now produce file by having it
    callback(null, {'file':results, 'email':'user@example.com'});
  }]
}, function(err, results) {
  if(err) console.log('err = ', err);
  else console.log('results = ', results);
});
```
#### Overview of .auto()
![Imgur](https://i.imgur.com/XDFKjMU.png)

## Want to contribute
- Take out pull from development branch and start hacking

## Inspiration
I know callbacks and iterator functions were the wizards behind this, I just need to figure out what's behind the curtain. I started with pure vanilla JS to crack it up, so that I can implement on my own.

### Todo
- [ ] Improve Error handling
- [ ] Implement more common/most used 'async' collections
- [ ] More useful functions using ES6's async/await
