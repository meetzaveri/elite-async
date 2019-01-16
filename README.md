# elite-async

**Zero dependencies, pure vanilla, slim and compact set of async utilities:wrench:**

## Elite set of async utilities
This is a small library targets implementing async collections/control-flow functions created with pure vanilla js. This library contains some of the most used control-flow methods which can be used in performing async operations. I am looking to improve this repo by adding new methods especially using ES6's Async/await utility.

**_NOTE: There are only few async functions available in this repository(which are basically mainstream/common in caolan's), and I will develop more async functions by the time goes. I have not checked extreme/complex test cases as I was just hacking around build this on my own. So shoot out those test cases by creating ISSUE_**


## Documentation:

I have listed documentation under the wiki section - https://github.com/meetzaveri/elite-async/wiki

## Installation

[![NPM version](https://img.shields.io/badge/npm-1.1.1-brightgreen.svg)](https://www.npmjs.com/package/elite-async)

**Using npm:**

```
npm install elite-async --save or npm i elite-async
```

**Usage**

```js
const vanillaAsync = require("elite-async");

// .parallel() example
vanillaAsync.parallel(
  [
    function(callback) {
      setTimeout(function() {
        callback(null, "one");
      }, 3200);
    },
    function(callback) {
      setTimeout(function() {
        callback(null, "two");
      }, 200);
    },
    function(callback) {
      setTimeout(function() {
        callback(null, "three");
      }, 6000);
    },
    function(callback) {
    let someCondition = true;
      if (someCondition) {
        setTimeout(function() {
          callback(null, "four");
        }, 200);
      } else {
        setTimeout(function() {
          var err = "Some Error Occured";
          callback(err);
        }, 1000);
      }
    }
  ],
  // optional callback
  function(err, results) {
    if (err) {
      console.log("Err", err);
      return;
    } else {
      console.log("Results ", results);
    }
  }
);
```

## Collections/ Control-Flow methods

#### Currently implemented

- [x] .parallel()
- [x] .every()
- [x] .waterfall()
- [x] .filter()
- [x] .auto()
- [x] .each()
- [x] .series()

## Why should I use this (instead of caolan's `async` package)?

### Assumption
Whether you are building production level app or development level(side project) app, **what if you only need one or two method(s)** from caolan's async package ? 
The downside of this is that your final bundle will take whole caolan's async library(95% of you don't need it) which would potentially affect performance, possesing unnecessary garbage code, etc...

[Addy osmani](https://addyosmani.com/blog/performance-budgets/) talks about having a larger package in your app and using only 5% of it would make final bundle more bloated. His preference about having minified modules(small libraries) with abstracting bigger parts from a package is a good way to remove whole package dependency.

### Will your app scale in future with more async methods ?
But if your app will need those unused async utilities(control flow methods) in future as your app scales, then it's probably better choice of using caolan's async for production ready apps. 

## Trivia
[Take a look at trivia here](https://github.com/meetzaveri/elite-async/wiki/Trivia)

## Want to contribute
- Take out pull from development branch and start hacking

## Motivation
What if I only need one or two methods of caolan's async throughout my app ? Then it's like bundling whole async module which contains unnecessary code as it is only 5% is utilized in my app and rest 95%(of the library) makes garbage code. 

Then why not make a abstracted version of async or elite set of async utilities as containing most used/common methods.
Knowing callbacks and iterator functions were the wizards behind this, I just needed to figure out what's behind the curtain. I started with pure vanilla JS to crack it up, so that I can implement on my own.

### Todo

- [ ] Improve Error handling
- [ ] More useful functions using ES6's async/await
