/*
Copyright (c) 2016 Daybrush
name: scenejs
license: MIT
author: Daybrush
repository: https://github.com/daybrush/scenejs.git
version: 1.4.2
*/
import { isString, splitText, isArray, splitComma, splitSpace, RGBA, splitBracket, COLOR_MODELS, stringToRGBA, OBJECT, ARRAY, PROPERTY, STRING, NUMBER, isObject, IS_WINDOW, $, ANIMATION, removeEvent, addEvent, requestAnimationFrame, cancelAnimationFrame, splitUnit, camelize, getKeys, sortOrders, isUndefined, FILTER, TRANSFORM, FUNCTION, dot as dot$1, isFunction, toArray, fromCSS, findIndex, find, KEYFRAMES, addClass, removeClass, hasClass, decamelize } from '@daybrush/utils';
import EventEmitter from '@scena/event-emitter';
import OrderMap from 'order-map';
import styled from 'css-styled';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function cubic(y1, y2, t) {
  var t2 = 1 - t; // Bezier Curve Formula

  return t * t * t + 3 * t * t * t2 * y2 + 3 * t * t2 * t2 * y1;
}

function solveFromX(x1, x2, x) {
  // x  0 ~ 1
  // t 0 ~ 1
  var t = x;
  var solveX = x;
  var dx = 1;

  while (Math.abs(dx) > 1 / 1000) {
    // 예상 t초에 의한 _x값
    solveX = cubic(x1, x2, t);
    dx = solveX - x; // 차이가 미세하면 그 값을 t로 지정

    if (Math.abs(dx) < 1 / 1000) {
      return t;
    }

    t -= dx / 2;
  }

  return t;
}
/**
 * @namespace easing
 */

/**
* Cubic Bezier curve.
* @memberof easing
* @func bezier
* @param {number} [x1] - point1's x
* @param {number} [y1] - point1's y
* @param {number} [x2] - point2's x
* @param {number} [y2] - point2's y
* @return {function} the curve function
* @example
import {bezier} from "scenejs";
Scene.bezier(0, 0, 1, 1) // LINEAR
Scene.bezier(0.25, 0.1, 0.25, 1) // EASE
*/


function bezier(x1, y1, x2, y2) {
  /*
        x = f(t)
        calculate inverse function by x
        t = f-1(x)
    */
  var func = function (x) {
    var t = solveFromX(x1, x2, Math.max(Math.min(1, x), 0));
    return cubic(y1, y2, t);
  };

  func.easingName = "cubic-bezier(" + x1 + "," + y1 + "," + x2 + "," + y2 + ")";
  return func;
}
/**
* Specifies a stepping function
* @see {@link https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp|CSS3 Timing Function}
* @memberof easing
* @func steps
* @param {number} count - point1's x
* @param {"start" | "end"} postion - point1's y
* @return {function} the curve function
* @example
import {steps} from "scenejs";
Scene.steps(1, "start") // Scene.STEP_START
Scene.steps(1, "end") // Scene.STEP_END
*/

function steps(count, position) {
  var func = function (time) {
    var level = 1 / count;

    if (time >= 1) {
      return 1;
    }

    return (position === "start" ? level : 0) + Math.floor(time / level) * level;
  };

  func.easingName = "steps(" + count + ", " + position + ")";
  return func;
}
/**
* Equivalent to steps(1, start)
* @memberof easing
* @name STEP_START
* @static
* @type {function}
* @example
import {STEP_START} from "scenejs";
Scene.STEP_START // steps(1, start)
*/

var STEP_START =
/*#__PURE__#*/
steps(1, "start");
/**
* Equivalent to steps(1, end)
* @memberof easing
* @name STEP_END
* @static
* @type {function}
* @example
import {STEP_END} from "scenejs";
Scene.STEP_END // steps(1, end)
*/

var STEP_END =
/*#__PURE__#*/
steps(1, "end");
/**
* Linear Speed (0, 0, 1, 1)
* @memberof easing
* @name LINEAR
* @static
* @type {function}
* @example
import {LINEAR} from "scenejs";
Scene.LINEAR
*/

var LINEAR =
/*#__PURE__#*/
bezier(0, 0, 1, 1);
/**
* Ease Speed (0.25, 0.1, 0.25, 1)
* @memberof easing
* @name EASE
* @static
* @type {function}
* @example
import {EASE} from "scenejs";
Scene.EASE
*/

var EASE =
/*#__PURE__#*/
bezier(0.25, 0.1, 0.25, 1);
/**
* Ease In Speed (0.42, 0, 1, 1)
* @memberof easing
* @name EASE_IN
* @static
* @type {function}
* @example
import {EASE_IN} from "scenejs";
Scene.EASE_IN
*/

var EASE_IN =
/*#__PURE__#*/
bezier(0.42, 0, 1, 1);
/**
* Ease Out Speed (0, 0, 0.58, 1)
* @memberof easing
* @name EASE_OUT
* @static
* @type {function}
* @example
import {EASE_OUT} from "scenejs";
Scene.EASE_OUT
*/

var EASE_OUT =
/*#__PURE__#*/
bezier(0, 0, 0.58, 1);
/**
* Ease In Out Speed (0.42, 0, 0.58, 1)
* @memberof easing
* @name EASE_IN_OUT
* @static
* @type {function}
* @example
import {EASE_IN_OUT} from "scenejs";
Scene.EASE_IN_OUT
*/

var EASE_IN_OUT =
/*#__PURE__#*/
bezier(0.42, 0, 0.58, 1);

var _a;
var PREFIX = "__SCENEJS_";
var DATA_SCENE_ID = "data-scene-id";
var TIMING_FUNCTION = "animation-timing-function";
var ROLES = {
  transform: {},
  filter: {},
  attribute: {},
  html: true
};
var ALIAS = {
  easing: [TIMING_FUNCTION]
};
var FIXED = (_a = {}, _a[TIMING_FUNCTION] = true, _a.contents = true, _a.html = true, _a);
var MAXIMUM = 1000000;
var THRESHOLD = 0.000001;
var DURATION = "duration";
var FILL_MODE = "fillMode";
var DIRECTION = "direction";
var ITERATION_COUNT = "iterationCount";
var DELAY = "delay";
var EASING = "easing";
var PLAY_SPEED = "playSpeed";
var EASING_NAME = "easingName";
var ITERATION_TIME = "iterationTime";
var PAUSED = "paused";
var ENDED = "ended";
var TIMEUPDATE = "timeupdate";
var ANIMATE = "animate";
var PLAY = "play";
var RUNNING = "running";
var ITERATION = "iteration";
var START_ANIMATION = "startAnimation";
var PAUSE_ANIMATION = "pauseAnimation";
var ALTERNATE = "alternate";
var REVERSE = "reverse";
var ALTERNATE_REVERSE = "alternate-reverse";
var NORMAL = "normal";
var INFINITE = "infinite";
var PLAY_STATE = "playState";
var PLAY_CSS = "playCSS";
var PREV_TIME = "prevTime";
var TICK_TIME = "tickTime";
var CURRENT_TIME = "currentTime";
var SELECTOR = "selector";
var TRANSFORM_NAME = "transform";
var EASINGS = {
  "linear": LINEAR,
  "ease": EASE,
  "ease-in": EASE_IN,
  "ease-out": EASE_OUT,
  "ease-in-out": EASE_IN_OUT,
  "step-start": STEP_START,
  "step-end": STEP_END
};
var NAME_SEPARATOR = "_///_";
/**
* option name list
* @name Scene.OPTIONS
* @memberof Scene
* @static
* @type {$ts:OptionType}
* @example
* Scene.OPTIONS // ["duration", "fillMode", "direction", "iterationCount", "delay", "easing", "playSpeed"]
*/

var OPTIONS = [DURATION, FILL_MODE, DIRECTION, ITERATION_COUNT, DELAY, EASING, PLAY_SPEED];
/**
* Event name list
* @name Scene.EVENTS
* @memberof Scene
* @static
* @type {$ts:EventType}
* @example
* Scene.EVENTS // ["paused", "ended", "timeupdate", "animate", "play", "iteration"];
*/

var EVENTS = [PAUSED, ENDED, TIMEUPDATE, ANIMATE, PLAY, ITERATION];

/**
* Make string, array to PropertyObject for the dot product
*/

var PropertyObject =
/*#__PURE__*/
function () {
  /**
    * @param - This value is in the array format.
    * @param - options
    * @example
  var obj = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")"
  });
     */
  function PropertyObject(value, options) {
    this.prefix = "";
    this.suffix = "";
    this.model = "";
    this.type = "";
    this.separator = ",";
    options && this.setOptions(options);
    this.value = isString(value) ? value.split(this.separator) : value;
  }

  var __proto = PropertyObject.prototype;

  __proto.setOptions = function (newOptions) {
    for (var name in newOptions) {
      this[name] = newOptions[name];
    }

    return this;
  };
  /**
    * the number of values.
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  console.log(obj1.length);
  // 3
     */


  __proto.size = function () {
    return this.value.length;
  };
  /**
    * retrieve one of values at the index
    * @param {Number} index - index
    * @return {Object} one of values at the index
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  console.log(obj1.get(0));
  // 1
     */


  __proto.get = function (index) {
    return this.value[index];
  };
  /**
    * Set the value at that index
    * @param {Number} index - index
    * @param {Object} value - text, a number, object to set
    * @return {PropertyObject} An instance itself
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  obj1.set(0, 2);
  console.log(obj1.toValue());
  // 2,2,3
     */


  __proto.set = function (index, value) {
    this.value[index] = value;
    return this;
  };
  /**
    * create a copy of an instance itself.
    * @return {PropertyObject} clone
    * @example
  const obj1 = new PropertyObject("1,2,3", ",");
  const obj2 = obj1.clone();
     */


  __proto.clone = function () {
    var _a = this,
        separator = _a.separator,
        prefix = _a.prefix,
        suffix = _a.suffix,
        model = _a.model,
        type = _a.type;

    var arr = this.value.map(function (v) {
      return v instanceof PropertyObject ? v.clone() : v;
    });
    return new PropertyObject(arr, {
      separator: separator,
      prefix: prefix,
      suffix: suffix,
      model: model,
      type: type
    });
  };
  /**
    * Make Property Object to String
    * @return {String} Make Property Object to String
    * @example
  //rgba(100, 100, 100, 0.5)
  const obj4 = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")",
  });
  console.log(obj4.toValue());
  // "rgba(100,100,100,0.5)"
    */


  __proto.toValue = function () {
    return this.prefix + this.join() + this.suffix;
  };
  /**
    * Make Property Object's array to String
    * @return {String} Join the elements of an array into a string
    * @example
    //rgba(100, 100, 100, 0.5)
    var obj4 = new PropertyObject([100,100,100,0.5], {
        "separator" : ",",
        "prefix" : "rgba(",
        "suffix" : ")"
    });
    obj4.join();  // =>   "100,100,100,0.5"
     */


  __proto.join = function () {
    return this.value.map(function (v) {
      return v instanceof PropertyObject ? v.toValue() : v;
    }).join(this.separator);
  };
  /**
    * executes a provided function once per array element.
    * @param {Function} callback - Function to execute for each element, taking three arguments
    * @param {All} [callback.currentValue] The current element being processed in the array.
    * @param {Number} [callback.index] The index of the current element being processed in the array.
    * @param {Array} [callback.array] the array.
    * @return {PropertyObject} An instance itself
    * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach|MDN Array.forEach()} reference to MDN document.
    * @example
  //rgba(100, 100, 100, 0.5)
  var obj4 = new PropertyObject([100,100,100,0.5], {
    "separator" : ",",
    "prefix" : "rgba(",
    "suffix" : ")"
  });
  obj4.forEach(t => {
    console.log(t);
  });  // =>   "100,100,100,0.5"
    */


  __proto.forEach = function (func) {
    this.value.forEach(func);
    return this;
  };

  return PropertyObject;
}();

/**
* @namespace
* @name Property
*/
function splitStyle(str) {
  var properties = splitText(str, ";");
  var obj = {};
  var totalLength = properties.length;
  var length = totalLength;

  for (var i = 0; i < totalLength; ++i) {
    var matches = splitText(properties[i], ":");

    if (matches.length < 2 || !matches[1]) {
      --length;
      continue;
    }

    obj[matches[0].trim()] = toPropertyObject(matches[1].trim());
  }

  return {
    styles: obj,
    length: length
  };
}
/**
* convert array to PropertyObject[type=color].
* default model "rgba"
* @memberof Property
* @function arrayToColorObject
* @param {Array|PropertyObject} value ex) [0, 0, 0, 1]
* @return {PropertyObject} PropertyObject[type=color]
* @example
arrayToColorObject([0, 0, 0])
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0, 1], separator=",")
*/

function arrayToColorObject(arr) {
  var model = RGBA;

  if (arr.length === 3) {
    arr[3] = 1;
  }

  return new PropertyObject(arr, {
    model: model,
    separator: ",",
    type: "color",
    prefix: model + "(",
    suffix: ")"
  });
}
/**
* convert text with parentheses to object.
* @memberof Property
* @function stringToBracketObject
* @param {String} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject
* @example
stringToBracketObject("abcde(0, 0, 0,1)")
// => PropertyObject(model="abcde", value=[0, 0, 0,1], separator=",")
*/

function stringToBracketObject(text) {
  // [prefix, value, other]
  var _a = splitBracket(text),
      model = _a.prefix,
      value = _a.value,
      afterModel = _a.suffix;

  if (typeof value === "undefined") {
    return text;
  }

  if (COLOR_MODELS.indexOf(model) > -1) {
    return arrayToColorObject(stringToRGBA(text));
  } // divide comma(,)


  var obj = toPropertyObject(value, model);
  var arr = [value];
  var separator = ",";
  var prefix = model + "(";
  var suffix = ")" + afterModel;

  if (obj instanceof PropertyObject) {
    separator = obj.separator;
    arr = obj.value;
    prefix += obj.prefix;
    suffix = obj.suffix + suffix;
  }

  return new PropertyObject(arr, {
    separator: separator,
    model: model,
    prefix: prefix,
    suffix: suffix
  });
}
function arrayToPropertyObject(arr, separator) {
  return new PropertyObject(arr, {
    type: "array",
    separator: separator
  });
}
/**
* convert text with parentheses to PropertyObject[type=color].
* If the values are not RGBA model, change them RGBA mdoel.
* @memberof Property
* @function stringToColorObject
* @param {String|PropertyObject} value ex) "rgba(0,0,0,1)"
* @return {PropertyObject} PropertyObject[type=color]
* @example
stringToColorObject("rgba(0, 0, 0,1)")
// => PropertyObject(type="color", model="rgba", value=[0, 0, 0,1], separator=",")
*/

function stringToColorObject(value) {
  var result = stringToRGBA(value);
  return result ? arrayToColorObject(result) : value;
}
function toPropertyObject(value, model) {
  if (!isString(value)) {
    if (isArray(value)) {
      return arrayToPropertyObject(value, ",");
    }

    return value;
  }

  var values = splitComma(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), ",");
  }

  values = splitSpace(value);

  if (values.length > 1) {
    return arrayToPropertyObject(values.map(function (v) {
      return toPropertyObject(v);
    }), " ");
  }

  values = /^(['"])([^'"]*)(['"])$/g.exec(value);

  if (values && values[1] === values[3]) {
    // Quotes
    return new PropertyObject([toPropertyObject(values[2])], {
      prefix: values[1],
      suffix: values[1]
    });
  } else if (value.indexOf("(") !== -1) {
    // color
    return stringToBracketObject(value);
  } else if (value.charAt(0) === "#" && model !== "url") {
    return stringToColorObject(value);
  }

  return value;
}
function toObject(object, result) {
  if (result === void 0) {
    result = {};
  }

  var model = object.model;

  if (model) {
    object.setOptions({
      model: "",
      suffix: "",
      prefix: ""
    });
    var value = object.size() > 1 ? object : object.get(0);
    result[model] = value;
  } else {
    object.forEach(function (obj) {
      toObject(obj, result);
    });
  }

  return result;
}

function isPropertyObject(value) {
  return value instanceof PropertyObject;
}
function setAlias(name, alias) {
  ALIAS[name] = alias;
}
function setRole(names, isProperty, isFixedProperty) {
  var length = names.length;
  var roles = ROLES;
  var fixed = FIXED;

  for (var i = 0; i < length - 1; ++i) {
    !roles[names[i]] && (roles[names[i]] = {});
    roles = roles[names[i]];

    if (isFixedProperty) {
      !fixed[names[i]] && (fixed[names[i]] = {});
      fixed = fixed[names[i]];
    }
  }

  isFixedProperty && (fixed[names[length - 1]] = true);
  roles[names[length - 1]] = isProperty ? true : {};
}
function getType(value) {
  var type = typeof value;

  if (type === OBJECT) {
    if (isArray(value)) {
      return ARRAY;
    } else if (isPropertyObject(value)) {
      return PROPERTY;
    }
  } else if (type === STRING || type === NUMBER) {
    return "value";
  }

  return type;
}
function isPureObject(obj) {
  return isObject(obj) && obj.constructor === Object;
}
function getNames(names, stack) {
  var arr = [];

  if (isPureObject(names)) {
    for (var name in names) {
      stack.push(name);
      arr = arr.concat(getNames(names[name], stack));
      stack.pop();
    }
  } else {
    arr.push(stack.slice());
  }

  return arr;
}
function updateFrame(names, properties) {
  for (var name in properties) {
    var value = properties[name];

    if (!isPureObject(value)) {
      names[name] = true;
      continue;
    }

    if (!isObject(names[name])) {
      names[name] = {};
    }

    updateFrame(names[name], properties[name]);
  }

  return names;
}
function toFixed(num) {
  return Math.round(num * MAXIMUM) / MAXIMUM;
}
function getValueByNames(names, properties, length) {
  if (length === void 0) {
    length = names.length;
  }

  var value = properties;

  for (var i = 0; i < length; ++i) {
    if (!isObject(value) || value == null) {
      return undefined;
    }

    value = value[names[i]];
  }

  return value;
}
function isInProperties(roles, args, isCheckTrue) {
  var length = args.length;
  var role = roles;

  if (length === 0) {
    return false;
  }

  for (var i = 0; i < length; ++i) {
    if (role === true) {
      return false;
    }

    role = role[args[i]];

    if (!role || !isCheckTrue && role === true) {
      return false;
    }
  }

  return true;
}
function isRole(args, isCheckTrue) {
  return isInProperties(ROLES, args, isCheckTrue);
}
function isFixed(args) {
  return isInProperties(FIXED, args, true);
}
function setPlayCSS(item, isActivate) {
  item.state[PLAY_CSS] = isActivate;
}
function isPausedCSS(item) {
  return item.state[PLAY_CSS] && item.isPaused();
}
function isEndedCSS(item) {
  return !item.isEnded() && item.state[PLAY_CSS];
}
function makeId(selector) {
  for (;;) {
    var id = "" + Math.floor(Math.random() * 10000000);

    if (!IS_WINDOW || !selector) {
      return id;
    }

    var checkElement = $("[data-scene-id=\"" + id + "\"]");

    if (!checkElement) {
      return id;
    }
  }
}
function getRealId(item) {
  return item.getId() || item.setId(makeId(false)).getId();
}
function toId(text) {
  return ("" + text).match(/[0-9a-zA-Z]+/g).join("");
}
function playCSS(item, isExportCSS, playClassName, properties) {
  if (properties === void 0) {
    properties = {};
  }

  if (!ANIMATION || item.getPlayState() === RUNNING) {
    return;
  }

  var className = playClassName || START_ANIMATION;

  if (isPausedCSS(item)) {
    item.addPlayClass(true, className, properties);
  } else {
    if (item.isEnded()) {
      item.setTime(0);
    }

    isExportCSS && item.exportCSS({
      className: className
    });
    var el = item.addPlayClass(false, className, properties);

    if (!el) {
      return;
    }

    addAnimationEvent(item, el);
    setPlayCSS(item, true);
  }

  item.setPlayState(RUNNING);
}
function addAnimationEvent(item, el) {
  var state = item.state;
  var duration = item.getDuration();
  var isZeroDuration = !duration || !isFinite(duration);

  var animationend = function () {
    setPlayCSS(item, false);
    item.finish();
  };

  var animationstart = function () {
    item.trigger(PLAY);
    addEvent(el, "animationcancel", animationend);
    addEvent(el, "animationend", animationend);
    addEvent(el, "animationiteration", animationiteration);
  };

  item.once(ENDED, function () {
    removeEvent(el, "animationcancel", animationend);
    removeEvent(el, "animationend", animationend);
    removeEvent(el, "animationiteration", animationiteration);
    removeEvent(el, "animationstart", animationstart);
  });

  var animationiteration = function (_a) {
    var elapsedTime = _a.elapsedTime;
    var currentTime = elapsedTime;
    var iterationCount = isZeroDuration ? 0 : currentTime / duration;
    state[CURRENT_TIME] = currentTime;
    item.setIteration(iterationCount);
  };

  addEvent(el, "animationstart", animationstart);
}
function getEasing(curveArray) {
  var easing;

  if (isString(curveArray)) {
    if (curveArray in EASINGS) {
      easing = EASINGS[curveArray];
    } else {
      var obj = toPropertyObject(curveArray);

      if (isString(obj)) {
        return 0;
      } else {
        if (obj.model === "cubic-bezier") {
          curveArray = obj.value.map(function (v) {
            return parseFloat(v);
          });
          easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
        } else if (obj.model === "steps") {
          easing = steps(parseFloat(obj.value[0]), obj.value[1]);
        } else {
          return 0;
        }
      }
    }
  } else if (isArray(curveArray)) {
    easing = bezier(curveArray[0], curveArray[1], curveArray[2], curveArray[3]);
  } else {
    easing = curveArray;
  }

  return easing;
}

function GetterSetter(getter, setter, parent) {
  return function (constructor) {
    var prototype = constructor.prototype;
    getter.forEach(function (name) {
      prototype[camelize("get " + name)] = function () {
        return this[parent][name];
      };
    });
    setter.forEach(function (name) {
      prototype[camelize("set " + name)] = function (value) {
        this[parent][name] = value;
        return this;
      };
    });
  };
}

function isDirectionReverse(iteration, iteraiontCount, direction) {
  if (direction === REVERSE) {
    return true;
  } else if (iteraiontCount !== INFINITE && iteration === iteraiontCount && iteraiontCount % 1 === 0) {
    return direction === (iteration % 2 >= 1 ? ALTERNATE_REVERSE : ALTERNATE);
  }

  return direction === (iteration % 2 >= 1 ? ALTERNATE : ALTERNATE_REVERSE);
}
/**
* @typedef {Object} AnimatorState The Animator options. Properties used in css animation.
* @property {number} [duration] The duration property defines how long an animation should take to complete one cycle.
* @property {"none"|"forwards"|"backwards"|"both"} [fillMode] The fillMode property specifies a style for the element when the animation is not playing (before it starts, after it ends, or both).
* @property {"infinite"|number} [iterationCount] The iterationCount property specifies the number of times an animation should be played.
* @property {array|function} [easing] The easing(timing-function) specifies the speed curve of an animation.
* @property {number} [delay] The delay property specifies a delay for the start of an animation.
* @property {"normal"|"reverse"|"alternate"|"alternate-reverse"} [direction] The direction property defines whether an animation should be played forwards, backwards or in alternate cycles.
*/

var setters = ["id", ITERATION_COUNT, DELAY, FILL_MODE, DIRECTION, PLAY_SPEED, DURATION, PLAY_SPEED, ITERATION_TIME, PLAY_STATE];

var getters = __spreadArrays(setters, [EASING, EASING_NAME]);
/**
* play video, animation, the others
* @extends EventTrigger
* @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
*/


var Animator =
/*#__PURE__*/
function (_super) {
  __extends(Animator, _super);
  /**
   * @param - animator's options
   * @example
  const animator = new Animator({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.easing.EASE,
  });
   */


  function Animator(options) {
    var _this = _super.call(this) || this;

    _this.timerId = 0;
    _this.state = {
      id: "",
      easing: 0,
      easingName: "linear",
      iterationCount: 1,
      delay: 0,
      fillMode: "forwards",
      direction: NORMAL,
      playSpeed: 1,
      currentTime: 0,
      iterationTime: -1,
      iteration: 0,
      tickTime: 0,
      prevTime: 0,
      playState: PAUSED,
      duration: 0
    };

    _this.setOptions(options);

    return _this;
  }
  /**
    * set animator's easing.
    * @param curverArray - The speed curve of an animation.
    * @return {Animator} An instance itself.
    * @example
  animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.easing.EASE,
  });
    */


  var __proto = Animator.prototype;

  __proto.setEasing = function (curveArray) {
    var easing = getEasing(curveArray);
    var easingName = easing && easing[EASING_NAME] || "linear";
    var state = this.state;
    state[EASING] = easing;
    state[EASING_NAME] = easingName;
    return this;
  };
  /**
    * set animator's options.
    * @see {@link https://www.w3schools.com/css/css3_animations.asp|CSS3 Animation}
    * @param - animator's options
    * @return {Animator} An instance itself.
    * @example
  animator.({
    delay: 2,
    diretion: "alternate",
    duration: 2,
    fillMode: "forwards",
    iterationCount: 3,
    easing: Scene.eaasing.EASE,
  });
    */


  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    for (var name in options) {
      var value = options[name];

      if (name === EASING) {
        this.setEasing(value);
        continue;
      } else if (name === DURATION) {
        value && this.setDuration(value);
        continue;
      }

      if (OPTIONS.indexOf(name) > -1) {
        this.state[name] = value;
      }
    }

    return this;
  };
  /**
    * Get the animator's total duration including delay
    * @return {number} Total duration
    * @example
  animator.getTotalDuration();
    */


  __proto.getTotalDuration = function () {
    return this.getActiveDuration(true);
  };
  /**
    * Get the animator's total duration excluding delay
    * @return {number} Total duration excluding delay
    * @example
  animator.getActiveDuration();
    */


  __proto.getActiveDuration = function (delay) {
    var state = this.state;
    var count = state[ITERATION_COUNT];

    if (count === INFINITE) {
      return Infinity;
    }

    return (delay ? state[DELAY] : 0) + this.getDuration() * count;
  };
  /**
    * Check if the animator has reached the end.
    * @return {boolean} ended
    * @example
  animator.isEnded(); // true or false
    */


  __proto.isEnded = function () {
    if (this.state[TICK_TIME] === 0 && this.state[PLAY_STATE] === PAUSED) {
      return true;
    } else if (this.getTime() < this.getActiveDuration()) {
      return false;
    }

    return true;
  };
  /**
    *Check if the animator is paused:
    * @return {boolean} paused
    * @example
  animator.isPaused(); // true or false
    */


  __proto.isPaused = function () {
    return this.state[PLAY_STATE] === PAUSED;
  };

  __proto.start = function (delay) {
    if (delay === void 0) {
      delay = this.state[DELAY];
    }

    var state = this.state;
    state[PLAY_STATE] = RUNNING;

    if (state[TICK_TIME] >= delay) {
      /**
       * This event is fired when play animator.
       * @event Animator#play
       */
      this.trigger(PLAY);
      return true;
    }

    return false;
  };
  /**
    * play animator
    * @return {Animator} An instance itself.
    */


  __proto.play = function (toTime) {
    var _this = this;

    var state = this.state;
    var delay = state[DELAY];
    var currentTime = this.getTime();
    state[PLAY_STATE] = RUNNING;

    if (this.isEnded() && (currentTime === 0 || currentTime >= this.getActiveDuration())) {
      this.setTime(-delay, true);
    }

    this.timerId = requestAnimationFrame(function (time) {
      state[PREV_TIME] = time;

      _this.tick(time, toTime);
    });
    this.start();
    return this;
  };
  /**
    * pause animator
    * @return {Animator} An instance itself.
    */


  __proto.pause = function () {
    var state = this.state;

    if (state[PLAY_STATE] !== PAUSED) {
      state[PLAY_STATE] = PAUSED;
      /**
       * This event is fired when animator is paused.
       * @event Animator#paused
       */

      this.trigger(PAUSED);
    }

    cancelAnimationFrame(this.timerId);
    return this;
  };
  /**
     * end animator
     * @return {Animator} An instance itself.
    */


  __proto.finish = function () {
    this.setTime(0);
    this.state[TICK_TIME] = 0;
    this.end();
    return this;
  };
  /**
     * end animator
     * @return {Animator} An instance itself.
    */


  __proto.end = function () {
    this.pause();
    /**
         * This event is fired when animator is ended.
         * @event Animator#ended
         */

    this.trigger(ENDED);
    return this;
  };
  /**
    * set currentTime
    * @param {Number|String} time - currentTime
    * @return {Animator} An instance itself.
    * @example
  animator.setTime("from"); // 0
  animator.setTime("to"); // 100%
  animator.setTime("50%");
  animator.setTime(10);
  animator.getTime() // 10
    */


  __proto.setTime = function (time, isTick, isParent) {
    var activeDuration = this.getActiveDuration();
    var state = this.state;
    var prevTime = state[TICK_TIME];
    var delay = state[DELAY];
    var currentTime = isTick ? time : this.getUnitTime(time);
    state[TICK_TIME] = delay + currentTime;

    if (currentTime < 0) {
      currentTime = 0;
    } else if (currentTime > activeDuration) {
      currentTime = activeDuration;
    }

    state[CURRENT_TIME] = currentTime;
    this.calculate();

    if (isTick && !isParent) {
      var tickTime = state[TICK_TIME];

      if (prevTime < delay && time >= 0) {
        this.start(0);
      }

      if (tickTime < prevTime || this.isEnded()) {
        this.end();
        return;
      }
    }

    if (this.isDelay()) {
      return this;
    }
    /**
         * This event is fired when the animator updates the time.
         * @event Animator#timeupdate
         * @param {Object} param The object of data to be sent to an event.
         * @param {Number} param.currentTime The total time that the animator is running.
         * @param {Number} param.time The iteration time during duration that the animator is running.
         * @param {Number} param.iterationCount The iteration count that the animator is running.
         */


    this.trigger(TIMEUPDATE, {
      currentTime: currentTime,
      time: this.getIterationTime(),
      iterationCount: state[ITERATION]
    });
    return this;
  };
  /**
    * Get the animator's current time
    * @return {number} current time
    * @example
  animator.getTime();
    */


  __proto.getTime = function () {
    return this.state[CURRENT_TIME];
  };

  __proto.getUnitTime = function (time) {
    if (isString(time)) {
      var duration = this.getDuration() || 100;

      if (time === "from") {
        return 0;
      } else if (time === "to") {
        return duration;
      }

      var _a = splitUnit(time),
          unit = _a.unit,
          value = _a.value;

      if (unit === "%") {
        !this.getDuration() && this.setDuration(duration);
        return toFixed(parseFloat(time) / 100 * duration);
      } else if (unit === ">") {
        return value + THRESHOLD;
      } else {
        return value;
      }
    } else {
      return toFixed(time);
    }
  };
  /**
     * Check if the current state of animator is delayed.
     * @return {boolean} check delay state
     */


  __proto.isDelay = function () {
    var state = this.state;
    var delay = state[DELAY];
    var tickTime = state[TICK_TIME];
    return delay > 0 && tickTime < delay;
  };

  __proto.setIteration = function (iterationCount) {
    var state = this.state;
    var passIterationCount = Math.floor(iterationCount);
    var maxIterationCount = state[ITERATION_COUNT] === INFINITE ? Infinity : state[ITERATION_COUNT];

    if (state[ITERATION] < passIterationCount && passIterationCount < maxIterationCount) {
      /**
            * The event is fired when an iteration of an animation ends.
            * @event Animator#iteration
            * @param {Object} param The object of data to be sent to an event.
            * @param {Number} param.currentTime The total time that the animator is running.
            * @param {Number} param.iterationCount The iteration count that the animator is running.
            */
      this.trigger(ITERATION, {
        currentTime: state[CURRENT_TIME],
        iterationCount: passIterationCount
      });
    }

    state[ITERATION] = iterationCount;
    return this;
  };

  __proto.calculate = function () {
    var state = this.state;
    var iterationCount = state[ITERATION_COUNT];
    var fillMode = state[FILL_MODE];
    var direction = state[DIRECTION];
    var duration = this.getDuration();
    var time = this.getTime();
    var iteration = duration === 0 ? 0 : time / duration;
    var currentIterationTime = duration ? time % duration : 0;

    if (!duration) {
      this.setIterationTime(0);
      return this;
    }

    this.setIteration(iteration); // direction : normal, reverse, alternate, alternate-reverse
    // fillMode : forwards, backwards, both, none

    var isReverse = isDirectionReverse(iteration, iterationCount, direction);
    var isFiniteDuration = isFinite(duration);

    if (isFiniteDuration && isReverse) {
      currentIterationTime = duration - currentIterationTime;
    }

    if (isFiniteDuration && iterationCount !== INFINITE) {
      var isForwards = fillMode === "both" || fillMode === "forwards"; // fill forwards

      if (iteration >= iterationCount) {
        currentIterationTime = duration * (isForwards ? iterationCount % 1 || 1 : 0);
        isReverse && (currentIterationTime = duration - currentIterationTime);
      }
    }

    this.setIterationTime(currentIterationTime);
    return this;
  };

  __proto.tick = function (now, to) {
    var _this = this;

    if (this.isPaused()) {
      return;
    }

    var state = this.state;
    var playSpeed = state[PLAY_SPEED];
    var prevTime = state[PREV_TIME];
    var delay = state[DELAY];
    var tickTime = state[TICK_TIME];
    var currentTime = tickTime + Math.min(1000, now - prevTime) / 1000 * playSpeed;
    state[PREV_TIME] = now;
    this.setTime(currentTime - delay, true);

    if (to && to * 1000 < now) {
      this.pause();
    }

    if (state[PLAY_STATE] === PAUSED) {
      return;
    }

    this.timerId = requestAnimationFrame(function (time) {
      _this.tick(time, to);
    });
  };

  Animator = __decorate([GetterSetter(getters, setters, "state")], Animator);
  return Animator;
}(EventEmitter);

function toInnerProperties(obj, orders) {
  if (orders === void 0) {
    orders = [];
  }

  if (!obj) {
    return "";
  }

  var arrObj = [];
  var keys = getKeys(obj);
  sortOrders(keys, orders);
  keys.forEach(function (name) {
    arrObj.push(name.replace(/\d$/g, "") + "(" + obj[name] + ")");
  });
  return arrObj.join(" ");
}
/* eslint-disable */


function clone(target, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  return merge({}, target, toValue);
}

function merge(to, from, toValue) {
  if (toValue === void 0) {
    toValue = false;
  }

  for (var name in from) {
    var value = from[name];
    var type = getType(value);

    if (type === PROPERTY) {
      to[name] = toValue ? value.toValue() : value.clone();
    } else if (type === FUNCTION) {
      to[name] = toValue ? getValue([name], value) : value;
    } else if (type === ARRAY) {
      to[name] = value.slice();
    } else if (type === OBJECT) {
      if (isObject(to[name]) && !isPropertyObject(to[name])) {
        merge(to[name], value, toValue);
      } else {
        to[name] = clone(value, toValue);
      }
    } else {
      to[name] = from[name];
    }
  }

  return to;
}
/* eslint-enable */


function getPropertyName(args) {
  return args[0] in ALIAS ? ALIAS[args[0]] : args;
}

function getValue(names, value) {
  var type = getType(value);

  if (type === PROPERTY) {
    return value.toValue();
  } else if (type === FUNCTION) {
    if (names[0] !== TIMING_FUNCTION) {
      return getValue(names, value());
    }
  } else if (type === OBJECT) {
    return clone(value, true);
  }

  return value;
}
/**
* Animation's Frame
*/


var Frame =
/*#__PURE__*/
function () {
  /**
   * @param - properties
   * @example
  const frame = new Scene.Frame({
    display: "none"
    transform: {
        translate: "50px",
        scale: "5, 5",
    }
  });
   */
  function Frame(properties) {
    if (properties === void 0) {
      properties = {};
    }

    this.properties = {};
    this.orderMap = new OrderMap(NAME_SEPARATOR);
    this.properties = {}; // this.orders = [];

    this.set(properties);
  }
  /**
    * get property value
    * @param {...Number|String|PropertyObject} args - property name or value
    * @example
    frame.get("display") // => "none", "block", ....
    frame.get("transform", "translate") // => "10px,10px"
    */


  var __proto = Frame.prototype;

  __proto.get = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var value = this.raw.apply(this, args);
    return getValue(getPropertyName(args), value);
  };
  /**
    * get properties orders
    * @param - property names
    * @example
    frame.getOrders(["display"]) // => []
    frame.getOrders(["transform"]) // => ["translate", "scale"]
    */


  __proto.getOrders = function (names) {
    return this.orderMap.get(names);
  };
  /**
    * set properties orders
    * @param - property names
    * @param - orders
    * @example
    frame.getOrders(["transform"]) // => ["translate", "scale"]
    frame.setOrders(["transform"], ["scale", "tralsate"])
    */


  __proto.setOrders = function (names, orders) {
    return this.orderMap.set(names, orders);
  };
  /**
    * get properties order object
    * @example
    console.log(frame.getOrderObject());
    */


  __proto.getOrderObject = function () {
    return this.orderMap.getObject();
  };
  /**
    * set properties orders object
    * @param - properties orders object
    * @example
    frame.setOrderObject({
        "": ["transform"],
        "transform": ["scale", "tralsate"],
    });
    */


  __proto.setOrderObject = function (obj) {
    this.orderMap.setObject(obj);
  };
  /**
    * get property keys
    * @param - property names
    * @example
    frame.gets("display") // => []
    frame.gets("transform") // => ["translate"]
    */


  __proto.getKeys = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var value = this.raw.apply(this, args);
    var keys = getType(value) === OBJECT ? getKeys(value) : [];
    sortOrders(keys, this.orderMap.get(args));
    return keys;
  };
  /**
    * get properties array
    * @param - property names
    * @example
    frame.gets("display") // => []
    frame.gets("transform") // => [{ key: "translate", value: "10px, 10px", children: [] }]
    */


  __proto.gets = function () {
    var _this = this;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var values = this.get.apply(this, args);
    var keys = this.getKeys.apply(this, args);
    return keys.map(function (key) {
      var nextValue = values[key];
      return {
        key: key,
        value: nextValue,
        children: _this.gets.apply(_this, __spreadArrays(args, [key]))
      };
    });
  };

  __proto.raw = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return getValueByNames(getPropertyName(args), this.properties);
  };
  /**
    * remove property value
    * @param {...String} args - property name
    * @return {Frame} An instance itself
    * @example
    frame.remove("display")
    */


  __proto.remove = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return this;
    }

    this.orderMap.remove(params);
    var value = getValueByNames(params, this.properties, length - 1);

    if (isObject(value)) {
      delete value[params[length - 1]];
    }

    return this;
  };
  /**
    * set property
    * @param {...Number|String|PropertyObject} args - property names or values
    * @return {Frame} An instance itself
    * @example
  // one parameter
  frame.set({
    display: "none",
    transform: {
        translate: "10px, 10px",
        scale: "1",
    },
    filter: {
        brightness: "50%",
        grayscale: "100%"
    }
  });
  // two parameters
  frame.set("transform", {
    translate: "10px, 10px",
    scale: "1",
  });
  // three parameters
  frame.set("transform", "translate", "50px");
  */


  __proto.set = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var self = this;
    var length = args.length;
    var params = args.slice(0, -1);
    var value = args[length - 1];
    var firstParam = params[0];

    if (length === 1 && value instanceof Frame) {
      self.merge(value);
    } else if (firstParam in ALIAS) {
      self._set(ALIAS[firstParam], value);
    } else if (length === 2 && isArray(firstParam)) {
      self._set(firstParam, value);
    } else if (isPropertyObject(value)) {
      if (isRole(params)) {
        self.set.apply(self, __spreadArrays(params, [toObject(value)]));
      } else {
        self._set(params, value);
      }
    } else if (isArray(value)) {
      self._set(params, value);
    } else if (isObject(value)) {
      if (!self.has.apply(self, params) && isRole(params)) {
        self._set(params, {});
      }

      for (var name in value) {
        self.set.apply(self, __spreadArrays(params, [name, value[name]]));
      }
    } else if (isString(value)) {
      if (isRole(params, true)) {
        if (isFixed(params) || !isRole(params)) {
          this._set(params, value);
        } else {
          var obj = toPropertyObject(value);

          if (isObject(obj)) {
            self.set.apply(self, __spreadArrays(params, [obj]));
          }
        }

        return this;
      } else {
        var _a = splitStyle(value),
            styles = _a.styles,
            stylesLength = _a.length;

        for (var name in styles) {
          self.set.apply(self, __spreadArrays(params, [name, styles[name]]));
        }

        if (stylesLength) {
          return this;
        }
      }

      self._set(params, value);
    } else {
      self._set(params, value);
    }

    return self;
  };
  /**
    * Gets the names of properties.
    * @return the names of properties.
    * @example
  // one parameter
  frame.set({
    display: "none",
    transform: {
        translate: "10px, 10px",
        scale: "1",
    },
  });
  // [["display"], ["transform", "translate"], ["transform", "scale"]]
  console.log(frame.getNames());
  */


  __proto.getNames = function () {
    return getNames(this.properties, []);
  };
  /**
    * check that has property.
    * @param {...String} args - property name
    * @example
    frame.has("property", "display") // => true or false
    */


  __proto.has = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var params = getPropertyName(args);
    var length = params.length;

    if (!length) {
      return false;
    }

    return !isUndefined(getValueByNames(params, this.properties, length));
  };
  /**
    * clone frame.
    * @return {Frame} An instance of clone
    * @example
    frame.clone();
    */


  __proto.clone = function () {
    var frame = new Frame();
    frame.setOrderObject(this.orderMap.orderMap);
    return frame.merge(this);
  };
  /**
    * merge one frame to other frame.
    * @param - target frame.
    * @return {Frame} An instance itself
    * @example
    frame.merge(frame2);
    */


  __proto.merge = function (frame) {
    var properties = this.properties;
    var frameProperties = frame.properties;

    if (frameProperties) {
      merge(properties, frameProperties);
    }

    return this;
  };
  /**
    * Specifies an css object that coverted the frame.
    * @return {object} cssObject
    */


  __proto.toCSSObject = function () {
    var properties = this.get();
    var cssObject = {};

    for (var name in properties) {
      if (isRole([name], true)) {
        continue;
      }

      var value = properties[name];

      if (name === TIMING_FUNCTION) {
        cssObject[TIMING_FUNCTION.replace("animation", ANIMATION)] = (isString(value) ? value : value[EASING_NAME]) || "initial";
      } else {
        cssObject[name] = value;
      }
    }

    var transform = toInnerProperties(properties[TRANSFORM_NAME], this.orderMap.get([TRANSFORM_NAME]));
    var filter = toInnerProperties(properties.filter, this.orderMap.get([FILTER]));
    TRANSFORM && transform && (cssObject[TRANSFORM] = transform);
    FILTER && filter && (cssObject[FILTER] = filter);
    return cssObject;
  };
  /**
    * Specifies an css text that coverted the frame.
    * @return {string} cssText
    */


  __proto.toCSS = function () {
    var cssObject = this.toCSSObject();
    var cssArray = [];
    var keys = getKeys(cssObject);
    sortOrders(keys, this.orderMap.get([]));
    keys.forEach(function (name) {
      cssArray.push(name + ":" + cssObject[name] + ";");
    });
    return cssArray.join("");
  };
  /**
    * Remove All Properties
    * @return {Frame} An instance itself
    */


  __proto.clear = function () {
    this.properties = {};
    this.orderMap.clear();
    return this;
  };

  __proto._set = function (args, value) {
    var properties = this.properties;
    var length = args.length;

    for (var i = 0; i < length - 1; ++i) {
      var name = args[i];
      !(name in properties) && (properties[name] = {});
      properties = properties[name];
    }

    if (!length) {
      return;
    }

    var lastParam = args[length - 1];
    this.orderMap.add(args);

    if (length === 1 && lastParam === TIMING_FUNCTION) {
      properties[lastParam] = getEasing(value);
    } else {
      properties[lastParam] = isString(value) && !isFixed(args) ? toPropertyObject(value, lastParam) : value;
    }
  };

  return Frame;
}();

function dotArray(a1, a2, b1, b2) {
  var length = a2.length;
  return a1.map(function (v1, i) {
    if (i >= length) {
      return v1;
    } else {
      return dot(v1, a2[i], b1, b2);
    }
  });
}

function dotColor(color1, color2, b1, b2) {
  // convert array to PropertyObject(type=color)
  var value1 = color1.value;
  var value2 = color2.value; // If the model name is not same, the inner product is impossible.

  var model1 = color1.model;
  var model2 = color2.model;

  if (model1 !== model2) {
    // It is recognized as a string.
    return dot(color1.toValue(), color2.toValue(), b1, b2);
  }

  if (value1.length === 3) {
    value1[3] = 1;
  }

  if (value2.length === 3) {
    value2[3] = 1;
  }

  var v = dotArray(value1, value2, b1, b2);
  var colorModel = model1;

  for (var i = 0; i < 3; ++i) {
    v[i] = parseInt(v[i], 10);
  }

  var object = new PropertyObject(v, {
    type: "color",
    model: colorModel,
    prefix: colorModel + "(",
    suffix: ")"
  });
  return object;
}

function dotObject(a1, a2, b1, b2) {
  var a1Type = a1.type;

  if (a1Type === "color") {
    return dotColor(a1, a2, b1, b2);
  }

  var value1 = a1.value;
  var value2 = a2.value;
  var arr = dotArray(value1, value2, b1, b2);
  return new PropertyObject(arr, {
    type: a1Type,
    separator: a1.separator || a2.separator,
    prefix: a1.prefix || a2.prefix,
    suffix: a1.suffix || a2.suffix,
    model: a1.model || a2.model
  });
}
/**
* The dot product of a1 and a2 for the b1 and b2.
* @memberof Dot
* @function dot
* @param {String|Number|PropertyObject} a1 value1
* @param {String|Number|PropertyObject} a2 value2
* @param {Number} b1 b1 ratio
* @param {Number} b2 b2 ratio
* @return {String} Not Array, Not Separator, Only Number & Unit
* @return {PropertyObject} Array with Separator.
* @example
dot(1, 3, 0.3, 0.7);
// => 1.6
*/


function dot(a1, a2, b1, b2) {
  if (b2 === 0) {
    return a2;
  } else if (b1 === 0 || b1 + b2 === 0) {
    // prevent division by zero.
    return a1;
  } // dot Object


  var type1 = getType(a1);
  var type2 = getType(a2);
  var isFunction1 = type1 === FUNCTION;
  var isFunction2 = type2 === FUNCTION;

  if (isFunction1 || isFunction2) {
    return function () {
      return dot(isFunction1 ? toPropertyObject(a1()) : a1, isFunction2 ? toPropertyObject(a2()) : a2, b1, b2);
    };
  } else if (type1 === type2) {
    if (type1 === PROPERTY) {
      return dotObject(a1, a2, b1, b2);
    } else if (type1 === ARRAY) {
      return dotArray(a1, a2, b1, b2);
    } else if (type1 !== "value") {
      return a1;
    }
  } else {
    return a1;
  }

  var v1 = splitUnit("" + a1);
  var v2 = splitUnit("" + a2);
  var v; // 숫자가 아닐경우 첫번째 값을 반환 b2가 0일경우 두번째 값을 반환

  if (isNaN(v1.value) || isNaN(v2.value)) {
    return a1;
  } else {
    v = dot$1(v1.value, v2.value, b1, b2);
  }

  var prefix = v1.prefix || v2.prefix;
  var unit = v1.unit || v2.unit;

  if (!prefix && !unit) {
    return v;
  }

  return prefix + v + unit;
}
function dotValue(time, prevTime, nextTime, prevValue, nextValue, easing) {
  if (time === prevTime) {
    return prevValue;
  } else if (time === nextTime) {
    return nextValue;
  } else if (!easing) {
    return dot(prevValue, nextValue, time - prevTime, nextTime - time);
  }

  var ratio = easing((time - prevTime) / (nextTime - prevTime));
  var value = dot(prevValue, nextValue, ratio, 1 - ratio);
  return value;
}

function getNearTimeIndex(times, time) {
  var length = times.length;

  for (var i = 0; i < length; ++i) {
    if (times[i] === time) {
      return [i, i];
    } else if (times[i] > time) {
      return [i > 0 ? i - 1 : 0, i];
    }
  }

  return [length - 1, length - 1];
}

function makeAnimationProperties(properties) {
  var cssArray = [];

  for (var name in properties) {
    cssArray.push(ANIMATION + "-" + decamelize(name) + ":" + properties[name] + ";");
  }

  return cssArray.join("");
}

function addTime(times, time) {
  var length = times.length;

  for (var i = 0; i < length; ++i) {
    if (time < times[i]) {
      times.splice(i, 0, time);
      return;
    }
  }

  times[length] = time;
}

function addEntry(entries, time, keytime) {
  var prevEntry = entries[entries.length - 1];
  (!prevEntry || prevEntry[0] !== time || prevEntry[1] !== keytime) && entries.push([toFixed(time), toFixed(keytime)]);
}

function getEntries(times, states) {
  var entries = times.map(function (time) {
    return [time, time];
  });
  var nextEntries = [];
  states.forEach(function (state) {
    var iterationCount = state[ITERATION_COUNT];
    var delay = state[DELAY];
    var playSpeed = state[PLAY_SPEED];
    var direction = state[DIRECTION];
    var intCount = Math.ceil(iterationCount);
    var currentDuration = entries[entries.length - 1][0];
    var length = entries.length;
    var lastTime = currentDuration * iterationCount;

    for (var i = 0; i < intCount; ++i) {
      var isReverse = direction === REVERSE || direction === ALTERNATE && i % 2 || direction === ALTERNATE_REVERSE && !(i % 2);

      for (var j = 0; j < length; ++j) {
        var entry = entries[isReverse ? length - j - 1 : j];
        var time = entry[1];
        var currentTime = currentDuration * i + (isReverse ? currentDuration - entry[0] : entry[0]);
        var prevEntry = entries[isReverse ? length - j : j - 1];

        if (currentTime > lastTime) {
          if (j !== 0) {
            var prevTime = currentDuration * i + (isReverse ? currentDuration - prevEntry[0] : prevEntry[0]);
            var divideTime = dot$1(prevEntry[1], time, lastTime - prevTime, currentTime - lastTime);
            addEntry(nextEntries, (delay + currentDuration * iterationCount) / playSpeed, divideTime);
          }

          break;
        } else if (currentTime === lastTime && nextEntries.length && nextEntries[nextEntries.length - 1][0] === lastTime + delay) {
          break;
        }

        addEntry(nextEntries, (delay + currentTime) / playSpeed, time);
      }
    } // delay time


    delay && nextEntries.unshift([0, nextEntries[0][1]]);
    entries = nextEntries;
    nextEntries = [];
  });
  return entries;
}
/**
* manage Frame Keyframes and play keyframes.
* @extends Animator
* @example
const item = new SceneItem({
    0: {
        display: "none",
    },
    1: {
        display: "block",
        opacity: 0,
    },
    2: {
        opacity: 1,
    }
});
*/

var SceneItem =
/*#__PURE__*/
function (_super) {
  __extends(SceneItem, _super);
  /**
    * @param - properties
    * @param - options
    * @example
    const item = new SceneItem({
        0: {
            display: "none",
        },
        1: {
            display: "block",
            opacity: 0,
        },
        2: {
            opacity: 1,
        }
    });
     */


  function SceneItem(properties, options) {
    var _this = _super.call(this) || this;

    _this.times = [];
    _this.items = {};
    _this.nameMap = new OrderMap(NAME_SEPARATOR);
    _this.elements = [];
    _this.needUpdate = true;

    _this.load(properties, options);

    return _this;
  }

  var __proto = SceneItem.prototype;

  __proto.getDuration = function () {
    var times = this.times;
    var length = times.length;
    return (length === 0 ? 0 : times[length - 1]) || this.state[DURATION];
  };
  /**
    * get size of list
    * @return {Number} length of list
    */


  __proto.size = function () {
    return this.times.length;
  };

  __proto.setDuration = function (duration) {
    if (!duration) {
      return this;
    }

    var originalDuration = this.getDuration();

    if (originalDuration > 0) {
      var ratio_1 = duration / originalDuration;

      var _a = this,
          times = _a.times,
          items_1 = _a.items;

      var obj_1 = {};
      this.times = times.map(function (time) {
        var time2 = toFixed(time * ratio_1);
        obj_1[time2] = items_1[time];
        return time2;
      });
      this.items = obj_1;
    } else {
      this.newFrame(duration);
    }

    return this;
  };

  __proto.setId = function (id) {
    var state = this.state;
    var elements = this.elements;
    var length = elements.length;
    state.id = id || makeId(!!length);

    if (length && !state[SELECTOR]) {
      var sceneId_1 = toId(this.getId());
      state[SELECTOR] = "[" + DATA_SCENE_ID + "=\"" + sceneId_1 + "\"]";
      elements.forEach(function (element) {
        element.setAttribute(DATA_SCENE_ID, sceneId_1);
      });
    }

    return this;
  };
  /**
    * Set properties to the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {SceneItem} An instance itself
    * @example
  item.set(0, "a", "b") // item.getFrame(0).set("a", "b")
  console.log(item.get(0, "a")); // "b"
    */


  __proto.set = function (time) {
    var _this = this;

    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (time instanceof SceneItem) {
      return this.set(0, time);
    } else if (isArray(time)) {
      var length = time.length;

      for (var i = 0; i < length; ++i) {
        var t = length === 1 ? 0 : this.getUnitTime(i / (length - 1) * 100 + "%");
        this.set(t, time[i]);
      }
    } else if (isObject(time)) {
      var _loop_1 = function (t) {
        var value = time[t];
        splitComma(t).forEach(function (eachTime) {
          var realTime = _this.getUnitTime(eachTime);

          if (isNaN(realTime)) {
            getNames(value, [eachTime]).forEach(function (names) {
              var _a;

              var innerValue = getValueByNames(names.slice(1), value);
              var arr = isArray(innerValue) ? innerValue : [getValueByNames(names, _this.target), innerValue];
              var length = arr.length;

              for (var i = 0; i < length; ++i) {
                (_a = _this.newFrame(i / (length - 1) * 100 + "%")).set.apply(_a, __spreadArrays(names, [arr[i]]));
              }
            });
          } else {
            _this.set(realTime, value);
          }
        });
      };

      for (var t in time) {
        _loop_1(t);
      }
    } else if (!isUndefined(time)) {
      var value_1 = args[0];
      splitComma(time + "").forEach(function (eachTime) {
        var realTime = _this.getUnitTime(eachTime);

        if (value_1 instanceof SceneItem) {
          var delay = value_1.getDelay();
          var frames = value_1.toObject(!_this.hasFrame(realTime + delay));
          var duration = value_1.getDuration();
          var direction = value_1.getDirection();
          var isReverse = direction.indexOf("reverse") > -1;

          for (var frameTime in frames) {
            var nextTime = isReverse ? duration - parseFloat(frameTime) : parseFloat(frameTime);

            _this.set(realTime + nextTime, frames[frameTime]);
          }
        } else if (args.length === 1 && isArray(value_1)) {
          value_1.forEach(function (item) {
            _this.set(realTime, item);
          });
        } else {
          var frame = _this.newFrame(realTime);

          frame.set.apply(frame, args);
        }
      });
    }

    this.needUpdate = true;
    return this;
  };
  /**
    * Get properties of the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} args property's name or properties
    * @return {Number|String|PropertyObejct} property value
    * @example
  item.get(0, "a"); // item.getFrame(0).get("a");
  item.get(0, "transform", "translate"); // item.getFrame(0).get("transform", "translate");
    */


  __proto.get = function (time) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var frame = this.getFrame(time);
    return frame && frame.get.apply(frame, args);
  };
  /**
    * get properties orders
    * @param - property names
    * @example
    item.getOrders(["display"]) // => []
    item.getOrders(["transform"]) // => ["translate", "scale"]
    */


  __proto.getOrders = function (names) {
    this.needUpdate && this.update();
    return this.nameMap.get(names);
  };
  /**
    * set properties orders
    * @param - property names
    * @param - orders
    * @example
    item.getOrders(["transform"]) // => ["translate", "scale"]
    item.setOrders(["transform"], ["scale", "tralsate"])
    */


  __proto.setOrders = function (names, orders) {
    this.needUpdate && this.update();
    var result = this.nameMap.set(names, orders);
    this.updateFrameOrders();
    return result;
  };
  /**
    * get properties order object
    * @example
    console.log(item.getOrderObject());
    */


  __proto.getOrderObject = function () {
    return this.nameMap.getObject();
  };
  /**
    * set properties orders object
    * @param - properties orders object
    * @example
    item.setOrderObject({
        "": ["transform"],
        "transform": ["scale", "tralsate"],
    });
    */


  __proto.setOrderObject = function (obj) {
    this.nameMap.setObject(obj);
    this.updateFrameOrders();
  };
  /**
    * remove properties to the sceneItem at that time
    * @param {Number} time - time
    * @param {...String|Object} [properties] - property names or values
    * @return {SceneItem} An instance itself
    * @example
  item.remove(0, "a");
    */


  __proto.remove = function (time) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    if (args.length) {
      var frame = this.getFrame(time);
      frame && frame.remove.apply(frame, args);
    } else {
      this.removeFrame(time);
    }

    this.needUpdate = true;
    return this;
  };
  /**
    * Append the item or object at the last time.
    * @param - the scene item or item object
    * @return An instance itself
    * @example
  item.append(new SceneItem({
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  }));
  item.append({
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  });
  item.set(item.getDuration(), {
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
  });
    */


  __proto.append = function (item) {
    if (item instanceof SceneItem) {
      this.set(this.getDuration(), item);
    } else {
      this.append(new SceneItem(item));
    }

    return this;
  };
  /**
    * Push the front frames for the time and prepend the scene item or item object.
    * @param - the scene item or item object
    * @return An instance itself
    */


  __proto.prepend = function (item) {
    if (item instanceof SceneItem) {
      var unshiftTime = item.getDuration() + item.getDelay();
      var firstFrame = this.getFrame(0); // remove first frame

      this.removeFrame(0);
      this.unshift(unshiftTime);
      this.set(0, item);
      this.set(unshiftTime + THRESHOLD, firstFrame);
    } else {
      this.prepend(new SceneItem(item));
    }

    return this;
  };
  /**
   * Push out the amount of time.
   * @param - time to push
   * @example
  item.get(0); // frame 0
  item.unshift(3);
  item.get(3) // frame 0
   */


  __proto.unshift = function (time) {
    var _a = this,
        times = _a.times,
        items = _a.items;

    var obj = {};
    this.times = times.map(function (t) {
      var time2 = toFixed(time + t);
      obj[time2] = items[t];
      return time2;
    });
    this.items = obj;
    return this;
  };
  /**
   * Get the frames in the item in object form.
   * @return {}
   * @example
  item.toObject();
  // {0: {display: "none"}, 1: {display: "block"}}
   */


  __proto.toObject = function (isStartZero) {
    if (isStartZero === void 0) {
      isStartZero = true;
    }

    var obj = {};
    var delay = this.getDelay();
    this.forEach(function (frame, time) {
      obj[(!time && !isStartZero ? THRESHOLD : 0) + delay + time] = frame.clone();
    });
    return obj;
  };
  /**
   * Specifies an element to synchronize items' keyframes.
   * @param {string} selectors - Selectors to find elements in items.
   * @return {SceneItem} An instance itself
   * @example
  item.setSelector("#id.class");
   */


  __proto.setSelector = function (target) {
    if (isFunction(target)) {
      this.setElement(target(this.getId()));
    } else {
      this.setElement(target);
    }

    return this;
  };
  /**
   * Get the elements connected to SceneItem.
   */


  __proto.getElements = function () {
    return this.elements;
  };
  /**
   * Specifies an element to synchronize item's keyframes.
   * @param - elements to synchronize item's keyframes.
   * @param - Make sure that you have peusdo.
   * @return {SceneItem} An instance itself
   * @example
  item.setElement(document.querySelector("#id.class"));
  item.setElement(document.querySelectorAll(".class"));
   */


  __proto.setElements = function (target) {
    return this.setElement(target);
  };
  /**
   * Specifies an element to synchronize item's keyframes.
   * @param - elements to synchronize item's keyframes.
   * @param - Make sure that you have peusdo.
   * @return {SceneItem} An instance itself
   * @example
  item.setElement(document.querySelector("#id.class"));
  item.setElement(document.querySelectorAll(".class"));
   */


  __proto.setElement = function (target) {
    var state = this.state;
    var elements = [];

    if (!target) {
      return this;
    } else if (target === true || isString(target)) {
      var selector = target === true ? "" + state.id : target;
      var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(selector);
      elements = toArray($(matches ? matches[1] : selector, true));
      state[SELECTOR] = selector;
    } else {
      elements = target instanceof Element ? [target] : toArray(target);
    }

    if (!elements.length) {
      return this;
    }

    this.elements = elements;
    this.setId(this.getId());
    this.target = elements[0].style;

    this.targetFunc = function (frame) {
      var attributes = frame.get("attribute");

      if (attributes) {
        var _loop_2 = function (name) {
          elements.forEach(function (el) {
            el.setAttribute(name, attributes[name]);
          });
        };

        for (var name in attributes) {
          _loop_2(name);
        }
      }

      if (frame.has("html")) {
        var html_1 = frame.get("html");
        elements.forEach(function (el) {
          el.innerHTML = html_1;
        });
      }

      var cssText = frame.toCSS();

      if (state.cssText !== cssText) {
        state.cssText = cssText;
        elements.forEach(function (el) {
          el.style.cssText += cssText;
        });
        return frame;
      }
    };

    return this;
  };

  __proto.setTarget = function (target) {
    this.target = target;

    this.targetFunc = function (frame) {
      var obj = frame.get();

      for (var name in obj) {
        target[name] = obj[name];
      }
    };

    return this;
  };
  /**
    * add css styles of items's element to the frame at that time.
    * @param - Time to synchronize and set css
    * @param - elements to synchronize item's keyframes.
    * @return {SceneItem} An instance itself
    * @example
  item.setElement(document.querySelector("#id.class"));
  item.setCSS(0, ["opacity"]);
  item.setCSS(0, ["opacity", "width", "height"]);
    */


  __proto.setCSS = function (time, properties) {
    if (properties === void 0) {
      properties = [];
    }

    this.set(time, fromCSS(this.elements, properties));
    return this;
  };

  __proto.setTime = function (time, isTick, isParent, parentEasing) {
    _super.prototype.setTime.call(this, time, isTick, isParent);

    var iterationTime = this.getIterationTime();
    var easing = this.getEasing() || parentEasing;
    var frame = this.getNowFrame(iterationTime, easing);
    var currentTime = this.getTime();
    this.temp = frame;
    /**
     * This event is fired when timeupdate and animate.
     * @event SceneItem#animate
     * @param {Number} param.currentTime The total time that the animator is running.
     * @param {Number} param.time The iteration time during duration that the animator is running.
     * @param {Frame} param.frame frame of that time.
     */

    this.trigger("animate", {
      frame: frame,
      currentTime: currentTime,
      time: iterationTime
    });
    this.targetFunc && this.targetFunc(frame);
    return this;
  };
  /**
    * update property names used in frames.
    * @return {SceneItem} An instance itself
    * @example
  item.update();
    */


  __proto.update = function () {
    var prevNameMap = this.nameMap;
    var names = {};
    this.forEach(function (frame) {
      updateFrame(names, frame.properties);
    });
    var nameMap = new OrderMap(NAME_SEPARATOR);

    function pushKeys(map, stack) {
      var keys = getKeys(map);
      sortOrders(keys, prevNameMap.get(stack));
      nameMap.set(stack, keys);
      keys.forEach(function (key) {
        var nextMap = map[key];

        if (isObject(nextMap)) {
          pushKeys(nextMap, __spreadArrays(stack, [key]));
        }
      });
    }

    pushKeys(names, []);
    this.nameMap = nameMap;
    this.forEach(function (frame) {
      frame.setOrderObject(nameMap.orderMap);
    });
    this.needUpdate = false;
    return this;
  };
  /**
    * Create and add a frame to the sceneItem at that time
    * @param {Number} time - frame's time
    * @return {Frame} Created frame.
    * @example
  item.newFrame(time);
    */


  __proto.newFrame = function (time) {
    var frame = this.getFrame(time);

    if (frame) {
      return frame;
    }

    frame = new Frame();
    this.setFrame(time, frame);
    return frame;
  };
  /**
    * Add a frame to the sceneItem at that time
    * @param {Number} time - frame's time
    * @return {SceneItem} An instance itself
    * @example
  item.setFrame(time, frame);
    */


  __proto.setFrame = function (time, frame) {
    var realTime = this.getUnitTime(time);
    this.items[realTime] = frame;
    addTime(this.times, realTime);
    this.needUpdate = true;
    return this;
  };
  /**
    * get sceneItem's frame at that time
    * @param {Number} time - frame's time
    * @return {Frame} sceneItem's frame at that time
    * @example
  const frame = item.getFrame(time);
    */


  __proto.getFrame = function (time) {
    return this.items[this.getUnitTime(time)];
  };
  /**
    * remove sceneItem's frame at that time
    * @param - frame's time
    * @return {SceneItem} An instance itself
    * @example
  item.removeFrame(time);
    */


  __proto.removeFrame = function (time) {
    var realTime = this.getUnitTime(time);
    var items = this.items;
    var index = this.times.indexOf(realTime);
    delete items[realTime]; // remove time

    if (index > -1) {
      this.times.splice(index, 1);
    }

    this.needUpdate = true;
    return this;
  };
  /**
    * check if the item has a frame at that time
    * @param {Number} time - frame's time
    * @return {Boolean} true: the item has a frame // false: not
    * @example
  if (item.hasFrame(10)) {
    // has
  } else {
    // not
  }
    */


  __proto.hasFrame = function (time) {
    return this.getUnitTime(time) in this.items;
  };
  /**
    * Check if keyframes has propery's name
    * @param - property's time
    * @return {boolean} true: if has property, false: not
    * @example
  item.hasName(["transform", "translate"]); // true or not
    */


  __proto.hasName = function (args) {
    this.needUpdate && this.update();
    return !!this.nameMap.get(args);
  };
  /**
    * merge frame of the previous time at the next time.
  * @param - The time of the frame to merge
  * @param - The target frame
    * @return {SceneItem} An instance itself
    * @example
  // getFrame(1) contains getFrame(0)
  item.merge(0, 1);
    */


  __proto.mergeFrame = function (time, frame) {
    if (frame) {
      var toFrame = this.newFrame(time);
      toFrame.merge(frame);
    }

    return this;
  };
  /**
    * Get frame of the current time
    * @param {Number} time - the current time
    * @param {function} easing - the speed curve of an animation
    * @return {Frame} frame of the current time
    * @example
  let item = new SceneItem({
    0: {
        display: "none",
    },
    1: {
        display: "block",
        opacity: 0,
    },
    2: {
        opacity: 1,
    }
  });
  // opacity: 0.7; display:"block";
  const frame = item.getNowFrame(1.7);
    */


  __proto.getNowFrame = function (time, easing, isAccurate) {
    var _this = this;

    this.needUpdate && this.update();
    var frame = new Frame();

    var _a = getNearTimeIndex(this.times, time),
        left = _a[0],
        right = _a[1];

    var realEasing = this.getEasing() || easing;
    var nameMap = this.nameMap;

    if (this.hasName([TIMING_FUNCTION])) {
      var nowEasing = this.getNowValue(time, [TIMING_FUNCTION], left, right, false, 0, true);
      isFunction(nowEasing) && (realEasing = nowEasing);
    }

    if (isAccurate) {
      var prevFrame_1 = this.getFrame(time);
      var prevOrderMap = prevFrame_1.orderMap.filter([], function (orders) {
        return prevFrame_1.has.apply(prevFrame_1, orders);
      });

      for (var name in ROLES) {
        var orders = nameMap.get([name]);

        if (prevOrderMap.get([name]) && orders) {
          prevOrderMap.set([name], orders);
        }
      }

      nameMap = prevOrderMap;
    }

    var names = nameMap.gets([]);
    frame.setOrderObject(nameMap.orderMap);
    names.forEach(function (properties) {
      var value = _this.getNowValue(time, properties, left, right, isAccurate, realEasing, isFixed(properties));

      if (isUndefined(value)) {
        return;
      }

      frame.set(properties, value);
    });
    return frame;
  };

  __proto.load = function (properties, options) {
    var _a;

    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    options && this.setOptions(options);

    if (isArray(properties)) {
      this.set(properties);
    } else if (properties.keyframes) {
      this.set(properties.keyframes);
    } else {
      for (var time in properties) {
        if (time !== "options") {
          this.set((_a = {}, _a[time] = properties[time], _a));
        }
      }
    }

    if (options && options[DURATION]) {
      this.setDuration(options[DURATION]);
    }

    return this;
  };
  /**
     * clone SceneItem.
     * @return {SceneItem} An instance of clone
     * @example
     * item.clone();
     */


  __proto.clone = function () {
    var item = new SceneItem();
    item.setOptions(this.state);
    item.setOrderObject(this.nameMap.orderMap);
    this.forEach(function (frame, time) {
      item.setFrame(time, frame.clone());
    });
    return item;
  };
  /**
     * executes a provided function once for each scene item.
     * @param - Function to execute for each element, taking three arguments
     * @return {Keyframes} An instance itself
     */


  __proto.forEach = function (callback) {
    var times = this.times;
    var items = this.items;
    times.forEach(function (time) {
      callback(items[time], time, items);
    });
    return this;
  };

  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    _super.prototype.setOptions.call(this, options);

    var id = options.id,
        selector = options.selector,
        elements = options.elements,
        element = options.element,
        target = options.target;
    id && this.setId(id);

    if (target) {
      this.setTarget(target);
    } else if (selector) {
      this.setSelector(selector);
    } else if (elements || element) {
      this.setElement(elements || element);
    }

    return this;
  };

  __proto.toCSS = function (playCondition, parentDuration, states) {
    if (playCondition === void 0) {
      playCondition = {
        className: START_ANIMATION
      };
    }

    if (parentDuration === void 0) {
      parentDuration = this.getDuration();
    }

    if (states === void 0) {
      states = [];
    }

    var itemState = this.state;
    var selector = itemState[SELECTOR];

    if (!selector) {
      return "";
    }

    var originalDuration = this.getDuration();
    itemState[DURATION] = originalDuration;
    states.push(itemState);
    var reversedStates = toArray(states).reverse();
    var id = toId(getRealId(this));
    var superParent = states[0];
    var infiniteIndex = findIndex(reversedStates, function (state) {
      return state[ITERATION_COUNT] === INFINITE || !isFinite(state[DURATION]);
    }, states.length - 1);
    var finiteStates = reversedStates.slice(0, infiniteIndex);
    var duration = parentDuration || finiteStates.reduce(function (prev, cur) {
      return (cur[DELAY] + prev * cur[ITERATION_COUNT]) / cur[PLAY_SPEED];
    }, originalDuration);
    var delay = reversedStates.slice(infiniteIndex).reduce(function (prev, cur) {
      return (prev + cur[DELAY]) / cur[PLAY_SPEED];
    }, 0);
    var easingName = find(reversedStates, function (state) {
      return state[EASING] && state[EASING_NAME];
    }, itemState)[EASING_NAME];
    var iterationCount = reversedStates[infiniteIndex][ITERATION_COUNT];
    var fillMode = superParent[FILL_MODE];
    var direction = reversedStates[infiniteIndex][DIRECTION];
    var cssText = makeAnimationProperties({
      fillMode: fillMode,
      direction: direction,
      iterationCount: iterationCount,
      delay: delay + "s",
      name: PREFIX + "KEYFRAMES_" + id,
      duration: duration / superParent[PLAY_SPEED] + "s",
      timingFunction: easingName
    });
    var selectors = splitComma(selector).map(function (sel) {
      var matches = /([\s\S]+)(:+[a-zA-Z]+)$/g.exec(sel);

      if (matches) {
        return [matches[1], matches[2]];
      } else {
        return [sel, ""];
      }
    });
    var className = playCondition.className;
    var selectorCallback = playCondition.selector;
    var preselector = isFunction(selectorCallback) ? selectorCallback(this, selector) : selectorCallback;
    return "\n    " + (preselector || selectors.map(function (_a) {
      var sel = _a[0],
          peusdo = _a[1];
      return sel + "." + className + peusdo;
    })) + " {" + cssText + "}\n    " + selectors.map(function (_a) {
      var sel = _a[0],
          peusdo = _a[1];
      return sel + "." + PAUSE_ANIMATION + peusdo;
    }) + " {" + ANIMATION + "-play-state: paused;}\n    @" + KEYFRAMES + " " + PREFIX + "KEYFRAMES_" + id + "{" + this._toKeyframes(duration, finiteStates, direction) + "}";
  };
  /**
   * Export the CSS of the items to the style.
   * @param - Add a selector or className to play.
   * @return {SceneItem} An instance itself
   */


  __proto.exportCSS = function (playCondition, duration, options) {
    if (!this.elements.length) {
      return "";
    }

    var css = this.toCSS(playCondition, duration, options);
    var isParent = options && !isUndefined(options[ITERATION_COUNT]);

    if (!isParent) {
      if (this.styledInjector) {
        this.styledInjector.destroy();
        this.styledInjector = null;
      }

      this.styled = styled(css);
      this.styledInjector = this.styled.inject(this.getAnimationElement(), {
        original: true
      });
    }

    return this;
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    isPausedCSS(this) && this.pauseCSS();
    return this;
  };

  __proto.pauseCSS = function () {
    this.elements.forEach(function (element) {
      addClass(element, PAUSE_ANIMATION);
    });
    return this;
  };

  __proto.endCSS = function () {
    this.elements.forEach(function (element) {
      removeClass(element, PAUSE_ANIMATION);
      removeClass(element, START_ANIMATION);
    });
    setPlayCSS(this, false);
    return this;
  };

  __proto.end = function () {
    isEndedCSS(this) && this.endCSS();

    _super.prototype.end.call(this);

    return this;
  };
  /**
    * Play using the css animation and keyframes.
    * @param - Check if you want to export css.
    * @param [playClassName="startAnimation"] - Add a class name to play.
    * @param - The shorthand properties for six of the animation properties.
    * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
    * @example
  item.playCSS();
  item.playCSS(false, "startAnimation", {
    direction: "reverse",
    fillMode: "forwards",
  });
    */


  __proto.playCSS = function (isExportCSS, playClassName, properties) {
    if (isExportCSS === void 0) {
      isExportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

    playCSS(this, isExportCSS, playClassName, properties);
    return this;
  };

  __proto.getAnimationElement = function () {
    return this.elements[0];
  };

  __proto.addPlayClass = function (isPaused, playClassName, properties) {
    if (properties === void 0) {
      properties = {};
    }

    var elements = this.elements;
    var length = elements.length;
    var cssText = makeAnimationProperties(properties);

    if (!length) {
      return;
    }

    if (isPaused) {
      elements.forEach(function (element) {
        removeClass(element, PAUSE_ANIMATION);
      });
    } else {
      elements.forEach(function (element) {
        element.style.cssText += cssText;

        if (hasClass(element, START_ANIMATION)) {
          removeClass(element, START_ANIMATION);
        }
      });
      elements.forEach(function (element) {
        element.clientWidth;
      });
      elements.forEach(function (element) {
        addClass(element, START_ANIMATION);
      });
    }

    return elements[0];
  };
  /**
    * Clear All Frames
    * @return {SceneItem} An instance itself
    */


  __proto.clear = function () {
    this.times = [];
    this.items = {};
    this.nameMap = new OrderMap(NAME_SEPARATOR);

    if (this.styledInjector) {
      this.styledInjector.destroy();
    }

    this.styled = null;
    this.styledInjector = null;
    this.temp = null;
    this.needUpdate = true;
    return this;
  };

  __proto.getNowValue = function (time, properties, left, right, isAccurate, easing, usePrevValue) {
    var times = this.times;
    var length = times.length;
    var prevTime;
    var nextTime;
    var prevFrame;
    var nextFrame;
    var isUndefinedLeft = isUndefined(left);
    var isUndefinedRight = isUndefined(right);

    if (isUndefinedLeft || isUndefinedRight) {
      var indicies = getNearTimeIndex(times, time);
      isUndefinedLeft && (left = indicies[0]);
      isUndefinedRight && (right = indicies[1]);
    }

    for (var i = left; i >= 0; --i) {
      var frame = this.getFrame(times[i]);

      if (frame.has.apply(frame, properties)) {
        prevTime = times[i];
        prevFrame = frame;
        break;
      }
    }

    var prevValue = prevFrame && prevFrame.raw.apply(prevFrame, properties);

    if (isAccurate && !isRole([properties[0]])) {
      return prevTime === time ? prevValue : undefined;
    }

    if (usePrevValue) {
      return prevValue;
    }

    for (var i = right; i < length; ++i) {
      var frame = this.getFrame(times[i]);

      if (frame.has.apply(frame, properties)) {
        nextTime = times[i];
        nextFrame = frame;
        break;
      }
    }

    var nextValue = nextFrame && nextFrame.raw.apply(nextFrame, properties);

    if (!prevFrame || isUndefined(prevValue)) {
      return nextValue;
    }

    if (!nextFrame || isUndefined(nextValue) || prevValue === nextValue) {
      return prevValue;
    }

    return dotValue(time, Math.max(prevTime, 0), nextTime, prevValue, nextValue, easing);
  };

  __proto._toKeyframes = function (duration, states, direction) {
    var _this = this;

    var frames = {};
    var times = this.times.slice();

    if (!times.length) {
      return "";
    }

    var originalDuration = this.getDuration();
    !this.getFrame(0) && times.unshift(0);
    !this.getFrame(originalDuration) && times.push(originalDuration);
    var entries = getEntries(times, states);
    var lastEntry = entries[entries.length - 1]; // end delay time

    lastEntry[0] < duration && addEntry(entries, duration, lastEntry[1]);
    var prevTime = -1;
    return entries.map(function (_a) {
      var time = _a[0],
          keytime = _a[1];

      if (!frames[keytime]) {
        frames[keytime] = (!_this.hasFrame(keytime) || keytime === 0 || keytime === originalDuration ? _this.getNowFrame(keytime) : _this.getNowFrame(keytime, 0, true)).toCSS();
      }

      var frameTime = time / duration * 100;

      if (frameTime - prevTime < THRESHOLD) {
        frameTime += THRESHOLD;
      }

      prevTime = frameTime;
      return Math.min(frameTime, 100) + "%{\n                " + (time === 0 && !isDirectionReverse(0, 1, direction) ? "" : frames[keytime]) + "\n            }";
    }).join("");
  };

  __proto.updateFrameOrders = function () {
    var nameMap = this.nameMap.orderMap;
    this.forEach(function (frame) {
      frame.setOrderObject(nameMap);
    });
  };

  return SceneItem;
}(Animator);

/**
 * manage sceneItems and play Scene.
 * @sort 1
 */

var Scene =
/*#__PURE__*/
function (_super) {
  __extends(Scene, _super);
  /**
  * @param - properties
  * @param - options
  * @example
  const scene = new Scene({
    item1: {
      0: {
        display: "none",
      },
      1: {
        display: "block",
        opacity: 0,
      },
      2: {
        opacity: 1,
      },
    },
    item2: {
      2: {
        opacity: 1,
      },
    }
  });
    */


  function Scene(properties, options) {
    var _this = _super.call(this) || this;

    _this.items = {};
    _this.orderMap = new OrderMap(NAME_SEPARATOR);

    _this.load(properties, options);

    return _this;
  }

  var __proto = Scene.prototype;

  __proto.getDuration = function () {
    var time = 0;
    this.forEach(function (item) {
      time = Math.max(time, item.getTotalDuration() / item.getPlaySpeed());
    });
    return time || this.state[DURATION];
  };

  __proto.setDuration = function (duration) {
    var items = this.items;
    var sceneDuration = this.getDuration();

    if (duration === 0 || !isFinite(sceneDuration)) {
      return this;
    }

    if (sceneDuration === 0) {
      this.forEach(function (item) {
        item.setDuration(duration);
      });
    } else {
      var ratio_1 = duration / sceneDuration;
      this.forEach(function (item) {
        item.setDelay(item.getDelay() * ratio_1);
        item.setDuration(item.getDuration() * ratio_1);
      });
    }

    _super.prototype.setDuration.call(this, duration);

    return this;
  };
  /**
  * get item in scene by name
  * @param - The item's name
  * @return {Scene | SceneItem} item
  * @example
  const item = scene.getItem("item1")
  */


  __proto.getItem = function (name) {
    return this.items[name];
  };
  /**
  * create item in scene
  * @param {} name - name of item to create
  * @param {} options - The option object of SceneItem
  * @return {} Newly created item
  * @example
  const item = scene.newItem("item1")
  */


  __proto.newItem = function (name, options) {
    if (options === void 0) {
      options = {};
    }

    if (this.items[name]) {
      return this.items[name];
    }

    var item = new SceneItem();
    this.setItem(name, item);
    item.setOptions(options);
    return item;
  };
  /**
  * remove item in scene
  * @param - name of item to remove
  * @return  An instance itself
  * @example
  const item = scene.newItem("item1")
   scene.removeItem("item1");
  */


  __proto.removeItem = function (name) {
    delete this.items[name];
    this.orderMap.remove([name]);
    return this;
  };
  /**
  * add a sceneItem to the scene
  * @param - name of item to create
  * @param - sceneItem
  * @example
  const item = scene.newItem("item1")
  */


  __proto.setItem = function (name, item) {
    item.setId(name);
    this.items[name] = item;
    this.orderMap.add([name]);
    return this;
  };

  __proto.setTime = function (time, isTick, isParent, parentEasing) {
    _super.prototype.setTime.call(this, time, isTick, isParent);

    var iterationTime = this.getIterationTime();
    var easing = this.getEasing() || parentEasing;
    var frames = {};
    this.forEach(function (item) {
      item.setTime(iterationTime * item.getPlaySpeed() - item.getDelay(), isTick, true, easing);
      frames[item.getId()] = item.temp;
    });
    this.temp = frames;
    /**
     * This event is fired when timeupdate and animate.
     * @event Scene#animate
     * @param {object} param The object of data to be sent to an event.
     * @param {number} param.currentTime The total time that the animator is running.
     * @param {number} param.time The iteration time during duration that the animator is running.
     * @param {object} param.frames frames of that time.
     * @example
    const scene = new Scene({
    a: {
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
    },
    b: {
    0: {
        opacity: 0,
    },
    1: {
        opacity: 1,
    }
    }
    }).on("animate", e => {
    console.log(e.frames);
    // {a: Frame, b: Frame}
    console.log(e.frames.a.get("opacity"));
    });
         */

    this.trigger("animate", {
      frames: frames,
      currentTime: this.getTime(),
      time: iterationTime
    });
    return this;
  };
  /**
   * executes a provided function once for each scene item.
   * @param - Function to execute for each element, taking three arguments
   * @return {Scene} An instance itself
   */


  __proto.forEach = function (func) {
    var items = this.items;
    this.getOrders().forEach(function (id, index) {
      func(items[id], id, index, items);
    });
    return this;
  };

  __proto.toCSS = function (playCondition, duration, parentStates) {
    if (duration === void 0) {
      duration = this.getDuration();
    }

    if (parentStates === void 0) {
      parentStates = [];
    }

    var totalDuration = !duration || !isFinite(duration) ? 0 : duration;
    var styles = [];
    var state = this.state;
    state[DURATION] = this.getDuration();
    this.forEach(function (item) {
      styles.push(item.toCSS(playCondition, totalDuration, parentStates.concat(state)));
    });
    return styles.join("");
  };
  /**
   * Export the CSS of the items to the style.
   * @param - Add a selector or className to play.
   * @return {Scene} An instance itself
   */


  __proto.exportCSS = function (playCondition, duration, parentStates) {
    var css = this.toCSS(playCondition, duration, parentStates);

    if (!parentStates || !parentStates.length) {
      if (this.styledInjector) {
        this.styledInjector.destroy();
        this.styledInjector = null;
      }

      this.styled = styled(css);
      this.styledInjector = this.styled.inject(this.getAnimationElement(), {
        original: true
      }); // && exportCSS(getRealId(this), css);
    }

    return this;
  };

  __proto.append = function (item) {
    item.setDelay(item.getDelay() + this.getDuration());
    this.setItem(getRealId(item), item);
  };

  __proto.pauseCSS = function () {
    return this.forEach(function (item) {
      item.pauseCSS();
    });
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    isPausedCSS(this) && this.pauseCSS();
    this.forEach(function (item) {
      item.pause();
    });
    return this;
  };

  __proto.endCSS = function () {
    this.forEach(function (item) {
      item.endCSS();
    });
    setPlayCSS(this, false);
  };

  __proto.end = function () {
    isEndedCSS(this) && this.endCSS();

    _super.prototype.end.call(this);

    return this;
  };
  /**
  * get item orders
  * @example
  scene.getOrders() // => ["item1", "item2"]
  */


  __proto.getOrders = function () {
    return this.orderMap.get([]) || [];
  };
  /**
    * set item orders
    * @param - orders
    * @example
    frame.setOrders(["item2", "item1"]) // => ["item2", "item1"]
    */


  __proto.setOrders = function (orders) {
    return this.orderMap.set([], orders);
  };

  __proto.getAnimationElement = function () {
    var animtionElement;
    this.forEach(function (item) {
      var el = item.getAnimationElement();
      !animtionElement && (animtionElement = el);
    });
    return animtionElement;
  };

  __proto.addPlayClass = function (isPaused, playClassName, properties) {
    if (properties === void 0) {
      properties = {};
    }

    var animtionElement;
    this.forEach(function (item) {
      var el = item.addPlayClass(isPaused, playClassName, properties);
      !animtionElement && (animtionElement = el);
    });
    return animtionElement;
  };
  /**
  * Play using the css animation and keyframes.
  * @param - Check if you want to export css.
  * @param [playClassName="startAnimation"] - Add a class name to play.
  * @param - The shorthand properties for six of the animation properties.
  * @return {Scene} An instance itself
  * @see {@link https://www.w3schools.com/cssref/css3_pr_animation.asp}
  * @example
  scene.playCSS();
  scene.playCSS(false, {
  direction: "reverse",
  fillMode: "forwards",
  });
  */


  __proto.playCSS = function (isExportCSS, playClassName, properties) {
    if (isExportCSS === void 0) {
      isExportCSS = true;
    }

    if (properties === void 0) {
      properties = {};
    }

    playCSS(this, isExportCSS, playClassName, properties);
    return this;
  };
  /**
    * Set properties to the Scene.
    * @param - properties
    * @return An instance itself
    * @example
  scene.set({
  ".a": {
      0: {
          opacity: 0,
      },
      1: {
          opacity: 1,
      },
  },
  });
  // 0
  console.log(scene.getItem(".a").get(0, "opacity"));
  // 1
  console.log(scene.getItem(".a").get(1, "opacity"));
    */


  __proto.set = function (properties) {
    this.load(properties);
    return this;
  };
  /**
    * Clear All Items
    * @return {Scene} An instance itself
    */


  __proto.clear = function () {
    this.finish();
    this.items = {};
    this.orderMap = new OrderMap(NAME_SEPARATOR);

    if (this.styledInjector) {
      this.styledInjector.destroy();
    }

    this.styled = null;
    this.styledInjector = null;
  };

  __proto.load = function (properties, options) {
    if (properties === void 0) {
      properties = {};
    }

    if (options === void 0) {
      options = properties.options;
    }

    if (!properties) {
      return this;
    }

    var selector = options && options[SELECTOR] || this.state[SELECTOR];

    for (var name in properties) {
      if (name === "options") {
        continue;
      }

      var object = properties[name];
      var item = void 0;

      if (object instanceof Scene || object instanceof SceneItem) {
        this.setItem(name, object);
        item = object;
      } else if (isFunction(object) && selector) {
        var elements = IS_WINDOW ? $("" + (isFunction(selector) ? selector(name) : name), true) : [];
        var length = elements.length;
        var scene = new Scene();

        for (var i = 0; i < length; ++i) {
          scene.newItem(i).setId().setElement(elements[i]).load(object(i, elements[i]));
        }

        this.setItem(name, scene);
        continue;
      } else {
        item = this.newItem(name);
        item.load(object);
      }

      selector && item.setSelector(selector);
    }

    this.setOptions(options);
  };

  __proto.setOptions = function (options) {
    if (options === void 0) {
      options = {};
    }

    _super.prototype.setOptions.call(this, options);

    var selector = options.selector;

    if (selector) {
      this.state[SELECTOR] = selector;
    }

    return this;
  };

  __proto.setSelector = function (target) {
    var state = this.state;
    var selector = target || state[SELECTOR];
    state[SELECTOR] = selector;
    var isItFunction = isFunction(target);

    if (selector) {
      this.forEach(function (item, name) {
        item.setSelector(isItFunction ? target(name) : selector);
      });
    }

    return this;
  };

  __proto.start = function (delay) {
    if (delay === void 0) {
      delay = this.state[DELAY];
    }

    var result = _super.prototype.start.call(this, delay);

    if (result) {
      this.forEach(function (item) {
        item.start(0);
      });
    } else {
      this.forEach(function (item) {
        item.setPlayState(RUNNING);
      });
    }

    return result;
  };
  /**
  * version info
  * @type {string}
  * @example
  * Scene.VERSION // 1.4.2
  */


  Scene.VERSION = "1.4.2";
  return Scene;
}(Animator);

function animate(properties, options) {
  return new Scene(properties, options).play();
}
function animateItem(properties, options) {
  return new SceneItem(properties, options).play();
}

export default Scene;
export { Animator, EASE, EASE_IN, EASE_IN_OUT, EASE_OUT, EVENTS, FIXED, Frame, LINEAR, NAME_SEPARATOR, OPTIONS, ROLES, STEP_END, STEP_START, SceneItem, animate, animateItem, bezier, setAlias, setRole, steps };
//# sourceMappingURL=scene.esm.js.map
