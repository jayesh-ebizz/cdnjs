"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map_set_polyfill_1 = require("@riim/map-set-polyfill");
var object_assign_polyfill_1 = require("@riim/object-assign-polyfill");
var symbol_polyfill_1 = require("@riim/symbol-polyfill");
var Cell_1 = require("./Cell");
var ObservableList_1 = require("./collections/ObservableList");
var ObservableMap_1 = require("./collections/ObservableMap");
var EventEmitter_1 = require("./EventEmitter");
exports.EventEmitter = EventEmitter_1.EventEmitter;
var ObservableMap_2 = require("./collections/ObservableMap");
exports.ObservableMap = ObservableMap_2.ObservableMap;
var ObservableList_2 = require("./collections/ObservableList");
exports.ObservableList = ObservableList_2.ObservableList;
var Cell_2 = require("./Cell");
exports.Cell = Cell_2.Cell;
var WaitError_1 = require("./WaitError");
exports.WaitError = WaitError_1.WaitError;
var hasOwn = Object.prototype.hasOwnProperty;
var slice = Array.prototype.slice;
var global = Function('return this;')();
function map(entries) {
    return new ObservableMap_1.ObservableMap(entries);
}
exports.map = map;
function list(items, options) {
    return new ObservableList_1.ObservableList(items, options);
}
exports.list = list;
exports.KEY_CELL_MAP = symbol_polyfill_1.Symbol('cellx.cellMap');
function cellx(value, options) {
    if (!options) {
        options = {};
    }
    var initialValue = value;
    var cx = function (value) {
        var context = this;
        if (!context || context == global) {
            context = cx;
        }
        if (!hasOwn.call(context, exports.KEY_CELL_MAP)) {
            Object.defineProperty(context, exports.KEY_CELL_MAP, { value: new map_set_polyfill_1.Map() });
        }
        var cell = context[exports.KEY_CELL_MAP].get(cx);
        if (!cell) {
            if (value === 'dispose' && arguments.length >= 2) {
                return;
            }
            cell = new Cell_1.Cell(initialValue, object_assign_polyfill_1.assign({ context: context }, options));
            context[exports.KEY_CELL_MAP].set(cx, cell);
        }
        switch (arguments.length) {
            case 0: {
                return cell.get();
            }
            case 1: {
                cell.set(value);
                return value;
            }
            default: {
                var method = value;
                switch (method) {
                    case 'bind': {
                        cx = cx.bind(context);
                        cx.constructor = cellx;
                        return cx;
                    }
                    case 'unwrap': {
                        return cell;
                    }
                    default: {
                        var result = Cell_1.Cell.prototype[method].apply(cell, slice.call(arguments, 1));
                        return result === cell ? cx : result;
                    }
                }
            }
        }
    };
    cx.constructor = cellx;
    if (options.onChange || options.onError) {
        cx.call(options.context || global);
    }
    return cx;
}
exports.cellx = cellx;
function defineObservableProperty(obj, name, value) {
    var cellName = name + 'Cell';
    Object.defineProperty(obj, cellName, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value instanceof Cell_1.Cell ? value : new Cell_1.Cell(value, { context: obj })
    });
    Object.defineProperty(obj, name, {
        configurable: true,
        enumerable: true,
        get: function () {
            return this[cellName].get();
        },
        set: function (value) {
            this[cellName].set(value);
        }
    });
    return obj;
}
exports.defineObservableProperty = defineObservableProperty;
function defineObservableProperties(obj, props) {
    Object.keys(props).forEach(function (name) {
        defineObservableProperty(obj, name, props[name]);
    });
    return obj;
}
exports.defineObservableProperties = defineObservableProperties;
function define(obj, name, value) {
    if (typeof name == 'string') {
        defineObservableProperty(obj, name, value);
    }
    else {
        defineObservableProperties(obj, name);
    }
    return obj;
}
exports.define = define;
