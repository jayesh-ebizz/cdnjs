(function() {
/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2018 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   3.2.0-beta.3
 */

/*globals process */
var enifed, requireModule, Ember;

// Used in ember-environment/lib/global.js
mainContext = this; // eslint-disable-line no-undef

(function() {
  function missingModule(name, referrerName) {
    if (referrerName) {
      throw new Error('Could not find module ' + name + ' required by: ' + referrerName);
    } else {
      throw new Error('Could not find module ' + name);
    }
  }

  function internalRequire(_name, referrerName) {
    var name = _name;
    var mod = registry[name];

    if (!mod) {
      name = name + '/index';
      mod = registry[name];
    }

    var exports = seen[name];

    if (exports !== undefined) {
      return exports;
    }

    exports = seen[name] = {};

    if (!mod) {
      missingModule(_name, referrerName);
    }

    var deps = mod.deps;
    var callback = mod.callback;
    var reified = new Array(deps.length);

    for (var i = 0; i < deps.length; i++) {
      if (deps[i] === 'exports') {
        reified[i] = exports;
      } else if (deps[i] === 'require') {
        reified[i] = requireModule;
      } else {
        reified[i] = internalRequire(deps[i], name);
      }
    }

    callback.apply(this, reified);

    return exports;
  }

  var isNode =
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
    var registry = {};
    var seen = {};

    enifed = function(name, deps, callback) {
      var value = {};

      if (!callback) {
        value.deps = [];
        value.callback = deps;
      } else {
        value.deps = deps;
        value.callback = callback;
      }

      registry[name] = value;
    };

    requireModule = function(name) {
      return internalRequire(name, null);
    };

    // setup `require` module
    requireModule['default'] = requireModule;

    requireModule.has = function registryHas(moduleName) {
      return !!registry[moduleName] || !!registry[moduleName + '/index'];
    };

    requireModule._eak_seen = registry;

    Ember.__loader = {
      define: enifed,
      require: requireModule,
      registry: registry,
    };
  } else {
    enifed = Ember.__loader.define;
    requireModule = Ember.__loader.require;
  }
})();

enifed('container', ['exports', 'ember-babel', 'ember-debug', 'ember/features', 'ember-utils', 'ember-environment'], function (exports, _emberBabel, _emberDebug, _features, _emberUtils, _emberEnvironment) {
  'use strict';

  exports.FACTORY_FOR = exports.Container = exports.privatize = exports.Registry = undefined;

  var Container = function () {
    function Container(registry) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _emberBabel.classCallCheck)(this, Container);

      this.registry = registry;
      this.owner = options.owner || null;
      this.cache = (0, _emberUtils.dictionary)(options.cache || null);
      this.factoryManagerCache = (0, _emberUtils.dictionary)(options.factoryManagerCache || null);
      this.isDestroyed = false;

      if (true) {
        this.validationCache = (0, _emberUtils.dictionary)(options.validationCache || null);
      }
    }

    /**
     @private
     @property registry
     @type Registry
     @since 1.11.0
     */

    /**
     @private
     @property cache
     @type InheritingDict
     */

    /**
     @private
     @property validationCache
     @type InheritingDict
     */

    /**
     Given a fullName return a corresponding instance.
      The default behavior is for lookup to return a singleton instance.
     The singleton is scoped to the container, allowing multiple containers
     to all have their own locally scoped singletons.
      ```javascript
     let registry = new Registry();
     let container = registry.container();
      registry.register('api:twitter', Twitter);
      let twitter = container.lookup('api:twitter');
      twitter instanceof Twitter; // => true
      // by default the container will return singletons
     let twitter2 = container.lookup('api:twitter');
     twitter2 instanceof Twitter; // => true
      twitter === twitter2; //=> true
     ```
      If singletons are not wanted, an optional flag can be provided at lookup.
      ```javascript
     let registry = new Registry();
     let container = registry.container();
      registry.register('api:twitter', Twitter);
      let twitter = container.lookup('api:twitter', { singleton: false });
     let twitter2 = container.lookup('api:twitter', { singleton: false });
      twitter === twitter2; //=> false
     ```
      @private
     @method lookup
     @param {String} fullName
     @param {Object} [options]
     @param {String} [options.source] The fullname of the request source (used for local lookup)
     @return {any}
     */


    Container.prototype.lookup = function lookup(fullName, options) {
      (true && !(this.registry.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.registry.isValidFullName(fullName)));

      return _lookup(this, this.registry.normalize(fullName), options);
    };

    Container.prototype.destroy = function destroy() {
      destroyDestroyables(this);
      this.isDestroyed = true;
    };

    Container.prototype.reset = function reset(fullName) {
      if (fullName === undefined) {
        resetCache(this);
      } else {
        resetMember(this, this.registry.normalize(fullName));
      }
    };

    Container.prototype.ownerInjection = function ownerInjection() {
      var _ref;

      return _ref = {}, _ref[_emberUtils.OWNER] = this.owner, _ref;
    };

    Container.prototype.factoryFor = function factoryFor(fullName) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var normalizedName = this.registry.normalize(fullName);

      (true && !(this.registry.isValidFullName(normalizedName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.registry.isValidFullName(normalizedName)));
      (true && !(_features.EMBER_MODULE_UNIFICATION || !options.namespace) && (0, _emberDebug.assert)('EMBER_MODULE_UNIFICATION must be enabled to pass a namespace option to factoryFor', _features.EMBER_MODULE_UNIFICATION || !options.namespace));


      if (options.source || options.namespace) {
        normalizedName = this.registry.expandLocalLookup(fullName, options);
        if (!normalizedName) {
          return;
        }
      }

      return _factoryFor(this, normalizedName, fullName);
    };

    return Container;
  }();

  /*
   * Wrap a factory manager in a proxy which will not permit properties to be
   * set on the manager.
   */
  function wrapManagerInDeprecationProxy(manager) {
    if (_emberUtils.HAS_NATIVE_PROXY) {
      var validator = {
        set: function (obj, prop) {
          throw new Error('You attempted to set "' + prop + '" on a factory manager created by container#factoryFor. A factory manager is a read-only construct.');
        }
      };

      // Note:
      // We have to proxy access to the manager here so that private property
      // access doesn't cause the above errors to occur.
      var m = manager;
      var proxiedManager = {
        class: m.class,
        create: function (props) {
          return m.create(props);
        }
      };

      var proxy = new Proxy(proxiedManager, validator);
      FACTORY_FOR.set(proxy, manager);
    }

    return manager;
  }

  function isSingleton(container, fullName) {
    return container.registry.getOption(fullName, 'singleton') !== false;
  }

  function isInstantiatable(container, fullName) {
    return container.registry.getOption(fullName, 'instantiate') !== false;
  }

  function _lookup(container, fullName) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (true && !(_features.EMBER_MODULE_UNIFICATION || !options.namespace) && (0, _emberDebug.assert)('EMBER_MODULE_UNIFICATION must be enabled to pass a namespace option to lookup', _features.EMBER_MODULE_UNIFICATION || !options.namespace));


    var normalizedName = fullName;

    if (options.source || options.namespace) {
      normalizedName = container.registry.expandLocalLookup(fullName, options);
      if (!normalizedName) {
        return;
      }
    }

    if (options.singleton !== false) {
      var cached = container.cache[normalizedName];
      if (cached !== undefined) {
        return cached;
      }
    }

    return instantiateFactory(container, normalizedName, fullName, options);
  }

  function _factoryFor(container, normalizedName, fullName) {
    var cached = container.factoryManagerCache[normalizedName];

    if (cached !== undefined) {
      return cached;
    }

    var factory = container.registry.resolve(normalizedName);

    if (factory === undefined) {
      return;
    }

    if (true && factory && typeof factory._onLookup === 'function') {
      factory._onLookup(fullName); // What should this pass? fullname or the normalized key?
    }

    var manager = new FactoryManager(container, factory, fullName, normalizedName);

    if (true) {
      manager = wrapManagerInDeprecationProxy(manager);
    }

    container.factoryManagerCache[normalizedName] = manager;
    return manager;
  }

  function isSingletonClass(container, fullName, _ref2) {
    var instantiate = _ref2.instantiate,
        singleton = _ref2.singleton;

    return singleton !== false && !instantiate && isSingleton(container, fullName) && !isInstantiatable(container, fullName);
  }

  function isSingletonInstance(container, fullName, _ref3) {
    var instantiate = _ref3.instantiate,
        singleton = _ref3.singleton;

    return singleton !== false && instantiate !== false && isSingleton(container, fullName) && isInstantiatable(container, fullName);
  }

  function isFactoryClass(container, fullname, _ref4) {
    var instantiate = _ref4.instantiate,
        singleton = _ref4.singleton;

    return instantiate === false && (singleton === false || !isSingleton(container, fullname)) && !isInstantiatable(container, fullname);
  }

  function isFactoryInstance(container, fullName, _ref5) {
    var instantiate = _ref5.instantiate,
        singleton = _ref5.singleton;

    return instantiate !== false && (singleton !== false || isSingleton(container, fullName)) && isInstantiatable(container, fullName);
  }

  function instantiateFactory(container, normalizedName, fullName, options) {
    var factoryManager = _factoryFor(container, normalizedName, fullName);

    if (factoryManager === undefined) {
      return;
    }

    // SomeClass { singleton: true, instantiate: true } | { singleton: true } | { instantiate: true } | {}
    // By default majority of objects fall into this case
    if (isSingletonInstance(container, fullName, options)) {
      return container.cache[normalizedName] = factoryManager.create();
    }

    // SomeClass { singleton: false, instantiate: true }
    if (isFactoryInstance(container, fullName, options)) {
      return factoryManager.create();
    }

    // SomeClass { singleton: true, instantiate: false } | { instantiate: false } | { singleton: false, instantiation: false }
    if (isSingletonClass(container, fullName, options) || isFactoryClass(container, fullName, options)) {
      return factoryManager.class;
    }

    throw new Error('Could not create factory');
  }

  function processInjections(container, injections, result) {
    if (true) {
      container.registry.validateInjections(injections);
    }

    var hash = result.injections;
    if (hash === undefined) {
      hash = result.injections = {};
    }

    for (var i = 0; i < injections.length; i++) {
      var _injections$i = injections[i],
          property = _injections$i.property,
          specifier = _injections$i.specifier,
          source = _injections$i.source;


      if (source) {
        hash[property] = _lookup(container, specifier, { source: source });
      } else {
        hash[property] = _lookup(container, specifier);
      }

      if (!result.isDynamic) {
        result.isDynamic = !isSingleton(container, specifier);
      }
    }
  }

  function buildInjections(container, typeInjections, injections) {
    var result = {
      injections: undefined,
      isDyanmic: false
    };

    if (typeInjections !== undefined) {
      processInjections(container, typeInjections, result);
    }

    if (injections !== undefined) {
      processInjections(container, injections, result);
    }

    return result;
  }

  function injectionsFor(container, fullName) {
    var registry = container.registry;

    var _fullName$split = fullName.split(':'),
        type = _fullName$split[0];

    var typeInjections = registry.getTypeInjections(type);
    var injections = registry.getInjections(fullName);

    return buildInjections(container, typeInjections, injections);
  }

  function destroyDestroyables(container) {
    var cache = container.cache;
    var keys = Object.keys(cache);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = cache[key];

      if (value.destroy) {
        value.destroy();
      }
    }
  }

  function resetCache(container) {
    destroyDestroyables(container);
    container.cache = (0, _emberUtils.dictionary)(null);
    container.factoryManagerCache = (0, _emberUtils.dictionary)(null);
  }

  function resetMember(container, fullName) {
    var member = container.cache[fullName];

    delete container.factoryManagerCache[fullName];

    if (member) {
      delete container.cache[fullName];

      if (member.destroy) {
        member.destroy();
      }
    }
  }

  var FACTORY_FOR = new WeakMap();

  var FactoryManager = function () {
    function FactoryManager(container, factory, fullName, normalizedName) {
      (0, _emberBabel.classCallCheck)(this, FactoryManager);

      this.container = container;
      this.owner = container.owner;
      this.class = factory;
      this.fullName = fullName;
      this.normalizedName = normalizedName;
      this.madeToString = undefined;
      this.injections = undefined;
      FACTORY_FOR.set(this, this);
    }

    FactoryManager.prototype.toString = function toString() {
      if (this.madeToString === undefined) {
        this.madeToString = this.container.registry.makeToString(this.class, this.fullName);
      }

      return this.madeToString;
    };

    FactoryManager.prototype.create = function create(options) {
      var injectionsCache = this.injections;
      if (injectionsCache === undefined) {
        var _injectionsFor = injectionsFor(this.container, this.normalizedName),
            injections = _injectionsFor.injections,
            isDynamic = _injectionsFor.isDynamic;

        injectionsCache = injections;
        if (!isDynamic) {
          this.injections = injections;
        }
      }

      var props = injectionsCache;
      if (options !== undefined) {
        props = (0, _emberUtils.assign)({}, injectionsCache, options);
      }

      if (true) {
        var lazyInjections = void 0;
        var validationCache = this.container.validationCache;
        // Ensure that all lazy injections are valid at instantiation time
        if (!validationCache[this.fullName] && this.class && typeof this.class._lazyInjections === 'function') {
          lazyInjections = this.class._lazyInjections();
          lazyInjections = this.container.registry.normalizeInjectionsHash(lazyInjections);

          this.container.registry.validateInjections(lazyInjections);
        }

        validationCache[this.fullName] = true;
      }

      if (!this.class.create) {
        throw new Error('Failed to create an instance of \'' + this.normalizedName + '\'. Most likely an improperly defined class or' + ' an invalid module export.');
      }

      // required to allow access to things like
      // the customized toString, _debugContainerKey,
      // owner, etc. without a double extend and without
      // modifying the objects properties
      if (typeof this.class._initFactory === 'function') {
        this.class._initFactory(this);
      } else {
        // in the non-EmberObject case we need to still setOwner
        // this is required for supporting glimmer environment and
        // template instantiation which rely heavily on
        // `options[OWNER]` being passed into `create`
        // TODO: clean this up, and remove in future versions
        if (options === undefined || props === undefined) {
          // avoid mutating `props` here since they are the cached injections
          props = (0, _emberUtils.assign)({}, props);
        }
        (0, _emberUtils.setOwner)(props, this.owner);
      }

      var instance = this.class.create(props);
      FACTORY_FOR.set(instance, this);

      return instance;
    };

    return FactoryManager;
  }();

  var VALID_FULL_NAME_REGEXP = /^[^:]+:[^:]+$/;
  var missingResolverFunctionsDeprecation = 'Passing a `resolver` function into a Registry is deprecated. Please pass in a Resolver object with a `resolve` method.';

  /**
   A registry used to store factory and option information keyed
   by type.
  
   A `Registry` stores the factory and option information needed by a
   `Container` to instantiate and cache objects.
  
   The API for `Registry` is still in flux and should not be considered stable.
  
   @private
   @class Registry
   @since 1.11.0
  */

  var Registry = function () {
    function Registry() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      (0, _emberBabel.classCallCheck)(this, Registry);

      this.fallback = options.fallback || null;
      this.resolver = options.resolver || null;

      if (_emberEnvironment.ENV._ENABLE_RESOLVER_FUNCTION_SUPPORT !== true) {
        (true && !(typeof this.resolver !== 'function') && (0, _emberDebug.assert)(missingResolverFunctionsDeprecation, typeof this.resolver !== 'function'));
      }

      if (typeof this.resolver === 'function' && _emberEnvironment.ENV._ENABLE_RESOLVER_FUNCTION_SUPPORT === true) {
        deprecateResolverFunction(this);
      }

      this.registrations = (0, _emberUtils.dictionary)(options.registrations || null);

      this._typeInjections = (0, _emberUtils.dictionary)(null);
      this._injections = (0, _emberUtils.dictionary)(null);

      this._localLookupCache = Object.create(null);
      this._normalizeCache = (0, _emberUtils.dictionary)(null);
      this._resolveCache = (0, _emberUtils.dictionary)(null);
      this._failSet = new Set();

      this._options = (0, _emberUtils.dictionary)(null);
      this._typeOptions = (0, _emberUtils.dictionary)(null);
    }

    /**
     A backup registry for resolving registrations when no matches can be found.
      @private
     @property fallback
     @type Registry
     */

    /**
     An object that has a `resolve` method that resolves a name.
      @private
     @property resolver
     @type Resolver
     */

    /**
     @private
     @property registrations
     @type InheritingDict
     */

    /**
     @private
      @property _typeInjections
     @type InheritingDict
     */

    /**
     @private
      @property _injections
     @type InheritingDict
     */

    /**
     @private
      @property _normalizeCache
     @type InheritingDict
     */

    /**
     @private
      @property _resolveCache
     @type InheritingDict
     */

    /**
     @private
      @property _options
     @type InheritingDict
     */

    /**
     @private
      @property _typeOptions
     @type InheritingDict
     */

    /**
     Creates a container based on this registry.
      @private
     @method container
     @param {Object} options
     @return {Container} created container
     */


    Registry.prototype.container = function container(options) {
      return new Container(this, options);
    };

    Registry.prototype.register = function register(fullName, factory) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      (true && !(this.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.isValidFullName(fullName)));
      (true && !(factory !== undefined) && (0, _emberDebug.assert)('Attempting to register an unknown factory: \'' + fullName + '\'', factory !== undefined));


      var normalizedName = this.normalize(fullName);
      (true && !(!this._resolveCache[normalizedName]) && (0, _emberDebug.assert)('Cannot re-register: \'' + fullName + '\', as it has already been resolved.', !this._resolveCache[normalizedName]));


      this._failSet.delete(normalizedName);
      this.registrations[normalizedName] = factory;
      this._options[normalizedName] = options;
    };

    Registry.prototype.unregister = function unregister(fullName) {
      (true && !(this.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.isValidFullName(fullName)));


      var normalizedName = this.normalize(fullName);

      this._localLookupCache = Object.create(null);

      delete this.registrations[normalizedName];
      delete this._resolveCache[normalizedName];
      delete this._options[normalizedName];
      this._failSet.delete(normalizedName);
    };

    Registry.prototype.resolve = function resolve(fullName, options) {
      var factory = _resolve(this, this.normalize(fullName), options);
      if (factory === undefined && this.fallback !== null) {
        var _fallback;

        factory = (_fallback = this.fallback).resolve.apply(_fallback, arguments);
      }
      return factory;
    };

    Registry.prototype.describe = function describe(fullName) {
      if (this.resolver !== null && this.resolver.lookupDescription) {
        return this.resolver.lookupDescription(fullName);
      } else if (this.fallback !== null) {
        return this.fallback.describe(fullName);
      } else {
        return fullName;
      }
    };

    Registry.prototype.normalizeFullName = function normalizeFullName(fullName) {
      if (this.resolver !== null && this.resolver.normalize) {
        return this.resolver.normalize(fullName);
      } else if (this.fallback !== null) {
        return this.fallback.normalizeFullName(fullName);
      } else {
        return fullName;
      }
    };

    Registry.prototype.normalize = function normalize(fullName) {
      return this._normalizeCache[fullName] || (this._normalizeCache[fullName] = this.normalizeFullName(fullName));
    };

    Registry.prototype.makeToString = function makeToString(factory, fullName) {
      if (this.resolver !== null && this.resolver.makeToString) {
        return this.resolver.makeToString(factory, fullName);
      } else if (this.fallback !== null) {
        return this.fallback.makeToString(factory, fullName);
      } else {
        return factory.toString();
      }
    };

    Registry.prototype.has = function has(fullName, options) {
      if (!this.isValidFullName(fullName)) {
        return false;
      }

      var source = options && options.source && this.normalize(options.source);
      var namespace = options && options.namespace || undefined;

      return _has(this, this.normalize(fullName), source, namespace);
    };

    Registry.prototype.optionsForType = function optionsForType(type, options) {
      this._typeOptions[type] = options;
    };

    Registry.prototype.getOptionsForType = function getOptionsForType(type) {
      var optionsForType = this._typeOptions[type];
      if (optionsForType === undefined && this.fallback !== null) {
        optionsForType = this.fallback.getOptionsForType(type);
      }
      return optionsForType;
    };

    Registry.prototype.options = function options(fullName, _options) {
      var normalizedName = this.normalize(fullName);
      this._options[normalizedName] = _options;
    };

    Registry.prototype.getOptions = function getOptions(fullName) {
      var normalizedName = this.normalize(fullName);
      var options = this._options[normalizedName];

      if (options === undefined && this.fallback !== null) {
        options = this.fallback.getOptions(fullName);
      }
      return options;
    };

    Registry.prototype.getOption = function getOption(fullName, optionName) {
      var options = this._options[fullName];

      if (options !== undefined && options[optionName] !== undefined) {
        return options[optionName];
      }

      var type = fullName.split(':')[0];
      options = this._typeOptions[type];

      if (options && options[optionName] !== undefined) {
        return options[optionName];
      } else if (this.fallback !== null) {
        return this.fallback.getOption(fullName, optionName);
      }
    };

    Registry.prototype.typeInjection = function typeInjection(type, property, fullName) {
      (true && !(this.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.isValidFullName(fullName)));


      var fullNameType = fullName.split(':')[0];
      (true && !(fullNameType !== type) && (0, _emberDebug.assert)('Cannot inject a \'' + fullName + '\' on other ' + type + '(s).', fullNameType !== type));


      var injections = this._typeInjections[type] || (this._typeInjections[type] = []);

      injections.push({ property: property, specifier: fullName });
    };

    Registry.prototype.injection = function injection(fullName, property, injectionName) {
      (true && !(this.isValidFullName(injectionName)) && (0, _emberDebug.assert)('Invalid injectionName, expected: \'type:name\' got: ' + injectionName, this.isValidFullName(injectionName)));


      var normalizedInjectionName = this.normalize(injectionName);

      if (fullName.indexOf(':') === -1) {
        return this.typeInjection(fullName, property, normalizedInjectionName);
      }

      (true && !(this.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.isValidFullName(fullName)));

      var normalizedName = this.normalize(fullName);

      var injections = this._injections[normalizedName] || (this._injections[normalizedName] = []);

      injections.push({ property: property, specifier: normalizedInjectionName });
    };

    Registry.prototype.knownForType = function knownForType(type) {
      var localKnown = (0, _emberUtils.dictionary)(null);
      var registeredNames = Object.keys(this.registrations);
      for (var index = 0; index < registeredNames.length; index++) {
        var fullName = registeredNames[index];
        var itemType = fullName.split(':')[0];

        if (itemType === type) {
          localKnown[fullName] = true;
        }
      }

      var fallbackKnown = void 0,
          resolverKnown = void 0;
      if (this.fallback !== null) {
        fallbackKnown = this.fallback.knownForType(type);
      }

      if (this.resolver !== null && this.resolver.knownForType) {
        resolverKnown = this.resolver.knownForType(type);
      }

      return (0, _emberUtils.assign)({}, fallbackKnown, localKnown, resolverKnown);
    };

    Registry.prototype.isValidFullName = function isValidFullName(fullName) {
      return VALID_FULL_NAME_REGEXP.test(fullName);
    };

    Registry.prototype.getInjections = function getInjections(fullName) {
      var injections = this._injections[fullName];
      if (this.fallback !== null) {
        var fallbackInjections = this.fallback.getInjections(fullName);

        if (fallbackInjections !== undefined) {
          injections = injections === undefined ? fallbackInjections : injections.concat(fallbackInjections);
        }
      }

      return injections;
    };

    Registry.prototype.getTypeInjections = function getTypeInjections(type) {
      var injections = this._typeInjections[type];
      if (this.fallback !== null) {
        var fallbackInjections = this.fallback.getTypeInjections(type);

        if (fallbackInjections !== undefined) {
          injections = injections === undefined ? fallbackInjections : injections.concat(fallbackInjections);
        }
      }

      return injections;
    };

    Registry.prototype.expandLocalLookup = function expandLocalLookup(fullName, options) {
      if (this.resolver !== null && this.resolver.expandLocalLookup) {
        (true && !(this.isValidFullName(fullName)) && (0, _emberDebug.assert)('fullName must be a proper full name', this.isValidFullName(fullName)));
        (true && !(!options.source || this.isValidFullName(options.source)) && (0, _emberDebug.assert)('options.source must be a proper full name', !options.source || this.isValidFullName(options.source)));


        var normalizedFullName = this.normalize(fullName);
        var normalizedSource = this.normalize(options.source);

        return _expandLocalLookup(this, normalizedFullName, normalizedSource, options.namespace);
      } else if (this.fallback !== null) {
        return this.fallback.expandLocalLookup(fullName, options);
      } else {
        return null;
      }
    };

    return Registry;
  }();

  function deprecateResolverFunction(registry) {
    (true && !(false) && (0, _emberDebug.deprecate)(missingResolverFunctionsDeprecation, false, {
      id: 'ember-application.registry-resolver-as-function',
      until: '3.0.0',
      url: 'https://emberjs.com/deprecations/v2.x#toc_registry-resolver-as-function'
    }));

    registry.resolver = { resolve: registry.resolver };
  }

  if (true) {
    Registry.prototype.normalizeInjectionsHash = function (hash) {
      var injections = [];

      for (var key in hash) {
        if (hash.hasOwnProperty(key)) {
          var _hash$key = hash[key],
              specifier = _hash$key.specifier,
              source = _hash$key.source,
              namespace = _hash$key.namespace;
          (true && !(this.isValidFullName(specifier)) && (0, _emberDebug.assert)('Expected a proper full name, given \'' + specifier + '\'', this.isValidFullName(specifier)));


          injections.push({
            property: key,
            specifier: specifier,
            source: source,
            namespace: namespace
          });
        }
      }

      return injections;
    };

    Registry.prototype.validateInjections = function (injections) {
      if (!injections) {
        return;
      }

      for (var i = 0; i < injections.length; i++) {
        var _injections$i2 = injections[i],
            specifier = _injections$i2.specifier,
            source = _injections$i2.source,
            namespace = _injections$i2.namespace;
        (true && !(this.has(specifier, { source: source, namespace: namespace })) && (0, _emberDebug.assert)('Attempting to inject an unknown injection: \'' + specifier + '\'', this.has(specifier, { source: source, namespace: namespace })));
      }
    };
  }

  function _expandLocalLookup(registry, normalizedName, normalizedSource, namespace) {
    var cache = registry._localLookupCache;
    var normalizedNameCache = cache[normalizedName];

    if (!normalizedNameCache) {
      normalizedNameCache = cache[normalizedName] = Object.create(null);
    }

    var cacheKey = namespace || normalizedSource;

    var cached = normalizedNameCache[cacheKey];

    if (cached !== undefined) {
      return cached;
    }

    var expanded = registry.resolver.expandLocalLookup(normalizedName, normalizedSource, namespace);

    return normalizedNameCache[cacheKey] = expanded;
  }

  function _resolve(registry, _normalizedName, options) {
    var normalizedName = _normalizedName;
    // when `source` is provided expand normalizedName
    // and source into the full normalizedName
    if (options !== undefined && (options.source || options.namespace)) {
      normalizedName = registry.expandLocalLookup(_normalizedName, options);
      if (!normalizedName) {
        return;
      }
    }

    var cached = registry._resolveCache[normalizedName];
    if (cached !== undefined) {
      return cached;
    }
    if (registry._failSet.has(normalizedName)) {
      return;
    }

    var resolved = void 0;

    if (registry.resolver) {
      resolved = registry.resolver.resolve(normalizedName);
    }

    if (resolved === undefined) {
      resolved = registry.registrations[normalizedName];
    }

    if (resolved === undefined) {
      registry._failSet.add(normalizedName);
    } else {
      registry._resolveCache[normalizedName] = resolved;
    }

    return resolved;
  }

  function _has(registry, fullName, source, namespace) {
    return registry.resolve(fullName, { source: source, namespace: namespace }) !== undefined;
  }

  var privateNames = (0, _emberUtils.dictionary)(null);
  var privateSuffix = ('' + Math.random() + Date.now()).replace('.', '');

  function privatize(_ref6) {
    var fullName = _ref6[0];

    var name = privateNames[fullName];
    if (name) {
      return name;
    }

    var _fullName$split2 = fullName.split(':'),
        type = _fullName$split2[0],
        rawName = _fullName$split2[1];

    return privateNames[fullName] = (0, _emberUtils.intern)(type + ':' + rawName + '-' + privateSuffix);
  }

  /*
  Public API for the container is still in flux.
  The public API, specified on the application namespace should be considered the stable API.
  // @module container
    @private
  */

  exports.Registry = Registry;
  exports.privatize = privatize;
  exports.Container = Container;
  exports.FACTORY_FOR = FACTORY_FOR;
});
enifed('ember-babel', ['exports'], function (exports) {
  'use strict';

  exports.classCallCheck = classCallCheck;
  exports.inherits = inherits;
  exports.taggedTemplateLiteralLoose = taggedTemplateLiteralLoose;
  exports.createClass = createClass;
  exports.defaults = defaults;
  function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });

    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : defaults(subClass, superClass);
  }

  function taggedTemplateLiteralLoose(strings, raw) {
    strings.raw = raw;
    return strings;
  }

  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function createClass(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }

  var possibleConstructorReturn = exports.possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError('this hasn\'t been initialized - super() hasn\'t been called');
    }
    return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
  };

  var slice = exports.slice = Array.prototype.slice;
});
enifed('ember-console', ['exports', 'ember-debug'], function (exports, _emberDebug) {
  'use strict';

  // Deliver message that the function is deprecated

  var DEPRECATION_MESSAGE = 'Use of Ember.Logger is deprecated. Please use `console` for logging.';
  var DEPRECATION_ID = 'ember-console.deprecate-logger';
  var DEPRECATION_URL = 'https://emberjs.com/deprecations/v3.x#toc_use-console-rather-than-ember-logger';
  /**
     @module ember
  */
  /**
    Inside Ember-Metal, simply uses the methods from `imports.console`.
    Override this to provide more robust logging functionality.
  
    @class Logger
    @deprecated Use 'console' instead
  
    @namespace Ember
    @public
  */
  var index = {
    log: function () {
      var _console;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      return (_console = console).log.apply(_console, arguments); // eslint-disable-line no-console
    },
    warn: function () {
      var _console2;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      return (_console2 = console).warn.apply(_console2, arguments); // eslint-disable-line no-console
    },
    error: function () {
      var _console3;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      return (_console3 = console).error.apply(_console3, arguments); // eslint-disable-line no-console
    },
    info: function () {
      var _console4;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      return (_console4 = console).info.apply(_console4, arguments); // eslint-disable-line no-console
    },
    debug: function () {
      var _console6;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      /* eslint-disable no-console */
      if (console.debug) {
        var _console5;

        return (_console5 = console).debug.apply(_console5, arguments);
      }
      return (_console6 = console).info.apply(_console6, arguments);
      /* eslint-enable no-console */
    },
    assert: function () {
      var _console7;

      (true && !(false) && (0, _emberDebug.deprecate)(DEPRECATION_MESSAGE, false, {
        id: DEPRECATION_ID,
        until: '4.0.0',
        url: DEPRECATION_URL
      }));

      return (_console7 = console).assert.apply(_console7, arguments); // eslint-disable-line no-console
    }
  };

  exports.default = index;
});
enifed('ember-environment', ['exports'], function (exports) {
  'use strict';

  /* globals global, window, self, mainContext */

  // from lodash to catch fake globals
  function checkGlobal(value) {
    return value && value.Object === Object ? value : undefined;
  }

  // element ids can ruin global miss checks
  function checkElementIdShadowing(value) {
    return value && value.nodeType === undefined ? value : undefined;
  }

  // export real global
  var global$1 = checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) || checkGlobal(typeof self === 'object' && self) || checkGlobal(typeof window === 'object' && window) || mainContext || // set before strict mode in Ember loader/wrapper
  new Function('return this')(); // eval outside of strict mode

  function defaultTrue(v) {
    return v === false ? false : true;
  }

  function defaultFalse(v) {
    return v === true ? true : false;
  }

  function normalizeExtendPrototypes(obj) {
    if (obj === false) {
      return { String: false, Array: false, Function: false };
    } else if (!obj || obj === true) {
      return { String: true, Array: true, Function: true };
    } else {
      return {
        String: defaultTrue(obj.String),
        Array: defaultTrue(obj.Array),
        Function: defaultTrue(obj.Function)
      };
    }
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
  var ENV = typeof global$1.EmberENV === 'object' && global$1.EmberENV || typeof global$1.ENV === 'object' && global$1.ENV || {};

  function getENV() {
    return ENV;
  }

  // ENABLE_ALL_FEATURES was documented, but you can't actually enable non optional features.
  if (ENV.ENABLE_ALL_FEATURES) {
    ENV.ENABLE_OPTIONAL_FEATURES = true;
  }

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
  ENV.EXTEND_PROTOTYPES = normalizeExtendPrototypes(ENV.EXTEND_PROTOTYPES);

  /**
    The `LOG_STACKTRACE_ON_DEPRECATION` property, when true, tells Ember to log
    a full stack trace during deprecation warnings.
  
    @property LOG_STACKTRACE_ON_DEPRECATION
    @type Boolean
    @default true
    @for EmberENV
    @public
  */
  ENV.LOG_STACKTRACE_ON_DEPRECATION = defaultTrue(ENV.LOG_STACKTRACE_ON_DEPRECATION);

  /**
    The `LOG_VERSION` property, when true, tells Ember to log versions of all
    dependent libraries in use.
  
    @property LOG_VERSION
    @type Boolean
    @default true
    @for EmberENV
    @public
  */
  ENV.LOG_VERSION = defaultTrue(ENV.LOG_VERSION);

  ENV.RAISE_ON_DEPRECATION = defaultFalse(ENV.RAISE_ON_DEPRECATION);

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
  ENV._APPLICATION_TEMPLATE_WRAPPER = defaultTrue(ENV._APPLICATION_TEMPLATE_WRAPPER);

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
  ENV._TEMPLATE_ONLY_GLIMMER_COMPONENTS = defaultFalse(ENV._TEMPLATE_ONLY_GLIMMER_COMPONENTS);

  // check if window exists and actually is the global
  var hasDOM = typeof window !== 'undefined' && window === global$1 && window.document && window.document.createElement && !ENV.disableBrowserEnvironment; // is this a public thing?

  // legacy imports/exports/lookup stuff (should we keep this??)
  var originalContext = global$1.Ember || {};

  var context = {
    // import jQuery
    imports: originalContext.imports || global$1,
    // export Ember
    exports: originalContext.exports || global$1,
    // search for Namespaces
    lookup: originalContext.lookup || global$1
  };

  function getLookup() {
    return context.lookup;
  }

  function setLookup(value) {
    context.lookup = value;
  }

  // TODO: cleanup single source of truth issues with this stuff
  var environment = hasDOM ? {
    hasDOM: true,
    isChrome: !!window.chrome && !window.opera,
    isFirefox: typeof InstallTrigger !== 'undefined',
    location: window.location,
    history: window.history,
    userAgent: window.navigator.userAgent,
    window: window
  } : {
    hasDOM: false,
    isChrome: false,
    isFirefox: false,
    location: null,
    history: null,
    userAgent: 'Lynx (textmode)',
    window: null
  };

  exports.ENV = ENV;
  exports.getENV = getENV;
  exports.context = context;
  exports.getLookup = getLookup;
  exports.setLookup = setLookup;
  exports.environment = environment;
});
enifed('ember-metal', ['exports', 'ember-environment', 'ember-debug', 'ember-babel', 'container', 'backburner', '@glimmer/reference', 'ember-utils', 'ember/features', 'ember/version'], function (exports, emberEnvironment, emberDebug, emberBabel, container, Backburner, reference, emberUtils, features, VERSION) {
  'use strict';

  Backburner = Backburner && Backburner.hasOwnProperty('default') ? Backburner['default'] : Backburner;
  VERSION = VERSION && VERSION.hasOwnProperty('default') ? VERSION['default'] : VERSION;

  /*
   When we render a rich template hierarchy, the set of events that
   *might* happen tends to be much larger than the set of events that
   actually happen. This implies that we should make listener creation &
   destruction cheap, even at the cost of making event dispatch more
   expensive.
    Thus we store a new listener with a single push and no new
   allocations, without even bothering to do deduplication -- we can
   save that for dispatch time, if an event actually happens.
   */

  var protoMethods = {
    addToListeners: function (eventName, target, method, once) {
      if (this._listeners === undefined) {
        this._listeners = [];
      }
      this._listeners.push(eventName, target, method, once);
    },
    _finalizeListeners: function () {
      if (this._listenersFinalized) {
        return;
      }
      if (this._listeners === undefined) {
        this._listeners = [];
      }
      var pointer = this.parent;
      while (pointer !== undefined) {
        var listeners = pointer._listeners;
        if (listeners !== undefined) {
          this._listeners = this._listeners.concat(listeners);
        }
        if (pointer._listenersFinalized) {
          break;
        }
        pointer = pointer.parent;
      }
      this._listenersFinalized = true;
    },
    removeFromListeners: function (eventName, target, method) {
      var pointer = this;
      while (pointer !== undefined) {
        var listeners = pointer._listeners;
        if (listeners !== undefined) {
          for (var index = listeners.length - 4; index >= 0; index -= 4) {
            if (listeners[index] === eventName && (!method || listeners[index + 1] === target && listeners[index + 2] === method)) {
              if (pointer === this) {
                listeners.splice(index, 4); // we are modifying our own list, so we edit directly
              } else {
                // we are trying to remove an inherited listener, so we do
                // just-in-time copying to detach our own listeners from
                // our inheritance chain.
                this._finalizeListeners();
                return this.removeFromListeners(eventName, target, method);
              }
            }
          }
        }
        if (pointer._listenersFinalized) {
          break;
        }
        pointer = pointer.parent;
      }
    },
    matchingListeners: function (eventName) {
      var pointer = this;
      var result = void 0;
      while (pointer !== undefined) {
        var listeners = pointer._listeners;
        if (listeners !== undefined) {
          for (var index = 0; index < listeners.length; index += 4) {
            if (listeners[index] === eventName) {
              result = result || [];
              pushUniqueListener(result, listeners, index);
            }
          }
        }
        if (pointer._listenersFinalized) {
          break;
        }
        pointer = pointer.parent;
      }
      return result;
    }
  };

  function pushUniqueListener(destination, source, index) {
    var target = source[index + 1];
    var method = source[index + 2];
    for (var destinationIndex = 0; destinationIndex < destination.length; destinationIndex += 3) {
      if (destination[destinationIndex] === target && destination[destinationIndex + 1] === method) {
        return;
      }
    }
    destination.push(target, method, source[index + 3]);
  }

  /**
  @module @ember/object
  */

  /*
    The event system uses a series of nested hashes to store listeners on an
    object. When a listener is registered, or when an event arrives, these
    hashes are consulted to determine which target and action pair to invoke.
     The hashes are stored in the object's meta hash, and look like this:
         // Object's meta hash
        {
          listeners: {       // variable name: `listenerSet`
            "foo:change": [ // variable name: `actions`
              target, method, once
            ]
          }
        }
   */

  /**
    Add an event listener
     @method addListener
    @static
    @for @ember/object/events
    @param obj
    @param {String} eventName
    @param {Object|Function} target A target object or a function
    @param {Function|String} method A function or the name of a function to be called on `target`
    @param {Boolean} once A flag whether a function should only be called once
    @public
  */
  function addListener(obj, eventName, target, method, once) {
    true && !(!!obj && !!eventName) && emberDebug.assert('You must pass at least an object and event name to addListener', !!obj && !!eventName);

    if (emberEnvironment.ENV._ENABLE_DID_INIT_ATTRS_SUPPORT === true) {
      true && !(eventName !== 'didInitAttrs') && emberDebug.deprecate('didInitAttrs called in ' + (obj && obj.toString && obj.toString()) + '.', eventName !== 'didInitAttrs', {
        id: 'ember-views.did-init-attrs',
        until: '3.0.0',
        url: 'https://emberjs.com/deprecations/v2.x#toc_ember-component-didinitattrs'
      });
    } else {
      true && !(eventName !== 'didInitAttrs') && emberDebug.assert('didInitAttrs called in ' + (obj && obj.toString && obj.toString()) + ' is no longer supported.', eventName !== 'didInitAttrs');
    }

    if (!method && 'function' === typeof target) {
      method = target;
      target = null;
    }

    meta(obj).addToListeners(eventName, target, method, once);
  }

  /**
    Remove an event listener
     Arguments should match those passed to `addListener`.
     @method removeListener
    @static
    @for @ember/object/events
    @param obj
    @param {String} eventName
    @param {Object|Function} target A target object or a function
    @param {Function|String} method A function or the name of a function to be called on `target`
    @public
  */
  function removeListener(obj, eventName, target, method) {
    true && !(!!obj && !!eventName) && emberDebug.assert('You must pass at least an object and event name to removeListener', !!obj && !!eventName);

    if (!method && 'function' === typeof target) {
      method = target;
      target = null;
    }

    meta(obj).removeFromListeners(eventName, target, method);
  }

  /**
    Send an event. The execution of suspended listeners
    is skipped, and once listeners are removed. A listener without
    a target is executed on the passed object. If an array of actions
    is not passed, the actions stored on the passed object are invoked.
     @method sendEvent
    @static
    @for @ember/object/events
    @param obj
    @param {String} eventName
    @param {Array} params Optional parameters for each listener.
    @param {Array} actions Optional array of actions (listeners).
    @param {Meta}  meta Optional meta to lookup listeners
    @return true
    @public
  */
  function sendEvent(obj, eventName, params, actions, _meta) {
    if (actions === undefined) {
      var meta$$1 = _meta === undefined ? peekMeta(obj) : _meta;
      actions = typeof meta$$1 === 'object' && meta$$1 !== null && meta$$1.matchingListeners(eventName);
    }

    if (actions === undefined || actions.length === 0) {
      return false;
    }

    for (var i = actions.length - 3; i >= 0; i -= 3) {
      // looping in reverse for once listeners
      var target = actions[i];
      var method = actions[i + 1];
      var once = actions[i + 2];

      if (!method) {
        continue;
      }
      if (once) {
        removeListener(obj, eventName, target, method);
      }
      if (!target) {
        target = obj;
      }
      if ('string' === typeof method) {
        method = target[method];
      }

      method.apply(target, params);
    }
    return true;
  }

  /**
    @private
    @method hasListeners
    @static
    @for @ember/object/events
    @param obj
    @param {String} eventName
  */
  function hasListeners(obj, eventName) {
    var meta$$1 = peekMeta(obj);
    if (meta$$1 === undefined) {
      return false;
    }
    var matched = meta$$1.matchingListeners(eventName);
    return matched !== undefined && matched.length > 0;
  }

  /**
    Define a property as a function that should be executed when
    a specified event or events are triggered.
      ``` javascript
    import EmberObject from '@ember/object';
    import { on } from '@ember/object/evented';
    import { sendEvent } from '@ember/object/events';
     let Job = EmberObject.extend({
      logCompleted: on('completed', function() {
        console.log('Job completed!');
      })
    });
     let job = Job.create();
     sendEvent(job, 'completed'); // Logs 'Job completed!'
   ```
     @method on
    @static
    @for @ember/object/evented
    @param {String} eventNames*
    @param {Function} func
    @return func
    @public
  */
  function on() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var func = args.pop();
    var events = args;

    true && !(typeof func === 'function') && emberDebug.assert('on expects function as last argument', typeof func === 'function');
    true && !(events.length > 0 && events.every(function (p) {
      return typeof p === 'string' && p.length;
    })) && emberDebug.assert('on called without valid event names', events.length > 0 && events.every(function (p) {
      return typeof p === 'string' && p.length;
    }));

    func.__ember_listens__ = events;
    return func;
  }

  var onerror = void 0;
  var onErrorTarget = {
    get onerror() {
      return onerror;
    }
  };

  // Ember.onerror getter
  function getOnerror() {
    return onerror;
  }
  // Ember.onerror setter
  function setOnerror(handler) {
    onerror = handler;
  }

  var dispatchOverride = void 0;

  // allows testing adapter to override dispatch
  function getDispatchOverride() {
    return dispatchOverride;
  }
  function setDispatchOverride(handler) {
    dispatchOverride = handler;
  }

  var _templateObject = emberBabel.taggedTemplateLiteralLoose(['rsvpAfter'], ['rsvpAfter']);

  var currentRunLoop = null;
  function getCurrentRunLoop() {
    return currentRunLoop;
  }

  function onBegin(current) {
    currentRunLoop = current;
  }

  function onEnd(current, next) {
    currentRunLoop = next;
  }

  /**
    Array of named queues. This array determines the order in which queues
    are flushed at the end of the RunLoop. You can define your own queues by
    simply adding the queue name to this array. Normally you should not need
    to inspect or modify this property.
     @property queues
    @type Array
    @default ['actions', 'destroy']
    @private
  */
  var queues = ['sync', 'actions',

  // used in router transitions to prevent unnecessary loading state entry
  // if all context promises resolve on the 'actions' queue first
  'routerTransitions', 'render', 'afterRender', 'destroy',

  // used to re-throw unhandled RSVP rejection errors specifically in this
  // position to avoid breaking anything rendered in the other sections
  container.privatize(_templateObject)];

  var backburner = new Backburner(queues, {
    sync: {
      before: beginPropertyChanges,
      after: endPropertyChanges
    },
    defaultQueue: 'actions',
    onBegin: onBegin,
    onEnd: onEnd,
    onErrorTarget: onErrorTarget,
    onErrorMethod: 'onerror'
  });

  /**
   @module @ember/runloop
  */
  // ..........................................................
  // run - this is ideally the only public API the dev sees
  //

  /**
    Runs the passed target and method inside of a RunLoop, ensuring any
    deferred actions including bindings and views updates are flushed at the
    end.
     Normally you should not need to invoke this method yourself. However if
    you are implementing raw event handlers when interfacing with other
    libraries or plugins, you should probably wrap all of your code inside this
    call.
     ```javascript
    import { run } from '@ember/runloop';
     run(function() {
      // code to be executed within a RunLoop
    });
    ```
    @method run
    @for @ember/runloop
    @static
    @param {Object} [target] target of method to call
    @param {Function|String} method Method to invoke.
      May be a function or a string. If you pass a string
      then it will be looked up on the passed target.
    @param {Object} [args*] Any additional arguments you wish to pass to the method.
    @return {Object} return value from invoking the passed function.
    @public
  */
  function run() {
    return backburner.run.apply(backburner, arguments);
  }

  // used for the Ember.run global only
  var _globalsRun = run.bind(null);

  /**
    If no run-loop is present, it creates a new one. If a run loop is
    present it will queue itself to run on the existing run-loops action
    queue.
     Please note: This is not for normal usage, and should be used sparingly.
     If invoked when not within a run loop:
     ```javascript
    import { join } from '@ember/runloop';
     join(function() {
      // creates a new run-loop
    });
    ```
     Alternatively, if called within an existing run loop:
     ```javascript
    import { run, join } from '@ember/runloop';
     run(function() {
      // creates a new run-loop
       join(function() {
        // joins with the existing run-loop, and queues for invocation on
        // the existing run-loops action queue.
      });
    });
    ```
     @method join
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to call
    @param {Function|String} method Method to invoke.
      May be a function or a string. If you pass a string
      then it will be looked up on the passed target.
    @param {Object} [args*] Any additional arguments you wish to pass to the method.
    @return {Object} Return value from invoking the passed function. Please note,
    when called within an existing loop, no return value is possible.
    @public
  */
  function join() {
    return backburner.join.apply(backburner, arguments);
  }

  /**
    Allows you to specify which context to call the specified function in while
    adding the execution of that function to the Ember run loop. This ability
    makes this method a great way to asynchronously integrate third-party libraries
    into your Ember application.
     `bind` takes two main arguments, the desired context and the function to
    invoke in that context. Any additional arguments will be supplied as arguments
    to the function that is passed in.
     Let's use the creation of a TinyMCE component as an example. Currently,
    TinyMCE provides a setup configuration option we can use to do some processing
    after the TinyMCE instance is initialized but before it is actually rendered.
    We can use that setup option to do some additional setup for our component.
    The component itself could look something like the following:
     ```app/components/rich-text-editor.js
    import Component from '@ember/component';
    import { on } from '@ember/object/evented';
    import { bind } from '@ember/runloop';
     export default Component.extend({
      initializeTinyMCE: on('didInsertElement', function() {
        tinymce.init({
          selector: '#' + this.$().prop('id'),
          setup: bind(this, this.setupEditor)
        });
      }),
       didInsertElement() {
        tinymce.init({
          selector: '#' + this.$().prop('id'),
          setup: bind(this, this.setupEditor)
        });
      }
       setupEditor(editor) {
        this.set('editor', editor);
         editor.on('change', function() {
          console.log('content changed!');
        });
      }
    });
    ```
     In this example, we use `bind` to bind the setupEditor method to the
    context of the RichTextEditor component and to have the invocation of that
    method be safely handled and executed by the Ember run loop.
     @method bind
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to call
    @param {Function|String} method Method to invoke.
      May be a function or a string. If you pass a string
      then it will be looked up on the passed target.
    @param {Object} [args*] Any additional arguments you wish to pass to the method.
    @return {Function} returns a new function that will always have a particular context
    @since 1.4.0
    @public
  */
  var bind = function () {
    for (var _len = arguments.length, curried = Array(_len), _key = 0; _key < _len; _key++) {
      curried[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return join.apply(undefined, curried.concat(args));
    };
  };

  /**
    Begins a new RunLoop. Any deferred actions invoked after the begin will
    be buffered until you invoke a matching call to `end()`. This is
    a lower-level way to use a RunLoop instead of using `run()`.
     ```javascript
    import { begin, end } from '@ember/runloop';
     begin();
    // code to be executed within a RunLoop
    end();
    ```
     @method begin
    @static
    @for @ember/runloop
    @return {void}
    @public
  */
  function begin() {
    backburner.begin();
  }

  /**
    Ends a RunLoop. This must be called sometime after you call
    `begin()` to flush any deferred actions. This is a lower-level way
    to use a RunLoop instead of using `run()`.
     ```javascript
    import { begin, end } from '@ember/runloop';
     begin();
    // code to be executed within a RunLoop
    end();
    ```
     @method end
    @static
    @for @ember/runloop
    @return {void}
    @public
  */
  function end() {
    backburner.end();
  }

  /**
    Adds the passed target/method and any optional arguments to the named
    queue to be executed at the end of the RunLoop. If you have not already
    started a RunLoop when calling this method one will be started for you
    automatically.
     At the end of a RunLoop, any methods scheduled in this way will be invoked.
    Methods will be invoked in an order matching the named queues defined in
    the `queues` property.
     ```javascript
    import { schedule } from '@ember/runloop';
     schedule('actions', this, function() {
      // this will be executed in the 'actions' queue, after bindings have synced.
      console.log('scheduled on actions queue');
    });
     // Note the functions will be run in order based on the run queues order.
    // Output would be:
    //   scheduled on sync queue
    //   scheduled on actions queue
    ```
     @method schedule
    @static
    @for @ember/runloop
    @param {String} queue The name of the queue to schedule against. Default queues is 'actions'
    @param {Object} [target] target object to use as the context when invoking a method.
    @param {String|Function} method The method to invoke. If you pass a string it
      will be resolved on the target object at the time the scheduled item is
      invoked allowing you to change the target function.
    @param {Object} [arguments*] Optional arguments to be passed to the queued method.
    @return {*} Timer information for use in canceling, see `cancel`.
    @public
  */
  function schedule(queue /*, target, method */) {
    true && !(currentRunLoop || !emberDebug.isTesting()) && emberDebug.assert('You have turned on testing mode, which disabled the run-loop\'s autorun. ' + 'You will need to wrap any code with asynchronous side-effects in a run', currentRunLoop || !emberDebug.isTesting());
    true && !(queue !== 'sync') && emberDebug.deprecate('Scheduling into the \'' + queue + '\' run loop queue is deprecated.', queue !== 'sync', {
      id: 'ember-metal.run.sync',
      until: '3.5.0'
    });

    return backburner.schedule.apply(backburner, arguments);
  }

  // Used by global test teardown
  function hasScheduledTimers() {
    return backburner.hasTimers();
  }

  // Used by global test teardown
  function cancelTimers() {
    backburner.cancelTimers();
  }

  /**
    Invokes the passed target/method and optional arguments after a specified
    period of time. The last parameter of this method must always be a number
    of milliseconds.
     You should use this method whenever you need to run some action after a
    period of time instead of using `setTimeout()`. This method will ensure that
    items that expire during the same script execution cycle all execute
    together, which is often more efficient than using a real setTimeout.
     ```javascript
    import { later } from '@ember/runloop';
     later(myContext, function() {
      // code here will execute within a RunLoop in about 500ms with this == myContext
    }, 500);
    ```
     @method later
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to invoke
    @param {Function|String} method The method to invoke.
      If you pass a string it will be resolved on the
      target at the time the method is invoked.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @param {Number} wait Number of milliseconds to wait.
    @return {*} Timer information for use in canceling, see `cancel`.
    @public
  */
  function later() /*target, method*/{
    return backburner.later.apply(backburner, arguments);
  }

  /**
   Schedule a function to run one time during the current RunLoop. This is equivalent
    to calling `scheduleOnce` with the "actions" queue.
     @method once
    @static
    @for @ember/runloop
    @param {Object} [target] The target of the method to invoke.
    @param {Function|String} method The method to invoke.
      If you pass a string it will be resolved on the
      target at the time the method is invoked.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @return {Object} Timer information for use in canceling, see `cancel`.
    @public
  */
  function once() {
    true && !(currentRunLoop || !emberDebug.isTesting()) && emberDebug.assert('You have turned on testing mode, which disabled the run-loop\'s autorun. ' + 'You will need to wrap any code with asynchronous side-effects in a run', currentRunLoop || !emberDebug.isTesting());

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    args.unshift('actions');
    return backburner.scheduleOnce.apply(backburner, args);
  }

  /**
    Schedules a function to run one time in a given queue of the current RunLoop.
    Calling this method with the same queue/target/method combination will have
    no effect (past the initial call).
     Note that although you can pass optional arguments these will not be
    considered when looking for duplicates. New arguments will replace previous
    calls.
     ```javascript
    import { run, scheduleOnce } from '@ember/runloop';
     function sayHi() {
      console.log('hi');
    }
     run(function() {
      scheduleOnce('afterRender', myContext, sayHi);
      scheduleOnce('afterRender', myContext, sayHi);
      // sayHi will only be executed once, in the afterRender queue of the RunLoop
    });
    ```
     Also note that for `scheduleOnce` to prevent additional calls, you need to
    pass the same function instance. The following case works as expected:
     ```javascript
    function log() {
      console.log('Logging only once');
    }
     function scheduleIt() {
      scheduleOnce('actions', myContext, log);
    }
     scheduleIt();
    scheduleIt();
    ```
     But this other case will schedule the function multiple times:
     ```javascript
    import { scheduleOnce } from '@ember/runloop';
     function scheduleIt() {
      scheduleOnce('actions', myContext, function() {
        console.log('Closure');
      });
    }
     scheduleIt();
    scheduleIt();
     // "Closure" will print twice, even though we're using `scheduleOnce`,
    // because the function we pass to it won't match the
    // previously scheduled operation.
    ```
     Available queues, and their order, can be found at `queues`
     @method scheduleOnce
    @static
    @for @ember/runloop
    @param {String} [queue] The name of the queue to schedule against. Default queues is 'actions'.
    @param {Object} [target] The target of the method to invoke.
    @param {Function|String} method The method to invoke.
      If you pass a string it will be resolved on the
      target at the time the method is invoked.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @return {Object} Timer information for use in canceling, see `cancel`.
    @public
  */
  function scheduleOnce(queue /*, target, method*/) {
    true && !(currentRunLoop || !emberDebug.isTesting()) && emberDebug.assert('You have turned on testing mode, which disabled the run-loop\'s autorun. ' + 'You will need to wrap any code with asynchronous side-effects in a run', currentRunLoop || !emberDebug.isTesting());
    true && !(queue !== 'sync') && emberDebug.deprecate('Scheduling into the \'' + queue + '\' run loop queue is deprecated.', queue !== 'sync', {
      id: 'ember-metal.run.sync',
      until: '3.5.0'
    });

    return backburner.scheduleOnce.apply(backburner, arguments);
  }

  /**
    Schedules an item to run from within a separate run loop, after
    control has been returned to the system. This is equivalent to calling
    `later` with a wait time of 1ms.
     ```javascript
    import { next } from '@ember/runloop';
     next(myContext, function() {
      // code to be executed in the next run loop,
      // which will be scheduled after the current one
    });
    ```
     Multiple operations scheduled with `next` will coalesce
    into the same later run loop, along with any other operations
    scheduled by `later` that expire right around the same
    time that `next` operations will fire.
     Note that there are often alternatives to using `next`.
    For instance, if you'd like to schedule an operation to happen
    after all DOM element operations have completed within the current
    run loop, you can make use of the `afterRender` run loop queue (added
    by the `ember-views` package, along with the preceding `render` queue
    where all the DOM element operations happen).
     Example:
     ```app/components/my-component.js
    import Component from '@ember/component';
    import { scheduleOnce } from '@ember/runloop';
     export Component.extend({
      didInsertElement() {
        this._super(...arguments);
        scheduleOnce('afterRender', this, 'processChildElements');
      },
       processChildElements() {
        // ... do something with component's child component
        // elements after they've finished rendering, which
        // can't be done within this component's
        // `didInsertElement` hook because that gets run
        // before the child elements have been added to the DOM.
      }
    });
    ```
     One benefit of the above approach compared to using `next` is
    that you will be able to perform DOM/CSS operations before unprocessed
    elements are rendered to the screen, which may prevent flickering or
    other artifacts caused by delaying processing until after rendering.
     The other major benefit to the above approach is that `next`
    introduces an element of non-determinism, which can make things much
    harder to test, due to its reliance on `setTimeout`; it's much harder
    to guarantee the order of scheduled operations when they are scheduled
    outside of the current run loop, i.e. with `next`.
     @method next
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to invoke
    @param {Function|String} method The method to invoke.
      If you pass a string it will be resolved on the
      target at the time the method is invoked.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @return {Object} Timer information for use in canceling, see `cancel`.
    @public
  */
  function next() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    args.push(1);
    return backburner.later.apply(backburner, args);
  }

  /**
    Cancels a scheduled item. Must be a value returned by `later()`,
    `once()`, `scheduleOnce()`, `next()`, `debounce()`, or
    `throttle()`.
     ```javascript
    import {
      next,
      cancel,
      later,
      scheduleOnce,
      once,
      throttle,
      debounce
    } from '@ember/runloop';
     let runNext = next(myContext, function() {
      // will not be executed
    });
     cancel(runNext);
     let runLater = later(myContext, function() {
      // will not be executed
    }, 500);
     cancel(runLater);
     let runScheduleOnce = scheduleOnce('afterRender', myContext, function() {
      // will not be executed
    });
     cancel(runScheduleOnce);
     let runOnce = once(myContext, function() {
      // will not be executed
    });
     cancel(runOnce);
     let throttle = throttle(myContext, function() {
      // will not be executed
    }, 1, false);
     cancel(throttle);
     let debounce = debounce(myContext, function() {
      // will not be executed
    }, 1);
     cancel(debounce);
     let debounceImmediate = debounce(myContext, function() {
      // will be executed since we passed in true (immediate)
    }, 100, true);
     // the 100ms delay until this method can be called again will be canceled
    cancel(debounceImmediate);
    ```
     @method cancel
    @static
    @for @ember/runloop
    @param {Object} timer Timer object to cancel
    @return {Boolean} true if canceled or false/undefined if it wasn't found
    @public
  */
  function cancel(timer) {
    return backburner.cancel(timer);
  }

  /**
    Delay calling the target method until the debounce period has elapsed
    with no additional debounce calls. If `debounce` is called again before
    the specified time has elapsed, the timer is reset and the entire period
    must pass again before the target method is called.
     This method should be used when an event may be called multiple times
    but the action should only be called once when the event is done firing.
    A common example is for scroll events where you only want updates to
    happen once scrolling has ceased.
     ```javascript
    import { debounce } from '@ember/runloop';
     function whoRan() {
      console.log(this.name + ' ran.');
    }
     let myContext = { name: 'debounce' };
     debounce(myContext, whoRan, 150);
     // less than 150ms passes
    debounce(myContext, whoRan, 150);
     // 150ms passes
    // whoRan is invoked with context myContext
    // console logs 'debounce ran.' one time.
    ```
     Immediate allows you to run the function immediately, but debounce
    other calls for this function until the wait time has elapsed. If
    `debounce` is called again before the specified time has elapsed,
    the timer is reset and the entire period must pass again before
    the method can be called again.
     ```javascript
    import { debounce } from '@ember/runloop';
     function whoRan() {
      console.log(this.name + ' ran.');
    }
     let myContext = { name: 'debounce' };
     debounce(myContext, whoRan, 150, true);
     // console logs 'debounce ran.' one time immediately.
    // 100ms passes
    debounce(myContext, whoRan, 150, true);
     // 150ms passes and nothing else is logged to the console and
    // the debouncee is no longer being watched
    debounce(myContext, whoRan, 150, true);
     // console logs 'debounce ran.' one time immediately.
    // 150ms passes and nothing else is logged to the console and
    // the debouncee is no longer being watched
    ```
     @method debounce
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to invoke
    @param {Function|String} method The method to invoke.
      May be a function or a string. If you pass a string
      then it will be looked up on the passed target.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @param {Number} wait Number of milliseconds to wait.
    @param {Boolean} immediate Trigger the function on the leading instead
      of the trailing edge of the wait interval. Defaults to false.
    @return {Array} Timer information for use in canceling, see `cancel`.
    @public
  */
  function debounce() {
    return backburner.debounce.apply(backburner, arguments);
  }

  /**
    Ensure that the target method is never called more frequently than
    the specified spacing period. The target method is called immediately.
     ```javascript
    import { throttle } from '@ember/runloop';
     function whoRan() {
      console.log(this.name + ' ran.');
    }
     let myContext = { name: 'throttle' };
     throttle(myContext, whoRan, 150);
    // whoRan is invoked with context myContext
    // console logs 'throttle ran.'
     // 50ms passes
    throttle(myContext, whoRan, 150);
     // 50ms passes
    throttle(myContext, whoRan, 150);
     // 150ms passes
    throttle(myContext, whoRan, 150);
    // whoRan is invoked with context myContext
    // console logs 'throttle ran.'
    ```
     @method throttle
    @static
    @for @ember/runloop
    @param {Object} [target] target of method to invoke
    @param {Function|String} method The method to invoke.
      May be a function or a string. If you pass a string
      then it will be looked up on the passed target.
    @param {Object} [args*] Optional arguments to pass to the timeout.
    @param {Number} spacing Number of milliseconds to space out requests.
    @param {Boolean} immediate Trigger the function on the leading instead
      of the trailing edge of the wait interval. Defaults to true.
    @return {Array} Timer information for use in canceling, see `cancel`.
    @public
  */
  function throttle() {
    return backburner.throttle.apply(backburner, arguments);
  }

  var hasViews = function () {
    return false;
  };

  function setHasViews(fn) {
    hasViews = fn;
  }

  function makeTag() {
    return reference.DirtyableTag.create();
  }

  function tagForProperty(object, propertyKey, _meta) {
    if (typeof object !== 'object' || object === null) {
      return reference.CONSTANT_TAG;
    }
    var meta$$1 = _meta === undefined ? meta(object) : _meta;

    if (emberUtils.isProxy(object)) {
      return tagFor(object, meta$$1);
    }

    var tags = meta$$1.writableTags();
    var tag = tags[propertyKey];
    if (tag) {
      return tag;
    }

    if (features.EMBER_METAL_TRACKED_PROPERTIES) {
      var pair = reference.combine([makeTag(), reference.UpdatableTag.create(reference.CONSTANT_TAG)]);
      return tags[propertyKey] = pair;
    } else {
      return tags[propertyKey] = makeTag();
    }
  }

  function tagFor(object, _meta) {
    if (typeof object === 'object' && object !== null) {
      var meta$$1 = _meta === undefined ? meta(object) : _meta;
      return meta$$1.writableTag(makeTag);
    } else {
      return reference.CONSTANT_TAG;
    }
  }

  var dirty = void 0;
  var update = void 0;

  if (features.EMBER_METAL_TRACKED_PROPERTIES) {
    dirty = function (tag) {
      tag.inner.first.inner.dirty();
    };

    update = function (outer, inner) {
      outer.inner.second.inner.update(inner);
    };
  } else {
    dirty = function (tag) {
      tag.inner.dirty();
    };
  }

  function markObjectAsDirty(obj, propertyKey, meta$$1) {
    var objectTag = meta$$1.readableTag();

    if (objectTag !== undefined) {
      if (emberUtils.isProxy(obj)) {
        objectTag.inner.first.inner.dirty();
      } else {
        objectTag.inner.dirty();
      }
    }

    var tags = meta$$1.readableTags();
    var propertyTag = tags !== undefined ? tags[propertyKey] : undefined;

    if (propertyTag !== undefined) {
      dirty(propertyTag);
    }

    if (objectTag !== undefined || propertyTag !== undefined) {
      ensureRunloop();
    }
  }

  function ensureRunloop() {
    if (hasViews()) {
      backburner.ensureInstance();
    }
  }

  /**
    ObserverSet is a data structure used to keep track of observers
    that have been deferred.
     It ensures that observers are called in the same order that they
    were initially triggered.
     It also ensures that observers for any object-key pairs are called
    only once, even if they were triggered multiple times while
    deferred. In this case, the order that the observer is called in
    will depend on the first time the observer was triggered.
     @private
    @class ObserverSet
  */

  var ObserverSet = function () {
    function ObserverSet() {
      emberBabel.classCallCheck(this, ObserverSet);

      this.added = new Map();
      this.queue = [];
    }

    ObserverSet.prototype.add = function add(object, key, event) {
      var keys = this.added.get(object);
      if (keys === undefined) {
        keys = new Set();
        this.added.set(object, keys);
      }

      if (!keys.has(key)) {
        this.queue.push(object, key, event);
        keys.add(key);
      }
    };

    ObserverSet.prototype.flush = function flush() {
      // The queue is saved off to support nested flushes.
      var queue = this.queue;
      this.added.clear();
      this.queue = [];

      for (var i = 0; i < queue.length; i += 3) {
        var object = queue[i];
        var key = queue[i + 1];
        var event = queue[i + 2];

        if (object.isDestroying || object.isDestroyed) {
          continue;
        }

        sendEvent(object, event, [object, key]);
      }
    };

    return ObserverSet;
  }();

  exports.runInTransaction = void 0;
  exports.didRender = void 0;
  exports.assertNotRendered = void 0;

  // detect-backtracking-rerender by default is debug build only
  if (features.EMBER_GLIMMER_DETECT_BACKTRACKING_RERENDER) {
    // there are 2 states

    // DEBUG
    // tracks lastRef and lastRenderedIn per rendered object and key during a transaction
    // release everything via normal weakmap semantics by just derefencing the weakmap

    // RELEASE
    // tracks transactionId per rendered object and key during a transaction
    // release everything via normal weakmap semantics by just derefencing the weakmap

    var TransactionRunner = function () {
      function TransactionRunner() {
        emberBabel.classCallCheck(this, TransactionRunner);

        this.transactionId = 0;
        this.inTransaction = false;
        this.shouldReflush = false;
        this.weakMap = new WeakMap();
        {
          // track templates
          this.debugStack = undefined;
        }
      }

      TransactionRunner.prototype.runInTransaction = function runInTransaction(context, methodName) {
        this.before(context);
        try {
          context[methodName]();
        } finally {
          this.after();
        }
        return this.shouldReflush;
      };

      TransactionRunner.prototype.didRender = function didRender(object, key, reference$$1) {
        if (!this.inTransaction) {
          return;
        }
        {
          this.setKey(object, key, {
            lastRef: reference$$1,
            lastRenderedIn: this.debugStack.peek()
          });
        }
      };

      TransactionRunner.prototype.assertNotRendered = function assertNotRendered(object, key) {
        if (!this.inTransaction) {
          return;
        }
        if (this.hasRendered(object, key)) {
          {
            var _getKey = this.getKey(object, key),
                lastRef = _getKey.lastRef,
                lastRenderedIn = _getKey.lastRenderedIn;

            var currentlyIn = this.debugStack.peek();

            var parts = [];
            var label = void 0;

            if (lastRef !== undefined) {
              while (lastRef && lastRef._propertyKey) {
                parts.unshift(lastRef._propertyKey);
                lastRef = lastRef._parentReference;
              }

              label = parts.join('.');
            } else {
              label = 'the same value';
            }

            true && !false && emberDebug.assert('You modified "' + label + '" twice on ' + object + ' in a single render. It was rendered in ' + lastRenderedIn + ' and modified in ' + currentlyIn + '. This was unreliable and slow in Ember 1.x and is no longer supported. See https://github.com/emberjs/ember.js/issues/13948 for more details.', false);
          }

          this.shouldReflush = true;
        }
      };

      TransactionRunner.prototype.hasRendered = function hasRendered(object, key) {
        if (!this.inTransaction) {
          return false;
        }
        {
          return this.getKey(object, key) !== undefined;
        }
        return this.getKey(object, key) === this.transactionId;
      };

      TransactionRunner.prototype.before = function before(context) {
        this.inTransaction = true;
        this.shouldReflush = false;
        {
          this.debugStack = context.env.debugStack;
        }
      };

      TransactionRunner.prototype.after = function after() {
        this.transactionId++;
        this.inTransaction = false;
        {
          this.debugStack = undefined;
        }
        this.clearObjectMap();
      };

      TransactionRunner.prototype.createMap = function createMap(object) {
        var map = Object.create(null);
        this.weakMap.set(object, map);
        return map;
      };

      TransactionRunner.prototype.getOrCreateMap = function getOrCreateMap(object) {
        var map = this.weakMap.get(object);
        if (map === undefined) {
          map = this.createMap(object);
        }
        return map;
      };

      TransactionRunner.prototype.setKey = function setKey(object, key, value) {
        var map = this.getOrCreateMap(object);
        map[key] = value;
      };

      TransactionRunner.prototype.getKey = function getKey(object, key) {
        var map = this.weakMap.get(object);
        if (map !== undefined) {
          return map[key];
        }
      };

      TransactionRunner.prototype.clearObjectMap = function clearObjectMap() {
        this.weakMap = new WeakMap();
      };

      return TransactionRunner;
    }();

    var runner = new TransactionRunner();

    exports.runInTransaction = runner.runInTransaction.bind(runner);
    exports.didRender = runner.didRender.bind(runner);
    exports.assertNotRendered = runner.assertNotRendered.bind(runner);
  } else {
    // in production do nothing to detect reflushes
    exports.runInTransaction = function (context, methodName) {
      context[methodName]();
      return false;
    };
  }

  function watchPath(obj, keyPath, meta$$1) {
    var m = meta$$1 === undefined ? meta(obj) : meta$$1;
    var counter = m.peekWatching(keyPath) || 0;

    m.writeWatching(keyPath, counter + 1);
    if (counter === 0) {
      // activate watching first time
      m.writableChains(makeChainNode).add(keyPath);
    }
  }

  function unwatchPath(obj, keyPath, meta$$1) {
    var m = meta$$1 === undefined ? peekMeta(obj) : meta$$1;
    if (m === undefined) {
      return;
    }
    var counter = m.peekWatching(keyPath);

    if (counter > 0) {
      m.writeWatching(keyPath, counter - 1);
      if (counter === 1) {
        m.writableChains(makeChainNode).remove(keyPath);
      }
    }
  }

  /**
  @module ember
  */

  /**
    Starts watching a property on an object. Whenever the property changes,
    invokes `Ember.notifyPropertyChange`. This is the primitive used by observers
    and dependent keys; usually you will never call this method directly but instead
    use higher level methods like `addObserver()`.
     @private
    @method watch
    @for Ember
    @param obj
    @param {String} keyPath
    @param {Object} meta
  */
  function watch(obj, keyPath, meta$$1) {
    if (isPath(keyPath)) {
      watchPath(obj, keyPath, meta$$1);
    } else {
      watchKey(obj, keyPath, meta$$1);
    }
  }

  function isWatching(obj, key) {
    return watcherCount(obj, key) > 0;
  }

  function watcherCount(obj, key) {
    var meta$$1 = peekMeta(obj);
    return meta$$1 !== undefined && meta$$1.peekWatching(key) || 0;
  }

  /**
    Stops watching a property on an object. Usually you will never call this method directly but instead
    use higher level methods like `removeObserver()`.
     @private
    @method unwatch
    @for Ember
    @param obj
    @param {String} keyPath
    @param {Object} meta
  */

  function unwatch(obj, keyPath, meta$$1) {
    if (isPath(keyPath)) {
      unwatchPath(obj, keyPath, meta$$1);
    } else {
      unwatchKey(obj, keyPath, meta$$1);
    }
  }

  /**
  @module @ember/object
  */

  var AFTER_OBSERVERS = ':change';

  function changeEvent(keyName) {
    return keyName + AFTER_OBSERVERS;
  }

  /**
    @method addObserver
    @static
    @for @ember/object/observers
    @param obj
    @param {String} path
    @param {Object|Function} target
    @param {Function|String} [method]
    @public
  */
  function addObserver(obj, path, target, method) {
    addListener(obj, changeEvent(path), target, method);
    watch(obj, path);
  }

  /**
    @method removeObserver
    @static
    @for @ember/object/observers
    @param obj
    @param {String} path
    @param {Object|Function} target
    @param {Function|String} [method]
    @public
  */
  function removeObserver(obj, path, target, method) {
    unwatch(obj, path);
    removeListener(obj, changeEvent(path), target, method);
  }

  /**
   @module ember
   @private
   */

  var PROPERTY_DID_CHANGE = emberUtils.symbol('PROPERTY_DID_CHANGE');

  var observerSet = new ObserverSet();
  var deferred = 0;

  // ..........................................................
  // PROPERTY CHANGES
  //

  /**
    @method propertyWillChange
    @for Ember
    @private
  */
  function propertyWillChange() {
    true && !false && emberDebug.deprecate('\'propertyWillChange\' is deprecated and has no effect. It is safe to remove this call.', false, {
      id: 'ember-metal.deprecate-propertyWillChange',
      until: '3.5.0',
      url: 'https://emberjs.com/deprecations/v3.x/#toc_use-notifypropertychange-instead-of-propertywillchange-and-propertydidchange'
    });
  }

  /**
    @method propertyDidChange
    @for Ember
    @private
  */
  function propertyDidChange(obj, keyName, _meta) {
    true && !false && emberDebug.deprecate('\'propertyDidChange\' is deprecated in favor of \'notifyPropertyChange\'. It is safe to change this call to \'notifyPropertyChange\'.', false, {
      id: 'ember-metal.deprecate-propertyDidChange',
      until: '3.5.0',
      url: 'https://emberjs.com/deprecations/v3.x/#toc_use-notifypropertychange-instead-of-propertywillchange-and-propertydidchange'
    });

    notifyPropertyChange(obj, keyName, _meta);
  }

  /**
    This function is called just after an object property has changed.
    It will notify any observers and clear caches among other things.
     Normally you will not need to call this method directly but if for some
    reason you can't directly watch a property you can invoke this method
    manually.
     @method notifyPropertyChange
    @for Ember
    @param {Object} obj The object with the property that will change
    @param {String} keyName The property key (or path) that will change.
    @param {Meta} meta The objects meta.
    @return {void}
    @private
  */
  function notifyPropertyChange(obj, keyName, _meta) {
    var meta$$1 = _meta === undefined ? peekMeta(obj) : _meta;
    var hasMeta = meta$$1 !== undefined;

    if (hasMeta && !meta$$1.isInitialized(obj)) {
      return;
    }

    var possibleDesc = descriptorFor(obj, keyName, meta$$1);

    // shouldn't this mean that we're watching this key?
    if (possibleDesc !== undefined && possibleDesc.didChange) {
      possibleDesc.didChange(obj, keyName);
    }

    if (hasMeta && meta$$1.peekWatching(keyName) > 0) {
      dependentKeysDidChange(obj, keyName, meta$$1);
      chainsDidChange(obj, keyName, meta$$1);
      notifyObservers(obj, keyName, meta$$1);
    }

    if (PROPERTY_DID_CHANGE in obj) {
      obj[PROPERTY_DID_CHANGE](keyName);
    }

    if (hasMeta) {
      if (meta$$1.isSourceDestroying()) {
        return;
      }
      markObjectAsDirty(obj, keyName, meta$$1);
    }

    if (features.EMBER_GLIMMER_DETECT_BACKTRACKING_RERENDER) {
      exports.assertNotRendered(obj, keyName, meta$$1);
    }
  }

  var SEEN_MAP = new Map();
  var IS_TOP_SEEN_MAP = true;

  // called whenever a property has just changed to update dependent keys
  function dependentKeysDidChange(obj, depKey, meta$$1) {
    if (meta$$1.isSourceDestroying() || !meta$$1.hasDeps(depKey)) {
      return;
    }
    var seen = SEEN_MAP;
    var isTop = IS_TOP_SEEN_MAP;

    if (isTop) {
      IS_TOP_SEEN_MAP = false;
    }

    iterDeps(notifyPropertyChange, obj, depKey, seen, meta$$1);

    if (isTop) {
      SEEN_MAP.clear();
      IS_TOP_SEEN_MAP = true;
    }
  }

  function iterDeps(method, obj, depKey, seen, meta$$1) {
    var current = seen.get(obj);

    if (current === undefined) {
      current = new Set();
      seen.set(obj, current);
    }

    if (current.has(depKey)) {
      return;
    }

    var possibleDesc = void 0;
    meta$$1.forEachInDeps(depKey, function (key, value) {
      if (!value) {
        return;
      }

      possibleDesc = descriptorFor(obj, key, meta$$1);

      if (possibleDesc !== undefined && possibleDesc._suspended === obj) {
        return;
      }

      method(obj, key, meta$$1);
    });
  }

  function chainsDidChange(obj, keyName, meta$$1) {
    var chainWatchers = meta$$1.readableChainWatchers();
    if (chainWatchers !== undefined) {
      chainWatchers.notify(keyName, true, notifyPropertyChange);
    }
  }

  function overrideChains(obj, keyName, meta$$1) {
    var chainWatchers = meta$$1.readableChainWatchers();
    if (chainWatchers !== undefined) {
      chainWatchers.revalidate(keyName);
    }
  }

  /**
    @method beginPropertyChanges
    @chainable
    @private
  */
  function beginPropertyChanges() {
    deferred++;
  }

  /**
    @method endPropertyChanges
    @private
  */
  function endPropertyChanges() {
    deferred--;
    if (deferred <= 0) {
      observerSet.flush();
    }
  }

  /**
    Make a series of property changes together in an
    exception-safe way.
     ```javascript
    Ember.changeProperties(function() {
      obj1.set('foo', mayBlowUpWhenSet);
      obj2.set('bar', baz);
    });
    ```
     @method changeProperties
    @param {Function} callback
    @private
  */
  function changeProperties(callback) {
    beginPropertyChanges();
    try {
      callback();
    } finally {
      endPropertyChanges();
    }
  }

  function notifyObservers(obj, keyName, meta$$1) {
    if (meta$$1.isSourceDestroying()) {
      return;
    }

    var eventName = changeEvent(keyName);
    if (deferred > 0) {
      observerSet.add(obj, keyName, eventName);
    } else {
      sendEvent(obj, eventName, [obj, keyName]);
    }
  }

  // ..........................................................
  // DESCRIPTOR
  //

  /**
    Objects of this type can implement an interface to respond to requests to
    get and set. The default implementation handles simple properties.
     @class Descriptor
    @private
  */
  var Descriptor = function Descriptor() {
    emberBabel.classCallCheck(this, Descriptor);

    this.isDescriptor = true;
    this.enumerable = true;
  };

  // ..........................................................
  // DEFINING PROPERTIES API
  //

  function MANDATORY_SETTER_FUNCTION(name) {
    function SETTER_FUNCTION(value) {
      var m = peekMeta(this);
      if (!m.isInitialized(this)) {
        m.writeValues(name, value);
      } else {
        true && !false && emberDebug.assert('You must use set() to set the `' + name + '` property (of ' + this + ') to `' + value + '`.', false);
      }
    }

    SETTER_FUNCTION.isMandatorySetter = true;
    return SETTER_FUNCTION;
  }

  function DEFAULT_GETTER_FUNCTION(name) {
    return function GETTER_FUNCTION() {
      var meta$$1 = peekMeta(this);
      if (meta$$1 !== undefined) {
        return meta$$1.peekValues(name);
      }
    };
  }

  function INHERITING_GETTER_FUNCTION(name) {
    function IGETTER_FUNCTION() {
      var meta$$1 = peekMeta(this);
      var val = void 0;
      if (meta$$1 !== undefined) {
        val = meta$$1.readInheritedValue('values', name);
      }

      if (val === UNDEFINED) {
        var proto = Object.getPrototypeOf(this);
        return proto && proto[name];
      } else {
        return val;
      }
    }

    IGETTER_FUNCTION.isInheritingGetter = true;
    return IGETTER_FUNCTION;
  }

  var DESCRIPTOR_GETTER_FUNCTION = void 0;

  if (features.EMBER_METAL_ES5_GETTERS) {
    DESCRIPTOR_GETTER_FUNCTION = function (name, descriptor) {
      return function CPGETTER_FUNCTION() {
        return descriptor.get(this, name);
      };
    };
  } else if (features.DESCRIPTOR_TRAP) {
    // Future traveler, although this code looks scary. It merely exists in
    // development to aid in development asertions. Production builds of
    // ember strip this entire branch out.
    var messageFor = function (obj, keyName, property, value) {
      return 'You attempted to access `' + keyName + '.' + String(property) + '` ' + ('(on `' + obj + '`), but `' + keyName + '` is a computed property.\n\n') + 'Due to certain internal implementation details of Ember, the ' + ('`' + keyName + '` property previously contained a private "descriptor" ') + ('object, therefore `' + keyName + '.' + String(property) + '` would have been ') + ('`' + String(value).replace(/\n/g, ' ') + '`.\n\n') + 'This implementation detail has now changed and the "descriptor" ' + 'object is no longer present at this location. Soon, accessing ' + ('`' + keyName + '` on this object will return the computed property\'s ') + 'current value (see RFC #281 for more details).\n\n' + 'If you are seeing this error, you are likely using an addon that ' + 'relies on this now-defunct private implementation detail. If you ' + 'can, identify the addon from the stack trace below and report this ' + 'bug to the addon authors. If you feel stuck, the Ember Community ' + 'Slack (https://ember-community-slackin.herokuapp.com/) may be able ' + 'to offer some help.\n\n' + 'If you are an addon author and need help transitioning your code, ' + 'please get in touch in the #dev-ember channel in the Ember Community ' + 'Slack.';
    };

    var trapFor = void 0;

    if (emberUtils.HAS_NATIVE_PROXY) {
      /* globals Proxy */
      trapFor = function (obj, keyName, descriptor) {
        return new Proxy(descriptor, {
          get: function (descriptor, property) {
            if (property === DESCRIPTOR) {
              return descriptor;
            } else if (property === 'prototype' || property === 'constructor' || property === 'nodeType' || property === 'window') {
              return undefined;
            } else if (property === 'toString' || property === 'valueOf' || property === 'inspect' || property === 'toJSON' || emberUtils.HAS_NATIVE_SYMBOL && property === Symbol.toPrimitive || emberUtils.HAS_NATIVE_SYMBOL && property === Symbol.toStringTag) {
              return function () {
                return '[COMPUTED PROPERTY]';
              };
            }

            true && !false && emberDebug.assert(messageFor(obj, keyName, property, descriptor[property]));
          }
        });
      };
    } else {
      trapFor = function (obj, keyName, descriptor) {
        var trap = Object.create(null);

        Object.defineProperty(trap, DESCRIPTOR, {
          configurable: false,
          enumerable: false,
          writable: false,
          value: descriptor
        });

        trap.toString = trap.toJSON = trap.valueOf = function () {
          return '[COMPUTED PROPERTY]';
        };

        // Without a proxy, we can only trap the "likely" properties
        ['isDescriptor', 'setup', 'teardown', 'get', '_getter', 'set', '_setter', 'meta'].forEach(function (property) {
          Object.defineProperty(trap, property, {
            configurable: false,
            enumerable: false,
            get: function () {
              true && !false && emberDebug.assert(messageFor(obj, keyName, property, descriptor[property]));
            }
          });
        });

        return trap;
      };
    }

    DESCRIPTOR_GETTER_FUNCTION = function (name, descriptor) {
      var trap = void 0;
      return function CPGETTER_FUNCTION() {
        if (trap) {
          return trap;
        }

        trap = trapFor(this, name, descriptor);
        return trap;
      };
    };
  }

  /**
    NOTE: This is a low-level method used by other parts of the API. You almost
    never want to call this method directly. Instead you should use
    `mixin()` to define new properties.
     Defines a property on an object. This method works much like the ES5
    `Object.defineProperty()` method except that it can also accept computed
    properties and other special descriptors.
     Normally this method takes only three parameters. However if you pass an
    instance of `Descriptor` as the third param then you can pass an
    optional value as the fourth parameter. This is often more efficient than
    creating new descriptor hashes for each property.
     ## Examples
     ```javascript
    import { defineProperty, computed } from '@ember/object';
     // ES5 compatible mode
    defineProperty(contact, 'firstName', {
      writable: true,
      configurable: false,
      enumerable: true,
      value: 'Charles'
    });
     // define a simple property
    defineProperty(contact, 'lastName', undefined, 'Jolley');
     // define a computed property
    defineProperty(contact, 'fullName', computed('firstName', 'lastName', function() {
      return this.firstName+' '+this.lastName;
    }));
    ```
     @private
    @method defineProperty
    @for @ember/object
    @param {Object} obj the object to define this property on. This may be a prototype.
    @param {String} keyName the name of the property
    @param {Descriptor} [desc] an instance of `Descriptor` (typically a
      computed property) or an ES5 descriptor.
      You must provide this or `data` but not both.
    @param {*} [data] something other than a descriptor, that will
      become the explicit value of this property.
  */
  function defineProperty(obj, keyName, desc, data, meta$$1) {
    if (meta$$1 === undefined) {
      meta$$1 = meta(obj);
    }

    var watchEntry = meta$$1.peekWatching(keyName);
    var watching = watchEntry !== undefined && watchEntry > 0;
    var previousDesc = descriptorFor(obj, keyName, meta$$1);
    var wasDescriptor = previousDesc !== undefined;

    if (wasDescriptor) {
      previousDesc.teardown(obj, keyName, meta$$1);

      if (features.EMBER_METAL_ES5_GETTERS) {
        meta$$1.removeDescriptors(keyName);
      }
    }

    // used to track if the the property being defined be enumerable
    var enumerable = true;

    // Ember.NativeArray is a normal Ember.Mixin that we mix into `Array.prototype` when prototype extensions are enabled
    // mutating a native object prototype like this should _not_ result in enumerable properties being added (or we have significant
    // issues with things like deep equality checks from test frameworks, or things like jQuery.extend(true, [], [])).
    //
    // this is a hack, and we should stop mutating the array prototype by default 😫
    if (obj === Array.prototype) {
      enumerable = false;
    }

    var value = void 0;
    if (desc instanceof Descriptor) {
      value = desc;

      if (features.EMBER_METAL_ES5_GETTERS || features.DESCRIPTOR_TRAP) {
        Object.defineProperty(obj, keyName, {
          configurable: true,
          enumerable: enumerable,
          get: DESCRIPTOR_GETTER_FUNCTION(keyName, value)
        });
      } else if (features.MANDATORY_SETTER && watching) {
        Object.defineProperty(obj, keyName, {
          configurable: true,
          enumerable: enumerable,
          writable: true,
          value: value
        });
      } else if (enumerable === false) {
        Object.defineProperty(obj, keyName, {
          configurable: true,
          writable: true,
          enumerable: enumerable,
          value: value
        });
      } else {
        obj[keyName] = value;
      }

      if (features.EMBER_METAL_ES5_GETTERS) {
        meta$$1.writeDescriptors(keyName, value);
      }

      if (typeof desc.setup === 'function') {
        desc.setup(obj, keyName);
      }
    } else if (desc === undefined || desc === null) {
      value = data;

      if (features.MANDATORY_SETTER && watching) {
        meta$$1.writeValues(keyName, data);

        var defaultDescriptor = {
          configurable: true,
          enumerable: enumerable,
          set: MANDATORY_SETTER_FUNCTION(keyName),
          get: DEFAULT_GETTER_FUNCTION(keyName)
        };

        Object.defineProperty(obj, keyName, defaultDescriptor);
      } else if ((features.EMBER_METAL_ES5_GETTERS || features.DESCRIPTOR_TRAP) && wasDescriptor) {
        Object.defineProperty(obj, keyName, {
          configurable: true,
          enumerable: enumerable,
          writable: true,
          value: value
        });
      } else if (enumerable === false) {
        Object.defineProperty(obj, keyName, {
          configurable: true,
          enumerable: enumerable,
          writable: true,
          value: value
        });
      } else {
        obj[keyName] = data;
      }
    } else {
      value = desc;

      // fallback to ES5
      Object.defineProperty(obj, keyName, desc);
    }

    // if key is being watched, override chains that
    // were initialized with the prototype
    if (watching) {
      overrideChains(obj, keyName, meta$$1);
    }

    // The `value` passed to the `didDefineProperty` hook is
    // either the descriptor or data, whichever was passed.
    if (typeof obj.didDefineProperty === 'function') {
      obj.didDefineProperty(obj, keyName, value);
    }

    return this;
  }

  var handleMandatorySetter = void 0;

  function watchKey(obj, keyName, _meta) {
    var meta$$1 = _meta === undefined ? meta(obj) : _meta;
    var count = meta$$1.peekWatching(keyName) || 0;
    meta$$1.writeWatching(keyName, count + 1);

    if (count === 0) {
      // activate watching first time
      var possibleDesc = descriptorFor(obj, keyName, meta$$1);

      if (possibleDesc !== undefined && possibleDesc.willWatch) {
        possibleDesc.willWatch(obj, keyName, meta$$1);
      }

      if (typeof obj.willWatchProperty === 'function') {
        obj.willWatchProperty(keyName);
      }

      if (features.MANDATORY_SETTER) {
        // NOTE: this is dropped for prod + minified builds
        handleMandatorySetter(meta$$1, obj, keyName);
      }
    }
  }

  if (features.MANDATORY_SETTER) {
    var _hasOwnProperty = function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
    var _propertyIsEnumerable = function (obj, key) {
      return Object.prototype.propertyIsEnumerable.call(obj, key);
    };

    // Future traveler, although this code looks scary. It merely exists in
    // development to aid in development asertions. Production builds of
    // ember strip this entire block out
    handleMandatorySetter = function handleMandatorySetter(m, obj, keyName) {
      var descriptor = emberUtils.lookupDescriptor(obj, keyName);
      var hasDescriptor = descriptor !== null;
      var possibleDesc = hasDescriptor && descriptor.value;
      if (isDescriptor(possibleDesc)) {
        return;
      }
      var configurable = hasDescriptor ? descriptor.configurable : true;
      var isWritable = hasDescriptor ? descriptor.writable : true;
      var hasValue = hasDescriptor ? 'value' in descriptor : true;

      // this x in Y deopts, so keeping it in this function is better;
      if (configurable && isWritable && hasValue && keyName in obj) {
        var desc = {
          configurable: true,
          set: MANDATORY_SETTER_FUNCTION(keyName),
          enumerable: _propertyIsEnumerable(obj, keyName),
          get: undefined
        };

        if (_hasOwnProperty(obj, keyName)) {
          m.writeValues(keyName, obj[keyName]);
          desc.get = DEFAULT_GETTER_FUNCTION(keyName);
        } else {
          desc.get = INHERITING_GETTER_FUNCTION(keyName);
        }

        Object.defineProperty(obj, keyName, desc);
      }
    };
  }

  function unwatchKey(obj, keyName, _meta) {
    var meta$$1 = _meta === undefined ? peekMeta(obj) : _meta;

    // do nothing of this object has already been destroyed
    if (meta$$1 === undefined || meta$$1.isSourceDestroyed()) {
      return;
    }

    var count = meta$$1.peekWatching(keyName);
    if (count === 1) {
      meta$$1.writeWatching(keyName, 0);

      var possibleDesc = descriptorFor(obj, keyName, meta$$1);
      var _isDescriptor = possibleDesc !== undefined;

      if (_isDescriptor && possibleDesc.didUnwatch) {
        possibleDesc.didUnwatch(obj, keyName, meta$$1);
      }

      if (typeof obj.didUnwatchProperty === 'function') {
        obj.didUnwatchProperty(keyName);
      }

      if (features.MANDATORY_SETTER) {
        // It is true, the following code looks quite WAT. But have no fear, It
        // exists purely to improve development ergonomics and is removed from
        // ember.min.js and ember.prod.js builds.
        //
        // Some further context: Once a property is watched by ember, bypassing `set`
        // for mutation, will bypass observation. This code exists to assert when
        // that occurs, and attempt to provide more helpful feedback. The alternative
        // is tricky to debug partially observable properties.
        if (!_isDescriptor && keyName in obj) {
          var maybeMandatoryDescriptor = emberUtils.lookupDescriptor(obj, keyName);

          if (maybeMandatoryDescriptor.set && maybeMandatoryDescriptor.set.isMandatorySetter) {
            if (maybeMandatoryDescriptor.get && maybeMandatoryDescriptor.get.isInheritingGetter) {
              var possibleValue = meta$$1.readInheritedValue('values', keyName);
              if (possibleValue === UNDEFINED) {
                delete obj[keyName];
                return;
              }
            }

            Object.defineProperty(obj, keyName, {
              configurable: true,
              enumerable: Object.prototype.propertyIsEnumerable.call(obj, keyName),
              writable: true,
              value: meta$$1.peekValues(keyName)
            });
            meta$$1.deleteFromValues(keyName);
          }
        }
      }
    } else if (count > 1) {
      meta$$1.writeWatching(keyName, count - 1);
    }
  }

  var EMPTY_ARRAY = Object.freeze([]);

  function objectAt(array, index) {
    if (Array.isArray(array)) {
      return array[index];
    } else {
      return array.objectAt(index);
    }
  }

  function replace(array, start, deleteCount) {
    var items = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : EMPTY_ARRAY;

    if (Array.isArray(array)) {
      replaceInNativeArray(array, start, deleteCount, items);
    } else {
      array.replace(start, deleteCount, items);
    }
  }

  var CHUNK_SIZE = 60000;

  // To avoid overflowing the stack, we splice up to CHUNK_SIZE items at a time.
  // See https://code.google.com/p/chromium/issues/detail?id=56588 for more details.
  function replaceInNativeArray(array, start, deleteCount, items) {
    arrayContentWillChange(array, start, deleteCount, items.length);

    if (items.length <= CHUNK_SIZE) {
      array.splice.apply(array, [start, deleteCount].concat(items));
    } else {
      array.splice(start, deleteCount);

      for (var i = 0; i < items.length; i += CHUNK_SIZE) {
        var chunk = items.slice(i, i + CHUNK_SIZE);
        array.splice.apply(array, [start + i, 0].concat(chunk));
      }
    }

    arrayContentDidChange(array, start, deleteCount, items.length);
  }

  function arrayObserversHelper(obj, target, opts, operation, notify) {
    var willChange = opts && opts.willChange || 'arrayWillChange';
    var didChange = opts && opts.didChange || 'arrayDidChange';
    var hasObservers = get(obj, 'hasArrayObservers');

    operation(obj, '@array:before', target, willChange);
    operation(obj, '@array:change', target, didChange);

    if (hasObservers === notify) {
      notifyPropertyChange(obj, 'hasArrayObservers');
    }

    return obj;
  }

  function addArrayObserver(array, target, opts) {
    return arrayObserversHelper(array, target, opts, addListener, false);
  }

  function removeArrayObserver(array, target, opts) {
    return arrayObserversHelper(array, target, opts, removeListener, true);
  }

  function arrayContentWillChange(array, startIdx, removeAmt, addAmt) {
    // if no args are passed assume everything changes
    if (startIdx === undefined) {
      startIdx = 0;
      removeAmt = addAmt = -1;
    } else {
      if (removeAmt === undefined) {
        removeAmt = -1;
      }

      if (addAmt === undefined) {
        addAmt = -1;
      }
    }

    eachProxyArrayWillChange(array, startIdx, removeAmt, addAmt);

    sendEvent(array, '@array:before', [array, startIdx, removeAmt, addAmt]);

    return array;
  }

  function arrayContentDidChange(array, startIdx, removeAmt, addAmt) {
    // if no args are passed assume everything changes
    if (startIdx === undefined) {
      startIdx = 0;
      removeAmt = addAmt = -1;
    } else {
      if (removeAmt === undefined) {
        removeAmt = -1;
      }

      if (addAmt === undefined) {
        addAmt = -1;
      }
    }

    var meta$$1 = peekMeta(array);

    if (addAmt < 0 || removeAmt < 0 || addAmt - removeAmt !== 0) {
      notifyPropertyChange(array, 'length', meta$$1);
    }

    notifyPropertyChange(array, '[]', meta$$1);

    eachProxyArrayDidChange(array, startIdx, removeAmt, addAmt);

    sendEvent(array, '@array:change', [array, startIdx, removeAmt, addAmt]);

    var cache = peekCacheFor(array);
    if (cache !== undefined) {
      var length = get(array, 'length');
      var addedAmount = addAmt === -1 ? 0 : addAmt;
      var removedAmount = removeAmt === -1 ? 0 : removeAmt;
      var delta = addedAmount - removedAmount;
      var previousLength = length - delta;

      var normalStartIdx = startIdx < 0 ? previousLength + startIdx : startIdx;
      if (cache.has('firstObject') && normalStartIdx === 0) {
        notifyPropertyChange(array, 'firstObject', meta$$1);
      }

      if (cache.has('lastObject')) {
        var previousLastIndex = previousLength - 1;
        var lastAffectedIndex = normalStartIdx + removedAmount;
        if (previousLastIndex < lastAffectedIndex) {
          notifyPropertyChange(array, 'lastObject', meta$$1);
        }
      }
    }

    return array;
  }

  var EACH_PROXIES = new WeakMap();

  function eachProxyFor(array) {
    var eachProxy = EACH_PROXIES.get(array);
    if (eachProxy === undefined) {
      eachProxy = new EachProxy(array);
      EACH_PROXIES.set(array, eachProxy);
    }
    return eachProxy;
  }

  function eachProxyArrayWillChange(array, idx, removedCnt, addedCnt) {
    var eachProxy = EACH_PROXIES.get(array);
    if (eachProxy !== undefined) {
      eachProxy.arrayWillChange(array, idx, removedCnt, addedCnt);
    }
  }

  function eachProxyArrayDidChange(array, idx, removedCnt, addedCnt) {
    var eachProxy = EACH_PROXIES.get(array);
    if (eachProxy !== undefined) {
      eachProxy.arrayDidChange(array, idx, removedCnt, addedCnt);
    }
  }

  var EachProxy = function () {
    function EachProxy(content) {
      emberBabel.classCallCheck(this, EachProxy);

      this._content = content;
      this._keys = undefined;
      meta(this);
    }

    // ..........................................................
    // ARRAY CHANGES
    // Invokes whenever the content array itself changes.

    EachProxy.prototype.arrayWillChange = function arrayWillChange(content, idx, removedCnt /*, addedCnt */) {
      // eslint-disable-line no-unused-vars
      var keys = this._keys;
      var lim = removedCnt > 0 ? idx + removedCnt : -1;
      if (lim > 0) {
        for (var key in keys) {
          removeObserverForContentKey(content, key, this, idx, lim);
        }
      }
    };

    EachProxy.prototype.arrayDidChange = function arrayDidChange(content, idx, removedCnt, addedCnt) {
      var keys = this._keys;
      var lim = addedCnt > 0 ? idx + addedCnt : -1;
      var meta$$1 = peekMeta(this);
      for (var key in keys) {
        if (lim > 0) {
          addObserverForContentKey(content, key, this, idx, lim);
        }
        notifyPropertyChange(this, key, meta$$1);
      }
    };

    // ..........................................................
    // LISTEN FOR NEW OBSERVERS AND OTHER EVENT LISTENERS
    // Start monitoring keys based on who is listening...

    EachProxy.prototype.willWatchProperty = function willWatchProperty(property) {
      this.beginObservingContentKey(property);
    };

    EachProxy.prototype.didUnwatchProperty = function didUnwatchProperty(property) {
      this.stopObservingContentKey(property);
    };

    // ..........................................................
    // CONTENT KEY OBSERVING
    // Actual watch keys on the source content.

    EachProxy.prototype.beginObservingContentKey = function beginObservingContentKey(keyName) {
      var keys = this._keys;
      if (keys === undefined) {
        keys = this._keys = Object.create(null);
      }

      if (!keys[keyName]) {
        keys[keyName] = 1;
        var content = this._content;
        var len = get(content, 'length');

        addObserverForContentKey(content, keyName, this, 0, len);
      } else {
        keys[keyName]++;
      }
    };

    EachProxy.prototype.stopObservingContentKey = function stopObservingContentKey(keyName) {
      var keys = this._keys;
      if (keys !== undefined && keys[keyName] > 0 && --keys[keyName] <= 0) {
        var content = this._content;
        var len = get(content, 'length');

        removeObserverForContentKey(content, keyName, this, 0, len);
      }
    };

    EachProxy.prototype.contentKeyDidChange = function contentKeyDidChange(obj, keyName) {
      notifyPropertyChange(this, keyName);
    };

    return EachProxy;
  }();

  function addObserverForContentKey(content, keyName, proxy, idx, loc) {
    while (--loc >= idx) {
      var item = objectAt(content, loc);
      if (item) {
        true && !(typeof item === 'object') && emberDebug.assert('When using @each to observe the array `' + toString(content) + '`, the array must return an object', typeof item === 'object');

        addObserver(item, keyName, proxy, 'contentKeyDidChange');
      }
    }
  }

  function removeObserverForContentKey(content, keyName, proxy, idx, loc) {
    while (--loc >= idx) {
      var item = objectAt(content, loc);
      if (item) {
        removeObserver(item, keyName, proxy, 'contentKeyDidChange');
      }
    }
  }

  function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
  }

  function isVolatile(obj, keyName, meta$$1) {
    var desc = descriptorFor(obj, keyName, meta$$1);
    return !(desc !== undefined && desc._volatile === false);
  }

  var ChainWatchers = function () {
    function ChainWatchers() {
      emberBabel.classCallCheck(this, ChainWatchers);

      // chain nodes that reference a key in this obj by key
      // we only create ChainWatchers when we are going to add them
      // so create this upfront
      this.chains = Object.create(null);
    }

    ChainWatchers.prototype.add = function add(key, node) {
      var nodes = this.chains[key];
      if (nodes === undefined) {
        this.chains[key] = [node];
      } else {
        nodes.push(node);
      }
    };

    ChainWatchers.prototype.remove = function remove(key, node) {
      var nodes = this.chains[key];
      if (nodes !== undefined) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i] === node) {
            nodes.splice(i, 1);
            break;
          }
        }
      }
    };

    ChainWatchers.prototype.has = function has(key, node) {
      var nodes = this.chains[key];
      if (nodes !== undefined) {
        for (var i = 0; i < nodes.length; i++) {
          if (nodes[i] === node) {
            return true;
          }
        }
      }
      return false;
    };

    ChainWatchers.prototype.revalidateAll = function revalidateAll() {
      for (var key in this.chains) {
        this.notify(key, true, undefined);
      }
    };

    ChainWatchers.prototype.revalidate = function revalidate(key) {
      this.notify(key, true, undefined);
    };

    // key: the string key that is part of a path changed
    // revalidate: boolean; the chains that are watching this value should revalidate
    // callback: function that will be called with the object and path that
    //           will be/are invalidated by this key change, depending on
    //           whether the revalidate flag is passed


    ChainWatchers.prototype.notify = function notify(key, revalidate, callback) {
      var nodes = this.chains[key];
      if (nodes === undefined || nodes.length === 0) {
        return;
      }

      var affected = void 0;

      if (callback) {
        affected = [];
      }

      for (var i = 0; i < nodes.length; i++) {
        nodes[i].notify(revalidate, affected);
      }

      if (callback === undefined) {
        return;
      }

      // we gather callbacks so we don't notify them during revalidation
      for (var _i = 0; _i < affected.length; _i += 2) {
        var obj = affected[_i];
        var path = affected[_i + 1];
        callback(obj, path);
      }
    };

    return ChainWatchers;
  }();

  function makeChainWatcher() {
    return new ChainWatchers();
  }

  function makeChainNode(obj) {
    return new ChainNode(null, null, obj);
  }

  function addChainWatcher(obj, keyName, node) {
    var m = meta(obj);
    m.writableChainWatchers(makeChainWatcher).add(keyName, node);
    watchKey(obj, keyName, m);
  }

  function removeChainWatcher(obj, keyName, node, _meta) {
    if (!isObject(obj)) {
      return;
    }

    var meta$$1 = _meta === undefined ? peekMeta(obj) : _meta;

    if (meta$$1 === undefined || meta$$1.readableChainWatchers() === undefined) {
      return;
    }

    // make meta writable
    meta$$1 = meta(obj);

    meta$$1.readableChainWatchers().remove(keyName, node);

    unwatchKey(obj, keyName, meta$$1);
  }

  // A ChainNode watches a single key on an object. If you provide a starting
  // value for the key then the node won't actually watch it. For a root node
  // pass null for parent and key and object for value.

  var ChainNode = function () {
    function ChainNode(parent, key, value) {
      emberBabel.classCallCheck(this, ChainNode);

      this._parent = parent;
      this._key = key;

      this._chains = undefined;
      this._object = undefined;
      this.count = 0;

      this._value = value;
      this._paths = undefined;

      // _watching is true when calling get(this._parent, this._key) will
      // return the value of this node.
      //
      // It is false for the root of a chain (because we have no parent)
      // and for global paths (because the parent node is the object with
      // the observer on it)
      var isWatching = this._isWatching = value === undefined;
      if (isWatching) {
        var obj = parent.value();

        if (!isObject(obj)) {
          return;
        }

        this._object = obj;

        addChainWatcher(this._object, this._key, this);
      }
    }

    ChainNode.prototype.value = function value() {
      if (this._value === undefined && this._isWatching) {
        var obj = this._parent.value();
        this._value = lazyGet(obj, this._key);
      }
      return this._value;
    };

    ChainNode.prototype.destroy = function destroy() {
      if (this._isWatching) {
        removeChainWatcher(this._object, this._key, this);
        this._isWatching = false; // so future calls do nothing
      }
    };

    // copies a top level object only


    ChainNode.prototype.copy = function copy(obj) {
      var ret = makeChainNode(obj);
      var paths = this._paths;
      if (paths !== undefined) {
        var path = void 0;
        for (path in paths) {
          if (paths[path] > 0) {
            ret.add(path);
          }
        }
      }
      return ret;
    };

    // called on the root node of a chain to setup watchers on the specified
    // path.


    ChainNode.prototype.add = function add(path) {
      var paths = this._paths || (this._paths = {});
      paths[path] = (paths[path] || 0) + 1;

      var tails = path.split('.');
      this.chain(tails.shift(), tails);
    };

    // called on the root node of a chain to teardown watcher on the specified
    // path


    ChainNode.prototype.remove = function remove(path) {
      var paths = this._paths;
      if (paths === undefined) {
        return;
      }
      if (paths[path] > 0) {
        paths[path]--;
      }

      var tails = path.split('.');
      this.unchain(tails.shift(), tails);
    };

    ChainNode.prototype.chain = function chain(key, tails) {
      var chains = this._chains;
      var node = void 0;
      if (chains === undefined) {
        chains = this._chains = Object.create(null);
      } else {
        node = chains[key];
      }

      if (node === undefined) {
        node = chains[key] = new ChainNode(this, key, undefined);
      }

      node.count++; // count chains...

      // chain rest of path if there is one
      if (tails.length > 0) {
        node.chain(tails.shift(), tails);
      }
    };

    ChainNode.prototype.unchain = function unchain(key, tails) {
      var chains = this._chains;
      var node = chains[key];

      // unchain rest of path first...
      if (tails.length > 0) {
        node.unchain(tails.shift(), tails);
      }

      // delete node if needed.
      node.count--;
      if (node.count <= 0) {
        chains[node._key] = undefined;
        node.destroy();
      }
    };

    ChainNode.prototype.notify = function notify(revalidate, affected) {
      if (revalidate && this._isWatching) {
        var parentValue = this._parent.value();

        if (parentValue !== this._object) {
          removeChainWatcher(this._object, this._key, this);

          if (isObject(parentValue)) {
            this._object = parentValue;
            addChainWatcher(parentValue, this._key, this);
          } else {
            this._object = undefined;
          }
        }
        this._value = undefined;
      }

      // then notify chains...
      var chains = this._chains;
      if (chains !== undefined) {
        var node = void 0;
        for (var key in chains) {
          node = chains[key];
          if (node !== undefined) {
            node.notify(revalidate, affected);
          }
        }
      }

      if (affected && this._parent) {
        this._parent.populateAffected(this._key, 1, affected);
      }
    };

    ChainNode.prototype.populateAffected = function populateAffected(path, depth, affected) {
      if (this._key) {
        path = this._key + '.' + path;
      }

      if (this._parent) {
        this._parent.populateAffected(path, depth + 1, affected);
      } else if (depth > 1) {
        affected.push(this.value(), path);
      }
    };

    return ChainNode;
  }();

  function lazyGet(obj, key) {
    if (!isObject(obj)) {
      return;
    }

    var meta$$1 = peekMeta(obj);

    // check if object meant only to be a prototype
    if (meta$$1 !== undefined && meta$$1.proto === obj) {
      return;
    }

    // Use `get` if the return value is an EachProxy or an uncacheable value.
    if (key === '@each') {
      return eachProxyFor(obj);
    } else if (isVolatile(obj, key, meta$$1)) {
      return get(obj, key);
      // Otherwise attempt to get the cached value of the computed property
    } else {
      return getCachedValueFor(obj, key);
    }
  }

  function finishChains(meta$$1) {
    // finish any current chains node watchers that reference obj
    var chainWatchers = meta$$1.readableChainWatchers();
    if (chainWatchers !== undefined) {
      chainWatchers.revalidateAll();
    }
    // ensure that if we have inherited any chains they have been
    // copied onto our own meta.
    if (meta$$1.readableChains() !== undefined) {
      meta$$1.writableChains(makeChainNode);
    }
  }

  var counters = void 0;
  {
    counters = {
      peekCalls: 0,
      peekParentCalls: 0,
      peekPrototypeWalks: 0,
      setCalls: 0,
      deleteCalls: 0,
      metaCalls: 0,
      metaInstantiated: 0
    };
  }

  /**
  @module ember
  */

  var UNDEFINED = emberUtils.symbol('undefined');

  // FLAGS
  var SOURCE_DESTROYING = 1 << 1;
  var SOURCE_DESTROYED = 1 << 2;
  var META_DESTROYED = 1 << 3;

  var NODE_STACK = [];

  var Meta = function () {
    function Meta(obj, parentMeta) {
      emberBabel.classCallCheck(this, Meta);

      {
        counters.metaInstantiated++;
      }

      if (features.EMBER_METAL_ES5_GETTERS) {
        this._descriptors = undefined;
      }

      this._watching = undefined;
      this._mixins = undefined;
      if (emberEnvironment.ENV._ENABLE_BINDING_SUPPORT) {
        this._bindings = undefined;
      }
      if (features.MANDATORY_SETTER) {
        this._values = undefined;
      }
      this._deps = undefined;
      this._chainWatchers = undefined;
      this._chains = undefined;
      this._tag = undefined;
      this._tags = undefined;

      // initial value for all flags right now is false
      // see FLAGS const for detailed list of flags used
      this._flags = 0;

      // used only internally
      this.source = obj;

      // when meta(obj).proto === obj, the object is intended to be only a
      // prototype and doesn't need to actually be observable itself
      this.proto = undefined;

      // The next meta in our inheritance chain. We (will) track this
      // explicitly instead of using prototypical inheritance because we
      // have detailed knowledge of how each property should really be
      // inherited, and we can optimize it much better than JS runtimes.
      this.parent = parentMeta;

      this._listeners = undefined;
      this._listenersFinalized = false;
    }

    Meta.prototype.isInitialized = function isInitialized(obj) {
      return this.proto !== obj;
    };

    Meta.prototype.destroy = function destroy() {
      if (this.isMetaDestroyed()) {
        return;
      }

      // remove chainWatchers to remove circular references that would prevent GC
      var nodes = void 0,
          key = void 0,
          nodeObject = void 0;
      var node = this.readableChains();
      if (node !== undefined) {
        NODE_STACK.push(node);
        // process tree
        while (NODE_STACK.length > 0) {
          node = NODE_STACK.pop();
          // push children
          nodes = node._chains;
          if (nodes !== undefined) {
            for (key in nodes) {
              if (nodes[key] !== undefined) {
                NODE_STACK.push(nodes[key]);
              }
            }
          }

          // remove chainWatcher in node object
          if (node._isWatching) {
            nodeObject = node._object;
            if (nodeObject !== undefined) {
              var foreignMeta = peekMeta(nodeObject);
              // avoid cleaning up chain watchers when both current and
              // foreign objects are being destroyed
              // if both are being destroyed manual cleanup is not needed
              // as they will be GC'ed and no non-destroyed references will
              // be remaining
              if (foreignMeta && !foreignMeta.isSourceDestroying()) {
                removeChainWatcher(nodeObject, node._key, node, foreignMeta);
              }
            }
          }
        }
      }

      this.setMetaDestroyed();
    };

    Meta.prototype.isSourceDestroying = function isSourceDestroying() {
      return this._hasFlag(SOURCE_DESTROYING);
    };

    Meta.prototype.setSourceDestroying = function setSourceDestroying() {
      this._flags |= SOURCE_DESTROYING;
    };

    Meta.prototype.isSourceDestroyed = function isSourceDestroyed() {
      return this._hasFlag(SOURCE_DESTROYED);
    };

    Meta.prototype.setSourceDestroyed = function setSourceDestroyed() {
      this._flags |= SOURCE_DESTROYED;
    };

    Meta.prototype.isMetaDestroyed = function isMetaDestroyed() {
      return this._hasFlag(META_DESTROYED);
    };

    Meta.prototype.setMetaDestroyed = function setMetaDestroyed() {
      this._flags |= META_DESTROYED;
    };

    Meta.prototype._hasFlag = function _hasFlag(flag) {
      return (this._flags & flag) === flag;
    };

    Meta.prototype._getOrCreateOwnMap = function _getOrCreateOwnMap(key) {
      return this[key] || (this[key] = Object.create(null));
    };

    Meta.prototype._getOrCreateOwnSet = function _getOrCreateOwnSet(key) {
      return this[key] || (this[key] = new Set());
    };

    Meta.prototype._getInherited = function _getInherited(key) {
      var pointer = this;
      while (pointer !== undefined) {
        var map = pointer[key];
        if (map !== undefined) {
          return map;
        }
        pointer = pointer.parent;
      }
    };

    Meta.prototype._findInherited = function _findInherited(key, subkey) {
      var pointer = this;
      while (pointer !== undefined) {
        var map = pointer[key];
        if (map !== undefined) {
          var value = map[subkey];
          if (value !== undefined) {
            return value;
          }
        }
        pointer = pointer.parent;
      }
    };

    Meta.prototype._hasInInheritedSet = function _hasInInheritedSet(key, value) {
      var pointer = this;
      while (pointer !== undefined) {
        var set = pointer[key];
        if (set !== undefined) {
          if (set.has(value)) {
            return true;
          }
        }
        pointer = pointer.parent;
      }
      return false;
    };

    // Implements a member that provides a lazily created map of maps,
    // with inheritance at both levels.


    Meta.prototype.writeDeps = function writeDeps(subkey, itemkey, value) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot modify dependent keys for `' + itemkey + '` on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var outerMap = this._getOrCreateOwnMap('_deps');
      var innerMap = outerMap[subkey];
      if (innerMap === undefined) {
        innerMap = outerMap[subkey] = Object.create(null);
      }
      innerMap[itemkey] = value;
    };

    Meta.prototype.peekDeps = function peekDeps(subkey, itemkey) {
      var pointer = this;
      while (pointer !== undefined) {
        var map = pointer._deps;
        if (map !== undefined) {
          var value = map[subkey];
          if (value !== undefined) {
            var itemvalue = value[itemkey];
            if (itemvalue !== undefined) {
              return itemvalue;
            }
          }
        }
        pointer = pointer.parent;
      }
    };

    Meta.prototype.hasDeps = function hasDeps(subkey) {
      var pointer = this;
      while (pointer !== undefined) {
        var deps = pointer._deps;
        if (deps !== undefined && deps[subkey] !== undefined) {
          return true;
        }
        pointer = pointer.parent;
      }
      return false;
    };

    Meta.prototype.forEachInDeps = function forEachInDeps(subkey, fn) {
      return this._forEachIn('_deps', subkey, fn);
    };

    Meta.prototype._forEachIn = function _forEachIn(key, subkey, fn) {
      var pointer = this;
      var seen = void 0;
      var calls = void 0;
      while (pointer !== undefined) {
        var map = pointer[key];
        if (map !== undefined) {
          var innerMap = map[subkey];
          if (innerMap !== undefined) {
            for (var innerKey in innerMap) {
              seen = seen === undefined ? new Set() : seen;
              if (!seen.has(innerKey)) {
                seen.add(innerKey);
                calls = calls || [];
                calls.push(innerKey, innerMap[innerKey]);
              }
            }
          }
        }
        pointer = pointer.parent;
      }

      if (calls !== undefined) {
        for (var i = 0; i < calls.length; i += 2) {
          fn(calls[i], calls[i + 1]);
        }
      }
    };

    Meta.prototype.writableTags = function writableTags() {
      return this._getOrCreateOwnMap('_tags');
    };

    Meta.prototype.readableTags = function readableTags() {
      return this._tags;
    };

    Meta.prototype.writableTag = function writableTag(create) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot create a new tag for `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var ret = this._tag;
      if (ret === undefined) {
        ret = this._tag = create(this.source);
      }
      return ret;
    };

    Meta.prototype.readableTag = function readableTag() {
      return this._tag;
    };

    Meta.prototype.writableChainWatchers = function writableChainWatchers(create) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot create a new chain watcher for `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var ret = this._chainWatchers;
      if (ret === undefined) {
        ret = this._chainWatchers = create(this.source);
      }
      return ret;
    };

    Meta.prototype.readableChainWatchers = function readableChainWatchers() {
      return this._chainWatchers;
    };

    Meta.prototype.writableChains = function writableChains(create) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot create a new chains for `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var ret = this._chains;
      if (ret === undefined) {
        if (this.parent === undefined) {
          ret = create(this.source);
        } else {
          ret = this.parent.writableChains(create).copy(this.source);
        }
        this._chains = ret;
      }
      return ret;
    };

    Meta.prototype.readableChains = function readableChains() {
      return this._getInherited('_chains');
    };

    Meta.prototype.writeWatching = function writeWatching(subkey, value) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot update watchers for `' + subkey + '` on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var map = this._getOrCreateOwnMap('_watching');
      map[subkey] = value;
    };

    Meta.prototype.peekWatching = function peekWatching(subkey) {
      return this._findInherited('_watching', subkey);
    };

    Meta.prototype.addMixin = function addMixin(mixin) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot add mixins of `' + emberUtils.toString(mixin) + '` on `' + emberUtils.toString(this.source) + '` call addMixin after it has been destroyed.', !this.isMetaDestroyed());

      var set = this._getOrCreateOwnSet('_mixins');
      set.add(mixin);
    };

    Meta.prototype.hasMixin = function hasMixin(mixin) {
      return this._hasInInheritedSet('_mixins', mixin);
    };

    Meta.prototype.forEachMixins = function forEachMixins(fn) {
      var pointer = this;
      var seen = void 0;
      while (pointer !== undefined) {
        var set = pointer._mixins;
        if (set !== undefined) {
          seen = seen === undefined ? new Set() : seen;
          set.forEach(function (mixin) {
            if (!seen.has(mixin)) {
              seen.add(mixin);
              fn(mixin);
            }
          });
        }
        pointer = pointer.parent;
      }
    };

    Meta.prototype.writeBindings = function writeBindings(subkey, value) {
      true && !emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && emberDebug.assert('Cannot invoke `meta.writeBindings` when EmberENV._ENABLE_BINDING_SUPPORT is not set', emberEnvironment.ENV._ENABLE_BINDING_SUPPORT);
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot add a binding for `' + subkey + '` on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var map = this._getOrCreateOwnMap('_bindings');
      map[subkey] = value;
    };

    Meta.prototype.peekBindings = function peekBindings(subkey) {
      true && !emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && emberDebug.assert('Cannot invoke `meta.peekBindings` when EmberENV._ENABLE_BINDING_SUPPORT is not set', emberEnvironment.ENV._ENABLE_BINDING_SUPPORT);

      return this._findInherited('_bindings', subkey);
    };

    Meta.prototype.forEachBindings = function forEachBindings(fn) {
      true && !emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && emberDebug.assert('Cannot invoke `meta.forEachBindings` when EmberENV._ENABLE_BINDING_SUPPORT is not set', emberEnvironment.ENV._ENABLE_BINDING_SUPPORT);

      var pointer = this;
      var seen = void 0;
      while (pointer !== undefined) {
        var map = pointer._bindings;
        if (map !== undefined) {
          for (var key in map) {
            seen = seen || Object.create(null);
            if (seen[key] === undefined) {
              seen[key] = true;
              fn(key, map[key]);
            }
          }
        }
        pointer = pointer.parent;
      }
    };

    Meta.prototype.clearBindings = function clearBindings() {
      true && !emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && emberDebug.assert('Cannot invoke `meta.clearBindings` when EmberENV._ENABLE_BINDING_SUPPORT is not set', emberEnvironment.ENV._ENABLE_BINDING_SUPPORT);
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot clear bindings on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      this._bindings = undefined;
    };

    return Meta;
  }();

  for (var name in protoMethods) {
    Meta.prototype[name] = protoMethods[name];
  }

  if (features.MANDATORY_SETTER) {
    Meta.prototype.writeValues = function (subkey, value) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot set the value of `' + subkey + '` on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var map = this._getOrCreateOwnMap('_values');
      map[subkey] = value;
    };

    Meta.prototype.peekValues = function (subkey) {
      return this._findInherited('_values', subkey);
    };

    Meta.prototype.deleteFromValues = function (subkey) {
      delete this._getOrCreateOwnMap('_values')[subkey];
    };

    Meta.prototype.readInheritedValue = function (key, subkey) {
      var internalKey = '_' + key;

      var pointer = this;

      while (pointer !== undefined) {
        var map = pointer[internalKey];
        if (map !== undefined) {
          var value = map[subkey];
          if (value !== undefined || subkey in map) {
            return value;
          }
        }
        pointer = pointer.parent;
      }

      return UNDEFINED;
    };

    Meta.prototype.writeValue = function (obj, key, value) {
      var descriptor = emberUtils.lookupDescriptor(obj, key);
      var isMandatorySetter = descriptor !== null && descriptor.set && descriptor.set.isMandatorySetter;

      if (isMandatorySetter) {
        this.writeValues(key, value);
      } else {
        obj[key] = value;
      }
    };
  }

  if (features.EMBER_METAL_ES5_GETTERS) {
    Meta.prototype.writeDescriptors = function (subkey, value) {
      true && !!this.isMetaDestroyed() && emberDebug.assert(this.isMetaDestroyed() && 'Cannot update descriptors for `' + subkey + '` on `' + emberUtils.toString(this.source) + '` after it has been destroyed.', !this.isMetaDestroyed());

      var map = this._getOrCreateOwnMap('_descriptors');
      map[subkey] = value;
    };

    Meta.prototype.peekDescriptors = function (subkey) {
      var possibleDesc = this._findInherited('_descriptors', subkey);
      return possibleDesc === UNDEFINED ? undefined : possibleDesc;
    };

    Meta.prototype.removeDescriptors = function (subkey) {
      this.writeDescriptors(subkey, UNDEFINED);
    };

    Meta.prototype.forEachDescriptors = function (fn) {
      var pointer = this;
      var seen = void 0;
      while (pointer !== undefined) {
        var map = pointer._descriptors;
        if (map !== undefined) {
          for (var key in map) {
            seen = seen === undefined ? new Set() : seen;
            if (!seen.has(key)) {
              seen.add(key);
              var value = map[key];
              if (value !== UNDEFINED) {
                fn(key, value);
              }
            }
          }
        }
        pointer = pointer.parent;
      }
    };
  }

  var getPrototypeOf = Object.getPrototypeOf;
  var metaStore = new WeakMap();

  function setMeta(obj, meta) {
    true && !(obj !== null) && emberDebug.assert('Cannot call `setMeta` on null', obj !== null);
    true && !(obj !== undefined) && emberDebug.assert('Cannot call `setMeta` on undefined', obj !== undefined);
    true && !(typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call `setMeta` on ' + typeof obj, typeof obj === 'object' || typeof obj === 'function');

    {
      counters.setCalls++;
    }
    metaStore.set(obj, meta);
  }

  function peekMeta(obj) {
    true && !(obj !== null) && emberDebug.assert('Cannot call `peekMeta` on null', obj !== null);
    true && !(obj !== undefined) && emberDebug.assert('Cannot call `peekMeta` on undefined', obj !== undefined);
    true && !(typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call `peekMeta` on ' + typeof obj, typeof obj === 'object' || typeof obj === 'function');

    var pointer = obj;
    var meta = void 0;
    while (pointer !== undefined && pointer !== null) {
      meta = metaStore.get(pointer);
      // jshint loopfunc:true
      {
        counters.peekCalls++;
      }
      if (meta !== undefined) {
        return meta;
      }

      pointer = getPrototypeOf(pointer);
      {
        counters.peekPrototypeWalks++;
      }
    }
  }

  /**
    Tears down the meta on an object so that it can be garbage collected.
    Multiple calls will have no effect.
     @method deleteMeta
    @for Ember
    @param {Object} obj  the object to destroy
    @return {void}
    @private
  */
  function deleteMeta(obj) {
    true && !(obj !== null) && emberDebug.assert('Cannot call `deleteMeta` on null', obj !== null);
    true && !(obj !== undefined) && emberDebug.assert('Cannot call `deleteMeta` on undefined', obj !== undefined);
    true && !(typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call `deleteMeta` on ' + typeof obj, typeof obj === 'object' || typeof obj === 'function');

    {
      counters.deleteCalls++;
    }

    var meta = peekMeta(obj);
    if (meta !== undefined) {
      meta.destroy();
    }
  }

  /**
    Retrieves the meta hash for an object. If `writable` is true ensures the
    hash is writable for this object as well.
     The meta object contains information about computed property descriptors as
    well as any watched properties and other information. You generally will
    not access this information directly but instead work with higher level
    methods that manipulate this hash indirectly.
     @method meta
    @for Ember
    @private
     @param {Object} obj The object to retrieve meta for
    @param {Boolean} [writable=true] Pass `false` if you do not intend to modify
      the meta hash, allowing the method to avoid making an unnecessary copy.
    @return {Object} the meta hash for an object
  */
  function meta(obj) {
    true && !(obj !== null) && emberDebug.assert('Cannot call `meta` on null', obj !== null);
    true && !(obj !== undefined) && emberDebug.assert('Cannot call `meta` on undefined', obj !== undefined);
    true && !(typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call `meta` on ' + typeof obj, typeof obj === 'object' || typeof obj === 'function');

    {
      counters.metaCalls++;
    }

    var maybeMeta = peekMeta(obj);
    var parent = void 0;

    // remove this code, in-favor of explicit parent
    if (maybeMeta !== undefined) {
      if (maybeMeta.source === obj) {
        return maybeMeta;
      }
      parent = maybeMeta;
    }

    var newMeta = new Meta(obj, parent);
    setMeta(obj, newMeta);
    return newMeta;
  }

  {
    meta._counters = counters;
  }

  // Using `symbol()` here causes some node test to fail, presumably
  // because we define the CP with one copy of Ember and boot the app
  // with a different copy, so the random key we generate do not line
  // up. Is that testing a legit scenario?
  var DESCRIPTOR = '__DESCRIPTOR__';

  /**
    Returns the CP descriptor assocaited with `obj` and `keyName`, if any.
     @method descriptorFor
    @param {Object} obj the object to check
    @param {String} keyName the key to check
    @return {Descriptor}
    @private
  */
  function descriptorFor(obj, keyName, _meta) {
    true && !(obj !== null) && emberDebug.assert('Cannot call `descriptorFor` on null', obj !== null);
    true && !(obj !== undefined) && emberDebug.assert('Cannot call `descriptorFor` on undefined', obj !== undefined);
    true && !(typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call `descriptorFor` on ' + typeof obj, typeof obj === 'object' || typeof obj === 'function');

    if (features.EMBER_METAL_ES5_GETTERS) {
      var _meta2 = _meta === undefined ? peekMeta(obj) : _meta;

      if (_meta2 !== undefined) {
        return _meta2.peekDescriptors(keyName);
      }
    } else {
      var possibleDesc = obj[keyName];

      if (features.DESCRIPTOR_TRAP && isDescriptorTrap(possibleDesc)) {
        return possibleDesc[DESCRIPTOR];
      } else {
        return isDescriptor(possibleDesc) ? possibleDesc : undefined;
      }
    }
  }

  function isDescriptorTrap(possibleDesc) {
    if (features.DESCRIPTOR_TRAP) {
      return possibleDesc !== null && typeof possibleDesc === 'object' && possibleDesc[DESCRIPTOR] !== undefined;
    } else {
      throw new Error('Cannot call `isDescriptorTrap` in production');
    }
  }

  /**
    Check whether a value is a CP descriptor.
     @method descriptorFor
    @param {any} possibleDesc the value to check
    @return {boolean}
    @private
  */
  function isDescriptor(possibleDesc) {
    return possibleDesc !== null && typeof possibleDesc === 'object' && possibleDesc.isDescriptor;
  }

  var Cache = function () {
    function Cache(limit, func, key, store) {
      emberBabel.classCallCheck(this, Cache);

      this.size = 0;
      this.misses = 0;
      this.hits = 0;
      this.limit = limit;
      this.func = func;
      this.key = key;
      this.store = store || new Map();
    }

    Cache.prototype.get = function get(obj) {
      var key = this.key === undefined ? obj : this.key(obj);
      var value = this.store.get(key);
      if (value === undefined) {
        this.misses++;
        value = this._set(key, this.func(obj));
      } else if (value === UNDEFINED) {
        this.hits++;
        value = undefined;
      } else {
        this.hits++;
        // nothing to translate
      }

      return value;
    };

    Cache.prototype.set = function set(obj, value) {
      var key = this.key === undefined ? obj : this.key(obj);
      return this._set(key, value);
    };

    Cache.prototype._set = function _set(key, value) {
      if (this.limit > this.size) {
        this.size++;
        if (value === undefined) {
          this.store.set(key, UNDEFINED);
        } else {
          this.store.set(key, value);
        }
      }

      return value;
    };

    Cache.prototype.purge = function purge() {
      this.store.clear();
      this.size = 0;
      this.hits = 0;
      this.misses = 0;
    };

    return Cache;
  }();

  var firstDotIndexCache = new Cache(1000, function (key) {
    return key.indexOf('.');
  });

  function isPath(path) {
    return typeof path === 'string' && firstDotIndexCache.get(path) !== -1;
  }

  /**
    An object that that tracks @tracked properties that were consumed.
     @private
   */

  var Tracker = function () {
    function Tracker() {
      emberBabel.classCallCheck(this, Tracker);

      this.tags = new Set();
      this.last = null;
    }

    Tracker.prototype.add = function add(tag) {
      this.tags.add(tag);
      this.last = tag;
    };

    Tracker.prototype.combine = function combine() {
      if (this.tags.size === 0) {
        return reference.CONSTANT_TAG;
      } else if (this.tags.size === 1) {
        return this.last;
      } else {
        var tags = [];
        this.tags.forEach(function (tag) {
          return tags.push(tag);
        });
        return reference.combine(tags);
      }
    };

    emberBabel.createClass(Tracker, [{
      key: 'size',
      get: function () {
        return this.tags.size;
      }
    }]);

    return Tracker;
  }();
  /**
    @decorator
    @private
     Marks a property as tracked.
     By default, a component's properties are expected to be static,
    meaning you are not able to update them and have the template update accordingly.
    Marking a property as tracked means that when that property changes,
    a rerender of the component is scheduled so the template is kept up to date.
     There are two usages for the `@tracked` decorator, shown below.
     @example No dependencies
     If you don't pass an argument to `@tracked`, only changes to that property
    will be tracked:
     ```typescript
    import Component, { tracked } from '@glimmer/component';
     export default class MyComponent extends Component {
      @tracked
      remainingApples = 10
    }
    ```
     When something changes the component's `remainingApples` property, the rerender
    will be scheduled.
     @example Dependents
     In the case that you have a computed property that depends other
    properties, you want to track both so that when one of the
    dependents change, a rerender is scheduled.
     In the following example we have two properties,
    `eatenApples`, and `remainingApples`.
     ```typescript
    import Component, { tracked } from '@glimmer/component';
     const totalApples = 100;
     export default class MyComponent extends Component {
      @tracked
      eatenApples = 0
       @tracked('eatenApples')
      get remainingApples() {
        return totalApples - this.eatenApples;
      }
       increment() {
        this.eatenApples = this.eatenApples + 1;
      }
    }
    ```
     @param dependencies Optional dependents to be tracked.
   */

  function tracked(target, key, descriptor) {
    if ('value' in descriptor) {
      return descriptorForDataProperty(key, descriptor);
    } else {
      return descriptorForAccessor(key, descriptor);
    }
  }
  /**
    @private
     Whenever a tracked computed property is entered, the current tracker is
    saved off and a new tracker is replaced.
     Any tracked properties consumed are added to the current tracker.
     When a tracked computed property is exited, the tracker's tags are
    combined and added to the parent tracker.
     The consequence is that each tracked computed property has a tag
    that corresponds to the tracked properties consumed inside of
    itself, including child tracked computed properties.
   */
  var CURRENT_TRACKER = null;
  function getCurrentTracker() {
    return CURRENT_TRACKER;
  }
  function setCurrentTracker() {
    var tracker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Tracker();

    return CURRENT_TRACKER = tracker;
  }
  function descriptorForAccessor(key, descriptor) {
    var get = descriptor.get;
    var set = descriptor.set;
    function getter() {
      // Swap the parent tracker for a new tracker
      var old = CURRENT_TRACKER;
      var tracker = CURRENT_TRACKER = new Tracker();
      // Call the getter
      var ret = get.call(this);
      // Swap back the parent tracker
      CURRENT_TRACKER = old;
      // Combine the tags in the new tracker and add them to the parent tracker
      var tag = tracker.combine();
      if (CURRENT_TRACKER) CURRENT_TRACKER.add(tag);
      // Update the UpdatableTag for this property with the tag for all of the
      // consumed dependencies.
      update(tagForProperty(this, key), tag);
      return ret;
    }
    function setter() {
      // Mark the UpdatableTag for this property with the current tag.
      dirty(tagForProperty(this, key));
      set.apply(this, arguments);
    }
    return {
      enumerable: true,
      configurable: false,
      get: get && getter,
      set: set && setter
    };
  }
  /**
    @private
     A getter/setter for change tracking for a particular key. The accessor
    acts just like a normal property, but it triggers the `propertyDidChange`
    hook when written to.
     Values are saved on the object using a "shadow key," or a symbol based on the
    tracked property name. Sets write the value to the shadow key, and gets read
    from it.
   */
  function descriptorForDataProperty(key, descriptor) {
    var shadowKey = Symbol(key);
    return {
      enumerable: true,
      configurable: true,
      get: function () {
        if (CURRENT_TRACKER) CURRENT_TRACKER.add(tagForProperty(this, key));
        if (!(shadowKey in this)) {
          this[shadowKey] = descriptor.value;
        }
        return this[shadowKey];
      },
      set: function (newValue) {
        tagFor(this).inner.dirty();
        dirty(tagForProperty(this, key));
        this[shadowKey] = newValue;
        propertyDidChange$1();
      }
    };
  }
  var propertyDidChange$1 = function () {};
  var UntrackedPropertyError = function (_Error) {
    emberBabel.inherits(UntrackedPropertyError, _Error);

    function UntrackedPropertyError(target, key, message) {
      emberBabel.classCallCheck(this, UntrackedPropertyError);

      var _this = emberBabel.possibleConstructorReturn(this, _Error.call(this, message));

      _this.target = target;
      _this.key = key;
      return _this;
    }

    UntrackedPropertyError.for = function _for(obj, key) {
      return new UntrackedPropertyError(obj, key, 'The property \'' + key + '\' on ' + obj + ' was changed after being rendered. If you want to change a property used in a template after the component has rendered, mark the property as a tracked property with the @tracked decorator.');
    };

    return UntrackedPropertyError;
  }(Error);

  /**
  @module @ember/object
  */

  var ALLOWABLE_TYPES = {
    object: true,
    function: true,
    string: true
  };

  var PROXY_CONTENT = emberUtils.symbol('PROXY_CONTENT');

  function getPossibleMandatoryProxyValue(obj, keyName) {
    if (features.MANDATORY_GETTER && features.EMBER_METAL_ES5_GETTERS && emberUtils.HAS_NATIVE_PROXY) {
      var content = obj[PROXY_CONTENT];
      if (content === undefined) {
        return obj[keyName];
      } else {
        /* global Reflect */
        return Reflect.get(content, keyName, obj);
      }
    } else {
      return obj[keyName];
    }
  }

  // ..........................................................
  // GET AND SET
  //
  // If we are on a platform that supports accessors we can use those.
  // Otherwise simulate accessors by looking up the property directly on the
  // object.

  /**
    Gets the value of a property on an object. If the property is computed,
    the function will be invoked. If the property is not defined but the
    object implements the `unknownProperty` method then that will be invoked.
     ```javascript
    import { get } from '@ember/object';
    get(obj, "name");
    ```
     If you plan to run on IE8 and older browsers then you should use this
    method anytime you want to retrieve a property on an object that you don't
    know for sure is private. (Properties beginning with an underscore '_'
    are considered private.)
     On all newer browsers, you only need to use this method to retrieve
    properties if the property might not be defined on the object and you want
    to respect the `unknownProperty` handler. Otherwise you can ignore this
    method.
     Note that if the object itself is `undefined`, this method will throw
    an error.
     @method get
    @for @ember/object
    @static
    @param {Object} obj The object to retrieve from.
    @param {String} keyName The property key to retrieve
    @return {Object} the property value or `null`.
    @public
  */
  function get(obj, keyName) {
    true && !(arguments.length === 2) && emberDebug.assert('Get must be called with two arguments; an object and a property key', arguments.length === 2);
    true && !(obj !== undefined && obj !== null) && emberDebug.assert('Cannot call get with \'' + keyName + '\' on an undefined object.', obj !== undefined && obj !== null);
    true && !(typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)) && emberDebug.assert('The key provided to get must be a string or number, you passed ' + keyName, typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName));
    true && !(typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0) && emberDebug.assert('\'this\' in paths is not supported', typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0);
    true && !(keyName !== '') && emberDebug.assert('Cannot call `get` with an empty string', keyName !== '');

    var type = typeof obj;

    var isObject = type === 'object';
    var isFunction = type === 'function';
    var isObjectLike = isObject || isFunction;

    var descriptor = undefined;
    var value = void 0;

    if (isObjectLike) {
      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        var tracker = getCurrentTracker();
        if (tracker) tracker.add(tagForProperty(obj, keyName));
      }

      if (features.EMBER_METAL_ES5_GETTERS) {
        descriptor = descriptorFor(obj, keyName);
      }

      if (!features.EMBER_METAL_ES5_GETTERS || descriptor === undefined) {
        value = getPossibleMandatoryProxyValue(obj, keyName);

        if (features.DESCRIPTOR_TRAP && isDescriptorTrap(value)) {
          descriptor = value[DESCRIPTOR];
        } else if (isDescriptor(value)) {
          true && !!features.EMBER_METAL_ES5_GETTERS && emberDebug.deprecate('[DEPRECATED] computed property \'' + keyName + '\' was not set on object \'' + (obj && obj.toString && obj.toString()) + '\' via \'defineProperty\'', !features.EMBER_METAL_ES5_GETTERS, {
            id: 'ember-meta.descriptor-on-object',
            until: '3.5.0',
            url: 'https://emberjs.com/deprecations/v3.x#toc_use-defineProperty-to-define-computed-properties'
          });

          descriptor = value;
        }
      }

      if (descriptor !== undefined) {
        return descriptor.get(obj, keyName);
      }
    } else {
      value = obj[keyName];
    }

    if (isPath(keyName)) {
      return _getPath(obj, keyName);
    } else if (value === undefined && isObject && !(keyName in obj) && typeof obj.unknownProperty === 'function') {
      return obj.unknownProperty(keyName);
    } else {
      return value;
    }
  }

  function _getPath(root, path) {
    var obj = root;
    var parts = path.split('.');

    for (var i = 0; i < parts.length; i++) {
      if (!isGettable(obj)) {
        return undefined;
      }

      obj = get(obj, parts[i]);

      if (obj && obj.isDestroyed) {
        return undefined;
      }
    }

    return obj;
  }

  function isGettable(obj) {
    return obj !== undefined && obj !== null && ALLOWABLE_TYPES[typeof obj];
  }

  /**
    Retrieves the value of a property from an Object, or a default value in the
    case that the property returns `undefined`.
     ```javascript
    import { getWithDefault } from '@ember/object';
    getWithDefault(person, 'lastName', 'Doe');
    ```
     @method getWithDefault
    @for @ember/object
    @static
    @param {Object} obj The object to retrieve from.
    @param {String} keyName The name of the property to retrieve
    @param {Object} defaultValue The value to return if the property value is undefined
    @return {Object} The property value or the defaultValue.
    @public
  */
  function getWithDefault(root, key, defaultValue) {
    var value = get(root, key);

    if (value === undefined) {
      return defaultValue;
    }
    return value;
  }

  /**
   @module @ember/object
  */
  /**
    Sets the value of a property on an object, respecting computed properties
    and notifying observers and other listeners of the change. If the
    property is not defined but the object implements the `setUnknownProperty`
    method then that will be invoked as well.
     ```javascript
    import { set } from '@ember/object';
    set(obj, "name", value);
    ```
     @method set
    @static
    @for @ember/object
    @param {Object} obj The object to modify.
    @param {String} keyName The property key to set
    @param {Object} value The value to set
    @return {Object} the passed value.
    @public
  */
  function set(obj, keyName, value, tolerant) {
    true && !(arguments.length === 3 || arguments.length === 4) && emberDebug.assert('Set must be called with three or four arguments; an object, a property key, a value and tolerant true/false', arguments.length === 3 || arguments.length === 4);
    true && !(obj && typeof obj === 'object' || typeof obj === 'function') && emberDebug.assert('Cannot call set with \'' + keyName + '\' on an undefined object.', obj && typeof obj === 'object' || typeof obj === 'function');
    true && !(typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName)) && emberDebug.assert('The key provided to set must be a string or number, you passed ' + keyName, typeof keyName === 'string' || typeof keyName === 'number' && !isNaN(keyName));
    true && !(typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0) && emberDebug.assert('\'this\' in paths is not supported', typeof keyName !== 'string' || keyName.lastIndexOf('this.', 0) !== 0);

    if (obj.isDestroyed) {
      true && !tolerant && emberDebug.assert('calling set on destroyed object: ' + emberUtils.toString(obj) + '.' + keyName + ' = ' + emberUtils.toString(value), tolerant);

      return;
    }

    if (isPath(keyName)) {
      return setPath(obj, keyName, value, tolerant);
    }

    if (features.EMBER_METAL_ES5_GETTERS) {
      var possibleDesc = descriptorFor(obj, keyName);

      if (possibleDesc !== undefined) {
        /* computed property */
        possibleDesc.set(obj, keyName, value);
        return value;
      }
    }

    var currentValue = getPossibleMandatoryProxyValue(obj, keyName);

    if (features.DESCRIPTOR_TRAP && isDescriptorTrap(currentValue)) {
      currentValue = currentValue[DESCRIPTOR];
    }

    if (isDescriptor(currentValue)) {
      /* computed property */
      currentValue.set(obj, keyName, value);
    } else if (currentValue === undefined && 'object' === typeof obj && !(keyName in obj) && typeof obj.setUnknownProperty === 'function') {
      /* unknown property */
      obj.setUnknownProperty(keyName, value);
    } else {
      var meta$$1 = peekMeta(obj);

      if (features.MANDATORY_SETTER) {
        setWithMandatorySetter(meta$$1, obj, keyName, value);
      } else {
        obj[keyName] = value;
      }

      if (currentValue !== value) {
        notifyPropertyChange(obj, keyName, meta$$1);
      }
    }

    return value;
  }

  if (features.MANDATORY_SETTER) {
    var setWithMandatorySetter = function (meta$$1, obj, keyName, value) {
      if (meta$$1 !== undefined && meta$$1.peekWatching(keyName) > 0) {
        makeEnumerable(obj, keyName);
        meta$$1.writeValue(obj, keyName, value);
      } else {
        obj[keyName] = value;
      }
    };

    var makeEnumerable = function (obj, key) {
      var desc = Object.getOwnPropertyDescriptor(obj, key);

      if (desc && desc.set && desc.set.isMandatorySetter) {
        desc.enumerable = true;
        Object.defineProperty(obj, key, desc);
      }
    };
  }

  function setPath(root, path, value, tolerant) {
    var parts = path.split('.');
    var keyName = parts.pop();

    true && !(keyName.trim().length > 0) && emberDebug.assert('Property set failed: You passed an empty path', keyName.trim().length > 0);

    var newPath = parts.join('.');

    var newRoot = _getPath(root, newPath);

    if (newRoot) {
      return set(newRoot, keyName, value);
    } else if (!tolerant) {
      throw new emberDebug.Error('Property set failed: object in path "' + newPath + '" could not be found or was destroyed.');
    }
  }

  /**
    Error-tolerant form of `set`. Will not blow up if any part of the
    chain is `undefined`, `null`, or destroyed.
     This is primarily used when syncing bindings, which may try to update after
    an object has been destroyed.
     ```javascript
    import { trySet } from '@ember/object';
     let obj = { name: "Zoey" };
    trySet(obj, "contacts.twitter", "@emberjs");
    ```
     @method trySet
    @static
    @for @ember/object
    @param {Object} root The object to modify.
    @param {String} path The property path to set
    @param {Object} value The value to set
    @public
  */
  function trySet(root, path, value) {
    return set(root, path, value, true);
  }

  /**
  @module @ember/object
  */

  var END_WITH_EACH_REGEX = /\.@each$/;

  /**
    Expands `pattern`, invoking `callback` for each expansion.
     The only pattern supported is brace-expansion, anything else will be passed
    once to `callback` directly.
     Example
     ```js
    import { expandProperties } from '@ember/object/computed';
     function echo(arg){ console.log(arg); }
     expandProperties('foo.bar', echo);              //=> 'foo.bar'
    expandProperties('{foo,bar}', echo);            //=> 'foo', 'bar'
    expandProperties('foo.{bar,baz}', echo);        //=> 'foo.bar', 'foo.baz'
    expandProperties('{foo,bar}.baz', echo);        //=> 'foo.baz', 'bar.baz'
    expandProperties('foo.{bar,baz}.[]', echo)      //=> 'foo.bar.[]', 'foo.baz.[]'
    expandProperties('{foo,bar}.{spam,eggs}', echo) //=> 'foo.spam', 'foo.eggs', 'bar.spam', 'bar.eggs'
    expandProperties('{foo}.bar.{baz}')             //=> 'foo.bar.baz'
    ```
     @method expandProperties
    @static
    @for @ember/object/computed
    @public
    @param {String} pattern The property pattern to expand.
    @param {Function} callback The callback to invoke.  It is invoked once per
    expansion, and is passed the expansion.
  */
  function expandProperties(pattern, callback) {
    true && !(typeof pattern === 'string') && emberDebug.assert('A computed property key must be a string, you passed ' + typeof pattern + ' ' + pattern, typeof pattern === 'string');
    true && !(pattern.indexOf(' ') === -1) && emberDebug.assert('Brace expanded properties cannot contain spaces, e.g. "user.{firstName, lastName}" should be "user.{firstName,lastName}"', pattern.indexOf(' ') === -1);
    // regex to look for double open, double close, or unclosed braces

    true && !(pattern.match(/\{[^}{]*\{|\}[^}{]*\}|\{[^}]*$/g) === null) && emberDebug.assert('Brace expanded properties have to be balanced and cannot be nested, pattern: ' + pattern, pattern.match(/\{[^}{]*\{|\}[^}{]*\}|\{[^}]*$/g) === null);

    var start = pattern.indexOf('{');
    if (start < 0) {
      callback(pattern.replace(END_WITH_EACH_REGEX, '.[]'));
    } else {
      dive('', pattern, start, callback);
    }
  }

  function dive(prefix, pattern, start, callback) {
    var end = pattern.indexOf('}'),
        i = 0,
        newStart = void 0,
        arrayLength = void 0;
    var tempArr = pattern.substring(start + 1, end).split(',');
    var after = pattern.substring(end + 1);
    prefix = prefix + pattern.substring(0, start);

    arrayLength = tempArr.length;
    while (i < arrayLength) {
      newStart = after.indexOf('{');
      if (newStart < 0) {
        callback((prefix + tempArr[i++] + after).replace(END_WITH_EACH_REGEX, '.[]'));
      } else {
        dive(prefix + tempArr[i++], after, newStart, callback);
      }
    }
  }

  // ..........................................................
  // DEPENDENT KEYS
  //

  function addDependentKeys(desc, obj, keyName, meta) {
    // the descriptor has a list of dependent keys, so
    // add all of its dependent keys.
    var depKeys = desc._dependentKeys;
    if (depKeys === null || depKeys === undefined) {
      return;
    }

    for (var idx = 0; idx < depKeys.length; idx++) {
      var depKey = depKeys[idx];
      // Increment the number of times depKey depends on keyName.
      meta.writeDeps(depKey, keyName, (meta.peekDeps(depKey, keyName) || 0) + 1);
      // Watch the depKey
      watch(obj, depKey, meta);
    }
  }

  function removeDependentKeys(desc, obj, keyName, meta) {
    // the descriptor has a list of dependent keys, so
    // remove all of its dependent keys.
    var depKeys = desc._dependentKeys;
    if (depKeys === null || depKeys === undefined) {
      return;
    }

    for (var idx = 0; idx < depKeys.length; idx++) {
      var depKey = depKeys[idx];
      // Decrement the number of times depKey depends on keyName.
      meta.writeDeps(depKey, keyName, (meta.peekDeps(depKey, keyName) || 0) - 1);
      // Unwatch the depKey
      unwatch(obj, depKey, meta);
    }
  }

  /**
  @module @ember/object
  */

  var DEEP_EACH_REGEX = /\.@each\.[^.]+\./;

  function noop() {}

  /**
    A computed property transforms an object literal with object's accessor function(s) into a property.
     By default the function backing the computed property will only be called
    once and the result will be cached. You can specify various properties
    that your computed property depends on. This will force the cached
    result to be recomputed if the dependencies are modified.
     In the following example we declare a computed property - `fullName` - by calling
    `computed` with property dependencies (`firstName` and `lastName`) as leading arguments and getter accessor function. The `fullName` getter function
    will be called once (regardless of how many times it is accessed) as long
    as its dependencies have not changed. Once `firstName` or `lastName` are updated
    any future calls (or anything bound) to `fullName` will incorporate the new
    values.
     ```javascript
    import EmberObject, { computed } from '@ember/object';
     let Person = EmberObject.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
       fullName: computed('firstName', 'lastName', function() {
        let firstName = this.get('firstName'),
            lastName  = this.get('lastName');
         return `${firstName} ${lastName}`;
      })
    });
     let tom = Person.create({
      firstName: 'Tom',
      lastName: 'Dale'
    });
     tom.get('fullName') // 'Tom Dale'
    ```
     You can also define what Ember should do when setting a computed property by providing additional function (`set`) in hash argument.
    If you try to set a computed property, it will try to invoke setter accessor function with the key and
    value you want to set it to as arguments.
     ```javascript
    import EmberObject, { computed } from '@ember/object';
     let Person = EmberObject.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
       fullName: computed('firstName', 'lastName', {
        get(key) {
          let firstName = this.get('firstName'),
              lastName  = this.get('lastName');
           return firstName + ' ' + lastName;
        },
        set(key, value) {
          let [firstName, lastName] = value.split(' ');
           this.set('firstName', firstName);
          this.set('lastName', lastName);
           return value;
        }
      })
    });
     let person = Person.create();
     person.set('fullName', 'Peter Wagenet');
    person.get('firstName'); // 'Peter'
    person.get('lastName');  // 'Wagenet'
    ```
     You can overwrite computed property with normal property (no longer computed), that won't change if dependencies change, if you set computed property and it won't have setter accessor function defined.
     You can also mark computed property as `.readOnly()` and block all attempts to set it.
     ```javascript
    import EmberObject, { computed } from '@ember/object';
     let Person = EmberObject.extend({
      // these will be supplied by `create`
      firstName: null,
      lastName: null,
       fullName: computed('firstName', 'lastName', {
        get(key) {
          let firstName = this.get('firstName');
          let lastName  = this.get('lastName');
           return firstName + ' ' + lastName;
        }
      }).readOnly()
    });
     let person = Person.create();
    person.set('fullName', 'Peter Wagenet'); // Uncaught Error: Cannot set read-only property "fullName" on object: <(...):emberXXX>
    ```
     Additional resources:
    - [New CP syntax RFC](https://github.com/emberjs/rfcs/blob/master/text/0011-improved-cp-syntax.md)
    - [New computed syntax explained in "Ember 1.12 released" ](https://emberjs.com/blog/2015/05/13/ember-1-12-released.html#toc_new-computed-syntax)
     @class ComputedProperty
    @public
  */

  var ComputedProperty = function (_Descriptor) {
    emberBabel.inherits(ComputedProperty, _Descriptor);

    function ComputedProperty(config, opts) {
      emberBabel.classCallCheck(this, ComputedProperty);

      var _this = emberBabel.possibleConstructorReturn(this, _Descriptor.call(this));

      var hasGetterOnly = typeof config === 'function';
      if (hasGetterOnly) {
        _this._getter = config;
      } else {
        true && !(typeof config === 'object' && !Array.isArray(config)) && emberDebug.assert('computed expects a function or an object as last argument.', typeof config === 'object' && !Array.isArray(config));
        true && !Object.keys(config).every(function (key) {
          return key === 'get' || key === 'set';
        }) && emberDebug.assert('Config object passed to computed can only contain `get` and `set` keys.', Object.keys(config).every(function (key) {
          return key === 'get' || key === 'set';
        }));
        true && !(!!config.get || !!config.set) && emberDebug.assert('Computed properties must receive a getter or a setter, you passed none.', !!config.get || !!config.set);

        _this._getter = config.get || noop;
        _this._setter = config.set;
      }

      _this._suspended = undefined;
      _this._meta = undefined;
      _this._volatile = false;

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        _this._auto = false;
      }

      _this._dependentKeys = opts && opts.dependentKeys;
      _this._readOnly = opts && hasGetterOnly && opts.readOnly === true;
      return _this;
    }

    /**
      Call on a computed property to set it into non-cached mode. When in this
      mode the computed property will not automatically cache the return value.
       It also does not automatically fire any change events. You must manually notify
      any changes if you want to observe this property.
       Dependency keys have no effect on volatile properties as they are for cache
      invalidation and notification when cached value is invalidated.
       ```javascript
      import EmberObject, { computed } from '@ember/object';
       let outsideService = EmberObject.extend({
        value: computed(function() {
          return OutsideService.getValue();
        }).volatile()
      }).create();
      ```
       @method volatile
      @return {ComputedProperty} this
      @chainable
      @public
    */

    ComputedProperty.prototype.volatile = function volatile() {
      this._volatile = true;
      return this;
    };

    /**
      Call on a computed property to set it into read-only mode. When in this
      mode the computed property will throw an error when set.
       ```javascript
      import EmberObject, { computed } from '@ember/object';
       let Person = EmberObject.extend({
        guid: computed(function() {
          return 'guid-guid-guid';
        }).readOnly()
      });
       let person = Person.create();
       person.set('guid', 'new-guid'); // will throw an exception
      ```
       @method readOnly
      @return {ComputedProperty} this
      @chainable
      @public
    */

    ComputedProperty.prototype.readOnly = function readOnly() {
      this._readOnly = true;
      true && !!(this._readOnly && this._setter && this._setter !== this._getter) && emberDebug.assert('Computed properties that define a setter using the new syntax cannot be read-only', !(this._readOnly && this._setter && this._setter !== this._getter));

      return this;
    };

    /**
      Sets the dependent keys on this computed property. Pass any number of
      arguments containing key paths that this computed property depends on.
       ```javascript
      import EmberObject, { computed } from '@ember/object';
       let President = EmberObject.extend({
        fullName: computed('firstName', 'lastName', function() {
          return this.get('firstName') + ' ' + this.get('lastName');
           // Tell Ember that this computed property depends on firstName
          // and lastName
        })
      });
       let president = President.create({
        firstName: 'Barack',
        lastName: 'Obama'
      });
       president.get('fullName'); // 'Barack Obama'
      ```
       @method property
      @param {String} path* zero or more property paths
      @return {ComputedProperty} this
      @chainable
      @public
    */

    ComputedProperty.prototype.property = function property() {
      var args = [];

      function addArg(property) {
        true && emberDebug.warn('Dependent keys containing @each only work one level deep. ' + ('You used the key "' + property + '" which is invalid. ') + 'Please create an intermediary computed property.', DEEP_EACH_REGEX.test(property) === false, { id: 'ember-metal.computed-deep-each' });

        args.push(property);
      }

      for (var i = 0; i < arguments.length; i++) {
        expandProperties(arguments[i], addArg);
      }

      this._dependentKeys = args;
      return this;
    };

    /**
      In some cases, you may want to annotate computed properties with additional
      metadata about how they function or what values they operate on. For example,
      computed property functions may close over variables that are then no longer
      available for introspection.
       You can pass a hash of these values to a computed property like this:
       ```
      import { computed } from '@ember/object';
      import Person from 'my-app/utils/person';
       person: computed(function() {
        let personId = this.get('personId');
        return Person.create({ id: personId });
      }).meta({ type: Person })
      ```
       The hash that you pass to the `meta()` function will be saved on the
      computed property descriptor under the `_meta` key. Ember runtime
      exposes a public API for retrieving these values from classes,
      via the `metaForProperty()` function.
       @method meta
      @param {Object} meta
      @chainable
      @public
    */

    ComputedProperty.prototype.meta = function meta$$1(_meta) {
      if (arguments.length === 0) {
        return this._meta || {};
      } else {
        this._meta = _meta;
        return this;
      }
    };

    // invalidate cache when CP key changes


    ComputedProperty.prototype.didChange = function didChange(obj, keyName) {
      // _suspended is set via a CP.set to ensure we don't clear
      // the cached value set by the setter
      if (this._volatile || this._suspended === obj) {
        return;
      }

      // don't create objects just to invalidate
      var meta$$1 = peekMeta(obj);
      if (meta$$1 === undefined || meta$$1.source !== obj) {
        return;
      }

      var cache = peekCacheFor(obj);
      if (cache !== undefined && cache.delete(keyName)) {
        removeDependentKeys(this, obj, keyName, meta$$1);
      }
    };

    ComputedProperty.prototype.get = function get(obj, keyName) {
      if (this._volatile) {
        return this._getter.call(obj, keyName);
      }

      var cache = getCacheFor(obj);
      var propertyTag = void 0;

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        propertyTag = tagForProperty(obj, keyName);

        if (cache.has(keyName)) {
          // special-case for computed with no dependent keys used to
          // trigger cacheable behavior.
          if (!this._auto && (!this._dependentKeys || this._dependentKeys.length === 0)) {
            return cache.get(keyName);
          }

          var lastRevision = getLastRevisionFor(obj, keyName);
          if (propertyTag.validate(lastRevision)) {
            return cache.get(keyName);
          }
        }
      } else {
        if (cache.has(keyName)) {
          return cache.get(keyName);
        }
      }

      var parent = void 0;
      var tracker = void 0;

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        parent = getCurrentTracker();
        tracker = setCurrentTracker();
      }

      var ret = this._getter.call(obj, keyName);

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        setCurrentTracker(parent);
        var tag = tracker.combine();
        if (parent) parent.add(tag);

        update(propertyTag, tag);
        setLastRevisionFor(obj, keyName, propertyTag.value());
      }

      cache.set(keyName, ret);

      var meta$$1 = meta(obj);
      var chainWatchers = meta$$1.readableChainWatchers();
      if (chainWatchers !== undefined) {
        chainWatchers.revalidate(keyName);
      }
      addDependentKeys(this, obj, keyName, meta$$1);

      return ret;
    };

    ComputedProperty.prototype.set = function set$$1(obj, keyName, value) {
      if (this._readOnly) {
        this._throwReadOnlyError(obj, keyName);
      }

      if (!this._setter) {
        return this.clobberSet(obj, keyName, value);
      }

      if (this._volatile) {
        return this.volatileSet(obj, keyName, value);
      }

      return this.setWithSuspend(obj, keyName, value);
    };

    ComputedProperty.prototype._throwReadOnlyError = function _throwReadOnlyError(obj, keyName) {
      throw new emberDebug.Error('Cannot set read-only property "' + keyName + '" on object: ' + emberUtils.inspect(obj));
    };

    ComputedProperty.prototype.clobberSet = function clobberSet(obj, keyName, value) {
      var cachedValue = getCachedValueFor(obj, keyName);
      defineProperty(obj, keyName, null, cachedValue);
      set(obj, keyName, value);
      return value;
    };

    ComputedProperty.prototype.volatileSet = function volatileSet(obj, keyName, value) {
      return this._setter.call(obj, keyName, value);
    };

    ComputedProperty.prototype.setWithSuspend = function setWithSuspend(obj, keyName, value) {
      var oldSuspended = this._suspended;
      this._suspended = obj;
      try {
        return this._set(obj, keyName, value);
      } finally {
        this._suspended = oldSuspended;
      }
    };

    ComputedProperty.prototype._set = function _set(obj, keyName, value) {
      var cache = getCacheFor(obj);
      var hadCachedValue = cache.has(keyName);
      var cachedValue = cache.get(keyName);

      var ret = this._setter.call(obj, keyName, value, cachedValue);

      // allows setter to return the same value that is cached already
      if (hadCachedValue && cachedValue === ret) {
        return ret;
      }

      var meta$$1 = meta(obj);
      if (!hadCachedValue) {
        addDependentKeys(this, obj, keyName, meta$$1);
      }

      cache.set(keyName, ret);

      notifyPropertyChange(obj, keyName, meta$$1);

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        var propertyTag = tagForProperty(obj, keyName);
        setLastRevisionFor(obj, keyName, propertyTag.value());
      }

      return ret;
    };

    /* called before property is overridden */

    ComputedProperty.prototype.teardown = function teardown(obj, keyName, meta$$1) {
      if (this._volatile) {
        return;
      }
      var cache = peekCacheFor(obj);
      if (cache !== undefined && cache.delete(keyName)) {
        removeDependentKeys(this, obj, keyName, meta$$1);
      }
    };

    return ComputedProperty;
  }(Descriptor);

  if (features.EMBER_METAL_TRACKED_PROPERTIES) {
    ComputedProperty.prototype.auto = function () {
      this._auto = true;
      return this;
    };
  }

  /**
    This helper returns a new property descriptor that wraps the passed
    computed property function. You can use this helper to define properties
    with mixins or via `defineProperty()`.
     If you pass a function as an argument, it will be used as a getter. A computed
    property defined in this way might look like this:
     ```js
    import EmberObject, { computed } from '@ember/object';
     let Person = EmberObject.extend({
      init() {
        this._super(...arguments);
         this.firstName = 'Betty';
        this.lastName = 'Jones';
      },
       fullName: computed('firstName', 'lastName', function() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      })
    });
     let client = Person.create();
     client.get('fullName'); // 'Betty Jones'
     client.set('lastName', 'Fuller');
    client.get('fullName'); // 'Betty Fuller'
    ```
     You can pass a hash with two functions, `get` and `set`, as an
    argument to provide both a getter and setter:
     ```js
    import EmberObject, { computed } from '@ember/object';
     let Person = EmberObject.extend({
      init() {
        this._super(...arguments);
         this.firstName = 'Betty';
        this.lastName = 'Jones';
      },
       fullName: computed('firstName', 'lastName', {
        get(key) {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(key, value) {
          let [firstName, lastName] = value.split(/\s+/);
          this.setProperties({ firstName, lastName });
          return value;
        }
      })
    });
     let client = Person.create();
    client.get('firstName'); // 'Betty'
     client.set('fullName', 'Carroll Fuller');
    client.get('firstName'); // 'Carroll'
    ```
     The `set` function should accept two parameters, `key` and `value`. The value
    returned from `set` will be the new value of the property.
     _Note: This is the preferred way to define computed properties when writing third-party
    libraries that depend on or use Ember, since there is no guarantee that the user
    will have [prototype Extensions](https://emberjs.com/guides/configuring-ember/disabling-prototype-extensions/) enabled._
     The alternative syntax, with prototype extensions, might look like:
     ```js
    fullName: function() {
      return this.get('firstName') + ' ' + this.get('lastName');
    }.property('firstName', 'lastName')
    ```
     @method computed
    @for @ember/object
    @static
    @param {String} [dependentKeys*] Optional dependent keys that trigger this computed property.
    @param {Function} func The computed property function.
    @return {ComputedProperty} property descriptor instance
    @public
  */
  function computed() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var func = args.pop();

    var cp = new ComputedProperty(func);

    if (args.length > 0) {
      cp.property.apply(cp, args);
    }

    return cp;
  }
  // used for the Ember.computed global only
  var _globalsComputed = computed.bind(null);

  var COMPUTED_PROPERTY_CACHED_VALUES = new WeakMap();
  var COMPUTED_PROPERTY_LAST_REVISION = features.EMBER_METAL_TRACKED_PROPERTIES ? new WeakMap() : undefined;

  /**
    Returns the cached value for a property, if one exists.
    This can be useful for peeking at the value of a computed
    property that is generated lazily, without accidentally causing
    it to be created.
     @method cacheFor
    @static
    @for @ember/object/internals
    @param {Object} obj the object whose property you want to check
    @param {String} key the name of the property whose cached value you want
      to return
    @return {Object} the cached value
    @public
  */
  function getCacheFor(obj) {
    var cache = COMPUTED_PROPERTY_CACHED_VALUES.get(obj);
    if (cache === undefined) {
      cache = new Map();

      if (features.EMBER_METAL_TRACKED_PROPERTIES) {
        COMPUTED_PROPERTY_LAST_REVISION.set(obj, new Map());
      }

      COMPUTED_PROPERTY_CACHED_VALUES.set(obj, cache);
    }
    return cache;
  }

  function getCachedValueFor(obj, key) {
    var cache = COMPUTED_PROPERTY_CACHED_VALUES.get(obj);
    if (cache !== undefined) {
      return cache.get(key);
    }
  }

  var setLastRevisionFor = void 0;
  var getLastRevisionFor = void 0;

  if (features.EMBER_METAL_TRACKED_PROPERTIES) {
    setLastRevisionFor = function (obj, key, revision) {
      var lastRevision = COMPUTED_PROPERTY_LAST_REVISION.get(obj);
      lastRevision.set(key, revision);
    };

    getLastRevisionFor = function (obj, key) {
      var cache = COMPUTED_PROPERTY_LAST_REVISION.get(obj);
      if (cache == undefined) {
        return 0;
      } else {
        return cache.get(key);
      }
    };
  }

  function peekCacheFor(obj) {
    return COMPUTED_PROPERTY_CACHED_VALUES.get(obj);
  }

  var CONSUMED = {};

  function alias(altKey) {
    return new AliasedProperty(altKey);
  }

  var AliasedProperty = function (_Descriptor) {
    emberBabel.inherits(AliasedProperty, _Descriptor);

    function AliasedProperty(altKey) {
      emberBabel.classCallCheck(this, AliasedProperty);

      var _this = emberBabel.possibleConstructorReturn(this, _Descriptor.call(this));

      _this.altKey = altKey;
      _this._dependentKeys = [altKey];
      return _this;
    }

    AliasedProperty.prototype.setup = function setup(obj, keyName) {
      true && !(this.altKey !== keyName) && emberDebug.assert('Setting alias \'' + keyName + '\' on self', this.altKey !== keyName);

      var meta$$1 = meta(obj);
      if (meta$$1.peekWatching(keyName)) {
        addDependentKeys(this, obj, keyName, meta$$1);
      }
    };

    AliasedProperty.prototype.teardown = function teardown(obj, keyName, meta$$1) {
      if (meta$$1.peekWatching(keyName)) {
        removeDependentKeys(this, obj, keyName, meta$$1);
      }
    };

    AliasedProperty.prototype.willWatch = function willWatch(obj, keyName, meta$$1) {
      addDependentKeys(this, obj, keyName, meta$$1);
    };

    AliasedProperty.prototype.didUnwatch = function didUnwatch(obj, keyName, meta$$1) {
      removeDependentKeys(this, obj, keyName, meta$$1);
    };

    AliasedProperty.prototype.get = function get$$1(obj, keyName) {
      var ret = get(obj, this.altKey);
      var cache = getCacheFor(obj);
      if (cache.get(keyName) !== CONSUMED) {
        var meta$$1 = meta(obj);
        cache.set(keyName, CONSUMED);
        addDependentKeys(this, obj, keyName, meta$$1);
      }
      return ret;
    };

    AliasedProperty.prototype.set = function set$$1(obj, keyName, value) {
      return set(obj, this.altKey, value);
    };

    AliasedProperty.prototype.readOnly = function readOnly() {
      this.set = AliasedProperty_readOnlySet;
      return this;
    };

    AliasedProperty.prototype.oneWay = function oneWay() {
      this.set = AliasedProperty_oneWaySet;
      return this;
    };

    return AliasedProperty;
  }(Descriptor);

  function AliasedProperty_readOnlySet(obj, keyName) {
    // eslint-disable-line no-unused-vars
    throw new emberDebug.Error('Cannot set read-only property \'' + keyName + '\' on object: ' + emberUtils.inspect(obj));
  }

  function AliasedProperty_oneWaySet(obj, keyName, value) {
    defineProperty(obj, keyName, null);
    return set(obj, keyName, value);
  }

  // Backwards compatibility with Ember Data.
  AliasedProperty.prototype._meta = undefined;
  AliasedProperty.prototype.meta = ComputedProperty.prototype.meta;

  /**
   @module @ember/polyfills
  */
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
    @public
  */
  function merge(original, updates) {
    if (updates === null || typeof updates !== 'object') {
      return original;
    }

    var props = Object.keys(updates);
    var prop = void 0;

    for (var i = 0; i < props.length; i++) {
      prop = props[i];
      original[prop] = updates[prop];
    }

    return original;
  }

  /**
  @module ember
  */

  /**
    Used internally to allow changing properties in a backwards compatible way, and print a helpful
    deprecation warning.
     @method deprecateProperty
    @param {Object} object The object to add the deprecated property to.
    @param {String} deprecatedKey The property to add (and print deprecation warnings upon accessing).
    @param {String} newKey The property that will be aliased.
    @private
    @since 1.7.0
  */

  function deprecateProperty(object, deprecatedKey, newKey, options) {
    function _deprecate() {
      true && !false && emberDebug.deprecate('Usage of `' + deprecatedKey + '` is deprecated, use `' + newKey + '` instead.', false, options);
    }

    Object.defineProperty(object, deprecatedKey, {
      configurable: true,
      enumerable: false,
      set: function (value) {
        _deprecate();
        set(this, newKey, value);
      },
      get: function () {
        _deprecate();
        return get(this, newKey);
      }
    });
  }

  /* eslint no-console:off */

  /**
  @module @ember/instrumentation
  @private
  */

  /**
    The purpose of the Ember Instrumentation module is
    to provide efficient, general-purpose instrumentation
    for Ember.
     Subscribe to a listener by using `subscribe`:
     ```javascript
    import { subscribe } from '@ember/instrumentation';
     subscribe("render", {
      before(name, timestamp, payload) {
       },
       after(name, timestamp, payload) {
       }
    });
    ```
     If you return a value from the `before` callback, that same
    value will be passed as a fourth parameter to the `after`
    callback.
     Instrument a block of code by using `instrument`:
     ```javascript
    import { instrument } from '@ember/instrumentation';
     instrument("render.handlebars", payload, function() {
      // rendering logic
    }, binding);
    ```
     Event names passed to `instrument` are namespaced
    by periods, from more general to more specific. Subscribers
    can listen for events by whatever level of granularity they
    are interested in.
     In the above example, the event is `render.handlebars`,
    and the subscriber listened for all events beginning with
    `render`. It would receive callbacks for events named
    `render`, `render.handlebars`, `render.container`, or
    even `render.handlebars.layout`.
     @class Instrumentation
    @static
    @private
  */
  var subscribers = [];
  var cache = {};

  function populateListeners(name) {
    var listeners = [];
    var subscriber = void 0;

    for (var i = 0; i < subscribers.length; i++) {
      subscriber = subscribers[i];
      if (subscriber.regex.test(name)) {
        listeners.push(subscriber.object);
      }
    }

    cache[name] = listeners;
    return listeners;
  }

  var time = function () {
    var perf = 'undefined' !== typeof window ? window.performance || {} : {};
    var fn = perf.now || perf.mozNow || perf.webkitNow || perf.msNow || perf.oNow;
    // fn.bind will be available in all the browsers that support the advanced window.performance... ;-)
    return fn ? fn.bind(perf) : function () {
      return +new Date();
    };
  }();

  /**
    Notifies event's subscribers, calls `before` and `after` hooks.
     @method instrument
    @for @ember/instrumentation
    @static
    @param {String} [name] Namespaced event name.
    @param {Object} _payload
    @param {Function} callback Function that you're instrumenting.
    @param {Object} binding Context that instrument function is called with.
    @private
  */
  function instrument(name, _payload, callback, binding) {
    if (arguments.length <= 3 && typeof _payload === 'function') {
      binding = callback;
      callback = _payload;
      _payload = undefined;
    }
    if (subscribers.length === 0) {
      return callback.call(binding);
    }
    var payload = _payload || {};
    var finalizer = _instrumentStart(name, function () {
      return payload;
    });

    if (finalizer) {
      return withFinalizer(callback, finalizer, payload, binding);
    } else {
      return callback.call(binding);
    }
  }

  exports.flaggedInstrument = void 0;
  if (features.EMBER_IMPROVED_INSTRUMENTATION) {
    exports.flaggedInstrument = instrument;
  } else {
    exports.flaggedInstrument = function (name, payload, callback) {
      return callback();
    };
  }

  function withFinalizer(callback, finalizer, payload, binding) {
    var result = void 0;
    try {
      result = callback.call(binding);
    } catch (e) {
      payload.exception = e;
      result = payload;
    } finally {
      finalizer();
    }
    return result;
  }

  function NOOP() {}

  // private for now
  function _instrumentStart(name, _payload, _payloadParam) {
    if (subscribers.length === 0) {
      return NOOP;
    }

    var listeners = cache[name];

    if (!listeners) {
      listeners = populateListeners(name);
    }

    if (listeners.length === 0) {
      return NOOP;
    }

    var payload = _payload(_payloadParam);

    var STRUCTURED_PROFILE = emberEnvironment.ENV.STRUCTURED_PROFILE;
    var timeName = void 0;
    if (STRUCTURED_PROFILE) {
      timeName = name + ': ' + payload.object;
      console.time(timeName);
    }

    var beforeValues = new Array(listeners.length);
    var i = void 0,
        listener = void 0;
    var timestamp = time();
    for (i = 0; i < listeners.length; i++) {
      listener = listeners[i];
      beforeValues[i] = listener.before(name, timestamp, payload);
    }

    return function _instrumentEnd() {
      var i = void 0,
          listener = void 0;
      var timestamp = time();
      for (i = 0; i < listeners.length; i++) {
        listener = listeners[i];
        if (typeof listener.after === 'function') {
          listener.after(name, timestamp, payload, beforeValues[i]);
        }
      }

      if (STRUCTURED_PROFILE) {
        console.timeEnd(timeName);
      }
    };
  }

  /**
    Subscribes to a particular event or instrumented block of code.
     @method subscribe
    @for @ember/instrumentation
    @static
     @param {String} [pattern] Namespaced event name.
    @param {Object} [object] Before and After hooks.
     @return {Subscriber}
    @private
  */
  function subscribe(pattern, object) {
    var paths = pattern.split('.');
    var path = void 0;
    var regex = [];

    for (var i = 0; i < paths.length; i++) {
      path = paths[i];
      if (path === '*') {
        regex.push('[^\\.]*');
      } else {
        regex.push(path);
      }
    }

    regex = regex.join('\\.');
    regex = regex + '(\\..*)?';

    var subscriber = {
      pattern: pattern,
      regex: new RegExp('^' + regex + '$'),
      object: object
    };

    subscribers.push(subscriber);
    cache = {};

    return subscriber;
  }

  /**
    Unsubscribes from a particular event or instrumented block of code.
     @method unsubscribe
    @for @ember/instrumentation
    @static
     @param {Object} [subscriber]
    @private
  */
  function unsubscribe(subscriber) {
    var index = void 0;

    for (var i = 0; i < subscribers.length; i++) {
      if (subscribers[i] === subscriber) {
        index = i;
      }
    }

    subscribers.splice(index, 1);
    cache = {};
  }

  /**
    Resets `Instrumentation` by flushing list of subscribers.
     @method reset
    @for @ember/instrumentation
    @static
    @private
  */
  function reset() {
    subscribers.length = 0;
    cache = {};
  }

  /**
   @module @ember/utils
  */
  /**
    Returns true if the passed value is null or undefined. This avoids errors
    from JSLint complaining about use of ==, which can be technically
    confusing.
     ```javascript
    isNone();              // true
    isNone(null);          // true
    isNone(undefined);     // true
    isNone('');            // false
    isNone([]);            // false
    isNone(function() {}); // false
    ```
     @method isNone
    @static
    @for @ember/utils
    @param {Object} obj Value to test
    @return {Boolean}
    @public
  */
  function isNone(obj) {
    return obj === null || obj === undefined;
  }

  /**
   @module @ember/utils
  */
  /**
    Verifies that a value is `null` or `undefined`, an empty string, or an empty
    array.
     Constrains the rules on `isNone` by returning true for empty strings and
    empty arrays.
     If the value is an object with a `size` property of type number, it is used
    to check emptiness.
     ```javascript
    isEmpty();                 // true
    isEmpty(null);             // true
    isEmpty(undefined);        // true
    isEmpty('');               // true
    isEmpty([]);               // true
    isEmpty({ size: 0});       // true
    isEmpty({});               // false
    isEmpty('Adam Hawkins');   // false
    isEmpty([0,1,2]);          // false
    isEmpty('\n\t');           // false
    isEmpty('  ');             // false
    isEmpty({ size: 1 })       // false
    isEmpty({ size: () => 0 }) // false
    ```
     @method isEmpty
    @static
    @for @ember/utils
    @param {Object} obj Value to test
    @return {Boolean}
    @public
  */
  function isEmpty(obj) {
    var none = isNone(obj);
    if (none) {
      return none;
    }

    if (typeof obj.size === 'number') {
      return !obj.size;
    }

    var objectType = typeof obj;

    if (objectType === 'object') {
      var size = get(obj, 'size');
      if (typeof size === 'number') {
        return !size;
      }
    }

    if (typeof obj.length === 'number' && objectType !== 'function') {
      return !obj.length;
    }

    if (objectType === 'object') {
      var length = get(obj, 'length');
      if (typeof length === 'number') {
        return !length;
      }
    }

    return false;
  }

  /**
   @module @ember/utils
  */
  /**
    A value is blank if it is empty or a whitespace string.
     ```javascript
    import { isBlank } from '@ember/utils';
     isBlank();                // true
    isBlank(null);            // true
    isBlank(undefined);       // true
    isBlank('');              // true
    isBlank([]);              // true
    isBlank('\n\t');          // true
    isBlank('  ');            // true
    isBlank({});              // false
    isBlank('\n\t Hello');    // false
    isBlank('Hello world');   // false
    isBlank([1,2,3]);         // false
    ```
     @method isBlank
    @static
    @for @ember/utils
    @param {Object} obj Value to test
    @return {Boolean}
    @since 1.5.0
    @public
  */
  function isBlank(obj) {
    return isEmpty(obj) || typeof obj === 'string' && /\S/.test(obj) === false;
  }

  /**
   @module @ember/utils
  */
  /**
    A value is present if it not `isBlank`.
     ```javascript
    isPresent();                // false
    isPresent(null);            // false
    isPresent(undefined);       // false
    isPresent('');              // false
    isPresent('  ');            // false
    isPresent('\n\t');          // false
    isPresent([]);              // false
    isPresent({ length: 0 })    // false
    isPresent(false);           // true
    isPresent(true);            // true
    isPresent('string');        // true
    isPresent(0);               // true
    isPresent(function() {})    // true
    isPresent({});              // true
    isPresent(false);           // true
    isPresent('\n\t Hello');    // true
    isPresent([1,2,3]);         // true
    ```
     @method isPresent
    @static
    @for @ember/utils
    @param {Object} obj Value to test
    @return {Boolean}
    @since 1.8.0
    @public
  */
  function isPresent(obj) {
    return !isBlank(obj);
  }

  /**
   @module ember
  */
  /**
    Helper class that allows you to register your library with Ember.
     Singleton created at `Ember.libraries`.
     @class Libraries
    @constructor
    @private
  */
  var Libraries = function () {
    function Libraries() {
      emberBabel.classCallCheck(this, Libraries);

      this._registry = [];
      this._coreLibIndex = 0;
    }

    Libraries.prototype._getLibraryByName = function _getLibraryByName(name) {
      var libs = this._registry;
      var count = libs.length;

      for (var i = 0; i < count; i++) {
        if (libs[i].name === name) {
          return libs[i];
        }
      }
    };

    Libraries.prototype.register = function register(name, version, isCoreLibrary) {
      var index = this._registry.length;

      if (!this._getLibraryByName(name)) {
        if (isCoreLibrary) {
          index = this._coreLibIndex++;
        }
        this._registry.splice(index, 0, { name: name, version: version });
      } else {
        true && emberDebug.warn('Library "' + name + '" is already registered with Ember.', false, {
          id: 'ember-metal.libraries-register'
        });
      }
    };

    Libraries.prototype.registerCoreLibrary = function registerCoreLibrary(name, version) {
      this.register(name, version, true);
    };

    Libraries.prototype.deRegister = function deRegister(name) {
      var lib = this._getLibraryByName(name);
      var index = void 0;

      if (lib) {
        index = this._registry.indexOf(lib);
        this._registry.splice(index, 1);
      }
    };

    return Libraries;
  }();

  if (features.EMBER_LIBRARIES_ISREGISTERED) {
    Libraries.prototype.isRegistered = function (name) {
      return !!this._getLibraryByName(name);
    };
  }

  {
    Libraries.prototype.logVersions = function () {
      var libs = this._registry;
      var nameLengths = libs.map(function (item) {
        return get(item, 'name.length');
      });
      var maxNameLength = Math.max.apply(null, nameLengths);

      emberDebug.debug('-------------------------------');
      for (var i = 0; i < libs.length; i++) {
        var lib = libs[i];
        var spaces = new Array(maxNameLength - lib.name.length + 1).join(' ');
        emberDebug.debug([lib.name, spaces, ' : ', lib.version].join(''));
      }
      emberDebug.debug('-------------------------------');
    };
  }
  var LIBRARIES = new Libraries();
  LIBRARIES.registerCoreLibrary('Ember', VERSION);

  /**
  @module @ember/map
  @private
  */

  /*
    JavaScript (before ES6) does not have a Map implementation. Objects,
    which are often used as dictionaries, may only have Strings as keys.
     Because Ember has a way to get a unique identifier for every object
    via `guidFor`, we can implement a performant Map with arbitrary
    keys. Because it is commonly used in low-level bookkeeping, Map is
    implemented as a pure JavaScript object for performance.
     This implementation follows the current iteration of the ES6 proposal for
    maps (http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets),
    with one exception:  as we do not have the luxury of in-VM iteration, we implement a
    forEach method for iteration.
     Map is mocked out to look like an Ember object, so you can do
    `EmberMap.create()` for symmetry with other Ember classes.
  */

  function copyNull(obj) {
    var output = Object.create(null);

    for (var prop in obj) {
      // hasOwnPropery is not needed because obj is Object.create(null);
      output[prop] = obj[prop];
    }

    return output;
  }

  function copyMap(original, newObject) {
    var keys = original._keys.copy();
    var values = copyNull(original._values);

    newObject._keys = keys;
    newObject._values = values;
    newObject.size = original.size;

    return newObject;
  }

  /**
    This class is used internally by Ember and Ember Data.
    Please do not use it at this time. We plan to clean it up
    and add many tests soon.
     @class OrderedSet
    @namespace Ember
    @constructor
    @private
  */

  var OrderedSet = function () {
    function OrderedSet() {
      emberBabel.classCallCheck(this, OrderedSet);

      this.clear();
    }

    /**
      @method create
      @static
      @return {Ember.OrderedSet}
      @private
    */

    OrderedSet.create = function create() {
      var Constructor = this;
      return new Constructor();
    };

    /**
      @method clear
      @private
    */

    OrderedSet.prototype.clear = function clear() {
      this.presenceSet = Object.create(null);
      this.list = [];
      this.size = 0;
    };

    /**
      @method add
      @param obj
      @param guid (optional, and for internal use)
      @return {Ember.OrderedSet}
      @private
    */

    OrderedSet.prototype.add = function add(obj, _guid) {
      var guid = _guid || emberUtils.guidFor(obj);
      var presenceSet = this.presenceSet;
      var list = this.list;

      if (presenceSet[guid] !== true) {
        presenceSet[guid] = true;
        this.size = list.push(obj);
      }

      return this;
    };

    /**
      @since 1.8.0
      @method delete
      @param obj
      @param _guid (optional and for internal use only)
      @return {Boolean}
      @private
    */

    OrderedSet.prototype.delete = function _delete(obj, _guid) {
      var guid = _guid || emberUtils.guidFor(obj);
      var presenceSet = this.presenceSet;
      var list = this.list;

      if (presenceSet[guid] === true) {
        delete presenceSet[guid];
        var index = list.indexOf(obj);
        if (index > -1) {
          list.splice(index, 1);
        }
        this.size = list.length;
        return true;
      } else {
        return false;
      }
    };

    /**
      @method isEmpty
      @return {Boolean}
      @private
    */

    OrderedSet.prototype.isEmpty = function isEmpty() {
      return this.size === 0;
    };

    /**
      @method has
      @param obj
      @return {Boolean}
      @private
    */

    OrderedSet.prototype.has = function has(obj) {
      if (this.size === 0) {
        return false;
      }

      var guid = emberUtils.guidFor(obj);
      var presenceSet = this.presenceSet;

      return presenceSet[guid] === true;
    };

    /**
      @method forEach
      @param {Function} fn
      @param self
      @private
    */

    OrderedSet.prototype.forEach = function forEach(fn /*, ...thisArg*/) {
      true && !(typeof fn === 'function') && emberDebug.assert(Object.prototype.toString.call(fn) + ' is not a function', typeof fn === 'function');

      if (this.size === 0) {
        return;
      }

      var list = this.list;

      if (arguments.length === 2) {
        for (var i = 0; i < list.length; i++) {
          fn.call(arguments[1], list[i]);
        }
      } else {
        for (var _i = 0; _i < list.length; _i++) {
          fn(list[_i]);
        }
      }
    };

    /**
      @method toArray
      @return {Array}
      @private
    */

    OrderedSet.prototype.toArray = function toArray() {
      return this.list.slice();
    };

    /**
      @method copy
      @return {Ember.OrderedSet}
      @private
    */

    OrderedSet.prototype.copy = function copy() {
      var Constructor = this.constructor;
      var set = new Constructor();

      set.presenceSet = copyNull(this.presenceSet);
      set.list = this.toArray();
      set.size = this.size;

      return set;
    };

    return OrderedSet;
  }();

  /**
    A Map stores values indexed by keys. Unlike JavaScript's
    default Objects, the keys of a Map can be any JavaScript
    object.
     Internally, a Map has two data structures:
     1. `keys`: an OrderedSet of all of the existing keys
    2. `values`: a JavaScript Object indexed by the `guidFor(key)`
     When a key/value pair is added for the first time, we
    add the key to the `keys` OrderedSet, and create or
    replace an entry in `values`. When an entry is deleted,
    we delete its entry in `keys` and `values`.
     @class Map
    @private
    @constructor
  */

  var Map$1 = function () {
    function Map() {
      emberBabel.classCallCheck(this, Map);

      this._keys = new OrderedSet();
      this._values = Object.create(null);
      this.size = 0;
    }

    /**
      @method create
      @static
      @private
    */

    Map.create = function create() {
      var Constructor = this;
      return new Constructor();
    };

    /**
      Retrieve the value associated with a given key.
       @method get
      @param {*} key
      @return {*} the value associated with the key, or `undefined`
      @private
    */

    Map.prototype.get = function get(key) {
      if (this.size === 0) {
        return;
      }

      var values = this._values;
      var guid = emberUtils.guidFor(key);

      return values[guid];
    };

    /**
      Adds a value to the map. If a value for the given key has already been
      provided, the new value will replace the old value.
       @method set
      @param {*} key
      @param {*} value
      @return {Map}
      @private
    */

    Map.prototype.set = function set(key, value) {
      var keys = this._keys;
      var values = this._values;
      var guid = emberUtils.guidFor(key);

      // ensure we don't store -0
      var k = key === -0 ? 0 : key; // eslint-disable-line no-compare-neg-zero

      keys.add(k, guid);

      values[guid] = value;

      this.size = keys.size;

      return this;
    };

    /**
      Removes a value from the map for an associated key.
       @since 1.8.0
      @method delete
      @param {*} key
      @return {Boolean} true if an item was removed, false otherwise
      @private
    */

    Map.prototype.delete = function _delete(key) {
      if (this.size === 0) {
        return false;
      }
      // don't use ES6 "delete" because it will be annoying
      // to use in browsers that are not ES6 friendly;
      var keys = this._keys;
      var values = this._values;
      var guid = emberUtils.guidFor(key);

      if (keys.delete(key, guid)) {
        delete values[guid];
        this.size = keys.size;
        return true;
      } else {
        return false;
      }
    };

    /**
      Check whether a key is present.
       @method has
      @param {*} key
      @return {Boolean} true if the item was present, false otherwise
      @private
    */

    Map.prototype.has = function has(key) {
      return this._keys.has(key);
    };

    /**
      Iterate over all the keys and values. Calls the function once
      for each key, passing in value, key, and the map being iterated over,
      in that order.
       The keys are guaranteed to be iterated over in insertion order.
       @method forEach
      @param {Function} callback
      @param {*} self if passed, the `this` value inside the
        callback. By default, `this` is the map.
      @private
    */

    Map.prototype.forEach = function forEach(callback /*, ...thisArg*/) {
      true && !(typeof callback === 'function') && emberDebug.assert(Object.prototype.toString.call(callback) + ' is not a function', typeof callback === 'function');

      if (this.size === 0) {
        return;
      }

      var map = this;
      var cb = void 0,
          thisArg = void 0;

      if (arguments.length === 2) {
        thisArg = arguments[1];
        cb = function (key) {
          return callback.call(thisArg, map.get(key), key, map);
        };
      } else {
        cb = function (key) {
          return callback(map.get(key), key, map);
        };
      }

      this._keys.forEach(cb);
    };

    /**
      @method clear
      @private
    */

    Map.prototype.clear = function clear() {
      this._keys.clear();
      this._values = Object.create(null);
      this.size = 0;
    };

    /**
      @method copy
      @return {Map}
      @private
    */

    Map.prototype.copy = function copy() {
      return copyMap(this, new Map());
    };

    return Map;
  }();

  /**
    @class MapWithDefault
    @extends Map
    @private
    @constructor
    @param [options]
      @param {*} [options.defaultValue]
  */

  var MapWithDefault = function (_Map) {
    emberBabel.inherits(MapWithDefault, _Map);

    function MapWithDefault(options) {
      emberBabel.classCallCheck(this, MapWithDefault);

      var _this = emberBabel.possibleConstructorReturn(this, _Map.call(this));

      _this.defaultValue = options.defaultValue;
      return _this;
    }

    /**
      @method create
      @static
      @param [options]
        @param {*} [options.defaultValue]
      @return {MapWithDefault|Map} If options are passed, returns
        `MapWithDefault` otherwise returns `EmberMap`
      @private
    */

    MapWithDefault.create = function create(options) {
      if (options) {
        return new MapWithDefault(options);
      } else {
        return new Map$1();
      }
    };

    /**
      Retrieve the value associated with a given key.
       @method get
      @param {*} key
      @return {*} the value associated with the key, or the default value
      @private
    */

    MapWithDefault.prototype.get = function get(key) {
      var hasValue = this.has(key);

      if (hasValue) {
        return _Map.prototype.get.call(this, key);
      } else {
        var defaultValue = this.defaultValue(key);
        this.set(key, defaultValue);
        return defaultValue;
      }
    };

    /**
      @method copy
      @return {MapWithDefault}
      @private
    */

    MapWithDefault.prototype.copy = function copy() {
      var Constructor = this.constructor;
      return copyMap(this, new Constructor({
        defaultValue: this.defaultValue
      }));
    };

    return MapWithDefault;
  }(Map$1);

  /**
   @module @ember/object
  */

  /**
    To get multiple properties at once, call `getProperties`
    with an object followed by a list of strings or an array:
     ```javascript
    import { getProperties } from '@ember/object';
     getProperties(record, 'firstName', 'lastName', 'zipCode');
    // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
    ```
     is equivalent to:
     ```javascript
    import { getProperties } from '@ember/object';
     getProperties(record, ['firstName', 'lastName', 'zipCode']);
    // { firstName: 'John', lastName: 'Doe', zipCode: '10011' }
    ```
     @method getProperties
    @static
    @for @ember/object
    @param {Object} obj
    @param {String...|Array} list of keys to get
    @return {Object}
    @public
  */
  function getProperties(obj) {
    var ret = {};
    var propertyNames = arguments;
    var i = 1;

    if (arguments.length === 2 && Array.isArray(arguments[1])) {
      i = 0;
      propertyNames = arguments[1];
    }
    for (; i < propertyNames.length; i++) {
      ret[propertyNames[i]] = get(obj, propertyNames[i]);
    }
    return ret;
  }

  /**
   @module @ember/object
  */
  /**
    Set a list of properties on an object. These properties are set inside
    a single `beginPropertyChanges` and `endPropertyChanges` batch, so
    observers will be buffered.
     ```javascript
    import EmberObject from '@ember/object';
    let anObject = EmberObject.create();
     anObject.setProperties({
      firstName: 'Stanley',
      lastName: 'Stuart',
      age: 21
    });
    ```
     @method setProperties
    @static
    @for @ember/object
    @param obj
    @param {Object} properties
    @return properties
    @public
  */
  function setProperties(obj, properties) {
    if (properties === null || typeof properties !== 'object') {
      return properties;
    }
    changeProperties(function () {
      var props = Object.keys(properties);
      var propertyName = void 0;

      for (var i = 0; i < props.length; i++) {
        propertyName = props[i];

        set(obj, propertyName, properties[propertyName]);
      }
    });
    return properties;
  }

  // TODO, this only depends on context, otherwise it could be in utils
  // move into its own package
  // it is needed by Mixin for classToString
  // maybe move it into environment

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  var searchDisabled = false;

  var flags = {
    _set: 0,
    _unprocessedNamespaces: false,
    get unprocessedNamespaces() {
      return this._unprocessedNamespaces;
    },
    set unprocessedNamespaces(v) {
      this._set++;
      this._unprocessedNamespaces = v;
    }
  };

  var unprocessedMixins = false;

  var NAMESPACES = [];
  var NAMESPACES_BY_ID = Object.create(null);

  function addNamespace(namespace) {
    flags.unprocessedNamespaces = true;
    NAMESPACES.push(namespace);
  }

  function removeNamespace(namespace) {
    var id = namespace.toString();
    if (id) {
      delete NAMESPACES_BY_ID[id];
      if (namespace === emberEnvironment.context.lookup[id]) {
        emberEnvironment.context.lookup[id] = undefined;
      }
    }

    NAMESPACES.splice(NAMESPACES.indexOf(namespace), 1);
  }

  function findNamespaces() {
    if (!flags.unprocessedNamespaces) {
      return;
    }
    var lookup = emberEnvironment.context.lookup;
    var keys = Object.keys(lookup);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // Only process entities that start with uppercase A-Z
      if (!isUppercase(key.charCodeAt(0))) {
        continue;
      }
      var obj = tryIsNamespace(lookup, key);
      if (obj) {
        emberUtils.setName(obj, key);
      }
    }
  }

  function findNamespace(name) {
    if (!searchDisabled) {
      processAllNamespaces();
    }
    return NAMESPACES_BY_ID[name];
  }

  function processNamespace(namespace) {
    _processNamespace([namespace.toString()], namespace, new Set());
  }

  function processAllNamespaces() {
    var unprocessedNamespaces = flags.unprocessedNamespaces;
    if (unprocessedNamespaces) {
      findNamespaces();
      flags.unprocessedNamespaces = false;
    }

    if (unprocessedNamespaces || unprocessedMixins) {
      var namespaces = NAMESPACES;

      for (var i = 0; i < namespaces.length; i++) {
        processNamespace(namespaces[i]);
      }

      unprocessedMixins = false;
    }
  }

  function classToString() {
    var name = emberUtils.getName(this);
    if (name !== void 0) {
      return name;
    }
    name = calculateToString(this);
    emberUtils.setName(this, name);
    return name;
  }

  function isSearchDisabled() {
    return searchDisabled;
  }

  function setSearchDisabled(flag) {
    searchDisabled = !!flag;
  }

  function setUnprocessedMixins() {
    unprocessedMixins = true;
  }

  function _processNamespace(paths, root, seen) {
    var idx = paths.length;

    NAMESPACES_BY_ID[paths.join('.')] = root;

    // Loop over all of the keys in the namespace, looking for classes
    for (var key in root) {
      if (!hasOwnProperty.call(root, key)) {
        continue;
      }
      var obj = root[key];

      // If we are processing the `Ember` namespace, for example, the
      // `paths` will start with `["Ember"]`. Every iteration through
      // the loop will update the **second** element of this list with
      // the key, so processing `Ember.View` will make the Array
      // `['Ember', 'View']`.
      paths[idx] = key;

      // If we have found an unprocessed class
      if (obj && obj.toString === classToString && emberUtils.getName(obj) === void 0) {
        // Replace the class' `toString` with the dot-separated path
        emberUtils.setName(obj, paths.join('.'));
        // Support nested namespaces
      } else if (obj && obj.isNamespace) {
        // Skip aliased namespaces
        if (seen.has(obj)) {
          continue;
        }
        seen.add(obj);

        // Process the child namespace
        _processNamespace(paths, obj, seen);
      }
    }

    paths.length = idx; // cut out last item
  }

  function isUppercase(code) {
    return code >= 65 && code <= 90 // A
    ; // Z
  }

  function tryIsNamespace(lookup, prop) {
    try {
      var obj = lookup[prop];
      return (obj !== null && typeof obj === 'object' || typeof obj === 'function') && obj.isNamespace && obj;
    } catch (e) {
      // continue
    }
  }

  function calculateToString(target) {
    var str = void 0;

    if (!searchDisabled) {
      processAllNamespaces();

      str = emberUtils.getName(target);
      if (str !== void 0) {
        return str;
      }
      var superclass = target;
      do {
        superclass = Object.getPrototypeOf(superclass);
        if (superclass === Function.prototype || superclass === Object.prototype) {
          break;
        }
        str = emberUtils.getName(target);
        if (str !== void 0) {
          str = '(subclass of ' + str + ')';
          break;
        }
      } while (str === void 0);
    }
    return str || '(unknown)';
  }

  var a_concat = Array.prototype.concat;
  var isArray = Array.isArray;

  function isMethod(obj) {
    return 'function' === typeof obj && obj.isMethod !== false && obj !== Boolean && obj !== Object && obj !== Number && obj !== Array && obj !== Date && obj !== String;
  }

  var CONTINUE = {};

  function mixinProperties(mixinsMeta, mixin) {
    if (mixin instanceof Mixin) {
      if (mixinsMeta.hasMixin(mixin)) {
        return CONTINUE;
      }
      mixinsMeta.addMixin(mixin);
      return mixin.properties;
    } else {
      return mixin; // apply anonymous mixin properties
    }
  }

  function concatenatedMixinProperties(concatProp, props, values, base) {
    // reset before adding each new mixin to pickup concats from previous
    var concats = values[concatProp] || base[concatProp];
    if (props[concatProp]) {
      concats = concats ? a_concat.call(concats, props[concatProp]) : props[concatProp];
    }
    return concats;
  }

  function giveDescriptorSuper(meta$$1, key, property, values, descs, base) {
    var superProperty = void 0;

    // Computed properties override methods, and do not call super to them
    if (values[key] === undefined) {
      // Find the original descriptor in a parent mixin
      superProperty = descs[key];
    }

    // If we didn't find the original descriptor in a parent mixin, find
    // it on the original object.
    if (!superProperty) {
      superProperty = descriptorFor(base, key, meta$$1);
    }

    if (superProperty === undefined || !(superProperty instanceof ComputedProperty)) {
      return property;
    }

    // Since multiple mixins may inherit from the same parent, we need
    // to clone the computed property so that other mixins do not receive
    // the wrapped version.
    property = Object.create(property);
    property._getter = emberUtils.wrap(property._getter, superProperty._getter);
    if (superProperty._setter) {
      if (property._setter) {
        property._setter = emberUtils.wrap(property._setter, superProperty._setter);
      } else {
        property._setter = superProperty._setter;
      }
    }

    return property;
  }

  function giveMethodSuper(obj, key, method, values, descs) {
    // Methods overwrite computed properties, and do not call super to them.
    if (descs[key] !== undefined) {
      return method;
    }

    // Find the original method in a parent mixin
    var superMethod = values[key];

    // If we didn't find the original value in a parent mixin, find it in
    // the original object
    if (superMethod === undefined && (!features.EMBER_METAL_ES5_GETTERS || descriptorFor(obj, key) === undefined)) {
      superMethod = obj[key];
    }

    // Only wrap the new method if the original method was a function
    if (typeof superMethod === 'function') {
      return emberUtils.wrap(method, superMethod);
    }

    return method;
  }

  function applyConcatenatedProperties(obj, key, value, values) {
    var baseValue = values[key] || obj[key];
    var ret = emberUtils.makeArray(baseValue).concat(emberUtils.makeArray(value));

    {
      // it is possible to use concatenatedProperties with strings (which cannot be frozen)
      // only freeze objects...
      if (typeof ret === 'object' && ret !== null) {
        // prevent mutating `concatenatedProperties` array after it is applied
        Object.freeze(ret);
      }
    }

    return ret;
  }

  function applyMergedProperties(obj, key, value, values) {
    var baseValue = values[key] || obj[key];

    true && !!isArray(value) && emberDebug.assert('You passed in `' + JSON.stringify(value) + '` as the value for `' + key + '` but `' + key + '` cannot be an Array', !isArray(value));

    if (!baseValue) {
      return value;
    }

    var newBase = emberUtils.assign({}, baseValue);
    var hasFunction = false;

    for (var prop in value) {
      if (!value.hasOwnProperty(prop)) {
        continue;
      }

      var propValue = value[prop];
      if (isMethod(propValue)) {
        // TODO: support for Computed Properties, etc?
        hasFunction = true;
        newBase[prop] = giveMethodSuper(obj, prop, propValue, baseValue, {});
      } else {
        newBase[prop] = propValue;
      }
    }

    if (hasFunction) {
      newBase._super = emberUtils.ROOT;
    }

    return newBase;
  }

  function addNormalizedProperty(base, key, value, meta$$1, descs, values, concats, mergings) {
    if (value instanceof Descriptor) {
      // Wrap descriptor function to implement
      // _super() if needed
      if (value._getter) {
        value = giveDescriptorSuper(meta$$1, key, value, values, descs, base);
      }

      descs[key] = value;
      values[key] = undefined;
    } else {
      if (concats && concats.indexOf(key) >= 0 || key === 'concatenatedProperties' || key === 'mergedProperties') {
        value = applyConcatenatedProperties(base, key, value, values);
      } else if (mergings && mergings.indexOf(key) > -1) {
        value = applyMergedProperties(base, key, value, values);
      } else if (isMethod(value)) {
        value = giveMethodSuper(base, key, value, values, descs);
      }

      descs[key] = undefined;
      values[key] = value;
    }
  }

  function mergeMixins(mixins, meta$$1, descs, values, base, keys) {
    var currentMixin = void 0,
        props = void 0,
        key = void 0,
        concats = void 0,
        mergings = void 0;

    function removeKeys(keyName) {
      delete descs[keyName];
      delete values[keyName];
    }

    for (var i = 0; i < mixins.length; i++) {
      currentMixin = mixins[i];
      true && !(typeof currentMixin === 'object' && currentMixin !== null && Object.prototype.toString.call(currentMixin) !== '[object Array]') && emberDebug.assert('Expected hash or Mixin instance, got ' + Object.prototype.toString.call(currentMixin), typeof currentMixin === 'object' && currentMixin !== null && Object.prototype.toString.call(currentMixin) !== '[object Array]');

      props = mixinProperties(meta$$1, currentMixin);
      if (props === CONTINUE) {
        continue;
      }

      if (props) {
        // remove willMergeMixin after 3.4 as it was used for _actions
        if (base.willMergeMixin) {
          base.willMergeMixin(props);
        }
        concats = concatenatedMixinProperties('concatenatedProperties', props, values, base);
        mergings = concatenatedMixinProperties('mergedProperties', props, values, base);

        for (key in props) {
          if (!props.hasOwnProperty(key)) {
            continue;
          }
          keys.push(key);
          addNormalizedProperty(base, key, props[key], meta$$1, descs, values, concats, mergings);
        }

        // manually copy toString() because some JS engines do not enumerate it
        if (props.hasOwnProperty('toString')) {
          base.toString = props.toString;
        }
      } else if (currentMixin.mixins) {
        mergeMixins(currentMixin.mixins, meta$$1, descs, values, base, keys);
        if (currentMixin._without) {
          currentMixin._without.forEach(removeKeys);
        }
      }
    }
  }

  function followAlias(obj, desc, descs, values) {
    var altKey = desc.methodName;
    var value = void 0;
    var possibleDesc = void 0;
    if (descs[altKey] || values[altKey]) {
      value = values[altKey];
      desc = descs[altKey];
    } else if ((possibleDesc = descriptorFor(obj, altKey)) !== undefined) {
      desc = possibleDesc;
      value = undefined;
    } else {
      desc = undefined;
      value = obj[altKey];
    }

    return { desc: desc, value: value };
  }

  function updateObserversAndListeners(obj, key, paths, updateMethod) {
    if (paths) {
      for (var i = 0; i < paths.length; i++) {
        updateMethod(obj, paths[i], null, key);
      }
    }
  }

  function replaceObserversAndListeners(obj, key, prev, next) {
    if (typeof prev === 'function') {
      updateObserversAndListeners(obj, key, prev.__ember_observes__, removeObserver);
      updateObserversAndListeners(obj, key, prev.__ember_listens__, removeListener);
    }

    if (typeof next === 'function') {
      updateObserversAndListeners(obj, key, next.__ember_observes__, addObserver);
      updateObserversAndListeners(obj, key, next.__ember_listens__, addListener);
    }
  }

  function applyMixin(obj, mixins, partial) {
    var descs = {};
    var values = {};
    var meta$$1 = meta(obj);
    var keys = [];
    var key = void 0,
        value = void 0,
        desc = void 0;

    obj._super = emberUtils.ROOT;

    // Go through all mixins and hashes passed in, and:
    //
    // * Handle concatenated properties
    // * Handle merged properties
    // * Set up _super wrapping if necessary
    // * Set up computed property descriptors
    // * Copying `toString` in broken browsers
    mergeMixins(mixins, meta$$1, descs, values, obj, keys);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (key === 'constructor' || !values.hasOwnProperty(key)) {
        continue;
      }

      desc = descs[key];
      value = values[key];

      while (desc && desc instanceof Alias) {
        var followed = followAlias(obj, desc, descs, values);
        desc = followed.desc;
        value = followed.value;
      }

      if (desc === undefined && value === undefined) {
        continue;
      }

      if (features.EMBER_METAL_ES5_GETTERS && descriptorFor(obj, key) !== undefined) {
        replaceObserversAndListeners(obj, key, null, value);
      } else {
        replaceObserversAndListeners(obj, key, obj[key], value);
      }

      if (emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && typeof Mixin.detectBinding === 'function' && Mixin.detectBinding(key)) {
        meta$$1.writeBindings(key, value);
      }

      defineProperty(obj, key, desc, value, meta$$1);
    }

    if (emberEnvironment.ENV._ENABLE_BINDING_SUPPORT && !partial && typeof Mixin.finishProtype === 'function') {
      Mixin.finishPartial(obj, meta$$1);
    }

    return obj;
  }

  /**
    @method mixin
    @param obj
    @param mixins*
    @return obj
    @private
  */
  function mixin(obj) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    applyMixin(obj, args, false);
    return obj;
  }

  /**
    The `Mixin` class allows you to create mixins, whose properties can be
    added to other classes. For instance,
     ```javascript
    import Mixin from '@ember/object/mixin';
     const EditableMixin = Mixin.create({
      edit() {
        console.log('starting to edit');
        this.set('isEditing', true);
      },
      isEditing: false
    });
    ```
     ```javascript
    import EmberObject from '@ember/object';
    import EditableMixin from '../mixins/editable';
     // Mix mixins into classes by passing them as the first arguments to
    // `.extend.`
    const Comment = EmberObject.extend(EditableMixin, {
      post: null
    });
     let comment = Comment.create({
      post: somePost
    });
     comment.edit(); // outputs 'starting to edit'
    ```
     Note that Mixins are created with `Mixin.create`, not
    `Mixin.extend`.
     Note that mixins extend a constructor's prototype so arrays and object literals
    defined as properties will be shared amongst objects that implement the mixin.
    If you want to define a property in a mixin that is not shared, you can define
    it either as a computed property or have it be created on initialization of the object.
     ```javascript
    // filters array will be shared amongst any object implementing mixin
    import Mixin from '@ember/object/mixin';
    import { A } from '@ember/array';
     const FilterableMixin = Mixin.create({
      filters: A()
    });
    ```
     ```javascript
    import Mixin from '@ember/object/mixin';
    import { A } from '@ember/array';
    import { computed } from '@ember/object';
     // filters will be a separate array for every object implementing the mixin
    const FilterableMixin = Mixin.create({
      filters: computed(function() {
        return A();
      })
    });
    ```
     ```javascript
    import Mixin from '@ember/object/mixin';
    import { A } from '@ember/array';
     // filters will be created as a separate array during the object's initialization
    const Filterable = Mixin.create({
      filters: null,
       init() {
        this._super(...arguments);
        this.set("filters", A());
      }
    });
    ```
     @class Mixin
    @public
  */

  var Mixin = function () {
    function Mixin(mixins, properties) {
      emberBabel.classCallCheck(this, Mixin);

      this.properties = properties;
      this.mixins = buildMixinsArray(mixins);
      this.ownerConstructor = undefined;
      this._without = undefined;

      {
        this[emberUtils.NAME_KEY] = undefined;
        /*
          In debug builds, we seal mixins to help avoid performance pitfalls.
           In IE11 there is a quirk that prevents sealed objects from being added
          to a WeakMap. Unfortunately, the mixin system currently relies on
          weak maps in `guidFor`, so we need to prime the guid cache weak map.
        */
        emberUtils.guidFor(this);
        Object.seal(this);
      }
    }

    Mixin._apply = function _apply() {
      return applyMixin.apply(undefined, arguments);
    };

    Mixin.applyPartial = function applyPartial(obj) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return applyMixin(obj, args, true);
    };

    /**
      @method create
      @for @ember/object/mixin
      @static
      @param arguments*
      @public
    */

    Mixin.create = function create() {
      // ES6TODO: this relies on a global state?
      setUnprocessedMixins();
      var M = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return new M(args, undefined);
    };

    // returns the mixins currently applied to the specified object
    // TODO: Make `mixin`


    Mixin.mixins = function mixins(obj) {
      var meta$$1 = peekMeta(obj);
      var ret = [];
      if (meta$$1 === undefined) {
        return ret;
      }

      meta$$1.forEachMixins(function (currentMixin) {
        // skip primitive mixins since these are always anonymous
        if (!currentMixin.properties) {
          ret.push(currentMixin);
        }
      });

      return ret;
    };

    /**
      @method reopen
      @param arguments*
      @private
    */

    Mixin.prototype.reopen = function reopen() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      if (args.length === 0) {
        return;
      }

      if (this.properties) {
        var currentMixin = new Mixin(undefined, this.properties);
        this.properties = undefined;
        this.mixins = [currentMixin];
      } else if (!this.mixins) {
        this.mixins = [];
      }

      this.mixins = this.mixins.concat(buildMixinsArray(args));
      return this;
    };

    /**
      @method apply
      @param obj
      @return applied object
      @private
    */

    Mixin.prototype.apply = function apply(obj) {
      return applyMixin(obj, [this], false);
    };

    Mixin.prototype.applyPartial = function applyPartial(obj) {
      return applyMixin(obj, [this], true);
    };

    /**
      @method detect
      @param obj
      @return {Boolean}
      @private
    */

    Mixin.prototype.detect = function detect(obj) {
      if (typeof obj !== 'object' || obj === null) {
        return false;
      }
      if (obj instanceof Mixin) {
        return _detect(obj, this);
      }
      var meta$$1 = peekMeta(obj);
      if (meta$$1 === undefined) {
        return false;
      }
      return meta$$1.hasMixin(this);
    };

    Mixin.prototype.without = function without() {
      var ret = new Mixin([this]);

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      ret._without = args;
      return ret;
    };

    Mixin.prototype.keys = function keys() {
      return _keys(this);
    };

    Mixin.prototype.toString = function toString() {
      return '(unknown mixin)';
    };

    return Mixin;
  }();

  function buildMixinsArray(mixins) {
    var length = mixins && mixins.length;
    var m = void 0;

    if (length > 0) {
      m = new Array(length);
      for (var i = 0; i < length; i++) {
        var x = mixins[i];
        true && !(typeof x === 'object' && x !== null && Object.prototype.toString.call(x) !== '[object Array]') && emberDebug.assert('Expected hash or Mixin instance, got ' + Object.prototype.toString.call(x), typeof x === 'object' && x !== null && Object.prototype.toString.call(x) !== '[object Array]');

        if (x instanceof Mixin) {
          m[i] = x;
        } else {
          m[i] = new Mixin(undefined, x);
        }
      }
    }

    return m;
  }

  if (emberEnvironment.ENV._ENABLE_BINDING_SUPPORT) {
    // slotting this so that the legacy addon can add the function here
    // without triggering an error due to the Object.seal done below
    Mixin.finishPartial = null;
    Mixin.detectBinding = null;
  }

  Mixin.prototype.toString = classToString;

  {
    Mixin.prototype[emberUtils.NAME_KEY] = undefined;
    Object.seal(Mixin.prototype);
  }

  function _detect(curMixin, targetMixin) {
    var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

    if (seen.has(curMixin)) {
      return false;
    }
    seen.add(curMixin);

    if (curMixin === targetMixin) {
      return true;
    }
    var mixins = curMixin.mixins;
    if (mixins) {
      return mixins.some(function (mixin) {
        return _detect(mixin, targetMixin, seen);
      });
    }

    return false;
  }

  function _keys(mixin) {
    var ret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
    var seen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

    if (seen.has(mixin)) {
      return;
    }
    seen.add(mixin);

    if (mixin.properties) {
      var props = Object.keys(mixin.properties);
      for (var i = 0; i < props.length; i++) {
        ret.add(props[i]);
      }
    } else if (mixin.mixins) {
      mixin.mixins.forEach(function (x) {
        return _keys(x, ret, seen);
      });
    }

    return ret;
  }

  var Alias = function (_Descriptor) {
    emberBabel.inherits(Alias, _Descriptor);

    function Alias(methodName) {
      emberBabel.classCallCheck(this, Alias);

      var _this = emberBabel.possibleConstructorReturn(this, _Descriptor.call(this));

      _this.methodName = methodName;
      return _this;
    }

    return Alias;
  }(Descriptor);

  /**
    Makes a method available via an additional name.
     ```app/utils/person.js
    import EmberObject, {
      aliasMethod
    } from '@ember/object';
     export default EmberObject.extend({
      name() {
        return 'Tomhuda Katzdale';
      },
      moniker: aliasMethod('name')
    });
    ```
     ```javascript
    let goodGuy = Person.create();
     goodGuy.name();    // 'Tomhuda Katzdale'
    goodGuy.moniker(); // 'Tomhuda Katzdale'
    ```
     @method aliasMethod
    @static
    @for @ember/object
    @param {String} methodName name of the method to alias
    @public
  */

  function aliasMethod(methodName) {
    return new Alias(methodName);
  }

  // ..........................................................
  // OBSERVER HELPER
  //

  /**
    Specify a method that observes property changes.
     ```javascript
    import EmberObject from '@ember/object';
    import { observer } from '@ember/object';
     export default EmberObject.extend({
      valueObserver: observer('value', function() {
        // Executes whenever the "value" property changes
      })
    });
    ```
     Also available as `Function.prototype.observes` if prototype extensions are
    enabled.
     @method observer
    @for @ember/object
    @param {String} propertyNames*
    @param {Function} func
    @return func
    @public
    @static
  */
  function observer() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var func = args.pop();
    var _paths = args;

    true && !(typeof func === 'function') && emberDebug.assert('observer called without a function', typeof func === 'function');
    true && !(_paths.length > 0 && _paths.every(function (p) {
      return typeof p === 'string' && p.length;
    })) && emberDebug.assert('observer called without valid path', _paths.length > 0 && _paths.every(function (p) {
      return typeof p === 'string' && p.length;
    }));

    var paths = [];
    var addWatchedProperty = function (path) {
      return paths.push(path);
    };

    for (var i = 0; i < _paths.length; ++i) {
      expandProperties(_paths[i], addWatchedProperty);
    }

    func.__ember_observes__ = paths;
    return func;
  }

  /**
   @module ember
   @private
   */

  /**
    Read-only property that returns the result of a container lookup.
     @class InjectedProperty
    @namespace Ember
    @constructor
    @param {String} type The container type the property will lookup
    @param {String} name (optional) The name the property will lookup, defaults
           to the property's name
    @private
  */

  var InjectedProperty = function (_ComputedProperty) {
    emberBabel.inherits(InjectedProperty, _ComputedProperty);

    function InjectedProperty(type, name, options) {
      emberBabel.classCallCheck(this, InjectedProperty);

      var _this = emberBabel.possibleConstructorReturn(this, _ComputedProperty.call(this, injectedPropertyGet));

      _this.type = type;
      _this.source = options ? options.source : undefined;

      if (name) {
        var namespaceDelimiterOffset = name.indexOf('::');
        if (namespaceDelimiterOffset === -1) {
          _this.name = name;
          _this.namespace = undefined;
        } else {
          _this.name = name.slice(namespaceDelimiterOffset + 2);
          _this.namespace = name.slice(0, namespaceDelimiterOffset);
        }
      } else {
        _this.name = undefined;
      }
      return _this;
    }

    return InjectedProperty;
  }(ComputedProperty);

  function injectedPropertyGet(keyName) {
    var desc = descriptorFor(this, keyName);
    var owner = emberUtils.getOwner(this) || this.container; // fallback to `container` for backwards compat

    true && !(desc && desc.type) && emberDebug.assert('InjectedProperties should be defined with the inject computed property macros.', desc && desc.type);
    true && !owner && emberDebug.assert('Attempting to lookup an injected property on an object without a container, ensure that the object was instantiated via a container.', owner);

    var specifier = desc.type + ':' + (desc.name || keyName);
    return owner.lookup(specifier, {
      source: desc.source,
      namespace: desc.namespace
    });
  }

  function descriptor(desc) {
    return new Descriptor$1(desc);
  }

  /**
    A wrapper for a native ES5 descriptor. In an ideal world, we wouldn't need
    this at all, however, the way we currently flatten/merge our mixins require
    a special value to denote a descriptor.
     @class Descriptor
    @private
  */

  var Descriptor$1 = function (_EmberDescriptor) {
    emberBabel.inherits(Descriptor$$1, _EmberDescriptor);

    function Descriptor$$1(desc) {
      emberBabel.classCallCheck(this, Descriptor$$1);

      var _this = emberBabel.possibleConstructorReturn(this, _EmberDescriptor.call(this));

      _this.desc = desc;
      _this.enumerable = desc.enumerable;
      return _this;
    }

    Descriptor$$1.prototype.setup = function setup(obj, key) {
      Object.defineProperty(obj, key, this.desc);
    };

    Descriptor$$1.prototype.get = function get(obj, key) {
      return obj[key];
    };

    Descriptor$$1.prototype.set = function set(obj, key, value) {
      return obj[key] = value;
    };

    Descriptor$$1.prototype.teardown = function teardown() {};

    return Descriptor$$1;
  }(Descriptor);

  exports.computed = computed;
  exports.getCacheFor = getCacheFor;
  exports.getCachedValueFor = getCachedValueFor;
  exports.peekCacheFor = peekCacheFor;
  exports.ComputedProperty = ComputedProperty;
  exports._globalsComputed = _globalsComputed;
  exports.alias = alias;
  exports.merge = merge;
  exports.deprecateProperty = deprecateProperty;
  exports.instrument = instrument;
  exports._instrumentStart = _instrumentStart;
  exports.instrumentationReset = reset;
  exports.instrumentationSubscribe = subscribe;
  exports.instrumentationUnsubscribe = unsubscribe;
  exports.getOnerror = getOnerror;
  exports.setOnerror = setOnerror;
  exports.setDispatchOverride = setDispatchOverride;
  exports.getDispatchOverride = getDispatchOverride;
  exports.descriptorFor = descriptorFor;
  exports.meta = meta;
  exports.peekMeta = peekMeta;
  exports.deleteMeta = deleteMeta;
  exports.Cache = Cache;
  exports.PROXY_CONTENT = PROXY_CONTENT;
  exports._getPath = _getPath;
  exports.get = get;
  exports.getWithDefault = getWithDefault;
  exports.set = set;
  exports.trySet = trySet;
  exports.objectAt = objectAt;
  exports.replace = replace;
  exports.replaceInNativeArray = replaceInNativeArray;
  exports.addArrayObserver = addArrayObserver;
  exports.removeArrayObserver = removeArrayObserver;
  exports.arrayContentWillChange = arrayContentWillChange;
  exports.arrayContentDidChange = arrayContentDidChange;
  exports.eachProxyFor = eachProxyFor;
  exports.eachProxyArrayWillChange = eachProxyArrayWillChange;
  exports.eachProxyArrayDidChange = eachProxyArrayDidChange;
  exports.addListener = addListener;
  exports.hasListeners = hasListeners;
  exports.on = on;
  exports.removeListener = removeListener;
  exports.sendEvent = sendEvent;
  exports.isNone = isNone;
  exports.isEmpty = isEmpty;
  exports.isBlank = isBlank;
  exports.isPresent = isPresent;
  exports.getCurrentRunLoop = getCurrentRunLoop;
  exports.backburner = backburner;
  exports.run = run;
  exports.join = join;
  exports.bind = bind;
  exports.begin = begin;
  exports.end = end;
  exports.schedule = schedule;
  exports.hasScheduledTimers = hasScheduledTimers;
  exports.cancelTimers = cancelTimers;
  exports.later = later;
  exports.once = once;
  exports.scheduleOnce = scheduleOnce;
  exports.next = next;
  exports.cancel = cancel;
  exports.debounce = debounce;
  exports.throttle = throttle;
  exports._globalsRun = _globalsRun;
  exports.beginPropertyChanges = beginPropertyChanges;
  exports.changeProperties = changeProperties;
  exports.endPropertyChanges = endPropertyChanges;
  exports.notifyPropertyChange = notifyPropertyChange;
  exports.overrideChains = overrideChains;
  exports.propertyDidChange = propertyDidChange;
  exports.propertyWillChange = propertyWillChange;
  exports.PROPERTY_DID_CHANGE = PROPERTY_DID_CHANGE;
  exports.defineProperty = defineProperty;
  exports.Descriptor = Descriptor;
  exports.watchKey = watchKey;
  exports.unwatchKey = unwatchKey;
  exports.ChainNode = ChainNode;
  exports.finishChains = finishChains;
  exports.removeChainWatcher = removeChainWatcher;
  exports.watchPath = watchPath;
  exports.unwatchPath = unwatchPath;
  exports.isWatching = isWatching;
  exports.unwatch = unwatch;
  exports.watch = watch;
  exports.watcherCount = watcherCount;
  exports.libraries = LIBRARIES;
  exports.Libraries = Libraries;
  exports.Map = Map$1;
  exports.MapWithDefault = MapWithDefault;
  exports.OrderedSet = OrderedSet;
  exports.getProperties = getProperties;
  exports.setProperties = setProperties;
  exports.expandProperties = expandProperties;
  exports.addObserver = addObserver;
  exports.removeObserver = removeObserver;
  exports.Mixin = Mixin;
  exports.aliasMethod = aliasMethod;
  exports.mixin = mixin;
  exports.observer = observer;
  exports.InjectedProperty = InjectedProperty;
  exports.setHasViews = setHasViews;
  exports.tagForProperty = tagForProperty;
  exports.tagFor = tagFor;
  exports.markObjectAsDirty = markObjectAsDirty;
  exports.descriptor = descriptor;
  exports.tracked = tracked;
  exports.NAMESPACES = NAMESPACES;
  exports.NAMESPACES_BY_ID = NAMESPACES_BY_ID;
  exports.addNamespace = addNamespace;
  exports.classToString = classToString;
  exports.findNamespace = findNamespace;
  exports.findNamespaces = findNamespaces;
  exports.processNamespace = processNamespace;
  exports.processAllNamespaces = processAllNamespaces;
  exports.removeNamespace = removeNamespace;
  exports.isNamespaceSearchDisabled = isSearchDisabled;
  exports.setNamespaceSearchDisabled = setSearchDisabled;

  Object.defineProperty(exports, '__esModule', { value: true });
});
enifed('rsvp', ['exports', 'ember-babel', 'node-module'], function (exports, _emberBabel, _nodeModule) {
  'use strict';

  exports.filter = exports.async = exports.map = exports.reject = exports.resolve = exports.off = exports.on = exports.configure = exports.denodeify = exports.defer = exports.rethrow = exports.hashSettled = exports.hash = exports.race = exports.allSettled = exports.all = exports.EventTarget = exports.Promise = exports.cast = exports.asap = undefined;
  function callbacksFor(object) {
    var callbacks = object._promiseCallbacks;

    if (!callbacks) {
      callbacks = object._promiseCallbacks = {};
    }

    return callbacks;
  }

  /**
    @class RSVP.EventTarget
  */
  var EventTarget = {
    mixin: function (object) {
      object.on = this.on;
      object.off = this.off;
      object.trigger = this.trigger;
      object._promiseCallbacks = undefined;
      return object;
    },
    on: function (eventName, callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('Callback must be a function');
      }

      var allCallbacks = callbacksFor(this);
      var callbacks = allCallbacks[eventName];

      if (!callbacks) {
        callbacks = allCallbacks[eventName] = [];
      }

      if (callbacks.indexOf(callback) === -1) {
        callbacks.push(callback);
      }
    },
    off: function (eventName, callback) {
      var allCallbacks = callbacksFor(this);

      if (!callback) {
        allCallbacks[eventName] = [];
        return;
      }

      var callbacks = allCallbacks[eventName];
      var index = callbacks.indexOf(callback);

      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    },
    trigger: function (eventName, options, label) {
      var allCallbacks = callbacksFor(this);

      var callbacks = allCallbacks[eventName];
      if (callbacks) {
        // Don't cache the callbacks.length since it may grow
        var callback = void 0;
        for (var i = 0; i < callbacks.length; i++) {
          callback = callbacks[i];
          callback(options, label);
        }
      }
    }
  };

  var config = {
    instrument: false
  };

  EventTarget['mixin'](config);

  function configure(name, value) {
    if (arguments.length === 2) {
      config[name] = value;
    } else {
      return config[name];
    }
  }

  var queue = [];

  function scheduleFlush() {
    setTimeout(function () {
      for (var i = 0; i < queue.length; i++) {
        var entry = queue[i];

        var payload = entry.payload;

        payload.guid = payload.key + payload.id;
        payload.childGuid = payload.key + payload.childId;
        if (payload.error) {
          payload.stack = payload.error.stack;
        }

        config['trigger'](entry.name, entry.payload);
      }
      queue.length = 0;
    }, 50);
  }

  function instrument(eventName, promise, child) {
    if (1 === queue.push({
      name: eventName,
      payload: {
        key: promise._guidKey,
        id: promise._id,
        eventName: eventName,
        detail: promise._result,
        childId: child && child._id,
        label: promise._label,
        timeStamp: Date.now(),
        error: config["instrument-with-stack"] ? new Error(promise._label) : null
      } })) {
      scheduleFlush();
    }
  }

  /**
    `RSVP.Promise.resolve` returns a promise that will become resolved with the
    passed `value`. It is shorthand for the following:
  
    ```javascript
    let promise = new RSVP.Promise(function(resolve, reject){
      resolve(1);
    });
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = RSVP.Promise.resolve(1);
  
    promise.then(function(value){
      // value === 1
    });
    ```
  
    @method resolve
    @static
    @param {*} object value that the returned promise will be resolved with
    @param {String} label optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$$1(object, label) {
    /*jshint validthis:true */
    var Constructor = this;

    if (object && typeof object === 'object' && object.constructor === Constructor) {
      return object;
    }

    var promise = new Constructor(noop, label);
    resolve$1(promise, object);
    return promise;
  }

  function withOwnPromise() {
    return new TypeError('A promises callback cannot return that same promise.');
  }

  function objectOrFunction(x) {
    var type = typeof x;
    return x !== null && (type === 'object' || type === 'function');
  }

  function noop() {}

  var PENDING = void 0;
  var FULFILLED = 1;
  var REJECTED = 2;

  var TRY_CATCH_ERROR = { error: null };

  function getThen(promise) {
    try {
      return promise.then;
    } catch (error) {
      TRY_CATCH_ERROR.error = error;
      return TRY_CATCH_ERROR;
    }
  }

  var tryCatchCallback = void 0;
  function tryCatcher() {
    try {
      var target = tryCatchCallback;
      tryCatchCallback = null;
      return target.apply(this, arguments);
    } catch (e) {
      TRY_CATCH_ERROR.error = e;
      return TRY_CATCH_ERROR;
    }
  }

  function tryCatch(fn) {
    tryCatchCallback = fn;
    return tryCatcher;
  }

  function handleForeignThenable(promise, thenable, then$$1) {
    config.async(function (promise) {
      var sealed = false;
      var result = tryCatch(then$$1).call(thenable, function (value) {
        if (sealed) {
          return;
        }
        sealed = true;
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        if (sealed) {
          return;
        }
        sealed = true;

        reject(promise, reason);
      }, 'Settle: ' + (promise._label || ' unknown promise'));

      if (!sealed && result === TRY_CATCH_ERROR) {
        sealed = true;
        var error = TRY_CATCH_ERROR.error;
        TRY_CATCH_ERROR.error = null;
        reject(promise, error);
      }
    }, promise);
  }

  function handleOwnThenable(promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result);
    } else if (thenable._state === REJECTED) {
      thenable._onError = null;
      reject(promise, thenable._result);
    } else {
      subscribe(thenable, undefined, function (value) {
        if (thenable === value) {
          fulfill(promise, value);
        } else {
          resolve$1(promise, value);
        }
      }, function (reason) {
        return reject(promise, reason);
      });
    }
  }

  function handleMaybeThenable(promise, maybeThenable, then$$1) {
    var isOwnThenable = maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$$1;

    if (isOwnThenable) {
      handleOwnThenable(promise, maybeThenable);
    } else if (then$$1 === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    } else if (typeof then$$1 === 'function') {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }

  function resolve$1(promise, value) {
    if (promise === value) {
      fulfill(promise, value);
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value));
    } else {
      fulfill(promise, value);
    }
  }

  function publishRejection(promise) {
    if (promise._onError) {
      promise._onError(promise._result);
    }

    publish(promise);
  }

  function fulfill(promise, value) {
    if (promise._state !== PENDING) {
      return;
    }

    promise._result = value;
    promise._state = FULFILLED;

    if (promise._subscribers.length === 0) {
      if (config.instrument) {
        instrument('fulfilled', promise);
      }
    } else {
      config.async(publish, promise);
    }
  }

  function reject(promise, reason) {
    if (promise._state !== PENDING) {
      return;
    }
    promise._state = REJECTED;
    promise._result = reason;
    config.async(publishRejection, promise);
  }

  function subscribe(parent, child, onFulfillment, onRejection) {
    var subscribers = parent._subscribers;
    var length = subscribers.length;

    parent._onError = null;

    subscribers[length] = child;
    subscribers[length + FULFILLED] = onFulfillment;
    subscribers[length + REJECTED] = onRejection;

    if (length === 0 && parent._state) {
      config.async(publish, parent);
    }
  }

  function publish(promise) {
    var subscribers = promise._subscribers;
    var settled = promise._state;

    if (config.instrument) {
      instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
    }

    if (subscribers.length === 0) {
      return;
    }

    var child = void 0,
        callback = void 0,
        result = promise._result;

    for (var i = 0; i < subscribers.length; i += 3) {
      child = subscribers[i];
      callback = subscribers[i + settled];

      if (child) {
        invokeCallback(settled, child, callback, result);
      } else {
        callback(result);
      }
    }

    promise._subscribers.length = 0;
  }

  function invokeCallback(state, promise, callback, result) {
    var hasCallback = typeof callback === 'function';
    var value = void 0;

    if (hasCallback) {
      value = tryCatch(callback)(result);
    } else {
      value = result;
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (value === promise) {
      reject(promise, withOwnPromise());
    } else if (value === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null; // release
      reject(promise, error);
    } else if (hasCallback) {
      resolve$1(promise, value);
    } else if (state === FULFILLED) {
      fulfill(promise, value);
    } else if (state === REJECTED) {
      reject(promise, value);
    }
  }

  function initializePromise(promise, resolver) {
    var resolved = false;
    try {
      resolver(function (value) {
        if (resolved) {
          return;
        }
        resolved = true;
        resolve$1(promise, value);
      }, function (reason) {
        if (resolved) {
          return;
        }
        resolved = true;
        reject(promise, reason);
      });
    } catch (e) {
      reject(promise, e);
    }
  }

  function then(onFulfillment, onRejection, label) {
    var parent = this;
    var state = parent._state;

    if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
      config.instrument && instrument('chained', parent, parent);
      return parent;
    }

    parent._onError = null;

    var child = new parent.constructor(noop, label);
    var result = parent._result;

    config.instrument && instrument('chained', parent, child);

    if (state === PENDING) {
      subscribe(parent, child, onFulfillment, onRejection);
    } else {
      var callback = state === FULFILLED ? onFulfillment : onRejection;
      config.async(function () {
        return invokeCallback(state, child, callback, result);
      });
    }

    return child;
  }

  var Enumerator = function () {
    function Enumerator(Constructor, input, abortOnReject, label) {
      (0, _emberBabel.classCallCheck)(this, Enumerator);

      this._instanceConstructor = Constructor;
      this.promise = new Constructor(noop, label);
      this._abortOnReject = abortOnReject;
      this._isUsingOwnPromise = Constructor === Promise;
      this._isUsingOwnResolve = Constructor.resolve === resolve$$1;

      this._init.apply(this, arguments);
    }

    Enumerator.prototype._init = function _init(Constructor, input) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);

      this._enumerate(input);
    };

    Enumerator.prototype._enumerate = function _enumerate(input) {
      var length = this.length;
      var promise = this.promise;

      for (var i = 0; promise._state === PENDING && i < length; i++) {
        this._eachEntry(input[i], i, true);
      }
      this._checkFullfillment();
    };

    Enumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0) {
        var result = this._result;
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    Enumerator.prototype._settleMaybeThenable = function _settleMaybeThenable(entry, i, firstPass) {
      var c = this._instanceConstructor;

      if (this._isUsingOwnResolve) {
        var then$$1 = getThen(entry);

        if (then$$1 === then && entry._state !== PENDING) {
          entry._onError = null;
          this._settledAt(entry._state, i, entry._result, firstPass);
        } else if (typeof then$$1 !== 'function') {
          this._settledAt(FULFILLED, i, entry, firstPass);
        } else if (this._isUsingOwnPromise) {
          var promise = new c(noop);
          handleMaybeThenable(promise, entry, then$$1);
          this._willSettleAt(promise, i, firstPass);
        } else {
          this._willSettleAt(new c(function (resolve) {
            return resolve(entry);
          }), i, firstPass);
        }
      } else {
        this._willSettleAt(c.resolve(entry), i, firstPass);
      }
    };

    Enumerator.prototype._eachEntry = function _eachEntry(entry, i, firstPass) {
      if (entry !== null && typeof entry === 'object') {
        this._settleMaybeThenable(entry, i, firstPass);
      } else {
        this._setResultAt(FULFILLED, i, entry, firstPass);
      }
    };

    Enumerator.prototype._settledAt = function _settledAt(state, i, value, firstPass) {
      var promise = this.promise;

      if (promise._state === PENDING) {
        if (this._abortOnReject && state === REJECTED) {
          reject(promise, value);
        } else {
          this._setResultAt(state, i, value, firstPass);
          this._checkFullfillment();
        }
      }
    };

    Enumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      this._remaining--;
      this._result[i] = value;
    };

    Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i, firstPass) {
      var _this = this;

      subscribe(promise, undefined, function (value) {
        return _this._settledAt(FULFILLED, i, value, firstPass);
      }, function (reason) {
        return _this._settledAt(REJECTED, i, reason, firstPass);
      });
    };

    return Enumerator;
  }();

  function setSettledResult(state, i, value) {
    this._remaining--;
    if (state === FULFILLED) {
      this._result[i] = {
        state: 'fulfilled',
        value: value
      };
    } else {
      this._result[i] = {
        state: 'rejected',
        reason: value
      };
    }
  }

  /**
    `RSVP.Promise.all` accepts an array of promises, and returns a new promise which
    is fulfilled with an array of fulfillment values for the passed promises, or
    rejected with the reason of the first passed promise to be rejected. It casts all
    elements of the passed iterable to promises as it runs this algorithm.
  
    Example:
  
    ```javascript
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.resolve(2);
    let promise3 = RSVP.resolve(3);
    let promises = [ promise1, promise2, promise3 ];
  
    RSVP.Promise.all(promises).then(function(array){
      // The array here would be [ 1, 2, 3 ];
    });
    ```
  
    If any of the `promises` given to `RSVP.all` are rejected, the first promise
    that is rejected will be given as an argument to the returned promises's
    rejection handler. For example:
  
    Example:
  
    ```javascript
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.reject(new Error("2"));
    let promise3 = RSVP.reject(new Error("3"));
    let promises = [ promise1, promise2, promise3 ];
  
    RSVP.Promise.all(promises).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(error) {
      // error.message === "2"
    });
    ```
  
    @method all
    @static
    @param {Array} entries array of promises
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all `promises` have been
    fulfilled, or rejected if any of them become rejected.
    @static
  */
  function all(entries, label) {
    if (!Array.isArray(entries)) {
      return this.reject(new TypeError("Promise.all must be called with an array"), label);
    }
    return new Enumerator(this, entries, true /* abort on reject */, label).promise;
  }

  /**
    `RSVP.Promise.race` returns a new promise which is settled in the same way as the
    first passed promise to settle.
  
    Example:
  
    ```javascript
    let promise1 = new RSVP.Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new RSVP.Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 2');
      }, 100);
    });
  
    RSVP.Promise.race([promise1, promise2]).then(function(result){
      // result === 'promise 2' because it was resolved before promise1
      // was resolved.
    });
    ```
  
    `RSVP.Promise.race` is deterministic in that only the state of the first
    settled promise matters. For example, even if other promises given to the
    `promises` array argument are resolved, but the first settled promise has
    become rejected before the other promises became fulfilled, the returned
    promise will become rejected:
  
    ```javascript
    let promise1 = new RSVP.Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('promise 1');
      }, 200);
    });
  
    let promise2 = new RSVP.Promise(function(resolve, reject){
      setTimeout(function(){
        reject(new Error('promise 2'));
      }, 100);
    });
  
    RSVP.Promise.race([promise1, promise2]).then(function(result){
      // Code here never runs
    }, function(reason){
      // reason.message === 'promise 2' because promise 2 became rejected before
      // promise 1 became fulfilled
    });
    ```
  
    An example real-world use case is implementing timeouts:
  
    ```javascript
    RSVP.Promise.race([ajax('foo.json'), timeout(5000)])
    ```
  
    @method race
    @static
    @param {Array} entries array of promises to observe
    @param {String} label optional string for describing the promise returned.
    Useful for tooling.
    @return {Promise} a promise which settles in the same way as the first passed
    promise to settle.
  */
  function race(entries, label) {
    /*jshint validthis:true */
    var Constructor = this;

    var promise = new Constructor(noop, label);

    if (!Array.isArray(entries)) {
      reject(promise, new TypeError('Promise.race must be called with an array'));
      return promise;
    }

    for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
      subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
        return resolve$1(promise, value);
      }, function (reason) {
        return reject(promise, reason);
      });
    }

    return promise;
  }

  /**
    `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
    It is shorthand for the following:
  
    ```javascript
    let promise = new RSVP.Promise(function(resolve, reject){
      reject(new Error('WHOOPS'));
    });
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    Instead of writing the above, your code now simply becomes the following:
  
    ```javascript
    let promise = RSVP.Promise.reject(new Error('WHOOPS'));
  
    promise.then(function(value){
      // Code here doesn't run because the promise is rejected!
    }, function(reason){
      // reason.message === 'WHOOPS'
    });
    ```
  
    @method reject
    @static
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} label optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$1(reason, label) {
    /*jshint validthis:true */
    var Constructor = this;
    var promise = new Constructor(noop, label);
    reject(promise, reason);
    return promise;
  }

  var guidKey = 'rsvp_' + Date.now() + '-';
  var counter = 0;

  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }

  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }

  /**
    Promise objects represent the eventual result of an asynchronous operation. The
    primary way of interacting with a promise is through its `then` method, which
    registers callbacks to receive either a promise’s eventual value or the reason
    why the promise cannot be fulfilled.
  
    Terminology
    -----------
  
    - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
    - `thenable` is an object or function that defines a `then` method.
    - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
    - `exception` is a value that is thrown using the throw statement.
    - `reason` is a value that indicates why a promise was rejected.
    - `settled` the final resting state of a promise, fulfilled or rejected.
  
    A promise can be in one of three states: pending, fulfilled, or rejected.
  
    Promises that are fulfilled have a fulfillment value and are in the fulfilled
    state.  Promises that are rejected have a rejection reason and are in the
    rejected state.  A fulfillment value is never a thenable.
  
    Promises can also be said to *resolve* a value.  If this value is also a
    promise, then the original promise's settled state will match the value's
    settled state.  So a promise that *resolves* a promise that rejects will
    itself reject, and a promise that *resolves* a promise that fulfills will
    itself fulfill.
  
  
    Basic Usage:
    ------------
  
    ```js
    let promise = new Promise(function(resolve, reject) {
      // on success
      resolve(value);
  
      // on failure
      reject(reason);
    });
  
    promise.then(function(value) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Advanced Usage:
    ---------------
  
    Promises shine when abstracting away asynchronous interactions such as
    `XMLHttpRequest`s.
  
    ```js
    function getJSON(url) {
      return new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
  
        xhr.open('GET', url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json';
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();
  
        function handler() {
          if (this.readyState === this.DONE) {
            if (this.status === 200) {
              resolve(this.response);
            } else {
              reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
            }
          }
        };
      });
    }
  
    getJSON('/posts.json').then(function(json) {
      // on fulfillment
    }, function(reason) {
      // on rejection
    });
    ```
  
    Unlike callbacks, promises are great composable primitives.
  
    ```js
    Promise.all([
      getJSON('/posts'),
      getJSON('/comments')
    ]).then(function(values){
      values[0] // => postsJSON
      values[1] // => commentsJSON
  
      return values;
    });
    ```
  
    @class RSVP.Promise
    @param {function} resolver
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @constructor
  */

  var Promise = function () {
    function Promise(resolver, label) {
      (0, _emberBabel.classCallCheck)(this, Promise);

      this._id = counter++;
      this._label = label;
      this._state = undefined;
      this._result = undefined;
      this._subscribers = [];

      config.instrument && instrument('created', this);

      if (noop !== resolver) {
        typeof resolver !== 'function' && needsResolver();
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
      }
    }

    Promise.prototype._onError = function _onError(reason) {
      var _this2 = this;

      config.after(function () {
        if (_this2._onError) {
          config.trigger('error', reason, _this2._label);
        }
      });
    };

    Promise.prototype.catch = function _catch(onRejection, label) {
      return this.then(undefined, onRejection, label);
    };

    Promise.prototype.finally = function _finally(callback, label) {
      var promise = this;
      var constructor = promise.constructor;

      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      }, label);
    };

    return Promise;
  }();

  Promise.cast = resolve$$1; // deprecated
  Promise.all = all;
  Promise.race = race;
  Promise.resolve = resolve$$1;
  Promise.reject = reject$1;

  Promise.prototype._guidKey = guidKey;

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we\'re unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfillment
    @param {Function} onRejection
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */
  Promise.prototype.then = then;

  function makeObject(_, argumentNames) {
    var obj = {};
    var length = _.length;
    var args = new Array(length);

    for (var x = 0; x < length; x++) {
      args[x] = _[x];
    }

    for (var i = 0; i < argumentNames.length; i++) {
      var name = argumentNames[i];
      obj[name] = args[i + 1];
    }

    return obj;
  }

  function arrayResult(_) {
    var length = _.length;
    var args = new Array(length - 1);

    for (var i = 1; i < length; i++) {
      args[i - 1] = _[i];
    }

    return args;
  }

  function wrapThenable(then, promise) {
    return {
      then: function (onFulFillment, onRejection) {
        return then.call(promise, onFulFillment, onRejection);
      }
    };
  }

  /**
    `RSVP.denodeify` takes a 'node-style' function and returns a function that
    will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
    browser when you'd prefer to use promises over using callbacks. For example,
    `denodeify` transforms the following:
  
    ```javascript
    let fs = require('fs');
  
    fs.readFile('myfile.txt', function(err, data){
      if (err) return handleError(err);
      handleData(data);
    });
    ```
  
    into:
  
    ```javascript
    let fs = require('fs');
    let readFile = RSVP.denodeify(fs.readFile);
  
    readFile('myfile.txt').then(handleData, handleError);
    ```
  
    If the node function has multiple success parameters, then `denodeify`
    just returns the first one:
  
    ```javascript
    let request = RSVP.denodeify(require('request'));
  
    request('http://example.com').then(function(res) {
      // ...
    });
    ```
  
    However, if you need all success parameters, setting `denodeify`'s
    second parameter to `true` causes it to return all success parameters
    as an array:
  
    ```javascript
    let request = RSVP.denodeify(require('request'), true);
  
    request('http://example.com').then(function(result) {
      // result[0] -> res
      // result[1] -> body
    });
    ```
  
    Or if you pass it an array with names it returns the parameters as a hash:
  
    ```javascript
    let request = RSVP.denodeify(require('request'), ['res', 'body']);
  
    request('http://example.com').then(function(result) {
      // result.res
      // result.body
    });
    ```
  
    Sometimes you need to retain the `this`:
  
    ```javascript
    let app = require('express')();
    let render = RSVP.denodeify(app.render.bind(app));
    ```
  
    The denodified function inherits from the original function. It works in all
    environments, except IE 10 and below. Consequently all properties of the original
    function are available to you. However, any properties you change on the
    denodeified function won't be changed on the original function. Example:
  
    ```javascript
    let request = RSVP.denodeify(require('request')),
        cookieJar = request.jar(); // <- Inheritance is used here
  
    request('http://example.com', {jar: cookieJar}).then(function(res) {
      // cookieJar.cookies holds now the cookies returned by example.com
    });
    ```
  
    Using `denodeify` makes it easier to compose asynchronous operations instead
    of using callbacks. For example, instead of:
  
    ```javascript
    let fs = require('fs');
  
    fs.readFile('myfile.txt', function(err, data){
      if (err) { ... } // Handle error
      fs.writeFile('myfile2.txt', data, function(err){
        if (err) { ... } // Handle error
        console.log('done')
      });
    });
    ```
  
    you can chain the operations together using `then` from the returned promise:
  
    ```javascript
    let fs = require('fs');
    let readFile = RSVP.denodeify(fs.readFile);
    let writeFile = RSVP.denodeify(fs.writeFile);
  
    readFile('myfile.txt').then(function(data){
      return writeFile('myfile2.txt', data);
    }).then(function(){
      console.log('done')
    }).catch(function(error){
      // Handle error
    });
    ```
  
    @method denodeify
    @static
    @for RSVP
    @param {Function} nodeFunc a 'node-style' function that takes a callback as
    its last argument. The callback expects an error to be passed as its first
    argument (if an error occurred, otherwise null), and the value from the
    operation as its second argument ('function(err, value){ }').
    @param {Boolean|Array} [options] An optional paramter that if set
    to `true` causes the promise to fulfill with the callback's success arguments
    as an array. This is useful if the node function has multiple success
    paramters. If you set this paramter to an array with names, the promise will
    fulfill with a hash with these names as keys and the success parameters as
    values.
    @return {Function} a function that wraps `nodeFunc` to return an
    `RSVP.Promise`
    @static
  */
  function denodeify(nodeFunc, options) {
    var fn = function () {
      var l = arguments.length;
      var args = new Array(l + 1);
      var promiseInput = false;

      for (var i = 0; i < l; ++i) {
        var arg = arguments[i];

        if (!promiseInput) {
          // TODO: clean this up
          promiseInput = needsPromiseInput(arg);
          if (promiseInput === TRY_CATCH_ERROR) {
            var error = TRY_CATCH_ERROR.error;
            TRY_CATCH_ERROR.error = null;
            var p = new Promise(noop);
            reject(p, error);
            return p;
          } else if (promiseInput && promiseInput !== true) {
            arg = wrapThenable(promiseInput, arg);
          }
        }
        args[i] = arg;
      }

      var promise = new Promise(noop);

      args[l] = function (err, val) {
        if (err) {
          reject(promise, err);
        } else if (options === undefined) {
          resolve$1(promise, val);
        } else if (options === true) {
          resolve$1(promise, arrayResult(arguments));
        } else if (Array.isArray(options)) {
          resolve$1(promise, makeObject(arguments, options));
        } else {
          resolve$1(promise, val);
        }
      };

      if (promiseInput) {
        return handlePromiseInput(promise, args, nodeFunc, this);
      } else {
        return handleValueInput(promise, args, nodeFunc, this);
      }
    };

    (0, _emberBabel.defaults)(fn, nodeFunc);


    return fn;
  }

  function handleValueInput(promise, args, nodeFunc, self) {
    var result = tryCatch(nodeFunc).apply(self, args);
    if (result === TRY_CATCH_ERROR) {
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    }
    return promise;
  }

  function handlePromiseInput(promise, args, nodeFunc, self) {
    return Promise.all(args).then(function (args) {
      return handleValueInput(promise, args, nodeFunc, self);
    });
  }

  function needsPromiseInput(arg) {
    if (arg !== null && typeof arg === 'object') {
      if (arg.constructor === Promise) {
        return true;
      } else {
        return getThen(arg);
      }
    } else {
      return false;
    }
  }

  /**
    This is a convenient alias for `RSVP.Promise.all`.
  
    @method all
    @static
    @for RSVP
    @param {Array} array Array of promises.
    @param {String} label An optional label. This is useful
    for tooling.
  */
  function all$1(array, label) {
    return Promise.all(array, label);
  }

  var AllSettled = function (_Enumerator) {
    (0, _emberBabel.inherits)(AllSettled, _Enumerator);

    function AllSettled(Constructor, entries, label) {
      (0, _emberBabel.classCallCheck)(this, AllSettled);
      return (0, _emberBabel.possibleConstructorReturn)(this, _Enumerator.call(this, Constructor, entries, false /* don't abort on reject */, label));
    }

    return AllSettled;
  }(Enumerator);

  AllSettled.prototype._setResultAt = setSettledResult;

  /**
  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
  a fail-fast method, it waits until all the promises have returned and
  shows you all the results. This is useful if you want to handle multiple
  promises' failure states together as a set.
   Returns a promise that is fulfilled when all the given promises have been
  settled. The return promise is fulfilled with an array of the states of
  the promises passed into the `promises` array argument.
   Each state object will either indicate fulfillment or rejection, and
  provide the corresponding value or reason. The states will take one of
  the following formats:
   ```javascript
  { state: 'fulfilled', value: value }
    or
  { state: 'rejected', reason: reason }
  ```
   Example:
   ```javascript
  let promise1 = RSVP.Promise.resolve(1);
  let promise2 = RSVP.Promise.reject(new Error('2'));
  let promise3 = RSVP.Promise.reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];
   RSVP.allSettled(promises).then(function(array){
    // array == [
    //   { state: 'fulfilled', value: 1 },
    //   { state: 'rejected', reason: Error },
    //   { state: 'rejected', reason: Error }
    // ]
    // Note that for the second item, reason.message will be '2', and for the
    // third item, reason.message will be '3'.
  }, function(error) {
    // Not run. (This block would only be called if allSettled had failed,
    // for instance if passed an incorrect argument type.)
  });
  ```
   @method allSettled
  @static
  @for RSVP
  @param {Array} entries
  @param {String} label - optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with an array of the settled
  states of the constituent promises.
  */

  function allSettled(entries, label) {
    if (!Array.isArray(entries)) {
      return Promise.reject(new TypeError("Promise.allSettled must be called with an array"), label);
    }

    return new AllSettled(Promise, entries, label).promise;
  }

  /**
    This is a convenient alias for `RSVP.Promise.race`.
  
    @method race
    @static
    @for RSVP
    @param {Array} array Array of promises.
    @param {String} label An optional label. This is useful
    for tooling.
   */
  function race$1(array, label) {
    return Promise.race(array, label);
  }

  var PromiseHash = function (_Enumerator2) {
    (0, _emberBabel.inherits)(PromiseHash, _Enumerator2);

    function PromiseHash(Constructor, object) {
      var abortOnReject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var label = arguments[3];
      (0, _emberBabel.classCallCheck)(this, PromiseHash);
      return (0, _emberBabel.possibleConstructorReturn)(this, _Enumerator2.call(this, Constructor, object, abortOnReject, label));
    }

    PromiseHash.prototype._init = function _init(Constructor, object) {
      this._result = {};
      this._enumerate(object);
    };

    PromiseHash.prototype._enumerate = function _enumerate(input) {
      var keys = Object.keys(input);

      var length = keys.length;
      var promise = this.promise;
      this._remaining = length;

      var key = void 0,
          val = void 0;
      for (var i = 0; promise._state === PENDING && i < length; i++) {
        key = keys[i];
        val = input[key];
        this._eachEntry(val, key, true);
      }

      this._checkFullfillment();
    };

    return PromiseHash;
  }(Enumerator);

  /**
    `RSVP.hash` is similar to `RSVP.all`, but takes an object instead of an array
    for its `promises` argument.
  
    Returns a promise that is fulfilled when all the given promises have been
    fulfilled, or rejected if any of them become rejected. The returned promise
    is fulfilled with a hash that has the same key names as the `promises` object
    argument. If any of the values in the object are not promises, they will
    simply be copied over to the fulfilled object.
  
    Example:
  
    ```javascript
    let promises = {
      myPromise: RSVP.resolve(1),
      yourPromise: RSVP.resolve(2),
      theirPromise: RSVP.resolve(3),
      notAPromise: 4
    };
  
    RSVP.hash(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: 1,
      //   yourPromise: 2,
      //   theirPromise: 3,
      //   notAPromise: 4
      // }
    });
    ````
  
    If any of the `promises` given to `RSVP.hash` are rejected, the first promise
    that is rejected will be given as the reason to the rejection handler.
  
    Example:
  
    ```javascript
    let promises = {
      myPromise: RSVP.resolve(1),
      rejectedPromise: RSVP.reject(new Error('rejectedPromise')),
      anotherRejectedPromise: RSVP.reject(new Error('anotherRejectedPromise')),
    };
  
    RSVP.hash(promises).then(function(hash){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === 'rejectedPromise'
    });
    ```
  
    An important note: `RSVP.hash` is intended for plain JavaScript objects that
    are just a set of keys and values. `RSVP.hash` will NOT preserve prototype
    chains.
  
    Example:
  
    ```javascript
    function MyConstructor(){
      this.example = RSVP.resolve('Example');
    }
  
    MyConstructor.prototype = {
      protoProperty: RSVP.resolve('Proto Property')
    };
  
    let myObject = new MyConstructor();
  
    RSVP.hash(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: 'Example'
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```
  
    @method hash
    @static
    @for RSVP
    @param {Object} object
    @param {String} label optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when all properties of `promises`
    have been fulfilled, or rejected if any of them become rejected.
  */
  function hash(object, label) {
    if (object === null || typeof object !== 'object') {
      return Promise.reject(new TypeError("Promise.hash must be called with an object"), label);
    }

    return new PromiseHash(Promise, object, label).promise;
  }

  var HashSettled = function (_PromiseHash) {
    (0, _emberBabel.inherits)(HashSettled, _PromiseHash);

    function HashSettled(Constructor, object, label) {
      (0, _emberBabel.classCallCheck)(this, HashSettled);
      return (0, _emberBabel.possibleConstructorReturn)(this, _PromiseHash.call(this, Constructor, object, false, label));
    }

    return HashSettled;
  }(PromiseHash);

  HashSettled.prototype._setResultAt = setSettledResult;

  /**
    `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
    instead of an array for its `promises` argument.
  
    Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
    but like `RSVP.allSettled`, `hashSettled` waits until all the
    constituent promises have returned and then shows you all the results
    with their states and values/reasons. This is useful if you want to
    handle multiple promises' failure states together as a set.
  
    Returns a promise that is fulfilled when all the given promises have been
    settled, or rejected if the passed parameters are invalid.
  
    The returned promise is fulfilled with a hash that has the same key names as
    the `promises` object argument. If any of the values in the object are not
    promises, they will be copied over to the fulfilled object and marked with state
    'fulfilled'.
  
    Example:
  
    ```javascript
    let promises = {
      myPromise: RSVP.Promise.resolve(1),
      yourPromise: RSVP.Promise.resolve(2),
      theirPromise: RSVP.Promise.resolve(3),
      notAPromise: 4
    };
  
    RSVP.hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise: { state: 'fulfilled', value: 1 },
      //   yourPromise: { state: 'fulfilled', value: 2 },
      //   theirPromise: { state: 'fulfilled', value: 3 },
      //   notAPromise: { state: 'fulfilled', value: 4 }
      // }
    });
    ```
  
    If any of the `promises` given to `RSVP.hash` are rejected, the state will
    be set to 'rejected' and the reason for rejection provided.
  
    Example:
  
    ```javascript
    let promises = {
      myPromise: RSVP.Promise.resolve(1),
      rejectedPromise: RSVP.Promise.reject(new Error('rejection')),
      anotherRejectedPromise: RSVP.Promise.reject(new Error('more rejection')),
    };
  
    RSVP.hashSettled(promises).then(function(hash){
      // hash here is an object that looks like:
      // {
      //   myPromise:              { state: 'fulfilled', value: 1 },
      //   rejectedPromise:        { state: 'rejected', reason: Error },
      //   anotherRejectedPromise: { state: 'rejected', reason: Error },
      // }
      // Note that for rejectedPromise, reason.message == 'rejection',
      // and for anotherRejectedPromise, reason.message == 'more rejection'.
    });
    ```
  
    An important note: `RSVP.hashSettled` is intended for plain JavaScript objects that
    are just a set of keys and values. `RSVP.hashSettled` will NOT preserve prototype
    chains.
  
    Example:
  
    ```javascript
    function MyConstructor(){
      this.example = RSVP.Promise.resolve('Example');
    }
  
    MyConstructor.prototype = {
      protoProperty: RSVP.Promise.resolve('Proto Property')
    };
  
    let myObject = new MyConstructor();
  
    RSVP.hashSettled(myObject).then(function(hash){
      // protoProperty will not be present, instead you will just have an
      // object that looks like:
      // {
      //   example: { state: 'fulfilled', value: 'Example' }
      // }
      //
      // hash.hasOwnProperty('protoProperty'); // false
      // 'undefined' === typeof hash.protoProperty
    });
    ```
  
    @method hashSettled
    @for RSVP
    @param {Object} object
    @param {String} label optional string that describes the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled when when all properties of `promises`
    have been settled.
    @static
  */

  function hashSettled(object, label) {
    if (object === null || typeof object !== 'object') {
      return Promise.reject(new TypeError("RSVP.hashSettled must be called with an object"), label);
    }

    return new HashSettled(Promise, object, false, label).promise;
  }

  /**
    `RSVP.rethrow` will rethrow an error on the next turn of the JavaScript event
    loop in order to aid debugging.
  
    Promises A+ specifies that any exceptions that occur with a promise must be
    caught by the promises implementation and bubbled to the last handler. For
    this reason, it is recommended that you always specify a second rejection
    handler function to `then`. However, `RSVP.rethrow` will throw the exception
    outside of the promise, so it bubbles up to your console if in the browser,
    or domain/cause uncaught exception in Node. `rethrow` will also throw the
    error again so the error can be handled by the promise per the spec.
  
    ```javascript
    function throws(){
      throw new Error('Whoops!');
    }
  
    let promise = new RSVP.Promise(function(resolve, reject){
      throws();
    });
  
    promise.catch(RSVP.rethrow).then(function(){
      // Code here doesn't run because the promise became rejected due to an
      // error!
    }, function (err){
      // handle the error here
    });
    ```
  
    The 'Whoops' error will be thrown on the next turn of the event loop
    and you can watch for it in your console. You can also handle it using a
    rejection handler given to `.then` or `.catch` on the returned promise.
  
    @method rethrow
    @static
    @for RSVP
    @param {Error} reason reason the promise became rejected.
    @throws Error
    @static
  */
  function rethrow(reason) {
    setTimeout(function () {
      throw reason;
    });
    throw reason;
  }

  /**
    `RSVP.defer` returns an object similar to jQuery's `$.Deferred`.
    `RSVP.defer` should be used when porting over code reliant on `$.Deferred`'s
    interface. New code should use the `RSVP.Promise` constructor instead.
  
    The object returned from `RSVP.defer` is a plain object with three properties:
  
    * promise - an `RSVP.Promise`.
    * reject - a function that causes the `promise` property on this object to
      become rejected
    * resolve - a function that causes the `promise` property on this object to
      become fulfilled.
  
    Example:
  
     ```javascript
     let deferred = RSVP.defer();
  
     deferred.resolve("Success!");
  
     deferred.promise.then(function(value){
       // value here is "Success!"
     });
     ```
  
    @method defer
    @static
    @for RSVP
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Object}
   */

  function defer(label) {
    var deferred = { resolve: undefined, reject: undefined };

    deferred.promise = new Promise(function (resolve, reject) {
      deferred.resolve = resolve;
      deferred.reject = reject;
    }, label);

    return deferred;
  }

  var MapEnumerator = function (_Enumerator3) {
    (0, _emberBabel.inherits)(MapEnumerator, _Enumerator3);

    function MapEnumerator(Constructor, entries, mapFn, label) {
      (0, _emberBabel.classCallCheck)(this, MapEnumerator);
      return (0, _emberBabel.possibleConstructorReturn)(this, _Enumerator3.call(this, Constructor, entries, true, label, mapFn));
    }

    MapEnumerator.prototype._init = function _init(Constructor, input, bool, label, mapFn) {
      var len = input.length || 0;
      this.length = len;
      this._remaining = len;
      this._result = new Array(len);
      this._mapFn = mapFn;

      this._enumerate(input);
    };

    MapEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        this._result[i] = value;
      }
    };

    return MapEnumerator;
  }(Enumerator);

  /**
   `RSVP.map` is similar to JavaScript's native `map` method. `mapFn` is eagerly called
    meaning that as soon as any promise resolves its value will be passed to `mapFn`.
    `RSVP.map` returns a promise that will become fulfilled with the result of running
    `mapFn` on the values the promises become fulfilled with.
  
    For example:
  
    ```javascript
  
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.resolve(2);
    let promise3 = RSVP.resolve(3);
    let promises = [ promise1, promise2, promise3 ];
  
    let mapFn = function(item){
      return item + 1;
    };
  
    RSVP.map(promises, mapFn).then(function(result){
      // result is [ 2, 3, 4 ]
    });
    ```
  
    If any of the `promises` given to `RSVP.map` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:
  
    ```javascript
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.reject(new Error('2'));
    let promise3 = RSVP.reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];
  
    let mapFn = function(item){
      return item + 1;
    };
  
    RSVP.map(promises, mapFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```
  
    `RSVP.map` will also wait if a promise is returned from `mapFn`. For example,
    say you want to get all comments from a set of blog posts, but you need
    the blog posts first because they contain a url to those comments.
  
    ```javscript
  
    let mapFn = function(blogPost){
      // getComments does some ajax and returns an RSVP.Promise that is fulfilled
      // with some comments data
      return getComments(blogPost.comments_url);
    };
  
    // getBlogPosts does some ajax and returns an RSVP.Promise that is fulfilled
    // with some blog post data
    RSVP.map(getBlogPosts(), mapFn).then(function(comments){
      // comments is the result of asking the server for the comments
      // of all blog posts returned from getBlogPosts()
    });
    ```
  
    @method map
    @static
    @for RSVP
    @param {Array} promises
    @param {Function} mapFn function to be called on each fulfilled promise.
    @param {String} label optional string for labeling the promise.
    Useful for tooling.
    @return {Promise} promise that is fulfilled with the result of calling
    `mapFn` on each fulfilled promise or value when they become fulfilled.
     The promise will be rejected if any of the given `promises` become rejected.
    @static
  */
  function map(promises, mapFn, label) {
    if (!Array.isArray(promises)) {
      return Promise.reject(new TypeError("RSVP.map must be called with an array"), label);
    }

    if (typeof mapFn !== 'function') {
      return Promise.reject(new TypeError("RSVP.map expects a function as a second argument"), label);
    }

    return new MapEnumerator(Promise, promises, mapFn, label).promise;
  }

  /**
    This is a convenient alias for `RSVP.Promise.resolve`.
  
    @method resolve
    @static
    @for RSVP
    @param {*} value value that the returned promise will be resolved with
    @param {String} label optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise that will become fulfilled with the given
    `value`
  */
  function resolve$2(value, label) {
    return Promise.resolve(value, label);
  }

  /**
    This is a convenient alias for `RSVP.Promise.reject`.
  
    @method reject
    @static
    @for RSVP
    @param {*} reason value that the returned promise will be rejected with.
    @param {String} label optional string for identifying the returned promise.
    Useful for tooling.
    @return {Promise} a promise rejected with the given `reason`.
  */
  function reject$2(reason, label) {
    return Promise.reject(reason, label);
  }

  var EMPTY_OBJECT = {};

  var FilterEnumerator = function (_MapEnumerator) {
    (0, _emberBabel.inherits)(FilterEnumerator, _MapEnumerator);

    function FilterEnumerator() {
      (0, _emberBabel.classCallCheck)(this, FilterEnumerator);
      return (0, _emberBabel.possibleConstructorReturn)(this, _MapEnumerator.apply(this, arguments));
    }

    FilterEnumerator.prototype._checkFullfillment = function _checkFullfillment() {
      if (this._remaining === 0 && this._result !== null) {
        var result = this._result.filter(function (val) {
          return val !== EMPTY_OBJECT;
        });
        fulfill(this.promise, result);
        this._result = null;
      }
    };

    FilterEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
      if (firstPass) {
        this._result[i] = value;
        var val = tryCatch(this._mapFn)(value, i);
        if (val === TRY_CATCH_ERROR) {
          this._settledAt(REJECTED, i, val.error, false);
        } else {
          this._eachEntry(val, i, false);
        }
      } else {
        this._remaining--;
        if (!value) {
          this._result[i] = EMPTY_OBJECT;
        }
      }
    };

    return FilterEnumerator;
  }(MapEnumerator);

  /**
   `RSVP.filter` is similar to JavaScript's native `filter` method.
   `filterFn` is eagerly called meaning that as soon as any promise
    resolves its value will be passed to `filterFn`. `RSVP.filter` returns
    a promise that will become fulfilled with the result of running
    `filterFn` on the values the promises become fulfilled with.
  
    For example:
  
    ```javascript
  
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.resolve(2);
    let promise3 = RSVP.resolve(3);
  
    let promises = [promise1, promise2, promise3];
  
    let filterFn = function(item){
      return item > 1;
    };
  
    RSVP.filter(promises, filterFn).then(function(result){
      // result is [ 2, 3 ]
    });
    ```
  
    If any of the `promises` given to `RSVP.filter` are rejected, the first promise
    that is rejected will be given as an argument to the returned promise's
    rejection handler. For example:
  
    ```javascript
    let promise1 = RSVP.resolve(1);
    let promise2 = RSVP.reject(new Error('2'));
    let promise3 = RSVP.reject(new Error('3'));
    let promises = [ promise1, promise2, promise3 ];
  
    let filterFn = function(item){
      return item > 1;
    };
  
    RSVP.filter(promises, filterFn).then(function(array){
      // Code here never runs because there are rejected promises!
    }, function(reason) {
      // reason.message === '2'
    });
    ```
  
    `RSVP.filter` will also wait for any promises returned from `filterFn`.
    For instance, you may want to fetch a list of users then return a subset
    of those users based on some asynchronous operation:
  
    ```javascript
  
    let alice = { name: 'alice' };
    let bob   = { name: 'bob' };
    let users = [ alice, bob ];
  
    let promises = users.map(function(user){
      return RSVP.resolve(user);
    });
  
    let filterFn = function(user){
      // Here, Alice has permissions to create a blog post, but Bob does not.
      return getPrivilegesForUser(user).then(function(privs){
        return privs.can_create_blog_post === true;
      });
    };
    RSVP.filter(promises, filterFn).then(function(users){
      // true, because the server told us only Alice can create a blog post.
      users.length === 1;
      // false, because Alice is the only user present in `users`
      users[0] === bob;
    });
    ```
  
    @method filter
    @static
    @for RSVP
    @param {Array} promises
    @param {Function} filterFn - function to be called on each resolved value to
    filter the final results.
    @param {String} label optional string describing the promise. Useful for
    tooling.
    @return {Promise}
  */

  function filter(promises, filterFn, label) {
    if (typeof filterFn !== 'function') {
      return Promise.reject(new TypeError("RSVP.filter expects function as a second argument"), label);
    }

    return Promise.resolve(promises, label).then(function (promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("RSVP.filter must be called with an array");
      }
      return new FilterEnumerator(Promise, promises, filterFn, label).promise;
    });
  }

  var len = 0;
  var vertxNext = void 0;
  function asap(callback, arg) {
    queue$1[len] = callback;
    queue$1[len + 1] = arg;
    len += 2;
    if (len === 2) {
      // If len is 1, that means that we need to schedule an async flush.
      // If additional callbacks are queued before the queue is flushed, they
      // will be processed by this flush that we are scheduling.
      scheduleFlush$1();
    }
  }

  var browserWindow = typeof window !== 'undefined' ? window : undefined;
  var browserGlobal = browserWindow || {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  // test for web worker but not in IE10
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

  // node
  function useNextTick() {
    var nextTick = process.nextTick;
    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
    // setImmediate should be used instead instead
    var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
      nextTick = setImmediate;
    }
    return function () {
      return nextTick(flush);
    };
  }

  // vertx
  function useVertxTimer() {
    if (typeof vertxNext !== 'undefined') {
      return function () {
        vertxNext(flush);
      };
    }
    return useSetTimeout();
  }

  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, { characterData: true });

    return function () {
      return node.data = iterations = ++iterations % 2;
    };
  }

  // web worker
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function () {
      return channel.port2.postMessage(0);
    };
  }

  function useSetTimeout() {
    return function () {
      return setTimeout(flush, 1);
    };
  }

  var queue$1 = new Array(1000);

  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue$1[i];
      var arg = queue$1[i + 1];

      callback(arg);

      queue$1[i] = undefined;
      queue$1[i + 1] = undefined;
    }

    len = 0;
  }

  function attemptVertex() {
    try {
      var vertx = Function('return this')().require('vertx');
      vertxNext = vertx.runOnLoop || vertx.runOnContext;
      return useVertxTimer();
    } catch (e) {
      return useSetTimeout();
    }
  }

  var scheduleFlush$1 = void 0;
  // Decide what async method to use to triggering processing of queued callbacks:
  if (isNode) {
    scheduleFlush$1 = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush$1 = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush$1 = useMessageChannel();
  } else if (browserWindow === undefined && typeof _nodeModule.require === 'function') {
    scheduleFlush$1 = attemptVertex();
  } else {
    scheduleFlush$1 = useSetTimeout();
  }

  // defaults
  config.async = asap;
  config.after = function (cb) {
    return setTimeout(cb, 0);
  };
  var cast = resolve$2;

  var async = function (callback, arg) {
    return config.async(callback, arg);
  };

  function on() {
    config.on.apply(config, arguments);
  }

  function off() {
    config.off.apply(config, arguments);
  }

  // Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
  if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
    var callbacks = window['__PROMISE_INSTRUMENTATION__'];
    configure('instrument', true);
    for (var eventName in callbacks) {
      if (callbacks.hasOwnProperty(eventName)) {
        on(eventName, callbacks[eventName]);
      }
    }
  }

  // the default export here is for backwards compat:
  //   https://github.com/tildeio/rsvp.js/issues/434
  var rsvp = {
    asap: asap,
    cast: cast,
    Promise: Promise,
    EventTarget: EventTarget,
    all: all$1,
    allSettled: allSettled,
    race: race$1,
    hash: hash,
    hashSettled: hashSettled,
    rethrow: rethrow,
    defer: defer,
    denodeify: denodeify,
    configure: configure,
    on: on,
    off: off,
    resolve: resolve$2,
    reject: reject$2,
    map: map,
    async: async,
    filter: filter
  };

  exports.default = rsvp;
  exports.asap = asap;
  exports.cast = cast;
  exports.Promise = Promise;
  exports.EventTarget = EventTarget;
  exports.all = all$1;
  exports.allSettled = allSettled;
  exports.race = race$1;
  exports.hash = hash;
  exports.hashSettled = hashSettled;
  exports.rethrow = rethrow;
  exports.defer = defer;
  exports.denodeify = denodeify;
  exports.configure = configure;
  exports.on = on;
  exports.off = off;
  exports.resolve = resolve$2;
  exports.reject = reject$2;
  exports.map = map;
  exports.async = async;
  exports.filter = filter;
});
(function (m) { if (typeof module === "object" && module.exports) { module.exports = m } }(requireModule('ember-runtime').default));


}());
//# sourceMappingURL=ember-runtime.map
