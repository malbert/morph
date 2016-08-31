var capFirst, lowerFirst, morphObj, toCamel, toDashed, toHuman, toSnake, toSnakeCaps, toTitle, toUpperCamel;

morphObj = function(input, caller, cap) {
  var i, inputItem, key, len, newArray, newObj, newValue, value;
  newObj = {};
  if (Array.isArray(input)) {
    newArray = [];
    for (i = 0, len = input.length; i < len; i++) {
      inputItem = input[i];
      newValue = caller(inputItem, cap);
      newArray.push(newValue);
    }
    return newArray;
  }
  for (key in input) {
    value = input[key];
    newObj[caller(key, cap)] = value;
    if (typeof value === 'object') {
      newValue = caller(value, cap);
    } else {
      newValue = value;
    }
    newObj[caller(key, cap)] = newValue;
  }
  return newObj;
};

capFirst = function(input) {
  return "" + (input[0].toUpperCase()) + (input.slice(1));
};

lowerFirst = function(input) {
  return "" + (input[0].toLowerCase()) + (input.slice(1));
};

toSnake = (function(_this) {
  return function(input, cap) {
    var output;
    if (typeof input === "object") {
      return morphObj(input, toSnake, cap);
    }
    output = input.replace(/([A-Z\d])([A-Z][a-z\d])/g, '$1_$2');
    output = output.replace(/([a-z\d])([A-Z])/g, '$1_$2');
    output = output.replace(/[-. ]/g, '_');
    output = output.toLowerCase();
    if (cap) {
      output = capFirst(output);
    }
    return output;
  };
})(this);

toSnakeCaps = (function(_this) {
  return function(input) {
    var output;
    if (typeof input === "object") {
      return morphObj(input, toSnakeCaps);
    }
    output = _this.toSnake(input);
    return output.toUpperCase();
  };
})(this);

toDashed = (function(_this) {
  return function(input, cap) {
    var output;
    if (typeof input === "object") {
      return morphObj(input, toDashed, cap);
    }
    output = input.replace(/([A-Z\d])([A-Z][a-z\d])/g, '$1-$2');
    output = output.replace(/([a-z\d])([A-Z])/g, '$1-$2');
    output = output.replace(/[_. ]/g, '-');
    output = output.toLowerCase();
    if (cap) {
      output = capFirst(output);
    }
    return output;
  };
})(this);

toCamel = (function(_this) {
  return function(input, cap) {
    var output;
    if (typeof input === "object") {
      return morphObj(input, toCamel, cap);
    }
    if (!input.match(/[a-z]/)) {
      input = input.toLowerCase();
    }
    output = input.replace(/([-_ .]+)([\w])/g, function(str) {
      return str[1].toUpperCase();
    });
    return output = cap ? capFirst(output) : lowerFirst(output);
  };
})(this);

toUpperCamel = function(input) {
  return toCamel(input, true);
};

toHuman = (function(_this) {
  return function(input, cap) {
    var output;
    if (cap == null) {
      cap = true;
    }
    if (typeof input === "object") {
      return morphObj(input, toHuman);
    }
    output = input.replace(/[-._]/g, ' ');
    output = output.replace(/([A-Z\d])([A-Z][a-z\d])/g, '$1 $2');
    output = output.replace(/([a-z])([A-Z])/g, '$1 $2');
    output = output.replace(/(\s([a-zA-Z])\s)/g, function(str, p1) {
      return "" + (p1.toLowerCase());
    });
    output = output.replace(/([A-Z])([a-z])/g, function(str, p1, p2) {
      return "" + (p1.toLowerCase()) + p2;
    });
    output = cap ? capFirst(output) : lowerFirst(output);
    return output;
  };
})(this);

toTitle = (function(_this) {
  return function(input) {
    var output;
    if (typeof input === "object") {
      return morphObj(input, toTitle);
    }
    output = toHuman(input);
    output = output.replace(/(\s)([a-z])/g, function(str, p1, p2) {
      return "" + p1 + (p2.toUpperCase());
    });
    return output;
  };
})(this);

module.exports.toSnake = toSnake;

module.exports.toSnakeCaps = toSnakeCaps;

module.exports.toDashed = toDashed;

module.exports.toCamel = toCamel;

module.exports.toUpperCamel = toUpperCamel;

module.exports.toHuman = toHuman;

module.exports.toTitle = toTitle;
