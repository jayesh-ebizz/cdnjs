/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.0-next.8
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bubblecompare", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bubblecompare"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BubbleCompare; });
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(d3_selection__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);





/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare = /*#__PURE__*/function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this), "$$", void 0), Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this) || Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_this);
  }

  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(BubbleCompare, _Plugin);

  var _proto = BubbleCompare.prototype;
  return _proto.$init = function $init() {
    var $$ = this.$$;
    $$.findClosest = this.findClosest.bind(this), $$.getBubbleR = this.getBubbleR.bind(this), $$.pointExpandedR = this.pointExpandedR.bind(this);
  }, _proto.pointExpandedR = function pointExpandedR(d) {
    var baseR = this.getBubbleR(d),
        _this$options$expandS = this.options.expandScale,
        expandScale = _this$options$expandS === void 0 ? 1 : _this$options$expandS;
    return BubbleCompare.raiseFocusedBubbleLayer(d), this.changeCursorPoint(), baseR * expandScale;
  }, BubbleCompare.raiseFocusedBubbleLayer = function raiseFocusedBubbleLayer(d) {
    d.raise && Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(d.node().parentNode.parentNode).raise();
  }, _proto.changeCursorPoint = function changeCursorPoint() {
    this.$$.$el.svg.select(".bb-event-rect").style("cursor", "pointer");
  }, _proto.findClosest = function findClosest(values, pos) {
    var _this2 = this,
        $$ = this.$$;

    return values.filter(function (v) {
      return v && !$$.isBarType(v.id);
    }).reduce(function (acc, cur) {
      var d = $$.dist(cur, pos);
      return d < _this2.getBubbleR(cur) ? cur : acc;
    }, 0);
  }, _proto.getBubbleR = function getBubbleR(d) {
    var _this3 = this,
        _this$options = this.options,
        minR = _this$options.minR,
        maxR = _this$options.maxR,
        curVal = this.getZData(d);

    if (!curVal) return minR;

    var _this$$$$data$targets = this.$$.data.targets.reduce(function (_ref, cur) {
      var accMin = _ref[0],
          accMax = _ref[1],
          val = _this3.getZData(cur.values[0]);

      return [Math.min(accMin, val), Math.max(accMax, val)];
    }, [1e4, 0]),
        min = _this$$$$data$targets[0],
        max = _this$$$$data$targets[1],
        size = min > 0 && max === min ? 0 : curVal / max;

    return Math.abs(size) * (maxR - minR) + minR;
  }, _proto.getZData = function getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }, BubbleCompare;
}(_Plugin__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(BubbleCompare, "version", "0.0.1");



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0-next.8");



/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL2J1YmJsZWNvbXBhcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9pbmhlcml0c0xvb3NlLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtc2VsZWN0aW9uXCIsXCJjb21tb25qczJcIjpcImQzLXNlbGVjdGlvblwiLFwiYW1kXCI6XCJkMy1zZWxlY3Rpb25cIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL1BsdWdpbi50cyJdLCJuYW1lcyI6WyJCdWJibGVDb21wYXJlIiwib3B0aW9ucyIsIiRpbml0IiwiJCQiLCJmaW5kQ2xvc2VzdCIsImJpbmQiLCJnZXRCdWJibGVSIiwicG9pbnRFeHBhbmRlZFIiLCJkIiwiYmFzZVIiLCJleHBhbmRTY2FsZSIsInJhaXNlRm9jdXNlZEJ1YmJsZUxheWVyIiwiY2hhbmdlQ3Vyc29yUG9pbnQiLCJyYWlzZSIsImQzU2VsZWN0Iiwibm9kZSIsInBhcmVudE5vZGUiLCIkZWwiLCJzdmciLCJzZWxlY3QiLCJzdHlsZSIsInZhbHVlcyIsInBvcyIsImZpbHRlciIsInYiLCJpc0JhclR5cGUiLCJpZCIsInJlZHVjZSIsImFjYyIsImN1ciIsImRpc3QiLCJtaW5SIiwibWF4UiIsImN1clZhbCIsImdldFpEYXRhIiwiZGF0YSIsInRhcmdldHMiLCJhY2NNaW4iLCJhY2NNYXgiLCJ2YWwiLCJNYXRoIiwibWluIiwibWF4Iiwic2l6ZSIsImFicyIsImlzQnViYmxlWlR5cGUiLCJnZXRCdWJibGVaRGF0YSIsInZhbHVlIiwiUGx1Z2luIiwiJGJlZm9yZUluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7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LEdBQWVBLE9BRFU7QUFFekI7QUFFRDs7Ozs7OztnQkFJQWdELFcsR0FBQSx1QkFBYyxDQUFFO0FBRWhCOzs7O1dBSUEvQyxLLEdBQUEsaUJBQVEsQ0FBRTtBQUVWOzs7O1dBSUFnRCxVLEdBQUEsc0JBQWEsQ0FBRTtBQUVmOzs7O1dBSUFDLE8sR0FBQSxtQkFBVSxDQUFFO0FBRVo7Ozs7V0FJQUMsWSxHQUFBLHdCQUFlO0FBQUE7O0FBQ2RDLFVBQU0sQ0FBQ0MsSUFBUCxDQUFZLElBQVosRUFBa0JDLE9BQWxCLENBQTBCLFVBQUFDLEdBQUcsRUFBSTtBQUNoQyxXQUFJLENBQUNBLEdBQUQsQ0FBSixHQUFZLElBRG9CLEVBRWhDLE9BQU8sS0FBSSxDQUFDQSxHQUFELENBRnFCO0FBR2hDLEtBSEQsQ0FEYztBQUtkLEc7OztrR0EvQ21CUixNLGFBR0gsYyIsImZpbGUiOiJiaWxsYm9hcmRqcy1wbHVnaW4tYnViYmxlY29tcGFyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImQzLXNlbGVjdGlvblwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImJ1YmJsZWNvbXBhcmVcIiwgW1wiZDMtc2VsZWN0aW9uXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJkMy1zZWxlY3Rpb25cIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImJiXCJdID0gcm9vdFtcImJiXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gPSByb290W1wiYmJcIl1bXCJwbHVnaW5cIl0gfHwge30sIHJvb3RbXCJiYlwiXVtcInBsdWdpblwiXVtcImJ1YmJsZWNvbXBhcmVcIl0gPSBmYWN0b3J5KHJvb3RbXCJkM1wiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX180X18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJpbXBvcnQge3NlbGVjdCBhcyBkM1NlbGVjdH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IFBsdWdpbiBmcm9tIFwiLi4vUGx1Z2luXCI7XG5cbi8qKlxuICogQnViYmxlIGNvbXBhcmUgZGlhZ3JhbSBwbHVnaW4uPGJyPlxuICogQ29tcGFyZSBkYXRhIDMtZGltZW5zaW9uYWwgd2F5czogeC1heGlzLCB5LWF4aXMgJiBidWJibGUtc2l6ZS5cbiAqIC0gKipOT1RFOioqXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cbiAqIC0gKipSZXF1aXJlZCBtb2R1bGVzOioqXG4gKiAgIC0gW2QzLXNlbGVjdGlvbl0oaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLXNlbGVjdGlvbilcbiAqIEBjbGFzcyBwbHVnaW4tYnViYmxlY29tcGFyZVxuICogQHJlcXVpcmVzIGQzLXNlbGVjdGlvblxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYnViYmxlIGNvbXBhcmUgcGx1Z2luIG9wdGlvbnNcbiAqIEBhdWdtZW50cyBQbHVnaW5cbiAqIEByZXR1cm5zIHtCdWJibGVDb21wYXJlfVxuICogQGV4YW1wbGVcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJidWJibGVcIlxuICogICAgIH1cbiAqICAgICAuLi5cbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IGJiLnBsdWdpbi5idWJibGVjb21wYXJlKHtcbiAqICAgICAgICAgIG1pblI6IDExLFxuICogICAgICAgICAgbWF4UjogNzQsXG4gKiAgICAgICAgICBleHBhbmRTY2FsZTogMS4xXG4gKiAgICAgICAgfSksXG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgQnViYmxlQ29tcGFyZSBmcm9tIFwiYmlsbGJvYXJkLmpzL2Rpc3QvYmlsbGJvYXJkanMtcGx1Z2luLWJ1YmJsZWNvbXBhcmVcIjtcbiAqXG4gKiBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBCdWJibGVDb21wYXJlKHsgLi4uIH0pXG4gKiAgICAgXVxuICogfSlcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWJibGVDb21wYXJlIGV4dGVuZHMgUGx1Z2luIHtcblx0c3RhdGljIHZlcnNpb24gPSBgMC4wLjFgO1xuXHRwdWJsaWMgJCQ7XG5cblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKG9wdGlvbnMpO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQkaW5pdCgpOiB2b2lkIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdCQkLmZpbmRDbG9zZXN0ID0gdGhpcy5maW5kQ2xvc2VzdC5iaW5kKHRoaXMpO1xuXHRcdCQkLmdldEJ1YmJsZVIgPSB0aGlzLmdldEJ1YmJsZVIuYmluZCh0aGlzKTtcblx0XHQkJC5wb2ludEV4cGFuZGVkUiA9IHRoaXMucG9pbnRFeHBhbmRlZFIuYmluZCh0aGlzKTtcblx0fVxuXG5cdHBvaW50RXhwYW5kZWRSKGQpOiBudW1iZXIge1xuXHRcdGNvbnN0IGJhc2VSID0gdGhpcy5nZXRCdWJibGVSKGQpO1xuXHRcdGNvbnN0IHtleHBhbmRTY2FsZSA9IDF9ID0gdGhpcy5vcHRpb25zO1xuXG5cdFx0QnViYmxlQ29tcGFyZS5yYWlzZUZvY3VzZWRCdWJibGVMYXllcihkKTtcblx0XHR0aGlzLmNoYW5nZUN1cnNvclBvaW50KCk7XG5cblx0XHRyZXR1cm4gYmFzZVIgKiBleHBhbmRTY2FsZTtcblx0fVxuXG5cdHN0YXRpYyByYWlzZUZvY3VzZWRCdWJibGVMYXllcihkKTogdm9pZCB7XG5cdFx0ZC5yYWlzZSAmJiBkM1NlbGVjdChkLm5vZGUoKS5wYXJlbnROb2RlLnBhcmVudE5vZGUpLnJhaXNlKCk7XG5cdH1cblxuXHRjaGFuZ2VDdXJzb3JQb2ludCgpOiB2b2lkIHtcblx0XHR0aGlzLiQkLiRlbC5zdmcuc2VsZWN0KGAuYmItZXZlbnQtcmVjdGApLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKTtcblx0fVxuXG5cdGZpbmRDbG9zZXN0KHZhbHVlcywgcG9zKTogbnVtYmVyIHtcblx0XHRjb25zdCB7JCR9ID0gdGhpcztcblxuXHRcdHJldHVybiB2YWx1ZXNcblx0XHRcdC5maWx0ZXIodiA9PiB2ICYmICEkJC5pc0JhclR5cGUodi5pZCkpXG5cdFx0XHQucmVkdWNlKChhY2MsIGN1cikgPT4ge1xuXHRcdFx0XHRjb25zdCBkID0gJCQuZGlzdChjdXIsIHBvcyk7XG5cblx0XHRcdFx0cmV0dXJuIGQgPCB0aGlzLmdldEJ1YmJsZVIoY3VyKSA/IGN1ciA6IGFjYztcblx0XHRcdH0sIDApO1xuXHR9XG5cblx0Z2V0QnViYmxlUihkKTogbnVtYmVyIHtcblx0XHRjb25zdCB7bWluUiwgbWF4Un0gPSB0aGlzLm9wdGlvbnM7XG5cdFx0Y29uc3QgY3VyVmFsID0gdGhpcy5nZXRaRGF0YShkKTtcblxuXHRcdGlmICghY3VyVmFsKSByZXR1cm4gbWluUjtcblxuXHRcdGNvbnN0IFttaW4sIG1heF0gPSB0aGlzLiQkLmRhdGEudGFyZ2V0cy5yZWR1Y2UoXG5cdFx0XHQoW2FjY01pbiwgYWNjTWF4XSwgY3VyKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHZhbCA9IHRoaXMuZ2V0WkRhdGEoY3VyLnZhbHVlc1swXSk7XG5cblx0XHRcdFx0cmV0dXJuIFtNYXRoLm1pbihhY2NNaW4sIHZhbCksIE1hdGgubWF4KGFjY01heCwgdmFsKV07XG5cdFx0XHR9LFxuXHRcdFx0WzEwMDAwLCAwXVxuXHRcdCk7XG5cdFx0Y29uc3Qgc2l6ZSA9IG1pbiA+IDAgJiYgbWF4ID09PSBtaW4gPyAwIDogY3VyVmFsIC8gbWF4O1xuXG5cdFx0cmV0dXJuIE1hdGguYWJzKHNpemUpICogKG1heFIgLSBtaW5SKSArIG1pblI7XG5cdH1cblxuXHRnZXRaRGF0YShkKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy4kJC5pc0J1YmJsZVpUeXBlKGQpID9cblx0XHRcdHRoaXMuJCQuZ2V0QnViYmxlWkRhdGEoZC52YWx1ZSwgXCJ6XCIpIDpcblx0XHRcdGQudmFsdWU7XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufSIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNF9fOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8qKlxuICogQmFzZSBjbGFzcyB0byBnZW5lcmF0ZSBiaWxsYm9hcmQuanMgcGx1Z2luXG4gKiBAY2xhc3MgUGx1Z2luXG4gKi9cbi8qKlxuICogVmVyc2lvbiBpbmZvIHN0cmluZyBmb3IgcGx1Z2luXG4gKiBAbmFtZSB2ZXJzaW9uXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUGx1Z2luXG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQGV4YW1wbGVcbiAqICAgYmIucGx1Z2luLnN0YW5mb3JkLnZlcnNpb247ICAvLyBleCkgMS45LjBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGx1Z2luIHtcblx0cHVibGljICQkO1xuXHRwdWJsaWMgb3B0aW9ucztcblx0c3RhdGljIHZlcnNpb24gPSBcIjIuMC4wLW5leHQuOFwiO1xuXG5cdC8qKlxuXHQgKiBDb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0FueX0gb3B0aW9ucyBjb25maWcgb3B0aW9uIG9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2JlZm9yZUluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGJlZm9yZUluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2luaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGluaXQoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ2FmdGVySW5pdCcgcGhhc2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHQkYWZ0ZXJJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdyZWRyYXcnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHJlZHJhdygpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAnd2lsbERlc3Ryb3knIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JHdpbGxEZXN0cm95KCkge1xuXHRcdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdHRoaXNba2V5XSA9IG51bGw7XG5cdFx0XHRkZWxldGUgdGhpc1trZXldO1xuXHRcdH0pO1xuXHR9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9