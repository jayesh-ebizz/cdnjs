'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const _isArray = Array.isArray;

function type(input) {
  const typeOf = typeof input;

  if (input === null) {
    return 'Null';
  } else if (input === undefined) {
    return 'Undefined';
  } else if (typeOf === 'boolean') {
    return 'Boolean';
  } else if (typeOf === 'number') {
    return Number.isNaN(input) ? 'NaN' : 'Number';
  } else if (typeOf === 'string') {
    return 'String';
  } else if (_isArray(input)) {
    return 'Array';
  } else if (input instanceof RegExp) {
    return 'RegExp';
  }

  const asStr = input && input.toString ? input.toString() : '';
  if (['true', 'false'].includes(asStr)) return 'Boolean';
  if (!Number.isNaN(Number(asStr))) return 'Number';
  if (asStr.startsWith('async')) return 'Async';
  if (asStr === '[object Promise]') return 'Promise';
  if (typeOf === 'function') return 'Function';
  if (input instanceof String) return 'String';
  return 'Object';
}

function isTruthy(x) {
  if (_isArray(x)) {
    return x.length > 0;
  }

  if (type(x) === 'Object') {
    return Object.keys(x).length > 0;
  }

  return Boolean(x);
}

function allFalse(...inputs) {
  let counter = 0;

  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (isTruthy(x())) {
        return false;
      }
    } else if (isTruthy(x)) {
      return false;
    }

    counter++;
  }

  return true;
}

function isFalsy(x) {
  if (_isArray(x)) {
    return x.length === 0;
  }

  if (type(x) === 'Object') {
    return Object.keys(x).length === 0;
  }

  return !x;
}

function allTrue(...inputs) {
  let counter = 0;

  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (isFalsy(x())) {
        return false;
      }
    } else if (isFalsy(x)) {
      return false;
    }

    counter++;
  }

  return true;
}

function allType(targetType) {
  return (...inputs) => {
    let counter = 0;

    while (counter < inputs.length) {
      if (type(inputs[counter]) !== targetType) {
        return false;
      }

      counter++;
    }

    return true;
  };
}

function anyFalse(...inputs) {
  let counter = 0;

  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (isFalsy(x())) {
        return true;
      }
    } else if (isFalsy(x)) {
      return true;
    }

    counter++;
  }

  return false;
}

function anyTrue(...inputs) {
  let counter = 0;

  while (counter < inputs.length) {
    const x = inputs[counter];

    if (type(x) === 'Function') {
      if (isTruthy(x())) {
        return true;
      }
    } else if (isTruthy(x)) {
      return true;
    }

    counter++;
  }

  return false;
}

function anyType(targetType) {
  return (...inputs) => {
    let counter = 0;

    while (counter < inputs.length) {
      if (type(inputs[counter]) === targetType) {
        return true;
      }

      counter++;
    }

    return false;
  };
}

const FUNC_ERROR_TEXT = 'Expected a function';
const HASH_UNDEFINED = '__lodash_hash_undefined__';
const INFINITY = 1 / 0,
      MAX_SAFE_INTEGER = 9007199254740991;
const funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      symbolTag = '[object Symbol]';
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reEscapeChar = /\\(\\)?/g;
const reIsHostCtor = /^\[object .+?Constructor\]$/;
const reIsUint = /^(?:0|[1-9]\d*)$/;
const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
const freeSelf = typeof self === 'object' && self && self.Object === Object && self;
const root = freeGlobal || freeSelf || Function('return this')();

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

function isHostObject(value) {
  let result = false;

  if (value != null && typeof value.toString !== 'function') {
    try {
      result = Boolean(String(value));
    } catch (e) {}
  }

  return result;
}

const arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;
const coreJsData = root['__core-js_shared__'];

const maskSrcKey = function () {
  const uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();

const funcToString = funcProto.toString;
const {
  hasOwnProperty
} = objectProto;
const objectToString = objectProto.toString;
const reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
const {
  Symbol: Symbol$1
} = root,
      {
  splice
} = arrayProto;
const Map = getNative(root, 'Map'),
      nativeCreate = getNative(Object, 'create');
const symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

function Hash(entries) {
  let index = -1,
      length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

function hashGet(key) {
  const data = this.__data__;

  if (nativeCreate) {
    const result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

function hashHas(key) {
  const data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

function hashSet(key, value) {
  const data = this.__data__;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

Hash.prototype.clear = hashClear;
Hash.prototype.delete = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function ListCache(entries) {
  let index = -1;
  const length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function listCacheClear() {
  this.__data__ = [];
}

function listCacheDelete(key) {
  const data = this.__data__,
        index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  const lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  return true;
}

function listCacheGet(key) {
  const data = this.__data__,
        index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
  const data = this.__data__,
        index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

ListCache.prototype.clear = listCacheClear;
ListCache.prototype.delete = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

function MapCache(entries) {
  let index = -1;
  const length = entries ? entries.length : 0;
  this.clear();

  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash()
  };
}

function mapCacheDelete(key) {
  return getMapData(this, key).delete(key);
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

MapCache.prototype.clear = mapCacheClear;
MapCache.prototype.delete = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

function assignValue(object, key, value) {
  const objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    object[key] = value;
  }
}

function assocIndexOf(array, key) {
  let {
    length
  } = array;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  const pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }

  path = isKey(path, object) ? [path] : castPath(path);
  let index = -1;
  let nested = object;
  const {
    length
  } = path;
  const lastIndex = length - 1;

  while (nested != null && ++index < length) {
    let key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      const objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
      }
    }

    assignValue(nested, key, newValue);
    nested = nested[key];
  }

  return object;
}

function baseToString(value) {
  if (typeof value === 'string') {
    return value;
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  const result = String(value);
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

function getMapData(map, key) {
  const data = map.__data__;
  return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}

function getNative(object, key) {
  const value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return Boolean(length) && (typeof value === 'number' || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  const type = typeof value;

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

function isKeyable(value) {
  const type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

function isMasked(func) {
  return Boolean(maskSrcKey) && maskSrcKey in func;
}

var stringToPath = memoize(string => {
  string = toString(string);
  const result = [];

  if (reLeadingDot.test(string)) {
    result.push('');
  }

  string.replace(rePropName, (match, number, quote, string) => {
    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value;
  }

  const result = String(value);
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return String(func);
    } catch (e) {}
  }

  return '';
}

function memoize(func, resolver) {
  if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function () {
    const args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          {
      cache
    } = memoized;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };

  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}

memoize.Cache = MapCache;

function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var {
  isArray
} = Array;

function isFunction(value) {
  const tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

function isObject(value) {
  const type = typeof value;
  return Boolean(value) && (type == 'object' || type == 'function');
}

function isObjectLike(value) {
  return Boolean(value) && typeof value === 'object';
}

function isSymbol(value) {
  return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

function toString(value) {
  return value == null ? '' : baseToString(value);
}

function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

function whenObject(predicate, input) {
  const yes = {};
  const no = {};
  Object.entries(input).forEach(([prop, value]) => {
    if (predicate(value, prop)) {
      yes[prop] = value;
    } else {
      no[prop] = value;
    }
  });
  return [yes, no];
}

function partition(predicate, input) {
  if (arguments.length === 1) {
    return listHolder => partition(predicate, listHolder);
  }

  if (!_isArray(input)) return whenObject(predicate, input);
  const yes = [];
  const no = [];
  let counter = -1;

  while (counter++ < input.length - 1) {
    if (predicate(input[counter], counter)) {
      yes.push(input[counter]);
    } else {
      no.push(input[counter]);
    }
  }

  return [yes, no];
}

const isObject$1 = x => {
  const ok = x !== null && !_isArray(x) && typeof x === 'object';

  if (!ok) {
    return false;
  }

  return Object.keys(x).length > 0;
};

function change(origin, pathRaw, rules) {
  const willReturn = JSON.parse(JSON.stringify(origin));

  if (!isObject$1(rules)) {
    set(willReturn, pathRaw, rules);
    return willReturn;
  }

  const path = pathRaw === '' ? '' : `${pathRaw}.`;

  for (const ruleKey of Object.keys(rules)) {
    const rule = rules[ruleKey];

    if (!isObject$1(rule)) {
      set(willReturn, `${path}${ruleKey}`, rule);
      continue;
    }

    const [withObjects, withoutObjects] = partition(subruleKey => isObject$1(rule[subruleKey]), Object.keys(rule));
    withoutObjects.forEach(subruleKey => {
      const subrule = rule[subruleKey];
      set(willReturn, `${path}${ruleKey}.${subruleKey}`, subrule);
    });
    withObjects.forEach(subruleKey => {
      const subrule = rule[subruleKey];
      Object.keys(subrule).forEach(deepKey => {
        const deep = rule[subruleKey][deepKey];

        if (!isObject$1(deep)) {
          return set(willReturn, `${path}${ruleKey}.${subruleKey}.${deepKey}`, deep);
        }

        Object.keys(deep).forEach(superDeepKey => {
          const superDeep = rule[subruleKey][deepKey][superDeepKey];
          set(willReturn, `${path}${ruleKey}.${subruleKey}.${deepKey}.${superDeepKey}`, superDeep);
        });
      });
    });
  }

  return willReturn;
}

function parseError(maybeError) {
  const typeofError = maybeError.__proto__.toString();

  if (!['Error', 'TypeError'].includes(typeofError)) return [];
  return [typeofError, maybeError.message];
}

function parseDate(maybeDate) {
  if (!maybeDate.toDateString) return [false];
  return [true, maybeDate.getTime()];
}

function parseRegex(maybeRegex) {
  if (maybeRegex.constructor !== RegExp) return [false];
  return [true, maybeRegex.toString()];
}

function equals(a, b) {
  if (arguments.length === 1) return _b => equals(a, _b);
  const aType = type(a);
  if (aType !== type(b)) return false;
  if (['NaN', 'Undefined', 'Null'].includes(aType)) return true;

  if (aType === 'Number') {
    if (Object.is(-0, a) !== Object.is(-0, b)) return false;
    return a.toString() === b.toString();
  }

  if (['String', 'Boolean'].includes(aType)) {
    return a.toString() === b.toString();
  }

  if (aType === 'Array') {
    const aClone = Array.from(a);
    const bClone = Array.from(b);

    if (aClone.toString() !== bClone.toString()) {
      return false;
    }

    let loopArrayFlag = true;
    aClone.forEach((aCloneInstance, aCloneIndex) => {
      if (loopArrayFlag) {
        if (aCloneInstance !== bClone[aCloneIndex] && !equals(aCloneInstance, bClone[aCloneIndex])) {
          loopArrayFlag = false;
        }
      }
    });
    return loopArrayFlag;
  }

  const aRegex = parseRegex(a);
  const bRegex = parseRegex(b);

  if (aRegex[0]) {
    return bRegex[0] ? aRegex[1] === bRegex[1] : false;
  } else if (bRegex[0]) return false;

  const aDate = parseDate(a);
  const bDate = parseDate(b);

  if (aDate[0]) {
    return bDate[0] ? aDate[1] === bDate[1] : false;
  } else if (bDate[0]) return false;

  const aError = parseError(a);
  const bError = parseError(b);

  if (aError[0]) {
    return bError[0] ? aError[0] === bError[0] && aError[1] === bError[1] : false;
  }

  if (aType === 'Object') {
    const aKeys = Object.keys(a);

    if (aKeys.length !== Object.keys(b).length) {
      return false;
    }

    let loopObjectFlag = true;
    aKeys.forEach(aKeyInstance => {
      if (loopObjectFlag) {
        const aValue = a[aKeyInstance];
        const bValue = b[aKeyInstance];

        if (aValue !== bValue && !equals(aValue, bValue)) {
          loopObjectFlag = false;
        }
      }
    });
    return loopObjectFlag;
  }

  return false;
}

const forbidden = ['Null', 'Undefined', 'RegExp'];
const allowed = ['Number', 'Boolean'];
const notEmpty = ['Array', 'String'];
function compact(list) {
  const toReturn = [];
  list.forEach(a => {
    const currentType = type(a);
    if (forbidden.includes(currentType)) return;
    if (allowed.includes(currentType)) return toReturn.push(a);

    if (currentType === 'Object') {
      if (!equals(a, {})) toReturn.push(a);
      return;
    }

    if (!notEmpty.includes(currentType)) return;
    if (a.length === 0) return;
    toReturn.push(a);
  });
  return toReturn;
}

function composeAsync(...inputArguments) {
  return async function (startArgument) {
    let argumentsToPass = startArgument;

    while (inputArguments.length !== 0) {
      const fn = inputArguments.pop();
      const typeFn = type(fn);

      if (typeFn === 'Async') {
        argumentsToPass = await fn(argumentsToPass);
      } else {
        argumentsToPass = fn(argumentsToPass);
      }
    }

    return argumentsToPass;
  };
}

function count(searchFor, list) {
  if (arguments.length === 1) {
    return _list => count(searchFor, _list);
  }

  if (!_isArray(list)) return 0;
  return list.filter(x => equals(x, searchFor)).length;
}

function debounce(func, ms, immediate = false) {
  let timeout;
  return function (...input) {
    const later = function () {
      timeout = null;

      if (!immediate) {
        func.apply(null, input);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);

    if (callNow) {
      func.apply(null, input);
    }
  };
}

const DELAY = 'RAMBDAX_DELAY';
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(DELAY);
    }, ms);
  });
}

function filterObject(fn, obj) {
  const willReturn = {};

  for (const prop in obj) {
    if (fn(obj[prop], prop, obj)) {
      willReturn[prop] = obj[prop];
    }
  }

  return willReturn;
}

function filter(predicate, list) {
  if (arguments.length === 1) return _list => filter(predicate, _list);
  if (!list) return [];

  if (!_isArray(list)) {
    return filterObject(predicate, list);
  }

  let index = 0;
  const len = list.length;
  const willReturn = [];

  while (index < len) {
    const value = list[index];

    if (predicate(value, index)) {
      willReturn.push(value);
    }

    index++;
  }

  return willReturn;
}

async function mapAsyncFn(fn, arr) {
  if (_isArray(arr)) {
    const willReturn = [];
    let i = 0;

    for (const a of arr) {
      willReturn.push(await fn(a, i++));
    }

    return willReturn;
  }

  const willReturn = {};

  for (const prop in arr) {
    willReturn[prop] = await fn(arr[prop], prop);
  }

  return willReturn;
}

function mapAsync(fn, arr) {
  if (arguments.length === 1) {
    return async holder => mapAsyncFn(fn, holder);
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve).catch(reject);
  });
}

function filterAsync(predicate, listOrObject) {
  if (arguments.length === 1) {
    return async holder => filterAsync(predicate, holder);
  }

  return new Promise((resolve, reject) => {
    mapAsync(predicate, listOrObject).then(predicateResult => {
      if (_isArray(predicateResult)) {
        const filtered = listOrObject.filter((_, i) => predicateResult[i]);
        return resolve(filtered);
      }

      const filtered = filter((_, prop) => predicateResult[prop], listOrObject);
      return resolve(filtered);
    }).catch(reject);
  });
}

function merge(target, newProps) {
  if (arguments.length === 1) return _newProps => merge(target, _newProps);
  return Object.assign({}, target || {}, newProps || {});
}

function pick(propsToPick, input) {
  if (arguments.length === 1) return _input => pick(propsToPick, _input);

  if (input === null || input === undefined) {
    return undefined;
  }

  const keys = typeof propsToPick === 'string' ? propsToPick.split(',') : propsToPick;
  const willReturn = {};
  let counter = 0;

  while (counter < keys.length) {
    if (keys[counter] in input) {
      willReturn[keys[counter]] = input[keys[counter]];
    }

    counter++;
  }

  return willReturn;
}

let holder = {};
function getter(key) {
  const typeKey = type(key);
  if (typeKey === 'String') return holder[key];
  if (typeKey === 'Array') return pick(key, holder);
  return holder;
}
function setter(maybeKey, maybeValue) {
  const typeKey = type(maybeKey);
  const typeValue = type(maybeValue);

  if (typeKey === 'String') {
    if (typeValue === 'Function') {
      return holder[maybeKey] = maybeValue(holder[maybeKey]);
    }

    return holder[maybeKey] = maybeValue;
  }

  if (typeKey !== 'Object') return;
  holder = merge(holder, maybeKey);
}
function reset() {
  holder = {};
}

function glue(input, glueChar) {
  return input.split('\n').filter(x => x.trim().length > 0).map(x => x.trim()).join(glueChar === undefined ? ' ' : glueChar);
}

function createThenable(fn) {
  return async function (...input) {
    return fn(...input);
  };
}

function ifElseAsync(condition, ifFn, elseFn) {
  return (...inputs) => new Promise((resolve, reject) => {
    const conditionPromise = createThenable(condition);
    const ifFnPromise = createThenable(ifFn);
    const elseFnPromise = createThenable(elseFn);
    conditionPromise(...inputs).then(conditionResult => {
      const promised = conditionResult === true ? ifFnPromise : elseFnPromise;
      promised(...inputs).then(resolve).catch(reject);
    }).catch(reject);
  });
}

const escapeSpecialCharacters = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

const getOccurances = input => input.match(/{{\s*.+?\s*}}/g);

const getOccuranceProp = occurance => occurance.replace(/{{\s*|\s*}}/g, '');

const replace = ({
  inputHolder,
  prop,
  replacer
}) => inputHolder.replace(new RegExp(`{{\\s*${escapeSpecialCharacters(prop)}\\s*}}`), replacer);

function interpolate(input, templateInput) {
  if (arguments.length === 1) {
    return _templateInput => interpolate(input, _templateInput);
  }

  const occurances = getOccurances(input);
  if (occurances === null) return input;
  let inputHolder = input;

  for (const occurance of occurances) {
    const prop = getOccuranceProp(occurance);

    try {
      const replacer = new Function('templateInput', `with(templateInput) { return ${prop} }`)(templateInput);
      inputHolder = replace({
        inputHolder,
        prop,
        replacer
      });
    } catch (e) {}
  }

  return inputHolder;
}

function isFunction$1(fn) {
  return ['Async', 'Function'].includes(type(fn));
}

function isPromise(x) {
  return ['Async', 'Promise'].includes(type(x));
}

function isType(xType, x) {
  if (arguments.length === 1) {
    return xHolder => isType(xType, xHolder);
  }

  return type(x) === xType;
}

function all(predicate, list) {
  if (arguments.length === 1) return _list => all(predicate, _list);

  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i], i)) return false;
  }

  return true;
}

function any(predicate, list) {
  if (arguments.length === 1) return _list => any(predicate, _list);
  let counter = 0;

  while (counter < list.length) {
    if (predicate(list[counter], counter)) {
      return true;
    }

    counter++;
  }

  return false;
}

function includes(valueToFind, input) {
  if (arguments.length === 1) return _input => includes(valueToFind, _input);

  if (typeof input === 'string') {
    return input.includes(valueToFind);
  }

  if (!_isArray(input)) return false;
  let index = -1;

  while (++index < input.length) {
    if (equals(input[index], valueToFind)) {
      return true;
    }
  }

  return false;
}

function baseSlice(array, start, end) {
  let index = -1;
  let {
    length
  } = array;
  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  const result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function init(listOrString) {
  if (typeof listOrString === 'string') return listOrString.slice(0, -1);
  return listOrString.length ? baseSlice(listOrString, 0, -1) : [];
}

function test(pattern, str) {
  if (arguments.length === 1) return _str => test(pattern, _str);

  if (typeof pattern === 'string') {
    throw new TypeError(`‘test’ requires a value of type RegExp as its first argument; received "${pattern}"`);
  }

  return str.search(pattern) !== -1;
}

function toLower(str) {
  return str.toLowerCase();
}

function isPrototype(input) {
  const currentPrototype = input.prototype;
  const list = [Number, String, Boolean, Promise];
  let toReturn = false;
  let counter = -1;

  while (++counter < list.length && !toReturn) {
    if (currentPrototype === list[counter].prototype) toReturn = true;
  }

  return toReturn;
}
function prototypeToString(input) {
  const currentPrototype = input.prototype;
  const list = [Number, String, Boolean, Promise];
  const translatedList = ['Number', 'String', 'Boolean', 'Promise'];
  let found;
  let counter = -1;

  while (++counter < list.length) {
    if (currentPrototype === list[counter].prototype) found = counter;
  }

  return translatedList[found];
}
const typesWithoutPrototype = ['any', 'promise', 'async', 'function'];
function fromPrototypeToString(rule) {
  if (_isArray(rule) || rule === undefined || rule === null || rule.prototype === undefined || typesWithoutPrototype.includes(rule)) {
    return {
      rule,
      parsed: false
    };
  }

  if (String.prototype === rule.prototype) {
    return {
      rule: 'string',
      parsed: true
    };
  }

  if (Boolean.prototype === rule.prototype) {
    return {
      rule: 'boolean',
      parsed: true
    };
  }

  if (Number.prototype === rule.prototype) {
    return {
      rule: 'number',
      parsed: true
    };
  }

  return {
    rule: type(rule.prototype).toLowerCase(),
    parsed: true
  };
}

function getRuleAndType(schema, requirementRaw) {
  const ruleRaw = schema[requirementRaw];
  const typeIs = type(ruleRaw);
  const {
    rule,
    parsed
  } = fromPrototypeToString(ruleRaw);
  return {
    rule: rule,
    ruleType: parsed ? 'String' : typeIs
  };
}

function isValid({
  input,
  schema
}) {
  if (input === undefined || schema === undefined) return false;
  let flag = true;

  const boom = boomFlag => {
    if (!boomFlag) {
      flag = false;
    }
  };

  for (const requirementRaw in schema) {
    if (flag) {
      const isOptional = requirementRaw.endsWith('?');
      const requirement = isOptional ? init(requirementRaw) : requirementRaw;
      const {
        rule,
        ruleType
      } = getRuleAndType(schema, requirementRaw);
      const inputProp = input[requirement];
      const inputPropType = type(input[requirement]);
      const ok = isOptional && inputProp !== undefined || !isOptional;
      if (!ok || rule === 'any' && inputProp != null || rule === inputProp) continue;

      if (ruleType === 'Object') {
        const isValidResult = isValid({
          input: inputProp,
          schema: rule
        });
        boom(isValidResult);
      } else if (ruleType === 'String') {
        boom(toLower(inputPropType) === rule);
      } else if (typeof rule === 'function') {
        boom(rule(inputProp));
      } else if (ruleType === 'Array' && inputPropType === 'String') {
        boom(includes(inputProp, rule));
      } else if (ruleType === 'Array' && rule.length === 1 && inputPropType === 'Array') {
        const [currentRule] = rule;
        const currentRuleType = type(currentRule);
        boom(currentRuleType === 'String' || currentRuleType === 'Object' || isPrototype(currentRule));

        if (currentRuleType === 'Object' && flag) {
          const isValidResult = all(inputPropInstance => isValid({
            input: inputPropInstance,
            schema: currentRule
          }), inputProp);
          boom(isValidResult);
        } else if (flag) {
          const actualRule = currentRuleType === 'String' ? currentRule : prototypeToString(currentRule);
          const isInvalidResult = any(inputPropInstance => type(inputPropInstance).toLowerCase() !== actualRule.toLowerCase(), inputProp);
          boom(!isInvalidResult);
        }
      } else if (ruleType === 'RegExp' && inputPropType === 'String') {
        boom(test(rule, inputProp));
      } else {
        boom(false);
      }
    }
  }

  return flag;
}

const _keys = Object.keys;

function forEach(fn, list) {
  if (arguments.length === 1) return _list => forEach(fn, _list);

  if (list === undefined) {
    return;
  }

  if (_isArray(list)) {
    let index = 0;
    const len = list.length;

    while (index < len) {
      fn(list[index], index, list);
      index++;
    }
  } else {
    let index = 0;

    const keys = _keys(list);

    const len = keys.length;

    while (index < len) {
      const key = keys[index];
      fn(list[key], key, list);
      index++;
    }
  }

  return list;
}

async function isValidAsync({
  schema,
  input
}) {
  const asyncSchema = {};
  const simpleSchema = {};
  forEach((rule, prop) => {
    if (isPromise(rule)) {
      asyncSchema[prop] = rule;
    } else {
      simpleSchema[prop] = rule;
    }
  }, schema);
  if (Object.keys(asyncSchema).length === 0) return isValid({
    input,
    schema
  });
  if (!isValid({
    input,
    schema: simpleSchema
  })) return false;
  let toReturn = true;

  for (const singleRuleProp in asyncSchema) {
    if (toReturn) {
      const validated = await asyncSchema[singleRuleProp](input[singleRuleProp]);
      if (!validated) toReturn = false;
    }
  }

  return toReturn;
}

function curry(fn, args = []) {
  return (..._args) => (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
}

const Const = x => ({
  x,
  map: fn => Const(x)
});

function view(lens, target) {
  if (arguments.length === 1) return _target => view(lens, _target);
  return lens(Const)(target).x;
}

function lensEqFn(lens, target, input) {
  return equals(view(lens, input), target);
}

const lensEq = curry(lensEqFn);

function lensSatisfiesFn(predicate, lens, input) {
  return Boolean(predicate(view(lens, input)));
}

const lensSatisfies = curry(lensSatisfiesFn);

async function mapFastAsyncFn(fn, arr) {
  const promised = arr.map((a, i) => fn(a, i));
  return Promise.all(promised);
}
function mapFastAsync(fn, arr) {
  if (arguments.length === 1) {
    return async holder => mapFastAsyncFn(fn, holder);
  }

  return new Promise((resolve, reject) => {
    mapFastAsyncFn(fn, arr).then(resolve).catch(reject);
  });
}

function splitEvery(sliceLength, listOrString) {
  if (arguments.length === 1) {
    return _listOrString => splitEvery(sliceLength, _listOrString);
  }

  if (sliceLength < 1) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  const willReturn = [];
  let counter = 0;

  while (counter < listOrString.length) {
    willReturn.push(listOrString.slice(counter, counter += sliceLength));
  }

  return willReturn;
}

async function mapAsyncLimit(iterable, limit, list) {
  if (list.length < limit) return mapFastAsync(iterable, list);
  const slices = splitEvery(limit, list);
  let toReturn = [];

  for (const slice of slices) {
    const iterableResult = await mapFastAsyncFn(iterable, slice);
    toReturn = [...toReturn, ...iterableResult];
  }

  return toReturn;
}

function mapKeys(changeKeyFn, obj) {
  if (arguments.length === 1) return _obj => mapKeys(changeKeyFn, _obj);
  const toReturn = {};
  Object.keys(obj).forEach(prop => toReturn[changeKeyFn(prop)] = obj[prop]);
  return toReturn;
}

function map(fn, list) {
  if (arguments.length === 1) return _list => map(fn, _list);

  if (list === undefined) {
    return [];
  }

  if (_isArray(list)) {
    let index = 0;
    const len = list.length;
    const willReturn = Array(len);

    while (index < len) {
      willReturn[index] = fn(list[index], index, list);
      index++;
    }

    return willReturn;
  }

  let index = 0;

  const keys = _keys(list);

  const len = keys.length;
  const willReturn = {};

  while (index < len) {
    const key = keys[index];
    willReturn[key] = fn(list[key], key, list);
    index++;
  }

  return willReturn;
}

function mergeAll(arr) {
  let willReturn = {};
  map(val => {
    willReturn = merge(willReturn, val);
  }, arr);
  return willReturn;
}

function schemaToString(schema) {
  if (type(schema) !== 'Object') {
    return fromPrototypeToString(schema).rule;
  }

  return map(x => {
    const {
      rule,
      parsed
    } = fromPrototypeToString(x);
    const xType = type(x);
    if (xType === 'Function' && !parsed) return 'Function';
    return parsed ? rule : xType;
  }, schema);
}
function check(singleInput, schema) {
  return isValid({
    input: {
      singleInput
    },
    schema: {
      singleInput: schema
    }
  });
}
function ok(...inputs) {
  return (...schemas) => {
    let failedSchema;
    const anyError = any((singleInput, i) => {
      const schema = schemas[i] === undefined ? schemas[0] : schemas[i];
      const checked = check(singleInput, schema);

      if (!checked) {
        failedSchema = JSON.stringify({
          input: singleInput,
          schema: schemaToString(schema)
        });
      }

      return !checked;
    }, inputs);

    if (anyError) {
      const errorMessage = inputs.length > 1 ? glue(`
        Failed R.ok -
        reason: ${failedSchema}
        all inputs: ${JSON.stringify(inputs)}
        all schemas: ${JSON.stringify(schemas.map(schemaToString))}
      `, '\n') : `Failed R.ok - ${failedSchema}`;
      throw new Error(errorMessage);
    }
  };
}

function mapToObject(fn, list) {
  if (arguments.length === 1) {
    return listHolder => mapToObject(fn, listHolder);
  }

  ok(type(fn), type(list))('Function', 'Array');
  return mergeAll(map(fn, list));
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

async function mapToObjectAsync(fn, list) {
  let toReturn = {};

  const innerIterable = async x => {
    const intermediateResult = await fn(x);
    if (intermediateResult === false) return;
    toReturn = _objectSpread2(_objectSpread2({}, toReturn), intermediateResult);
  };

  await mapAsync(innerIterable, list);
  return toReturn;
}

function maybe(ifRule, whenIf, whenElse) {
  const whenIfInput = ifRule && type(whenIf) === 'Function' ? whenIf() : whenIf;
  const whenElseInput = !ifRule && type(whenElse) === 'Function' ? whenElse() : whenElse;
  return ifRule ? whenIfInput : whenElseInput;
}

function compose(...fns) {
  if (fns.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return (...args) => {
    const list = fns.slice();

    if (list.length > 0) {
      const fn = list.pop();
      let result = fn(...args);

      while (list.length > 0) {
        result = list.pop()(result);
      }

      return result;
    }
  };
}

function replaceFn(pattern, replacer, str) {
  return str.replace(pattern, replacer);
}

const replace$1 = curry(replaceFn);

function sort(sortFn, list) {
  if (arguments.length === 1) return _list => sort(sortFn, _list);
  const clone = list.slice();
  return clone.sort(sortFn);
}

function take(howMany, listOrString) {
  if (arguments.length === 1) return _listOrString => take(howMany, _listOrString);
  if (howMany < 0) return listOrString.slice();
  if (typeof listOrString === 'string') return listOrString.slice(0, howMany);
  return baseSlice(listOrString, 0, howMany);
}

const cache = {};

const normalizeObject = obj => {
  const sortFn = (a, b) => a > b ? 1 : -1;

  const willReturn = {};
  compose(map(prop => willReturn[prop] = obj[prop]), sort(sortFn))(Object.keys(obj));
  return willReturn;
};

const stringify = a => {
  if (type(a) === 'String') {
    return a;
  } else if (['Function', 'Async'].includes(type(a))) {
    const compacted = replace$1(/\s{1,}/g, ' ', a.toString());
    return replace$1(/\s/g, '_', take(15, compacted));
  } else if (type(a) === 'Object') {
    return JSON.stringify(normalizeObject(a));
  }

  return JSON.stringify(a);
};

const generateProp = (fn, ...inputArguments) => {
  let propString = '';
  inputArguments.forEach(inputArgument => {
    propString += `${stringify(inputArgument)}_`;
  });
  return `${propString}${stringify(fn)}`;
};

function memoize$1(fn, ...inputArguments) {
  if (arguments.length === 1) {
    return (...inputArgumentsHolder) => memoize$1(fn, ...inputArgumentsHolder);
  }

  const prop = generateProp(fn, ...inputArguments);
  if (prop in cache) return cache[prop];

  if (type(fn) === 'Async') {
    return new Promise(resolve => {
      fn(...inputArguments).then(result => {
        cache[prop] = result;
        resolve(result);
      });
    });
  }

  const result = fn(...inputArguments);
  cache[prop] = result;
  return result;
}

function nextIndex(index, list) {
  return index >= list.length - 1 ? 0 : index + 1;
}

function onceFn(fn, context) {
  let result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }

    return result;
  };
}

function once(fn, context) {
  if (arguments.length === 1) {
    const wrap = onceFn(fn, context);
    return curry(wrap);
  }

  return onceFn(fn, context);
}

function partialCurry(fn, input) {
  return rest => {
    if (type(fn) === 'Async') {
      return new Promise((resolve, reject) => {
        fn(merge(rest, input)).then(resolve).catch(reject);
      });
    }

    return fn(merge(rest, input));
  };
}

function pass(...inputs) {
  return (...schemas) => any((x, i) => {
    const schema = schemas[i] === undefined ? schemas[0] : schemas[i];
    return !check(x, schema);
  }, inputs) === false;
}

function pipe(...fns) {
  if (fns.length === 0) throw new Error('pipe requires at least one argument');
  return compose(...fns.reverse());
}

function piped(...inputs) {
  const [input, ...fnList] = inputs;
  return pipe(...fnList)(input);
}

async function pipedAsync(...inputs) {
  const [input, ...fnList] = inputs;
  let argumentsToPass = input;

  while (fnList.length !== 0) {
    const fn = fnList.shift();
    const typeFn = type(fn);

    if (typeFn === 'Async') {
      argumentsToPass = await fn(argumentsToPass);
    } else {
      argumentsToPass = fn(argumentsToPass);
    }
  }

  return argumentsToPass;
}

function prevIndex(index, list) {
  return index === 0 ? list.length - 1 : index - 1;
}

function helper({
  condition,
  inputArgument,
  prop
}) {
  return new Promise((resolve, reject) => {
    if (type(condition) !== 'Async') {
      return resolve({
        type: prop,
        payload: condition(inputArgument)
      });
    }

    condition(inputArgument).then(result => {
      resolve({
        type: prop,
        payload: result
      });
    }).catch(err => reject(err));
  });
}

function produce(conditions, inputArgument) {
  if (arguments.length === 1) {
    return inputArgumentHolder => produce(conditions, inputArgumentHolder);
  }

  let asyncConditionsFlag = false;

  for (const prop in conditions) {
    if (asyncConditionsFlag === false && type(conditions[prop]) === 'Async') {
      asyncConditionsFlag = true;
    }
  }

  if (asyncConditionsFlag === false) {
    const willReturn = {};

    for (const prop in conditions) {
      willReturn[prop] = conditions[prop](inputArgument);
    }

    return willReturn;
  }

  const promised = [];

  for (const prop in conditions) {
    const condition = conditions[prop];
    promised.push(helper({
      inputArgument,
      condition,
      prop
    }));
  }

  return new Promise((resolve, reject) => {
    Promise.all(promised).then(results => {
      const willReturn = {};
      map(result => willReturn[result.type] = result.payload, results);
      resolve(willReturn);
    }).catch(err => reject(err));
  });
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function remove(inputs, text) {
  if (arguments.length === 1) {
    return textHolder => remove(inputs, textHolder);
  }

  if (type(text) !== 'String') {
    throw new Error(`R.remove requires string not ${type(text)}`);
  }

  if (type(inputs) !== 'Array') {
    return replace$1(inputs, '', text);
  }

  let textCopy = text;
  inputs.forEach(singleInput => {
    textCopy = replace$1(singleInput, '', textCopy).trim();
  });
  return textCopy;
}

function omit(propsToOmit, obj) {
  if (arguments.length === 1) return _obj => omit(propsToOmit, _obj);

  if (obj === null || obj === undefined) {
    return undefined;
  }

  const propsToOmitValue = typeof propsToOmit === 'string' ? propsToOmit.split(',') : propsToOmit;
  const willReturn = {};

  for (const key in obj) {
    if (!propsToOmitValue.includes(key)) {
      willReturn[key] = obj[key];
    }
  }

  return willReturn;
}

function renameProps(conditions, inputObject) {
  if (arguments.length === 1) {
    return inputObjectHolder => renameProps(conditions, inputObjectHolder);
  }

  const renamed = {};
  Object.keys(conditions).forEach(condition => {
    if (Object.keys(inputObject).includes(condition)) {
      renamed[conditions[condition]] = inputObject[condition];
    }
  });
  return merge(renamed, omit(Object.keys(conditions), inputObject));
}

function replaceAllFn(patterns, replacer, input) {
  ok(patterns, replacer, input)(Array, String, String);
  let text = input;
  patterns.forEach(singlePattern => {
    text = text.replace(singlePattern, replacer);
  });
  return text;
}

const replaceAll = curry(replaceAllFn);

function shuffle(arrayRaw) {
  const array = arrayRaw.concat();
  let counter = array.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function path(list, obj) {
  if (arguments.length === 1) return _obj => path(list, _obj);

  if (obj === null || obj === undefined) {
    return undefined;
  }

  let willReturn = obj;
  let counter = 0;
  const pathArrValue = typeof list === 'string' ? list.split('.') : list;

  while (counter < pathArrValue.length) {
    if (willReturn === null || willReturn === undefined) {
      return undefined;
    }

    willReturn = willReturn[pathArrValue[counter]];
    counter++;
  }

  return willReturn;
}

function sortBy(sortFn, list) {
  if (arguments.length === 1) return _list => sortBy(sortFn, _list);
  const clone = list.slice();
  return clone.sort((a, b) => {
    const aSortResult = sortFn(a);
    const bSortResult = sortFn(b);
    if (aSortResult === bSortResult) return 0;
    return aSortResult < bSortResult ? -1 : 1;
  });
}

function sortByPath(sortPath, list) {
  if (arguments.length === 1) return _list => sortByPath(sortPath, _list);
  return sortBy(path(sortPath), list);
}

function singleSort(a, b, sortPaths) {
  let toReturn = 0;
  sortPaths.forEach(singlePath => {
    if (toReturn !== 0) return;
    const aResult = path(singlePath, a);
    const bResult = path(singlePath, b);
    if ([aResult, bResult].includes(undefined)) return;
    if (aResult === bResult) return;
    toReturn = aResult > bResult ? 1 : -1;
  });
  return toReturn;
}

function sortByProps(sortPaths, list) {
  if (arguments.length === 1) return _list => sortByProps(sortPaths, _list);
  const clone = list.slice();
  clone.sort((a, b) => singleSort(a, b, sortPaths));
  return clone;
}

function sortObject(predicate, obj) {
  if (arguments.length === 1) {
    return _obj => sortObject(predicate, _obj);
  }

  const keys = Object.keys(obj);
  const sortedKeys = sort((a, b) => predicate(a, b, obj[a], obj[b]), keys);
  const toReturn = {};
  sortedKeys.forEach(singleKey => {
    toReturn[singleKey] = obj[singleKey];
  });
  return toReturn;
}

const NO_MATCH_FOUND = Symbol ? Symbol('NO_MATCH_FOUND') : undefined;

const getMatchingKeyValuePair = (cases, testValue, defaultValue) => {
  let iterationValue;

  for (let index = 0; index < cases.length; index++) {
    iterationValue = cases[index].test(testValue);

    if (iterationValue !== NO_MATCH_FOUND) {
      return iterationValue;
    }
  }

  return defaultValue;
};

const isEqual = (testValue, matchValue) => {
  const willReturn = typeof testValue === 'function' ? testValue(matchValue) : equals(testValue, matchValue);
  return willReturn;
};

const is = (testValue, matchResult = true) => ({
  key: testValue,
  test: matchValue => isEqual(testValue, matchValue) ? matchResult : NO_MATCH_FOUND
});

class Switchem {
  constructor(defaultValue, cases, willMatch) {
    if (defaultValue !== undefined && cases === undefined && willMatch === undefined) {
      this.cases = [];
      this.defaultValue = undefined;
      this.willMatch = defaultValue;
    } else {
      this.cases = cases;
      this.defaultValue = defaultValue;
      this.willMatch = willMatch;
    }

    return this;
  }

  default(defaultValue) {
    const holder = new Switchem(defaultValue, this.cases, this.willMatch);
    return holder.match(this.willMatch);
  }

  is(testValue, matchResult) {
    return new Switchem(this.defaultValue, [...this.cases, is(testValue, matchResult)], this.willMatch);
  }

  match(matchValue) {
    return getMatchingKeyValuePair(this.cases, matchValue, this.defaultValue);
  }

}

function switcher(input) {
  return new Switchem(input);
}

function tapAsync(fn, input) {
  if (arguments.length === 1) {
    return inputHolder => tapAsync(fn, inputHolder);
  }

  if (isPromise(fn) === true) {
    return new Promise((resolve, reject) => {
      fn(input).then(() => {
        resolve(input);
      }).catch(reject);
    });
  }

  fn(input);
  return input;
}

function throttle(fn, ms) {
  let wait = false;
  return function (...input) {
    if (!wait) {
      fn.apply(null, input);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, ms);
    }
  };
}

function toDecimal(number, charsAfterDecimalPoint = 2) {
  return Number(parseFloat(String(number)).toFixed(charsAfterDecimalPoint));
}

function wait(fn) {
  return new Promise(resolve => {
    fn.then(result => resolve([result, undefined])).catch(e => resolve([undefined, e]));
  });
}

function range(start, end) {
  if (arguments.length === 1) return _end => range(start, _end);

  if (Number.isNaN(Number(start)) || Number.isNaN(Number(end))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  if (end < start) return [];
  const len = end - start;
  const willReturn = Array(len);

  for (let i = 0; i < len; i++) {
    willReturn[i] = start + i;
  }

  return willReturn;
}

function waitFor(condition, howLong, loops = 10) {
  const typeCondition = type(condition);
  const passPromise = typeCondition === 'Async';
  const passFunction = typeCondition === 'Function';
  const interval = Math.floor(howLong / loops);

  if (!(passPromise || passFunction)) {
    throw new Error('R.waitFor');
  }

  return async (...inputs) => {
    for (const _ of range(0, loops)) {
      const resultCondition = await condition(...inputs);

      if (resultCondition === false) {
        await delay(interval);
      } else {
        return resultCondition;
      }
    }

    return false;
  };
}

function add(a, b) {
  if (arguments.length === 1) return _b => add(a, _b);
  return Number(a) + Number(b);
}

function adjustFn(index, replaceFn, list) {
  const actualIndex = index < 0 ? list.length + index : index;
  if (index >= list.length || actualIndex < 0) return list;
  const clone = list.slice();
  clone[actualIndex] = replaceFn(clone[actualIndex]);
  return clone;
}

const adjust = curry(adjustFn);

function allPass(predicates) {
  return input => {
    let counter = 0;

    while (counter < predicates.length) {
      if (!predicates[counter](input)) {
        return false;
      }

      counter++;
    }

    return true;
  };
}

function always(x) {
  return () => x;
}

function and(a, b) {
  if (arguments.length === 1) return _b => and(a, _b);
  return a && b;
}

function anyPass(predicates) {
  return input => {
    let counter = 0;

    while (counter < predicates.length) {
      if (predicates[counter](input)) {
        return true;
      }

      counter++;
    }

    return false;
  };
}

function append(x, listOrString) {
  if (arguments.length === 1) return _listOrString => append(x, _listOrString);
  if (typeof listOrString === 'string') return `${listOrString}${x}`;
  const clone = listOrString.slice();
  clone.push(x);
  return clone;
}

function __findHighestArity(spec, max = 0) {
  for (const key in spec) {
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue;

    if (typeof spec[key] === 'object') {
      max = Math.max(max, __findHighestArity(spec[key]));
    }

    if (typeof spec[key] === 'function') {
      max = Math.max(max, spec[key].length);
    }
  }

  return max;
}

function __filterUndefined() {
  const defined = [];
  let i = 0;
  const l = arguments.length;

  while (i < l) {
    if (typeof arguments[i] === 'undefined') break;
    defined[i] = arguments[i];
    i++;
  }

  return defined;
}

function __applySpecWithArity(spec, arity, cache) {
  const remaining = arity - cache.length;
  if (remaining === 1) return x => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x));
  if (remaining === 2) return (x, y) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y));
  if (remaining === 3) return (x, y, z) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y, z));
  if (remaining === 4) return (x, y, z, a) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, x, y, z, a));
  if (remaining > 4) return (...args) => __applySpecWithArity(spec, arity, __filterUndefined(...cache, ...args));

  if (_isArray(spec)) {
    const ret = [];
    let i = 0;
    const l = spec.length;

    for (; i < l; i++) {
      if (typeof spec[i] === 'object' || _isArray(spec[i])) {
        ret[i] = __applySpecWithArity(spec[i], arity, cache);
      }

      if (typeof spec[i] === 'function') {
        ret[i] = spec[i](...cache);
      }
    }

    return ret;
  }

  const ret = {};

  for (const key in spec) {
    if (spec.hasOwnProperty(key) === false || key === 'constructor') continue;

    if (typeof spec[key] === 'object') {
      ret[key] = __applySpecWithArity(spec[key], arity, cache);
      continue;
    }

    if (typeof spec[key] === 'function') {
      ret[key] = spec[key](...cache);
    }
  }

  return ret;
}

function applySpec(spec, ...args) {
  const arity = __findHighestArity(spec);

  if (arity === 0) {
    return () => ({});
  }

  const toReturn = __applySpecWithArity(spec, arity, args);

  return toReturn;
}

function assocFn(prop, newValue, obj) {
  return Object.assign({}, obj, {
    [prop]: newValue
  });
}

const assoc = curry(assocFn);

function _isInteger(n) {
  return n << 0 === n;
}
var _isInteger$1 = Number.isInteger || _isInteger;

function assocPathFn(list, newValue, input) {
  const pathArrValue = typeof list === 'string' ? list.split('.') : list;

  if (pathArrValue.length === 0) {
    return newValue;
  }

  const index = pathArrValue[0];

  if (pathArrValue.length > 1) {
    const condition = typeof input !== 'object' || input === null || !input.hasOwnProperty(index);
    const nextinput = condition ? _isInteger(parseInt(pathArrValue[1], 10)) ? [] : {} : input[index];
    newValue = assocPathFn(Array.prototype.slice.call(pathArrValue, 1), newValue, nextinput);
  }

  if (_isInteger(parseInt(index, 10)) && _isArray(input)) {
    const arr = input.slice();
    arr[index] = newValue;
    return arr;
  }

  return assoc(index, newValue, input);
}

const assocPath = curry(assocPathFn);

function both(f, g) {
  if (arguments.length === 1) return _g => both(f, _g);
  return (...input) => f(...input) && g(...input);
}

function chain(fn, list) {
  if (arguments.length === 1) {
    return _list => chain(fn, _list);
  }

  return [].concat(...list.map(fn));
}

function clampFn(min, max, input) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  if (input >= min && input <= max) return input;
  if (input > max) return max;
  if (input < min) return min;
}

const clamp = curry(clampFn);

function clone(input) {
  const out = _isArray(input) ? Array(input.length) : {};
  if (input && input.getTime) return new Date(input.getTime());

  for (const key in input) {
    const v = input[key];
    out[key] = typeof v === 'object' && v !== null ? v.getTime ? new Date(v.getTime()) : clone(v) : v;
  }

  return out;
}

function complement(fn) {
  return (...input) => !fn(...input);
}

function concat(x, y) {
  if (arguments.length === 1) return _y => concat(x, _y);
  return typeof x === 'string' ? `${x}${y}` : [...x, ...y];
}

function cond(conditions) {
  return input => {
    let done = false;
    let toReturn;
    conditions.forEach(([predicate, resultClosure]) => {
      if (!done && predicate(input)) {
        done = true;
        toReturn = resultClosure(input);
      }
    });
    return toReturn;
  };
}

function _curryN(n, cache, fn) {
  return function () {
    let ci = 0;
    let ai = 0;
    const cl = cache.length;
    const al = arguments.length;
    const args = new Array(cl + al);

    while (ci < cl) {
      args[ci] = cache[ci];
      ci++;
    }

    while (ai < al) {
      args[cl + ai] = arguments[ai];
      ai++;
    }

    const remaining = n - args.length;
    return args.length >= n ? fn.apply(this, args) : _arity(remaining, _curryN(n, args, fn));
  };
}

function _arity(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (_1) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (_1, _2) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (_1, _2, _3) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (_1, _2, _3, _4) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (_1, _2, _3, _4, _5) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (_1, _2, _3, _4, _5, _6) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (_1, _2, _3, _4, _5, _6, _7) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (_1, _2, _3, _4, _5, _6, _7, _8) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (_1, _2, _3, _4, _5, _6, _7, _8, _9) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (_1, _2, _3, _4, _5, _6, _7, _8, _9, _10) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

function curryN(n, fn) {
  if (arguments.length === 1) return _fn => curryN(n, _fn);
  return _arity(n, _curryN(n, [], fn));
}

function max(x, y) {
  if (arguments.length === 1) return _y => max(x, _y);
  return y > x ? y : x;
}

function reduceFn(reducer, acc, list) {
  if (!_isArray(list)) {
    throw new TypeError('reduce: list must be array or iterable');
  }

  let index = 0;
  const len = list.length;

  while (index < len) {
    acc = reducer(acc, list[index], index, list);
    index++;
  }

  return acc;
}

const reduce = curry(reduceFn);

function converge(fn, transformers) {
  if (arguments.length === 1) return _transformers => converge(fn, _transformers);
  const highestArity = reduce((a, b) => max(a, b.length), 0, transformers);
  return curryN(highestArity, function () {
    return fn.apply(this, map(g => g.apply(this, arguments), transformers));
  });
}

const dec = x => x - 1;

function flagIs(inputArguments) {
  return inputArguments === undefined || inputArguments === null || Number.isNaN(inputArguments) === true;
}

function defaultTo(defaultArgument, ...inputArguments) {
  if (arguments.length === 1) {
    return (..._inputArguments) => defaultTo(defaultArgument, ..._inputArguments);
  }

  const limit = inputArguments.length - 1;
  let len = limit + 1;
  let ready = false;
  let holder;

  while (!ready) {
    const instance = inputArguments[limit - len + 1];

    if (len === 0) {
      ready = true;
    } else if (flagIs(instance)) {
      len -= 1;
    } else {
      holder = instance;
      ready = true;
    }
  }

  return holder === undefined ? defaultArgument : holder;
}

function uniq(list) {
  let index = -1;
  const willReturn = [];

  while (++index < list.length) {
    const value = list[index];

    if (!includes(value, willReturn)) {
      willReturn.push(value);
    }
  }

  return willReturn;
}

function difference(a, b) {
  if (arguments.length === 1) return _b => difference(a, _b);
  return uniq(a).filter(aInstance => !includes(aInstance, b));
}

function dissoc(prop, obj) {
  if (arguments.length === 1) return _obj => dissoc(prop, _obj);
  if (obj === null || obj === undefined) return {};
  const willReturn = {};

  for (const p in obj) {
    willReturn[p] = obj[p];
  }

  delete willReturn[prop];
  return willReturn;
}

function divide(a, b) {
  if (arguments.length === 1) return _b => divide(a, _b);
  return a / b;
}

function drop(howManyToDrop, listOrString) {
  if (arguments.length === 1) return _list => drop(howManyToDrop, _list);
  return listOrString.slice(howManyToDrop > 0 ? howManyToDrop : 0);
}

function dropLast(howManyToDrop, listOrString) {
  if (arguments.length === 1) {
    return _listOrString => dropLast(howManyToDrop, _listOrString);
  }

  return howManyToDrop > 0 ? listOrString.slice(0, -howManyToDrop) : listOrString.slice();
}

function either(firstPredicate, secondPredicate) {
  if (arguments.length === 1) {
    return _secondPredicate => either(firstPredicate, _secondPredicate);
  }

  return (...input) => Boolean(firstPredicate(...input) || secondPredicate(...input));
}

function endsWith(target, str) {
  if (arguments.length === 1) return _str => endsWith(target, _str);
  return str.endsWith(target);
}

function F() {
  return false;
}

function find(predicate, list) {
  if (arguments.length === 1) return _list => find(predicate, _list);
  let index = 0;
  const len = list.length;

  while (index < len) {
    const x = list[index];

    if (predicate(x, index)) {
      return x;
    }

    index++;
  }
}

function findIndex(predicate, list) {
  if (arguments.length === 1) return _list => findIndex(predicate, _list);
  const len = list.length;
  let index = -1;

  while (++index < len) {
    if (predicate(list[index], index)) {
      return index;
    }
  }

  return -1;
}

function findLast(predicate, list) {
  if (arguments.length === 1) return _list => findLast(predicate, _list);
  let index = list.length;

  while (--index >= 0) {
    if (predicate(list[index], index)) {
      return list[index];
    }
  }

  return undefined;
}

function findLastIndex(fn, list) {
  if (arguments.length === 1) return _list => findLastIndex(fn, _list);
  let index = list.length;

  while (--index >= 0) {
    if (fn(list[index], index)) {
      return index;
    }
  }

  return -1;
}

function flatten(list, input) {
  const willReturn = input === undefined ? [] : input;

  for (let i = 0; i < list.length; i++) {
    if (_isArray(list[i])) {
      flatten(list[i], willReturn);
    } else {
      willReturn.push(list[i]);
    }
  }

  return willReturn;
}

function flipFn(fn) {
  return (...input) => {
    if (input.length === 1) {
      return holder => fn(holder, input[0]);
    } else if (input.length === 2) {
      return fn(input[1], input[0]);
    } else if (input.length === 3) {
      return fn(input[1], input[0], input[2]);
    } else if (input.length === 4) {
      return fn(input[1], input[0], input[2], input[3]);
    }

    throw new Error('R.flip doesn\'t work with arity > 4');
  };
}

function flip(fn) {
  return flipFn(fn);
}

function fromPairs(listOfPairs) {
  const toReturn = {};
  listOfPairs.forEach(([prop, value]) => toReturn[prop] = value);
  return toReturn;
}

function groupBy(groupFn, list) {
  if (arguments.length === 1) return _list => groupBy(groupFn, _list);
  const result = {};

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const key = groupFn(item);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);
  }

  return result;
}

function groupWith(compareFn, list) {
  if (!_isArray(list)) throw new TypeError('list.reduce is not a function');
  const clone = list.slice();
  if (list.length === 1) return [clone];
  const toReturn = [];
  let holder = [];
  clone.reduce((prev, current, i) => {
    if (i === 0) return current;
    const okCompare = compareFn(prev, current);
    const holderIsEmpty = holder.length === 0;
    const lastCall = i === list.length - 1;

    if (okCompare) {
      if (holderIsEmpty) holder.push(prev);
      holder.push(current);
      if (lastCall) toReturn.push(holder);
      return current;
    }

    if (holderIsEmpty) {
      toReturn.push([prev]);
      if (lastCall) toReturn.push([current]);
      return current;
    }

    toReturn.push(holder);
    if (lastCall) toReturn.push([current]);
    holder = [];
    return current;
  }, undefined);
  return toReturn;
}

function has(prop, obj) {
  if (arguments.length === 1) return _obj => has(prop, _obj);
  if (!obj) return false;
  return obj[prop] !== undefined;
}

function hasPath(maybePath, obj) {
  if (arguments.length === 1) {
    return objHolder => hasPath(maybePath, objHolder);
  }

  return path(maybePath, obj) !== undefined;
}

function head(listOrString) {
  if (typeof listOrString === 'string') return listOrString[0] || '';
  return listOrString[0];
}

function _objectIs(a, b) {
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }

  return a !== a && b !== b;
}
var _objectIs$1 = Object.is || _objectIs;

function identical(a, b) {
  if (arguments.length === 1) return _b => identical(a, _b);
  return _objectIs$1(a, b);
}

function identity(input) {
  return input;
}

function ifElseFn(condition, onTrue, onFalse) {
  return (...input) => {
    const conditionResult = typeof condition === 'boolean' ? condition : condition(...input);

    if (conditionResult === true) {
      return onTrue(...input);
    }

    return onFalse(...input);
  };
}

const ifElse = curry(ifElseFn);

const inc = x => x + 1;

function indexByPath(pathInput, list) {
  const toReturn = {};

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    toReturn[path(pathInput, item)] = item;
  }

  return toReturn;
}

function indexBy(condition, list) {
  if (arguments.length === 1) {
    return _list => indexBy(condition, _list);
  }

  if (typeof condition === 'string') {
    return indexByPath(condition, list);
  }

  const toReturn = {};

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    toReturn[condition(item)] = item;
  }

  return toReturn;
}

function indexOf(valueToFind, list) {
  if (arguments.length === 1) {
    return _list => indexOf(valueToFind, _list);
  }

  let index = -1;
  const {
    length
  } = list;

  while (++index < length) {
    if (list[index] === valueToFind) {
      return index;
    }
  }

  return -1;
}

function intersection(listA, listB) {
  if (arguments.length === 1) return _list => intersection(listA, _list);
  return filter(value => includes(value, listB), listA);
}

function intersperse(separator, list) {
  if (arguments.length === 1) return _list => intersperse(separator, _list);
  let index = -1;
  const len = list.length;
  const willReturn = [];

  while (++index < len) {
    if (index === len - 1) {
      willReturn.push(list[index]);
    } else {
      willReturn.push(list[index], separator);
    }
  }

  return willReturn;
}

function is$1(targetPrototype, x) {
  if (arguments.length === 1) return _x => is$1(targetPrototype, _x);
  return x != null && x.constructor === targetPrototype || x instanceof targetPrototype;
}

function isEmpty(input) {
  const inputType = type(input);
  if (['Undefined', 'NaN', 'Number', 'Null'].includes(inputType)) return false;
  if (!input) return true;

  if (inputType === 'Object') {
    return Object.keys(input).length === 0;
  }

  if (inputType === 'Array') {
    return input.length === 0;
  }

  return false;
}

function isNil(x) {
  return x === undefined || x === null;
}

function join(glue, list) {
  if (arguments.length === 1) return _list => join(glue, _list);
  return list.join(glue);
}

function keys(x) {
  return Object.keys(x);
}

function last(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString[listOrString.length - 1] || '';
  }

  return listOrString[listOrString.length - 1];
}

function lastIndexOf(target, list) {
  if (arguments.length === 1) return _list => lastIndexOf(target, _list);
  let index = list.length;

  while (--index > 0) {
    if (equals(list[index], target)) {
      return index;
    }
  }

  return -1;
}

function length(x) {
  if (!x && x !== '' || x.length === undefined) {
    return NaN;
  }

  return x.length;
}

function lens(getter, setter) {
  if (arguments.length === 1) return _setter => lens(getter, _setter);
  return function (functor) {
    return function (target) {
      return functor(getter(target)).map(focus => setter(focus, target));
    };
  };
}

function nth(index, list) {
  if (arguments.length === 1) return _list => nth(index, _list);
  const idx = index < 0 ? list.length + index : index;
  return Object.prototype.toString.call(list) === '[object String]' ? list.charAt(idx) : list[idx];
}

function updateFn(index, newValue, list) {
  const arrClone = list.slice();
  return arrClone.fill(newValue, index, index + 1);
}

const update = curry(updateFn);

function lensIndex(index) {
  return lens(nth(index), update(index));
}

function lensPath(key) {
  return lens(path(key), assocPath(key));
}

function prop(propToFind, obj) {
  if (arguments.length === 1) return _obj => prop(propToFind, _obj);
  if (!obj) return undefined;
  return obj[propToFind];
}

function lensProp(key) {
  return lens(prop(key), assoc(key));
}

const Identity = x => ({
  x,
  map: fn => Identity(fn(x))
});

function overFn(lens, fn, object) {
  return lens(x => Identity(fn(x)))(object).x;
}

const over = curry(overFn);

function setFn(lens, replacer, x) {
  return over(lens, always(replacer), x);
}

const set$1 = curry(setFn);

function match(pattern, input) {
  if (arguments.length === 1) return _input => match(pattern, _input);
  const willReturn = input.match(pattern);
  return willReturn === null ? [] : willReturn;
}

function mathMod(x, y) {
  if (arguments.length === 1) return _y => mathMod(x, _y);
  if (!_isInteger$1(x) || !_isInteger$1(y) || y < 1) return NaN;
  return (x % y + y) % y;
}

function maxByFn(compareFn, x, y) {
  return compareFn(y) > compareFn(x) ? y : x;
}
const maxBy = curry(maxByFn);

function sum(list) {
  return list.reduce((prev, current) => prev + current, 0);
}

function mean(list) {
  return sum(list) / list.length;
}

function median(list) {
  const len = list.length;
  if (len === 0) return NaN;
  const width = 2 - len % 2;
  const idx = (len - width) / 2;
  return mean(Array.prototype.slice.call(list, 0).sort((a, b) => {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }).slice(idx, idx + width));
}

function mergeDeepRight(target, source) {
  if (arguments.length === 1) {
    return sourceHolder => mergeDeepRight(target, sourceHolder);
  }

  const willReturn = JSON.parse(JSON.stringify(target));
  Object.keys(source).forEach(key => {
    if (type(source[key]) === 'Object') {
      if (type(target[key]) === 'Object') {
        willReturn[key] = mergeDeepRight(target[key], source[key]);
      } else {
        willReturn[key] = source[key];
      }
    } else {
      willReturn[key] = source[key];
    }
  });
  return willReturn;
}

function mergeLeft(x, y) {
  if (arguments.length === 1) return _y => mergeLeft(x, _y);
  return merge(y, x);
}

function min(x, y) {
  if (arguments.length === 1) return _y => min(x, _y);
  return y < x ? y : x;
}

function minByFn(compareFn, x, y) {
  return compareFn(y) < compareFn(x) ? y : x;
}
const minBy = curry(minByFn);

function modulo(x, y) {
  if (arguments.length === 1) return _y => modulo(x, _y);
  return x % y;
}

function moveFn(fromIndex, toIndex, list) {
  if (fromIndex < 0 || toIndex < 0) {
    throw new Error('Rambda.move does not support negative indexes');
  }

  if (fromIndex > list.length - 1 || toIndex > list.length - 1) return list;
  const clone = list.slice();
  clone[fromIndex] = list[toIndex];
  clone[toIndex] = list[fromIndex];
  return clone;
}

const move = curry(moveFn);

function multiply(x, y) {
  if (arguments.length === 1) return _y => multiply(x, _y);
  return x * y;
}

function negate(x) {
  return -x;
}

function none(predicate, list) {
  if (arguments.length === 1) return _list => none(predicate, _list);

  for (let i = 0; i < list.length; i++) {
    if (!predicate(list[i], i)) return true;
  }

  return false;
}

function not(input) {
  return !input;
}

function of(value) {
  return [value];
}

function partial(fn, ...args) {
  const len = fn.length;
  return (...rest) => {
    if (args.length + rest.length >= len) {
      return fn(...args, ...rest);
    }

    return partial(fn, ...[...args, ...rest]);
  };
}

function pathEqFn(pathToSearch, target, input) {
  return equals(path(pathToSearch, input), target);
}

const pathEq = curry(pathEqFn);

function paths(pathsToSearch, obj) {
  if (arguments.length === 1) {
    return _obj => paths(pathsToSearch, _obj);
  }

  return pathsToSearch.map(singlePath => path(singlePath, obj));
}

function pathOrFn(defaultValue, list, obj) {
  return defaultTo(defaultValue, path(list, obj));
}

const pathOr = curry(pathOrFn);

function pickAll(propsToPick, obj) {
  if (arguments.length === 1) return _obj => pickAll(propsToPick, _obj);

  if (obj === null || obj === undefined) {
    return undefined;
  }

  const keysValue = typeof propsToPick === 'string' ? propsToPick.split(',') : propsToPick;
  const willReturn = {};
  let counter = 0;

  while (counter < keysValue.length) {
    if (keysValue[counter] in obj) {
      willReturn[keysValue[counter]] = obj[keysValue[counter]];
    } else {
      willReturn[keysValue[counter]] = undefined;
    }

    counter++;
  }

  return willReturn;
}

function pluck(property, list) {
  if (arguments.length === 1) return _list => pluck(property, _list);
  const willReturn = [];
  map(x => {
    if (x[property] !== undefined) {
      willReturn.push(x[property]);
    }
  }, list);
  return willReturn;
}

function prepend(x, listOrString) {
  if (arguments.length === 1) return _listOrString => prepend(x, _listOrString);
  if (typeof listOrString === 'string') return `${x}${listOrString}`;
  return [x].concat(listOrString);
}

const product = reduce(multiply, 1);

function propEqFn(propToFind, valueToMatch, obj) {
  if (!obj) return false;
  return obj[propToFind] === valueToMatch;
}

const propEq = curry(propEqFn);

function propIsFn(targetPrototype, property, obj) {
  return is$1(targetPrototype, obj[property]);
}

const propIs = curry(propIsFn);

function propOrFn(defaultValue, property, obj) {
  if (!obj) return defaultValue;
  return defaultTo(defaultValue, obj[property]);
}

const propOr = curry(propOrFn);

function reject(predicate, list) {
  if (arguments.length === 1) return _list => reject(predicate, _list);
  return filter((x, i) => !predicate(x, i), list);
}

function repeat(x, timesToRepeat) {
  if (arguments.length === 1) {
    return _timesToRepeat => repeat(x, _timesToRepeat);
  }

  return Array(timesToRepeat).fill(x);
}

function reverse(listOrString) {
  if (typeof listOrString === 'string') {
    return listOrString.split('').reverse().join('');
  }

  const clone = listOrString.slice();
  return clone.reverse();
}

function sliceFn(from, to, list) {
  return list.slice(from, to);
}

const slice = curry(sliceFn);

function split(separator, str) {
  if (arguments.length === 1) return _str => split(separator, _str);
  return str.split(separator);
}

function startsWith(target, str) {
  if (arguments.length === 1) return _str => startsWith(target, _str);
  return str.startsWith(target);
}

function subtract(a, b) {
  if (arguments.length === 1) return _b => subtract(a, _b);
  return a - b;
}

function symmetricDifference(x, y) {
  if (arguments.length === 1) {
    return _y => symmetricDifference(x, _y);
  }

  return concat(filter(value => !includes(value, y), x), filter(value => !includes(value, x), y));
}

function T() {
  return true;
}

function tail(listOrString) {
  return drop(1, listOrString);
}

function takeLast(howMany, listOrString) {
  if (arguments.length === 1) return _listOrString => takeLast(howMany, _listOrString);
  const len = listOrString.length;
  if (howMany < 0) return listOrString.slice();
  let numValue = howMany > len ? len : howMany;
  if (typeof listOrString === 'string') return listOrString.slice(len - numValue);
  numValue = len - numValue;
  return baseSlice(listOrString, numValue, len);
}

function tap(fn, x) {
  if (arguments.length === 1) return _x => tap(fn, _x);
  fn(x);
  return x;
}

function times(fn, howMany) {
  if (arguments.length === 1) return _howMany => times(fn, _howMany);

  if (!Number.isInteger(howMany) || howMany < 0) {
    throw new RangeError('n must be an integer');
  }

  return map(fn, range(0, howMany));
}

function toUpper(str) {
  return str.toUpperCase();
}

function toPairs(obj) {
  return Object.entries(obj);
}

function toString$1(x) {
  return x.toString();
}

function transpose(array) {
  return array.reduce((acc, el) => {
    el.forEach((nestedEl, i) => _isArray(acc[i]) ? acc[i].push(nestedEl) : acc.push([nestedEl]));
    return acc;
  }, []);
}

function trim(str) {
  return str.trim();
}

function tryCatch(fn, fallback) {
  if (!isFunction$1(fn)) {
    throw new Error(`R.tryCatch | fn '${fn}'`);
  }

  const passFallback = isFunction$1(fallback);

  if (!isPromise(fn)) {
    return (...inputs) => {
      try {
        return fn(...inputs);
      } catch (e) {
        return passFallback ? fallback(e, ...inputs) : fallback;
      }
    };
  }

  return (...inputs) => new Promise(resolve => {
    fn(...inputs).then(resolve).catch(() => {
      if (!passFallback) {
        return resolve(fallback);
      }

      if (!isPromise(fallback)) {
        return resolve(fallback(...inputs));
      }

      fallback(...inputs).then(resolve);
    });
  });
}

function union(x, y) {
  if (arguments.length === 1) return _y => union(x, _y);
  const toReturn = x.slice();
  y.forEach(yInstance => {
    if (!includes(yInstance, x)) toReturn.push(yInstance);
  });
  return toReturn;
}

function uniqWith(fn, list) {
  if (arguments.length === 1) return _list => uniqWith(fn, _list);
  let index = -1;
  const len = list.length;
  const willReturn = [];

  while (++index < len) {
    const value = list[index];
    const flag = any(willReturnInstance => fn(value, willReturnInstance), willReturn);

    if (!flag) {
      willReturn.push(value);
    }
  }

  return willReturn;
}

function unless(predicate, whenFalse) {
  if (arguments.length === 1) {
    return _whenFalse => unless(predicate, _whenFalse);
  }

  return input => {
    if (predicate(input)) return input;
    return whenFalse(input);
  };
}

function values(obj) {
  if (type(obj) !== 'Object') return [];
  return Object.values(obj);
}

function whenFn(predicate, whenTrueFn, input) {
  if (!predicate(input)) return input;
  return whenTrueFn(input);
}

const when = curry(whenFn);

function where(conditions, input) {
  if (input === undefined) {
    return _input => where(conditions, _input);
  }

  let flag = true;

  for (const prop in conditions) {
    const result = conditions[prop](input[prop]);

    if (flag && result === false) {
      flag = false;
    }
  }

  return flag;
}

function whereEq(condition, input) {
  if (arguments.length === 1) {
    return _input => whereEq(condition, _input);
  }

  const result = filter((conditionValue, conditionProp) => equals(conditionValue, input[conditionProp]), condition);
  return Object.keys(result).length === Object.keys(condition).length;
}

function without(matchAgainst, source) {
  if (source === undefined) {
    return _source => without(matchAgainst, _source);
  }

  return reduce((prev, current) => includes(current, matchAgainst) ? prev : prev.concat(current), [], source);
}

function xor(a, b) {
  if (arguments.length === 1) return _b => xor(a, _b);
  return Boolean(a) && !b || Boolean(b) && !a;
}

function zip(left, right) {
  if (arguments.length === 1) return _right => zip(left, _right);
  const result = [];
  const length = Math.min(left.length, right.length);

  for (let i = 0; i < length; i++) {
    result[i] = [left[i], right[i]];
  }

  return result;
}

function zipObj(keys, values) {
  if (arguments.length === 1) return yHolder => zipObj(keys, yHolder);
  return take(values.length, keys).reduce((prev, xInstance, i) => {
    prev[xInstance] = values[i];
    return prev;
  }, {});
}

exports.DELAY = DELAY;
exports.F = F;
exports.T = T;
exports.add = add;
exports.adjust = adjust;
exports.all = all;
exports.allFalse = allFalse;
exports.allPass = allPass;
exports.allTrue = allTrue;
exports.allType = allType;
exports.always = always;
exports.and = and;
exports.any = any;
exports.anyFalse = anyFalse;
exports.anyPass = anyPass;
exports.anyTrue = anyTrue;
exports.anyType = anyType;
exports.append = append;
exports.applySpec = applySpec;
exports.assoc = assoc;
exports.assocPath = assocPath;
exports.both = both;
exports.chain = chain;
exports.change = change;
exports.check = check;
exports.clamp = clamp;
exports.clone = clone;
exports.compact = compact;
exports.complement = complement;
exports.compose = compose;
exports.composeAsync = composeAsync;
exports.concat = concat;
exports.cond = cond;
exports.converge = converge;
exports.count = count;
exports.curry = curry;
exports.curryN = curryN;
exports.debounce = debounce;
exports.dec = dec;
exports.defaultTo = defaultTo;
exports.delay = delay;
exports.difference = difference;
exports.dissoc = dissoc;
exports.divide = divide;
exports.drop = drop;
exports.dropLast = dropLast;
exports.either = either;
exports.endsWith = endsWith;
exports.equals = equals;
exports.filter = filter;
exports.filterAsync = filterAsync;
exports.find = find;
exports.findIndex = findIndex;
exports.findLast = findLast;
exports.findLastIndex = findLastIndex;
exports.flatten = flatten;
exports.flip = flip;
exports.forEach = forEach;
exports.fromPairs = fromPairs;
exports.fromPrototypeToString = fromPrototypeToString;
exports.getter = getter;
exports.glue = glue;
exports.groupBy = groupBy;
exports.groupWith = groupWith;
exports.has = has;
exports.hasPath = hasPath;
exports.head = head;
exports.identical = identical;
exports.identity = identity;
exports.ifElse = ifElse;
exports.ifElseAsync = ifElseAsync;
exports.inc = inc;
exports.includes = includes;
exports.indexBy = indexBy;
exports.indexOf = indexOf;
exports.init = init;
exports.interpolate = interpolate;
exports.intersection = intersection;
exports.intersperse = intersperse;
exports.is = is$1;
exports.isEmpty = isEmpty;
exports.isFunction = isFunction$1;
exports.isNil = isNil;
exports.isPromise = isPromise;
exports.isPrototype = isPrototype;
exports.isType = isType;
exports.isValid = isValid;
exports.isValidAsync = isValidAsync;
exports.join = join;
exports.keys = keys;
exports.last = last;
exports.lastIndexOf = lastIndexOf;
exports.length = length;
exports.lens = lens;
exports.lensEq = lensEq;
exports.lensIndex = lensIndex;
exports.lensPath = lensPath;
exports.lensProp = lensProp;
exports.lensSatisfies = lensSatisfies;
exports.map = map;
exports.mapAsync = mapAsync;
exports.mapAsyncLimit = mapAsyncLimit;
exports.mapFastAsync = mapFastAsync;
exports.mapFastAsyncFn = mapFastAsyncFn;
exports.mapKeys = mapKeys;
exports.mapToObject = mapToObject;
exports.mapToObjectAsync = mapToObjectAsync;
exports.match = match;
exports.mathMod = mathMod;
exports.max = max;
exports.maxBy = maxBy;
exports.maxByFn = maxByFn;
exports.maybe = maybe;
exports.mean = mean;
exports.median = median;
exports.memoize = memoize$1;
exports.merge = merge;
exports.mergeAll = mergeAll;
exports.mergeDeepRight = mergeDeepRight;
exports.mergeLeft = mergeLeft;
exports.min = min;
exports.minBy = minBy;
exports.minByFn = minByFn;
exports.modulo = modulo;
exports.move = move;
exports.multiply = multiply;
exports.negate = negate;
exports.nextIndex = nextIndex;
exports.none = none;
exports.not = not;
exports.nth = nth;
exports.of = of;
exports.ok = ok;
exports.omit = omit;
exports.once = once;
exports.over = over;
exports.partial = partial;
exports.partialCurry = partialCurry;
exports.partition = partition;
exports.pass = pass;
exports.path = path;
exports.pathEq = pathEq;
exports.pathOr = pathOr;
exports.paths = paths;
exports.pick = pick;
exports.pickAll = pickAll;
exports.pipe = pipe;
exports.piped = piped;
exports.pipedAsync = pipedAsync;
exports.pluck = pluck;
exports.prepend = prepend;
exports.prevIndex = prevIndex;
exports.produce = produce;
exports.product = product;
exports.prop = prop;
exports.propEq = propEq;
exports.propIs = propIs;
exports.propOr = propOr;
exports.prototypeToString = prototypeToString;
exports.random = random;
exports.range = range;
exports.reduce = reduce;
exports.reject = reject;
exports.remove = remove;
exports.renameProps = renameProps;
exports.repeat = repeat;
exports.replace = replace$1;
exports.replaceAll = replaceAll;
exports.reset = reset;
exports.reverse = reverse;
exports.schemaToString = schemaToString;
exports.set = set$1;
exports.setter = setter;
exports.shuffle = shuffle;
exports.slice = slice;
exports.sort = sort;
exports.sortBy = sortBy;
exports.sortByPath = sortByPath;
exports.sortByProps = sortByProps;
exports.sortObject = sortObject;
exports.split = split;
exports.splitEvery = splitEvery;
exports.startsWith = startsWith;
exports.subtract = subtract;
exports.sum = sum;
exports.switcher = switcher;
exports.symmetricDifference = symmetricDifference;
exports.tail = tail;
exports.take = take;
exports.takeLast = takeLast;
exports.tap = tap;
exports.tapAsync = tapAsync;
exports.test = test;
exports.throttle = throttle;
exports.times = times;
exports.toDecimal = toDecimal;
exports.toLower = toLower;
exports.toPairs = toPairs;
exports.toString = toString$1;
exports.toUpper = toUpper;
exports.transpose = transpose;
exports.trim = trim;
exports.tryCatch = tryCatch;
exports.type = type;
exports.union = union;
exports.uniq = uniq;
exports.uniqWith = uniqWith;
exports.unless = unless;
exports.update = update;
exports.values = values;
exports.view = view;
exports.wait = wait;
exports.waitFor = waitFor;
exports.when = when;
exports.where = where;
exports.whereEq = whereEq;
exports.without = without;
exports.xor = xor;
exports.zip = zip;
exports.zipObj = zipObj;
