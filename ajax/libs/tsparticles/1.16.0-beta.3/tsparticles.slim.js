/*!
 * Author : Matteo Bruni - https://www.matteobruni.it
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.matteobruni.it/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.16.0-beta.3
 */
(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "MoveDirection", function() { return /* reexport */ MoveDirection; });
__webpack_require__.d(__webpack_exports__, "RotateDirection", function() { return /* reexport */ RotateDirection; });
__webpack_require__.d(__webpack_exports__, "ClickMode", function() { return /* reexport */ ClickMode; });
__webpack_require__.d(__webpack_exports__, "DivMode", function() { return /* reexport */ DivMode; });
__webpack_require__.d(__webpack_exports__, "HoverMode", function() { return /* reexport */ HoverMode; });
__webpack_require__.d(__webpack_exports__, "CollisionMode", function() { return /* reexport */ CollisionMode; });
__webpack_require__.d(__webpack_exports__, "OutMode", function() { return /* reexport */ OutMode; });
__webpack_require__.d(__webpack_exports__, "SizeMode", function() { return /* reexport */ SizeMode; });
__webpack_require__.d(__webpack_exports__, "SizeAnimationStatus", function() { return /* reexport */ SizeAnimationStatus; });
__webpack_require__.d(__webpack_exports__, "OpacityAnimationStatus", function() { return /* reexport */ OpacityAnimationStatus; });
__webpack_require__.d(__webpack_exports__, "DestroyType", function() { return /* reexport */ DestroyType; });
__webpack_require__.d(__webpack_exports__, "ProcessBubbleType", function() { return /* reexport */ ProcessBubbleType; });
__webpack_require__.d(__webpack_exports__, "ShapeType", function() { return /* reexport */ ShapeType; });
__webpack_require__.d(__webpack_exports__, "StartValueType", function() { return /* reexport */ StartValueType; });
__webpack_require__.d(__webpack_exports__, "DivType", function() { return /* reexport */ DivType; });
__webpack_require__.d(__webpack_exports__, "InteractivityDetect", function() { return /* reexport */ InteractivityDetect; });
__webpack_require__.d(__webpack_exports__, "tsParticles", function() { return /* binding */ tsParticles; });
__webpack_require__.d(__webpack_exports__, "particlesJS", function() { return /* binding */ particlesJS; });
__webpack_require__.d(__webpack_exports__, "pJSDom", function() { return /* binding */ pJSDom; });

// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

// CONCATENATED MODULE: ./dist/ShapeDrawers/SquareDrawer.js
class SquareDrawer {
  draw(context, particle, radius) {
    context.rect(-radius, -radius, radius * 2, radius * 2);
  }

}
// CONCATENATED MODULE: ./dist/Enums/Directions/MoveDirection.js
var MoveDirection;

(function (MoveDirection) {
  MoveDirection["bottom"] = "bottom";
  MoveDirection["bottomLeft"] = "bottom-left";
  MoveDirection["bottomRight"] = "bottom-right";
  MoveDirection["left"] = "left";
  MoveDirection["none"] = "none";
  MoveDirection["right"] = "right";
  MoveDirection["top"] = "top";
  MoveDirection["topLeft"] = "top-left";
  MoveDirection["topRight"] = "top-right";
})(MoveDirection || (MoveDirection = {}));
// CONCATENATED MODULE: ./dist/Utils/Constants.js
class Constants {}
Constants.canvasClass = "tsparticles-canvas-el";
Constants.randomColorValue = "random";
Constants.midColorValue = "mid";
Constants.touchEndEvent = "touchend";
Constants.mouseUpEvent = "mouseup";
Constants.mouseMoveEvent = "mousemove";
Constants.touchStartEvent = "touchstart";
Constants.touchMoveEvent = "touchmove";
Constants.mouseLeaveEvent = "mouseleave";
Constants.touchCancelEvent = "touchcancel";
Constants.resizeEvent = "resize";
Constants.visibilityChangeEvent = "visibilitychange";
Constants.noPolygonDataLoaded = "No polygon data loaded.";
Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
// CONCATENATED MODULE: ./dist/Utils/ColorUtils.js


class ColorUtils_ColorUtils {
  static colorToRgb(input) {
    var _a, _b;

    if (input === undefined) {
      return;
    }

    const color = typeof input === "string" ? {
      value: input
    } : input;
    let res;

    if (typeof color.value === "string") {
      if (color.value === Constants.randomColorValue) {
        res = this.getRandomRgbColor();
      } else {
        res = ColorUtils_ColorUtils.stringToRgb(color.value);
      }
    } else {
      if (color.value instanceof Array) {
        const colorSelected = Utils_Utils.itemFromArray(color.value);
        res = ColorUtils_ColorUtils.colorToRgb({
          value: colorSelected
        });
      } else {
        const colorValue = color.value;
        const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

        if (rgbColor.r !== undefined) {
          res = rgbColor;
        } else {
          const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;

          if (hslColor.h !== undefined) {
            res = ColorUtils_ColorUtils.hslToRgb(hslColor);
          }
        }
      }
    }

    return res;
  }

  static colorToHsl(color) {
    const rgb = this.colorToRgb(color);
    return rgb !== undefined ? this.rgbToHsl(rgb) : rgb;
  }

  static rgbToHsl(color) {
    const r1 = color.r / 255;
    const g1 = color.g / 255;
    const b1 = color.b / 255;
    const maxColor = Math.max(r1, g1, b1);
    const minColor = Math.min(r1, g1, b1);
    const res = {
      h: 0,
      l: (maxColor + minColor) / 2,
      s: 0
    };

    if (maxColor != minColor) {
      res.s = res.l < 0.5 ? (maxColor - minColor) / (maxColor + minColor) : (maxColor - minColor) / (2.0 - maxColor - minColor);
      res.h = r1 === maxColor ? (g1 - b1) / (maxColor - minColor) : res.h = g1 === maxColor ? 2.0 + (b1 - r1) / (maxColor - minColor) : 4.0 + (r1 - g1) / (maxColor - minColor);
    }

    res.l *= 100;
    res.s *= 100;
    res.h *= 60;

    if (res.h < 0) {
      res.h += 360;
    }

    return res;
  }

  static stringToAlpha(input) {
    var _a;

    return (_a = ColorUtils_ColorUtils.stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
  }

  static stringToRgb(input) {
    return ColorUtils_ColorUtils.stringToRgba(input);
  }

  static hslToRgb(hsl) {
    const result = {
      b: 0,
      g: 0,
      r: 0
    };
    const hslPercent = {
      h: hsl.h / 360,
      l: hsl.l / 100,
      s: hsl.s / 100
    };

    if (hslPercent.s === 0) {
      result.b = hslPercent.l;
      result.g = hslPercent.l;
      result.r = hslPercent.l;
    } else {
      const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
      const p = 2 * hslPercent.l - q;
      result.r = ColorUtils_ColorUtils.hue2rgb(p, q, hslPercent.h + 1 / 3);
      result.g = ColorUtils_ColorUtils.hue2rgb(p, q, hslPercent.h);
      result.b = ColorUtils_ColorUtils.hue2rgb(p, q, hslPercent.h - 1 / 3);
    }

    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);
    return result;
  }

  static hslaToRgba(hsla) {
    const rgbResult = ColorUtils_ColorUtils.hslToRgb(hsla);
    return {
      a: hsla.a,
      b: rgbResult.b,
      g: rgbResult.g,
      r: rgbResult.r
    };
  }

  static getRandomRgbColor(min) {
    var _a;

    const fixedMin = min || 0;
    const minColor = fixedMin + fixedMin * Math.pow(16, 2) + fixedMin * Math.pow(16, 4);
    const factor = minColor ^ 0xffffff;
    const randomColor = Math.floor(Math.random() * factor | minColor).toString(16);
    return (_a = this.stringToRgb(`#${randomColor}`)) !== null && _a !== void 0 ? _a : {
      b: 0,
      g: 0,
      r: 0
    };
  }

  static getStyleFromRgb(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
  }

  static getStyleFromHsl(color, opacity) {
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
  }

  static mix(color1, color2, size1, size2) {
    let rgb1 = color1;
    let rgb2 = color2;

    if (rgb1.r === undefined) {
      rgb1 = this.hslToRgb(color1);
    }

    if (rgb2.r === undefined) {
      rgb2 = this.hslToRgb(color2);
    }

    return {
      b: Utils_Utils.mix(rgb1.b, rgb2.b, size1, size2),
      g: Utils_Utils.mix(rgb1.g, rgb2.g, size1, size2),
      r: Utils_Utils.mix(rgb1.r, rgb2.r, size1, size2)
    };
  }

  static hue2rgb(p, q, t) {
    let tCalc = t;

    if (tCalc < 0) {
      tCalc += 1;
    }

    if (tCalc > 1) {
      tCalc -= 1;
    }

    if (tCalc < 1 / 6) {
      return p + (q - p) * 6 * tCalc;
    }

    if (tCalc < 1 / 2) {
      return q;
    }

    if (tCalc < 2 / 3) {
      return p + (q - p) * (2 / 3 - tCalc) * 6;
    }

    return p;
  }

  static stringToRgba(input) {
    if (input.startsWith("rgb")) {
      const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
      const result = regex.exec(input);
      return result ? {
        a: result.length > 4 ? parseFloat(result[5]) : 1,
        b: parseInt(result[3], 10),
        g: parseInt(result[2], 10),
        r: parseInt(result[1], 10)
      } : undefined;
    } else if (input.startsWith("hsl")) {
      const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
      const result = regex.exec(input);
      return result ? ColorUtils_ColorUtils.hslaToRgba({
        a: result.length > 4 ? parseFloat(result[5]) : 1,
        h: parseInt(result[1], 10),
        l: parseInt(result[3], 10),
        s: parseInt(result[2], 10)
      }) : undefined;
    } else {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
      const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
        return r + r + g + g + b + b + (a !== undefined ? a + a : "");
      });
      const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
      const result = regex.exec(hexFixed);
      return result ? {
        a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
        b: parseInt(result[3], 16),
        g: parseInt(result[2], 16),
        r: parseInt(result[1], 16)
      } : undefined;
    }
  }

}
// CONCATENATED MODULE: ./dist/Utils/Utils.js



class Utils_Utils {
  static isSsr() {
    return typeof window === "undefined" || !window;
  }

  static get animate() {
    return this.isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
  }

  static get cancelAnimation() {
    return this.isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
  }

  static replaceColorSvg(image, color, opacity) {
    if (!image.svgData) {
      return "";
    }

    const svgXml = image.svgData;
    const rgbHex = /#([0-9A-F]{3,6})/gi;
    return svgXml.replace(rgbHex, () => ColorUtils_ColorUtils.getStyleFromHsl(color, opacity));
  }

  static clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }

  static isInArray(value, array) {
    return value === array || array instanceof Array && array.indexOf(value) > -1;
  }

  static mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
  }

  static getParticleBaseVelocity(particle) {
    let velocityBase;

    switch (particle.direction) {
      case MoveDirection.top:
        velocityBase = {
          x: 0,
          y: -1
        };
        break;

      case MoveDirection.topRight:
        velocityBase = {
          x: 0.5,
          y: -0.5
        };
        break;

      case MoveDirection.right:
        velocityBase = {
          x: 1,
          y: -0
        };
        break;

      case MoveDirection.bottomRight:
        velocityBase = {
          x: 0.5,
          y: 0.5
        };
        break;

      case MoveDirection.bottom:
        velocityBase = {
          x: 0,
          y: 1
        };
        break;

      case MoveDirection.bottomLeft:
        velocityBase = {
          x: -0.5,
          y: 1
        };
        break;

      case MoveDirection.left:
        velocityBase = {
          x: -1,
          y: 0
        };
        break;

      case MoveDirection.topLeft:
        velocityBase = {
          x: -0.5,
          y: -0.5
        };
        break;

      default:
        velocityBase = {
          x: 0,
          y: 0
        };
        break;
    }

    return velocityBase;
  }

  static getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x;
    const dy = pointA.y - pointB.y;
    return {
      dx: dx,
      dy: dy,
      distance: Math.sqrt(dx * dx + dy * dy)
    };
  }

  static getDistance(pointA, pointB) {
    return this.getDistances(pointA, pointB).distance;
  }

  static loadFont(character) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield document.fonts.load(`${character.weight} 36px '${character.font}'`);
      } catch (_a) {}
    });
  }

  static arrayRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  static itemFromArray(array, index) {
    return array[index !== undefined ? index : this.arrayRandomIndex(array)];
  }

  static randomInRange(r1, r2) {
    const max = Math.max(r1, r2);
    const min = Math.min(r1, r2);
    return Math.random() * (max - min) + min;
  }

  static isPointInside(point, size, radius) {
    return this.areBoundsInside(this.calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size);
  }

  static areBoundsInside(bounds, size) {
    return bounds.left < size.width && bounds.right > 0 && bounds.top < size.height && bounds.bottom > 0;
  }

  static calculateBounds(point, radius) {
    return {
      bottom: point.y + radius,
      left: point.x - radius,
      right: point.x + radius,
      top: point.y - radius
    };
  }

  static loadImage(source) {
    return new Promise((resolve, reject) => {
      const image = {
        source: source,
        type: source.substr(source.length - 3)
      };

      if (source) {
        const img = new Image();
        img.addEventListener("load", () => {
          image.element = img;
          resolve(image);
        });
        img.addEventListener("error", () => {
          reject(`Error tsParticles - loading image: ${source}`);
        });
        img.src = source;
      } else {
        reject("Error tsParticles - No image.src");
      }
    });
  }

  static downloadSvgImage(source) {
    return __awaiter(this, void 0, void 0, function* () {
      if (source) {
        const image = {
          source: source,
          type: source.substr(source.length - 3)
        };

        if (image.type !== "svg") {
          return this.loadImage(source);
        }

        const response = yield fetch(image.source);

        if (response.ok) {
          image.svgData = yield response.text();
          return image;
        } else {
          throw new Error("Error tsParticles - Image not found");
        }
      } else {
        throw new Error("Error tsParticles - No image.src");
      }
    });
  }

  static deepExtend(destination, ...sources) {
    for (const source of sources) {
      if (source === undefined || source === null) {
        continue;
      }

      if (typeof source !== "object") {
        destination = source;
        continue;
      }

      const sourceIsArray = Array.isArray(source);

      if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
        destination = [];
      } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
        destination = {};
      }

      for (const key in source) {
        if (key === "__proto__") {
          continue;
        }

        const value = source[key];
        const isObject = typeof value === "object";
        destination[key] = isObject && Array.isArray(value) ? value.map(v => this.deepExtend(destination[key], v)) : this.deepExtend(destination[key], value);
      }
    }

    return destination;
  }

  static isDivModeEnabled(mode, divs) {
    return divs instanceof Array ? divs.filter(t => t.enable && Utils_Utils.isInArray(mode, t.mode)).length > 0 : Utils_Utils.isInArray(mode, divs.mode);
  }

  static divModeExecute(mode, divs, callback) {
    if (divs instanceof Array) {
      for (const div of divs) {
        const divMode = div.mode;
        const divEnabled = div.enable;

        if (divEnabled && Utils_Utils.isInArray(mode, divMode)) {
          this.singleDivModeExecute(div, callback);
        }
      }
    } else {
      const divMode = divs.mode;
      const divEnabled = divs.enable;

      if (divEnabled && Utils_Utils.isInArray(mode, divMode)) {
        this.singleDivModeExecute(divs, callback);
      }
    }
  }

  static singleDivModeExecute(div, callback) {
    const ids = div.ids;

    if (ids instanceof Array) {
      for (const id of ids) {
        callback(id, div);
      }
    } else {
      callback(ids, div);
    }
  }

  static divMode(divs, divId) {
    if (!divId) {
      return;
    }

    if (!divs) {
      return;
    }

    if (divs instanceof Array) {
      return divs.find(d => Utils_Utils.isInArray(divId, d.ids));
    } else if (Utils_Utils.isInArray(divId, divs.ids)) {
      return divs;
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Types/ShapeType.js
var ShapeType;

(function (ShapeType) {
  ShapeType["char"] = "char";
  ShapeType["character"] = "character";
  ShapeType["circle"] = "circle";
  ShapeType["edge"] = "edge";
  ShapeType["image"] = "image";
  ShapeType["images"] = "images";
  ShapeType["line"] = "line";
  ShapeType["polygon"] = "polygon";
  ShapeType["square"] = "square";
  ShapeType["star"] = "star";
  ShapeType["triangle"] = "triangle";
})(ShapeType || (ShapeType = {}));
// CONCATENATED MODULE: ./dist/ShapeDrawers/TextDrawer.js



class TextDrawer_TextDrawer {
  init(container) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      const options = container.options;

      if (Utils_Utils.isInArray(ShapeType.char, options.particles.shape.type) || Utils_Utils.isInArray(ShapeType.character, options.particles.shape.type)) {
        const shapeOptions = (_a = options.particles.shape.options[ShapeType.character]) !== null && _a !== void 0 ? _a : options.particles.shape.options[ShapeType.char];

        if (shapeOptions instanceof Array) {
          for (const character of shapeOptions) {
            yield Utils_Utils.loadFont(character);
          }
        } else {
          if (shapeOptions !== undefined) {
            yield Utils_Utils.loadFont(shapeOptions);
          }
        }
      }
    });
  }

  draw(context, particle, radius) {
    const character = particle.shapeData;

    if (character === undefined) {
      return;
    }

    const textData = character.value;

    if (textData === undefined) {
      return;
    }

    const textParticle = particle;

    if (textParticle.text === undefined) {
      if (textData instanceof Array) {
        textParticle.text = Utils_Utils.itemFromArray(textData, particle.randomIndexData);
      } else {
        textParticle.text = textData;
      }
    }

    const text = textParticle.text;
    const style = character.style;
    const weight = character.weight;
    const size = Math.round(radius) * 2;
    const font = character.font;
    const fill = particle.fill;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -radius / 2,
      y: radius / 2
    };

    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/ImageDrawer.js



class ImageDrawer_ImageDrawer {
  constructor() {
    this.images = [];
  }

  getImages(container) {
    const containerImages = this.images.filter(t => t.id === container.id);

    if (!containerImages.length) {
      this.images.push({
        id: container.id,
        images: []
      });
      return this.getImages(container);
    } else {
      return containerImages[0];
    }
  }

  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }

  init(container) {
    var _a;

    return __awaiter(this, void 0, void 0, function* () {
      const options = container.options;
      const shapeOptions = options.particles.shape;

      if (!Utils_Utils.isInArray(ShapeType.image, shapeOptions.type) && !Utils_Utils.isInArray(ShapeType.images, shapeOptions.type)) {
        return;
      }

      const imageOptions = (_a = shapeOptions.options[ShapeType.images]) !== null && _a !== void 0 ? _a : shapeOptions.options[ShapeType.image];

      if (imageOptions instanceof Array) {
        for (const optionsImage of imageOptions) {
          yield this.loadImageShape(container, optionsImage);
        }
      } else {
        yield this.loadImageShape(container, imageOptions);
      }
    });
  }

  destroy() {
    this.images = [];
  }

  loadImageShape(container, imageShape) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const image = imageShape.replaceColor ? yield Utils_Utils.downloadSvgImage(imageShape.src) : yield Utils_Utils.loadImage(imageShape.src);
        this.addImage(container, image);
      } catch (_a) {
        console.log(`tsParticles error - ${imageShape.src} not found`);
      }
    });
  }

  draw(context, particle, radius, opacity) {
    var _a, _b;

    if (!context) {
      return;
    }

    const image = particle.image;
    const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;

    if (!element) {
      return;
    }

    const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
    const pos = {
      x: -radius,
      y: -radius
    };

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = opacity;
    }

    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = 1;
    }
  }

}
// CONCATENATED MODULE: ./dist/Utils/Plugins.js
class Plugins {
  static getPlugin(plugin) {
    return this.plugins.filter(t => t.id === plugin)[0];
  }

  static addPlugin(plugin) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
  }

  static getAvailablePlugins(container) {
    const res = new Map();
    const availablePlugins = this.plugins.filter(t => t.needsPlugin(container.options));

    for (const plugin of availablePlugins) {
      res.set(plugin.id, plugin.getPlugin(container));
    }

    return res;
  }

  static loadOptions(options, sourceOptions) {
    for (const plugin of this.plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }

  static getPreset(preset) {
    return this.presets.get(preset);
  }

  static addPreset(presetKey, options) {
    if (!this.getPreset(presetKey)) {
      this.presets.set(presetKey, options);
    }
  }

  static addShapeDrawer(type, drawer) {
    if (!this.getShapeDrawer(type)) {
      this.drawers.set(type, drawer);
    }
  }

  static getShapeDrawer(type) {
    return this.drawers.get(type);
  }

  static getSupportedShapes() {
    return this.drawers.keys();
  }

}
Plugins.plugins = [];
Plugins.presets = new Map();
Plugins.drawers = new Map();
// CONCATENATED MODULE: ./dist/ShapeDrawers/LineDrawer.js
class LineDrawer {
  draw(context, particle, radius) {
    context.moveTo(0, -radius / 2);
    context.lineTo(0, radius / 2);
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/CircleDrawer.js
class CircleDrawer {
  draw(context, particle, radius) {
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/PolygonDrawerBase.js
class PolygonDrawerBase {
  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius);
    const side = this.getSidesData(particle, radius);
    const sideCount = side.count.numerator * side.count.denominator;
    const decimalSides = side.count.numerator / side.count.denominator;
    const interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
    const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;

    if (!context) {
      return;
    }

    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);

    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/TriangleDrawer.js

class TriangleDrawer_TriangleDrawer extends PolygonDrawerBase {
  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }

  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/StarDrawer.js
class StarDrawer {
  draw(context, particle, radius) {
    var _a, _b, _c;

    const star = particle.shapeData;
    const sides = (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
    const inset = (_c = star === null || star === void 0 ? void 0 : star.inset) !== null && _c !== void 0 ? _c : 2;
    context.moveTo(0, 0 - radius);

    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }

}
// CONCATENATED MODULE: ./dist/ShapeDrawers/PolygonDrawer.js

class PolygonDrawer_PolygonDrawer extends PolygonDrawerBase {
  getSidesData(particle, radius) {
    var _a, _b;

    const polygon = particle.shapeData;
    const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }

  getCenter(particle, radius) {
    var _a, _b;

    const polygon = particle.shapeData;
    const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    return {
      x: -radius / (sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }

}
// CONCATENATED MODULE: ./dist/Utils/CanvasUtils.js


class CanvasUtils_CanvasUtils {
  static paintBase(context, dimension, baseColor) {
    context.save();
    context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
  }

  static clear(context, dimension) {
    context.clearRect(0, 0, dimension.width, dimension.height);
  }

  static drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, colorLine, opacity, shadow) {
    let drawn = false;

    if (Utils_Utils.getDistance(begin, end) <= maxDistance) {
      this.drawLine(context, begin, end);
      drawn = true;
    } else if (warp) {
      let pi1;
      let pi2;
      const endNE = {
        x: end.x - canvasSize.width,
        y: end.y
      };
      const {
        dx,
        dy,
        distance
      } = Utils_Utils.getDistances(begin, endNE);

      if (distance <= maxDistance) {
        const yi = begin.y - dy / dx * begin.x;
        pi1 = {
          x: 0,
          y: yi
        };
        pi2 = {
          x: canvasSize.width,
          y: yi
        };
      } else {
        const endSW = {
          x: end.x,
          y: end.y - canvasSize.height
        };
        const {
          dx,
          dy,
          distance
        } = Utils_Utils.getDistances(begin, endSW);

        if (distance <= maxDistance) {
          const yi = begin.y - dy / dx * begin.x;
          const xi = -yi / (dy / dx);
          pi1 = {
            x: xi,
            y: 0
          };
          pi2 = {
            x: xi,
            y: canvasSize.height
          };
        } else {
          const endSE = {
            x: end.x - canvasSize.width,
            y: end.y - canvasSize.height
          };
          const {
            dx,
            dy,
            distance
          } = Utils_Utils.getDistances(begin, endSE);

          if (distance <= maxDistance) {
            const yi = begin.y - dy / dx * begin.x;
            const xi = -yi / (dy / dx);
            pi1 = {
              x: xi,
              y: yi
            };
            pi2 = {
              x: pi1.x + canvasSize.width,
              y: pi1.y + canvasSize.height
            };
          }
        }
      }

      if (pi1 && pi2) {
        this.drawLine(context, begin, pi1);
        this.drawLine(context, end, pi2);
        drawn = true;
      }
    }

    if (!drawn) {
      return;
    }

    context.lineWidth = width;

    if (backgroundMask) {
      context.globalCompositeOperation = "destination-out";
    }

    context.strokeStyle = ColorUtils_ColorUtils.getStyleFromRgb(colorLine, opacity);

    if (shadow.enable) {
      const shadowColor = ColorUtils_ColorUtils.colorToRgb(shadow.color);

      if (shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = ColorUtils_ColorUtils.getStyleFromRgb(shadowColor);
      }
    }

    context.stroke();
  }

  static drawLinkTriangle(context, width, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle) {
    this.drawTriangle(context, pos1, pos2, pos3);
    context.lineWidth = width;

    if (backgroundMask) {
      context.globalCompositeOperation = "destination-out";
    }

    context.fillStyle = ColorUtils_ColorUtils.getStyleFromRgb(colorTriangle, opacityTriangle);
    context.fill();
  }

  static drawConnectLine(context, width, lineStyle, begin, end) {
    context.save();
    this.drawLine(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
    context.restore();
  }

  static gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.size.value / p1.size.value);
    const color1 = p1.getColor();
    const color2 = p2.getColor();

    if (!color1 || !color2) {
      return;
    }

    const sourcePos = p1.getPosition();
    const destPos = p2.getPosition();
    const midRgb = ColorUtils_ColorUtils.mix(color1, color2, p1.size.value, p2.size.value);
    const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(0, ColorUtils_ColorUtils.getStyleFromHsl(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils_ColorUtils.getStyleFromRgb(midRgb, opacity));
    grad.addColorStop(1, ColorUtils_ColorUtils.getStyleFromHsl(color2, opacity));
    return grad;
  }

  static drawGrabLine(context, width, begin, end, colorLine, opacity) {
    context.save();
    this.drawLine(context, begin, end);
    context.strokeStyle = ColorUtils_ColorUtils.getStyleFromRgb(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
    context.restore();
  }

  static drawParticle(container, context, particle, delta, colorValue, backgroundMask, radius, opacity, shadow) {
    const pos = particle.getPosition();
    context.save();
    context.translate(pos.x, pos.y);
    context.beginPath();

    if (particle.angle !== 0) {
      context.rotate(particle.angle * Math.PI / 180);
    }

    if (backgroundMask) {
      context.globalCompositeOperation = "destination-out";
    }

    const shadowColor = particle.shadowColor;

    if (shadow.enable && shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = ColorUtils_ColorUtils.getStyleFromRgb(shadowColor);
      context.shadowOffsetX = shadow.offset.x;
      context.shadowOffsetY = shadow.offset.y;
    }

    context.fillStyle = colorValue;
    const stroke = particle.stroke;
    context.lineWidth = stroke.width;

    if (particle.strokeColor) {
      context.strokeStyle = ColorUtils_ColorUtils.getStyleFromRgb(particle.strokeColor, particle.stroke.opacity);
    }

    if (particle.close) {
      context.closePath();
    }

    this.drawShape(container, context, particle, radius, opacity, delta);

    if (stroke.width > 0 && particle.strokeColor) {
      context.stroke();
    }

    if (particle.fill) {
      context.fill();
    }

    context.restore();
    context.save();
    context.translate(pos.x, pos.y);

    if (particle.angle !== 0) {
      context.rotate(particle.angle * Math.PI / 180);
    }

    if (backgroundMask) {
      context.globalCompositeOperation = "destination-out";
    }

    this.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
    context.restore();
  }

  static drawShape(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
      return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!drawer) {
      return;
    }

    drawer.draw(context, particle, radius, opacity, delta);
  }

  static drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
      return;
    }

    const drawer = container.drawers.get(particle.shape);

    if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
      return;
    }

    drawer.afterEffect(context, particle, radius, opacity, delta);
  }

  static drawPlugin(context, plugin, delta) {
    if (plugin.draw !== undefined) {
      context.save();
      plugin.draw(context, delta);
      context.restore();
    }
  }

  static drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
  }

  static drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
  }

}
// CONCATENATED MODULE: ./dist/Core/Canvas.js

class Canvas_Canvas {
  constructor(container) {
    this.container = container;
    this.size = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }

  init() {
    this.resize();
    const options = this.container.options;
    const cover = options.backgroundMask.cover;
    const color = cover.color;
    const trail = options.particles.move.trail;
    this.coverColor = ColorUtils_ColorUtils.colorToRgb(color);
    this.trailFillColor = ColorUtils_ColorUtils.colorToRgb(trail.fillColor);
    this.paint();
  }

  loadCanvas(canvas, generatedCanvas) {
    var _a;

    if (!canvas.className) {
      canvas.className = Constants.canvasClass;
    }

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : false;
    this.element = canvas;
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this.context = this.element.getContext("2d");
    this.container.retina.init();
    this.initBackground();
  }

  destroy() {
    var _a;

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    if (this.context) {
      CanvasUtils_CanvasUtils.clear(this.context, this.size);
    }
  }

  resize() {
    if (!this.element) {
      return;
    }

    this.element.width = this.size.width;
    this.element.height = this.size.height;
  }

  paint() {
    const options = this.container.options;

    if (this.context) {
      if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
        this.paintBase(ColorUtils_ColorUtils.getStyleFromRgb(this.coverColor));
      } else {
        this.paintBase();
      }
    }
  }

  clear() {
    const options = this.container.options;
    const trail = options.particles.move.trail;

    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
      this.paintBase(ColorUtils_ColorUtils.getStyleFromRgb(this.trailFillColor, 1 / trail.length));
    } else if (this.context) {
      CanvasUtils_CanvasUtils.clear(this.context, this.size);
    }
  }

  drawLinkTriangle(p1, link1, link2) {
    var _a, _b;

    const container = this.container;
    const options = container.options;
    const p2 = link1.destination;
    const p3 = link2.destination;
    const triangleOptions = p1.particlesOptions.links.triangles;
    const opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const pos3 = p3.getPosition();
    const ctx = this.context;

    if (!ctx) {
      return;
    }

    let colorTriangle = ColorUtils_ColorUtils.colorToRgb(triangleOptions.color);

    if (!colorTriangle) {
      const linksOptions = p1.particlesOptions.links;
      const linkColor = linksOptions.id !== undefined ? container.particles.linksColors[linksOptions.id] : container.particles.linksColor;

      if (linkColor === Constants.randomColorValue) {
        colorTriangle = ColorUtils_ColorUtils.getRandomRgbColor();
      } else if (linkColor === "mid") {
        const sourceColor = p1.getColor();
        const destColor = p2.getColor();

        if (sourceColor && destColor) {
          colorTriangle = ColorUtils_ColorUtils.mix(sourceColor, destColor, p1.size.value, p2.size.value);
        } else {
          const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;

          if (!hslColor) {
            return;
          }

          colorTriangle = ColorUtils_ColorUtils.hslToRgb(hslColor);
        }
      } else {
        colorTriangle = linkColor;
      }
    }

    const width = (_b = p1.linksWidth) !== null && _b !== void 0 ? _b : container.retina.linksWidth;
    CanvasUtils_CanvasUtils.drawLinkTriangle(ctx, width, pos1, pos2, pos3, options.backgroundMask.enable, colorTriangle, opacityTriangle);
  }

  drawLinkLine(p1, link) {
    var _a;

    const container = this.container;
    const options = container.options;
    const p2 = link.destination;
    let opacity = link.opacity;
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const ctx = this.context;

    if (!ctx) {
      return;
    }

    let colorLine;
    const twinkle = p1.particlesOptions.twinkle.lines;

    if (twinkle.enable) {
      const twinkleFreq = twinkle.frequency;
      const twinkleRgb = ColorUtils_ColorUtils.colorToRgb(twinkle.color);
      const twinkling = Math.random() < twinkleFreq;

      if (twinkling && twinkleRgb !== undefined) {
        colorLine = twinkleRgb;
        opacity = twinkle.opacity;
      }
    }

    if (!colorLine) {
      const linksOptions = p1.particlesOptions.links;
      const linkColor = linksOptions.id !== undefined ? container.particles.linksColors[linksOptions.id] : container.particles.linksColor;

      if (linkColor === Constants.randomColorValue) {
        colorLine = ColorUtils_ColorUtils.getRandomRgbColor();
      } else if (linkColor === "mid") {
        const sourceColor = p1.getColor();
        const destColor = p2.getColor();

        if (sourceColor && destColor) {
          colorLine = ColorUtils_ColorUtils.mix(sourceColor, destColor, p1.size.value, p2.size.value);
        } else {
          const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;

          if (!hslColor) {
            return;
          }

          colorLine = ColorUtils_ColorUtils.hslToRgb(hslColor);
        }
      } else {
        colorLine = linkColor;
      }
    }

    const width = (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth;
    CanvasUtils_CanvasUtils.drawLinkLine(ctx, width, pos1, pos2, p1.particlesOptions.links.distance, container.canvas.size, p1.particlesOptions.links.warp, options.backgroundMask.enable, colorLine, opacity, p1.particlesOptions.links.shadow);
  }

  drawConnectLine(p1, p2) {
    var _a;

    const lineStyle = this.lineStyle(p1, p2);

    if (!lineStyle) {
      return;
    }

    const ctx = this.context;

    if (!ctx) {
      return;
    }

    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    CanvasUtils_CanvasUtils.drawConnectLine(ctx, (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
  }

  drawGrabLine(particle, lineColor, opacity, mousePos) {
    var _a;

    const container = this.container;
    const ctx = container.canvas.context;

    if (!ctx) {
      return;
    }

    const beginPos = particle.getPosition();
    CanvasUtils_CanvasUtils.drawGrabLine(ctx, (_a = particle.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
  }

  drawParticle(particle, delta) {
    var _a, _b;

    const pColor = particle.getColor();

    if (pColor === undefined) {
      return;
    }

    const options = this.container.options;
    const twinkle = particle.particlesOptions.twinkle.particles;
    const twinkleFreq = twinkle.frequency;
    const twinkleRgb = ColorUtils_ColorUtils.colorToRgb(twinkle.color);
    const twinkling = twinkle.enable && Math.random() < twinkleFreq;
    const radius = (_a = particle.bubble.radius) !== null && _a !== void 0 ? _a : particle.size.value;
    const opacity = twinkling ? twinkle.opacity : (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : particle.opacity.value;
    const infectionStage = particle.infectionStage;
    const infection = options.infection;
    const infectionStages = infection.stages;
    const infectionColor = infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
    const infectionRgb = ColorUtils_ColorUtils.colorToRgb(infectionColor);
    const color = twinkling && twinkleRgb !== undefined ? twinkleRgb : infectionRgb !== null && infectionRgb !== void 0 ? infectionRgb : ColorUtils_ColorUtils.hslToRgb(pColor);
    const colorValue = color !== undefined ? ColorUtils_ColorUtils.getStyleFromRgb(color, opacity) : undefined;

    if (!this.context || !colorValue) {
      return;
    }

    if (particle.links.length > 0) {
      this.context.save();

      for (const link of particle.links) {
        if (particle.particlesOptions.links.triangles.enable) {
          const links = particle.links.map(l => l.destination);
          const vertices = link.destination.links.filter(t => links.indexOf(t.destination) >= 0);

          if (vertices.length) {
            for (const vertice of vertices) {
              this.drawLinkTriangle(particle, link, vertice);
            }
          }
        }

        this.drawLinkLine(particle, link);
      }

      this.context.restore();
    }

    CanvasUtils_CanvasUtils.drawParticle(this.container, this.context, particle, delta, colorValue, options.backgroundMask.enable, radius, opacity, particle.particlesOptions.shadow);
  }

  drawPlugin(plugin, delta) {
    if (!this.context) {
      return;
    }

    CanvasUtils_CanvasUtils.drawPlugin(this.context, plugin, delta);
  }

  paintBase(baseColor) {
    if (this.context) {
      CanvasUtils_CanvasUtils.paintBase(this.context, this.size, baseColor);
    }
  }

  lineStyle(p1, p2) {
    const options = this.container.options;
    const connectOptions = options.interactivity.modes.connect;

    if (this.context) {
      return CanvasUtils_CanvasUtils.gradient(this.context, p1, p2, connectOptions.links.opacity);
    }
  }

  initBackground() {
    const options = this.container.options;
    const background = options.background;
    const element = this.element;

    if (!element) {
      return;
    }

    const elementStyle = element.style;

    if (background.color) {
      const color = ColorUtils_ColorUtils.colorToRgb(background.color);

      if (color) {
        elementStyle.backgroundColor = ColorUtils_ColorUtils.getStyleFromRgb(color, background.opacity);
      }
    }

    if (background.image) {
      elementStyle.backgroundImage = background.image;
    }

    if (background.position) {
      elementStyle.backgroundPosition = background.position;
    }

    if (background.repeat) {
      elementStyle.backgroundRepeat = background.repeat;
    }

    if (background.size) {
      elementStyle.backgroundSize = background.size;
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Modes/HoverMode.js
var HoverMode;

(function (HoverMode) {
  HoverMode["bubble"] = "bubble";
  HoverMode["connect"] = "connect";
  HoverMode["grab"] = "grab";
  HoverMode["repulse"] = "repulse";
  HoverMode["slow"] = "slow";
})(HoverMode || (HoverMode = {}));
// CONCATENATED MODULE: ./dist/Core/Particle/Mover.js


class Mover_Mover {
  constructor(container, particle) {
    this.container = container;
    this.particle = particle;
  }

  move(delta) {
    this.moveParticle(delta);
    this.moveParallax();
  }

  moveParticle(delta) {
    var _a;

    const particle = this.particle;
    const particlesOptions = particle.particlesOptions;

    if (!particlesOptions.move.enable) {
      return;
    }

    const container = this.container;
    const options = container.options;
    const slowFactor = this.getProximitySpeedFactor();
    const deltaFactor = options.fpsLimit > 0 ? 60 * delta / 1000 : 3.6;
    const baseSpeed = (_a = particle.moveSpeed) !== null && _a !== void 0 ? _a : container.retina.moveSpeed;
    const moveSpeed = baseSpeed / 2 * slowFactor * deltaFactor;
    this.applyNoise(delta);
    particle.position.x += particle.velocity.horizontal * moveSpeed;
    particle.position.y += particle.velocity.vertical * moveSpeed;

    if (particlesOptions.move.vibrate) {
      particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
      particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
    }
  }

  applyNoise(delta) {
    const particle = this.particle;
    const particlesOptions = particle.particlesOptions;
    const noiseOptions = particlesOptions.move.noise;
    const noiseEnabled = noiseOptions.enable;

    if (!noiseEnabled) {
      return;
    }

    const container = this.container;

    if (particle.lastNoiseTime <= particle.noiseDelay) {
      particle.lastNoiseTime += delta;
      return;
    }

    const noise = container.noise.generate(particle);
    particle.velocity.horizontal += Math.cos(noise.angle) * noise.length;
    particle.velocity.horizontal = Utils_Utils.clamp(particle.velocity.horizontal, -1, 1);
    particle.velocity.vertical += Math.sin(noise.angle) * noise.length;
    particle.velocity.vertical = Utils_Utils.clamp(particle.velocity.vertical, -1, 1);
    particle.lastNoiseTime -= particle.noiseDelay;
  }

  moveParallax() {
    const container = this.container;
    const options = container.options;

    if (!options.interactivity.events.onHover.parallax.enable) {
      return;
    }

    const particle = this.particle;
    const parallaxForce = options.interactivity.events.onHover.parallax.force;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const windowDimension = {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2
    };
    const parallaxSmooth = options.interactivity.events.onHover.parallax.smooth;
    const tmp = {
      x: (mousePos.x - windowDimension.width) * (particle.size.value / parallaxForce),
      y: (mousePos.y - windowDimension.height) * (particle.size.value / parallaxForce)
    };
    particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
    particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
  }

  getProximitySpeedFactor() {
    const container = this.container;
    const options = container.options;
    const active = Utils_Utils.isInArray(HoverMode.slow, options.interactivity.events.onHover.mode);

    if (!active) {
      return 1;
    }

    const mousePos = this.container.interactivity.mouse.position;

    if (!mousePos) {
      return 1;
    }

    const particlePos = this.particle.getPosition();
    const dist = Utils_Utils.getDistance(mousePos, particlePos);
    const radius = container.retina.slowModeRadius;

    if (dist > radius) {
      return 1;
    }

    const proximityFactor = dist / radius || 0;
    const slowFactor = options.interactivity.modes.slow.factor;
    return proximityFactor / slowFactor;
  }

}
// CONCATENATED MODULE: ./dist/Enums/Statuses/OpacityAnimationStatus.js
var OpacityAnimationStatus;

(function (OpacityAnimationStatus) {
  OpacityAnimationStatus[OpacityAnimationStatus["increasing"] = 0] = "increasing";
  OpacityAnimationStatus[OpacityAnimationStatus["decreasing"] = 1] = "decreasing";
})(OpacityAnimationStatus || (OpacityAnimationStatus = {}));
// CONCATENATED MODULE: ./dist/Enums/Statuses/SizeAnimationStatus.js
var SizeAnimationStatus;

(function (SizeAnimationStatus) {
  SizeAnimationStatus[SizeAnimationStatus["increasing"] = 0] = "increasing";
  SizeAnimationStatus[SizeAnimationStatus["decreasing"] = 1] = "decreasing";
})(SizeAnimationStatus || (SizeAnimationStatus = {}));
// CONCATENATED MODULE: ./dist/Enums/Types/DestroyType.js
var DestroyType;

(function (DestroyType) {
  DestroyType["none"] = "none";
  DestroyType["max"] = "max";
  DestroyType["min"] = "min";
})(DestroyType || (DestroyType = {}));
// CONCATENATED MODULE: ./dist/Enums/Directions/RotateDirection.js
var RotateDirection;

(function (RotateDirection) {
  RotateDirection["clockwise"] = "clockwise";
  RotateDirection["counterClockwise"] = "counter-clockwise";
  RotateDirection["random"] = "random";
})(RotateDirection || (RotateDirection = {}));
// CONCATENATED MODULE: ./dist/Enums/Modes/OutMode.js
var OutMode;

(function (OutMode) {
  OutMode["bounce"] = "bounce";
  OutMode["bounceHorizontal"] = "bounce-horizontal";
  OutMode["bounceVertical"] = "bounce-vertical";
  OutMode["out"] = "out";
  OutMode["destroy"] = "destroy";
})(OutMode || (OutMode = {}));
// CONCATENATED MODULE: ./dist/Core/Particle/Updater.js



class Updater_Updater {
  constructor(container, particle) {
    this.container = container;
    this.particle = particle;
    this.mover = new Mover_Mover(container, particle);
  }

  static checkBounds(coordinate, radius, size, velocity, outside) {
    if (coordinate + radius > size && velocity > 0 || coordinate - radius < 0 && velocity < 0) {
      outside();
    }
  }

  update(delta) {
    this.mover.move(delta);
    this.updateOpacity(delta);
    this.updateSize(delta);
    this.updateAngle(delta);
    this.updateColor(delta);
    this.fixOutOfCanvasPosition();
    this.updateOutMode(delta);
  }

  updateOpacity(delta) {
    const options = this.container.options;
    const particle = this.particle;
    const deltaFactor = options.fpsLimit > 0 ? 60 * delta / 1000 : 3.6;

    if (particle.particlesOptions.opacity.animation.enable) {
      switch (particle.opacity.status) {
        case OpacityAnimationStatus.increasing:
          if (particle.opacity.value >= particle.particlesOptions.opacity.value) {
            particle.opacity.status = OpacityAnimationStatus.decreasing;
          } else {
            particle.opacity.value += (particle.opacity.velocity || 0) * deltaFactor;
          }

          break;

        case OpacityAnimationStatus.decreasing:
          if (particle.opacity.value <= particle.particlesOptions.opacity.animation.minimumValue) {
            particle.opacity.status = OpacityAnimationStatus.increasing;
          } else {
            particle.opacity.value -= (particle.opacity.velocity || 0) * deltaFactor;
          }

          break;
      }

      if (particle.opacity.value < 0) {
        particle.opacity.value = 0;
      }
    }
  }

  updateSize(delta) {
    var _a;

    const container = this.container;
    const options = container.options;
    const particle = this.particle;
    const deltaFactor = options.fpsLimit > 0 ? 60 * delta / 1000 : 3.6;
    const sizeOpt = particle.particlesOptions.size;
    const sizeAnim = sizeOpt.animation;

    if (sizeAnim.enable) {
      switch (particle.size.status) {
        case SizeAnimationStatus.increasing:
          if (particle.size.value >= ((_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue)) {
            particle.size.status = SizeAnimationStatus.decreasing;
          } else {
            particle.size.value += (particle.size.velocity || 0) * deltaFactor;
          }

          break;

        case SizeAnimationStatus.decreasing:
          if (particle.size.value <= sizeAnim.minimumValue) {
            particle.size.status = SizeAnimationStatus.increasing;
          } else {
            particle.size.value -= (particle.size.velocity || 0) * deltaFactor;
          }

      }

      switch (sizeAnim.destroy) {
        case DestroyType.max:
          if (particle.size.value >= sizeOpt.value * container.retina.pixelRatio) {
            particle.destroy();
          }

          break;

        case DestroyType.min:
          if (particle.size.value <= sizeAnim.minimumValue * container.retina.pixelRatio) {
            particle.destroy();
          }

          break;
      }

      if (particle.size.value < 0 && !particle.destroyed) {
        particle.size.value = 0;
      }
    }
  }

  updateAngle(delta) {
    const options = this.container.options;
    const particle = this.particle;
    const deltaFactor = options.fpsLimit > 0 ? 60 * delta / 1000 : 3.6;

    if (particle.particlesOptions.rotate.animation.enable) {
      switch (particle.rotateDirection) {
        case RotateDirection.clockwise:
          particle.angle += particle.particlesOptions.rotate.animation.speed * Math.PI / 18 * deltaFactor;

          if (particle.angle > 360) {
            particle.angle -= 360;
          }

          break;

        case RotateDirection.counterClockwise:
        default:
          particle.angle -= particle.particlesOptions.rotate.animation.speed * Math.PI / 18 * deltaFactor;

          if (particle.angle < 0) {
            particle.angle += 360;
          }

          break;
      }
    }
  }

  updateColor(delta) {
    const options = this.container.options;
    const particle = this.particle;

    if (particle.color === undefined) {
      return;
    }

    const deltaFactor = options.fpsLimit > 0 ? 60 * delta / 1000 : 3.6;

    if (particle.particlesOptions.color.animation.enable) {
      particle.color.h += (particle.colorVelocity || 0) * deltaFactor;

      if (particle.color.h > 360) {
        particle.color.h -= 360;
      }
    }
  }

  fixOutOfCanvasPosition() {
    const container = this.container;
    const particle = this.particle;
    const outMode = particle.particlesOptions.move.outMode;
    const wrap = particle.particlesOptions.move.warp;
    const canvasSize = container.canvas.size;
    let newPos;

    if (outMode === OutMode.bounce) {
      newPos = {
        bottom: canvasSize.height,
        left: particle.size.value,
        right: canvasSize.width,
        top: particle.size.value
      };
    } else if (outMode === OutMode.bounceHorizontal) {
      newPos = {
        bottom: canvasSize.height + particle.size.value - particle.offset.y,
        left: particle.size.value,
        right: canvasSize.width,
        top: -particle.size.value - particle.offset.y
      };
    } else if (outMode === OutMode.bounceVertical) {
      newPos = {
        bottom: canvasSize.height,
        left: -particle.size.value - particle.offset.x,
        right: canvasSize.width + particle.size.value + particle.offset.x,
        top: particle.size.value
      };
    } else {
      newPos = {
        bottom: canvasSize.height + particle.size.value - particle.offset.y,
        left: -particle.size.value - particle.offset.x,
        right: canvasSize.width + particle.size.value + particle.offset.x,
        top: -particle.size.value - particle.offset.y
      };
    }

    if (outMode === OutMode.destroy) {
      const sizeValue = particle.size.value;

      if (!Utils_Utils.isPointInside(particle.position, container.canvas.size, sizeValue)) {
        container.particles.remove(particle);
      }
    } else {
      const sizeValue = particle.size.value;
      const nextBounds = Utils_Utils.calculateBounds(particle.position, sizeValue);

      if (nextBounds.left > canvasSize.width - particle.offset.x) {
        particle.position.x = newPos.left;

        if (!wrap) {
          particle.position.y = Math.random() * canvasSize.height;
        }
      } else if (nextBounds.right < -particle.offset.x) {
        particle.position.x = newPos.right;

        if (!wrap) {
          particle.position.y = Math.random() * canvasSize.height;
        }
      }

      if (nextBounds.top > canvasSize.height - particle.offset.y) {
        if (!wrap) {
          particle.position.x = Math.random() * canvasSize.width;
        }

        particle.position.y = newPos.top;
      } else if (nextBounds.bottom < -particle.offset.y) {
        if (!wrap) {
          particle.position.x = Math.random() * canvasSize.width;
        }

        particle.position.y = newPos.bottom;
      }
    }
  }

  updateOutMode(delta) {
    switch (this.particle.particlesOptions.move.outMode) {
      case OutMode.bounce:
      case OutMode.bounceVertical:
      case OutMode.bounceHorizontal:
        this.updateBounce(delta);
        break;
    }
  }

  updateBounce(delta) {
    const container = this.container;
    const particle = this.particle;
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== undefined) {
        handled = plugin.particleBounce(particle, delta);
      }

      if (handled) {
        break;
      }
    }

    if (!handled) {
      const outMode = particle.particlesOptions.move.outMode;
      const pos = particle.getPosition();

      if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal) {
        const size = particle.size.value;
        const velocity = particle.velocity.horizontal;
        Updater_Updater.checkBounds(pos.x, size, container.canvas.size.width, velocity, () => {
          particle.velocity.horizontal *= -1;
        });
      }

      if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical) {
        const size = particle.size.value;
        const velocity = particle.velocity.vertical;
        Updater_Updater.checkBounds(pos.y, size, container.canvas.size.height, velocity, () => {
          particle.velocity.vertical *= -1;
        });
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/OptionsColor.js
class OptionsColor {
  constructor() {
    this.value = "#fff";
  }

  static create(source, data) {
    const color = source !== null && source !== void 0 ? source : new OptionsColor();

    if (data !== undefined) {
      color.load(typeof data === "string" ? {
        value: data
      } : data);
    }

    return color;
  }

  load(data) {
    if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
      return;
    }

    this.value = data.value;
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Links/LinksShadow.js

class LinksShadow_LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.enable = false;
    this.color.value = "lime";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Links/LinksTriangle.js

class LinksTriangle_LinksTriangle {
  constructor() {
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Links/Links.js



class Links_Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.opacity = 1;
    this.shadow = new LinksShadow_LinksShadow();
    this.triangles = new LinksTriangle_LinksTriangle();
    this.width = 1;
    this.warp = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.id !== undefined) {
      this.id = data.id;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Attract.js
class Attract {
  constructor() {
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
  }

  get rotateX() {
    return this.rotate.x;
  }

  set rotateX(value) {
    this.rotate.x = value;
  }

  get rotateY() {
    return this.rotate.y;
  }

  set rotateY(value) {
    this.rotate.y = value;
  }

  load(data) {
    var _a, _b, _c, _d;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;

    if (rotateX !== undefined) {
      this.rotate.x = rotateX;
    }

    const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;

    if (rotateY !== undefined) {
      this.rotate.y = rotateY;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Trail.js

class Trail_Trail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fillColor = new OptionsColor();
    this.fillColor.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Noise/NoiseRandom.js
class NoiseRandom {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Noise/NoiseDelay.js

class NoiseDelay_NoiseDelay {
  constructor() {
    this.random = new NoiseRandom();
    this.value = 0;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    (_a = this.random) === null || _a === void 0 ? void 0 : _a.load(data.random);

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Noise/Noise.js

class Noise_Noise {
  constructor() {
    this.delay = new NoiseDelay_NoiseDelay();
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.delay.load(data.delay);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Move.js




class Move_Move {
  constructor() {
    this.angle = 90;
    this.attract = new Attract();
    this.direction = MoveDirection.none;
    this.enable = false;
    this.noise = new Noise_Noise();
    this.outMode = OutMode.out;
    this.random = false;
    this.speed = 2;
    this.straight = false;
    this.trail = new Trail_Trail();
    this.vibrate = false;
    this.warp = false;
  }

  get collisions() {
    return false;
  }

  set collisions(value) {}

  get bounce() {
    return this.collisions;
  }

  set bounce(value) {
    this.collisions = value;
  }

  get out_mode() {
    return this.outMode;
  }

  set out_mode(value) {
    this.outMode = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = data.angle;
    }

    this.attract.load(data.attract);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.noise.load(data.noise);
    const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;

    if (outMode !== undefined) {
      this.outMode = outMode;
    }

    if (data.random !== undefined) {
      this.random = data.random;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.straight !== undefined) {
      this.straight = data.straight;
    }

    this.trail.load(data.trail);

    if (data.vibrate !== undefined) {
      this.vibrate = data.vibrate;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Density.js
class Density {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1000;
  }

  get value_area() {
    return this.area;
  }

  set value_area(value) {
    this.area = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;

    if (area !== undefined) {
      this.area = area;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/ParticlesNumber.js

class ParticlesNumber_ParticlesNumber {
  constructor() {
    this.density = new Density();
    this.limit = 0;
    this.value = 100;
  }

  get max() {
    return this.limit;
  }

  set max(value) {
    this.limit = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    this.density.load(data.density);
    const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;

    if (limit !== undefined) {
      this.limit = limit;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Opacity/OpacityAnimation.js
class OpacityAnimation {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
    this.speed = 2;
    this.sync = false;
  }

  get opacity_min() {
    return this.minimumValue;
  }

  set opacity_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;

    if (minimumValue !== undefined) {
      this.minimumValue = minimumValue;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Opacity/OpacityRandom.js
class OpacityRandom {
  constructor() {
    this.enable = false;
    this.minimumValue = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Opacity/Opacity.js


class Opacity_Opacity {
  constructor() {
    this.animation = new OpacityAnimation();
    this.random = new OpacityRandom();
    this.value = 1;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    this.animation.load((_a = data.animation) !== null && _a !== void 0 ? _a : data.anim);

    if (data.random !== undefined) {
      if (typeof data.random === "boolean") {
        this.random.enable = data.random;
      } else {
        this.random.load(data.random);
      }
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Shape/Shape.js


class Shape_Shape {
  constructor() {
    this.options = {};
    this.type = ShapeType.circle;
  }

  get image() {
    var _a;

    return (_a = this.options[ShapeType.image]) !== null && _a !== void 0 ? _a : this.options[ShapeType.images];
  }

  set image(value) {
    this.options[ShapeType.image] = value;
    this.options[ShapeType.images] = value;
  }

  get custom() {
    return this.options;
  }

  set custom(value) {
    this.options = value;
  }

  get images() {
    return this.image instanceof Array ? this.image : [this.image];
  }

  set images(value) {
    this.image = value;
  }

  get stroke() {
    return [];
  }

  set stroke(_value) {}

  get character() {
    var _a;

    return (_a = this.options[ShapeType.character]) !== null && _a !== void 0 ? _a : this.options[ShapeType.char];
  }

  set character(value) {
    this.options[ShapeType.character] = value;
    this.options[ShapeType.char] = value;
  }

  get polygon() {
    var _a;

    return (_a = this.options[ShapeType.polygon]) !== null && _a !== void 0 ? _a : this.options[ShapeType.star];
  }

  set polygon(value) {
    this.options[ShapeType.polygon] = value;
    this.options[ShapeType.star] = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;

    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];

        if (item !== undefined) {
          this.options[shape] = Utils_Utils.deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
        }
      }
    }

    this.loadShape(data.character, ShapeType.character, ShapeType.char, true);
    this.loadShape(data.polygon, ShapeType.polygon, ShapeType.star, false);
    this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, ShapeType.image, ShapeType.images, true);

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

  loadShape(item, mainKey, altKey, altOverride) {
    var _a, _b, _c, _d;

    if (item === undefined) {
      return;
    }

    if (item instanceof Array) {
      if (!(this.options[mainKey] instanceof Array)) {
        this.options[mainKey] = [];

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = [];
        }
      }

      this.options[mainKey] = Utils_Utils.deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = Utils_Utils.deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
      }
    } else {
      if (this.options[mainKey] instanceof Array) {
        this.options[mainKey] = {};

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = {};
        }
      }

      this.options[mainKey] = Utils_Utils.deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = Utils_Utils.deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Types/StartValueType.js
var StartValueType;

(function (StartValueType) {
  StartValueType["max"] = "max";
  StartValueType["min"] = "min";
})(StartValueType || (StartValueType = {}));
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Size/SizeAnimation.js

class SizeAnimation_SizeAnimation {
  constructor() {
    this.destroy = DestroyType.none;
    this.enable = false;
    this.minimumValue = 0;
    this.speed = 5;
    this.startValue = StartValueType.max;
    this.sync = false;
  }

  get size_min() {
    return this.minimumValue;
  }

  set size_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;

    if (minimumValue !== undefined) {
      this.minimumValue = minimumValue;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Size/SizeRandom.js
class SizeRandom {
  constructor() {
    this.enable = false;
    this.minimumValue = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Size/Size.js


class Size_Size {
  constructor() {
    this.animation = new SizeAnimation_SizeAnimation();
    this.random = new SizeRandom();
    this.value = 3;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;

    if (animation !== undefined) {
      this.animation.load(animation);
    }

    if (data.random !== undefined) {
      if (typeof data.random === "boolean") {
        this.random.enable = data.random;
      } else {
        this.random.load(data.random);
      }
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Rotate/RotateAnimation.js
class RotateAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.sync = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Rotate/Rotate.js


class Rotate_Rotate {
  constructor() {
    this.animation = new RotateAnimation();
    this.direction = RotateDirection.clockwise;
    this.random = false;
    this.value = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.animation.load(data.animation);

    if (data.random !== undefined) {
      this.random = data.random;
    }

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Shadow.js

class Shadow_Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset === undefined) {
      return;
    }

    if (data.offset.x !== undefined) {
      this.offset.x = data.offset.x;
    }

    if (data.offset.y !== undefined) {
      this.offset.y = data.offset.y;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Stroke.js

class Stroke_Stroke {
  constructor() {
    this.color = new OptionsColor();
    this.width = 0;
    this.opacity = 1;
    this.color.value = "#ff0000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Modes/CollisionMode.js
var CollisionMode;

(function (CollisionMode) {
  CollisionMode["absorb"] = "absorb";
  CollisionMode["bounce"] = "bounce";
  CollisionMode["destroy"] = "destroy";
})(CollisionMode || (CollisionMode = {}));
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Collisions.js

class Collisions_Collisions {
  constructor() {
    this.enable = false;
    this.mode = CollisionMode.bounce;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Twinkle/TwinkleValues.js

class TwinkleValues_TwinkleValues {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Twinkle/Twinkle.js

class Twinkle_Twinkle {
  constructor() {
    this.lines = new TwinkleValues_TwinkleValues();
    this.particles = new TwinkleValues_TwinkleValues();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/ColorAnimation.js
class ColorAnimation {
  constructor() {
    this.enable = false;
    this.speed = 1;
    this.sync = true;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/AnimatableColor.js


class AnimatableColor_AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new ColorAnimation();
  }

  static create(source, data) {
    const color = source !== null && source !== void 0 ? source : new AnimatableColor_AnimatableColor();

    if (data !== undefined) {
      color.load(typeof data === "string" ? {
        value: data
      } : data);
    }

    return color;
  }

  load(data) {
    super.load(data);
    this.animation.load(data === null || data === void 0 ? void 0 : data.animation);
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Particles/Particles.js












class Particles_Particles {
  constructor() {
    this.collisions = new Collisions_Collisions();
    this.color = new AnimatableColor_AnimatableColor();
    this.links = new Links_Links();
    this.move = new Move_Move();
    this.number = new ParticlesNumber_ParticlesNumber();
    this.opacity = new Opacity_Opacity();
    this.rotate = new Rotate_Rotate();
    this.shadow = new Shadow_Shadow();
    this.shape = new Shape_Shape();
    this.size = new Size_Size();
    this.stroke = new Stroke_Stroke();
    this.twinkle = new Twinkle_Twinkle();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b, _c, _d, _e, _f, _g;

    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = AnimatableColor_AnimatableColor.create(this.color, data.color);
    }

    const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;

    if (links !== undefined) {
      this.links.load(links);
    }

    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.twinkle.load(data.twinkle);
    const collisions = (_d = (_c = data.move) === null || _c === void 0 ? void 0 : _c.collisions) !== null && _d !== void 0 ? _d : (_e = data.move) === null || _e === void 0 ? void 0 : _e.bounce;

    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }

    this.collisions.load(data.collisions);
    const strokeToLoad = (_f = data.stroke) !== null && _f !== void 0 ? _f : (_g = data.shape) === null || _g === void 0 ? void 0 : _g.stroke;

    if (strokeToLoad === undefined) {
      return;
    }

    if (strokeToLoad instanceof Array) {
      this.stroke = strokeToLoad.map(s => {
        const tmp = new Stroke_Stroke();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.stroke instanceof Array) {
        this.stroke = new Stroke_Stroke();
      }

      this.stroke.load(strokeToLoad);
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle.js





class Particle_Particle {
  constructor(container, position, overrideOptions) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;

    this.container = container;
    this.fill = true;
    this.close = true;
    this.links = [];
    this.lastNoiseTime = 0;
    this.destroyed = false;
    const options = container.options;
    const particlesOptions = new Particles_Particles();
    particlesOptions.load(options.particles);

    if ((overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) !== undefined) {
      const shapeType = (_a = overrideOptions.shape.type) !== null && _a !== void 0 ? _a : particlesOptions.shape.type;
      this.shape = shapeType instanceof Array ? Utils_Utils.itemFromArray(shapeType) : shapeType;
      const shapeOptions = new Shape_Shape();
      shapeOptions.load(overrideOptions.shape);

      if (this.shape !== undefined) {
        const shapeData = shapeOptions.options[this.shape];

        if (shapeData !== undefined) {
          this.shapeData = Utils_Utils.deepExtend({}, shapeData instanceof Array ? Utils_Utils.itemFromArray(shapeData) : shapeData);
          this.fill = (_c = (_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.fill) !== null && _c !== void 0 ? _c : this.fill;
          this.close = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.close) !== null && _e !== void 0 ? _e : this.close;
        }
      }
    } else {
      const shapeType = particlesOptions.shape.type;
      this.shape = shapeType instanceof Array ? Utils_Utils.itemFromArray(shapeType) : shapeType;
      const shapeData = particlesOptions.shape.options[this.shape];

      if (shapeData) {
        this.shapeData = Utils_Utils.deepExtend({}, shapeData instanceof Array ? Utils_Utils.itemFromArray(shapeData) : shapeData);
        this.fill = (_g = (_f = this.shapeData) === null || _f === void 0 ? void 0 : _f.fill) !== null && _g !== void 0 ? _g : this.fill;
        this.close = (_j = (_h = this.shapeData) === null || _h === void 0 ? void 0 : _h.close) !== null && _j !== void 0 ? _j : this.close;
      }
    }

    if (overrideOptions !== undefined) {
      particlesOptions.load(overrideOptions);
    }

    if (((_k = this.shapeData) === null || _k === void 0 ? void 0 : _k.particles) !== undefined) {
      particlesOptions.load((_l = this.shapeData) === null || _l === void 0 ? void 0 : _l.particles);
    }

    this.particlesOptions = particlesOptions;
    const noiseDelay = this.particlesOptions.move.noise.delay;
    this.noiseDelay = (noiseDelay.random.enable ? Utils_Utils.randomInRange(noiseDelay.random.minimumValue, noiseDelay.value) : noiseDelay.value) * 1000;
    container.retina.initParticle(this);
    const color = this.particlesOptions.color;
    const sizeValue = (_m = this.sizeValue) !== null && _m !== void 0 ? _m : container.retina.sizeValue;
    const randomSize = typeof this.particlesOptions.size.random === "boolean" ? this.particlesOptions.size.random : this.particlesOptions.size.random.enable;
    this.size = {
      value: randomSize && this.randomMinimumSize !== undefined ? Utils_Utils.randomInRange(this.randomMinimumSize, sizeValue) : sizeValue
    };
    this.direction = this.particlesOptions.move.direction;
    this.bubble = {
      inRange: false
    };
    this.angle = this.particlesOptions.rotate.random ? Math.random() * 360 : this.particlesOptions.rotate.value;

    if (this.particlesOptions.rotate.direction === RotateDirection.random) {
      const index = Math.floor(Math.random() * 2);

      if (index > 0) {
        this.rotateDirection = RotateDirection.counterClockwise;
      } else {
        this.rotateDirection = RotateDirection.clockwise;
      }
    } else {
      this.rotateDirection = this.particlesOptions.rotate.direction;
    }

    if (this.particlesOptions.size.animation.enable) {
      switch (this.particlesOptions.size.animation.startValue) {
        case StartValueType.min:
          if (!randomSize) {
            const pxRatio = container.retina.pixelRatio;
            this.size.value = this.particlesOptions.size.animation.minimumValue * pxRatio;
          }

          break;
      }

      this.size.status = SizeAnimationStatus.increasing;
      this.size.velocity = ((_o = this.sizeAnimationSpeed) !== null && _o !== void 0 ? _o : container.retina.sizeAnimationSpeed) / 100;

      if (!this.particlesOptions.size.animation.sync) {
        this.size.velocity = this.size.velocity * Math.random();
      }
    }

    if (this.particlesOptions.color.animation.enable) {
      this.colorVelocity = this.particlesOptions.color.animation.speed / 100;

      if (!this.particlesOptions.color.animation.sync) {
        this.colorVelocity = this.colorVelocity * Math.random();
      }
    } else {
      this.colorVelocity = 0;
    }

    if (this.particlesOptions.rotate.animation.enable) {
      if (!this.particlesOptions.rotate.animation.sync) {
        this.angle = Math.random() * 360;
      }
    }

    this.position = this.calcPosition(this.container, position);
    this.offset = {
      x: 0,
      y: 0
    };

    if (this.particlesOptions.collisions.enable) {
      this.checkOverlap(position);
    }

    this.color = ColorUtils_ColorUtils.colorToHsl(color);
    const randomOpacity = this.particlesOptions.opacity.random;
    const opacityValue = this.particlesOptions.opacity.value;
    this.opacity = {
      value: randomOpacity.enable ? Utils_Utils.randomInRange(randomOpacity.minimumValue, opacityValue) : opacityValue
    };

    if (this.particlesOptions.opacity.animation.enable) {
      this.opacity.status = OpacityAnimationStatus.increasing;
      this.opacity.velocity = this.particlesOptions.opacity.animation.speed / 100;

      if (!this.particlesOptions.opacity.animation.sync) {
        this.opacity.velocity *= Math.random();
      }
    }

    this.initialVelocity = this.calculateVelocity();
    this.velocity = {
      horizontal: this.initialVelocity.horizontal,
      vertical: this.initialVelocity.vertical
    };
    let drawer = container.drawers.get(this.shape);

    if (!drawer) {
      drawer = Plugins.getShapeDrawer(this.shape);

      if (drawer) {
        container.drawers.set(this.shape, drawer);
      }
    }

    if (this.shape === ShapeType.image || this.shape === ShapeType.images) {
      const shape = this.particlesOptions.shape;
      const imageDrawer = drawer;
      const imagesOptions = shape.options[this.shape];
      const images = imageDrawer.getImages(container).images;
      const index = Utils_Utils.arrayRandomIndex(images);
      const image = images[index];
      const optionsImage = imagesOptions instanceof Array ? imagesOptions.filter(t => t.src === image.source)[0] : imagesOptions;
      const color = this.getColor();

      if ((image === null || image === void 0 ? void 0 : image.svgData) !== undefined && optionsImage.replaceColor && color) {
        const svgColoredData = Utils_Utils.replaceColorSvg(image, color, this.opacity.value);
        const svg = new Blob([svgColoredData], {
          type: "image/svg+xml"
        });
        const domUrl = window.URL || window.webkitURL || window;
        const url = domUrl.createObjectURL(svg);
        const img = new Image();
        this.image = {
          data: image,
          loaded: false,
          ratio: optionsImage.width / optionsImage.height,
          replaceColor: (_p = optionsImage.replaceColor) !== null && _p !== void 0 ? _p : optionsImage.replace_color,
          source: optionsImage.src
        };
        img.addEventListener("load", () => {
          if (this.image) {
            this.image.loaded = true;
            image.element = img;
          }

          domUrl.revokeObjectURL(url);
        });
        img.addEventListener("error", () => {
          domUrl.revokeObjectURL(url);
          Utils_Utils.loadImage(optionsImage.src).then(img2 => {
            if (this.image) {
              image.element = img2.element;
              this.image.loaded = true;
            }
          });
        });
        img.src = url;
      } else {
        this.image = {
          data: image,
          loaded: true,
          ratio: optionsImage.width / optionsImage.height,
          replaceColor: (_q = optionsImage.replaceColor) !== null && _q !== void 0 ? _q : optionsImage.replace_color,
          source: optionsImage.src
        };
      }

      if (!this.image.ratio) {
        this.image.ratio = 1;
      }

      this.fill = (_r = optionsImage.fill) !== null && _r !== void 0 ? _r : this.fill;
      this.close = (_s = optionsImage.close) !== null && _s !== void 0 ? _s : this.close;
    }

    this.stroke = this.particlesOptions.stroke instanceof Array ? Utils_Utils.itemFromArray(this.particlesOptions.stroke) : this.particlesOptions.stroke;
    this.strokeColor = ColorUtils_ColorUtils.colorToRgb(this.stroke.color);
    this.shadowColor = ColorUtils_ColorUtils.colorToRgb(this.particlesOptions.shadow.color);
    this.updater = new Updater_Updater(this.container, this);
  }

  update(delta) {
    this.links = [];
    this.updater.update(delta);
  }

  draw(delta) {
    var _a;

    if (((_a = this.image) === null || _a === void 0 ? void 0 : _a.loaded) === false) {
      return;
    }

    this.container.canvas.drawParticle(this, delta);
  }

  isOverlapping() {
    const container = this.container;
    let collisionFound = false;
    let iterations = 0;
    const pos1 = this.getPosition();

    for (const p2 of container.particles.array.filter(t => t != this)) {
      iterations++;
      const pos2 = p2.getPosition();
      const dist = Utils_Utils.getDistance(pos1, pos2);

      if (dist <= this.size.value + p2.size.value) {
        collisionFound = true;
        break;
      }
    }

    return {
      collisionFound: collisionFound,
      iterations: iterations
    };
  }

  checkOverlap(position) {
    const container = this.container;
    const overlapResult = this.isOverlapping();

    if (overlapResult.iterations >= container.particles.count) {
      container.particles.remove(this);
    } else if (overlapResult.collisionFound) {
      this.position.x = position ? position.x : Math.random() * container.canvas.size.width;
      this.position.y = position ? position.y : Math.random() * container.canvas.size.height;
      this.checkOverlap();
    }
  }

  startInfection(stage) {
    const container = this.container;
    const options = container.options;
    const stages = options.infection.stages;
    const stagesCount = stages.length;

    if (stage > stagesCount || stage < 0) {
      return;
    }

    this.infectionDelay = 0;
    this.infectionDelayStage = stage;
  }

  updateInfectionStage(stage) {
    const container = this.container;
    const options = container.options;
    const stagesCount = options.infection.stages.length;

    if (stage > stagesCount || stage < 0 || this.infectionStage !== undefined && this.infectionStage > stage) {
      return;
    }

    if (this.infectionTimeout !== undefined) {
      window.clearTimeout(this.infectionTimeout);
    }

    this.infectionStage = stage;
    this.infectionTime = 0;
  }

  updateInfection(delta) {
    const container = this.container;
    const options = container.options;
    const infection = options.infection;
    const stages = options.infection.stages;
    const stagesCount = stages.length;

    if (this.infectionDelay !== undefined && this.infectionDelayStage !== undefined) {
      const stage = this.infectionDelayStage;

      if (stage > stagesCount || stage < 0) {
        return;
      }

      if (this.infectionDelay > infection.delay * 1000) {
        this.infectionStage = stage;
        this.infectionTime = 0;
        delete this.infectionDelay;
        delete this.infectionDelayStage;
      } else {
        this.infectionDelay += delta;
      }
    } else {
      delete this.infectionDelay;
      delete this.infectionDelayStage;
    }

    if (this.infectionStage !== undefined && this.infectionTime !== undefined) {
      const infectionStage = stages[this.infectionStage];

      if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
        if (this.infectionTime > infectionStage.duration * 1000) {
          this.nextInfectionStage();
        } else {
          this.infectionTime += delta;
        }
      } else {
        this.infectionTime += delta;
      }
    } else {
      delete this.infectionStage;
      delete this.infectionTime;
    }
  }

  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y
    };
  }

  getColor() {
    var _a;

    return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : this.color;
  }

  destroy() {
    this.destroyed = true;
  }

  nextInfectionStage() {
    const container = this.container;
    const options = container.options;
    const stagesCount = options.infection.stages.length;

    if (stagesCount <= 0 || this.infectionStage === undefined) {
      return;
    }

    this.infectionTime = 0;

    if (stagesCount <= ++this.infectionStage) {
      if (options.infection.cure) {
        delete this.infectionStage;
        delete this.infectionTime;
        return;
      } else {
        this.infectionStage = 0;
        this.infectionTime = 0;
      }
    }
  }

  calcPosition(container, position) {
    var _a, _b;

    for (const [, plugin] of container.plugins) {
      const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

      if (pluginPos !== undefined) {
        return Utils_Utils.deepExtend({}, pluginPos);
      }
    }

    const pos = {
      x: (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * container.canvas.size.width,
      y: (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * container.canvas.size.height
    };
    const outMode = this.particlesOptions.move.outMode;

    if (Utils_Utils.isInArray(outMode, OutMode.bounce) || Utils_Utils.isInArray(outMode, OutMode.bounceHorizontal)) {
      if (pos.x > container.canvas.size.width - this.size.value * 2) {
        pos.x -= this.size.value;
      } else if (pos.x < this.size.value * 2) {
        pos.x += this.size.value;
      }
    }

    if (Utils_Utils.isInArray(outMode, OutMode.bounce) || Utils_Utils.isInArray(outMode, OutMode.bounceVertical)) {
      if (pos.y > container.canvas.size.height - this.size.value * 2) {
        pos.y -= this.size.value;
      } else if (pos.y < this.size.value * 2) {
        pos.y += this.size.value;
      }
    }

    return pos;
  }

  calculateVelocity() {
    const baseVelocity = Utils_Utils.getParticleBaseVelocity(this);
    const res = {
      horizontal: 0,
      vertical: 0
    };
    const moveOptions = this.particlesOptions.move;
    const rad = Math.PI / 180 * moveOptions.angle;
    const rad45 = Math.PI / 4;
    const range = {
      left: Math.sin(rad45 + rad / 2) - Math.sin(rad45 - rad / 2),
      right: Math.cos(rad45 + rad / 2) - Math.cos(rad45 - rad / 2)
    };

    if (moveOptions.straight) {
      res.horizontal = baseVelocity.x;
      res.vertical = baseVelocity.y;

      if (moveOptions.random) {
        res.horizontal += Utils_Utils.randomInRange(range.left, range.right) / 2;
        res.vertical += Utils_Utils.randomInRange(range.left, range.right) / 2;
      }
    } else {
      res.horizontal = baseVelocity.x + Utils_Utils.randomInRange(range.left, range.right) / 2;
      res.vertical = baseVelocity.y + Utils_Utils.randomInRange(range.left, range.right) / 2;
    }

    return res;
  }

}
// CONCATENATED MODULE: ./dist/Utils/Range.js
class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}
// CONCATENATED MODULE: ./dist/Utils/Rectangle.js

class Rectangle_Rectangle extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }

  contains(point) {
    return point.x >= this.position.x && point.x <= this.position.x + this.size.width && point.y >= this.position.y && point.y <= this.position.y + this.size.height;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const w = this.size.width;
    const h = this.size.height;
    const pos1 = this.position;
    const pos2 = range.position;

    if (circle.radius !== undefined) {
      return circle.intersects(this);
    } else if (rect.size !== undefined) {
      const size2 = rect.size;
      const w2 = size2.width;
      const h2 = size2.height;
      return pos2.x - w2 < pos1.x + w && pos2.x + w2 > pos1.x - w && pos2.y - h2 < pos1.y + h && pos2.y + h2 > pos1.y - h;
    }

    return false;
  }

}
// CONCATENATED MODULE: ./dist/Utils/QuadTree.js

class QuadTree_QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const x = this.rectangle.position.x;
    const y = this.rectangle.position.y;
    const w = this.rectangle.size.width;
    const h = this.rectangle.size.height;
    const capacity = this.capacity;
    this.northEast = new QuadTree_QuadTree(new Rectangle_Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree_QuadTree(new Rectangle_Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree_QuadTree(new Rectangle_Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree_QuadTree(new Rectangle_Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }

  insert(point) {
    var _a, _b, _c, _d, _e;

    if (!this.rectangle.contains(point.position)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }

  query(range, found) {
    var _a, _b, _c, _d;

    const res = found !== null && found !== void 0 ? found : [];

    if (!range.intersects(this.rectangle)) {
      return [];
    } else {
      for (const p of this.points.filter(p => range.contains(p.position))) {
        res.push(p.particle);
      }

      if (this.divided) {
        (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
        (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
        (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
        (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
      }
    }

    return res;
  }

}
// CONCATENATED MODULE: ./dist/Utils/Point.js
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}
// CONCATENATED MODULE: ./dist/Utils/Circle.js

class Circle_Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  contains(point) {
    const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);
    return d <= this.radius * this.radius;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const pos1 = this.position;
    const pos2 = range.position;
    const xDist = Math.abs(pos2.x - pos1.x);
    const yDist = Math.abs(pos2.y - pos1.y);
    const r = this.radius;

    if (circle.radius !== undefined) {
      const r2 = circle.radius;
      const rSum = r + r2;
      const dist = Math.sqrt(xDist * xDist + yDist + yDist);
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width;
      const h = rect.size.height;
      const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

      if (xDist > r + w || yDist > r + h) {
        return false;
      }

      if (xDist <= w || yDist <= h) {
        return true;
      }

      return edges <= r * r;
    }

    return false;
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Mouse/Grabber.js


class Grabber_Grabber {
  constructor(container) {
    this.container = container;
  }

  isEnabled() {
    const container = this.container;
    const mouse = container.interactivity.mouse;
    const events = container.options.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    return Utils_Utils.isInArray(HoverMode.grab, hoverMode);
  }

  reset() {}

  interact() {
    var _a, _b;

    const container = this.container;
    const options = container.options;
    const interactivity = options.interactivity;

    if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos === undefined) {
        return;
      }

      const distance = container.retina.grabModeDistance;
      const query = container.particles.quadTree.query(new Circle_Circle(mousePos.x, mousePos.y, distance));

      for (const particle of query) {
        const pos = particle.getPosition();
        const distance = Utils_Utils.getDistance(pos, mousePos);

        if (distance <= container.retina.grabModeDistance) {
          const grabLineOptions = interactivity.modes.grab.links;
          const lineOpacity = grabLineOptions.opacity;
          const grabDistance = container.retina.grabModeDistance;
          const opacityLine = lineOpacity - distance * lineOpacity / grabDistance;

          if (opacityLine > 0) {
            const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.particlesOptions.links.color;

            if (!container.particles.grabLineColor) {
              container.particles.grabLineColor = optColor === Constants.randomColorValue || ((_b = optColor) === null || _b === void 0 ? void 0 : _b.value) === Constants.randomColorValue ? Constants.randomColorValue : ColorUtils_ColorUtils.colorToRgb(optColor);
            }

            let colorLine;

            if (container.particles.grabLineColor === Constants.randomColorValue) {
              colorLine = ColorUtils_ColorUtils.getRandomRgbColor();
            } else {
              colorLine = container.particles.grabLineColor;
            }

            if (colorLine === undefined) {
              return;
            }

            container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
          }
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Modes/DivMode.js
var DivMode;

(function (DivMode) {
  DivMode["bubble"] = "bubble";
  DivMode["repulse"] = "repulse";
})(DivMode || (DivMode = {}));
// CONCATENATED MODULE: ./dist/Enums/Modes/ClickMode.js
var ClickMode;

(function (ClickMode) {
  ClickMode["bubble"] = "bubble";
  ClickMode["push"] = "push";
  ClickMode["remove"] = "remove";
  ClickMode["repulse"] = "repulse";
  ClickMode["pause"] = "pause";
})(ClickMode || (ClickMode = {}));
// CONCATENATED MODULE: ./dist/Enums/Types/DivType.js
var DivType;

(function (DivType) {
  DivType["circle"] = "circle";
  DivType["rectangle"] = "rectangle";
})(DivType || (DivType = {}));
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Mouse/Repulser.js


class Repulser_Repulser {
  constructor(container) {
    this.container = container;
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;
    const divs = events.onDiv;
    const divBubble = Utils_Utils.isDivModeEnabled(DivMode.repulse, divs);

    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return Utils_Utils.isInArray(HoverMode.repulse, hoverMode) || Utils_Utils.isInArray(ClickMode.repulse, clickMode) || divBubble;
  }

  reset() {}

  interact() {
    const container = this.container;
    const options = container.options;
    const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
    const events = options.interactivity.events;
    const hoverEnabled = events.onHover.enable;
    const hoverMode = events.onHover.mode;
    const clickEnabled = events.onClick.enable;
    const clickMode = events.onClick.mode;
    const divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && Utils_Utils.isInArray(HoverMode.repulse, hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && Utils_Utils.isInArray(ClickMode.repulse, clickMode)) {
      this.clickRepulse();
    } else {
      Utils_Utils.divModeExecute(DivMode.repulse, divs, (id, div) => this.singleDivRepulse(id, div));
    }
  }

  singleDivRepulse(id, div) {
    const container = this.container;
    const elem = document.getElementById(id);

    if (!elem) {
      return;
    }

    const pxRatio = container.retina.pixelRatio;
    const pos = {
      x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
      y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
    };
    const repulseRadius = elem.offsetWidth / 2 * pxRatio;
    const area = div.type === DivType.circle ? new Circle_Circle(pos.x, pos.y, repulseRadius) : new Rectangle_Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
    const divs = container.options.interactivity.modes.repulse.divs;
    const divRepulse = Utils_Utils.divMode(divs, id);
    this.processRepulse(pos, repulseRadius, area, divRepulse);
  }

  hoverRepulse() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const repulseRadius = container.retina.repulseModeDistance;
    this.processRepulse(mousePos, repulseRadius, new Circle_Circle(mousePos.x, mousePos.y, repulseRadius));
  }

  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;

    const container = this.container;
    const query = container.particles.quadTree.query(area);

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = Utils_Utils.getDistances(particle.position, position);
      const normVec = {
        x: dx / distance,
        y: dy / distance
      };
      const velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : container.options.interactivity.modes.repulse.speed) * 100;
      const repulseFactor = Utils_Utils.clamp((1 - Math.pow(distance / repulseRadius, 2)) * velocity, 0, 50);
      const outMode = particle.particlesOptions.move.outMode;
      const sizeValue = particle.size.value;
      const pos = {
        x: particle.position.x + normVec.x * repulseFactor,
        y: particle.position.y + normVec.y * repulseFactor
      };

      if (outMode === OutMode.bounce || outMode === OutMode.bounceVertical || outMode === OutMode.bounceHorizontal) {
        const isInside = {
          horizontal: pos.x - sizeValue > 0 && pos.x + sizeValue < container.canvas.size.width,
          vertical: pos.y - sizeValue > 0 && pos.y + sizeValue < container.canvas.size.height
        };

        if (outMode === OutMode.bounceVertical || isInside.horizontal) {
          particle.position.x = pos.x;
        }

        if (outMode === OutMode.bounceHorizontal || isInside.vertical) {
          particle.position.y = pos.y;
        }
      } else {
        particle.position.x = pos.x;
        particle.position.y = pos.y;
      }
    }
  }

  clickRepulse() {
    const container = this.container;

    if (!container.repulse.finish) {
      if (!container.repulse.count) {
        container.repulse.count = 0;
      }

      container.repulse.count++;

      if (container.repulse.count === container.particles.count) {
        container.repulse.finish = true;
      }
    }

    if (container.repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance;
      const repulseRadius = Math.pow(repulseDistance / 6, 3);
      const mouseClickPos = container.interactivity.mouse.clickPosition;

      if (mouseClickPos === undefined) {
        return;
      }

      const range = new Circle_Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius);
      const query = container.particles.quadTree.query(range);

      for (const particle of query) {
        const {
          dx,
          dy,
          distance
        } = Utils_Utils.getDistances(mouseClickPos, particle.position);
        const d = distance * distance;
        const velocity = container.options.interactivity.modes.repulse.speed;
        const force = -repulseRadius * velocity / d;

        if (d <= repulseRadius) {
          container.repulse.particles.push(particle);
          this.processClickRepulse(particle, dx, dy, force);
        }
      }
    } else if (container.repulse.clicking === false) {
      for (const particle of container.repulse.particles) {
        particle.velocity.horizontal = particle.initialVelocity.horizontal;
        particle.velocity.vertical = particle.initialVelocity.vertical;
      }

      container.repulse.particles = [];
    }
  }

  processClickRepulse(particle, dx, dy, force) {
    const container = this.container;
    const options = container.options;
    const f = Math.atan2(dy, dx);
    particle.velocity.horizontal = force * Math.cos(f);
    particle.velocity.vertical = force * Math.sin(f);
    const outMode = options.particles.move.outMode;

    if (outMode === OutMode.bounce || outMode === OutMode.bounceHorizontal || outMode === OutMode.bounceVertical) {
      const pos = {
        x: particle.position.x + particle.velocity.horizontal,
        y: particle.position.y + particle.velocity.vertical
      };

      if (outMode !== OutMode.bounceVertical) {
        if (pos.x + particle.size.value > container.canvas.size.width || pos.x - particle.size.value < 0) {
          particle.velocity.horizontal *= -1;
        }
      }

      if (outMode !== OutMode.bounceHorizontal) {
        if (pos.y + particle.size.value > container.canvas.size.height || pos.y - particle.size.value < 0) {
          particle.velocity.vertical *= -1;
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/Types/ProcessBubbleType.js
var ProcessBubbleType;

(function (ProcessBubbleType) {
  ProcessBubbleType["color"] = "color";
  ProcessBubbleType["opacity"] = "opacity";
  ProcessBubbleType["size"] = "size";
})(ProcessBubbleType || (ProcessBubbleType = {}));
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Mouse/Bubbler.js


class Bubbler_Bubbler {
  constructor(container) {
    this.container = container;
  }

  static calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
    if (modeValue > optionsValue) {
      const size = particleValue + (modeValue - optionsValue) * ratio;
      return Utils_Utils.clamp(size, particleValue, modeValue);
    } else if (modeValue < optionsValue) {
      const size = particleValue - (optionsValue - modeValue) * ratio;
      return Utils_Utils.clamp(size, modeValue, particleValue);
    }
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;
    const divs = events.onDiv;
    const divBubble = Utils_Utils.isDivModeEnabled(DivMode.bubble, divs);

    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return Utils_Utils.isInArray(HoverMode.bubble, hoverMode) || Utils_Utils.isInArray(ClickMode.bubble, clickMode) || divBubble;
  }

  reset(particle, force) {
    if (!particle.bubble.inRange || force) {
      delete particle.bubble.divId;
      delete particle.bubble.opacity;
      delete particle.bubble.radius;
      delete particle.bubble.color;
    }
  }

  interact() {
    const options = this.container.options;
    const events = options.interactivity.events;
    const onHover = events.onHover;
    const onClick = events.onClick;
    const hoverEnabled = onHover.enable;
    const hoverMode = onHover.mode;
    const clickEnabled = onClick.enable;
    const clickMode = onClick.mode;
    const divs = events.onDiv;

    if (hoverEnabled && Utils_Utils.isInArray(HoverMode.bubble, hoverMode)) {
      this.hoverBubble();
    } else if (clickEnabled && Utils_Utils.isInArray(ClickMode.bubble, clickMode)) {
      this.clickBubble();
    } else {
      Utils_Utils.divModeExecute(DivMode.bubble, divs, (id, div) => this.singleDivHover(id, div));
    }
  }

  singleDivHover(id, div) {
    const container = this.container;
    const elem = document.getElementById(id);

    if (!elem) {
      return;
    }

    const pxRatio = container.retina.pixelRatio;
    const pos = {
      x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
      y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
    };
    const repulseRadius = elem.offsetWidth / 2 * pxRatio;
    const area = div.type === DivType.circle ? new Circle_Circle(pos.x, pos.y, repulseRadius) : new Rectangle_Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
    const query = container.particles.quadTree.query(area);

    for (const particle of query.filter(t => area.contains(t.getPosition()))) {
      particle.bubble.inRange = true;
      const divs = container.options.interactivity.modes.bubble.divs;
      const divBubble = Utils_Utils.divMode(divs, id);

      if (!particle.bubble.divId || particle.bubble.divId !== id) {
        this.reset(particle, true);
        particle.bubble.divId = id;
      }

      this.hoverBubbleSize(particle, 1, divBubble);
      this.hoverBubbleOpacity(particle, 1, divBubble);
      this.hoverBubbleColor(particle, divBubble);
    }
  }

  process(particle, distMouse, timeSpent, data) {
    const container = this.container;
    const bubbleParam = data.bubbleObj.optValue;

    if (bubbleParam === undefined) {
      return;
    }

    const options = container.options;
    const bubbleDuration = options.interactivity.modes.bubble.duration;
    const bubbleDistance = container.retina.bubbleModeDistance;
    const particlesParam = data.particlesObj.optValue;
    const pObjBubble = data.bubbleObj.value;
    const pObj = data.particlesObj.value || 0;
    const type = data.type;

    if (bubbleParam !== particlesParam) {
      if (!container.bubble.durationEnd) {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;

          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;

            if (type === ProcessBubbleType.size) {
              particle.bubble.radius = value;
            }

            if (type === ProcessBubbleType.opacity) {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === ProcessBubbleType.size) {
            delete particle.bubble.radius;
          }

          if (type === ProcessBubbleType.opacity) {
            delete particle.bubble.opacity;
          }
        }
      } else if (pObjBubble) {
        if (type === ProcessBubbleType.size) {
          delete particle.bubble.radius;
        }

        if (type === ProcessBubbleType.opacity) {
          delete particle.bubble.opacity;
        }
      }
    }
  }

  clickBubble() {
    var _a;

    const container = this.container;
    const options = container.options;
    const mouseClickPos = container.interactivity.mouse.clickPosition;

    if (mouseClickPos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance;
    const query = container.particles.quadTree.query(new Circle_Circle(mouseClickPos.x, mouseClickPos.y, distance));

    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition();
      const distMouse = Utils_Utils.getDistance(pos, mouseClickPos);
      const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

      if (container.bubble.clicking) {
        if (timeSpent > options.interactivity.modes.bubble.duration) {
          container.bubble.durationEnd = true;
        }

        if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
          container.bubble.clicking = false;
          container.bubble.durationEnd = false;
        }

        const sizeData = {
          bubbleObj: {
            optValue: container.retina.bubbleModeSize,
            value: particle.bubble.radius
          },
          particlesObj: {
            optValue: (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue,
            value: particle.size.value
          },
          type: ProcessBubbleType.size
        };
        this.process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: options.interactivity.modes.bubble.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: particle.particlesOptions.opacity.value,
            value: particle.opacity.value
          },
          type: ProcessBubbleType.opacity
        };
        this.process(particle, distMouse, timeSpent, opacityData);

        if (!container.bubble.durationEnd) {
          if (distMouse <= container.retina.bubbleModeDistance) {
            this.hoverBubbleColor(particle);
          } else {
            delete particle.bubble.color;
          }
        } else {
          delete particle.bubble.color;
        }
      }
    }
  }

  hoverBubble() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (mousePos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance;
    const query = container.particles.quadTree.query(new Circle_Circle(mousePos.x, mousePos.y, distance));

    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition();
      const distance = Utils_Utils.getDistance(pos, mousePos);
      const ratio = 1 - distance / container.retina.bubbleModeDistance;

      if (distance <= container.retina.bubbleModeDistance) {
        if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
          this.hoverBubbleSize(particle, ratio);
          this.hoverBubbleOpacity(particle, ratio);
          this.hoverBubbleColor(particle);
        }
      } else {
        this.reset(particle);
      }

      if (container.interactivity.status === Constants.mouseLeaveEvent) {
        this.reset(particle);
      }
    }
  }

  hoverBubbleSize(particle, ratio, divBubble) {
    var _a;

    const container = this.container;
    const modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

    if (modeSize === undefined) {
      return;
    }

    const optSize = (_a = particle.sizeValue) !== null && _a !== void 0 ? _a : container.retina.sizeValue;
    const pSize = particle.size.value;
    const size = Bubbler_Bubbler.calculateBubbleValue(pSize, modeSize, optSize, ratio);

    if (size !== undefined) {
      particle.bubble.radius = size;
    }
  }

  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a;

    const options = this.container.options;
    const modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;

    if (modeOpacity === undefined) {
      return;
    }

    const optOpacity = particle.particlesOptions.opacity.value;
    const pOpacity = particle.opacity.value;
    const opacity = Bubbler_Bubbler.calculateBubbleValue(pOpacity, modeOpacity, optOpacity, ratio);

    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
    }
  }

  hoverBubbleColor(particle, divBubble) {
    var _a;

    const options = this.container.options;

    if (particle.bubble.color === undefined) {
      const modeColor = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.color) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.color;

      if (modeColor === undefined) {
        return;
      }

      const bubbleColor = modeColor instanceof Array ? Utils_Utils.itemFromArray(modeColor) : modeColor;
      particle.bubble.color = ColorUtils_ColorUtils.colorToHsl(bubbleColor);
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Mouse/Connector.js


class Connector_Connector {
  constructor(container) {
    this.container = container;
  }

  isEnabled() {
    const container = this.container;
    const mouse = container.interactivity.mouse;
    const events = container.options.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    return Utils_Utils.isInArray(HoverMode.connect, hoverMode);
  }

  reset() {}

  interact() {
    const container = this.container;
    const options = container.options;

    if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
      const mousePos = container.interactivity.mouse.position;

      if (!mousePos) {
        return;
      }

      const distance = Math.abs(container.retina.connectModeRadius);
      const query = container.particles.quadTree.query(new Circle_Circle(mousePos.x, mousePos.y, distance));
      let i = 0;

      for (const p1 of query) {
        const pos1 = p1.getPosition();

        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition();
          const distMax = Math.abs(container.retina.connectModeDistance);
          const xDiff = Math.abs(pos1.x - pos2.x);
          const yDiff = Math.abs(pos1.y - pos2.y);

          if (xDiff < distMax && yDiff < distMax) {
            container.canvas.drawConnectLine(p1, p2);
          }
        }

        ++i;
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Utils/CircleWarp.js


class CircleWarp_CircleWarp extends Circle_Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      height: canvasSize.height,
      width: canvasSize.width
    };
  }

  contains(point) {
    if (super.contains(point)) {
      return true;
    }

    const posNE = {
      x: point.x - this.canvasSize.width,
      y: point.y
    };

    if (super.contains(posNE)) {
      return true;
    }

    const posSE = {
      x: point.x - this.canvasSize.width,
      y: point.y - this.canvasSize.height
    };

    if (super.contains(posSE)) {
      return true;
    }

    const posSW = {
      x: point.x,
      y: point.y - this.canvasSize.height
    };
    return super.contains(posSW);
  }

  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }

    const rect = range;
    const circle = range;
    const newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };

    if (circle.radius !== undefined) {
      const biggerCircle = new Circle_Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle_Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }

    return false;
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Particles/Linker.js

class Linker_Linker {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    return particle.particlesOptions.links.enable;
  }

  reset() {}

  interact(p1) {
    var _a;

    const container = this.container;
    const linkOpt1 = p1.particlesOptions.links;
    const optOpacity = linkOpt1.opacity;
    const optDistance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
    const canvasSize = container.canvas.size;
    const warp = linkOpt1.warp;
    const pos1 = p1.getPosition();
    const range = warp ? new CircleWarp_CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle_Circle(pos1.x, pos1.y, optDistance);
    const query = container.particles.quadTree.query(range);

    for (const p2 of query) {
      const linkOpt2 = p2.particlesOptions.links;

      if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id) {
        continue;
      }

      const pos2 = p2.getPosition();
      let distance = Utils_Utils.getDistance(pos1, pos2);

      if (warp) {
        if (distance > optDistance) {
          const pos2NE = {
            x: pos2.x - canvasSize.width,
            y: pos2.y
          };
          distance = Utils_Utils.getDistance(pos1, pos2NE);

          if (distance > optDistance) {
            const pos2SE = {
              x: pos2.x - canvasSize.width,
              y: pos2.y - canvasSize.height
            };
            distance = Utils_Utils.getDistance(pos1, pos2SE);

            if (distance > optDistance) {
              const pos2SW = {
                x: pos2.x,
                y: pos2.y - canvasSize.height
              };
              distance = Utils_Utils.getDistance(pos1, pos2SW);
            }
          }
        }
      }

      if (distance > optDistance) {
        return;
      }

      const opacityLine = optOpacity - distance * optOpacity / optDistance;

      if (opacityLine > 0) {
        const linksOptions = p1.particlesOptions.links;
        let linkColor = linksOptions.id !== undefined ? container.particles.linksColors[linksOptions.id] : container.particles.linksColor;

        if (!linkColor) {
          const optColor = linksOptions.color;
          const color = typeof optColor === "string" ? optColor : optColor.value;

          if (color === Constants.randomColorValue) {
            if (linksOptions.consent) {
              linkColor = ColorUtils_ColorUtils.colorToRgb({
                value: color
              });
            } else if (linksOptions.blink) {
              linkColor = Constants.randomColorValue;
            } else {
              linkColor = Constants.midColorValue;
            }
          } else {
            linkColor = ColorUtils_ColorUtils.colorToRgb({
              value: color
            });
          }

          if (linksOptions.id !== undefined) {
            container.particles.linksColors[linksOptions.id] = linkColor;
          } else {
            container.particles.linksColor = linkColor;
          }
        }

        if (p2.links.map(t => t.destination).indexOf(p1) === -1 && p1.links.map(t => t.destination).indexOf(p2) === -1) {
          p1.links.push({
            destination: p2,
            opacity: opacityLine
          });
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Particles/Attractor.js

class Attractor_Attractor {
  constructor(container) {
    this.container = container;
  }

  interact(p1) {
    var _a;

    const container = this.container;
    const options = container.options;
    const distance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
    const pos1 = p1.getPosition();
    const query = container.particles.quadTree.query(new Circle_Circle(pos1.x, pos1.y, distance));

    for (const p2 of query) {
      if (p1 === p2 || p2.particlesOptions.move.attract.enable) {
        continue;
      }

      const pos2 = p2.getPosition();
      const {
        dx,
        dy
      } = Utils_Utils.getDistances(pos1, pos2);
      const rotate = options.particles.move.attract.rotate;
      const ax = dx / (rotate.x * 1000);
      const ay = dy / (rotate.y * 1000);
      p1.velocity.horizontal -= ax;
      p1.velocity.vertical -= ay;
      p2.velocity.horizontal += ax;
      p2.velocity.vertical += ay;
    }
  }

  isEnabled(particle) {
    return particle.particlesOptions.move.attract.enable;
  }

  reset() {}

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Particles/Collider.js


class Collider_Collider {
  constructor(container) {
    this.container = container;
  }

  static rotate(velocity, angle) {
    return {
      horizontal: velocity.horizontal * Math.cos(angle) - velocity.vertical * Math.sin(angle),
      vertical: velocity.horizontal * Math.sin(angle) + velocity.vertical * Math.cos(angle)
    };
  }

  static collisionVelocity(v1, v2, m1, m2) {
    return {
      horizontal: v1.horizontal * (m1 - m2) / (m1 + m2) + v2.horizontal * 2 * m2 / (m1 + m2),
      vertical: v1.vertical
    };
  }

  static bounce(p1, p2) {
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const xVelocityDiff = p1.velocity.horizontal - p2.velocity.horizontal;
    const yVelocityDiff = p1.velocity.vertical - p2.velocity.vertical;
    const xDist = pos2.x - pos1.x;
    const yDist = pos2.y - pos1.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
      const m1 = p1.size.value;
      const m2 = p2.size.value;
      const u1 = Collider_Collider.rotate(p1.velocity, angle);
      const u2 = Collider_Collider.rotate(p2.velocity, angle);
      const v1 = Collider_Collider.collisionVelocity(u1, u2, m1, m2);
      const v2 = Collider_Collider.collisionVelocity(u2, u1, m1, m2);
      const vFinal1 = Collider_Collider.rotate(v1, -angle);
      const vFinal2 = Collider_Collider.rotate(v2, -angle);
      p1.velocity.horizontal = vFinal1.horizontal;
      p1.velocity.vertical = vFinal1.vertical;
      p2.velocity.horizontal = vFinal2.horizontal;
      p2.velocity.vertical = vFinal2.vertical;
    }
  }

  static destroy(p1, p2) {
    if (p1.size.value === undefined && p2.size.value !== undefined) {
      p1.destroy();
    } else if (p1.size.value !== undefined && p2.size.value === undefined) {
      p2.destroy();
    } else if (p1.size.value !== undefined && p2.size.value !== undefined) {
      if (p1.size.value >= p2.size.value) {
        p2.destroy();
      } else {
        p1.destroy();
      }
    }
  }

  static getRadius(particle, fallback) {
    return particle.bubble.radius || particle.size.value || fallback;
  }

  isEnabled(particle) {
    return particle.particlesOptions.collisions.enable;
  }

  reset() {}

  interact(p1) {
    const container = this.container;
    const pos1 = p1.getPosition();
    const query = container.particles.quadTree.query(new Circle_Circle(pos1.x, pos1.y, p1.size.value * 2));

    for (const p2 of query) {
      if (p1 === p2 || !p2.particlesOptions.collisions.enable || p1.particlesOptions.collisions.mode !== p2.particlesOptions.collisions.mode) {
        continue;
      }

      const pos2 = p2.getPosition();
      const dist = Utils_Utils.getDistance(pos1, pos2);
      const defaultSize = container.retina.sizeValue;
      const radius1 = Collider_Collider.getRadius(p1, defaultSize);
      const radius2 = Collider_Collider.getRadius(p2, defaultSize);
      const distP = radius1 + radius2;

      if (dist <= distP) {
        this.resolveCollision(p1, p2);
      }
    }
  }

  resolveCollision(p1, p2) {
    switch (p1.particlesOptions.collisions.mode) {
      case CollisionMode.absorb:
        {
          this.absorb(p1, p2);
          break;
        }

      case CollisionMode.bounce:
        {
          Collider_Collider.bounce(p1, p2);
          break;
        }

      case CollisionMode.destroy:
        {
          Collider_Collider.destroy(p1, p2);
          break;
        }
    }
  }

  absorb(p1, p2) {
    const container = this.container;
    const fps = container.options.fpsLimit / 1000;

    if (p1.size.value === undefined && p2.size.value !== undefined) {
      p1.destroy();
    } else if (p1.size.value !== undefined && p2.size.value === undefined) {
      p2.destroy();
    } else if (p1.size.value !== undefined && p2.size.value !== undefined) {
      if (p1.size.value >= p2.size.value) {
        const factor = Utils_Utils.clamp(p1.size.value / p2.size.value, 0, p2.size.value) * fps;
        p1.size.value += factor;
        p2.size.value -= factor;

        if (p2.size.value <= container.retina.pixelRatio) {
          p2.size.value = 0;
          p2.destroy();
        }
      } else {
        const factor = Utils_Utils.clamp(p2.size.value / p1.size.value, 0, p1.size.value) * fps;
        p1.size.value -= factor;
        p2.size.value += factor;

        if (p1.size.value <= container.retina.pixelRatio) {
          p1.size.value = 0;
          p1.destroy();
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/Interactions/Particles/Infecter.js

class Infecter_Infecter {
  constructor(container) {
    this.container = container;
  }

  isEnabled() {
    return this.container.options.infection.enable;
  }

  reset() {}

  interact(p1, delta) {
    var _a, _b;

    p1.updateInfection(delta);

    if (p1.infectionStage === undefined) {
      return;
    }

    const container = this.container;
    const options = container.options;
    const infectionOptions = options.infection;

    if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
      return;
    }

    const infectionStage1 = infectionOptions.stages[p1.infectionStage];
    const pxRatio = container.retina.pixelRatio;
    const radius = p1.size.value * 2 + infectionStage1.radius * pxRatio;
    const pos = p1.getPosition();
    const infectedStage1 = (_a = infectionStage1.infectedStage) !== null && _a !== void 0 ? _a : p1.infectionStage;
    const query = container.particles.quadTree.query(new Circle_Circle(pos.x, pos.y, radius)).filter(t => t.infectionStage === undefined || t.infectionStage !== p1.infectionStage);
    const infections = infectionStage1.rate;
    const neighbors = query.length;

    for (const p2 of query) {
      if (Math.random() < infections / neighbors) {
        if (p2.infectionStage === undefined) {
          p2.startInfection(infectedStage1);
        } else if (p2.infectionStage < p1.infectionStage) {
          p2.updateInfectionStage(infectedStage1);
        } else if (p2.infectionStage > p1.infectionStage) {
          const infectionStage2 = infectionOptions.stages[p2.infectionStage];
          const infectedStage2 = (_b = infectionStage2 === null || infectionStage2 === void 0 ? void 0 : infectionStage2.infectedStage) !== null && _b !== void 0 ? _b : p2.infectionStage;
          p1.updateInfectionStage(infectedStage2);
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particle/InteractionManager.js








class InteractionManager_InteractionManager {
  constructor(container) {
    this.container = container;
    this.externalInteractors = [new Bubbler_Bubbler(container), new Connector_Connector(container), new Grabber_Grabber(container), new Repulser_Repulser(container)];
    this.particleInteractors = [new Attractor_Attractor(container), new Collider_Collider(container), new Infecter_Infecter(container), new Linker_Linker(container)];
  }

  init() {}

  interact(delta) {
    this.externalInteract(delta);
    this.particlesInteract(delta);
  }

  externalInteract(delta) {
    for (const interactor of this.externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }

  particlesInteract(delta) {
    for (const particle of this.container.particles.array) {
      for (const interactor of this.externalInteractors) {
        interactor.reset(particle);
      }

      for (const interactor of this.particleInteractors) {
        if (interactor.isEnabled(particle)) {
          interactor.interact(particle, delta);
        }
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Particles.js



class Core_Particles_Particles {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.interactionManager = new InteractionManager_InteractionManager(container);
    const canvasSize = this.container.canvas.size;
    this.linksColors = {};
    this.quadTree = new QuadTree_QuadTree(new Rectangle_Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
  }

  get count() {
    return this.array.length;
  }

  init() {
    const container = this.container;
    const options = container.options;
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }

      if (handled) {
        break;
      }
    }

    if (!handled) {
      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle();
      }
    }

    if (options.infection.enable) {
      for (let i = 0; i < options.infection.infections; i++) {
        const notInfected = this.array.filter(p => p.infectionStage === undefined);
        const infected = Utils_Utils.itemFromArray(notInfected);
        infected.startInfection(0);
      }
    }

    this.interactionManager.init();
    container.noise.init();
  }

  redraw() {
    this.clear();
    this.init();
    this.draw(0);
  }

  removeAt(index, quantity) {
    if (index >= 0 && index <= this.count) {
      for (const particle of this.array.splice(index, quantity !== null && quantity !== void 0 ? quantity : 1)) {
        particle.destroy();
      }
    }
  }

  remove(particle) {
    this.removeAt(this.array.indexOf(particle));
  }

  update(delta) {
    const container = this.container;
    const particlesToDelete = [];
    container.noise.update();

    for (const particle of this.array) {
      particle.bubble.inRange = false;

      for (const [, plugin] of container.plugins) {
        if (particle.destroyed) {
          break;
        }

        if (plugin.particleUpdate) {
          plugin.particleUpdate(particle, delta);
        }
      }

      if (!particle.destroyed) {
        particle.update(delta);
      }

      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }

      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }

    for (const particle of particlesToDelete) {
      this.remove(particle);
    }

    this.interactionManager.interact(delta);
  }

  draw(delta) {
    const container = this.container;
    container.canvas.clear();
    const canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree_QuadTree(new Rectangle_Rectangle(0, 0, canvasSize.width, canvasSize.height), 4);
    this.update(delta);

    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }

    for (const p of this.array) {
      p.draw(delta);
    }
  }

  clear() {
    this.array = [];
  }

  push(nb, mousePosition) {
    var _a;

    const container = this.container;
    const options = container.options;
    const limit = options.particles.number.limit * container.density;
    this.pushing = true;

    if (limit > 0) {
      const countToRemove = this.count + nb - limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }

    let pos;

    if (mousePosition) {
      pos = (_a = mousePosition.position) !== null && _a !== void 0 ? _a : {
        x: 0,
        y: 0
      };
    }

    for (let i = 0; i < nb; i++) {
      this.addParticle(pos);
    }

    if (!options.particles.move.enable) {
      this.container.play();
    }

    this.pushing = false;
  }

  addParticle(position, overrideOptions) {
    const particle = new Particle_Particle(this.container, position, overrideOptions);
    this.array.push(particle);
    return particle;
  }

  removeQuantity(quantity) {
    const options = this.container.options;
    this.removeAt(0, quantity);

    if (!options.particles.move.enable) {
      this.container.play();
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Retina.js

class Retina_Retina {
  constructor(container) {
    this.container = container;
  }

  init() {
    const container = this.container;
    const options = container.options;

    if (options.detectRetina) {
      this.pixelRatio = Utils_Utils.isSsr() ? 1 : window.devicePixelRatio;
    } else {
      this.pixelRatio = 1;
    }

    const ratio = this.pixelRatio;

    if (container.canvas.element) {
      const element = container.canvas.element;
      container.canvas.size.width = element.offsetWidth * ratio;
      container.canvas.size.height = element.offsetHeight * ratio;
    }

    const particles = options.particles;
    this.linksDistance = particles.links.distance * ratio;
    this.linksWidth = particles.links.width * ratio;
    this.moveSpeed = particles.move.speed * ratio;
    this.sizeValue = particles.size.value * ratio;
    this.sizeAnimationSpeed = particles.size.animation.speed * ratio;
    const modes = options.interactivity.modes;
    this.connectModeDistance = modes.connect.distance * ratio;
    this.connectModeRadius = modes.connect.radius * ratio;
    this.grabModeDistance = modes.grab.distance * ratio;
    this.repulseModeDistance = modes.repulse.distance * ratio;
    this.slowModeRadius = modes.slow.radius * ratio;
    this.bubbleModeDistance = modes.bubble.distance * ratio;

    if (modes.bubble.size) {
      this.bubbleModeSize = modes.bubble.size * ratio;
    }
  }

  initParticle(particle) {
    const particlesOptions = particle.particlesOptions;
    const ratio = this.pixelRatio;
    particle.linksDistance = particlesOptions.links.distance * ratio;
    particle.linksWidth = particlesOptions.links.width * ratio;
    particle.moveSpeed = particlesOptions.move.speed * ratio;
    particle.sizeValue = particlesOptions.size.value * ratio;

    if (typeof particlesOptions.size.random !== "boolean") {
      particle.randomMinimumSize = particlesOptions.size.random.minimumValue * ratio;
    }

    particle.sizeAnimationSpeed = particlesOptions.size.animation.speed * ratio;
  }

}
// CONCATENATED MODULE: ./dist/Core/FrameManager.js
class FrameManager {
  constructor(container) {
    this.container = container;
  }

  nextFrame(timestamp) {
    const container = this.container;
    const options = container.options;
    const fpsLimit = options.fpsLimit > 0 ? options.fpsLimit : 60;

    if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / fpsLimit) {
      container.draw();
      return;
    }

    const delta = timestamp - container.lastFrameTime;
    container.lastFrameTime = timestamp;
    container.particles.draw(delta);

    if (options.particles.move.enable && container.getAnimationStatus()) {
      container.draw();
    }
  }

}
// CONCATENATED MODULE: ./dist/Enums/InteractivityDetect.js
var InteractivityDetect;

(function (InteractivityDetect) {
  InteractivityDetect["canvas"] = "canvas";
  InteractivityDetect["parent"] = "parent";
  InteractivityDetect["window"] = "window";
})(InteractivityDetect || (InteractivityDetect = {}));
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Events/ClickEvent.js
class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Events/DivEvent.js

class DivEvent_DivEvent {
  constructor() {
    this.ids = [];
    this.enable = false;
    this.mode = [];
    this.type = DivType.circle;
  }

  get elementId() {
    return this.ids;
  }

  set elementId(value) {
    this.ids = value;
  }

  get el() {
    return this.elementId;
  }

  set el(value) {
    this.elementId = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;

    if (ids !== undefined) {
      this.ids = ids;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Events/Parallax.js
class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.force !== undefined) {
      this.force = data.force;
    }

    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Events/HoverEvent.js

class HoverEvent_HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.parallax.load(data.parallax);
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Events/Events.js



class Events_Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent_DivEvent();
    this.onHover = new HoverEvent_HoverEvent();
    this.resize = true;
  }

  get onclick() {
    return this.onClick;
  }

  set onclick(value) {
    this.onClick = value;
  }

  get ondiv() {
    return this.onDiv;
  }

  set ondiv(value) {
    this.onDiv = value;
  }

  get onhover() {
    return this.onHover;
  }

  set onhover(value) {
    this.onHover = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
    const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;

    if (onDiv !== undefined) {
      if (onDiv instanceof Array) {
        this.onDiv = onDiv.map(div => {
          const tmp = new DivEvent_DivEvent();
          tmp.load(div);
          return tmp;
        });
      } else {
        this.onDiv = new DivEvent_DivEvent();
        this.onDiv.load(onDiv);
      }
    }

    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);

    if (data.resize !== undefined) {
      this.resize = data.resize;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/BubbleBase.js

class BubbleBase_BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.color !== undefined) {
      if (data.color instanceof Array) {
        this.color = data.color.map(s => OptionsColor.create(undefined, s));
      } else {
        if (this.color instanceof Array) {
          this.color = new OptionsColor();
        }

        this.color = OptionsColor.create(this.color, data.color);
      }
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/BubbleDiv.js

class BubbleDiv_BubbleDiv extends BubbleBase_BubbleBase {
  constructor() {
    super();
    this.ids = [];
  }

  load(data) {
    super.load(data);

    if (!(data !== undefined && data.ids !== undefined)) {
      return;
    }

    this.ids = data.ids;
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Bubble.js


class Bubble_Bubble extends BubbleBase_BubbleBase {
  load(data) {
    super.load(data);

    if (!(data !== undefined && data.divs !== undefined)) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new BubbleDiv_BubbleDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new BubbleDiv_BubbleDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/ConnectLinks.js
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }

  load(data) {
    if (!(data !== undefined && data.opacity !== undefined)) {
      return;
    }

    this.opacity = data.opacity;
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Connect.js

class Connect_Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/GrabLinks.js

class GrabLinks_GrabLinks {
  constructor() {
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Grab.js

class Grab_Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks_GrabLinks();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Remove.js
class Remove {
  constructor() {
    this.quantity = 2;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Push.js
class Push {
  constructor() {
    this.quantity = 4;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/RepulseBase.js
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.speed = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/RepulseDiv.js

class RepulseDiv_RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.ids = [];
  }

  load(data) {
    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.ids === undefined) {
      return;
    }

    this.ids = data.ids;
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Repulse.js


class Repulse_Repulse extends RepulseBase {
  load(data) {
    super.load(data);

    if ((data === null || data === void 0 ? void 0 : data.divs) === undefined) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new RepulseDiv_RepulseDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new RepulseDiv_RepulseDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Slow.js
class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }

  get active() {
    return false;
  }

  set active(_value) {}

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Modes/Modes.js







class Modes_Modes {
  constructor() {
    this.bubble = new Bubble_Bubble();
    this.connect = new Connect_Connect();
    this.grab = new Grab_Grab();
    this.push = new Push();
    this.remove = new Remove();
    this.repulse = new Repulse_Repulse();
    this.slow = new Slow();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.bubble.load(data.bubble);
    this.connect.load(data.connect);
    this.grab.load(data.grab);
    this.push.load(data.push);
    this.remove.load(data.remove);
    this.repulse.load(data.repulse);
    this.slow.load(data.slow);
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Interactivity/Interactivity.js



class Interactivity_Interactivity {
  constructor() {
    this.detectsOn = InteractivityDetect.canvas;
    this.events = new Events_Events();
    this.modes = new Modes_Modes();
  }

  get detect_on() {
    return this.detectsOn;
  }

  set detect_on(value) {
    this.detectsOn = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;

    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }

    this.events.load(data.events);
    this.modes.load(data.modes);

    if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
      if (this.events.onHover.mode instanceof Array) {
        if (this.events.onHover.mode.indexOf(HoverMode.slow) < 0) {
          this.events.onHover.mode.push(HoverMode.slow);
        }
      } else if (this.events.onHover.mode !== HoverMode.slow) {
        this.events.onHover.mode = [this.events.onHover.mode, HoverMode.slow];
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/BackgroundMask/BackgroundMaskCover.js

class BackgroundMaskCover_BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor();
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/BackgroundMask/BackgroundMask.js

class BackgroundMask_BackgroundMask {
  constructor() {
    this.cover = new BackgroundMaskCover_BackgroundMaskCover();
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.cover !== undefined) {
      const cover = data.cover;
      const color = typeof data.cover === "string" ? {
        color: data.cover
      } : data.cover;
      this.cover.load(cover.color !== undefined ? cover : {
        color: color
      });
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Background/Background.js

class Background_Background {
  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.image !== undefined) {
      this.image = data.image;
    }

    if (data.position !== undefined) {
      this.position = data.position;
    }

    if (data.repeat !== undefined) {
      this.repeat = data.repeat;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Infection/InfectionStage.js

class InfectionStage_InfectionStage {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    this.duration = data.duration;
    this.infectedStage = data.infectedStage;

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.rate !== undefined) {
      this.rate = data.rate;
    }
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Infection/Infection.js

class Infection_Infection {
  constructor() {
    this.cure = false;
    this.delay = 0;
    this.enable = false;
    this.infections = 0;
    this.stages = [];
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.cure !== undefined) {
      this.cure = data.cure;
    }

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.infections !== undefined) {
      this.infections = data.infections;
    }

    if (data.stages === undefined) {
      return;
    }

    this.stages = data.stages.map(t => {
      const s = new InfectionStage_InfectionStage();
      s.load(t);
      return s;
    });
  }

}
// CONCATENATED MODULE: ./dist/Options/Classes/Options.js






class Options_Options {
  constructor() {
    this.background = new Background_Background();
    this.backgroundMask = new BackgroundMask_BackgroundMask();
    this.detectRetina = true;
    this.fpsLimit = 30;
    this.infection = new Infection_Infection();
    this.interactivity = new Interactivity_Interactivity();
    this.particles = new Particles_Particles();
    this.pauseOnBlur = true;
  }

  get fps_limit() {
    return this.fpsLimit;
  }

  set fps_limit(value) {
    this.fpsLimit = value;
  }

  get retina_detect() {
    return this.detectRetina;
  }

  set retina_detect(value) {
    this.detectRetina = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.preset !== undefined) {
      if (data.preset instanceof Array) {
        for (const preset of data.preset) {
          this.importPreset(preset);
        }
      } else {
        this.importPreset(data.preset);
      }
    }

    const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;

    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }

    const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;

    if (fpsLimit !== undefined) {
      this.fpsLimit = fpsLimit;
    }

    if (data.pauseOnBlur !== undefined) {
      this.pauseOnBlur = data.pauseOnBlur;
    }

    this.background.load(data.background);
    this.particles.load(data.particles);
    this.infection.load(data.infection);
    this.interactivity.load(data.interactivity);
    this.backgroundMask.load(data.backgroundMask);
    Plugins.loadOptions(this, data);
  }

  importPreset(preset) {
    this.load(Plugins.getPreset(preset));
  }

}
// CONCATENATED MODULE: ./dist/Utils/EventListeners.js


class EventListeners_EventListeners {
  constructor(container) {
    this.container = container;
    this.canPush = true;

    this.mouseMoveHandler = e => this.mouseTouchMove(e);

    this.touchStartHandler = e => this.mouseTouchMove(e);

    this.touchMoveHandler = e => this.mouseTouchMove(e);

    this.touchEndHandler = () => this.mouseTouchFinish();

    this.mouseLeaveHandler = () => this.mouseTouchFinish();

    this.touchCancelHandler = () => this.mouseTouchFinish();

    this.touchEndClickHandler = e => this.mouseTouchClick(e);

    this.mouseUpHandler = e => this.mouseTouchClick(e);

    this.visibilityChangeHandler = () => this.handleVisibilityChange();

    this.resizeHandler = () => this.handleWindowResize();
  }

  static manageListener(element, event, handler, add, options) {
    if (add) {
      let addOptions = {
        passive: true
      };

      if (typeof options === "boolean") {
        addOptions.capture = options;
      } else if (options !== undefined) {
        addOptions = options;
      }

      element.addEventListener(event, handler, addOptions);
    } else {
      const removeOptions = options;
      element.removeEventListener(event, handler, removeOptions);
    }
  }

  addListeners() {
    this.manageListeners(true);
  }

  removeListeners() {
    this.manageListeners(false);
  }

  manageListeners(add) {
    const container = this.container;
    const options = container.options;
    const detectType = options.interactivity.detectsOn;

    if (detectType === InteractivityDetect.window) {
      container.interactivity.element = window;
    } else if (detectType === InteractivityDetect.parent && container.canvas.element) {
      container.interactivity.element = container.canvas.element.parentNode;
    } else {
      container.interactivity.element = container.canvas.element;
    }

    const interactivityEl = container.interactivity.element;

    if (interactivityEl && (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.mouseMoveEvent, this.mouseMoveHandler, add);
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.touchStartEvent, this.touchStartHandler, add);
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.touchMoveEvent, this.touchMoveHandler, add);

      if (!options.interactivity.events.onClick.enable) {
        EventListeners_EventListeners.manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndHandler, add);
      }

      EventListeners_EventListeners.manageListener(interactivityEl, Constants.mouseLeaveEvent, this.mouseLeaveHandler, add);
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.touchCancelEvent, this.touchCancelHandler, add);
    }

    if (options.interactivity.events.onClick.enable && interactivityEl) {
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndClickHandler, add);
      EventListeners_EventListeners.manageListener(interactivityEl, Constants.mouseUpEvent, this.mouseUpHandler, add);
    }

    if (options.interactivity.events.resize) {
      EventListeners_EventListeners.manageListener(window, Constants.resizeEvent, this.resizeHandler, add);
    }

    if (document) {
      EventListeners_EventListeners.manageListener(document, Constants.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
    }
  }

  handleWindowResize() {
    const container = this.container;
    const options = container.options;
    const canvas = container.canvas.element;

    if (!canvas) {
      return;
    }

    const pxRatio = container.retina.pixelRatio;
    container.canvas.size.width = canvas.offsetWidth * pxRatio;
    container.canvas.size.height = canvas.offsetHeight * pxRatio;
    canvas.width = container.canvas.size.width;
    canvas.height = container.canvas.size.height;

    if (!options.particles.move.enable) {
      container.particles.redraw();
    }

    container.densityAutoParticles();

    for (const [, plugin] of container.plugins) {
      if (plugin.resize !== undefined) {
        plugin.resize();
      }
    }
  }

  handleVisibilityChange() {
    const container = this.container;
    const options = container.options;

    if (!options.pauseOnBlur) {
      return;
    }

    if (document === null || document === void 0 ? void 0 : document.hidden) {
      container.pageHidden = true;
      container.pause();
    } else {
      container.pageHidden = false;

      if (container.getAnimationStatus()) {
        container.play(true);
      } else {
        container.draw();
      }
    }
  }

  mouseTouchMove(e) {
    var _a, _b, _c;

    const container = this.container;
    const options = container.options;
    let pos;
    const canvas = container.canvas.element;

    if (e.type.startsWith("mouse")) {
      this.canPush = true;
      const mouseEvent = e;

      if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === undefined) {
        return;
      }

      if (container.interactivity.element === window) {
        if (canvas) {
          const clientRect = canvas.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        }
      } else if (options.interactivity.detectsOn === InteractivityDetect.parent) {
        const source = mouseEvent.target;
        const target = mouseEvent.currentTarget;

        if (source && target) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          pos = {
            x: mouseEvent.offsetX + sourceRect.left - targetRect.left,
            y: mouseEvent.offsetY + sourceRect.top - targetRect.top
          };
        } else {
          pos = {
            x: mouseEvent.offsetX || mouseEvent.clientX,
            y: mouseEvent.offsetY || mouseEvent.clientY
          };
        }
      } else {
        if (mouseEvent.target === container.canvas.element) {
          pos = {
            x: mouseEvent.offsetX || mouseEvent.clientX,
            y: mouseEvent.offsetY || mouseEvent.clientY
          };
        }
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e;
      const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
      const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
      pos = {
        x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
        y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
      };
    }

    const pxRatio = container.retina.pixelRatio;

    if (pos) {
      pos.x *= pxRatio;
      pos.y *= pxRatio;
    }

    container.interactivity.mouse.position = pos;
    container.interactivity.status = Constants.mouseMoveEvent;
  }

  mouseTouchFinish() {
    const container = this.container;
    delete container.interactivity.mouse.position;
    container.interactivity.status = Constants.mouseLeaveEvent;
  }

  mouseTouchClick(e) {
    const container = this.container;
    const options = container.options;
    let handled = false;
    const mousePosition = container.interactivity.mouse.position;

    if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
      return;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.clickPositionValid !== undefined) {
        handled = plugin.clickPositionValid(mousePosition);

        if (handled) {
          break;
        }
      }
    }

    if (!handled) {
      this.doMouseTouchClick(e);
    }
  }

  doMouseTouchClick(e) {
    const container = this.container;
    const options = container.options;

    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos) {
        container.interactivity.mouse.clickPosition = {
          x: mousePos.x,
          y: mousePos.y
        };
      } else {
        return;
      }

      container.interactivity.mouse.clickTime = new Date().getTime();
      const onClick = options.interactivity.events.onClick;

      if (onClick.mode instanceof Array) {
        for (const mode of onClick.mode) {
          this.handleClickMode(mode);
        }
      } else {
        this.handleClickMode(onClick.mode);
      }
    }

    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }

  handleClickMode(mode) {
    const container = this.container;
    const options = container.options;
    const pushNb = options.interactivity.modes.push.quantity;
    const removeNb = options.interactivity.modes.remove.quantity;

    switch (mode) {
      case ClickMode.push:
        {
          if (pushNb > 0) {
            if (options.particles.move.enable) {
              container.particles.push(pushNb, container.interactivity.mouse);
            } else {
              if (pushNb === 1) {
                container.particles.push(pushNb, container.interactivity.mouse);
              } else if (pushNb > 1) {
                container.particles.push(pushNb);
              }
            }
          }

          break;
        }

      case ClickMode.remove:
        container.particles.removeQuantity(removeNb);
        break;

      case ClickMode.bubble:
        container.bubble.clicking = true;
        break;

      case ClickMode.repulse:
        container.repulse.clicking = true;
        container.repulse.count = 0;

        for (const particle of container.repulse.particles) {
          particle.velocity.horizontal = particle.initialVelocity.horizontal;
          particle.velocity.vertical = particle.initialVelocity.vertical;
        }

        container.repulse.particles = [];
        container.repulse.finish = false;
        setTimeout(() => {
          if (!container.destroyed) {
            container.repulse.clicking = false;
          }
        }, options.interactivity.modes.repulse.duration * 1000);
        break;

      case ClickMode.pause:
        if (container.getAnimationStatus()) {
          container.pause();
        } else {
          container.play();
        }

        break;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.handleClickMode) {
        plugin.handleClickMode(mode);
      }
    }
  }

}
// CONCATENATED MODULE: ./dist/Core/Container.js







class Container_Container {
  constructor(id, sourceOptions, ...presets) {
    this.id = id;
    this.sourceOptions = sourceOptions;
    this.started = false;
    this.destroyed = false;
    this.paused = true;
    this.lastFrameTime = 0;
    this.pageHidden = false;
    this.retina = new Retina_Retina(this);
    this.canvas = new Canvas_Canvas(this);
    this.particles = new Core_Particles_Particles(this);
    this.drawer = new FrameManager(this);
    this.noise = {
      generate: () => {
        return {
          angle: Math.random() * Math.PI * 2,
          length: Math.random()
        };
      },
      init: () => {},
      update: () => {}
    };
    this.interactivity = {
      mouse: {}
    };
    this.bubble = {};
    this.repulse = {
      particles: []
    };
    this.plugins = new Map();
    this.drawers = new Map();
    this.density = 1;
    this.options = new Options_Options();

    for (const preset of presets) {
      this.options.load(Plugins.getPreset(preset));
    }

    const shapes = Plugins.getSupportedShapes();

    for (const type of shapes) {
      const drawer = Plugins.getShapeDrawer(type);

      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }

    if (this.sourceOptions) {
      this.options.load(this.sourceOptions);
    }

    this.eventListeners = new EventListeners_EventListeners(this);
  }

  play(force) {
    const needsUpdate = this.paused || force;

    if (this.paused) {
      this.paused = false;
    }

    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }

      this.lastFrameTime = performance.now();
    }

    this.draw();
  }

  pause() {
    if (this.drawAnimationFrame !== undefined) {
      Utils_Utils.cancelAnimation(this.drawAnimationFrame);
      delete this.drawAnimationFrame;
    }

    if (this.paused) {
      return;
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.pause) {
        plugin.pause();
      }
    }

    if (!this.pageHidden) {
      this.paused = true;
    }
  }

  draw() {
    this.drawAnimationFrame = Utils_Utils.animate(t => {
      var _a;

      return (_a = this.drawer) === null || _a === void 0 ? void 0 : _a.nextFrame(t);
    });
  }

  getAnimationStatus() {
    return !this.paused;
  }

  setNoise(noiseOrGenerator, init, update) {
    if (!noiseOrGenerator) {
      return;
    }

    if (typeof noiseOrGenerator === "function") {
      this.noise.generate = noiseOrGenerator;

      if (init) {
        this.noise.init = init;
      }

      if (update) {
        this.noise.update = update;
      }
    } else {
      if (noiseOrGenerator.generate) {
        this.noise.generate = noiseOrGenerator.generate;
      }

      if (noiseOrGenerator.init) {
        this.noise.init = noiseOrGenerator.init;
      }

      if (noiseOrGenerator.update) {
        this.noise.update = noiseOrGenerator.update;
      }
    }
  }

  densityAutoParticles() {
    this.initDensityFactor();
    const numberOptions = this.options.particles.number;
    const optParticlesNumber = numberOptions.value;
    const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
    const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * this.density;
    const particlesCount = this.particles.count;

    if (particlesCount < particlesNumber) {
      this.particles.push(Math.abs(particlesNumber - particlesCount));
    } else if (particlesCount > particlesNumber) {
      this.particles.removeQuantity(particlesCount - particlesNumber);
    }
  }

  destroy() {
    this.stop();
    this.canvas.destroy();
    delete this.interactivity;
    delete this.options;
    delete this.retina;
    delete this.canvas;
    delete this.particles;
    delete this.bubble;
    delete this.repulse;
    delete this.drawer;
    delete this.eventListeners;

    for (const [, drawer] of this.drawers) {
      if (drawer.destroy) {
        drawer.destroy(this);
      }
    }

    this.drawers = new Map();
    this.destroyed = true;
  }

  exportImg(callback) {
    this.exportImage(callback);
  }

  exportImage(callback, type, quality) {
    var _a;

    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }

  exportConfiguration() {
    return JSON.stringify(this.options, undefined, 2);
  }

  refresh() {
    return __awaiter(this, void 0, void 0, function* () {
      this.stop();
      yield this.start();
    });
  }

  stop() {
    if (!this.started) {
      return;
    }

    this.started = false;
    this.eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.clear();

    for (const [, plugin] of this.plugins) {
      if (plugin.stop) {
        plugin.stop();
      }
    }

    this.plugins = new Map();
    this.particles.linksColors = {};
    delete this.particles.linksColor;
  }

  start() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.started) {
        return;
      }

      yield this.init();
      this.started = true;
      this.eventListeners.addListeners();

      for (const [, plugin] of this.plugins) {
        if (plugin.startAsync !== undefined) {
          yield plugin.startAsync();
        } else if (plugin.start !== undefined) {
          plugin.start();
        }
      }

      this.play();
    });
  }

  init() {
    return __awaiter(this, void 0, void 0, function* () {
      this.retina.init();
      this.canvas.init();
      const availablePlugins = Plugins.getAvailablePlugins(this);

      for (const [id, plugin] of availablePlugins) {
        this.plugins.set(id, plugin);
      }

      for (const [, drawer] of this.drawers) {
        if (drawer.init) {
          yield drawer.init(this);
        }
      }

      for (const [, plugin] of this.plugins) {
        if (plugin.init) {
          plugin.init(this.options);
        } else if (plugin.initAsync !== undefined) {
          yield plugin.initAsync(this.options);
        }
      }

      this.particles.init();
      this.densityAutoParticles();
    });
  }

  initDensityFactor() {
    const densityOptions = this.options.particles.number.density;

    if (!this.canvas.element || !densityOptions.enable) {
      return;
    }

    const canvas = this.canvas.element;
    const pxRatio = this.retina.pixelRatio;
    this.density = canvas.width * canvas.height / (densityOptions.factor * pxRatio * densityOptions.area);
  }

}
// CONCATENATED MODULE: ./dist/Core/Loader.js



const tsParticlesDom = [];
class Loader_Loader {
  static dom() {
    return tsParticlesDom;
  }

  static domItem(index) {
    const dom = Loader_Loader.dom();
    const item = dom[index];

    if (item && !item.destroyed) {
      return item;
    }

    dom.splice(index, 1);
  }

  static loadFromArray(tagId, params, index) {
    return __awaiter(this, void 0, void 0, function* () {
      return Loader_Loader.load(tagId, Utils_Utils.itemFromArray(params, index));
    });
  }

  static setFromArray(id, domContainer, params, index) {
    return __awaiter(this, void 0, void 0, function* () {
      return Loader_Loader.set(id, domContainer, Utils_Utils.itemFromArray(params, index));
    });
  }

  static load(tagId, params) {
    return __awaiter(this, void 0, void 0, function* () {
      const domContainer = document.getElementById(tagId);

      if (!domContainer) {
        return;
      }

      return this.set(tagId, domContainer, params);
    });
  }

  static set(id, domContainer, params) {
    return __awaiter(this, void 0, void 0, function* () {
      const dom = Loader_Loader.dom();
      const oldIndex = dom.findIndex(v => v.id === id);

      if (oldIndex >= 0) {
        const old = this.domItem(oldIndex);

        if (old && !old.destroyed) {
          old.destroy();
          dom.splice(oldIndex, 1);
        }
      }

      let canvasEl;
      let generatedCanvas;

      if (domContainer.tagName === "canvas") {
        canvasEl = domContainer;
        generatedCanvas = false;
      } else {
        const existingCanvases = domContainer.getElementsByTagName("canvas");

        if (existingCanvases.length) {
          canvasEl = existingCanvases[0];

          if (!canvasEl.className) {
            canvasEl.className = Constants.canvasClass;
          }

          generatedCanvas = false;
        } else {
          generatedCanvas = true;
          canvasEl = document.createElement("canvas");
          canvasEl.className = Constants.canvasClass;
          canvasEl.style.width = "100%";
          canvasEl.style.height = "100%";
          domContainer.appendChild(canvasEl);
        }
      }

      const newItem = new Container_Container(id, params);

      if (oldIndex >= 0) {
        dom.splice(oldIndex, 0, newItem);
      } else {
        dom.push(newItem);
      }

      newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
      yield newItem.start();
      return newItem;
    });
  }

  static loadJSON(tagId, jsonUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(jsonUrl);

      if (response.ok) {
        const params = yield response.json();

        if (params instanceof Array) {
          return Loader_Loader.loadFromArray(tagId, params);
        } else {
          return Loader_Loader.load(tagId, params);
        }
      } else {
        this.fetchError(response.status);
      }
    });
  }

  static setJSON(id, domContainer, jsonUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(jsonUrl);

      if (response.ok) {
        const params = yield response.json();

        if (params instanceof Array) {
          return Loader_Loader.setFromArray(id, domContainer, params);
        } else {
          return Loader_Loader.set(id, domContainer, params);
        }
      } else {
        this.fetchError(response.status);
      }
    });
  }

  static setOnClickHandler(callback) {
    const dom = Loader_Loader.dom();

    if (dom.length === 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }

    for (const domItem of dom) {
      const el = domItem.interactivity.element;

      if (el) {
        el.addEventListener("click", callback);
      }
    }
  }

  static fetchError(statusCode) {
    console.error(`Error tsParticles - fetch status: ${statusCode}`);
    console.error("Error tsParticles - File config not found");
  }

}
// CONCATENATED MODULE: ./dist/main.slim.js












class main_slim_MainSlim {
  constructor() {
    this.initialized = false;
    const squareDrawer = new SquareDrawer();
    const textDrawer = new TextDrawer_TextDrawer();
    const imageDrawer = new ImageDrawer_ImageDrawer();
    Plugins.addShapeDrawer(ShapeType.line, new LineDrawer());
    Plugins.addShapeDrawer(ShapeType.circle, new CircleDrawer());
    Plugins.addShapeDrawer(ShapeType.edge, squareDrawer);
    Plugins.addShapeDrawer(ShapeType.square, squareDrawer);
    Plugins.addShapeDrawer(ShapeType.triangle, new TriangleDrawer_TriangleDrawer());
    Plugins.addShapeDrawer(ShapeType.star, new StarDrawer());
    Plugins.addShapeDrawer(ShapeType.polygon, new PolygonDrawer_PolygonDrawer());
    Plugins.addShapeDrawer(ShapeType.char, textDrawer);
    Plugins.addShapeDrawer(ShapeType.character, textDrawer);
    Plugins.addShapeDrawer(ShapeType.image, imageDrawer);
    Plugins.addShapeDrawer(ShapeType.images, imageDrawer);
  }

  init() {
    if (!this.initialized) {
      this.initialized = true;
    }
  }

  loadFromArray(tagId, params, index) {
    return __awaiter(this, void 0, void 0, function* () {
      return Loader_Loader.loadFromArray(tagId, params, index);
    });
  }

  load(tagId, params) {
    return __awaiter(this, void 0, void 0, function* () {
      return Loader_Loader.load(tagId, params);
    });
  }

  loadJSON(tagId, pathConfigJson) {
    return Loader_Loader.loadJSON(tagId, pathConfigJson);
  }

  setOnClickHandler(callback) {
    Loader_Loader.setOnClickHandler(callback);
  }

  dom() {
    return Loader_Loader.dom();
  }

  domItem(index) {
    return Loader_Loader.domItem(index);
  }

  addShape(shape, drawer, init, afterEffect, destroy) {
    let customDrawer;

    if (typeof drawer === "function") {
      customDrawer = {
        afterEffect: afterEffect,
        destroy: destroy,
        draw: drawer,
        init: init
      };
    } else {
      customDrawer = drawer;
    }

    Plugins.addShapeDrawer(shape, customDrawer);
  }

  addPreset(preset, options) {
    Plugins.addPreset(preset, options);
  }

  addPlugin(plugin) {
    Plugins.addPlugin(plugin);
  }

}
// CONCATENATED MODULE: ./dist/pjs.js
const initPjs = main => {
  const particlesJS = (tagId, params) => {
    return main.load(tagId, params);
  };

  particlesJS.load = (tagId, pathConfigJson, callback) => {
    main.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    });
  };

  particlesJS.setOnClickHandler = callback => {
    main.setOnClickHandler(callback);
  };

  const pJSDom = main.dom();
  return {
    particlesJS,
    pJSDom
  };
};


// CONCATENATED MODULE: ./dist/Enums/Directions/index.js


// CONCATENATED MODULE: ./dist/Enums/Modes/SizeMode.js
var SizeMode;

(function (SizeMode) {
  SizeMode["precise"] = "precise";
  SizeMode["percent"] = "percent";
})(SizeMode || (SizeMode = {}));
// CONCATENATED MODULE: ./dist/Enums/Modes/index.js






// CONCATENATED MODULE: ./dist/Enums/Statuses/index.js


// CONCATENATED MODULE: ./dist/Enums/Types/index.js





// CONCATENATED MODULE: ./dist/Enums/index.js





// CONCATENATED MODULE: ./dist/index.slim.js


const tsParticles = new main_slim_MainSlim();
tsParticles.init();
const {
  particlesJS,
  pJSDom
} = initPjs(tsParticles);



/***/ })
/******/ ])));