(function() {
/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2019 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   3.15.0-beta.4
 */

/*globals process */
let define, require, Ember;

// Used in @ember/-internals/environment/lib/global.js
mainContext = this; // eslint-disable-line no-undef

(function() {
  let registry;
  let seen;

  function missingModule(name, referrerName) {
    if (referrerName) {
      throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
    } else {
      throw new Error('Could not find module ' + name);
    }
  }

  function internalRequire(_name, referrerName) {
    let name = _name;
    let mod = registry[name];

    if (!mod) {
      name = name + '/index';
      mod = registry[name];
    }

    let exports = seen[name];

    if (exports !== undefined) {
      return exports;
    }

    exports = seen[name] = {};

    if (!mod) {
      missingModule(_name, referrerName);
    }

    let deps = mod.deps;
    let callback = mod.callback;
    let reified = new Array(deps.length);

    for (let i = 0; i < deps.length; i++) {
      if (deps[i] === 'exports') {
        reified[i] = exports;
      } else if (deps[i] === 'require') {
        reified[i] = require;
      } else {
        reified[i] = internalRequire(deps[i], name);
      }
    }

    callback.apply(this, reified);

    return exports;
  }

  let isNode =
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    {}.toString.call(process) === '[object process]';

  if (!isNode) {
    Ember = this.Ember = this.Ember || {};
  }

  if (typeof Ember === 'undefined') {
    Ember = {};
  }

  if (typeof Ember.__loader === 'undefined') {
    registry = Object.create(null);
    seen = Object.create(null);

    define = function(name, deps, callback) {
      let value = {};

      if (!callback) {
        value.deps = [];
        value.callback = deps;
      } else {
        value.deps = deps;
        value.callback = callback;
      }

      registry[name] = value;
    };

    require = function(name) {
      return internalRequire(name, null);
    };

    // setup `require` module
    require['default'] = require;

    require.has = function registryHas(moduleName) {
      return Boolean(registry[moduleName]) || Boolean(registry[moduleName + '/index']);
    };

    require._eak_seen = registry;

    Ember.__loader = {
      define: define,
      require: require,
      registry: registry,
    };
  } else {
    define = Ember.__loader.define;
    require = Ember.__loader.require;
  }
})();

define("@ember/-internals/browser-environment/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hasDOM = _exports.isFirefox = _exports.isChrome = _exports.userAgent = _exports.history = _exports.location = _exports.window = void 0;
  // check if window exists and actually is the global
  var hasDom = typeof self === 'object' && self !== null && self.Object === Object && typeof Window !== 'undefined' && self.constructor === Window && typeof document === 'object' && document !== null && self.document === document && typeof location === 'object' && location !== null && self.location === location && typeof history === 'object' && history !== null && self.history === history && typeof navigator === 'object' && navigator !== null && self.navigator === navigator && typeof navigator.userAgent === 'string';
  _exports.hasDOM = hasDom;
  var window = hasDom ? self : null;
  _exports.window = window;
  var location$1 = hasDom ? self.location : null;
  _exports.location = location$1;
  var history$1 = hasDom ? self.history : null;
  _exports.history = history$1;
  var userAgent = hasDom ? self.navigator.userAgent : 'Lynx (textmode)';
  _exports.userAgent = userAgent;
  var isChrome = hasDom ? Boolean(window.chrome) && !window.opera : false;
  _exports.isChrome = isChrome;
  var isFirefox = hasDom ? typeof InstallTrigger !== 'undefined' : false;
  _exports.isFirefox = isFirefox;
});
define("@ember/-internals/environment/index", ["exports", "@ember/debug", "@ember/deprecated-features"], function (_exports, _debug, _deprecatedFeatures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getLookup = getLookup;
  _exports.setLookup = setLookup;
  _exports.getENV = getENV;
  _exports.ENV = _exports.context = _exports.global = void 0;

  // from lodash to catch fake globals
  function checkGlobal(value) {
    return value && value.Object === Object ? value : undefined;
  } // element ids can ruin global miss checks


  function checkElementIdShadowing(value) {
    return value && value.nodeType === undefined ? value : undefined;
  } // export real global


  var global$1 = checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) || checkGlobal(typeof self === 'object' && self) || checkGlobal(typeof window === 'object' && window) || typeof mainContext !== 'undefined' && mainContext || // set before strict mode in Ember loader/wrapper
  new Function('return this')(); // eval outside of strict mode

  _exports.global = global$1;

  var context = function (global, Ember) {
    return Ember === undefined ? {
      imports: global,
      exports: global,
      lookup: global
    } : {
      // import jQuery
      imports: Ember.imports || global,
      // export Ember
      exports: Ember.exports || global,
      // search for Namespaces
      lookup: Ember.lookup || global
    };
  }(global$1, global$1.Ember);

  _exports.context = context;

  function getLookup() {
    return context.lookup;
  }

  function setLookup(value) {
    context.lookup = value;
  }
  /**
    The hash of environment variables used to control various configuration
    settings. To specify your own or override default settings, add the
    desired properties to a global hash named `EmberENV` (or `ENV` for
    backwards compatibility with earlier versions of Ember). The `EmberENV`
    hash must be created before loading Ember.
  
    @class EmberENV
    @type Object
    @public
  */


  var ENV = {
    ENABLE_OPTIONAL_FEATURES: false,

    /**
      Determines whether Ember should add to `Array`, `Function`, and `String`
      native object prototypes, a few extra methods in order to provide a more
      friendly API.
         We generally recommend leaving this option set to true however, if you need
      to turn it off, you can add the configuration property
      `EXTEND_PROTOTYPES` to `EmberENV` and set it to `false`.
         Note, when disabled (the default configuration for Ember Addons), you will
      instead have to access all methods and functions from the Ember
      namespace.
         @property EXTEND_PROTOTYPES
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    EXTEND_PROTOTYPES: {
      Array: true,
      Function: true,
      String: true
    },

    /**
      The `LOG_STACKTRACE_ON_DEPRECATION` property, when true, tells Ember to log
      a full stack trace during deprecation warnings.
         @property LOG_STACKTRACE_ON_DEPRECATION
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    LOG_STACKTRACE_ON_DEPRECATION: true,

    /**
      The `LOG_VERSION` property, when true, tells Ember to log versions of all
      dependent libraries in use.
         @property LOG_VERSION
      @type Boolean
      @default true
      @for EmberENV
      @public
    */
    LOG_VERSION: true,
    RAISE_ON_DEPRECATION: false,
    STRUCTURED_PROFILE: false,

    /**
      Whether to insert a `<div class="ember-view" />` wrapper around the
      application template. See RFC #280.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _APPLICATION_TEMPLATE_WRAPPER
      @for EmberENV
      @type Boolean
      @default true
      @private
    */
    _APPLICATION_TEMPLATE_WRAPPER: true,

    /**
      Whether to use Glimmer Component semantics (as opposed to the classic "Curly"
      components semantics) for template-only components. See RFC #278.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _TEMPLATE_ONLY_GLIMMER_COMPONENTS
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _TEMPLATE_ONLY_GLIMMER_COMPONENTS: false,

    /**
      Whether to perform extra bookkeeping needed to make the `captureRenderTree`
      API work.
         This has to be set before the ember JavaScript code is evaluated. This is
      usually done by setting `window.EmberENV = { _DEBUG_RENDER_TREE: true };`
      or `window.ENV = { _DEBUG_RENDER_TREE: true };` before the "vendor"
      `<script>` tag in `index.html`.
         Setting the flag after Ember is already loaded will not work correctly. It
      may appear to work somewhat, but fundamentally broken.
         This is not intended to be set directly. Ember Inspector will enable the
      flag on behalf of the user as needed.
         This flag is always on in development mode.
         The flag is off by default in production mode, due to the cost associated
      with the the bookkeeping work.
         The expected flow is that Ember Inspector will ask the user to refresh the
      page after enabling the feature. It could also offer a feature where the
      user add some domains to the "always on" list. In either case, Ember
      Inspector will inject the code on the page to set the flag if needed.
         @property _DEBUG_RENDER_TREE
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _DEBUG_RENDER_TREE: true
    /* DEBUG */
    ,

    /**
      Whether the app is using jQuery. See RFC #294.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _JQUERY_INTEGRATION
      @for EmberENV
      @type Boolean
      @default true
      @private
    */
    _JQUERY_INTEGRATION: true,

    /**
      Whether the app defaults to using async observers.
         This is not intended to be set directly, as the implementation may change in
      the future. Use `@ember/optional-features` instead.
         @property _DEFAULT_ASYNC_OBSERVERS
      @for EmberENV
      @type Boolean
      @default false
      @private
    */
    _DEFAULT_ASYNC_OBSERVERS: false,

    /**
      Controls the maximum number of scheduled rerenders without "settling". In general,
      applications should not need to modify this environment variable, but please
      open an issue so that we can determine if a better default value is needed.
         @property _RERENDER_LOOP_LIMIT
      @for EmberENV
      @type number
      @default 1000
      @private
     */
    _RERENDER_LOOP_LIMIT: 1000,
    EMBER_LOAD_HOOKS: {},
    FEATURES: {}
  };
  _exports.ENV = ENV;
  var providedEnv = global$1.EmberENV;

  if (providedEnv === undefined) {
    providedEnv = global$1.ENV;
    (true && !(providedEnv === undefined) && (0, _debug.deprecate)("Configuring Ember's boot options via `window.ENV` is deprecated, please migrate to `window.EmberENV` instead.", providedEnv === undefined, {
      id: 'ember-environment.window.env',
      until: '3.17.0'
    }));
  }

  (function (EmberENV) {
    if (typeof EmberENV !== 'object' || EmberENV === null) return;

    for (var flag in EmberENV) {
      if (!EmberENV.hasOwnProperty(flag) || flag === 'EXTEND_PROTOTYPES' || flag === 'EMBER_LOAD_HOOKS') continue;
      var defaultValue = ENV[flag];

      if (defaultValue === true) {
        ENV[flag] = EmberENV[flag] !== false;
      } else if (defaultValue === false) {
        ENV[flag] = EmberENV[flag] === true;
      }
    }

    var EXTEND_PROTOTYPES = EmberENV.EXTEND_PROTOTYPES;

    if (EXTEND_PROTOTYPES !== undefined) {
      if (typeof EXTEND_PROTOTYPES === 'object' && EXTEND_PROTOTYPES !== null) {
        ENV.EXTEND_PROTOTYPES.String = EXTEND_PROTOTYPES.String !== false;

        if (_deprecatedFeatures.FUNCTION_PROTOTYPE_EXTENSIONS) {
          ENV.EXTEND_PROTOTYPES.Function = EXTEND_PROTOTYPES.Function !== false;
        }

        ENV.EXTEND_PROTOTYPES.Array = EXTEND_PROTOTYPES.Array !== false;
      } else {
        var isEnabled = EXTEND_PROTOTYPES !== false;
        ENV.EXTEND_PROTOTYPES.String = isEnabled;

        if (_deprecatedFeatures.FUNCTION_PROTOTYPE_EXTENSIONS) {
          ENV.EXTEND_PROTOTYPES.Function = isEnabled;
        }

        ENV.EXTEND_PROTOTYPES.Array = isEnabled;
      }
    } // TODO this does not seem to be used by anything,
    //      can we remove it? do we need to deprecate it?


    var EMBER_LOAD_HOOKS = EmberENV.EMBER_LOAD_HOOKS;

    if (typeof EMBER_LOAD_HOOKS === 'object' && EMBER_LOAD_HOOKS !== null) {
      for (var hookName in EMBER_LOAD_HOOKS) {
        if (!EMBER_LOAD_HOOKS.hasOwnProperty(hookName)) continue;
        var hooks = EMBER_LOAD_HOOKS[hookName];

        if (Array.isArray(hooks)) {
          ENV.EMBER_LOAD_HOOKS[hookName] = hooks.filter(function (hook) {
            return typeof hook === 'function';
          });
        }
      }
    }

    var FEATURES = EmberENV.FEATURES;

    if (typeof FEATURES === 'object' && FEATURES !== null) {
      for (var feature in FEATURES) {
        if (!FEATURES.hasOwnProperty(feature)) continue;
        ENV.FEATURES[feature] = FEATURES[feature] === true;
      }
    }

    if (true
    /* DEBUG */
    ) {
      ENV._DEBUG_RENDER_TREE = true;
    }
  })(providedEnv);

  function getENV() {
    return ENV;
  }
});
define("@ember/-internals/utils/index", ["exports", "@ember/polyfills", "@ember/debug"], function (_exports, _polyfills, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.symbol = symbol;
  _exports.isInternalSymbol = isInternalSymbol;
  _exports.dictionary = makeDictionary;
  _exports.uuid = uuid;
  _exports.generateGuid = generateGuid;
  _exports.guidFor = guidFor;
  _exports.intern = intern;
  _exports.wrap = wrap;
  _exports.getObservers = getObservers;
  _exports.getListeners = getListeners;
  _exports.setObservers = setObservers;
  _exports.setListeners = setListeners;
  _exports.inspect = inspect;
  _exports.lookupDescriptor = lookupDescriptor;
  _exports.canInvoke = canInvoke;
  _exports.tryInvoke = tryInvoke;
  _exports.makeArray = makeArray;
  _exports.getName = getName;
  _exports.setName = setName;
  _exports.toString = toString;
  _exports.isProxy = isProxy;
  _exports.setProxy = setProxy;
  _exports.isEmberArray = isEmberArray;
  _exports.setWithMandatorySetter = _exports.teardownMandatorySetter = _exports.setupMandatorySetter = _exports.EMBER_ARRAY = _exports.Cache = _exports.HAS_NATIVE_PROXY = _exports.HAS_NATIVE_SYMBOL = _exports.ROOT = _exports.checkHasSuper = _exports.GUID_KEY = _exports.getOwnPropertyDescriptors = _exports.getDebugName = void 0;

  /**
    Strongly hint runtimes to intern the provided string.
  
    When do I need to use this function?
  
    For the most part, never. Pre-mature optimization is bad, and often the
    runtime does exactly what you need it to, and more often the trade-off isn't
    worth it.
  
    Why?
  
    Runtimes store strings in at least 2 different representations:
    Ropes and Symbols (interned strings). The Rope provides a memory efficient
    data-structure for strings created from concatenation or some other string
    manipulation like splitting.
  
    Unfortunately checking equality of different ropes can be quite costly as
    runtimes must resort to clever string comparison algorithms. These
    algorithms typically cost in proportion to the length of the string.
    Luckily, this is where the Symbols (interned strings) shine. As Symbols are
    unique by their string content, equality checks can be done by pointer
    comparison.
  
    How do I know if my string is a rope or symbol?
  
    Typically (warning general sweeping statement, but truthy in runtimes at
    present) static strings created as part of the JS source are interned.
    Strings often used for comparisons can be interned at runtime if some
    criteria are met.  One of these criteria can be the size of the entire rope.
    For example, in chrome 38 a rope longer then 12 characters will not
    intern, nor will segments of that rope.
  
    Some numbers: http://jsperf.com/eval-vs-keys/8
  
    Known Trick™
  
    @private
    @return {String} interned version of the provided string
  */
  function intern(str) {
    var obj = {};
    obj[str] = 1;

    for (var key in obj) {
      if (key === str) {
        return key;
      }
    }

    return str;
  }
  /**
    Returns whether Type(value) is Object.
  
    Useful for checking whether a value is a valid WeakMap key.
  
    Refs: https://tc39.github.io/ecma262/#sec-typeof-operator-runtime-semantics-evaluation
          https://tc39.github.io/ecma262/#sec-weakmap.prototype.set
  
    @private
    @function isObject
  */


  function isObject(value) {
    return value !== null && (typeof value === 'object' || typeof value === 'function');
  }
  /**
   @module @ember/object
  */

  /**
   Previously we used `Ember.$.uuid`, however `$.uuid` has been removed from
   jQuery master. We'll just bootstrap our own uuid now.
  
   @private
   @return {Number} the uuid
   */


  var _uuid = 0;
  /**
   Generates a universally unique identifier. This method
   is used internally by Ember for assisting with
   the generation of GUID's and other unique identifiers.
  
   @public
   @return {Number} [description]
   */

  function uuid() {
    return ++_uuid;
  }
  /**
   Prefix used for guids through out Ember.
   @private
   @property GUID_PREFIX
   @for Ember
   @type String
   @final
   */


  var GUID_PREFIX = 'ember'; // Used for guid generation...

  var OBJECT_GUIDS = new WeakMap();
  var NON_OBJECT_GUIDS = new Map();
  /**
    A unique key used to assign guids and other private metadata to objects.
    If you inspect an object in your browser debugger you will often see these.
    They can be safely ignored.
  
    On browsers that support it, these properties are added with enumeration
    disabled so they won't show up when you iterate over your properties.
  
    @private
    @property GUID_KEY
    @for Ember
    @type String
    @final
  */

  var GUID_KEY = intern("__ember" + Date.now());
  /**
    Generates a new guid, optionally saving the guid to the object that you
    pass in. You will rarely need to use this method. Instead you should
    call `guidFor(obj)`, which return an existing guid if available.
  
    @private
    @method generateGuid
    @static
    @for @ember/object/internals
    @param {Object} [obj] Object the guid will be used for. If passed in, the guid will
      be saved on the object and reused whenever you pass the same object
      again.
  
      If no object is passed, just generate a new guid.
    @param {String} [prefix] Prefix to place in front of the guid. Useful when you want to
      separate the guid into separate namespaces.
    @return {String} the guid
  */

  _exports.GUID_KEY = GUID_KEY;

  function generateGuid(obj, prefix) {
    if (prefix === void 0) {
      prefix = GUID_PREFIX;
    }

    var guid = prefix + uuid();

    if (isObject(obj)) {
      OBJECT_GUIDS.set(obj, guid);
    }

    return guid;
  }
  /**
    Returns a unique id for the object. If the object does not yet have a guid,
    one will be assigned to it. You can call this on any object,
    `EmberObject`-based or not.
  
    You can also use this method on DOM Element objects.
  
    @public
    @static
    @method guidFor
    @for @ember/object/internals
    @param {Object} obj any object, string, number, Element, or primitive
    @return {String} the unique guid for this instance.
  */


  function guidFor(value) {
    var guid;

    if (isObject(value)) {
      guid = OBJECT_GUIDS.get(value);

      if (guid === undefined) {
        guid = GUID_PREFIX + uuid();
        OBJECT_GUIDS.set(value, guid);
      }
    } else {
      guid = NON_OBJECT_GUIDS.get(value);

      if (guid === undefined) {
        var type = typeof value;

        if (type === 'string') {
          guid = 'st' + uuid();
        } else if (type === 'number') {
          guid = 'nu' + uuid();
        } else if (type === 'symbol') {
          guid = 'sy' + uuid();
        } else {
          guid = '(' + value + ')';
        }

        NON_OBJECT_GUIDS.set(value, guid);
      }
    }

    return guid;
  }

  var GENERATED_SYMBOLS = [];

  function isInternalSymbol(possibleSymbol) {
    return GENERATED_SYMBOLS.indexOf(possibleSymbol) !== -1;
  }

  function symbol(debugName) {
    // TODO: Investigate using platform symbols, but we do not
    // want to require non-enumerability for this API, which
    // would introduce a large cost.
    var id = GUID_KEY + Math.floor(Math.random() * Date.now());
    var symbol = intern("__" + debugName + id + "__");
    GENERATED_SYMBOLS.push(symbol);
    return symbol;
  } // the delete is meant to hint at runtimes that this object should remain in
  // dictionary mode. This is clearly a runtime specific hack, but currently it
  // appears worthwhile in some usecases. Please note, these deletes do increase
  // the cost of creation dramatically over a plain Object.create. And as this
  // only makes sense for long-lived dictionaries that aren't instantiated often.


  function makeDictionary(parent) {
    var dict = Object.create(parent);
    dict['_dict'] = null;
    delete dict['_dict'];
    return dict;
  }

  var getDebugName;

  if (true
  /* DEBUG */
  ) {
    var getFunctionName = function getFunctionName(fn) {
      var functionName = fn.name;

      if (functionName === undefined) {
        var match = Function.prototype.toString.call(fn).match(/function (\w+)\s*\(/);
        functionName = match && match[1] || '';
      }

      return functionName;
    };

    var getObjectName = function getObjectName(obj) {
      var name;
      var className;

      if (obj.constructor && obj.constructor !== Object) {
        className = getFunctionName(obj.constructor);
      }

      if ('toString' in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
        name = obj.toString();
      } // If the class has a decent looking name, and the `toString` is one of the
      // default Ember toStrings, replace the constructor portion of the toString
      // with the class name. We check the length of the class name to prevent doing
      // this when the value is minified.


      if (name && name.match(/<.*:ember\d+>/) && className && className[0] !== '_' && className.length > 2 && className !== 'Class') {
        return name.replace(/<.*:/, "<" + className + ":");
      }

      return name || className;
    };

    var getPrimitiveName = function getPrimitiveName(value) {
      return String(value);
    };

    getDebugName = function getDebugName(value) {
      if (typeof value === 'function') {
        return getFunctionName(value) || "(unknown function)";
      } else if (typeof value === 'object' && value !== null) {
        return getObjectName(value) || "(unknown object)";
      } else {
        return getPrimitiveName(value);
      }
    };
  }

  var getDebugName$1 = getDebugName;
  _exports.getDebugName = getDebugName$1;
  var getOwnPropertyDescriptors;

  if (Object.getOwnPropertyDescriptors !== undefined) {
    getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors;
  } else {
    getOwnPropertyDescriptors = function getOwnPropertyDescriptors(obj) {
      var descriptors = {};
      Object.keys(obj).forEach(function (key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(obj, key);
      });
      return descriptors;
    };
  }

  var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;
  _exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;
  var HAS_SUPER_PATTERN = /\.(_super|call\(this|apply\(this)/;
  var fnToString = Function.prototype.toString;

  var checkHasSuper = function () {
    var sourceAvailable = fnToString.call(function () {
      return this;
    }).indexOf('return this') > -1;

    if (sourceAvailable) {
      return function checkHasSuper(func) {
        return HAS_SUPER_PATTERN.test(fnToString.call(func));
      };
    }

    return function checkHasSuper() {
      return true;
    };
  }();

  _exports.checkHasSuper = checkHasSuper;
  var HAS_SUPER_MAP = new WeakMap();
  var ROOT = Object.freeze(function () {});
  _exports.ROOT = ROOT;
  HAS_SUPER_MAP.set(ROOT, false);

  function hasSuper(func) {
    var hasSuper = HAS_SUPER_MAP.get(func);

    if (hasSuper === undefined) {
      hasSuper = checkHasSuper(func);
      HAS_SUPER_MAP.set(func, hasSuper);
    }

    return hasSuper;
  }

  var OBSERVERS_MAP = new WeakMap();

  function setObservers(func, observers) {
    OBSERVERS_MAP.set(func, observers);
  }

  function getObservers(func) {
    return OBSERVERS_MAP.get(func);
  }

  var LISTENERS_MAP = new WeakMap();

  function setListeners(func, listeners) {
    if (listeners) {
      LISTENERS_MAP.set(func, listeners);
    }
  }

  function getListeners(func) {
    return LISTENERS_MAP.get(func);
  }

  var IS_WRAPPED_FUNCTION_SET = new _polyfills._WeakSet();
  /**
    Wraps the passed function so that `this._super` will point to the superFunc
    when the function is invoked. This is the primitive we use to implement
    calls to super.
  
    @private
    @method wrap
    @for Ember
    @param {Function} func The function to call
    @param {Function} superFunc The super function.
    @return {Function} wrapped function.
  */

  function wrap(func, superFunc) {
    if (!hasSuper(func)) {
      return func;
    } // ensure an unwrapped super that calls _super is wrapped with a terminal _super


    if (!IS_WRAPPED_FUNCTION_SET.has(superFunc) && hasSuper(superFunc)) {
      return _wrap(func, _wrap(superFunc, ROOT));
    }

    return _wrap(func, superFunc);
  }

  function _wrap(func, superFunc) {
    function superWrapper() {
      var orig = this._super;
      this._super = superFunc;
      var ret = func.apply(this, arguments);
      this._super = orig;
      return ret;
    }

    IS_WRAPPED_FUNCTION_SET.add(superWrapper);
    setObservers(superWrapper, getObservers(func));
    setListeners(superWrapper, getListeners(func));
    return superWrapper;
  }

  var objectToString = Object.prototype.toString;
  var functionToString = Function.prototype.toString;
  var isArray = Array.isArray;
  var objectKeys = Object.keys;
  var stringify = JSON.stringify;
  var LIST_LIMIT = 100;
  var DEPTH_LIMIT = 4;
  var SAFE_KEY = /^[\w$]+$/;
  /**
   @module @ember/debug
  */

  /**
    Convenience method to inspect an object. This method will attempt to
    convert the object into a useful string description.
  
    It is a pretty simple implementation. If you want something more robust,
    use something like JSDump: https://github.com/NV/jsDump
  
    @method inspect
    @static
    @param {Object} obj The object you want to inspect.
    @return {String} A description of the object
    @since 1.4.0
    @private
  */

  function inspect(obj) {
    // detect Node util.inspect call inspect(depth: number, opts: object)
    if (typeof obj === 'number' && arguments.length === 2) {
      return this;
    }

    return inspectValue(obj, 0);
  }

  function inspectValue(value, depth, seen) {
    var valueIsArray = false;

    switch (typeof value) {
      case 'undefined':
        return 'undefined';

      case 'object':
        if (value === null) return 'null';

        if (isArray(value)) {
          valueIsArray = true;
          break;
        } // is toString Object.prototype.toString or undefined then traverse


        if (value.toString === objectToString || value.toString === undefined) {
          break;
        } // custom toString


        return value.toString();

      case 'function':
        return value.toString === functionToString ? value.name ? "[Function:" + value.name + "]" : "[Function]" : value.toString();

      case 'string':
        return stringify(value);

      case 'symbol':
      case 'boolean':
      case 'number':
      default:
        return value.toString();
    }

    if (seen === undefined) {
      seen = new _polyfills._WeakSet();
    } else {
      if (seen.has(value)) return "[Circular]";
    }

    seen.add(value);
    return valueIsArray ? inspectArray(value, depth + 1, seen) : inspectObject(value, depth + 1, seen);
  }

  function inspectKey(key) {
    return SAFE_KEY.test(key) ? key : stringify(key);
  }

  function inspectObject(obj, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Object]';
    }

    var s = '{';
    var keys = objectKeys(obj);

    for (var i = 0; i < keys.length; i++) {
      s += i === 0 ? ' ' : ', ';

      if (i >= LIST_LIMIT) {
        s += "... " + (keys.length - LIST_LIMIT) + " more keys";
        break;
      }

      var key = keys[i];
      s += inspectKey(key) + ': ' + inspectValue(obj[key], depth, seen);
    }

    s += ' }';
    return s;
  }

  function inspectArray(arr, depth, seen) {
    if (depth > DEPTH_LIMIT) {
      return '[Array]';
    }

    var s = '[';

    for (var i = 0; i < arr.length; i++) {
      s += i === 0 ? ' ' : ', ';

      if (i >= LIST_LIMIT) {
        s += "... " + (arr.length - LIST_LIMIT) + " more items";
        break;
      }

      s += inspectValue(arr[i], depth, seen);
    }

    s += ' ]';
    return s;
  }

  function lookupDescriptor(obj, keyName) {
    var current = obj;

    do {
      var descriptor = Object.getOwnPropertyDescriptor(current, keyName);

      if (descriptor !== undefined) {
        return descriptor;
      }

      current = Object.getPrototypeOf(current);
    } while (current !== null);

    return null;
  }
  /**
    Checks to see if the `methodName` exists on the `obj`.
  
    ```javascript
    let foo = { bar: function() { return 'bar'; }, baz: null };
  
    Ember.canInvoke(foo, 'bar'); // true
    Ember.canInvoke(foo, 'baz'); // false
    Ember.canInvoke(foo, 'bat'); // false
    ```
  
    @method canInvoke
    @for Ember
    @param {Object} obj The object to check for the method
    @param {String} methodName The method name to check for
    @return {Boolean}
    @private
  */


  function canInvoke(obj, methodName) {
    return obj !== null && obj !== undefined && typeof obj[methodName] === 'function';
  }
  /**
    @module @ember/utils
  */

  /**
    Checks to see if the `methodName` exists on the `obj`,
    and if it does, invokes it with the arguments passed.
  
    ```javascript
    import { tryInvoke } from '@ember/utils';
  
    let d = new Date('03/15/2013');
  
    tryInvoke(d, 'getTime');              // 1363320000000
    tryInvoke(d, 'setFullYear', [2014]);  // 1394856000000
    tryInvoke(d, 'noSuchMethod', [2014]); // undefined
    ```
  
    @method tryInvoke
    @for @ember/utils
    @static
    @param {Object} obj The object to check for the method
    @param {String} methodName The method name to check for
    @param {Array} [args] The arguments to pass to the method
    @return {*} the return value of the invoked method or undefined if it cannot be invoked
    @public
  */


  function tryInvoke(obj, methodName, args) {
    if (canInvoke(obj, methodName)) {
      var method = obj[methodName];
      return method.apply(obj, args);
    }
  }

  var isArray$1 = Array.isArray;

  function makeArray(obj) {
    if (obj === null || obj === undefined) {
      return [];
    }

    return isArray$1(obj) ? obj : [obj];
  }

  var NAMES = new WeakMap();

  function setName(obj, name) {
    if (isObject(obj)) NAMES.set(obj, name);
  }

  function getName(obj) {
    return NAMES.get(obj);
  }

  var objectToString$1 = Object.prototype.toString;

  function isNone(obj) {
    return obj === null || obj === undefined;
  }
  /*
   A `toString` util function that supports objects without a `toString`
   method, e.g. an object created with `Object.create(null)`.
  */


  function toString(obj) {
    if (typeof obj === 'string') {
      return obj;
    }

    if (null === obj) return 'null';
    if (undefined === obj) return 'undefined';

    if (Array.isArray(obj)) {
      // Reimplement Array.prototype.join according to spec (22.1.3.13)
      // Changing ToString(element) with this safe version of ToString.
      var r = '';

      for (var k = 0; k < obj.length; k++) {
        if (k > 0) {
          r += ',';
        }

        if (!isNone(obj[k])) {
          r += toString(obj[k]);
        }
      }

      return r;
    }

    if (typeof obj.toString === 'function') {
      return obj.toString();
    }

    return objectToString$1.call(obj);
  }

  var HAS_NATIVE_SYMBOL = function () {
    if (typeof Symbol !== 'function') {
      return false;
    }

    return typeof Symbol() === 'symbol';
  }();

  _exports.HAS_NATIVE_SYMBOL = HAS_NATIVE_SYMBOL;
  var HAS_NATIVE_PROXY = typeof Proxy === 'function';
  _exports.HAS_NATIVE_PROXY = HAS_NATIVE_PROXY;
  var PROXIES = new _polyfills._WeakSet();

  function isProxy(value) {
    if (isObject(value)) {
      return PROXIES.has(value);
    }

    return false;
  }

  function setProxy(object) {
    if (isObject(object)) {
      PROXIES.add(object);
    }
  }

  var Cache =
  /*#__PURE__*/
  function () {
    function Cache(limit, func, store) {
      this.limit = limit;
      this.func = func;
      this.store = store;
      this.size = 0;
      this.misses = 0;
      this.hits = 0;
      this.store = store || new Map();
    }

    var _proto = Cache.prototype;

    _proto.get = function get(key) {
      if (this.store.has(key)) {
        this.hits++;
        return this.store.get(key);
      } else {
        this.misses++;
        return this.set(key, this.func(key));
      }
    };

    _proto.set = function set(key, value) {
      if (this.limit > this.size) {
        this.size++;
        this.store.set(key, value);
      }

      return value;
    };

    _proto.purge = function purge() {
      this.store.clear();
      this.size = 0;
      this.hits = 0;
      this.misses = 0;
    };

    return Cache;
  }();

  _exports.Cache = Cache;
  var EMBER_ARRAY = symbol('EMBER_ARRAY');
  _exports.EMBER_ARRAY = EMBER_ARRAY;

  function isEmberArray(obj) {
    return obj && obj[EMBER_ARRAY];
  }

  var setupMandatorySetter;
  _exports.setupMandatorySetter = setupMandatorySetter;
  var teardownMandatorySetter;
  _exports.teardownMandatorySetter = teardownMandatorySetter;
  var setWithMandatorySetter;
  _exports.setWithMandatorySetter = setWithMandatorySetter;

  if (true
  /* DEBUG */
  && true
  /* EMBER_METAL_TRACKED_PROPERTIES */
  ) {
      var MANDATORY_SETTERS = new WeakMap();

      var _propertyIsEnumerable = function _propertyIsEnumerable(obj, key) {
        return Object.prototype.propertyIsEnumerable.call(obj, key);
      };

      _exports.setupMandatorySetter = setupMandatorySetter = function setupMandatorySetter(obj, keyName) {
        var desc = lookupDescriptor(obj, keyName) || {};

        if (desc.get || desc.set) {
          // if it has a getter or setter, we can't install the mandatory setter.
          // native setters are allowed, we have to assume that they will resolve
          // to tracked properties.
          return;
        }

        if (desc && (!desc.configurable || !desc.writable)) {
          // if it isn't writable anyways, so we shouldn't provide the setter.
          // if it isn't configurable, we can't overwrite it anyways.
          return;
        }

        var setters = MANDATORY_SETTERS.get(obj);

        if (setters === undefined) {
          setters = {};
          MANDATORY_SETTERS.set(obj, setters);
        }

        desc.hadOwnProperty = Object.hasOwnProperty.call(obj, keyName);
        setters[keyName] = desc;
        Object.defineProperty(obj, keyName, {
          configurable: true,
          enumerable: _propertyIsEnumerable(obj, keyName),
          get: function get() {
            if (desc.get) {
              return desc.get.call(this);
            } else {
              return desc.value;
            }
          },
          set: function set(value) {
            (true && !(false) && (0, _debug.assert)("You attempted to update " + this + "." + String(keyName) + " to \"" + String(value) + "\", but it is being tracked by a tracking context, such as a template, computed property, or observer. In order to make sure the context updates properly, you must invalidate the property when updating it. You can mark the property as `@tracked`, or use `@ember/object#set` to do this."));
          }
        });
      };

      _exports.teardownMandatorySetter = teardownMandatorySetter = function teardownMandatorySetter(obj, keyName) {
        var setters = MANDATORY_SETTERS.get(obj);

        if (setters !== undefined && setters[keyName] !== undefined) {
          Object.defineProperty(obj, keyName, setters[keyName]);
          setters[keyName] = undefined;
        }
      };

      _exports.setWithMandatorySetter = setWithMandatorySetter = function setWithMandatorySetter(obj, keyName, value) {
        var setters = MANDATORY_SETTERS.get(obj);

        if (setters !== undefined && setters[keyName] !== undefined) {
          var setter = setters[keyName];

          if (setter.set) {
            setter.set.call(obj, value);
          } else {
            setter.value = value; // If the object didn't have own property before, it would have changed
            // the enumerability after setting the value the first time.

            if (!setter.hadOwnProperty) {
              var desc = lookupDescriptor(obj, keyName);
              desc.enumerable = true;
              Object.defineProperty(obj, keyName, desc);
            }
          }
        } else {
          obj[keyName] = value;
        }
      };
    }
  /*
   This package will be eagerly parsed and should have no dependencies on external
   packages.
  
   It is intended to be used to share utility methods that will be needed
   by every Ember application (and is **not** a dumping ground of useful utilities).
  
   Utility methods that are needed in < 80% of cases should be placed
   elsewhere (so they can be lazily evaluated / parsed).
  */

});
define("@ember/canary-features/index", ["exports", "@ember/-internals/environment", "@ember/polyfills"], function (_exports, _environment, _polyfills) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isEnabled = isEnabled;
  _exports.EMBER_ROUTING_MODEL_ARG = _exports.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE = _exports.EMBER_CUSTOM_COMPONENT_ARG_PROXY = _exports.EMBER_METAL_TRACKED_PROPERTIES = _exports.EMBER_MODULE_UNIFICATION = _exports.EMBER_IMPROVED_INSTRUMENTATION = _exports.EMBER_LIBRARIES_ISREGISTERED = _exports.FEATURES = _exports.DEFAULT_FEATURES = void 0;

  /**
    Set `EmberENV.FEATURES` in your application's `config/environment.js` file
    to enable canary features in your application.
  
    See the [feature flag guide](https://guides.emberjs.com/release/configuring-ember/feature-flags/)
    for more details.
  
    @module @ember/canary-features
    @public
  */
  var DEFAULT_FEATURES = {
    EMBER_LIBRARIES_ISREGISTERED: false,
    EMBER_IMPROVED_INSTRUMENTATION: false,
    EMBER_MODULE_UNIFICATION: false,
    EMBER_METAL_TRACKED_PROPERTIES: true,
    EMBER_CUSTOM_COMPONENT_ARG_PROXY: true,
    EMBER_GLIMMER_SET_COMPONENT_TEMPLATE: true,
    EMBER_ROUTING_MODEL_ARG: true
  };
  /**
    The hash of enabled Canary features. Add to this, any canary features
    before creating your application.
  
    @class FEATURES
    @static
    @since 1.1.0
    @public
  */

  _exports.DEFAULT_FEATURES = DEFAULT_FEATURES;
  var FEATURES = (0, _polyfills.assign)(DEFAULT_FEATURES, _environment.ENV.FEATURES);
  /**
    Determine whether the specified `feature` is enabled. Used by Ember's
    build tools to exclude experimental features from beta/stable builds.
  
    You can define the following configuration options:
  
    * `EmberENV.ENABLE_OPTIONAL_FEATURES` - enable any features that have not been explicitly
      enabled/disabled.
  
    @method isEnabled
    @param {String} feature The feature to check
    @return {Boolean}
    @since 1.1.0
    @public
  */

  _exports.FEATURES = FEATURES;

  function isEnabled(feature) {
    var featureValue = FEATURES[feature];

    if (featureValue === true || featureValue === false) {
      return featureValue;
    } else if (_environment.ENV.ENABLE_OPTIONAL_FEATURES) {
      return true;
    } else {
      return false;
    }
  }

  function featureValue(value) {
    if (_environment.ENV.ENABLE_OPTIONAL_FEATURES && value === null) {
      return true;
    }

    return value;
  }

  var EMBER_LIBRARIES_ISREGISTERED = featureValue(FEATURES.EMBER_LIBRARIES_ISREGISTERED);
  _exports.EMBER_LIBRARIES_ISREGISTERED = EMBER_LIBRARIES_ISREGISTERED;
  var EMBER_IMPROVED_INSTRUMENTATION = featureValue(FEATURES.EMBER_IMPROVED_INSTRUMENTATION);
  _exports.EMBER_IMPROVED_INSTRUMENTATION = EMBER_IMPROVED_INSTRUMENTATION;
  var EMBER_MODULE_UNIFICATION = featureValue(FEATURES.EMBER_MODULE_UNIFICATION);
  _exports.EMBER_MODULE_UNIFICATION = EMBER_MODULE_UNIFICATION;
  var EMBER_METAL_TRACKED_PROPERTIES = featureValue(FEATURES.EMBER_METAL_TRACKED_PROPERTIES);
  _exports.EMBER_METAL_TRACKED_PROPERTIES = EMBER_METAL_TRACKED_PROPERTIES;
  var EMBER_CUSTOM_COMPONENT_ARG_PROXY = featureValue(FEATURES.EMBER_CUSTOM_COMPONENT_ARG_PROXY);
  _exports.EMBER_CUSTOM_COMPONENT_ARG_PROXY = EMBER_CUSTOM_COMPONENT_ARG_PROXY;
  var EMBER_GLIMMER_SET_COMPONENT_TEMPLATE = featureValue(FEATURES.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE);
  _exports.EMBER_GLIMMER_SET_COMPONENT_TEMPLATE = EMBER_GLIMMER_SET_COMPONENT_TEMPLATE;
  var EMBER_ROUTING_MODEL_ARG = featureValue(FEATURES.EMBER_ROUTING_MODEL_ARG);
  _exports.EMBER_ROUTING_MODEL_ARG = EMBER_ROUTING_MODEL_ARG;
});
define("@ember/debug/index", ["exports", "@ember/-internals/browser-environment", "@ember/error", "@ember/debug/lib/deprecate", "@ember/debug/lib/testing", "@ember/debug/lib/warn", "@ember/debug/lib/capture-render-tree"], function (_exports, _browserEnvironment, _error, _deprecate2, _testing, _warn2, _captureRenderTree) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "registerDeprecationHandler", {
    enumerable: true,
    get: function get() {
      return _deprecate2.registerHandler;
    }
  });
  Object.defineProperty(_exports, "isTesting", {
    enumerable: true,
    get: function get() {
      return _testing.isTesting;
    }
  });
  Object.defineProperty(_exports, "setTesting", {
    enumerable: true,
    get: function get() {
      return _testing.setTesting;
    }
  });
  Object.defineProperty(_exports, "registerWarnHandler", {
    enumerable: true,
    get: function get() {
      return _warn2.registerHandler;
    }
  });
  Object.defineProperty(_exports, "captureRenderTree", {
    enumerable: true,
    get: function get() {
      return _captureRenderTree.default;
    }
  });
  _exports._warnIfUsingStrippedFeatureFlags = _exports.getDebugFunction = _exports.setDebugFunction = _exports.deprecateFunc = _exports.runInDebug = _exports.debugFreeze = _exports.debugSeal = _exports.deprecate = _exports.debug = _exports.warn = _exports.info = _exports.assert = void 0;

  // These are the default production build versions:
  var noop = function noop() {};

  var assert = noop;
  _exports.assert = assert;
  var info = noop;
  _exports.info = info;
  var warn = noop;
  _exports.warn = warn;
  var debug = noop;
  _exports.debug = debug;
  var deprecate = noop;
  _exports.deprecate = deprecate;
  var debugSeal = noop;
  _exports.debugSeal = debugSeal;
  var debugFreeze = noop;
  _exports.debugFreeze = debugFreeze;
  var runInDebug = noop;
  _exports.runInDebug = runInDebug;
  var setDebugFunction = noop;
  _exports.setDebugFunction = setDebugFunction;
  var getDebugFunction = noop;
  _exports.getDebugFunction = getDebugFunction;

  var deprecateFunc = function deprecateFunc() {
    return arguments[arguments.length - 1];
  };

  _exports.deprecateFunc = deprecateFunc;

  if (true
  /* DEBUG */
  ) {
    _exports.setDebugFunction = setDebugFunction = function setDebugFunction(type, callback) {
      switch (type) {
        case 'assert':
          return _exports.assert = assert = callback;

        case 'info':
          return _exports.info = info = callback;

        case 'warn':
          return _exports.warn = warn = callback;

        case 'debug':
          return _exports.debug = debug = callback;

        case 'deprecate':
          return _exports.deprecate = deprecate = callback;

        case 'debugSeal':
          return _exports.debugSeal = debugSeal = callback;

        case 'debugFreeze':
          return _exports.debugFreeze = debugFreeze = callback;

        case 'runInDebug':
          return _exports.runInDebug = runInDebug = callback;

        case 'deprecateFunc':
          return _exports.deprecateFunc = deprecateFunc = callback;
      }
    };

    _exports.getDebugFunction = getDebugFunction = function getDebugFunction(type) {
      switch (type) {
        case 'assert':
          return assert;

        case 'info':
          return info;

        case 'warn':
          return warn;

        case 'debug':
          return debug;

        case 'deprecate':
          return deprecate;

        case 'debugSeal':
          return debugSeal;

        case 'debugFreeze':
          return debugFreeze;

        case 'runInDebug':
          return runInDebug;

        case 'deprecateFunc':
          return deprecateFunc;
      }
    };
  }
  /**
  @module @ember/debug
  */


  if (true
  /* DEBUG */
  ) {
    /**
      Verify that a certain expectation is met, or throw a exception otherwise.
         This is useful for communicating assumptions in the code to other human
      readers as well as catching bugs that accidentally violates these
      expectations.
         Assertions are removed from production builds, so they can be freely added
      for documentation and debugging purposes without worries of incuring any
      performance penalty. However, because of that, they should not be used for
      checks that could reasonably fail during normal usage. Furthermore, care
      should be taken to avoid accidentally relying on side-effects produced from
      evaluating the condition itself, since the code will not run in production.
         ```javascript
      import { assert } from '@ember/debug';
         // Test for truthiness
      assert('Must pass a string', typeof str === 'string');
         // Fail unconditionally
      assert('This code path should never be run');
      ```
         @method assert
      @static
      @for @ember/debug
      @param {String} description Describes the expectation. This will become the
        text of the Error thrown if the assertion fails.
      @param {any} condition Must be truthy for the assertion to pass. If
        falsy, an exception will be thrown.
      @public
      @since 1.0.0
    */
    setDebugFunction('assert', function assert(desc, test) {
      if (!test) {
        throw new _error.default("Assertion Failed: " + desc);
      }
    });
    /**
      Display a debug notice.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import { debug } from '@ember/debug';
         debug('I\'m a debug notice!');
      ```
         @method debug
      @for @ember/debug
      @static
      @param {String} message A debug message to display.
      @public
    */

    setDebugFunction('debug', function debug(message) {
      /* eslint-disable no-console */
      if (console.debug) {
        console.debug("DEBUG: " + message);
      } else {
        console.log("DEBUG: " + message);
      }
      /* eslint-ensable no-console */

    });
    /**
      Display an info notice.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         @method info
      @private
    */

    setDebugFunction('info', function info() {
      var _console;

      (_console = console).info.apply(_console, arguments);
      /* eslint-disable-line no-console */

    });
    /**
     @module @ember/debug
     @public
    */

    /**
      Alias an old, deprecated method with its new counterpart.
         Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only) when the assigned method is called.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import { deprecateFunc } from '@ember/debug';
         Ember.oldMethod = deprecateFunc('Please use the new, updated method', options, Ember.newMethod);
      ```
         @method deprecateFunc
      @static
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Object} [options] The options object for `deprecate`.
      @param {Function} func The new function called to replace its deprecated counterpart.
      @return {Function} A new function that wraps the original function with a deprecation warning
      @private
    */

    setDebugFunction('deprecateFunc', function deprecateFunc() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (args.length === 3) {
        var message = args[0],
            options = args[1],
            func = args[2];
        return function () {
          deprecate(message, false, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return func.apply(this, args);
        };
      } else {
        var _message = args[0],
            _func = args[1];
        return function () {
          deprecate(_message);
          return _func.apply(this, arguments);
        };
      }
    });
    /**
     @module @ember/debug
     @public
    */

    /**
      Run a function meant for debugging.
         Calls to this function are removed from production builds, so they can be
      freely added for documentation and debugging purposes without worries of
      incuring any performance penalty.
         ```javascript
      import Component from '@ember/component';
      import { runInDebug } from '@ember/debug';
         runInDebug(() => {
        Component.reopen({
          didInsertElement() {
            console.log("I'm happy");
          }
        });
      });
      ```
         @method runInDebug
      @for @ember/debug
      @static
      @param {Function} func The function to be executed.
      @since 1.5.0
      @public
    */

    setDebugFunction('runInDebug', function runInDebug(func) {
      func();
    });
    setDebugFunction('debugSeal', function debugSeal(obj) {
      Object.seal(obj);
    });
    setDebugFunction('debugFreeze', function debugFreeze(obj) {
      // re-freezing an already frozen object introduces a significant
      // performance penalty on Chrome (tested through 59).
      //
      // See: https://bugs.chromium.org/p/v8/issues/detail?id=6450
      if (!Object.isFrozen(obj)) {
        Object.freeze(obj);
      }
    });
    setDebugFunction('deprecate', _deprecate2.default);
    setDebugFunction('warn', _warn2.default);
  }

  var _warnIfUsingStrippedFeatureFlags;

  _exports._warnIfUsingStrippedFeatureFlags = _warnIfUsingStrippedFeatureFlags;

  if (true
  /* DEBUG */
  && !(0, _testing.isTesting)()) {
    if (typeof window !== 'undefined' && (_browserEnvironment.isFirefox || _browserEnvironment.isChrome) && window.addEventListener) {
      window.addEventListener('load', function () {
        if (document.documentElement && document.documentElement.dataset && !document.documentElement.dataset.emberExtension) {
          var downloadURL;

          if (_browserEnvironment.isChrome) {
            downloadURL = 'https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi';
          } else if (_browserEnvironment.isFirefox) {
            downloadURL = 'https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/';
          }

          debug("For more advanced debugging, install the Ember Inspector from " + downloadURL);
        }
      }, false);
    }
  }
});
define("@ember/debug/lib/capture-render-tree", ["exports", "@glimmer/util"], function (_exports, _util) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = captureRenderTree;

  /**
    @module @ember/debug
  */

  /**
    Ember Inspector calls this function to capture the current render tree.
  
    In production mode, this requires turning on `ENV._DEBUG_RENDER_TREE`
    before loading Ember.
  
    @private
    @static
    @method captureRenderTree
    @for @ember/debug
    @param app {ApplicationInstance} An `ApplicationInstance`.
    @since 3.14.0
  */
  function captureRenderTree(app) {
    var env = (0, _util.expect)(app.lookup('service:-glimmer-environment'), 'BUG: owner is missing service:-glimmer-environment');
    return env.debugRenderTree.capture();
  }
});
define("@ember/debug/lib/deprecate", ["exports", "@ember/-internals/environment", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _environment, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.missingOptionsUntilDeprecation = _exports.missingOptionsIdDeprecation = _exports.missingOptionsDeprecation = _exports.registerHandler = _exports.default = void 0;

  /**
   @module @ember/debug
   @public
  */

  /**
    Allows for runtime registration of handler functions that override the default deprecation behavior.
    Deprecations are invoked by calls to [@ember/debug/deprecate](/ember/release/classes/@ember%2Fdebug/methods/deprecate?anchor=deprecate).
    The following example demonstrates its usage by registering a handler that throws an error if the
    message contains the word "should", otherwise defers to the default handler.
  
    ```javascript
    import { registerDeprecationHandler } from '@ember/debug';
  
    registerDeprecationHandler((message, options, next) => {
      if (message.indexOf('should') !== -1) {
        throw new Error(`Deprecation message with should: ${message}`);
      } else {
        // defer to whatever handler was registered before this one
        next(message, options);
      }
    });
    ```
  
    The handler function takes the following arguments:
  
    <ul>
      <li> <code>message</code> - The message received from the deprecation call.</li>
      <li> <code>options</code> - An object passed in with the deprecation call containing additional information including:</li>
        <ul>
          <li> <code>id</code> - An id of the deprecation in the form of <code>package-name.specific-deprecation</code>.</li>
          <li> <code>until</code> - The Ember version number the feature and deprecation will be removed in.</li>
        </ul>
      <li> <code>next</code> - A function that calls into the previously registered handler.</li>
    </ul>
  
    @public
    @static
    @method registerDeprecationHandler
    @for @ember/debug
    @param handler {Function} A function to handle deprecation calls.
    @since 2.1.0
  */
  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;
  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;
  var missingOptionsUntilDeprecation;
  _exports.missingOptionsUntilDeprecation = missingOptionsUntilDeprecation;

  var deprecate = function deprecate() {};

  if (true
  /* DEBUG */
  ) {
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('deprecate', handler);
    };

    var formatMessage = function formatMessage(_message, options) {
      var message = _message;

      if (options && options.id) {
        message = message + (" [deprecation id: " + options.id + "]");
      }

      if (options && options.url) {
        message += " See " + options.url + " for more details.";
      }

      return message;
    };

    registerHandler(function logDeprecationToConsole(message, options) {
      var updatedMessage = formatMessage(message, options);
      console.warn("DEPRECATION: " + updatedMessage); // eslint-disable-line no-console
    });
    var captureErrorForStack;

    if (new Error().stack) {
      captureErrorForStack = function captureErrorForStack() {
        return new Error();
      };
    } else {
      captureErrorForStack = function captureErrorForStack() {
        try {
          __fail__.fail();
        } catch (e) {
          return e;
        }
      };
    }

    registerHandler(function logDeprecationStackTrace(message, options, next) {
      if (_environment.ENV.LOG_STACKTRACE_ON_DEPRECATION) {
        var stackStr = '';
        var error = captureErrorForStack();
        var stack;

        if (error.stack) {
          if (error['arguments']) {
            // Chrome
            stack = error.stack.replace(/^\s+at\s+/gm, '').replace(/^([^\(]+?)([\n$])/gm, '{anonymous}($1)$2').replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}($1)').split('\n');
            stack.shift();
          } else {
            // Firefox
            stack = error.stack.replace(/(?:\n@:0)?\s+$/m, '').replace(/^\(/gm, '{anonymous}(').split('\n');
          }

          stackStr = "\n    " + stack.slice(2).join('\n    ');
        }

        var updatedMessage = formatMessage(message, options);
        console.warn("DEPRECATION: " + updatedMessage + stackStr); // eslint-disable-line no-console
      } else {
        next(message, options);
      }
    });
    registerHandler(function raiseOnDeprecation(message, options, next) {
      if (_environment.ENV.RAISE_ON_DEPRECATION) {
        var updatedMessage = formatMessage(message);
        throw new Error(updatedMessage);
      } else {
        next(message, options);
      }
    });
    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `deprecate` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include `id` and `until` properties.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `deprecate` you must provide `id` in options.';
    _exports.missingOptionsUntilDeprecation = missingOptionsUntilDeprecation = 'When calling `deprecate` you must provide `until` in options.';
    /**
     @module @ember/debug
     @public
     */

    /**
      Display a deprecation warning with the provided message and a stack trace
      (Chrome and Firefox only).
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         @method deprecate
      @for @ember/debug
      @param {String} message A description of the deprecation.
      @param {Boolean} test A boolean. If falsy, the deprecation will be displayed.
      @param {Object} options
      @param {String} options.id A unique id for this deprecation. The id can be
        used by Ember debugging tools to change the behavior (raise, log or silence)
        for that specific deprecation. The id should be namespaced by dots, e.g.
        "view.helper.select".
      @param {string} options.until The version of Ember when this deprecation
        warning will be removed.
      @param {String} [options.url] An optional url to the transition guide on the
        emberjs.com website.
      @static
      @public
      @since 1.0.0
    */

    deprecate = function deprecate(message, test, options) {
      (0, _index.assert)(missingOptionsDeprecation, Boolean(options && (options.id || options.until)));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options.id));
      (0, _index.assert)(missingOptionsUntilDeprecation, Boolean(options.until));
      (0, _handlers.invoke)('deprecate', message, test, options);
    };
  }

  var _default = deprecate;
  _exports.default = _default;
});
define("@ember/debug/lib/handlers", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.invoke = _exports.registerHandler = _exports.HANDLERS = void 0;
  var HANDLERS = {};
  _exports.HANDLERS = HANDLERS;

  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;

  var invoke = function invoke() {};

  _exports.invoke = invoke;

  if (true
  /* DEBUG */
  ) {
    _exports.registerHandler = registerHandler = function registerHandler(type, callback) {
      var nextHandler = HANDLERS[type] || function () {};

      HANDLERS[type] = function (message, options) {
        callback(message, options, nextHandler);
      };
    };

    _exports.invoke = invoke = function invoke(type, message, test, options) {
      if (test) {
        return;
      }

      var handlerForType = HANDLERS[type];

      if (handlerForType) {
        handlerForType(message, options);
      }
    };
  }
});
define("@ember/debug/lib/testing", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.isTesting = isTesting;
  _exports.setTesting = setTesting;
  var testing = false;

  function isTesting() {
    return testing;
  }

  function setTesting(value) {
    testing = Boolean(value);
  }
});
define("@ember/debug/lib/warn", ["exports", "@ember/debug/index", "@ember/debug/lib/handlers"], function (_exports, _index, _handlers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.missingOptionsDeprecation = _exports.missingOptionsIdDeprecation = _exports.registerHandler = _exports.default = void 0;

  var registerHandler = function registerHandler() {};

  _exports.registerHandler = registerHandler;

  var warn = function warn() {};

  var missingOptionsDeprecation;
  _exports.missingOptionsDeprecation = missingOptionsDeprecation;
  var missingOptionsIdDeprecation;
  /**
  @module @ember/debug
  */

  _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation;

  if (true
  /* DEBUG */
  ) {
    /**
      Allows for runtime registration of handler functions that override the default warning behavior.
      Warnings are invoked by calls made to [@ember/debug/warn](/ember/release/classes/@ember%2Fdebug/methods/warn?anchor=warn).
      The following example demonstrates its usage by registering a handler that does nothing overriding Ember's
      default warning behavior.
         ```javascript
      import { registerWarnHandler } from '@ember/debug';
         // next is not called, so no warnings get the default behavior
      registerWarnHandler(() => {});
      ```
         The handler function takes the following arguments:
         <ul>
        <li> <code>message</code> - The message received from the warn call. </li>
        <li> <code>options</code> - An object passed in with the warn call containing additional information including:</li>
          <ul>
            <li> <code>id</code> - An id of the warning in the form of <code>package-name.specific-warning</code>.</li>
          </ul>
        <li> <code>next</code> - A function that calls into the previously registered handler.</li>
      </ul>
         @public
      @static
      @method registerWarnHandler
      @for @ember/debug
      @param handler {Function} A function to handle warnings.
      @since 2.1.0
    */
    _exports.registerHandler = registerHandler = function registerHandler(handler) {
      (0, _handlers.registerHandler)('warn', handler);
    };

    registerHandler(function logWarning(message) {
      /* eslint-disable no-console */
      console.warn("WARNING: " + message);
      /* eslint-enable no-console */
    });
    _exports.missingOptionsDeprecation = missingOptionsDeprecation = 'When calling `warn` you ' + 'must provide an `options` hash as the third parameter.  ' + '`options` should include an `id` property.';
    _exports.missingOptionsIdDeprecation = missingOptionsIdDeprecation = 'When calling `warn` you must provide `id` in options.';
    /**
      Display a warning with the provided message.
         * In a production build, this method is defined as an empty function (NOP).
      Uses of this method in Ember itself are stripped from the ember.prod.js build.
         ```javascript
      import { warn } from '@ember/debug';
      import tomsterCount from './tomster-counter'; // a module in my project
         // Log a warning if we have more than 3 tomsters
      warn('Too many tomsters!', tomsterCount <= 3, {
        id: 'ember-debug.too-many-tomsters'
      });
      ```
         @method warn
      @for @ember/debug
      @static
      @param {String} message A warning to display.
      @param {Boolean} test An optional boolean. If falsy, the warning
        will be displayed.
      @param {Object} options An object that can be used to pass a unique
        `id` for this warning.  The `id` can be used by Ember debugging tools
        to change the behavior (raise, log, or silence) for that specific warning.
        The `id` should be namespaced by dots, e.g. "ember-debug.feature-flag-with-features-stripped"
      @public
      @since 1.0.0
    */

    warn = function warn(message, test, options) {
      if (arguments.length === 2 && typeof test === 'object') {
        options = test;
        test = false;
      }

      (0, _index.assert)(missingOptionsDeprecation, Boolean(options));
      (0, _index.assert)(missingOptionsIdDeprecation, Boolean(options && options.id));
      (0, _handlers.invoke)('warn', message, test, options);
    };
  }

  var _default = warn;
  _exports.default = _default;
});
define("@ember/deprecated-features/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.PARTIALS = _exports.EMBER_COMPONENT_IS_VISIBLE = _exports.MOUSE_ENTER_LEAVE_MOVE_EVENTS = _exports.FUNCTION_PROTOTYPE_EXTENSIONS = _exports.APP_CTRL_ROUTER_PROPS = _exports.ALIAS_METHOD = _exports.JQUERY_INTEGRATION = _exports.COMPONENT_MANAGER_STRING_LOOKUP = _exports.ROUTER_EVENTS = _exports.MERGE = _exports.LOGGER = _exports.EMBER_EXTEND_PROTOTYPES = _exports.SEND_ACTION = void 0;

  /* eslint-disable no-implicit-coercion */
  // These versions should be the version that the deprecation was _introduced_,
  // not the version that the feature will be removed.
  var SEND_ACTION = !!'3.4.0';
  _exports.SEND_ACTION = SEND_ACTION;
  var EMBER_EXTEND_PROTOTYPES = !!'3.2.0-beta.5';
  _exports.EMBER_EXTEND_PROTOTYPES = EMBER_EXTEND_PROTOTYPES;
  var LOGGER = !!'3.2.0-beta.1';
  _exports.LOGGER = LOGGER;
  var MERGE = !!'3.6.0-beta.1';
  _exports.MERGE = MERGE;
  var ROUTER_EVENTS = !!'4.0.0';
  _exports.ROUTER_EVENTS = ROUTER_EVENTS;
  var COMPONENT_MANAGER_STRING_LOOKUP = !!'3.8.0';
  _exports.COMPONENT_MANAGER_STRING_LOOKUP = COMPONENT_MANAGER_STRING_LOOKUP;
  var JQUERY_INTEGRATION = !!'3.9.0';
  _exports.JQUERY_INTEGRATION = JQUERY_INTEGRATION;
  var ALIAS_METHOD = !!'3.9.0';
  _exports.ALIAS_METHOD = ALIAS_METHOD;
  var APP_CTRL_ROUTER_PROPS = !!'3.10.0-beta.1';
  _exports.APP_CTRL_ROUTER_PROPS = APP_CTRL_ROUTER_PROPS;
  var FUNCTION_PROTOTYPE_EXTENSIONS = !!'3.11.0-beta.1';
  _exports.FUNCTION_PROTOTYPE_EXTENSIONS = FUNCTION_PROTOTYPE_EXTENSIONS;
  var MOUSE_ENTER_LEAVE_MOVE_EVENTS = !!'3.13.0-beta.1';
  _exports.MOUSE_ENTER_LEAVE_MOVE_EVENTS = MOUSE_ENTER_LEAVE_MOVE_EVENTS;
  var EMBER_COMPONENT_IS_VISIBLE = !!'3.15.0-beta.1';
  _exports.EMBER_COMPONENT_IS_VISIBLE = EMBER_COMPONENT_IS_VISIBLE;
  var PARTIALS = !!'3.15.0-beta.1';
  _exports.PARTIALS = PARTIALS;
});
define("@ember/error/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
   @module @ember/error
  */

  /**
    The JavaScript Error object used by Ember.assert.
  
    @class Error
    @namespace Ember
    @extends Error
    @constructor
    @public
  */
  var _default = Error;
  _exports.default = _default;
});
define("@ember/polyfills/index", ["exports", "@ember/deprecated-features", "@ember/polyfills/lib/merge", "@ember/polyfills/lib/assign", "@ember/polyfills/lib/weak_set"], function (_exports, _deprecatedFeatures, _merge, _assign, _weak_set) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "assign", {
    enumerable: true,
    get: function get() {
      return _assign.default;
    }
  });
  Object.defineProperty(_exports, "assignPolyfill", {
    enumerable: true,
    get: function get() {
      return _assign.assign;
    }
  });
  Object.defineProperty(_exports, "_WeakSet", {
    enumerable: true,
    get: function get() {
      return _weak_set.default;
    }
  });
  _exports.merge = void 0;
  var merge = _deprecatedFeatures.MERGE ? _merge.default : undefined; // Export `assignPolyfill` for testing

  _exports.merge = merge;
});
define("@ember/polyfills/lib/assign", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.assign = assign;
  _exports.default = void 0;

  /**
   @module @ember/polyfills
  */

  /**
    Copy properties from a source object to a target object. Source arguments remain unchanged.
  
    ```javascript
    import { assign } from '@ember/polyfills';
  
    var a = { first: 'Yehuda' };
    var b = { last: 'Katz' };
    var c = { company: 'Other Company' };
    var d = { company: 'Tilde Inc.' };
    assign(a, b, c, d); // a === { first: 'Yehuda', last: 'Katz', company: 'Tilde Inc.' };
    ```
  
    @method assign
    @for @ember/polyfills
    @param {Object} target The object to assign into
    @param {Object} ...args The objects to copy properties from
    @return {Object}
    @public
    @static
  */
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var arg = arguments[i];

      if (!arg) {
        continue;
      }

      var updates = Object.keys(arg);

      for (var _i = 0; _i < updates.length; _i++) {
        var prop = updates[_i];
        target[prop] = arg[prop];
      }
    }

    return target;
  } // Note: We use the bracket notation so
  //       that the babel plugin does not
  //       transform it.
  // https://www.npmjs.com/package/babel-plugin-transform-object-assign


  var _assign = Object.assign;

  var _default = _assign || assign;

  _exports.default = _default;
});
define("@ember/polyfills/lib/merge", ["exports", "@ember/debug"], function (_exports, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = merge;

  /**
    Merge the contents of two objects together into the first object.
  
    ```javascript
    import { merge } from '@ember/polyfills';
  
    merge({ first: 'Tom' }, { last: 'Dale' }); // { first: 'Tom', last: 'Dale' }
    var a = { first: 'Yehuda' };
    var b = { last: 'Katz' };
    merge(a, b); // a == { first: 'Yehuda', last: 'Katz' }, b == { last: 'Katz' }
    ```
  
    @method merge
    @static
    @for @ember/polyfills
    @param {Object} original The object to merge into
    @param {Object} updates The object to copy properties from
    @return {Object}
    @deprecated
    @public
  */
  function merge(original, updates) {
    (true && !(false) && (0, _debug.deprecate)('Use of `merge` has been deprecated. Please use `assign` instead.', false, {
      id: 'ember-polyfills.deprecate-merge',
      until: '4.0.0',
      url: 'https://emberjs.com/deprecations/v3.x/#toc_ember-polyfills-deprecate-merge'
    }));

    if (updates === null || typeof updates !== 'object') {
      return original;
    }

    var props = Object.keys(updates);
    var prop;

    for (var i = 0; i < props.length; i++) {
      prop = props[i];
      original[prop] = updates[prop];
    }

    return original;
  }
});
define("@ember/polyfills/lib/weak_set", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* globals WeakSet */
  var _default = typeof WeakSet === 'function' ? WeakSet :
  /*#__PURE__*/
  function () {
    function WeakSetPolyFill() {
      this._map = new WeakMap();
    }

    var _proto = WeakSetPolyFill.prototype;

    _proto.add = function add(val) {
      this._map.set(val, true);

      return this;
    };

    _proto.delete = function _delete(val) {
      return this._map.delete(val);
    };

    _proto.has = function has(val) {
      return this._map.has(val);
    };

    return WeakSetPolyFill;
  }();

  _exports.default = _default;
});
define("@glimmer/compiler", ["exports", "ember-babel", "node-module", "@glimmer/util", "@glimmer/wire-format", "@glimmer/syntax"], function (_exports, _emberBabel, _nodeModule, _util, _wireFormat, _syntax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.precompile = precompile;
  _exports.TemplateVisitor = _exports.TemplateCompiler = _exports.defaultId = void 0;

  var SymbolTable =
  /*#__PURE__*/
  function () {
    function SymbolTable() {}

    SymbolTable.top = function top() {
      return new ProgramSymbolTable();
    };

    var _proto = SymbolTable.prototype;

    _proto.child = function child(locals) {
      var _this = this;

      var symbols = locals.map(function (name) {
        return _this.allocate(name);
      });
      return new BlockSymbolTable(this, locals, symbols);
    };

    return SymbolTable;
  }();

  var ProgramSymbolTable =
  /*#__PURE__*/
  function (_SymbolTable) {
    (0, _emberBabel.inheritsLoose)(ProgramSymbolTable, _SymbolTable);

    function ProgramSymbolTable() {
      var _this2;

      _this2 = _SymbolTable.apply(this, arguments) || this;
      _this2.symbols = [];
      _this2.size = 1;
      _this2.named = (0, _util.dict)();
      _this2.blocks = (0, _util.dict)();
      return _this2;
    }

    var _proto2 = ProgramSymbolTable.prototype;

    _proto2.has = function has(_name) {
      return false;
    };

    _proto2.get = function get(_name) {
      throw (0, _util.unreachable)();
    };

    _proto2.getLocalsMap = function getLocalsMap() {
      return {};
    };

    _proto2.getEvalInfo = function getEvalInfo() {
      return [];
    };

    _proto2.allocateNamed = function allocateNamed(name) {
      var named = this.named[name];

      if (!named) {
        named = this.named[name] = this.allocate(name);
      }

      return named;
    };

    _proto2.allocateBlock = function allocateBlock(name) {
      var block = this.blocks[name];

      if (!block) {
        block = this.blocks[name] = this.allocate("&" + name);
      }

      return block;
    };

    _proto2.allocate = function allocate(identifier) {
      this.symbols.push(identifier);
      return this.size++;
    };

    return ProgramSymbolTable;
  }(SymbolTable);

  var BlockSymbolTable =
  /*#__PURE__*/
  function (_SymbolTable2) {
    (0, _emberBabel.inheritsLoose)(BlockSymbolTable, _SymbolTable2);

    function BlockSymbolTable(parent, symbols, slots) {
      var _this3;

      _this3 = _SymbolTable2.call(this) || this;
      _this3.parent = parent;
      _this3.symbols = symbols;
      _this3.slots = slots;
      return _this3;
    }

    var _proto3 = BlockSymbolTable.prototype;

    _proto3.has = function has(name) {
      return this.symbols.indexOf(name) !== -1 || this.parent.has(name);
    };

    _proto3.get = function get(name) {
      var slot = this.symbols.indexOf(name);
      return slot === -1 ? this.parent.get(name) : this.slots[slot];
    };

    _proto3.getLocalsMap = function getLocalsMap() {
      var _this4 = this;

      var dict$$1 = this.parent.getLocalsMap();
      this.symbols.forEach(function (symbol) {
        return dict$$1[symbol] = _this4.get(symbol);
      });
      return dict$$1;
    };

    _proto3.getEvalInfo = function getEvalInfo() {
      var locals = this.getLocalsMap();
      return Object.keys(locals).map(function (symbol) {
        return locals[symbol];
      });
    };

    _proto3.allocateNamed = function allocateNamed(name) {
      return this.parent.allocateNamed(name);
    };

    _proto3.allocateBlock = function allocateBlock(name) {
      return this.parent.allocateBlock(name);
    };

    _proto3.allocate = function allocate(identifier) {
      return this.parent.allocate(identifier);
    };

    return BlockSymbolTable;
  }(SymbolTable);
  /**
   * Takes in an AST and outputs a list of actions to be consumed
   * by a compiler. For example, the template
   *
   *     foo{{bar}}<div>baz</div>
   *
   * produces the actions
   *
   *     [['startProgram', [programNode, 0]],
   *      ['text', [textNode, 0, 3]],
   *      ['mustache', [mustacheNode, 1, 3]],
   *      ['openElement', [elementNode, 2, 3, 0]],
   *      ['text', [textNode, 0, 1]],
   *      ['closeElement', [elementNode, 2, 3],
   *      ['endProgram', [programNode]]]
   *
   * This visitor walks the AST depth first and backwards. As
   * a result the bottom-most child template will appear at the
   * top of the actions list whereas the root template will appear
   * at the bottom of the list. For example,
   *
   *     <div>{{#if}}foo{{else}}bar<b></b>{{/if}}</div>
   *
   * produces the actions
   *
   *     [['startProgram', [programNode, 0]],
   *      ['text', [textNode, 0, 2, 0]],
   *      ['openElement', [elementNode, 1, 2, 0]],
   *      ['closeElement', [elementNode, 1, 2]],
   *      ['endProgram', [programNode]],
   *      ['startProgram', [programNode, 0]],
   *      ['text', [textNode, 0, 1]],
   *      ['endProgram', [programNode]],
   *      ['startProgram', [programNode, 2]],
   *      ['openElement', [elementNode, 0, 1, 1]],
   *      ['block', [blockNode, 0, 1]],
   *      ['closeElement', [elementNode, 0, 1]],
   *      ['endProgram', [programNode]]]
   *
   * The state of the traversal is maintained by a stack of frames.
   * Whenever a node with children is entered (either a ProgramNode
   * or an ElementNode) a frame is pushed onto the stack. The frame
   * contains information about the state of the traversal of that
   * node. For example,
   *
   *   - index of the current child node being visited
   *   - the number of mustaches contained within its child nodes
   *   - the list of actions generated by its child nodes
   */


  var Frame = function Frame() {
    this.parentNode = null;
    this.children = null;
    this.childIndex = null;
    this.childCount = null;
    this.childTemplateCount = 0;
    this.mustacheCount = 0;
    this.actions = [];
    this.blankChildTextNodes = null;
    this.symbols = null;
  };

  var TemplateVisitor =
  /*#__PURE__*/
  function () {
    function TemplateVisitor() {
      this.frameStack = [];
      this.actions = [];
      this.programDepth = -1;
    }

    var _proto4 = TemplateVisitor.prototype;

    _proto4.visit = function visit(node) {
      this[node.type](node);
    } // Traversal methods
    ;

    _proto4.Program = function Program(program) {
      var _this$actions;

      this.programDepth++;
      var parentFrame = this.getCurrentFrame();
      var programFrame = this.pushFrame();

      if (!parentFrame) {
        program['symbols'] = SymbolTable.top();
      } else {
        program['symbols'] = parentFrame.symbols.child(program.blockParams);
      }

      var startType, endType;

      if (this.programDepth === 0) {
        startType = 'startProgram';
        endType = 'endProgram';
      } else {
        startType = 'startBlock';
        endType = 'endBlock';
      }

      programFrame.parentNode = program;
      programFrame.children = program.body;
      programFrame.childCount = program.body.length;
      programFrame.blankChildTextNodes = [];
      programFrame.actions.push([endType, [program, this.programDepth]]);
      programFrame.symbols = program['symbols'];

      for (var i = program.body.length - 1; i >= 0; i--) {
        programFrame.childIndex = i;
        this.visit(program.body[i]);
      }

      programFrame.actions.push([startType, [program, programFrame.childTemplateCount, programFrame.blankChildTextNodes.reverse()]]);
      this.popFrame();
      this.programDepth--; // Push the completed template into the global actions list

      if (parentFrame) {
        parentFrame.childTemplateCount++;
      }

      (_this$actions = this.actions).push.apply(_this$actions, programFrame.actions.reverse());
    };

    _proto4.ElementNode = function ElementNode(element) {
      var _parentFrame$actions;

      var parentFrame = this.currentFrame;
      var elementFrame = this.pushFrame();
      elementFrame.parentNode = element;
      elementFrame.children = element.children;
      elementFrame.childCount = element.children.length;
      elementFrame.mustacheCount += element.modifiers.length;
      elementFrame.blankChildTextNodes = [];
      elementFrame.symbols = element['symbols'] = parentFrame.symbols.child(element.blockParams);
      var actionArgs = [element, parentFrame.childIndex, parentFrame.childCount];
      elementFrame.actions.push(['closeElement', actionArgs]);

      for (var i = element.attributes.length - 1; i >= 0; i--) {
        this.visit(element.attributes[i]);
      }

      for (var _i = element.children.length - 1; _i >= 0; _i--) {
        elementFrame.childIndex = _i;
        this.visit(element.children[_i]);
      }

      var open = ['openElement', [].concat(actionArgs, [elementFrame.mustacheCount, elementFrame.blankChildTextNodes.reverse()])];
      elementFrame.actions.push(open);
      this.popFrame(); // Propagate the element's frame state to the parent frame

      if (elementFrame.mustacheCount > 0) {
        parentFrame.mustacheCount++;
      }

      parentFrame.childTemplateCount += elementFrame.childTemplateCount;

      (_parentFrame$actions = parentFrame.actions).push.apply(_parentFrame$actions, elementFrame.actions);
    };

    _proto4.AttrNode = function AttrNode(attr) {
      if (attr.value.type !== 'TextNode') {
        this.currentFrame.mustacheCount++;
      }
    };

    _proto4.TextNode = function TextNode(text) {
      var frame = this.currentFrame;

      if (text.chars === '') {
        frame.blankChildTextNodes.push(domIndexOf(frame.children, text));
      }

      frame.actions.push(['text', [text, frame.childIndex, frame.childCount]]);
    };

    _proto4.BlockStatement = function BlockStatement(node) {
      var frame = this.currentFrame;
      frame.mustacheCount++;
      frame.actions.push(['block', [node, frame.childIndex, frame.childCount]]);

      if (node.inverse) {
        this.visit(node.inverse);
      }

      if (node.program) {
        this.visit(node.program);
      }
    };

    _proto4.PartialStatement = function PartialStatement(node) {
      var frame = this.currentFrame;
      frame.mustacheCount++;
      frame.actions.push(['mustache', [node, frame.childIndex, frame.childCount]]);
    };

    _proto4.CommentStatement = function CommentStatement(text) {
      var frame = this.currentFrame;
      frame.actions.push(['comment', [text, frame.childIndex, frame.childCount]]);
    };

    _proto4.MustacheCommentStatement = function MustacheCommentStatement() {// Intentional empty: Handlebars comments should not affect output.
    };

    _proto4.MustacheStatement = function MustacheStatement(mustache) {
      var frame = this.currentFrame;
      frame.mustacheCount++;
      frame.actions.push(['mustache', [mustache, frame.childIndex, frame.childCount]]);
    } // Frame helpers
    ;

    _proto4.getCurrentFrame = function getCurrentFrame() {
      return this.frameStack[this.frameStack.length - 1];
    };

    _proto4.pushFrame = function pushFrame() {
      var frame = new Frame();
      this.frameStack.push(frame);
      return frame;
    };

    _proto4.popFrame = function popFrame() {
      return this.frameStack.pop();
    };

    (0, _emberBabel.createClass)(TemplateVisitor, [{
      key: "currentFrame",
      get: function get() {
        return this.getCurrentFrame();
      }
    }]);
    return TemplateVisitor;
  }(); // Returns the index of `domNode` in the `nodes` array, skipping
  // over any nodes which do not represent DOM nodes.


  _exports.TemplateVisitor = TemplateVisitor;

  function domIndexOf(nodes, domNode) {
    var index = -1;

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];

      if (node.type !== 'TextNode' && node.type !== 'ElementNode') {
        continue;
      } else {
        index++;
      }

      if (node === domNode) {
        return index;
      }
    }

    return -1;
  }

  var Block =
  /*#__PURE__*/
  function () {
    function Block() {
      this.statements = [];
    }

    var _proto5 = Block.prototype;

    _proto5.push = function push(statement) {
      this.statements.push(statement);
    };

    return Block;
  }();

  var InlineBlock =
  /*#__PURE__*/
  function (_Block) {
    (0, _emberBabel.inheritsLoose)(InlineBlock, _Block);

    function InlineBlock(table) {
      var _this5;

      _this5 = _Block.call(this) || this;
      _this5.table = table;
      return _this5;
    }

    var _proto6 = InlineBlock.prototype;

    _proto6.toJSON = function toJSON() {
      return {
        statements: this.statements,
        parameters: this.table.slots
      };
    };

    return InlineBlock;
  }(Block);

  var TemplateBlock =
  /*#__PURE__*/
  function (_Block2) {
    (0, _emberBabel.inheritsLoose)(TemplateBlock, _Block2);

    function TemplateBlock(symbolTable) {
      var _this6;

      _this6 = _Block2.call(this) || this;
      _this6.symbolTable = symbolTable;
      _this6.type = 'template';
      _this6.yields = new _util.DictSet();
      _this6.named = new _util.DictSet();
      _this6.blocks = [];
      _this6.hasEval = false;
      return _this6;
    }

    var _proto7 = TemplateBlock.prototype;

    _proto7.push = function push(statement) {
      this.statements.push(statement);
    };

    _proto7.toJSON = function toJSON() {
      return {
        symbols: this.symbolTable.symbols,
        statements: this.statements,
        hasEval: this.hasEval
      };
    };

    return TemplateBlock;
  }(Block);

  var ComponentBlock =
  /*#__PURE__*/
  function (_Block3) {
    (0, _emberBabel.inheritsLoose)(ComponentBlock, _Block3);

    function ComponentBlock(tag, table, selfClosing) {
      var _this7;

      _this7 = _Block3.call(this) || this;
      _this7.tag = tag;
      _this7.table = table;
      _this7.selfClosing = selfClosing;
      _this7.attributes = [];
      _this7.arguments = [];
      _this7.inParams = true;
      _this7.positionals = [];
      return _this7;
    }

    var _proto8 = ComponentBlock.prototype;

    _proto8.push = function push(statement) {
      if (this.inParams) {
        if ((0, _wireFormat.isFlushElement)(statement)) {
          this.inParams = false;
        } else if ((0, _wireFormat.isArgument)(statement)) {
          this.arguments.push(statement);
        } else if ((0, _wireFormat.isAttribute)(statement)) {
          this.attributes.push(statement);
        } else {
          throw new Error('Compile Error: only parameters allowed before flush-element');
        }
      } else {
        this.statements.push(statement);
      }
    };

    _proto8.toJSON = function toJSON() {
      var args = this.arguments;
      var keys = args.map(function (arg) {
        return arg[1];
      });
      var values = args.map(function (arg) {
        return arg[2];
      });
      var block = this.selfClosing ? null : {
        statements: this.statements,
        parameters: this.table.slots
      };
      return [this.tag, this.attributes, [keys, values], block];
    };

    return ComponentBlock;
  }(Block);

  var Template =
  /*#__PURE__*/
  function () {
    function Template(symbols) {
      this.block = new TemplateBlock(symbols);
    }

    var _proto9 = Template.prototype;

    _proto9.toJSON = function toJSON() {
      return this.block.toJSON();
    };

    return Template;
  }();

  var JavaScriptCompiler =
  /*#__PURE__*/
  function () {
    function JavaScriptCompiler(opcodes, symbols, options) {
      this.blocks = new _util.Stack();
      this.values = [];
      this.opcodes = opcodes;
      this.template = new Template(symbols);
      this.options = options;
    }

    JavaScriptCompiler.process = function process(opcodes, symbols, options) {
      var compiler = new JavaScriptCompiler(opcodes, symbols, options);
      return compiler.process();
    };

    var _proto10 = JavaScriptCompiler.prototype;

    _proto10.process = function process() {
      var _this8 = this;

      this.opcodes.forEach(function (op) {
        var opcode = op[0];
        var arg = op[1];

        if (!_this8[opcode]) {
          throw new Error("unimplemented " + opcode + " on JavaScriptCompiler");
        }

        _this8[opcode](arg);
      });
      return this.template;
    } /// Nesting
    ;

    _proto10.startBlock = function startBlock(program) {
      var block = new InlineBlock(program['symbols']);
      this.blocks.push(block);
    };

    _proto10.endBlock = function endBlock() {
      var template = this.template,
          blocks = this.blocks;
      var block = blocks.pop();
      template.block.blocks.push(block.toJSON());
    };

    _proto10.startProgram = function startProgram() {
      this.blocks.push(this.template.block);
    };

    _proto10.endProgram = function endProgram() {} /// Statements
    ;

    _proto10.text = function text(content) {
      this.push([_wireFormat.Ops.Text, content]);
    };

    _proto10.append = function append(trusted) {
      this.push([_wireFormat.Ops.Append, this.popValue(), trusted]);
    };

    _proto10.comment = function comment(value) {
      this.push([_wireFormat.Ops.Comment, value]);
    };

    _proto10.modifier = function modifier(name) {
      var params = this.popValue();
      var hash = this.popValue();
      this.push([_wireFormat.Ops.Modifier, name, params, hash]);
    };

    _proto10.block = function block(_ref) {
      var name = _ref[0],
          template = _ref[1],
          inverse = _ref[2];
      var params = this.popValue();
      var hash = this.popValue();
      var blocks = this.template.block.blocks;
      this.push([_wireFormat.Ops.Block, name, params, hash, blocks[template], blocks[inverse]]);
    };

    _proto10.openComponent = function openComponent(element) {
      var tag = this.options && this.options.customizeComponentName ? this.options.customizeComponentName(element.tag) : element.tag;
      var component = new ComponentBlock(tag, element['symbols'], element.selfClosing);
      this.blocks.push(component);
    };

    _proto10.openElement = function openElement(_ref2) {
      var element = _ref2[0],
          simple = _ref2[1];
      var tag = element.tag;

      if (element.blockParams.length > 0) {
        throw new Error("Compile Error: <" + element.tag + "> is not a component and doesn't support block parameters");
      } else {
        this.push([_wireFormat.Ops.OpenElement, tag, simple]);
      }
    };

    _proto10.flushElement = function flushElement() {
      this.push([_wireFormat.Ops.FlushElement]);
    };

    _proto10.closeComponent = function closeComponent(_element) {
      var _this$endComponent = this.endComponent(),
          tag = _this$endComponent[0],
          attrs = _this$endComponent[1],
          args = _this$endComponent[2],
          block = _this$endComponent[3];

      this.push([_wireFormat.Ops.Component, tag, attrs, args, block]);
    };

    _proto10.closeDynamicComponent = function closeDynamicComponent(_element) {
      var _this$endComponent2 = this.endComponent(),
          attrs = _this$endComponent2[1],
          args = _this$endComponent2[2],
          block = _this$endComponent2[3];

      this.push([_wireFormat.Ops.DynamicComponent, this.popValue(), attrs, args, block]);
    };

    _proto10.closeElement = function closeElement(_element) {
      this.push([_wireFormat.Ops.CloseElement]);
    };

    _proto10.staticAttr = function staticAttr(_ref3) {
      var name = _ref3[0],
          namespace = _ref3[1];
      var value = this.popValue();
      this.push([_wireFormat.Ops.StaticAttr, name, value, namespace]);
    };

    _proto10.dynamicAttr = function dynamicAttr(_ref4) {
      var name = _ref4[0],
          namespace = _ref4[1];
      var value = this.popValue();
      this.push([_wireFormat.Ops.DynamicAttr, name, value, namespace]);
    };

    _proto10.componentAttr = function componentAttr(_ref5) {
      var name = _ref5[0],
          namespace = _ref5[1];
      var value = this.popValue();
      this.push([_wireFormat.Ops.ComponentAttr, name, value, namespace]);
    };

    _proto10.trustingAttr = function trustingAttr(_ref6) {
      var name = _ref6[0],
          namespace = _ref6[1];
      var value = this.popValue();
      this.push([_wireFormat.Ops.TrustingAttr, name, value, namespace]);
    };

    _proto10.trustingComponentAttr = function trustingComponentAttr(_ref7) {
      var name = _ref7[0],
          namespace = _ref7[1];
      var value = this.popValue();
      this.push([_wireFormat.Ops.TrustingComponentAttr, name, value, namespace]);
    };

    _proto10.staticArg = function staticArg(name) {
      var value = this.popValue();
      this.push([_wireFormat.Ops.StaticArg, name, value]);
    };

    _proto10.dynamicArg = function dynamicArg(name) {
      var value = this.popValue();
      this.push([_wireFormat.Ops.DynamicArg, name, value]);
    };

    _proto10.yield = function _yield(to) {
      var params = this.popValue();
      this.push([_wireFormat.Ops.Yield, to, params]);
    };

    _proto10.attrSplat = function attrSplat(to) {
      // consume (and disregard) the value pushed for the
      // ...attributes attribute
      this.popValue();
      this.push([_wireFormat.Ops.AttrSplat, to]);
    };

    _proto10.debugger = function _debugger(evalInfo) {
      this.push([_wireFormat.Ops.Debugger, evalInfo]);
      this.template.block.hasEval = true;
    };

    _proto10.hasBlock = function hasBlock(name) {
      this.pushValue([_wireFormat.Ops.HasBlock, name]);
    };

    _proto10.hasBlockParams = function hasBlockParams(name) {
      this.pushValue([_wireFormat.Ops.HasBlockParams, name]);
    };

    _proto10.partial = function partial(evalInfo) {
      var params = this.popValue();
      this.push([_wireFormat.Ops.Partial, params[0], evalInfo]);
      this.template.block.hasEval = true;
    } /// Expressions
    ;

    _proto10.literal = function literal(value) {
      if (value === undefined) {
        this.pushValue([_wireFormat.Ops.Undefined]);
      } else {
        this.pushValue(value);
      }
    };

    _proto10.unknown = function unknown(name) {
      this.pushValue([_wireFormat.Ops.Unknown, name]);
    };

    _proto10.get = function get(_ref8) {
      var head = _ref8[0],
          path = _ref8[1];
      this.pushValue([_wireFormat.Ops.Get, head, path]);
    };

    _proto10.maybeLocal = function maybeLocal(path) {
      this.pushValue([_wireFormat.Ops.MaybeLocal, path]);
    };

    _proto10.concat = function concat() {
      this.pushValue([_wireFormat.Ops.Concat, this.popValue()]);
    };

    _proto10.helper = function helper(name) {
      var params = this.popValue();
      var hash = this.popValue();
      this.pushValue([_wireFormat.Ops.Helper, name, params, hash]);
    } /// Stack Management Opcodes
    ;

    _proto10.prepareArray = function prepareArray(size) {
      var values = [];

      for (var i = 0; i < size; i++) {
        values.push(this.popValue());
      }

      this.pushValue(values);
    };

    _proto10.prepareObject = function prepareObject(size) {
      var keys = new Array(size);
      var values = new Array(size);

      for (var i = 0; i < size; i++) {
        keys[i] = this.popValue();
        values[i] = this.popValue();
      }

      this.pushValue([keys, values]);
    } /// Utilities
    ;

    _proto10.endComponent = function endComponent() {
      var component = this.blocks.pop();
      return component.toJSON();
    };

    _proto10.push = function push(args) {
      while (args[args.length - 1] === null) {
        args.pop();
      }

      this.currentBlock.push(args);
    };

    _proto10.pushValue = function pushValue(val) {
      this.values.push(val);
    };

    _proto10.popValue = function popValue() {
      return this.values.pop();
    };

    (0, _emberBabel.createClass)(JavaScriptCompiler, [{
      key: "currentBlock",
      get: function get() {
        return this.blocks.current;
      }
    }]);
    return JavaScriptCompiler;
  }(); // There is a small whitelist of namespaced attributes specially
  // enumerated in
  // https://www.w3.org/TR/html/syntax.html#attributes-0
  //
  // > When a foreign element has one of the namespaced attributes given by
  // > the local name and namespace of the first and second cells of a row
  // > from the following table, it must be written using the name given by
  // > the third cell from the same row.
  //
  // In all other cases, colons are interpreted as a regular character
  // with no special meaning:
  //
  // > No other namespaced attribute can be expressed in the HTML syntax.


  var XLINK = 'http://www.w3.org/1999/xlink';
  var XML = 'http://www.w3.org/XML/1998/namespace';
  var XMLNS = 'http://www.w3.org/2000/xmlns/';
  var WHITELIST = {
    'xlink:actuate': XLINK,
    'xlink:arcrole': XLINK,
    'xlink:href': XLINK,
    'xlink:role': XLINK,
    'xlink:show': XLINK,
    'xlink:title': XLINK,
    'xlink:type': XLINK,
    'xml:base': XML,
    'xml:lang': XML,
    'xml:space': XML,
    xmlns: XMLNS,
    'xmlns:xlink': XMLNS
  };

  function getAttrNamespace(attrName) {
    return WHITELIST[attrName] || null;
  }

  var SymbolAllocator =
  /*#__PURE__*/
  function () {
    function SymbolAllocator(ops) {
      this.ops = ops;
      this.symbolStack = new _util.Stack();
    }

    var _proto11 = SymbolAllocator.prototype;

    _proto11.process = function process() {
      var out = [];
      var ops = this.ops;

      for (var i = 0; i < ops.length; i++) {
        var op = ops[i];
        var result = this.dispatch(op);

        if (result === undefined) {
          out.push(op);
        } else {
          out.push(result);
        }
      }

      return out;
    };

    _proto11.dispatch = function dispatch(op) {
      var name = op[0];
      var operand = op[1];
      return this[name](operand);
    };

    _proto11.startProgram = function startProgram(op) {
      this.symbolStack.push(op['symbols']);
    };

    _proto11.endProgram = function endProgram(_op) {
      this.symbolStack.pop();
    };

    _proto11.startBlock = function startBlock(op) {
      this.symbolStack.push(op['symbols']);
    };

    _proto11.endBlock = function endBlock(_op) {
      this.symbolStack.pop();
    };

    _proto11.flushElement = function flushElement(op) {
      this.symbolStack.push(op['symbols']);
    };

    _proto11.closeElement = function closeElement(_op) {
      this.symbolStack.pop();
    };

    _proto11.closeComponent = function closeComponent(_op) {
      this.symbolStack.pop();
    };

    _proto11.closeDynamicComponent = function closeDynamicComponent(_op) {
      this.symbolStack.pop();
    };

    _proto11.attrSplat = function attrSplat(_op) {
      return ['attrSplat', this.symbols.allocateBlock('attrs')];
    };

    _proto11.get = function get(op) {
      var name = op[0],
          rest = op[1];

      if (name === 0) {
        return ['get', [0, rest]];
      }

      if (isLocal(name, this.symbols)) {
        var head = this.symbols.get(name);
        return ['get', [head, rest]];
      } else if (name[0] === '@') {
        var _head = this.symbols.allocateNamed(name);

        return ['get', [_head, rest]];
      } else {
        return ['maybeLocal', [name].concat(rest)];
      }
    };

    _proto11.maybeGet = function maybeGet(op) {
      var name = op[0],
          rest = op[1];

      if (name === 0) {
        return ['get', [0, rest]];
      }

      if (isLocal(name, this.symbols)) {
        var head = this.symbols.get(name);
        return ['get', [head, rest]];
      } else if (name[0] === '@') {
        var _head2 = this.symbols.allocateNamed(name);

        return ['get', [_head2, rest]];
      } else if (rest.length === 0) {
        return ['unknown', name];
      } else {
        return ['maybeLocal', [name].concat(rest)];
      }
    };

    _proto11.yield = function _yield(op) {
      if (op === 0) {
        throw new Error('Cannot yield to this');
      }

      return ['yield', this.symbols.allocateBlock(op)];
    };

    _proto11.debugger = function _debugger(_op) {
      return ['debugger', this.symbols.getEvalInfo()];
    };

    _proto11.hasBlock = function hasBlock(op) {
      if (op === 0) {
        throw new Error('Cannot hasBlock this');
      }

      return ['hasBlock', this.symbols.allocateBlock(op)];
    };

    _proto11.hasBlockParams = function hasBlockParams(op) {
      if (op === 0) {
        throw new Error('Cannot hasBlockParams this');
      }

      return ['hasBlockParams', this.symbols.allocateBlock(op)];
    };

    _proto11.partial = function partial(_op) {
      return ['partial', this.symbols.getEvalInfo()];
    };

    _proto11.text = function text(_op) {};

    _proto11.comment = function comment(_op) {};

    _proto11.openComponent = function openComponent(_op) {};

    _proto11.openElement = function openElement(_op) {};

    _proto11.staticArg = function staticArg(_op) {};

    _proto11.dynamicArg = function dynamicArg(_op) {};

    _proto11.staticAttr = function staticAttr(_op) {};

    _proto11.trustingAttr = function trustingAttr(_op) {};

    _proto11.trustingComponentAttr = function trustingComponentAttr(_op) {};

    _proto11.dynamicAttr = function dynamicAttr(_op) {};

    _proto11.componentAttr = function componentAttr(_op) {};

    _proto11.modifier = function modifier(_op) {};

    _proto11.append = function append(_op) {};

    _proto11.block = function block(_op) {};

    _proto11.literal = function literal(_op) {};

    _proto11.helper = function helper(_op) {};

    _proto11.unknown = function unknown(_op) {};

    _proto11.maybeLocal = function maybeLocal(_op) {};

    _proto11.prepareArray = function prepareArray(_op) {};

    _proto11.prepareObject = function prepareObject(_op) {};

    _proto11.concat = function concat(_op) {};

    (0, _emberBabel.createClass)(SymbolAllocator, [{
      key: "symbols",
      get: function get() {
        return this.symbolStack.current;
      }
    }]);
    return SymbolAllocator;
  }();

  function isLocal(name, symbols) {
    return symbols && symbols.has(name);
  }

  function isTrustedValue(value) {
    return value.escaped !== undefined && !value.escaped;
  }

  var TemplateCompiler =
  /*#__PURE__*/
  function () {
    function TemplateCompiler() {
      this.templateId = 0;
      this.templateIds = [];
      this.opcodes = [];
      this.includeMeta = false;
    }

    TemplateCompiler.compile = function compile(ast, options) {
      var templateVisitor = new TemplateVisitor();
      templateVisitor.visit(ast);
      var compiler = new TemplateCompiler();
      var opcodes = compiler.process(templateVisitor.actions);
      var symbols = new SymbolAllocator(opcodes).process();
      return JavaScriptCompiler.process(symbols, ast['symbols'], options);
    };

    var _proto12 = TemplateCompiler.prototype;

    _proto12.process = function process(actions) {
      var _this9 = this;

      actions.forEach(function (_ref9) {
        var name = _ref9[0],
            args = _ref9.slice(1);

        if (!_this9[name]) {
          throw new Error("Unimplemented " + name + " on TemplateCompiler");
        }

        _this9[name].apply(_this9, args);
      });
      return this.opcodes;
    };

    _proto12.startProgram = function startProgram(_ref10) {
      var program = _ref10[0];
      this.opcode(['startProgram', program], program);
    };

    _proto12.endProgram = function endProgram() {
      this.opcode(['endProgram', null], null);
    };

    _proto12.startBlock = function startBlock(_ref11) {
      var program = _ref11[0];
      this.templateId++;
      this.opcode(['startBlock', program], program);
    };

    _proto12.endBlock = function endBlock() {
      this.templateIds.push(this.templateId - 1);
      this.opcode(['endBlock', null], null);
    };

    _proto12.text = function text(_ref12) {
      var action = _ref12[0];
      this.opcode(['text', action.chars], action);
    };

    _proto12.comment = function comment(_ref13) {
      var action = _ref13[0];
      this.opcode(['comment', action.value], action);
    };

    _proto12.openElement = function openElement(_ref14) {
      var action = _ref14[0];
      var attributes = action.attributes;
      var simple = true;

      for (var i = 0; i < attributes.length; i++) {
        var attr = attributes[i];

        if (attr.name === '...attributes') {
          simple = false;
          break;
        }
      }

      if (action.modifiers.length > 0) {
        simple = false;
      }

      var actionIsComponent = false;

      if (isDynamicComponent(action)) {
        var head, rest;

        var _action$tag$split = action.tag.split('.');

        head = _action$tag$split[0];
        rest = _action$tag$split.slice(1);

        if (head === 'this') {
          head = 0;
        }

        this.opcode(['get', [head, rest]]);
        this.opcode(['openComponent', action], action);
        actionIsComponent = true;
      } else if (isComponent(action)) {
        this.opcode(['openComponent', action], action);
        actionIsComponent = true;
      } else {
        this.opcode(['openElement', [action, simple]], action);
      }

      var typeAttr = null;
      var attrs = action.attributes;

      for (var _i2 = 0; _i2 < attrs.length; _i2++) {
        if (attrs[_i2].name === 'type') {
          typeAttr = attrs[_i2];
          continue;
        }

        this.attribute([attrs[_i2]], !simple || actionIsComponent);
      }

      if (typeAttr) {
        this.attribute([typeAttr], !simple || actionIsComponent);
      }

      for (var _i3 = 0; _i3 < action.modifiers.length; _i3++) {
        this.modifier([action.modifiers[_i3]]);
      }

      this.opcode(['flushElement', action], null);
    };

    _proto12.closeElement = function closeElement(_ref15) {
      var action = _ref15[0];

      if (isDynamicComponent(action)) {
        this.opcode(['closeDynamicComponent', action], action);
      } else if (isComponent(action)) {
        this.opcode(['closeComponent', action], action);
      } else {
        this.opcode(['closeElement', action], action);
      }
    };

    _proto12.attribute = function attribute(_ref16, isComponent) {
      var action = _ref16[0];
      var name = action.name,
          value = action.value;
      var namespace = getAttrNamespace(name);
      var isStatic = this.prepareAttributeValue(value);

      if (name.charAt(0) === '@') {
        // Arguments
        if (isStatic) {
          this.opcode(['staticArg', name], action);
        } else if (action.value.type === 'MustacheStatement') {
          this.opcode(['dynamicArg', name], action);
        } else {
          this.opcode(['dynamicArg', name], action);
        }
      } else {
        var isTrusting = isTrustedValue(value);

        if (isStatic && name === '...attributes') {
          this.opcode(['attrSplat', null], action);
        } else if (isStatic && !isComponent) {
          this.opcode(['staticAttr', [name, namespace]], action);
        } else if (isTrusting) {
          this.opcode([isComponent ? 'trustingComponentAttr' : 'trustingAttr', [name, namespace]], action);
        } else if (action.value.type === 'MustacheStatement') {
          this.opcode([isComponent ? 'componentAttr' : 'dynamicAttr', [name, null]], action);
        } else {
          this.opcode([isComponent ? 'componentAttr' : 'dynamicAttr', [name, namespace]], action);
        }
      }
    };

    _proto12.modifier = function modifier(_ref17) {
      var action = _ref17[0];
      assertIsSimplePath(action.path, action.loc, 'modifier');
      var parts = action.path.parts;
      this.prepareHelper(action);
      this.opcode(['modifier', parts[0]], action);
    };

    _proto12.mustache = function mustache(_ref18) {
      var action = _ref18[0];
      var path = action.path;

      if ((0, _syntax.isLiteral)(path)) {
        this.mustacheExpression(action);
        this.opcode(['append', !action.escaped], action);
      } else if (isYield(path)) {
        var to = assertValidYield(action);
        this.yield(to, action);
      } else if (isPartial(path)) {
        var params = assertValidPartial(action);
        this.partial(params, action);
      } else if (isDebugger(path)) {
        assertValidDebuggerUsage(action);
        this.debugger('debugger', action);
      } else {
        this.mustacheExpression(action);
        this.opcode(['append', !action.escaped], action);
      }
    };

    _proto12.block = function block(_ref19) {
      var action
      /*, index, count*/
      = _ref19[0];
      this.prepareHelper(action);
      var templateId = this.templateIds.pop();
      var inverseId = action.inverse === null ? null : this.templateIds.pop();
      this.opcode(['block', [action.path.parts[0], templateId, inverseId]], action);
    } /// Internal actions, not found in the original processed actions
    ;

    _proto12.arg = function arg(_ref20) {
      var path = _ref20[0];

      var _path$parts = path.parts,
          head = _path$parts[0],
          rest = _path$parts.slice(1);

      this.opcode(['get', ["@" + head, rest]], path);
    };

    _proto12.mustacheExpression = function mustacheExpression(expr) {
      var path = expr.path;

      if ((0, _syntax.isLiteral)(path)) {
        this.opcode(['literal', path.value], expr);
      } else if (isBuiltInHelper(path)) {
        this.builtInHelper(expr);
      } else if (isArg(path)) {
        this.arg([path]);
      } else if (isHelperInvocation(expr)) {
        this.prepareHelper(expr);
        this.opcode(['helper', path.parts[0]], expr);
      } else if (path.this) {
        this.opcode(['get', [0, path.parts]], expr);
      } else {
        var _path$parts2 = path.parts,
            head = _path$parts2[0],
            parts = _path$parts2.slice(1);

        this.opcode(['maybeGet', [head, parts]], expr);
      } // } else if (isLocal(path, this.symbols)) {
      //   let [head, ...parts] = path.parts;
      //   this.opcode(['get', [head, parts]], expr);
      // } else if (isSimplePath(path)) {
      //   this.opcode(['unknown', path.parts[0]], expr);
      // } else {
      //   this.opcode(['maybeLocal', path.parts], expr);
      // }

    } /// Internal Syntax
    ;

    _proto12.yield = function _yield(to, action) {
      this.prepareParams(action.params);
      this.opcode(['yield', to], action);
    };

    _proto12.debugger = function _debugger(_name, action) {
      this.opcode(['debugger', null], action);
    };

    _proto12.hasBlock = function hasBlock(name, action) {
      this.opcode(['hasBlock', name], action);
    };

    _proto12.hasBlockParams = function hasBlockParams(name, action) {
      this.opcode(['hasBlockParams', name], action);
    };

    _proto12.partial = function partial(_params, action) {
      this.prepareParams(action.params);
      this.opcode(['partial', null], action);
    };

    _proto12.builtInHelper = function builtInHelper(expr) {
      var path = expr.path;

      if (isHasBlock(path)) {
        var name = assertValidHasBlockUsage(expr.path.original, expr);
        this.hasBlock(name, expr);
      } else if (isHasBlockParams(path)) {
        var _name2 = assertValidHasBlockUsage(expr.path.original, expr);

        this.hasBlockParams(_name2, expr);
      }
    } /// Expressions, invoked recursively from prepareParams and prepareHash
    ;

    _proto12.SubExpression = function SubExpression(expr) {
      if (isBuiltInHelper(expr.path)) {
        this.builtInHelper(expr);
      } else {
        this.prepareHelper(expr);
        this.opcode(['helper', expr.path.parts[0]], expr);
      }
    };

    _proto12.PathExpression = function PathExpression(expr) {
      if (expr.data) {
        this.arg([expr]);
      } else {
        var _expr$parts = expr.parts,
            head = _expr$parts[0],
            rest = _expr$parts.slice(1);

        if (expr.this) {
          this.opcode(['get', [0, expr.parts]], expr);
        } else {
          this.opcode(['get', [head, rest]], expr);
        }
      }
    };

    _proto12.StringLiteral = function StringLiteral(action) {
      this.opcode(['literal', action.value], action);
    };

    _proto12.BooleanLiteral = function BooleanLiteral(action) {
      this.opcode(['literal', action.value], action);
    };

    _proto12.NumberLiteral = function NumberLiteral(action) {
      this.opcode(['literal', action.value], action);
    };

    _proto12.NullLiteral = function NullLiteral(action) {
      this.opcode(['literal', action.value], action);
    };

    _proto12.UndefinedLiteral = function UndefinedLiteral(action) {
      this.opcode(['literal', action.value], action);
    } /// Utilities
    ;

    _proto12.opcode = function opcode(_opcode, action) {
      if (action === void 0) {
        action = null;
      }

      // TODO: This doesn't really work
      if (this.includeMeta && action) {
        _opcode.push(this.meta(action));
      }

      this.opcodes.push(_opcode);
    };

    _proto12.prepareHelper = function prepareHelper(expr) {
      assertIsSimplePath(expr.path, expr.loc, 'helper');
      var params = expr.params,
          hash = expr.hash;
      this.prepareHash(hash);
      this.prepareParams(params);
    };

    _proto12.prepareParams = function prepareParams(params) {
      if (!params.length) {
        this.opcode(['literal', null], null);
        return;
      }

      for (var i = params.length - 1; i >= 0; i--) {
        var param = params[i];
        this[param.type](param);
      }

      this.opcode(['prepareArray', params.length], null);
    };

    _proto12.prepareHash = function prepareHash(hash) {
      var pairs = hash.pairs;

      if (!pairs.length) {
        this.opcode(['literal', null], null);
        return;
      }

      for (var i = pairs.length - 1; i >= 0; i--) {
        var _pairs$i = pairs[i],
            key = _pairs$i.key,
            value = _pairs$i.value;
        this[value.type](value);
        this.opcode(['literal', key], null);
      }

      this.opcode(['prepareObject', pairs.length], null);
    };

    _proto12.prepareAttributeValue = function prepareAttributeValue(value) {
      // returns the static value if the value is static
      switch (value.type) {
        case 'TextNode':
          this.opcode(['literal', value.chars], value);
          return true;

        case 'MustacheStatement':
          this.attributeMustache([value]);
          return false;

        case 'ConcatStatement':
          this.prepareConcatParts(value.parts);
          this.opcode(['concat', null], value);
          return false;
      }
    };

    _proto12.prepareConcatParts = function prepareConcatParts(parts) {
      for (var i = parts.length - 1; i >= 0; i--) {
        var part = parts[i];

        if (part.type === 'MustacheStatement') {
          this.attributeMustache([part]);
        } else if (part.type === 'TextNode') {
          this.opcode(['literal', part.chars], null);
        }
      }

      this.opcode(['prepareArray', parts.length], null);
    };

    _proto12.attributeMustache = function attributeMustache(_ref21) {
      var action = _ref21[0];
      this.mustacheExpression(action);
    };

    _proto12.meta = function meta(node) {
      var loc = node.loc;

      if (!loc) {
        return [];
      }

      var source = loc.source,
          start = loc.start,
          end = loc.end;
      return ['loc', [source || null, [start.line, start.column], [end.line, end.column]]];
    };

    return TemplateCompiler;
  }();

  _exports.TemplateCompiler = TemplateCompiler;

  function isHelperInvocation(mustache) {
    return mustache.params && mustache.params.length > 0 || mustache.hash && mustache.hash.pairs.length > 0;
  }

  function isSimplePath(_ref22) {
    var parts = _ref22.parts;
    return parts.length === 1;
  }

  function isYield(path) {
    return path.original === 'yield';
  }

  function isPartial(path) {
    return path.original === 'partial';
  }

  function isDebugger(path) {
    return path.original === 'debugger';
  }

  function isHasBlock(path) {
    return path.original === 'has-block';
  }

  function isHasBlockParams(path) {
    return path.original === 'has-block-params';
  }

  function isBuiltInHelper(path) {
    return isHasBlock(path) || isHasBlockParams(path);
  }

  function isArg(path) {
    return !!path['data'];
  }

  function isDynamicComponent(element) {
    var open = element.tag.charAt(0);

    var _element$tag$split = element.tag.split('.'),
        maybeLocal = _element$tag$split[0];

    var isNamedArgument = open === '@';
    var isLocal = element['symbols'].has(maybeLocal);
    var isThisPath = element.tag.indexOf('this.') === 0;
    return isLocal || isNamedArgument || isThisPath;
  }

  function isComponent(element) {
    var open = element.tag.charAt(0);
    var isPath = element.tag.indexOf('.') > -1;
    var isUpperCase = open === open.toUpperCase() && open !== open.toLowerCase();
    return isUpperCase && !isPath || isDynamicComponent(element);
  }

  function assertIsSimplePath(path, loc, context) {
    if (!isSimplePath(path)) {
      throw new _syntax.SyntaxError("`" + path.original + "` is not a valid name for a " + context + " on line " + loc.start.line + ".", path.loc);
    }
  }

  function assertValidYield(statement) {
    var pairs = statement.hash.pairs;

    if (pairs.length === 1 && pairs[0].key !== 'to' || pairs.length > 1) {
      throw new _syntax.SyntaxError("yield only takes a single named argument: 'to'", statement.loc);
    } else if (pairs.length === 1 && pairs[0].value.type !== 'StringLiteral') {
      throw new _syntax.SyntaxError("you can only yield to a literal value", statement.loc);
    } else if (pairs.length === 0) {
      return 'default';
    } else {
      return pairs[0].value.value;
    }
  }

  function assertValidPartial(statement) {
    var params = statement.params,
        hash = statement.hash,
        escaped = statement.escaped,
        loc = statement.loc;

    if (params && params.length !== 1) {
      throw new _syntax.SyntaxError("Partial found with no arguments. You must specify a template name. (on line " + loc.start.line + ")", statement.loc);
    } else if (hash && hash.pairs.length > 0) {
      throw new _syntax.SyntaxError("partial does not take any named arguments (on line " + loc.start.line + ")", statement.loc);
    } else if (!escaped) {
      throw new _syntax.SyntaxError("{{{partial ...}}} is not supported, please use {{partial ...}} instead (on line " + loc.start.line + ")", statement.loc);
    }

    return params;
  }

  function assertValidHasBlockUsage(type, call) {
    var params = call.params,
        hash = call.hash,
        loc = call.loc;

    if (hash && hash.pairs.length > 0) {
      throw new _syntax.SyntaxError(type + " does not take any named arguments", call.loc);
    }

    if (params.length === 0) {
      return 'default';
    } else if (params.length === 1) {
      var param = params[0];

      if (param.type === 'StringLiteral') {
        return param.value;
      } else {
        throw new _syntax.SyntaxError("you can only yield to a literal value (on line " + loc.start.line + ")", call.loc);
      }
    } else {
      throw new _syntax.SyntaxError(type + " only takes a single positional argument (on line " + loc.start.line + ")", call.loc);
    }
  }

  function assertValidDebuggerUsage(statement) {
    var params = statement.params,
        hash = statement.hash;

    if (hash && hash.pairs.length > 0) {
      throw new _syntax.SyntaxError("debugger does not take any named arguments", statement.loc);
    }

    if (params.length === 0) {
      return 'default';
    } else {
      throw new _syntax.SyntaxError("debugger does not take any positional arguments", statement.loc);
    }
  }

  var defaultId = function () {
    if (typeof _nodeModule.require === 'function') {
      try {
        /* tslint:disable:no-require-imports */
        var crypto = (0, _nodeModule.require)('crypto');
        /* tslint:enable:no-require-imports */

        var idFn = function idFn(src) {
          var hash = crypto.createHash('sha1');
          hash.update(src, 'utf8'); // trim to 6 bytes of data (2^48 - 1)

          return hash.digest('base64').substring(0, 8);
        };

        idFn('test');
        return idFn;
      } catch (e) {}
    }

    return function idFn() {
      return null;
    };
  }();

  _exports.defaultId = defaultId;
  var defaultOptions = {
    id: defaultId,
    meta: {}
  };

  function precompile(string, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var ast = (0, _syntax.preprocess)(string, options);
    var _options = options,
        meta = _options.meta;

    var _TemplateCompiler$com = TemplateCompiler.compile(ast, options),
        block = _TemplateCompiler$com.block;

    var idFn = options.id || defaultId;
    var blockJSON = JSON.stringify(block.toJSON());
    var templateJSONObject = {
      id: idFn(JSON.stringify(meta) + blockJSON),
      block: blockJSON,
      meta: meta
    }; // JSON is javascript

    return JSON.stringify(templateJSONObject);
  }
});
define("@glimmer/syntax", ["exports", "ember-babel", "simple-html-tokenizer", "@glimmer/util", "handlebars"], function (_exports, _emberBabel, _simpleHtmlTokenizer, _util, _handlebars) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.preprocess = preprocess;
  _exports.cannotRemoveNode = cannotRemoveNode;
  _exports.cannotReplaceNode = cannotReplaceNode;
  _exports.cannotReplaceOrRemoveInKeyHandlerYet = cannotReplaceOrRemoveInKeyHandlerYet;
  _exports.traverse = traverse;
  _exports.print = build;
  _exports.isLiteral = isLiteral;
  _exports.printLiteral = printLiteral;
  _exports.SyntaxError = _exports.Walker = _exports.TraversalError = _exports.builders = _exports.AST = void 0;

  function buildMustache(path, params, hash, raw, loc) {
    if (typeof path === 'string') {
      path = buildPath(path);
    }

    return {
      type: 'MustacheStatement',
      path: path,
      params: params || [],
      hash: hash || buildHash([]),
      escaped: !raw,
      loc: buildLoc(loc || null)
    };
  }

  function buildBlock(path, params, hash, program, inverse, loc) {
    return {
      type: 'BlockStatement',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      program: program || null,
      inverse: inverse || null,
      loc: buildLoc(loc || null)
    };
  }

  function buildElementModifier(path, params, hash, loc) {
    return {
      type: 'ElementModifierStatement',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      loc: buildLoc(loc || null)
    };
  }

  function buildPartial(name, params, hash, indent, loc) {
    return {
      type: 'PartialStatement',
      name: name,
      params: params || [],
      hash: hash || buildHash([]),
      indent: indent || '',
      strip: {
        open: false,
        close: false
      },
      loc: buildLoc(loc || null)
    };
  }

  function buildComment(value, loc) {
    return {
      type: 'CommentStatement',
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildMustacheComment(value, loc) {
    return {
      type: 'MustacheCommentStatement',
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildConcat(parts, loc) {
    return {
      type: 'ConcatStatement',
      parts: parts || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildElement(tag, attributes, modifiers, children, comments, blockParams, loc) {
    // this is used for backwards compat prior to `blockParams` being added to the AST
    if (Array.isArray(comments)) {
      if (isBlockParms(comments)) {
        blockParams = comments;
        comments = [];
      } else if (isLoc(blockParams)) {
        loc = blockParams;
        blockParams = [];
      }
    } else if (isLoc(comments)) {
      // this is used for backwards compat prior to `comments` being added to the AST
      loc = comments;
      comments = [];
    } else if (isLoc(blockParams)) {
      loc = blockParams;
      blockParams = [];
    } // this is used for backwards compat, prior to `selfClosing` being part of the ElementNode AST


    var selfClosing = false;

    if (typeof tag === 'object') {
      selfClosing = tag.selfClosing;
      tag = tag.name;
    }

    return {
      type: 'ElementNode',
      tag: tag || '',
      selfClosing: selfClosing,
      attributes: attributes || [],
      blockParams: blockParams || [],
      modifiers: modifiers || [],
      comments: comments || [],
      children: children || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildAttr(name, value, loc) {
    return {
      type: 'AttrNode',
      name: name,
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildText(chars, loc) {
    return {
      type: 'TextNode',
      chars: chars || '',
      loc: buildLoc(loc || null)
    };
  } // Expressions


  function buildSexpr(path, params, hash, loc) {
    return {
      type: 'SubExpression',
      path: buildPath(path),
      params: params || [],
      hash: hash || buildHash([]),
      loc: buildLoc(loc || null)
    };
  }

  function buildPath(original, loc) {
    if (typeof original !== 'string') return original;
    var parts = original.split('.');
    var thisHead = false;

    if (parts[0] === 'this') {
      thisHead = true;
      parts = parts.slice(1);
    }

    return {
      type: 'PathExpression',
      original: original,
      this: thisHead,
      parts: parts,
      data: false,
      loc: buildLoc(loc || null)
    };
  }

  function buildLiteral(type, value, loc) {
    return {
      type: type,
      value: value,
      original: value,
      loc: buildLoc(loc || null)
    };
  } // Miscellaneous


  function buildHash(pairs, loc) {
    return {
      type: 'Hash',
      pairs: pairs || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildPair(key, value, loc) {
    return {
      type: 'HashPair',
      key: key,
      value: value,
      loc: buildLoc(loc || null)
    };
  }

  function buildProgram(body, blockParams, loc) {
    return {
      type: 'Program',
      body: body || [],
      blockParams: blockParams || [],
      loc: buildLoc(loc || null)
    };
  }

  function buildSource(source) {
    return source || null;
  }

  function buildPosition(line, column) {
    return {
      line: line,
      column: column
    };
  }

  var SYNTHETIC = {
    source: '(synthetic)',
    start: {
      line: 1,
      column: 0
    },
    end: {
      line: 1,
      column: 0
    }
  };

  function buildLoc() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1) {
      var loc = args[0];

      if (loc && typeof loc === 'object') {
        return {
          source: buildSource(loc.source),
          start: buildPosition(loc.start.line, loc.start.column),
          end: buildPosition(loc.end.line, loc.end.column)
        };
      } else {
        return SYNTHETIC;
      }
    } else {
      var startLine = args[0],
          startColumn = args[1],
          endLine = args[2],
          endColumn = args[3],
          source = args[4];
      return {
        source: buildSource(source),
        start: buildPosition(startLine, startColumn),
        end: buildPosition(endLine, endColumn)
      };
    }
  }

  function isBlockParms(arr) {
    return arr[0] === 'string';
  }

  function isLoc(item) {
    return !Array.isArray(item);
  }

  var b = {
    mustache: buildMustache,
    block: buildBlock,
    partial: buildPartial,
    comment: buildComment,
    mustacheComment: buildMustacheComment,
    element: buildElement,
    elementModifier: buildElementModifier,
    attr: buildAttr,
    text: buildText,
    sexpr: buildSexpr,
    path: buildPath,
    concat: buildConcat,
    hash: buildHash,
    pair: buildPair,
    literal: buildLiteral,
    program: buildProgram,
    loc: buildLoc,
    pos: buildPosition,
    string: literal('StringLiteral'),
    boolean: literal('BooleanLiteral'),
    number: literal('NumberLiteral'),
    undefined: function (_undefined) {
      function undefined() {
        return _undefined.apply(this, arguments);
      }

      undefined.toString = function () {
        return _undefined.toString();
      };

      return undefined;
    }(function () {
      return buildLiteral('UndefinedLiteral', undefined);
    }),
    null: function _null() {
      return buildLiteral('NullLiteral', null);
    }
  };
  _exports.builders = b;

  function literal(type) {
    return function (value) {
      return buildLiteral(type, value);
    };
  }
  /**
   * Subclass of `Error` with additional information
   * about location of incorrect markup.
   */


  var SyntaxError = function () {
    SyntaxError.prototype = Object.create(Error.prototype);
    SyntaxError.prototype.constructor = SyntaxError;

    function SyntaxError(message, location) {
      var error = Error.call(this, message);
      this.message = message;
      this.stack = error.stack;
      this.location = location;
    }

    return SyntaxError;
  }(); // Regex to validate the identifier for block parameters.
  // Based on the ID validation regex in Handlebars.


  _exports.SyntaxError = SyntaxError;
  var ID_INVERSE_PATTERN = /[!"#%-,\.\/;->@\[-\^`\{-~]/; // Checks the element's attributes to see if it uses block params.
  // If it does, registers the block params with the program and
  // removes the corresponding attributes from the element.

  function parseElementBlockParams(element) {
    var params = parseBlockParams(element);
    if (params) element.blockParams = params;
  }

  function parseBlockParams(element) {
    var l = element.attributes.length;
    var attrNames = [];

    for (var i = 0; i < l; i++) {
      attrNames.push(element.attributes[i].name);
    }

    var asIndex = attrNames.indexOf('as');

    if (asIndex !== -1 && l > asIndex && attrNames[asIndex + 1].charAt(0) === '|') {
      // Some basic validation, since we're doing the parsing ourselves
      var paramsString = attrNames.slice(asIndex).join(' ');

      if (paramsString.charAt(paramsString.length - 1) !== '|' || paramsString.match(/\|/g).length !== 2) {
        throw new SyntaxError("Invalid block parameters syntax: '" + paramsString + "'", element.loc);
      }

      var params = [];

      for (var _i = asIndex + 1; _i < l; _i++) {
        var param = attrNames[_i].replace(/\|/g, '');

        if (param !== '') {
          if (ID_INVERSE_PATTERN.test(param)) {
            throw new SyntaxError("Invalid identifier for block parameters: '" + param + "' in '" + paramsString + "'", element.loc);
          }

          params.push(param);
        }
      }

      if (params.length === 0) {
        throw new SyntaxError("Cannot use zero block parameters: '" + paramsString + "'", element.loc);
      }

      element.attributes = element.attributes.slice(0, asIndex);
      return params;
    }

    return null;
  }

  function childrenFor(node) {
    switch (node.type) {
      case 'Program':
        return node.body;

      case 'ElementNode':
        return node.children;
    }
  }

  function appendChild(parent, node) {
    childrenFor(parent).push(node);
  }

  function isLiteral(path) {
    return path.type === 'StringLiteral' || path.type === 'BooleanLiteral' || path.type === 'NumberLiteral' || path.type === 'NullLiteral' || path.type === 'UndefinedLiteral';
  }

  function printLiteral(literal) {
    if (literal.type === 'UndefinedLiteral') {
      return 'undefined';
    } else {
      return JSON.stringify(literal.value);
    }
  }

  var entityParser = new _simpleHtmlTokenizer.EntityParser(_simpleHtmlTokenizer.HTML5NamedCharRefs);

  var Parser =
  /*#__PURE__*/
  function () {
    function Parser(source) {
      this.elementStack = [];
      this.currentAttribute = null;
      this.currentNode = null;
      this.tokenizer = new _simpleHtmlTokenizer.EventedTokenizer(this, entityParser);
      this.source = source.split(/(?:\r\n?|\n)/g);
    }

    var _proto = Parser.prototype;

    _proto.acceptNode = function acceptNode(node) {
      return this[node.type](node);
    };

    _proto.currentElement = function currentElement() {
      return this.elementStack[this.elementStack.length - 1];
    };

    _proto.sourceForNode = function sourceForNode(node, endNode) {
      var firstLine = node.loc.start.line - 1;
      var currentLine = firstLine - 1;
      var firstColumn = node.loc.start.column;
      var string = [];
      var line;
      var lastLine;
      var lastColumn;

      if (endNode) {
        lastLine = endNode.loc.end.line - 1;
        lastColumn = endNode.loc.end.column;
      } else {
        lastLine = node.loc.end.line - 1;
        lastColumn = node.loc.end.column;
      }

      while (currentLine < lastLine) {
        currentLine++;
        line = this.source[currentLine];

        if (currentLine === firstLine) {
          if (firstLine === lastLine) {
            string.push(line.slice(firstColumn, lastColumn));
          } else {
            string.push(line.slice(firstColumn));
          }
        } else if (currentLine === lastLine) {
          string.push(line.slice(0, lastColumn));
        } else {
          string.push(line);
        }
      }

      return string.join('\n');
    };

    (0, _emberBabel.createClass)(Parser, [{
      key: "currentAttr",
      get: function get() {
        return this.currentAttribute;
      }
    }, {
      key: "currentTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentStartTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentEndTag",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentComment",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }, {
      key: "currentData",
      get: function get() {
        var node = this.currentNode;
        return node;
      }
    }]);
    return Parser;
  }();

  var HandlebarsNodeVisitors =
  /*#__PURE__*/
  function (_Parser) {
    (0, _emberBabel.inheritsLoose)(HandlebarsNodeVisitors, _Parser);

    function HandlebarsNodeVisitors() {
      var _this;

      _this = _Parser.apply(this, arguments) || this;
      _this.cursorCount = 0;
      return _this;
    }

    var _proto2 = HandlebarsNodeVisitors.prototype;

    _proto2.cursor = function cursor() {
      return "%cursor:" + this.cursorCount++ + "%";
    };

    _proto2.Program = function Program(program) {
      var body = [];
      this.cursorCount = 0;
      var node = b.program(body, program.blockParams, program.loc);
      var i,
          l = program.body.length;
      this.elementStack.push(node);

      if (l === 0) {
        return this.elementStack.pop();
      }

      for (i = 0; i < l; i++) {
        this.acceptNode(program.body[i]);
      } // Ensure that that the element stack is balanced properly.


      var poppedNode = this.elementStack.pop();

      if (poppedNode !== node) {
        var elementNode = poppedNode;
        throw new SyntaxError('Unclosed element `' + elementNode.tag + '` (on line ' + elementNode.loc.start.line + ').', elementNode.loc);
      }

      return node;
    };

    _proto2.BlockStatement = function BlockStatement(block) {
      if (this.tokenizer['state'] === 'comment') {
        this.appendToCommentData(this.sourceForNode(block));
        return;
      }

      if (this.tokenizer['state'] !== 'comment' && this.tokenizer['state'] !== 'data' && this.tokenizer['state'] !== 'beforeData') {
        throw new SyntaxError('A block may only be used inside an HTML element or another block.', block.loc);
      }

      var _acceptCallNodes = acceptCallNodes(this, block),
          path = _acceptCallNodes.path,
          params = _acceptCallNodes.params,
          hash = _acceptCallNodes.hash;

      var program = this.Program(block.program);
      var inverse = block.inverse ? this.Program(block.inverse) : null;

      if (path.original === 'in-element') {
        hash = addInElementHash(this.cursor(), hash, block.loc);
      }

      var node = b.block(path, params, hash, program, inverse, block.loc);
      var parentProgram = this.currentElement();
      appendChild(parentProgram, node);
    };

    _proto2.MustacheStatement = function MustacheStatement(rawMustache) {
      var tokenizer = this.tokenizer;

      if (tokenizer.state === 'comment') {
        this.appendToCommentData(this.sourceForNode(rawMustache));
        return;
      }

      var mustache;
      var escaped = rawMustache.escaped,
          loc = rawMustache.loc;

      if (rawMustache.path.type.match(/Literal$/)) {
        mustache = {
          type: 'MustacheStatement',
          path: this.acceptNode(rawMustache.path),
          params: [],
          hash: b.hash(),
          escaped: escaped,
          loc: loc
        };
      } else {
        var _acceptCallNodes2 = acceptCallNodes(this, rawMustache),
            path = _acceptCallNodes2.path,
            params = _acceptCallNodes2.params,
            hash = _acceptCallNodes2.hash;

        mustache = b.mustache(path, params, hash, !escaped, loc);
      }

      switch (tokenizer.state) {
        // Tag helpers
        case "tagOpen"
        /* tagOpen */
        :
        case "tagName"
        /* tagName */
        :
          throw new SyntaxError("Cannot use mustaches in an elements tagname: `" + this.sourceForNode(rawMustache, rawMustache.path) + "` at L" + loc.start.line + ":C" + loc.start.column, mustache.loc);

        case "beforeAttributeName"
        /* beforeAttributeName */
        :
          addElementModifier(this.currentStartTag, mustache);
          break;

        case "attributeName"
        /* attributeName */
        :
        case "afterAttributeName"
        /* afterAttributeName */
        :
          this.beginAttributeValue(false);
          this.finishAttributeValue();
          addElementModifier(this.currentStartTag, mustache);
          tokenizer.transitionTo("beforeAttributeName"
          /* beforeAttributeName */
          );
          break;

        case "afterAttributeValueQuoted"
        /* afterAttributeValueQuoted */
        :
          addElementModifier(this.currentStartTag, mustache);
          tokenizer.transitionTo("beforeAttributeName"
          /* beforeAttributeName */
          );
          break;
        // Attribute values

        case "beforeAttributeValue"
        /* beforeAttributeValue */
        :
          this.beginAttributeValue(false);
          appendDynamicAttributeValuePart(this.currentAttribute, mustache);
          tokenizer.transitionTo("attributeValueUnquoted"
          /* attributeValueUnquoted */
          );
          break;

        case "attributeValueDoubleQuoted"
        /* attributeValueDoubleQuoted */
        :
        case "attributeValueSingleQuoted"
        /* attributeValueSingleQuoted */
        :
        case "attributeValueUnquoted"
        /* attributeValueUnquoted */
        :
          appendDynamicAttributeValuePart(this.currentAttribute, mustache);
          break;
        // TODO: Only append child when the tokenizer state makes
        // sense to do so, otherwise throw an error.

        default:
          appendChild(this.currentElement(), mustache);
      }

      return mustache;
    };

    _proto2.ContentStatement = function ContentStatement(content) {
      updateTokenizerLocation(this.tokenizer, content);
      this.tokenizer.tokenizePart(content.value);
      this.tokenizer.flushData();
    };

    _proto2.CommentStatement = function CommentStatement(rawComment) {
      var tokenizer = this.tokenizer;

      if (tokenizer.state === "comment"
      /* comment */
      ) {
          this.appendToCommentData(this.sourceForNode(rawComment));
          return null;
        }

      var value = rawComment.value,
          loc = rawComment.loc;
      var comment = b.mustacheComment(value, loc);

      switch (tokenizer.state) {
        case "beforeAttributeName"
        /* beforeAttributeName */
        :
          this.currentStartTag.comments.push(comment);
          break;

        case "beforeData"
        /* beforeData */
        :
        case "data"
        /* data */
        :
          appendChild(this.currentElement(), comment);
          break;

        default:
          throw new SyntaxError("Using a Handlebars comment when in the `" + tokenizer['state'] + "` state is not supported: \"" + comment.value + "\" on line " + loc.start.line + ":" + loc.start.column, rawComment.loc);
      }

      return comment;
    };

    _proto2.PartialStatement = function PartialStatement(partial) {
      var loc = partial.loc;
      throw new SyntaxError("Handlebars partials are not supported: \"" + this.sourceForNode(partial, partial.name) + "\" at L" + loc.start.line + ":C" + loc.start.column, partial.loc);
    };

    _proto2.PartialBlockStatement = function PartialBlockStatement(partialBlock) {
      var loc = partialBlock.loc;
      throw new SyntaxError("Handlebars partial blocks are not supported: \"" + this.sourceForNode(partialBlock, partialBlock.name) + "\" at L" + loc.start.line + ":C" + loc.start.column, partialBlock.loc);
    };

    _proto2.Decorator = function Decorator(decorator) {
      var loc = decorator.loc;
      throw new SyntaxError("Handlebars decorators are not supported: \"" + this.sourceForNode(decorator, decorator.path) + "\" at L" + loc.start.line + ":C" + loc.start.column, decorator.loc);
    };

    _proto2.DecoratorBlock = function DecoratorBlock(decoratorBlock) {
      var loc = decoratorBlock.loc;
      throw new SyntaxError("Handlebars decorator blocks are not supported: \"" + this.sourceForNode(decoratorBlock, decoratorBlock.path) + "\" at L" + loc.start.line + ":C" + loc.start.column, decoratorBlock.loc);
    };

    _proto2.SubExpression = function SubExpression(sexpr) {
      var _acceptCallNodes3 = acceptCallNodes(this, sexpr),
          path = _acceptCallNodes3.path,
          params = _acceptCallNodes3.params,
          hash = _acceptCallNodes3.hash;

      return b.sexpr(path, params, hash, sexpr.loc);
    };

    _proto2.PathExpression = function PathExpression(path) {
      var original = path.original,
          loc = path.loc;
      var parts;

      if (original.indexOf('/') !== -1) {
        if (original.slice(0, 2) === './') {
          throw new SyntaxError("Using \"./\" is not supported in Glimmer and unnecessary: \"" + path.original + "\" on line " + loc.start.line + ".", path.loc);
        }

        if (original.slice(0, 3) === '../') {
          throw new SyntaxError("Changing context using \"../\" is not supported in Glimmer: \"" + path.original + "\" on line " + loc.start.line + ".", path.loc);
        }

        if (original.indexOf('.') !== -1) {
          throw new SyntaxError("Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths: \"" + path.original + "\" on line " + loc.start.line + ".", path.loc);
        }

        parts = [path.parts.join('/')];
      } else if (original === '.') {
        var locationInfo = "L" + loc.start.line + ":C" + loc.start.column;
        throw new SyntaxError("'.' is not a supported path in Glimmer; check for a path with a trailing '.' at " + locationInfo + ".", path.loc);
      } else {
        parts = path.parts;
      }

      var thisHead = false; // This is to fix a bug in the Handlebars AST where the path expressions in
      // `{{this.foo}}` (and similarly `{{foo-bar this.foo named=this.foo}}` etc)
      // are simply turned into `{{foo}}`. The fix is to push it back onto the
      // parts array and let the runtime see the difference. However, we cannot
      // simply use the string `this` as it means literally the property called
      // "this" in the current context (it can be expressed in the syntax as
      // `{{[this]}}`, where the square bracket are generally for this kind of
      // escaping – such as `{{foo.["bar.baz"]}}` would mean lookup a property
      // named literally "bar.baz" on `this.foo`). By convention, we use `null`
      // for this purpose.

      if (original.match(/^this(\..+)?$/)) {
        thisHead = true;
      }

      return {
        type: 'PathExpression',
        original: path.original,
        this: thisHead,
        parts: parts,
        data: path.data,
        loc: path.loc
      };
    };

    _proto2.Hash = function Hash(hash) {
      var pairs = [];

      for (var i = 0; i < hash.pairs.length; i++) {
        var pair = hash.pairs[i];
        pairs.push(b.pair(pair.key, this.acceptNode(pair.value), pair.loc));
      }

      return b.hash(pairs, hash.loc);
    };

    _proto2.StringLiteral = function StringLiteral(string) {
      return b.literal('StringLiteral', string.value, string.loc);
    };

    _proto2.BooleanLiteral = function BooleanLiteral(boolean) {
      return b.literal('BooleanLiteral', boolean.value, boolean.loc);
    };

    _proto2.NumberLiteral = function NumberLiteral(number) {
      return b.literal('NumberLiteral', number.value, number.loc);
    };

    _proto2.UndefinedLiteral = function UndefinedLiteral(undef) {
      return b.literal('UndefinedLiteral', undefined, undef.loc);
    };

    _proto2.NullLiteral = function NullLiteral(nul) {
      return b.literal('NullLiteral', null, nul.loc);
    };

    return HandlebarsNodeVisitors;
  }(Parser);

  function calculateRightStrippedOffsets(original, value) {
    if (value === '') {
      // if it is empty, just return the count of newlines
      // in original
      return {
        lines: original.split('\n').length - 1,
        columns: 0
      };
    } // otherwise, return the number of newlines prior to
    // `value`


    var difference = original.split(value)[0];
    var lines = difference.split(/\n/);
    var lineCount = lines.length - 1;
    return {
      lines: lineCount,
      columns: lines[lineCount].length
    };
  }

  function updateTokenizerLocation(tokenizer, content) {
    var line = content.loc.start.line;
    var column = content.loc.start.column;
    var offsets = calculateRightStrippedOffsets(content.original, content.value);
    line = line + offsets.lines;

    if (offsets.lines) {
      column = offsets.columns;
    } else {
      column = column + offsets.columns;
    }

    tokenizer.line = line;
    tokenizer.column = column;
  }

  function acceptCallNodes(compiler, node) {
    var path = compiler.PathExpression(node.path);
    var params = node.params ? node.params.map(function (e) {
      return compiler.acceptNode(e);
    }) : [];
    var hash = node.hash ? compiler.Hash(node.hash) : b.hash();
    return {
      path: path,
      params: params,
      hash: hash
    };
  }

  function addElementModifier(element, mustache) {
    var path = mustache.path,
        params = mustache.params,
        hash = mustache.hash,
        loc = mustache.loc;

    if (isLiteral(path)) {
      var _modifier = "{{" + printLiteral(path) + "}}";

      var tag = "<" + element.name + " ... " + _modifier + " ...";
      throw new SyntaxError("In " + tag + ", " + _modifier + " is not a valid modifier: \"" + path.original + "\" on line " + (loc && loc.start.line) + ".", mustache.loc);
    }

    var modifier = b.elementModifier(path, params, hash, loc);
    element.modifiers.push(modifier);
  }

  function addInElementHash(cursor, hash, loc) {
    var hasNextSibling = false;
    hash.pairs.forEach(function (pair) {
      if (pair.key === 'guid') {
        throw new SyntaxError('Cannot pass `guid` from user space', loc);
      }

      if (pair.key === 'nextSibling') {
        hasNextSibling = true;
      }
    });
    var guid = b.literal('StringLiteral', cursor);
    var guidPair = b.pair('guid', guid);
    hash.pairs.unshift(guidPair);

    if (!hasNextSibling) {
      var nullLiteral = b.literal('NullLiteral', null);
      var nextSibling = b.pair('nextSibling', nullLiteral);
      hash.pairs.push(nextSibling);
    }

    return hash;
  }

  function appendDynamicAttributeValuePart(attribute, part) {
    attribute.isDynamic = true;
    attribute.parts.push(part);
  }

  function tuple() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return args;
  } // ensure stays in sync with typing
  // ParentNode and ChildKey types are derived from VisitorKeysMap


  var visitorKeys = {
    Program: tuple('body'),
    MustacheStatement: tuple('path', 'params', 'hash'),
    BlockStatement: tuple('path', 'params', 'hash', 'program', 'inverse'),
    ElementModifierStatement: tuple('path', 'params', 'hash'),
    PartialStatement: tuple('name', 'params', 'hash'),
    CommentStatement: tuple(),
    MustacheCommentStatement: tuple(),
    ElementNode: tuple('attributes', 'modifiers', 'children', 'comments'),
    AttrNode: tuple('value'),
    TextNode: tuple(),
    ConcatStatement: tuple('parts'),
    SubExpression: tuple('path', 'params', 'hash'),
    PathExpression: tuple(),
    StringLiteral: tuple(),
    BooleanLiteral: tuple(),
    NumberLiteral: tuple(),
    NullLiteral: tuple(),
    UndefinedLiteral: tuple(),
    Hash: tuple('pairs'),
    HashPair: tuple('value')
  };

  var TraversalError = function () {
    TraversalError.prototype = Object.create(Error.prototype);
    TraversalError.prototype.constructor = TraversalError;

    function TraversalError(message, node, parent, key) {
      var error = Error.call(this, message);
      this.key = key;
      this.message = message;
      this.node = node;
      this.parent = parent;
      this.stack = error.stack;
    }

    return TraversalError;
  }();

  _exports.TraversalError = TraversalError;

  function cannotRemoveNode(node, parent, key) {
    return new TraversalError('Cannot remove a node unless it is part of an array', node, parent, key);
  }

  function cannotReplaceNode(node, parent, key) {
    return new TraversalError('Cannot replace a node with multiple nodes unless it is part of an array', node, parent, key);
  }

  function cannotReplaceOrRemoveInKeyHandlerYet(node, key) {
    return new TraversalError('Replacing and removing in key handlers is not yet supported.', node, null, key);
  }

  function getEnterFunction(handler) {
    return typeof handler === 'function' ? handler : handler.enter;
  }

  function getExitFunction(handler) {
    return typeof handler !== 'function' ? handler.exit : undefined;
  }

  function getKeyHandler(handler, key) {
    var keyVisitor = typeof handler !== 'function' ? handler.keys : undefined;
    if (keyVisitor === undefined) return;
    var keyHandler = keyVisitor[key];

    if (keyHandler !== undefined) {
      // widen specific key to all keys
      return keyHandler;
    }

    return keyVisitor.All;
  }

  function getNodeHandler(visitor, nodeType) {
    var handler = visitor[nodeType];

    if (handler !== undefined) {
      // widen specific Node to all nodes
      return handler;
    }

    return visitor.All;
  }

  function visitNode(visitor, node) {
    var handler = getNodeHandler(visitor, node.type);
    var enter;
    var exit;

    if (handler !== undefined) {
      enter = getEnterFunction(handler);
      exit = getExitFunction(handler);
    }

    var result;

    if (enter !== undefined) {
      result = enter(node);
    }

    if (result !== undefined && result !== null) {
      if (JSON.stringify(node) === JSON.stringify(result)) {
        result = undefined;
      } else if (Array.isArray(result)) {
        visitArray(visitor, result);
        return result;
      } else {
        return visitNode(visitor, result) || result;
      }
    }

    if (result === undefined) {
      var keys = visitorKeys[node.type];

      for (var i = 0; i < keys.length; i++) {
        // we know if it has child keys we can widen to a ParentNode
        visitKey(visitor, handler, node, keys[i]);
      }

      if (exit !== undefined) {
        result = exit(node);
      }
    }

    return result;
  }

  function visitKey(visitor, handler, node, key) {
    var value = node[key];

    if (!value) {
      return;
    }

    var keyEnter;
    var keyExit;

    if (handler !== undefined) {
      var keyHandler = getKeyHandler(handler, key);

      if (keyHandler !== undefined) {
        keyEnter = getEnterFunction(keyHandler);
        keyExit = getExitFunction(keyHandler);
      }
    }

    if (keyEnter !== undefined) {
      if (keyEnter(node, key) !== undefined) {
        throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
      }
    }

    if (Array.isArray(value)) {
      visitArray(visitor, value);
    } else {
      var result = visitNode(visitor, value);

      if (result !== undefined) {
        assignKey(node, key, result);
      }
    }

    if (keyExit !== undefined) {
      if (keyExit(node, key) !== undefined) {
        throw cannotReplaceOrRemoveInKeyHandlerYet(node, key);
      }
    }
  }

  function visitArray(visitor, array) {
    for (var i = 0; i < array.length; i++) {
      var result = visitNode(visitor, array[i]);

      if (result !== undefined) {
        i += spliceArray(array, i, result) - 1;
      }
    }
  }

  function assignKey(node, key, result) {
    if (result === null) {
      throw cannotRemoveNode(node[key], node, key);
    } else if (Array.isArray(result)) {
      if (result.length === 1) {
        node[key] = result[0];
      } else {
        if (result.length === 0) {
          throw cannotRemoveNode(node[key], node, key);
        } else {
          throw cannotReplaceNode(node[key], node, key);
        }
      }
    } else {
      node[key] = result;
    }
  }

  function spliceArray(array, index, result) {
    if (result === null) {
      array.splice(index, 1);
      return 0;
    } else if (Array.isArray(result)) {
      array.splice.apply(array, [index, 1].concat(result));
      return result.length;
    } else {
      array.splice(index, 1, result);
      return 1;
    }
  }

  function traverse(node, visitor) {
    visitNode(visitor, node);
  }

  var ATTR_VALUE_REGEX_TEST = /[\xA0"&]/;
  var ATTR_VALUE_REGEX_REPLACE = new RegExp(ATTR_VALUE_REGEX_TEST.source, 'g');
  var TEXT_REGEX_TEST = /[\xA0&<>]/;
  var TEXT_REGEX_REPLACE = new RegExp(TEXT_REGEX_TEST.source, 'g');

  function attrValueReplacer(char) {
    switch (char.charCodeAt(0)) {
      case 160
      /* NBSP */
      :
        return '&nbsp;';

      case 34
      /* QUOT */
      :
        return '&quot;';

      case 38
      /* AMP */
      :
        return '&amp;';

      default:
        return char;
    }
  }

  function textReplacer(char) {
    switch (char.charCodeAt(0)) {
      case 160
      /* NBSP */
      :
        return '&nbsp;';

      case 38
      /* AMP */
      :
        return '&amp;';

      case 60
      /* LT */
      :
        return '&lt;';

      case 62
      /* GT */
      :
        return '&gt;';

      default:
        return char;
    }
  }

  function escapeAttrValue(attrValue) {
    if (ATTR_VALUE_REGEX_TEST.test(attrValue)) {
      return attrValue.replace(ATTR_VALUE_REGEX_REPLACE, attrValueReplacer);
    }

    return attrValue;
  }

  function escapeText(text) {
    if (TEXT_REGEX_TEST.test(text)) {
      return text.replace(TEXT_REGEX_REPLACE, textReplacer);
    }

    return text;
  }

  function unreachable() {
    throw new Error('unreachable');
  }

  function build(ast) {
    if (!ast) {
      return '';
    }

    var output = [];

    switch (ast.type) {
      case 'Program':
        {
          var chainBlock = ast['chained'] && ast.body[0];

          if (chainBlock) {
            chainBlock['chained'] = true;
          }

          var body = buildEach(ast.body).join('');
          output.push(body);
        }
        break;

      case 'ElementNode':
        output.push('<', ast.tag);

        if (ast.attributes.length) {
          output.push(' ', buildEach(ast.attributes).join(' '));
        }

        if (ast.modifiers.length) {
          output.push(' ', buildEach(ast.modifiers).join(' '));
        }

        if (ast.comments.length) {
          output.push(' ', buildEach(ast.comments).join(' '));
        }

        if (ast.blockParams.length) {
          output.push(' ', 'as', ' ', "|" + ast.blockParams.join(' ') + "|");
        }

        if (voidMap[ast.tag]) {
          if (ast.selfClosing) {
            output.push(' /');
          }

          output.push('>');
        } else {
          output.push('>');
          output.push.apply(output, buildEach(ast.children));
          output.push('</', ast.tag, '>');
        }

        break;

      case 'AttrNode':
        if (ast.value.type === 'TextNode') {
          if (ast.value.chars !== '') {
            output.push(ast.name, '=');
            output.push('"', escapeAttrValue(ast.value.chars), '"');
          } else {
            output.push(ast.name);
          }
        } else {
          output.push(ast.name, '='); // ast.value is mustache or concat

          output.push(build(ast.value));
        }

        break;

      case 'ConcatStatement':
        output.push('"');
        ast.parts.forEach(function (node) {
          if (node.type === 'TextNode') {
            output.push(escapeAttrValue(node.chars));
          } else {
            output.push(build(node));
          }
        });
        output.push('"');
        break;

      case 'TextNode':
        output.push(escapeText(ast.chars));
        break;

      case 'MustacheStatement':
        {
          output.push(compactJoin(['{{', pathParams(ast), '}}']));
        }
        break;

      case 'MustacheCommentStatement':
        {
          output.push(compactJoin(['{{!--', ast.value, '--}}']));
        }
        break;

      case 'ElementModifierStatement':
        {
          output.push(compactJoin(['{{', pathParams(ast), '}}']));
        }
        break;

      case 'PathExpression':
        output.push(ast.original);
        break;

      case 'SubExpression':
        {
          output.push('(', pathParams(ast), ')');
        }
        break;

      case 'BooleanLiteral':
        output.push(ast.value ? 'true' : 'false');
        break;

      case 'BlockStatement':
        {
          var lines = [];

          if (ast['chained']) {
            lines.push(['{{else ', pathParams(ast), '}}'].join(''));
          } else {
            lines.push(openBlock(ast));
          }

          lines.push(build(ast.program));

          if (ast.inverse) {
            if (!ast.inverse['chained']) {
              lines.push('{{else}}');
            }

            lines.push(build(ast.inverse));
          }

          if (!ast['chained']) {
            lines.push(closeBlock(ast));
          }

          output.push(lines.join(''));
        }
        break;

      case 'PartialStatement':
        {
          output.push(compactJoin(['{{>', pathParams(ast), '}}']));
        }
        break;

      case 'CommentStatement':
        {
          output.push(compactJoin(['<!--', ast.value, '-->']));
        }
        break;

      case 'StringLiteral':
        {
          output.push("\"" + ast.value + "\"");
        }
        break;

      case 'NumberLiteral':
        {
          output.push(String(ast.value));
        }
        break;

      case 'UndefinedLiteral':
        {
          output.push('undefined');
        }
        break;

      case 'NullLiteral':
        {
          output.push('null');
        }
        break;

      case 'Hash':
        {
          output.push(ast.pairs.map(function (pair) {
            return build(pair);
          }).join(' '));
        }
        break;

      case 'HashPair':
        {
          output.push(ast.key + "=" + build(ast.value));
        }
        break;
    }

    return output.join('');
  }

  function compact(array) {
    var newArray = [];
    array.forEach(function (a) {
      if (typeof a !== 'undefined' && a !== null && a !== '') {
        newArray.push(a);
      }
    });
    return newArray;
  }

  function buildEach(asts) {
    return asts.map(build);
  }

  function pathParams(ast) {
    var path;

    switch (ast.type) {
      case 'MustacheStatement':
      case 'SubExpression':
      case 'ElementModifierStatement':
      case 'BlockStatement':
        if (isLiteral(ast.path)) {
          return String(ast.path.value);
        }

        path = build(ast.path);
        break;

      case 'PartialStatement':
        path = build(ast.name);
        break;

      default:
        return unreachable();
    }

    return compactJoin([path, buildEach(ast.params).join(' '), build(ast.hash)], ' ');
  }

  function compactJoin(array, delimiter) {
    return compact(array).join(delimiter || '');
  }

  function blockParams(block) {
    var params = block.program.blockParams;

    if (params.length) {
      return " as |" + params.join(' ') + "|";
    }

    return null;
  }

  function openBlock(block) {
    return ['{{#', pathParams(block), blockParams(block), '}}'].join('');
  }

  function closeBlock(block) {
    return ['{{/', build(block.path), '}}'].join('');
  }

  var Walker =
  /*#__PURE__*/
  function () {
    function Walker(order) {
      this.order = order;
      this.stack = [];
    }

    var _proto3 = Walker.prototype;

    _proto3.visit = function visit(node, callback) {
      if (!node) {
        return;
      }

      this.stack.push(node);

      if (this.order === 'post') {
        this.children(node, callback);
        callback(node, this);
      } else {
        callback(node, this);
        this.children(node, callback);
      }

      this.stack.pop();
    };

    _proto3.children = function children(node, callback) {
      var visitor = visitors[node.type];

      if (visitor) {
        visitor(this, node, callback);
      }
    };

    return Walker;
  }();

  _exports.Walker = Walker;
  var visitors = {
    Program: function Program(walker, node, callback) {
      for (var i = 0; i < node.body.length; i++) {
        walker.visit(node.body[i], callback);
      }
    },
    ElementNode: function ElementNode(walker, node, callback) {
      for (var i = 0; i < node.children.length; i++) {
        walker.visit(node.children[i], callback);
      }
    },
    BlockStatement: function BlockStatement(walker, node, callback) {
      walker.visit(node.program, callback);
      walker.visit(node.inverse || null, callback);
    }
  };
  var voidMap = Object.create(null);
  var voidTagNames = 'area base br col command embed hr img input keygen link meta param source track wbr';
  voidTagNames.split(' ').forEach(function (tagName) {
    voidMap[tagName] = true;
  });

  var TokenizerEventHandlers =
  /*#__PURE__*/
  function (_HandlebarsNodeVisito) {
    (0, _emberBabel.inheritsLoose)(TokenizerEventHandlers, _HandlebarsNodeVisito);

    function TokenizerEventHandlers() {
      var _this2;

      _this2 = _HandlebarsNodeVisito.apply(this, arguments) || this;
      _this2.tagOpenLine = 0;
      _this2.tagOpenColumn = 0;
      return _this2;
    }

    var _proto4 = TokenizerEventHandlers.prototype;

    _proto4.reset = function reset() {
      this.currentNode = null;
    } // Comment
    ;

    _proto4.beginComment = function beginComment() {
      this.currentNode = b.comment('');
      this.currentNode.loc = {
        source: null,
        start: b.pos(this.tagOpenLine, this.tagOpenColumn),
        end: null
      };
    };

    _proto4.appendToCommentData = function appendToCommentData(char) {
      this.currentComment.value += char;
    };

    _proto4.finishComment = function finishComment() {
      this.currentComment.loc.end = b.pos(this.tokenizer.line, this.tokenizer.column);
      appendChild(this.currentElement(), this.currentComment);
    } // Data
    ;

    _proto4.beginData = function beginData() {
      this.currentNode = b.text();
      this.currentNode.loc = {
        source: null,
        start: b.pos(this.tokenizer.line, this.tokenizer.column),
        end: null
      };
    };

    _proto4.appendToData = function appendToData(char) {
      this.currentData.chars += char;
    };

    _proto4.finishData = function finishData() {
      this.currentData.loc.end = b.pos(this.tokenizer.line, this.tokenizer.column);
      appendChild(this.currentElement(), this.currentData);
    } // Tags - basic
    ;

    _proto4.tagOpen = function tagOpen() {
      this.tagOpenLine = this.tokenizer.line;
      this.tagOpenColumn = this.tokenizer.column;
    };

    _proto4.beginStartTag = function beginStartTag() {
      this.currentNode = {
        type: 'StartTag',
        name: '',
        attributes: [],
        modifiers: [],
        comments: [],
        selfClosing: false,
        loc: SYNTHETIC
      };
    };

    _proto4.beginEndTag = function beginEndTag() {
      this.currentNode = {
        type: 'EndTag',
        name: '',
        attributes: [],
        modifiers: [],
        comments: [],
        selfClosing: false,
        loc: SYNTHETIC
      };
    };

    _proto4.finishTag = function finishTag() {
      var _this$tokenizer = this.tokenizer,
          line = _this$tokenizer.line,
          column = _this$tokenizer.column;
      var tag = this.currentTag;
      tag.loc = b.loc(this.tagOpenLine, this.tagOpenColumn, line, column);

      if (tag.type === 'StartTag') {
        this.finishStartTag();

        if (voidMap[tag.name] || tag.selfClosing) {
          this.finishEndTag(true);
        }
      } else if (tag.type === 'EndTag') {
        this.finishEndTag(false);
      }
    };

    _proto4.finishStartTag = function finishStartTag() {
      var _this$currentStartTag = this.currentStartTag,
          name = _this$currentStartTag.name,
          attributes = _this$currentStartTag.attributes,
          modifiers = _this$currentStartTag.modifiers,
          comments = _this$currentStartTag.comments,
          selfClosing = _this$currentStartTag.selfClosing;
      var loc = b.loc(this.tagOpenLine, this.tagOpenColumn);
      var element = b.element({
        name: name,
        selfClosing: selfClosing
      }, attributes, modifiers, [], comments, [], loc);
      this.elementStack.push(element);
    };

    _proto4.finishEndTag = function finishEndTag(isVoid) {
      var tag = this.currentTag;
      var element = this.elementStack.pop();
      var parent = this.currentElement();
      validateEndTag(tag, element, isVoid);
      element.loc.end.line = this.tokenizer.line;
      element.loc.end.column = this.tokenizer.column;
      parseElementBlockParams(element);
      appendChild(parent, element);
    };

    _proto4.markTagAsSelfClosing = function markTagAsSelfClosing() {
      this.currentTag.selfClosing = true;
    } // Tags - name
    ;

    _proto4.appendToTagName = function appendToTagName(char) {
      this.currentTag.name += char;
    } // Tags - attributes
    ;

    _proto4.beginAttribute = function beginAttribute() {
      var tag = this.currentTag;

      if (tag.type === 'EndTag') {
        throw new SyntaxError("Invalid end tag: closing tag must not have attributes, " + ("in `" + tag.name + "` (on line " + this.tokenizer.line + ")."), tag.loc);
      }

      this.currentAttribute = {
        name: '',
        parts: [],
        isQuoted: false,
        isDynamic: false,
        start: b.pos(this.tokenizer.line, this.tokenizer.column),
        valueStartLine: 0,
        valueStartColumn: 0
      };
    };

    _proto4.appendToAttributeName = function appendToAttributeName(char) {
      this.currentAttr.name += char;
    };

    _proto4.beginAttributeValue = function beginAttributeValue(isQuoted) {
      this.currentAttr.isQuoted = isQuoted;
      this.currentAttr.valueStartLine = this.tokenizer.line;
      this.currentAttr.valueStartColumn = this.tokenizer.column;
    };

    _proto4.appendToAttributeValue = function appendToAttributeValue(char) {
      var parts = this.currentAttr.parts;
      var lastPart = parts[parts.length - 1];

      if (lastPart && lastPart.type === 'TextNode') {
        lastPart.chars += char; // update end location for each added char

        lastPart.loc.end.line = this.tokenizer.line;
        lastPart.loc.end.column = this.tokenizer.column;
      } else {
        // initially assume the text node is a single char
        var loc = b.loc(this.tokenizer.line, this.tokenizer.column, this.tokenizer.line, this.tokenizer.column); // correct for `\n` as first char

        if (char === '\n') {
          loc.start.line -= 1;
          loc.start.column = lastPart ? lastPart.loc.end.column : this.currentAttr.valueStartColumn;
        }

        var text = b.text(char, loc);
        parts.push(text);
      }
    };

    _proto4.finishAttributeValue = function finishAttributeValue() {
      var _this$currentAttr = this.currentAttr,
          name = _this$currentAttr.name,
          parts = _this$currentAttr.parts,
          isQuoted = _this$currentAttr.isQuoted,
          isDynamic = _this$currentAttr.isDynamic,
          valueStartLine = _this$currentAttr.valueStartLine,
          valueStartColumn = _this$currentAttr.valueStartColumn;
      var value = assembleAttributeValue(parts, isQuoted, isDynamic, this.tokenizer.line);
      value.loc = b.loc(valueStartLine, valueStartColumn, this.tokenizer.line, this.tokenizer.column);
      var loc = b.loc(this.currentAttr.start.line, this.currentAttr.start.column, this.tokenizer.line, this.tokenizer.column);
      var attribute = b.attr(name, value, loc);
      this.currentStartTag.attributes.push(attribute);
    };

    _proto4.reportSyntaxError = function reportSyntaxError(message) {
      throw new SyntaxError("Syntax error at line " + this.tokenizer.line + " col " + this.tokenizer.column + ": " + message, b.loc(this.tokenizer.line, this.tokenizer.column));
    };

    return TokenizerEventHandlers;
  }(HandlebarsNodeVisitors);

  function assembleAttributeValue(parts, isQuoted, isDynamic, line) {
    if (isDynamic) {
      if (isQuoted) {
        return assembleConcatenatedValue(parts);
      } else {
        if (parts.length === 1 || parts.length === 2 && parts[1].type === 'TextNode' && parts[1].chars === '/') {
          return parts[0];
        } else {
          throw new SyntaxError("An unquoted attribute value must be a string or a mustache, " + "preceeded by whitespace or a '=' character, and " + ("followed by whitespace, a '>' character, or '/>' (on line " + line + ")"), b.loc(line, 0));
        }
      }
    } else {
      return parts.length > 0 ? parts[0] : b.text('');
    }
  }

  function assembleConcatenatedValue(parts) {
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];

      if (part.type !== 'MustacheStatement' && part.type !== 'TextNode') {
        throw new SyntaxError('Unsupported node in quoted attribute value: ' + part['type'], part.loc);
      }
    }

    return b.concat(parts);
  }

  function validateEndTag(tag, element, selfClosing) {
    var error;

    if (voidMap[tag.name] && !selfClosing) {
      // EngTag is also called by StartTag for void and self-closing tags (i.e.
      // <input> or <br />, so we need to check for that here. Otherwise, we would
      // throw an error for those cases.
      error = 'Invalid end tag ' + formatEndTagInfo(tag) + ' (void elements cannot have end tags).';
    } else if (element.tag === undefined) {
      error = 'Closing tag ' + formatEndTagInfo(tag) + ' without an open tag.';
    } else if (element.tag !== tag.name) {
      error = 'Closing tag ' + formatEndTagInfo(tag) + ' did not match last open tag `' + element.tag + '` (on line ' + element.loc.start.line + ').';
    }

    if (error) {
      throw new SyntaxError(error, element.loc);
    }
  }

  function formatEndTagInfo(tag) {
    return '`' + tag.name + '` (on line ' + tag.loc.end.line + ')';
  }

  var syntax = {
    parse: preprocess,
    builders: b,
    print: build,
    traverse: traverse,
    Walker: Walker
  };

  function preprocess(html, options) {
    var parseOptions = options ? options.parseOptions : {};
    var ast = typeof html === 'object' ? html : (0, _handlebars.parse)(html, parseOptions);
    var program = new TokenizerEventHandlers(html).acceptNode(ast);

    if (options && options.plugins && options.plugins.ast) {
      for (var i = 0, l = options.plugins.ast.length; i < l; i++) {
        var transform = options.plugins.ast[i];
        var env = (0, _util.assign)({}, options, {
          syntax: syntax
        }, {
          plugins: undefined
        });
        var pluginResult = transform(env);
        traverse(program, pluginResult.visitor);
      }
    }

    return program;
  }

  var nodes =
  /*#__PURE__*/
  Object.freeze({}); // used by ember-compiler

  _exports.AST = nodes;
});
define("@glimmer/util", ["exports", "ember-babel"], function (_exports, _emberBabel) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.assert = debugAssert;
  _exports.assign = assign;
  _exports.fillNulls = fillNulls;
  _exports.ensureGuid = ensureGuid;
  _exports.initializeGuid = initializeGuid;
  _exports.dict = dict;
  _exports.unwrap = unwrap;
  _exports.expect = expect;
  _exports.unreachable = unreachable;
  _exports.EMPTY_ARRAY = _exports.ListSlice = _exports.ListNode = _exports.LinkedList = _exports.EMPTY_SLICE = _exports.DictSet = _exports.Stack = void 0;

  function unwrap(val) {
    if (val === null || val === undefined) throw new Error("Expected value to be present");
    return val;
  }

  function expect(val, message) {
    if (val === null || val === undefined) throw new Error(message);
    return val;
  }

  function unreachable(message) {
    if (message === void 0) {
      message = 'unreachable';
    }

    return new Error(message);
  } // import Logger from './logger';
  // let alreadyWarned = false;


  function debugAssert(test, msg) {
    // if (!alreadyWarned) {
    //   alreadyWarned = true;
    //   Logger.warn("Don't leave debug assertions on in public builds");
    // }
    if (!test) {
      throw new Error(msg || 'assertion failure');
    }
  }

  var objKeys = Object.keys;

  function assign(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var assignment = arguments[i];
      if (assignment === null || typeof assignment !== 'object') continue;
      var keys = objKeys(assignment);

      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        obj[key] = assignment[key];
      }
    }

    return obj;
  }

  function fillNulls(count) {
    var arr = new Array(count);

    for (var i = 0; i < count; i++) {
      arr[i] = null;
    }

    return arr;
  }

  var GUID = 0;

  function initializeGuid(object) {
    return object._guid = ++GUID;
  }

  function ensureGuid(object) {
    return object._guid || initializeGuid(object);
  }

  function dict() {
    return Object.create(null);
  }

  var DictSet =
  /*#__PURE__*/
  function () {
    function DictSet() {
      this.dict = dict();
    }

    var _proto = DictSet.prototype;

    _proto.add = function add(obj) {
      if (typeof obj === 'string') this.dict[obj] = obj;else this.dict[ensureGuid(obj)] = obj;
      return this;
    };

    _proto.delete = function _delete(obj) {
      if (typeof obj === 'string') delete this.dict[obj];else if (obj._guid) delete this.dict[obj._guid];
    };

    return DictSet;
  }();

  _exports.DictSet = DictSet;

  var Stack =
  /*#__PURE__*/
  function () {
    function Stack() {
      this.stack = [];
      this.current = null;
    }

    var _proto2 = Stack.prototype;

    _proto2.push = function push(item) {
      this.current = item;
      this.stack.push(item);
    };

    _proto2.pop = function pop() {
      var item = this.stack.pop();
      var len = this.stack.length;
      this.current = len === 0 ? null : this.stack[len - 1];
      return item === undefined ? null : item;
    };

    _proto2.isEmpty = function isEmpty() {
      return this.stack.length === 0;
    };

    (0, _emberBabel.createClass)(Stack, [{
      key: "size",
      get: function get() {
        return this.stack.length;
      }
    }]);
    return Stack;
  }();

  _exports.Stack = Stack;

  var ListNode = function ListNode(value) {
    this.next = null;
    this.prev = null;
    this.value = value;
  };

  _exports.ListNode = ListNode;

  var LinkedList =
  /*#__PURE__*/
  function () {
    function LinkedList() {
      this.clear();
    }

    var _proto3 = LinkedList.prototype;

    _proto3.head = function head() {
      return this._head;
    };

    _proto3.tail = function tail() {
      return this._tail;
    };

    _proto3.clear = function clear() {
      this._head = this._tail = null;
    };

    _proto3.toArray = function toArray() {
      var out = [];
      this.forEachNode(function (n) {
        return out.push(n);
      });
      return out;
    };

    _proto3.nextNode = function nextNode(node) {
      return node.next;
    };

    _proto3.forEachNode = function forEachNode(callback) {
      var node = this._head;

      while (node !== null) {
        callback(node);
        node = node.next;
      }
    };

    _proto3.insertBefore = function insertBefore(node, reference) {
      if (reference === void 0) {
        reference = null;
      }

      if (reference === null) return this.append(node);
      if (reference.prev) reference.prev.next = node;else this._head = node;
      node.prev = reference.prev;
      node.next = reference;
      reference.prev = node;
      return node;
    };

    _proto3.append = function append(node) {
      var tail = this._tail;

      if (tail) {
        tail.next = node;
        node.prev = tail;
        node.next = null;
      } else {
        this._head = node;
      }

      return this._tail = node;
    };

    _proto3.remove = function remove(node) {
      if (node.prev) node.prev.next = node.next;else this._head = node.next;
      if (node.next) node.next.prev = node.prev;else this._tail = node.prev;
      return node;
    };

    return LinkedList;
  }();

  _exports.LinkedList = LinkedList;

  var ListSlice =
  /*#__PURE__*/
  function () {
    function ListSlice(head, tail) {
      this._head = head;
      this._tail = tail;
    }

    var _proto4 = ListSlice.prototype;

    _proto4.forEachNode = function forEachNode(callback) {
      var node = this._head;

      while (node !== null) {
        callback(node);
        node = this.nextNode(node);
      }
    };

    _proto4.head = function head() {
      return this._head;
    };

    _proto4.tail = function tail() {
      return this._tail;
    };

    _proto4.toArray = function toArray() {
      var out = [];
      this.forEachNode(function (n) {
        return out.push(n);
      });
      return out;
    };

    _proto4.nextNode = function nextNode(node) {
      if (node === this._tail) return null;
      return node.next;
    };

    return ListSlice;
  }();

  _exports.ListSlice = ListSlice;
  var EMPTY_SLICE = new ListSlice(null, null);
  _exports.EMPTY_SLICE = EMPTY_SLICE;
  var EMPTY_ARRAY = Object.freeze([]);
  _exports.EMPTY_ARRAY = EMPTY_ARRAY;
});
define("@glimmer/wire-format", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.is = is;
  _exports.isAttribute = isAttribute;
  _exports.isArgument = isArgument;
  _exports.isMaybeLocal = _exports.isGet = _exports.isFlushElement = _exports.Ops = void 0;
  var Opcodes;
  _exports.Ops = Opcodes;

  (function (Opcodes) {
    // Statements
    Opcodes[Opcodes["Text"] = 0] = "Text";
    Opcodes[Opcodes["Append"] = 1] = "Append";
    Opcodes[Opcodes["Comment"] = 2] = "Comment";
    Opcodes[Opcodes["Modifier"] = 3] = "Modifier";
    Opcodes[Opcodes["Block"] = 4] = "Block";
    Opcodes[Opcodes["Component"] = 5] = "Component";
    Opcodes[Opcodes["DynamicComponent"] = 6] = "DynamicComponent";
    Opcodes[Opcodes["OpenElement"] = 7] = "OpenElement";
    Opcodes[Opcodes["FlushElement"] = 8] = "FlushElement";
    Opcodes[Opcodes["CloseElement"] = 9] = "CloseElement";
    Opcodes[Opcodes["StaticAttr"] = 10] = "StaticAttr";
    Opcodes[Opcodes["DynamicAttr"] = 11] = "DynamicAttr";
    Opcodes[Opcodes["ComponentAttr"] = 12] = "ComponentAttr";
    Opcodes[Opcodes["AttrSplat"] = 13] = "AttrSplat";
    Opcodes[Opcodes["Yield"] = 14] = "Yield";
    Opcodes[Opcodes["Partial"] = 15] = "Partial";
    Opcodes[Opcodes["DynamicArg"] = 16] = "DynamicArg";
    Opcodes[Opcodes["StaticArg"] = 17] = "StaticArg";
    Opcodes[Opcodes["TrustingAttr"] = 18] = "TrustingAttr";
    Opcodes[Opcodes["TrustingComponentAttr"] = 19] = "TrustingComponentAttr";
    Opcodes[Opcodes["Debugger"] = 20] = "Debugger";
    Opcodes[Opcodes["ClientSideStatement"] = 21] = "ClientSideStatement"; // Expressions

    Opcodes[Opcodes["Unknown"] = 22] = "Unknown";
    Opcodes[Opcodes["Get"] = 23] = "Get";
    Opcodes[Opcodes["MaybeLocal"] = 24] = "MaybeLocal";
    Opcodes[Opcodes["HasBlock"] = 25] = "HasBlock";
    Opcodes[Opcodes["HasBlockParams"] = 26] = "HasBlockParams";
    Opcodes[Opcodes["Undefined"] = 27] = "Undefined";
    Opcodes[Opcodes["Helper"] = 28] = "Helper";
    Opcodes[Opcodes["Concat"] = 29] = "Concat";
    Opcodes[Opcodes["ClientSideExpression"] = 30] = "ClientSideExpression";
  })(Opcodes || (_exports.Ops = Opcodes = {}));

  function is(variant) {
    return function (value) {
      return Array.isArray(value) && value[0] === variant;
    };
  } // Statements


  var isFlushElement = is(Opcodes.FlushElement);
  _exports.isFlushElement = isFlushElement;

  function isAttribute(val) {
    return val[0] === Opcodes.StaticAttr || val[0] === Opcodes.DynamicAttr || val[0] === Opcodes.ComponentAttr || val[0] === Opcodes.TrustingAttr || val[0] === Opcodes.TrustingComponentAttr || val[0] === Opcodes.AttrSplat || val[0] === Opcodes.Modifier;
  }

  function isArgument(val) {
    return val[0] === Opcodes.StaticArg || val[0] === Opcodes.DynamicArg;
  } // Expressions


  var isGet = is(Opcodes.Get);
  _exports.isGet = isGet;
  var isMaybeLocal = is(Opcodes.MaybeLocal);
  _exports.isMaybeLocal = isMaybeLocal;
});
define("ember-babel", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.wrapNativeSuper = wrapNativeSuper;
  _exports.classCallCheck = classCallCheck;
  _exports.inheritsLoose = inheritsLoose;
  _exports.taggedTemplateLiteralLoose = taggedTemplateLiteralLoose;
  _exports.createClass = createClass;
  _exports.assertThisInitialized = assertThisInitialized;
  _exports.possibleConstructorReturn = possibleConstructorReturn;
  _exports.objectDestructuringEmpty = objectDestructuringEmpty;
  var setPrototypeOf = Object.setPrototypeOf;
  var nativeWrapperCache = new Map(); // Super minimal version of Babel's wrapNativeSuper. We only use this for
  // extending Function, for ComputedDecoratorImpl and AliasDecoratorImpl. We know
  // we will never directly create an instance of these classes so no need to
  // include `construct` code or other helpers.

  function wrapNativeSuper(Class) {
    if (nativeWrapperCache.has(Class)) {
      return nativeWrapperCache.get(Class);
    }

    function Wrapper() {}

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    nativeWrapperCache.set(Class, Wrapper);
    return setPrototypeOf(Wrapper, Class);
  }

  function classCallCheck(instance, Constructor) {
    if (true
    /* DEBUG */
    ) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
  }
  /*
    Overrides default `inheritsLoose` to _also_ call `Object.setPrototypeOf`.
    This is needed so that we can use `loose` option with the
    `@babel/plugin-transform-classes` (because we want simple assignment to the
    prototype whereever possible) but also keep our constructor based prototypal
    inheritance working properly
  */


  function inheritsLoose(subClass, superClass) {
    if (true
    /* DEBUG */
    ) {
      if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function');
      }
    }

    subClass.prototype = Object.create(superClass === null ? null : superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });

    if (superClass !== null) {
      setPrototypeOf(subClass, superClass);
    }
  }

  function taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  /*
    Differs from default implementation by avoiding boolean coercion of
    `protoProps` and `staticProps`.
  */


  function createClass(Constructor, protoProps, staticProps) {
    if (protoProps !== null && protoProps !== undefined) {
      _defineProperties(Constructor.prototype, protoProps);
    }

    if (staticProps !== null && staticProps !== undefined) {
      _defineProperties(Constructor, staticProps);
    }

    return Constructor;
  }

  function assertThisInitialized(self) {
    if (true
    /* DEBUG */
    && self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /*
    Adds `DEBUG` guard to error being thrown, and avoids boolean coercion of `call`.
  */


  function possibleConstructorReturn(self, call) {
    if (typeof call === 'object' && call !== null || typeof call === 'function') {
      return call;
    }

    return assertThisInitialized(self);
  }

  function objectDestructuringEmpty(obj) {
    if (true
    /* DEBUG */
    && (obj === null || obj === undefined)) {
      throw new TypeError('Cannot destructure undefined');
    }
  }
});
define("ember-template-compiler/index", ["exports", "@ember/-internals/environment", "@ember/canary-features", "ember/version", "ember-template-compiler/lib/compat", "ember-template-compiler/lib/system/precompile", "ember-template-compiler/lib/system/compile", "ember-template-compiler/lib/system/compile-options", "ember-template-compiler/lib/plugins/index", "ember-template-compiler/lib/system/bootstrap", "ember-template-compiler/lib/system/initializer"], function (_exports, _environment, _canaryFeatures, _version, _compat, _precompile, _compile, _compileOptions, _index, _bootstrap, _initializer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "precompile", {
    enumerable: true,
    get: function get() {
      return _precompile.default;
    }
  });
  Object.defineProperty(_exports, "compile", {
    enumerable: true,
    get: function get() {
      return _compile.default;
    }
  });
  Object.defineProperty(_exports, "compileOptions", {
    enumerable: true,
    get: function get() {
      return _compileOptions.default;
    }
  });
  Object.defineProperty(_exports, "registerPlugin", {
    enumerable: true,
    get: function get() {
      return _compileOptions.registerPlugin;
    }
  });
  Object.defineProperty(_exports, "unregisterPlugin", {
    enumerable: true,
    get: function get() {
      return _compileOptions.unregisterPlugin;
    }
  });
  Object.defineProperty(_exports, "defaultPlugins", {
    enumerable: true,
    get: function get() {
      return _index.default;
    }
  });
  _exports._Ember = void 0;

  var _Ember = typeof _environment.context.imports.Ember === 'object' && _environment.context.imports.Ember || {}; // private API used by ember-cli-htmlbars to setup ENV and FEATURES


  _exports._Ember = _Ember;

  if (!_Ember.ENV) {
    _Ember.ENV = _environment.ENV;
  }

  if (!_Ember.FEATURES) {
    _Ember.FEATURES = _canaryFeatures.FEATURES;
  }

  if (!_Ember.VERSION) {
    _Ember.VERSION = _version.default;
  } // used for adding Ember.Handlebars.compile for backwards compat


  (0, _compat.default)(_Ember);
});
define("ember-template-compiler/lib/compat", ["exports", "ember-template-compiler/lib/system/compile", "ember-template-compiler/lib/system/compile-options", "ember-template-compiler/lib/system/precompile"], function (_exports, _compile, _compileOptions, _precompile) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = setupGlobal;

  function setupGlobal(Ember) {
    var EmberHandlebars = Ember.Handlebars;

    if (!EmberHandlebars) {
      Ember.Handlebars = EmberHandlebars = {};
    }

    var EmberHTMLBars = Ember.HTMLBars;

    if (!EmberHTMLBars) {
      Ember.HTMLBars = EmberHTMLBars = {};
    }

    EmberHTMLBars.precompile = EmberHandlebars.precompile = _precompile.default;
    EmberHTMLBars.compile = EmberHandlebars.compile = _compile.default;
    EmberHTMLBars.registerPlugin = _compileOptions.registerPlugin;
  }
});
define("ember-template-compiler/lib/plugins/assert-if-helper-without-arguments", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertIfHelperWithoutArguments;

  function assertIfHelperWithoutArguments(env) {
    var moduleName = env.meta.moduleName;
    return {
      name: 'assert-if-helper-without-arguments',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (isInvalidBlockIf(node)) {
            (true && !(false) && (0, _debug.assert)(blockAssertMessage(node.path.original) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc)));
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (isInvalidInlineIf(node)) {
            (true && !(false) && (0, _debug.assert)(inlineAssertMessage(node.path.original) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc)));
          }
        },
        SubExpression: function SubExpression(node) {
          if (isInvalidInlineIf(node)) {
            (true && !(false) && (0, _debug.assert)(inlineAssertMessage(node.path.original) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc)));
          }
        }
      }
    };
  }

  function blockAssertMessage(original) {
    return "#" + original + " requires a single argument.";
  }

  function inlineAssertMessage(original) {
    return "The inline form of the '" + original + "' helper expects two or three arguments.";
  }

  function isInvalidInlineIf(node) {
    return node.path.original === 'if' && (!node.params || node.params.length < 2 || node.params.length > 3);
  }

  function isInvalidBlockIf(node) {
    return node.path.original === 'if' && (!node.params || node.params.length !== 1);
  }
});
define("ember-template-compiler/lib/plugins/assert-input-helper-without-block", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = errorOnInputWithContent;

  function errorOnInputWithContent(env) {
    var moduleName = env.meta.moduleName;
    return {
      name: 'assert-input-helper-without-block',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (node.path.original !== 'input') {
            return;
          }

          (true && !(false) && (0, _debug.assert)(assertMessage(moduleName, node)));
        }
      }
    };
  }

  function assertMessage(moduleName, node) {
    var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
    return "The {{input}} helper cannot be used in block form. " + sourceInformation;
  }
});
define("ember-template-compiler/lib/plugins/assert-local-variable-shadowing-helper-invocation", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertLocalVariableShadowingHelperInvocation;

  function assertLocalVariableShadowingHelperInvocation(env) {
    var moduleName = env.meta.moduleName;
    var locals = [];
    return {
      name: 'assert-local-variable-shadowing-helper-invocation',
      visitor: {
        Program: {
          enter: function enter(node) {
            locals.push(node.blockParams);
          },
          exit: function exit() {
            locals.pop();
          }
        },
        ElementNode: {
          keys: {
            children: {
              enter: function enter(node) {
                locals.push(node.blockParams);
              },
              exit: function exit() {
                locals.pop();
              }
            }
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (isPath(node.path) && hasArguments(node)) {
            var name = node.path.parts[0];
            var type = 'helper';
            (true && !(!isLocalVariable(node.path, locals)) && (0, _debug.assert)(messageFor(name, type) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), !isLocalVariable(node.path, locals)));
          }
        },
        SubExpression: function SubExpression(node) {
          var name = node.path.parts[0];
          var type = 'helper';
          (true && !(!isLocalVariable(node.path, locals)) && (0, _debug.assert)(messageFor(name, type) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), !isLocalVariable(node.path, locals)));
        },
        ElementModifierStatement: function ElementModifierStatement(node) {
          var name = node.path.parts[0];
          var type = 'modifier';
          (true && !(!isLocalVariable(node.path, locals)) && (0, _debug.assert)(messageFor(name, type) + " " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), !isLocalVariable(node.path, locals)));
        }
      }
    };
  }

  function isLocalVariable(node, locals) {
    return !node.this && node.parts.length === 1 && hasLocalVariable(node.parts[0], locals);
  }

  function hasLocalVariable(name, locals) {
    return locals.some(function (names) {
      return names.indexOf(name) !== -1;
    });
  }

  function messageFor(name, type) {
    return "Cannot invoke the `" + name + "` " + type + " because it was shadowed by a local variable (i.e. a block param) with the same name. Please rename the local variable to resolve the conflict.";
  }

  function isPath(node) {
    return node.type === 'PathExpression';
  }

  function hasArguments(node) {
    return node.params.length > 0 || node.hash.pairs.length > 0;
  }
});
define("ember-template-compiler/lib/plugins/assert-reserved-named-arguments", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertReservedNamedArguments;

  function assertReservedNamedArguments(env) {
    var moduleName = env.meta.moduleName;
    return {
      name: 'assert-reserved-named-arguments',
      visitor: {
        // In general, we don't assert on the invocation side to avoid creating migration
        // hazards (e.g. using angle bracket to invoke a classic component that uses
        // `this.someReservedName`. However, we want to avoid leaking special internal
        // things, such as `__ARGS__`, so those would need to be asserted on both sides.
        AttrNode: function AttrNode(_ref) {
          var name = _ref.name,
              loc = _ref.loc;

          if (name === '@__ARGS__') {
            (true && !(false) && (0, _debug.assert)(assertMessage(name) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        },
        HashPair: function HashPair(_ref2) {
          var key = _ref2.key,
              loc = _ref2.loc;

          if (key === '__ARGS__') {
            (true && !(false) && (0, _debug.assert)(assertMessage(key) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        },
        PathExpression: function PathExpression(_ref3) {
          var original = _ref3.original,
              loc = _ref3.loc;

          if (isReserved(original)) {
            (true && !(false) && (0, _debug.assert)(assertMessage(original) + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        }
      }
    };
  }

  var RESERVED = ['@arguments', '@args', '@block', '@else'];

  function isReserved(name) {
    return RESERVED.indexOf(name) !== -1 || Boolean(name.match(/^@[^a-z]/));
  }

  function assertMessage(name) {
    return "'" + name + "' is reserved.";
  }
});
define("ember-template-compiler/lib/plugins/assert-splattribute-expression", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = assertSplattributeExpressions;

  function assertSplattributeExpressions(env) {
    var moduleName = env.meta.moduleName;
    return {
      name: 'assert-splattribute-expressions',
      visitor: {
        PathExpression: function PathExpression(_ref) {
          var original = _ref.original,
              loc = _ref.loc;

          if (original === '...attributes') {
            (true && !(false) && (0, _debug.assert)(errorMessage() + " " + (0, _calculateLocationDisplay.default)(moduleName, loc)));
          }
        }
      }
    };
  }

  function errorMessage() {
    return '`...attributes` can only be used in the element position e.g. `<div ...attributes />`. It cannot be used as a path.';
  }
});
define("ember-template-compiler/lib/plugins/deprecate-send-action", ["exports", "@ember/debug", "@ember/deprecated-features", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _deprecatedFeatures, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = deprecateSendAction;
  var EVENTS = ['insert-newline', 'enter', 'escape-press', 'focus-in', 'focus-out', 'key-press', 'key-up', 'key-down'];

  function deprecateSendAction(env) {
    if (_deprecatedFeatures.SEND_ACTION) {
      var moduleName = env.meta.moduleName;

      var deprecationMessage = function deprecationMessage(node, eventName, actionName) {
        var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);

        if (node.type === 'ElementNode') {
          return "Passing actions to components as strings (like `<Input @" + eventName + "=\"" + actionName + "\" />`) is deprecated. Please use closure actions instead (`<Input @" + eventName + "={{action \"" + actionName + "\"}} />`). " + sourceInformation;
        } else {
          return "Passing actions to components as strings (like `{{input " + eventName + "=\"" + actionName + "\"}}`) is deprecated. Please use closure actions instead (`{{input " + eventName + "=(action \"" + actionName + "\")}}`). " + sourceInformation;
        }
      };

      return {
        name: 'deprecate-send-action',
        visitor: {
          ElementNode: function ElementNode(node) {
            if (node.tag !== 'Input') {
              return;
            }

            node.attributes.forEach(function (_ref) {
              var name = _ref.name,
                  value = _ref.value;

              if (name.charAt(0) === '@') {
                var eventName = name.substring(1);

                if (EVENTS.indexOf(eventName) > -1) {
                  if (value.type === 'TextNode') {
                    (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, eventName, value.chars), false, {
                      id: 'ember-component.send-action',
                      until: '4.0.0',
                      url: 'https://emberjs.com/deprecations/v3.x#toc_ember-component-send-action'
                    }));
                  } else if (value.type === 'MustacheStatement' && value.path.type === 'StringLiteral') {
                    (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, eventName, value.path.original), false, {
                      id: 'ember-component.send-action',
                      until: '4.0.0',
                      url: 'https://emberjs.com/deprecations/v3.x#toc_ember-component-send-action'
                    }));
                  }
                }
              }
            });
          },
          MustacheStatement: function MustacheStatement(node) {
            if (node.path.original !== 'input') {
              return;
            }

            node.hash.pairs.forEach(function (pair) {
              if (EVENTS.indexOf(pair.key) > -1 && pair.value.type === 'StringLiteral') {
                (true && !(false) && (0, _debug.deprecate)(deprecationMessage(node, pair.key, pair.value.original), false, {
                  id: 'ember-component.send-action',
                  until: '4.0.0',
                  url: 'https://emberjs.com/deprecations/v3.x#toc_ember-component-send-action'
                }));
              }
            });
          }
        }
      };
    }

    return;
  }
});
define("ember-template-compiler/lib/plugins/index", ["exports", "ember-template-compiler/lib/plugins/assert-if-helper-without-arguments", "ember-template-compiler/lib/plugins/assert-input-helper-without-block", "ember-template-compiler/lib/plugins/assert-local-variable-shadowing-helper-invocation", "ember-template-compiler/lib/plugins/assert-reserved-named-arguments", "ember-template-compiler/lib/plugins/assert-splattribute-expression", "ember-template-compiler/lib/plugins/deprecate-send-action", "ember-template-compiler/lib/plugins/transform-action-syntax", "ember-template-compiler/lib/plugins/transform-attrs-into-args", "ember-template-compiler/lib/plugins/transform-component-invocation", "ember-template-compiler/lib/plugins/transform-each-in-into-each", "ember-template-compiler/lib/plugins/transform-has-block-syntax", "ember-template-compiler/lib/plugins/transform-in-element", "ember-template-compiler/lib/plugins/transform-link-to", "ember-template-compiler/lib/plugins/transform-old-class-binding-syntax", "ember-template-compiler/lib/plugins/transform-quoted-bindings-into-just-bindings", "@ember/deprecated-features"], function (_exports, _assertIfHelperWithoutArguments, _assertInputHelperWithoutBlock, _assertLocalVariableShadowingHelperInvocation, _assertReservedNamedArguments, _assertSplattributeExpression, _deprecateSendAction, _transformActionSyntax, _transformAttrsIntoArgs, _transformComponentInvocation, _transformEachInIntoEach, _transformHasBlockSyntax, _transformInElement, _transformLinkTo, _transformOldClassBindingSyntax, _transformQuotedBindingsIntoJustBindings, _deprecatedFeatures) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var transforms = [_transformComponentInvocation.default, _transformOldClassBindingSyntax.default, _transformQuotedBindingsIntoJustBindings.default, _assertReservedNamedArguments.default, _transformActionSyntax.default, _transformAttrsIntoArgs.default, _transformEachInIntoEach.default, _transformHasBlockSyntax.default, _assertLocalVariableShadowingHelperInvocation.default, _transformLinkTo.default, _assertInputHelperWithoutBlock.default, _transformInElement.default, _assertIfHelperWithoutArguments.default, _assertSplattributeExpression.default];

  if (_deprecatedFeatures.SEND_ACTION) {
    transforms.push(_deprecateSendAction.default);
  }

  var _default = Object.freeze(transforms);

  _exports.default = _default;
});
define("ember-template-compiler/lib/plugins/transform-action-syntax", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformActionSyntax;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   <button {{action 'foo'}}>
   <button onblur={{action 'foo'}}>
   <button onblur={{action (action 'foo') 'bar'}}>
    ```
  
    with
  
    ```handlebars
   <button {{action this 'foo'}}>
   <button onblur={{action this 'foo'}}>
   <button onblur={{action this (action this 'foo') 'bar'}}>
    ```
  
    @private
    @class TransformActionSyntax
  */
  function transformActionSyntax(_ref) {
    var syntax = _ref.syntax;
    var b = syntax.builders;
    return {
      name: 'transform-action-syntax',
      visitor: {
        ElementModifierStatement: function ElementModifierStatement(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        },
        SubExpression: function SubExpression(node) {
          if (isAction(node)) {
            insertThisAsFirstParam(node, b);
          }
        }
      }
    };
  }

  function isAction(node) {
    return node.path.original === 'action';
  }

  function insertThisAsFirstParam(node, builders) {
    node.params.unshift(builders.path('this'));
  }
});
define("ember-template-compiler/lib/plugins/transform-attrs-into-args", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformAttrsIntoArgs;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   {{attrs.foo.bar}}
    ```
  
    to
  
    ```handlebars
   {{@foo.bar}}
    ```
  
    as well as `{{#if attrs.foo}}`, `{{deeply (nested attrs.foobar.baz)}}`,
    `{{this.attrs.foo}}` etc
  
    @private
    @class TransformAttrsToProps
  */
  function transformAttrsIntoArgs(env) {
    var b = env.syntax.builders;
    var stack = [[]];
    return {
      name: 'transform-attrs-into-args',
      visitor: {
        Program: {
          enter: function enter(node) {
            var parent = stack[stack.length - 1];
            stack.push(parent.concat(node.blockParams));
          },
          exit: function exit() {
            stack.pop();
          }
        },
        PathExpression: function PathExpression(node) {
          if (isAttrs(node, stack[stack.length - 1])) {
            var path = b.path(node.original.substr(6));
            path.original = "@" + path.original;
            path.data = true;
            return path;
          }
        }
      }
    };
  }

  function isAttrs(node, symbols) {
    var name = node.parts[0];

    if (symbols.indexOf(name) !== -1) {
      return false;
    }

    if (name === 'attrs') {
      if (node.this === true) {
        node.parts.shift();
        node.original = node.original.slice(5);
      }

      return true;
    }

    return false;
  }
});
define("ember-template-compiler/lib/plugins/transform-component-invocation", ["exports", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformComponentInvocation;

  /**
    Transforms unambigious invocations of closure components to be wrapped with
    the component helper. Once these syntaxes are fully supported by Glimmer VM
    natively, this transform can be removed.
  
    ```handlebars
    {{!-- this.foo is not a legal helper/component name --}}
    {{this.foo "with" some="args"}}
    ```
  
    with
  
    ```handlebars
    {{component this.foo "with" some="args"}}
    ```
  
    and
  
    ```handlebars
    {{!-- this.foo is not a legal helper/component name --}}
    {{#this.foo}}...{{/this.foo}}
    ```
  
    with
  
    ```handlebars
    {{#component this.foo}}...{{/component}}
    ```
  
    and
  
    ```handlebars
    {{!-- foo.bar is not a legal helper/component name --}}
    {{foo.bar "with" some="args"}}
    ```
  
    with
  
    ```handlebars
    {{component foo.bar "with" some="args"}}
    ```
  
    and
  
    ```handlebars
    {{!-- foo.bar is not a legal helper/component name --}}
    {{#foo.bar}}...{{/foo.bar}}
    ```
  
    with
  
    ```handlebars
    {{#component foo.bar}}...{{/component}}
    ```
  
    and
  
    ```handlebars
    {{!-- @foo is not a legal helper/component name --}}
    {{@foo "with" some="args"}}
    ```
  
    with
  
    ```handlebars
    {{component @foo "with" some="args"}}
    ```
  
    and
  
    ```handlebars
    {{!-- @foo is not a legal helper/component name --}}
    {{#@foo}}...{{/@foo}}
    ```
  
    with
  
    ```handlebars
    {{#component @foo}}...{{/component}}
    ```
  
    and
  
    ```handlebars
    {{#let ... as |foo|}}
      {{!-- foo is a local variable --}}
      {{foo "with" some="args"}}
    {{/let}}
    ```
  
    with
  
    ```handlebars
    {{#let ... as |foo|}}
      {{component foo "with" some="args"}}
    {{/let}}
    ```
  
    and
  
    ```handlebars
    {{#let ... as |foo|}}
      {{!-- foo is a local variable --}}
      {{#foo}}...{{/foo}}
    {{/let}}
    ```
  
    with
  
    ```handlebars
    {{#let ... as |foo|}}
      {{#component foo}}...{{/component}}
    {{/let}}
    ```
  
    @private
    @class TransFormComponentInvocation
  */
  function transformComponentInvocation(env) {
    var moduleName = env.meta.moduleName;
    var b = env.syntax.builders;
    var locals = [];
    var isAttrs = false;
    return {
      name: 'transform-component-invocation',
      visitor: {
        Program: {
          enter: function enter(node) {
            locals.push(node.blockParams);
          },
          exit: function exit() {
            locals.pop();
          }
        },
        ElementNode: {
          keys: {
            attributes: {
              enter: function enter() {
                isAttrs = true;
              },
              exit: function exit() {
                isAttrs = false;
              }
            },
            children: {
              enter: function enter(node) {
                locals.push(node.blockParams);
              },
              exit: function exit() {
                locals.pop();
              }
            }
          }
        },
        BlockStatement: function BlockStatement(node) {
          if (isBlockInvocation(node, locals)) {
            wrapInComponent(moduleName, node, b);
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (!isAttrs && isInlineInvocation(node, locals)) {
            wrapInComponent(moduleName, node, b);
          }
        }
      }
    };
  }

  function isInlineInvocation(node, locals) {
    var path = node.path;
    return isPath(path) && isIllegalName(path, locals) && hasArguments(node);
  }

  function isPath(node) {
    return node.type === 'PathExpression';
  }

  function isIllegalName(node, locals) {
    return isThisPath(node) || isDotPath(node) || isNamedArg(node) || isLocalVariable(node, locals);
  }

  function isThisPath(node) {
    return node.this === true;
  }

  function isDotPath(node) {
    return node.parts.length > 1;
  }

  function isNamedArg(node) {
    return node.data === true;
  }

  function isLocalVariable(node, locals) {
    return !node.this && hasLocalVariable(node.parts[0], locals);
  }

  function hasLocalVariable(name, locals) {
    return locals.some(function (names) {
      return names.indexOf(name) !== -1;
    });
  }

  function hasArguments(node) {
    return node.params.length > 0 || node.hash.pairs.length > 0;
  }

  function isBlockInvocation(node, locals) {
    return isIllegalName(node.path, locals);
  }

  function wrapInAssertion(moduleName, node, b) {
    var error = b.string("expected `" + node.original + "` to be a contextual component but found a string. Did you mean `(component " + node.original + ")`? " + (0, _calculateLocationDisplay.default)(moduleName, node.loc));
    return b.sexpr(b.path('-assert-implicit-component-helper-argument'), [node, error], b.hash(), node.loc);
  }

  function wrapInComponent(moduleName, node, b) {
    var component = wrapInAssertion(moduleName, node.path, b);
    node.path = b.path('component');
    node.params.unshift(component);
  }
});
define("ember-template-compiler/lib/plugins/transform-each-in-into-each", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformEachInIntoEach;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   {{#each-in iterableThing as |key value|}}
    ```
  
    with
  
    ```handlebars
   {{#each (-each-in iterableThing) as |value key|}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  function transformEachInIntoEach(env) {
    var b = env.syntax.builders;
    return {
      name: 'transform-each-in-into-each',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (node.path.original === 'each-in') {
            node.params[0] = b.sexpr(b.path('-each-in'), [node.params[0]]);
            var blockParams = node.program.blockParams;

            if (!blockParams || blockParams.length === 0) {// who uses {{#each-in}} without block params?!
            } else if (blockParams.length === 1) {
              // insert a dummy variable for the first slot
              // pick a name that won't parse so it won't shadow any real variables
              blockParams = ['( unused value )', blockParams[0]];
            } else {
              var key = blockParams.shift();
              var value = blockParams.shift();
              blockParams = [value, key].concat(blockParams);
            }

            node.program.blockParams = blockParams;
            return b.block(b.path('each'), node.params, node.hash, node.program, node.inverse, node.loc);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-has-block-syntax", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformHasBlockSyntax;

  /**
   @module ember
  */

  /**
    A Glimmer2 AST transformation that replaces all instances of
  
    ```handlebars
   {{hasBlock}}
    ```
  
    with
  
    ```handlebars
   {{has-block}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  var TRANSFORMATIONS = {
    hasBlock: 'has-block',
    hasBlockParams: 'has-block-params'
  };

  function transformHasBlockSyntax(env) {
    var b = env.syntax.builders;
    return {
      name: 'transform-has-block-syntax',
      visitor: {
        PathExpression: function PathExpression(node) {
          if (TRANSFORMATIONS[node.original]) {
            return b.sexpr(b.path(TRANSFORMATIONS[node.original]));
          }
        },
        MustacheStatement: function MustacheStatement(node) {
          if (typeof node.path.original === 'string' && TRANSFORMATIONS[node.path.original]) {
            return b.mustache(b.path(TRANSFORMATIONS[node.path.original]), node.params, node.hash, undefined, node.loc);
          }
        },
        SubExpression: function SubExpression(node) {
          if (TRANSFORMATIONS[node.path.original]) {
            return b.sexpr(b.path(TRANSFORMATIONS[node.path.original]), node.params, node.hash);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-in-element", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformInElement;

  /**
   @module ember
  */

  /**
    glimmer-vm has made the `in-element` API public from its perspective (in
    https://github.com/glimmerjs/glimmer-vm/pull/619) so in glimmer-vm the
    correct keyword to use is `in-element`, however Ember is still working through
    its form of `in-element` (see https://github.com/emberjs/rfcs/pull/287).
  
    There are enough usages of the pre-existing private API (`{{-in-element`) in
    the wild that we need to transform `{{-in-element` into `{{in-element` during
    template transpilation, but since RFC#287 is not landed and enabled by default we _also_ need
    to prevent folks from starting to use `{{in-element` "for realz".
  
    Tranforms:
  
    ```handlebars
    {{#-in-element someElement}}
      {{modal-display text=text}}
    {{/-in-element}}
    ```
  
    into:
  
    ```handlebars
    {{#in-element someElement}}
      {{modal-display text=text}}
    {{/in-element}}
    ```
  
    And issues a build time assertion for:
  
    ```handlebars
    {{#in-element someElement}}
      {{modal-display text=text}}
    {{/in-element}}
    ```
  
    @private
    @class TransformHasBlockSyntax
  */
  function transformInElement(env) {
    var moduleName = env.meta.moduleName;
    var b = env.syntax.builders;
    var cursorCount = 0;
    return {
      name: 'transform-in-element',
      visitor: {
        BlockStatement: function BlockStatement(node) {
          if (node.path.original === 'in-element') {
            (true && !(false) && (0, _debug.assert)(assertMessage(moduleName, node)));
          } else if (node.path.original === '-in-element') {
            node.path.original = 'in-element';
            node.path.parts = ['in-element']; // replicate special hash arguments added here:
            // https://github.com/glimmerjs/glimmer-vm/blob/ba9b37d44b85fa1385eeeea71910ff5798198c8e/packages/%40glimmer/syntax/lib/parser/handlebars-node-visitors.ts#L340-L363

            var hasNextSibling = false;
            var hash = node.hash;
            hash.pairs.forEach(function (pair) {
              if (pair.key === 'nextSibling') {
                hasNextSibling = true;
              }
            });
            var guid = b.literal('StringLiteral', "%cursor:" + cursorCount++ + "%");
            var guidPair = b.pair('guid', guid);
            hash.pairs.unshift(guidPair);

            if (!hasNextSibling) {
              var nullLiteral = b.literal('NullLiteral', null);
              var nextSibling = b.pair('nextSibling', nullLiteral);
              hash.pairs.push(nextSibling);
            }
          }
        }
      }
    };
  }

  function assertMessage(moduleName, node) {
    var sourceInformation = (0, _calculateLocationDisplay.default)(moduleName, node.loc);
    return "The {{in-element}} helper cannot be used. " + sourceInformation;
  }
});
define("ember-template-compiler/lib/plugins/transform-link-to", ["exports", "@ember/debug", "ember-template-compiler/lib/system/calculate-location-display"], function (_exports, _debug, _calculateLocationDisplay) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformLinkTo;

  function isInlineLinkTo(node) {
    return node.path.original === 'link-to';
  }

  function isBlockLinkTo(node) {
    return node.path.original === 'link-to';
  }

  function isSubExpression(node) {
    return node.type === 'SubExpression';
  }

  function isQueryParams(node) {
    return isSubExpression(node) && node.path.original === 'query-params';
  }

  function transformInlineLinkToIntoBlockForm(env, node) {
    var b = env.syntax.builders;
    return b.block('link-to', node.params.slice(1), node.hash, buildProgram(b, node.params[0], node.escaped, node.loc), null, node.loc);
  }

  function transformPositionalLinkToIntoNamedArguments(env, node) {
    var b = env.syntax.builders;
    var moduleName = env.meta.moduleName;
    var params = node.params,
        pairs = node.hash.pairs;
    var keys = pairs.map(function (pair) {
      return pair.key;
    });

    if (params.length === 0) {
      (true && !(keys.indexOf('params') !== -1 || keys.indexOf('route') !== -1 || keys.indexOf('model') !== -1 || keys.indexOf('models') !== -1 || keys.indexOf('query') !== -1) && (0, _debug.assert)("You must provide one or more parameters to the `{{link-to}}` component. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('params') !== -1 || keys.indexOf('route') !== -1 || keys.indexOf('model') !== -1 || keys.indexOf('models') !== -1 || keys.indexOf('query') !== -1));
      return node;
    } else {
      (true && !(keys.indexOf('params') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `params` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('params') === -1));
      (true && !(keys.indexOf('route') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `route` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('route') === -1));
      (true && !(keys.indexOf('model') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `model` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('model') === -1));
      (true && !(keys.indexOf('models') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `models` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('models') === -1));
      (true && !(keys.indexOf('query') === -1) && (0, _debug.assert)("You cannot pass positional parameters and the `query` argument to the `{{link-to}}` component at the same time. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), keys.indexOf('query') === -1));
    }

    (true && !(params.length > 0) && (0, _debug.assert)("You must provide one or more parameters to the `{{link-to}}` component. " + (0, _calculateLocationDisplay.default)(moduleName, node.loc), params.length > 0)); // 1. The last argument is possibly the `query` object.

    var query = params[params.length - 1];

    if (query && isQueryParams(query)) {
      params.pop();
      (true && !(query.params.length === 0) && (0, _debug.assert)("The `(query-params ...)` helper does not take positional arguments. " + (0, _calculateLocationDisplay.default)(moduleName, query.loc), query.params.length === 0));
      pairs.push(b.pair('query', b.sexpr(b.path('hash', query.path.loc), [], query.hash, query.loc), query.loc));
    } // 2. If there is a `route`, it is now at index 0.


    var route = params.shift();

    if (route) {
      pairs.push(b.pair('route', route, route.loc));
    } // 3. Any remaining indices (if any) are `models`.


    if (params.length === 1) {
      pairs.push(b.pair('model', params[0], params[0].loc));
    } else if (params.length > 1) {
      pairs.push(b.pair('models', b.sexpr(b.path('array', node.loc), params, undefined, node.loc), node.loc));
    }

    return b.block(node.path, null, b.hash(pairs, node.hash.loc), node.program, node.inverse, node.loc);
  }

  function buildProgram(b, content, escaped, loc) {
    return b.program([buildStatement(b, content, escaped, loc)], undefined, loc);
  }

  function buildStatement(b, content, escaped, loc) {
    switch (content.type) {
      case 'PathExpression':
        return b.mustache(content, undefined, undefined, !escaped, loc);

      case 'SubExpression':
        return b.mustache(content.path, content.params, content.hash, !escaped, loc);
      // The default case handles literals.

      default:
        return b.text("" + content.value, loc);
    }
  }

  function transformLinkTo(env) {
    return {
      name: 'transform-link-to',
      visitor: {
        MustacheStatement: function MustacheStatement(node) {
          if (isInlineLinkTo(node)) {
            var block = transformInlineLinkToIntoBlockForm(env, node);
            return transformPositionalLinkToIntoNamedArguments(env, block);
          }
        },
        BlockStatement: function BlockStatement(node) {
          if (isBlockLinkTo(node)) {
            return transformPositionalLinkToIntoNamedArguments(env, node);
          }
        }
      }
    };
  }
});
define("ember-template-compiler/lib/plugins/transform-old-class-binding-syntax", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformOldClassBindingSyntax;

  function transformOldClassBindingSyntax(env) {
    var b = env.syntax.builders;
    return {
      name: 'transform-old-class-binding-syntax',
      visitor: {
        MustacheStatement: function MustacheStatement(node) {
          process(b, node);
        },
        BlockStatement: function BlockStatement(node) {
          process(b, node);
        }
      }
    };
  }

  function process(b, node) {
    var allOfTheMicrosyntaxes = [];
    var allOfTheMicrosyntaxIndexes = [];
    var classPair;
    each(node.hash.pairs, function (pair, index) {
      var key = pair.key;

      if (key === 'classBinding' || key === 'classNameBindings') {
        allOfTheMicrosyntaxIndexes.push(index);
        allOfTheMicrosyntaxes.push(pair);
      } else if (key === 'class') {
        classPair = pair;
      }
    });

    if (allOfTheMicrosyntaxes.length === 0) {
      return;
    }

    var classValue = [];

    if (classPair) {
      classValue.push(classPair.value);
      classValue.push(b.string(' '));
    } else {
      classPair = b.pair('class', null);
      node.hash.pairs.push(classPair);
    }

    each(allOfTheMicrosyntaxIndexes, function (index) {
      node.hash.pairs.splice(index, 1);
    });
    each(allOfTheMicrosyntaxes, function (_ref) {
      var value = _ref.value;
      var sexprs = []; // TODO: add helpful deprecation when both `classNames` and `classNameBindings` can
      // be removed.

      if (value.type === 'StringLiteral') {
        var microsyntax = parseMicrosyntax(value.original);
        buildSexprs(microsyntax, sexprs, b);
        classValue.push.apply(classValue, sexprs);
      }
    });
    var hash = b.hash();
    classPair.value = b.sexpr(b.path('concat'), classValue, hash);
  }

  function buildSexprs(microsyntax, sexprs, b) {
    for (var i = 0; i < microsyntax.length; i++) {
      var _microsyntax$i = microsyntax[i],
          propName = _microsyntax$i[0],
          activeClass = _microsyntax$i[1],
          inactiveClass = _microsyntax$i[2];
      var sexpr = void 0; // :my-class-name microsyntax for static values

      if (propName === '') {
        sexpr = b.string(activeClass);
      } else {
        var params = [b.path(propName)];

        if (activeClass || activeClass === '') {
          params.push(b.string(activeClass));
        } else {
          var sexprParams = [b.string(propName), b.path(propName)];
          var hash = b.hash();

          if (activeClass !== undefined) {
            hash.pairs.push(b.pair('activeClass', b.string(activeClass)));
          }

          if (inactiveClass !== undefined) {
            hash.pairs.push(b.pair('inactiveClass', b.string(inactiveClass)));
          }

          params.push(b.sexpr(b.path('-normalize-class'), sexprParams, hash));
        }

        if (inactiveClass || inactiveClass === '') {
          params.push(b.string(inactiveClass));
        }

        sexpr = b.sexpr(b.path('if'), params);
      }

      sexprs.push(sexpr);
      sexprs.push(b.string(' '));
    }
  }

  function each(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  }

  function parseMicrosyntax(string) {
    var segments = string.split(' ');
    var ret = [];

    for (var i = 0; i < segments.length; i++) {
      ret[i] = segments[i].split(':');
    }

    return ret;
  }
});
define("ember-template-compiler/lib/plugins/transform-quoted-bindings-into-just-bindings", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = transformQuotedBindingsIntoJustBindings;

  function transformQuotedBindingsIntoJustBindings()
  /* env */
  {
    return {
      name: 'transform-quoted-bindings-into-just-bindings',
      visitor: {
        ElementNode: function ElementNode(node) {
          var styleAttr = getStyleAttr(node);

          if (!validStyleAttr(styleAttr)) {
            return;
          }

          styleAttr.value = styleAttr.value.parts[0];
        }
      }
    };
  }

  function validStyleAttr(attr) {
    if (!attr) {
      return false;
    }

    var value = attr.value;

    if (!value || value.type !== 'ConcatStatement' || value.parts.length !== 1) {
      return false;
    }

    var onlyPart = value.parts[0];
    return onlyPart.type === 'MustacheStatement';
  }

  function getStyleAttr(node) {
    var attributes = node.attributes;

    for (var i = 0; i < attributes.length; i++) {
      if (attributes[i].name === 'style') {
        return attributes[i];
      }
    }

    return undefined;
  }
});
define("ember-template-compiler/lib/system/bootstrap", ["exports", "ember-template-compiler/lib/system/compile"], function (_exports, _compile) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /**
  @module ember
  */

  /**
    Find templates stored in the head tag as script tags and make them available
    to `Ember.CoreView` in the global `Ember.TEMPLATES` object.
  
    Script tags with `text/x-handlebars` will be compiled
    with Ember's template compiler and are suitable for use as a view's template.
  
    @private
    @method bootstrap
    @for Ember.HTMLBars
    @static
    @param ctx
  */
  function bootstrap(_ref) {
    var context = _ref.context,
        hasTemplate = _ref.hasTemplate,
        setTemplate = _ref.setTemplate;

    if (!context) {
      context = document;
    }

    var selector = 'script[type="text/x-handlebars"]';
    var elements = context.querySelectorAll(selector);

    for (var i = 0; i < elements.length; i++) {
      var script = elements[i]; // Get the name of the script
      // First look for data-template-name attribute, then fall back to its
      // id if no name is found.

      var templateName = script.getAttribute('data-template-name') || script.getAttribute('id') || 'application';
      var template = void 0;
      template = (0, _compile.default)(script.innerHTML, {
        moduleName: templateName
      }); // Check if template of same name already exists.

      if (hasTemplate(templateName)) {
        throw new Error("Template named \"" + templateName + "\" already exists.");
      } // For templates which have a name, we save them and then remove them from the DOM.


      setTemplate(templateName, template); // Remove script tag from DOM.

      script.parentNode.removeChild(script);
    }
  }

  var _default = bootstrap;
  _exports.default = _default;
});
define("ember-template-compiler/lib/system/calculate-location-display", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = calculateLocationDisplay;

  function calculateLocationDisplay(moduleName, loc) {
    var moduleInfo = '';

    if (moduleName) {
      moduleInfo += "'" + moduleName + "' ";
    }

    if (loc) {
      var _ref = loc.start || {
        line: undefined,
        column: undefined
      },
          column = _ref.column,
          line = _ref.line;

      if (line !== undefined && column !== undefined) {
        if (moduleName) {
          // only prepend @ if the moduleName was present
          moduleInfo += '@ ';
        }

        moduleInfo += "L" + line + ":C" + column;
      }
    }

    if (moduleInfo) {
      moduleInfo = "(" + moduleInfo + ") ";
    }

    return moduleInfo;
  }
});
define("ember-template-compiler/lib/system/compile-options", ["exports", "@ember/polyfills", "ember-template-compiler/lib/plugins/index", "ember-template-compiler/lib/system/dasherize-component-name"], function (_exports, _polyfills, _index, _dasherizeComponentName) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = compileOptions;
  _exports.registerPlugin = registerPlugin;
  _exports.unregisterPlugin = unregisterPlugin;
  var USER_PLUGINS = [];

  function compileOptions(_options) {
    if (_options === void 0) {
      _options = {};
    }

    var options = (0, _polyfills.assign)({
      meta: {}
    }, _options, {
      customizeComponentName: function customizeComponentName(tagname) {
        return _dasherizeComponentName.default.get(tagname);
      }
    }); // move `moduleName` into `meta` property

    if (options.moduleName) {
      var meta = options.meta;
      meta.moduleName = options.moduleName;
    }

    if (!options.plugins) {
      options.plugins = {
        ast: [].concat(USER_PLUGINS, _index.default)
      };
    } else {
      var potententialPugins = [].concat(USER_PLUGINS, _index.default);
      var providedPlugins = options.plugins.ast.map(function (plugin) {
        return wrapLegacyPluginIfNeeded(plugin);
      });
      var pluginsToAdd = potententialPugins.filter(function (plugin) {
        return options.plugins.ast.indexOf(plugin) === -1;
      });
      options.plugins.ast = providedPlugins.concat(pluginsToAdd);
    }

    return options;
  }

  function wrapLegacyPluginIfNeeded(_plugin) {
    var plugin = _plugin;

    if (_plugin.prototype && _plugin.prototype.transform) {
      var pluginFunc = function pluginFunc(env) {
        var pluginInstantiated = false;
        return {
          name: _plugin.constructor && _plugin.constructor.name,
          visitor: {
            Program: function Program(node) {
              if (!pluginInstantiated) {
                pluginInstantiated = true;

                var _plugin2 = new _plugin(env);

                _plugin2.syntax = env.syntax;
                return _plugin2.transform(node);
              }
            }
          }
        };
      };

      pluginFunc.__raw = _plugin;
      plugin = pluginFunc;
    }

    return plugin;
  }

  function registerPlugin(type, _plugin) {
    if (type !== 'ast') {
      throw new Error("Attempting to register " + _plugin + " as \"" + type + "\" which is not a valid Glimmer plugin type.");
    }

    for (var i = 0; i < USER_PLUGINS.length; i++) {
      var PLUGIN = USER_PLUGINS[i];

      if (PLUGIN === _plugin || PLUGIN.__raw === _plugin) {
        return;
      }
    }

    var plugin = wrapLegacyPluginIfNeeded(_plugin);
    USER_PLUGINS = [plugin].concat(USER_PLUGINS);
  }

  function unregisterPlugin(type, PluginClass) {
    if (type !== 'ast') {
      throw new Error("Attempting to unregister " + PluginClass + " as \"" + type + "\" which is not a valid Glimmer plugin type.");
    }

    USER_PLUGINS = USER_PLUGINS.filter(function (plugin) {
      return plugin !== PluginClass && plugin.__raw !== PluginClass;
    });
  }
});
define("ember-template-compiler/lib/system/compile", ["exports", "require", "ember-template-compiler/lib/system/precompile"], function (_exports, _require, _precompile) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = compile;

  /**
  @module ember
  */
  var template;
  /**
    Uses HTMLBars `compile` function to process a string into a compiled template.
  
    This is not present in production builds.
  
    @private
    @method compile
    @param {String} templateString This is the string to be compiled by HTMLBars.
    @param {Object} options This is an options hash to augment the compiler options.
  */

  function compile(templateString, options) {
    if (options === void 0) {
      options = {};
    }

    if (!template && (0, _require.has)('@ember/-internals/glimmer')) {
      // tslint:disable-next-line:no-require-imports
      template = (0, _require.default)("@ember/-internals/glimmer").template;
    }

    if (!template) {
      throw new Error('Cannot call `compile` with only the template compiler loaded. Please load `ember.debug.js` or `ember.prod.js` prior to calling `compile`.');
    }

    return template(evaluate((0, _precompile.default)(templateString, options)));
  }

  function evaluate(precompiled) {
    return new Function("return " + precompiled)();
  }
});
define("ember-template-compiler/lib/system/dasherize-component-name", ["exports", "@ember/-internals/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /*
    This diverges from `Ember.String.dasherize` so that`<XFoo />` can resolve to `x-foo`.
    `Ember.String.dasherize` would resolve it to `xfoo`..
  */
  var SIMPLE_DASHERIZE_REGEXP = /[A-Z]|::/g;
  var ALPHA = /[A-Za-z0-9]/;

  var _default = new _utils.Cache(1000, function (key) {
    return key.replace(SIMPLE_DASHERIZE_REGEXP, function (char, index) {
      if (char === '::') {
        return '/';
      }

      if (index === 0 || !ALPHA.test(key[index - 1])) {
        return char.toLowerCase();
      }

      return "-" + char.toLowerCase();
    });
  });

  _exports.default = _default;
});
define("ember-template-compiler/lib/system/initializer", ["require", "ember-template-compiler/lib/system/bootstrap"], function (_require, _bootstrap) {
  "use strict";

  // Globals mode template compiler
  if ((0, _require.has)('@ember/application') && (0, _require.has)('@ember/-internals/browser-environment') && (0, _require.has)('@ember/-internals/glimmer')) {
    // tslint:disable:no-require-imports
    var emberEnv = (0, _require.default)("@ember/-internals/browser-environment");
    var emberGlimmer = (0, _require.default)("@ember/-internals/glimmer");
    var emberApp = (0, _require.default)("@ember/application");
    var Application = emberApp.default;
    var hasTemplate = emberGlimmer.hasTemplate,
        setTemplate = emberGlimmer.setTemplate;
    var hasDOM = emberEnv.hasDOM;
    Application.initializer({
      name: 'domTemplates',
      initialize: function initialize() {
        if (hasDOM) {
          (0, _bootstrap.default)({
            context: document,
            hasTemplate: hasTemplate,
            setTemplate: setTemplate
          });
        }
      }
    });
  }
});
define("ember-template-compiler/lib/system/precompile", ["exports", "@glimmer/compiler", "ember-template-compiler/lib/system/compile-options"], function (_exports, _compiler, _compileOptions) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = precompile;

  /**
  @module ember
  */

  /**
    Uses HTMLBars `compile` function to process a string into a compiled template string.
    The returned string must be passed through `Ember.HTMLBars.template`.
  
    This is not present in production builds.
  
    @private
    @method precompile
    @param {String} templateString This is the string to be compiled by HTMLBars.
  */
  function precompile(templateString, options) {
    if (options === void 0) {
      options = {};
    }

    return (0, _compiler.precompile)(templateString, (0, _compileOptions.default)(options));
  }
});
define("ember/version", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = "3.15.0-beta.4";
  _exports.default = _default;
});
define("handlebars", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.parse = parse;
  _exports.parser = void 0;

  // File ignored in coverage tests via setting in .istanbul.yml

  /* Jison generated parser */
  var handlebars = function () {
    var parser = {
      trace: function trace() {},
      yy: {},
      symbols_: {
        "error": 2,
        "root": 3,
        "program": 4,
        "EOF": 5,
        "program_repetition0": 6,
        "statement": 7,
        "mustache": 8,
        "block": 9,
        "rawBlock": 10,
        "partial": 11,
        "partialBlock": 12,
        "content": 13,
        "COMMENT": 14,
        "CONTENT": 15,
        "openRawBlock": 16,
        "rawBlock_repetition_plus0": 17,
        "END_RAW_BLOCK": 18,
        "OPEN_RAW_BLOCK": 19,
        "helperName": 20,
        "openRawBlock_repetition0": 21,
        "openRawBlock_option0": 22,
        "CLOSE_RAW_BLOCK": 23,
        "openBlock": 24,
        "block_option0": 25,
        "closeBlock": 26,
        "openInverse": 27,
        "block_option1": 28,
        "OPEN_BLOCK": 29,
        "openBlock_repetition0": 30,
        "openBlock_option0": 31,
        "openBlock_option1": 32,
        "CLOSE": 33,
        "OPEN_INVERSE": 34,
        "openInverse_repetition0": 35,
        "openInverse_option0": 36,
        "openInverse_option1": 37,
        "openInverseChain": 38,
        "OPEN_INVERSE_CHAIN": 39,
        "openInverseChain_repetition0": 40,
        "openInverseChain_option0": 41,
        "openInverseChain_option1": 42,
        "inverseAndProgram": 43,
        "INVERSE": 44,
        "inverseChain": 45,
        "inverseChain_option0": 46,
        "OPEN_ENDBLOCK": 47,
        "OPEN": 48,
        "mustache_repetition0": 49,
        "mustache_option0": 50,
        "OPEN_UNESCAPED": 51,
        "mustache_repetition1": 52,
        "mustache_option1": 53,
        "CLOSE_UNESCAPED": 54,
        "OPEN_PARTIAL": 55,
        "partialName": 56,
        "partial_repetition0": 57,
        "partial_option0": 58,
        "openPartialBlock": 59,
        "OPEN_PARTIAL_BLOCK": 60,
        "openPartialBlock_repetition0": 61,
        "openPartialBlock_option0": 62,
        "param": 63,
        "sexpr": 64,
        "OPEN_SEXPR": 65,
        "sexpr_repetition0": 66,
        "sexpr_option0": 67,
        "CLOSE_SEXPR": 68,
        "hash": 69,
        "hash_repetition_plus0": 70,
        "hashSegment": 71,
        "ID": 72,
        "EQUALS": 73,
        "blockParams": 74,
        "OPEN_BLOCK_PARAMS": 75,
        "blockParams_repetition_plus0": 76,
        "CLOSE_BLOCK_PARAMS": 77,
        "path": 78,
        "dataName": 79,
        "STRING": 80,
        "NUMBER": 81,
        "BOOLEAN": 82,
        "UNDEFINED": 83,
        "NULL": 84,
        "DATA": 85,
        "pathSegments": 86,
        "SEP": 87,
        "$accept": 0,
        "$end": 1
      },
      terminals_: {
        2: "error",
        5: "EOF",
        14: "COMMENT",
        15: "CONTENT",
        18: "END_RAW_BLOCK",
        19: "OPEN_RAW_BLOCK",
        23: "CLOSE_RAW_BLOCK",
        29: "OPEN_BLOCK",
        33: "CLOSE",
        34: "OPEN_INVERSE",
        39: "OPEN_INVERSE_CHAIN",
        44: "INVERSE",
        47: "OPEN_ENDBLOCK",
        48: "OPEN",
        51: "OPEN_UNESCAPED",
        54: "CLOSE_UNESCAPED",
        55: "OPEN_PARTIAL",
        60: "OPEN_PARTIAL_BLOCK",
        65: "OPEN_SEXPR",
        68: "CLOSE_SEXPR",
        72: "ID",
        73: "EQUALS",
        75: "OPEN_BLOCK_PARAMS",
        77: "CLOSE_BLOCK_PARAMS",
        80: "STRING",
        81: "NUMBER",
        82: "BOOLEAN",
        83: "UNDEFINED",
        84: "NULL",
        85: "DATA",
        87: "SEP"
      },
      productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 1], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
        var $0 = $$.length - 1;

        switch (yystate) {
          case 1:
            return $$[$0 - 1];
            break;

          case 2:
            this.$ = yy.prepareProgram($$[$0]);
            break;

          case 3:
            this.$ = $$[$0];
            break;

          case 4:
            this.$ = $$[$0];
            break;

          case 5:
            this.$ = $$[$0];
            break;

          case 6:
            this.$ = $$[$0];
            break;

          case 7:
            this.$ = $$[$0];
            break;

          case 8:
            this.$ = $$[$0];
            break;

          case 9:
            this.$ = {
              type: 'CommentStatement',
              value: yy.stripComment($$[$0]),
              strip: yy.stripFlags($$[$0], $$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 10:
            this.$ = {
              type: 'ContentStatement',
              original: $$[$0],
              value: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 11:
            this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;

          case 12:
            this.$ = {
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1]
            };
            break;

          case 13:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
            break;

          case 14:
            this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
            break;

          case 15:
            this.$ = {
              open: $$[$0 - 5],
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

          case 16:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

          case 17:
            this.$ = {
              path: $$[$0 - 4],
              params: $$[$0 - 3],
              hash: $$[$0 - 2],
              blockParams: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 5], $$[$0])
            };
            break;

          case 18:
            this.$ = {
              strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
              program: $$[$0]
            };
            break;

          case 19:
            var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$),
                program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
            program.chained = true;
            this.$ = {
              strip: $$[$0 - 2].strip,
              program: program,
              chain: true
            };
            break;

          case 20:
            this.$ = $$[$0];
            break;

          case 21:
            this.$ = {
              path: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 2], $$[$0])
            };
            break;

          case 22:
            this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;

          case 23:
            this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
            break;

          case 24:
            this.$ = {
              type: 'PartialStatement',
              name: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              indent: '',
              strip: yy.stripFlags($$[$0 - 4], $$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 25:
            this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
            break;

          case 26:
            this.$ = {
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              strip: yy.stripFlags($$[$0 - 4], $$[$0])
            };
            break;

          case 27:
            this.$ = $$[$0];
            break;

          case 28:
            this.$ = $$[$0];
            break;

          case 29:
            this.$ = {
              type: 'SubExpression',
              path: $$[$0 - 3],
              params: $$[$0 - 2],
              hash: $$[$0 - 1],
              loc: yy.locInfo(this._$)
            };
            break;

          case 30:
            this.$ = {
              type: 'Hash',
              pairs: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 31:
            this.$ = {
              type: 'HashPair',
              key: yy.id($$[$0 - 2]),
              value: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 32:
            this.$ = yy.id($$[$0 - 1]);
            break;

          case 33:
            this.$ = $$[$0];
            break;

          case 34:
            this.$ = $$[$0];
            break;

          case 35:
            this.$ = {
              type: 'StringLiteral',
              value: $$[$0],
              original: $$[$0],
              loc: yy.locInfo(this._$)
            };
            break;

          case 36:
            this.$ = {
              type: 'NumberLiteral',
              value: Number($$[$0]),
              original: Number($$[$0]),
              loc: yy.locInfo(this._$)
            };
            break;

          case 37:
            this.$ = {
              type: 'BooleanLiteral',
              value: $$[$0] === 'true',
              original: $$[$0] === 'true',
              loc: yy.locInfo(this._$)
            };
            break;

          case 38:
            this.$ = {
              type: 'UndefinedLiteral',
              original: undefined,
              value: undefined,
              loc: yy.locInfo(this._$)
            };
            break;

          case 39:
            this.$ = {
              type: 'NullLiteral',
              original: null,
              value: null,
              loc: yy.locInfo(this._$)
            };
            break;

          case 40:
            this.$ = $$[$0];
            break;

          case 41:
            this.$ = $$[$0];
            break;

          case 42:
            this.$ = yy.preparePath(true, $$[$0], this._$);
            break;

          case 43:
            this.$ = yy.preparePath(false, $$[$0], this._$);
            break;

          case 44:
            $$[$0 - 2].push({
              part: yy.id($$[$0]),
              original: $$[$0],
              separator: $$[$0 - 1]
            });
            this.$ = $$[$0 - 2];
            break;

          case 45:
            this.$ = [{
              part: yy.id($$[$0]),
              original: $$[$0]
            }];
            break;

          case 46:
            this.$ = [];
            break;

          case 47:
            $$[$0 - 1].push($$[$0]);
            break;

          case 48:
            this.$ = [$$[$0]];
            break;

          case 49:
            $$[$0 - 1].push($$[$0]);
            break;

          case 50:
            this.$ = [];
            break;

          case 51:
            $$[$0 - 1].push($$[$0]);
            break;

          case 58:
            this.$ = [];
            break;

          case 59:
            $$[$0 - 1].push($$[$0]);
            break;

          case 64:
            this.$ = [];
            break;

          case 65:
            $$[$0 - 1].push($$[$0]);
            break;

          case 70:
            this.$ = [];
            break;

          case 71:
            $$[$0 - 1].push($$[$0]);
            break;

          case 78:
            this.$ = [];
            break;

          case 79:
            $$[$0 - 1].push($$[$0]);
            break;

          case 82:
            this.$ = [];
            break;

          case 83:
            $$[$0 - 1].push($$[$0]);
            break;

          case 86:
            this.$ = [];
            break;

          case 87:
            $$[$0 - 1].push($$[$0]);
            break;

          case 90:
            this.$ = [];
            break;

          case 91:
            $$[$0 - 1].push($$[$0]);
            break;

          case 94:
            this.$ = [];
            break;

          case 95:
            $$[$0 - 1].push($$[$0]);
            break;

          case 98:
            this.$ = [$$[$0]];
            break;

          case 99:
            $$[$0 - 1].push($$[$0]);
            break;

          case 100:
            this.$ = [$$[$0]];
            break;

          case 101:
            $$[$0 - 1].push($$[$0]);
            break;
        }
      },
      table: [{
        3: 1,
        4: 2,
        5: [2, 46],
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        1: [3]
      }, {
        5: [1, 4]
      }, {
        5: [2, 2],
        7: 5,
        8: 6,
        9: 7,
        10: 8,
        11: 9,
        12: 10,
        13: 11,
        14: [1, 12],
        15: [1, 20],
        16: 17,
        19: [1, 23],
        24: 15,
        27: 16,
        29: [1, 21],
        34: [1, 22],
        39: [2, 2],
        44: [2, 2],
        47: [2, 2],
        48: [1, 13],
        51: [1, 14],
        55: [1, 18],
        59: 19,
        60: [1, 24]
      }, {
        1: [2, 1]
      }, {
        5: [2, 47],
        14: [2, 47],
        15: [2, 47],
        19: [2, 47],
        29: [2, 47],
        34: [2, 47],
        39: [2, 47],
        44: [2, 47],
        47: [2, 47],
        48: [2, 47],
        51: [2, 47],
        55: [2, 47],
        60: [2, 47]
      }, {
        5: [2, 3],
        14: [2, 3],
        15: [2, 3],
        19: [2, 3],
        29: [2, 3],
        34: [2, 3],
        39: [2, 3],
        44: [2, 3],
        47: [2, 3],
        48: [2, 3],
        51: [2, 3],
        55: [2, 3],
        60: [2, 3]
      }, {
        5: [2, 4],
        14: [2, 4],
        15: [2, 4],
        19: [2, 4],
        29: [2, 4],
        34: [2, 4],
        39: [2, 4],
        44: [2, 4],
        47: [2, 4],
        48: [2, 4],
        51: [2, 4],
        55: [2, 4],
        60: [2, 4]
      }, {
        5: [2, 5],
        14: [2, 5],
        15: [2, 5],
        19: [2, 5],
        29: [2, 5],
        34: [2, 5],
        39: [2, 5],
        44: [2, 5],
        47: [2, 5],
        48: [2, 5],
        51: [2, 5],
        55: [2, 5],
        60: [2, 5]
      }, {
        5: [2, 6],
        14: [2, 6],
        15: [2, 6],
        19: [2, 6],
        29: [2, 6],
        34: [2, 6],
        39: [2, 6],
        44: [2, 6],
        47: [2, 6],
        48: [2, 6],
        51: [2, 6],
        55: [2, 6],
        60: [2, 6]
      }, {
        5: [2, 7],
        14: [2, 7],
        15: [2, 7],
        19: [2, 7],
        29: [2, 7],
        34: [2, 7],
        39: [2, 7],
        44: [2, 7],
        47: [2, 7],
        48: [2, 7],
        51: [2, 7],
        55: [2, 7],
        60: [2, 7]
      }, {
        5: [2, 8],
        14: [2, 8],
        15: [2, 8],
        19: [2, 8],
        29: [2, 8],
        34: [2, 8],
        39: [2, 8],
        44: [2, 8],
        47: [2, 8],
        48: [2, 8],
        51: [2, 8],
        55: [2, 8],
        60: [2, 8]
      }, {
        5: [2, 9],
        14: [2, 9],
        15: [2, 9],
        19: [2, 9],
        29: [2, 9],
        34: [2, 9],
        39: [2, 9],
        44: [2, 9],
        47: [2, 9],
        48: [2, 9],
        51: [2, 9],
        55: [2, 9],
        60: [2, 9]
      }, {
        20: 25,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 36,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        4: 37,
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        39: [2, 46],
        44: [2, 46],
        47: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        4: 38,
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        44: [2, 46],
        47: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        13: 40,
        15: [1, 20],
        17: 39
      }, {
        20: 42,
        56: 41,
        64: 43,
        65: [1, 44],
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        4: 45,
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        47: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        5: [2, 10],
        14: [2, 10],
        15: [2, 10],
        18: [2, 10],
        19: [2, 10],
        29: [2, 10],
        34: [2, 10],
        39: [2, 10],
        44: [2, 10],
        47: [2, 10],
        48: [2, 10],
        51: [2, 10],
        55: [2, 10],
        60: [2, 10]
      }, {
        20: 46,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 47,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 48,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 42,
        56: 49,
        64: 43,
        65: [1, 44],
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        33: [2, 78],
        49: 50,
        65: [2, 78],
        72: [2, 78],
        80: [2, 78],
        81: [2, 78],
        82: [2, 78],
        83: [2, 78],
        84: [2, 78],
        85: [2, 78]
      }, {
        23: [2, 33],
        33: [2, 33],
        54: [2, 33],
        65: [2, 33],
        68: [2, 33],
        72: [2, 33],
        75: [2, 33],
        80: [2, 33],
        81: [2, 33],
        82: [2, 33],
        83: [2, 33],
        84: [2, 33],
        85: [2, 33]
      }, {
        23: [2, 34],
        33: [2, 34],
        54: [2, 34],
        65: [2, 34],
        68: [2, 34],
        72: [2, 34],
        75: [2, 34],
        80: [2, 34],
        81: [2, 34],
        82: [2, 34],
        83: [2, 34],
        84: [2, 34],
        85: [2, 34]
      }, {
        23: [2, 35],
        33: [2, 35],
        54: [2, 35],
        65: [2, 35],
        68: [2, 35],
        72: [2, 35],
        75: [2, 35],
        80: [2, 35],
        81: [2, 35],
        82: [2, 35],
        83: [2, 35],
        84: [2, 35],
        85: [2, 35]
      }, {
        23: [2, 36],
        33: [2, 36],
        54: [2, 36],
        65: [2, 36],
        68: [2, 36],
        72: [2, 36],
        75: [2, 36],
        80: [2, 36],
        81: [2, 36],
        82: [2, 36],
        83: [2, 36],
        84: [2, 36],
        85: [2, 36]
      }, {
        23: [2, 37],
        33: [2, 37],
        54: [2, 37],
        65: [2, 37],
        68: [2, 37],
        72: [2, 37],
        75: [2, 37],
        80: [2, 37],
        81: [2, 37],
        82: [2, 37],
        83: [2, 37],
        84: [2, 37],
        85: [2, 37]
      }, {
        23: [2, 38],
        33: [2, 38],
        54: [2, 38],
        65: [2, 38],
        68: [2, 38],
        72: [2, 38],
        75: [2, 38],
        80: [2, 38],
        81: [2, 38],
        82: [2, 38],
        83: [2, 38],
        84: [2, 38],
        85: [2, 38]
      }, {
        23: [2, 39],
        33: [2, 39],
        54: [2, 39],
        65: [2, 39],
        68: [2, 39],
        72: [2, 39],
        75: [2, 39],
        80: [2, 39],
        81: [2, 39],
        82: [2, 39],
        83: [2, 39],
        84: [2, 39],
        85: [2, 39]
      }, {
        23: [2, 43],
        33: [2, 43],
        54: [2, 43],
        65: [2, 43],
        68: [2, 43],
        72: [2, 43],
        75: [2, 43],
        80: [2, 43],
        81: [2, 43],
        82: [2, 43],
        83: [2, 43],
        84: [2, 43],
        85: [2, 43],
        87: [1, 51]
      }, {
        72: [1, 35],
        86: 52
      }, {
        23: [2, 45],
        33: [2, 45],
        54: [2, 45],
        65: [2, 45],
        68: [2, 45],
        72: [2, 45],
        75: [2, 45],
        80: [2, 45],
        81: [2, 45],
        82: [2, 45],
        83: [2, 45],
        84: [2, 45],
        85: [2, 45],
        87: [2, 45]
      }, {
        52: 53,
        54: [2, 82],
        65: [2, 82],
        72: [2, 82],
        80: [2, 82],
        81: [2, 82],
        82: [2, 82],
        83: [2, 82],
        84: [2, 82],
        85: [2, 82]
      }, {
        25: 54,
        38: 56,
        39: [1, 58],
        43: 57,
        44: [1, 59],
        45: 55,
        47: [2, 54]
      }, {
        28: 60,
        43: 61,
        44: [1, 59],
        47: [2, 56]
      }, {
        13: 63,
        15: [1, 20],
        18: [1, 62]
      }, {
        15: [2, 48],
        18: [2, 48]
      }, {
        33: [2, 86],
        57: 64,
        65: [2, 86],
        72: [2, 86],
        80: [2, 86],
        81: [2, 86],
        82: [2, 86],
        83: [2, 86],
        84: [2, 86],
        85: [2, 86]
      }, {
        33: [2, 40],
        65: [2, 40],
        72: [2, 40],
        80: [2, 40],
        81: [2, 40],
        82: [2, 40],
        83: [2, 40],
        84: [2, 40],
        85: [2, 40]
      }, {
        33: [2, 41],
        65: [2, 41],
        72: [2, 41],
        80: [2, 41],
        81: [2, 41],
        82: [2, 41],
        83: [2, 41],
        84: [2, 41],
        85: [2, 41]
      }, {
        20: 65,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        26: 66,
        47: [1, 67]
      }, {
        30: 68,
        33: [2, 58],
        65: [2, 58],
        72: [2, 58],
        75: [2, 58],
        80: [2, 58],
        81: [2, 58],
        82: [2, 58],
        83: [2, 58],
        84: [2, 58],
        85: [2, 58]
      }, {
        33: [2, 64],
        35: 69,
        65: [2, 64],
        72: [2, 64],
        75: [2, 64],
        80: [2, 64],
        81: [2, 64],
        82: [2, 64],
        83: [2, 64],
        84: [2, 64],
        85: [2, 64]
      }, {
        21: 70,
        23: [2, 50],
        65: [2, 50],
        72: [2, 50],
        80: [2, 50],
        81: [2, 50],
        82: [2, 50],
        83: [2, 50],
        84: [2, 50],
        85: [2, 50]
      }, {
        33: [2, 90],
        61: 71,
        65: [2, 90],
        72: [2, 90],
        80: [2, 90],
        81: [2, 90],
        82: [2, 90],
        83: [2, 90],
        84: [2, 90],
        85: [2, 90]
      }, {
        20: 75,
        33: [2, 80],
        50: 72,
        63: 73,
        64: 76,
        65: [1, 44],
        69: 74,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        72: [1, 80]
      }, {
        23: [2, 42],
        33: [2, 42],
        54: [2, 42],
        65: [2, 42],
        68: [2, 42],
        72: [2, 42],
        75: [2, 42],
        80: [2, 42],
        81: [2, 42],
        82: [2, 42],
        83: [2, 42],
        84: [2, 42],
        85: [2, 42],
        87: [1, 51]
      }, {
        20: 75,
        53: 81,
        54: [2, 84],
        63: 82,
        64: 76,
        65: [1, 44],
        69: 83,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        26: 84,
        47: [1, 67]
      }, {
        47: [2, 55]
      }, {
        4: 85,
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        39: [2, 46],
        44: [2, 46],
        47: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        47: [2, 20]
      }, {
        20: 86,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        4: 87,
        6: 3,
        14: [2, 46],
        15: [2, 46],
        19: [2, 46],
        29: [2, 46],
        34: [2, 46],
        47: [2, 46],
        48: [2, 46],
        51: [2, 46],
        55: [2, 46],
        60: [2, 46]
      }, {
        26: 88,
        47: [1, 67]
      }, {
        47: [2, 57]
      }, {
        5: [2, 11],
        14: [2, 11],
        15: [2, 11],
        19: [2, 11],
        29: [2, 11],
        34: [2, 11],
        39: [2, 11],
        44: [2, 11],
        47: [2, 11],
        48: [2, 11],
        51: [2, 11],
        55: [2, 11],
        60: [2, 11]
      }, {
        15: [2, 49],
        18: [2, 49]
      }, {
        20: 75,
        33: [2, 88],
        58: 89,
        63: 90,
        64: 76,
        65: [1, 44],
        69: 91,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        65: [2, 94],
        66: 92,
        68: [2, 94],
        72: [2, 94],
        80: [2, 94],
        81: [2, 94],
        82: [2, 94],
        83: [2, 94],
        84: [2, 94],
        85: [2, 94]
      }, {
        5: [2, 25],
        14: [2, 25],
        15: [2, 25],
        19: [2, 25],
        29: [2, 25],
        34: [2, 25],
        39: [2, 25],
        44: [2, 25],
        47: [2, 25],
        48: [2, 25],
        51: [2, 25],
        55: [2, 25],
        60: [2, 25]
      }, {
        20: 93,
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 75,
        31: 94,
        33: [2, 60],
        63: 95,
        64: 76,
        65: [1, 44],
        69: 96,
        70: 77,
        71: 78,
        72: [1, 79],
        75: [2, 60],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 75,
        33: [2, 66],
        36: 97,
        63: 98,
        64: 76,
        65: [1, 44],
        69: 99,
        70: 77,
        71: 78,
        72: [1, 79],
        75: [2, 66],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 75,
        22: 100,
        23: [2, 52],
        63: 101,
        64: 76,
        65: [1, 44],
        69: 102,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        20: 75,
        33: [2, 92],
        62: 103,
        63: 104,
        64: 76,
        65: [1, 44],
        69: 105,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        33: [1, 106]
      }, {
        33: [2, 79],
        65: [2, 79],
        72: [2, 79],
        80: [2, 79],
        81: [2, 79],
        82: [2, 79],
        83: [2, 79],
        84: [2, 79],
        85: [2, 79]
      }, {
        33: [2, 81]
      }, {
        23: [2, 27],
        33: [2, 27],
        54: [2, 27],
        65: [2, 27],
        68: [2, 27],
        72: [2, 27],
        75: [2, 27],
        80: [2, 27],
        81: [2, 27],
        82: [2, 27],
        83: [2, 27],
        84: [2, 27],
        85: [2, 27]
      }, {
        23: [2, 28],
        33: [2, 28],
        54: [2, 28],
        65: [2, 28],
        68: [2, 28],
        72: [2, 28],
        75: [2, 28],
        80: [2, 28],
        81: [2, 28],
        82: [2, 28],
        83: [2, 28],
        84: [2, 28],
        85: [2, 28]
      }, {
        23: [2, 30],
        33: [2, 30],
        54: [2, 30],
        68: [2, 30],
        71: 107,
        72: [1, 108],
        75: [2, 30]
      }, {
        23: [2, 98],
        33: [2, 98],
        54: [2, 98],
        68: [2, 98],
        72: [2, 98],
        75: [2, 98]
      }, {
        23: [2, 45],
        33: [2, 45],
        54: [2, 45],
        65: [2, 45],
        68: [2, 45],
        72: [2, 45],
        73: [1, 109],
        75: [2, 45],
        80: [2, 45],
        81: [2, 45],
        82: [2, 45],
        83: [2, 45],
        84: [2, 45],
        85: [2, 45],
        87: [2, 45]
      }, {
        23: [2, 44],
        33: [2, 44],
        54: [2, 44],
        65: [2, 44],
        68: [2, 44],
        72: [2, 44],
        75: [2, 44],
        80: [2, 44],
        81: [2, 44],
        82: [2, 44],
        83: [2, 44],
        84: [2, 44],
        85: [2, 44],
        87: [2, 44]
      }, {
        54: [1, 110]
      }, {
        54: [2, 83],
        65: [2, 83],
        72: [2, 83],
        80: [2, 83],
        81: [2, 83],
        82: [2, 83],
        83: [2, 83],
        84: [2, 83],
        85: [2, 83]
      }, {
        54: [2, 85]
      }, {
        5: [2, 13],
        14: [2, 13],
        15: [2, 13],
        19: [2, 13],
        29: [2, 13],
        34: [2, 13],
        39: [2, 13],
        44: [2, 13],
        47: [2, 13],
        48: [2, 13],
        51: [2, 13],
        55: [2, 13],
        60: [2, 13]
      }, {
        38: 56,
        39: [1, 58],
        43: 57,
        44: [1, 59],
        45: 112,
        46: 111,
        47: [2, 76]
      }, {
        33: [2, 70],
        40: 113,
        65: [2, 70],
        72: [2, 70],
        75: [2, 70],
        80: [2, 70],
        81: [2, 70],
        82: [2, 70],
        83: [2, 70],
        84: [2, 70],
        85: [2, 70]
      }, {
        47: [2, 18]
      }, {
        5: [2, 14],
        14: [2, 14],
        15: [2, 14],
        19: [2, 14],
        29: [2, 14],
        34: [2, 14],
        39: [2, 14],
        44: [2, 14],
        47: [2, 14],
        48: [2, 14],
        51: [2, 14],
        55: [2, 14],
        60: [2, 14]
      }, {
        33: [1, 114]
      }, {
        33: [2, 87],
        65: [2, 87],
        72: [2, 87],
        80: [2, 87],
        81: [2, 87],
        82: [2, 87],
        83: [2, 87],
        84: [2, 87],
        85: [2, 87]
      }, {
        33: [2, 89]
      }, {
        20: 75,
        63: 116,
        64: 76,
        65: [1, 44],
        67: 115,
        68: [2, 96],
        69: 117,
        70: 77,
        71: 78,
        72: [1, 79],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        33: [1, 118]
      }, {
        32: 119,
        33: [2, 62],
        74: 120,
        75: [1, 121]
      }, {
        33: [2, 59],
        65: [2, 59],
        72: [2, 59],
        75: [2, 59],
        80: [2, 59],
        81: [2, 59],
        82: [2, 59],
        83: [2, 59],
        84: [2, 59],
        85: [2, 59]
      }, {
        33: [2, 61],
        75: [2, 61]
      }, {
        33: [2, 68],
        37: 122,
        74: 123,
        75: [1, 121]
      }, {
        33: [2, 65],
        65: [2, 65],
        72: [2, 65],
        75: [2, 65],
        80: [2, 65],
        81: [2, 65],
        82: [2, 65],
        83: [2, 65],
        84: [2, 65],
        85: [2, 65]
      }, {
        33: [2, 67],
        75: [2, 67]
      }, {
        23: [1, 124]
      }, {
        23: [2, 51],
        65: [2, 51],
        72: [2, 51],
        80: [2, 51],
        81: [2, 51],
        82: [2, 51],
        83: [2, 51],
        84: [2, 51],
        85: [2, 51]
      }, {
        23: [2, 53]
      }, {
        33: [1, 125]
      }, {
        33: [2, 91],
        65: [2, 91],
        72: [2, 91],
        80: [2, 91],
        81: [2, 91],
        82: [2, 91],
        83: [2, 91],
        84: [2, 91],
        85: [2, 91]
      }, {
        33: [2, 93]
      }, {
        5: [2, 22],
        14: [2, 22],
        15: [2, 22],
        19: [2, 22],
        29: [2, 22],
        34: [2, 22],
        39: [2, 22],
        44: [2, 22],
        47: [2, 22],
        48: [2, 22],
        51: [2, 22],
        55: [2, 22],
        60: [2, 22]
      }, {
        23: [2, 99],
        33: [2, 99],
        54: [2, 99],
        68: [2, 99],
        72: [2, 99],
        75: [2, 99]
      }, {
        73: [1, 109]
      }, {
        20: 75,
        63: 126,
        64: 76,
        65: [1, 44],
        72: [1, 35],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        5: [2, 23],
        14: [2, 23],
        15: [2, 23],
        19: [2, 23],
        29: [2, 23],
        34: [2, 23],
        39: [2, 23],
        44: [2, 23],
        47: [2, 23],
        48: [2, 23],
        51: [2, 23],
        55: [2, 23],
        60: [2, 23]
      }, {
        47: [2, 19]
      }, {
        47: [2, 77]
      }, {
        20: 75,
        33: [2, 72],
        41: 127,
        63: 128,
        64: 76,
        65: [1, 44],
        69: 129,
        70: 77,
        71: 78,
        72: [1, 79],
        75: [2, 72],
        78: 26,
        79: 27,
        80: [1, 28],
        81: [1, 29],
        82: [1, 30],
        83: [1, 31],
        84: [1, 32],
        85: [1, 34],
        86: 33
      }, {
        5: [2, 24],
        14: [2, 24],
        15: [2, 24],
        19: [2, 24],
        29: [2, 24],
        34: [2, 24],
        39: [2, 24],
        44: [2, 24],
        47: [2, 24],
        48: [2, 24],
        51: [2, 24],
        55: [2, 24],
        60: [2, 24]
      }, {
        68: [1, 130]
      }, {
        65: [2, 95],
        68: [2, 95],
        72: [2, 95],
        80: [2, 95],
        81: [2, 95],
        82: [2, 95],
        83: [2, 95],
        84: [2, 95],
        85: [2, 95]
      }, {
        68: [2, 97]
      }, {
        5: [2, 21],
        14: [2, 21],
        15: [2, 21],
        19: [2, 21],
        29: [2, 21],
        34: [2, 21],
        39: [2, 21],
        44: [2, 21],
        47: [2, 21],
        48: [2, 21],
        51: [2, 21],
        55: [2, 21],
        60: [2, 21]
      }, {
        33: [1, 131]
      }, {
        33: [2, 63]
      }, {
        72: [1, 133],
        76: 132
      }, {
        33: [1, 134]
      }, {
        33: [2, 69]
      }, {
        15: [2, 12]
      }, {
        14: [2, 26],
        15: [2, 26],
        19: [2, 26],
        29: [2, 26],
        34: [2, 26],
        47: [2, 26],
        48: [2, 26],
        51: [2, 26],
        55: [2, 26],
        60: [2, 26]
      }, {
        23: [2, 31],
        33: [2, 31],
        54: [2, 31],
        68: [2, 31],
        72: [2, 31],
        75: [2, 31]
      }, {
        33: [2, 74],
        42: 135,
        74: 136,
        75: [1, 121]
      }, {
        33: [2, 71],
        65: [2, 71],
        72: [2, 71],
        75: [2, 71],
        80: [2, 71],
        81: [2, 71],
        82: [2, 71],
        83: [2, 71],
        84: [2, 71],
        85: [2, 71]
      }, {
        33: [2, 73],
        75: [2, 73]
      }, {
        23: [2, 29],
        33: [2, 29],
        54: [2, 29],
        65: [2, 29],
        68: [2, 29],
        72: [2, 29],
        75: [2, 29],
        80: [2, 29],
        81: [2, 29],
        82: [2, 29],
        83: [2, 29],
        84: [2, 29],
        85: [2, 29]
      }, {
        14: [2, 15],
        15: [2, 15],
        19: [2, 15],
        29: [2, 15],
        34: [2, 15],
        39: [2, 15],
        44: [2, 15],
        47: [2, 15],
        48: [2, 15],
        51: [2, 15],
        55: [2, 15],
        60: [2, 15]
      }, {
        72: [1, 138],
        77: [1, 137]
      }, {
        72: [2, 100],
        77: [2, 100]
      }, {
        14: [2, 16],
        15: [2, 16],
        19: [2, 16],
        29: [2, 16],
        34: [2, 16],
        44: [2, 16],
        47: [2, 16],
        48: [2, 16],
        51: [2, 16],
        55: [2, 16],
        60: [2, 16]
      }, {
        33: [1, 139]
      }, {
        33: [2, 75]
      }, {
        33: [2, 32]
      }, {
        72: [2, 101],
        77: [2, 101]
      }, {
        14: [2, 17],
        15: [2, 17],
        19: [2, 17],
        29: [2, 17],
        34: [2, 17],
        39: [2, 17],
        44: [2, 17],
        47: [2, 17],
        48: [2, 17],
        51: [2, 17],
        55: [2, 17],
        60: [2, 17]
      }],
      defaultActions: {
        4: [2, 1],
        55: [2, 55],
        57: [2, 20],
        61: [2, 57],
        74: [2, 81],
        83: [2, 85],
        87: [2, 18],
        91: [2, 89],
        102: [2, 53],
        105: [2, 93],
        111: [2, 19],
        112: [2, 77],
        117: [2, 97],
        120: [2, 63],
        123: [2, 69],
        124: [2, 12],
        136: [2, 75],
        137: [2, 32]
      },
      parseError: function parseError(str, hash) {
        throw new Error(str);
      },
      parse: function parse(input) {
        var self = this,
            stack = [0],
            vstack = [null],
            lstack = [],
            table = this.table,
            yytext = "",
            yylineno = 0,
            yyleng = 0,
            recovering = 0;
        this.lexer.setInput(input);
        this.lexer.yy = this.yy;
        this.yy.lexer = this.lexer;
        this.yy.parser = this;
        if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
        var yyloc = this.lexer.yylloc;
        lstack.push(yyloc);
        var ranges = this.lexer.options && this.lexer.options.ranges;
        if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;

        function lex() {
          var token;
          token = self.lexer.lex() || 1;

          if (typeof token !== "number") {
            token = self.symbols_[token] || token;
          }

          return token;
        }

        var symbol,
            preErrorSymbol,
            state,
            action,
            r,
            yyval = {},
            p,
            len,
            newState,
            expected;

        while (true) {
          state = stack[stack.length - 1];

          if (this.defaultActions[state]) {
            action = this.defaultActions[state];
          } else {
            if (symbol === null || typeof symbol == "undefined") {
              symbol = lex();
            }

            action = table[state] && table[state][symbol];
          }

          if (typeof action === "undefined" || !action.length || !action[0]) {
            var errStr = "";

            if (!recovering) {
              expected = [];

              for (p in table[state]) {
                if (this.terminals_[p] && p > 2) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }

              if (this.lexer.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }

              this.parseError(errStr, {
                text: this.lexer.match,
                token: this.terminals_[symbol] || symbol,
                line: this.lexer.yylineno,
                loc: yyloc,
                expected: expected
              });
            }
          }

          if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }

          switch (action[0]) {
            case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;

              if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) recovering--;
              } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
              }

              break;

            case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
              };

              if (ranges) {
                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }

              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);

              if (typeof r !== "undefined") {
                return r;
              }

              if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
              }

              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;

            case 3:
              return true;
          }
        }

        return true;
      }
    };
    /* Jison generated lexer */

    var lexer = function () {
      var lexer = {
        EOF: 1,
        parseError: function parseError(str, hash) {
          if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
          } else {
            throw new Error(str);
          }
        },
        setInput: function setInput(input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
          };
          if (this.options.ranges) this.yylloc.range = [0, 0];
          this.offset = 0;
          return this;
        },
        input: function input() {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);

          if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
          } else {
            this.yylloc.last_column++;
          }

          if (this.options.ranges) this.yylloc.range[1]++;
          this._input = this._input.slice(1);
          return ch;
        },
        unput: function unput(ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);
          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len - 1); //this.yyleng -= len;

          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);
          if (lines.length - 1) this.yylineno -= lines.length - 1;
          var r = this.yylloc.range;
          this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
          };

          if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }

          return this;
        },
        more: function more() {
          this._more = true;
          return this;
        },
        less: function less(n) {
          this.unput(this.match.slice(n));
        },
        pastInput: function pastInput() {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
        },
        upcomingInput: function upcomingInput() {
          var next = this.match;

          if (next.length < 20) {
            next += this._input.substr(0, 20 - next.length);
          }

          return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },
        showPosition: function showPosition() {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
        },
        next: function next() {
          if (this.done) {
            return this.EOF;
          }

          if (!this._input) this.done = true;
          var token, match, tempMatch, index, lines;

          if (!this._more) {
            this.yytext = '';
            this.match = '';
          }

          var rules = this._currentRules();

          for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);

            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
              match = tempMatch;
              index = i;
              if (!this.options.flex) break;
            }
          }

          if (match) {
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) this.yylineno += lines.length;
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;

            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }

            this._more = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) this.done = false;
            if (token) return token;else return;
          }

          if (this._input === "") {
            return this.EOF;
          } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
              text: "",
              token: null,
              line: this.yylineno
            });
          }
        },
        lex: function lex() {
          var r = this.next();

          if (typeof r !== 'undefined') {
            return r;
          } else {
            return this.lex();
          }
        },
        begin: function begin(condition) {
          this.conditionStack.push(condition);
        },
        popState: function popState() {
          return this.conditionStack.pop();
        },
        _currentRules: function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        },
        topState: function topState() {
          return this.conditionStack[this.conditionStack.length - 2];
        },
        pushState: function begin(condition) {
          this.begin(condition);
        }
      };
      lexer.options = {};

      lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        function strip(start, end) {
          return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng - end);
        }

        switch ($avoiding_name_collisions) {
          case 0:
            if (yy_.yytext.slice(-2) === "\\\\") {
              strip(0, 1);
              this.begin("mu");
            } else if (yy_.yytext.slice(-1) === "\\") {
              strip(0, 1);
              this.begin("emu");
            } else {
              this.begin("mu");
            }

            if (yy_.yytext) return 15;
            break;

          case 1:
            return 15;
            break;

          case 2:
            this.popState();
            return 15;
            break;

          case 3:
            this.begin('raw');
            return 15;
            break;

          case 4:
            this.popState(); // Should be using `this.topState()` below, but it currently
            // returns the second top instead of the first top. Opened an
            // issue about it at https://github.com/zaach/jison/issues/291

            if (this.conditionStack[this.conditionStack.length - 1] === 'raw') {
              return 15;
            } else {
              yy_.yytext = yy_.yytext.substr(5, yy_.yyleng - 9);
              return 'END_RAW_BLOCK';
            }

            break;

          case 5:
            return 15;
            break;

          case 6:
            this.popState();
            return 14;
            break;

          case 7:
            return 65;
            break;

          case 8:
            return 68;
            break;

          case 9:
            return 19;
            break;

          case 10:
            this.popState();
            this.begin('raw');
            return 23;
            break;

          case 11:
            return 55;
            break;

          case 12:
            return 60;
            break;

          case 13:
            return 29;
            break;

          case 14:
            return 47;
            break;

          case 15:
            this.popState();
            return 44;
            break;

          case 16:
            this.popState();
            return 44;
            break;

          case 17:
            return 34;
            break;

          case 18:
            return 39;
            break;

          case 19:
            return 51;
            break;

          case 20:
            return 48;
            break;

          case 21:
            this.unput(yy_.yytext);
            this.popState();
            this.begin('com');
            break;

          case 22:
            this.popState();
            return 14;
            break;

          case 23:
            return 48;
            break;

          case 24:
            return 73;
            break;

          case 25:
            return 72;
            break;

          case 26:
            return 72;
            break;

          case 27:
            return 87;
            break;

          case 28:
            // ignore whitespace
            break;

          case 29:
            this.popState();
            return 54;
            break;

          case 30:
            this.popState();
            return 33;
            break;

          case 31:
            yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
            return 80;
            break;

          case 32:
            yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
            return 80;
            break;

          case 33:
            return 85;
            break;

          case 34:
            return 82;
            break;

          case 35:
            return 82;
            break;

          case 36:
            return 83;
            break;

          case 37:
            return 84;
            break;

          case 38:
            return 81;
            break;

          case 39:
            return 75;
            break;

          case 40:
            return 77;
            break;

          case 41:
            return 72;
            break;

          case 42:
            yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, '$1');
            return 72;
            break;

          case 43:
            return 'INVALID';
            break;

          case 44:
            return 5;
            break;
        }
      };

      lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]*?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
      lexer.conditions = {
        "mu": {
          "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
          "inclusive": false
        },
        "emu": {
          "rules": [2],
          "inclusive": false
        },
        "com": {
          "rules": [6],
          "inclusive": false
        },
        "raw": {
          "rules": [3, 4, 5],
          "inclusive": false
        },
        "INITIAL": {
          "rules": [0, 1, 44],
          "inclusive": true
        }
      };
      return lexer;
    }();

    parser.lexer = lexer;

    function Parser() {
      this.yy = {};
    }

    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser();
  }();

  _exports.parser = handlebars;
  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var loc = node && node.loc,
        line,
        column;

    if (loc) {
      line = loc.start.line;
      column = loc.start.column;
      message += ' - ' + line + ':' + column;
    }

    var tmp = Error.prototype.constructor.call(this, message); // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.

    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }
    /* istanbul ignore else */


    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Exception);
    }

    try {
      if (loc) {
        this.lineNumber = line; // Work around issue under safari where we can't directly set the column value

        /* istanbul ignore next */

        if (Object.defineProperty) {
          Object.defineProperty(this, 'column', {
            value: column,
            enumerable: true
          });
        } else {
          this.column = column;
        }
      }
    } catch (nop) {
      /* Ignore if the browser is very particular */
    }
  }

  Exception.prototype = new Error();

  function Visitor() {
    this.parents = [];
  }

  Visitor.prototype = {
    constructor: Visitor,
    mutating: false,
    // Visits a given value. If mutating, will replace the value if necessary.
    acceptKey: function acceptKey(node, name) {
      var value = this.accept(node[name]);

      if (this.mutating) {
        // Hacky sanity check: This may have a few false positives for type for the helper
        // methods but will generally do the right thing without a lot of overhead.
        if (value && !Visitor.prototype[value.type]) {
          throw new Exception('Unexpected node type "' + value.type + '" found when accepting ' + name + ' on ' + node.type);
        }

        node[name] = value;
      }
    },
    // Performs an accept operation with added sanity check to ensure
    // required keys are not removed.
    acceptRequired: function acceptRequired(node, name) {
      this.acceptKey(node, name);

      if (!node[name]) {
        throw new Exception(node.type + ' requires ' + name);
      }
    },
    // Traverses a given array. If mutating, empty respnses will be removed
    // for child elements.
    acceptArray: function acceptArray(array) {
      for (var i = 0, l = array.length; i < l; i++) {
        this.acceptKey(array, i);

        if (!array[i]) {
          array.splice(i, 1);
          i--;
          l--;
        }
      }
    },
    accept: function accept(object) {
      if (!object) {
        return;
      }
      /* istanbul ignore next: Sanity code */


      if (!this[object.type]) {
        throw new Exception('Unknown type: ' + object.type, object);
      }

      if (this.current) {
        this.parents.unshift(this.current);
      }

      this.current = object;
      var ret = this[object.type](object);
      this.current = this.parents.shift();

      if (!this.mutating || ret) {
        return ret;
      } else if (ret !== false) {
        return object;
      }
    },
    Program: function Program(program) {
      this.acceptArray(program.body);
    },
    MustacheStatement: visitSubExpression,
    Decorator: visitSubExpression,
    BlockStatement: visitBlock,
    DecoratorBlock: visitBlock,
    PartialStatement: visitPartial,
    PartialBlockStatement: function PartialBlockStatement(partial) {
      visitPartial.call(this, partial);
      this.acceptKey(partial, 'program');
    },
    ContentStatement: function ContentStatement()
    /* content */
    {},
    CommentStatement: function CommentStatement()
    /* comment */
    {},
    SubExpression: visitSubExpression,
    PathExpression: function PathExpression()
    /* path */
    {},
    StringLiteral: function StringLiteral()
    /* string */
    {},
    NumberLiteral: function NumberLiteral()
    /* number */
    {},
    BooleanLiteral: function BooleanLiteral()
    /* bool */
    {},
    UndefinedLiteral: function UndefinedLiteral()
    /* literal */
    {},
    NullLiteral: function NullLiteral()
    /* literal */
    {},
    Hash: function Hash(hash) {
      this.acceptArray(hash.pairs);
    },
    HashPair: function HashPair(pair) {
      this.acceptRequired(pair, 'value');
    }
  };

  function visitSubExpression(mustache) {
    this.acceptRequired(mustache, 'path');
    this.acceptArray(mustache.params);
    this.acceptKey(mustache, 'hash');
  }

  function visitBlock(block) {
    visitSubExpression.call(this, block);
    this.acceptKey(block, 'program');
    this.acceptKey(block, 'inverse');
  }

  function visitPartial(partial) {
    this.acceptRequired(partial, 'name');
    this.acceptArray(partial.params);
    this.acceptKey(partial, 'hash');
  }

  function WhitespaceControl(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = options;
  }

  WhitespaceControl.prototype = new Visitor();

  WhitespaceControl.prototype.Program = function (program) {
    var doStandalone = !this.options.ignoreStandalone;
    var isRoot = !this.isRootSeen;
    this.isRootSeen = true;
    var body = program.body;

    for (var i = 0, l = body.length; i < l; i++) {
      var current = body[i],
          strip = this.accept(current);

      if (!strip) {
        continue;
      }

      var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot),
          _isNextWhitespace = isNextWhitespace(body, i, isRoot),
          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

      if (strip.close) {
        omitRight(body, i, true);
      }

      if (strip.open) {
        omitLeft(body, i, true);
      }

      if (doStandalone && inlineStandalone) {
        omitRight(body, i);

        if (omitLeft(body, i)) {
          // If we are on a standalone node, save the indent info for partials
          if (current.type === 'PartialStatement') {
            // Pull out the whitespace from the final line
            current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
          }
        }
      }

      if (doStandalone && openStandalone) {
        omitRight((current.program || current.inverse).body); // Strip out the previous content node if it's whitespace only

        omitLeft(body, i);
      }

      if (doStandalone && closeStandalone) {
        // Always strip the next node
        omitRight(body, i);
        omitLeft((current.inverse || current.program).body);
      }
    }

    return program;
  };

  WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function (block) {
    this.accept(block.program);
    this.accept(block.inverse); // Find the inverse program that is involed with whitespace stripping.

    var program = block.program || block.inverse,
        inverse = block.program && block.inverse,
        firstInverse = inverse,
        lastInverse = inverse;

    if (inverse && inverse.chained) {
      firstInverse = inverse.body[0].program; // Walk the inverse chain to find the last inverse that is actually in the chain.

      while (lastInverse.chained) {
        lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
      }
    }

    var strip = {
      open: block.openStrip.open,
      close: block.closeStrip.close,
      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: isNextWhitespace(program.body),
      closeStandalone: isPrevWhitespace((firstInverse || program).body)
    };

    if (block.openStrip.close) {
      omitRight(program.body, null, true);
    }

    if (inverse) {
      var inverseStrip = block.inverseStrip;

      if (inverseStrip.open) {
        omitLeft(program.body, null, true);
      }

      if (inverseStrip.close) {
        omitRight(firstInverse.body, null, true);
      }

      if (block.closeStrip.open) {
        omitLeft(lastInverse.body, null, true);
      } // Find standalone else statments


      if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
        omitLeft(program.body);
        omitRight(firstInverse.body);
      }
    } else if (block.closeStrip.open) {
      omitLeft(program.body, null, true);
    }

    return strip;
  };

  WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function (mustache) {
    return mustache.strip;
  };

  WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function (node) {
    /* istanbul ignore next */
    var strip = node.strip || {};
    return {
      inlineStandalone: true,
      open: strip.open,
      close: strip.close
    };
  };

  function isPrevWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = body.length;
    } // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)


    var prev = body[i - 1],
        sibling = body[i - 2];

    if (!prev) {
      return isRoot;
    }

    if (prev.type === 'ContentStatement') {
      return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
    }
  }

  function isNextWhitespace(body, i, isRoot) {
    if (i === undefined) {
      i = -1;
    }

    var next = body[i + 1],
        sibling = body[i + 2];

    if (!next) {
      return isRoot;
    }

    if (next.type === 'ContentStatement') {
      return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
    }
  } // Marks the node to the right of the position as omitted.
  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
  //
  // If i is undefined, then the first child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.


  function omitRight(body, i, multiple) {
    var current = body[i == null ? 0 : i + 1];

    if (!current || current.type !== 'ContentStatement' || !multiple && current.rightStripped) {
      return;
    }

    var original = current.value;
    current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, '');
    current.rightStripped = current.value !== original;
  } // Marks the node to the left of the position as omitted.
  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
  //
  // If i is undefined then the last child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.


  function omitLeft(body, i, multiple) {
    var current = body[i == null ? body.length - 1 : i - 1];

    if (!current || current.type !== 'ContentStatement' || !multiple && current.leftStripped) {
      return;
    } // We omit the last node if it's whitespace only and not preceeded by a non-content node.


    var original = current.value;
    current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, '');
    current.leftStripped = current.value !== original;
    return current.leftStripped;
  }

  function validateClose(open, close) {
    close = close.path ? close.path.original : close;

    if (open.path.original !== close) {
      var errorNode = {
        loc: open.path.loc
      };
      throw new Exception(open.path.original + " doesn't match " + close, errorNode);
    }
  }

  function SourceLocation(source, locInfo) {
    this.source = source;
    this.start = {
      line: locInfo.first_line,
      column: locInfo.first_column
    };
    this.end = {
      line: locInfo.last_line,
      column: locInfo.last_column
    };
  }

  function id(token) {
    if (/^\[.*\]$/.test(token)) {
      return token.substr(1, token.length - 2);
    } else {
      return token;
    }
  }

  function stripFlags(open, close) {
    return {
      open: open.charAt(2) === '~',
      close: close.charAt(close.length - 3) === '~'
    };
  }

  function stripComment(comment) {
    return comment.replace(/^\{\{~?!-?-?/, '').replace(/-?-?~?\}\}$/, '');
  }

  function preparePath(data, parts, loc) {
    loc = this.locInfo(loc);
    var original = data ? '@' : '',
        dig = [],
        depth = 0;

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i].part,
          // If we have [] syntax then we do not treat path references as operators,
      // i.e. foo.[this] resolves to approximately context.foo['this']
      isLiteral = parts[i].original !== part;
      original += (parts[i].separator || '') + part;

      if (!isLiteral && (part === '..' || part === '.' || part === 'this')) {
        if (dig.length > 0) {
          throw new Exception('Invalid path: ' + original, {
            loc: loc
          });
        } else if (part === '..') {
          depth++;
        }
      } else {
        dig.push(part);
      }
    }

    return {
      type: 'PathExpression',
      data: data,
      depth: depth,
      parts: dig,
      original: original,
      loc: loc
    };
  }

  function prepareMustache(path, params, hash, open, strip, locInfo) {
    // Must use charAt to support IE pre-10
    var escapeFlag = open.charAt(3) || open.charAt(2),
        escaped = escapeFlag !== '{' && escapeFlag !== '&';
    var decorator = /\*/.test(open);
    return {
      type: decorator ? 'Decorator' : 'MustacheStatement',
      path: path,
      params: params,
      hash: hash,
      escaped: escaped,
      strip: strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareRawBlock(openRawBlock, contents, close, locInfo) {
    validateClose(openRawBlock, close);
    locInfo = this.locInfo(locInfo);
    var program = {
      type: 'Program',
      body: contents,
      strip: {},
      loc: locInfo
    };
    return {
      type: 'BlockStatement',
      path: openRawBlock.path,
      params: openRawBlock.params,
      hash: openRawBlock.hash,
      program: program,
      openStrip: {},
      inverseStrip: {},
      closeStrip: {},
      loc: locInfo
    };
  }

  function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
    if (close && close.path) {
      validateClose(openBlock, close);
    }

    var decorator = /\*/.test(openBlock.open);
    program.blockParams = openBlock.blockParams;
    var inverse, inverseStrip;

    if (inverseAndProgram) {
      if (decorator) {
        throw new Exception('Unexpected inverse block on decorator', inverseAndProgram);
      }

      if (inverseAndProgram.chain) {
        inverseAndProgram.program.body[0].closeStrip = close.strip;
      }

      inverseStrip = inverseAndProgram.strip;
      inverse = inverseAndProgram.program;
    }

    if (inverted) {
      inverted = inverse;
      inverse = program;
      program = inverted;
    }

    return {
      type: decorator ? 'DecoratorBlock' : 'BlockStatement',
      path: openBlock.path,
      params: openBlock.params,
      hash: openBlock.hash,
      program: program,
      inverse: inverse,
      openStrip: openBlock.strip,
      inverseStrip: inverseStrip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  function prepareProgram(statements, loc) {
    if (!loc && statements.length) {
      var firstLoc = statements[0].loc,
          lastLoc = statements[statements.length - 1].loc;
      /* istanbul ignore else */

      if (firstLoc && lastLoc) {
        loc = {
          source: firstLoc.source,
          start: {
            line: firstLoc.start.line,
            column: firstLoc.start.column
          },
          end: {
            line: lastLoc.end.line,
            column: lastLoc.end.column
          }
        };
      }
    }

    return {
      type: 'Program',
      body: statements,
      strip: {},
      loc: loc
    };
  }

  function preparePartialBlock(open, program, close, locInfo) {
    validateClose(open, close);
    return {
      type: 'PartialBlockStatement',
      name: open.path,
      params: open.params,
      hash: open.hash,
      program: program,
      openStrip: open.strip,
      closeStrip: close && close.strip,
      loc: this.locInfo(locInfo)
    };
  }

  var Helpers =
  /*#__PURE__*/
  Object.freeze({
    SourceLocation: SourceLocation,
    id: id,
    stripFlags: stripFlags,
    stripComment: stripComment,
    preparePath: preparePath,
    prepareMustache: prepareMustache,
    prepareRawBlock: prepareRawBlock,
    prepareBlock: prepareBlock,
    prepareProgram: prepareProgram,
    preparePartialBlock: preparePartialBlock
  });

  function extend(obj
  /* , ...source */
  ) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          obj[key] = arguments[i][key];
        }
      }
    }

    return obj;
  }

  var toString = Object.prototype.toString; // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt

  /* eslint-disable func-style */

  var isFunction = function isFunction(value) {
    return typeof value === 'function';
  }; // fallback for older versions of Chrome and Safari

  /* istanbul ignore next */


  if (isFunction(/x/)) {
    isFunction = function isFunction(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }

  var yy = {};
  extend(yy, Helpers);

  function parse(input, options) {
    // Just return if an already-compiled AST was passed in.
    if (input.type === 'Program') {
      return input;
    }

    handlebars.yy = yy; // Altering the shared object here, but this is ok as parser is a sync operation

    yy.locInfo = function (locInfo) {
      return new yy.SourceLocation(options && options.srcName, locInfo);
    };

    var strip = new WhitespaceControl(options);
    return strip.accept(handlebars.parse(input));
  }
});
define("node-module/index", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.require = _exports.module = _exports.IS_NODE = void 0;

  /*global module */
  var IS_NODE = typeof module === 'object' && typeof module.require === 'function';
  _exports.IS_NODE = IS_NODE;
  var exportModule;
  _exports.module = exportModule;
  var exportRequire;
  _exports.require = exportRequire;

  if (IS_NODE) {
    _exports.module = exportModule = module;
    _exports.require = exportRequire = module.require;
  } else {
    _exports.module = exportModule = null;
    _exports.require = exportRequire = null;
  }
});
define("simple-html-tokenizer", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.tokenize = tokenize;
  _exports.Tokenizer = _exports.EventedTokenizer = _exports.EntityParser = _exports.HTML5NamedCharRefs = void 0;

  /**
   * generated from https://raw.githubusercontent.com/w3c/html/26b5126f96f736f796b9e29718138919dd513744/entities.json
   * do not edit
   */
  var namedCharRefs = {
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "\u2061",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    amp: "&",
    AMP: "&",
    andand: "⩕",
    And: "⩓",
    and: "∧",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angmsd: "∡",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    apacir: "⩯",
    ap: "≈",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "\u2061",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    barwed: "⌅",
    Barwed: "⌆",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    because: "∵",
    Because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxdl: "┐",
    boxdL: "╕",
    boxDl: "╖",
    boxDL: "╗",
    boxdr: "┌",
    boxdR: "╒",
    boxDr: "╓",
    boxDR: "╔",
    boxh: "─",
    boxH: "═",
    boxhd: "┬",
    boxHd: "╤",
    boxhD: "╥",
    boxHD: "╦",
    boxhu: "┴",
    boxHu: "╧",
    boxhU: "╨",
    boxHU: "╩",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxul: "┘",
    boxuL: "╛",
    boxUl: "╜",
    boxUL: "╝",
    boxur: "└",
    boxuR: "╘",
    boxUr: "╙",
    boxUR: "╚",
    boxv: "│",
    boxV: "║",
    boxvh: "┼",
    boxvH: "╪",
    boxVh: "╫",
    boxVH: "╬",
    boxvl: "┤",
    boxvL: "╡",
    boxVl: "╢",
    boxVL: "╣",
    boxvr: "├",
    boxvR: "╞",
    boxVr: "╟",
    boxVR: "╠",
    bprime: "‵",
    breve: "˘",
    Breve: "˘",
    brvbar: "¦",
    bscr: "𝒷",
    Bscr: "ℬ",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsolb: "⧅",
    bsol: "\\",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    cap: "∩",
    Cap: "⋒",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    centerdot: "·",
    CenterDot: "·",
    cfr: "𝔠",
    Cfr: "ℭ",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cir: "○",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    colon: ":",
    Colon: "∷",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    conint: "∮",
    Conint: "∯",
    ContourIntegral: "∮",
    copf: "𝕔",
    Copf: "ℂ",
    coprod: "∐",
    Coproduct: "∐",
    copy: "©",
    COPY: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    cross: "✗",
    Cross: "⨯",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    cupbrcap: "⩈",
    cupcap: "⩆",
    CupCap: "≍",
    cup: "∪",
    Cup: "⋓",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    dagger: "†",
    Dagger: "‡",
    daleth: "ℸ",
    darr: "↓",
    Darr: "↡",
    dArr: "⇓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    ddagger: "‡",
    ddarr: "⇊",
    DD: "ⅅ",
    dd: "ⅆ",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    diamond: "⋄",
    Diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrowBar: "⤓",
    downarrow: "↓",
    DownArrow: "↓",
    Downarrow: "⇓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVectorBar: "⥖",
    DownLeftVector: "↽",
    DownRightTeeVector: "⥟",
    DownRightVectorBar: "⥗",
    DownRightVector: "⇁",
    DownTeeArrow: "↧",
    DownTee: "⊤",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    Ecirc: "Ê",
    ecirc: "ê",
    ecir: "≖",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    edot: "ė",
    eDot: "≑",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp13: " ",
    emsp14: " ",
    emsp: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    escr: "ℯ",
    Escr: "ℰ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    exponentiale: "ⅇ",
    ExponentialE: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    forall: "∀",
    ForAll: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    fscr: "𝒻",
    Fscr: "ℱ",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    ge: "≥",
    gE: "≧",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    gescc: "⪩",
    ges: "⩾",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    gg: "≫",
    Gg: "⋙",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gla: "⪥",
    gl: "≷",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gne: "⪈",
    gnE: "≩",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    gtcc: "⪧",
    gtcir: "⩺",
    gt: ">",
    GT: ">",
    Gt: "≫",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    harrcir: "⥈",
    harr: "↔",
    hArr: "⇔",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    hfr: "𝔥",
    Hfr: "ℌ",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    hopf: "𝕙",
    Hopf: "ℍ",
    horbar: "―",
    HorizontalLine: "─",
    hscr: "𝒽",
    Hscr: "ℋ",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "\u2063",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    ifr: "𝔦",
    Ifr: "ℑ",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    Im: "ℑ",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    incare: "℅",
    in: "∈",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    intcal: "⊺",
    int: "∫",
    Int: "∬",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "\u2063",
    InvisibleTimes: "\u2062",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    iscr: "𝒾",
    Iscr: "ℐ",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "\u2062",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    lang: "⟨",
    Lang: "⟪",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    larrb: "⇤",
    larrbfs: "⤟",
    larr: "←",
    Larr: "↞",
    lArr: "⇐",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    latail: "⤙",
    lAtail: "⤛",
    lat: "⪫",
    late: "⪭",
    lates: "⪭︀",
    lbarr: "⤌",
    lBarr: "⤎",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    le: "≤",
    lE: "≦",
    LeftAngleBracket: "⟨",
    LeftArrowBar: "⇤",
    leftarrow: "←",
    LeftArrow: "←",
    Leftarrow: "⇐",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVectorBar: "⥙",
    LeftDownVector: "⇃",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    leftrightarrow: "↔",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTeeArrow: "↤",
    LeftTee: "⊣",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangleBar: "⧏",
    LeftTriangle: "⊲",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVectorBar: "⥘",
    LeftUpVector: "↿",
    LeftVectorBar: "⥒",
    LeftVector: "↼",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    lescc: "⪨",
    les: "⩽",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    llarr: "⇇",
    ll: "≪",
    Ll: "⋘",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoustache: "⎰",
    lmoust: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lne: "⪇",
    lnE: "≨",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    longleftarrow: "⟵",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftrightarrow: "⟷",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longmapsto: "⟼",
    longrightarrow: "⟶",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "\u200E",
    lrtri: "⊿",
    lsaquo: "‹",
    lscr: "𝓁",
    Lscr: "ℒ",
    lsh: "↰",
    Lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    ltcc: "⪦",
    ltcir: "⩹",
    lt: "<",
    LT: "<",
    Lt: "≪",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    Map: "⤅",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    midast: "*",
    midcir: "⫰",
    mid: "∣",
    middot: "·",
    minusb: "⊟",
    minus: "−",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    mscr: "𝓂",
    Mscr: "ℳ",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natural: "♮",
    naturals: "ℕ",
    natur: "♮",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    nearhk: "⤤",
    nearr: "↗",
    neArr: "⇗",
    nearrow: "↗",
    ne: "≠",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: "\n",
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nharr: "↮",
    nhArr: "⇎",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlarr: "↚",
    nlArr: "⇍",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nleftarrow: "↚",
    nLeftarrow: "⇍",
    nleftrightarrow: "↮",
    nLeftrightarrow: "⇎",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "\u2060",
    NonBreakingSpace: " ",
    nopf: "𝕟",
    Nopf: "ℕ",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangle: "⋪",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangle: "⋫",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    nparallel: "∦",
    npar: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    nprec: "⊀",
    npreceq: "⪯̸",
    npre: "⪯̸",
    nrarrc: "⤳̸",
    nrarr: "↛",
    nrArr: "⇏",
    nrarrw: "↝̸",
    nrightarrow: "↛",
    nRightarrow: "⇏",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nvdash: "⊬",
    nvDash: "⊭",
    nVdash: "⊮",
    nVDash: "⊯",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwarr: "↖",
    nwArr: "⇖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    Ocirc: "Ô",
    ocirc: "ô",
    ocir: "⊚",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    orarr: "↻",
    Or: "⩔",
    or: "∨",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    otimesas: "⨶",
    Otimes: "⨷",
    otimes: "⊗",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    para: "¶",
    parallel: "∥",
    par: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plus: "+",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    popf: "𝕡",
    Popf: "ℙ",
    pound: "£",
    prap: "⪷",
    Pr: "⪻",
    pr: "≺",
    prcue: "≼",
    precapprox: "⪷",
    prec: "≺",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    pre: "⪯",
    prE: "⪳",
    precsim: "≾",
    prime: "′",
    Prime: "″",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportional: "∝",
    Proportion: "∷",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    qopf: "𝕢",
    Qopf: "ℚ",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    quot: "\"",
    QUOT: "\"",
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    rang: "⟩",
    Rang: "⟫",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarr: "→",
    Rarr: "↠",
    rArr: "⇒",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    ratail: "⤚",
    rAtail: "⤜",
    ratio: "∶",
    rationals: "ℚ",
    rbarr: "⤍",
    rBarr: "⤏",
    RBarr: "⤐",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    Re: "ℜ",
    rect: "▭",
    reg: "®",
    REG: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    rfr: "𝔯",
    Rfr: "ℜ",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrowBar: "⇥",
    rightarrow: "→",
    RightArrow: "→",
    Rightarrow: "⇒",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVectorBar: "⥕",
    RightDownVector: "⇂",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTeeArrow: "↦",
    RightTee: "⊢",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangleBar: "⧐",
    RightTriangle: "⊳",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVectorBar: "⥔",
    RightUpVector: "↾",
    RightVectorBar: "⥓",
    RightVector: "⇀",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "\u200F",
    rmoustache: "⎱",
    rmoust: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    ropf: "𝕣",
    Ropf: "ℝ",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    rscr: "𝓇",
    Rscr: "ℛ",
    rsh: "↱",
    Rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    Sc: "⪼",
    sc: "≻",
    sccue: "≽",
    sce: "⪰",
    scE: "⪴",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdotb: "⊡",
    sdot: "⋅",
    sdote: "⩦",
    searhk: "⤥",
    searr: "↘",
    seArr: "⇘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "\xAD",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    solbar: "⌿",
    solb: "⧄",
    sol: "/",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    square: "□",
    Square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squ: "□",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    sub: "⊂",
    Sub: "⋐",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    subset: "⊂",
    Subset: "⋐",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succapprox: "⪸",
    succ: "≻",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    sum: "∑",
    Sum: "∑",
    sung: "♪",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    sup: "⊃",
    Sup: "⋑",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    supset: "⊃",
    Supset: "⋑",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swarr: "↙",
    swArr: "⇙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    therefore: "∴",
    Therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    ThinSpace: " ",
    thinsp: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    tilde: "˜",
    Tilde: "∼",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    timesbar: "⨱",
    timesb: "⊠",
    times: "×",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    topbot: "⌶",
    topcir: "⫱",
    top: "⊤",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    trade: "™",
    TRADE: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    uarr: "↑",
    Uarr: "↟",
    uArr: "⇑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrowBar: "⤒",
    uparrow: "↑",
    UpArrow: "↑",
    Uparrow: "⇑",
    UpArrowDownArrow: "⇅",
    updownarrow: "↕",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    upsi: "υ",
    Upsi: "ϒ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTeeArrow: "↥",
    UpTee: "⊥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    varr: "↕",
    vArr: "⇕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    vBar: "⫨",
    Vbar: "⫫",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    vdash: "⊢",
    vDash: "⊨",
    Vdash: "⊩",
    VDash: "⊫",
    Vdashl: "⫦",
    veebar: "⊻",
    vee: "∨",
    Vee: "⋁",
    veeeq: "≚",
    vellip: "⋮",
    verbar: "|",
    Verbar: "‖",
    vert: "|",
    Vert: "‖",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    wedge: "∧",
    Wedge: "⋀",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xharr: "⟷",
    xhArr: "⟺",
    Xi: "Ξ",
    xi: "ξ",
    xlarr: "⟵",
    xlArr: "⟸",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrarr: "⟶",
    xrArr: "⟹",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    yuml: "ÿ",
    Yuml: "Ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    zfr: "𝔷",
    Zfr: "ℨ",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    zopf: "𝕫",
    Zopf: "ℤ",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "\u200D",
    zwnj: "\u200C"
  };
  _exports.HTML5NamedCharRefs = namedCharRefs;
  var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
  var CHARCODE = /^#([0-9]+)$/;
  var NAMED = /^([A-Za-z0-9]+)$/;

  var EntityParser =
  /** @class */
  function () {
    function EntityParser(named) {
      this.named = named;
    }

    EntityParser.prototype.parse = function (entity) {
      if (!entity) {
        return;
      }

      var matches = entity.match(HEXCHARCODE);

      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 16));
      }

      matches = entity.match(CHARCODE);

      if (matches) {
        return String.fromCharCode(parseInt(matches[1], 10));
      }

      matches = entity.match(NAMED);

      if (matches) {
        return this.named[matches[1]];
      }
    };

    return EntityParser;
  }();

  _exports.EntityParser = EntityParser;
  var WSP = /[\t\n\f ]/;
  var ALPHA = /[A-Za-z]/;
  var CRLF = /\r\n?/g;

  function isSpace(char) {
    return WSP.test(char);
  }

  function isAlpha(char) {
    return ALPHA.test(char);
  }

  function preprocessInput(input) {
    return input.replace(CRLF, '\n');
  }

  var EventedTokenizer =
  /** @class */
  function () {
    function EventedTokenizer(delegate, entityParser) {
      this.delegate = delegate;
      this.entityParser = entityParser;
      this.state = "beforeData"
      /* beforeData */
      ;
      this.line = -1;
      this.column = -1;
      this.input = '';
      this.index = -1;
      this.tagNameBuffer = '';
      this.states = {
        beforeData: function beforeData() {
          var char = this.peek();

          if (char === '<' && !this.isIgnoredEndTag()) {
            this.transitionTo("tagOpen"
            /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else {
            if (char === '\n') {
              var tag = this.tagNameBuffer.toLowerCase();

              if (tag === 'pre' || tag === 'textarea') {
                this.consume();
              }
            }

            this.transitionTo("data"
            /* data */
            );
            this.delegate.beginData();
          }
        },
        data: function data() {
          var char = this.peek();
          var tag = this.tagNameBuffer.toLowerCase();

          if (char === '<' && !this.isIgnoredEndTag()) {
            this.delegate.finishData();
            this.transitionTo("tagOpen"
            /* tagOpen */
            );
            this.markTagStart();
            this.consume();
          } else if (char === '&' && tag !== 'script' && tag !== 'style') {
            this.consume();
            this.delegate.appendToData(this.consumeCharRef() || '&');
          } else {
            this.consume();
            this.delegate.appendToData(char);
          }
        },
        tagOpen: function tagOpen() {
          var char = this.consume();

          if (char === '!') {
            this.transitionTo("markupDeclarationOpen"
            /* markupDeclarationOpen */
            );
          } else if (char === '/') {
            this.transitionTo("endTagOpen"
            /* endTagOpen */
            );
          } else if (char === '@' || char === ':' || isAlpha(char)) {
            this.transitionTo("tagName"
            /* tagName */
            );
            this.tagNameBuffer = '';
            this.delegate.beginStartTag();
            this.appendToTagName(char);
          }
        },
        markupDeclarationOpen: function markupDeclarationOpen() {
          var char = this.consume();

          if (char === '-' && this.peek() === '-') {
            this.consume();
            this.transitionTo("commentStart"
            /* commentStart */
            );
            this.delegate.beginComment();
          }
        },
        commentStart: function commentStart() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentStartDash"
            /* commentStartDash */
            );
          } else if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData(char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        commentStartDash: function commentStartDash() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEnd"
            /* commentEnd */
            );
          } else if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData('-');
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        comment: function comment() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEndDash"
            /* commentEndDash */
            );
          } else {
            this.delegate.appendToCommentData(char);
          }
        },
        commentEndDash: function commentEndDash() {
          var char = this.consume();

          if (char === '-') {
            this.transitionTo("commentEnd"
            /* commentEnd */
            );
          } else {
            this.delegate.appendToCommentData('-' + char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        commentEnd: function commentEnd() {
          var char = this.consume();

          if (char === '>') {
            this.delegate.finishComment();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.appendToCommentData('--' + char);
            this.transitionTo("comment"
            /* comment */
            );
          }
        },
        tagName: function tagName() {
          var char = this.consume();

          if (isSpace(char)) {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '>') {
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.appendToTagName(char);
          }
        },
        endTagName: function endTagName() {
          var char = this.consume();

          if (isSpace(char)) {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
            this.tagNameBuffer = '';
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
            this.tagNameBuffer = '';
          } else if (char === '>') {
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
            this.tagNameBuffer = '';
          } else {
            this.appendToTagName(char);
          }
        },
        beforeAttributeName: function beforeAttributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === '/') {
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
            this.consume();
          } else if (char === '>') {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else if (char === '=') {
            this.delegate.reportSyntaxError('attribute name cannot start with equals sign');
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
          }
        },
        attributeName: function attributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.transitionTo("afterAttributeName"
            /* afterAttributeName */
            );
            this.consume();
          } else if (char === '/') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '=') {
            this.transitionTo("beforeAttributeValue"
            /* beforeAttributeValue */
            );
            this.consume();
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else if (char === '"' || char === "'" || char === '<') {
            this.delegate.reportSyntaxError(char + ' is not a valid character within attribute names');
            this.consume();
            this.delegate.appendToAttributeName(char);
          } else {
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        afterAttributeName: function afterAttributeName() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            return;
          } else if (char === '/') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '=') {
            this.consume();
            this.transitionTo("beforeAttributeValue"
            /* beforeAttributeValue */
            );
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.transitionTo("attributeName"
            /* attributeName */
            );
            this.delegate.beginAttribute();
            this.consume();
            this.delegate.appendToAttributeName(char);
          }
        },
        beforeAttributeValue: function beforeAttributeValue() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
          } else if (char === '"') {
            this.transitionTo("attributeValueDoubleQuoted"
            /* attributeValueDoubleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === "'") {
            this.transitionTo("attributeValueSingleQuoted"
            /* attributeValueSingleQuoted */
            );
            this.delegate.beginAttributeValue(true);
            this.consume();
          } else if (char === '>') {
            this.delegate.beginAttributeValue(false);
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("attributeValueUnquoted"
            /* attributeValueUnquoted */
            );
            this.delegate.beginAttributeValue(false);
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueDoubleQuoted: function attributeValueDoubleQuoted() {
          var char = this.consume();

          if (char === '"') {
            this.delegate.finishAttributeValue();
            this.transitionTo("afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
            );
          } else if (char === '&') {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueSingleQuoted: function attributeValueSingleQuoted() {
          var char = this.consume();

          if (char === "'") {
            this.delegate.finishAttributeValue();
            this.transitionTo("afterAttributeValueQuoted"
            /* afterAttributeValueQuoted */
            );
          } else if (char === '&') {
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else {
            this.delegate.appendToAttributeValue(char);
          }
        },
        attributeValueUnquoted: function attributeValueUnquoted() {
          var char = this.peek();

          if (isSpace(char)) {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.delegate.finishAttributeValue();
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '&') {
            this.consume();
            this.delegate.appendToAttributeValue(this.consumeCharRef() || '&');
          } else if (char === '>') {
            this.delegate.finishAttributeValue();
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.consume();
            this.delegate.appendToAttributeValue(char);
          }
        },
        afterAttributeValueQuoted: function afterAttributeValueQuoted() {
          var char = this.peek();

          if (isSpace(char)) {
            this.consume();
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          } else if (char === '/') {
            this.consume();
            this.transitionTo("selfClosingStartTag"
            /* selfClosingStartTag */
            );
          } else if (char === '>') {
            this.consume();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          }
        },
        selfClosingStartTag: function selfClosingStartTag() {
          var char = this.peek();

          if (char === '>') {
            this.consume();
            this.delegate.markTagAsSelfClosing();
            this.delegate.finishTag();
            this.transitionTo("beforeData"
            /* beforeData */
            );
          } else {
            this.transitionTo("beforeAttributeName"
            /* beforeAttributeName */
            );
          }
        },
        endTagOpen: function endTagOpen() {
          var char = this.consume();

          if (char === '@' || char === ':' || isAlpha(char)) {
            this.transitionTo("endTagName"
            /* endTagName */
            );
            this.tagNameBuffer = '';
            this.delegate.beginEndTag();
            this.appendToTagName(char);
          }
        }
      };
      this.reset();
    }

    EventedTokenizer.prototype.reset = function () {
      this.transitionTo("beforeData"
      /* beforeData */
      );
      this.input = '';
      this.tagNameBuffer = '';
      this.index = 0;
      this.line = 1;
      this.column = 0;
      this.delegate.reset();
    };

    EventedTokenizer.prototype.transitionTo = function (state) {
      this.state = state;
    };

    EventedTokenizer.prototype.tokenize = function (input) {
      this.reset();
      this.tokenizePart(input);
      this.tokenizeEOF();
    };

    EventedTokenizer.prototype.tokenizePart = function (input) {
      this.input += preprocessInput(input);

      while (this.index < this.input.length) {
        var handler = this.states[this.state];

        if (handler !== undefined) {
          handler.call(this);
        } else {
          throw new Error("unhandled state " + this.state);
        }
      }
    };

    EventedTokenizer.prototype.tokenizeEOF = function () {
      this.flushData();
    };

    EventedTokenizer.prototype.flushData = function () {
      if (this.state === 'data') {
        this.delegate.finishData();
        this.transitionTo("beforeData"
        /* beforeData */
        );
      }
    };

    EventedTokenizer.prototype.peek = function () {
      return this.input.charAt(this.index);
    };

    EventedTokenizer.prototype.consume = function () {
      var char = this.peek();
      this.index++;

      if (char === '\n') {
        this.line++;
        this.column = 0;
      } else {
        this.column++;
      }

      return char;
    };

    EventedTokenizer.prototype.consumeCharRef = function () {
      var endIndex = this.input.indexOf(';', this.index);

      if (endIndex === -1) {
        return;
      }

      var entity = this.input.slice(this.index, endIndex);
      var chars = this.entityParser.parse(entity);

      if (chars) {
        var count = entity.length; // consume the entity chars

        while (count) {
          this.consume();
          count--;
        } // consume the `;`


        this.consume();
        return chars;
      }
    };

    EventedTokenizer.prototype.markTagStart = function () {
      this.delegate.tagOpen();
    };

    EventedTokenizer.prototype.appendToTagName = function (char) {
      this.tagNameBuffer += char;
      this.delegate.appendToTagName(char);
    };

    EventedTokenizer.prototype.isIgnoredEndTag = function () {
      var tag = this.tagNameBuffer.toLowerCase();
      return tag === 'title' && this.input.substring(this.index, this.index + 8) !== '</title>' || tag === 'style' && this.input.substring(this.index, this.index + 8) !== '</style>' || tag === 'script' && this.input.substring(this.index, this.index + 9) !== '</script>';
    };

    return EventedTokenizer;
  }();

  _exports.EventedTokenizer = EventedTokenizer;

  var Tokenizer =
  /** @class */
  function () {
    function Tokenizer(entityParser, options) {
      if (options === void 0) {
        options = {};
      }

      this.options = options;
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
      this.tokens = [];
      this.tokenizer = new EventedTokenizer(this, entityParser);
      this._currentAttribute = undefined;
    }

    Tokenizer.prototype.tokenize = function (input) {
      this.tokens = [];
      this.tokenizer.tokenize(input);
      return this.tokens;
    };

    Tokenizer.prototype.tokenizePart = function (input) {
      this.tokens = [];
      this.tokenizer.tokenizePart(input);
      return this.tokens;
    };

    Tokenizer.prototype.tokenizeEOF = function () {
      this.tokens = [];
      this.tokenizer.tokenizeEOF();
      return this.tokens[0];
    };

    Tokenizer.prototype.reset = function () {
      this.token = null;
      this.startLine = 1;
      this.startColumn = 0;
    };

    Tokenizer.prototype.current = function () {
      var token = this.token;

      if (token === null) {
        throw new Error('token was unexpectedly null');
      }

      if (arguments.length === 0) {
        return token;
      }

      for (var i = 0; i < arguments.length; i++) {
        if (token.type === arguments[i]) {
          return token;
        }
      }

      throw new Error("token type was unexpectedly " + token.type);
    };

    Tokenizer.prototype.push = function (token) {
      this.token = token;
      this.tokens.push(token);
    };

    Tokenizer.prototype.currentAttribute = function () {
      return this._currentAttribute;
    };

    Tokenizer.prototype.addLocInfo = function () {
      if (this.options.loc) {
        this.current().loc = {
          start: {
            line: this.startLine,
            column: this.startColumn
          },
          end: {
            line: this.tokenizer.line,
            column: this.tokenizer.column
          }
        };
      }

      this.startLine = this.tokenizer.line;
      this.startColumn = this.tokenizer.column;
    }; // Data


    Tokenizer.prototype.beginData = function () {
      this.push({
        type: "Chars"
        /* Chars */
        ,
        chars: ''
      });
    };

    Tokenizer.prototype.appendToData = function (char) {
      this.current("Chars"
      /* Chars */
      ).chars += char;
    };

    Tokenizer.prototype.finishData = function () {
      this.addLocInfo();
    }; // Comment


    Tokenizer.prototype.beginComment = function () {
      this.push({
        type: "Comment"
        /* Comment */
        ,
        chars: ''
      });
    };

    Tokenizer.prototype.appendToCommentData = function (char) {
      this.current("Comment"
      /* Comment */
      ).chars += char;
    };

    Tokenizer.prototype.finishComment = function () {
      this.addLocInfo();
    }; // Tags - basic


    Tokenizer.prototype.tagOpen = function () {};

    Tokenizer.prototype.beginStartTag = function () {
      this.push({
        type: "StartTag"
        /* StartTag */
        ,
        tagName: '',
        attributes: [],
        selfClosing: false
      });
    };

    Tokenizer.prototype.beginEndTag = function () {
      this.push({
        type: "EndTag"
        /* EndTag */
        ,
        tagName: ''
      });
    };

    Tokenizer.prototype.finishTag = function () {
      this.addLocInfo();
    };

    Tokenizer.prototype.markTagAsSelfClosing = function () {
      this.current("StartTag"
      /* StartTag */
      ).selfClosing = true;
    }; // Tags - name


    Tokenizer.prototype.appendToTagName = function (char) {
      this.current("StartTag"
      /* StartTag */
      , "EndTag"
      /* EndTag */
      ).tagName += char;
    }; // Tags - attributes


    Tokenizer.prototype.beginAttribute = function () {
      this._currentAttribute = ['', '', false];
    };

    Tokenizer.prototype.appendToAttributeName = function (char) {
      this.currentAttribute()[0] += char;
    };

    Tokenizer.prototype.beginAttributeValue = function (isQuoted) {
      this.currentAttribute()[2] = isQuoted;
    };

    Tokenizer.prototype.appendToAttributeValue = function (char) {
      this.currentAttribute()[1] += char;
    };

    Tokenizer.prototype.finishAttributeValue = function () {
      this.current("StartTag"
      /* StartTag */
      ).attributes.push(this._currentAttribute);
    };

    Tokenizer.prototype.reportSyntaxError = function (message) {
      this.current().syntaxError = message;
    };

    return Tokenizer;
  }();

  _exports.Tokenizer = Tokenizer;

  function tokenize(input, options) {
    var tokenizer = new Tokenizer(new EntityParser(namedCharRefs), options);
    return tokenizer.tokenize(input);
  }
});
(function (m) { if (typeof module === "object" && module.exports) { module.exports = m } }(require("ember-template-compiler")));
}());
//# sourceMappingURL=ember-template-compiler.map
