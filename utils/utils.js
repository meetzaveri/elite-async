// a utility to check if given value is object or not
function isObject(o) {
  return o !== null && typeof o === 'object' && Array.isArray(o) === false;
}

module.exports = {isObject:isObject}
