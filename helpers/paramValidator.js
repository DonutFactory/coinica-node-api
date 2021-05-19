const _ = require("lodash");

module.exports = (data) => {
  if (!_.isObject(data)) return {
    isValid: false,
    message: 'Invalid data (must be an object)'
  };

  let missingParams = []
  _.forEach(data, function(value, key) {
    if(_.isEmpty(value)) {
      missingParams.push(key)
    }
  });

  if (missingParams.length > 0) {
    return {
      isValid: false,
      message: `Missing or empty parameter/s: ${missingParams.join(",")}`
    }
  }

  return {
    isValid: true,
    message: 'valid'
  }
}
