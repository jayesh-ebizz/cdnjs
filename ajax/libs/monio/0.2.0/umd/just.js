(function UMD(name, context, dependencies, definition) {
  if (typeof define === "function" && define.amd) {
    dependencies = Object.keys(dependencies).map(p => p.replace(/^\.\//, ""));
    define(name, dependencies, definition);
  } else if (typeof module !== "undefined" && module.exports) {
    dependencies = Object.keys(dependencies).map(p => require(p));
    module.exports = definition(...dependencies);
  } else {
    dependencies = Object.values(dependencies).map(n => context[n]);
    context[name] = definition(...dependencies);
  }
})("Just", typeof globalThis != "undefined" ? globalThis : typeof global != "undefined" ? global : typeof window != "undefined" ? window : typeof self != "undefined" ? self : new Function("return this")(), {}, function DEF() {
  "use strict";

  var _exp = {};
  var brand = {};
  _exp = Object.assign(Just, {
    of: Just,
    pure: Just,
    unit: Just,
    is
  }); // **************************

  function Just(val) {
    var publicAPI = {
      map,
      chain,
      flatMap: chain,
      bind: chain,
      ap,
      concat,
      _inspect,
      _is,
      [Symbol.toStringTag]: "Just"
    };
    return publicAPI; // *********************

    function map(fn) {
      return Just(fn(val));
    } // aka: bind, flatMap


    function chain(fn) {
      return fn(val);
    }

    function ap(m) {
      return m.map(val);
    }

    function concat(m) {
      return m.map(v => val.concat(v));
    }

    function _inspect() {
      return `${publicAPI[Symbol.toStringTag]}(${typeof val == "string" ? JSON.stringify(val) : typeof val == "undefined" ? "" : typeof val == "function" ? val.name || "anonymous function" : val && typeof val._inspect == "function" ? val._inspect() : val})`;
    }

    function _is(br) {
      return br === brand;
    }
  }

  function is(val) {
    return val && typeof val._is == "function" && val._is(brand);
  }

  return _exp;
});