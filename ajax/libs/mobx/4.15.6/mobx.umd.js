/** MobX - (c) Michel Weststrate 2015 - 2020 - MIT Licensed */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.mobx = {}));
}(this, (function (exports) { 'use strict';

    var OBFUSCATED_ERROR = "An invariant failed, however the error is obfuscated because this is an production build.";
    var EMPTY_ARRAY = [];
    Object.freeze(EMPTY_ARRAY);
    var EMPTY_OBJECT = {};
    Object.freeze(EMPTY_OBJECT);
    var mockGlobal = {};
    function getGlobal() {
        if (typeof window !== "undefined") {
            return window;
        }
        if (typeof global !== "undefined") {
            return global;
        }
        if (typeof self !== "undefined") {
            return self;
        }
        return mockGlobal;
    }
    function getNextId() {
        return ++globalState.mobxGuid;
    }
    function fail(message) {
        invariant(false, message);
        throw "X"; // unreachable
    }
    function invariant(check, message) {
        if (!check)
            throw new Error("[mobx] " + (message || OBFUSCATED_ERROR));
    }
    /**
     * Prints a deprecation message, but only one time.
     * Returns false if the deprecated message was already printed before
     */
    var deprecatedMessages = [];
    function deprecated(msg, thing) {
        if (process.env.NODE_ENV === "production")
            return false;
        if (thing) {
            return deprecated("'" + msg + "', use '" + thing + "' instead.");
        }
        if (deprecatedMessages.indexOf(msg) !== -1)
            return false;
        deprecatedMessages.push(msg);
        console.error("[mobx] Deprecated: " + msg);
        return true;
    }
    /**
     * Makes sure that the provided function is invoked at most once.
     */
    function once(func) {
        var invoked = false;
        return function () {
            if (invoked)
                return;
            invoked = true;
            return func.apply(this, arguments);
        };
    }
    var noop = function () { };
    function unique(list) {
        var res = [];
        list.forEach(function (item) {
            if (res.indexOf(item) === -1)
                res.push(item);
        });
        return res;
    }
    function isObject(value) {
        return value !== null && typeof value === "object";
    }
    function isPlainObject(value) {
        if (value === null || typeof value !== "object")
            return false;
        var proto = Object.getPrototypeOf(value);
        return proto === Object.prototype || proto === null;
    }
    function convertToMap(dataStructure) {
        if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
            return dataStructure;
        }
        else if (Array.isArray(dataStructure)) {
            return new Map(dataStructure);
        }
        else if (isPlainObject(dataStructure)) {
            var map = new Map();
            for (var key in dataStructure) {
                map.set(key, dataStructure[key]);
            }
            return map;
        }
        else {
            return fail("Cannot convert to map from '" + dataStructure + "'");
        }
    }
    function makeNonEnumerable(object, propNames) {
        for (var i = 0; i < propNames.length; i++) {
            addHiddenProp(object, propNames[i], object[propNames[i]]);
        }
    }
    function addHiddenProp(object, propName, value) {
        Object.defineProperty(object, propName, {
            enumerable: false,
            writable: true,
            configurable: true,
            value: value
        });
    }
    function addHiddenFinalProp(object, propName, value) {
        Object.defineProperty(object, propName, {
            enumerable: false,
            writable: false,
            configurable: true,
            value: value
        });
    }
    function isPropertyConfigurable(object, prop) {
        var descriptor = Object.getOwnPropertyDescriptor(object, prop);
        return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
    }
    function assertPropertyConfigurable(object, prop) {
        if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable(object, prop))
            fail("Cannot make property '" + prop + "' observable, it is not configurable and writable in the target object");
    }
    function createInstanceofPredicate(name, clazz) {
        var propName = "isMobX" + name;
        clazz.prototype[propName] = true;
        return function (x) {
            return isObject(x) && x[propName] === true;
        };
    }
    function areBothNaN(a, b) {
        return typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
    }
    /**
     * Returns whether the argument is an array, disregarding observability.
     */
    function isArrayLike(x) {
        return Array.isArray(x) || isObservableArray(x);
    }
    function isES6Map(thing) {
        if (getGlobal().Map !== undefined && thing instanceof getGlobal().Map)
            return true;
        return false;
    }
    function isES6Set(thing) {
        return thing instanceof Set;
    }
    // use Array.from in Mobx 5
    function iteratorToArray(it) {
        var res = [];
        while (true) {
            var r = it.next();
            if (r.done)
                break;
            res.push(r.value);
        }
        return res;
    }
    function primitiveSymbol() {
        // es-disable-next-line
        return (typeof Symbol === "function" && Symbol.toPrimitive) || "@@toPrimitive";
    }
    function toPrimitive(value) {
        return value === null ? null : typeof value === "object" ? "" + value : value;
    }
    // Use "for of" in V5
    function forOf(iter, callback) {
        var next = iter.next();
        while (!next.done) {
            callback(next.value);
            next = iter.next();
        }
    }

    function iteratorSymbol() {
        return (typeof Symbol === "function" && Symbol.iterator) || "@@iterator";
    }
    function declareIterator(prototType, iteratorFactory) {
        addHiddenFinalProp(prototType, iteratorSymbol(), iteratorFactory);
    }
    function makeIterable(iterator) {
        iterator[iteratorSymbol()] = getSelf;
        return iterator;
    }
    function toStringTagSymbol() {
        return (typeof Symbol === "function" && Symbol.toStringTag) || "@@toStringTag";
    }
    function getSelf() {
        return this;
    }

    /**
     * Anything that can be used to _store_ state is an Atom in mobx. Atoms have two important jobs
     *
     * 1) detect when they are being _used_ and report this (using reportObserved). This allows mobx to make the connection between running functions and the data they used
     * 2) they should notify mobx whenever they have _changed_. This way mobx can re-run any functions (derivations) that are using this atom.
     */
    var Atom = /** @class */ (function () {
        /**
         * Create a new atom. For debugging purposes it is recommended to give it a name.
         * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
         */
        function Atom(name) {
            if (name === void 0) { name = "Atom@" + getNextId(); }
            this.name = name;
            this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
            this.isBeingObserved = false;
            this.observers = [];
            this.observersIndexes = {};
            this.diffValue = 0;
            this.lastAccessedBy = 0;
            this.lowestObserverState = exports.IDerivationState.NOT_TRACKING;
        }
        Atom.prototype.onBecomeUnobserved = function () {
            // noop
        };
        Atom.prototype.onBecomeObserved = function () {
            /* noop */
        };
        /**
         * Invoke this method to notify mobx that your atom has been used somehow.
         * Returns true if there is currently a reactive context.
         */
        Atom.prototype.reportObserved = function () {
            return reportObserved(this);
        };
        /**
         * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
         */
        Atom.prototype.reportChanged = function () {
            startBatch();
            propagateChanged(this);
            endBatch();
        };
        Atom.prototype.toString = function () {
            return this.name;
        };
        return Atom;
    }());
    var isAtom = createInstanceofPredicate("Atom", Atom);
    function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
        if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop; }
        if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop; }
        var atom = new Atom(name);
        onBecomeObserved(atom, onBecomeObservedHandler);
        onBecomeUnobserved(atom, onBecomeUnobservedHandler);
        return atom;
    }

    function identityComparer(a, b) {
        return a === b;
    }
    function structuralComparer(a, b) {
        return deepEqual(a, b);
    }
    function shallowComparer(a, b) {
        return deepEqual(a, b, 1);
    }
    function defaultComparer(a, b) {
        return areBothNaN(a, b) || identityComparer(a, b);
    }
    var comparer = {
        identity: identityComparer,
        structural: structuralComparer,
        default: defaultComparer,
        shallow: shallowComparer
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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
        };
        return __assign.apply(this, arguments);
    };

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

    var enumerableDescriptorCache = {};
    var nonEnumerableDescriptorCache = {};
    function createPropertyInitializerDescriptor(prop, enumerable) {
        var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
        return (cache[prop] ||
            (cache[prop] = {
                configurable: true,
                enumerable: enumerable,
                get: function () {
                    initializeInstance(this);
                    return this[prop];
                },
                set: function (value) {
                    initializeInstance(this);
                    this[prop] = value;
                }
            }));
    }
    function initializeInstance(target) {
        if (target.__mobxDidRunLazyInitializers === true)
            return;
        var decorators = target.__mobxDecorators;
        if (decorators) {
            addHiddenProp(target, "__mobxDidRunLazyInitializers", true);
            for (var key in decorators) {
                var d = decorators[key];
                d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
            }
        }
    }
    function createPropDecorator(propertyInitiallyEnumerable, propertyCreator) {
        return function decoratorFactory() {
            var decoratorArguments;
            var decorator = function decorate(target, prop, descriptor, applyImmediately
            // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
            // as the instance to apply the decorator to equals the target
            ) {
                if (applyImmediately === true) {
                    propertyCreator(target, prop, descriptor, target, decoratorArguments);
                    return null;
                }
                if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator(arguments))
                    fail("This function is a decorator, but it wasn't invoked like a decorator");
                if (!Object.prototype.hasOwnProperty.call(target, "__mobxDecorators")) {
                    var inheritedDecorators = target.__mobxDecorators;
                    addHiddenProp(target, "__mobxDecorators", __assign({}, inheritedDecorators));
                }
                target.__mobxDecorators[prop] = {
                    prop: prop,
                    propertyCreator: propertyCreator,
                    descriptor: descriptor,
                    decoratorTarget: target,
                    decoratorArguments: decoratorArguments
                };
                return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
            };
            if (quacksLikeADecorator(arguments)) {
                // @decorator
                decoratorArguments = EMPTY_ARRAY;
                return decorator.apply(null, arguments);
            }
            else {
                // @decorator(args)
                decoratorArguments = Array.prototype.slice.call(arguments);
                return decorator;
            }
        };
    }
    function quacksLikeADecorator(args) {
        return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") ||
            (args.length === 4 && args[3] === true));
    }

    function deepEnhancer(v, _, name) {
        // it is an observable already, done
        if (isObservable(v))
            return v;
        // something that can be converted and mutated?
        if (Array.isArray(v))
            return observable.array(v, { name: name });
        if (isPlainObject(v))
            return observable.object(v, undefined, { name: name });
        if (isES6Map(v))
            return observable.map(v, { name: name });
        if (isES6Set(v))
            return observable.set(v, { name: name });
        return v;
    }
    function shallowEnhancer(v, _, name) {
        if (v === undefined || v === null)
            return v;
        if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v))
            return v;
        if (Array.isArray(v))
            return observable.array(v, { name: name, deep: false });
        if (isPlainObject(v))
            return observable.object(v, undefined, { name: name, deep: false });
        if (isES6Map(v))
            return observable.map(v, { name: name, deep: false });
        if (isES6Set(v))
            return observable.set(v, { name: name, deep: false });
        return fail(process.env.NODE_ENV !== "production" &&
            "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
    }
    function referenceEnhancer(newValue) {
        // never turn into an observable
        return newValue;
    }
    function refStructEnhancer(v, oldValue, name) {
        if (process.env.NODE_ENV !== "production" && isObservable(v))
            throw "observable.struct should not be used with observable values";
        if (deepEqual(v, oldValue))
            return oldValue;
        return v;
    }

    function createDecoratorForEnhancer(enhancer) {
        invariant(enhancer);
        var decorator = createPropDecorator(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
            if (process.env.NODE_ENV !== "production") {
                invariant(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + propertyName + "\"), use @computed instead.");
            }
            var initialValue = descriptor
                ? descriptor.initializer
                    ? descriptor.initializer.call(target)
                    : descriptor.value
                : undefined;
            defineObservableProperty(target, propertyName, initialValue, enhancer);
        });
        var res = 
        // Extra process checks, as this happens during module initialization
        typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production"
            ? function observableDecorator() {
                // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
                // and simply return the created prop decorator
                if (arguments.length < 2)
                    return fail("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
                return decorator.apply(null, arguments);
            }
            : decorator;
        res.enhancer = enhancer;
        return res;
    }

    // Predefined bags of create observable options, to avoid allocating temporarily option objects
    // in the majority of cases
    var defaultCreateObservableOptions = {
        deep: true,
        name: undefined,
        defaultDecorator: undefined
    };
    var shallowCreateObservableOptions = {
        deep: false,
        name: undefined,
        defaultDecorator: undefined
    };
    Object.freeze(defaultCreateObservableOptions);
    Object.freeze(shallowCreateObservableOptions);
    function assertValidOption(key) {
        if (!/^(deep|name|equals|defaultDecorator)$/.test(key))
            fail("invalid option for (extend)observable: " + key);
    }
    function asCreateObservableOptions(thing) {
        if (thing === null || thing === undefined)
            return defaultCreateObservableOptions;
        if (typeof thing === "string")
            return { name: thing, deep: true };
        if (process.env.NODE_ENV !== "production") {
            if (typeof thing !== "object")
                return fail("expected options object");
            Object.keys(thing).forEach(assertValidOption);
        }
        return thing;
    }
    function getEnhancerFromOptions(options) {
        return options.defaultDecorator
            ? options.defaultDecorator.enhancer
            : options.deep === false
                ? referenceEnhancer
                : deepEnhancer;
    }
    var deepDecorator = createDecoratorForEnhancer(deepEnhancer);
    var shallowDecorator = createDecoratorForEnhancer(shallowEnhancer);
    var refDecorator = createDecoratorForEnhancer(referenceEnhancer);
    var refStructDecorator = createDecoratorForEnhancer(refStructEnhancer);
    /**
     * Turns an object, array or function into a reactive structure.
     * @param v the value which should become observable.
     */
    function createObservable(v, arg2, arg3) {
        // @observable someProp;
        if (typeof arguments[1] === "string") {
            return deepDecorator.apply(null, arguments);
        }
        // it is an observable already, done
        if (isObservable(v))
            return v;
        // something that can be converted and mutated?
        var res = isPlainObject(v)
            ? observable.object(v, arg2, arg3)
            : Array.isArray(v)
                ? observable.array(v, arg2)
                : isES6Map(v)
                    ? observable.map(v, arg2)
                    : isES6Set(v)
                        ? observable.set(v, arg2)
                        : v;
        // this value could be converted to a new observable data structure, return it
        if (res !== v)
            return res;
        // otherwise, just box it
        fail(process.env.NODE_ENV !== "production" &&
            "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
    }
    var observableFactories = {
        box: function (value, options) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("box");
            var o = asCreateObservableOptions(options);
            return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
        },
        shallowBox: function (value, name) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("shallowBox");
            deprecated("observable.shallowBox", "observable.box(value, { deep: false })");
            return observable.box(value, { name: name, deep: false });
        },
        array: function (initialValues, options) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("array");
            var o = asCreateObservableOptions(options);
            return new ObservableArray(initialValues, getEnhancerFromOptions(o), o.name);
        },
        shallowArray: function (initialValues, name) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("shallowArray");
            deprecated("observable.shallowArray", "observable.array(values, { deep: false })");
            return observable.array(initialValues, { name: name, deep: false });
        },
        map: function (initialValues, options) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("map");
            var o = asCreateObservableOptions(options);
            return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
        },
        shallowMap: function (initialValues, name) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("shallowMap");
            deprecated("observable.shallowMap", "observable.map(values, { deep: false })");
            return observable.map(initialValues, { name: name, deep: false });
        },
        set: function (initialValues, options) {
            if (arguments.length > 2)
                incorrectlyUsedAsDecorator("set");
            var o = asCreateObservableOptions(options);
            return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
        },
        object: function (props, decorators, options) {
            if (typeof arguments[1] === "string")
                incorrectlyUsedAsDecorator("object");
            var o = asCreateObservableOptions(options);
            return extendObservable({}, props, decorators, o);
        },
        shallowObject: function (props, name) {
            if (typeof arguments[1] === "string")
                incorrectlyUsedAsDecorator("shallowObject");
            deprecated("observable.shallowObject", "observable.object(values, {}, { deep: false })");
            return observable.object(props, {}, { name: name, deep: false });
        },
        ref: refDecorator,
        shallow: shallowDecorator,
        deep: deepDecorator,
        struct: refStructDecorator
    };
    var observable = createObservable;
    // weird trick to keep our typings nicely with our funcs, and still extend the observable function
    Object.keys(observableFactories).forEach(function (name) { return (observable[name] = observableFactories[name]); });
    function incorrectlyUsedAsDecorator(methodName) {
        fail(
        // process.env.NODE_ENV !== "production" &&
        "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
    }

    var computedDecorator = createPropDecorator(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
        if (process.env.NODE_ENV !== "production") {
            invariant(descriptor && descriptor.get, "Trying to declare a computed value for unspecified getter '" + propertyName + "'");
        }
        var get = descriptor.get, set = descriptor.set; // initialValue is the descriptor for get / set props
        // Optimization: faster on decorator target or instance? Assuming target
        // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
        // Forcing instance now, fixes hot reloadig issues on React Native:
        var options = decoratorArgs[0] || {};
        defineComputedProperty(instance, propertyName, __assign({ get: get, set: set }, options));
    });
    var computedStructDecorator = computedDecorator({ equals: comparer.structural });
    /**
     * Decorator for class properties: @computed get value() { return expr; }.
     * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
     */
    var computed = function computed(arg1, arg2, arg3) {
        if (typeof arg2 === "string") {
            // @computed
            return computedDecorator.apply(null, arguments);
        }
        if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
            // @computed({ options })
            return computedDecorator.apply(null, arguments);
        }
        // computed(expr, options?)
        if (process.env.NODE_ENV !== "production") {
            invariant(typeof arg1 === "function", "First argument to `computed` should be an expression.");
            invariant(arguments.length < 3, "Computed takes one or two arguments if used as function");
        }
        var opts = typeof arg2 === "object" ? arg2 : {};
        opts.get = arg1;
        opts.set = typeof arg2 === "function" ? arg2 : opts.set;
        opts.name = opts.name || arg1.name || ""; /* for generated name */
        return new ComputedValue(opts);
    };
    computed.struct = computedStructDecorator;

    (function (IDerivationState) {
        // before being run or (outside batch and not being observed)
        // at this point derivation is not holding any data about dependency tree
        IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
        // no shallow dependency changed since last computation
        // won't recalculate derivation
        // this is what makes mobx fast
        IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
        // some deep dependency changed, but don't know if shallow dependency changed
        // will require to check first if UP_TO_DATE or POSSIBLY_STALE
        // currently only ComputedValue will propagate POSSIBLY_STALE
        //
        // having this state is second big optimization:
        // don't have to recompute on every dependency change, but only when it's needed
        IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
        // A shallow dependency has changed since last computation and the derivation
        // will need to recompute when it's needed next.
        IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
    })(exports.IDerivationState || (exports.IDerivationState = {}));
    var TraceMode;
    (function (TraceMode) {
        TraceMode[TraceMode["NONE"] = 0] = "NONE";
        TraceMode[TraceMode["LOG"] = 1] = "LOG";
        TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
    })(TraceMode || (TraceMode = {}));
    var CaughtException = /** @class */ (function () {
        function CaughtException(cause) {
            this.cause = cause;
            // Empty
        }
        return CaughtException;
    }());
    function isCaughtException(e) {
        return e instanceof CaughtException;
    }
    /**
     * Finds out whether any dependency of the derivation has actually changed.
     * If dependenciesState is 1 then it will recalculate dependencies,
     * if any dependency changed it will propagate it by changing dependenciesState to 2.
     *
     * By iterating over the dependencies in the same order that they were reported and
     * stopping on the first change, all the recalculations are only called for ComputedValues
     * that will be tracked by derivation. That is because we assume that if the first x
     * dependencies of the derivation doesn't change then the derivation should run the same way
     * up until accessing x-th dependency.
     */
    function shouldCompute(derivation) {
        switch (derivation.dependenciesState) {
            case exports.IDerivationState.UP_TO_DATE:
                return false;
            case exports.IDerivationState.NOT_TRACKING:
            case exports.IDerivationState.STALE:
                return true;
            case exports.IDerivationState.POSSIBLY_STALE: {
                // state propagation can occur outside of action/reactive context #2195
                var prevAllowStateReads = allowStateReadsStart(true);
                var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
                var obs = derivation.observing, l = obs.length;
                for (var i = 0; i < l; i++) {
                    var obj = obs[i];
                    if (isComputedValue(obj)) {
                        if (globalState.disableErrorBoundaries) {
                            obj.get();
                        }
                        else {
                            try {
                                obj.get();
                            }
                            catch (e) {
                                // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                                untrackedEnd(prevUntracked);
                                allowStateReadsEnd(prevAllowStateReads);
                                return true;
                            }
                        }
                        // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                        // and `derivation` is an observer of `obj`
                        // invariantShouldCompute(derivation)
                        if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                            untrackedEnd(prevUntracked);
                            allowStateReadsEnd(prevAllowStateReads);
                            return true;
                        }
                    }
                }
                changeDependenciesStateTo0(derivation);
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return false;
            }
        }
    }
    // function invariantShouldCompute(derivation: IDerivation) {
    //     const newDepState = (derivation as any).dependenciesState
    //     if (
    //         process.env.NODE_ENV === "production" &&
    //         (newDepState === IDerivationState.POSSIBLY_STALE ||
    //             newDepState === IDerivationState.NOT_TRACKING)
    //     )
    //         fail("Illegal dependency state")
    // }
    function isComputingDerivation() {
        return globalState.trackingDerivation !== null; // filter out actions inside computations
    }
    function checkIfStateModificationsAreAllowed(atom) {
        var hasObservers = atom.observers.length > 0;
        // Should never be possible to change an observed observable from inside computed, see #798
        if (globalState.computationDepth > 0 && hasObservers)
            fail(process.env.NODE_ENV !== "production" &&
                "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name);
        // Should not be possible to change observed state outside strict mode, except during initialization, see #563
        if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "strict"))
            fail(process.env.NODE_ENV !== "production" &&
                (globalState.enforceActions
                    ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                    : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                    atom.name);
    }
    function checkIfStateReadsAreAllowed(observable) {
        if (process.env.NODE_ENV !== "production" &&
            !globalState.allowStateReads &&
            globalState.observableRequiresReaction) {
            console.warn("[mobx] Observable " + observable.name + " being read outside a reactive context");
        }
    }
    /**
     * Executes the provided function `f` and tracks which observables are being accessed.
     * The tracking information is stored on the `derivation` object and the derivation is registered
     * as observer of any of the accessed observables.
     */
    function trackDerivedFunction(derivation, f, context) {
        var prevAllowStateReads = allowStateReadsStart(true);
        // pre allocate array allocation + room for variation in deps
        // array will be trimmed by bindDependencies
        changeDependenciesStateTo0(derivation);
        derivation.newObserving = new Array(derivation.observing.length + 100);
        derivation.unboundDepsCount = 0;
        derivation.runId = ++globalState.runId;
        var prevTracking = globalState.trackingDerivation;
        globalState.trackingDerivation = derivation;
        var result;
        if (globalState.disableErrorBoundaries === true) {
            result = f.call(context);
        }
        else {
            try {
                result = f.call(context);
            }
            catch (e) {
                result = new CaughtException(e);
            }
        }
        globalState.trackingDerivation = prevTracking;
        bindDependencies(derivation);
        if (derivation.observing.length === 0) {
            warnAboutDerivationWithoutDependencies(derivation);
        }
        allowStateReadsEnd(prevAllowStateReads);
        return result;
    }
    function warnAboutDerivationWithoutDependencies(derivation) {
        if (process.env.NODE_ENV === "production")
            return;
        if (globalState.reactionRequiresObservable || derivation.requiresObservable) {
            console.warn("[mobx] Derivation " + derivation.name + " is created/updated without reading any observable value");
        }
    }
    /**
     * diffs newObserving with observing.
     * update observing to be newObserving with unique observables
     * notify observers that become observed/unobserved
     */
    function bindDependencies(derivation) {
        // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
        var prevObserving = derivation.observing;
        var observing = (derivation.observing = derivation.newObserving);
        var lowestNewObservingDerivationState = exports.IDerivationState.UP_TO_DATE;
        // Go through all new observables and check diffValue: (this list can contain duplicates):
        //   0: first occurrence, change to 1 and keep it
        //   1: extra occurrence, drop it
        var i0 = 0, l = derivation.unboundDepsCount;
        for (var i = 0; i < l; i++) {
            var dep = observing[i];
            if (dep.diffValue === 0) {
                dep.diffValue = 1;
                if (i0 !== i)
                    observing[i0] = dep;
                i0++;
            }
            // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
            // not hitting the condition
            if (dep.dependenciesState > lowestNewObservingDerivationState) {
                lowestNewObservingDerivationState = dep.dependenciesState;
            }
        }
        observing.length = i0;
        derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
        // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
        //   0: it's not in new observables, unobserve it
        //   1: it keeps being observed, don't want to notify it. change to 0
        l = prevObserving.length;
        while (l--) {
            var dep = prevObserving[l];
            if (dep.diffValue === 0) {
                removeObserver(dep, derivation);
            }
            dep.diffValue = 0;
        }
        // Go through all new observables and check diffValue: (now it should be unique)
        //   0: it was set to 0 in last loop. don't need to do anything.
        //   1: it wasn't observed, let's observe it. set back to 0
        while (i0--) {
            var dep = observing[i0];
            if (dep.diffValue === 1) {
                dep.diffValue = 0;
                addObserver(dep, derivation);
            }
        }
        // Some new observed derivations may become stale during this derivation computation
        // so they have had no chance to propagate staleness (#916)
        if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
            derivation.dependenciesState = lowestNewObservingDerivationState;
            derivation.onBecomeStale();
        }
    }
    function clearObserving(derivation) {
        // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
        var obs = derivation.observing;
        derivation.observing = [];
        var i = obs.length;
        while (i--)
            removeObserver(obs[i], derivation);
        derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
    }
    function untracked(action) {
        var prev = untrackedStart();
        var res = action();
        untrackedEnd(prev);
        return res;
    }
    function untrackedStart() {
        var prev = globalState.trackingDerivation;
        globalState.trackingDerivation = null;
        return prev;
    }
    function untrackedEnd(prev) {
        globalState.trackingDerivation = prev;
    }
    function allowStateReadsStart(allowStateReads) {
        var prev = globalState.allowStateReads;
        globalState.allowStateReads = allowStateReads;
        return prev;
    }
    function allowStateReadsEnd(prev) {
        globalState.allowStateReads = prev;
    }
    /**
     * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
     *
     */
    function changeDependenciesStateTo0(derivation) {
        if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
            return;
        derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
        var obs = derivation.observing;
        var i = obs.length;
        while (i--)
            obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    }

    // we don't use globalState for these in order to avoid possible issues with multiple
    // mobx versions
    var currentActionId = 0;
    var nextActionId = 1;
    var functionNameDescriptor = Object.getOwnPropertyDescriptor(function () { }, "name");
    var isFunctionNameConfigurable = functionNameDescriptor && functionNameDescriptor.configurable;
    function createAction(actionName, fn) {
        if (process.env.NODE_ENV !== "production") {
            invariant(typeof fn === "function", "`action` can only be invoked on functions");
            if (typeof actionName !== "string" || !actionName)
                fail("actions should have valid names, got: '" + actionName + "'");
        }
        var res = function () {
            return executeAction(actionName, fn, this, arguments);
        };
        if (process.env.NODE_ENV !== "production") {
            if (isFunctionNameConfigurable) {
                Object.defineProperty(res, "name", { value: actionName });
            }
        }
        res.isMobxAction = true;
        return res;
    }
    function executeAction(actionName, fn, scope, args) {
        var runInfo = _startAction(actionName, scope, args);
        try {
            return fn.apply(scope, args);
        }
        catch (err) {
            runInfo.error = err;
            throw err;
        }
        finally {
            _endAction(runInfo);
        }
    }
    function _startAction(actionName, scope, args) {
        var notifySpy = isSpyEnabled() && !!actionName;
        var startTime = 0;
        if (notifySpy) {
            startTime = Date.now();
            var l = (args && args.length) || 0;
            var flattendArgs = new Array(l);
            if (l > 0)
                for (var i = 0; i < l; i++)
                    flattendArgs[i] = args[i];
            spyReportStart({
                type: "action",
                name: actionName,
                object: scope,
                arguments: flattendArgs
            });
        }
        var prevDerivation = untrackedStart();
        startBatch();
        var prevAllowStateChanges = allowStateChangesStart(true);
        var prevAllowStateReads = allowStateReadsStart(true);
        var runInfo = {
            prevDerivation: prevDerivation,
            prevAllowStateChanges: prevAllowStateChanges,
            prevAllowStateReads: prevAllowStateReads,
            notifySpy: notifySpy,
            startTime: startTime,
            actionId: nextActionId++,
            parentActionId: currentActionId
        };
        currentActionId = runInfo.actionId;
        return runInfo;
    }
    function _endAction(runInfo) {
        if (currentActionId !== runInfo.actionId) {
            fail("invalid action stack. did you forget to finish an action?");
        }
        currentActionId = runInfo.parentActionId;
        if (runInfo.error !== undefined) {
            globalState.suppressReactionErrors = true;
        }
        allowStateChangesEnd(runInfo.prevAllowStateChanges);
        allowStateReadsEnd(runInfo.prevAllowStateReads);
        endBatch();
        untrackedEnd(runInfo.prevDerivation);
        if (runInfo.notifySpy) {
            spyReportEnd({ time: Date.now() - runInfo.startTime });
        }
        globalState.suppressReactionErrors = false;
    }
    function allowStateChanges(allowStateChanges, func) {
        var prev = allowStateChangesStart(allowStateChanges);
        var res;
        try {
            res = func();
        }
        finally {
            allowStateChangesEnd(prev);
        }
        return res;
    }
    function allowStateChangesStart(allowStateChanges) {
        var prev = globalState.allowStateChanges;
        globalState.allowStateChanges = allowStateChanges;
        return prev;
    }
    function allowStateChangesEnd(prev) {
        globalState.allowStateChanges = prev;
    }
    function allowStateChangesInsideComputed(func) {
        var prev = globalState.computationDepth;
        globalState.computationDepth = 0;
        var res;
        try {
            res = func();
        }
        finally {
            globalState.computationDepth = prev;
        }
        return res;
    }

    var ObservableValue = /** @class */ (function (_super) {
        __extends(ObservableValue, _super);
        function ObservableValue(value, enhancer, name, notifySpy, equals) {
            if (name === void 0) { name = "ObservableValue@" + getNextId(); }
            if (notifySpy === void 0) { notifySpy = true; }
            if (equals === void 0) { equals = comparer.default; }
            var _this = _super.call(this, name) || this;
            _this.enhancer = enhancer;
            _this.name = name;
            _this.equals = equals;
            _this.hasUnreportedChange = false;
            _this.value = enhancer(value, undefined, name);
            if (notifySpy && isSpyEnabled()) {
                // only notify spy if this is a stand-alone observable
                spyReport({ type: "create", name: _this.name, newValue: "" + _this.value });
            }
            return _this;
        }
        ObservableValue.prototype.dehanceValue = function (value) {
            if (this.dehancer !== undefined)
                return this.dehancer(value);
            return value;
        };
        ObservableValue.prototype.set = function (newValue) {
            var oldValue = this.value;
            newValue = this.prepareNewValue(newValue);
            if (newValue !== globalState.UNCHANGED) {
                var notifySpy = isSpyEnabled();
                if (notifySpy) {
                    spyReportStart({
                        type: "update",
                        name: this.name,
                        newValue: newValue,
                        oldValue: oldValue
                    });
                }
                this.setNewValue(newValue);
                if (notifySpy)
                    spyReportEnd();
            }
        };
        ObservableValue.prototype.prepareNewValue = function (newValue) {
            checkIfStateModificationsAreAllowed(this);
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    object: this,
                    type: "update",
                    newValue: newValue
                });
                if (!change)
                    return globalState.UNCHANGED;
                newValue = change.newValue;
            }
            // apply modifier
            newValue = this.enhancer(newValue, this.value, this.name);
            return this.equals(this.value, newValue) ? globalState.UNCHANGED : newValue;
        };
        ObservableValue.prototype.setNewValue = function (newValue) {
            var oldValue = this.value;
            this.value = newValue;
            this.reportChanged();
            if (hasListeners(this)) {
                notifyListeners(this, {
                    type: "update",
                    object: this,
                    newValue: newValue,
                    oldValue: oldValue
                });
            }
        };
        ObservableValue.prototype.get = function () {
            this.reportObserved();
            return this.dehanceValue(this.value);
        };
        ObservableValue.prototype.intercept = function (handler) {
            return registerInterceptor(this, handler);
        };
        ObservableValue.prototype.observe = function (listener, fireImmediately) {
            if (fireImmediately)
                listener({
                    object: this,
                    type: "update",
                    newValue: this.value,
                    oldValue: undefined
                });
            return registerListener(this, listener);
        };
        ObservableValue.prototype.toJSON = function () {
            return this.get();
        };
        ObservableValue.prototype.toString = function () {
            return this.name + "[" + this.value + "]";
        };
        ObservableValue.prototype.valueOf = function () {
            return toPrimitive(this.get());
        };
        return ObservableValue;
    }(Atom));
    ObservableValue.prototype[primitiveSymbol()] = ObservableValue.prototype.valueOf;
    var isObservableValue = createInstanceofPredicate("ObservableValue", ObservableValue);

    /**
     * A node in the state dependency root that observes other nodes, and can be observed itself.
     *
     * ComputedValue will remember the result of the computation for the duration of the batch, or
     * while being observed.
     *
     * During this time it will recompute only when one of its direct dependencies changed,
     * but only when it is being accessed with `ComputedValue.get()`.
     *
     * Implementation description:
     * 1. First time it's being accessed it will compute and remember result
     *    give back remembered result until 2. happens
     * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
     * 3. When it's being accessed, recompute if any shallow dependency changed.
     *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
     *    go to step 2. either way
     *
     * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
     */
    var ComputedValue = /** @class */ (function () {
        /**
         * Create a new computed value based on a function expression.
         *
         * The `name` property is for debug purposes only.
         *
         * The `equals` property specifies the comparer function to use to determine if a newly produced
         * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
         * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
         * Structural comparison can be convenient if you always produce a new aggregated object and
         * don't want to notify observers if it is structurally the same.
         * This is useful for working with vectors, mouse coordinates etc.
         */
        function ComputedValue(options) {
            this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
            this.observing = []; // nodes we are looking at. Our value depends on these nodes
            this.newObserving = null; // during tracking it's an array with new observed observers
            this.isBeingObserved = false;
            this.isPendingUnobservation = false;
            this.observers = [];
            this.observersIndexes = {};
            this.diffValue = 0;
            this.runId = 0;
            this.lastAccessedBy = 0;
            this.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
            this.unboundDepsCount = 0;
            this.__mapid = "#" + getNextId();
            this.value = new CaughtException(null);
            this.isComputing = false; // to check for cycles
            this.isRunningSetter = false;
            this.isTracing = TraceMode.NONE;
            invariant(options.get, "missing option for computed: get");
            this.derivation = options.get;
            this.name = options.name || "ComputedValue@" + getNextId();
            if (options.set)
                this.setter = createAction(this.name + "-setter", options.set);
            this.equals =
                options.equals ||
                    (options.compareStructural || options.struct
                        ? comparer.structural
                        : comparer.default);
            this.scope = options.context;
            this.requiresReaction = !!options.requiresReaction;
            this.keepAlive = !!options.keepAlive;
        }
        ComputedValue.prototype.onBecomeStale = function () {
            propagateMaybeChanged(this);
        };
        ComputedValue.prototype.onBecomeUnobserved = function () { };
        ComputedValue.prototype.onBecomeObserved = function () { };
        /**
         * Returns the current value of this computed value.
         * Will evaluate its computation first if needed.
         */
        ComputedValue.prototype.get = function () {
            if (this.isComputing)
                fail("Cycle detected in computation " + this.name + ": " + this.derivation);
            if (globalState.inBatch === 0 && this.observers.length === 0 && !this.keepAlive) {
                if (shouldCompute(this)) {
                    this.warnAboutUntrackedRead();
                    startBatch(); // See perf test 'computed memoization'
                    this.value = this.computeValue(false);
                    endBatch();
                }
            }
            else {
                reportObserved(this);
                if (shouldCompute(this))
                    if (this.trackAndCompute())
                        propagateChangeConfirmed(this);
            }
            var result = this.value;
            if (isCaughtException(result))
                throw result.cause;
            return result;
        };
        ComputedValue.prototype.peek = function () {
            var res = this.computeValue(false);
            if (isCaughtException(res))
                throw res.cause;
            return res;
        };
        ComputedValue.prototype.set = function (value) {
            if (this.setter) {
                invariant(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
                this.isRunningSetter = true;
                try {
                    this.setter.call(this.scope, value);
                }
                finally {
                    this.isRunningSetter = false;
                }
            }
            else
                invariant(false, process.env.NODE_ENV !== "production" &&
                    "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
        };
        ComputedValue.prototype.trackAndCompute = function () {
            if (isSpyEnabled()) {
                spyReport({
                    object: this.scope,
                    type: "compute",
                    name: this.name
                });
            }
            var oldValue = this.value;
            var wasSuspended = 
            /* see #1208 */ this.dependenciesState === exports.IDerivationState.NOT_TRACKING;
            var newValue = this.computeValue(true);
            var changed = wasSuspended ||
                isCaughtException(oldValue) ||
                isCaughtException(newValue) ||
                !this.equals(oldValue, newValue);
            if (changed) {
                this.value = newValue;
            }
            return changed;
        };
        ComputedValue.prototype.computeValue = function (track) {
            this.isComputing = true;
            globalState.computationDepth++;
            var res;
            if (track) {
                res = trackDerivedFunction(this, this.derivation, this.scope);
            }
            else {
                if (globalState.disableErrorBoundaries === true) {
                    res = this.derivation.call(this.scope);
                }
                else {
                    try {
                        res = this.derivation.call(this.scope);
                    }
                    catch (e) {
                        res = new CaughtException(e);
                    }
                }
            }
            globalState.computationDepth--;
            this.isComputing = false;
            return res;
        };
        ComputedValue.prototype.suspend = function () {
            if (!this.keepAlive) {
                clearObserving(this);
                this.value = undefined; // don't hold on to computed value!
            }
        };
        ComputedValue.prototype.observe = function (listener, fireImmediately) {
            var _this = this;
            var firstTime = true;
            var prevValue = undefined;
            return autorun(function () {
                var newValue = _this.get();
                if (!firstTime || fireImmediately) {
                    var prevU = untrackedStart();
                    listener({
                        type: "update",
                        object: _this,
                        newValue: newValue,
                        oldValue: prevValue
                    });
                    untrackedEnd(prevU);
                }
                firstTime = false;
                prevValue = newValue;
            });
        };
        ComputedValue.prototype.warnAboutUntrackedRead = function () {
            if (process.env.NODE_ENV === "production")
                return;
            if (this.requiresReaction === true) {
                fail("[mobx] Computed value " + this.name + " is read outside a reactive context");
            }
            if (this.isTracing !== TraceMode.NONE) {
                console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
            }
            if (globalState.computedRequiresReaction) {
                console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
            }
        };
        ComputedValue.prototype.toJSON = function () {
            return this.get();
        };
        ComputedValue.prototype.toString = function () {
            return this.name + "[" + this.derivation.toString() + "]";
        };
        ComputedValue.prototype.valueOf = function () {
            return toPrimitive(this.get());
        };
        return ComputedValue;
    }());
    ComputedValue.prototype[primitiveSymbol()] = ComputedValue.prototype.valueOf;
    var isComputedValue = createInstanceofPredicate("ComputedValue", ComputedValue);

    /**
     * These values will persist if global state is reset
     */
    var persistentKeys = [
        "mobxGuid",
        "spyListeners",
        "enforceActions",
        "computedRequiresReaction",
        "reactionRequiresObservable",
        "observableRequiresReaction",
        "allowStateReads",
        "disableErrorBoundaries",
        "runId",
        "UNCHANGED"
    ];
    var MobXGlobals = /** @class */ (function () {
        function MobXGlobals() {
            /**
             * MobXGlobals version.
             * MobX compatiblity with other versions loaded in memory as long as this version matches.
             * It indicates that the global state still stores similar information
             *
             * N.B: this version is unrelated to the package version of MobX, and is only the version of the
             * internal state storage of MobX, and can be the same across many different package versions
             */
            this.version = 5;
            /**
             * globally unique token to signal unchanged
             */
            this.UNCHANGED = {};
            /**
             * Currently running derivation
             */
            this.trackingDerivation = null;
            /**
             * Are we running a computation currently? (not a reaction)
             */
            this.computationDepth = 0;
            /**
             * Each time a derivation is tracked, it is assigned a unique run-id
             */
            this.runId = 0;
            /**
             * 'guid' for general purpose. Will be persisted amongst resets.
             */
            this.mobxGuid = 0;
            /**
             * Are we in a batch block? (and how many of them)
             */
            this.inBatch = 0;
            /**
             * Observables that don't have observers anymore, and are about to be
             * suspended, unless somebody else accesses it in the same batch
             *
             * @type {IObservable[]}
             */
            this.pendingUnobservations = [];
            /**
             * List of scheduled, not yet executed, reactions.
             */
            this.pendingReactions = [];
            /**
             * Are we currently processing reactions?
             */
            this.isRunningReactions = false;
            /**
             * Is it allowed to change observables at this point?
             * In general, MobX doesn't allow that when running computations and React.render.
             * To ensure that those functions stay pure.
             */
            this.allowStateChanges = true;
            /**
             * Is it allowed to read observables at this point?
             * Used to hold the state needed for `observableRequiresReaction`
             */
            this.allowStateReads = true;
            /**
             * If strict mode is enabled, state changes are by default not allowed
             */
            this.enforceActions = false;
            /**
             * Spy callbacks
             */
            this.spyListeners = [];
            /**
             * Globally attached error handlers that react specifically to errors in reactions
             */
            this.globalReactionErrorHandlers = [];
            /**
             * Warn if computed values are accessed outside a reactive context
             */
            this.computedRequiresReaction = false;
            /**
             * (Experimental)
             * Warn if you try to create to derivation / reactive context without accessing any observable.
             */
            this.reactionRequiresObservable = false;
            /**
             * (Experimental)
             * Warn if observables are accessed outside a reactive context
             */
            this.observableRequiresReaction = false;
            /**
             * Allows overwriting of computed properties, useful in tests but not prod as it can cause
             * memory leaks. See https://github.com/mobxjs/mobx/issues/1867
             */
            this.computedConfigurable = false;
            /*
             * Don't catch and rethrow exceptions. This is useful for inspecting the state of
             * the stack when an exception occurs while debugging.
             */
            this.disableErrorBoundaries = false;
            /*
             * If true, we are already handling an exception in an action. Any errors in reactions should be supressed, as
             * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
             */
            this.suppressReactionErrors = false;
        }
        return MobXGlobals;
    }());
    var canMergeGlobalState = true;
    var isolateCalled = false;
    var globalState = (function () {
        var global = getGlobal();
        if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
            canMergeGlobalState = false;
        if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version)
            canMergeGlobalState = false;
        if (!canMergeGlobalState) {
            setTimeout(function () {
                if (!isolateCalled) {
                    fail("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
                }
            }, 1);
            return new MobXGlobals();
        }
        else if (global.__mobxGlobals) {
            global.__mobxInstanceCount += 1;
            if (!global.__mobxGlobals.UNCHANGED)
                global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible
            return global.__mobxGlobals;
        }
        else {
            global.__mobxInstanceCount = 1;
            return (global.__mobxGlobals = new MobXGlobals());
        }
    })();
    function isolateGlobalState() {
        if (globalState.pendingReactions.length ||
            globalState.inBatch ||
            globalState.isRunningReactions)
            fail("isolateGlobalState should be called before MobX is running any reactions");
        isolateCalled = true;
        if (canMergeGlobalState) {
            if (--getGlobal().__mobxInstanceCount === 0)
                getGlobal().__mobxGlobals = undefined;
            globalState = new MobXGlobals();
        }
    }
    function getGlobalState() {
        return globalState;
    }
    /**
     * For testing purposes only; this will break the internal state of existing observables,
     * but can be used to get back at a stable state after throwing errors
     */
    function resetGlobalState() {
        var defaultGlobals = new MobXGlobals();
        for (var key in defaultGlobals)
            if (persistentKeys.indexOf(key) === -1)
                globalState[key] = defaultGlobals[key];
        globalState.allowStateChanges = !globalState.enforceActions;
    }

    function hasObservers(observable) {
        return observable.observers && observable.observers.length > 0;
    }
    function getObservers(observable) {
        return observable.observers;
    }
    // function invariantObservers(observable: IObservable) {
    //     const list = observable.observers
    //     const map = observable.observersIndexes
    //     const l = list.length
    //     for (let i = 0; i < l; i++) {
    //         const id = list[i].__mapid
    //         if (i) {
    //             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
    //         } else {
    //             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
    //         }
    //     }
    //     invariant(
    //         list.length === 0 || Object.keys(map).length === list.length - 1,
    //         "INTERNAL ERROR there is no junk in map"
    //     )
    // }
    function addObserver(observable, node) {
        // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
        // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
        // invariantObservers(observable);
        var l = observable.observers.length;
        if (l) {
            // because object assignment is relatively expensive, let's not store data about index 0.
            observable.observersIndexes[node.__mapid] = l;
        }
        observable.observers[l] = node;
        if (observable.lowestObserverState > node.dependenciesState)
            observable.lowestObserverState = node.dependenciesState;
        // invariantObservers(observable);
        // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
    }
    function removeObserver(observable, node) {
        // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
        // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
        // invariantObservers(observable);
        if (observable.observers.length === 1) {
            // deleting last observer
            observable.observers.length = 0;
            queueForUnobservation(observable);
        }
        else {
            // deleting from _observersIndexes is straight forward, to delete from _observers, let's swap `node` with last element
            var list = observable.observers;
            var map = observable.observersIndexes;
            var filler = list.pop(); // get last element, which should fill the place of `node`, so the array doesn't have holes
            if (filler !== node) {
                // otherwise node was the last element, which already got removed from array
                var index = map[node.__mapid] || 0; // getting index of `node`. this is the only place we actually use map.
                if (index) {
                    // map store all indexes but 0, see comment in `addObserver`
                    map[filler.__mapid] = index;
                }
                else {
                    delete map[filler.__mapid];
                }
                list[index] = filler;
            }
            delete map[node.__mapid];
        }
        // invariantObservers(observable);
        // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
    }
    function queueForUnobservation(observable) {
        if (observable.isPendingUnobservation === false) {
            // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
            observable.isPendingUnobservation = true;
            globalState.pendingUnobservations.push(observable);
        }
    }
    /**
     * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
     * During a batch `onBecomeUnobserved` will be called at most once per observable.
     * Avoids unnecessary recalculations.
     */
    function startBatch() {
        globalState.inBatch++;
    }
    function endBatch() {
        if (--globalState.inBatch === 0) {
            runReactions();
            // the batch is actually about to finish, all unobserving should happen here.
            var list = globalState.pendingUnobservations;
            for (var i = 0; i < list.length; i++) {
                var observable = list[i];
                observable.isPendingUnobservation = false;
                if (observable.observers.length === 0) {
                    if (observable.isBeingObserved) {
                        // if this observable had reactive observers, trigger the hooks
                        observable.isBeingObserved = false;
                        observable.onBecomeUnobserved();
                    }
                    if (observable instanceof ComputedValue) {
                        // computed values are automatically teared down when the last observer leaves
                        // this process happens recursively, this computed might be the last observable of another, etc..
                        observable.suspend();
                    }
                }
            }
            globalState.pendingUnobservations = [];
        }
    }
    function reportObserved(observable) {
        checkIfStateReadsAreAllowed(observable);
        var derivation = globalState.trackingDerivation;
        if (derivation !== null) {
            /**
             * Simple optimization, give each derivation run an unique id (runId)
             * Check if last time this observable was accessed the same runId is used
             * if this is the case, the relation is already known
             */
            if (derivation.runId !== observable.lastAccessedBy) {
                observable.lastAccessedBy = derivation.runId;
                derivation.newObserving[derivation.unboundDepsCount++] = observable;
                if (!observable.isBeingObserved) {
                    observable.isBeingObserved = true;
                    observable.onBecomeObserved();
                }
            }
            return true;
        }
        else if (observable.observers.length === 0 && globalState.inBatch > 0) {
            queueForUnobservation(observable);
        }
        return false;
    }
    // function invariantLOS(observable: IObservable, msg: string) {
    //     // it's expensive so better not run it in produciton. but temporarily helpful for testing
    //     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
    //     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
    //     throw new Error(
    //         "lowestObserverState is wrong for " +
    //             msg +
    //             " because " +
    //             min +
    //             " < " +
    //             observable.lowestObserverState
    //     )
    // }
    /**
     * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
     * It will propagate changes to observers from previous run
     * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
     * Hopefully self reruning autoruns aren't a feature people should depend on
     * Also most basic use cases should be ok
     */
    // Called by Atom when its value changes
    function propagateChanged(observable) {
        // invariantLOS(observable, "changed start");
        if (observable.lowestObserverState === exports.IDerivationState.STALE)
            return;
        observable.lowestObserverState = exports.IDerivationState.STALE;
        var observers = observable.observers;
        var i = observers.length;
        while (i--) {
            var d = observers[i];
            if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
                if (d.isTracing !== TraceMode.NONE) {
                    logTraceInfo(d, observable);
                }
                d.onBecomeStale();
            }
            d.dependenciesState = exports.IDerivationState.STALE;
        }
        // invariantLOS(observable, "changed end");
    }
    // Called by ComputedValue when it recalculate and its value changed
    function propagateChangeConfirmed(observable) {
        // invariantLOS(observable, "confirmed start");
        if (observable.lowestObserverState === exports.IDerivationState.STALE)
            return;
        observable.lowestObserverState = exports.IDerivationState.STALE;
        var observers = observable.observers;
        var i = observers.length;
        while (i--) {
            var d = observers[i];
            if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
                d.dependenciesState = exports.IDerivationState.STALE;
            else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
            )
                observable.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
        }
        // invariantLOS(observable, "confirmed end");
    }
    // Used by computed when its dependency changed, but we don't wan't to immediately recompute.
    function propagateMaybeChanged(observable) {
        // invariantLOS(observable, "maybe start");
        if (observable.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
            return;
        observable.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
        var observers = observable.observers;
        var i = observers.length;
        while (i--) {
            var d = observers[i];
            if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
                d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
                if (d.isTracing !== TraceMode.NONE) {
                    logTraceInfo(d, observable);
                }
                d.onBecomeStale();
            }
        }
        // invariantLOS(observable, "maybe end");
    }
    function logTraceInfo(derivation, observable) {
        console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable.name + "'");
        if (derivation.isTracing === TraceMode.BREAK) {
            var lines = [];
            printDepTree(getDependencyTree(derivation), lines, 1);
            // prettier-ignore
            new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
        }
    }
    function printDepTree(tree, lines, depth) {
        if (lines.length >= 1000) {
            lines.push("(and many more)");
            return;
        }
        lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)
        if (tree.dependencies)
            tree.dependencies.forEach(function (child) { return printDepTree(child, lines, depth + 1); });
    }

    var Reaction = /** @class */ (function () {
        function Reaction(name, onInvalidate, errorHandler, requiresObservable) {
            if (name === void 0) { name = "Reaction@" + getNextId(); }
            if (requiresObservable === void 0) { requiresObservable = false; }
            this.name = name;
            this.onInvalidate = onInvalidate;
            this.errorHandler = errorHandler;
            this.requiresObservable = requiresObservable;
            this.observing = []; // nodes we are looking at. Our value depends on these nodes
            this.newObserving = [];
            this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
            this.diffValue = 0;
            this.runId = 0;
            this.unboundDepsCount = 0;
            this.__mapid = "#" + getNextId();
            this.isDisposed = false;
            this._isScheduled = false;
            this._isTrackPending = false;
            this._isRunning = false;
            this.isTracing = TraceMode.NONE;
        }
        Reaction.prototype.onBecomeStale = function () {
            this.schedule();
        };
        Reaction.prototype.schedule = function () {
            if (!this._isScheduled) {
                this._isScheduled = true;
                globalState.pendingReactions.push(this);
                runReactions();
            }
        };
        Reaction.prototype.isScheduled = function () {
            return this._isScheduled;
        };
        /**
         * internal, use schedule() if you intend to kick off a reaction
         */
        Reaction.prototype.runReaction = function () {
            if (!this.isDisposed) {
                startBatch();
                this._isScheduled = false;
                if (shouldCompute(this)) {
                    this._isTrackPending = true;
                    try {
                        this.onInvalidate();
                        if (this._isTrackPending && isSpyEnabled()) {
                            // onInvalidate didn't trigger track right away..
                            spyReport({
                                name: this.name,
                                type: "scheduled-reaction"
                            });
                        }
                    }
                    catch (e) {
                        this.reportExceptionInDerivation(e);
                    }
                }
                endBatch();
            }
        };
        Reaction.prototype.track = function (fn) {
            startBatch();
            var notify = isSpyEnabled();
            var startTime;
            if (notify) {
                startTime = Date.now();
                spyReportStart({
                    name: this.name,
                    type: "reaction"
                });
            }
            this._isRunning = true;
            var result = trackDerivedFunction(this, fn, undefined);
            this._isRunning = false;
            this._isTrackPending = false;
            if (this.isDisposed) {
                // disposed during last run. Clean up everything that was bound after the dispose call.
                clearObserving(this);
            }
            if (isCaughtException(result))
                this.reportExceptionInDerivation(result.cause);
            if (notify) {
                spyReportEnd({
                    time: Date.now() - startTime
                });
            }
            endBatch();
        };
        Reaction.prototype.reportExceptionInDerivation = function (error) {
            var _this = this;
            if (this.errorHandler) {
                this.errorHandler(error, this);
                return;
            }
            if (globalState.disableErrorBoundaries)
                throw error;
            var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
            if (globalState.suppressReactionErrors) {
                console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
            }
            else {
                console.error(message, error);
                /** If debugging brought you here, please, read the above message :-). Tnx! */
            }
            if (isSpyEnabled()) {
                spyReport({
                    type: "error",
                    name: this.name,
                    message: message,
                    error: "" + error
                });
            }
            globalState.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
        };
        Reaction.prototype.dispose = function () {
            if (!this.isDisposed) {
                this.isDisposed = true;
                if (!this._isRunning) {
                    // if disposed while running, clean up later. Maybe not optimal, but rare case
                    startBatch();
                    clearObserving(this);
                    endBatch();
                }
            }
        };
        Reaction.prototype.getDisposer = function () {
            var r = this.dispose.bind(this);
            r.$mobx = this;
            return r;
        };
        Reaction.prototype.toString = function () {
            return "Reaction[" + this.name + "]";
        };
        Reaction.prototype.trace = function (enterBreakPoint) {
            if (enterBreakPoint === void 0) { enterBreakPoint = false; }
            trace(this, enterBreakPoint);
        };
        return Reaction;
    }());
    function onReactionError(handler) {
        globalState.globalReactionErrorHandlers.push(handler);
        return function () {
            var idx = globalState.globalReactionErrorHandlers.indexOf(handler);
            if (idx >= 0)
                globalState.globalReactionErrorHandlers.splice(idx, 1);
        };
    }
    /**
     * Magic number alert!
     * Defines within how many times a reaction is allowed to re-trigger itself
     * until it is assumed that this is gonna be a never ending loop...
     */
    var MAX_REACTION_ITERATIONS = 100;
    var reactionScheduler = function (f) { return f(); };
    function runReactions() {
        // Trampolining, if runReactions are already running, new reactions will be picked up
        if (globalState.inBatch > 0 || globalState.isRunningReactions)
            return;
        reactionScheduler(runReactionsHelper);
    }
    function runReactionsHelper() {
        globalState.isRunningReactions = true;
        var allReactions = globalState.pendingReactions;
        var iterations = 0;
        // While running reactions, new reactions might be triggered.
        // Hence we work with two variables and check whether
        // we converge to no remaining reactions after a while.
        while (allReactions.length > 0) {
            if (++iterations === MAX_REACTION_ITERATIONS) {
                console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." +
                    (" Probably there is a cycle in the reactive function: " + allReactions[0]));
                allReactions.splice(0); // clear reactions
            }
            var remainingReactions = allReactions.splice(0);
            for (var i = 0, l = remainingReactions.length; i < l; i++)
                remainingReactions[i].runReaction();
        }
        globalState.isRunningReactions = false;
    }
    var isReaction = createInstanceofPredicate("Reaction", Reaction);
    function setReactionScheduler(fn) {
        var baseScheduler = reactionScheduler;
        reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
    }

    function isSpyEnabled() {
        return !!globalState.spyListeners.length;
    }
    function spyReport(event) {
        if (!globalState.spyListeners.length)
            return;
        var listeners = globalState.spyListeners;
        for (var i = 0, l = listeners.length; i < l; i++)
            listeners[i](event);
    }
    function spyReportStart(event) {
        var change = __assign(__assign({}, event), { spyReportStart: true });
        spyReport(change);
    }
    var END_EVENT = { spyReportEnd: true };
    function spyReportEnd(change) {
        if (change)
            spyReport(__assign(__assign({}, change), { spyReportEnd: true }));
        else
            spyReport(END_EVENT);
    }
    function spy(listener) {
        globalState.spyListeners.push(listener);
        return once(function () {
            globalState.spyListeners = globalState.spyListeners.filter(function (l) { return l !== listener; });
        });
    }

    function dontReassignFields() {
        fail(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
    }
    function namedActionDecorator(name) {
        return function (target, prop, descriptor) {
            if (descriptor) {
                if (process.env.NODE_ENV !== "production" && descriptor.get !== undefined) {
                    return fail("@action cannot be used with getters");
                }
                // babel / typescript
                // @action method() { }
                if (descriptor.value) {
                    // typescript
                    return {
                        value: createAction(name, descriptor.value),
                        enumerable: false,
                        configurable: true,
                        writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                    };
                }
                // babel only: @action method = () => {}
                var initializer_1 = descriptor.initializer;
                return {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    initializer: function () {
                        // N.B: we can't immediately invoke initializer; this would be wrong
                        return createAction(name, initializer_1.call(this));
                    }
                };
            }
            // bound instance methods
            return actionFieldDecorator(name).apply(this, arguments);
        };
    }
    function actionFieldDecorator(name) {
        // Simple property that writes on first invocation to the current instance
        return function (target, prop, descriptor) {
            Object.defineProperty(target, prop, {
                configurable: true,
                enumerable: false,
                get: function () {
                    return undefined;
                },
                set: function (value) {
                    addHiddenProp(this, prop, action(name, value));
                }
            });
        };
    }
    function boundActionDecorator(target, propertyName, descriptor, applyToInstance) {
        if (applyToInstance === true) {
            defineBoundAction(target, propertyName, descriptor.value);
            return null;
        }
        if (descriptor) {
            // if (descriptor.value)
            // Typescript / Babel: @action.bound method() { }
            // also: babel @action.bound method = () => {}
            return {
                configurable: true,
                enumerable: false,
                get: function () {
                    defineBoundAction(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                    return this[propertyName];
                },
                set: dontReassignFields
            };
        }
        // field decorator Typescript @action.bound method = () => {}
        return {
            enumerable: false,
            configurable: true,
            set: function (v) {
                defineBoundAction(this, propertyName, v);
            },
            get: function () {
                return undefined;
            }
        };
    }

    var action = function action(arg1, arg2, arg3, arg4) {
        // action(fn() {})
        if (arguments.length === 1 && typeof arg1 === "function")
            return createAction(arg1.name || "<unnamed action>", arg1);
        // action("name", fn() {})
        if (arguments.length === 2 && typeof arg2 === "function")
            return createAction(arg1, arg2);
        // @action("name") fn() {}
        if (arguments.length === 1 && typeof arg1 === "string")
            return namedActionDecorator(arg1);
        // @action fn() {}
        if (arg4 === true) {
            // apply to instance immediately
            arg1[arg2] = createAction(arg1.name || arg2, arg3.value);
        }
        else {
            return namedActionDecorator(arg2).apply(null, arguments);
        }
    };
    action.bound = boundActionDecorator;
    function runInAction(arg1, arg2) {
        // TODO: deprecate?
        var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
        var fn = typeof arg1 === "function" ? arg1 : arg2;
        if (process.env.NODE_ENV !== "production") {
            invariant(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
            if (typeof actionName !== "string" || !actionName)
                fail("actions should have valid names, got: '" + actionName + "'");
        }
        return executeAction(actionName, fn, this, undefined);
    }
    function isAction(thing) {
        return typeof thing === "function" && thing.isMobxAction === true;
    }
    function defineBoundAction(target, propertyName, fn) {
        addHiddenProp(target, propertyName, createAction(propertyName, fn.bind(target)));
    }

    /**
     * Creates a named reactive view and keeps it alive, so that the view is always
     * updated if one of the dependencies changes, even when the view is not further used by something else.
     * @param view The reactive view
     * @returns disposer function, which can be used to stop the view from being updated in the future.
     */
    function autorun(view, opts) {
        if (opts === void 0) { opts = EMPTY_OBJECT; }
        if (process.env.NODE_ENV !== "production") {
            invariant(typeof view === "function", "Autorun expects a function as first argument");
            invariant(isAction(view) === false, "Autorun does not accept actions since actions are untrackable");
        }
        var name = (opts && opts.name) || view.name || "Autorun@" + getNextId();
        var runSync = !opts.scheduler && !opts.delay;
        var reaction;
        if (runSync) {
            // normal autorun
            reaction = new Reaction(name, function () {
                this.track(reactionRunner);
            }, opts.onError, opts.requiresObservable);
        }
        else {
            var scheduler_1 = createSchedulerFromOptions(opts);
            // debounced autorun
            var isScheduled_1 = false;
            reaction = new Reaction(name, function () {
                if (!isScheduled_1) {
                    isScheduled_1 = true;
                    scheduler_1(function () {
                        isScheduled_1 = false;
                        if (!reaction.isDisposed)
                            reaction.track(reactionRunner);
                    });
                }
            }, opts.onError, opts.requiresObservable);
        }
        function reactionRunner() {
            view(reaction);
        }
        reaction.schedule();
        return reaction.getDisposer();
    }
    var run = function (f) { return f(); };
    function createSchedulerFromOptions(opts) {
        return opts.scheduler
            ? opts.scheduler
            : opts.delay
                ? function (f) { return setTimeout(f, opts.delay); }
                : run;
    }
    function reaction(expression, effect, opts) {
        if (opts === void 0) { opts = EMPTY_OBJECT; }
        if (typeof opts === "boolean") {
            opts = { fireImmediately: opts };
            deprecated("Using fireImmediately as argument is deprecated. Use '{ fireImmediately: true }' instead");
        }
        if (process.env.NODE_ENV !== "production") {
            invariant(typeof expression === "function", "First argument to reaction should be a function");
            invariant(typeof opts === "object", "Third argument of reactions should be an object");
        }
        var name = opts.name || "Reaction@" + getNextId();
        var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
        var runSync = !opts.scheduler && !opts.delay;
        var scheduler = createSchedulerFromOptions(opts);
        var firstTime = true;
        var isScheduled = false;
        var value;
        var equals = opts.compareStructural
            ? comparer.structural
            : opts.equals || comparer.default;
        var r = new Reaction(name, function () {
            if (firstTime || runSync) {
                reactionRunner();
            }
            else if (!isScheduled) {
                isScheduled = true;
                scheduler(reactionRunner);
            }
        }, opts.onError, opts.requiresObservable);
        function reactionRunner() {
            isScheduled = false; // Q: move into reaction runner?
            if (r.isDisposed)
                return;
            var changed = false;
            r.track(function () {
                var nextValue = expression(r);
                changed = firstTime || !equals(value, nextValue);
                value = nextValue;
            });
            if (firstTime && opts.fireImmediately)
                effectAction(value, r);
            if (!firstTime && changed === true)
                effectAction(value, r);
            if (firstTime)
                firstTime = false;
        }
        r.schedule();
        return r.getDisposer();
    }
    function wrapErrorHandler(errorHandler, baseFn) {
        return function () {
            try {
                return baseFn.apply(this, arguments);
            }
            catch (e) {
                errorHandler.call(this, e);
            }
        };
    }

    function onBecomeObserved(thing, arg2, arg3) {
        return interceptHook("onBecomeObserved", thing, arg2, arg3);
    }
    function onBecomeUnobserved(thing, arg2, arg3) {
        return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
    }
    function interceptHook(hook, thing, arg2, arg3) {
        var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
        var cb = typeof arg3 === "function" ? arg3 : arg2;
        var orig = atom[hook];
        if (typeof orig !== "function")
            return fail(process.env.NODE_ENV !== "production" && "Not an atom that can be (un)observed");
        atom[hook] = function () {
            orig.call(this);
            cb.call(this);
        };
        return function () {
            atom[hook] = orig;
        };
    }

    function configure(options) {
        var enforceActions = options.enforceActions, computedRequiresReaction = options.computedRequiresReaction, computedConfigurable = options.computedConfigurable, disableErrorBoundaries = options.disableErrorBoundaries, arrayBuffer = options.arrayBuffer, reactionScheduler = options.reactionScheduler, reactionRequiresObservable = options.reactionRequiresObservable, observableRequiresReaction = options.observableRequiresReaction;
        if (options.isolateGlobalState === true) {
            isolateGlobalState();
        }
        if (enforceActions !== undefined) {
            if (typeof enforceActions === "boolean" || enforceActions === "strict")
                deprecated("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
            var ea = void 0;
            switch (enforceActions) {
                case true:
                case "observed":
                    ea = true;
                    break;
                case false:
                case "never":
                    ea = false;
                    break;
                case "strict":
                case "always":
                    ea = "strict";
                    break;
                default:
                    fail("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
            }
            globalState.enforceActions = ea;
            globalState.allowStateChanges = ea === true || ea === "strict" ? false : true;
        }
        if (computedRequiresReaction !== undefined) {
            globalState.computedRequiresReaction = !!computedRequiresReaction;
        }
        if (reactionRequiresObservable !== undefined) {
            globalState.reactionRequiresObservable = !!reactionRequiresObservable;
        }
        if (observableRequiresReaction !== undefined) {
            globalState.observableRequiresReaction = !!observableRequiresReaction;
            globalState.allowStateReads = !globalState.observableRequiresReaction;
        }
        if (computedConfigurable !== undefined) {
            globalState.computedConfigurable = !!computedConfigurable;
        }
        if (disableErrorBoundaries !== undefined) {
            if (disableErrorBoundaries === true)
                console.warn("WARNING: Debug feature only. MobX will NOT recover from errors if this is on.");
            globalState.disableErrorBoundaries = !!disableErrorBoundaries;
        }
        if (typeof arrayBuffer === "number") {
            reserveArrayBuffer(arrayBuffer);
        }
        if (reactionScheduler) {
            setReactionScheduler(reactionScheduler);
        }
    }

    function decorate(thing, decorators) {
        if (process.env.NODE_ENV !== "production" && !isPlainObject(decorators))
            fail("Decorators should be a key value map");
        var target = typeof thing === "function" ? thing.prototype : thing;
        var _loop_1 = function (prop) {
            var propertyDecorators = decorators[prop];
            if (!Array.isArray(propertyDecorators)) {
                propertyDecorators = [propertyDecorators];
            }
            // prettier-ignore
            if (process.env.NODE_ENV !== "production" && !propertyDecorators.every(function (decorator) { return typeof decorator === "function"; }))
                fail("Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
            var descriptor = Object.getOwnPropertyDescriptor(target, prop);
            var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) { return decorator(target, prop, accDescriptor); }, descriptor);
            if (newDescriptor)
                Object.defineProperty(target, prop, newDescriptor);
        };
        for (var prop in decorators) {
            _loop_1(prop);
        }
        return thing;
    }

    function extendShallowObservable(target, properties, decorators) {
        deprecated("'extendShallowObservable' is deprecated, use 'extendObservable(target, props, { deep: false })' instead");
        return extendObservable(target, properties, decorators, shallowCreateObservableOptions);
    }
    function extendObservable(target, properties, decorators, options) {
        if (process.env.NODE_ENV !== "production") {
            invariant(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
            invariant(typeof target === "object", "'extendObservable' expects an object as first argument");
            invariant(!isObservableMap(target), "'extendObservable' should not be used on maps, use map.merge instead");
            invariant(!isObservable(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
            if (decorators)
                for (var key in decorators)
                    if (!(key in properties))
                        fail("Trying to declare a decorator for unspecified property '" + key + "'");
        }
        options = asCreateObservableOptions(options);
        var defaultDecorator = options.defaultDecorator || (options.deep === false ? refDecorator : deepDecorator);
        initializeInstance(target);
        asObservableObject(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
        startBatch();
        try {
            var keys = Object.getOwnPropertyNames(properties);
            for (var i = 0, l = keys.length; i < l; i++) {
                var key = keys[i];
                var descriptor = Object.getOwnPropertyDescriptor(properties, key);
                if (process.env.NODE_ENV !== "production") {
                    if (isComputed(descriptor.value))
                        fail("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
                }
                var decorator = decorators && key in decorators
                    ? decorators[key]
                    : descriptor.get
                        ? computedDecorator
                        : defaultDecorator;
                if (process.env.NODE_ENV !== "production" && typeof decorator !== "function")
                    return fail("Not a valid decorator for '" + key + "', got: " + decorator);
                var resultDescriptor = decorator(target, key, descriptor, true);
                if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
                )
                    Object.defineProperty(target, key, resultDescriptor);
            }
        }
        finally {
            endBatch();
        }
        return target;
    }

    function getDependencyTree(thing, property) {
        return nodeToDependencyTree(getAtom(thing, property));
    }
    function nodeToDependencyTree(node) {
        var result = {
            name: node.name
        };
        if (node.observing && node.observing.length > 0)
            result.dependencies = unique(node.observing).map(nodeToDependencyTree);
        return result;
    }
    function getObserverTree(thing, property) {
        return nodeToObserverTree(getAtom(thing, property));
    }
    function nodeToObserverTree(node) {
        var result = {
            name: node.name
        };
        if (hasObservers(node))
            result.observers = getObservers(node).map(nodeToObserverTree);
        return result;
    }

    var generatorId = 0;
    function FlowCancellationError() {
        this.message = "FLOW_CANCELLED";
    }
    FlowCancellationError.prototype = Object.create(Error.prototype);
    function isFlowCancellationError(error) {
        return error instanceof FlowCancellationError;
    }
    function flow(generator) {
        if (arguments.length !== 1)
            fail(!!process.env.NODE_ENV && "Flow expects one 1 argument and cannot be used as decorator");
        var name = generator.name || "<unnamed flow>";
        // Implementation based on https://github.com/tj/co/blob/master/index.js
        return function () {
            var ctx = this;
            var args = arguments;
            var runId = ++generatorId;
            var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
            var rejector;
            var pendingPromise = undefined;
            var res = new Promise(function (resolve, reject) {
                var stepId = 0;
                rejector = reject;
                function onFulfilled(res) {
                    pendingPromise = undefined;
                    var ret;
                    try {
                        ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
                    }
                    catch (e) {
                        return reject(e);
                    }
                    next(ret);
                }
                function onRejected(err) {
                    pendingPromise = undefined;
                    var ret;
                    try {
                        ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
                    }
                    catch (e) {
                        return reject(e);
                    }
                    next(ret);
                }
                function next(ret) {
                    if (ret && typeof ret.then === "function") {
                        // an async iterator
                        ret.then(next, reject);
                        return;
                    }
                    if (ret.done)
                        return resolve(ret.value);
                    pendingPromise = Promise.resolve(ret.value);
                    return pendingPromise.then(onFulfilled, onRejected);
                }
                onFulfilled(undefined); // kick off the process
            });
            res.cancel = action(name + " - runid: " + runId + " - cancel", function () {
                try {
                    if (pendingPromise)
                        cancelPromise(pendingPromise);
                    // Finally block can return (or yield) stuff..
                    var res_1 = gen.return(undefined);
                    // eat anything that promise would do, it's cancelled!
                    var yieldedPromise = Promise.resolve(res_1.value);
                    yieldedPromise.then(noop, noop);
                    cancelPromise(yieldedPromise); // maybe it can be cancelled :)
                    // reject our original promise
                    rejector(new FlowCancellationError());
                }
                catch (e) {
                    rejector(e); // there could be a throwing finally block
                }
            });
            return res;
        };
    }
    function cancelPromise(promise) {
        if (typeof promise.cancel === "function")
            promise.cancel();
    }

    function interceptReads(thing, propOrHandler, handler) {
        var target;
        if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
            target = getAdministration(thing);
        }
        else if (isObservableObject(thing)) {
            if (typeof propOrHandler !== "string")
                return fail(process.env.NODE_ENV !== "production" &&
                    "InterceptReads can only be used with a specific property, not with an object in general");
            target = getAdministration(thing, propOrHandler);
        }
        else {
            return fail(process.env.NODE_ENV !== "production" &&
                "Expected observable map, object or array as first array");
        }
        if (target.dehancer !== undefined)
            return fail(process.env.NODE_ENV !== "production" && "An intercept reader was already established");
        target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
        return function () {
            target.dehancer = undefined;
        };
    }

    function intercept(thing, propOrHandler, handler) {
        if (typeof handler === "function")
            return interceptProperty(thing, propOrHandler, handler);
        else
            return interceptInterceptable(thing, propOrHandler);
    }
    function interceptInterceptable(thing, handler) {
        return getAdministration(thing).intercept(handler);
    }
    function interceptProperty(thing, property, handler) {
        return getAdministration(thing, property).intercept(handler);
    }

    function _isComputed(value, property) {
        if (value === null || value === undefined)
            return false;
        if (property !== undefined) {
            if (isObservableObject(value) === false)
                return false;
            if (!value.$mobx.values[property])
                return false;
            var atom = getAtom(value, property);
            return isComputedValue(atom);
        }
        return isComputedValue(value);
    }
    function isComputed(value) {
        if (arguments.length > 1)
            return fail(process.env.NODE_ENV !== "production" &&
                "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
        return _isComputed(value);
    }
    function isComputedProp(value, propName) {
        if (typeof propName !== "string")
            return fail(process.env.NODE_ENV !== "production" &&
                "isComputed expected a property name as second argument");
        return _isComputed(value, propName);
    }

    function _isObservable(value, property) {
        if (value === null || value === undefined)
            return false;
        if (property !== undefined) {
            if (process.env.NODE_ENV !== "production" &&
                (isObservableMap(value) || isObservableArray(value)))
                return fail("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
            if (isObservableObject(value)) {
                var o = value.$mobx;
                return o.values && !!o.values[property];
            }
            return false;
        }
        // For first check, see #701
        return (isObservableObject(value) ||
            !!value.$mobx ||
            isAtom(value) ||
            isReaction(value) ||
            isComputedValue(value));
    }
    function isObservable(value) {
        if (arguments.length !== 1)
            fail(process.env.NODE_ENV !== "production" &&
                "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
        return _isObservable(value);
    }
    function isObservableProp(value, propName) {
        if (typeof propName !== "string")
            return fail(process.env.NODE_ENV !== "production" && "expected a property name as second argument");
        return _isObservable(value, propName);
    }

    function keys(obj) {
        if (isObservableObject(obj)) {
            return obj.$mobx.getKeys();
        }
        if (isObservableMap(obj)) {
            return iteratorToArray(obj.keys());
        }
        if (isObservableSet(obj)) {
            return iteratorToArray(obj.keys());
        }
        if (isObservableArray(obj)) {
            return obj.map(function (_, index) { return index; });
        }
        return fail(process.env.NODE_ENV !== "production" &&
            "'keys()' can only be used on observable objects, arrays, sets and maps");
    }
    function values(obj) {
        if (isObservableObject(obj)) {
            return keys(obj).map(function (key) { return obj[key]; });
        }
        if (isObservableMap(obj)) {
            return keys(obj).map(function (key) { return obj.get(key); });
        }
        if (isObservableSet(obj)) {
            return iteratorToArray(obj.values());
        }
        if (isObservableArray(obj)) {
            return obj.slice();
        }
        return fail(process.env.NODE_ENV !== "production" &&
            "'values()' can only be used on observable objects, arrays, sets and maps");
    }
    function entries(obj) {
        if (isObservableObject(obj)) {
            return keys(obj).map(function (key) { return [key, obj[key]]; });
        }
        if (isObservableMap(obj)) {
            return keys(obj).map(function (key) { return [key, obj.get(key)]; });
        }
        if (isObservableSet(obj)) {
            return iteratorToArray(obj.entries());
        }
        if (isObservableArray(obj)) {
            return obj.map(function (key, index) { return [index, key]; });
        }
        return fail(process.env.NODE_ENV !== "production" &&
            "'entries()' can only be used on observable objects, arrays and maps");
    }
    function set(obj, key, value) {
        if (arguments.length === 2 && !isObservableSet(obj)) {
            startBatch();
            var values_1 = key;
            try {
                for (var key_1 in values_1)
                    set(obj, key_1, values_1[key_1]);
            }
            finally {
                endBatch();
            }
            return;
        }
        if (isObservableObject(obj)) {
            var adm = obj.$mobx;
            var existingObservable = adm.values[key];
            if (existingObservable) {
                adm.write(obj, key, value);
            }
            else {
                defineObservableProperty(obj, key, value, adm.defaultEnhancer);
            }
        }
        else if (isObservableMap(obj)) {
            obj.set(key, value);
        }
        else if (isObservableSet(obj)) {
            obj.add(key);
        }
        else if (isObservableArray(obj)) {
            if (typeof key !== "number")
                key = parseInt(key, 10);
            invariant(key >= 0, "Not a valid index: '" + key + "'");
            startBatch();
            if (key >= obj.length)
                obj.length = key + 1;
            obj[key] = value;
            endBatch();
        }
        else {
            return fail(process.env.NODE_ENV !== "production" &&
                "'set()' can only be used on observable objects, arrays and maps");
        }
    }
    function remove(obj, key) {
        if (isObservableObject(obj)) {
            obj.$mobx.remove(key);
        }
        else if (isObservableMap(obj)) {
            obj.delete(key);
        }
        else if (isObservableSet(obj)) {
            obj.delete(key);
        }
        else if (isObservableArray(obj)) {
            if (typeof key !== "number")
                key = parseInt(key, 10);
            invariant(key >= 0, "Not a valid index: '" + key + "'");
            obj.splice(key, 1);
        }
        else {
            return fail(process.env.NODE_ENV !== "production" &&
                "'remove()' can only be used on observable objects, arrays and maps");
        }
    }
    function has(obj, key) {
        if (isObservableObject(obj)) {
            // return keys(obj).indexOf(key) >= 0
            var adm = getAdministration(obj);
            adm.getKeys(); // make sure we get notified of key changes, but for performance, use the values map to look up existence
            return !!adm.values[key];
        }
        else if (isObservableMap(obj)) {
            return obj.has(key);
        }
        else if (isObservableSet(obj)) {
            return obj.has(key);
        }
        else if (isObservableArray(obj)) {
            return key >= 0 && key < obj.length;
        }
        else {
            return fail(process.env.NODE_ENV !== "production" &&
                "'has()' can only be used on observable objects, arrays and maps");
        }
    }
    function get(obj, key) {
        if (!has(obj, key))
            return undefined;
        if (isObservableObject(obj)) {
            return obj[key];
        }
        else if (isObservableMap(obj)) {
            return obj.get(key);
        }
        else if (isObservableArray(obj)) {
            return obj[key];
        }
        else {
            return fail(process.env.NODE_ENV !== "production" &&
                "'get()' can only be used on observable objects, arrays and maps");
        }
    }

    function observe(thing, propOrCb, cbOrFire, fireImmediately) {
        if (typeof cbOrFire === "function")
            return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
        else
            return observeObservable(thing, propOrCb, cbOrFire);
    }
    function observeObservable(thing, listener, fireImmediately) {
        return getAdministration(thing).observe(listener, fireImmediately);
    }
    function observeObservableProperty(thing, property, listener, fireImmediately) {
        return getAdministration(thing, property).observe(listener, fireImmediately);
    }

    var defaultOptions = {
        detectCycles: true,
        exportMapsAsObjects: true,
        recurseEverything: false
    };
    function cache(map, key, value, options) {
        if (options.detectCycles)
            map.set(key, value);
        return value;
    }
    function toJSHelper(source, options, __alreadySeen) {
        if (!options.recurseEverything && !isObservable(source))
            return source;
        if (typeof source !== "object")
            return source;
        // Directly return null if source is null
        if (source === null)
            return null;
        // Directly return the Date object itself if contained in the observable
        if (source instanceof Date)
            return source;
        if (isObservableValue(source))
            return toJSHelper(source.get(), options, __alreadySeen);
        // make sure we track the keys of the object
        if (isObservable(source))
            keys(source);
        var detectCycles = options.detectCycles === true;
        if (detectCycles && source !== null && __alreadySeen.has(source)) {
            return __alreadySeen.get(source);
        }
        if (isObservableArray(source) || Array.isArray(source)) {
            var res_1 = cache(__alreadySeen, source, [], options);
            var toAdd = source.map(function (value) { return toJSHelper(value, options, __alreadySeen); });
            res_1.length = toAdd.length;
            for (var i = 0, l = toAdd.length; i < l; i++)
                res_1[i] = toAdd[i];
            return res_1;
        }
        if (isObservableSet(source) || Object.getPrototypeOf(source) === Set.prototype) {
            if (options.exportMapsAsObjects === false) {
                var res_2 = cache(__alreadySeen, source, new Set(), options);
                source.forEach(function (value) {
                    res_2.add(toJSHelper(value, options, __alreadySeen));
                });
                return res_2;
            }
            else {
                var res_3 = cache(__alreadySeen, source, [], options);
                source.forEach(function (value) {
                    res_3.push(toJSHelper(value, options, __alreadySeen));
                });
                return res_3;
            }
        }
        if (isObservableMap(source) || Object.getPrototypeOf(source) === Map.prototype) {
            if (options.exportMapsAsObjects === false) {
                var res_4 = cache(__alreadySeen, source, new Map(), options);
                source.forEach(function (value, key) {
                    res_4.set(key, toJSHelper(value, options, __alreadySeen));
                });
                return res_4;
            }
            else {
                var res_5 = cache(__alreadySeen, source, {}, options);
                source.forEach(function (value, key) {
                    res_5[key] = toJSHelper(value, options, __alreadySeen);
                });
                return res_5;
            }
        }
        // Fallback to the situation that source is an ObservableObject or a plain object
        var res = cache(__alreadySeen, source, {}, options);
        for (var key in source) {
            res[key] = toJSHelper(source[key], options, __alreadySeen);
        }
        return res;
    }
    function toJS(source, options) {
        // backward compatibility
        if (typeof options === "boolean")
            options = { detectCycles: options };
        if (!options)
            options = defaultOptions;
        options.detectCycles =
            options.detectCycles === undefined
                ? options.recurseEverything === true
                : options.detectCycles === true;
        var __alreadySeen;
        if (options.detectCycles)
            __alreadySeen = new Map();
        return toJSHelper(source, options, __alreadySeen);
    }

    function trace() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var enterBreakPoint = false;
        if (typeof args[args.length - 1] === "boolean")
            enterBreakPoint = args.pop();
        var derivation = getAtomFromArgs(args);
        if (!derivation) {
            return fail(process.env.NODE_ENV !== "production" &&
                "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
        }
        if (derivation.isTracing === TraceMode.NONE) {
            console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
        }
        derivation.isTracing = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
    }
    function getAtomFromArgs(args) {
        switch (args.length) {
            case 0:
                return globalState.trackingDerivation;
            case 1:
                return getAtom(args[0]);
            case 2:
                return getAtom(args[0], args[1]);
        }
    }

    /**
     * During a transaction no views are updated until the end of the transaction.
     * The transaction will be run synchronously nonetheless.
     *
     * @param action a function that updates some reactive state
     * @returns any value that was returned by the 'action' parameter.
     */
    function transaction(action, thisArg) {
        if (thisArg === void 0) { thisArg = undefined; }
        startBatch();
        try {
            return action.apply(thisArg);
        }
        finally {
            endBatch();
        }
    }

    function when(predicate, arg1, arg2) {
        if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
            return whenPromise(predicate, arg1);
        return _when(predicate, arg1, arg2 || {});
    }
    function _when(predicate, effect, opts) {
        var timeoutHandle;
        if (typeof opts.timeout === "number") {
            timeoutHandle = setTimeout(function () {
                if (!disposer.$mobx.isDisposed) {
                    disposer();
                    var error = new Error("WHEN_TIMEOUT");
                    if (opts.onError)
                        opts.onError(error);
                    else
                        throw error;
                }
            }, opts.timeout);
        }
        opts.name = opts.name || "When@" + getNextId();
        var effectAction = createAction(opts.name + "-effect", effect);
        var disposer = autorun(function (r) {
            if (predicate()) {
                r.dispose();
                if (timeoutHandle)
                    clearTimeout(timeoutHandle);
                effectAction();
            }
        }, opts);
        return disposer;
    }
    function whenPromise(predicate, opts) {
        if (process.env.NODE_ENV !== "production" && opts && opts.onError)
            return fail("the options 'onError' and 'promise' cannot be combined");
        var cancel;
        var res = new Promise(function (resolve, reject) {
            var disposer = _when(predicate, resolve, __assign(__assign({}, opts), { onError: reject }));
            cancel = function () {
                disposer();
                reject("WHEN_CANCELLED");
            };
        });
        res.cancel = cancel;
        return res;
    }

    function hasInterceptors(interceptable) {
        return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
    }
    function registerInterceptor(interceptable, handler) {
        var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
        interceptors.push(handler);
        return once(function () {
            var idx = interceptors.indexOf(handler);
            if (idx !== -1)
                interceptors.splice(idx, 1);
        });
    }
    function interceptChange(interceptable, change) {
        var prevU = untrackedStart();
        try {
            var interceptors = interceptable.interceptors;
            if (interceptors)
                for (var i = 0, l = interceptors.length; i < l; i++) {
                    change = interceptors[i](change);
                    invariant(!change || change.type, "Intercept handlers should return nothing or a change object");
                    if (!change)
                        break;
                }
            return change;
        }
        finally {
            untrackedEnd(prevU);
        }
    }

    function hasListeners(listenable) {
        return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
    }
    function registerListener(listenable, handler) {
        var listeners = listenable.changeListeners || (listenable.changeListeners = []);
        listeners.push(handler);
        return once(function () {
            var idx = listeners.indexOf(handler);
            if (idx !== -1)
                listeners.splice(idx, 1);
        });
    }
    function notifyListeners(listenable, change) {
        var prevU = untrackedStart();
        var listeners = listenable.changeListeners;
        if (!listeners)
            return;
        listeners = listeners.slice();
        for (var i = 0, l = listeners.length; i < l; i++) {
            listeners[i](change);
        }
        untrackedEnd(prevU);
    }

    var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
    // Detects bug in safari 9.1.1 (or iOS 9 safari mobile). See #364
    var safariPrototypeSetterInheritanceBug = (function () {
        var v = false;
        var p = {};
        Object.defineProperty(p, "0", {
            set: function () {
                v = true;
            }
        });
        Object.create(p)["0"] = 1;
        return v === false;
    })();
    /**
     * This array buffer contains two lists of properties, so that all arrays
     * can recycle their property definitions, which significantly improves performance of creating
     * properties on the fly.
     */
    var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
    // Typescript workaround to make sure ObservableArray extends Array
    var StubArray = /** @class */ (function () {
        function StubArray() {
        }
        return StubArray;
    }());
    function inherit(ctor, proto) {
        if (typeof Object["setPrototypeOf"] !== "undefined") {
            Object["setPrototypeOf"](ctor.prototype, proto);
        }
        else if (typeof ctor.prototype.__proto__ !== "undefined") {
            ctor.prototype.__proto__ = proto;
        }
        else {
            ctor["prototype"] = proto;
        }
    }
    inherit(StubArray, Array.prototype);
    // Weex freeze Array.prototype
    // Make them writeable and configurable in prototype chain
    // https://github.com/alibaba/weex/pull/1529
    if (Object.isFrozen(Array)) {
        [
            "constructor",
            "push",
            "shift",
            "concat",
            "pop",
            "unshift",
            "replace",
            "find",
            "findIndex",
            "splice",
            "reverse",
            "sort"
        ].forEach(function (key) {
            Object.defineProperty(StubArray.prototype, key, {
                configurable: true,
                writable: true,
                value: Array.prototype[key]
            });
        });
    }
    var ObservableArrayAdministration = /** @class */ (function () {
        function ObservableArrayAdministration(name, enhancer, array, owned) {
            this.array = array;
            this.owned = owned;
            this.values = [];
            this.lastKnownLength = 0;
            this.atom = new Atom(name || "ObservableArray@" + getNextId());
            this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
        }
        ObservableArrayAdministration.prototype.dehanceValue = function (value) {
            if (this.dehancer !== undefined)
                return this.dehancer(value);
            return value;
        };
        ObservableArrayAdministration.prototype.dehanceValues = function (values) {
            if (this.dehancer !== undefined && values.length > 0)
                return values.map(this.dehancer);
            return values;
        };
        ObservableArrayAdministration.prototype.intercept = function (handler) {
            return registerInterceptor(this, handler);
        };
        ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
            if (fireImmediately === void 0) { fireImmediately = false; }
            if (fireImmediately) {
                listener({
                    object: this.array,
                    type: "splice",
                    index: 0,
                    added: this.values.slice(),
                    addedCount: this.values.length,
                    removed: [],
                    removedCount: 0
                });
            }
            return registerListener(this, listener);
        };
        ObservableArrayAdministration.prototype.getArrayLength = function () {
            this.atom.reportObserved();
            return this.values.length;
        };
        ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
            if (typeof newLength !== "number" || newLength < 0)
                throw new Error("[mobx.array] Out of range: " + newLength);
            var currentLength = this.values.length;
            if (newLength === currentLength)
                return;
            else if (newLength > currentLength) {
                var newItems = new Array(newLength - currentLength);
                for (var i = 0; i < newLength - currentLength; i++)
                    newItems[i] = undefined; // No Array.fill everywhere...
                this.spliceWithArray(currentLength, 0, newItems);
            }
            else
                this.spliceWithArray(newLength, currentLength - newLength);
        };
        // adds / removes the necessary numeric properties to this object
        ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
            if (oldLength !== this.lastKnownLength)
                throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed. Did you use peek() to change it?");
            this.lastKnownLength += delta;
            if (delta > 0 && oldLength + delta + 1 > OBSERVABLE_ARRAY_BUFFER_SIZE)
                reserveArrayBuffer(oldLength + delta + 1);
        };
        ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
            var _this = this;
            checkIfStateModificationsAreAllowed(this.atom);
            var length = this.values.length;
            if (index === undefined)
                index = 0;
            else if (index > length)
                index = length;
            else if (index < 0)
                index = Math.max(0, length + index);
            if (arguments.length === 1)
                deleteCount = length - index;
            else if (deleteCount === undefined || deleteCount === null)
                deleteCount = 0;
            else
                deleteCount = Math.max(0, Math.min(deleteCount, length - index));
            if (newItems === undefined)
                newItems = EMPTY_ARRAY;
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    object: this.array,
                    type: "splice",
                    index: index,
                    removedCount: deleteCount,
                    added: newItems
                });
                if (!change)
                    return EMPTY_ARRAY;
                deleteCount = change.removedCount;
                newItems = change.added;
            }
            newItems =
                newItems.length === 0 ? newItems : newItems.map(function (v) { return _this.enhancer(v, undefined); });
            var lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // create or remove new entries
            var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
            if (deleteCount !== 0 || newItems.length !== 0)
                this.notifyArraySplice(index, newItems, res);
            return this.dehanceValues(res);
        };
        ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
            var _a;
            if (newItems.length < MAX_SPLICE_SIZE) {
                return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
            }
            else {
                var res = this.values.slice(index, index + deleteCount);
                this.values = this.values
                    .slice(0, index)
                    .concat(newItems, this.values.slice(index + deleteCount));
                return res;
            }
        };
        ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
            var notifySpy = !this.owned && isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    object: this.array,
                    type: "update",
                    index: index,
                    newValue: newValue,
                    oldValue: oldValue
                }
                : null;
            if (notifySpy)
                spyReportStart(__assign(__assign({}, change), { name: this.atom.name }));
            this.atom.reportChanged();
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        };
        ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
            var notifySpy = !this.owned && isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    object: this.array,
                    type: "splice",
                    index: index,
                    removed: removed,
                    added: added,
                    removedCount: removed.length,
                    addedCount: added.length
                }
                : null;
            if (notifySpy)
                spyReportStart(__assign(__assign({}, change), { name: this.atom.name }));
            this.atom.reportChanged();
            // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        };
        return ObservableArrayAdministration;
    }());
    var ObservableArray = /** @class */ (function (_super) {
        __extends(ObservableArray, _super);
        function ObservableArray(initialValues, enhancer, name, owned) {
            if (name === void 0) { name = "ObservableArray@" + getNextId(); }
            if (owned === void 0) { owned = false; }
            var _this = _super.call(this) || this;
            var adm = new ObservableArrayAdministration(name, enhancer, _this, owned);
            addHiddenFinalProp(_this, "$mobx", adm);
            if (initialValues && initialValues.length) {
                var prev = allowStateChangesStart(true);
                _this.spliceWithArray(0, 0, initialValues);
                allowStateChangesEnd(prev);
            }
            if (safariPrototypeSetterInheritanceBug) {
                // Seems that Safari won't use numeric prototype setter untill any * numeric property is
                // defined on the instance. After that it works fine, even if this property is deleted.
                Object.defineProperty(adm.array, "0", ENTRY_0);
            }
            return _this;
        }
        ObservableArray.prototype.intercept = function (handler) {
            return this.$mobx.intercept(handler);
        };
        ObservableArray.prototype.observe = function (listener, fireImmediately) {
            if (fireImmediately === void 0) { fireImmediately = false; }
            return this.$mobx.observe(listener, fireImmediately);
        };
        ObservableArray.prototype.clear = function () {
            return this.splice(0);
        };
        ObservableArray.prototype.concat = function () {
            var arrays = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arrays[_i] = arguments[_i];
            }
            this.$mobx.atom.reportObserved();
            return Array.prototype.concat.apply(this.peek(), arrays.map(function (a) { return (isObservableArray(a) ? a.peek() : a); }));
        };
        ObservableArray.prototype.replace = function (newItems) {
            return this.$mobx.spliceWithArray(0, this.$mobx.values.length, newItems);
        };
        /**
         * Converts this array back to a (shallow) javascript structure.
         * For a deep clone use mobx.toJS
         */
        ObservableArray.prototype.toJS = function () {
            return this.slice();
        };
        ObservableArray.prototype.toJSON = function () {
            // Used by JSON.stringify
            return this.toJS();
        };
        ObservableArray.prototype.peek = function () {
            this.$mobx.atom.reportObserved();
            return this.$mobx.dehanceValues(this.$mobx.values);
        };
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        ObservableArray.prototype.find = function (predicate, thisArg, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            if (arguments.length === 3)
                deprecated("The array.find fromIndex argument to find will not be supported anymore in the next major");
            var idx = this.findIndex.apply(this, arguments);
            return idx === -1 ? undefined : this.get(idx);
        };
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
        ObservableArray.prototype.findIndex = function (predicate, thisArg, fromIndex) {
            if (fromIndex === void 0) { fromIndex = 0; }
            if (arguments.length === 3)
                deprecated("The array.findIndex fromIndex argument to find will not be supported anymore in the next major");
            var items = this.peek(), l = items.length;
            for (var i = fromIndex; i < l; i++)
                if (predicate.call(thisArg, items[i], i, this))
                    return i;
            return -1;
        };
        /*
         * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
         * since these functions alter the inner structure of the array, the have side effects.
         * Because the have side effects, they should not be used in computed function,
         * and for that reason the do not call dependencyState.notifyObserved
         */
        ObservableArray.prototype.splice = function (index, deleteCount) {
            var newItems = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                newItems[_i - 2] = arguments[_i];
            }
            switch (arguments.length) {
                case 0:
                    return [];
                case 1:
                    return this.$mobx.spliceWithArray(index);
                case 2:
                    return this.$mobx.spliceWithArray(index, deleteCount);
            }
            return this.$mobx.spliceWithArray(index, deleteCount, newItems);
        };
        ObservableArray.prototype.spliceWithArray = function (index, deleteCount, newItems) {
            return this.$mobx.spliceWithArray(index, deleteCount, newItems);
        };
        ObservableArray.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var adm = this.$mobx;
            adm.spliceWithArray(adm.values.length, 0, items);
            return adm.values.length;
        };
        ObservableArray.prototype.pop = function () {
            return this.splice(Math.max(this.$mobx.values.length - 1, 0), 1)[0];
        };
        ObservableArray.prototype.shift = function () {
            return this.splice(0, 1)[0];
        };
        ObservableArray.prototype.unshift = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
            }
            var adm = this.$mobx;
            adm.spliceWithArray(0, 0, items);
            return adm.values.length;
        };
        ObservableArray.prototype.reverse = function () {
            // reverse by default mutates in place before returning the result
            // which makes it both a 'derivation' and a 'mutation'.
            // so we deviate from the default and just make it an dervitation
            var clone = this.slice();
            return clone.reverse.apply(clone, arguments);
        };
        ObservableArray.prototype.sort = function (compareFn) {
            // sort by default mutates in place before returning the result
            // which goes against all good practices. Let's not change the array in place!
            var clone = this.slice();
            return clone.sort.apply(clone, arguments);
        };
        ObservableArray.prototype.remove = function (value) {
            var idx = this.$mobx.dehanceValues(this.$mobx.values).indexOf(value);
            if (idx > -1) {
                this.splice(idx, 1);
                return true;
            }
            return false;
        };
        ObservableArray.prototype.move = function (fromIndex, toIndex) {
            deprecated("observableArray.move is deprecated, use .slice() & .replace() instead");
            function checkIndex(index) {
                if (index < 0) {
                    throw new Error("[mobx.array] Index out of bounds: " + index + " is negative");
                }
                var length = this.$mobx.values.length;
                if (index >= length) {
                    throw new Error("[mobx.array] Index out of bounds: " + index + " is not smaller than " + length);
                }
            }
            checkIndex.call(this, fromIndex);
            checkIndex.call(this, toIndex);
            if (fromIndex === toIndex) {
                return;
            }
            var oldItems = this.$mobx.values;
            var newItems;
            if (fromIndex < toIndex) {
                newItems = __spread(oldItems.slice(0, fromIndex), oldItems.slice(fromIndex + 1, toIndex + 1), [
                    oldItems[fromIndex]
                ], oldItems.slice(toIndex + 1));
            }
            else {
                // toIndex < fromIndex
                newItems = __spread(oldItems.slice(0, toIndex), [
                    oldItems[fromIndex]
                ], oldItems.slice(toIndex, fromIndex), oldItems.slice(fromIndex + 1));
            }
            this.replace(newItems);
        };
        // See #734, in case property accessors are unreliable...
        ObservableArray.prototype.get = function (index) {
            var impl = this.$mobx;
            if (impl) {
                if (index < impl.values.length) {
                    impl.atom.reportObserved();
                    return impl.dehanceValue(impl.values[index]);
                }
                console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + impl.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
            }
            return undefined;
        };
        // See #734, in case property accessors are unreliable...
        ObservableArray.prototype.set = function (index, newValue) {
            var adm = this.$mobx;
            var values = adm.values;
            if (index < values.length) {
                // update at index in range
                checkIfStateModificationsAreAllowed(adm.atom);
                var oldValue = values[index];
                if (hasInterceptors(adm)) {
                    var change = interceptChange(adm, {
                        type: "update",
                        object: this,
                        index: index,
                        newValue: newValue
                    });
                    if (!change)
                        return;
                    newValue = change.newValue;
                }
                newValue = adm.enhancer(newValue, oldValue);
                var changed = newValue !== oldValue;
                if (changed) {
                    values[index] = newValue;
                    adm.notifyArrayChildUpdate(index, newValue, oldValue);
                }
            }
            else if (index === values.length) {
                // add a new item
                adm.spliceWithArray(index, 0, [newValue]);
            }
            else {
                // out of bounds
                throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values.length);
            }
        };
        return ObservableArray;
    }(StubArray));
    declareIterator(ObservableArray.prototype, function () {
        this.$mobx.atom.reportObserved();
        var self = this;
        var nextIndex = 0;
        return makeIterable({
            next: function () {
                return nextIndex < self.length
                    ? { value: self[nextIndex++], done: false }
                    : { done: true, value: undefined };
            }
        });
    });
    Object.defineProperty(ObservableArray.prototype, "length", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this.$mobx.getArrayLength();
        },
        set: function (newLength) {
            this.$mobx.setArrayLength(newLength);
        }
    });
    addHiddenProp(ObservableArray.prototype, toStringTagSymbol(), "Array");
    ["indexOf", "join", "lastIndexOf", "slice", "toString", "toLocaleString"].forEach(function (funcName) {
        var baseFunc = Array.prototype[funcName];
        invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
        addHiddenProp(ObservableArray.prototype, funcName, function () {
            return baseFunc.apply(this.peek(), arguments);
        });
    });
    [
        "every",
        "filter",
        //"find", // implemented individually (IE support)
        //"findIndex", // implemented individually (IE support)
        //"flatMap", // not supported
        "forEach",
        "map",
        "some"
    ].forEach(function (funcName) {
        var baseFunc = Array.prototype[funcName];
        invariant(typeof baseFunc === "function", "Base function not defined on Array prototype: '" + funcName + "'");
        addHiddenProp(ObservableArray.prototype, funcName, function (callback, thisArg) {
            var _this = this;
            var adm = this.$mobx;
            adm.atom.reportObserved();
            var dehancedValues = adm.dehanceValues(adm.values);
            return dehancedValues[funcName](function (element, index) {
                return callback.call(thisArg, element, index, _this);
            }, thisArg);
        });
    });
    ["reduce", "reduceRight"].forEach(function (funcName) {
        addHiddenProp(ObservableArray.prototype, funcName, function (callback, initialValue) {
            var _this = this;
            var adm = this.$mobx;
            adm.atom.reportObserved();
            return adm.values[funcName](function (accumulator, currentValue, index) {
                currentValue = adm.dehanceValue(currentValue);
                return callback(accumulator, currentValue, index, _this);
            }, initialValue);
        });
    });
    /**
     * We don't want those to show up in `for (const key in ar)` ...
     */
    makeNonEnumerable(ObservableArray.prototype, [
        "constructor",
        "intercept",
        "observe",
        "clear",
        "concat",
        "get",
        "replace",
        "toJS",
        "toJSON",
        "peek",
        "find",
        "findIndex",
        "splice",
        "spliceWithArray",
        "push",
        "pop",
        "set",
        "shift",
        "unshift",
        "reverse",
        "sort",
        "remove",
        "move",
        "toString",
        "toLocaleString"
    ]);
    // See #364
    var ENTRY_0 = createArrayEntryDescriptor(0);
    function createArrayEntryDescriptor(index) {
        return {
            enumerable: false,
            configurable: false,
            get: function () {
                return this.get(index);
            },
            set: function (value) {
                this.set(index, value);
            }
        };
    }
    function createArrayBufferItem(index) {
        Object.defineProperty(ObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
    }
    function reserveArrayBuffer(max) {
        for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max; index++)
            createArrayBufferItem(index);
        OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
    reserveArrayBuffer(1000);
    var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
    function isObservableArray(thing) {
        return isObject(thing) && isObservableArrayAdministration(thing.$mobx);
    }

    var ObservableMapMarker = {};
    var ObservableMap = /** @class */ (function () {
        function ObservableMap(initialData, enhancer, name) {
            if (enhancer === void 0) { enhancer = deepEnhancer; }
            if (name === void 0) { name = "ObservableMap@" + getNextId(); }
            this.enhancer = enhancer;
            this.name = name;
            this.$mobx = ObservableMapMarker;
            this._keysAtom = createAtom(this.name + ".keys()");
            if (typeof Map !== "function") {
                throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
            }
            this._data = new Map();
            this._hasMap = new Map();
            this.merge(initialData);
        }
        ObservableMap.prototype._has = function (key) {
            return this._data.has(key);
        };
        ObservableMap.prototype.has = function (key) {
            var _this = this;
            if (!globalState.trackingDerivation)
                return this._has(key);
            var entry = this._hasMap.get(key);
            if (!entry) {
                // todo: replace with atom (breaking change)
                var newEntry = (entry = new ObservableValue(this._has(key), referenceEnhancer, this.name + "." + stringifyKey(key) + "?", false));
                this._hasMap.set(key, newEntry);
                onBecomeUnobserved(newEntry, function () { return _this._hasMap.delete(key); });
            }
            return entry.get();
        };
        ObservableMap.prototype.set = function (key, value) {
            var hasKey = this._has(key);
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    type: hasKey ? "update" : "add",
                    object: this,
                    newValue: value,
                    name: key
                });
                if (!change)
                    return this;
                value = change.newValue;
            }
            if (hasKey) {
                this._updateValue(key, value);
            }
            else {
                this._addValue(key, value);
            }
            return this;
        };
        ObservableMap.prototype.delete = function (key) {
            var _this = this;
            checkIfStateModificationsAreAllowed(this._keysAtom);
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    type: "delete",
                    object: this,
                    name: key
                });
                if (!change)
                    return false;
            }
            if (this._has(key)) {
                var notifySpy = isSpyEnabled();
                var notify = hasListeners(this);
                var change = notify || notifySpy
                    ? {
                        type: "delete",
                        object: this,
                        oldValue: this._data.get(key).value,
                        name: key
                    }
                    : null;
                if (notifySpy)
                    spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
                transaction(function () {
                    _this._keysAtom.reportChanged();
                    _this._updateHasMapEntry(key, false);
                    var observable = _this._data.get(key);
                    observable.setNewValue(undefined);
                    _this._data.delete(key);
                });
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy)
                    spyReportEnd();
                return true;
            }
            return false;
        };
        ObservableMap.prototype._updateHasMapEntry = function (key, value) {
            var entry = this._hasMap.get(key);
            if (entry) {
                entry.setNewValue(value);
            }
        };
        ObservableMap.prototype._updateValue = function (key, newValue) {
            var observable = this._data.get(key);
            newValue = observable.prepareNewValue(newValue);
            if (newValue !== globalState.UNCHANGED) {
                var notifySpy = isSpyEnabled();
                var notify = hasListeners(this);
                var change = notify || notifySpy
                    ? {
                        type: "update",
                        object: this,
                        oldValue: observable.value,
                        name: key,
                        newValue: newValue
                    }
                    : null;
                if (notifySpy)
                    spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
                observable.setNewValue(newValue);
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy)
                    spyReportEnd();
            }
        };
        ObservableMap.prototype._addValue = function (key, newValue) {
            var _this = this;
            checkIfStateModificationsAreAllowed(this._keysAtom);
            transaction(function () {
                var observable = new ObservableValue(newValue, _this.enhancer, _this.name + "." + stringifyKey(key), false);
                _this._data.set(key, observable);
                newValue = observable.value; // value might have been changed
                _this._updateHasMapEntry(key, true);
                _this._keysAtom.reportChanged();
            });
            var notifySpy = isSpyEnabled();
            var notify = hasListeners(this);
            var change = notify || notifySpy
                ? {
                    type: "add",
                    object: this,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy)
                spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
            if (notify)
                notifyListeners(this, change);
            if (notifySpy)
                spyReportEnd();
        };
        ObservableMap.prototype.get = function (key) {
            if (this.has(key))
                return this.dehanceValue(this._data.get(key).get());
            return this.dehanceValue(undefined);
        };
        ObservableMap.prototype.dehanceValue = function (value) {
            if (this.dehancer !== undefined) {
                return this.dehancer(value);
            }
            return value;
        };
        ObservableMap.prototype.keys = function () {
            this._keysAtom.reportObserved();
            return this._data.keys();
        };
        ObservableMap.prototype.values = function () {
            var self = this;
            var keys = this.keys();
            return makeIterable({
                next: function () {
                    var _a = keys.next(), done = _a.done, value = _a.value;
                    return {
                        done: done,
                        value: done ? undefined : self.get(value)
                    };
                }
            });
        };
        ObservableMap.prototype.entries = function () {
            var self = this;
            var keys = this.keys();
            return makeIterable({
                next: function () {
                    var _a = keys.next(), done = _a.done, value = _a.value;
                    return {
                        done: done,
                        value: done ? undefined : [value, self.get(value)]
                    };
                }
            });
        };
        ObservableMap.prototype.forEach = function (callback, thisArg) {
            var _this = this;
            this._keysAtom.reportObserved();
            this._data.forEach(function (_, key) { return callback.call(thisArg, _this.get(key), key, _this); });
        };
        /** Merge another object into this object, returns this. */
        ObservableMap.prototype.merge = function (other) {
            var _this = this;
            if (isObservableMap(other)) {
                other = other.toJS();
            }
            transaction(function () {
                var prev = allowStateChangesStart(true);
                try {
                    if (isPlainObject(other))
                        Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
                    else if (Array.isArray(other))
                        other.forEach(function (_a) {
                            var _b = __read(_a, 2), key = _b[0], value = _b[1];
                            return _this.set(key, value);
                        });
                    else if (isES6Map(other)) {
                        if (other.constructor !== Map)
                            fail("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore
                        else
                            other.forEach(function (value, key) { return _this.set(key, value); });
                    }
                    else if (other !== null && other !== undefined)
                        fail("Cannot initialize map from " + other);
                }
                finally {
                    allowStateChangesEnd(prev);
                }
            });
            return this;
        };
        ObservableMap.prototype.clear = function () {
            var _this = this;
            transaction(function () {
                untracked(function () {
                    // Note we are concurrently reading/deleting the same keys
                    // forEach handles this properly
                    _this._data.forEach(function (_, key) { return _this.delete(key); });
                });
            });
        };
        ObservableMap.prototype.replace = function (values) {
            var _this = this;
            // Implementation requirements:
            // - respect ordering of replacement map
            // - allow interceptors to run and potentially prevent individual operations
            // - don't recreate observables that already exist in original map (so we don't destroy existing subscriptions)
            // - don't _keysAtom.reportChanged if the keys of resulting map are indentical (order matters!)
            // - note that result map may differ from replacement map due to the interceptors
            transaction(function () {
                // Convert to map so we can do quick key lookups
                var replacementMap = convertToMap(values);
                var orderedData = new Map();
                // Used for optimization
                var keysReportChangedCalled = false;
                // Delete keys that don't exist in replacement map
                // if the key deletion is prevented by interceptor
                // add entry at the beginning of the result map
                forOf(_this._data.keys(), function (key) {
                    // Concurrently iterating/deleting keys
                    // iterator should handle this correctly
                    if (!replacementMap.has(key)) {
                        var deleted = _this.delete(key);
                        // Was the key removed?
                        if (deleted) {
                            // _keysAtom.reportChanged() was already called
                            keysReportChangedCalled = true;
                        }
                        else {
                            // Delete prevented by interceptor
                            var value = _this._data.get(key);
                            orderedData.set(key, value);
                        }
                    }
                });
                // Merge entries
                forOf(replacementMap.entries(), function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    // We will want to know whether a new key is added
                    var keyExisted = _this._data.has(key);
                    // Add or update value
                    _this.set(key, value);
                    // The addition could have been prevent by interceptor
                    if (_this._data.has(key)) {
                        // The update could have been prevented by interceptor
                        // and also we want to preserve existing values
                        // so use value from _data map (instead of replacement map)
                        var value_1 = _this._data.get(key);
                        orderedData.set(key, value_1);
                        // Was a new key added?
                        if (!keyExisted) {
                            // _keysAtom.reportChanged() was already called
                            keysReportChangedCalled = true;
                        }
                    }
                });
                // Check for possible key order change
                if (!keysReportChangedCalled) {
                    if (_this._data.size !== orderedData.size) {
                        // If size differs, keys are definitely modified
                        _this._keysAtom.reportChanged();
                    }
                    else {
                        var iter1 = _this._data.keys();
                        var iter2 = orderedData.keys();
                        var next1 = iter1.next();
                        var next2 = iter2.next();
                        while (!next1.done) {
                            if (next1.value !== next2.value) {
                                _this._keysAtom.reportChanged();
                                break;
                            }
                            next1 = iter1.next();
                            next2 = iter2.next();
                        }
                    }
                }
                // Use correctly ordered map
                _this._data = orderedData;
            });
            return this;
        };
        Object.defineProperty(ObservableMap.prototype, "size", {
            get: function () {
                this._keysAtom.reportObserved();
                return this._data.size;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns a plain object that represents this map.
         * Note that all the keys being stringified.
         * If there are duplicating keys after converting them to strings, behaviour is undetermined.
         */
        ObservableMap.prototype.toPOJO = function () {
            var _this = this;
            var res = {};
            this.forEach(function (_, key) {
                return (res[typeof key === "symbol" ? key : stringifyKey(key)] = _this.get(key));
            });
            return res;
        };
        /**
         * Returns a shallow non observable object clone of this map.
         * Note that the values migth still be observable. For a deep clone use mobx.toJS.
         */
        ObservableMap.prototype.toJS = function () {
            return new Map(this);
        };
        ObservableMap.prototype.toJSON = function () {
            // Used by JSON.stringify
            return this.toPOJO();
        };
        ObservableMap.prototype.toString = function () {
            var _this = this;
            return (this.name +
                "[{ " +
                iteratorToArray(this.keys())
                    .map(function (key) { return stringifyKey(key) + ": " + ("" + _this.get(key)); })
                    .join(", ") +
                " }]");
        };
        /**
         * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
         * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
         * for callback details
         */
        ObservableMap.prototype.observe = function (listener, fireImmediately) {
            process.env.NODE_ENV !== "production" &&
                invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
            return registerListener(this, listener);
        };
        ObservableMap.prototype.intercept = function (handler) {
            return registerInterceptor(this, handler);
        };
        return ObservableMap;
    }());
    function stringifyKey(key) {
        if (key && key.toString)
            return key.toString();
        else
            return new String(key).toString();
    }
    declareIterator(ObservableMap.prototype, function () {
        return this.entries();
    });
    addHiddenFinalProp(ObservableMap.prototype, toStringTagSymbol(), "Map");
    /* 'var' fixes small-build issue */
    var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);

    var ObservableSetMarker = {};
    var ObservableSet = /** @class */ (function () {
        function ObservableSet(initialData, enhancer, name) {
            if (enhancer === void 0) { enhancer = deepEnhancer; }
            if (name === void 0) { name = "ObservableSet@" + getNextId(); }
            this.name = name;
            this.$mobx = ObservableSetMarker;
            this._data = new Set();
            this._atom = createAtom(this.name);
            if (typeof Set !== "function") {
                throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
            }
            this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name); };
            if (initialData) {
                this.replace(initialData);
            }
        }
        ObservableSet.prototype.dehanceValue = function (value) {
            if (this.dehancer !== undefined) {
                return this.dehancer(value);
            }
            return value;
        };
        ObservableSet.prototype.clear = function () {
            var _this = this;
            transaction(function () {
                untracked(function () {
                    _this._data.forEach(function (value) {
                        _this.delete(value);
                    });
                });
            });
        };
        ObservableSet.prototype.forEach = function (callbackFn, thisArg) {
            var _this = this;
            this._atom.reportObserved();
            this._data.forEach(function (value) {
                callbackFn.call(thisArg, value, value, _this);
            });
        };
        Object.defineProperty(ObservableSet.prototype, "size", {
            get: function () {
                this._atom.reportObserved();
                return this._data.size;
            },
            enumerable: true,
            configurable: true
        });
        ObservableSet.prototype.add = function (value) {
            var _this = this;
            checkIfStateModificationsAreAllowed(this._atom);
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    type: "add",
                    object: this,
                    newValue: value
                });
                if (!change)
                    return this;
                // TODO: ideally, value = change.value would be done here, so that values can be
                // changed by interceptor. Same applies for other Set and Map api's.
            }
            if (!this.has(value)) {
                transaction(function () {
                    _this._data.add(_this.enhancer(value, undefined));
                    _this._atom.reportChanged();
                });
                var notifySpy = isSpyEnabled();
                var notify = hasListeners(this);
                var change = notify || notifySpy
                    ? {
                        type: "add",
                        object: this,
                        newValue: value
                    }
                    : null;
                if (notifySpy && process.env.NODE_ENV !== "production")
                    spyReportStart(change);
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy && process.env.NODE_ENV !== "production")
                    spyReportEnd();
            }
            return this;
        };
        ObservableSet.prototype.delete = function (value) {
            var _this = this;
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    type: "delete",
                    object: this,
                    oldValue: value
                });
                if (!change)
                    return false;
            }
            if (this.has(value)) {
                var notifySpy = isSpyEnabled();
                var notify = hasListeners(this);
                var change = notify || notifySpy
                    ? {
                        type: "delete",
                        object: this,
                        oldValue: value
                    }
                    : null;
                if (notifySpy && process.env.NODE_ENV !== "production")
                    spyReportStart(__assign(__assign({}, change), { name: this.name }));
                transaction(function () {
                    _this._atom.reportChanged();
                    _this._data.delete(value);
                });
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy && process.env.NODE_ENV !== "production")
                    spyReportEnd();
                return true;
            }
            return false;
        };
        ObservableSet.prototype.has = function (value) {
            this._atom.reportObserved();
            return this._data.has(this.dehanceValue(value));
        };
        ObservableSet.prototype.entries = function () {
            var nextIndex = 0;
            var keys = iteratorToArray(this.keys());
            var values = iteratorToArray(this.values());
            return makeIterable({
                next: function () {
                    var index = nextIndex;
                    nextIndex += 1;
                    return index < values.length
                        ? { value: [keys[index], values[index]], done: false }
                        : { done: true };
                }
            });
        };
        ObservableSet.prototype.keys = function () {
            return this.values();
        };
        ObservableSet.prototype.values = function () {
            this._atom.reportObserved();
            var self = this;
            var nextIndex = 0;
            var observableValues;
            if (this._data.values !== undefined) {
                observableValues = iteratorToArray(this._data.values());
            }
            else {
                // There is no values function in IE11
                observableValues = [];
                this._data.forEach(function (e) { return observableValues.push(e); });
            }
            return makeIterable({
                next: function () {
                    return nextIndex < observableValues.length
                        ? { value: self.dehanceValue(observableValues[nextIndex++]), done: false }
                        : { done: true };
                }
            });
        };
        ObservableSet.prototype.replace = function (other) {
            var _this = this;
            if (isObservableSet(other)) {
                other = other.toJS();
            }
            transaction(function () {
                var prev = allowStateChangesStart(true);
                try {
                    if (Array.isArray(other)) {
                        _this.clear();
                        other.forEach(function (value) { return _this.add(value); });
                    }
                    else if (isES6Set(other)) {
                        _this.clear();
                        other.forEach(function (value) { return _this.add(value); });
                    }
                    else if (other !== null && other !== undefined) {
                        fail("Cannot initialize set from " + other);
                    }
                }
                finally {
                    allowStateChangesEnd(prev);
                }
            });
            return this;
        };
        ObservableSet.prototype.observe = function (listener, fireImmediately) {
            // TODO 'fireImmediately' can be true?
            process.env.NODE_ENV !== "production" &&
                invariant(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
            return registerListener(this, listener);
        };
        ObservableSet.prototype.intercept = function (handler) {
            return registerInterceptor(this, handler);
        };
        ObservableSet.prototype.toJS = function () {
            return new Set(this);
        };
        ObservableSet.prototype.toString = function () {
            return this.name + "[ " + iteratorToArray(this.keys()).join(", ") + " ]";
        };
        return ObservableSet;
    }());
    declareIterator(ObservableSet.prototype, function () {
        return this.values();
    });
    addHiddenFinalProp(ObservableSet.prototype, toStringTagSymbol(), "Set");
    var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);

    var ObservableObjectAdministration = /** @class */ (function () {
        function ObservableObjectAdministration(target, name, defaultEnhancer) {
            this.target = target;
            this.name = name;
            this.defaultEnhancer = defaultEnhancer;
            this.values = {};
        }
        ObservableObjectAdministration.prototype.read = function (owner, key) {
            if (process.env.NODE_ENV === "production" && this.target !== owner) {
                this.illegalAccess(owner, key);
                if (!this.values[key])
                    return undefined;
            }
            return this.values[key].get();
        };
        ObservableObjectAdministration.prototype.write = function (owner, key, newValue) {
            var instance = this.target;
            if (process.env.NODE_ENV === "production" && instance !== owner) {
                this.illegalAccess(owner, key);
            }
            var observable = this.values[key];
            if (observable instanceof ComputedValue) {
                observable.set(newValue);
                return;
            }
            // intercept
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    type: "update",
                    object: instance,
                    name: key,
                    newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = observable.prepareNewValue(newValue);
            // notify spy & observers
            if (newValue !== globalState.UNCHANGED) {
                var notify = hasListeners(this);
                var notifySpy = isSpyEnabled();
                var change = notify || notifySpy
                    ? {
                        type: "update",
                        object: instance,
                        oldValue: observable.value,
                        name: key,
                        newValue: newValue
                    }
                    : null;
                if (notifySpy)
                    spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
                observable.setNewValue(newValue);
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy)
                    spyReportEnd();
            }
        };
        ObservableObjectAdministration.prototype.remove = function (key) {
            if (!this.values[key])
                return;
            var target = this.target;
            if (hasInterceptors(this)) {
                var change = interceptChange(this, {
                    object: target,
                    name: key,
                    type: "remove"
                });
                if (!change)
                    return;
            }
            try {
                startBatch();
                var notify = hasListeners(this);
                var notifySpy = isSpyEnabled();
                var oldValue = this.values[key].get();
                if (this.keys)
                    this.keys.remove(key);
                delete this.values[key];
                delete this.target[key];
                var change = notify || notifySpy
                    ? {
                        type: "remove",
                        object: target,
                        oldValue: oldValue,
                        name: key
                    }
                    : null;
                if (notifySpy)
                    spyReportStart(__assign(__assign({}, change), { name: this.name, key: key }));
                if (notify)
                    notifyListeners(this, change);
                if (notifySpy)
                    spyReportEnd();
            }
            finally {
                endBatch();
            }
        };
        ObservableObjectAdministration.prototype.illegalAccess = function (owner, propName) {
            /**
             * This happens if a property is accessed through the prototype chain, but the property was
             * declared directly as own property on the prototype.
             *
             * E.g.:
             * class A {
             * }
             * extendObservable(A.prototype, { x: 1 })
             *
             * classB extens A {
             * }
             * console.log(new B().x)
             *
             * It is unclear whether the property should be considered 'static' or inherited.
             * Either use `console.log(A.x)`
             * or: decorate(A, { x: observable })
             *
             * When using decorate, the property will always be redeclared as own property on the actual instance
             */
            console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
        };
        /**
         * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
         * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
         * for callback details
         */
        ObservableObjectAdministration.prototype.observe = function (callback, fireImmediately) {
            process.env.NODE_ENV !== "production" &&
                invariant(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
            return registerListener(this, callback);
        };
        ObservableObjectAdministration.prototype.intercept = function (handler) {
            return registerInterceptor(this, handler);
        };
        ObservableObjectAdministration.prototype.getKeys = function () {
            var _this = this;
            if (this.keys === undefined) {
                this.keys = (new ObservableArray(Object.keys(this.values).filter(function (key) { return _this.values[key] instanceof ObservableValue; }), referenceEnhancer, "keys(" + this.name + ")", true));
            }
            return this.keys.slice();
        };
        return ObservableObjectAdministration;
    }());
    function asObservableObject(target, name, defaultEnhancer) {
        if (name === void 0) { name = ""; }
        if (defaultEnhancer === void 0) { defaultEnhancer = deepEnhancer; }
        var adm = target.$mobx;
        if (adm)
            return adm;
        process.env.NODE_ENV !== "production" &&
            invariant(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
        if (!isPlainObject(target))
            name = (target.constructor.name || "ObservableObject") + "@" + getNextId();
        if (!name)
            name = "ObservableObject@" + getNextId();
        adm = new ObservableObjectAdministration(target, name, defaultEnhancer);
        addHiddenFinalProp(target, "$mobx", adm);
        return adm;
    }
    function defineObservableProperty(target, propName, newValue, enhancer) {
        var adm = asObservableObject(target);
        assertPropertyConfigurable(target, propName);
        if (hasInterceptors(adm)) {
            var change = interceptChange(adm, {
                object: target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        var observable = (adm.values[propName] = new ObservableValue(newValue, enhancer, adm.name + "." + propName, false));
        newValue = observable.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig(propName));
        if (adm.keys)
            adm.keys.push(propName);
        notifyPropertyAddition(adm, target, propName, newValue);
    }
    function defineComputedProperty(target, // which objects holds the observable and provides `this` context?
    propName, options) {
        var adm = asObservableObject(target);
        options.name = adm.name + "." + propName;
        options.context = target;
        adm.values[propName] = new ComputedValue(options);
        Object.defineProperty(target, propName, generateComputedPropConfig(propName));
    }
    var observablePropertyConfigs = Object.create(null);
    var computedPropertyConfigs = Object.create(null);
    function generateObservablePropConfig(propName) {
        return (observablePropertyConfigs[propName] ||
            (observablePropertyConfigs[propName] = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return this.$mobx.read(this, propName);
                },
                set: function (v) {
                    this.$mobx.write(this, propName, v);
                }
            }));
    }
    function getAdministrationForComputedPropOwner(owner) {
        var adm = owner.$mobx;
        if (!adm) {
            // because computed props are declared on proty,
            // the current instance might not have been initialized yet
            initializeInstance(owner);
            return owner.$mobx;
        }
        return adm;
    }
    function generateComputedPropConfig(propName) {
        return (computedPropertyConfigs[propName] ||
            (computedPropertyConfigs[propName] = {
                configurable: globalState.computedConfigurable,
                enumerable: false,
                get: function () {
                    return getAdministrationForComputedPropOwner(this).read(this, propName);
                },
                set: function (v) {
                    getAdministrationForComputedPropOwner(this).write(this, propName, v);
                }
            }));
    }
    function notifyPropertyAddition(adm, object, key, newValue) {
        var notify = hasListeners(adm);
        var notifySpy = isSpyEnabled();
        var change = notify || notifySpy
            ? {
                type: "add",
                object: object,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy)
            spyReportStart(__assign(__assign({}, change), { name: adm.name, key: key }));
        if (notify)
            notifyListeners(adm, change);
        if (notifySpy)
            spyReportEnd();
    }
    var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
    function isObservableObject(thing) {
        if (isObject(thing)) {
            // Initializers run lazily when transpiling to babel, so make sure they are run...
            initializeInstance(thing);
            return isObservableObjectAdministration(thing.$mobx);
        }
        return false;
    }

    function getAtom(thing, property) {
        if (typeof thing === "object" && thing !== null) {
            if (isObservableArray(thing)) {
                if (property !== undefined)
                    fail(process.env.NODE_ENV !== "production" &&
                        "It is not possible to get index atoms from arrays");
                return thing.$mobx.atom;
            }
            if (isObservableSet(thing)) {
                return thing.$mobx;
            }
            if (isObservableMap(thing)) {
                var anyThing = thing;
                if (property === undefined)
                    return anyThing._keysAtom;
                var observable = anyThing._data.get(property) || anyThing._hasMap.get(property);
                if (!observable)
                    fail(process.env.NODE_ENV !== "production" &&
                        "the entry '" + property + "' does not exist in the observable map '" + getDebugName(thing) + "'");
                return observable;
            }
            // Initializers run lazily when transpiling to babel, so make sure they are run...
            initializeInstance(thing);
            if (property && !thing.$mobx)
                thing[property]; // See #1072
            if (isObservableObject(thing)) {
                if (!property)
                    return fail(process.env.NODE_ENV !== "production" && "please specify a property");
                var observable = thing.$mobx.values[property];
                if (!observable)
                    fail(process.env.NODE_ENV !== "production" &&
                        "no observable property '" + property + "' found on the observable object '" + getDebugName(thing) + "'");
                return observable;
            }
            if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
                return thing;
            }
        }
        else if (typeof thing === "function") {
            if (isReaction(thing.$mobx)) {
                // disposer function
                return thing.$mobx;
            }
        }
        return fail(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
    }
    function getAdministration(thing, property) {
        if (!thing)
            fail("Expecting some object");
        if (property !== undefined)
            return getAdministration(getAtom(thing, property));
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing))
            return thing;
        if (isObservableMap(thing) || isObservableSet(thing))
            return thing;
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        if (thing.$mobx)
            return thing.$mobx;
        fail(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
    }
    function getDebugName(thing, property) {
        var named;
        if (property !== undefined)
            named = getAtom(thing, property);
        else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing))
            named = getAdministration(thing);
        else
            named = getAtom(thing); // valid for arrays as well
        return named.name;
    }

    var toString = Object.prototype.toString;
    function deepEqual(a, b, depth) {
        if (depth === void 0) { depth = -1; }
        return eq(a, b, depth);
    }
    // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
    // Internal recursive comparison function for `isEqual`.
    function eq(a, b, depth, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b)
            return a !== 0 || 1 / a === 1 / b;
        // `null` or `undefined` only equal to itself (strict comparison).
        if (a == null || b == null)
            return false;
        // `NaN`s are equivalent, but non-reflexive.
        if (a !== a)
            return b !== b;
        // Exhaust primitive checks
        var type = typeof a;
        if (type !== "function" && type !== "object" && typeof b != "object")
            return false;
        // Unwrap any wrapped objects.
        a = unwrap(a);
        b = unwrap(b);
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className !== toString.call(b))
            return false;
        switch (className) {
            // Strings, numbers, regular expressions, dates, and booleans are compared by value.
            case "[object RegExp]":
            // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
            case "[object String]":
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return "" + a === "" + b;
            case "[object Number]":
                // `NaN`s are equivalent, but non-reflexive.
                // Object(NaN) is equivalent to NaN.
                if (+a !== +a)
                    return +b !== +b;
                // An `egal` comparison is performed for other numeric values.
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case "[object Date]":
            case "[object Boolean]":
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a === +b;
            case "[object Symbol]":
                return (
                // eslint-disable-next-line
                typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
        }
        var areArrays = className === "[object Array]";
        if (!areArrays) {
            if (typeof a != "object" || typeof b != "object")
                return false;
            // Objects with different constructors are not equivalent, but `Object`s or `Array`s
            // from different frames are.
            var aCtor = a.constructor, bCtor = b.constructor;
            if (aCtor !== bCtor &&
                !(typeof aCtor === "function" &&
                    aCtor instanceof aCtor &&
                    typeof bCtor === "function" &&
                    bCtor instanceof bCtor) &&
                ("constructor" in a && "constructor" in b)) {
                return false;
            }
        }
        if (depth === 0) {
            return false;
        }
        else if (depth < 0) {
            depth = -1;
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        // Initializing stack of traversed objects.
        // It's done here since we only need them for objects and arrays comparison.
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] === a)
                return bStack[length] === b;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        // Recursively compare objects and arrays.
        if (areArrays) {
            // Compare array lengths to determine if a deep comparison is necessary.
            length = a.length;
            if (length !== b.length)
                return false;
            // Deep compare the contents, ignoring non-numeric properties.
            while (length--) {
                if (!eq(a[length], b[length], depth - 1, aStack, bStack))
                    return false;
            }
        }
        else {
            // Deep compare objects.
            var keys = Object.keys(a);
            var key = void 0;
            length = keys.length;
            // Ensure that both objects contain the same number of properties before comparing deep equality.
            if (Object.keys(b).length !== length)
                return false;
            while (length--) {
                // Deep compare each member
                key = keys[length];
                if (!(has$1(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack)))
                    return false;
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return true;
    }
    function unwrap(a) {
        if (isObservableArray(a))
            return a.peek();
        if (isES6Map(a) || isObservableMap(a))
            return iteratorToArray(a.entries());
        if (isES6Set(a) || isObservableSet(a))
            return iteratorToArray(a.entries());
        return a;
    }
    function has$1(a, key) {
        return Object.prototype.hasOwnProperty.call(a, key);
    }

    /**
     * (c) Michel Weststrate 2015 - 2019
     * MIT Licensed
     *
     * Welcome to the mobx sources! To get an global overview of how MobX internally works,
     * this is a good place to start:
     * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
     *
     * Source folders:
     * ===============
     *
     * - api/     Most of the public static methods exposed by the module can be found here.
     * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
     * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
     * - utils/   Utility stuff.
     *
     */
    try {
        // define process.env if needed
        // if this is not a production build in the first place
        // (in which case the expression below would be substituted with 'production')
        // tslint:disable-next-line
        process.env.NODE_ENV;
    }
    catch (e) {
        var g = getGlobal();
        if (typeof process === "undefined")
            g.process = {};
        g.process.env = {};
    }
    (function () {
        function testCodeMinification() { }
        if (testCodeMinification.name !== "testCodeMinification" &&
            process.env.NODE_ENV !== "production" &&
            typeof process !== 'undefined' && process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
            // trick so it doesn't get replaced
            var varName = ["process", "env", "NODE_ENV"].join(".");
            console.warn("[mobx] you are running a minified build, but '" + varName + "' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
        }
    })();
    // forward compatibility with mobx, so that packages can easily support mobx 4 & 5
    var $mobx = "$mobx";
    if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
        // See: https://github.com/andykog/mobx-devtools/
        __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
            spy: spy,
            extras: {
                getDebugName: getDebugName
            },
            $mobx: $mobx
        });
    }
    // TODO: remove in some future build
    if (process.env.NODE_ENV !== "production" &&
        typeof module !== "undefined" &&
        typeof module.exports !== "undefined") {
        var warnedAboutDefaultExport_1 = false;
        Object.defineProperty(module.exports, "default", {
            enumerable: false,
            get: function () {
                if (!warnedAboutDefaultExport_1) {
                    warnedAboutDefaultExport_1 = true;
                    console.warn("The MobX package does not have a default export. Use 'import { thing } from \"mobx\"' (recommended) or 'import * as mobx from \"mobx\"' instead.\"");
                }
                return undefined;
            }
        });
        [
            "extras",
            "Atom",
            "BaseAtom",
            "asFlat",
            "asMap",
            "asReference",
            "asStructure",
            "autorunAsync",
            "createTranformer",
            "expr",
            "isModifierDescriptor",
            "isStrictModeEnabled",
            "map",
            "useStrict",
            "whyRun"
        ].forEach(function (prop) {
            Object.defineProperty(module.exports, prop, {
                enumerable: false,
                get: function () {
                    fail("'" + prop + "' is no longer part of the public MobX api. Please consult the changelog to find out where this functionality went");
                },
                set: function () { }
            });
        });
    }

    exports.$mobx = $mobx;
    exports.FlowCancellationError = FlowCancellationError;
    exports.ObservableMap = ObservableMap;
    exports.ObservableSet = ObservableSet;
    exports.Reaction = Reaction;
    exports._allowStateChanges = allowStateChanges;
    exports._allowStateChangesInsideComputed = allowStateChangesInsideComputed;
    exports._allowStateReadsEnd = allowStateReadsEnd;
    exports._allowStateReadsStart = allowStateReadsStart;
    exports._endAction = _endAction;
    exports._getAdministration = getAdministration;
    exports._getGlobalState = getGlobalState;
    exports._interceptReads = interceptReads;
    exports._isComputingDerivation = isComputingDerivation;
    exports._resetGlobalState = resetGlobalState;
    exports._startAction = _startAction;
    exports.action = action;
    exports.autorun = autorun;
    exports.comparer = comparer;
    exports.computed = computed;
    exports.configure = configure;
    exports.createAtom = createAtom;
    exports.decorate = decorate;
    exports.entries = entries;
    exports.extendObservable = extendObservable;
    exports.extendShallowObservable = extendShallowObservable;
    exports.flow = flow;
    exports.get = get;
    exports.getAtom = getAtom;
    exports.getDebugName = getDebugName;
    exports.getDependencyTree = getDependencyTree;
    exports.getObserverTree = getObserverTree;
    exports.has = has;
    exports.intercept = intercept;
    exports.isAction = isAction;
    exports.isArrayLike = isArrayLike;
    exports.isBoxedObservable = isObservableValue;
    exports.isComputed = isComputed;
    exports.isComputedProp = isComputedProp;
    exports.isFlowCancellationError = isFlowCancellationError;
    exports.isObservable = isObservable;
    exports.isObservableArray = isObservableArray;
    exports.isObservableMap = isObservableMap;
    exports.isObservableObject = isObservableObject;
    exports.isObservableProp = isObservableProp;
    exports.isObservableSet = isObservableSet;
    exports.keys = keys;
    exports.observable = observable;
    exports.observe = observe;
    exports.onBecomeObserved = onBecomeObserved;
    exports.onBecomeUnobserved = onBecomeUnobserved;
    exports.onReactionError = onReactionError;
    exports.reaction = reaction;
    exports.remove = remove;
    exports.runInAction = runInAction;
    exports.set = set;
    exports.spy = spy;
    exports.toJS = toJS;
    exports.trace = trace;
    exports.transaction = transaction;
    exports.untracked = untracked;
    exports.values = values;
    exports.when = when;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
