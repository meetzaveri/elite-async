function isObject(o) {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}

// a utility to check if given value is object or not
 module.exports = {isObject:isObject}