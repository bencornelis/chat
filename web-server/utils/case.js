const R = require('ramda');
// Copied from https://github.com/Vincit/objection.js

// Super fast memoize for single argument functions.
function memoize(func) {
  const cache = new Map();

  return input => {
    let output = cache.get(input);

    if (output === undefined) {
      output = func(input);
      cache.set(input, output);
    }

    return output;
  };
}

// camelCase to snake_case converter that also works with
// non-ascii characters.
function snakeCase(str) {
  if (str.length === 0) {
    return str;
  }

  const upper = str.toUpperCase();
  const lower = str.toLowerCase();

  let out = lower[0];

  for (let i = 1, l = str.length; i < l; ++i) {
    const char = str[i];
    const prevChar = str[i - 1];

    const upperChar = upper[i];
    const prevUpperChar = upper[i - 1];

    const lowerChar = lower[i];
    const prevLowerChar = lower[i - 1];

    // Test if `char` is an upper-case character and that the character
    // actually has different upper and lower case versions.
    if (char === upperChar && upperChar !== lowerChar) {
      // Multiple consecutive upper case characters shouldn't add underscores.
      // For example "fooBAR" should be converted to "foo_bar".
      if (prevChar === prevUpperChar && prevUpperChar !== prevLowerChar) {
        out += lowerChar;
      } else {
        out += '_' + lowerChar;
      }
    } else {
      out += char;
    }
  }

  return out;
}

// snake_case to camelCase converter that simply reverses
// the actions done by `snakeCase` function.
function camelCase(str) {
  if (str.length === 0) {
    return str;
  }

  let out = str[0];

  for (let i = 1, l = str.length; i < l; ++i) {
    const char = str[i];
    const prevChar = str[i - 1];

    if (char !== '_') {
      if (prevChar === '_') {
        out += char.toUpperCase();
      } else {
        out += char;
      }
    }
  }

  return out;
}

// Returns a function that splits the inputs string into pieces using `separator`,
// only calls `mapper` for the last part and concatenates the string back together.
// If no separators are found, `mapper` is called for the entire string.
function mapLastPart(mapper, separator) {
  return str => {
    const idx = str.lastIndexOf(separator);
    const mapped = mapper(str.slice(idx + separator.length));
    return str.slice(0, idx + separator.length) + mapped;
  };
}

// Returns a function that takes an object as an input and maps the object's keys
// using `mapper`. If the input is not an object, the input is returned unchanged.
function keyMapper(mapper) {
  return obj => {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
      return obj;
    }

    const keys = Object.keys(obj);
    const out = {};

    for (let i = 0, l = keys.length; i < l; ++i) {
      const key = keys[i];
      out[mapper(key)] = obj[key];
    }

    return out;
  };
}

function snakeCaseMappers() {
  return {
    parse: keyMapper(memoize(camelCase)),
    format: keyMapper(memoize(snakeCase))
  };
}

function deleteNullValues(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  for (let key in obj) {
    if (obj[key] === null) {
      delete obj[key];
    }
  }

  return obj;
}

function convertDatesToStrings(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj;
  }

  return Object.keys(obj).reduce((acc, key) => {
    let val = obj[key];
    if (val instanceof Date) {
      val = val.toUTCString();
    }
    acc[key] = val;
    return acc;
  }, {});
}

function knexIdentifierMappers({ parse, format, idSeparator = ':' } = {}) {
  const formatId = memoize(mapLastPart(format, idSeparator));
  const parseId = memoize(mapLastPart(parse, idSeparator));
  const parseKeys = keyMapper(parseId);
  const transform = R.compose(deleteNullValues, convertDatesToStrings, parseKeys);

  return {
    wrapIdentifier(identifier, origWrap) {
      return origWrap(formatId(identifier));
    },

    postProcessResponse(result) {
      if (Array.isArray(result)) {
        const output = new Array(result.length);

        for (let i = 0, l = result.length; i < l; ++i) {
          output[i] = transform(result[i]);
        }

        return output;
      } else {
        return transform(result);
      }
    }
  };
}

function knexSnakeCaseMappers() {
  return knexIdentifierMappers({
    parse: camelCase,
    format: snakeCase
  });
}

function knexIdentifierMapping(colToProp) {
  const propToCol = Object.keys(colToProp).reduce((propToCol, column) => {
    propToCol[colToProp[column]] = column;
    return propToCol;
  }, {});

  return knexIdentifierMappers({
    parse: column => colToProp[column] || column,
    format: prop => propToCol[prop] || prop
  });
}

module.exports = {
  snakeCase,
  camelCase,
  snakeCaseMappers,
  knexSnakeCaseMappers,
  knexIdentifierMappers,
  knexIdentifierMapping,

  camelCaseKeys: keyMapper(memoize(camelCase)),
  snakeCaseKeys: keyMapper(memoize(snakeCase))
};
