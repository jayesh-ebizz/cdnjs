(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('mobx')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'mobx'], factory) :
  (factory((global.mobxReact = {}),global.React,global.mobx));
}(this, (function (exports,React,mobx) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  // These functions can be stubbed out in specific environments

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});
  var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.forward_ref"):60112,n=b?Symbol.for("react.placeholder"):60113;
  function q(a){if("object"===typeof a&&null!==a){var p=a.$$typeof;switch(p){case c:switch(a=a.type,a){case l:case e:case g:case f:return a;default:switch(a=a&&a.$$typeof,a){case k:case m:case h:return a;default:return p}}case d:return p}}}exports.typeOf=q;exports.AsyncMode=l;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=m;exports.Fragment=e;exports.Profiler=g;exports.Portal=d;exports.StrictMode=f;
  exports.isValidElementType=function(a){return "string"===typeof a||"function"===typeof a||a===e||a===l||a===g||a===f||a===n||"object"===typeof a&&null!==a&&("function"===typeof a.then||a.$$typeof===h||a.$$typeof===k||a.$$typeof===m)};exports.isAsyncMode=function(a){return q(a)===l};exports.isContextConsumer=function(a){return q(a)===k};exports.isContextProvider=function(a){return q(a)===h};exports.isElement=function(a){return "object"===typeof a&&null!==a&&a.$$typeof===c};
  exports.isForwardRef=function(a){return q(a)===m};exports.isFragment=function(a){return q(a)===e};exports.isProfiler=function(a){return q(a)===g};exports.isPortal=function(a){return q(a)===d};exports.isStrictMode=function(a){return q(a)===f};
  });

  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_4 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_5 = reactIs_production_min.Element;
  var reactIs_production_min_6 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_7 = reactIs_production_min.Fragment;
  var reactIs_production_min_8 = reactIs_production_min.Profiler;
  var reactIs_production_min_9 = reactIs_production_min.Portal;
  var reactIs_production_min_10 = reactIs_production_min.StrictMode;
  var reactIs_production_min_11 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_12 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_13 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_14 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_15 = reactIs_production_min.isElement;
  var reactIs_production_min_16 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_17 = reactIs_production_min.isFragment;
  var reactIs_production_min_18 = reactIs_production_min.isProfiler;
  var reactIs_production_min_19 = reactIs_production_min.isPortal;
  var reactIs_production_min_20 = reactIs_production_min.isStrictMode;

  var reactIs_development = createCommonjsModule(function (module, exports) {



  if (process.env.NODE_ENV !== "production") {
    (function() {

  Object.defineProperty(exports, '__esModule', { value: true });

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;

  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_PLACEHOLDER_TYPE = hasSymbol ? Symbol.for('react.placeholder') : 0xead1;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' ||
    // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_ASYNC_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_PLACEHOLDER_TYPE || typeof type === 'object' && type !== null && (typeof type.then === 'function' || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
              return type;
            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;
                default:
                  return $$typeof;
              }
          }
        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  }

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;

  function isAsyncMode(object) {
    return typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }

  exports.typeOf = typeOf;
  exports.AsyncMode = AsyncMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Profiler = Profiler;
  exports.Portal = Portal;
  exports.StrictMode = StrictMode;
  exports.isValidElementType = isValidElementType;
  exports.isAsyncMode = isAsyncMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isProfiler = isProfiler;
  exports.isPortal = isPortal;
  exports.isStrictMode = isStrictMode;
    })();
  }
  });

  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ContextConsumer;
  var reactIs_development_4 = reactIs_development.ContextProvider;
  var reactIs_development_5 = reactIs_development.Element;
  var reactIs_development_6 = reactIs_development.ForwardRef;
  var reactIs_development_7 = reactIs_development.Fragment;
  var reactIs_development_8 = reactIs_development.Profiler;
  var reactIs_development_9 = reactIs_development.Portal;
  var reactIs_development_10 = reactIs_development.StrictMode;
  var reactIs_development_11 = reactIs_development.isValidElementType;
  var reactIs_development_12 = reactIs_development.isAsyncMode;
  var reactIs_development_13 = reactIs_development.isContextConsumer;
  var reactIs_development_14 = reactIs_development.isContextProvider;
  var reactIs_development_15 = reactIs_development.isElement;
  var reactIs_development_16 = reactIs_development.isForwardRef;
  var reactIs_development_17 = reactIs_development.isFragment;
  var reactIs_development_18 = reactIs_development.isProfiler;
  var reactIs_development_19 = reactIs_development.isPortal;
  var reactIs_development_20 = reactIs_development.isStrictMode;

  var reactIs = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = reactIs_production_min;
  } else {
    module.exports = reactIs_development;
  }
  });

  var _ReactIs$ForwardRef;

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Copyright 2015, Yahoo! Inc.
   * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
   */


  var REACT_STATICS = {
      childContextTypes: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
  };

  var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
  };

  var TYPE_STATICS = _defineProperty$1({}, reactIs.ForwardRef, (_ReactIs$ForwardRef = {}, _defineProperty$1(_ReactIs$ForwardRef, '$$typeof', true), _defineProperty$1(_ReactIs$ForwardRef, 'render', true), _ReactIs$ForwardRef));

  var defineProperty = Object.defineProperty;
  var getOwnPropertyNames = Object.getOwnPropertyNames;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var getPrototypeOf = Object.getPrototypeOf;
  var objectPrototype = Object.prototype;

  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== 'string') {
          // don't hoist over string (html) components

          if (objectPrototype) {
              var inheritedComponent = getPrototypeOf(sourceComponent);
              if (inheritedComponent && inheritedComponent !== objectPrototype) {
                  hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
              }
          }

          var keys = getOwnPropertyNames(sourceComponent);

          if (getOwnPropertySymbols) {
              keys = keys.concat(getOwnPropertySymbols(sourceComponent));
          }

          var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
          var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

          for (var i = 0; i < keys.length; ++i) {
              var key = keys[i];
              if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                  var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                  try {
                      // Avoid failures from read-only properties
                      defineProperty(targetComponent, key, descriptor);
                  } catch (e) {}
              }
          }

          return targetComponent;
      }

      return targetComponent;
  }

  var hoistNonReactStatics_cjs = hoistNonReactStatics;

  var EventEmitter =
  /*#__PURE__*/
  function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this.listeners = [];
    }

    _createClass(EventEmitter, [{
      key: "on",
      value: function on(cb) {
        var _this = this;

        this.listeners.push(cb);
        return function () {
          var index = _this.listeners.indexOf(cb);

          if (index !== -1) _this.listeners.splice(index, 1);
        };
      }
    }, {
      key: "emit",
      value: function emit(data) {
        this.listeners.forEach(function (fn) {
          return fn(data);
        });
      }
    }]);

    return EventEmitter;
  }();

  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        rest[_key - 6] = arguments[_key];
      }

      return mobx.untracked(function () {
        componentName = componentName || "<<anonymous>>";
        propFullName = propFullName || propName;

        if (props[propName] == null) {
          if (isRequired) {
            var actual = props[propName] === null ? "null" : "undefined";
            return new Error("The " + location + " `" + propFullName + "` is marked as required " + "in `" + componentName + "`, but its value is `" + actual + "`.");
          }

          return null;
        } else {
          return validate.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
        }
      });
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  } // Copied from React.PropTypes


  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === "symbol") {
      return true;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue["@@toStringTag"] === "Symbol") {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === "function" && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Copied from React.PropTypes


  function getPropType(propValue) {
    var propType = _typeof(propValue);

    if (Array.isArray(propValue)) {
      return "array";
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return "object";
    }

    if (isSymbol(propType, propValue)) {
      return "symbol";
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // Copied from React.PropTypes


  function getPreciseType(propValue) {
    var propType = getPropType(propValue);

    if (propType === "object") {
      if (propValue instanceof Date) {
        return "date";
      } else if (propValue instanceof RegExp) {
        return "regexp";
      }
    }

    return propType;
  }

  function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
      return mobx.untracked(function () {
        if (allowNativeType) {
          if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
        }

        var mobxChecker;

        switch (mobxType) {
          case "Array":
            mobxChecker = mobx.isObservableArray;
            break;

          case "Object":
            mobxChecker = mobx.isObservableObject;
            break;

          case "Map":
            mobxChecker = mobx.isObservableMap;
            break;

          default:
            throw new Error("Unexpected mobxType: ".concat(mobxType));
        }

        var propValue = props[propName];

        if (!mobxChecker(propValue)) {
          var preciseType = getPreciseType(propValue);
          var nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
          return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to" + " `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
        }

        return null;
      });
    });
  }

  function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
    return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
      for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
        rest[_key2 - 5] = arguments[_key2];
      }

      return mobx.untracked(function () {
        if (typeof typeChecker !== "function") {
          return new Error("Property `" + propFullName + "` of component `" + componentName + "` has " + "invalid PropType notation.");
        }

        var error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName);
        if (error instanceof Error) return error;
        var propValue = props[propName];

        for (var i = 0; i < propValue.length; i++) {
          error = typeChecker.apply(void 0, [propValue, i, componentName, location, propFullName + "[" + i + "]"].concat(rest));
          if (error instanceof Error) return error;
        }

        return null;
      });
    });
  }

  var observableArray = createObservableTypeCheckerCreator(false, "Array");
  var observableArrayOf = createObservableArrayOfTypeChecker.bind(null, false);
  var observableMap = createObservableTypeCheckerCreator(false, "Map");
  var observableObject = createObservableTypeCheckerCreator(false, "Object");
  var arrayOrObservableArray = createObservableTypeCheckerCreator(true, "Array");
  var arrayOrObservableArrayOf = createObservableArrayOfTypeChecker.bind(null, true);
  var objectOrObservableObject = createObservableTypeCheckerCreator(true, "Object");

  var propTypes = /*#__PURE__*/Object.freeze({
    observableArray: observableArray,
    observableArrayOf: observableArrayOf,
    observableMap: observableMap,
    observableObject: observableObject,
    arrayOrObservableArray: arrayOrObservableArray,
    arrayOrObservableArrayOf: arrayOrObservableArrayOf,
    objectOrObservableObject: objectOrObservableObject
  });

  function isStateless(component) {
    // `function() {}` has prototype, but `() => {}` doesn't
    // `() => {}` via Babel has prototype too.
    return !(component.prototype && component.prototype.render);
  }
  var symbolId = 0;
  function newSymbol(name) {
    if (typeof Symbol === "function") {
      return Symbol(name);
    }

    var symbol = "__$mobx-react ".concat(name, " (").concat(symbolId, ")");
    symbolId++;
    return symbol;
  }
  var mobxMixins = newSymbol("patchMixins");
  var mobxMixin = newSymbol("patchMixin");

  function getCreateMixins(target, methodName) {
    var mixins = target[mobxMixins] = target[mobxMixins] || {};
    var methodMixins = mixins[methodName] = mixins[methodName] || {};
    methodMixins.pre = methodMixins.pre || [];
    methodMixins.post = methodMixins.post || [];
    return methodMixins;
  }

  function getMixins(target, methodName) {
    return target[mobxMixins][methodName];
  }

  var cachedDefinitions = {};

  function createOrGetCachedDefinition(methodName, enumerable) {
    var cacheKey = "".concat(methodName, "+").concat(enumerable);
    var cached = cachedDefinitions[cacheKey];

    if (cached) {
      return cached;
    }

    var wrapperMethod = function wrapperMethod() {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var mixins = getMixins(this, methodName);
      var realMethod = mixins.real;
      mixins.pre.forEach(function (pre) {
        pre.apply(_this, args);
      });

      if (realMethod !== undefined && realMethod !== null) {
        realMethod.apply(this, args);
      }

      mixins.post.forEach(function (post) {
        post.apply(_this, args);
      });
    };

    wrapperMethod[mobxMixin] = true;
    var newDefinition = {
      get: function get() {
        return wrapperMethod;
      },
      set: function set(value) {
        var mixins = getMixins(this, methodName);
        mixins.real = value;
      },
      configurable: true,
      enumerable: enumerable
    };
    cachedDefinitions[cacheKey] = newDefinition;
    return newDefinition;
  }

  function patch(target, methodName, mixinMethod) {
    var runMixinFirst = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var mixins = getCreateMixins(target, methodName);

    if (runMixinFirst) {
      mixins.pre.unshift(mixinMethod);
    } else {
      mixins.post.push(mixinMethod);
    }

    var realMethod = target[methodName];

    if (typeof realMethod === "function" && realMethod[mobxMixin]) {
      // already patched, do not repatch
      return;
    }

    mixins.real = realMethod;
    var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);
    var newDefinition = createOrGetCachedDefinition(methodName, oldDefinition ? oldDefinition.enumerable : undefined);
    Object.defineProperty(target, methodName, newDefinition);
  }

  var injectorContextTypes = {
    mobxStores: objectOrObservableObject
  };
  Object.seal(injectorContextTypes);
  var proxiedInjectorProps = {
    contextTypes: {
      get: function get() {
        return injectorContextTypes;
      },
      set: function set(_) {
        console.warn("Mobx Injector: you are trying to attach `contextTypes` on an component decorated with `inject` (or `observer`) HOC. Please specify the contextTypes on the wrapped component instead. It is accessible through the `wrappedComponent`");
      },
      configurable: true,
      enumerable: false
    },
    isMobxInjector: {
      value: true,
      writable: true,
      configurable: true,
      enumerable: true
    }
    /**
     * Store Injection
     */

  };

  function createStoreInjector(grabStoresFn, component, injectNames) {
    var displayName = "inject-" + (component.displayName || component.name || component.constructor && component.constructor.name || "Unknown");
    if (injectNames) displayName += "-with-" + injectNames;

    var Injector =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Injector, _Component);

      function Injector() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Injector);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Injector)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _this.storeRef = function (instance) {
          _this.wrappedInstance = instance;
        };

        return _this;
      }

      _createClass(Injector, [{
        key: "render",
        value: function render() {
          // Optimization: it might be more efficient to apply the mapper function *outside* the render method
          // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
          // See this test: 'using a custom injector is not too reactive' in inject.js
          var newProps = {};

          for (var key in this.props) {
            if (this.props.hasOwnProperty(key)) {
              newProps[key] = this.props[key];
            }
          }

          var additionalProps = grabStoresFn(this.context.mobxStores || {}, newProps, this.context) || {};

          for (var _key2 in additionalProps) {
            newProps[_key2] = additionalProps[_key2];
          }

          if (!isStateless(component)) {
            newProps.ref = this.storeRef;
          }

          return React.createElement(component, newProps);
        }
      }]);

      return Injector;
    }(React.Component); // Static fields from component should be visible on the generated Injector


    Injector.displayName = displayName;
    hoistNonReactStatics_cjs(Injector, component);
    Injector.wrappedComponent = component;
    Object.defineProperties(Injector, proxiedInjectorProps);
    return Injector;
  }

  function grabStoresByName(storeNames) {
    return function (baseStores, nextProps) {
      storeNames.forEach(function (storeName) {
        if (storeName in nextProps // prefer props over stores
        ) return;
        if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
        nextProps[storeName] = baseStores[storeName];
      });
      return nextProps;
    };
  }
  /**
   * higher order component that injects stores to a child.
   * takes either a varargs list of strings, which are stores read from the context,
   * or a function that manually maps the available stores from the context to props:
   * storesToProps(mobxStores, props, context) => newProps
   */


  function inject()
  /* fn(stores, nextProps) or ...storeNames */
  {
    var grabStoresFn;

    if (typeof arguments[0] === "function") {
      grabStoresFn = arguments[0];
      return function (componentClass) {
        var injected = createStoreInjector(grabStoresFn, componentClass);
        injected.isMobxInjector = false; // supress warning
        // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
        // see #111

        injected = observer(injected);
        injected.isMobxInjector = true; // restore warning

        return injected;
      };
    } else {
      var storeNames = [];

      for (var i = 0; i < arguments.length; i++) {
        storeNames[i] = arguments[i];
      }

      grabStoresFn = grabStoresByName(storeNames);
      return function (componentClass) {
        return createStoreInjector(grabStoresFn, componentClass, storeNames.join("-"));
      };
    }
  }

  var mobxAdminProperty = mobx.$mobx || "$mobx";
  var mobxIsUnmounted = newSymbol("isUnmounted");
  /**
   * dev tool support
   */

  var isDevtoolsEnabled = false;
  var isUsingStaticRendering = false;
  var warnedAboutObserverInjectDeprecation = false; // WeakMap<Node, Object>;

  var componentByNodeRegistry = typeof WeakMap !== "undefined" ? new WeakMap() : undefined;
  var renderReporter = new EventEmitter();
  var skipRenderKey = newSymbol("skipRender");
  var isForcingUpdateKey = newSymbol("isForcingUpdate");
  /**
   * Helper to set `prop` to `this` as non-enumerable (hidden prop)
   * @param target
   * @param prop
   * @param value
   */

  function setHiddenProp(target, prop, value) {
    if (!Object.hasOwnProperty.call(target, prop)) {
      Object.defineProperty(target, prop, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: value
      });
    } else {
      target[prop] = value;
    }
  }

  function findDOMNode$1(component) {

    return null;
  }

  function reportRendering(component) {
    var node = findDOMNode$1(component);
    if (node && componentByNodeRegistry) componentByNodeRegistry.set(node, component);
    renderReporter.emit({
      event: "render",
      renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
      totalTime: Date.now() - component.__$mobRenderStart,
      component: component,
      node: node
    });
  }

  function trackComponents() {
    if (typeof WeakMap === "undefined") throw new Error("[mobx-react] tracking components is not supported in this browser.");
    if (!isDevtoolsEnabled) isDevtoolsEnabled = true;
  }
  function useStaticRendering(useStaticRendering) {
    isUsingStaticRendering = useStaticRendering;
  }
  /**
   * Errors reporter
   */

  var errorsReporter = new EventEmitter();
  /**
   * Utilities
   */

  function patch$1(target, funcName) {
    var runMixinFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    patch(target, funcName, reactiveMixin[funcName], runMixinFirst);
  }

  function shallowEqual(objA, objB) {
    //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
    if (is(objA, objB)) return true;

    if (_typeof(objA) !== "object" || objA === null || _typeof(objB) !== "object" || objB === null) {
      return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }

    return true;
  }

  function is(x, y) {
    // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  function makeComponentReactive(render) {
    var _this2 = this;

    if (isUsingStaticRendering === true) return render.call(this);

    function reactiveRender() {
      var _this = this;

      isRenderingPending = false;
      var exception = undefined;
      var rendering = undefined;
      reaction.track(function () {
        if (isDevtoolsEnabled) {
          _this.__$mobRenderStart = Date.now();
        }

        try {
          rendering = mobx._allowStateChanges(false, baseRender);
        } catch (e) {
          exception = e;
        }

        if (isDevtoolsEnabled) {
          _this.__$mobRenderEnd = Date.now();
        }
      });

      if (exception) {
        errorsReporter.emit(exception);
        throw exception;
      }

      return rendering;
    } // Generate friendly name for debugging


    var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || "<component>";
    var rootNodeID = this._reactInternalInstance && this._reactInternalInstance._rootNodeID || this._reactInternalInstance && this._reactInternalInstance._debugID || this._reactInternalFiber && this._reactInternalFiber._debugID;
    /**
     * If props are shallowly modified, react will render anyway,
     * so atom.reportChanged() should not result in yet another re-render
     */

    setHiddenProp(this, skipRenderKey, false);
    /**
     * forceUpdate will re-assign this.props. We don't want that to cause a loop,
     * so detect these changes
     */

    setHiddenProp(this, isForcingUpdateKey, false); // wire up reactive render

    var baseRender = render.bind(this);
    var isRenderingPending = false;
    var reaction = new mobx.Reaction("".concat(initialName, "#").concat(rootNodeID, ".render()"), function () {
      if (!isRenderingPending) {
        // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
        // This unidiomatic React usage but React will correctly warn about this so we continue as usual
        // See #85 / Pull #44
        isRenderingPending = true;
        if (typeof _this2.componentWillReact === "function") _this2.componentWillReact(); // TODO: wrap in action?

        if (_this2[mobxIsUnmounted] !== true) {
          // If we are unmounted at this point, componentWillReact() had a side effect causing the component to unmounted
          // TODO: remove this check? Then react will properly warn about the fact that this should not happen? See #73
          // However, people also claim this migth happen during unit tests..
          var hasError = true;

          try {
            setHiddenProp(_this2, isForcingUpdateKey, true);
            if (!_this2[skipRenderKey]) React.Component.prototype.forceUpdate.call(_this2);
            hasError = false;
          } finally {
            setHiddenProp(_this2, isForcingUpdateKey, false);
            if (hasError) reaction.dispose();
          }
        }
      }
    });
    reaction.reactComponent = this;
    reactiveRender[mobxAdminProperty] = reaction;
    this.render = reactiveRender;
    return reactiveRender.call(this);
  }
  /**
   * ReactiveMixin
   */


  var reactiveMixin = {
    componentWillUnmount: function componentWillUnmount() {
      if (isUsingStaticRendering === true) return;
      this.render[mobxAdminProperty] && this.render[mobxAdminProperty].dispose();
      this[mobxIsUnmounted] = true;

      if (isDevtoolsEnabled) {
        var node = findDOMNode$1(this);

        if (node && componentByNodeRegistry) {
          componentByNodeRegistry.delete(node);
        }

        renderReporter.emit({
          event: "destroy",
          component: this,
          node: node
        });
      }
    },
    componentDidMount: function componentDidMount() {
      if (isDevtoolsEnabled) {
        reportRendering(this);
      }
    },
    componentDidUpdate: function componentDidUpdate() {
      if (isDevtoolsEnabled) {
        reportRendering(this);
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      if (isUsingStaticRendering) {
        console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
      } // update on any state changes (as is the default)


      if (this.state !== nextState) {
        return true;
      } // update if props are shallowly not equal, inspired by PureRenderMixin
      // we could return just 'false' here, and avoid the `skipRender` checks etc
      // however, it is nicer if lifecycle events are triggered like usually,
      // so we return true here if props are shallowly modified.


      return !shallowEqual(this.props, nextProps);
    }
  };

  function makeObservableProp(target, propName) {
    var valueHolderKey = newSymbol("reactProp_".concat(propName, "_valueHolder"));
    var atomHolderKey = newSymbol("reactProp_".concat(propName, "_atomHolder"));

    function getAtom() {
      if (!this[atomHolderKey]) {
        setHiddenProp(this, atomHolderKey, mobx.createAtom("reactive " + propName));
      }

      return this[atomHolderKey];
    }

    Object.defineProperty(target, propName, {
      configurable: true,
      enumerable: true,
      get: function get() {
        getAtom.call(this).reportObserved();
        return this[valueHolderKey];
      },
      set: function set(v) {
        if (!this[isForcingUpdateKey] && !shallowEqual(this[valueHolderKey], v)) {
          setHiddenProp(this, valueHolderKey, v);
          setHiddenProp(this, skipRenderKey, true);
          getAtom.call(this).reportChanged();
          setHiddenProp(this, skipRenderKey, false);
        } else {
          setHiddenProp(this, valueHolderKey, v);
        }
      }
    });
  }
  /**
   * Observer function / decorator
   */


  function observer(arg1, arg2) {
    if (typeof arg1 === "string") {
      throw new Error("Store names should be provided as array");
    }

    if (Array.isArray(arg1)) {
      // TODO: remove in next major
      // component needs stores
      if (!warnedAboutObserverInjectDeprecation) {
        warnedAboutObserverInjectDeprecation = true;
        console.warn('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
      }

      if (!arg2) {
        // invoked as decorator
        return function (componentClass) {
          return observer(arg1, componentClass);
        };
      } else {
        return inject.apply(null, arg1)(observer(arg2));
      }
    }

    var componentClass = arg1;

    if (componentClass.isMobxInjector === true) {
      console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
    }

    if (componentClass.__proto__ === React.PureComponent) {
      console.warn("Mobx observer: You are using 'observer' on React.PureComponent. These two achieve two opposite goals and should not be used together");
    } // Stateless function component:
    // If it is function but doesn't seem to be a react class constructor,
    // wrap it to a react class automatically


    if (typeof componentClass === "function" && (!componentClass.prototype || !componentClass.prototype.render) && !componentClass.isReactClass && !React.Component.isPrototypeOf(componentClass)) {
      var _class, _temp;

      var observerComponent = observer((_temp = _class =
      /*#__PURE__*/
      function (_Component) {
        _inherits(_class, _Component);

        function _class() {
          _classCallCheck(this, _class);

          return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        }

        _createClass(_class, [{
          key: "render",
          value: function render() {
            return componentClass.call(this, this.props, this.context);
          }
        }]);

        return _class;
      }(React.Component), _class.displayName = componentClass.displayName || componentClass.name, _class.contextTypes = componentClass.contextTypes, _class.propTypes = componentClass.propTypes, _class.defaultProps = componentClass.defaultProps, _temp));
      hoistNonReactStatics_cjs(observerComponent, componentClass);
      return observerComponent;
    }

    if (!componentClass) {
      throw new Error("Please pass a valid component to 'observer'");
    }

    var target = componentClass.prototype || componentClass;
    mixinLifecycleEvents(target);
    componentClass.isMobXReactObserver = true;
    makeObservableProp(target, "props");
    makeObservableProp(target, "state");
    var baseRender = target.render;

    target.render = function () {
      return makeComponentReactive.call(this, baseRender);
    };

    return componentClass;
  }

  function mixinLifecycleEvents(target) {
    ["componentDidMount", "componentWillUnmount", "componentDidUpdate"].forEach(function (funcName) {
      patch$1(target, funcName);
    });

    if (!target.shouldComponentUpdate) {
      target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
    } else {
      if (target.shouldComponentUpdate !== reactiveMixin.shouldComponentUpdate) {
        // TODO: make throw in next major
        console.warn("Use `shouldComponentUpdate` in an `observer` based component breaks the behavior of `observer` and might lead to unexpected results. Manually implementing `sCU` should not be needed when using mobx-react.");
      }
    }
  }

  var Observer = observer(function (_ref) {
    var children = _ref.children,
        observerInject = _ref.inject,
        render = _ref.render;
    var component = children || render;

    if (typeof component === "undefined") {
      return null;
    }

    if (!observerInject) {
      return component();
    } // TODO: remove in next major


    console.warn("<Observer inject=.../> is no longer supported. Please use inject on the enclosing component instead");
    var InjectComponent = inject(observerInject)(component);
    return React__default.createElement(InjectComponent, null);
  });
  Observer.displayName = "Observer";

  var ObserverPropsCheck = function ObserverPropsCheck(props, key, componentName, location, propFullName) {
    var extraKey = key === "children" ? "render" : "children";

    if (typeof props[key] === "function" && typeof props[extraKey] === "function") {
      return new Error("Invalid prop,do not use children and render in the same time in`" + componentName);
    }

    if (typeof props[key] === "function" || typeof props[extraKey] === "function") {
      return;
    }

    return new Error("Invalid prop `" + propFullName + "` of type `" + _typeof(props[key]) + "` supplied to" + " `" + componentName + "`, expected `function`.");
  };

  Observer.propTypes = {
    render: ObserverPropsCheck,
    children: ObserverPropsCheck
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  function componentWillMount() {
    // Call this.constructor.gDSFP to support sub-classes.
    var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
    if (state !== null && state !== undefined) {
      this.setState(state);
    }
  }

  function componentWillReceiveProps(nextProps) {
    // Call this.constructor.gDSFP to support sub-classes.
    // Use the setState() updater to ensure state isn't stale in certain edge cases.
    function updater(prevState) {
      var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
      return state !== null && state !== undefined ? state : null;
    }
    // Binding "this" is important for shallow renderer support.
    this.setState(updater.bind(this));
  }

  function componentWillUpdate(nextProps, nextState) {
    try {
      var prevProps = this.props;
      var prevState = this.state;
      this.props = nextProps;
      this.state = nextState;
      this.__reactInternalSnapshotFlag = true;
      this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
        prevProps,
        prevState
      );
    } finally {
      this.props = prevProps;
      this.state = prevState;
    }
  }

  // React may warn about cWM/cWRP/cWU methods being deprecated.
  // Add a flag to suppress these warnings for this special case.
  componentWillMount.__suppressDeprecationWarning = true;
  componentWillReceiveProps.__suppressDeprecationWarning = true;
  componentWillUpdate.__suppressDeprecationWarning = true;

  function polyfill(Component) {
    var prototype = Component.prototype;

    if (!prototype || !prototype.isReactComponent) {
      throw new Error('Can only polyfill class components');
    }

    if (
      typeof Component.getDerivedStateFromProps !== 'function' &&
      typeof prototype.getSnapshotBeforeUpdate !== 'function'
    ) {
      return Component;
    }

    // If new component APIs are defined, "unsafe" lifecycles won't be called.
    // Error if any of these lifecycles are present,
    // Because they would work differently between older and newer (16.3+) versions of React.
    var foundWillMountName = null;
    var foundWillReceivePropsName = null;
    var foundWillUpdateName = null;
    if (typeof prototype.componentWillMount === 'function') {
      foundWillMountName = 'componentWillMount';
    } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
      foundWillMountName = 'UNSAFE_componentWillMount';
    }
    if (typeof prototype.componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'componentWillReceiveProps';
    } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
      foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
    }
    if (typeof prototype.componentWillUpdate === 'function') {
      foundWillUpdateName = 'componentWillUpdate';
    } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
      foundWillUpdateName = 'UNSAFE_componentWillUpdate';
    }
    if (
      foundWillMountName !== null ||
      foundWillReceivePropsName !== null ||
      foundWillUpdateName !== null
    ) {
      var componentName = Component.displayName || Component.name;
      var newApiName =
        typeof Component.getDerivedStateFromProps === 'function'
          ? 'getDerivedStateFromProps()'
          : 'getSnapshotBeforeUpdate()';

      throw Error(
        'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
          componentName +
          ' uses ' +
          newApiName +
          ' but also contains the following legacy lifecycles:' +
          (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
          (foundWillReceivePropsName !== null
            ? '\n  ' + foundWillReceivePropsName
            : '') +
          (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
          '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
          'https://fb.me/react-async-component-lifecycle-hooks'
      );
    }

    // React <= 16.2 does not support static getDerivedStateFromProps.
    // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
    // Newer versions of React will ignore these lifecycles if gDSFP exists.
    if (typeof Component.getDerivedStateFromProps === 'function') {
      prototype.componentWillMount = componentWillMount;
      prototype.componentWillReceiveProps = componentWillReceiveProps;
    }

    // React <= 16.2 does not support getSnapshotBeforeUpdate.
    // As a workaround, use cWU to invoke the new lifecycle.
    // Newer versions of React will ignore that lifecycle if gSBU exists.
    if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
      if (typeof prototype.componentDidUpdate !== 'function') {
        throw new Error(
          'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
        );
      }

      prototype.componentWillUpdate = componentWillUpdate;

      var componentDidUpdate = prototype.componentDidUpdate;

      prototype.componentDidUpdate = function componentDidUpdatePolyfill(
        prevProps,
        prevState,
        maybeSnapshot
      ) {
        // 16.3+ will not execute our will-update method;
        // It will pass a snapshot value to did-update though.
        // Older versions will require our polyfilled will-update value.
        // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
        // Because for <= 15.x versions this might be a "prevContext" object.
        // We also can't just check "__reactInternalSnapshot",
        // Because get-snapshot might return a falsy value.
        // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
        var snapshot = this.__reactInternalSnapshotFlag
          ? this.__reactInternalSnapshot
          : maybeSnapshot;

        componentDidUpdate.call(this, prevProps, prevState, snapshot);
      };
    }

    return Component;
  }

  var specialReactKeys = {
    children: true,
    key: true,
    ref: true
  };

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Provider, _Component);

    function Provider(props, context) {
      var _this;

      _classCallCheck(this, Provider);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Provider).call(this, props, context));
      _this.state = {};
      copyStores(props, _this.state);
      return _this;
    }

    _createClass(Provider, [{
      key: "render",
      value: function render() {
        return React.Children.only(this.props.children);
      }
    }, {
      key: "getChildContext",
      value: function getChildContext() {
        var stores = {}; // inherit stores

        copyStores(this.context.mobxStores, stores); // add own stores

        copyStores(this.props, stores);
        return {
          mobxStores: stores
        };
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps) return null;
        if (!prevState) return nextProps; // Maybe this warning is too aggressive?

        if (Object.keys(nextProps).filter(validStoreName).length !== Object.keys(prevState).filter(validStoreName).length) console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");
        if (!nextProps.suppressChangedStoreWarning) for (var key in nextProps) {
          if (validStoreName(key) && prevState[key] !== nextProps[key]) console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
        }
        return nextProps;
      }
    }]);

    return Provider;
  }(React.Component);

  Provider.contextTypes = {
    mobxStores: objectOrObservableObject
  };
  Provider.childContextTypes = {
    mobxStores: objectOrObservableObject.isRequired
  };

  function copyStores(from, to) {
    if (!from) return;

    for (var key in from) {
      if (validStoreName(key)) to[key] = from[key];
    }
  }

  function validStoreName(key) {
    return !specialReactKeys[key] && key !== "suppressChangedStoreWarning";
  } // TODO: kill in next major


  polyfill(Provider);

  var storeKey = newSymbol("disposeOnUnmount");

  function runDisposersOnWillUnmount() {
    var _this = this;

    this[storeKey].forEach(function (propKeyOrFunction) {
      var prop = typeof propKeyOrFunction === "string" ? _this[propKeyOrFunction] : propKeyOrFunction;

      if (prop !== undefined && prop !== null) {
        if (typeof prop !== "function") {
          throw new Error("[mobx-react] disposeOnUnmount only works on functions such as disposers returned by reactions, autorun, etc.");
        }

        prop();
      }
    });
    this[storeKey] = [];
  }

  function disposeOnUnmount(target, propertyKeyOrFunction) {
    if (Array.isArray(propertyKeyOrFunction)) {
      return propertyKeyOrFunction.map(function (fn) {
        return disposeOnUnmount(target, fn);
      });
    }

    if (!target instanceof React.Component) {
      throw new Error("[mobx-react] disposeOnUnmount only works on class based React components.");
    }

    if (typeof propertyKeyOrFunction !== "string" && typeof propertyKeyOrFunction !== "function") {
      throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");
    } // add property key / function we want run (disposed) to the store


    var componentWasAlreadyModified = !!target[storeKey];
    var store = target[storeKey] || (target[storeKey] = []);
    store.push(propertyKeyOrFunction); // tweak the component class componentWillUnmount if not done already

    if (!componentWasAlreadyModified) {
      patch(target, "componentWillUnmount", runDisposersOnWillUnmount, false);
    } // return the disposer as is if invoked as a non decorator


    if (typeof propertyKeyOrFunction !== "string") {
      return propertyKeyOrFunction;
    }
  }

  if (!React.Component) throw new Error("mobx-react requires React to be available");
  if (!mobx.spy) throw new Error("mobx-react requires mobx to be available");
  var onError = function onError(fn) {
    return errorsReporter.on(fn);
  };

  if ((typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "undefined" ? "undefined" : _typeof(__MOBX_DEVTOOLS_GLOBAL_HOOK__)) === "object") {
    var mobx$1 = {
      spy: mobx.spy,
      extras: {
        getDebugName: mobx.getDebugName
      }
    };
    var mobxReact = {
      renderReporter: renderReporter,
      componentByNodeRegistry: componentByNodeRegistry,
      componentByNodeRegistery: componentByNodeRegistry,
      trackComponents: trackComponents
    };

    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(mobxReact, mobx$1);
  }

  exports.propTypes = propTypes;
  exports.PropTypes = propTypes;
  exports.onError = onError;
  exports.observer = observer;
  exports.Observer = Observer;
  exports.renderReporter = renderReporter;
  exports.componentByNodeRegistery = componentByNodeRegistry;
  exports.componentByNodeRegistry = componentByNodeRegistry;
  exports.trackComponents = trackComponents;
  exports.useStaticRendering = useStaticRendering;
  exports.Provider = Provider;
  exports.inject = inject;
  exports.disposeOnUnmount = disposeOnUnmount;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
