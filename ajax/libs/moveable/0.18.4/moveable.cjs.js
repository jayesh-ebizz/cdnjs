/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/moveable.git
version: 0.18.4
*/
'use strict';

var EgComponent = require('@egjs/component');
var frameworkUtils = require('framework-utils');
var React = require('react-simple-compat');
var Moveable$1 = require('react-compat-moveable');
var utils = require('@daybrush/utils');

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
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var InnerMoveable =
/*#__PURE__*/
function (_super) {
  __extends(InnerMoveable, _super);

  function InnerMoveable(props) {
    var _this = _super.call(this, props) || this;

    _this.state = {};
    _this.state = _this.props;
    return _this;
  }

  var __proto = InnerMoveable.prototype;

  __proto.render = function () {
    return React.createPortal(React.createElement(Moveable$1, __assign({
      ref: frameworkUtils.ref(this, "moveable")
    }, this.state)), this.state.parentElement);
  };

  return InnerMoveable;
}(React.Component);

var PROPERTIES = Moveable$1.MOVEABLE_PROPS;
var METHODS = Moveable$1.MOVEABLE_METHODS;
var EVENTS = Moveable$1.MOVEABLE_EVENTS;

/**
 * Moveable is Draggable! Resizable! Scalable! Rotatable!
 * @sort 1
 * @extends eg.Component
 */

var Moveable =
/*#__PURE__*/
function (_super) {
  __extends(Moveable, _super);
  /**
   *
   */


  function Moveable(parentElement, options) {
    if (options === void 0) {
      options = {};
    }

    var _this = _super.call(this) || this;

    _this.tempElement = document.createElement("div");

    var nextOptions = __assign({
      container: parentElement
    }, options);

    var events = {};
    EVENTS.forEach(function (name) {
      events[utils.camelize("on " + name)] = function (e) {
        return _this.trigger(name, e);
      };
    });
    React.render(React.createElement(InnerMoveable, __assign({
      ref: frameworkUtils.ref(_this, "innerMoveable"),
      parentElement: parentElement
    }, nextOptions, events)), _this.tempElement);
    var target = nextOptions.target;

    if (utils.isArray(target) && target.length > 1) {
      _this.updateRect();
    }

    return _this;
  }

  var __proto = Moveable.prototype;

  __proto.setState = function (state, callback) {
    this.innerMoveable.setState(state, callback);
  };

  __proto.destroy = function () {
    React.render(null, this.tempElement);
    this.off();
    this.tempElement = null;
    this.innerMoveable = null;
  };

  __proto.getMoveable = function () {
    return this.innerMoveable.moveable;
  };

  Moveable = __decorate([frameworkUtils.Properties(METHODS, function (prototype, property) {
    if (prototype[property]) {
      return;
    }

    prototype[property] = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var self = this.getMoveable();

      if (!self || !self[property]) {
        return;
      }

      return self[property].apply(self, args);
    };
  }), frameworkUtils.Properties(PROPERTIES, function (prototype, property) {
    Object.defineProperty(prototype, property, {
      get: function () {
        return this.getMoveable().props[property];
      },
      set: function (value) {
        var _a;

        this.setState((_a = {}, _a[property] = value, _a));
      },
      enumerable: true,
      configurable: true
    });
  })], Moveable);
  return Moveable;
}(EgComponent);



var modules = {
    __proto__: null,
    'default': Moveable,
    PROPERTIES: PROPERTIES,
    METHODS: METHODS,
    EVENTS: EVENTS
};

for (var name in modules) {
  Moveable[name] = modules[name];
}

module.exports = Moveable;
//# sourceMappingURL=moveable.cjs.js.map
