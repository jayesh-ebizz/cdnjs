/*
Copyright (c) 2019 Daybrush
name: moveable
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/moveable.git
version: 0.19.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Moveable = factory());
}(this, (function () { 'use strict';

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

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/component project is licensed under the MIT license

    @egjs/component JavaScript library
    https://naver.github.io/egjs-component

    @version 2.1.2
    */
    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    function isUndefined(value) {
      return typeof value === "undefined";
    }
    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     * @alias eg.Component
     */


    var Component =
    /*#__PURE__*/
    function () {
      var Component =
      /*#__PURE__*/
      function () {
        /**
        * Version info string
        * @ko 버전정보 문자열
        * @name VERSION
        * @static
        * @type {String}
        * @example
        * eg.Component.VERSION;  // ex) 2.0.0
        * @memberof eg.Component
        */

        /**
         * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
         */
        function Component() {
          this._eventHandler = {};
          this.options = {};
        }
        /**
         * Triggers a custom event.
         * @ko 커스텀 이벤트를 발생시킨다
         * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
         * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
         * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
         * @example
        class Some extends eg.Component {
         some(){
         	if(this.trigger("beforeHi")){ // When event call to stop return false.
        	this.trigger("hi");// fire hi event.
         	}
         }
        }
        const some = new Some();
        some.on("beforeHi", (e) => {
        if(condition){
        	e.stop(); // When event call to stop, `hi` event not call.
        }
        });
        some.on("hi", (e) => {
        // `currentTarget` is component instance.
        console.log(some === e.currentTarget); // true
        });
        // If you want to more know event design. You can see article.
        // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
         */


        var _proto = Component.prototype;

        _proto.trigger = function trigger(eventName, customEvent) {
          if (customEvent === void 0) {
            customEvent = {};
          }

          var handlerList = this._eventHandler[eventName] || [];
          var hasHandlerList = handlerList.length > 0;

          if (!hasHandlerList) {
            return true;
          } // If detach method call in handler in first time then handler list calls.


          handlerList = handlerList.concat();
          customEvent.eventType = eventName;
          var isCanceled = false;
          var arg = [customEvent];
          var i = 0;

          customEvent.stop = function () {
            isCanceled = true;
          };

          customEvent.currentTarget = this;

          for (var _len = arguments.length, restParam = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            restParam[_key - 2] = arguments[_key];
          }

          if (restParam.length >= 1) {
            arg = arg.concat(restParam);
          }

          for (i = 0; handlerList[i]; i++) {
            handlerList[i].apply(this, arg);
          }

          return !isCanceled;
        };
        /**
         * Executed event just one time.
         * @ko 이벤트가 한번만 실행된다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           alert("hi");
         }
         thing() {
           this.once("hi", this.hi);
         }
        }
        var some = new Some();
        some.thing();
        some.trigger("hi");
        // fire alert("hi");
        some.trigger("hi");
        // Nothing happens
         */


        _proto.once = function once(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var i;

            for (i in eventHash) {
              this.once(i, eventHash[i]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var self = this;
            this.on(eventName, function listener() {
              for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
              }

              handlerToAttach.apply(self, arg);
              self.off(eventName, listener);
            });
          }

          return this;
        };
        /**
         * Checks whether an event has been attached to a component.
         * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
         * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
         * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
         * @example
        class Some extends eg.Component {
         some() {
           this.hasOn("hi");// check hi event.
         }
        }
         */


        _proto.hasOn = function hasOn(eventName) {
          return !!this._eventHandler[eventName];
        };
        /**
         * Attaches an event to a component.
         * @ko 컴포넌트에 이벤트를 등록한다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.on("hi",this.hi); //attach event
         }
        }
        */


        _proto.on = function on(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var name;

            for (name in eventHash) {
              this.on(name, eventHash[name]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var handlerList = this._eventHandler[eventName];

            if (isUndefined(handlerList)) {
              this._eventHandler[eventName] = [];
              handlerList = this._eventHandler[eventName];
            }

            handlerList.push(handlerToAttach);
          }

          return this;
        };
        /**
         * Detaches an event from the component.
         * @ko 컴포넌트에 등록된 이벤트를 해제한다
         * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
         * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.off("hi",this.hi); //detach event
         }
        }
         */


        _proto.off = function off(eventName, handlerToDetach) {
          // All event detach.
          if (isUndefined(eventName)) {
            this._eventHandler = {};
            return this;
          } // All handler of specific event detach.


          if (isUndefined(handlerToDetach)) {
            if (typeof eventName === "string") {
              this._eventHandler[eventName] = undefined;
              return this;
            } else {
              var eventHash = eventName;
              var name;

              for (name in eventHash) {
                this.off(name, eventHash[name]);
              }

              return this;
            }
          } // The handler of specific event detach.


          var handlerList = this._eventHandler[eventName];

          if (handlerList) {
            var k;
            var handlerFunction;

            for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
              if (handlerFunction === handlerToDetach) {
                handlerList = handlerList.splice(k, 1);
                break;
              }
            }
          }

          return this;
        };

        return Component;
      }();

      Component.VERSION = "2.1.2";
      return Component;
    }();

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 0.3.4
    */
    function prefixNames(prefix) {
      var classNames = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        classNames[_i - 1] = arguments[_i];
      }

      return classNames.map(function (className) {
        return className.split(" ").map(function (name) {
          return name ? "" + prefix + name : "";
        }).join(" ");
      }).join(" ");
    }
    function prefixCSS(prefix, css) {
      return css.replace(/([^}{]*){/mg, function (_, selector) {
        return selector.replace(/\.([^{,\s\d.]+)/g, "." + prefix + "$1") + "{";
      });
    }
    /* react */

    function ref(target, name) {
      return function (e) {
        e && (target[name] = e);
      };
    }
    function refs(target, name, i) {
      return function (e) {
        e && (target[name][i] = e);
      };
    }
    /* Class Decorator */

    function Properties(properties, action) {
      return function (component) {
        var prototype = component.prototype;
        properties.forEach(function (property) {
          action(prototype, property);
        });
      };
    }
    /* Property Decorator */

    function withMethods(methods, duplicate) {
      if (duplicate === void 0) {
        duplicate = {};
      }

      return function (prototype, propertyName) {
        methods.forEach(function (name) {
          var methodName = duplicate[name] || name;

          if (prototype[methodName]) {
            return;
          }

          prototype[methodName] = function () {
            var _a;

            var args = [];

            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }

            var result = (_a = this[propertyName])[name].apply(_a, args);

            if (result === this[propertyName]) {
              return this;
            } else {
              return result;
            }
          };
        });
      };
    }

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/list-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-list-differ
    version: 1.0.0
    */
    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var PolyMap =
    /*#__PURE__*/
    function () {
      function PolyMap() {
        this.keys = [];
        this.values = [];
      }

      var __proto = PolyMap.prototype;

      __proto.get = function (key) {
        return this.values[this.keys.indexOf(key)];
      };

      __proto.set = function (key, value) {
        var keys = this.keys;
        var values = this.values;
        var prevIndex = keys.indexOf(key);
        var index = prevIndex === -1 ? keys.length : prevIndex;
        keys[index] = key;
        values[index] = value;
      };

      return PolyMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var HashMap =
    /*#__PURE__*/
    function () {
      function HashMap() {
        this.object = {};
      }

      var __proto = HashMap.prototype;

      __proto.get = function (key) {
        return this.object[key];
      };

      __proto.set = function (key, value) {
        this.object[key] = value;
      };

      return HashMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var SUPPORT_MAP = typeof Map === "function";

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var Link =
    /*#__PURE__*/
    function () {
      function Link() {}

      var __proto = Link.prototype;

      __proto.connect = function (prevLink, nextLink) {
        this.prev = prevLink;
        this.next = nextLink;
        prevLink && (prevLink.next = this);
        nextLink && (nextLink.prev = this);
      };

      __proto.disconnect = function () {
        // In double linked list, diconnect the interconnected relationship.
        var prevLink = this.prev;
        var nextLink = this.next;
        prevLink && (prevLink.next = nextLink);
        nextLink && (nextLink.prev = prevLink);
      };

      __proto.getIndex = function () {
        var link = this;
        var index = -1;

        while (link) {
          link = link.prev;
          ++index;
        }

        return index;
      };

      return Link;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */

    function orderChanged(changed, fixed) {
      // It is roughly in the order of these examples.
      // 4, 6, 0, 2, 1, 3, 5, 7
      var fromLinks = []; // 0, 1, 2, 3, 4, 5, 6, 7

      var toLinks = [];
      changed.forEach(function (_a) {
        var from = _a[0],
            to = _a[1];
        var link = new Link();
        fromLinks[from] = link;
        toLinks[to] = link;
      }); // `fromLinks` are connected to each other by double linked list.

      fromLinks.forEach(function (link, i) {
        link.connect(fromLinks[i - 1]);
      });
      return changed.filter(function (_, i) {
        return !fixed[i];
      }).map(function (_a, i) {
        var from = _a[0],
            to = _a[1];

        if (from === to) {
          return [0, 0];
        }

        var fromLink = fromLinks[from];
        var toLink = toLinks[to - 1];
        var fromIndex = fromLink.getIndex(); // Disconnect the link connected to `fromLink`.

        fromLink.disconnect(); // Connect `fromLink` to the right of `toLink`.

        if (!toLink) {
          fromLink.connect(undefined, fromLinks[0]);
        } else {
          fromLink.connect(toLink, toLink.next);
        }

        var toIndex = fromLink.getIndex();
        return [fromIndex, toIndex];
      });
    }

    var Result =
    /*#__PURE__*/
    function () {
      function Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
        this.prevList = prevList;
        this.list = list;
        this.added = added;
        this.removed = removed;
        this.changed = changed;
        this.maintained = maintained;
        this.changedBeforeAdded = changedBeforeAdded;
        this.fixed = fixed;
      }

      var __proto = Result.prototype;
      Object.defineProperty(__proto, "ordered", {
        get: function () {
          if (!this.cacheOrdered) {
            this.caculateOrdered();
          }

          return this.cacheOrdered;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(__proto, "pureChanged", {
        get: function () {
          if (!this.cachePureChanged) {
            this.caculateOrdered();
          }

          return this.cachePureChanged;
        },
        enumerable: true,
        configurable: true
      });

      __proto.caculateOrdered = function () {
        var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
        var changed = this.changed;
        var pureChanged = [];
        this.cacheOrdered = ordered.filter(function (_a, i) {
          var from = _a[0],
              to = _a[1];
          var _b = changed[i],
              fromBefore = _b[0],
              toBefore = _b[1];

          if (from !== to) {
            pureChanged.push([fromBefore, toBefore]);
            return true;
          }
        });
        this.cachePureChanged = pureChanged;
      };

      return Result;
    }();

    /**
     *
     * @memberof eg.ListDiffer
     * @static
     * @function
     * @param - Previous List <ko> 이전 목록 </ko>
     * @param - List to Update <ko> 업데이트 할 목록 </ko>
     * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
     * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
     * @example
     * import { diff } from "@egjs/list-differ";
     * // script => eg.ListDiffer.diff
     * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1], e => e);
     * // List before update
     * // [1, 2, 3, 4, 5]
     * console.log(result.prevList);
     * // Updated list
     * // [4, 3, 6, 2, 1]
     * console.log(result.list);
     * // Index array of values added to `list`
     * // [0, 1, 5]
     * console.log(result.added);
     * // Index array of values removed in `prevList`
     * // [5]
     * console.log(result.removed);
     * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.changed);
     * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
     * // [[4, 3], [3, 4], [2, 6]]
     * console.log(result.pureChanged);
     * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
     * // [[4, 1], [4, 2], [4, 3]]
     * console.log(result.ordered);
     * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.maintained);
     */

    function diff(prevList, list, findKeyCallback) {
      var mapClass = SUPPORT_MAP ? Map : findKeyCallback ? HashMap : PolyMap;

      var callback = findKeyCallback || function (e) {
        return e;
      };

      var added = [];
      var removed = [];
      var maintained = [];
      var prevKeys = prevList.map(callback);
      var keys = list.map(callback);
      var prevKeyMap = new mapClass();
      var keyMap = new mapClass();
      var changedBeforeAdded = [];
      var fixed = [];
      var removedMap = {};
      var changed = [];
      var addedCount = 0;
      var removedCount = 0; // Add prevKeys and keys to the hashmap.

      prevKeys.forEach(function (key, prevListIndex) {
        prevKeyMap.set(key, prevListIndex);
      });
      keys.forEach(function (key, listIndex) {
        keyMap.set(key, listIndex);
      }); // Compare `prevKeys` and `keys` and add them to `removed` if they are not in `keys`.

      prevKeys.forEach(function (key, prevListIndex) {
        var listIndex = keyMap.get(key); // In prevList, but not in list, it is removed.

        if (typeof listIndex === "undefined") {
          ++removedCount;
          removed.push(prevListIndex);
        } else {
          removedMap[listIndex] = removedCount;
        }
      }); // Compare `prevKeys` and `keys` and add them to `added` if they are not in `prevKeys`.

      keys.forEach(function (key, listIndex) {
        var prevListIndex = prevKeyMap.get(key); // In list, but not in prevList, it is added.

        if (typeof prevListIndex === "undefined") {
          added.push(listIndex);
          ++addedCount;
        } else {
          maintained.push([prevListIndex, listIndex]);
          removedCount = removedMap[listIndex] || 0;
          changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
          fixed.push(listIndex === prevListIndex);

          if (prevListIndex !== listIndex) {
            changed.push([prevListIndex, listIndex]);
          }
        }
      }); // Sort by ascending order of 'to(list's index).

      removed.reverse();
      return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
    }

    /**
     * A module that checks diff when values are added, removed, or changed in an array.
     * @ko 배열 또는 오브젝트에서 값이 추가되거나 삭제되거나 순서가 변경사항을 체크하는 모듈입니다.
     * @memberof eg
     */

    var ListDiffer =
    /*#__PURE__*/
    function () {
      /**
       * @param - Initializing Data Array. <ko> 초기 설정할 데이터 배열.</ko>
       * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
       * @example
       * import ListDiffer from "@egjs/list-differ";
       * // script => eg.ListDiffer
       * const differ = new ListDiffer([0, 1, 2, 3, 4, 5], e => e);
       * const result = differ.update([7, 8, 0, 4, 3, 6, 2, 1]);
       * // List before update
       * // [1, 2, 3, 4, 5]
       * console.log(result.prevList);
       * // Updated list
       * // [4, 3, 6, 2, 1]
       * console.log(result.list);
       * // Index array of values added to `list`.
       * // [0, 1, 5]
       * console.log(result.added);
       * // Index array of values removed in `prevList`.
       * // [5]
       * console.log(result.removed);
       * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`.
       * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
       * console.log(result.changed);
       * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
       * // [[4, 3], [3, 4], [2, 6]]
       * console.log(result.pureChanged);
       * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
       * // [[4, 1], [4, 2], [4, 3]]
       * console.log(result.ordered);
       * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved.
       * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
       * console.log(result.maintained);
       */
      function ListDiffer(list, findKeyCallback) {
        if (list === void 0) {
          list = [];
        }

        this.findKeyCallback = findKeyCallback;
        this.list = [].slice.call(list);
      }
      /**
       * Update list.
       * @ko 리스트를 업데이트를 합니다.
       * @param - List to update <ko> 업데이트할 리스트 </ko>
       * @return - Returns the results of an update from `prevList` to `list`.<ko> `prevList`에서 `list`로 업데이트한 결과를 반환한다. </ko>
       */


      var __proto = ListDiffer.prototype;

      __proto.update = function (list) {
        var newData = [].slice.call(list);
        var result = diff(this.list, newData, this.findKeyCallback);
        this.list = newData;
        return result;
      };

      return ListDiffer;
    }();

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED = "undefined";
    /**
    * Check the type that the value is undefined.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {boolean} true if the type is correct, false otherwise
    * @example
    import {isUndefined} from "@daybrush/utils";

    console.log(isUndefined(undefined)); // true
    console.log(isUndefined("")); // false
    console.log(isUndefined(1)); // false
    console.log(isUndefined(null)); // false
    */

    function isUndefined$1(value) {
      return typeof value === UNDEFINED;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString(value) {
      return typeof value === STRING;
    }
    /**
    * transform a camelized string into a lowercased string.
    * @memberof Utils
    * @param {string} text - a camel-cased string
    * @param {string} [separator="-"] - a separator
    * @return {string}  a lowercased string
    * @example
    import {decamelize} from "@daybrush/utils";

    console.log(decamelize("transformOrigin")); // transform-origin
    console.log(decamelize("abcdEfg", "_")); // abcd_efg
    */

    function decamelize(str, separator) {
      if (separator === void 0) {
        separator = "-";
      }

      return str.replace(/([a-z])([A-Z])/g, function (all, letter, letter2) {
        return "" + letter + separator + letter2.toLowerCase();
      });
    }

    /*
    Copyright (c) Daybrush
    name: react-simple-compat
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/react-simple-compat.git
    version: 0.1.9
    */

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
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    function isDiff(a, b) {
      if (a === b) {
        return false;
      }

      for (var i in a) {
        if (!(i in b)) {
          return true;
        }
      }

      for (var i in b) {
        if (a[i] !== b[i]) {
          return true;
        }
      }

      return false;
    }

    function diffObject(a, b) {
      var keys1 = Object.keys(a);
      var keys2 = Object.keys(b);
      var result = diff(keys1, keys2, function (key) {
        return key;
      });
      var added = {};
      var removed = {};
      var changed = {};
      result.added.forEach(function (index) {
        var name = keys2[index];
        added[name] = b[name];
      });
      result.removed.forEach(function (index) {
        var name = keys1[index];
        removed[name] = a[name];
      });
      result.maintained.forEach(function (_a) {
        var index = _a[0];
        var name = keys1[index];
        var values = [a[name], b[name]];

        if (a[name] !== b[name]) {
          changed[name] = values;
        }
      });
      return {
        added: added,
        removed: removed,
        changed: changed
      };
    }

    function executeHooks(hooks) {
      hooks.forEach(function (hook) {
        hook();
      });
    }

    function fillKeys(keys) {
      var index = 0;
      return keys.map(function (key) {
        return key == null ? "$compat" + ++index : "" + key;
      });
    }

    function createProvider(el, key, index, container) {
      if (isString(el)) {
        return new TextProvider("text_" + el, key, index, container, null, {});
      }

      var providerClass = typeof el.type === "string" ? ElementProvider : el.type.prototype.render ? ComponentProvider : FunctionProvider;
      return new providerClass(el.type, key, index, container, el.ref, el.props);
    }

    function flat(arr) {
      var arr2 = [];
      arr.forEach(function (el) {
        arr2 = arr2.concat(isArray(el) ? flat(el) : el);
      });
      return arr2;
    }

    function getAttributes(props) {
      var className = props.className,
          otherProps = __rest(props, ["className"]);

      if (className != null) {
        otherProps.class = className;
      }

      delete otherProps.style;
      delete otherProps.children;
      return otherProps;
    }

    function fillProps(props, defaultProps) {
      if (!defaultProps) {
        return props;
      }

      for (var name in defaultProps) {
        if (isUndefined$1(props[name])) {
          props[name] = defaultProps[name];
        }
      }

      return props;
    }

    function createElement(type, props) {
      var children = [];

      for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
      }

      var _a = props || {},
          key = _a.key,
          ref = _a.ref,
          otherProps = __rest(_a, ["key", "ref"]);

      return {
        type: type,
        key: key,
        ref: ref,
        props: __assign$1(__assign$1({}, otherProps), {
          children: flat(children).filter(function (child) {
            return child != null && child !== false;
          })
        })
      };
    }

    var Provider =
    /*#__PURE__*/
    function () {
      function Provider(type, key, index, container, ref, props) {
        if (props === void 0) {
          props = {};
        }

        this.type = type;
        this.key = key;
        this.index = index;
        this.container = container;
        this.ref = ref;
        this.props = props;
        this._providers = [];
      }

      var __proto = Provider.prototype;

      __proto._should = function (nextProps, nextState) {
        return true;
      };

      __proto._update = function (hooks, nextElement, nextState, isForceUpdate) {
        if (this.base && !isString(nextElement) && !isForceUpdate && !this._should(nextElement.props, nextState)) {
          return false;
        }

        this.original = nextElement;

        this._setState(nextState); // render


        var prevProps = this.props;

        if (!isString(nextElement)) {
          this.props = nextElement.props;
          this.ref = nextElement.ref;
        }

        this._render(hooks, this.base ? prevProps : {}, nextState);

        return true;
      };

      __proto._mounted = function () {
        var ref = this.ref;
        ref && ref(this.base);
      };

      __proto._setState = function (nextstate) {
        return;
      };

      __proto._updated = function () {
        var ref = this.ref;
        ref && ref(this.base);
      };

      __proto._destroy = function () {
        var ref = this.ref;
        ref && ref(null);
      };

      return Provider;
    }();

    function diffAttributes(attrs1, attrs2, el) {
      var _a = diffObject(attrs1, attrs2),
          added = _a.added,
          removed = _a.removed,
          changed = _a.changed;

      for (var name in added) {
        el.setAttribute(name, added[name]);
      }

      for (var name in changed) {
        el.setAttribute(name, changed[name][1]);
      }

      for (var name in removed) {
        el.removeAttribute(name);
      }
    }

    function diffEvents(events1, events2, provier) {
      var _a = diffObject(events1, events2),
          added = _a.added,
          removed = _a.removed,
          changed = _a.changed;

      for (var name in removed) {
        provier.removeEventListener(name);
      }

      for (var name in added) {
        provier.addEventListener(name, added[name]);
      }

      for (var name in changed) {
        provier.removeEventListener(name);
        provier.addEventListener(name, changed[name][1]);
      }

      for (var name in removed) {
        provier.removeEventListener(name);
      }
    }

    function diffStyle(style1, style2, el) {
      var style = el.style;

      var _a = diffObject(style1, style2),
          added = _a.added,
          removed = _a.removed,
          changed = _a.changed;

      for (var beforeName in added) {
        var name = decamelize(beforeName, "-");

        if (style.setProperty) {
          style.setProperty(name, added[beforeName]);
        } else {
          style[name] = added[beforeName];
        }
      }

      for (var beforeName in changed) {
        var name = decamelize(beforeName, "-");

        if (style.setProperty) {
          style.setProperty(name, changed[beforeName][1]);
        } else {
          style[name] = changed[beforeName][1];
        }
      }

      for (var beforeName in removed) {
        var name = decamelize(beforeName, "-");

        if (style.removeProperty) {
          style.removeProperty(name);
        } else {
          style[name] = "";
        }
      }
    }

    function splitProps(props) {
      var attributes = {};
      var events = {};

      for (var name in props) {
        if (name.indexOf("on") === 0) {
          events[name.replace("on", "").toLowerCase()] = props[name];
        } else {
          attributes[name] = props[name];
        }
      }

      return {
        attributes: attributes,
        events: events
      };
    }

    var TextProvider =
    /*#__PURE__*/
    function (_super) {
      __extends$1(TextProvider, _super);

      function TextProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = TextProvider.prototype;

      __proto._render = function (hooks) {
        var _this = this;

        var isMount = !this.base;

        if (isMount) {
          this.base = document.createTextNode(this.type.replace("text_", ""));
        }

        hooks.push(function () {
          if (isMount) {
            _this._mounted();
          } else {
            _this._updated();
          }
        });
        return true;
      };

      __proto._unmount = function () {
        this.base.parentNode.removeChild(this.base);
      };

      return TextProvider;
    }(Provider);

    var ElementProvider =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ElementProvider, _super);

      function ElementProvider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.events = {};
        return _this;
      }

      var __proto = ElementProvider.prototype;

      __proto.addEventListener = function (name, callback) {
        var events = this.events;

        events[name] = function (e) {
          e.nativeEvent = e;
          callback(e);
        };

        this.base.addEventListener(name, events[name]);
      };

      __proto.removeEventListener = function (name) {
        var events = this.events;
        this.base.removeEventListener(name, events[name]);
        delete events[name];
      };

      __proto._should = function (nextProps) {
        return isDiff(this.props, nextProps);
      };

      __proto._render = function (hooks, prevProps) {
        var _this = this;

        var isMount = !this.base;

        if (isMount) {
          this.base = document.createElement(this.type);
        }

        renderProviders(this, this._providers, this.props.children, hooks, null);
        var base = this.base;

        var _a = splitProps(prevProps),
            prevAttributes = _a.attributes,
            prevEvents = _a.events;

        var _b = splitProps(this.props),
            nextAttributes = _b.attributes,
            nextEvents = _b.events;

        diffAttributes(getAttributes(prevAttributes), getAttributes(nextAttributes), base);
        diffEvents(prevEvents, nextEvents, this);
        diffStyle(prevProps.style || {}, this.props.style || {}, base);
        hooks.push(function () {
          if (isMount) {
            _this._mounted();
          } else {
            _this._updated();
          }
        });
        return true;
      };

      __proto._unmount = function () {
        var events = this.events;
        var base = this.base;

        for (var name in events) {
          base.removeEventListener(name, events[name]);
        }

        this._providers.forEach(function (provider) {
          provider._unmount();
        });

        this.events = {};
        base.parentNode.removeChild(base);
      };

      return ElementProvider;
    }(Provider);

    function findContainerNode(provider) {
      if (!provider) {
        return null;
      }

      var base = provider.base;

      if (base instanceof Node) {
        return base;
      }

      return findContainerNode(provider.container);
    }

    function findDOMNode(comp) {
      if (!comp) {
        return null;
      }

      if (comp instanceof Node) {
        return comp;
      }

      var providers = comp._provider._providers;

      if (!providers.length) {
        return null;
      }

      return findDOMNode(providers[0].base);
    }

    var FunctionProvider =
    /*#__PURE__*/
    function (_super) {
      __extends$1(FunctionProvider, _super);

      function FunctionProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = FunctionProvider.prototype;

      __proto._render = function (hooks) {
        var template = this.type(this.props);
        renderProviders(this, this._providers, template ? [template] : [], hooks);
        return true;
      };

      __proto._unmount = function () {
        this._providers.forEach(function (provider) {
          provider._unmount();
        });
      };

      return FunctionProvider;
    }(Provider);

    var ContainerProvider =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ContainerProvider, _super);

      function ContainerProvider(base) {
        var _this = _super.call(this, "container", "container", 0, null) || this;

        _this.base = base;
        return _this;
      }

      var __proto = ContainerProvider.prototype;

      __proto._render = function () {
        return true;
      };

      __proto._unmount = function () {
        return;
      };

      return ContainerProvider;
    }(Provider);

    var ComponentProvider =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ComponentProvider, _super);

      function ComponentProvider(type, key, index, container, ref, props) {
        if (props === void 0) {
          props = {};
        }

        return _super.call(this, type, key, index, container, ref, fillProps(props, type.defaultProps)) || this;
      }

      var __proto = ComponentProvider.prototype;

      __proto._should = function (nextProps, nextState) {
        return this.base.shouldComponentUpdate(fillProps(nextProps, this.type.defaultProps), nextState || this.base.state);
      };

      __proto._render = function (hooks, prevProps, nextState) {
        var _this = this;

        this.props = fillProps(this.props, this.type.defaultProps);
        var isMount = !this.base;

        if (isMount) {
          this.base = new this.type(this.props);
          this.base._provider = this;
        } else {
          this.base.props = this.props;
        }

        var base = this.base;
        var prevState = base.state;
        var template = base.render();

        if (template && template.props && !template.props.children.length) {
          template.props.children = this.props.children;
        }

        renderProviders(this, this._providers, template ? [template] : [], hooks, nextState, null);
        hooks.push(function () {
          if (isMount) {
            _this._mounted();

            base.componentDidMount();
          } else {
            _this._updated();

            base.componentDidUpdate(prevProps, prevState);
          }
        });
      };

      __proto._setState = function (nextState) {
        if (!nextState) {
          return;
        }

        var base = this.base;
        base.state = nextState;
      };

      __proto._unmount = function () {
        this._providers.forEach(function (provider) {
          provider._unmount();
        });

        this.base.componentWillUnmount();
      };

      return ComponentProvider;
    }(Provider);

    var Component$1 =
    /*#__PURE__*/
    function () {
      function Component(props) {
        if (props === void 0) {
          props = {};
        }

        this.props = props;
        this.state = {};
      }

      var __proto = Component.prototype;

      __proto.shouldComponentUpdate = function (props, state) {
        return true;
      };

      __proto.render = function () {
        return null;
      };

      __proto.setState = function (state, callback, isForceUpdate) {
        var hooks = [];
        var provider = this._provider;
        var isUpdate = renderProviders(provider.container, [provider], [provider.original], hooks, __assign$1(__assign$1({}, this.state), state), isForceUpdate);

        if (isUpdate) {
          if (callback) {
            hooks.push(callback);
          }

          executeHooks(hooks);
        }
      };

      __proto.forceUpdate = function (callback) {
        this.setState(this.state, callback, true);
      };

      __proto.componentDidMount = function () {};

      __proto.componentDidUpdate = function (prevProps, prevState) {};

      __proto.componentWillUnmount = function () {};

      return Component;
    }();

    var PureComponent =
    /*#__PURE__*/
    function (_super) {
      __extends$1(PureComponent, _super);

      function PureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = PureComponent.prototype;

      __proto.shouldComponentUpdate = function (props, state) {
        return isDiff(this.props, props) || isDiff(this.state, state);
      };

      return PureComponent;
    }(Component$1);

    var _Portal =
    /*#__PURE__*/
    function (_super) {
      __extends$1(_Portal, _super);

      function _Portal() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      var __proto = _Portal.prototype;

      __proto.componentDidMount = function () {
        var _a = this.props,
            element = _a.element,
            container = _a.container;
        this._portalProvider = new ContainerProvider(container);
        renderProvider(element, container, this._portalProvider);
      };

      __proto.componentDidUpdate = function () {
        var _a = this.props,
            element = _a.element,
            container = _a.container;
        renderProvider(element, container, this._portalProvider);
      };

      __proto.componentWillUnmount = function () {
        var container = this.props.container;
        renderProvider(null, container, this._portalProvider);
        this._portalProvider = null;
      };

      return _Portal;
    }(PureComponent);

    function updateProvider(provider, children, nextState) {
      var hooks = [];
      renderProviders(provider, provider._providers, children, hooks, nextState);
      executeHooks(hooks);
    }

    function getNextSibiling(provider, childProvider) {
      var childProviders = provider._providers;
      var length = childProviders.length;

      for (var i = childProvider.index + 1; i < length; ++i) {
        var el = findDOMNode(childProviders[i].base);

        if (el) {
          return el;
        }
      }

      return null;
    }

    function diffProviders(containerProvider, providers, children) {
      var childrenKeys = children.map(function (p) {
        return isString(p) ? null : p.key;
      });
      var keys1 = fillKeys(providers.map(function (p) {
        return p.key;
      }));
      var keys2 = fillKeys(childrenKeys);
      var result = diff(keys1, keys2, function (key) {
        return key;
      });
      result.removed.forEach(function (index) {
        providers.splice(index, 1)[0]._unmount();
      });
      result.ordered.forEach(function (_a) {
        var from = _a[0],
            to = _a[1];
        var childrenProvider = providers.splice(from, 1)[0];
        providers.splice(to, 0, childrenProvider);
        var el = findDOMNode(childrenProvider.base);
        var next = findDOMNode(providers[to + 1] && providers[to + 1].base);

        if (el) {
          el.parentNode.insertBefore(el, next);
        }
      });
      result.added.forEach(function (index) {
        providers.splice(index, 0, createProvider(children[index], childrenKeys[index], index, containerProvider));
      });
      var changed = result.maintained.filter(function (_a) {
        var _ = _a[0],
            to = _a[1];
        var el = children[to];
        var childProvider = providers[to];
        var type = isString(el) ? "text_" + el : el.type;

        if (type !== childProvider.type) {
          childProvider._unmount();

          providers.splice(to, 1, createProvider(el, childrenKeys[to], to, containerProvider));
          return true;
        }

        childProvider.index = to;
        return false;
      });
      return __spreadArrays(result.added, changed.map(function (_a) {
        var _ = _a[0],
            to = _a[1];
        return to;
      }));
    }

    function renderProviders(containerProvider, providers, children, updatedHooks, nextState, isForceUpdate) {
      var result = diffProviders(containerProvider, providers, children);
      var updated = providers.filter(function (childProvider, i) {
        return childProvider._update(updatedHooks, children[i], nextState, isForceUpdate);
      });
      var containerNode = findContainerNode(containerProvider);

      if (containerNode) {
        result.reverse().forEach(function (index) {
          var childProvider = providers[index];
          var el = findDOMNode(childProvider.base);

          if (!el) {
            return;
          }

          if (containerNode !== el && !el.parentNode) {
            var nextElement = getNextSibiling(containerProvider, childProvider);
            containerNode.insertBefore(el, nextElement);
          }
        });
      }

      return updated.length > 0;
    }

    function renderProvider(element, container, provider) {
      if (provider === void 0) {
        provider = container.__REACT_COMPAT__;
      }

      var isProvider = !!provider;

      if (!provider) {
        provider = new ContainerProvider(container);
      }

      updateProvider(provider, element ? [element] : []);

      if (!isProvider) {
        container.__REACT_COMPAT__ = provider;
      }

      return provider;
    }

    function render(element, container, callback) {
      var provider = container.__REACT_COMPAT__;

      if (element && !provider) {
        container.innerHTML = "";
      }

      renderProvider(element, container, provider);
      callback && callback();
    }
    function createPortal(el, container) {
      return createElement(_Portal, {
        element: el,
        container: container
      });
    }

    /*
    Copyright (c) 2015 NAVER Corp.
    name: @egjs/agent
    license: MIT
    author: NAVER Corp.
    repository: git+https://github.com/naver/agent.git
    version: 2.2.1
    */
    function some(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return true;
        }
      }

      return false;
    }
    function find(arr, callback) {
      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i)) {
          return arr[i];
        }
      }

      return null;
    }
    function getUserAgent(agent) {
      var userAgent = agent;

      if (typeof userAgent === "undefined") {
        if (typeof navigator === "undefined" || !navigator) {
          return "";
        }

        userAgent = navigator.userAgent || "";
      }

      return userAgent.toLowerCase();
    }
    function execRegExp(pattern, text) {
      try {
        return new RegExp(pattern, "g").exec(text);
      } catch (e) {
        return null;
      }
    }
    function hasUserAgentData() {
      if (typeof navigator === "undefined" || !navigator || !navigator.userAgentData) {
        return false;
      }

      var userAgentData = navigator.userAgentData;
      var brands = userAgentData.brands || userAgentData.uaList;
      return !!(brands && brands.length);
    }
    function findVersion(versionTest, userAgent) {
      var result = execRegExp("(" + versionTest + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);
      return result ? result[3] : "";
    }
    function convertVersion(text) {
      return text.replace(/_/g, ".");
    }
    function findPreset(presets, userAgent) {
      var userPreset = null;
      var version = "-1";
      some(presets, function (preset) {
        var result = execRegExp("(" + preset.test + ")((?:\\/|\\s|:)([0-9|\\.|_]+))?", userAgent);

        if (!result || preset.brand) {
          return false;
        }

        userPreset = preset;
        version = result[3] || "-1";

        if (preset.versionAlias) {
          version = preset.versionAlias;
        } else if (preset.versionTest) {
          version = findVersion(preset.versionTest.toLowerCase(), userAgent) || version;
        }

        version = convertVersion(version);
        return true;
      });
      return {
        preset: userPreset,
        version: version
      };
    }
    function findBrand(brands, preset) {
      return find(brands, function (_a) {
        var brand = _a.brand;
        return execRegExp("" + preset.test, brand.toLowerCase());
      });
    }

    var BROWSER_PRESETS = [{
      test: "phantomjs",
      id: "phantomjs"
    }, {
      test: "whale",
      id: "whale"
    }, {
      test: "edgios|edge|edg",
      id: "edge"
    }, {
      test: "msie|trident|windows phone",
      id: "ie",
      versionTest: "iemobile|msie|rv"
    }, {
      test: "miuibrowser",
      id: "miui browser"
    }, {
      test: "samsungbrowser",
      id: "samsung internet"
    }, {
      test: "samsung",
      id: "samsung internet",
      versionTest: "version"
    }, {
      test: "chrome|crios",
      id: "chrome"
    }, {
      test: "firefox|fxios",
      id: "firefox"
    }, {
      test: "android",
      id: "android browser",
      versionTest: "version"
    }, {
      test: "safari|iphone|ipad|ipod",
      id: "safari",
      versionTest: "version"
    }]; // chromium's engine(blink) is based on applewebkit 537.36.

    var CHROMIUM_PRESETS = [{
      test: "(?=.*applewebkit/(53[0-7]|5[0-2]|[0-4]))(?=.*\\schrome)",
      id: "chrome"
    }, {
      test: "chromium",
      id: "chrome"
    }, {
      test: "whale",
      id: "chrome",
      brand: true
    }];
    var WEBKIT_PRESETS = [{
      test: "applewebkit",
      id: "webkit"
    }];
    var WEBVIEW_PRESETS = [{
      test: "(?=(iphone|ipad))(?!(.*version))",
      id: "webview"
    }, {
      test: "(?=(android|iphone|ipad))(?=.*(naver|daum|; wv))",
      id: "webview"
    }, {
      // test webview
      test: "webview",
      id: "webview"
    }];
    var OS_PRESETS = [{
      test: "windows phone",
      id: "windows phone"
    }, {
      test: "windows 2000",
      id: "window",
      versionAlias: "5.0"
    }, {
      test: "windows nt",
      id: "window"
    }, {
      test: "iphone|ipad|ipod",
      id: "ios",
      versionTest: "iphone os|cpu os"
    }, {
      test: "mac os x",
      id: "mac"
    }, {
      test: "android",
      id: "android"
    }, {
      test: "tizen",
      id: "tizen"
    }, {
      test: "webos|web0s",
      id: "webos"
    }];

    function parseUserAgentData(osData) {
      var userAgentData = navigator.userAgentData;
      var brands = (userAgentData.uaList || userAgentData.brands).slice();
      var isMobile = userAgentData.mobile || false;
      var firstBrand = brands[0];
      var browser = {
        name: firstBrand.brand,
        version: firstBrand.version,
        majorVersion: -1,
        webkit: false,
        webview: some(WEBVIEW_PRESETS, function (preset) {
          return findBrand(brands, preset);
        }),
        chromium: some(CHROMIUM_PRESETS, function (preset) {
          return findBrand(brands, preset);
        })
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };
      browser.webkit = !browser.chromium && some(WEBKIT_PRESETS, function (preset) {
        return findBrand(brands, preset);
      });

      if (osData) {
        var platform_1 = osData.platform.toLowerCase();
        var result = find(OS_PRESETS, function (preset) {
          return new RegExp("" + preset.test, "g").exec(platform_1);
        });
        os.name = result ? result.id : platform_1;
        os.version = osData.platformVersion;
      }

      some(BROWSER_PRESETS, function (preset) {
        var result = findBrand(brands, preset);

        if (!result) {
          return false;
        }

        browser.name = preset.id;
        browser.version = osData ? osData.uaFullVersion : result.version;
        return true;
      });

      if (navigator.platform === "Linux armv8l") {
        os.name = "android";
      } else if (browser.webkit) {
        os.name = isMobile ? "ios" : "mac";
      }

      if (os.name === "ios" && browser.webview) {
        browser.version = "-1";
      }

      os.version = convertVersion(os.version);
      browser.version = convertVersion(browser.version);
      os.majorVersion = parseInt(os.version, 10);
      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: true
      };
    }

    function parseUserAgent(userAgent) {
      var nextAgent = getUserAgent(userAgent);
      var isMobile = !!/mobi/g.exec(nextAgent);
      var browser = {
        name: "unknown",
        version: "-1",
        majorVersion: -1,
        webview: !!findPreset(WEBVIEW_PRESETS, nextAgent).preset,
        chromium: !!findPreset(CHROMIUM_PRESETS, nextAgent).preset,
        webkit: false
      };
      var os = {
        name: "unknown",
        version: "-1",
        majorVersion: -1
      };

      var _a = findPreset(BROWSER_PRESETS, nextAgent),
          browserPreset = _a.preset,
          browserVersion = _a.version;

      var _b = findPreset(OS_PRESETS, nextAgent),
          osPreset = _b.preset,
          osVersion = _b.version;

      browser.webkit = !browser.chromium && !!findPreset(WEBKIT_PRESETS, nextAgent).preset;

      if (osPreset) {
        os.name = osPreset.id;
        os.version = osVersion;
        os.majorVersion = parseInt(osVersion, 10);
      }

      if (browserPreset) {
        browser.name = browserPreset.id;
        browser.version = browserVersion;

        if (browser.webview && os.name === "ios" && browser.name !== "safari") {
          browser.webview = false;
        }
      }

      browser.majorVersion = parseInt(browser.version, 10);
      return {
        browser: browser,
        os: os,
        isMobile: isMobile,
        isHints: false
      };
    }
    /**
     * Extracts browser and operating system information from the user agent string.
     * @ko 유저 에이전트 문자열에서 브라우저와 운영체제 정보를 추출한다.
     * @function eg.agent#agent
     * @param - user agent string to parse <ko>파싱할 유저에이전트 문자열</ko>
     * @return - agent Info <ko> 에이전트 정보 </ko>
     * @example
    import agent from "@egjs/agent";
    // eg.agent();
    const { os, browser, isMobile } = agent();
     */

    function agent(userAgent) {
      if (typeof userAgent === "undefined" && hasUserAgentData()) {
        return parseUserAgentData();
      } else {
        return parseUserAgent(userAgent);
      }
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * get string "function"
    * @memberof Consts
    * @example
    import {FUNCTION} from "@daybrush/utils";

    console.log(FUNCTION); // "function"
    */

    var FUNCTION = "function";
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT = "object";
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING$1 = "string";
    /**
    * get string "undefined"
    * @memberof Consts
    * @example
    import {UNDEFINED} from "@daybrush/utils";

    console.log(UNDEFINED); // "undefined"
    */

    var UNDEFINED$1 = "undefined";
    var OPEN_CLOSED_CHARACTER = ["\"", "'", "\\\"", "\\'"];
    var DEFAULT_UNIT_PRESETS = {
      "cm": function (pos) {
        return pos * 96 / 2.54;
      },
      "mm": function (pos) {
        return pos * 96 / 254;
      },
      "in": function (pos) {
        return pos * 96;
      },
      "pt": function (pos) {
        return pos * 96 / 72;
      },
      "pc": function (pos) {
        return pos * 96 / 6;
      },
      "%": function (pos, size) {
        return pos * size / 100;
      },
      "vw": function (pos, size) {
        if (size === void 0) {
          size = window.innerWidth;
        }

        return pos / 100 * size;
      },
      "vh": function (pos, size) {
        if (size === void 0) {
          size = window.innerHeight;
        }

        return pos / 100 * size;
      },
      "vmax": function (pos, size) {
        if (size === void 0) {
          size = Math.max(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      },
      "vmin": function (pos, size) {
        if (size === void 0) {
          size = Math.min(window.innerWidth, window.innerHeight);
        }

        return pos / 100 * size;
      }
    };

    /**
    * @namespace
    * @name Utils
    */

    /**
     * Returns the inner product of two numbers(`a1`, `a2`) by two criteria(`b1`, `b2`).
     * @memberof Utils
     * @param - The first number
     * @param - The second number
     * @param - The first number to base on the inner product
     * @param - The second number to base on the inner product
     * @return - Returns the inner product
    import { dot } from "@daybrush/utils";

    console.log(dot(0, 15, 2, 3)); // 6
    console.log(dot(5, 15, 2, 3)); // 9
    console.log(dot(5, 15, 1, 1)); // 10
     */

    function dot(a1, a2, b1, b2) {
      return (a1 * b2 + a2 * b1) / (b1 + b2);
    }
    /**
    * Check the type that the value is undefined.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {boolean} true if the type is correct, false otherwise
    * @example
    import {isUndefined} from "@daybrush/utils";

    console.log(isUndefined(undefined)); // true
    console.log(isUndefined("")); // false
    console.log(isUndefined(1)); // false
    console.log(isUndefined(null)); // false
    */

    function isUndefined$2(value) {
      return typeof value === UNDEFINED$1;
    }
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject(value) {
      return value && typeof value === OBJECT;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray$1(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString$1(value) {
      return typeof value === STRING$1;
    }
    /**
    * Check the type that the value is function.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isFunction} from "@daybrush/utils";

    console.log(isFunction(function a() {})); // true
    console.log(isFunction(() => {})); // true
    console.log(isFunction("1234")); // false
    console.log(isFunction(1)); // false
    console.log(isFunction(null)); // false
    */

    function isFunction(value) {
      return typeof value === FUNCTION;
    }

    function findClosed(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitSpace(text) {
      // divide comma(,)
      return splitText(text, "");
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */

    function splitBracket(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */

    function splitUnit(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }
    /**
    * Returns the index of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `findIndex` was called upon.
    * @param - A function to execute on each value in the array until the function returns true, indicating that the satisfying element was found.
    * @param - Returns defaultIndex if not found by the function.
    * @example
    import { findIndex } from "@daybrush/utils";

    findIndex([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // 1
    */

    function findIndex(arr, callback, defaultIndex) {
      if (defaultIndex === void 0) {
        defaultIndex = -1;
      }

      var length = arr.length;

      for (var i = 0; i < length; ++i) {
        if (callback(arr[i], i, arr)) {
          return i;
        }
      }

      return defaultIndex;
    }
    /**
    * Returns the value of the first element in the array that satisfies the provided testing function.
    * @function
    * @memberof CrossBrowser
    * @param - The array `find` was called upon.
    * @param - A function to execute on each value in the array,
    * @param - Returns defalutValue if not found by the function.
    * @example
    import { find } from "@daybrush/utils";

    find([{a: 1}, {a: 2}, {a: 3}, {a: 4}], ({ a }) => a === 2); // {a: 2}
    */

    function find$1(arr, callback, defalutValue) {
      var index = findIndex(arr, callback);
      return index > -1 ? arr[index] : defalutValue;
    }
    /**
    * @function
    * @memberof Utils
    */

    function getKeys(obj) {
      if (Object.keys) {
        return Object.keys(obj);
      }

      var keys = [];

      for (var name in keys) {
        keys.push(name);
      }

      return keys;
    }
    /**
    * convert unit size to px size
    * @function
    * @memberof Utils
    */

    function convertUnitSize(pos, size) {
      var _a = splitUnit(pos),
          value = _a.value,
          unit = _a.unit;

      if (isObject(size)) {
        var sizeFunction = size[unit];

        if (sizeFunction) {
          if (isFunction(sizeFunction)) {
            return sizeFunction(value);
          } else if (DEFAULT_UNIT_PRESETS[unit]) {
            return DEFAULT_UNIT_PRESETS[unit](value, sizeFunction);
          }
        }
      } else if (unit === "%") {
        return value * size / 100;
      }

      if (DEFAULT_UNIT_PRESETS[unit]) {
        return DEFAULT_UNIT_PRESETS[unit](value);
      }

      return value;
    }
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */

    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Removes the specified class value.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to remove
    * @example
    import {removeClass} from "@daybrush/utils";

    removeClass(element, "start");
    */

    function removeClass(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
        element.className = element.className.replace(reg, " ");
      }
    }

    /**
     * Common utilities
     * @module glMatrix
     */
    // Configuration Constants
    var EPSILON = 0.000001;
    var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
    if (!Math.hypot) Math.hypot = function () {
      var y = 0,
          i = arguments.length;

      while (i--) {
        y += arguments[i] * arguments[i];
      }

      return Math.sqrt(y);
    };

    /**
     * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
     * @module mat4
     */

    /**
     * Creates a new identity mat4
     *
     * @returns {mat4} a new 4x4 matrix
     */

    function create() {
      var out = new ARRAY_TYPE(16);

      if (ARRAY_TYPE != Float32Array) {
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
      }

      out[0] = 1;
      out[5] = 1;
      out[10] = 1;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a new mat4 initialized with values from an existing matrix
     *
     * @param {ReadonlyMat4} a matrix to clone
     * @returns {mat4} a new 4x4 matrix
     */

    function clone(a) {
      var out = new ARRAY_TYPE(16);
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Copy the values from one mat4 to another
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the source matrix
     * @returns {mat4} out
     */

    function copy(out, a) {
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Create a new mat4 with the given values
     *
     * @param {Number} m00 Component in column 0, row 0 position (index 0)
     * @param {Number} m01 Component in column 0, row 1 position (index 1)
     * @param {Number} m02 Component in column 0, row 2 position (index 2)
     * @param {Number} m03 Component in column 0, row 3 position (index 3)
     * @param {Number} m10 Component in column 1, row 0 position (index 4)
     * @param {Number} m11 Component in column 1, row 1 position (index 5)
     * @param {Number} m12 Component in column 1, row 2 position (index 6)
     * @param {Number} m13 Component in column 1, row 3 position (index 7)
     * @param {Number} m20 Component in column 2, row 0 position (index 8)
     * @param {Number} m21 Component in column 2, row 1 position (index 9)
     * @param {Number} m22 Component in column 2, row 2 position (index 10)
     * @param {Number} m23 Component in column 2, row 3 position (index 11)
     * @param {Number} m30 Component in column 3, row 0 position (index 12)
     * @param {Number} m31 Component in column 3, row 1 position (index 13)
     * @param {Number} m32 Component in column 3, row 2 position (index 14)
     * @param {Number} m33 Component in column 3, row 3 position (index 15)
     * @returns {mat4} A new mat4
     */

    function fromValues(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      var out = new ARRAY_TYPE(16);
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    /**
     * Set the components of a mat4 to the given values
     *
     * @param {mat4} out the receiving matrix
     * @param {Number} m00 Component in column 0, row 0 position (index 0)
     * @param {Number} m01 Component in column 0, row 1 position (index 1)
     * @param {Number} m02 Component in column 0, row 2 position (index 2)
     * @param {Number} m03 Component in column 0, row 3 position (index 3)
     * @param {Number} m10 Component in column 1, row 0 position (index 4)
     * @param {Number} m11 Component in column 1, row 1 position (index 5)
     * @param {Number} m12 Component in column 1, row 2 position (index 6)
     * @param {Number} m13 Component in column 1, row 3 position (index 7)
     * @param {Number} m20 Component in column 2, row 0 position (index 8)
     * @param {Number} m21 Component in column 2, row 1 position (index 9)
     * @param {Number} m22 Component in column 2, row 2 position (index 10)
     * @param {Number} m23 Component in column 2, row 3 position (index 11)
     * @param {Number} m30 Component in column 3, row 0 position (index 12)
     * @param {Number} m31 Component in column 3, row 1 position (index 13)
     * @param {Number} m32 Component in column 3, row 2 position (index 14)
     * @param {Number} m33 Component in column 3, row 3 position (index 15)
     * @returns {mat4} out
     */

    function set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
      out[0] = m00;
      out[1] = m01;
      out[2] = m02;
      out[3] = m03;
      out[4] = m10;
      out[5] = m11;
      out[6] = m12;
      out[7] = m13;
      out[8] = m20;
      out[9] = m21;
      out[10] = m22;
      out[11] = m23;
      out[12] = m30;
      out[13] = m31;
      out[14] = m32;
      out[15] = m33;
      return out;
    }
    /**
     * Set a mat4 to the identity matrix
     *
     * @param {mat4} out the receiving matrix
     * @returns {mat4} out
     */

    function identity(out) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Transpose the values of a mat4
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the source matrix
     * @returns {mat4} out
     */

    function transpose(out, a) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
      if (out === a) {
        var a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        var a12 = a[6],
            a13 = a[7];
        var a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
      } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
      }

      return out;
    }
    /**
     * Inverts a mat4
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the source matrix
     * @returns {mat4} out
     */

    function invert(out, a) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      var a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      var a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

      var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if (!det) {
        return null;
      }

      det = 1.0 / det;
      out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
      out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
      out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
      out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
      out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
      out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
      out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
      out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
      out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
      out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
      out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
      out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
      out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
      out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
      out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
      out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
      return out;
    }
    /**
     * Calculates the adjugate of a mat4
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the source matrix
     * @returns {mat4} out
     */

    function adjoint(out, a) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      var a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      var a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];
      out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
      out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
      out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
      out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
      out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
      out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
      out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
      out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
      out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
      out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
      out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
      out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
      out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
      out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
      out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
      out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
      return out;
    }
    /**
     * Calculates the determinant of a mat4
     *
     * @param {ReadonlyMat4} a the source matrix
     * @returns {Number} determinant of a
     */

    function determinant(a) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      var a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      var a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15];
      var b00 = a00 * a11 - a01 * a10;
      var b01 = a00 * a12 - a02 * a10;
      var b02 = a00 * a13 - a03 * a10;
      var b03 = a01 * a12 - a02 * a11;
      var b04 = a01 * a13 - a03 * a11;
      var b05 = a02 * a13 - a03 * a12;
      var b06 = a20 * a31 - a21 * a30;
      var b07 = a20 * a32 - a22 * a30;
      var b08 = a20 * a33 - a23 * a30;
      var b09 = a21 * a32 - a22 * a31;
      var b10 = a21 * a33 - a23 * a31;
      var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

      return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    /**
     * Multiplies two mat4s
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the first operand
     * @param {ReadonlyMat4} b the second operand
     * @returns {mat4} out
     */

    function multiply(out, a, b) {
      var a00 = a[0],
          a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a10 = a[4],
          a11 = a[5],
          a12 = a[6],
          a13 = a[7];
      var a20 = a[8],
          a21 = a[9],
          a22 = a[10],
          a23 = a[11];
      var a30 = a[12],
          a31 = a[13],
          a32 = a[14],
          a33 = a[15]; // Cache only the current line of the second matrix

      var b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[4];
      b1 = b[5];
      b2 = b[6];
      b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[8];
      b1 = b[9];
      b2 = b[10];
      b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = b[12];
      b1 = b[13];
      b2 = b[14];
      b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
    /**
     * Translate a mat4 by the given vector
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to translate
     * @param {ReadonlyVec3} v vector to translate by
     * @returns {mat4} out
     */

    function translate(out, a, v) {
      var x = v[0],
          y = v[1],
          z = v[2];
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;

      if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
      } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
      }

      return out;
    }
    /**
     * Scales the mat4 by the dimensions in the given vec3 not using vectorization
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to scale
     * @param {ReadonlyVec3} v the vec3 to scale the matrix by
     * @returns {mat4} out
     **/

    function scale(out, a, v) {
      var x = v[0],
          y = v[1],
          z = v[2];
      out[0] = a[0] * x;
      out[1] = a[1] * x;
      out[2] = a[2] * x;
      out[3] = a[3] * x;
      out[4] = a[4] * y;
      out[5] = a[5] * y;
      out[6] = a[6] * y;
      out[7] = a[7] * y;
      out[8] = a[8] * z;
      out[9] = a[9] * z;
      out[10] = a[10] * z;
      out[11] = a[11] * z;
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
      return out;
    }
    /**
     * Rotates a mat4 by the given angle around the given axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @param {ReadonlyVec3} axis the axis to rotate around
     * @returns {mat4} out
     */

    function rotate(out, a, rad, axis) {
      var x = axis[0],
          y = axis[1],
          z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;
      var a00, a01, a02, a03;
      var a10, a11, a12, a13;
      var a20, a21, a22, a23;
      var b00, b01, b02;
      var b10, b11, b12;
      var b20, b21, b22;

      if (len < EPSILON) {
        return null;
      }

      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c;
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11]; // Construct the elements of the rotation matrix

      b00 = x * x * t + c;
      b01 = y * x * t + z * s;
      b02 = z * x * t - y * s;
      b10 = x * y * t - z * s;
      b11 = y * y * t + c;
      b12 = z * y * t + x * s;
      b20 = x * z * t + y * s;
      b21 = y * z * t - x * s;
      b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

      out[0] = a00 * b00 + a10 * b01 + a20 * b02;
      out[1] = a01 * b00 + a11 * b01 + a21 * b02;
      out[2] = a02 * b00 + a12 * b01 + a22 * b02;
      out[3] = a03 * b00 + a13 * b01 + a23 * b02;
      out[4] = a00 * b10 + a10 * b11 + a20 * b12;
      out[5] = a01 * b10 + a11 * b11 + a21 * b12;
      out[6] = a02 * b10 + a12 * b11 + a22 * b12;
      out[7] = a03 * b10 + a13 * b11 + a23 * b12;
      out[8] = a00 * b20 + a10 * b21 + a20 * b22;
      out[9] = a01 * b20 + a11 * b21 + a21 * b22;
      out[10] = a02 * b20 + a12 * b21 + a22 * b22;
      out[11] = a03 * b20 + a13 * b21 + a23 * b22;

      if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      }

      return out;
    }
    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function rotateX(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];

      if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      } // Perform axis-specific matrix multiplication


      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function rotateY(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a20 = a[8];
      var a21 = a[9];
      var a22 = a[10];
      var a23 = a[11];

      if (a !== out) {
        // If the source and destination differ, copy the unchanged rows
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      } // Perform axis-specific matrix multiplication


      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function rotateZ(out, a, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad);
      var a00 = a[0];
      var a01 = a[1];
      var a02 = a[2];
      var a03 = a[3];
      var a10 = a[4];
      var a11 = a[5];
      var a12 = a[6];
      var a13 = a[7];

      if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
      } // Perform axis-specific matrix multiplication


      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
    /**
     * Creates a matrix from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, dest, vec);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {ReadonlyVec3} v Translation vector
     * @returns {mat4} out
     */

    function fromTranslation(out, v) {
      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.scale(dest, dest, vec);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {ReadonlyVec3} v Scaling vector
     * @returns {mat4} out
     */

    function fromScaling(out, v) {
      out[0] = v[0];
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = v[1];
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = v[2];
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a given angle around a given axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotate(dest, dest, rad, axis);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @param {ReadonlyVec3} axis the axis to rotate around
     * @returns {mat4} out
     */

    function fromRotation(out, rad, axis) {
      var x = axis[0],
          y = axis[1],
          z = axis[2];
      var len = Math.hypot(x, y, z);
      var s, c, t;

      if (len < EPSILON) {
        return null;
      }

      len = 1 / len;
      x *= len;
      y *= len;
      z *= len;
      s = Math.sin(rad);
      c = Math.cos(rad);
      t = 1 - c; // Perform rotation-specific matrix multiplication

      out[0] = x * x * t + c;
      out[1] = y * x * t + z * s;
      out[2] = z * x * t - y * s;
      out[3] = 0;
      out[4] = x * y * t - z * s;
      out[5] = y * y * t + c;
      out[6] = z * y * t + x * s;
      out[7] = 0;
      out[8] = x * z * t + y * s;
      out[9] = y * z * t - x * s;
      out[10] = z * z * t + c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the X axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateX(dest, dest, rad);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function fromXRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad); // Perform axis-specific matrix multiplication

      out[0] = 1;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = c;
      out[6] = s;
      out[7] = 0;
      out[8] = 0;
      out[9] = -s;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the Y axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateY(dest, dest, rad);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function fromYRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad); // Perform axis-specific matrix multiplication

      out[0] = c;
      out[1] = 0;
      out[2] = -s;
      out[3] = 0;
      out[4] = 0;
      out[5] = 1;
      out[6] = 0;
      out[7] = 0;
      out[8] = s;
      out[9] = 0;
      out[10] = c;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from the given angle around the Z axis
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.rotateZ(dest, dest, rad);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */

    function fromZRotation(out, rad) {
      var s = Math.sin(rad);
      var c = Math.cos(rad); // Perform axis-specific matrix multiplication

      out[0] = c;
      out[1] = s;
      out[2] = 0;
      out[3] = 0;
      out[4] = -s;
      out[5] = c;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 1;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {quat4} q Rotation quaternion
     * @param {ReadonlyVec3} v Translation vector
     * @returns {mat4} out
     */

    function fromRotationTranslation(out, q, v) {
      // Quaternion math
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - (yy + zz);
      out[1] = xy + wz;
      out[2] = xz - wy;
      out[3] = 0;
      out[4] = xy - wz;
      out[5] = 1 - (xx + zz);
      out[6] = yz + wx;
      out[7] = 0;
      out[8] = xz + wy;
      out[9] = yz - wx;
      out[10] = 1 - (xx + yy);
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Creates a new mat4 from a dual quat.
     *
     * @param {mat4} out Matrix
     * @param {ReadonlyQuat2} a Dual Quaternion
     * @returns {mat4} mat4 receiving operation result
     */

    function fromQuat2(out, a) {
      var translation = new ARRAY_TYPE(3);
      var bx = -a[0],
          by = -a[1],
          bz = -a[2],
          bw = a[3],
          ax = a[4],
          ay = a[5],
          az = a[6],
          aw = a[7];
      var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

      if (magnitude > 0) {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
      } else {
        translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
        translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
        translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
      }

      fromRotationTranslation(out, a, translation);
      return out;
    }
    /**
     * Returns the translation vector component of a transformation
     *  matrix. If a matrix is built with fromRotationTranslation,
     *  the returned vector will be the same as the translation vector
     *  originally supplied.
     * @param  {vec3} out Vector to receive translation component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */

    function getTranslation(out, mat) {
      out[0] = mat[12];
      out[1] = mat[13];
      out[2] = mat[14];
      return out;
    }
    /**
     * Returns the scaling factor component of a transformation
     *  matrix. If a matrix is built with fromRotationTranslationScale
     *  with a normalized Quaternion paramter, the returned vector will be
     *  the same as the scaling vector
     *  originally supplied.
     * @param  {vec3} out Vector to receive scaling factor component
     * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {vec3} out
     */

    function getScaling(out, mat) {
      var m11 = mat[0];
      var m12 = mat[1];
      var m13 = mat[2];
      var m21 = mat[4];
      var m22 = mat[5];
      var m23 = mat[6];
      var m31 = mat[8];
      var m32 = mat[9];
      var m33 = mat[10];
      out[0] = Math.hypot(m11, m12, m13);
      out[1] = Math.hypot(m21, m22, m23);
      out[2] = Math.hypot(m31, m32, m33);
      return out;
    }
    /**
     * Returns a quaternion representing the rotational component
     *  of a transformation matrix. If a matrix is built with
     *  fromRotationTranslation, the returned quaternion will be the
     *  same as the quaternion originally supplied.
     * @param {quat} out Quaternion to receive the rotation component
     * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
     * @return {quat} out
     */

    function getRotation(out, mat) {
      var scaling = new ARRAY_TYPE(3);
      getScaling(scaling, mat);
      var is1 = 1 / scaling[0];
      var is2 = 1 / scaling[1];
      var is3 = 1 / scaling[2];
      var sm11 = mat[0] * is1;
      var sm12 = mat[1] * is2;
      var sm13 = mat[2] * is3;
      var sm21 = mat[4] * is1;
      var sm22 = mat[5] * is2;
      var sm23 = mat[6] * is3;
      var sm31 = mat[8] * is1;
      var sm32 = mat[9] * is2;
      var sm33 = mat[10] * is3;
      var trace = sm11 + sm22 + sm33;
      var S = 0;

      if (trace > 0) {
        S = Math.sqrt(trace + 1.0) * 2;
        out[3] = 0.25 * S;
        out[0] = (sm23 - sm32) / S;
        out[1] = (sm31 - sm13) / S;
        out[2] = (sm12 - sm21) / S;
      } else if (sm11 > sm22 && sm11 > sm33) {
        S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
        out[3] = (sm23 - sm32) / S;
        out[0] = 0.25 * S;
        out[1] = (sm12 + sm21) / S;
        out[2] = (sm31 + sm13) / S;
      } else if (sm22 > sm33) {
        S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
        out[3] = (sm31 - sm13) / S;
        out[0] = (sm12 + sm21) / S;
        out[1] = 0.25 * S;
        out[2] = (sm23 + sm32) / S;
      } else {
        S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
        out[3] = (sm12 - sm21) / S;
        out[0] = (sm31 + sm13) / S;
        out[1] = (sm23 + sm32) / S;
        out[2] = 0.25 * S;
      }

      return out;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {quat4} q Rotation quaternion
     * @param {ReadonlyVec3} v Translation vector
     * @param {ReadonlyVec3} s Scaling vector
     * @returns {mat4} out
     */

    function fromRotationTranslationScale(out, q, v, s) {
      // Quaternion math
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      out[0] = (1 - (yy + zz)) * sx;
      out[1] = (xy + wz) * sx;
      out[2] = (xz - wy) * sx;
      out[3] = 0;
      out[4] = (xy - wz) * sy;
      out[5] = (1 - (xx + zz)) * sy;
      out[6] = (yz + wx) * sy;
      out[7] = 0;
      out[8] = (xz + wy) * sz;
      out[9] = (yz - wx) * sz;
      out[10] = (1 - (xx + yy)) * sz;
      out[11] = 0;
      out[12] = v[0];
      out[13] = v[1];
      out[14] = v[2];
      out[15] = 1;
      return out;
    }
    /**
     * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     mat4.translate(dest, origin);
     *     let quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *     mat4.scale(dest, scale)
     *     mat4.translate(dest, negativeOrigin);
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {quat4} q Rotation quaternion
     * @param {ReadonlyVec3} v Translation vector
     * @param {ReadonlyVec3} s Scaling vector
     * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
     * @returns {mat4} out
     */

    function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
      // Quaternion math
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var xy = x * y2;
      var xz = x * z2;
      var yy = y * y2;
      var yz = y * z2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      var sx = s[0];
      var sy = s[1];
      var sz = s[2];
      var ox = o[0];
      var oy = o[1];
      var oz = o[2];
      var out0 = (1 - (yy + zz)) * sx;
      var out1 = (xy + wz) * sx;
      var out2 = (xz - wy) * sx;
      var out4 = (xy - wz) * sy;
      var out5 = (1 - (xx + zz)) * sy;
      var out6 = (yz + wx) * sy;
      var out8 = (xz + wy) * sz;
      var out9 = (yz - wx) * sz;
      var out10 = (1 - (xx + yy)) * sz;
      out[0] = out0;
      out[1] = out1;
      out[2] = out2;
      out[3] = 0;
      out[4] = out4;
      out[5] = out5;
      out[6] = out6;
      out[7] = 0;
      out[8] = out8;
      out[9] = out9;
      out[10] = out10;
      out[11] = 0;
      out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
      out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
      out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
      out[15] = 1;
      return out;
    }
    /**
     * Calculates a 4x4 matrix from the given quaternion
     *
     * @param {mat4} out mat4 receiving operation result
     * @param {ReadonlyQuat} q Quaternion to create matrix from
     *
     * @returns {mat4} out
     */

    function fromQuat(out, q) {
      var x = q[0],
          y = q[1],
          z = q[2],
          w = q[3];
      var x2 = x + x;
      var y2 = y + y;
      var z2 = z + z;
      var xx = x * x2;
      var yx = y * x2;
      var yy = y * y2;
      var zx = z * x2;
      var zy = z * y2;
      var zz = z * z2;
      var wx = w * x2;
      var wy = w * y2;
      var wz = w * z2;
      out[0] = 1 - yy - zz;
      out[1] = yx + wz;
      out[2] = zx - wy;
      out[3] = 0;
      out[4] = yx - wz;
      out[5] = 1 - xx - zz;
      out[6] = zy + wx;
      out[7] = 0;
      out[8] = zx + wy;
      out[9] = zy - wx;
      out[10] = 1 - xx - yy;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
      out[15] = 1;
      return out;
    }
    /**
     * Generates a frustum matrix with the given bounds
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {Number} left Left bound of the frustum
     * @param {Number} right Right bound of the frustum
     * @param {Number} bottom Bottom bound of the frustum
     * @param {Number} top Top bound of the frustum
     * @param {Number} near Near bound of the frustum
     * @param {Number} far Far bound of the frustum
     * @returns {mat4} out
     */

    function frustum(out, left, right, bottom, top, near, far) {
      var rl = 1 / (right - left);
      var tb = 1 / (top - bottom);
      var nf = 1 / (near - far);
      out[0] = near * 2 * rl;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = near * 2 * tb;
      out[6] = 0;
      out[7] = 0;
      out[8] = (right + left) * rl;
      out[9] = (top + bottom) * tb;
      out[10] = (far + near) * nf;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[14] = far * near * 2 * nf;
      out[15] = 0;
      return out;
    }
    /**
     * Generates a perspective projection matrix with the given bounds.
     * Passing null/undefined/no value for far will generate infinite projection matrix.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {number} fovy Vertical field of view in radians
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum, can be null or Infinity
     * @returns {mat4} out
     */

    function perspective(out, fovy, aspect, near, far) {
      var f = 1.0 / Math.tan(fovy / 2),
          nf;
      out[0] = f / aspect;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = f;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = -1;
      out[12] = 0;
      out[13] = 0;
      out[15] = 0;

      if (far != null && far !== Infinity) {
        nf = 1 / (near - far);
        out[10] = (far + near) * nf;
        out[14] = 2 * far * near * nf;
      } else {
        out[10] = -1;
        out[14] = -2 * near;
      }

      return out;
    }
    /**
     * Generates a perspective projection matrix with the given field of view.
     * This is primarily useful for generating projection matrices to be used
     * with the still experiemental WebVR API.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @returns {mat4} out
     */

    function perspectiveFromFieldOfView(out, fov, near, far) {
      var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
      var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
      var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
      var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
      var xScale = 2.0 / (leftTan + rightTan);
      var yScale = 2.0 / (upTan + downTan);
      out[0] = xScale;
      out[1] = 0.0;
      out[2] = 0.0;
      out[3] = 0.0;
      out[4] = 0.0;
      out[5] = yScale;
      out[6] = 0.0;
      out[7] = 0.0;
      out[8] = -((leftTan - rightTan) * xScale * 0.5);
      out[9] = (upTan - downTan) * yScale * 0.5;
      out[10] = far / (near - far);
      out[11] = -1.0;
      out[12] = 0.0;
      out[13] = 0.0;
      out[14] = far * near / (near - far);
      out[15] = 0.0;
      return out;
    }
    /**
     * Generates a orthogonal projection matrix with the given bounds
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @returns {mat4} out
     */

    function ortho(out, left, right, bottom, top, near, far) {
      var lr = 1 / (left - right);
      var bt = 1 / (bottom - top);
      var nf = 1 / (near - far);
      out[0] = -2 * lr;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[5] = -2 * bt;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[10] = 2 * nf;
      out[11] = 0;
      out[12] = (left + right) * lr;
      out[13] = (top + bottom) * bt;
      out[14] = (far + near) * nf;
      out[15] = 1;
      return out;
    }
    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis.
     * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {ReadonlyVec3} eye Position of the viewer
     * @param {ReadonlyVec3} center Point the viewer is looking at
     * @param {ReadonlyVec3} up vec3 pointing up
     * @returns {mat4} out
     */

    function lookAt(out, eye, center, up) {
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
      var eyex = eye[0];
      var eyey = eye[1];
      var eyez = eye[2];
      var upx = up[0];
      var upy = up[1];
      var upz = up[2];
      var centerx = center[0];
      var centery = center[1];
      var centerz = center[2];

      if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
        return identity(out);
      }

      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
      len = 1 / Math.hypot(z0, z1, z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.hypot(x0, x1, x2);

      if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
      } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }

      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
      len = Math.hypot(y0, y1, y2);

      if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
      } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
      }

      out[0] = x0;
      out[1] = y0;
      out[2] = z0;
      out[3] = 0;
      out[4] = x1;
      out[5] = y1;
      out[6] = z1;
      out[7] = 0;
      out[8] = x2;
      out[9] = y2;
      out[10] = z2;
      out[11] = 0;
      out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      out[15] = 1;
      return out;
    }
    /**
     * Generates a matrix that makes something look at something else.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {ReadonlyVec3} eye Position of the viewer
     * @param {ReadonlyVec3} center Point the viewer is looking at
     * @param {ReadonlyVec3} up vec3 pointing up
     * @returns {mat4} out
     */

    function targetTo(out, eye, target, up) {
      var eyex = eye[0],
          eyey = eye[1],
          eyez = eye[2],
          upx = up[0],
          upy = up[1],
          upz = up[2];
      var z0 = eyex - target[0],
          z1 = eyey - target[1],
          z2 = eyez - target[2];
      var len = z0 * z0 + z1 * z1 + z2 * z2;

      if (len > 0) {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
      }

      var x0 = upy * z2 - upz * z1,
          x1 = upz * z0 - upx * z2,
          x2 = upx * z1 - upy * z0;
      len = x0 * x0 + x1 * x1 + x2 * x2;

      if (len > 0) {
        len = 1 / Math.sqrt(len);
        x0 *= len;
        x1 *= len;
        x2 *= len;
      }

      out[0] = x0;
      out[1] = x1;
      out[2] = x2;
      out[3] = 0;
      out[4] = z1 * x2 - z2 * x1;
      out[5] = z2 * x0 - z0 * x2;
      out[6] = z0 * x1 - z1 * x0;
      out[7] = 0;
      out[8] = z0;
      out[9] = z1;
      out[10] = z2;
      out[11] = 0;
      out[12] = eyex;
      out[13] = eyey;
      out[14] = eyez;
      out[15] = 1;
      return out;
    }
    /**
     * Returns a string representation of a mat4
     *
     * @param {ReadonlyMat4} a matrix to represent as a string
     * @returns {String} string representation of the matrix
     */

    function str(a) {
      return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
    }
    /**
     * Returns Frobenius norm of a mat4
     *
     * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
     * @returns {Number} Frobenius norm
     */

    function frob(a) {
      return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
    }
    /**
     * Adds two mat4's
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the first operand
     * @param {ReadonlyMat4} b the second operand
     * @returns {mat4} out
     */

    function add(out, a, b) {
      out[0] = a[0] + b[0];
      out[1] = a[1] + b[1];
      out[2] = a[2] + b[2];
      out[3] = a[3] + b[3];
      out[4] = a[4] + b[4];
      out[5] = a[5] + b[5];
      out[6] = a[6] + b[6];
      out[7] = a[7] + b[7];
      out[8] = a[8] + b[8];
      out[9] = a[9] + b[9];
      out[10] = a[10] + b[10];
      out[11] = a[11] + b[11];
      out[12] = a[12] + b[12];
      out[13] = a[13] + b[13];
      out[14] = a[14] + b[14];
      out[15] = a[15] + b[15];
      return out;
    }
    /**
     * Subtracts matrix b from matrix a
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the first operand
     * @param {ReadonlyMat4} b the second operand
     * @returns {mat4} out
     */

    function subtract(out, a, b) {
      out[0] = a[0] - b[0];
      out[1] = a[1] - b[1];
      out[2] = a[2] - b[2];
      out[3] = a[3] - b[3];
      out[4] = a[4] - b[4];
      out[5] = a[5] - b[5];
      out[6] = a[6] - b[6];
      out[7] = a[7] - b[7];
      out[8] = a[8] - b[8];
      out[9] = a[9] - b[9];
      out[10] = a[10] - b[10];
      out[11] = a[11] - b[11];
      out[12] = a[12] - b[12];
      out[13] = a[13] - b[13];
      out[14] = a[14] - b[14];
      out[15] = a[15] - b[15];
      return out;
    }
    /**
     * Multiply each element of the matrix by a scalar.
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to scale
     * @param {Number} b amount to scale the matrix's elements by
     * @returns {mat4} out
     */

    function multiplyScalar(out, a, b) {
      out[0] = a[0] * b;
      out[1] = a[1] * b;
      out[2] = a[2] * b;
      out[3] = a[3] * b;
      out[4] = a[4] * b;
      out[5] = a[5] * b;
      out[6] = a[6] * b;
      out[7] = a[7] * b;
      out[8] = a[8] * b;
      out[9] = a[9] * b;
      out[10] = a[10] * b;
      out[11] = a[11] * b;
      out[12] = a[12] * b;
      out[13] = a[13] * b;
      out[14] = a[14] * b;
      out[15] = a[15] * b;
      return out;
    }
    /**
     * Adds two mat4's after multiplying each element of the second operand by a scalar value.
     *
     * @param {mat4} out the receiving vector
     * @param {ReadonlyMat4} a the first operand
     * @param {ReadonlyMat4} b the second operand
     * @param {Number} scale the amount to scale b's elements by before adding
     * @returns {mat4} out
     */

    function multiplyScalarAndAdd(out, a, b, scale) {
      out[0] = a[0] + b[0] * scale;
      out[1] = a[1] + b[1] * scale;
      out[2] = a[2] + b[2] * scale;
      out[3] = a[3] + b[3] * scale;
      out[4] = a[4] + b[4] * scale;
      out[5] = a[5] + b[5] * scale;
      out[6] = a[6] + b[6] * scale;
      out[7] = a[7] + b[7] * scale;
      out[8] = a[8] + b[8] * scale;
      out[9] = a[9] + b[9] * scale;
      out[10] = a[10] + b[10] * scale;
      out[11] = a[11] + b[11] * scale;
      out[12] = a[12] + b[12] * scale;
      out[13] = a[13] + b[13] * scale;
      out[14] = a[14] + b[14] * scale;
      out[15] = a[15] + b[15] * scale;
      return out;
    }
    /**
     * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
     *
     * @param {ReadonlyMat4} a The first matrix.
     * @param {ReadonlyMat4} b The second matrix.
     * @returns {Boolean} True if the matrices are equal, false otherwise.
     */

    function exactEquals(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
    }
    /**
     * Returns whether or not the matrices have approximately the same elements in the same position.
     *
     * @param {ReadonlyMat4} a The first matrix.
     * @param {ReadonlyMat4} b The second matrix.
     * @returns {Boolean} True if the matrices are equal, false otherwise.
     */

    function equals(a, b) {
      var a0 = a[0],
          a1 = a[1],
          a2 = a[2],
          a3 = a[3];
      var a4 = a[4],
          a5 = a[5],
          a6 = a[6],
          a7 = a[7];
      var a8 = a[8],
          a9 = a[9],
          a10 = a[10],
          a11 = a[11];
      var a12 = a[12],
          a13 = a[13],
          a14 = a[14],
          a15 = a[15];
      var b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
      var b4 = b[4],
          b5 = b[5],
          b6 = b[6],
          b7 = b[7];
      var b8 = b[8],
          b9 = b[9],
          b10 = b[10],
          b11 = b[11];
      var b12 = b[12],
          b13 = b[13],
          b14 = b[14],
          b15 = b[15];
      return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
    }
    /**
     * Alias for {@link mat4.multiply}
     * @function
     */

    var mul = multiply;
    /**
     * Alias for {@link mat4.subtract}
     * @function
     */

    var sub = subtract;

    var mat4 = {
        __proto__: null,
        create: create,
        clone: clone,
        copy: copy,
        fromValues: fromValues,
        set: set,
        identity: identity,
        transpose: transpose,
        invert: invert,
        adjoint: adjoint,
        determinant: determinant,
        multiply: multiply,
        translate: translate,
        scale: scale,
        rotate: rotate,
        rotateX: rotateX,
        rotateY: rotateY,
        rotateZ: rotateZ,
        fromTranslation: fromTranslation,
        fromScaling: fromScaling,
        fromRotation: fromRotation,
        fromXRotation: fromXRotation,
        fromYRotation: fromYRotation,
        fromZRotation: fromZRotation,
        fromRotationTranslation: fromRotationTranslation,
        fromQuat2: fromQuat2,
        getTranslation: getTranslation,
        getScaling: getScaling,
        getRotation: getRotation,
        fromRotationTranslationScale: fromRotationTranslationScale,
        fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
        fromQuat: fromQuat,
        frustum: frustum,
        perspective: perspective,
        perspectiveFromFieldOfView: perspectiveFromFieldOfView,
        ortho: ortho,
        lookAt: lookAt,
        targetTo: targetTo,
        str: str,
        frob: frob,
        add: add,
        subtract: subtract,
        multiplyScalar: multiplyScalar,
        multiplyScalarAndAdd: multiplyScalarAndAdd,
        exactEquals: exactEquals,
        equals: equals,
        mul: mul,
        sub: sub
    };

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    var OPEN_CLOSED_CHARACTER$1 = ["\"", "'", "\\\"", "\\'"];
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray$2(value) {
      return Array.isArray(value);
    }

    function findClosed$1(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed$1(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER$1.indexOf(character) > -1) {
          nextIndex = findClosed$1(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText$1(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed$1(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER$1.indexOf(character) > -1) {
          nextIndex = findClosed$1(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by space.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {spliceSpace} from "@daybrush/utils";

    console.log(splitSpace("a b c d e f g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitSpace("'a,b' c 'd,e' f g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitSpace$1(text) {
      // divide comma(,)
      return splitText$1(text, "");
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma$1(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText$1(text, ",");
    }
    /**
    * divide text by bracket "(", ")".
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {object} divided texts
    * @example
    import {splitBracket} from "@daybrush/utils";

    console.log(splitBracket("a(1, 2)"));
    // {prefix: "a", value: "1, 2", suffix: ""}
    console.log(splitBracket("a(1, 2)b"));
    // {prefix: "a", value: "1, 2", suffix: "b"}
    */

    function splitBracket$1(text) {
      var matches = /([^(]*)\(([\s\S]*)\)([\s\S]*)/g.exec(text);

      if (!matches || matches.length < 4) {
        return {};
      } else {
        return {
          prefix: matches[1],
          value: matches[2],
          suffix: matches[3]
        };
      }
    }
    /**
    * divide text by number and unit.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {} divided texts
    * @example
    import {splitUnit} from "@daybrush/utils";

    console.log(splitUnit("10px"));
    // {prefix: "", value: 10, unit: "px"}
    console.log(splitUnit("-10px"));
    // {prefix: "", value: -10, unit: "px"}
    console.log(splitUnit("a10%"));
    // {prefix: "a", value: 10, unit: "%"}
    */

    function splitUnit$1(text) {
      var matches = /^([^\d|e|\-|\+]*)((?:\d|\.|-|e-|e\+)+)(\S*)$/g.exec(text);

      if (!matches) {
        return {
          prefix: "",
          unit: "",
          value: NaN
        };
      }

      var prefix = matches[1];
      var value = matches[2];
      var unit = matches[3];
      return {
        prefix: prefix,
        unit: unit,
        value: parseFloat(value)
      };
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-to-mat
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-to-mat.git
    version: 0.1.6
    */

    function createMatrix() {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }
    function parseMat(transform) {
      return toMat(parse(transform));
    }
    function toMat(matrixInfos) {
      var target = createMatrix();
      matrixInfos.forEach(function (info) {
        var functionName = info.functionName,
            functionValue = info.functionValue;

        if (!functionName) {
          return;
        }

        mat4[functionName](target, target, functionValue);
      });
      return target;
    }
    function parse(transform) {
      var transforms = isArray$2(transform) ? transform : splitSpace$1(transform);
      return transforms.map(function (t) {
        var _a = splitBracket$1(t),
            name = _a.prefix,
            value = _a.value;

        var functionName = "";
        var functionValue = "";

        if (name === "translate" || name === "translateX" || name === "translate3d") {
          var _b = splitComma$1(value).map(function (v) {
            return parseFloat(v);
          }),
              posX = _b[0],
              _c = _b[1],
              posY = _c === void 0 ? 0 : _c,
              _d = _b[2],
              posZ = _d === void 0 ? 0 : _d;

          functionName = "translate";
          functionValue = [posX, posY, posZ];
        } else if (name === "translateY") {
          var posY = parseFloat(value);
          functionName = "translate";
          functionValue = [0, posY, 0];
        } else if (name === "translateZ") {
          var posZ = parseFloat(value);
          functionName = "translate";
          functionValue = [0, 0, posZ];
        } else if (name === "scale" || name === "scale3d") {
          var _e = splitComma$1(value).map(function (v) {
            return parseFloat(v);
          }),
              sx = _e[0],
              _f = _e[1],
              sy = _f === void 0 ? sx : _f,
              _g = _e[2],
              sz = _g === void 0 ? 1 : _g;

          functionName = "scale";
          functionValue = [sx, sy, sz];
        } else if (name === "scaleX") {
          var sx = parseFloat(value);
          functionName = "scale";
          functionValue = [sx, 1, 1];
        } else if (name === "scaleY") {
          var sy = parseFloat(value);
          functionName = "scale";
          functionValue = [1, sy, 1];
        } else if (name === "scaleZ") {
          var sz = parseFloat(value);
          functionName = "scale";
          functionValue = [1, 1, sz];
        } else if (name === "rotate" || name === "rotateZ" || name === "rotateX" || name === "rotateY") {
          var _h = splitUnit$1(value),
              unit = _h.unit,
              unitValue = _h.value;

          var rad = unit === "rad" ? unitValue : unitValue * Math.PI / 180;
          functionName = name === "rotate" ? "rotateZ" : name;
          functionValue = rad;
        } else if (name === "matrix3d") {
          functionName = "multiply";
          functionValue = splitComma$1(value).map(function (v) {
            return parseFloat(v);
          });
        } else if (name === "matrix") {
          var m = splitComma$1(value).map(function (v) {
            return parseFloat(v);
          });
          functionName = "multiply";
          functionValue = [m[0], m[1], 0, 0, m[2], m[3], 0, 0, 0, 0, 1, 0, m[4], m[5], 0, 1];
        }

        return {
          name: name,
          value: value,
          functionName: functionName,
          functionValue: functionValue
        };
      });
    }

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.10.5
    */
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray$3(value) {
      return Array.isArray(value);
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */

    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/dragscroll
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/dragscroll.git
    version: 0.2.1
    */

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
    var extendStatics$2 = function (d, b) {
      extendStatics$2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
      extendStatics$2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function getDefaultScrollPosition(e) {
      var container = e.container;
      return [container.scrollLeft, container.scrollTop];
    }

    var DragScroll =
    /*#__PURE__*/
    function (_super) {
      __extends$2(DragScroll, _super);

      function DragScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.startRect = null;
        _this.startPos = [];
        _this.prevTime = 0;
        _this.timer = 0;
        return _this;
      }

      var __proto = DragScroll.prototype;

      __proto.dragStart = function (e, options) {
        var _a = options.container.getBoundingClientRect(),
            top = _a.top,
            left = _a.left,
            width = _a.width,
            height = _a.height;

        this.startPos = [e.clientX, e.clientY];
        this.startRect = {
          top: top,
          left: left,
          width: width,
          height: height
        };
      };

      __proto.drag = function (e, options) {
        var _this = this;

        var clientX = e.clientX,
            clientY = e.clientY;
        var container = options.container,
            _a = options.threshold,
            threshold = _a === void 0 ? 0 : _a,
            _b = options.throttleTime,
            throttleTime = _b === void 0 ? 0 : _b,
            _c = options.getScrollPosition,
            getScrollPosition = _c === void 0 ? getDefaultScrollPosition : _c;

        var _d = this,
            startRect = _d.startRect,
            startPos = _d.startPos;

        var nowTime = now();
        var distTime = Math.max(throttleTime + this.prevTime - nowTime, 0);
        var direction = [0, 0];

        if (startRect.top > clientY - threshold) {
          if (startPos[1] > startRect.top || clientY < startPos[1]) {
            direction[1] = -1;
          }
        } else if (startRect.top + startRect.height < clientY + threshold) {
          if (startPos[1] < startRect.top + startRect.height || clientY > startPos[1]) {
            direction[1] = 1;
          }
        }

        if (startRect.left > clientX - threshold) {
          if (startPos[0] > startRect.left || clientX < startPos[0]) {
            direction[0] = -1;
          }
        } else if (startRect.left + startRect.width < clientX + threshold) {
          if (startPos[0] < startRect.left + startRect.width || clientX > startPos[0]) {
            direction[0] = 1;
          }
        }

        clearTimeout(this.timer);

        if (!direction[0] && !direction[1]) {
          return false;
        }

        if (distTime > 0) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, distTime);
          return false;
        }

        this.prevTime = nowTime;
        var prevPos = getScrollPosition({
          container: container,
          direction: direction
        });
        this.trigger("scroll", {
          container: container,
          direction: direction,
          inputEvent: e
        });
        var nextPos = getScrollPosition({
          container: container,
          direction: direction
        });
        var offsetX = nextPos[0] - prevPos[0];
        var offsetY = nextPos[1] - prevPos[1];

        if (!offsetX && !offsetY) {
          return false;
        }

        this.trigger("move", {
          offsetX: direction[0] ? offsetX : 0,
          offsetY: direction[1] ? offsetY : 0,
          inputEvent: e
        });

        if (throttleTime) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, throttleTime);
        }

        return true;
      };

      __proto.dragEnd = function () {
        clearTimeout(this.timer);
      };

      return DragScroll;
    }(Component);

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now$1() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: gesto
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/gesture.git
    version: 1.0.1
    */

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
    var extendStatics$3 = function (d, b) {
      extendStatics$3 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$3(d, b);
    };

    function __extends$3(d, b) {
      extendStatics$3(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$2 = function () {
      __assign$2 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$2.apply(this, arguments);
    };

    function getRad(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getRotatiion(touches) {
      return getRad([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
    }
    function isMultiTouch(e) {
      return e.touches && e.touches.length >= 2;
    }
    function getEventClients(e) {
      if (e.touches) {
        return getClients(e.touches);
      } else {
        return [getClient(e)];
      }
    }
    function getPosition(clients, prevClients, startClients) {
      var length = startClients.length;

      var _a = getAverageClient(clients, length),
          clientX = _a.clientX,
          clientY = _a.clientY,
          originalClientX = _a.originalClientX,
          originalClientY = _a.originalClientY;

      var _b = getAverageClient(prevClients, length),
          prevX = _b.clientX,
          prevY = _b.clientY;

      var _c = getAverageClient(startClients, length),
          startX = _c.clientX,
          startY = _c.clientY;

      var deltaX = clientX - prevX;
      var deltaY = clientY - prevY;
      var distX = clientX - startX;
      var distY = clientY - startY;
      return {
        clientX: originalClientX,
        clientY: originalClientY,
        deltaX: deltaX,
        deltaY: deltaY,
        distX: distX,
        distY: distY
      };
    }
    function getDist(clients) {
      return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
    }
    function getClients(touches) {
      var length = Math.min(touches.length, 2);
      var clients = [];

      for (var i = 0; i < length; ++i) {
        clients.push(getClient(touches[i]));
      }

      return clients;
    }
    function getClient(e) {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
    function getAverageClient(clients, length) {
      if (length === void 0) {
        length = clients.length;
      }

      var sumClient = {
        clientX: 0,
        clientY: 0,
        originalClientX: 0,
        originalClientY: 0
      };

      for (var i = 0; i < length; ++i) {
        var client = clients[i];
        sumClient.originalClientX += "originalClientX" in client ? client.originalClientX : client.clientX;
        sumClient.originalClientY += "originalClientY" in client ? client.originalClientY : client.clientY;
        sumClient.clientX += client.clientX;
        sumClient.clientY += client.clientY;
      }

      if (!length) {
        return sumClient;
      }

      return {
        clientX: sumClient.clientX / length,
        clientY: sumClient.clientY / length,
        originalClientX: sumClient.originalClientX / length,
        originalClientY: sumClient.originalClientY / length
      };
    }

    var ClientStore =
    /*#__PURE__*/
    function () {
      function ClientStore(clients) {
        this.prevClients = [];
        this.startClients = [];
        this.movement = 0;
        this.length = 0;
        this.startClients = clients;
        this.prevClients = clients;
        this.length = clients.length;
      }

      var __proto = ClientStore.prototype;

      __proto.addClients = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var position = this.getPosition(clients);
        var deltaX = position.deltaX,
            deltaY = position.deltaY;
        this.movement += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        this.prevClients = clients;
        return position;
      };

      __proto.getAngle = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients);
      };

      __proto.getRotation = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getRotatiion(clients) - getRotatiion(this.startClients);
      };

      __proto.getPosition = function (clients) {
        return getPosition(clients || this.prevClients, this.prevClients, this.startClients);
      };

      __proto.getPositions = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        var prevClients = this.prevClients;
        return this.startClients.map(function (startClient, i) {
          return getPosition([clients[i]], [prevClients[i]], [startClient]);
        });
      };

      __proto.getMovement = function (clients) {
        var movement = this.movement;

        if (!clients) {
          return movement;
        }

        var currentClient = getAverageClient(clients, this.length);
        var prevClient = getAverageClient(this.prevClients, this.length);
        var deltaX = currentClient.clientX - prevClient.clientX;
        var deltaY = currentClient.clientY - prevClient.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY) + movement;
      };

      __proto.getDistance = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients);
      };

      __proto.getScale = function (clients) {
        if (clients === void 0) {
          clients = this.prevClients;
        }

        return getDist(clients) / getDist(this.startClients);
      };

      __proto.move = function (deltaX, deltaY) {
        this.startClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
        this.prevClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
      };

      return ClientStore;
    }();

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag, pinch events in any browser.
     */

    var Gesto =
    /*#__PURE__*/
    function (_super) {
      __extends$3(Gesto, _super);
      /**
       *
       */


      function Gesto(targets, options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.options = {};
        _this.flag = false;
        _this.pinchFlag = false;
        _this.datas = {};
        _this.isDrag = false;
        _this.isPinch = false;
        _this.isMouse = false;
        _this.isTouch = false;
        _this.clientStores = [];
        _this.targets = [];
        _this.prevTime = 0;
        _this.isDouble = false;

        _this.onDragStart = function (e, isTrusted) {
          if (isTrusted === void 0) {
            isTrusted = true;
          }

          if (!_this.flag && e.cancelable === false) {
            return;
          }

          var _a = _this.options,
              container = _a.container,
              pinchOutside = _a.pinchOutside,
              preventRightClick = _a.preventRightClick,
              preventDefault = _a.preventDefault,
              checkInput = _a.checkInput;
          var isTouch = _this.isTouch;
          var isDragStart = !_this.flag;

          if (isDragStart) {
            var activeElement = document.activeElement;
            var target = e.target;
            var tagName = target.tagName.toLowerCase();
            var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
            var hasContentEditable = target.isContentEditable;

            if (hasInput || hasContentEditable) {
              if (checkInput || activeElement === target) {
                // force false or already focused.
                return false;
              }

              if (activeElement && hasContentEditable && activeElement.isContentEditable && activeElement.contains(target)) {
                return false;
              }
            } else if ((preventDefault || e.type === "touchstart") && activeElement) {
              var activeTagName = activeElement.tagName;

              if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                activeElement.blur();
              }
            }

            _this.clientStores = [new ClientStore(getEventClients(e))];
            _this.flag = true;
            _this.isDrag = false;
            _this.datas = {};

            if (preventRightClick && (e.which === 3 || e.button === 2)) {
              _this.initDrag();

              return false;
            }

            var result = _this.trigger("dragStart", __assign$2({
              datas: _this.datas,
              inputEvent: e,
              isTrusted: isTrusted
            }, _this.getCurrentStore().getPosition()));

            if (result === false) {
              _this.initDrag();
            }

            _this.isDouble = now$1() - _this.prevTime < 200;
            _this.flag && preventDefault && e.preventDefault();
          }

          if (!_this.flag) {
            return false;
          }

          var timer = 0;

          if (isDragStart && isTouch && pinchOutside) {
            timer = setTimeout(function () {
              addEvent(container, "touchstart", _this.onDragStart, {
                passive: false
              });
            });
          }

          if (!isDragStart && isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.flag && isMultiTouch(e)) {
            clearTimeout(timer);

            if (isDragStart && e.touches.length !== e.changedTouches.length) {
              return;
            }

            if (!_this.pinchFlag) {
              _this.onPinchStart(e);
            }
          }
        };

        _this.onDrag = function (e, isScroll) {
          if (!_this.flag) {
            return;
          }

          var clients = getEventClients(e);

          var result = _this.moveClients(clients, e, false);

          if (_this.pinchFlag || result.deltaX || result.deltaY) {
            _this.trigger("drag", __assign$2({}, result, {
              isScroll: !!isScroll,
              inputEvent: e
            }));
          }

          if (_this.pinchFlag) {
            _this.onPinch(e, clients);
          }

          _this.getCurrentStore().addClients(clients);
        };

        _this.onDragEnd = function (e) {
          if (!_this.flag) {
            return;
          }

          var _a = _this.options,
              pinchOutside = _a.pinchOutside,
              container = _a.container;

          if (_this.isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          _this.flag = false;

          var position = _this.getCurrentStore().getPosition();

          var currentTime = now$1();
          var isDouble = !_this.isDrag && _this.isDouble;
          _this.prevTime = _this.isDrag || isDouble ? 0 : currentTime;

          _this.trigger("dragEnd", __assign$2({
            datas: _this.datas,
            isDouble: isDouble,
            isDrag: _this.isDrag,
            inputEvent: e
          }, position));

          if (_this.pinchFlag) {
            _this.onPinchEnd(e);
          }

          _this.clientStores = [];
        };

        var elements = [].concat(targets);
        _this.options = __assign$2({
          checkInput: false,
          container: elements.length > 1 ? window : elements[0],
          preventRightClick: true,
          preventDefault: true,
          pinchThreshold: 0,
          events: ["touch", "mouse"]
        }, options);
        var _a = _this.options,
            container = _a.container,
            events = _a.events;
        _this.isTouch = events.indexOf("touch") > -1;
        _this.isMouse = events.indexOf("mouse") > -1;
        _this.targets = elements;

        if (_this.isMouse) {
          elements.forEach(function (el) {
            addEvent(el, "mousedown", _this.onDragStart);
          });
          addEvent(container, "mousemove", _this.onDrag);
          addEvent(container, "mouseup", _this.onDragEnd);
          addEvent(container, "contextmenu", _this.onDragEnd);
        }

        if (_this.isTouch) {
          var passive_1 = {
            passive: false
          };
          elements.forEach(function (el) {
            addEvent(el, "touchstart", _this.onDragStart, passive_1);
          });
          addEvent(container, "touchmove", _this.onDrag, passive_1);
          addEvent(container, "touchend", _this.onDragEnd, passive_1);
          addEvent(container, "touchcancel", _this.onDragEnd, passive_1);
        }

        return _this;
      }
      /**
       * The total moved distance
       */


      var __proto = Gesto.prototype;

      __proto.getMovement = function (clients) {
        return this.getCurrentStore().getMovement(clients) + this.clientStores.slice(1).reduce(function (prev, cur) {
          return prev + cur.movement;
        }, 0);
      };
      /**
       * Whether to drag
       */


      __proto.isDragging = function () {
        return this.isDrag;
      };
      /**
       * Whether to start drag
       */


      __proto.isFlag = function () {
        return this.flag;
      };
      /**
       * Whether to start pinch
       */


      __proto.isPinchFlag = function () {
        return this.pinchFlag;
      };
      /**
       * Whether to pinch
       */


      __proto.isPinching = function () {
        return this.isPinch;
      };
      /**
       * If a scroll event occurs, it is corrected by the scroll distance.
       */


      __proto.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
        if (isCallDrag === void 0) {
          isCallDrag = true;
        }

        if (!this.flag) {
          return;
        }

        this.clientStores[0].move(deltaX, deltaY);
        isCallDrag && this.onDrag(e, true);
      };
      /**
       * Create a virtual drag event.
       */


      __proto.move = function (_a, inputEvent) {
        var deltaX = _a[0],
            deltaY = _a[1];
        var store = this.getCurrentStore();
        var nextClients = store.prevClients;
        return this.moveClients(nextClients.map(function (_a) {
          var clientX = _a.clientX,
              clientY = _a.clientY;
          return {
            clientX: clientX + deltaX,
            clientY: clientY + deltaY,
            originalClientX: clientX,
            originalClientY: clientY
          };
        }), inputEvent, true);
      };
      /**
       * The dragStart event is triggered by an external event.
       */


      __proto.triggerDragStart = function (e) {
        this.onDragStart(e, false);
      };
      /**
       * Unset Gesto
       */


      __proto.unset = function () {
        var _this = this;

        var targets = this.targets;
        var container = this.options.container;
        this.off();

        if (this.isMouse) {
          targets.forEach(function (target) {
            removeEvent(target, "mousedown", _this.onDragStart);
          });
          removeEvent(container, "mousemove", this.onDrag);
          removeEvent(container, "mouseup", this.onDragEnd);
          removeEvent(container, "contextmenu", this.onDragEnd);
        }

        if (this.isTouch) {
          targets.forEach(function (target) {
            removeEvent(target, "touchstart", _this.onDragStart);
          });
          removeEvent(container, "touchstart", this.onDragStart);
          removeEvent(container, "touchmove", this.onDrag);
          removeEvent(container, "touchend", this.onDragEnd);
          removeEvent(container, "touchcancel", this.onDragEnd);
        }
      };

      __proto.onPinchStart = function (e) {
        var pinchThreshold = this.options.pinchThreshold;

        if (this.isDrag && this.getMovement() > pinchThreshold) {
          return;
        }

        var store = new ClientStore(getEventClients(e));
        this.pinchFlag = true;
        this.clientStores.splice(0, 0, store);
        var result = this.trigger("pinchStart", __assign$2({
          datas: this.datas,
          angle: store.getAngle(),
          touches: this.getCurrentStore().getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));

        if (result === false) {
          this.pinchFlag = false;
        }
      };

      __proto.onPinch = function (e, clients) {
        if (!this.flag || !this.pinchFlag || clients.length < 2) {
          return;
        }

        var store = this.getCurrentStore();
        this.isPinch = true;
        this.trigger("pinch", __assign$2({
          datas: this.datas,
          movement: this.getMovement(clients),
          angle: store.getAngle(clients),
          rotation: store.getRotation(clients),
          touches: store.getPositions(clients),
          scale: store.getScale(clients),
          distance: store.getDistance(clients)
        }, store.getPosition(clients), {
          inputEvent: e
        }));
      };

      __proto.onPinchEnd = function (e) {
        if (!this.pinchFlag) {
          return;
        }

        var isPinch = this.isPinch;
        this.isPinch = false;
        this.pinchFlag = false;
        var store = this.getCurrentStore();
        this.trigger("pinchEnd", __assign$2({
          datas: this.datas,
          isPinch: isPinch,
          touches: store.getPositions()
        }, store.getPosition(), {
          inputEvent: e
        }));
        this.isPinch = false;
        this.pinchFlag = false;
      };

      __proto.initDrag = function () {
        this.clientStores = [];
        this.pinchFlag = false;
        this.flag = false;
      };

      __proto.getCurrentStore = function () {
        return this.clientStores[0];
      };

      __proto.moveClients = function (clients, inputEvent, isAdd) {
        var store = this.getCurrentStore();
        var position = store[isAdd ? "addClients" : "getPosition"](clients);
        this.isDrag = true;
        return __assign$2({
          datas: this.datas
        }, position, {
          movement: this.getMovement(clients),
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          inputEvent: inputEvent
        });
      };

      return Gesto;
    }(Component);

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/children-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-children-differ
    version: 1.0.1
    */

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
    var extendStatics$4 = function (d, b) {
      extendStatics$4 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$4(d, b);
    };

    function __extends$4(d, b) {
      extendStatics$4(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*
    egjs-children-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var findKeyCallback = typeof Map === "function" ? undefined : function () {
      var childrenCount = 0;
      return function (el) {
        return el.__DIFF_KEY__ || (el.__DIFF_KEY__ = ++childrenCount);
      };
    }();

    /**
     * A module that checks diff when child are added, removed, or changed .
     * @ko 자식 노드들에서 자식 노드가 추가되거나 삭제되거나 순서가 변경된 사항을 체크하는 모듈입니다.
     * @memberof eg
     * @extends eg.ListDiffer
     */

    var ChildrenDiffer =
    /*#__PURE__*/
    function (_super) {
      __extends$4(ChildrenDiffer, _super);
      /**
       * @param - Initializing Children <ko> 초기 설정할 자식 노드들</ko>
       */


      function ChildrenDiffer(list) {
        if (list === void 0) {
          list = [];
        }

        return _super.call(this, list, findKeyCallback) || this;
      }

      return ChildrenDiffer;
    }(ListDiffer);

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    var OPEN_CLOSED_CHARACTER$2 = ["\"", "'", "\\\"", "\\'"];

    function findClosed$2(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed$2(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER$2.indexOf(character) > -1) {
          nextIndex = findClosed$2(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText$2(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed$2(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER$2.indexOf(character) > -1) {
          nextIndex = findClosed$2(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma$2(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText$2(text, ",");
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-styled
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-styled.git
    version: 1.0.0
    */

    function hash(str) {
      var hash = 5381,
          i    = str.length;

      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }

      /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
       * integers. Since we want the results to be always positive, convert the
       * signed int to an unsigned by doing an unsigned bitshift. */
      return hash >>> 0;
    }

    var stringHash = hash;

    function getHash(str) {
      return stringHash(str).toString(36);
    }
    function getShadowRoot(parentElement) {
      if (parentElement && parentElement.getRootNode) {
        var rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
          return rootNode;
        }
      }

      return;
    }
    function replaceStyle(className, css, options) {
      if (options.original) {
        return css;
      }

      return css.replace(/([^};{\s}][^};{]*|^\s*){/mg, function (_, selector) {
        var trimmedSelector = selector.trim();
        return (trimmedSelector ? splitComma$2(trimmedSelector) : [""]).map(function (subSelector) {
          var trimmedSubSelector = subSelector.trim();

          if (trimmedSubSelector.indexOf("@") === 0) {
            return trimmedSubSelector;
          } else if (trimmedSubSelector.indexOf(":global") > -1) {
            return trimmedSubSelector.replace(/\:global/g, "");
          } else if (trimmedSubSelector.indexOf(":host") > -1) {
            return "" + trimmedSubSelector.replace(/\:host/g, "." + className);
          } else if (trimmedSubSelector) {
            return "." + className + " " + trimmedSubSelector;
          } else {
            return "." + className;
          }
        }).join(", ") + " {";
      });
    }
    function injectStyle(className, css, options, shadowRoot) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-styled-id", className);

      if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
      }

      style.innerHTML = replaceStyle(className, css, options);
      (shadowRoot || document.head || document.body).appendChild(style);
      return style;
    }

    /**
     * Create an styled object that can be defined and inserted into the css.
     * @param - css styles
     */

    function styled(css) {
      var injectClassName = "rCS" + getHash(css);
      var injectCount = 0;
      var injectElement;
      return {
        className: injectClassName,
        inject: function (el, options) {
          if (options === void 0) {
            options = {};
          }

          var shadowRoot = getShadowRoot(el);
          var firstMount = injectCount === 0;
          var styleElement;

          if (shadowRoot || firstMount) {
            styleElement = injectStyle(injectClassName, css, options, shadowRoot);
          }

          if (firstMount) {
            injectElement = styleElement;
          }

          if (!shadowRoot) {
            ++injectCount;
          }

          return {
            destroy: function () {
              if (shadowRoot) {
                el.removeChild(styleElement);
                styleElement = null;
              } else {
                if (injectCount > 0) {
                  --injectCount;
                }

                if (injectCount === 0 && injectElement) {
                  injectElement.parentNode.removeChild(injectElement);
                  injectElement = null;
                }
              }
            }
          };
        }
      };
    }

    /*
    Copyright (c) 2019 Daybrush
    name: react-css-styled
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/css-styled/tree/master/packages/react-css-styled
    version: 1.0.0
    */

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
    var extendStatics$5 = function (d, b) {
      extendStatics$5 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$5(d, b);
    };

    function __extends$5(d, b) {
      extendStatics$5(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$3 = function () {
      __assign$3 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$3.apply(this, arguments);
    };
    function __rest$1(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }

    var StyledElement =
    /*#__PURE__*/
    function (_super) {
      __extends$5(StyledElement, _super);

      function StyledElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.injectResult = null;
        _this.tag = "div";
        return _this;
      }

      var __proto = StyledElement.prototype;

      __proto.render = function () {
        var _a = this.props,
            _b = _a.className,
            className = _b === void 0 ? "" : _b,
            cspNonce = _a.cspNonce,
            attributes = __rest$1(_a, ["className", "cspNonce"]);

        var cssId = this.injector.className;
        var Tag = this.tag;
        return createElement(Tag, __assign$3({
          "ref": ref(this, "element"),
          "data-styled-id": cssId,
          "className": className + " " + cssId
        }, attributes));
      };

      __proto.componentDidMount = function () {
        this.injectResult = this.injector.inject(this.element, {
          nonce: this.props.cspNonce
        });
      };

      __proto.componentWillUnmount = function () {
        this.injectResult.destroy();
        this.injectResult = null;
      };

      __proto.getElement = function () {
        return this.element;
      };

      return StyledElement;
    }(Component$1);

    function styled$1(tag, css) {
      var injector = styled(css);
      return (
        /*#__PURE__*/
        function (_super) {
          __extends$5(Styled, _super);

          function Styled() {
            var _this = _super !== null && _super.apply(this, arguments) || this;

            _this.injector = injector;
            _this.tag = tag;
            return _this;
          }

          return Styled;
        }(StyledElement)
      );
    }

    /*
    Copyright (c) 2019 Daybrush
    name: react-moveable
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/moveable/blob/master/packages/react-moveable
    version: 0.22.3
    */

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
    var extendStatics$6 = function (d, b) {
      extendStatics$6 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$6(d, b);
    };

    function __extends$6(d, b) {
      extendStatics$6(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign$4 = function () {
      __assign$4 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$4.apply(this, arguments);
    };
    function __decorate$1(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __spreadArrays$1() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    function getSVGCursor(scale, degree) {
      return "data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"" + 32 * scale + "px\" height=\"" + 32 * scale + "px\" viewBox=\"0 0 32 32\" ><path d=\"M 16,5 L 12,10 L 14.5,10 L 14.5,22 L 12,22 L 16,27 L 20,22 L 17.5,22 L 17.5,10 L 20, 10 L 16,5 Z\" stroke-linejoin=\"round\" stroke-width=\"1.2\" fill=\"black\" stroke=\"white\" style=\"transform:rotate(" + degree + "deg);transform-origin: 16px 16px\"></path></svg>";
    }

    function getCursorCSS(degree) {
      var x1 = getSVGCursor(1, degree);
      var x2 = getSVGCursor(2, degree);
      var degree45 = Math.round(degree / 45) * 45 % 180;
      var defaultCursor = degree45 === 135 ? "nwse-resize" : degree45 === 45 ? "nesw-resize" : degree45 === 90 ? "ew-resize" : "ns-resize"; // 135
      // tslint:disable-next-line: max-line-length

      return "cursor:" + defaultCursor + ";cursor: url('" + x1 + "') 16 16, " + defaultCursor + ";cursor: -webkit-image-set(url('" + x1 + "') 1x, url('" + x2 + "') 2x) 16 16, " + defaultCursor + ";";
    }

    var agent$1 = agent();
    var IS_WEBKIT = agent$1.browser.webkit;
    var PREFIX = "moveable-";
    var MOVEABLE_CSS = "\n{\n\tposition: fixed;\n\twidth: 1px;\n\theight: 1px;\n\tleft: 0;\n\ttop: 0;\n    z-index: 3000;\n    --zoom: 1;\n    --zoompx: 1px;\n}\n.control-box {\n    z-index: 0;\n}\n.line, .control {\n\tleft: 0;\n    top: 0;\n    will-change: transform;\n}\n.control {\n\tposition: absolute;\n\twidth: 14px;\n\theight: 14px;\n\tborder-radius: 50%;\n\tborder: 2px solid #fff;\n\tbox-sizing: border-box;\n\tbackground: #4af;\n\tmargin-top: -7px;\n    margin-left: -7px;\n    width: calc(14 * var(--zoompx));\n    height: calc(14 * var(--zoompx));\n    margin-top: calc(-7 * var(--zoompx));\n    margin-left: calc(-7 * var(--zoompx));\n    border: calc(2 * var(--zoompx)) solid #fff;\n    z-index: 10;\n}\n.padding {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    width: 100px;\n    height: 100px;\n    transform-origin: 0 0;\n}\n.line {\n\tposition: absolute;\n\twidth: 1px;\n    height: 1px;\n    width: var(--zoompx);\n    height: var(--zoompx);\n\tbackground: #4af;\n\ttransform-origin: 0px 50%;\n}\n.line.dashed {\n    box-sizing: border-box;\n    background: transparent;\n}\n.line.dashed.horizontal {\n    border-top: 1px dashed #4af;\n    border-top: var(--zoompx) dashed #4af;\n}\n.line.dashed.vertical {\n    border-left: 1px dashed #4af;\n    border-left: var(--zoompx) dashed #4af;\n}\n.line.dashed:before {\n    position: absolute;\n    content: attr(data-size);\n    color: #4af;\n    font-size: 12px;\n    font-weight: bold;\n}\n.line.dashed.horizontal:before, .line.gap.horizontal:before {\n    left: 50%;\n    transform: translateX(-50%);\n    bottom: 5px;\n}\n.line.dashed.vertical:before, .line.gap.vertical:before {\n    top: 50%;\n    transform: translateY(-50%);\n    left: 5px;\n}\n.line.rotation-line {\n\theight: 40px;\n    width: 1px;\n    transform-origin: 50% calc(100% - 0.5px);\n    top: -40px;\n    width: var(--zoompx);\n    height: calc(40 * var(--zoompx));\n    top: calc(-40 * var(--zoompx));\n    transform-origin: 50% calc(100% - 0.5 * var(--zoompx));\n}\n.line.rotation-line .control {\n\tborder-color: #4af;\n\tbackground:#fff;\n    cursor: alias;\n    left: 50%;\n}\n.line.vertical {\n    transform: translateX(-50%);\n}\n.line.horizontal {\n    transform: translateY(-50%);\n}\n.line.vertical.bold {\n    width: 2px;\n    width: calc(2 * var(--zoompx));\n}\n.line.horizontal.bold {\n    height: 2px;\n    height: calc(2 * var(--zoompx));\n}\n\n.line.gap {\n    background: #f55;\n}\n.line.gap:before {\n    position: absolute;\n    content: attr(data-size);\n    color: #f55;\n    font-size: 12px;\n    font-weight: bold;\n}\n.control.origin {\n\tborder-color: #f55;\n\tbackground: #fff;\n\twidth: 12px;\n\theight: 12px;\n\tmargin-top: -6px;\n    margin-left: -6px;\n    width: calc(12 * var(--zoompx));\n    height: calc(12 * var(--zoompx));\n    margin-top: calc(-6 * var(--zoompx));\n    margin-left: calc(-6 * var(--zoompx));\n\tpointer-events: none;\n}\n" + [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(function (degree) {
      return "\n.direction[data-rotation=\"" + degree + "\"] {\n\t" + getCursorCSS(degree) + "\n}\n";
    }).join("\n") + "\n.group {\n    z-index: -1;\n}\n.area {\n    position: absolute;\n}\n.area-pieces {\n    position: absolute;\n    top: 0;\n    left: 0;\n    display: none;\n}\n.area.avoid, .area.pass {\n    pointer-events: none;\n}\n.area.avoid+.area-pieces {\n    display: block;\n}\n.area-piece {\n    position: absolute;\n}\n\n" + (IS_WEBKIT ? ":global svg *:before {\n\tcontent:\"\";\n\ttransform-origin: inherit;\n}" : "") + "\n";
    var NEARBY_POS = [[0, 1, 2], [1, 0, 3], [2, 0, 3], [3, 1, 2]];
    var TINY_NUM = 0.0000001;
    var MIN_SCALE = 0.000000001;
    var MAX_NUM = Math.pow(10, 10);
    var MIN_NUM = -MAX_NUM;
    var DIRECTIONS = ["nw", "ne", "sw", "se", "n", "w", "s", "e"];
    var DIRECTION_INDEXES = {
      n: [0, 1],
      s: [2, 3],
      w: [2, 0],
      e: [1, 3],
      nw: [0],
      ne: [1],
      sw: [2],
      se: [3]
    };
    var DIRECTION_ROTATIONS = {
      n: 0,
      s: 180,
      w: 270,
      e: 90,
      nw: 315,
      ne: 45,
      sw: 225,
      se: 135
    };
    var MOVEABLE_METHODS = ["isMoveableElement", "updateRect", "updateTarget", "destroy", "dragStart", "isInside", "hitTest", "setState", "getRect", "request", "isDragging"];

    function add$1(matrix, inverseMatrix, startIndex, fromIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        matrix[x] += matrix[fromX] * k;
        inverseMatrix[x] += inverseMatrix[fromX] * k;
      }
    }

    function swap(matrix, inverseMatrix, startIndex, fromIndex, n) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        var fromX = fromIndex + i * n;
        var v = matrix[x];
        var iv = inverseMatrix[x];
        matrix[x] = matrix[fromX];
        matrix[fromX] = v;
        inverseMatrix[x] = inverseMatrix[fromX];
        inverseMatrix[fromX] = iv;
      }
    }

    function divide(matrix, inverseMatrix, startIndex, n, k) {
      for (var i = 0; i < n; ++i) {
        var x = startIndex + i * n;
        matrix[x] /= k;
        inverseMatrix[x] /= k;
      }
    }

    function ignoreDimension(matrix, m, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = matrix.slice();

      for (var i = 0; i < n; ++i) {
        newMatrix[i * n + m - 1] = 0;
        newMatrix[(m - 1) * n + i] = 0;
      }

      newMatrix[(m - 1) * (n + 1)] = 1;
      return newMatrix;
    }
    function invert$1(matrix, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = matrix.slice();
      var inverseMatrix = createIdentityMatrix(n);

      for (var i = 0; i < n; ++i) {
        // diagonal
        var identityIndex = n * i + i;

        if (newMatrix[identityIndex] === 0) {
          for (var j = i + 1; j < n; ++j) {
            if (newMatrix[n * i + j]) {
              swap(newMatrix, inverseMatrix, i, j, n);
              break;
            }
          }
        }

        if (newMatrix[identityIndex]) {
          divide(newMatrix, inverseMatrix, i, n, newMatrix[identityIndex]);
        } else {
          // no inverse matrix
          return [];
        }

        for (var j = 0; j < n; ++j) {
          var targetStartIndex = j;
          var targetIndex = j + i * n;
          var target = newMatrix[targetIndex];

          if (target === 0 || i === j) {
            continue;
          }

          add$1(newMatrix, inverseMatrix, targetStartIndex, i, n, -target);
        }
      }

      return inverseMatrix;
    }
    function transpose$1(matrix, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = [];

      for (var i = 0; i < n; ++i) {
        for (var j = 0; j < n; ++j) {
          newMatrix[j * n + i] = matrix[n * i + j];
        }
      }

      return newMatrix;
    }
    function getRad$1(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getOrigin(matrix, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var originMatrix = [];
      var w = matrix[n * n - 1];

      for (var i = 0; i < n - 1; ++i) {
        originMatrix[i] = matrix[n * (n - 1) + i] / w;
      }

      originMatrix[n - 1] = 0;
      return originMatrix;
    }
    function fromTranslation$1(pos, n) {
      var newMatrix = createIdentityMatrix(n);

      for (var i = 0; i < n - 1; ++i) {
        newMatrix[n * (n - 1) + i] = pos[i] || 0;
      }

      return newMatrix;
    }
    function convertPositionMatrix(matrix, n) {
      var newMatrix = matrix.slice();

      for (var i = matrix.length; i < n - 1; ++i) {
        newMatrix[i] = 0;
      }

      newMatrix[n - 1] = 1;
      return newMatrix;
    }
    function convertDimension(matrix, n, m) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      } // n < m


      if (n === m) {
        return matrix;
      }

      var newMatrix = createIdentityMatrix(m);
      var length = Math.min(n, m);

      for (var i = 0; i < length - 1; ++i) {
        for (var j = 0; j < length - 1; ++j) {
          newMatrix[i * m + j] = matrix[i * n + j];
        }

        newMatrix[(i + 1) * m - 1] = matrix[(i + 1) * n - 1];
        newMatrix[(m - 1) * m + i] = matrix[(n - 1) * n + i];
      }

      newMatrix[m * m - 1] = matrix[n * n - 1];
      return newMatrix;
    }
    function multiplies(n) {
      var matrixes = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        matrixes[_i - 1] = arguments[_i];
      }

      var m = createIdentityMatrix(n);
      matrixes.forEach(function (matrix) {
        m = multiply$1(m, matrix, n);
      });
      return m;
    }
    function multiply$1(matrix, matrix2, n) {
      if (n === void 0) {
        n = Math.sqrt(matrix.length);
      }

      var newMatrix = []; // 1 y: n
      // 1 x: m
      // 2 x: m
      // 2 y: k
      // n * m X m * k

      var m = matrix.length / n;
      var k = matrix2.length / m;

      if (!m) {
        return matrix2;
      } else if (!k) {
        return matrix;
      }

      for (var i = 0; i < n; ++i) {
        for (var j = 0; j < k; ++j) {
          newMatrix[j * n + i] = 0;

          for (var l = 0; l < m; ++l) {
            // m1 x: m(l), y: n(i)
            // m2 x: k(j):  y: m(l)
            // nw x: n(i), y: k(j)
            newMatrix[j * n + i] += matrix[l * n + i] * matrix2[j * m + l];
          }
        }
      } // n * k


      return newMatrix;
    }
    function average() {
      var nums = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
      }

      var length = nums.length;
      var total = 0;

      for (var i = length - 1; i >= 0; --i) {
        total += nums[i];
      }

      return length ? total / length : 0;
    }
    function plus(pos1, pos2) {
      var length = Math.min(pos1.length, pos2.length);
      var nextPos = pos1.slice();

      for (var i = 0; i < length; ++i) {
        nextPos[i] = nextPos[i] + pos2[i];
      }

      return nextPos;
    }
    function minus(pos1, pos2) {
      var length = Math.min(pos1.length, pos2.length);
      var nextPos = pos1.slice();

      for (var i = 0; i < length; ++i) {
        nextPos[i] = nextPos[i] - pos2[i];
      }

      return nextPos;
    }
    function convertCSStoMatrix(a, is2d) {
      if (is2d === void 0) {
        is2d = a.length === 6;
      }

      if (is2d) {
        return [a[0], a[1], 0, a[2], a[3], 0, a[4], a[5], 1];
      }

      return a;
    }
    function convertMatrixtoCSS(a, is2d) {
      if (is2d === void 0) {
        is2d = a.length === 9;
      }

      if (is2d) {
        return [a[0], a[1], a[3], a[4], a[6], a[7]];
      }

      return a;
    }
    function caculate(matrix, matrix2, n) {
      if (n === void 0) {
        n = matrix2.length;
      }

      var result = multiply$1(matrix, matrix2, n);
      var k = result[n - 1];
      return result.map(function (v) {
        return v / k;
      });
    }
    function rotate$1(pos, rad) {
      return caculate(createRotateMatrix(rad, 3), convertPositionMatrix(pos, 3));
    }
    function createRotateMatrix(rad, n) {
      var cos = Math.cos(rad);
      var sin = Math.sin(rad);
      var m = createIdentityMatrix(n); // cos -sin
      // sin cos

      m[0] = cos;
      m[1] = sin;
      m[n] = -sin;
      m[n + 1] = cos;
      return m;
    }
    function createIdentityMatrix(n) {
      var length = n * n;
      var matrix = [];

      for (var i = 0; i < length; ++i) {
        matrix[i] = i % (n + 1) ? 0 : 1;
      }

      return matrix;
    }
    function createScaleMatrix(scale, n) {
      var m = createIdentityMatrix(n);
      var length = Math.min(scale.length, n - 1);

      for (var i = 0; i < length; ++i) {
        m[(n + 1) * i] = scale[i];
      }

      return m;
    }
    function createOriginMatrix(origin, n) {
      var m = createIdentityMatrix(n);
      var length = Math.min(origin.length, n - 1);

      for (var i = 0; i < length; ++i) {
        m[n * (n - 1) + i] = origin[i];
      }

      return m;
    }
    function createWarpMatrix(pos0, pos1, pos2, pos3, nextPos0, nextPos1, nextPos2, nextPos3) {
      var x0 = pos0[0],
          y0 = pos0[1];
      var x1 = pos1[0],
          y1 = pos1[1];
      var x2 = pos2[0],
          y2 = pos2[1];
      var x3 = pos3[0],
          y3 = pos3[1];
      var u0 = nextPos0[0],
          v0 = nextPos0[1];
      var u1 = nextPos1[0],
          v1 = nextPos1[1];
      var u2 = nextPos2[0],
          v2 = nextPos2[1];
      var u3 = nextPos3[0],
          v3 = nextPos3[1];
      var matrix = [x0, 0, x1, 0, x2, 0, x3, 0, y0, 0, y1, 0, y2, 0, y3, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, x0, 0, x1, 0, x2, 0, x3, 0, y0, 0, y1, 0, y2, 0, y3, 0, 1, 0, 1, 0, 1, 0, 1, -u0 * x0, -v0 * x0, -u1 * x1, -v1 * x1, -u2 * x2, -v2 * x2, -u3 * x3, -v3 * x3, -u0 * y0, -v0 * y0, -u1 * y1, -v1 * y1, -u2 * y2, -v2 * y2, -u3 * y3, -v3 * y3];
      var inverseMatrix = invert$1(matrix, 8);

      if (!inverseMatrix.length) {
        return [];
      }

      var h = multiply$1(inverseMatrix, [u0, v0, u1, v1, u2, v2, u3, v3], 8);
      h[8] = 1;
      return convertDimension(transpose$1(h), 3, 4);
    }

    function multiply2(pos1, pos2) {
      return [pos1[0] * pos2[0], pos1[1] * pos2[1]];
    }
    function prefix() {
      var classNames = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        classNames[_i] = arguments[_i];
      }

      return prefixNames.apply(void 0, __spreadArrays$1([PREFIX], classNames));
    }
    function getTransformMatrix(transform) {
      if (!transform || transform === "none") {
        return [1, 0, 0, 1, 0, 0];
      }

      if (isObject(transform)) {
        return transform;
      }

      var value = splitBracket(transform).value;
      return value.split(/s*,\s*/g).map(function (v) {
        return parseFloat(v);
      });
    }
    function getAbsoluteMatrix(matrix, n, origin) {
      return multiplies(n, createOriginMatrix(origin, n), matrix, createOriginMatrix(origin.map(function (a) {
        return -a;
      }), n));
    }
    function measureSVGSize(el, unit, isHorizontal) {
      if (unit === "%") {
        var viewBox = getSVGViewBox(el.ownerSVGElement);
        return viewBox[isHorizontal ? "width" : "height"] / 100;
      }

      return 1;
    }
    function getBeforeTransformOrigin(el) {
      var relativeOrigin = getTransformOrigin(getComputedStyle$1(el, ":before"));
      return relativeOrigin.map(function (o, i) {
        var _a = splitUnit(o),
            value = _a.value,
            unit = _a.unit;

        return value * measureSVGSize(el, unit, i === 0);
      });
    }
    function getTransformOrigin(style) {
      var transformOrigin = style.transformOrigin;
      return transformOrigin ? transformOrigin.split(" ") : ["0", "0"];
    }
    function getOffsetInfo(el, lastParent, isParent) {
      var body = document.body;
      var target = !el || isParent ? el : el.parentElement;
      var isEnd = false;
      var position = "relative";

      while (target && target !== body) {
        if (lastParent === target) {
          isEnd = true;
        }

        var style = getComputedStyle$1(target);
        var transform = style.transform;
        position = style.position;

        if (position !== "static" || transform && transform !== "none") {
          break;
        }

        target = target.parentElement;
        position = "relative";
      }

      return {
        isStatic: position === "static",
        isEnd: isEnd || !target || target === body,
        offsetParent: target || body
      };
    }
    function getOffsetPosInfo(el, container, style, isFixed) {
      var _a;

      var tagName = el.tagName.toLowerCase();
      var offsetLeft = el.offsetLeft;
      var offsetTop = el.offsetTop;

      if (isFixed) {
        var containerClientRect = (container || document.documentElement).getBoundingClientRect();
        offsetLeft -= containerClientRect.left;
        offsetTop -= containerClientRect.top;
      } // svg


      var isSVG = isUndefined$2(offsetLeft);
      var hasOffset = !isSVG;
      var origin;
      var targetOrigin; // inner svg element

      if (!hasOffset && tagName !== "svg") {
        origin = IS_WEBKIT ? getBeforeTransformOrigin(el) : getTransformOrigin(style).map(function (pos) {
          return parseFloat(pos);
        });
        targetOrigin = origin.slice();
        hasOffset = true;

        if (tagName === "g") {
          offsetLeft = 0;
          offsetTop = 0;
        } else {
          _a = getSVGGraphicsOffset(el, origin), offsetLeft = _a[0], offsetTop = _a[1], origin[0] = _a[2], origin[1] = _a[3];
        }
      } else {
        origin = getTransformOrigin(style).map(function (pos) {
          return parseFloat(pos);
        });
        targetOrigin = origin.slice();
      }

      return {
        isSVG: isSVG,
        hasOffset: hasOffset,
        offset: [offsetLeft, offsetTop],
        origin: origin,
        targetOrigin: targetOrigin
      };
    }
    function getMatrixStackInfo(target, container, prevMatrix) {
      var el = target;
      var matrixes = [];
      var isEnd = false;
      var is3d = false;
      var n = 3;
      var transformOrigin;
      var targetTransformOrigin;
      var targetMatrix;
      var offsetContainer = getOffsetInfo(container, container, true).offsetParent;

      if (prevMatrix) {
        isEnd = target === container;

        if (prevMatrix.length > 10) {
          is3d = true;
          n = 4;
        }

        container = target.parentElement;
      }

      while (el && !isEnd) {
        var style = getComputedStyle$1(el);
        var tagName = el.tagName.toLowerCase();
        var position = style.position;
        var isFixed = position === "fixed";
        var matrix = convertCSStoMatrix(getTransformMatrix(style.transform)); // convert 3 to 4

        var length = matrix.length;

        if (!is3d && length === 16) {
          is3d = true;
          n = 4;
          var matrixesLength = matrixes.length;

          for (var i = 0; i < matrixesLength; ++i) {
            matrixes[i] = convertDimension(matrixes[i], 3, 4);
          }
        }

        if (is3d && length === 9) {
          matrix = convertDimension(matrix, 3, 4);
        }

        var _a = getOffsetPosInfo(el, container, style, isFixed),
            hasOffset = _a.hasOffset,
            isSVG = _a.isSVG,
            origin = _a.origin,
            targetOrigin = _a.targetOrigin,
            offsetPos = _a.offset;

        var offsetLeft = offsetPos[0],
            offsetTop = offsetPos[1];

        if (tagName === "svg" && targetMatrix) {
          matrixes.push( // scale matrix for svg's SVGElements.
          getSVGMatrix(el, n), createIdentityMatrix(n));
        }

        var _b = getOffsetInfo(el, container),
            offsetParent = _b.offsetParent,
            isOffsetEnd = _b.isEnd,
            isStatic = _b.isStatic;

        if (IS_WEBKIT && hasOffset && !isSVG && isStatic && (position === "relative" || position === "static")) {
          offsetLeft -= offsetParent.offsetLeft;
          offsetTop -= offsetParent.offsetTop;
          isEnd = isEnd || isOffsetEnd;
        }

        var parentClientLeft = 0;
        var parentClientTop = 0;

        if (hasOffset && offsetContainer !== offsetParent) {
          // border
          parentClientLeft = offsetParent.clientLeft;
          parentClientTop = offsetParent.clientTop;
        }

        matrixes.push( // absolute matrix
        getAbsoluteMatrix(matrix, n, origin), // offset matrix (offsetPos + clientPos(border))
        createOriginMatrix(hasOffset ? [offsetLeft - el.scrollLeft + parentClientLeft, offsetTop - el.scrollTop + parentClientTop] : [el, origin], n));

        if (!targetMatrix) {
          targetMatrix = matrix;
        }

        if (!transformOrigin) {
          transformOrigin = origin;
        }

        if (!targetTransformOrigin) {
          targetTransformOrigin = targetOrigin;
        }

        if (isEnd || isFixed) {
          break;
        } else {
          el = offsetParent;
          isEnd = isOffsetEnd;
        }
      }

      if (!targetMatrix) {
        targetMatrix = createIdentityMatrix(n);
      }

      if (!transformOrigin) {
        transformOrigin = [0, 0];
      }

      if (!targetTransformOrigin) {
        targetTransformOrigin = [0, 0];
      }

      return {
        offsetContainer: offsetContainer,
        matrixes: matrixes,
        targetMatrix: targetMatrix,
        transformOrigin: transformOrigin,
        targetOrigin: targetTransformOrigin,
        is3d: is3d
      };
    }
    function cacaulateElementInfo(target, container, rootContainer, isAbsolute3d, state) {
      var _a;

      if (rootContainer === void 0) {
        rootContainer = container;
      }

      var prevMatrix = state ? state.beforeMatrix : undefined;
      var prevRootMatrix = state ? state.rootMatrix : undefined;
      var prevN = state ? state.is3d ? 4 : 3 : undefined;
      var width = 0;
      var height = 0;
      var rotation = 0;
      var allResult = {};

      if (state) {
        width = state.width;
        height = state.height;
      } else if (target) {
        var style = getComputedStyle$1(target);
        width = target.offsetWidth;
        height = target.offsetHeight;

        if (isUndefined$2(width)) {
          _a = getSize(target, style, true), width = _a[0], height = _a[1];
        }
      }

      if (target) {
        var result = caculateMatrixStack(target, container, rootContainer, isAbsolute3d, prevMatrix, prevRootMatrix, prevN);
        var position = caculateMoveablePosition(result.allMatrix, result.transformOrigin, width, height);
        allResult = __assign$4(__assign$4({}, result), position);
        rotation = getRotationRad([position.pos1, position.pos2], position.direction);
      }

      var n = isAbsolute3d ? 4 : 3;
      return __assign$4({
        width: width,
        height: height,
        rotation: rotation,
        // rootMatrix: number[];
        // beforeMatrix: number[];
        // offsetMatrix: number[];
        // allMatrix: number[];
        // targetMatrix: number[];
        // targetTransform: string;
        // transformOrigin: number[];
        // targetOrigin: number[];
        // is3d: boolean;
        rootMatrix: createIdentityMatrix(n),
        beforeMatrix: createIdentityMatrix(n),
        offsetMatrix: createIdentityMatrix(n),
        allMatrix: createIdentityMatrix(n),
        targetMatrix: createIdentityMatrix(n),
        targetTransform: "",
        transformOrigin: [0, 0],
        targetOrigin: [0, 0],
        is3d: !!isAbsolute3d,
        // left: number;
        // top: number;
        // right: number;
        // bottom: number;
        // origin: number[];
        // pos1: number[];
        // pos2: number[];
        // pos3: number[];
        // pos4: number[];
        // direction: 1 | -1;
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        origin: [0, 0],
        pos1: [0, 0],
        pos2: [0, 0],
        pos3: [0, 0],
        pos4: [0, 0],
        direction: 1
      }, allResult);
    }
    function getElementInfo(target, container, rootContainer) {
      if (rootContainer === void 0) {
        rootContainer = container;
      }

      return cacaulateElementInfo(target, container, rootContainer, true);
    }
    function caculateMatrixStack(target, container, rootContainer, isAbsolute3d, prevMatrix, prevRootMatrix, prevN) {
      if (rootContainer === void 0) {
        rootContainer = container;
      }

      var _a = getMatrixStackInfo(target, container, prevMatrix),
          matrixes = _a.matrixes,
          is3d = _a.is3d,
          prevTargetMatrix = _a.targetMatrix,
          transformOrigin = _a.transformOrigin,
          targetOrigin = _a.targetOrigin,
          offsetContainer = _a.offsetContainer;

      var _b = getMatrixStackInfo(offsetContainer, rootContainer, prevRootMatrix),
          rootMatrixes = _b.matrixes,
          isRoot3d = _b.is3d;

      var isNext3d = isAbsolute3d || isRoot3d || is3d;
      var n = isNext3d ? 4 : 3;
      var isSVGGraphicElement = target.tagName.toLowerCase() !== "svg" && "ownerSVGElement" in target;
      var originalContainer = container || document.body;
      var allMatrix = prevMatrix ? convertDimension(prevMatrix, prevN, n) : createIdentityMatrix(n);
      var targetMatrix = prevTargetMatrix;
      var rootMatrix = prevRootMatrix ? convertDimension(prevRootMatrix, prevN, n) : createIdentityMatrix(n);
      var beforeMatrix = prevMatrix ? convertDimension(prevMatrix, prevN, n) : createIdentityMatrix(n);
      var offsetMatrix = createIdentityMatrix(n);
      var length = matrixes.length;
      var endContainer = getOffsetInfo(originalContainer, originalContainer, true).offsetParent;
      rootMatrixes.reverse();
      matrixes.reverse();

      if (!is3d && isNext3d) {
        targetMatrix = convertDimension(targetMatrix, 3, 4);
        matrixes.forEach(function (matrix, i) {
          matrixes[i] = convertDimension(matrix, 3, 4);
        });
      }

      if (!isRoot3d && isNext3d) {
        rootMatrixes.forEach(function (matrix, i) {
          rootMatrixes[i] = convertDimension(matrix, 3, 4);
        });
      } // rootMatrix = (...) -> container -> offset -> absolute -> offset -> absolute(targetMatrix)
      // beforeMatrix = (... -> container -> offset -> absolute) -> offset -> absolute(targetMatrix)
      // offsetMatrix = (... -> container -> offset -> absolute -> offset) -> absolute(targetMatrix)


      if (!prevRootMatrix) {
        rootMatrixes.forEach(function (matrix) {
          rootMatrix = multiply$1(rootMatrix, matrix, n);
        });
      }

      matrixes.forEach(function (matrix, i) {
        var _a;

        if (length - 2 === i) {
          // length - 3
          beforeMatrix = allMatrix.slice();
        }

        if (length - 1 === i) {
          // length - 2
          offsetMatrix = allMatrix.slice();
        } // caculate for SVGElement


        if (isObject(matrix[n * (n - 1)])) {
          _a = getSVGOffset(matrix[n * (n - 1)], endContainer, n, matrix[n * (n - 1) + 1], allMatrix, matrixes[i + 1]), matrix[n * (n - 1)] = _a[0], matrix[n * (n - 1) + 1] = _a[1];
        }

        allMatrix = multiply$1(allMatrix, matrix, n);
      });
      var isMatrix3d = !isSVGGraphicElement && is3d;

      if (!targetMatrix) {
        targetMatrix = createIdentityMatrix(isMatrix3d ? 4 : 3);
      }

      var targetTransform = makeMatrixCSS(isSVGGraphicElement && targetMatrix.length === 16 ? convertDimension(targetMatrix, 4, 3) : targetMatrix, isMatrix3d);
      rootMatrix = ignoreDimension(rootMatrix, n, n);
      return {
        rootMatrix: rootMatrix,
        beforeMatrix: beforeMatrix,
        offsetMatrix: offsetMatrix,
        allMatrix: allMatrix,
        targetMatrix: targetMatrix,
        targetTransform: targetTransform,
        transformOrigin: transformOrigin,
        targetOrigin: targetOrigin,
        is3d: isNext3d
      };
    }
    function makeMatrixCSS(matrix, is3d) {
      if (is3d === void 0) {
        is3d = matrix.length > 9;
      }

      return (is3d ? "matrix3d" : "matrix") + "(" + convertMatrixtoCSS(matrix, !is3d).join(",") + ")";
    }
    function getSVGViewBox(el) {
      var clientWidth = el.clientWidth;
      var clientHeight = el.clientHeight;
      var viewBox = el.viewBox;
      var baseVal = viewBox && viewBox.baseVal || {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
      return {
        x: baseVal.x,
        y: baseVal.y,
        width: baseVal.width || clientWidth,
        height: baseVal.height || clientHeight
      };
    }
    function getSVGMatrix(el, n) {
      var clientWidth = el.clientWidth;
      var clientHeight = el.clientHeight;

      var _a = getSVGViewBox(el),
          viewBoxWidth = _a.width,
          viewBoxHeight = _a.height;

      var scaleX = clientWidth / viewBoxWidth;
      var scaleY = clientHeight / viewBoxHeight;
      var preserveAspectRatio = el.preserveAspectRatio.baseVal; // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio

      var align = preserveAspectRatio.align; // 1 : meet 2: slice

      var meetOrSlice = preserveAspectRatio.meetOrSlice;
      var svgOrigin = [0, 0];
      var scale = [scaleX, scaleY];
      var translate = [0, 0];

      if (align !== 1) {
        var xAlign = (align - 2) % 3;
        var yAlign = Math.floor((align - 2) / 3);
        svgOrigin[0] = viewBoxWidth * xAlign / 2;
        svgOrigin[1] = viewBoxHeight * yAlign / 2;
        var scaleDimension = meetOrSlice === 2 ? Math.max(scaleY, scaleX) : Math.min(scaleX, scaleY);
        scale[0] = scaleDimension;
        scale[1] = scaleDimension;
        translate[0] = (clientWidth - viewBoxWidth) / 2 * xAlign;
        translate[1] = (clientHeight - viewBoxHeight) / 2 * yAlign;
      }

      var scaleMatrix = createScaleMatrix(scale, n);
      scaleMatrix[n * (n - 1)] = translate[0], scaleMatrix[n * (n - 1) + 1] = translate[1];
      return getAbsoluteMatrix(scaleMatrix, n, svgOrigin);
    }
    function getSVGGraphicsOffset(el, origin) {
      if (!el.getBBox) {
        return [0, 0];
      }

      var bbox = el.getBBox();
      var viewBox = getSVGViewBox(el.ownerSVGElement);
      var left = bbox.x - viewBox.x;
      var top = bbox.y - viewBox.y;
      return [left, top, origin[0] - left, origin[1] - top];
    }
    function caculatePosition(matrix, pos, n) {
      return caculate(matrix, convertPositionMatrix(pos, n), n);
    }
    function caculatePoses(matrix, width, height, n) {
      return [[0, 0], [width, 0], [0, height], [width, height]].map(function (pos) {
        return caculatePosition(matrix, pos, n);
      });
    }
    function getRect(poses) {
      var posesX = poses.map(function (pos) {
        return pos[0];
      });
      var posesY = poses.map(function (pos) {
        return pos[1];
      });
      var left = Math.min.apply(Math, posesX);
      var top = Math.min.apply(Math, posesY);
      var right = Math.max.apply(Math, posesX);
      var bottom = Math.max.apply(Math, posesY);
      var rectWidth = right - left;
      var rectHeight = bottom - top;
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        width: rectWidth,
        height: rectHeight
      };
    }
    function caculateRect(matrix, width, height, n) {
      var poses = caculatePoses(matrix, width, height, n);
      return getRect(poses);
    }
    function getSVGOffset(el, container, n, origin, beforeMatrix, absoluteMatrix) {
      var _a;

      var _b = getSize(el, undefined, true),
          width = _b[0],
          height = _b[1];

      var containerClientRect = container.getBoundingClientRect();
      var rect = el.getBoundingClientRect();
      var rectLeft = rect.left - containerClientRect.left + container.scrollLeft - (container.clientLeft || 0);
      var rectTop = rect.top - containerClientRect.top + container.scrollTop - (container.clientTop || 0);
      var rectWidth = rect.width;
      var rectHeight = rect.height;
      var mat = multiplies(n, beforeMatrix, absoluteMatrix);

      var _c = caculateRect(mat, width, height, n),
          prevLeft = _c.left,
          prevTop = _c.top,
          prevWidth = _c.width,
          prevHeight = _c.height;

      var posOrigin = caculatePosition(mat, origin, n);
      var prevOrigin = minus(posOrigin, [prevLeft, prevTop]);
      var rectOrigin = [rectLeft + prevOrigin[0] * rectWidth / prevWidth, rectTop + prevOrigin[1] * rectHeight / prevHeight];
      var offset = [0, 0];
      var count = 0;

      while (++count < 10) {
        var inverseBeforeMatrix = invert$1(beforeMatrix, n);
        _a = minus(caculatePosition(inverseBeforeMatrix, rectOrigin, n), caculatePosition(inverseBeforeMatrix, posOrigin, n)), offset[0] = _a[0], offset[1] = _a[1];
        var mat2 = multiplies(n, beforeMatrix, createOriginMatrix(offset, n), absoluteMatrix);

        var _d = caculateRect(mat2, width, height, n),
            nextLeft = _d.left,
            nextTop = _d.top;

        var distLeft = nextLeft - rectLeft;
        var distTop = nextTop - rectTop;

        if (Math.abs(distLeft) < 2 && Math.abs(distTop) < 2) {
          break;
        }

        rectOrigin[0] -= distLeft;
        rectOrigin[1] -= distTop;
      }

      return offset.map(function (p) {
        return Math.round(p);
      });
    }
    function caculateMoveablePosition(matrix, origin, width, height) {
      var is3d = matrix.length === 16;
      var n = is3d ? 4 : 3;

      var _a = caculatePoses(matrix, width, height, n),
          _b = _a[0],
          x1 = _b[0],
          y1 = _b[1],
          _c = _a[1],
          x2 = _c[0],
          y2 = _c[1],
          _d = _a[2],
          x3 = _d[0],
          y3 = _d[1],
          _e = _a[3],
          x4 = _e[0],
          y4 = _e[1];

      var _f = caculatePosition(matrix, origin, n),
          originX = _f[0],
          originY = _f[1];

      var left = Math.min(x1, x2, x3, x4);
      var top = Math.min(y1, y2, y3, y4);
      var right = Math.max(x1, x2, x3, x4);
      var bottom = Math.max(y1, y2, y3, y4);
      x1 = x1 - left || 0;
      x2 = x2 - left || 0;
      x3 = x3 - left || 0;
      x4 = x4 - left || 0;
      y1 = y1 - top || 0;
      y2 = y2 - top || 0;
      y3 = y3 - top || 0;
      y4 = y4 - top || 0;
      originX = originX - left || 0;
      originY = originY - top || 0;
      var center = [(x1 + x2 + x3 + x4) / 4, (y1 + y2 + y3 + y4) / 4];
      var pos1Rad = getRad$1(center, [x1, y1]);
      var pos2Rad = getRad$1(center, [x2, y2]);
      var direction = pos1Rad < pos2Rad && pos2Rad - pos1Rad < Math.PI || pos1Rad > pos2Rad && pos2Rad - pos1Rad < -Math.PI ? 1 : -1;
      return {
        left: left,
        top: top,
        right: right,
        bottom: bottom,
        origin: [originX, originY],
        pos1: [x1, y1],
        pos2: [x2, y2],
        pos3: [x3, y3],
        pos4: [x4, y4],
        direction: direction
      };
    }
    function getDistSize(vec) {
      return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
    }
    function getDiagonalSize(pos1, pos2) {
      return getDistSize([pos2[0] - pos1[0], pos2[1] - pos1[1]]);
    }
    function getLineStyle(pos1, pos2, rad) {
      if (rad === void 0) {
        rad = getRad$1(pos1, pos2);
      }

      var width = getDiagonalSize(pos1, pos2);
      return {
        transform: "translateY(-50%) translate(" + pos1[0] + "px, " + pos1[1] + "px) rotate(" + rad + "rad)",
        width: width + "px"
      };
    }
    function getControlTransform(rotation) {
      var poses = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        poses[_i - 1] = arguments[_i];
      }

      var length = poses.length;
      var x = poses.reduce(function (prev, pos) {
        return prev + pos[0];
      }, 0) / length;
      var y = poses.reduce(function (prev, pos) {
        return prev + pos[1];
      }, 0) / length;
      return {
        transform: "translate(" + x + "px, " + y + "px) rotate(" + rotation + "rad)"
      };
    }
    function getCSSSize(target) {
      var style = window.getComputedStyle(target);
      return [parseFloat(style.width), parseFloat(style.height)];
    }
    function getSize(target, style, isOffset, isBoxSizing) {
      if (style === void 0) {
        style = window.getComputedStyle(target);
      }

      if (isBoxSizing === void 0) {
        isBoxSizing = isOffset || style.boxSizing === "border-box";
      }

      var width = target.offsetWidth;
      var height = target.offsetHeight;
      var hasOffset = !isUndefined$2(width);

      if ((isOffset || isBoxSizing) && hasOffset) {
        return [width, height];
      }

      if (!hasOffset && target.tagName.toLowerCase() !== "svg") {
        var bbox = target.getBBox();
        return [bbox.width, bbox.height];
      }

      width = target.clientWidth;
      height = target.clientHeight;

      if (isOffset || isBoxSizing) {
        var borderLeft = parseFloat(style.borderLeftWidth) || 0;
        var borderRight = parseFloat(style.borderRightWidth) || 0;
        var borderTop = parseFloat(style.borderTopWidth) || 0;
        var borderBottom = parseFloat(style.borderBottomWidth) || 0;
        return [width + borderLeft + borderRight, height + borderTop + borderBottom];
      } else {
        var paddingLeft = parseFloat(style.paddingLeft) || 0;
        var paddingRight = parseFloat(style.paddingRight) || 0;
        var paddingTop = parseFloat(style.paddingTop) || 0;
        var paddingBottom = parseFloat(style.paddingBottom) || 0;
        return [width - paddingLeft - paddingRight, height - paddingTop - paddingBottom];
      }
    }
    function getRotationRad(poses, direction) {
      return getRad$1(direction > 0 ? poses[0] : poses[1], direction > 0 ? poses[1] : poses[0]);
    }
    function getTargetInfo(moveableElement, target, container, parentContainer, rootContainer, state) {
      var beforeDirection = 1;
      var beforeOrigin = [0, 0];
      var targetClientRect = resetClientRect();
      var containerClientRect = resetClientRect();
      var moveableClientRect = resetClientRect();
      var result = cacaulateElementInfo(target, container, rootContainer, false, state);

      if (target) {
        var n = result.is3d ? 4 : 3;
        var beforePosition = caculateMoveablePosition(result.offsetMatrix, plus(result.transformOrigin, getOrigin(result.targetMatrix, n)), result.width, result.height);
        beforeDirection = beforePosition.direction;
        beforeOrigin = plus(beforePosition.origin, [beforePosition.left - result.left, beforePosition.top - result.top]);
        targetClientRect = getClientRect(target);
        containerClientRect = getClientRect(getOffsetInfo(parentContainer, parentContainer, true).offsetParent || document.body, true);

        if (moveableElement) {
          moveableClientRect = getClientRect(moveableElement);
        }
      }

      return __assign$4({
        targetClientRect: targetClientRect,
        containerClientRect: containerClientRect,
        moveableClientRect: moveableClientRect,
        beforeDirection: beforeDirection,
        beforeOrigin: beforeOrigin,
        target: target
      }, result);
    }
    function resetClientRect() {
      return {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0,
        clientLeft: 0,
        clientTop: 0,
        clientWidth: 0,
        clientHeight: 0,
        scrollWidth: 0,
        scrollHeight: 0
      };
    }
    function getClientRect(el, isExtends) {
      var _a = el.getBoundingClientRect(),
          left = _a.left,
          width = _a.width,
          top = _a.top,
          bottom = _a.bottom,
          right = _a.right,
          height = _a.height;

      var rect = {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        width: width,
        height: height
      };

      if (isExtends) {
        rect.clientLeft = el.clientLeft;
        rect.clientTop = el.clientTop;
        rect.clientWidth = el.clientWidth;
        rect.clientHeight = el.clientHeight;
        rect.scrollWidth = el.scrollWidth;
        rect.scrollHeight = el.scrollHeight;
      }

      return rect;
    }
    function getDirection(target) {
      if (!target) {
        return;
      }

      var direciton = target.getAttribute("data-direction");

      if (!direciton) {
        return;
      }

      var dir = [0, 0];
      direciton.indexOf("w") > -1 && (dir[0] = -1);
      direciton.indexOf("e") > -1 && (dir[0] = 1);
      direciton.indexOf("n") > -1 && (dir[1] = -1);
      direciton.indexOf("s") > -1 && (dir[1] = 1);
      return dir;
    }
    function getAbsolutePoses(poses, dist) {
      return [plus(dist, poses[0]), plus(dist, poses[1]), plus(dist, poses[2]), plus(dist, poses[3])];
    }
    function getAbsolutePosesByState(_a) {
      var left = _a.left,
          top = _a.top,
          pos1 = _a.pos1,
          pos2 = _a.pos2,
          pos3 = _a.pos3,
          pos4 = _a.pos4;
      return getAbsolutePoses([pos1, pos2, pos3, pos4], [left, top]);
    }
    function roundSign(num) {
      return Math.round(num % 1 === -0.5 ? num - 1 : num);
    }
    function throttle(num, unit) {
      if (!unit) {
        return num;
      }

      return Math.round(num / unit) * unit;
    }
    function throttleArray(nums, unit) {
      nums.forEach(function (_, i) {
        nums[i] = throttle(nums[i], unit);
      });
      return nums;
    }
    function unset(self, name) {
      if (self[name]) {
        self[name].unset();
        self[name] = null;
      }
    }
    function getOrientationDirection(pos, pos1, pos2) {
      return (pos[0] - pos1[0]) * (pos2[1] - pos1[1]) - (pos[1] - pos1[1]) * (pos2[0] - pos1[0]);
    }
    function isInside(pos, pos1, pos2, pos3, pos4) {
      var k1 = getOrientationDirection(pos, pos1, pos2);
      var k2 = getOrientationDirection(pos, pos2, pos3);
      var k3 = getOrientationDirection(pos, pos3, pos1);
      var k4 = getOrientationDirection(pos, pos2, pos3);
      var k5 = getOrientationDirection(pos, pos3, pos4);
      var k6 = getOrientationDirection(pos, pos4, pos2);
      var signs1 = [k1, k2, k3];
      var signs2 = [k4, k5, k6];

      if (signs1.every(function (sign) {
        return sign >= 0;
      }) || signs1.every(function (sign) {
        return sign <= 0;
      }) || signs2.every(function (sign) {
        return sign >= 0;
      }) || signs2.every(function (sign) {
        return sign <= 0;
      })) {
        return true;
      }

      return false;
    }
    function fillParams(moveable, e, params) {
      var datas = e.datas;

      if (!datas.datas) {
        datas.datas = {};
      }

      var nextParams = __assign$4(__assign$4({}, params), {
        target: moveable.state.target,
        clientX: e.clientX,
        clientY: e.clientY,
        inputEvent: e.inputEvent,
        currentTarget: moveable,
        datas: datas.datas
      });

      if (datas.isStartEvent) {
        datas.lastEvent = nextParams;
      } else {
        datas.isStartEvent = true;
      }

      return nextParams;
    }
    function fillEndParams(moveable, e, params) {
      var datas = e.datas;
      var isDrag = "isDrag" in params ? params.isDrag : e.isDrag;

      if (!datas.datas) {
        datas.datas = {};
      }

      return __assign$4(__assign$4({
        isDrag: isDrag
      }, params), {
        target: moveable.state.target,
        clientX: e.clientX,
        clientY: e.clientY,
        inputEvent: e.inputEvent,
        currentTarget: moveable,
        lastEvent: datas.lastEvent,
        isDouble: e.isDouble,
        datas: datas.datas
      });
    }
    function triggerEvent(moveable, name, params, isManager) {
      return moveable.triggerEvent(name, params, isManager);
    }
    function getComputedStyle$1(el, pseudoElt) {
      return window.getComputedStyle(el, pseudoElt);
    }
    function filterAbles(ables, methods, triggerAblesSimultaneously) {
      var enabledAbles = {};
      var ableGroups = {};
      return ables.filter(function (able) {
        var name = able.name;

        if (enabledAbles[name] || !methods.some(function (method) {
          return able[method];
        })) {
          return false;
        }

        if (!triggerAblesSimultaneously && able.ableGroup) {
          if (ableGroups[able.ableGroup]) {
            return false;
          }

          ableGroups[able.ableGroup] = true;
        }

        enabledAbles[name] = true;
        return true;
      });
    }
    function getKeepRatioHeight(width, isWidth, ratio) {
      return width * (isWidth ? ratio : 1 / ratio);
    }
    function getKeepRatioWidth(height, isWidth, ratio) {
      return height * (isWidth ? 1 / ratio : ratio);
    }
    function equals$1(a1, a2) {
      return a1 === a2 || a1 == null && a2 == null;
    }
    function selectValue() {
      var values = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }

      var length = values.length - 1;

      for (var i = 0; i < length; ++i) {
        var value = values[i];

        if (!isUndefined$2(value)) {
          return value;
        }
      }

      return values[length];
    }
    function groupBy(arr, func) {
      var groups = [];
      var groupKeys = [];
      arr.forEach(function (el, index) {
        var groupKey = func(el, index, arr);
        var keyIndex = groupKeys.indexOf(groupKey);
        var group = groups[keyIndex] || [];

        if (keyIndex === -1) {
          groupKeys.push(groupKey);
          groups.push(group);
        }

        group.push(el);
      });
      return groups;
    }
    function groupByMap(arr, func) {
      var groups = [];
      var groupKeys = {};
      arr.forEach(function (el, index) {
        var groupKey = func(el, index, arr);
        var group = groupKeys[groupKey];

        if (!group) {
          group = [];
          groupKeys[groupKey] = group;
          groups.push(group);
        }

        group.push(el);
      });
      return groups;
    }
    function flat$1(arr) {
      return arr.reduce(function (prev, cur) {
        return prev.concat(cur);
      }, []);
    }
    function maxOffset() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      args.sort(function (a, b) {
        return Math.abs(b) - Math.abs(a);
      });
      return args[0];
    }
    function minOffset() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      args.sort(function (a, b) {
        return Math.abs(a) - Math.abs(b);
      });
      return args[0];
    }
    function caculateInversePosition(matrix, pos, n) {
      return caculate(invert$1(matrix, n), convertPositionMatrix(pos, n), n);
    }
    function convertDragDist(state, e) {
      var _a;

      var is3d = state.is3d,
          rootMatrix = state.rootMatrix;
      var n = is3d ? 4 : 3;
      _a = caculateInversePosition(rootMatrix, [e.distX, e.distY], n), e.distX = _a[0], e.distY = _a[1];
      return e;
    }
    function caculatePadding(matrix, pos, transformOrigin, origin, n) {
      return minus(caculatePosition(matrix, plus(transformOrigin, pos), n), origin);
    }
    function checkSize(targetSize, compareSize, isMax) {
      return [[compareSize[0], compareSize[0] * targetSize[1] / targetSize[0]], [compareSize[1] * targetSize[0] / targetSize[1], compareSize[1]]].filter(function (size) {
        return size.every(function (value, i) {
          return isMax ? value <= compareSize[i] : value >= compareSize[i];
        });
      })[0] || targetSize;
    }
    function caculateBoundSize(size, minSize, maxSize, keepRatio) {
      if (!keepRatio) {
        return size.map(function (value, i) {
          return between(value, minSize[i], maxSize[i]);
        });
      }

      var width = size[0],
          height = size[1]; // width : height = minWidth : minHeight;

      var _a = checkSize(size, minSize, false),
          minWidth = _a[0],
          minHeight = _a[1];

      var _b = checkSize(size, maxSize, true),
          maxWidth = _b[0],
          maxHeight = _b[1];

      if (width < minWidth || height < minHeight) {
        width = minWidth;
        height = minHeight;
      } else if (width > maxWidth || height > maxHeight) {
        width = maxWidth;
        height = maxHeight;
      }

      return [width, height];
    }
    function convertCSSSize(value, size, isRelative) {
      return isRelative ? value / size * 100 + "%" : value + "px";
    }
    function moveControlPos(controlPoses, index, dist, isRect) {
      var _a = controlPoses[index],
          direction = _a.direction,
          sub = _a.sub;
      var dists = controlPoses.map(function () {
        return [0, 0];
      });
      var directions = direction ? direction.split("") : [];

      if (isRect && index < 8) {
        var verticalDirection_1 = directions.filter(function (dir) {
          return dir === "w" || dir === "e";
        })[0];
        var horizontalDirection_1 = directions.filter(function (dir) {
          return dir === "n" || dir === "s";
        })[0];
        dists[index] = dist;
        controlPoses.forEach(function (controlPose, i) {
          var controlDir = controlPose.direction;

          if (!controlDir) {
            return;
          }

          if (controlDir.indexOf(verticalDirection_1) > -1) {
            dists[i][0] = dist[0];
          }

          if (controlDir.indexOf(horizontalDirection_1) > -1) {
            dists[i][1] = dist[1];
          }
        });

        if (verticalDirection_1) {
          dists[1][0] = dist[0] / 2;
          dists[5][0] = dist[0] / 2;
        }

        if (horizontalDirection_1) {
          dists[3][1] = dist[1] / 2;
          dists[7][1] = dist[1] / 2;
        }
      } else if (direction && !sub) {
        directions.forEach(function (dir) {
          var isVertical = dir === "n" || dir === "s";
          controlPoses.forEach(function (controlPose, i) {
            var dirDir = controlPose.direction,
                dirHorizontal = controlPose.horizontal,
                dirVertical = controlPose.vertical;

            if (!dirDir || dirDir.indexOf(dir) === -1) {
              return;
            }

            dists[i] = [isVertical || !dirHorizontal ? 0 : dist[0], !isVertical || !dirVertical ? 0 : dist[1]];
          });
        });
      } else {
        dists[index] = dist;
      }

      return dists;
    }
    function getTinyDist(v) {
      return Math.abs(v) <= TINY_NUM ? 0 : v;
    }
    function directionCondition(e) {
      if (e.isRequest) {
        if (e.requestAble === "resizable" || e.requestAble === "scalable") {
          return e.parentDirection;
        } else {
          return false;
        }
      }

      return hasClass(e.inputEvent.target, prefix("direction"));
    }
    function invertObject(obj) {
      var nextObj = {};

      for (var name in obj) {
        nextObj[obj[name]] = name;
      }

      return nextObj;
    }
    function getTransform(transforms, index) {
      var beforeFunctionTexts = transforms.slice(0, index < 0 ? undefined : index);
      var targetFunctionText = transforms[index] || "";
      var afterFunctionTexts = index < 0 ? [] : transforms.slice(index);
      var beforeFunctions = parse(beforeFunctionTexts);
      var targetFunctions = parse([targetFunctionText]);
      var afterFunctions = parse(afterFunctionTexts);
      return {
        transforms: transforms,
        beforeFunctionMatrix: toMat(beforeFunctions),
        targetFunctionMatrix: toMat(targetFunctions),
        afterFunctionMatrix: toMat(afterFunctions),
        beforeFunctions: beforeFunctions,
        targetFunction: targetFunctions[0],
        afterFunctions: afterFunctions,
        beforeFunctionTexts: beforeFunctionTexts,
        targetFunctionText: targetFunctionText,
        afterFunctionTexts: afterFunctionTexts
      };
    }
    function isArrayFormat(arr) {
      if (!arr || !isObject(arr)) {
        return false;
      }

      return isArray$1(arr) || "length" in arr;
    }
    function getRefTargets(targets) {
      if (!targets) {
        return [];
      }

      var userTargets = isArrayFormat(targets) ? [].slice.call(targets) : [targets];
      return userTargets.map(function (target) {
        if (!target) {
          return null;
        }

        if (isString$1(target)) {
          return target;
        }

        if ("current" in target) {
          return target.current;
        }

        return target;
      });
    }
    function getElementTargets(targets, selectorMap) {
      var elementTargets = [];
      targets.forEach(function (target) {
        if (!target) {
          return;
        }

        if (isString$1(target)) {
          if (selectorMap[target]) {
            elementTargets.push.apply(elementTargets, selectorMap[target]);
          }

          return;
        }

        elementTargets.push(target);
      });
      return elementTargets;
    }
    function between(value, min, max) {
      return Math.max(min, Math.min(value, max));
    }

    /**
     * @namespace Moveable.Pinchable
     * @description Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
     */

    var Pinchable = {
      name: "pinchable",
      updateRect: true,
      props: {
        pinchable: Boolean
      },
      events: {
        onPinchStart: "pinchStart",
        onPinch: "pinch",
        onPinchEnd: "pinchEnd",
        onPinchGroupStart: "pinchGroupStart",
        onPinchGroup: "pinchGroup",
        onPinchGroupEnd: "pinchGroupEnd"
      },
      dragStart: function () {
        return true;
      },
      pinchStart: function (moveable, e) {
        var datas = e.datas,
            targets = e.targets,
            angle = e.angle,
            originalDatas = e.originalDatas;
        var _a = moveable.props,
            pinchable = _a.pinchable,
            ables = _a.ables;

        if (!pinchable) {
          return false;
        }

        var eventName = "onPinch" + (targets ? "Group" : "") + "Start";
        var controlEventName = "drag" + (targets ? "Group" : "") + "ControlStart";
        var pinchAbles = (pinchable === true ? moveable.controlAbles : ables.filter(function (able) {
          return pinchable.indexOf(able.name) > -1;
        })).filter(function (able) {
          return able.canPinch && able[controlEventName];
        });
        var params = fillParams(moveable, e, {});

        if (targets) {
          params.targets = targets;
        }

        var result = triggerEvent(moveable, eventName, params);
        datas.isPinch = result !== false;
        datas.ables = pinchAbles;
        var isPinch = datas.isPinch;

        if (!isPinch) {
          return false;
        }

        pinchAbles.forEach(function (able) {
          originalDatas[able.name] = originalDatas[able.name] || {};

          if (!able[controlEventName]) {
            return;
          }

          var ableEvent = __assign$4(__assign$4({}, e), {
            datas: originalDatas[able.name],
            parentRotate: angle,
            isPinch: true
          });

          able[controlEventName](moveable, ableEvent);
        });
        moveable.state.snapRenderInfo = {
          request: e.isRequest,
          direction: [0, 0]
        };
        return isPinch;
      },
      pinch: function (moveable, e) {
        var datas = e.datas,
            pinchScale = e.scale,
            distance = e.distance,
            originalDatas = e.originalDatas,
            inputEvent = e.inputEvent,
            targets = e.targets,
            angle = e.angle;

        if (!datas.isPinch) {
          return;
        }

        var parentDistance = distance * (1 - 1 / pinchScale);
        var params = fillParams(moveable, e, {});

        if (targets) {
          params.targets = targets;
        }

        var eventName = "onPinch" + (targets ? "Group" : "");
        triggerEvent(moveable, eventName, params);
        var ables = datas.ables;
        var controlEventName = "drag" + (targets ? "Group" : "") + "Control";
        ables.forEach(function (able) {
          if (!able[controlEventName]) {
            return;
          }

          able[controlEventName](moveable, __assign$4(__assign$4({}, e), {
            datas: originalDatas[able.name],
            inputEvent: inputEvent,
            parentDistance: parentDistance,
            parentRotate: angle,
            isPinch: true
          }));
        });
        return params;
      },
      pinchEnd: function (moveable, e) {
        var datas = e.datas,
            isPinch = e.isPinch,
            inputEvent = e.inputEvent,
            targets = e.targets,
            originalDatas = e.originalDatas;

        if (!datas.isPinch) {
          return;
        }

        var eventName = "onPinch" + (targets ? "Group" : "") + "End";
        var params = fillEndParams(moveable, e, {
          isDrag: isPinch
        });

        if (targets) {
          params.targets = targets;
        }

        triggerEvent(moveable, eventName, params);
        var ables = datas.ables;
        var controlEventName = "drag" + (targets ? "Group" : "") + "ControlEnd";
        ables.forEach(function (able) {
          if (!able[controlEventName]) {
            return;
          }

          able[controlEventName](moveable, __assign$4(__assign$4({}, e), {
            isDrag: isPinch,
            datas: originalDatas[able.name],
            inputEvent: inputEvent,
            isPinch: true
          }));
        });
        return isPinch;
      },
      pinchGroupStart: function (moveable, e) {
        return this.pinchStart(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      pinchGroup: function (moveable, e) {
        return this.pinch(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      pinchGroupEnd: function (moveable, e) {
        return this.pinchEnd(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      }
    };
    /**
     * Whether or not target can be pinched with draggable, resizable, scalable, rotatable (default: false)
     * @name Moveable.Pinchable#pinchable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.pinchable = true;
     */

    /**
     * When the pinch starts, the pinchStart event is called with part of scaleStart, rotateStart, resizeStart
     * @memberof Moveable.Pinchable
     * @event pinchStart
     * @param {Moveable.Pinchable.OnPinchStart} - Parameters for the pinchStart event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinchStart", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotateStart", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scaleStart", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When pinching, the pinch event is called with part of scale, rotate, resize
     * @memberof Moveable.Pinchable
     * @event pinch
     * @param {Moveable.Pinchable.OnPinch} - Parameters for the pinch event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinch", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotate", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scale", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When the pinch finishes, the pinchEnd event is called.
     * @memberof Moveable.Pinchable
     * @event pinchEnd
     * @param {Moveable.Pinchable.OnPinchEnd} - Parameters for the pinchEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     rotatable: true,
     *     scalable: true,
     *     pinchable: true, // ["rotatable", "scalable"]
     * });
     * moveable.on("pinchEnd", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("rotateEnd", ({ target }) => {
     *     console.log(target);
     * });
     * moveable.on("scaleEnd", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When the group pinch starts, the `pinchGroupStart` event is called.
     * @memberof Moveable.Pinchable
     * @event pinchGroupStart
     * @param {Moveable.Pinchable.OnPinchGroupStart} - Parameters for the `pinchGroupStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroupStart", ({ targets }) => {
     *     console.log("onPinchGroupStart", targets);
     * });
     */

    /**
     * When the group pinch, the `pinchGroup` event is called.
     * @memberof Moveable.Pinchable
     * @event pinchGroup
     * @param {Moveable.Pinchable.OnPinchGroup} - Parameters for the `pinchGroup` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroup", ({ targets, events }) => {
     *     console.log("onPinchGroup", targets);
     * });
     */

    /**
     * When the group pinch finishes, the `pinchGroupEnd` event is called.
     * @memberof Moveable.Pinchable
     * @event pinchGroupEnd
     * @param {Moveable.Pinchable.OnPinchGroupEnd} - Parameters for the `pinchGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     pinchable: true
     * });
     * moveable.on("pinchGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onPinchGroupEnd", targets, isDrag);
     * });
     */

    function setCustomDrag(e, state, delta, isPinch, isConvert) {
      var result = state.gesto.move(delta, e.inputEvent);
      var datas = result.originalDatas || result.datas;
      var draggableDatas = datas.draggable || (datas.draggable = {});
      return __assign$4(__assign$4({}, isConvert ? convertDragDist(state, result) : result), {
        isDrag: true,
        isPinch: !!isPinch,
        parentEvent: true,
        datas: draggableDatas,
        originalDatas: e.originalDatas
      });
    }

    var CustomGesto =
    /*#__PURE__*/
    function () {
      function CustomGesto() {
        this.prevX = 0;
        this.prevY = 0;
        this.startX = 0;
        this.startY = 0;
        this.isDrag = false;
        this.isFlag = false;
        this.datas = {
          draggable: {}
        };
      }

      var __proto = CustomGesto.prototype;

      __proto.dragStart = function (client, e) {
        this.isDrag = false;
        this.isFlag = false;
        var originalDatas = e.originalDatas;
        this.datas = originalDatas;

        if (!originalDatas.draggable) {
          originalDatas.draggable = {};
        }

        return __assign$4(__assign$4({}, this.move(client, e.inputEvent)), {
          type: "dragstart"
        });
      };

      __proto.drag = function (client, inputEvent) {
        return this.move([client[0] - this.prevX, client[1] - this.prevY], inputEvent);
      };

      __proto.move = function (delta, inputEvent) {
        var clientX;
        var clientY;

        if (!this.isFlag) {
          this.prevX = delta[0];
          this.prevY = delta[1];
          this.startX = delta[0];
          this.startY = delta[1];
          clientX = delta[0];
          clientY = delta[1];
          this.isFlag = true;
        } else {
          clientX = this.prevX + delta[0];
          clientY = this.prevY + delta[1];
          this.isDrag = true;
        }

        this.prevX = clientX;
        this.prevY = clientY;
        return {
          type: "drag",
          clientX: clientX,
          clientY: clientY,
          inputEvent: inputEvent,
          isDrag: this.isDrag,
          distX: clientX - this.startX,
          distY: clientY - this.startY,
          deltaX: delta[0],
          deltaY: delta[1],
          datas: this.datas.draggable,
          originalDatas: this.datas,
          parentEvent: true,
          parentGesto: this
        };
      };

      return CustomGesto;
    }();

    function fillChildEvents(moveable, name, e) {
      var datas = e.originalDatas;
      datas.groupable = datas.groupable || {};
      var groupableDatas = datas.groupable;
      groupableDatas.childDatas = groupableDatas.childDatas || [];
      var childDatas = groupableDatas.childDatas;
      var inputEvent = e.inputEvent,
          isPinch = e.isPinch,
          clientX = e.clientX,
          clientY = e.clientY,
          distX = e.distX,
          distY = e.distY;
      return moveable.moveables.map(function (child, i) {
        childDatas[i] = childDatas[i] || {};
        childDatas[i][name] = childDatas[i][name] || {};
        return {
          inputEvent: inputEvent,
          datas: childDatas[i][name],
          originalDatas: childDatas[i],
          isPinch: isPinch,
          clientX: clientX,
          clientY: clientY,
          distX: distX,
          distY: distY
        };
      });
    }
    function triggerChildGesto(moveable, able, type, delta, e, isConvert) {
      var isStart = !!type.match(/Start$/g);
      var isEnd = !!type.match(/End$/g);
      var isPinch = e.isPinch;
      var datas = e.datas;
      var events = fillChildEvents(moveable, able.name, e);
      var moveables = moveable.moveables;
      var childs = events.map(function (ev, i) {
        var childMoveable = moveables[i];
        var childEvent = ev;

        if (isStart) {
          childEvent = new CustomGesto().dragStart(delta, ev);
        } else {
          if (!childMoveable.state.gesto) {
            childMoveable.state.gesto = datas.childGestos[i];
          }

          childEvent = setCustomDrag(ev, childMoveable.state, delta, isPinch, isConvert);
        }

        var result = able[type](childMoveable, __assign$4(__assign$4({}, childEvent), {
          parentFlag: true
        }));

        if (isEnd) {
          childMoveable.state.gesto = null;
        }

        return result;
      });

      if (isStart) {
        datas.childGestos = moveables.map(function (child) {
          return child.state.gesto;
        });
      }

      return childs;
    }
    function triggerChildAble(moveable, able, type, e, eachEvent, callback) {
      if (eachEvent === void 0) {
        eachEvent = function (_, ev) {
          return ev;
        };
      }

      var isEnd = !!type.match(/End$/g);
      var events = fillChildEvents(moveable, able.name, e);
      var moveables = moveable.moveables;
      var childs = events.map(function (ev, i) {
        var childMoveable = moveables[i];
        var childEvent = ev;
        childEvent = eachEvent(childMoveable, ev);
        var result = able[type](childMoveable, __assign$4(__assign$4({}, childEvent), {
          parentFlag: true
        }));
        result && callback && callback(childMoveable, ev, result, i);

        if (isEnd) {
          childMoveable.state.gesto = null;
        }

        return result;
      });
      return childs;
    }

    function caculatePointerDist(moveable, e) {
      var clientX = e.clientX,
          clientY = e.clientY,
          datas = e.datas;
      var _a = moveable.state,
          moveableClientRect = _a.moveableClientRect,
          rootMatrix = _a.rootMatrix,
          is3d = _a.is3d,
          pos1 = _a.pos1;
      var left = moveableClientRect.left,
          top = moveableClientRect.top;
      var n = is3d ? 4 : 3;

      var _b = minus(caculateInversePosition(rootMatrix, [clientX - left, clientY - top], n), pos1),
          posX = _b[0],
          posY = _b[1];

      var _c = getDragDist({
        datas: datas,
        distX: posX,
        distY: posY
      }),
          distX = _c[0],
          distY = _c[1];

      return [distX, distY];
    }
    function setDragStart(moveable, _a) {
      var datas = _a.datas;
      var _b = moveable.state,
          allMatrix = _b.allMatrix,
          beforeMatrix = _b.beforeMatrix,
          is3d = _b.is3d,
          left = _b.left,
          top = _b.top,
          origin = _b.origin,
          offsetMatrix = _b.offsetMatrix,
          targetMatrix = _b.targetMatrix,
          transformOrigin = _b.transformOrigin;
      var n = is3d ? 4 : 3;
      datas.is3d = is3d;
      datas.matrix = allMatrix;
      datas.targetMatrix = targetMatrix;
      datas.beforeMatrix = beforeMatrix;
      datas.offsetMatrix = offsetMatrix;
      datas.transformOrigin = transformOrigin;
      datas.inverseMatrix = invert$1(allMatrix, n);
      datas.inverseBeforeMatrix = invert$1(beforeMatrix, n);
      datas.absoluteOrigin = convertPositionMatrix(plus([left, top], origin), n);
      datas.startDragBeforeDist = caculate(datas.inverseBeforeMatrix, datas.absoluteOrigin, n);
      datas.startDragDist = caculate(datas.inverseMatrix, datas.absoluteOrigin, n);
    }
    function resolveTransformEvent(event, functionName) {
      var datas = event.datas,
          originalDatas = event.originalDatas.beforeRenderable;
      var index = datas.transformIndex;
      var nextTransforms = originalDatas.nextTransforms;
      var nextTransformAppendedIndexes = originalDatas.nextTransformAppendedIndexes;
      var nextIndex = index === -1 ? nextTransforms.length : index + nextTransformAppendedIndexes.filter(function (i) {
        return i < index;
      }).length;
      var result = getTransform(nextTransforms, nextIndex);
      var targetFunction = result.targetFunction;
      var matFunctionName = functionName === "rotate" ? "rotateZ" : functionName;
      datas.targetAllTransform = multiply$1(result.beforeFunctionMatrix, result.afterFunctionMatrix, 4);
      datas.beforeFunctionTexts = result.beforeFunctionTexts;
      datas.afterFunctionTexts = result.afterFunctionTexts;
      datas.beforeTransform = result.beforeFunctionMatrix;
      datas.targetTansform = result.targetFunctionMatrix;
      datas.afterTransform = result.afterFunctionMatrix;

      if (targetFunction.functionName === matFunctionName) {
        datas.afterFunctionTexts.splice(0, 1);
        datas.isAppendTransform = false;
      } else {
        datas.isAppendTransform = true;
        originalDatas.nextTransformAppendedIndexes = __spreadArrays$1(nextTransformAppendedIndexes, [nextIndex]);
      }
    }
    function convertTransformFormat(datas, value, dist) {
      return datas.beforeFunctionTexts.join(" ") + " " + (datas.isAppendTransform ? dist : value) + " " + datas.afterFunctionTexts.join(" ");
    }
    function getTransformDist(_a) {
      var datas = _a.datas,
          distX = _a.distX,
          distY = _a.distY;

      var _b = getBeforeDragDist({
        datas: datas,
        distX: distX,
        distY: distY
      }),
          bx = _b[0],
          by = _b[1]; // B * [tx, ty] * A = [bx, by] * targetMatrix;
      // [tx, ty] = B-1 * [bx, by] * targetMatrix * A-1 * [0, 0];


      var res = getTransfromMatrix(datas, fromTranslation$1([bx, by], 4));
      return caculate(res, convertPositionMatrix([0, 0, 0], 4), 4);
    }
    function getTransfromMatrix(datas, targetMatrix, isAfter) {
      var beforeTransform = datas.beforeTransform,
          afterTransform = datas.afterTransform,
          targetAllTransform = datas.targetAllTransform; // B * afterTargetMatrix * A = (targetMatrix * targetAllTransform)
      // afterTargetMatrix = B-1 * targetMatrix * targetAllTransform * A-1
      // nextTargetMatrix = (targetMatrix * targetAllTransform)

      var nextTargetMatrix = isAfter ? multiply$1(targetAllTransform, targetMatrix, 4) : multiply$1(targetMatrix, targetAllTransform, 4); // res1 = B-1 * nextTargetMatrix

      var res1 = multiply$1(invert$1(beforeTransform, 4), nextTargetMatrix, 4); // res3 = res2 * A-1

      var afterTargetMatrix = multiply$1(res1, invert$1(afterTransform, 4), 4);
      return afterTargetMatrix;
    }
    function getBeforeDragDist(_a) {
      var datas = _a.datas,
          distX = _a.distX,
          distY = _a.distY; // TT = BT

      var inverseBeforeMatrix = datas.inverseBeforeMatrix,
          is3d = datas.is3d,
          startDragBeforeDist = datas.startDragBeforeDist,
          absoluteOrigin = datas.absoluteOrigin;
      var n = is3d ? 4 : 3; // ABS_ORIGIN * [distX, distY] = BM * (ORIGIN + [tx, ty])
      // BM -1 * ABS_ORIGIN * [distX, distY] - ORIGIN = [tx, ty]

      return minus(caculate(inverseBeforeMatrix, plus(absoluteOrigin, [distX, distY]), n), startDragBeforeDist);
    }
    function getDragDist(_a, isBefore) {
      var datas = _a.datas,
          distX = _a.distX,
          distY = _a.distY;
      var inverseBeforeMatrix = datas.inverseBeforeMatrix,
          inverseMatrix = datas.inverseMatrix,
          is3d = datas.is3d,
          startDragBeforeDist = datas.startDragBeforeDist,
          startDragDist = datas.startDragDist,
          absoluteOrigin = datas.absoluteOrigin;
      var n = is3d ? 4 : 3;
      return minus(caculate(isBefore ? inverseBeforeMatrix : inverseMatrix, plus(absoluteOrigin, [distX, distY]), n), isBefore ? startDragBeforeDist : startDragDist);
    }
    function getInverseDragDist(_a, isBefore) {
      var datas = _a.datas,
          distX = _a.distX,
          distY = _a.distY;
      var beforeMatrix = datas.beforeMatrix,
          matrix = datas.matrix,
          is3d = datas.is3d,
          startDragBeforeDist = datas.startDragBeforeDist,
          startDragDist = datas.startDragDist,
          absoluteOrigin = datas.absoluteOrigin;
      var n = is3d ? 4 : 3;
      return minus(caculate(isBefore ? beforeMatrix : matrix, plus(isBefore ? startDragBeforeDist : startDragDist, [distX, distY]), n), absoluteOrigin);
    }
    function caculateTransformOrigin(transformOrigin, width, height, prevWidth, prevHeight, prevOrigin) {
      if (prevWidth === void 0) {
        prevWidth = width;
      }

      if (prevHeight === void 0) {
        prevHeight = height;
      }

      if (prevOrigin === void 0) {
        prevOrigin = [0, 0];
      }

      if (!transformOrigin) {
        return prevOrigin;
      }

      return transformOrigin.map(function (pos, i) {
        var _a = splitUnit(pos),
            value = _a.value,
            unit = _a.unit;

        var prevSize = i ? prevHeight : prevWidth;
        var size = i ? height : width;

        if (pos === "%" || isNaN(value)) {
          // no value but %
          var measureRatio = prevSize ? prevOrigin[i] / prevSize : 0;
          return size * measureRatio;
        } else if (unit !== "%") {
          return value;
        }

        return size * value / 100;
      });
    }
    function getPosIndexesByDirection(direction) {
      var indexes = [];

      if (direction[1] >= 0) {
        if (direction[0] >= 0) {
          indexes.push(3);
        }

        if (direction[0] <= 0) {
          indexes.push(2);
        }
      }

      if (direction[1] <= 0) {
        if (direction[0] >= 0) {
          indexes.push(1);
        }

        if (direction[0] <= 0) {
          indexes.push(0);
        }
      }

      return indexes;
    }
    function getPosesByDirection(poses, direction) {
      /*
      [-1, -1](pos1)       [0, -1](pos1,pos2)       [1, -1](pos2)
      [-1, 0](pos1, pos3)                           [1, 0](pos2, pos4)
      [-1, 1](pos3)        [0, 1](pos3, pos4)       [1, 1](pos4)
      */
      return getPosIndexesByDirection(direction).map(function (index) {
        return poses[index];
      });
    }
    function getPosByDirection(poses, direction) {
      /*
      [-1, -1](pos1)       [0, -1](pos1,pos2)       [1, -1](pos2)
      [-1, 0](pos1, pos3)                           [1, 0](pos2, pos4)
      [-1, 1](pos3)        [0, 1](pos3, pos4)       [1, 1](pos4)
      */
      var nextPoses = getPosesByDirection(poses, direction);
      return [average.apply(void 0, nextPoses.map(function (pos) {
        return pos[0];
      })), average.apply(void 0, nextPoses.map(function (pos) {
        return pos[1];
      }))];
    }
    function getPosByReverseDirection(poses, direction) {
      /*
      [-1, -1](pos4)       [0, -1](pos3,pos4)       [1, -1](pos3)
      [-1, 0](pos2, pos4)                           [1, 0](pos3, pos1)
      [-1, 1](pos2)        [0, 1](pos1, pos2)       [1, 1](pos1)
      */
      return getPosByDirection(poses, direction.map(function (dir) {
        return -dir;
      }));
    }

    function getDist$1(startPos, matrix, width, height, n, direction) {
      var poses = caculatePoses(matrix, width, height, n);
      var pos = getPosByReverseDirection(poses, direction);
      var distX = startPos[0] - pos[0];
      var distY = startPos[1] - pos[1];
      return [distX, distY];
    }

    function getNextMatrix(offsetMatrix, targetMatrix, origin, n) {
      return multiply$1(offsetMatrix, getAbsoluteMatrix(targetMatrix, n, origin), n);
    }
    function getNextTransformMatrix(state, datas, transform) {
      var transformOrigin = state.transformOrigin,
          offsetMatrix = state.offsetMatrix,
          is3d = state.is3d;
      var beforeTransform = datas.beforeTransform,
          afterTransform = datas.afterTransform;
      var n = is3d ? 4 : 3;
      var targetTransform = parseMat([transform]);
      return getNextMatrix(offsetMatrix, convertDimension(multiply$1(multiply$1(beforeTransform, targetTransform, 4), afterTransform, 4), 4, n), transformOrigin, n);
    }
    function scaleMatrix(state, scale) {
      var transformOrigin = state.transformOrigin,
          offsetMatrix = state.offsetMatrix,
          is3d = state.is3d,
          targetMatrix = state.targetMatrix;
      var n = is3d ? 4 : 3;
      return getNextMatrix(offsetMatrix, multiply$1(targetMatrix, createScaleMatrix(scale, n), n), transformOrigin, n);
    }
    function fillTransformStartEvent(e) {
      var originalDatas = e.originalDatas.beforeRenderable;
      return {
        setTransform: function (transform, index) {
          if (index === void 0) {
            index = -1;
          }

          originalDatas.startTransforms = isArray$1(transform) ? transform : splitSpace(transform);
          setTransformIndex(e, index);
        },
        setTransformIndex: function (index) {
          setTransformIndex(e, index);
        }
      };
    }
    function setDefaultTransformIndex(e) {
      setTransformIndex(e, -1);
    }
    function setTransformIndex(e, index) {
      var originalDatas = e.originalDatas.beforeRenderable;
      var datas = e.datas;
      datas.transformIndex = index;

      if (index === -1) {
        return;
      }

      var transform = originalDatas.startTransforms[index];

      if (!transform) {
        return;
      }

      var info = parse([transform]);
      datas.startValue = info[0].functionValue;
    }
    function fillOriginalTransform(e, transform) {
      var originalDatas = e.originalDatas.beforeRenderable;
      originalDatas.nextTransforms = splitSpace(transform);
    }
    function fillTransformEvent(moveable, nextTransform, delta, isPinch, e) {
      fillOriginalTransform(e, nextTransform);
      return {
        transform: nextTransform,
        drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, delta, isPinch, false))
      };
    }
    function getTranslateDist(moveable, transform, fixedPosition, fixedDirection, datas) {
      var state = moveable.state;
      var left = state.left,
          top = state.top;
      var groupable = moveable.props.groupable;
      var nextMatrix = getNextTransformMatrix(moveable.state, datas, transform);
      var groupLeft = groupable ? left : 0;
      var groupTop = groupable ? top : 0; // const dist = getDist(fixedPosition, nextMatrix, width, height, n, direction);

      var nextFixedPosition = getDirectionOffset(moveable, fixedDirection, nextMatrix);
      var dist = minus(fixedPosition, nextFixedPosition);
      return minus(dist, [groupLeft, groupTop]);
    }
    function getScaleDist(moveable, scaleDist, direction, fixedPosition, datas) {
      return getTranslateDist(moveable, "scale(" + scaleDist.join(", ") + ")", fixedPosition, direction.map(function (dir) {
        return -dir;
      }), datas);
    }
    function getOriginDirection(moveable) {
      var _a = moveable.state,
          width = _a.width,
          height = _a.height,
          transformOrigin = _a.transformOrigin;
      return [-1 + transformOrigin[0] / (width / 2), -1 + transformOrigin[1] / (height / 2)];
    }
    function getDirectionOffset(moveable, direction, nextMatrix) {
      if (nextMatrix === void 0) {
        nextMatrix = moveable.state.allMatrix;
      }

      var _a = moveable.state,
          width = _a.width,
          height = _a.height,
          is3d = _a.is3d;
      var n = is3d ? 4 : 3;
      var nextFixedOffset = [width / 2 * (1 + direction[0]), height / 2 * (1 + direction[1])];
      return caculatePosition(nextMatrix, nextFixedOffset, n);
    }
    function getRotateDist(moveable, rotateDist, fixedPosition, datas) {
      var fixedDirection = getOriginDirection(moveable);
      return getTranslateDist(moveable, "rotate(" + rotateDist + "deg)", fixedPosition, fixedDirection, datas);
    }
    function getResizeDist(moveable, width, height, direction, fixedPosition, transformOrigin) {
      var groupable = moveable.props.groupable;
      var _a = moveable.state,
          prevOrigin = _a.transformOrigin,
          targetMatrix = _a.targetMatrix,
          offsetMatrix = _a.offsetMatrix,
          is3d = _a.is3d,
          prevWidth = _a.width,
          prevHeight = _a.height,
          left = _a.left,
          top = _a.top;
      var n = is3d ? 4 : 3;
      var nextOrigin = caculateTransformOrigin(transformOrigin, width, height, prevWidth, prevHeight, prevOrigin);
      var groupLeft = groupable ? left : 0;
      var groupTop = groupable ? top : 0;
      var nextMatrix = getNextMatrix(offsetMatrix, targetMatrix, nextOrigin, n);
      var dist = getDist$1(fixedPosition, nextMatrix, width, height, n, direction);
      return minus(dist, [groupLeft, groupTop]);
    }
    function getStartDirection(moveable, direction) {
      if (!direction[0] && !direction[1]) {
        return [0, 0];
      }

      var baseDirection = [-1, -1];
      return [direction[0] ? direction[0] : baseDirection[0] * -1, direction[1] ? direction[1] : baseDirection[1] * -1];
    }
    function getAbsoluteFixedPosition(moveable, direction) {
      return getPosByReverseDirection(getAbsolutePosesByState(moveable.state), direction);
    }

    function getGapGuidelines(guidelines, type, snapThreshold, index, _a, _b) {
      var start = _a[0],
          end = _a[1];
      var otherStart = _b[0],
          otherEnd = _b[1];
      var totalGuidelines = [];
      var otherIndex = index ? 0 : 1;
      var otherType = type === "vertical" ? "horizontal" : "vertical";
      var elementGuidelines = groupBy(guidelines.filter(function (_a) {
        var guidelineType = _a.type;
        return guidelineType === type;
      }), function (_a) {
        var element = _a.element;
        return element;
      }).map(function (group) {
        return group[0];
      }).filter(function (_a) {
        var pos = _a.pos,
            sizes = _a.sizes;
        return pos[otherIndex] <= otherEnd && otherStart <= pos[otherIndex] + sizes[otherIndex];
      });
      elementGuidelines.forEach(function (guideline1) {
        var elementStart = guideline1.pos[index];
        var elementEnd = elementStart + guideline1.sizes[index];
        elementGuidelines.forEach(function (_a) {
          var guideline2Pos = _a.pos,
              guideline2Sizes = _a.sizes,
              guideline2Element = _a.element;
          var targetStart = guideline2Pos[index];
          var targetEnd = targetStart + guideline2Sizes[index];
          var pos = 0;
          var gap = 0;
          var canSnap = true;

          if (elementEnd <= targetStart) {
            // gap -
            gap = elementEnd - targetStart;
            pos = targetEnd - gap;

            if (start < pos - snapThreshold) {
              canSnap = false;
            } // element target moveable

          } else if (targetEnd <= elementStart) {
            // gap +
            gap = elementStart - targetEnd;
            pos = targetStart - gap;

            if (end > pos + snapThreshold) {
              canSnap = false;
            } // moveable target element

          } else {
            return;
          }

          if (canSnap) {
            totalGuidelines.push({
              pos: otherType === "vertical" ? [pos, guideline2Pos[1]] : [guideline2Pos[0], pos],
              element: guideline2Element,
              sizes: guideline2Sizes,
              size: 0,
              type: otherType,
              gap: gap,
              gapGuidelines: elementGuidelines
            });
          }

          if (elementEnd <= start && end <= targetStart) {
            // elementEnd   moveable   target
            var centerPos = (targetStart + elementEnd - (end - start)) / 2;

            if (throttle(start - (centerPos - snapThreshold), 0.1) >= 0) {
              totalGuidelines.push({
                pos: otherType === "vertical" ? [centerPos, guideline2Pos[1]] : [guideline2Pos[0], centerPos],
                element: guideline2Element,
                sizes: guideline2Sizes,
                size: 0,
                type: otherType,
                gap: elementEnd - start,
                gapGuidelines: elementGuidelines
              });
            }
          }
        });
      });
      return totalGuidelines;
    }
    function addGuidelines(totalGuidelines, width, height, horizontalGuidelines, verticalGuidelines) {
      horizontalGuidelines && horizontalGuidelines.forEach(function (pos) {
        totalGuidelines.push({
          type: "horizontal",
          pos: [0, throttle(pos, 0.1)],
          size: width
        });
      });
      verticalGuidelines && verticalGuidelines.forEach(function (pos) {
        totalGuidelines.push({
          type: "vertical",
          pos: [throttle(pos, 0.1), 0],
          size: height
        });
      });
      return totalGuidelines;
    }
    function getTotalGuidelines(moveable) {
      var _a = moveable.state,
          guidelines = _a.guidelines,
          _b = _a.containerClientRect,
          containerHeight = _b.scrollHeight,
          containerWidth = _b.scrollWidth;
      var props = moveable.props;
      var _c = props.snapHorizontal,
          snapHorizontal = _c === void 0 ? true : _c,
          _d = props.snapVertical,
          snapVertical = _d === void 0 ? true : _d,
          _e = props.snapGap,
          snapGap = _e === void 0 ? true : _e,
          verticalGuidelines = props.verticalGuidelines,
          horizontalGuidelines = props.horizontalGuidelines,
          _f = props.snapThreshold,
          snapThreshold = _f === void 0 ? 5 : _f;

      var totalGuidelines = __spreadArrays$1(guidelines);

      if (snapGap) {
        var _g = getRect(getAbsolutePosesByState(moveable.state)),
            top = _g.top,
            left = _g.left,
            bottom = _g.bottom,
            right = _g.right;

        var elementGuidelines = guidelines.filter(function (_a) {
          var element = _a.element;
          return element;
        });
        totalGuidelines.push.apply(totalGuidelines, __spreadArrays$1(getGapGuidelines(elementGuidelines, "horizontal", snapThreshold, 0, [left, right], [top, bottom]), getGapGuidelines(elementGuidelines, "vertical", snapThreshold, 1, [top, bottom], [left, right])));
      }

      addGuidelines(totalGuidelines, containerWidth, containerHeight, snapHorizontal && horizontalGuidelines, snapVertical && verticalGuidelines);
      return totalGuidelines;
    }
    function checkMoveableSnapPoses(moveable, posesX, posesY, snapCenter, customSnapThreshold) {
      var totalGuidelines = getTotalGuidelines(moveable);
      var props = moveable.props;
      var _a = props.snapElement,
          snapElement = _a === void 0 ? true : _a;
      var snapThreshold = selectValue(customSnapThreshold, props.snapThreshold, 5);
      return checkSnapPoses(totalGuidelines, posesX, posesY, {
        snapThreshold: snapThreshold,
        snapCenter: snapCenter,
        snapElement: snapElement
      });
    }
    function checkSnapPoses(guidelines, posesX, posesY, options) {
      return {
        vertical: checkSnap(guidelines, "vertical", posesX, options),
        horizontal: checkSnap(guidelines, "horizontal", posesY, options)
      };
    }
    function checkSnapKeepRatio(moveable, startPos, endPos) {
      var endX = endPos[0],
          endY = endPos[1];
      var startX = startPos[0],
          startY = startPos[1];

      var _a = minus(endPos, startPos),
          dx = _a[0],
          dy = _a[1];

      var isBottom = dy > 0;
      var isRight = dx > 0;
      dx = getTinyDist(dx);
      dy = getTinyDist(dy);
      var verticalInfo = {
        isSnap: false,
        offset: 0,
        pos: 0
      };
      var horizontalInfo = {
        isSnap: false,
        offset: 0,
        pos: 0
      };

      if (dx === 0 && dy === 0) {
        return {
          vertical: verticalInfo,
          horizontal: horizontalInfo
        };
      }

      var _b = checkMoveableSnapPoses(moveable, dx ? [endX] : [], dy ? [endY] : []),
          verticalSnapInfo = _b.vertical,
          horizontalSnapInfo = _b.horizontal;

      verticalSnapInfo.posInfos.filter(function (_a) {
        var pos = _a.pos;
        return isRight ? pos >= startX : pos <= startX;
      });
      horizontalSnapInfo.posInfos.filter(function (_a) {
        var pos = _a.pos;
        return isBottom ? pos >= startY : pos <= startY;
      });
      verticalSnapInfo.isSnap = verticalSnapInfo.posInfos.length > 0;
      horizontalSnapInfo.isSnap = horizontalSnapInfo.posInfos.length > 0;

      var _c = getNearestSnapGuidelineInfo(verticalSnapInfo),
          isVerticalSnap = _c.isSnap,
          verticalGuideline = _c.guideline;

      var _d = getNearestSnapGuidelineInfo(horizontalSnapInfo),
          isHorizontalSnap = _d.isSnap,
          horizontalGuideline = _d.guideline;

      var horizontalPos = isHorizontalSnap ? horizontalGuideline.pos[1] : 0;
      var verticalPos = isVerticalSnap ? verticalGuideline.pos[0] : 0;

      if (dx === 0) {
        if (isHorizontalSnap) {
          horizontalInfo.isSnap = true;
          horizontalInfo.pos = horizontalGuideline.pos[1];
          horizontalInfo.offset = endY - horizontalInfo.pos;
        }
      } else if (dy === 0) {
        if (isVerticalSnap) {
          verticalInfo.isSnap = true;
          verticalInfo.pos = verticalPos;
          verticalInfo.offset = endX - verticalPos;
        }
      } else {
        // y - y1 = a * (x - x1)
        var a = dy / dx;
        var b = endPos[1] - a * endX;
        var y = 0;
        var x = 0;
        var isSnap = false;

        if (isVerticalSnap) {
          x = verticalPos;
          y = a * x + b;
          isSnap = true;
        } else if (isHorizontalSnap) {
          y = horizontalPos;
          x = (y - b) / a;
          isSnap = true;
        }

        if (isSnap) {
          verticalInfo.isSnap = true;
          verticalInfo.pos = x;
          verticalInfo.offset = endX - x;
          horizontalInfo.isSnap = true;
          horizontalInfo.pos = y;
          horizontalInfo.offset = endY - y;
        }
      }

      return {
        vertical: verticalInfo,
        horizontal: horizontalInfo
      };
    }
    function checkSnaps(moveable, rect, isCenter, customSnapThreshold) {
      var snapCenter = moveable.props.snapCenter;
      var isSnapCenter = snapCenter && isCenter;
      var verticalNames = ["left", "right"];
      var horizontalNames = ["top", "bottom"];

      if (isSnapCenter) {
        verticalNames.push("center");
        horizontalNames.push("middle");
      }

      verticalNames = verticalNames.filter(function (name) {
        return name in rect;
      });
      horizontalNames = horizontalNames.filter(function (name) {
        return name in rect;
      });
      return checkMoveableSnapPoses(moveable, verticalNames.map(function (name) {
        return rect[name];
      }), horizontalNames.map(function (name) {
        return rect[name];
      }), isSnapCenter, customSnapThreshold);
    }
    function getNearestSnapGuidelineInfo(snapInfo) {
      var isSnap = snapInfo.isSnap;

      if (!isSnap) {
        return {
          isSnap: false,
          offset: 0,
          dist: -1,
          pos: 0,
          guideline: null
        };
      }

      var posInfo = snapInfo.posInfos[0];
      var guidelineInfo = posInfo.guidelineInfos[0];
      var offset = guidelineInfo.offset;
      var dist = guidelineInfo.dist;
      var guideline = guidelineInfo.guideline;
      return {
        isSnap: isSnap,
        offset: offset,
        dist: dist,
        pos: posInfo.pos,
        guideline: guideline
      };
    }

    function checkSnap(guidelines, targetType, targetPoses, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.snapThreshold,
          snapThreshold = _c === void 0 ? 5 : _c,
          snapElement = _b.snapElement,
          snapCenter = _b.snapCenter;

      if (!guidelines || !guidelines.length) {
        return {
          isSnap: false,
          index: -1,
          posInfos: []
        };
      }

      var isVertical = targetType === "vertical";
      var posType = isVertical ? 0 : 1;
      var snapPosInfos = targetPoses.map(function (targetPos, index) {
        var guidelineInfos = guidelines.map(function (guideline) {
          var pos = guideline.pos;
          var offset = targetPos - pos[posType];
          return {
            offset: offset,
            dist: Math.abs(offset),
            guideline: guideline
          };
        }).filter(function (_a) {
          var guideline = _a.guideline,
              dist = _a.dist;
          var type = guideline.type,
              center = guideline.center,
              element = guideline.element;

          if (!snapElement && element || !snapCenter && center || type !== targetType || dist > snapThreshold) {
            return false;
          }

          return true;
        }).sort(function (a, b) {
          return a.dist - b.dist;
        });
        return {
          pos: targetPos,
          index: index,
          guidelineInfos: guidelineInfos
        };
      }).filter(function (snapPosInfo) {
        return snapPosInfo.guidelineInfos.length > 0;
      }).sort(function (a, b) {
        return a.guidelineInfos[0].dist - b.guidelineInfos[0].dist;
      });
      var isSnap = snapPosInfos.length > 0;
      return {
        isSnap: isSnap,
        index: isSnap ? snapPosInfos[0].index : -1,
        posInfos: snapPosInfos
      };
    }

    function getSnapInfosByDirection(moveable, poses, snapDirection) {
      var nextPoses = [];

      if (snapDirection[0] && snapDirection[1]) {
        nextPoses = [snapDirection, [-snapDirection[0], snapDirection[1]], [snapDirection[0], -snapDirection[1]]].map(function (direction) {
          return getPosByDirection(poses, direction);
        });
      } else if (!snapDirection[0] && !snapDirection[1]) {
        var alignPoses = [poses[0], poses[1], poses[3], poses[2], poses[0]];

        for (var i = 0; i < 4; ++i) {
          nextPoses.push(alignPoses[i]);
          nextPoses.push([(alignPoses[i][0] + alignPoses[i + 1][0]) / 2, (alignPoses[i][1] + alignPoses[i + 1][1]) / 2]);
        }
      } else {
        if (moveable.props.keepRatio) {
          nextPoses = [[-1, -1], [-1, 1], [1, -1], [1, 1], snapDirection].map(function (dir) {
            return getPosByDirection(poses, dir);
          });
        } else {
          nextPoses = getPosesByDirection(poses, snapDirection);

          if (nextPoses.length > 1) {
            nextPoses.push([(nextPoses[0][0] + nextPoses[1][0]) / 2, (nextPoses[0][1] + nextPoses[1][1]) / 2]);
          }
        }
      }

      return checkMoveableSnapPoses(moveable, nextPoses.map(function (pos) {
        return pos[0];
      }), nextPoses.map(function (pos) {
        return pos[1];
      }), true, 1);
    }
    function checkSnapBoundPriority(a, b) {
      var aDist = Math.abs(a.offset);
      var bDist = Math.abs(b.offset);

      if (a.isBound && b.isBound) {
        return bDist - aDist;
      } else if (a.isBound) {
        return -1;
      } else if (b.isBound) {
        return 1;
      } else if (a.isSnap && b.isSnap) {
        return bDist - aDist;
      } else if (a.isSnap) {
        return -1;
      } else if (b.isSnap) {
        return 1;
      } else if (aDist < TINY_NUM) {
        return 1;
      } else if (bDist < TINY_NUM) {
        return -1;
      }

      return aDist - bDist;
    }
    function getNearOffsetInfo(offsets, index) {
      return offsets.slice().sort(function (a, b) {
        var aSign = a.sign[index];
        var bSign = b.sign[index];
        var aOffset = a.offset[index];
        var bOffset = b.offset[index]; // -1 The positions of a and b do not change.
        // 1 The positions of a and b are reversed.

        if (!aSign) {
          return 1;
        } else if (!bSign) {
          return -1;
        }

        return checkSnapBoundPriority({
          isBound: a.isBound,
          isSnap: a.isSnap,
          offset: aOffset
        }, {
          isBound: b.isBound,
          isSnap: b.isSnap,
          offset: bOffset
        });
      })[0];
    }

    function isStartLine(dot, line) {
      // l    o     => true
      // o    l    => false
      var cx = average(line[0][0], line[1][0]);
      var cy = average(line[0][1], line[1][1]);
      return {
        vertical: cx <= dot[0],
        horizontal: cy <= dot[1]
      };
    }

    function hitTestLine(dot, _a) {
      var pos1 = _a[0],
          pos2 = _a[1];
      var dx = pos2[0] - pos1[0];
      var dy = pos2[1] - pos1[1];

      if (Math.abs(dx) < TINY_NUM) {
        dx = 0;
      }

      if (Math.abs(dy) < TINY_NUM) {
        dy = 0;
      }

      var test1;
      var test2;

      if (!dx) {
        test1 = pos1[0];
        test2 = dot[0];
      } else if (!dy) {
        test1 = pos1[1];
        test2 = dot[1];
      } else {
        var a = dy / dx; // y = a * (x - pos1) + pos1

        test1 = a * (dot[0] - pos1[0]) + pos1[1];
        test2 = dot[1];
      }

      return test1 - test2;
    }

    function isSameStartLine(dots, line, error) {
      if (error === void 0) {
        error = TINY_NUM;
      }

      var centerSign = hitTestLine(dots[0], line) <= 0;
      return dots.slice(1).every(function (dot) {
        var value = hitTestLine(dot, line);
        var sign = value <= 0;
        return sign === centerSign || Math.abs(value) <= error;
      });
    }

    function checkInnerBoundDot(pos, start, end, isStart, threshold) {
      if (threshold === void 0) {
        threshold = 0;
      }

      if (isStart && start - threshold <= pos || !isStart && pos <= end + threshold) {
        // false 402 565 602 => 37 ([0, 37])
        // true 400 524.9712603540036 600 => 124 ([124, 0])
        // true 400 410 600 => 10 ([10, 0])
        return {
          isBound: true,
          offset: isStart ? start - pos : end - pos
        };
      }

      return {
        isBound: false,
        offset: 0
      };
    }

    function checkInnerBound(moveable, line, center) {
      var bounds = moveable.props.innerBounds;

      if (!bounds) {
        return {
          isAllBound: false,
          isBound: false,
          isVerticalBound: false,
          isHorizontalBound: false,
          offset: [0, 0]
        };
      }

      var left = bounds.left,
          top = bounds.top,
          width = bounds.width,
          height = bounds.height;
      var leftLine = [[left, top], [left, top + height]];
      var topLine = [[left, top], [left + width, top]];
      var rightLine = [[left + width, top], [left + width, top + height]];
      var bottomLine = [[left, top + height], [left + width, top + height]];

      var _a = isStartLine(center, line),
          isHorizontalStart = _a.horizontal,
          isVerticalStart = _a.vertical;

      if (isSameStartLine([center, [left, top], [left + width, top], [left, top + height], [left + width, top + height]], line)) {
        return {
          isAllBound: false,
          isBound: false,
          isVerticalBound: false,
          isHorizontalBound: false,
          offset: [0, 0]
        };
      } // test vertical


      var topBoundInfo = checkLineBoundCollision(line, topLine, isVerticalStart);
      var bottomBoundInfo = checkLineBoundCollision(line, bottomLine, isVerticalStart); // test horizontal

      var leftBoundInfo = checkLineBoundCollision(line, leftLine, isHorizontalStart);
      var rightBoundInfo = checkLineBoundCollision(line, rightLine, isHorizontalStart);
      var isAllVerticalBound = topBoundInfo.isBound && bottomBoundInfo.isBound;
      var isVerticalBound = topBoundInfo.isBound || bottomBoundInfo.isBound;
      var isAllHorizontalBound = leftBoundInfo.isBound && rightBoundInfo.isBound;
      var isHorizontalBound = leftBoundInfo.isBound || rightBoundInfo.isBound;
      var verticalOffset = maxOffset(topBoundInfo.offset, bottomBoundInfo.offset);
      var horizontalOffset = maxOffset(leftBoundInfo.offset, rightBoundInfo.offset);
      var offset = [0, 0];
      var isBound = false;
      var isAllBound = false;

      if (Math.abs(horizontalOffset) < Math.abs(verticalOffset)) {
        offset = [verticalOffset, 0];
        isBound = isVerticalBound;
        isAllBound = isAllVerticalBound;
      } else {
        offset = [0, horizontalOffset];
        isBound = isHorizontalBound;
        isAllBound = isAllHorizontalBound;
      }

      return {
        isAllBound: isAllBound,
        isVerticalBound: isVerticalBound,
        isHorizontalBound: isHorizontalBound,
        isBound: isBound,
        offset: offset
      };
    }

    function checkLineBoundCollision(line, boundLine, isStart, threshold, isRender) {
      var dot1 = line[0];
      var dot2 = line[1];
      var boundDot1 = boundLine[0];
      var boundDot2 = boundLine[1];
      var dy1 = getTinyDist(dot2[1] - dot1[1]);
      var dx1 = getTinyDist(dot2[0] - dot1[0]);
      var dy2 = getTinyDist(boundDot2[1] - boundDot1[1]);
      var dx2 = getTinyDist(boundDot2[0] - boundDot1[0]); // dx2 or dy2 is zero

      if (!dx2) {
        // vertical
        if (isRender && !dy1) {
          // 90deg
          return {
            isBound: false,
            offset: 0
          };
        } else if (dx1) {
          // const y = dy1 ? dy1 / dx1 * (boundDot1[0] - dot1[0]) + dot1[1] : dot1[1];
          var y = dy1 / dx1 * (boundDot1[0] - dot1[0]) + dot1[1]; // boundDot1[1] <= y  <= boundDot2[1]

          return checkInnerBoundDot(y, boundDot1[1], boundDot2[1], isStart, threshold);
        } else {
          var offset = boundDot1[0] - dot1[0];
          var isBound = Math.abs(offset) <= (threshold || 0);
          return {
            isBound: isBound,
            offset: isBound ? offset : 0
          };
        }
      } else if (!dy2) {
        // horizontal
        if (isRender && !dx1) {
          // 90deg
          return {
            isBound: false,
            offset: 0
          };
        } else if (dy1) {
          // y = a * (x - x1) + y1
          // x = (y - y1) / a + x1
          // const a = dy1 / dx1;
          // const x = dx1 ? (boundDot1[1] - dot1[1]) / a + dot1[0] : dot1[0];
          var x = (boundDot1[1] - dot1[1]) / (dy1 / dx1) + dot1[0]; // boundDot1[0] <= x && x <= boundDot2[0]

          return checkInnerBoundDot(x, boundDot1[0], boundDot2[0], isStart, threshold);
        } else {
          var offset = boundDot1[1] - dot1[1];
          var isBound = Math.abs(offset) <= (threshold || 0);
          return {
            isBound: isBound,
            offset: isBound ? offset : 0
          };
        }
      }

      return {
        isBound: false,
        offset: 0
      };
    }

    function getInnerBoundInfo(moveable, lines, center, datas) {
      return lines.map(function (_a) {
        var multiple = _a[0],
            pos1 = _a[1],
            pos2 = _a[2];

        var _b = checkInnerBound(moveable, [pos1, pos2], center),
            isBound = _b.isBound,
            offset = _b.offset,
            isVerticalBound = _b.isVerticalBound,
            isHorizontalBound = _b.isHorizontalBound;

        var sizeOffset = getDragDist({
          datas: datas,
          distX: offset[0],
          distY: offset[1]
        }).map(function (size, i) {
          return size * (multiple[i] ? 2 / multiple[i] : 0);
        });
        return {
          sign: multiple,
          isBound: isBound,
          isVerticalBound: isVerticalBound,
          isHorizontalBound: isHorizontalBound,
          isSnap: false,
          offset: sizeOffset
        };
      });
    }
    function getInnerBoundDragInfo(moveable, poses, datas) {
      var _a;

      var lines = getCheckSnapLines(poses, [0, 0], false).map(function (_a) {
        var sign = _a[0],
            pos1 = _a[1],
            pos2 = _a[2];
        return [sign.map(function (dir) {
          return Math.abs(dir) * 2;
        }), pos1, pos2];
      });
      var innerBoundInfo = getInnerBoundInfo(moveable, lines, getPosByDirection(poses, [0, 0]), datas);
      var widthOffsetInfo = getNearOffsetInfo(innerBoundInfo, 0);
      var heightOffsetInfo = getNearOffsetInfo(innerBoundInfo, 1);
      var verticalOffset = 0;
      var horizontalOffset = 0;
      var isVerticalBound = widthOffsetInfo.isVerticalBound || heightOffsetInfo.isVerticalBound;
      var isHorizontalBound = widthOffsetInfo.isHorizontalBound || heightOffsetInfo.isHorizontalBound;

      if (isVerticalBound || isHorizontalBound) {
        _a = getInverseDragDist({
          datas: datas,
          distX: -widthOffsetInfo.offset[0],
          distY: -heightOffsetInfo.offset[1]
        }), verticalOffset = _a[0], horizontalOffset = _a[1];
      }

      return {
        vertical: {
          isBound: isVerticalBound,
          offset: verticalOffset
        },
        horizontal: {
          isBound: isHorizontalBound,
          offset: horizontalOffset
        }
      };
    }
    function getCheckSnapLineDirections(direction, keepRatio) {
      var lineDirections = [];
      var x = direction[0];
      var y = direction[1];

      if (x && y) {
        lineDirections.push([[0, y * 2], direction, [-x, y]], [[x * 2, 0], direction, [x, -y]]);
      } else if (x) {
        // vertcal
        lineDirections.push([[x * 2, 0], [x, 1], [x, -1]]);

        if (keepRatio) {
          lineDirections.push([[0, -1], [x, -1], [-x, -1]], [[0, 1], [x, 1], [-x, 1]]);
        }
      } else if (y) {
        // horizontal
        lineDirections.push([[0, y * 2], [1, y], [-1, y]]);

        if (keepRatio) {
          lineDirections.push([[-1, 0], [-1, y], [-1, -y]], [[1, 0], [1, y], [1, -y]]);
        }
      } else {
        // [0, 0] to all direction
        lineDirections.push([[-1, 0], [-1, -1], [-1, 1]], [[1, 0], [1, -1], [1, 1]], [[0, -1], [-1, -1], [1, -1]], [[0, 1], [-1, 1], [1, 1]]);
      }

      return lineDirections;
    }
    function getCheckSnapLines(poses, direction, keepRatio) {
      return getCheckSnapLineDirections(direction, keepRatio).map(function (_a) {
        var sign = _a[0],
            dir1 = _a[1],
            dir2 = _a[2];
        return [sign, getPosByDirection(poses, dir1), getPosByDirection(poses, dir2)];
      });
    }

    function isBoundRotate(relativePoses, boundDots, center, rad) {
      var nextPoses = rad ? relativePoses.map(function (pos) {
        return rotate$1(pos, rad);
      }) : relativePoses;

      var dots = __spreadArrays$1([center], boundDots);

      return [[nextPoses[0], nextPoses[1]], [nextPoses[1], nextPoses[3]], [nextPoses[3], nextPoses[2]], [nextPoses[2], nextPoses[0]]].some(function (line, i) {
        return !isSameStartLine(dots, line);
      });
    }

    function getDistPointLine(_a) {
      // x = 0, y = 0
      // d = (ax + by + c) / root(a2 + b2)
      var pos1 = _a[0],
          pos2 = _a[1];
      var dx = pos2[0] - pos1[0];
      var dy = pos2[1] - pos1[1];

      if (!dx) {
        return Math.abs(pos1[0]);
      }

      if (!dy) {
        return Math.abs(pos1[1]);
      } // y - y1 = a(x - x1)
      // 0 = ax -y + -a * x1 + y1


      var a = dy / dx;
      return Math.abs((-a * pos1[0] + pos1[1]) / Math.sqrt(Math.pow(a, 2) + 1));
    }

    function solveReverseLine(_a) {
      var pos1 = _a[0],
          pos2 = _a[1];
      var dx = pos2[0] - pos1[0];
      var dy = pos2[1] - pos1[1];

      if (!dx) {
        return [pos1[0], 0];
      }

      if (!dy) {
        return [0, pos1[1]];
      }

      var a = dy / dx; // y - y1 = a (x  - x1)
      // y = ax - a * x1 + y1

      var b = -a * pos1[0] + pos1[1]; // y = ax + b = -1/a x
      // x = -b / (a + 1 / a)
      // y = b / (1 + 1 / a^2)

      return [-b / (a + 1 / a), b / (a * a + 1)];
    }

    function checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin, rotation) {
      var bounds = moveable.props.innerBounds;
      var rad = rotation * Math.PI / 180;

      if (!bounds) {
        return [];
      }

      var left = bounds.left,
          top = bounds.top,
          width = bounds.width,
          height = bounds.height;
      var relativeLeft = left - origin[0];
      var relativeRight = left + width - origin[0];
      var relativeTop = top - origin[1];
      var relativeBottom = top + height - origin[1];
      var dots = [[relativeLeft, relativeTop], [relativeRight, relativeTop], [relativeLeft, relativeBottom], [relativeRight, relativeBottom]];
      var center = getPosByDirection(nextPoses, [0, 0]);

      if (!isBoundRotate(nextPoses, dots, center, 0)) {
        return [];
      }

      var result = [];
      var dotInfos = dots.map(function (dot) {
        return [getDistSize(dot), getRad$1([0, 0], dot)];
      });
      [[nextPoses[0], nextPoses[1]], [nextPoses[1], nextPoses[3]], [nextPoses[3], nextPoses[2]], [nextPoses[2], nextPoses[0]]].forEach(function (line) {
        var lineRad = getRad$1([0, 0], solveReverseLine(line));
        var lineDist = getDistPointLine(line);
        result.push.apply(result, dotInfos.filter(function (_a) {
          var dotDist = _a[0];
          return dotDist && lineDist <= dotDist;
        }).map(function (_a) {
          var dotDist = _a[0],
              dotRad = _a[1];
          var distRad = Math.acos(dotDist ? lineDist / dotDist : 0);
          var nextRad1 = dotRad + distRad;
          var nextRad2 = dotRad - distRad;
          return [rad + nextRad1 - lineRad, rad + nextRad2 - lineRad];
        }).reduce(function (prev, cur) {
          prev.push.apply(prev, cur);
          return prev;
        }, []).filter(function (nextRad) {
          return !isBoundRotate(prevPoses, dots, center, nextRad);
        }).map(function (nextRad) {
          return throttle(nextRad * 180 / Math.PI, TINY_NUM);
        }));
      });
      return result;
    }
    function checkInnerBoundPoses(moveable) {
      var innerBounds = moveable.props.innerBounds;

      if (!innerBounds) {
        return {
          vertical: [],
          horizontal: []
        };
      }

      var _a = moveable.getRect(),
          pos1 = _a.pos1,
          pos2 = _a.pos2,
          pos3 = _a.pos3,
          pos4 = _a.pos4;

      var poses = [pos1, pos2, pos3, pos4];
      var center = getPosByDirection(poses, [0, 0]);
      var left = innerBounds.left,
          top = innerBounds.top,
          width = innerBounds.width,
          height = innerBounds.height;
      var leftLine = [[left, top], [left, top + height]];
      var topLine = [[left, top], [left + width, top]];
      var rightLine = [[left + width, top], [left + width, top + height]];
      var bottomLine = [[left, top + height], [left + width, top + height]];
      var lines = [[pos1, pos2], [pos2, pos4], [pos4, pos3], [pos3, pos1]];
      var horizontalPoses = [];
      var verticalPoses = [];
      var boundMap = {
        top: false,
        bottom: false,
        left: false,
        right: false
      };
      lines.forEach(function (line) {
        var _a = isStartLine(center, line),
            isHorizontalStart = _a.horizontal,
            isVerticalStart = _a.vertical; // test vertical


        var topBoundInfo = checkLineBoundCollision(line, topLine, isVerticalStart, 1, true);
        var bottomBoundInfo = checkLineBoundCollision(line, bottomLine, isVerticalStart, 1, true); // test horizontal

        var leftBoundInfo = checkLineBoundCollision(line, leftLine, isHorizontalStart, 1, true);
        var rightBoundInfo = checkLineBoundCollision(line, rightLine, isHorizontalStart, 1, true);

        if (topBoundInfo.isBound && !boundMap.top) {
          horizontalPoses.push(top);
          boundMap.top = true;
        }

        if (bottomBoundInfo.isBound && !boundMap.bottom) {
          horizontalPoses.push(top + height);
          boundMap.bottom = true;
        }

        if (leftBoundInfo.isBound && !boundMap.left) {
          verticalPoses.push(left);
          boundMap.left = true;
        }

        if (rightBoundInfo.isBound && !boundMap.right) {
          verticalPoses.push(left + width);
          boundMap.right = true;
        }
      });
      return {
        horizontal: horizontalPoses,
        vertical: verticalPoses
      };
    }

    function checkBoundPoses(bounds, verticalPoses, horizontalPoses) {
      var _a = bounds || {},
          _b = _a.left,
          left = _b === void 0 ? -Infinity : _b,
          _c = _a.top,
          top = _c === void 0 ? -Infinity : _c,
          _d = _a.right,
          right = _d === void 0 ? Infinity : _d,
          _e = _a.bottom,
          bottom = _e === void 0 ? Infinity : _e;

      var nextBounds = {
        left: left,
        top: top,
        right: right,
        bottom: bottom
      };
      return {
        vertical: checkBounds(nextBounds, verticalPoses, true),
        horizontal: checkBounds(nextBounds, horizontalPoses, false)
      };
    }
    function checkBoundKeepRatio(moveable, startPos, endPos) {
      var _a = moveable.props.bounds || {},
          _b = _a.left,
          left = _b === void 0 ? -Infinity : _b,
          _c = _a.top,
          top = _c === void 0 ? -Infinity : _c,
          _d = _a.right,
          right = _d === void 0 ? Infinity : _d,
          _e = _a.bottom,
          bottom = _e === void 0 ? Infinity : _e;

      var endX = endPos[0],
          endY = endPos[1];

      var _f = minus(endPos, startPos),
          dx = _f[0],
          dy = _f[1];

      if (Math.abs(dx) < TINY_NUM) {
        dx = 0;
      }

      if (Math.abs(dy) < TINY_NUM) {
        dy = 0;
      }

      var isBottom = dy > 0;
      var isRight = dx > 0;
      var verticalInfo = {
        isBound: false,
        offset: 0,
        pos: 0
      };
      var horizontalInfo = {
        isBound: false,
        offset: 0,
        pos: 0
      };

      if (dx === 0 && dy === 0) {
        return {
          vertical: verticalInfo,
          horizontal: horizontalInfo
        };
      } else if (dx === 0) {
        if (isBottom) {
          if (bottom < endY) {
            horizontalInfo.pos = bottom;
            horizontalInfo.offset = endY - bottom;
          }
        } else {
          if (top > endY) {
            horizontalInfo.pos = top;
            horizontalInfo.offset = endY - top;
          }
        }
      } else if (dy === 0) {
        if (isRight) {
          if (right < endX) {
            verticalInfo.pos = right;
            verticalInfo.offset = endX - right;
          }
        } else {
          if (left > endX) {
            verticalInfo.pos = left;
            verticalInfo.offset = endX - left;
          }
        }
      } else {
        // y - y1 = a * (x - x1)
        var a = dy / dx;
        var b = endPos[1] - a * endX;
        var y = 0;
        var x = 0;
        var isBound = false;

        if (isRight && right <= endX) {
          y = a * right + b;
          x = right;
          isBound = true;
        } else if (!isRight && endX <= left) {
          y = a * left + b;
          x = left;
          isBound = true;
        }

        if (isBound) {
          if (y < top || y > bottom) {
            isBound = false;
          }
        }

        if (!isBound) {
          if (isBottom && bottom <= endY) {
            y = bottom;
            x = (y - b) / a;
            isBound = true;
          } else if (!isBottom && endY <= top) {
            y = top;
            x = (y - b) / a;
            isBound = true;
          }
        }

        if (isBound) {
          verticalInfo.isBound = true;
          verticalInfo.pos = x;
          verticalInfo.offset = endX - x;
          horizontalInfo.isBound = true;
          horizontalInfo.pos = y;
          horizontalInfo.offset = endY - y;
        }
      }

      return {
        vertical: verticalInfo,
        horizontal: horizontalInfo
      };
    }

    function checkBounds(bounds, poses, isVertical) {
      // 0   [100 - 200]  300
      var startBoundPos = bounds[isVertical ? "left" : "top"];
      var endBoundPos = bounds[isVertical ? "right" : "bottom"]; // 450

      var minPos = Math.min.apply(Math, poses);
      var maxPos = Math.max.apply(Math, poses);
      var boundInfos = [];

      if (startBoundPos + 1 > minPos) {
        boundInfos.push({
          isBound: true,
          offset: minPos - startBoundPos,
          pos: startBoundPos
        });
      }

      if (endBoundPos - 1 < maxPos) {
        boundInfos.push({
          isBound: true,
          offset: maxPos - endBoundPos,
          pos: endBoundPos
        });
      }

      if (!boundInfos.length) {
        boundInfos.push({
          isBound: false,
          offset: 0,
          pos: 0
        });
      }

      return boundInfos.sort(function (a, b) {
        return Math.abs(b.offset) - Math.abs(a.offset);
      });
    }

    function isBoundRotate$1(relativePoses, boundRect, rad) {
      var nextPoses = rad ? relativePoses.map(function (pos) {
        return rotate$1(pos, rad);
      }) : relativePoses;
      return nextPoses.some(function (pos) {
        return pos[0] < boundRect.left && Math.abs(pos[0] - boundRect.left) > 0.1 || pos[0] > boundRect.right && Math.abs(pos[0] - boundRect.right) > 0.1 || pos[1] < boundRect.top && Math.abs(pos[1] - boundRect.top) > 0.1 || pos[1] > boundRect.bottom && Math.abs(pos[1] - boundRect.bottom) > 0.1;
      });
    }
    function boundRotate(vec, boundPos, index) {
      var r = getDistSize(vec);
      var nextPos = Math.sqrt(r * r - boundPos * boundPos) || 0;
      return [nextPos, -nextPos].sort(function (a, b) {
        return Math.abs(a - vec[index ? 0 : 1]) - Math.abs(b - vec[index ? 0 : 1]);
      }).map(function (pos) {
        return getRad$1([0, 0], index ? [pos, boundPos] : [boundPos, pos]);
      });
    }
    function checkRotateBounds(moveable, prevPoses, nextPoses, origin, rotation) {
      var bounds = moveable.props.bounds;
      var rad = rotation * Math.PI / 180;

      if (!bounds) {
        return [];
      }

      var _a = bounds.left,
          left = _a === void 0 ? -Infinity : _a,
          _b = bounds.top,
          top = _b === void 0 ? -Infinity : _b,
          _c = bounds.right,
          right = _c === void 0 ? Infinity : _c,
          _d = bounds.bottom,
          bottom = _d === void 0 ? Infinity : _d;
      var relativeLeft = left - origin[0];
      var relativeRight = right - origin[0];
      var relativeTop = top - origin[1];
      var relativeBottom = bottom - origin[1];
      var boundRect = {
        left: relativeLeft,
        top: relativeTop,
        right: relativeRight,
        bottom: relativeBottom
      };

      if (!isBoundRotate$1(nextPoses, boundRect, 0)) {
        return [];
      }

      var result = [];
      [[relativeLeft, 0], [relativeRight, 0], [relativeTop, 1], [relativeBottom, 1]].forEach(function (_a, i) {
        var boundPos = _a[0],
            index = _a[1];
        nextPoses.forEach(function (nextPos) {
          var relativeRad1 = getRad$1([0, 0], nextPos);
          result.push.apply(result, boundRotate(nextPos, boundPos, index).map(function (relativeRad2) {
            return rad + relativeRad2 - relativeRad1;
          }).filter(function (nextRad) {
            return !isBoundRotate$1(prevPoses, boundRect, nextRad);
          }).map(function (nextRad) {
            return throttle(nextRad * 180 / Math.PI, TINY_NUM);
          }));
        });
      });
      return result;
    }

    function caculateContainerPos(rootMatrix, containerRect, n) {
      var clientPos = caculatePosition(rootMatrix, [containerRect.clientLeft, containerRect.clientTop], n);
      return [containerRect.left + clientPos[0], containerRect.top + clientPos[1]];
    }
    function snapStart(moveable) {
      var state = moveable.state;

      if (state.guidelines && state.guidelines.length) {
        return;
      }

      var _a = moveable.props,
          _b = _a.horizontalGuidelines,
          horizontalGuidelines = _b === void 0 ? [] : _b,
          _c = _a.verticalGuidelines,
          verticalGuidelines = _c === void 0 ? [] : _c,
          _d = _a.elementGuidelines,
          elementGuidelines = _d === void 0 ? [] : _d,
          bounds = _a.bounds,
          innerBounds = _a.innerBounds,
          snapCenter = _a.snapCenter;

      if (!innerBounds && !bounds && !horizontalGuidelines.length && !verticalGuidelines.length && !elementGuidelines.length) {
        return;
      }

      var containerClientRect = state.containerClientRect,
          _e = state.targetClientRect,
          clientTop = _e.top,
          clientLeft = _e.left,
          rootMatrix = state.rootMatrix,
          is3d = state.is3d;
      var n = is3d ? 4 : 3;

      var _f = caculateContainerPos(rootMatrix, containerClientRect, n),
          containerLeft = _f[0],
          containerTop = _f[1];

      var poses = getAbsolutePosesByState(state);
      var targetLeft = Math.min.apply(Math, poses.map(function (pos) {
        return pos[0];
      }));
      var targetTop = Math.min.apply(Math, poses.map(function (pos) {
        return pos[1];
      }));

      var _g = minus([targetLeft, targetTop], caculateInversePosition(rootMatrix, [clientLeft - containerLeft, clientTop - containerTop], n)).map(function (pos) {
        return roundSign(pos);
      }),
          distLeft = _g[0],
          distTop = _g[1];

      var guidelines = [];
      elementGuidelines.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var left = rect.left - containerLeft;
        var top = rect.top - containerTop;
        var bottom = top + rect.height;
        var right = left + rect.width;

        var _a = caculateInversePosition(rootMatrix, [left, top], n),
            elementLeft = _a[0],
            elementTop = _a[1];

        var _b = caculateInversePosition(rootMatrix, [right, bottom], n),
            elementRight = _b[0],
            elementBottom = _b[1];

        var width = elementRight - elementLeft;
        var height = elementBottom - elementTop;
        var sizes = [width, height];
        guidelines.push({
          type: "vertical",
          element: el,
          pos: [throttle(elementLeft + distLeft, 0.1), elementTop],
          size: height,
          sizes: sizes
        });
        guidelines.push({
          type: "vertical",
          element: el,
          pos: [throttle(elementRight + distLeft, 0.1), elementTop],
          size: height,
          sizes: sizes
        });
        guidelines.push({
          type: "horizontal",
          element: el,
          pos: [elementLeft, throttle(elementTop + distTop, 0.1)],
          size: width,
          sizes: sizes
        });
        guidelines.push({
          type: "horizontal",
          element: el,
          pos: [elementLeft, throttle(elementBottom + distTop, 0.1)],
          size: width,
          sizes: sizes
        });

        if (snapCenter) {
          guidelines.push({
            type: "vertical",
            element: el,
            pos: [throttle((elementLeft + elementRight) / 2 + distLeft, 0.1), elementTop],
            size: height,
            sizes: sizes,
            center: true
          });
          guidelines.push({
            type: "horizontal",
            element: el,
            pos: [elementLeft, throttle((elementTop + elementBottom) / 2 + distTop, 0.1)],
            size: width,
            sizes: sizes,
            center: true
          });
        }
      });
      state.guidelines = guidelines;
      state.enableSnap = true;
    }
    function hasGuidelines(moveable, ableName) {
      var _a = moveable.props,
          snappable = _a.snappable,
          bounds = _a.bounds,
          innerBounds = _a.innerBounds,
          verticalGuidelines = _a.verticalGuidelines,
          horizontalGuidelines = _a.horizontalGuidelines,
          _b = moveable.state,
          guidelines = _b.guidelines,
          enableSnap = _b.enableSnap;

      if (!snappable || !enableSnap || ableName && snappable !== true && snappable.indexOf(ableName) < 0) {
        return false;
      }

      if (bounds || innerBounds || guidelines && guidelines.length || verticalGuidelines && verticalGuidelines.length || horizontalGuidelines && horizontalGuidelines.length) {
        return true;
      }

      return false;
    }

    function solveNextOffset(pos1, pos2, offset, isVertical, datas) {
      var sizeOffset = solveEquation(pos1, pos2, offset, isVertical);

      if (!sizeOffset) {
        return [0, 0];
      }

      var _a = getDragDist({
        datas: datas,
        distX: sizeOffset[0],
        distY: sizeOffset[1]
      }),
          widthOffset = _a[0],
          heightOffset = _a[1];

      return [widthOffset, heightOffset];
    }

    function getNextFixedPoses(matrix, width, height, fixedPos, direction, is3d) {
      var nextPoses = caculatePoses(matrix, width, height, is3d ? 4 : 3);
      var nextPos = getPosByReverseDirection(nextPoses, direction);
      return getAbsolutePoses(nextPoses, minus(fixedPos, nextPos));
    }

    function getSnapBoundOffset(boundInfo, snapInfo) {
      if (boundInfo.isBound) {
        return boundInfo.offset;
      } else if (snapInfo.isSnap) {
        return snapInfo.offset;
      }

      return 0;
    }

    function getSnapBound(boundInfo, snapInfo) {
      if (boundInfo.isBound) {
        return boundInfo.offset;
      } else if (snapInfo.isSnap) {
        return getNearestSnapGuidelineInfo(snapInfo).offset;
      }

      return 0;
    }

    function checkSnapBoundsKeepRatio(moveable, startPos, endPos, isRequest) {
      var _a = checkBoundKeepRatio(moveable, startPos, endPos),
          horizontalBoundInfo = _a.horizontal,
          verticalBoundInfo = _a.vertical;

      var _b = isRequest ? {
        horizontal: {
          isSnap: false
        },
        vertical: {
          isSnap: false
        }
      } : checkSnapKeepRatio(moveable, startPos, endPos),
          horizontalSnapInfo = _b.horizontal,
          verticalSnapInfo = _b.vertical;

      var horizontalOffset = getSnapBoundOffset(horizontalBoundInfo, horizontalSnapInfo);
      var verticalOffset = getSnapBoundOffset(verticalBoundInfo, verticalSnapInfo);
      var horizontalDist = Math.abs(horizontalOffset);
      var verticalDist = Math.abs(verticalOffset);
      return {
        horizontal: {
          isBound: horizontalBoundInfo.isBound,
          isSnap: horizontalSnapInfo.isSnap,
          offset: horizontalOffset,
          dist: horizontalDist
        },
        vertical: {
          isBound: verticalBoundInfo.isBound,
          isSnap: verticalSnapInfo.isSnap,
          offset: verticalOffset,
          dist: verticalDist
        }
      };
    }
    function checkMoveableSnapBounds(moveable, isRequest, poses, boundPoses) {
      if (boundPoses === void 0) {
        boundPoses = poses;
      }

      var _a = checkBoundPoses(moveable.props.bounds, boundPoses.map(function (pos) {
        return pos[0];
      }), boundPoses.map(function (pos) {
        return pos[1];
      })),
          horizontalBoundInfos = _a.horizontal,
          verticalBoundInfos = _a.vertical;

      var _b = isRequest ? {
        horizontal: {
          isSnap: false,
          index: -1
        },
        vertical: {
          isSnap: false,
          index: -1
        }
      } : checkMoveableSnapPoses(moveable, poses.map(function (pos) {
        return pos[0];
      }), poses.map(function (pos) {
        return pos[1];
      })),
          horizontalSnapInfo = _b.horizontal,
          verticalSnapInfo = _b.vertical;

      var horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
      var verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
      var horizontalDist = Math.abs(horizontalOffset);
      var verticalDist = Math.abs(verticalOffset);
      return {
        horizontal: {
          isBound: horizontalBoundInfos[0].isBound,
          isSnap: horizontalSnapInfo.isSnap,
          snapIndex: horizontalSnapInfo.index,
          offset: horizontalOffset,
          dist: horizontalDist,
          bounds: horizontalBoundInfos,
          snap: horizontalSnapInfo
        },
        vertical: {
          isBound: verticalBoundInfos[0].isBound,
          isSnap: verticalSnapInfo.isSnap,
          snapIndex: verticalSnapInfo.index,
          offset: verticalOffset,
          dist: verticalDist,
          bounds: verticalBoundInfos,
          snap: verticalSnapInfo
        }
      };
    }
    function checkSnapBounds(guideines, bounds, posesX, posesY, options) {
      if (options === void 0) {
        options = {};
      }

      var _a = checkBoundPoses(bounds, posesX, posesY),
          horizontalBoundInfos = _a.horizontal,
          verticalBoundInfos = _a.vertical;

      var _b = options.isRequest ? {
        horizontal: {
          isSnap: false,
          index: -1
        },
        vertical: {
          isSnap: false,
          index: -1
        }
      } : checkSnapPoses(guideines, posesX, posesY, options),
          horizontalSnapInfo = _b.horizontal,
          verticalSnapInfo = _b.vertical;

      var horizontalOffset = getSnapBound(horizontalBoundInfos[0], horizontalSnapInfo);
      var verticalOffset = getSnapBound(verticalBoundInfos[0], verticalSnapInfo);
      var horizontalDist = Math.abs(horizontalOffset);
      var verticalDist = Math.abs(verticalOffset);
      return {
        horizontal: {
          isBound: horizontalBoundInfos[0].isBound,
          isSnap: horizontalSnapInfo.isSnap,
          snapIndex: horizontalSnapInfo.index,
          offset: horizontalOffset,
          dist: horizontalDist,
          bounds: horizontalBoundInfos,
          snap: horizontalSnapInfo
        },
        vertical: {
          isBound: verticalBoundInfos[0].isBound,
          isSnap: verticalSnapInfo.isSnap,
          snapIndex: verticalSnapInfo.index,
          offset: verticalOffset,
          dist: verticalDist,
          bounds: verticalBoundInfos,
          snap: verticalSnapInfo
        }
      };
    }
    function normalized(value) {
      return value ? value / Math.abs(value) : 0;
    }
    function checkMaxBounds(moveable, poses, direction, fixedPos, datas) {
      var fixedDirection = [-direction[0], -direction[1]];
      var _a = moveable.state,
          width = _a.width,
          height = _a.height;
      var bounds = moveable.props.bounds;
      var maxWidth = Infinity;
      var maxHeight = Infinity;

      if (bounds) {
        var directions = [[direction[0], -direction[1]], [-direction[0], direction[1]]];
        var _b = bounds.left,
            left_1 = _b === void 0 ? -Infinity : _b,
            _c = bounds.top,
            top_1 = _c === void 0 ? -Infinity : _c,
            _d = bounds.right,
            right_1 = _d === void 0 ? Infinity : _d,
            _e = bounds.bottom,
            bottom_1 = _e === void 0 ? Infinity : _e;
        directions.forEach(function (otherDirection) {
          var isCheckVertical = otherDirection[0] !== fixedDirection[0];
          var isCheckHorizontal = otherDirection[1] !== fixedDirection[1];
          var otherPos = getPosByDirection(poses, otherDirection);
          var verticalDirection = normalized(otherDirection[1] - fixedDirection[1]);
          var horizontalDirection = normalized(otherDirection[0] - fixedDirection[0]);
          var deg = getRad$1(fixedPos, otherPos) * 360 / Math.PI;

          if (isCheckHorizontal) {
            var nextOtherPos = otherPos.slice();

            if (Math.abs(deg - 360) < 2 || Math.abs(deg - 180) < 2) {
              nextOtherPos[1] = fixedPos[1];
            }

            var _a = solveNextOffset(fixedPos, nextOtherPos, (fixedPos[1] < otherPos[1] ? bottom_1 : top_1) - otherPos[1], false, datas),
                heightOffset = _a[1];

            if (!isNaN(heightOffset)) {
              maxHeight = height + verticalDirection * heightOffset;
            }
          }

          if (isCheckVertical) {
            var nextOtherPos = otherPos.slice();

            if (Math.abs(deg - 90) < 2 || Math.abs(deg - 270) < 2) {
              nextOtherPos[0] = fixedPos[0];
            }

            var widthOffset = solveNextOffset(fixedPos, nextOtherPos, (fixedPos[0] < otherPos[0] ? right_1 : left_1) - otherPos[0], true, datas)[0];

            if (!isNaN(widthOffset)) {
              maxWidth = width + horizontalDirection * widthOffset;
            }
          }
        });
      }

      return {
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    }

    function getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas) {
      return directions.map(function (_a) {
        var startDirection = _a[0],
            endDirection = _a[1];
        var otherStartPos = getPosByDirection(poses, startDirection);
        var otherEndPos = getPosByDirection(poses, endDirection);
        var snapBoundInfo = keepRatio ? checkSnapBoundsKeepRatio(moveable, otherStartPos, otherEndPos, isRequest) : checkMoveableSnapBounds(moveable, isRequest, [otherEndPos]);
        var _b = snapBoundInfo.horizontal,
            otherHorizontalDist = _b.dist,
            otherHorizontalOffset = _b.offset,
            isOtherHorizontalBound = _b.isBound,
            isOtherHorizontalSnap = _b.isSnap,
            _c = snapBoundInfo.vertical,
            otherVerticalDist = _c.dist,
            otherVerticalOffset = _c.offset,
            isOtherVerticalBound = _c.isBound,
            isOtherVerticalSnap = _c.isSnap;
        var multiple = minus(endDirection, startDirection);

        if (!otherVerticalOffset && !otherHorizontalOffset) {
          return {
            isBound: isOtherVerticalBound || isOtherHorizontalBound,
            isSnap: isOtherVerticalSnap || isOtherHorizontalSnap,
            sign: multiple,
            offset: [0, 0]
          };
        }

        var isVertical = otherHorizontalDist < otherVerticalDist;
        var sizeOffset = solveNextOffset(otherStartPos, otherEndPos, -(isVertical ? otherVerticalOffset : otherHorizontalOffset), isVertical, datas).map(function (size, i) {
          return size * (multiple[i] ? 2 / multiple[i] : 0);
        });
        return {
          sign: multiple,
          isBound: isVertical ? isOtherVerticalBound : isOtherHorizontalBound,
          isSnap: isVertical ? isOtherVerticalSnap : isOtherHorizontalSnap,
          offset: sizeOffset
        };
      });
    }

    function getCheckSnapDirections(direction, keepRatio) {
      var directions = [];
      var fixedDirection = [-direction[0], -direction[1]];

      if (direction[0] && direction[1]) {
        directions.push([fixedDirection, [direction[0], -direction[1]]], [fixedDirection, [-direction[0], direction[1]]]);

        if (keepRatio) {
          // pass two direction condition
          directions.push([fixedDirection, direction]);
        }
      } else if (direction[0]) {
        // vertcal
        if (keepRatio) {
          directions.push([fixedDirection, [fixedDirection[0], -1]], [fixedDirection, [fixedDirection[0], 1]], [fixedDirection, [direction[0], -1]], [fixedDirection, direction], [fixedDirection, [direction[0], 1]]);
        } else {
          directions.push([[fixedDirection[0], -1], [direction[0], -1]], [[fixedDirection[0], 0], [direction[0], 0]], [[fixedDirection[0], 1], [direction[0], 1]]);
        }
      } else if (direction[1]) {
        // horizontal
        if (keepRatio) {
          directions.push([fixedDirection, [-1, fixedDirection[1]]], [fixedDirection, [1, fixedDirection[1]]], [fixedDirection, [-1, direction[1]]], [fixedDirection, [1, direction[1]]], [fixedDirection, direction]);
        } else {
          directions.push([[-1, fixedDirection[1]], [-1, direction[1]]], [[0, fixedDirection[1]], [0, direction[1]]], [[1, fixedDirection[1]], [1, direction[1]]]);
        }
      } else {
        // [0, 0] to all direction
        directions.push([fixedDirection, [1, 0]], [fixedDirection, [-1, 0]], [fixedDirection, [0, -1]], [fixedDirection, [0, 1]], [[1, 0], [1, -1]], [[1, 0], [1, 1]], [[0, 1], [1, 1]], [[0, 1], [-1, 1]], [[-1, 0], [-1, -1]], [[-1, 0], [-1, 1]], [[0, -1], [1, -1]], [[0, -1], [-1, -1]]);
      }

      return directions;
    }
    function getSizeOffsetInfo(moveable, poses, direction, keepRatio, isRequest, datas) {
      var directions = getCheckSnapDirections(direction, keepRatio);
      var lines = getCheckSnapLines(poses, direction, keepRatio);

      var offsets = __spreadArrays$1(getSnapBoundInfo(moveable, poses, directions, keepRatio, isRequest, datas), getInnerBoundInfo(moveable, lines, getPosByDirection(poses, [0, 0]), datas));

      var widthOffsetInfo = getNearOffsetInfo(offsets, 0);
      var heightOffsetInfo = getNearOffsetInfo(offsets, 1);
      return {
        width: {
          isBound: widthOffsetInfo.isBound,
          offset: widthOffsetInfo.offset[0]
        },
        height: {
          isBound: heightOffsetInfo.isBound,
          offset: heightOffsetInfo.offset[1]
        }
      };
    }
    function recheckSizeByTwoDirection(moveable, poses, width, height, maxWidth, maxHeight, direction, isRequest, datas) {
      var snapPos = getPosByDirection(poses, direction);

      var _a = checkMoveableSnapBounds(moveable, isRequest, [snapPos]),
          horizontalOffset = _a.horizontal.offset,
          verticalOffset = _a.vertical.offset;

      if (verticalOffset || horizontalOffset) {
        var _b = getDragDist({
          datas: datas,
          distX: -verticalOffset,
          distY: -horizontalOffset
        }),
            nextWidthOffset = _b[0],
            nextHeightOffset = _b[1];

        var nextWidth = Math.min(maxWidth || Infinity, width + direction[0] * nextWidthOffset);
        var nextHeight = Math.min(maxHeight || Infinity, height + direction[1] * nextHeightOffset);
        return [nextWidth - width, nextHeight - height];
      }

      return [0, 0];
    }
    function checkSizeDist(moveable, getNextPoses, width, height, direction, fixedPos, isRequest, datas) {
      var poses = getAbsolutePosesByState(moveable.state);
      var keepRatio = moveable.props.keepRatio;
      var widthOffset = 0;
      var heightOffset = 0;

      for (var i = 0; i < 2; ++i) {
        var nextPoses = getNextPoses(widthOffset, heightOffset);

        var _a = getSizeOffsetInfo(moveable, nextPoses, direction, keepRatio, isRequest, datas),
            widthOffsetInfo = _a.width,
            heightOffsetInfo = _a.height;

        var isWidthBound = widthOffsetInfo.isBound;
        var isHeightBound = heightOffsetInfo.isBound;
        var nextWidthOffset = widthOffsetInfo.offset;
        var nextHeightOffset = heightOffsetInfo.offset;

        if (i === 1) {
          if (!isWidthBound) {
            nextWidthOffset = 0;
          }

          if (!isHeightBound) {
            nextHeightOffset = 0;
          }
        }

        if (i === 0 && isRequest && !isWidthBound && !isHeightBound) {
          return [0, 0];
        }

        if (keepRatio) {
          var widthDist = Math.abs(nextWidthOffset) * (width ? 1 / width : 1);
          var heightDist = Math.abs(nextHeightOffset) * (height ? 1 / height : 1);
          var isGetWidthOffset = isWidthBound && isHeightBound ? widthDist < heightDist : isHeightBound || !isWidthBound && widthDist < heightDist; // height * widthOffset = width * heighOffset

          if (isGetWidthOffset) {
            // width : height = ? : heightOffset
            nextWidthOffset = width * nextHeightOffset / height;
          } else {
            // width : height = widthOffset : ?
            nextHeightOffset = height * nextWidthOffset / width;
          }
        }

        widthOffset += nextWidthOffset;
        heightOffset += nextHeightOffset;
      }

      if (direction[0] && direction[1]) {
        var _b = checkMaxBounds(moveable, poses, direction, fixedPos, datas),
            maxWidth = _b.maxWidth,
            maxHeight = _b.maxHeight;

        var _c = recheckSizeByTwoDirection(moveable, getNextPoses(widthOffset, heightOffset), width + widthOffset, height + heightOffset, maxWidth, maxHeight, direction, isRequest, datas),
            nextWidthOffset = _c[0],
            nextHeightOffset = _c[1];

        widthOffset += nextWidthOffset;
        heightOffset += nextHeightOffset;
      }

      return [widthOffset, heightOffset];
    }
    function checkSnapRotate(moveable, rect, origin, rotation) {
      if (!hasGuidelines(moveable, "rotatable")) {
        return rotation;
      }

      var pos1 = rect.pos1,
          pos2 = rect.pos2,
          pos3 = rect.pos3,
          pos4 = rect.pos4;
      var rad = rotation * Math.PI / 180;
      var prevPoses = [pos1, pos2, pos3, pos4].map(function (pos) {
        return minus(pos, origin);
      });
      var nextPoses = prevPoses.map(function (pos) {
        return rotate$1(pos, rad);
      });

      var result = __spreadArrays$1(checkRotateBounds(moveable, prevPoses, nextPoses, origin, rotation), checkRotateInnerBounds(moveable, prevPoses, nextPoses, origin, rotation));

      result.sort(function (a, b) {
        return Math.abs(a - rotation) - Math.abs(b - rotation);
      });

      if (result.length) {
        return result[0];
      } else {
        return rotation;
      }
    }
    function checkSnapSize(moveable, width, height, direction, fixedPos, isRequest, datas) {
      if (!hasGuidelines(moveable, "resizable")) {
        return [0, 0];
      }

      var _a = moveable.state,
          allMatrix = _a.allMatrix,
          is3d = _a.is3d;
      return checkSizeDist(moveable, function (widthOffset, heightOffset) {
        return getNextFixedPoses(allMatrix, width + widthOffset, height + heightOffset, fixedPos, direction, is3d);
      }, width, height, direction, fixedPos, isRequest, datas);
    }
    function checkSnapScale(moveable, scale, direction, fixedPos, isRequest, datas) {
      var width = datas.width,
          height = datas.height;

      if (!hasGuidelines(moveable, "scalable")) {
        return [0, 0];
      }

      var is3d = datas.is3d;
      var sizeDist = checkSizeDist(moveable, function (widthOffset, heightOffset) {
        return getNextFixedPoses(scaleMatrix(datas, plus(scale, [widthOffset / width, heightOffset / height])), width, height, fixedPos, direction, is3d);
      }, width, height, direction, fixedPos, isRequest, datas);
      return [sizeDist[0] / width, sizeDist[1] / height];
    }
    function solveEquation(pos1, pos2, snapOffset, isVertical) {
      var dx = pos2[0] - pos1[0];
      var dy = pos2[1] - pos1[1];

      if (Math.abs(dx) < TINY_NUM) {
        dx = 0;
      }

      if (Math.abs(dy) < TINY_NUM) {
        dy = 0;
      }

      if (!dx) {
        // y = 0 * x + b
        // only horizontal
        if (!isVertical) {
          return [0, snapOffset];
        }

        return [0, 0];
      }

      if (!dy) {
        // only vertical
        if (isVertical) {
          return [snapOffset, 0];
        }

        return [0, 0];
      } // y = ax + b


      var a = dy / dx;
      var b = pos1[1] - a * pos1[0];

      if (isVertical) {
        // y = a * x + b
        var y = a * (pos2[0] + snapOffset) + b;
        return [snapOffset, y - pos2[1]];
      } else {
        // x = (y - b) / a
        var x = (pos2[1] + snapOffset - b) / a;
        return [x - pos2[0], snapOffset];
      }
    }
    function startCheckSnapDrag(moveable, datas) {
      datas.absolutePoses = getAbsolutePosesByState(moveable.state);
    }
    function checkThrottleDragRotate(throttleDragRotate, _a, _b, _c, _d) {
      var distX = _a[0],
          distY = _a[1];
      var isVerticalBound = _b[0],
          isHorizontalBound = _b[1];
      var isVerticalSnap = _c[0],
          isHorizontalSnap = _c[1];
      var verticalOffset = _d[0],
          horizontalOffset = _d[1];
      var offsetX = -verticalOffset;
      var offsetY = -horizontalOffset;

      if (throttleDragRotate && distX && distY) {
        offsetX = 0;
        offsetY = 0;
        var adjustPoses = [];

        if (isVerticalBound && isHorizontalBound) {
          adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
        } else if (isVerticalBound) {
          adjustPoses.push([verticalOffset, 0]);
        } else if (isHorizontalBound) {
          adjustPoses.push([0, horizontalOffset]);
        } else if (isVerticalSnap && isHorizontalSnap) {
          adjustPoses.push([0, horizontalOffset], [verticalOffset, 0]);
        } else if (isVerticalSnap) {
          adjustPoses.push([verticalOffset, 0]);
        } else if (isHorizontalSnap) {
          adjustPoses.push([0, horizontalOffset]);
        }

        if (adjustPoses.length) {
          adjustPoses.sort(function (a, b) {
            return getDistSize(minus([distX, distY], a)) - getDistSize(minus([distX, distY], b));
          });
          var adjustPos = adjustPoses[0];

          if (adjustPos[0] && Math.abs(distX) > TINY_NUM) {
            offsetX = -adjustPos[0];
            offsetY = distY * Math.abs(distX + offsetX) / Math.abs(distX) - distY;
          } else if (adjustPos[1] && Math.abs(distY) > TINY_NUM) {
            var prevDistY = distY;
            offsetY = -adjustPos[1];
            offsetX = distX * Math.abs(distY + offsetY) / Math.abs(prevDistY) - distX;
          }

          if (throttleDragRotate && isHorizontalBound && isVerticalBound) {
            if (Math.abs(offsetX) > TINY_NUM && Math.abs(offsetX) < Math.abs(verticalOffset)) {
              var scale = Math.abs(verticalOffset) / Math.abs(offsetX);
              offsetX *= scale;
              offsetY *= scale;
            } else if (Math.abs(offsetY) > TINY_NUM && Math.abs(offsetY) < Math.abs(horizontalOffset)) {
              var scale = Math.abs(horizontalOffset) / Math.abs(offsetY);
              offsetX *= scale;
              offsetY *= scale;
            } else {
              offsetX = maxOffset(-verticalOffset, offsetX);
              offsetY = maxOffset(-horizontalOffset, offsetY);
            }
          }
        }
      } else {
        offsetX = distX || isVerticalBound ? -verticalOffset : 0;
        offsetY = distY || isHorizontalBound ? -horizontalOffset : 0;
      }

      return [offsetX, offsetY];
    }
    function checkSnapDrag(moveable, distX, distY, throttleDragRotate, isRequest, datas) {
      if (!hasGuidelines(moveable, "draggable")) {
        return [{
          isSnap: false,
          isBound: false,
          offset: 0
        }, {
          isSnap: false,
          isBound: false,
          offset: 0
        }];
      }

      var poses = getAbsolutePoses(datas.absolutePoses, [distX, distY]);

      var _a = getRect(poses),
          left = _a.left,
          right = _a.right,
          top = _a.top,
          bottom = _a.bottom;

      var snapCenter = moveable.props.snapCenter;
      var snapPoses = [[left, top], [right, top], [left, bottom], [right, bottom]];

      if (snapCenter) {
        snapPoses.push([(left + right) / 2, (top + bottom) / 2]);
      }

      var _b = checkMoveableSnapBounds(moveable, isRequest, snapPoses, poses),
          verticalSnapBoundInfo = _b.vertical,
          horizontalSnapBoundInfo = _b.horizontal;

      var _c = getInnerBoundDragInfo(moveable, poses, datas),
          verticalInnerBoundInfo = _c.vertical,
          horizontalInnerBoundInfo = _c.horizontal;

      var isVerticalSnap = verticalSnapBoundInfo.isSnap;
      var isHorizontalSnap = horizontalSnapBoundInfo.isSnap;
      var isVerticalBound = verticalSnapBoundInfo.isBound || verticalInnerBoundInfo.isBound;
      var isHorizontalBound = horizontalSnapBoundInfo.isBound || horizontalInnerBoundInfo.isBound;
      var verticalOffset = maxOffset(verticalSnapBoundInfo.offset, verticalInnerBoundInfo.offset);
      var horizontalOffset = maxOffset(horizontalSnapBoundInfo.offset, horizontalInnerBoundInfo.offset);

      var _d = checkThrottleDragRotate(throttleDragRotate, [distX, distY], [isVerticalBound, isHorizontalBound], [isVerticalSnap, isHorizontalSnap], [verticalOffset, horizontalOffset]),
          offsetX = _d[0],
          offsetY = _d[1];

      return [{
        isBound: isVerticalBound,
        isSnap: isVerticalSnap,
        offset: offsetX
      }, {
        isBound: isHorizontalBound,
        isSnap: isHorizontalSnap,
        offset: offsetY
      }];
    }

    function getSnapGuidelines(posInfos) {
      var guidelines = [];
      posInfos.forEach(function (posInfo) {
        posInfo.guidelineInfos.forEach(function (_a) {
          var guideline = _a.guideline;

          if (guidelines.indexOf(guideline) > -1) {
            return;
          }

          guidelines.push(guideline);
        });
      });
      return guidelines;
    }

    function getElementGuidelineDist(elementPos, elementSize, targetPos, targetSize) {
      // relativePos < 0  => element(l)  ---  (r)target
      // relativePos > 0  => target(l)   ---  (r)element
      var relativePos = elementPos - targetPos;
      var startPos = relativePos < 0 ? relativePos + elementSize : targetSize;
      var endPos = relativePos < 0 ? 0 : relativePos;
      var size = endPos - startPos;
      return {
        size: size,
        pos: startPos
      };
    }

    function groupByElementGuidelines(guidelines, clientPos, size, index) {
      var groupInfos = [];
      var group = groupBy(guidelines.filter(function (_a) {
        var element = _a.element,
            gap = _a.gap;
        return element && !gap;
      }), function (_a) {
        var element = _a.element,
            pos = _a.pos;
        var elementPos = pos[index];
        var sign = Math.min(0, elementPos - clientPos) < 0 ? -1 : 1;
        var groupKey = sign + "_" + pos[index ? 0 : 1];
        var groupInfo = find$1(groupInfos, function (_a) {
          var groupElement = _a[0],
              groupPos = _a[1];
          return element === groupElement && elementPos === groupPos;
        });

        if (groupInfo) {
          return groupInfo[2];
        }

        groupInfos.push([element, elementPos, groupKey]);
        return groupKey;
      });
      group.forEach(function (elementGuidelines) {
        elementGuidelines.sort(function (a, b) {
          var result = getElementGuidelineDist(a.pos[index], a.size, clientPos, size).size - getElementGuidelineDist(b.pos[index], a.size, clientPos, size).size;
          return result || a.pos[index ? 0 : 1] - b.pos[index ? 0 : 1];
        });
      });
      return group;
    }

    function renderElementGroup(group, _a, minPos, clientPos, clientSize, targetPos, snapThreshold, isDisplaySnapDigit, snapDigit, index, snapDistFormat, React) {
      var directionName = _a[0],
          posName1 = _a[1],
          posName2 = _a[2],
          sizeName = _a[3];
      return flat$1(group.map(function (elementGuidelines, i) {
        var isFirstRenderSize = true;
        return elementGuidelines.map(function (_a, j) {
          var _b;

          var pos = _a.pos,
              size = _a.size;

          var _c = getElementGuidelineDist(pos[index], size, clientPos, clientSize),
              linePos = _c.pos,
              lineSize = _c.size;

          if (lineSize < snapThreshold) {
            return null;
          }

          var isRenderSize = isFirstRenderSize;
          isFirstRenderSize = false;
          var snapSize = isDisplaySnapDigit && isRenderSize ? parseFloat(lineSize.toFixed(snapDigit)) : 0;
          return React.createElement("div", {
            className: prefix("line", directionName, "guideline", "dashed"),
            "data-size": snapSize > 0 ? snapDistFormat(snapSize) : "",
            key: directionName + "LinkGuidline" + i + "-" + j,
            style: (_b = {}, _b[posName1] = minPos + linePos + "px", _b[posName2] = -targetPos + pos[index ? 0 : 1] + "px", _b[sizeName] = lineSize + "px", _b)
          });
        });
      }));
    }

    function renderSnapPoses(snapPoses, _a, minPos, targetPos, size, React) {
      var directionName = _a[0],
          posName1 = _a[1],
          posName2 = _a[2],
          sizeName = _a[3];
      return snapPoses.map(function (_a, i) {
        var _b;

        var type = _a.type,
            pos = _a.pos;
        return React.createElement("div", {
          className: prefix("line", directionName, "guideline", "target", "bold", type),
          key: directionName + "TargetGuidline" + i,
          style: (_b = {}, _b[posName1] = minPos + "px", _b[posName2] = -targetPos + pos + "px", _b[sizeName] = size + "px", _b)
        });
      });
    }

    function renderGuidelines(guidelines, _a, targetPos1, targetPos2, index, React) {
      var directionName = _a[0],
          posName1 = _a[1],
          posName2 = _a[2],
          sizeName = _a[3];
      return guidelines.map(function (guideline, i) {
        var _a;

        var pos = guideline.pos,
            size = guideline.size,
            element = guideline.element;
        return React.createElement("div", {
          className: prefix("line", directionName, "guideline", element ? "bold" : ""),
          key: directionName + "Guidline" + i,
          style: (_a = {}, _a[posName1] = -targetPos1 + pos[index] + "px", _a[posName2] = -targetPos2 + pos[index ? 0 : 1] + "px", _a[sizeName] = size + "px", _a)
        });
      });
    }

    function getGapGuidelinesToStart(guidelines, index, targetPos, targetSizes, guidelinePos, gap, otherPos) {
      var absGap = Math.abs(gap);
      var start = guidelinePos[index] + (gap > 0 ? targetSizes[0] : 0);
      return guidelines.filter(function (_a) {
        var gapPos = _a.pos;
        return gapPos[index] <= targetPos[index];
      }).sort(function (_a, _b) {
        var aPos = _a.pos;
        var bPos = _b.pos;
        return bPos[index] - aPos[index];
      }).filter(function (_a) {
        var gapPos = _a.pos,
            gapSizes = _a.sizes;
        var nextPos = gapPos[index];

        if (throttle(nextPos + gapSizes[index], 0.0001) === throttle(start - absGap, 0.0001)) {
          start = nextPos;
          return true;
        }

        return false;
      }).map(function (gapGuideline) {
        var renderPos = -targetPos[index] + gapGuideline.pos[index] + gapGuideline.sizes[index];
        return __assign$4(__assign$4({}, gapGuideline), {
          gap: gap,
          renderPos: index ? [otherPos, renderPos] : [renderPos, otherPos]
        });
      });
    }

    function getGapGuidelinesToEnd(guidelines, index, targetPos, targetSizes, guidelinePos, gap, otherPos) {
      var absGap = Math.abs(gap);
      var start = guidelinePos[index] + (gap < 0 ? targetSizes[index] : 0);
      return guidelines.filter(function (_a) {
        var gapPos = _a.pos;
        return gapPos[index] > targetPos[index];
      }).sort(function (_a, _b) {
        var aPos = _a.pos;
        var bPos = _b.pos;
        return aPos[index] - bPos[index];
      }).filter(function (_a) {
        var gapPos = _a.pos,
            gapSizes = _a.sizes;
        var nextPos = gapPos[index];

        if (throttle(nextPos, 0.0001) === throttle(start + absGap, 0.0001)) {
          start = nextPos + gapSizes[index];
          return true;
        }

        return false;
      }).map(function (gapGuideline) {
        var renderPos = -targetPos[index] + gapGuideline.pos[index] - absGap;
        return __assign$4(__assign$4({}, gapGuideline), {
          gap: gap,
          renderPos: index ? [otherPos, renderPos] : [renderPos, otherPos]
        });
      });
    }

    function getGapGuidelines$1(guidelines, type, targetPos, targetSizes) {
      var elementGuidelines = guidelines.filter(function (_a) {
        var element = _a.element,
            gap = _a.gap,
            guidelineType = _a.type;
        return element && gap && guidelineType === type;
      });

      var _a = type === "vertical" ? [0, 1] : [1, 0],
          index = _a[0],
          otherIndex = _a[1];

      return flat$1(elementGuidelines.map(function (guideline, i) {
        var pos = guideline.pos;
        var gap = guideline.gap;
        var gapGuidelines = guideline.gapGuidelines;
        var sizes = guideline.sizes;
        var offset = minOffset(pos[otherIndex] + sizes[otherIndex] - targetPos[otherIndex], pos[otherIndex] - targetPos[otherIndex] - targetSizes[otherIndex]);
        var minSize = Math.min(sizes[otherIndex], targetSizes[otherIndex]);

        if (offset > 0 && offset > minSize) {
          offset = (offset - minSize / 2) * 2;
        } else if (offset < 0 && offset < -minSize) {
          offset = (offset + minSize / 2) * 2;
        }

        var otherPos = (offset > 0 ? 0 : targetSizes[otherIndex]) + offset / 2;
        return __spreadArrays$1(getGapGuidelinesToStart(gapGuidelines, index, targetPos, targetSizes, pos, gap, otherPos), getGapGuidelinesToEnd(gapGuidelines, index, targetPos, targetSizes, pos, gap, otherPos));
      }));
    }

    function renderGapGuidelines(moveable, gapGuidelines, type, _a, snapDistFormat, React) {
      var directionName = _a[0],
          posName1 = _a[1],
          posName2 = _a[2],
          sizeName = _a[3];
      var _b = moveable.props,
          _c = _b.snapDigit,
          snapDigit = _c === void 0 ? 0 : _c,
          _d = _b.isDisplaySnapDigit,
          isDisplaySnapDigit = _d === void 0 ? true : _d;
      var otherType = type === "vertical" ? "horizontal" : "vertical";

      var _e = type === "vertical" ? [0, 1] : [1, 0],
          index = _e[0],
          otherIndex = _e[1];

      return gapGuidelines.map(function (_a, i) {
        var _b;

        var renderPos = _a.renderPos,
            gap = _a.gap;
        var absGap = Math.abs(gap);
        var snapSize = isDisplaySnapDigit ? parseFloat(absGap.toFixed(snapDigit)) : 0;
        return React.createElement("div", {
          className: prefix("line", directionName, "guideline", "gap"),
          "data-size": snapSize > 0 ? snapDistFormat(snapSize) : "",
          key: otherType + "GapGuideline" + i,
          style: (_b = {}, _b[posName1] = renderPos[index] + "px", _b[posName2] = renderPos[otherIndex] + "px", _b[sizeName] = absGap + "px", _b)
        });
      });
    }

    function addBoundGuidelines(moveable, verticalPoses, horizontalPoses, verticalSnapPoses, horizontalSnapPoses, externalBounds) {
      var _a = checkBoundPoses(externalBounds || moveable.props.bounds, verticalPoses, horizontalPoses),
          verticalBoundInfos = _a.vertical,
          horizontalBoundInfos = _a.horizontal;

      verticalBoundInfos.forEach(function (info) {
        if (info.isBound) {
          verticalSnapPoses.push({
            type: "bounds",
            pos: info.pos
          });
        }
      });
      horizontalBoundInfos.forEach(function (info) {
        if (info.isBound) {
          horizontalSnapPoses.push({
            type: "bounds",
            pos: info.pos
          });
        }
      });

      var _b = checkInnerBoundPoses(moveable),
          verticalInnerBoundPoses = _b.vertical,
          horizontalInnerBoundPoses = _b.horizontal;

      verticalInnerBoundPoses.forEach(function (innerPos) {
        if (findIndex(verticalSnapPoses, function (_a) {
          var type = _a.type,
              pos = _a.pos;
          return type === "bounds" && pos === innerPos;
        }) >= 0) {
          return;
        }

        verticalSnapPoses.push({
          type: "bounds",
          pos: innerPos
        });
      });
      horizontalInnerBoundPoses.forEach(function (innerPos) {
        if (findIndex(horizontalSnapPoses, function (_a) {
          var type = _a.type,
              pos = _a.pos;
          return type === "bounds" && pos === innerPos;
        }) >= 0) {
          return;
        }

        horizontalSnapPoses.push({
          type: "bounds",
          pos: innerPos
        });
      });
    }
    /**
     * @namespace Moveable.Snappable
     * @description Whether or not target can be snapped to the guideline. (default: false)
     * @sort 2
     */


    var Snappable = {
      name: "snappable",
      props: {
        snappable: [Boolean, Array],
        snapCenter: Boolean,
        snapHorizontal: Boolean,
        snapVertical: Boolean,
        snapElement: Boolean,
        snapGap: Boolean,
        isDisplaySnapDigit: Boolean,
        snapDigit: Number,
        snapThreshold: Number,
        horizontalGuidelines: Array,
        verticalGuidelines: Array,
        elementGuidelines: Array,
        bounds: Object,
        innerBounds: Object,
        snapDistFormat: Function
      },
      events: {
        onSnap: "snap"
      },
      css: [":host {\n    --bounds-color: #d66;\n}", ".guideline {\npointer-events: none;\nz-index: 2;\n}", ".line.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}"],
      render: function (moveable, React) {
        var _a = moveable.state,
            targetTop = _a.top,
            targetLeft = _a.left,
            pos1 = _a.pos1,
            pos2 = _a.pos2,
            pos3 = _a.pos3,
            pos4 = _a.pos4,
            snapRenderInfo = _a.snapRenderInfo,
            targetClientRect = _a.targetClientRect,
            containerClientRect = _a.containerClientRect,
            is3d = _a.is3d,
            rootMatrix = _a.rootMatrix;

        if (!snapRenderInfo || !hasGuidelines(moveable, "")) {
          return [];
        }

        var n = is3d ? 4 : 3;
        var minLeft = Math.min(pos1[0], pos2[0], pos3[0], pos4[0]);
        var minTop = Math.min(pos1[1], pos2[1], pos3[1], pos4[1]);
        var containerPos = caculateContainerPos(rootMatrix, containerClientRect, n);

        var _b = caculateInversePosition(rootMatrix, [targetClientRect.left - containerPos[0], targetClientRect.top - containerPos[1]], n),
            clientLeft = _b[0],
            clientTop = _b[1];

        var _c = moveable.props,
            _d = _c.snapThreshold,
            snapThreshold = _d === void 0 ? 5 : _d,
            _e = _c.snapDigit,
            snapDigit = _e === void 0 ? 0 : _e,
            _f = _c.isDisplaySnapDigit,
            isDisplaySnapDigit = _f === void 0 ? true : _f,
            _g = _c.snapDistFormat,
            snapDistFormat = _g === void 0 ? function (v) {
          return v;
        } : _g;
        var externalPoses = snapRenderInfo.externalPoses || [];
        var poses = getAbsolutePosesByState(moveable.state);
        var verticalSnapPoses = [];
        var horizontalSnapPoses = [];
        var verticalGuidelines = [];
        var horizontalGuidelines = [];
        var snapInfos = [];

        var _h = getRect(poses),
            width = _h.width,
            height = _h.height,
            top = _h.top,
            left = _h.left,
            bottom = _h.bottom,
            right = _h.right;

        var hasExternalPoses = externalPoses.length > 0;
        var externalRect = hasExternalPoses ? getRect(externalPoses) : {};

        if (!snapRenderInfo.request) {
          if (snapRenderInfo.direction) {
            snapInfos.push(getSnapInfosByDirection(moveable, poses, snapRenderInfo.direction));
          }

          if (snapRenderInfo.snap) {
            var rect = getRect(poses);

            if (snapRenderInfo.center) {
              rect.middle = (rect.top + rect.bottom) / 2;
              rect.center = (rect.left + rect.right) / 2;
            }

            snapInfos.push(checkSnaps(moveable, rect, true, 1));
          }

          if (hasExternalPoses) {
            if (snapRenderInfo.center) {
              externalRect.middle = (externalRect.top + externalRect.bottom) / 2;
              externalRect.center = (externalRect.left + externalRect.right) / 2;
            }

            snapInfos.push(checkSnaps(moveable, externalRect, true, 1));
          }

          snapInfos.forEach(function (snapInfo) {
            var verticalPosInfos = snapInfo.vertical.posInfos,
                horizontalPosInfos = snapInfo.horizontal.posInfos;
            verticalSnapPoses.push.apply(verticalSnapPoses, verticalPosInfos.map(function (posInfo) {
              return {
                type: "snap",
                pos: posInfo.pos
              };
            }));
            horizontalSnapPoses.push.apply(horizontalSnapPoses, horizontalPosInfos.map(function (posInfo) {
              return {
                type: "snap",
                pos: posInfo.pos
              };
            }));
            verticalGuidelines.push.apply(verticalGuidelines, getSnapGuidelines(verticalPosInfos));
            horizontalGuidelines.push.apply(horizontalGuidelines, getSnapGuidelines(horizontalPosInfos));
          });
        }

        addBoundGuidelines(moveable, [left, right], [top, bottom], verticalSnapPoses, horizontalSnapPoses);

        if (hasExternalPoses) {
          addBoundGuidelines(moveable, [externalRect.left, externalRect.right], [externalRect.top, externalRect.bottom], verticalSnapPoses, horizontalSnapPoses, snapRenderInfo.externalBounds);
        }

        var elementHorizontalGroup = groupByElementGuidelines(horizontalGuidelines, clientLeft, width, 0);
        var elementVerticalGroup = groupByElementGuidelines(verticalGuidelines, clientTop, height, 1);
        var horizontalNames = ["horizontal", "left", "top", "width"];
        var verticalNames = ["vertical", "top", "left", "height"];
        var gapVerticalGuidelines = getGapGuidelines$1(verticalGuidelines, "vertical", [targetLeft, targetTop], [width, height]);
        var gapHorizontalGuidelines = getGapGuidelines$1(horizontalGuidelines, "horizontal", [targetLeft, targetTop], [width, height]);

        var allGuidelines = __spreadArrays$1(verticalGuidelines, horizontalGuidelines);

        triggerEvent(moveable, "onSnap", {
          guidelines: allGuidelines.filter(function (_a) {
            var element = _a.element;
            return !element;
          }),
          elements: groupBy(allGuidelines.filter(function (_a) {
            var element = _a.element;
            return element;
          }), function (_a) {
            var element = _a.element;
            return element;
          }),
          gaps: __spreadArrays$1(gapVerticalGuidelines, gapHorizontalGuidelines)
        }, true);
        return __spreadArrays$1(renderGapGuidelines(moveable, gapVerticalGuidelines, "vertical", horizontalNames, snapDistFormat, React), renderGapGuidelines(moveable, gapHorizontalGuidelines, "horizontal", verticalNames, snapDistFormat, React), renderElementGroup(elementHorizontalGroup, horizontalNames, minLeft, clientLeft, width, targetTop, snapThreshold, isDisplaySnapDigit, snapDigit, 0, snapDistFormat, React), renderElementGroup(elementVerticalGroup, verticalNames, minTop, clientTop, height, targetLeft, snapThreshold, isDisplaySnapDigit, snapDigit, 1, snapDistFormat, React), renderSnapPoses(horizontalSnapPoses, horizontalNames, minLeft, targetTop, width, React), renderSnapPoses(verticalSnapPoses, verticalNames, minTop, targetLeft, height, React), renderGuidelines(horizontalGuidelines, horizontalNames, targetLeft, targetTop, 0, React), renderGuidelines(verticalGuidelines, verticalNames, targetTop, targetLeft, 1, React));
      },
      dragStart: function (moveable, e) {
        moveable.state.snapRenderInfo = {
          request: e.isRequest,
          snap: true,
          center: true
        };
        snapStart(moveable);
      },
      pinchStart: function (moveable) {
        this.unset(moveable);
      },
      dragEnd: function (moveable) {
        this.unset(moveable);
      },
      dragControlCondition: function (e) {
        if (directionCondition(e) || dragControlCondition(e)) {
          return true;
        }

        if (!e.isRequest && e.inputEvent) {
          return hasClass(e.inputEvent.target, prefix("snap-control"));
        }
      },
      dragControlStart: function (moveable, e) {
        moveable.state.snapRenderInfo = null;
        snapStart(moveable);
      },
      dragControlEnd: function (moveable) {
        this.unset(moveable);
      },
      dragGroupStart: function (moveable, e) {
        this.dragStart(moveable, e);
      },
      dragGroupEnd: function (moveable) {
        this.unset(moveable);
      },
      dragGroupControlStart: function (moveable, e) {
        moveable.state.snapRenderInfo = null;
        snapStart(moveable);
      },
      dragGroupControlEnd: function (moveable) {
        this.unset(moveable);
      },
      unset: function (moveable) {
        var state = moveable.state;
        state.enableSnap = false;
        state.guidelines = [];
        state.snapRenderInfo = null;
      }
    };
    /**
    * Whether or not target can be snapped to the guideline. (default: false)
    * @name Moveable.Snappable#snappable
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body);
    *
    * moveable.snappable = true;
    */

    /**
     * When you drag, make the snap in the center of the target. (default: false)
     * @name Moveable.Snappable#snapCenter
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     * });
     *
     * moveable.snapCenter = true;
     */

    /**
     * When you drag, make the snap in the vertical guidelines. (default: true)
     * @name Moveable.Snappable#snapVertical
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapVertical: true,
     *   snapHorizontal: true,
     *   snapElement: true,
     * });
     *
     * moveable.snapVertical = false;
     */

    /**
     * When you drag, make the snap in the horizontal guidelines. (default: true)
     * @name Moveable.Snappable#snapHorizontal
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapVertical: true,
     *   snapHorizontal: true,
     *   snapElement: true,
     * });
     *
     * moveable.snapHorizontal = false;
     */

    /**
     * When you drag, make the gap snap in the element guidelines. (default: true)
     * @name Moveable.Snappable#snapGap
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapVertical: true,
     *   snapHorizontal: true,
     *   snapElement: true,
     *   snapGap: true,
     * });
     *
     * moveable.snapGap = false;
     */

    /**
     * When you drag, make the snap in the element guidelines. (default: true)
     * @name Moveable.Snappable#snapElement
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   snappable: true,
     *   snapVertical: true,
     *   snapHorizontal: true,
     *   snapElement: true,
     * });
     *
     * moveable.snapElement = false;
     */

    /**
     * Distance value that can snap to guidelines. (default: 5)
     * @name Moveable.Snappable#snapThreshold
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapThreshold = 5;
     */

    /**
     * Add guidelines in the horizontal direction. (default: [])
     * @name Moveable.Snappable#horizontalGuidlines
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.horizontalGuidlines = [100, 200, 500];
     */

    /**
     * Add guidelines in the vertical direction. (default: [])
     * @name Moveable.Snappable#verticalGuidlines
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.verticalGuidlines = [100, 200, 500];
     */

    /**
     * Add guidelines for the element. (default: [])
     * @name Moveable.Snappable#elementGuidelines
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.elementGuidelines = [
     *   document.querySelector(".element"),
     * ];
     */

    /**
     * You can set up boundaries. (default: null)
     * @name Moveable.Snappable#bounds
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.bounds = { left: 0, right: 1000, top: 0, bottom: 1000};
     */

    /**
     * You can set up inner boundaries. (default: null)
     * @name Moveable.Snappable#innerBounds
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.innerBounds = { left: 500, top: 500, width: 100, height: 100};
     */

    /**
     * snap distance digits (default: 0)
     * @name Moveable.Snappable#snapDigit
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.snapDigit = 0
     */

    /**
     * Whether to show snap distance (default: true)
     * @name Moveable.Snappable#isDisplaySnapDigit
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.isDisplaySnapDigit = true;
     */

    /**
     * You can set the text format of the distance shown in the guidelines. (default: self)
     * @name Moveable.Snappable#snapDistFormat
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  snappable: true,
     *  snapDistFormat: v => v,
     * });
     * moveable.snapDistFormat = v => `${v}px`;
     */

    /**
     * When you drag or dragControl, the `snap` event is called.
     * @memberof Moveable.Snappable
     * @event snap
     * @param {Moveable.Snappable.OnSnap} - Parameters for the `snap` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     snappable: true
     * });
     * moveable.on("snap", e => {
     *     console.log("onSnap", e);
     * });
     */

    /**
     * @namespace Draggable
     * @memberof Moveable
     * @description Draggable refers to the ability to drag and move targets.
     */

    var Draggable = {
      name: "draggable",
      props: {
        draggable: Boolean,
        throttleDrag: Number,
        throttleDragRotate: Number,
        startDragRotate: Number
      },
      events: {
        onDragStart: "dragStart",
        onDrag: "drag",
        onDragEnd: "dragEnd",
        onDragGroupStart: "dragGroupStart",
        onDragGroup: "dragGroup",
        onDragGroupEnd: "dragGroupEnd"
      },
      render: function (moveable, React) {
        var throttleDragRotate = moveable.props.throttleDragRotate;
        var _a = moveable.state,
            dragInfo = _a.dragInfo,
            beforeOrigin = _a.beforeOrigin;

        if (!throttleDragRotate || !dragInfo) {
          return [];
        }

        var dist = dragInfo.dist;

        if (!dist[0] && !dist[1]) {
          return [];
        }

        var width = getDistSize(dist);
        var rad = getRad$1(dist, [0, 0]);
        return [React.createElement("div", {
          className: prefix("line", "horizontal", "dragline", "dashed"),
          key: "dragRotateGuideline",
          style: {
            width: width + "px",
            transform: "translate(" + beforeOrigin[0] + "px, " + beforeOrigin[1] + "px) rotate(" + rad + "rad)"
          }
        })];
      },
      dragStart: function (moveable, e) {
        var datas = e.datas,
            parentEvent = e.parentEvent,
            parentGesto = e.parentGesto;
        var state = moveable.state;
        var target = state.target,
            gesto = state.gesto;

        if (gesto) {
          return false;
        }

        state.gesto = parentGesto || moveable.targetGesto;
        var style = window.getComputedStyle(target);
        datas.datas = {};
        datas.left = parseFloat(style.left || "") || 0;
        datas.top = parseFloat(style.top || "") || 0;
        datas.bottom = parseFloat(style.bottom || "") || 0;
        datas.right = parseFloat(style.right || "") || 0;
        datas.startValue = [0, 0];
        setDragStart(moveable, e);
        setDefaultTransformIndex(e);
        startCheckSnapDrag(moveable, datas);
        datas.prevDist = [0, 0];
        datas.prevBeforeDist = [0, 0];
        datas.isDrag = false;
        var params = fillParams(moveable, e, __assign$4({
          set: function (translate) {
            datas.startValue = translate;
          }
        }, fillTransformStartEvent(e)));
        var result = parentEvent || triggerEvent(moveable, "onDragStart", params);

        if (result !== false) {
          datas.isDrag = true;
          moveable.state.dragInfo = {
            startRect: moveable.getRect(),
            dist: [0, 0]
          };
        } else {
          state.gesto = null;
          datas.isPinch = false;
        }

        return datas.isDrag ? params : false;
      },
      drag: function (moveable, e) {
        resolveTransformEvent(e, "translate");
        var datas = e.datas,
            parentEvent = e.parentEvent,
            parentFlag = e.parentFlag,
            isPinch = e.isPinch,
            isRequest = e.isRequest;
        var distX = e.distX,
            distY = e.distY;
        var isDrag = datas.isDrag,
            prevDist = datas.prevDist,
            prevBeforeDist = datas.prevBeforeDist,
            startValue = datas.startValue;

        if (!isDrag) {
          return;
        }

        var props = moveable.props;
        var parentMoveable = props.parentMoveable;
        var throttleDrag = parentEvent ? 0 : props.throttleDrag || 0;
        var throttleDragRotate = parentEvent ? 0 : props.throttleDragRotate || 0;
        var isSnap = false;
        var dragRotateRad = 0;

        if (!parentEvent && throttleDragRotate > 0 && (distX || distY)) {
          var startDragRotate = props.startDragRotate || 0;
          var deg = throttle(startDragRotate + getRad$1([0, 0], [distX, distY]) * 180 / Math.PI, throttleDragRotate) - startDragRotate;
          var ry = distY * Math.abs(Math.cos((deg - 90) / 180 * Math.PI));
          var rx = distX * Math.abs(Math.cos(deg / 180 * Math.PI));
          var r = getDistSize([rx, ry]);
          dragRotateRad = deg * Math.PI / 180;
          distX = r * Math.cos(dragRotateRad);
          distY = r * Math.sin(dragRotateRad);
        }

        if (!isPinch && !parentEvent && !parentFlag && (!throttleDragRotate || distX || distY)) {
          var _a = checkSnapDrag(moveable, distX, distY, throttleDragRotate, isRequest, datas),
              verticalInfo = _a[0],
              horizontalInfo = _a[1];

          var isVerticalSnap = verticalInfo.isSnap,
              isVerticalBound = verticalInfo.isBound,
              verticalOffset = verticalInfo.offset;
          var isHorizontalSnap = horizontalInfo.isSnap,
              isHorizontalBound = horizontalInfo.isBound,
              horizontalOffset = horizontalInfo.offset;
          isSnap = isVerticalSnap || isHorizontalSnap || isVerticalBound || isHorizontalBound;
          distX += verticalOffset;
          distY += horizontalOffset;
        }

        datas.passDeltaX = distX - (datas.passDistX || 0);
        datas.passDeltaY = distY - (datas.passDistY || 0);
        datas.passDistX = distX;
        datas.passDistY = distY;
        var beforeTranslate = plus(getBeforeDragDist({
          datas: datas,
          distX: distX,
          distY: distY
        }), startValue);
        var translate = plus(getTransformDist({
          datas: datas,
          distX: distX,
          distY: distY
        }), startValue);

        if (!throttleDragRotate && !isSnap) {
          throttleArray(translate, throttleDrag);
          throttleArray(beforeTranslate, throttleDrag);
        }

        var beforeDist = minus(beforeTranslate, startValue);
        var dist = minus(translate, startValue);
        var delta = minus(dist, prevDist);
        var beforeDelta = minus(beforeDist, prevBeforeDist);
        datas.prevDist = dist;
        datas.prevBeforeDist = beforeDist;
        var left = datas.left + beforeDist[0];
        var top = datas.top + beforeDist[1];
        var right = datas.right - beforeDist[0];
        var bottom = datas.bottom - beforeDist[1];
        var nextTransform = convertTransformFormat(datas, "translate(" + translate[0] + "px, " + translate[1] + "px)", "translate(" + dist[0] + "px, " + dist[1] + "px)");
        moveable.state.dragInfo.dist = parentEvent ? [0, 0] : dist;

        if (!parentEvent && !parentMoveable && delta.every(function (num) {
          return !num;
        }) && beforeDelta.some(function (num) {
          return !num;
        })) {
          return;
        }

        var _b = moveable.state,
            width = _b.width,
            height = _b.height;
        var params = fillParams(moveable, e, {
          transform: nextTransform,
          dist: dist,
          delta: delta,
          translate: translate,
          beforeDist: beforeDist,
          beforeDelta: beforeDelta,
          beforeTranslate: beforeTranslate,
          left: left,
          top: top,
          right: right,
          bottom: bottom,
          width: width,
          height: height,
          isPinch: isPinch
        });
        !parentEvent && triggerEvent(moveable, "onDrag", params);
        return params;
      },
      dragEnd: function (moveable, e) {
        var parentEvent = e.parentEvent,
            datas = e.datas,
            isDrag = e.isDrag;
        moveable.state.gesto = null;
        moveable.state.dragInfo = null;

        if (!datas.isDrag) {
          return;
        }

        datas.isDrag = false;
        !parentEvent && triggerEvent(moveable, "onDragEnd", fillEndParams(moveable, e, {}));
        return isDrag;
      },
      dragGroupStart: function (moveable, e) {
        var datas = e.datas,
            clientX = e.clientX,
            clientY = e.clientY;
        var params = this.dragStart(moveable, e);

        if (!params) {
          return false;
        }

        var events = triggerChildGesto(moveable, this, "dragStart", [clientX || 0, clientY || 0], e, false);

        var nextParams = __assign$4(__assign$4({}, params), {
          targets: moveable.props.targets,
          events: events
        });

        var result = triggerEvent(moveable, "onDragGroupStart", nextParams);
        datas.isDrag = result !== false;
        return datas.isDrag ? params : false;
      },
      dragGroup: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isDrag) {
          return;
        }

        var params = this.drag(moveable, e);
        var _a = e.datas,
            passDeltaX = _a.passDeltaX,
            passDeltaY = _a.passDeltaY;
        var events = triggerChildGesto(moveable, this, "drag", [passDeltaX, passDeltaY], e, false);

        if (!params) {
          return;
        }

        var nextParams = __assign$4({
          targets: moveable.props.targets,
          events: events
        }, params);

        triggerEvent(moveable, "onDragGroup", nextParams);
        return nextParams;
      },
      dragGroupEnd: function (moveable, e) {
        var isDrag = e.isDrag,
            datas = e.datas;

        if (!datas.isDrag) {
          return;
        }

        this.dragEnd(moveable, e);
        triggerChildGesto(moveable, this, "dragEnd", [0, 0], e, false);
        triggerEvent(moveable, "onDragGroupEnd", fillEndParams(moveable, e, {
          targets: moveable.props.targets
        }));
        return isDrag;
      },

      /**
       * @method Moveable.Draggable#request
       * @param {object} [e] - the draggable's request parameter
       * @param {number} [e.x] - x position
       * @param {number} [e.y] - y position
       * @param {number} [e.deltaX] - X number to move
       * @param {number} [e.deltaY] - Y number to move
       * @return {Moveable.Requester} Moveable Requester
       * @example
        * // Instantly Request (requestStart - request - requestEnd)
       * // Use Relative Value
       * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
       * // Use Absolute Value
       * moveable.request("draggable", { x: 200, y: 100 }, true);
       *
       * // requestStart
       * const requester = moveable.request("draggable");
       *
       * // request
       * // Use Relative Value
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * // Use Absolute Value
       * moveable.request("draggable", { x: 200, y: 100 });
       * moveable.request("draggable", { x: 220, y: 100 });
       * moveable.request("draggable", { x: 240, y: 100 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
      request: function (moveable) {
        var datas = {};
        var rect = moveable.getRect();
        var distX = 0;
        var distY = 0;
        return {
          isControl: false,
          requestStart: function () {
            return {
              datas: datas
            };
          },
          request: function (e) {
            if ("x" in e) {
              distX = e.x - rect.left;
            } else if ("deltaX" in e) {
              distX += e.deltaX;
            }

            if ("y" in e) {
              distY = e.y - rect.top;
            } else if ("deltaY" in e) {
              distY += e.deltaY;
            }

            return {
              datas: datas,
              distX: distX,
              distY: distY
            };
          },
          requestEnd: function () {
            return {
              datas: datas,
              isDrag: true
            };
          }
        };
      },
      unset: function (moveable) {
        moveable.state.dragInfo = null;
      }
    };
    /**
     * Whether or not target can be dragged. (default: false)
     * @name Moveable.Draggable#draggable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.draggable = true;
     */

    /**
     * throttle of x, y when drag.
     * @name Moveable.Draggable#throttleDrag
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleDrag = 1;
     */

    /**
    * throttle of angle of x, y when drag.
    * @name Moveable.Draggable#throttleDragRotate
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body);
    *
    * moveable.throttleDragRotate = 45;
    */

    /**
    * start angle of throttleDragRotate of x, y when drag.
    * @name Moveable.Draggable#startDragRotate
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body);
    *
    * // 45, 135, 225, 315
    * moveable.throttleDragRotate = 90;
    * moveable.startDragRotate = 45;
    */

    /**
     * When the drag starts, the dragStart event is called.
     * @memberof Moveable.Draggable
     * @event dragStart
     * @param {Moveable.Draggable.OnDragStart} - Parameters for the dragStart event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("dragStart", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When dragging, the drag event is called.
     * @memberof Moveable.Draggable
     * @event drag
     * @param {Moveable.Draggable.OnDrag} - Parameters for the drag event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("drag", ({ target, transform }) => {
     *     target.style.transform = transform;
     * });
     */

    /**
     * When the drag finishes, the dragEnd event is called.
     * @memberof Moveable.Draggable
     * @event dragEnd
     * @param {Moveable.Draggable.OnDragEnd} - Parameters for the dragEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { draggable: true });
     * moveable.on("dragEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */

    /**
    * When the group drag starts, the `dragGroupStart` event is called.
    * @memberof Moveable.Draggable
    * @event dragGroupStart
    * @param {Moveable.Draggable.OnDragGroupStart} - Parameters for the `dragGroupStart` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     draggable: true
    * });
    * moveable.on("dragGroupStart", ({ targets }) => {
    *     console.log("onDragGroupStart", targets);
    * });
    */

    /**
    * When the group drag, the `dragGroup` event is called.
    * @memberof Moveable.Draggable
    * @event dragGroup
    * @param {Moveable.Draggable.OnDragGroup} - Parameters for the `dragGroup` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     draggable: true
    * });
    * moveable.on("dragGroup", ({ targets, events }) => {
    *     console.log("onDragGroup", targets);
    *     events.forEach(ev => {
    *          // drag event
    *          console.log("onDrag left, top", ev.left, ev.top);
    *          // ev.target!.style.left = `${ev.left}px`;
    *          // ev.target!.style.top = `${ev.top}px`;
    *          console.log("onDrag translate", ev.dist);
    *          ev.target!.style.transform = ev.transform;)
    *     });
    * });
    */

    /**
     * When the group drag finishes, the `dragGroupEnd` event is called.
     * @memberof Moveable.Draggable
     * @event dragGroupEnd
     * @param {Moveable.Draggable.OnDragGroupEnd} - Parameters for the `dragGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     draggable: true
     * });
     * moveable.on("dragGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onDragGroupEnd", targets, isDrag);
     * });
     */

    /**
     * @namespace Rotatable
     * @memberof Moveable
     * @description Rotatable indicates whether the target can be rotated.
     */

    function setRotateStartInfo(moveable, datas, clientX, clientY, origin, rect) {
      var n = moveable.state.is3d ? 4 : 3;
      var nextOrigin = caculatePosition(moveable.state.rootMatrix, origin, n);
      var startAbsoluteOrigin = plus([rect.left, rect.top], nextOrigin);
      datas.startAbsoluteOrigin = startAbsoluteOrigin;
      datas.prevDeg = getRad$1(startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180;
      datas.prevSnapDeg = datas.prevDeg;
      datas.startDeg = datas.prevDeg;
      datas.loop = 0;
    }

    function getParentDeg(moveable, moveableRect, datas, parentDist, direction, startValue) {
      var prevDeg = datas.prevDeg; // const absoluteDeg = startValue + parentDist;

      var dist = checkSnapRotate(moveable, moveableRect, datas.origin, parentDist);
      datas.prevDeg = dist;
      var delta = dist - prevDeg;
      return [delta, dist, startValue + dist];
    }

    function getDeg(moveable, moveableRect, datas, deg, direction, startValue, throttleRotate, isSnap) {
      var prevDeg = datas.prevDeg,
          prevSnapDeg = datas.prevSnapDeg,
          startDeg = datas.startDeg,
          prevLoop = datas.loop;

      if (prevDeg > deg && prevDeg > 270 && deg < 90) {
        // 360 => 0
        ++datas.loop;
      } else if (prevDeg < deg && prevDeg < 90 && deg > 270) {
        // 0 => 360
        --datas.loop;
      }

      var loop = datas.loop;
      var absolutePrevSnapDeg = prevLoop * 360 + prevSnapDeg - startDeg + startValue;
      var absoluteDeg = loop * 360 + deg - startDeg + startValue;
      datas.prevDeg = absoluteDeg - loop * 360 + startDeg - startValue;
      absoluteDeg = throttle(absoluteDeg, throttleRotate);
      var dist = direction * (absoluteDeg - startValue);

      if (isSnap) {
        dist = checkSnapRotate(moveable, moveableRect, datas.origin, dist);
        absoluteDeg = dist / direction + startValue;
      }

      datas.prevSnapDeg = absoluteDeg - loop * 360 + startDeg - startValue;
      var delta = direction * (absoluteDeg - absolutePrevSnapDeg);
      return [delta, dist, startValue + dist];
    }

    function getRotateInfo(moveable, moveableRect, datas, direction, clientX, clientY, startValue, throttleRotate) {
      return getDeg(moveable, moveableRect, datas, getRad$1(datas.startAbsoluteOrigin, [clientX, clientY]) / Math.PI * 180, direction, startValue, throttleRotate, true);
    }
    function getPositions(rotationPosition, _a, direction) {
      var pos1 = _a[0],
          pos2 = _a[1],
          pos3 = _a[2],
          pos4 = _a[3];

      var _b = (rotationPosition || "top").split("-"),
          dir1 = _b[0],
          dir2 = _b[1];

      var radPoses = [pos1, pos2]; // if (scale[0] < 0) {
      //     dir1 = getReversePositionX(dir1);
      //     dir2 = getReversePositionX(dir2);
      // }
      // if (scale[1] < 0) {
      //     dir1 = getReversePositionY(dir1);
      //     dir2 = getReversePositionY(dir2);
      // }

      if (dir1 === "left") {
        radPoses = [pos3, pos1];
      } else if (dir1 === "right") {
        radPoses = [pos2, pos4];
      } else if (dir1 === "bottom") {
        radPoses = [pos4, pos3];
      }

      var pos = [(radPoses[0][0] + radPoses[1][0]) / 2, (radPoses[0][1] + radPoses[1][1]) / 2];
      var rad = getRotationRad(radPoses, direction);

      if (dir2) {
        var isStart = dir2 === "top" || dir2 === "left";
        var isReverse = dir1 === "bottom" || dir1 === "left";
        pos = radPoses[isStart && !isReverse || !isStart && isReverse ? 0 : 1];
      }

      return [pos, rad];
    }
    function dragControlCondition(e) {
      if (e.isRequest) {
        return e.requestAble === "rotatable";
      }

      return hasClass(e.inputEvent.target, prefix("rotation"));
    }
    var Rotatable = {
      name: "rotatable",
      canPinch: true,
      props: {
        rotatable: Boolean,
        rotationPosition: String,
        throttleRotate: Number
      },
      events: {
        onRotateStart: "rotateStart",
        onRotate: "rotate",
        onRotateEnd: "rotateEnd",
        onRotateGroupStart: "rotateGroupStart",
        onRotateGroup: "rotateGroup",
        onRotateGroupEnd: "rotateGroupEnd"
      },
      render: function (moveable, React) {
        var _a = moveable.props,
            rotatable = _a.rotatable,
            rotationPosition = _a.rotationPosition;

        if (!rotatable) {
          return null;
        }

        var _b = moveable.state,
            renderPoses = _b.renderPoses,
            direction = _b.direction;

        var _c = getPositions(rotationPosition, renderPoses, direction),
            pos = _c[0],
            rotationRad = _c[1];

        return React.createElement("div", {
          key: "rotation",
          className: prefix("line rotation-line"),
          style: {
            // tslint:disable-next-line: max-line-length
            transform: "translate(-50%) translate(" + pos[0] + "px, " + pos[1] + "px) rotate(" + rotationRad + "rad)"
          }
        }, React.createElement("div", {
          className: prefix("control", "rotation")
        }));
      },
      dragControlCondition: dragControlCondition,
      dragControlStart: function (moveable, e) {
        var datas = e.datas,
            clientX = e.clientX,
            clientY = e.clientY,
            parentRotate = e.parentRotate,
            parentFlag = e.parentFlag,
            isPinch = e.isPinch,
            isRequest = e.isRequest;
        var _a = moveable.state,
            target = _a.target,
            left = _a.left,
            top = _a.top,
            origin = _a.origin,
            beforeOrigin = _a.beforeOrigin,
            direction = _a.direction,
            beforeDirection = _a.beforeDirection,
            targetTransform = _a.targetTransform;

        if (!isRequest && !target) {
          return false;
        }

        var rect = moveable.getRect();
        datas.rect = rect;
        datas.transform = targetTransform;
        datas.left = left;
        datas.top = top;
        datas.fixedPosition = getDirectionOffset(moveable, getOriginDirection(moveable));

        if (isRequest || isPinch || parentFlag) {
          var externalRotate = parentRotate || 0;
          datas.beforeInfo = {
            origin: rect.beforeOrigin,
            prevDeg: externalRotate,
            startDeg: externalRotate,
            prevSnapDeg: externalRotate,
            loop: 0
          };
          datas.afterInfo = {
            origin: rect.origin,
            prevDeg: externalRotate,
            startDeg: externalRotate,
            prevSnapDeg: externalRotate,
            loop: 0
          };
        } else {
          datas.beforeInfo = {
            origin: rect.beforeOrigin
          };
          datas.afterInfo = {
            origin: rect.origin
          };
          var controlRect = getClientRect(moveable.controlBox.getElement());
          setRotateStartInfo(moveable, datas.beforeInfo, clientX, clientY, beforeOrigin, controlRect);
          setRotateStartInfo(moveable, datas.afterInfo, clientX, clientY, origin, controlRect);
        }

        datas.direction = direction;
        datas.beforeDirection = beforeDirection;
        datas.startValue = 0;
        datas.datas = {};
        setDefaultTransformIndex(e);
        var params = fillParams(moveable, e, __assign$4(__assign$4({
          set: function (rotatation) {
            datas.startValue = rotatation * Math.PI / 180;
          }
        }, fillTransformStartEvent(e)), {
          dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
        }));
        var result = triggerEvent(moveable, "onRotateStart", params);
        datas.isRotate = result !== false;
        moveable.state.snapRenderInfo = {
          request: e.isRequest
        };
        return datas.isRotate ? params : false;
      },
      dragControl: function (moveable, e) {
        var _a, _b, _c, _d, _e, _f;

        var datas = e.datas,
            clientX = e.clientX,
            clientY = e.clientY,
            parentRotate = e.parentRotate,
            parentFlag = e.parentFlag,
            isPinch = e.isPinch,
            groupDelta = e.groupDelta;
        var direction = datas.direction,
            beforeDirection = datas.beforeDirection,
            beforeInfo = datas.beforeInfo,
            afterInfo = datas.afterInfo,
            isRotate = datas.isRotate,
            startValue = datas.startValue,
            rect = datas.rect;

        if (!isRotate) {
          return;
        }

        resolveTransformEvent(e, "rotate");
        var _g = moveable.props,
            _h = _g.throttleRotate,
            throttleRotate = _h === void 0 ? 0 : _h,
            parentMoveable = _g.parentMoveable;
        var delta;
        var dist;
        var rotate;
        var beforeDelta;
        var beforeDist;
        var beforeRotate;
        var startDeg = 180 / Math.PI * startValue;

        if (!parentFlag && "parentDist" in e) {
          var parentDist = e.parentDist;
          _a = getParentDeg(moveable, rect, afterInfo, parentDist, direction, startDeg), delta = _a[0], dist = _a[1], rotate = _a[2];
          _b = getParentDeg(moveable, rect, beforeInfo, parentDist, direction, startDeg), beforeDelta = _b[0], beforeDist = _b[1], beforeRotate = _b[2];
        } else if (isPinch || parentFlag) {
          _c = getDeg(moveable, rect, afterInfo, parentRotate, direction, startDeg, throttleRotate), delta = _c[0], dist = _c[1], rotate = _c[2];
          _d = getDeg(moveable, rect, beforeInfo, parentRotate, direction, startDeg, throttleRotate), beforeDelta = _d[0], beforeDist = _d[1], beforeRotate = _d[2];
        } else {
          _e = getRotateInfo(moveable, rect, afterInfo, direction, clientX, clientY, startDeg, throttleRotate), delta = _e[0], dist = _e[1], rotate = _e[2];
          _f = getRotateInfo(moveable, rect, beforeInfo, beforeDirection, clientX, clientY, startDeg, throttleRotate), beforeDelta = _f[0], beforeDist = _f[1], beforeRotate = _f[2];
        }

        if (!delta && !beforeDelta && !parentMoveable) {
          return;
        }

        var nextTransform = convertTransformFormat(datas, "rotate(" + rotate + "deg)", "rotate(" + dist + "deg)");
        var inverseDist = getRotateDist(moveable, dist, datas.fixedPosition, datas);
        var inverseDelta = minus(plus(groupDelta || [0, 0], inverseDist), datas.prevInverseDist || [0, 0]);
        datas.prevInverseDist = inverseDist;
        var params = fillParams(moveable, e, __assign$4({
          delta: delta,
          dist: dist,
          rotate: rotate,
          beforeDist: beforeDist,
          beforeDelta: beforeDelta,
          beforeRotate: beforeRotate,
          isPinch: !!isPinch
        }, fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e)));
        triggerEvent(moveable, "onRotate", params);
        return params;
      },
      dragControlEnd: function (moveable, e) {
        var datas = e.datas,
            isDrag = e.isDrag;

        if (!datas.isRotate) {
          return false;
        }

        datas.isRotate = false;
        triggerEvent(moveable, "onRotateEnd", fillEndParams(moveable, e, {}));
        return isDrag;
      },
      dragGroupControlCondition: dragControlCondition,
      dragGroupControlStart: function (moveable, e) {
        var datas = e.datas;
        var _a = moveable.state,
            parentLeft = _a.left,
            parentTop = _a.top,
            parentBeforeOrigin = _a.beforeOrigin;
        var params = this.dragControlStart(moveable, e);

        if (!params) {
          return false;
        }

        params.set(datas.beforeDirection * moveable.rotation);
        var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
          var _a = child.state,
              left = _a.left,
              top = _a.top,
              beforeOrigin = _a.beforeOrigin;
          var childClient = plus(minus([left, top], [parentLeft, parentTop]), minus(beforeOrigin, parentBeforeOrigin));
          ev.datas.groupClient = childClient;
          return __assign$4(__assign$4({}, ev), {
            parentRotate: 0
          });
        });

        var nextParams = __assign$4(__assign$4({}, params), {
          targets: moveable.props.targets,
          events: events
        });

        var result = triggerEvent(moveable, "onRotateGroupStart", nextParams);
        datas.isRotate = result !== false;
        return datas.isRotate ? params : false;
      },
      dragGroupControl: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isRotate) {
          return;
        }

        var params = this.dragControl(moveable, e);

        if (!params) {
          return;
        }

        var direction = datas.beforeDirection;
        var parentRotate = params.beforeDist;
        var deg = params.beforeDelta;
        var rad = deg / 180 * Math.PI;
        var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
          var _a = ev.datas.groupClient,
              prevX = _a[0],
              prevY = _a[1];

          var _b = rotate$1([prevX, prevY], rad * direction),
              clientX = _b[0],
              clientY = _b[1];

          var delta = [clientX - prevX, clientY - prevY];
          ev.datas.groupClient = [clientX, clientY];
          return __assign$4(__assign$4({}, ev), {
            parentRotate: parentRotate,
            groupDelta: delta
          });
        });
        moveable.rotation = direction * params.beforeRotate;

        var nextParams = __assign$4({
          targets: moveable.props.targets,
          events: events,
          set: function (rotation) {
            moveable.rotation = rotation;
          }
        }, params);

        triggerEvent(moveable, "onRotateGroup", nextParams);
        return nextParams;
      },
      dragGroupControlEnd: function (moveable, e) {
        var isDrag = e.isDrag,
            datas = e.datas;

        if (!datas.isRotate) {
          return;
        }

        this.dragControlEnd(moveable, e);
        triggerChildAble(moveable, this, "dragControlEnd", e);
        var nextParams = fillEndParams(moveable, e, {
          targets: moveable.props.targets
        });
        triggerEvent(moveable, "onRotateGroupEnd", nextParams);
        return isDrag;
      },

      /**
       * @method Moveable.Rotatable#request
       * @param {object} [e] - the Resizable's request parameter
       * @param {number} [e.deltaRotate=0] -  delta number of rotation
       * @param {number} [e.rotate=0] - absolute number of moveable's rotation
       * @return {Moveable.Requester} Moveable Requester
       * @example
        * // Instantly Request (requestStart - request - requestEnd)
       * moveable.request("rotatable", { deltaRotate: 10 }, true);
       *
       * * moveable.request("rotatable", { rotate: 10 }, true);
       *
       * // requestStart
       * const requester = moveable.request("rotatable");
       *
       * // request
       * requester.request({ deltaRotate: 10 });
       * requester.request({ deltaRotate: 10 });
       * requester.request({ deltaRotate: 10 });
       *
       * requester.request({ rotate: 10 });
       * requester.request({ rotate: 20 });
       * requester.request({ rotate: 30 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
      request: function (moveable) {
        var datas = {};
        var distRotate = 0;
        var startRotation = moveable.getRotation();
        return {
          isControl: true,
          requestStart: function (e) {
            return {
              datas: datas
            };
          },
          request: function (e) {
            if ("deltaRotate" in e) {
              distRotate += e.deltaRotate;
            } else if ("rotate" in e) {
              distRotate = e.rotate - startRotation;
            }

            return {
              datas: datas,
              parentDist: distRotate
            };
          },
          requestEnd: function () {
            return {
              datas: datas,
              isDrag: true
            };
          }
        };
      }
    };
    /**
     * Whether or not target can be rotated. (default: false)
     * @name Moveable.Rotatable#rotatable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.rotatable = true;
     */

    /**
     * You can specify the position of the rotation. (default: "top")
     * @name Moveable.Rotatable#rotationPosition
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   rotationPosition: "top",
     * });
     *
     * moveable.rotationPosition = "bottom"
     */

    /**
     * throttle of angle(degree) when rotate.
     * @name Moveable.Rotatable#throttleRotate
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleRotate = 1;
     */

    /**
     * When the rotate starts, the rotateStart event is called.
     * @memberof Moveable.Rotatable
     * @event rotateStart
     * @param {Moveable.Rotatable.OnRotateStart} - Parameters for the rotateStart event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { rotatable: true });
     * moveable.on("rotateStart", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
    * When rotating, the rotate event is called.
    * @memberof Moveable.Rotatable
    * @event rotate
    * @param {Moveable.Rotatable.OnRotate} - Parameters for the rotate event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, { rotatable: true });
    * moveable.on("rotate", ({ target, transform, dist }) => {
    *     target.style.transform = transform;
    * });
    */

    /**
     * When the rotate finishes, the rotateEnd event is called.
     * @memberof Moveable.Rotatable
     * @event rotateEnd
     * @param {Moveable.Rotatable.OnRotateEnd} - Parameters for the rotateEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { rotatable: true });
     * moveable.on("rotateEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */

    /**
     * When the group rotate starts, the `rotateGroupStart` event is called.
     * @memberof Moveable.Rotatable
     * @event rotateGroupStart
     * @param {Moveable.Rotatable.OnRotateGroupStart} - Parameters for the `rotateGroupStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     rotatable: true
     * });
     * moveable.on("rotateGroupStart", ({ targets }) => {
     *     console.log("onRotateGroupStart", targets);
     * });
     */

    /**
    * When the group rotate, the `rotateGroup` event is called.
    * @memberof Moveable.Rotatable
    * @event rotateGroup
    * @param {Moveable.Rotatable.OnRotateGroup} - Parameters for the `rotateGroup` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     rotatable: true
    * });
    * moveable.on("rotateGroup", ({ targets, events }) => {
    *     console.log("onRotateGroup", targets);
    *     events.forEach(ev => {
    *         const target = ev.target;
    *         // ev.drag is a drag event that occurs when the group rotate.
    *         const left = ev.drag.beforeDist[0];
    *         const top = ev.drag.beforeDist[1];
    *         const deg = ev.beforeDist;
    *     });
    * });
    */

    /**
     * When the group rotate finishes, the `rotateGroupEnd` event is called.
     * @memberof Moveable.Rotatable
     * @event rotateGroupEnd
     * @param {Moveable.Rotatable.OnRotateGroupEnd} - Parameters for the `rotateGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     rotatable: true
     * });
     * moveable.on("rotateGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onRotateGroupEnd", targets, isDrag);
     * });
     */

    function renderControls(moveable, defaultDirections, React) {
      var _a = moveable.state,
          renderPoses = _a.renderPoses,
          rotation = _a.rotation;
      var _b = moveable.props.renderDirections,
          directions = _b === void 0 ? defaultDirections : _b;
      var direction = moveable.state.direction;
      var directionMap = {};
      directions.forEach(function (dir) {
        directionMap[dir] = true;
      });
      return directions.map(function (dir) {
        var indexes = DIRECTION_INDEXES[dir];

        if (!indexes || !directionMap[dir]) {
          return null;
        }

        var directionRotation = throttle(rotation / Math.PI * 180, 15) + DIRECTION_ROTATIONS[dir];

        if (direction < 1) {
          directionRotation = 360 - directionRotation;
        }

        directionRotation %= 180;
        return React.createElement("div", {
          className: prefix("control", "direction", dir),
          "data-rotation": directionRotation,
          "data-direction": dir,
          key: "direction-" + dir,
          style: getControlTransform.apply(void 0, __spreadArrays$1([rotation], indexes.map(function (index) {
            return renderPoses[index];
          })))
        });
      });
    }
    function renderLine(React, direction, pos1, pos2, key) {
      var classNames = [];

      for (var _i = 5; _i < arguments.length; _i++) {
        classNames[_i - 5] = arguments[_i];
      }

      var rad = getRad$1(pos1, pos2);
      var rotation = direction ? throttle(rad / Math.PI * 180, 15) % 180 : -1;
      return React.createElement("div", {
        key: "line" + key,
        className: prefix.apply(void 0, __spreadArrays$1(["line", "direction", direction], classNames)),
        "data-rotation": rotation,
        "data-line-index": key,
        "data-direction": direction,
        style: getLineStyle(pos1, pos2, rad)
      });
    }
    function renderAllDirections(moveable, React) {
      return renderControls(moveable, DIRECTIONS, React);
    }
    function renderDiagonalDirections(moveable, React) {
      return renderControls(moveable, ["nw", "ne", "sw", "se"], React);
    }

    /**
     * @namespace Resizable
     * @memberof Moveable
     * @description Resizable indicates whether the target's width and height can be increased or decreased.
     */

    var Resizable = {
      name: "resizable",
      ableGroup: "size",
      updateRect: true,
      canPinch: true,
      props: {
        resizable: Boolean,
        throttleResize: Number,
        renderDirections: Array,
        keepRatio: Boolean
      },
      events: {
        onResizeStart: "resizeStart",
        onResize: "resize",
        onResizeEnd: "resizeEnd",
        onResizeGroupStart: "resizeGroupStart",
        onResizeGroup: "resizeGroup",
        onResizeGroupEnd: "resizeGroupEnd"
      },
      render: function (moveable, React) {
        var _a = moveable.props,
            resizable = _a.resizable,
            edge = _a.edge;

        if (resizable) {
          if (edge) {
            return renderDiagonalDirections(moveable, React);
          }

          return renderAllDirections(moveable, React);
        }
      },
      dragControlCondition: directionCondition,
      dragControlStart: function (moveable, e) {
        var _a;

        var inputEvent = e.inputEvent,
            isPinch = e.isPinch,
            parentDirection = e.parentDirection,
            datas = e.datas,
            parentFlag = e.parentFlag;
        var direction = parentDirection || (isPinch ? [0, 0] : getDirection(inputEvent.target));
        var _b = moveable.state,
            target = _b.target,
            width = _b.width,
            height = _b.height;

        if (!direction || !target) {
          return false;
        }

        !isPinch && setDragStart(moveable, e);
        datas.datas = {};
        datas.direction = direction;
        datas.startOffsetWidth = width;
        datas.startOffsetHeight = height;
        datas.prevWidth = 0;
        datas.prevHeight = 0;
        _a = getCSSSize(target), datas.startWidth = _a[0], datas.startHeight = _a[1];
        var padding = [Math.max(0, width - datas.startWidth), Math.max(0, height - datas.startHeight)];
        datas.minSize = padding;
        datas.maxSize = [Infinity, Infinity];

        if (!parentFlag) {
          var style = window.getComputedStyle(target);
          datas.minSize = plus([parseFloat(style.minWidth) || 0, parseFloat(style.minHeight) || 0], padding);
          datas.maxSize = plus([parseFloat(style.maxWidth) || Infinity, parseFloat(style.maxHeight) || Infinity], padding);
        }

        var transformOrigin = moveable.props.transformOrigin || "% %";
        datas.transformOrigin = transformOrigin && isString$1(transformOrigin) ? transformOrigin.split(" ") : transformOrigin;
        datas.startDirection = getStartDirection(moveable, direction);
        datas.fixedPosition = getAbsoluteFixedPosition(moveable, datas.startDirection);
        datas.fixedOriginalPosition = getAbsoluteFixedPosition(moveable, direction);
        var params = fillParams(moveable, e, {
          direction: direction,
          set: function (_a) {
            var startWidth = _a[0],
                startHeight = _a[1];
            datas.startWidth = startWidth;
            datas.startHeight = startHeight;
          },
          setMin: function (minSize) {
            datas.minSize = minSize;
          },
          setMax: function (maxSize) {
            datas.maxSize = maxSize;
          },
          setOrigin: function (origin) {
            datas.transformOrigin = origin;
          },
          dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
        });
        var result = triggerEvent(moveable, "onResizeStart", params);

        if (result !== false) {
          datas.isResize = true;
          moveable.state.snapRenderInfo = {
            request: e.isRequest,
            direction: direction
          };
        }

        return datas.isResize ? params : false;
      },
      dragControl: function (moveable, e) {
        var _a;

        var datas = e.datas,
            distX = e.distX,
            distY = e.distY,
            parentFlag = e.parentFlag,
            isPinch = e.isPinch,
            parentDistance = e.parentDistance,
            parentScale = e.parentScale,
            parentKeepRatio = e.parentKeepRatio,
            dragClient = e.dragClient,
            parentDist = e.parentDist,
            isRequest = e.isRequest;
        var direction = datas.direction,
            isResize = datas.isResize,
            transformOrigin = datas.transformOrigin;

        if (!isResize) {
          return;
        }

        var startWidth = datas.startWidth,
            startHeight = datas.startHeight,
            startOffsetWidth = datas.startOffsetWidth,
            startOffsetHeight = datas.startOffsetHeight,
            prevWidth = datas.prevWidth,
            prevHeight = datas.prevHeight,
            minSize = datas.minSize,
            maxSize = datas.maxSize;
        var _b = moveable.props,
            _c = _b.throttleResize,
            throttleResize = _c === void 0 ? 0 : _c,
            parentMoveable = _b.parentMoveable;
        var sizeDirection = direction;

        if (!direction[0] && !direction[1]) {
          sizeDirection = [1, 1];
        }

        var keepRatio = moveable.props.keepRatio || parentKeepRatio;
        var isWidth = sizeDirection[0] || !sizeDirection[1];
        var ratio = isWidth ? startOffsetHeight / startOffsetWidth : startOffsetWidth / startOffsetHeight;
        var startDirection = keepRatio || parentFlag ? direction : datas.startDirection;
        var fixedPosition = dragClient;
        var distWidth = 0;
        var distHeight = 0;

        if (!dragClient) {
          if (!parentFlag && isPinch) {
            fixedPosition = getAbsoluteFixedPosition(moveable, [0, 0]);
          } else {
            fixedPosition = keepRatio ? datas.fixedOriginalPosition : datas.fixedPosition;
          }
        }

        if (parentDist) {
          distWidth = parentDist[0];
          distHeight = parentDist[1];
        } else if (parentScale) {
          distWidth = (parentScale[0] - 1) * startOffsetWidth;
          distHeight = (parentScale[1] - 1) * startOffsetHeight;
        } else if (isPinch) {
          if (parentDistance) {
            distWidth = parentDistance;
            distHeight = parentDistance * startOffsetHeight / startOffsetWidth;
          }
        } else {
          var dist = getDragDist({
            datas: datas,
            distX: distX,
            distY: distY
          });
          distWidth = sizeDirection[0] * dist[0];
          distHeight = sizeDirection[1] * dist[1];

          if (keepRatio && startOffsetWidth && startOffsetHeight) {
            var rad = getRad$1([0, 0], dist);
            var standardRad = getRad$1([0, 0], sizeDirection);
            var ratioRad = getRad$1([0, 0], [startOffsetWidth, startOffsetHeight]);
            var size = getDistSize([distWidth, distHeight]);
            var signSize = Math.cos(rad - standardRad) * size;

            if (!sizeDirection[0]) {
              // top, bottom
              distHeight = signSize;
              distWidth = getKeepRatioWidth(distHeight, isWidth, ratio);
            } else if (!sizeDirection[1]) {
              // left, right
              distWidth = signSize;
              distHeight = getKeepRatioHeight(distWidth, isWidth, ratio);
            } else {
              // two-way
              distWidth = Math.cos(ratioRad) * signSize;
              distHeight = Math.sin(ratioRad) * signSize;
            }
          }
        }

        var nextWidth = sizeDirection[0] || keepRatio ? Math.max(startOffsetWidth + distWidth, TINY_NUM) : startOffsetWidth;
        var nextHeight = sizeDirection[1] || keepRatio ? Math.max(startOffsetHeight + distHeight, TINY_NUM) : startOffsetHeight;

        if (keepRatio && startOffsetWidth && startOffsetHeight) {
          // startOffsetWidth : startOffsetHeight = nextWidth : nextHeight
          nextHeight = nextWidth * startOffsetHeight / startOffsetWidth;
        }

        var snapDist = [0, 0];

        if (!isPinch) {
          snapDist = checkSnapSize(moveable, nextWidth, nextHeight, direction, datas.fixedOriginalPosition, isRequest, datas);
        }

        if (parentDist) {
          !parentDist[0] && (snapDist[0] = 0);
          !parentDist[1] && (snapDist[1] = 0);
        }

        if (keepRatio) {
          if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
            if (Math.abs(snapDist[0]) > Math.abs(snapDist[1])) {
              snapDist[1] = 0;
            } else {
              snapDist[0] = 0;
            }
          }

          var isNoSnap = !snapDist[0] && !snapDist[1];

          if (isNoSnap) {
            if (isWidth) {
              nextWidth = throttle(nextWidth, throttleResize);
            } else {
              nextHeight = throttle(nextHeight, throttleResize);
            }
          }

          if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
            nextWidth += snapDist[0];
            nextHeight = getKeepRatioHeight(nextWidth, isWidth, ratio);
          } else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
            nextHeight += snapDist[1];
            nextWidth = getKeepRatioWidth(nextHeight, isWidth, ratio);
          }
        } else {
          nextWidth += snapDist[0];
          nextHeight += snapDist[1];

          if (!snapDist[0]) {
            nextWidth = throttle(nextWidth, throttleResize);
          }

          if (!snapDist[1]) {
            nextHeight = throttle(nextHeight, throttleResize);
          }
        }

        _a = caculateBoundSize([nextWidth, nextHeight], minSize, maxSize, keepRatio), nextWidth = _a[0], nextHeight = _a[1];
        nextWidth = Math.round(nextWidth);
        nextHeight = Math.round(nextHeight);
        distWidth = nextWidth - startOffsetWidth;
        distHeight = nextHeight - startOffsetHeight;
        var delta = [distWidth - prevWidth, distHeight - prevHeight];
        datas.prevWidth = distWidth;
        datas.prevHeight = distHeight;
        var inverseDelta = getResizeDist(moveable, nextWidth, nextHeight, startDirection, fixedPosition, transformOrigin);

        if (!parentMoveable && delta.every(function (num) {
          return !num;
        }) && inverseDelta.every(function (num) {
          return !num;
        })) {
          return;
        }

        var params = fillParams(moveable, e, {
          width: startWidth + distWidth,
          height: startHeight + distHeight,
          offsetWidth: nextWidth,
          offsetHeight: nextHeight,
          direction: direction,
          dist: [distWidth, distHeight],
          delta: delta,
          isPinch: !!isPinch,
          drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, inverseDelta, !!isPinch, false))
        });
        triggerEvent(moveable, "onResize", params);
        return params;
      },
      dragControlAfter: function (moveable, e) {
        var datas = e.datas;
        var isResize = datas.isResize,
            startOffsetWidth = datas.startOffsetWidth,
            startOffsetHeight = datas.startOffsetHeight,
            prevWidth = datas.prevWidth,
            prevHeight = datas.prevHeight;

        if (!isResize) {
          return;
        }

        var _a = moveable.state,
            width = _a.width,
            height = _a.height;
        var errorWidth = width - (startOffsetWidth + prevWidth);
        var errorHeight = height - (startOffsetHeight + prevHeight);
        var isErrorWidth = Math.abs(errorWidth) > 3;
        var isErrorHeight = Math.abs(errorHeight) > 3;

        if (isErrorWidth) {
          datas.startWidth += errorWidth;
          datas.startOffsetWidth += errorWidth;
          datas.prevWidth += errorWidth;
        }

        if (isErrorHeight) {
          datas.startHeight += errorHeight;
          datas.startOffsetHeight += errorHeight;
          datas.prevHeight += errorHeight;
        }

        if (isErrorWidth || isErrorHeight) {
          this.dragControl(moveable, e);
          return true;
        }
      },
      dragControlEnd: function (moveable, e) {
        var datas = e.datas,
            isDrag = e.isDrag;

        if (!datas.isResize) {
          return false;
        }

        datas.isResize = false;
        var params = fillEndParams(moveable, e, {});
        triggerEvent(moveable, "onResizeEnd", params);
        return isDrag;
      },
      dragGroupControlCondition: directionCondition,
      dragGroupControlStart: function (moveable, e) {
        var datas = e.datas;
        var params = this.dragControlStart(moveable, e);

        if (!params) {
          return false;
        }

        var direction = params.direction;
        var fixedPosition = datas.fixedOriginalPosition;
        var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
          var pos = getAbsoluteFixedPosition(child, direction);

          var _a = caculate(createRotateMatrix(-moveable.rotation / 180 * Math.PI, 3), [pos[0] - fixedPosition[0], pos[1] - fixedPosition[1], 1], 3),
              originalX = _a[0],
              originalY = _a[1];

          ev.datas.originalX = originalX;
          ev.datas.originalY = originalY;
          return ev;
        });

        var nextParams = __assign$4(__assign$4({}, params), {
          targets: moveable.props.targets,
          events: events
        });

        var result = triggerEvent(moveable, "onResizeGroupStart", nextParams);
        datas.isResize = result !== false;
        return datas.isResize ? params : false;
      },
      dragGroupControl: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isResize) {
          return;
        }

        var params = this.dragControl(moveable, e);

        if (!params) {
          return;
        }

        var offsetWidth = params.offsetWidth,
            offsetHeight = params.offsetHeight,
            dist = params.dist;
        var keepRatio = moveable.props.keepRatio;
        var parentScale = [offsetWidth / (offsetWidth - dist[0]), offsetHeight / (offsetHeight - dist[1])];
        var fixedPosition = datas.fixedOriginalPosition;
        var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
          var _a = caculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [ev.datas.originalX * parentScale[0], ev.datas.originalY * parentScale[1], 1], 3),
              clientX = _a[0],
              clientY = _a[1];

          return __assign$4(__assign$4({}, ev), {
            parentDist: null,
            parentScale: parentScale,
            dragClient: plus(fixedPosition, [clientX, clientY]),
            parentKeepRatio: keepRatio
          });
        });

        var nextParams = __assign$4({
          targets: moveable.props.targets,
          events: events
        }, params);

        triggerEvent(moveable, "onResizeGroup", nextParams);
        return nextParams;
      },
      dragGroupControlEnd: function (moveable, e) {
        var isDrag = e.isDrag,
            datas = e.datas;

        if (!datas.isResize) {
          return;
        }

        this.dragControlEnd(moveable, e);
        triggerChildAble(moveable, this, "dragControlEnd", e);
        var nextParams = fillEndParams(moveable, e, {
          targets: moveable.props.targets
        });
        triggerEvent(moveable, "onResizeGroupEnd", nextParams);
        return isDrag;
      },

      /**
       * @method Moveable.Resizable#request
       * @param {object} [e] - the Resizable's request parameter
       * @param {number} [e.direction=[1, 1]] - Direction to resize
       * @param {number} [e.deltaWidth] - delta number of width
       * @param {number} [e.deltaHeight] - delta number of height
       * @param {number} [e.offsetWidth] - offset number of width
       * @param {number} [e.offsetHeight] - offset number of height
       * @param {number} [e.isInstant] - Whether to execute the request instantly
       * @return {Moveable.Requester} Moveable Requester
       * @example
        * // Instantly Request (requestStart - request - requestEnd)
       * // Use Relative Value
       * moveable.request("resizable", { deltaWidth: 10, deltaHeight: 10 }, true);
       *
       * // Use Absolute Value
       * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 }, true);
       *
       * // requestStart
       * const requester = moveable.request("resizable");
       *
       * // request
       * // Use Relative Value
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       *
       * // Use Absolute Value
       * moveable.request("resizable", { offsetWidth: 100, offsetHeight: 100 });
       * moveable.request("resizable", { offsetWidth: 110, offsetHeight: 100 });
       * moveable.request("resizable", { offsetWidth: 120, offsetHeight: 100 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
      request: function (moveable) {
        var datas = {};
        var distWidth = 0;
        var distHeight = 0;
        var rect = moveable.getRect();
        return {
          isControl: true,
          requestStart: function (e) {
            return {
              datas: datas,
              parentDirection: e.direction || [1, 1]
            };
          },
          request: function (e) {
            if ("offsetWidth" in e) {
              distWidth = e.offsetWidth - rect.offsetWidth;
            } else if ("deltaWidth" in e) {
              distWidth += e.deltaWidth;
            }

            if ("offsetHeight" in e) {
              distHeight = e.offsetHeight - rect.offsetHeight;
            } else if ("deltaHeight" in e) {
              distHeight += e.deltaHeight;
            }

            return {
              datas: datas,
              parentDist: [distWidth, distHeight]
            };
          },
          requestEnd: function () {
            return {
              datas: datas,
              isDrag: true
            };
          }
        };
      }
    };
    /**
     * Whether or not target can be resized. (default: false)
     * @name Moveable.Resizable#resizable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     resizable: false,
     * });
     *
     * moveable.resizable = true;
     */

    /**
     * throttle of width, height when resize.
     * @name Moveable.Resizable#throttleResize
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     *   throttleResize: 0,
     * });
     *
     * moveable.throttleResize = 1;
     */

    /**
     * When resize or scale, keeps a ratio of the width, height. (default: false)
     * @name Moveable.Resizable#keepRatio
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     * });
     *
     * moveable.keepRatio = true;
     */

    /**
     * Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
     * @name Moveable.Resizable#renderDirections
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   resizable: true,
     *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
     * });
     *
     * moveable.renderDirections = ["nw", "ne", "sw", "se"];
     */

    /**
     * When the resize starts, the resizeStart event is called.
     * @memberof Moveable.Resizable
     * @event resizeStart
     * @param {Moveable.Resizable.OnResizeStart} - Parameters for the resizeStart event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resizeStart", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When resizing, the resize event is called.
     * @memberof Moveable.Resizable
     * @event resize
     * @param {Moveable.Resizable.OnResize} - Parameters for the resize event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resize", ({ target, width, height }) => {
     *     target.style.width = `${e.width}px`;
     *     target.style.height = `${e.height}px`;
     * });
     */

    /**
     * When the resize finishes, the resizeEnd event is called.
     * @memberof Moveable.Resizable
     * @event resizeEnd
     * @param {Moveable.Resizable.OnResizeEnd} - Parameters for the resizeEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { resizable: true });
     * moveable.on("resizeEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */

    /**
    * When the group resize starts, the `resizeGroupStart` event is called.
    * @memberof Moveable.Resizable
    * @event resizeGroupStart
    * @param {Moveable.Resizable.OnResizeGroupStart} - Parameters for the `resizeGroupStart` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     resizable: true
    * });
    * moveable.on("resizeGroupStart", ({ targets }) => {
    *     console.log("onResizeGroupStart", targets);
    * });
    */

    /**
    * When the group resize, the `resizeGroup` event is called.
    * @memberof Moveable.Resizable
    * @event resizeGroup
    * @param {Moveable.Resizable.onResizeGroup} - Parameters for the `resizeGroup` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     resizable: true
    * });
    * moveable.on("resizeGroup", ({ targets, events }) => {
    *     console.log("onResizeGroup", targets);
    *     events.forEach(ev => {
    *         const offset = [
    *             direction[0] < 0 ? -ev.delta[0] : 0,
    *             direction[1] < 0 ? -ev.delta[1] : 0,
    *         ];
    *         // ev.drag is a drag event that occurs when the group resize.
    *         const left = offset[0] + ev.drag.beforeDist[0];
    *         const top = offset[1] + ev.drag.beforeDist[1];
    *         const width = ev.width;
    *         const top = ev.top;
    *     });
    * });
    */

    /**
     * When the group resize finishes, the `resizeGroupEnd` event is called.
     * @memberof Moveable.Resizable
     * @event resizeGroupEnd
     * @param {Moveable.Resizable.OnResizeGroupEnd} - Parameters for the `resizeGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     resizable: true
     * });
     * moveable.on("resizeGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onResizeGroupEnd", targets, isDrag);
     * });
     */

    /**
     * @namespace Scalable
     * @memberof Moveable
     * @description Scalable indicates whether the target's x and y can be scale of transform.
     */

    var Scalable = {
      name: "scalable",
      ableGroup: "size",
      canPinch: true,
      props: {
        scalable: Boolean,
        throttleScale: Number,
        renderDirections: String,
        keepRatio: Boolean
      },
      events: {
        onScaleStart: "scaleStart",
        onScale: "scale",
        onScaleEnd: "scaleEnd",
        onScaleGroupStart: "scaleGroupStart",
        onScaleGroup: "scaleGroup",
        onScaleGroupEnd: "scaleGroupEnd"
      },
      render: function (moveable, React) {
        var _a = moveable.props,
            resizable = _a.resizable,
            scalable = _a.scalable,
            edge = _a.edge;

        if (!resizable && scalable) {
          if (edge) {
            return renderDiagonalDirections(moveable, React);
          }

          return renderAllDirections(moveable, React);
        }
      },
      dragControlCondition: directionCondition,
      dragControlStart: function (moveable, e) {
        var datas = e.datas,
            isPinch = e.isPinch,
            inputEvent = e.inputEvent,
            parentDirection = e.parentDirection;
        var direction = parentDirection || (isPinch ? [0, 0] : getDirection(inputEvent.target));
        var _a = moveable.state,
            width = _a.width,
            height = _a.height,
            targetTransform = _a.targetTransform,
            target = _a.target;

        if (!direction || !target) {
          return false;
        }

        if (!isPinch) {
          setDragStart(moveable, e);
        }

        setDefaultTransformIndex(e);
        datas.datas = {};
        datas.transform = targetTransform;
        datas.prevDist = [1, 1];
        datas.direction = direction;
        datas.width = width;
        datas.height = height;
        datas.startValue = [1, 1];
        datas.fixedDirection = direction.map(function (dir) {
          return -dir;
        });
        datas.fixedPosition = getAbsoluteFixedPosition(moveable, direction);
        var params = fillParams(moveable, e, __assign$4(__assign$4({
          direction: direction,
          set: function (scale) {
            datas.startValue = scale;
          }
        }, fillTransformStartEvent(e)), {
          dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
        }));
        var result = triggerEvent(moveable, "onScaleStart", params);

        if (result !== false) {
          datas.isScale = true;
          moveable.state.snapRenderInfo = {
            request: e.isRequest,
            direction: direction
          };
        }

        return datas.isScale ? params : false;
      },
      dragControl: function (moveable, e) {
        resolveTransformEvent(e, "scale");
        var datas = e.datas,
            distX = e.distX,
            distY = e.distY,
            parentScale = e.parentScale,
            parentDistance = e.parentDistance,
            parentKeepRatio = e.parentKeepRatio,
            parentFlag = e.parentFlag,
            isPinch = e.isPinch,
            dragClient = e.dragClient,
            parentDist = e.parentDist,
            isRequest = e.isRequest;
        var prevDist = datas.prevDist,
            direction = datas.direction,
            width = datas.width,
            height = datas.height,
            isScale = datas.isScale,
            startValue = datas.startValue;

        if (!isScale) {
          return false;
        }

        var _a = moveable.props,
            throttleScale = _a.throttleScale,
            parentMoveable = _a.parentMoveable;
        var sizeDirection = direction;

        if (!direction[0] && !direction[1]) {
          sizeDirection = [1, 1];
        }

        var keepRatio = moveable.props.keepRatio || parentKeepRatio;
        var state = moveable.state;
        var isWidth = sizeDirection[0] || !sizeDirection[1];
        var startWidth = width * startValue[0];
        var startHeight = height * startValue[1];
        var ratio = isWidth ? startHeight / startWidth : startWidth / startHeight;
        var scaleX = 1;
        var scaleY = 1;
        var fixedPosition = dragClient;

        if (!dragClient) {
          if (!parentFlag && isPinch) {
            fixedPosition = getAbsoluteFixedPosition(moveable, [0, 0]);
          } else {
            fixedPosition = datas.fixedPosition;
          }
        }

        if (parentDist) {
          scaleX = (width + parentDist[0]) / width;
          scaleY = (height + parentDist[1]) / height;
        } else if (parentScale) {
          scaleX = parentScale[0];
          scaleY = parentScale[1];
        } else if (isPinch) {
          if (parentDistance) {
            scaleX = (width + parentDistance) / width;
            scaleY = (height + parentDistance * height / width) / height;
          }
        } else {
          var dragDist = getDragDist({
            datas: datas,
            distX: distX,
            distY: distY
          });
          var distWidth = sizeDirection[0] * dragDist[0];
          var distHeight = sizeDirection[1] * dragDist[1];

          if (keepRatio && width && height) {
            var rad = getRad$1([0, 0], dragDist);
            var standardRad = getRad$1([0, 0], sizeDirection);
            var ratioRad = getRad$1([0, 0], [startWidth, startHeight]);
            var size = getDistSize([distWidth, distHeight]);
            var signSize = Math.cos(rad - standardRad) * size;

            if (!sizeDirection[0]) {
              // top, bottom
              distHeight = signSize;
              distWidth = getKeepRatioWidth(distHeight, isWidth, ratio);
            } else if (!sizeDirection[1]) {
              // left, right
              distWidth = signSize;
              distHeight = getKeepRatioHeight(distWidth, isWidth, ratio);
            } else {
              // two-way
              distWidth = Math.cos(ratioRad) * signSize;
              distHeight = Math.sin(ratioRad) * signSize;
            }
          }

          scaleX = (width + distWidth) / width;
          scaleY = (height + distHeight) / height;
        }

        scaleX = sizeDirection[0] || keepRatio ? scaleX * startValue[0] : startValue[0];
        scaleY = sizeDirection[1] || keepRatio ? scaleY * startValue[1] : startValue[1];

        if (scaleX === 0) {
          scaleX = (prevDist[0] > 0 ? 1 : -1) * MIN_SCALE;
        }

        if (scaleY === 0) {
          scaleY = (prevDist[1] > 0 ? 1 : -1) * MIN_SCALE;
        }

        var dist = [scaleX / startValue[0], scaleY / startValue[1]];
        var scale = [scaleX, scaleY];

        if (!isPinch && moveable.props.groupable) {
          var snapRenderInfo = state.snapRenderInfo || {};
          var stateDirection = snapRenderInfo.direction;

          if (isArray$1(stateDirection) && (stateDirection[0] || stateDirection[1])) {
            state.snapRenderInfo = {
              direction: direction,
              request: e.isRequest
            };
          }
        }

        var snapDist = [0, 0];

        if (!isPinch) {
          snapDist = checkSnapScale(moveable, dist, direction, datas.fixedPosition, isRequest, datas);
        }

        if (keepRatio) {
          if (sizeDirection[0] && sizeDirection[1] && snapDist[0] && snapDist[1]) {
            if (Math.abs(snapDist[0]) > Math.abs(snapDist[1])) {
              snapDist[1] = 0;
            } else {
              snapDist[0] = 0;
            }
          }

          var isNoSnap = !snapDist[0] && !snapDist[1];

          if (isNoSnap) {
            if (isWidth) {
              dist[0] = throttle(dist[0] * startValue[0], throttleScale) / startValue[0];
            } else {
              dist[1] = throttle(dist[1] * startValue[1], throttleScale) / startValue[1];
            }
          }

          if (sizeDirection[0] && !sizeDirection[1] || snapDist[0] && !snapDist[1] || isNoSnap && isWidth) {
            dist[0] += snapDist[0];
            var snapHeight = getKeepRatioHeight(width * dist[0] * startValue[0], isWidth, ratio);
            dist[1] = snapHeight / height / startValue[1];
          } else if (!sizeDirection[0] && sizeDirection[1] || !snapDist[0] && snapDist[1] || isNoSnap && !isWidth) {
            dist[1] += snapDist[1];
            var snapWidth = getKeepRatioWidth(height * dist[1] * startValue[1], isWidth, ratio);
            dist[0] = snapWidth / width / startValue[0];
          }
        } else {
          dist[0] += snapDist[0];
          dist[1] += snapDist[1];

          if (!snapDist[0]) {
            dist[0] = throttle(dist[0] * startValue[0], throttleScale) / startValue[0];
          }

          if (!snapDist[1]) {
            dist[1] = throttle(dist[1] * startValue[1], throttleScale) / startValue[1];
          }
        }

        if (dist[0] === 0) {
          dist[0] = (prevDist[0] > 0 ? 1 : -1) * MIN_SCALE;
        }

        if (dist[1] === 0) {
          dist[1] = (prevDist[1] > 0 ? 1 : -1) * MIN_SCALE;
        }

        var delta = [dist[0] / prevDist[0], dist[1] / prevDist[1]];
        scale = multiply2(dist, startValue);
        var inverseDist = getScaleDist(moveable, dist, direction, fixedPosition, datas);
        var inverseDelta = minus(inverseDist, datas.prevInverseDist || [0, 0]);
        datas.prevDist = dist;
        datas.prevInverseDist = inverseDist;

        if (scaleX === prevDist[0] && scaleY === prevDist[1] && inverseDelta.every(function (num) {
          return !num;
        }) && !parentMoveable) {
          return false;
        }

        var nextTransform = convertTransformFormat(datas, "scale(" + scale.join(", ") + ")", "scale(" + dist.join(", ") + ")");
        var params = fillParams(moveable, e, __assign$4({
          offsetWidth: width,
          offsetHeight: height,
          direction: direction,
          // beforeScale,
          // beforeDist,
          // beforeDelta,
          scale: scale,
          dist: dist,
          delta: delta,
          isPinch: !!isPinch
        }, fillTransformEvent(moveable, nextTransform, inverseDelta, isPinch, e)));
        triggerEvent(moveable, "onScale", params);
        return params;
      },
      dragControlEnd: function (moveable, e) {
        var datas = e.datas,
            isDrag = e.isDrag;

        if (!datas.isScale) {
          return false;
        }

        datas.isScale = false;
        triggerEvent(moveable, "onScaleEnd", fillEndParams(moveable, e, {}));
        return isDrag;
      },
      dragGroupControlCondition: directionCondition,
      dragGroupControlStart: function (moveable, e) {
        var datas = e.datas;
        var params = this.dragControlStart(moveable, e);

        if (!params) {
          return false;
        }

        var direction = params.direction;
        var fixedPosition = datas.fixedPosition;
        datas.moveableScale = moveable.scale;
        var events = triggerChildAble(moveable, this, "dragControlStart", e, function (child, ev) {
          var pos = getAbsoluteFixedPosition(child, direction);

          var _a = caculate(createRotateMatrix(-moveable.rotation / 180 * Math.PI, 3), [pos[0] - fixedPosition[0], pos[1] - fixedPosition[1], 1], 3),
              originalX = _a[0],
              originalY = _a[1];

          ev.datas.originalX = originalX;
          ev.datas.originalY = originalY;
          return ev;
        });

        var nextParams = __assign$4(__assign$4({}, params), {
          targets: moveable.props.targets,
          events: events
        });

        var result = triggerEvent(moveable, "onScaleGroupStart", nextParams);
        datas.isScale = result !== false;
        return datas.isScale ? nextParams : false;
      },
      dragGroupControl: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isScale) {
          return;
        }

        var params = this.dragControl(moveable, e);

        if (!params) {
          return;
        }

        var moveableScale = datas.moveableScale;
        moveable.scale = [params.scale[0] * moveableScale[0], params.scale[1] * moveableScale[1]];
        var keepRatio = moveable.props.keepRatio;
        var dist = params.dist,
            scale = params.scale; // const fixedDirection = datas.fixedDirection;

        var fixedPosition = datas.fixedPosition;
        var events = triggerChildAble(moveable, this, "dragControl", e, function (_, ev) {
          var _a = caculate(createRotateMatrix(moveable.rotation / 180 * Math.PI, 3), [ev.datas.originalX * dist[0], ev.datas.originalY * dist[1], 1], 3),
              clientX = _a[0],
              clientY = _a[1];

          return __assign$4(__assign$4({}, ev), {
            parentDist: null,
            parentScale: scale,
            parentKeepRatio: keepRatio,
            dragClient: plus(fixedPosition, [clientX, clientY])
          });
        });

        var nextParams = __assign$4({
          targets: moveable.props.targets,
          events: events
        }, params);

        triggerEvent(moveable, "onScaleGroup", nextParams);
        return nextParams;
      },
      dragGroupControlEnd: function (moveable, e) {
        var isDrag = e.isDrag,
            datas = e.datas;

        if (!datas.isScale) {
          return;
        }

        this.dragControlEnd(moveable, e);
        triggerChildAble(moveable, this, "dragControlEnd", e);
        var nextParams = fillEndParams(moveable, e, {
          targets: moveable.props.targets
        });
        triggerEvent(moveable, "onScaleGroupEnd", nextParams);
        return isDrag;
      },

      /**
       * @method Moveable.Scalable#request
       * @param {object} [e] - the Resizable's request parameter
       * @param {number} [e.direction=[1, 1]] - Direction to scale
       * @param {number} [e.deltaWidth] - delta number of width
       * @param {number} [e.deltaHeight] - delta number of height
       * @return {Moveable.Requester} Moveable Requester
       * @example
        * // Instantly Request (requestStart - request - requestEnd)
       * moveable.request("scalable", { deltaWidth: 10, deltaHeight: 10 }, true);
       *
       * // requestStart
       * const requester = moveable.request("scalable");
       *
       * // request
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       * requester.request({ deltaWidth: 10, deltaHeight: 10 });
       *
       * // requestEnd
       * requester.requestEnd();
       */
      request: function () {
        var datas = {};
        var distWidth = 0;
        var distHeight = 0;
        return {
          isControl: true,
          requestStart: function (e) {
            return {
              datas: datas,
              parentDirection: e.direction || [1, 1]
            };
          },
          request: function (e) {
            distWidth += e.deltaWidth;
            distHeight += e.deltaHeight;
            return {
              datas: datas,
              parentDist: [distWidth, distHeight]
            };
          },
          requestEnd: function () {
            return {
              datas: datas,
              isDrag: true
            };
          }
        };
      }
    };
    /**
     * Whether or not target can scaled. (default: false)
     * @name Moveable.Scalable#scalable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.scalable = true;
     */

    /**
     * throttle of scaleX, scaleY when scale.
     * @name Moveable.Scalable#throttleScale
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.throttleScale = 0.1;
     */

    /**
     * Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
     * @name Moveable.Scalable#renderDirections
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     scalable: true,
     *   renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
     * });
     *
     * moveable.renderDirections = ["nw", "ne", "sw", "se"];
     */

    /**
     * When resize or scale, keeps a ratio of the width, height. (default: false)
     * @name Moveable.Scalable#keepRatio
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     scalable: true,
     * });
     *
     * moveable.keepRatio = true;
     */

    /**
     * When the scale starts, the scaleStart event is called.
     * @memberof Moveable.Scalable
     * @event scaleStart
     * @param {Moveable.Scalable.OnScaleStart} - Parameters for the scaleStart event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scaleStart", ({ target }) => {
     *     console.log(target);
     * });
     */

    /**
     * When scaling, the scale event is called.
     * @memberof Moveable.Scalable
     * @event scale
     * @param {Moveable.Scalable.OnScale} - Parameters for the scale event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scale", ({ target, transform, dist }) => {
     *     target.style.transform = transform;
     * });
     */

    /**
     * When the scale finishes, the scaleEnd event is called.
     * @memberof Moveable.Scalable
     * @event scaleEnd
     * @param {Moveable.Scalable.OnScaleEnd} - Parameters for the scaleEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { scalable: true });
     * moveable.on("scaleEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */

    /**
    * When the group scale starts, the `scaleGroupStart` event is called.
    * @memberof Moveable.Scalable
    * @event scaleGroupStart
    * @param {Moveable.Scalable.OnScaleGroupStart} - Parameters for the `scaleGroupStart` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     scalable: true
    * });
    * moveable.on("scaleGroupStart", ({ targets }) => {
    *     console.log("onScaleGroupStart", targets);
    * });
    */

    /**
    * When the group scale, the `scaleGroup` event is called.
    * @memberof Moveable.Scalable
    * @event scaleGroup
    * @param {Moveable.Scalable.OnScaleGroup} - Parameters for the `scaleGroup` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     target: [].slice.call(document.querySelectorAll(".target")),
    *     scalable: true
    * });
    * moveable.on("scaleGroup", ({ targets, events }) => {
    *     console.log("onScaleGroup", targets);
    *     events.forEach(ev => {
    *         const target = ev.target;
    *         // ev.drag is a drag event that occurs when the group scale.
    *         const left = ev.drag.beforeDist[0];
    *         const top = ev.drag.beforeDist[1];
    *         const scaleX = ev.scale[0];
    *         const scaleY = ev.scale[1];
    *     });
    * });
    */

    /**
     * When the group scale finishes, the `scaleGroupEnd` event is called.
     * @memberof Moveable.Scalable
     * @event scaleGroupEnd
     * @param {Moveable.Scalable.OnScaleGroupEnd} - Parameters for the `scaleGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     *     scalable: true
     * });
     * moveable.on("scaleGroupEnd", ({ targets, isDrag }) => {
     *     console.log("onScaleGroupEnd", targets, isDrag);
     * });
     */

    function getMiddleLinePos(pos1, pos2) {
      return pos1.map(function (pos, i) {
        return dot(pos, pos2[i], 1, 2);
      });
    }

    function getTriangleRad(pos1, pos2, pos3) {
      // pos1 Rad
      var rad1 = getRad$1(pos1, pos2);
      var rad2 = getRad$1(pos1, pos3);
      var rad = rad2 - rad1;
      return rad >= 0 ? rad : rad + 2 * Math.PI;
    }

    function isValidPos(poses1, poses2) {
      var rad1 = getTriangleRad(poses1[0], poses1[1], poses1[2]);
      var rad2 = getTriangleRad(poses2[0], poses2[1], poses2[2]);
      var pi = Math.PI;

      if (rad1 >= pi && rad2 <= pi || rad1 <= pi && rad2 >= pi) {
        return false;
      }

      return true;
    }
    /**
     * @namespace Moveable.Warpable
     * @description Warpable indicates whether the target can be warped(distorted, bented).
     */


    var Warpable = {
      name: "warpable",
      ableGroup: "size",
      props: {
        warpable: Boolean,
        renderDirections: Array
      },
      events: {
        onWarpStart: "warpStart",
        onWarp: "warp",
        onWarpEnd: "warpEnd"
      },
      render: function (moveable, React) {
        var _a = moveable.props,
            resizable = _a.resizable,
            scalable = _a.scalable,
            warpable = _a.warpable;

        if (resizable || scalable || !warpable) {
          return [];
        }

        var _b = moveable.state,
            pos1 = _b.pos1,
            pos2 = _b.pos2,
            pos3 = _b.pos3,
            pos4 = _b.pos4;
        var linePosFrom1 = getMiddleLinePos(pos1, pos2);
        var linePosFrom2 = getMiddleLinePos(pos2, pos1);
        var linePosFrom3 = getMiddleLinePos(pos1, pos3);
        var linePosFrom4 = getMiddleLinePos(pos3, pos1);
        var linePosTo1 = getMiddleLinePos(pos3, pos4);
        var linePosTo2 = getMiddleLinePos(pos4, pos3);
        var linePosTo3 = getMiddleLinePos(pos2, pos4);
        var linePosTo4 = getMiddleLinePos(pos4, pos2);
        return __spreadArrays$1([React.createElement("div", {
          className: prefix("line"),
          key: "middeLine1",
          style: getLineStyle(linePosFrom1, linePosTo1)
        }), React.createElement("div", {
          className: prefix("line"),
          key: "middeLine2",
          style: getLineStyle(linePosFrom2, linePosTo2)
        }), React.createElement("div", {
          className: prefix("line"),
          key: "middeLine3",
          style: getLineStyle(linePosFrom3, linePosTo3)
        }), React.createElement("div", {
          className: prefix("line"),
          key: "middeLine4",
          style: getLineStyle(linePosFrom4, linePosTo4)
        })], renderAllDirections(moveable, React));
      },
      dragControlCondition: function (e) {
        if (e.isRequest) {
          return false;
        }

        return hasClass(e.inputEvent.target, prefix("direction"));
      },
      dragControlStart: function (moveable, e) {
        var datas = e.datas,
            inputEvent = e.inputEvent;
        var target = moveable.props.target;
        var inputTarget = inputEvent.target;
        var direction = getDirection(inputTarget);

        if (!direction || !target) {
          return false;
        }

        var state = moveable.state;
        var transformOrigin = state.transformOrigin,
            is3d = state.is3d,
            targetTransform = state.targetTransform,
            targetMatrix = state.targetMatrix,
            width = state.width,
            height = state.height,
            left = state.left,
            top = state.top;
        datas.datas = {};
        datas.targetTransform = targetTransform;
        datas.warpTargetMatrix = is3d ? targetMatrix : convertDimension(targetMatrix, 3, 4);
        datas.targetInverseMatrix = ignoreDimension(invert$1(datas.warpTargetMatrix, 4), 3, 4);
        datas.direction = direction;
        datas.left = left;
        datas.top = top;
        setDragStart(moveable, e);
        setDefaultTransformIndex(e);
        datas.poses = [[0, 0], [width, 0], [0, height], [width, height]].map(function (p) {
          return minus(p, transformOrigin);
        });
        datas.nextPoses = datas.poses.map(function (_a) {
          var x = _a[0],
              y = _a[1];
          return caculate(datas.warpTargetMatrix, [x, y, 0, 1], 4);
        });
        datas.startValue = createIdentityMatrix(4);
        datas.prevMatrix = createIdentityMatrix(4);
        datas.absolutePoses = getAbsolutePosesByState(state);
        datas.posIndexes = getPosIndexesByDirection(direction);
        state.snapRenderInfo = {
          request: e.isRequest,
          direction: direction
        };
        var params = fillParams(moveable, e, __assign$4({
          set: function (matrix) {
            datas.startValue = matrix;
          }
        }, fillTransformStartEvent(e)));
        var result = triggerEvent(moveable, "onWarpStart", params);

        if (result !== false) {
          datas.isWarp = true;
        }

        return datas.isWarp;
      },
      dragControl: function (moveable, e) {
        var datas = e.datas,
            isRequest = e.isRequest;
        var distX = e.distX,
            distY = e.distY;
        var targetInverseMatrix = datas.targetInverseMatrix,
            prevMatrix = datas.prevMatrix,
            isWarp = datas.isWarp,
            startValue = datas.startValue,
            poses = datas.poses,
            posIndexes = datas.posIndexes,
            absolutePoses = datas.absolutePoses;

        if (!isWarp) {
          return false;
        }

        resolveTransformEvent(e, "matrix3d");

        if (hasGuidelines(moveable, "warpable")) {
          var selectedPoses = posIndexes.map(function (index) {
            return absolutePoses[index];
          });

          if (selectedPoses.length > 1) {
            selectedPoses.push([(selectedPoses[0][0] + selectedPoses[1][0]) / 2, (selectedPoses[0][1] + selectedPoses[1][1]) / 2]);
          }

          var _a = checkMoveableSnapBounds(moveable, isRequest, selectedPoses.map(function (pos) {
            return [pos[0] + distX, pos[1] + distY];
          })),
              horizontalSnapInfo = _a.horizontal,
              verticalSnapInfo = _a.vertical;

          distY -= horizontalSnapInfo.offset;
          distX -= verticalSnapInfo.offset;
        }

        var dist = getDragDist({
          datas: datas,
          distX: distX,
          distY: distY
        }, true);
        var nextPoses = datas.nextPoses.slice();
        posIndexes.forEach(function (index) {
          nextPoses[index] = plus(nextPoses[index], dist);
        });

        if (!NEARBY_POS.every(function (nearByPoses) {
          return isValidPos(nearByPoses.map(function (i) {
            return poses[i];
          }), nearByPoses.map(function (i) {
            return nextPoses[i];
          }));
        })) {
          return false;
        }

        var h = createWarpMatrix(poses[0], poses[2], poses[1], poses[3], nextPoses[0], nextPoses[2], nextPoses[1], nextPoses[3]);

        if (!h.length) {
          return false;
        } // B * A * M


        var afterMatrix = multiply$1(targetInverseMatrix, h, 4); // B * M * A

        var matrix = getTransfromMatrix(datas, afterMatrix, true);
        var delta = multiply$1(invert$1(prevMatrix, 4), matrix, 4);
        datas.prevMatrix = matrix;
        var totalMatrix = multiply$1(startValue, matrix, 4);
        var nextTransform = convertTransformFormat(datas, "matrix3d(" + totalMatrix.join(", ") + ")", "matrix3d(" + matrix.join(", ") + ")");
        fillOriginalTransform(e, nextTransform);
        triggerEvent(moveable, "onWarp", fillParams(moveable, e, {
          delta: delta,
          matrix: totalMatrix,
          dist: matrix,
          multiply: multiply$1,
          transform: nextTransform
        }));
        return true;
      },
      dragControlEnd: function (moveable, e) {
        var datas = e.datas,
            isDrag = e.isDrag;

        if (!datas.isWarp) {
          return false;
        }

        datas.isWarp = false;
        triggerEvent(moveable, "onWarpEnd", fillEndParams(moveable, e, {}));
        return isDrag;
      }
    };
    /**
     * Whether or not target can be warped. (default: false)
     * @name Moveable.Warpable#warpable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.warpable = true;
     */

    /**
    * Set directions to show the control box. (default: ["n", "nw", "ne", "s", "se", "sw", "e", "w"])
    * @name Moveable.Warpable#renderDirections
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     warpable: true,
    *     renderDirections: ["n", "nw", "ne", "s", "se", "sw", "e", "w"],
    * });
    *
    * moveable.renderDirections = ["nw", "ne", "sw", "se"];
    */

    /**
    * When the warp starts, the warpStart event is called.
    * @memberof Moveable.Warpable
    * @event warpStart
    * @param {Moveable.Warpable.OnWarpStart} - Parameters for the warpStart event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, { warpable: true });
    * moveable.on("warpStart", ({ target }) => {
    *     console.log(target);
    * });
    */

    /**
     * When warping, the warp event is called.
     * @memberof Moveable.Warpable
     * @event warp
     * @param {Moveable.Warpable.OnWarp} - Parameters for the warp event
     * @example
     * import Moveable from "moveable";
     * let matrix = [
     *  1, 0, 0, 0,
     *  0, 1, 0, 0,
     *  0, 0, 1, 0,
     *  0, 0, 0, 1,
     * ];
     * const moveable = new Moveable(document.body, { warpable: true });
     * moveable.on("warp", ({ target, transform, delta, multiply }) => {
     *    // target.style.transform = transform;
     *    matrix = multiply(matrix, delta);
     *    target.style.transform = `matrix3d(${matrix.join(",")})`;
     * });
     */

    /**
     * When the warp finishes, the warpEnd event is called.
     * @memberof Moveable.Warpable
     * @event warpEnd
     * @param {Moveable.Warpable.OnWarpEnd} - Parameters for the warpEnd event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, { warpable: true });
     * moveable.on("warpEnd", ({ target, isDrag }) => {
     *     console.log(target, isDrag);
     * });
     */

    var AREA_PIECES = prefix("area-pieces");
    var AREA_PIECE = prefix("area-piece");
    var AVOID = prefix("avoid");

    function restoreStyle(moveable) {
      var el = moveable.areaElement;
      var _a = moveable.state,
          width = _a.width,
          height = _a.height;
      removeClass(el, AVOID);
      el.style.cssText += "left: 0px; top: 0px; width: " + width + "px; height: " + height + "px";
    }

    function renderPieces(React) {
      return React.createElement("div", {
        key: "area_pieces",
        className: AREA_PIECES
      }, React.createElement("div", {
        className: AREA_PIECE
      }), React.createElement("div", {
        className: AREA_PIECE
      }), React.createElement("div", {
        className: AREA_PIECE
      }), React.createElement("div", {
        className: AREA_PIECE
      }));
    }

    var DragArea = {
      name: "dragArea",
      props: {
        dragArea: Boolean,
        passDragArea: Boolean
      },
      events: {
        onClick: "click",
        onClickGroup: "clickGroup"
      },
      render: function (moveable, React) {
        var _a = moveable.props,
            target = _a.target,
            dragArea = _a.dragArea,
            groupable = _a.groupable,
            passDragArea = _a.passDragArea;
        var _b = moveable.state,
            width = _b.width,
            height = _b.height,
            renderPoses = _b.renderPoses;
        var className = passDragArea ? prefix("area", "pass") : prefix("area");

        if (groupable) {
          return [React.createElement("div", {
            key: "area",
            ref: ref(moveable, "areaElement"),
            className: className
          }), renderPieces(React)];
        }

        if (!target || !dragArea) {
          return [];
        }

        var h = createWarpMatrix([0, 0], [width, 0], [0, height], [width, height], renderPoses[0], renderPoses[1], renderPoses[2], renderPoses[3]);
        var transform = h.length ? makeMatrixCSS(h, true) : "none";
        return [React.createElement("div", {
          key: "area",
          ref: ref(moveable, "areaElement"),
          className: className,
          style: {
            top: "0px",
            left: "0px",
            width: width + "px",
            height: height + "px",
            transformOrigin: "0 0",
            transform: transform
          }
        }), renderPieces(React)];
      },
      dragStart: function (moveable, _a) {
        var datas = _a.datas,
            clientX = _a.clientX,
            clientY = _a.clientY,
            inputEvent = _a.inputEvent;

        if (!inputEvent) {
          return false;
        }

        datas.isDragArea = false;
        var areaElement = moveable.areaElement;
        var _b = moveable.state,
            moveableClientRect = _b.moveableClientRect,
            renderPoses = _b.renderPoses,
            rootMatrix = _b.rootMatrix,
            is3d = _b.is3d;
        var left = moveableClientRect.left,
            top = moveableClientRect.top;

        var _c = getRect(renderPoses),
            relativeLeft = _c.left,
            relativeTop = _c.top,
            width = _c.width,
            height = _c.height;

        var n = is3d ? 4 : 3;

        var _d = caculateInversePosition(rootMatrix, [clientX - left, clientY - top], n),
            posX = _d[0],
            posY = _d[1];

        posX -= relativeLeft;
        posY -= relativeTop;
        var rects = [{
          left: relativeLeft,
          top: relativeTop,
          width: width,
          height: posY - 10
        }, {
          left: relativeLeft,
          top: relativeTop,
          width: posX - 10,
          height: height
        }, {
          left: relativeLeft,
          top: relativeTop + posY + 10,
          width: width,
          height: height - posY - 10
        }, {
          left: relativeLeft + posX + 10,
          top: relativeTop,
          width: width - posX - 10,
          height: height
        }];
        var children = [].slice.call(areaElement.nextElementSibling.children);
        rects.forEach(function (rect, i) {
          children[i].style.cssText = "left: " + rect.left + "px;top: " + rect.top + "px; width: " + rect.width + "px; height: " + rect.height + "px;";
        });
        addClass(areaElement, AVOID);
        return;
      },
      drag: function (moveable, _a) {
        var datas = _a.datas,
            inputEvent = _a.inputEvent;

        if (!inputEvent) {
          return false;
        }

        if (!datas.isDragArea) {
          datas.isDragArea = true;
          restoreStyle(moveable);
        }
      },
      dragEnd: function (moveable, e) {
        var inputEvent = e.inputEvent,
            datas = e.datas;

        if (!inputEvent) {
          return false;
        }

        if (!datas.isDragArea) {
          restoreStyle(moveable);
        }
      },
      dragGroupStart: function (moveable, e) {
        return this.dragStart(moveable, e);
      },
      dragGroup: function (moveable, e) {
        return this.drag(moveable, e);
      },
      dragGroupEnd: function (moveable, e) {
        return this.dragEnd(moveable, e);
      },
      unset: function (moveable) {
        restoreStyle(moveable);
      }
    };
    /**
     * Add an event to the moveable area instead of the target for stopPropagation. (default: false, true in group)
     * @name Moveable#dragArea
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  dragArea: false,
     * });
     */

    /**
     * Set `pointerEvents: none;` css to pass events in dragArea. (default: false)
     * @name Moveable#passDragArea
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  dragArea: false,
     * });
     */

    var Origin = {
      name: "origin",
      props: {
        origin: Boolean
      },
      events: {},
      render: function (moveable, React) {
        var _a = moveable.state,
            beforeOrigin = _a.beforeOrigin,
            rotation = _a.rotation;
        return [React.createElement("div", {
          className: prefix("control", "origin"),
          style: getControlTransform(rotation, beforeOrigin),
          key: "beforeOrigin"
        })];
      }
    };
    /**
     * Whether or not the origin controlbox will be visible or not (default: true)
     * @name Moveable#origin
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     *
     * moveable.origin = true;
     */

    function getDefaultScrollPosition$1(e) {
      var scrollContainer = e.scrollContainer;
      return [scrollContainer.scrollLeft, scrollContainer.scrollTop];
    }
    /**
     * @namespace Moveable.Scrollable
     * @description Whether or not target can be scrolled to the scroll container (default: false)
     */


    var Scrollable = {
      name: "scrollable",
      canPinch: true,
      props: {
        scrollable: Boolean,
        scrollContainer: Object,
        scrollThreshold: Number,
        getScrollPosition: Function
      },
      events: {
        onScroll: "scroll",
        onScrollGroup: "scrollGroup"
      },
      dragStart: function (moveable, e) {
        var props = moveable.props;
        var _a = props.scrollContainer,
            scrollContainer = _a === void 0 ? moveable.getContainer() : _a;
        var dragScroll = new DragScroll();
        e.datas.dragScroll = dragScroll;
        var gestoName = e.isControl ? "controlGesto" : "targetGesto";
        var targets = e.targets;
        dragScroll.on("scroll", function (_a) {
          var container = _a.container,
              direction = _a.direction;
          var params = fillParams(moveable, e, {
            scrollContainer: container,
            direction: direction
          });
          var eventName = targets ? "onScrollGroup" : "onScroll";

          if (targets) {
            params.targets = targets;
          }

          triggerEvent(moveable, eventName, params);
        }).on("move", function (_a) {
          var offsetX = _a.offsetX,
              offsetY = _a.offsetY;
          moveable[gestoName].scrollBy(offsetX, offsetY, e.inputEvent, false);
        });
        dragScroll.dragStart(e, {
          container: scrollContainer
        });
      },
      checkScroll: function (moveable, e) {
        var dragScroll = e.datas.dragScroll;

        if (!dragScroll) {
          return;
        }

        var _a = moveable.props,
            _b = _a.scrollContainer,
            scrollContainer = _b === void 0 ? moveable.getContainer() : _b,
            _c = _a.scrollThreshold,
            scrollThreshold = _c === void 0 ? 0 : _c,
            _d = _a.getScrollPosition,
            getScrollPosition = _d === void 0 ? getDefaultScrollPosition$1 : _d;
        dragScroll.drag(e, {
          container: scrollContainer,
          threshold: scrollThreshold,
          getScrollPosition: function (ev) {
            return getScrollPosition({
              scrollContainer: ev.container,
              direction: ev.direction
            });
          }
        });
        return true;
      },
      drag: function (moveable, e) {
        return this.checkScroll(moveable, e);
      },
      dragEnd: function (moveable, e) {
        e.datas.dragScroll.dragEnd();
        e.datas.dragScroll = null;
      },
      dragControlStart: function (moveable, e) {
        return this.dragStart(moveable, __assign$4(__assign$4({}, e), {
          isControl: true
        }));
      },
      dragControl: function (moveable, e) {
        return this.drag(moveable, e);
      },
      dragControlEnd: function (moveable, e) {
        return this.dragEnd(moveable, e);
      },
      dragGroupStart: function (moveable, e) {
        return this.dragStart(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      dragGroup: function (moveable, e) {
        return this.drag(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      dragGroupEnd: function (moveable, e) {
        return this.dragEnd(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      dragGroupControlStart: function (moveable, e) {
        return this.dragStart(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets,
          isControl: true
        }));
      },
      dragGroupContro: function (moveable, e) {
        return this.drag(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      },
      dragGroupControEnd: function (moveable, e) {
        return this.dragEnd(moveable, __assign$4(__assign$4({}, e), {
          targets: moveable.props.targets
        }));
      }
    };
    /**
     * Whether or not target can be scrolled to the scroll container (default: false)
     * @name Moveable.Scrollable#scrollable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   scrollable: true,
     *   scrollContainer: document.body,
     *   scrollThreshold: 0,
     *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
     * });
     *
     * moveable.scrollable = true;
     */

    /**
     * The container to which scroll is applied (default: container)
     * @name Moveable.Scrollable#scrollContainer
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   scrollable: true,
     *   scrollContainer: document.body,
     *   scrollThreshold: 0,
     *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
     * });
     */

    /**
     * Expand the range of the scroll check area. (default: 0)
     * @name Moveable.Scrollable#scrollThreshold
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   scrollable: true,
     *   scrollContainer: document.body,
     *   scrollThreshold: 0,
     *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
     * });
     */

    /**
     * Sets a function to get the scroll position. (default: Function)
     * @name Moveable.Scrollable#getScrollPosition
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   scrollable: true,
     *   scrollContainer: document.body,
     *   scrollThreshold: 0,
     *   getScrollPosition: ({ scrollContainer }) => ([scrollContainer.scrollLeft, scrollContainer.scrollTop]),
     * });
     *
     */

    /**
     * When the drag cursor leaves the scrollContainer, the `scroll` event occur to scroll.
     * @memberof Moveable.Scrollable
     * @event scroll
     * @param {Moveable.Scrollable.OnScroll} - Parameters for the `scroll` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("scroll", ({ scrollContainer, direction }) => {
     *   scrollContainer.scrollLeft += direction[0] * 10;
     *   scrollContainer.scrollTop += direction[1] * 10;
     * });
     */

    /**
     * When the drag cursor leaves the scrollContainer, the `scrollGroup` event occur to scroll in group.
     * @memberof Moveable.Scrollable
     * @event scrollGroup
     * @param {Moveable.Scrollable.OnScrollGroup} - Parameters for the `scrollGroup` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("scroll", ({ scrollContainer, direction }) => {
     *   scrollContainer.scrollLeft += direction[0] * 10;
     *   scrollContainer.scrollTop += direction[1] * 10;
     * });
     */

    var Default = {
      name: "",
      props: {
        target: Object,
        dragTarget: Object,
        container: Object,
        rootContainer: Object,
        zoom: Number,
        transformOrigin: Array,
        edge: Boolean,
        ables: Array,
        className: String,
        pinchThreshold: Number,
        pinchOutside: Boolean,
        triggerAblesSimultaneously: Boolean,
        checkInput: Boolean,
        cspNonce: String,
        translateZ: Number
      },
      events: {}
    };

    var Padding = {
      name: "padding",
      props: {
        padding: Object
      },
      events: {},
      render: function (moveable, React) {
        var props = moveable.props;

        if (props.dragArea) {
          return [];
        }

        var padding = props.padding || {};
        var _a = padding.left,
            left = _a === void 0 ? 0 : _a,
            _b = padding.top,
            top = _b === void 0 ? 0 : _b,
            _c = padding.right,
            right = _c === void 0 ? 0 : _c,
            _d = padding.bottom,
            bottom = _d === void 0 ? 0 : _d;
        var _e = moveable.state,
            renderPoses = _e.renderPoses,
            pos1 = _e.pos1,
            pos2 = _e.pos2,
            pos3 = _e.pos3,
            pos4 = _e.pos4;
        var poses = [pos1, pos2, pos3, pos4];
        var paddingDirections = [];

        if (left > 0) {
          paddingDirections.push([0, 2]);
        }

        if (top > 0) {
          paddingDirections.push([0, 1]);
        }

        if (right > 0) {
          paddingDirections.push([1, 3]);
        }

        if (bottom > 0) {
          paddingDirections.push([2, 3]);
        }

        return paddingDirections.map(function (_a, i) {
          var dir1 = _a[0],
              dir2 = _a[1];
          var paddingPos1 = poses[dir1];
          var paddingPos2 = poses[dir2];
          var paddingPos3 = renderPoses[dir1];
          var paddingPos4 = renderPoses[dir2];
          var h = createWarpMatrix([0, 0], [100, 0], [0, 100], [100, 100], paddingPos1, paddingPos2, paddingPos3, paddingPos4);

          if (!h.length) {
            return undefined;
          }

          return React.createElement("div", {
            key: "padding" + i,
            className: prefix("padding"),
            style: {
              transform: makeMatrixCSS(h, true)
            }
          });
        });
      }
    };
    /**
     * Add padding around the target to increase the drag area. (default: null)
     * @name Moveable#padding
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *  target: document.querySelector(".target"),
     *  padding: { left: 0, top: 0, right: 0, bottom: 0 },
     * });
     * moveable.padding = { left: 10, top: 10, right: 10, bottom: 10 },
     * moveable.updateRect();
     */

    var RADIUS_DIRECTIONS = ["nw", "ne", "se", "sw"];

    function caculateRatio(values, size) {
      var sumSize = values[0] + values[1];
      var sumRatio = sumSize > size ? size / sumSize : 1;
      values[0] *= sumRatio;
      values[1] = size - values[1] * sumRatio;
      return values;
    }

    var HORIZONTAL_RADIUS_ORDER = [1, 2, 5, 6];
    var VERTICAL_RADIUS_ORDER = [0, 3, 4, 7];
    var HORIZONTAL_RADIUS_DIRECTIONS = [1, -1, -1, 1];
    var VERTICAL_RADIUS_DIRECTIONS = [1, 1, -1, -1];
    function getRadiusStyles(poses, controlPoses, isRelative, width, height, left, top, right, bottom) {
      if (left === void 0) {
        left = 0;
      }

      if (top === void 0) {
        top = 0;
      }

      if (right === void 0) {
        right = width;
      }

      if (bottom === void 0) {
        bottom = height;
      }

      var clipStyles = [];
      var isVertical = false;
      var raws = poses.map(function (pos, i) {
        var _a = controlPoses[i],
            horizontal = _a.horizontal,
            vertical = _a.vertical;

        if (vertical && !isVertical) {
          isVertical = true;
          clipStyles.push("/");
        }

        if (isVertical) {
          var rawPos = Math.max(0, vertical === 1 ? pos[1] - top : bottom - pos[1]);
          clipStyles.push(convertCSSSize(rawPos, height, isRelative));
          return rawPos;
        } else {
          var rawPos = Math.max(0, horizontal === 1 ? pos[0] - left : right - pos[0]);
          clipStyles.push(convertCSSSize(rawPos, width, isRelative));
          return rawPos;
        }
      });
      return {
        styles: clipStyles,
        raws: raws
      };
    }
    function getRadiusRange(controlPoses) {
      // [start, length]
      var horizontalRange = [0, 0];
      var verticalRange = [0, 0];
      var length = controlPoses.length;

      for (var i = 0; i < length; ++i) {
        var clipPose = controlPoses[i];

        if (!clipPose.sub) {
          continue;
        }

        if (clipPose.horizontal) {
          if (horizontalRange[1] === 0) {
            horizontalRange[0] = i;
          }

          horizontalRange[1] = i - horizontalRange[0] + 1;
          verticalRange[0] = i + 1;
        }

        if (clipPose.vertical) {
          if (verticalRange[1] === 0) {
            verticalRange[0] = i;
          }

          verticalRange[1] = i - verticalRange[0] + 1;
        }
      }

      return {
        horizontalRange: horizontalRange,
        verticalRange: verticalRange
      };
    }
    function getRadiusValues(values, width, height, left, top) {
      var _a, _b, _c, _d;

      var splitIndex = values.indexOf("/");
      var splitLength = (splitIndex > -1 ? values.slice(0, splitIndex) : values).length;
      var horizontalValues = values.slice(0, splitLength);
      var verticalValues = values.slice(splitLength + 1);
      var _e = horizontalValues[0],
          nwValue = _e === void 0 ? "0" : _e,
          _f = horizontalValues[1],
          neValue = _f === void 0 ? nwValue : _f,
          _g = horizontalValues[2],
          seValue = _g === void 0 ? nwValue : _g,
          _h = horizontalValues[3],
          swValue = _h === void 0 ? neValue : _h;
      var _j = verticalValues[0],
          wnValue = _j === void 0 ? nwValue : _j,
          _k = verticalValues[1],
          enValue = _k === void 0 ? wnValue : _k,
          _l = verticalValues[2],
          esValue = _l === void 0 ? wnValue : _l,
          _m = verticalValues[3],
          wsValue = _m === void 0 ? enValue : _m;
      var horizontalRawPoses = [nwValue, neValue, seValue, swValue].map(function (pos) {
        return convertUnitSize(pos, width);
      });
      var verticalRawPoses = [wnValue, enValue, esValue, wsValue].map(function (pos) {
        return convertUnitSize(pos, height);
      });
      var horizontalPoses = horizontalRawPoses.slice();
      var verticalPoses = verticalRawPoses.slice();
      _a = caculateRatio([horizontalPoses[0], horizontalPoses[1]], width), horizontalPoses[0] = _a[0], horizontalPoses[1] = _a[1];
      _b = caculateRatio([horizontalPoses[3], horizontalPoses[2]], width), horizontalPoses[3] = _b[0], horizontalPoses[2] = _b[1];
      _c = caculateRatio([verticalPoses[0], verticalPoses[3]], height), verticalPoses[0] = _c[0], verticalPoses[3] = _c[1];
      _d = caculateRatio([verticalPoses[1], verticalPoses[2]], height), verticalPoses[1] = _d[0], verticalPoses[2] = _d[1];
      var nextHorizontalPoses = horizontalPoses.slice(0, horizontalValues.length);
      var nextVerticalPoses = verticalPoses.slice(0, verticalValues.length);
      return __spreadArrays$1(nextHorizontalPoses.map(function (pos, i) {
        var direction = RADIUS_DIRECTIONS[i];
        return {
          horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
          vertical: 0,
          pos: [left + pos, top + (VERTICAL_RADIUS_DIRECTIONS[i] === -1 ? height : 0)],
          sub: true,
          raw: horizontalRawPoses[i],
          direction: direction
        };
      }), nextVerticalPoses.map(function (pos, i) {
        var direction = RADIUS_DIRECTIONS[i];
        return {
          horizontal: 0,
          vertical: VERTICAL_RADIUS_DIRECTIONS[i],
          pos: [left + (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1 ? width : 0), top + pos],
          sub: true,
          raw: verticalRawPoses[i],
          direction: direction
        };
      }));
    }
    function removeRadiusPos(controlPoses, poses, index, startIndex, length) {
      if (length === void 0) {
        length = poses.length;
      }

      var _a = getRadiusRange(controlPoses.slice(startIndex)),
          horizontalRange = _a.horizontalRange,
          verticalRange = _a.verticalRange;

      var radiuslIndex = index - startIndex;
      var deleteCount = 0;

      if (radiuslIndex === 0) {
        deleteCount = length;
      } else if (radiuslIndex > 0 && radiuslIndex < horizontalRange[1]) {
        deleteCount = horizontalRange[1] - radiuslIndex;
      } else if (radiuslIndex >= verticalRange[0]) {
        deleteCount = verticalRange[0] + verticalRange[1] - radiuslIndex;
      } else {
        return;
      }

      controlPoses.splice(index, deleteCount);
      poses.splice(index, deleteCount);
    }
    function addRadiusPos(controlPoses, poses, startIndex, horizontalIndex, verticalIndex, distX, distY, right, bottom, left, top) {
      if (left === void 0) {
        left = 0;
      }

      if (top === void 0) {
        top = 0;
      }

      var _a = getRadiusRange(controlPoses.slice(startIndex)),
          horizontalRange = _a.horizontalRange,
          verticalRange = _a.verticalRange;

      if (horizontalIndex > -1) {
        var radiusX = HORIZONTAL_RADIUS_DIRECTIONS[horizontalIndex] === 1 ? distX - left : right - distX;

        for (var i = horizontalRange[1]; i <= horizontalIndex; ++i) {
          var y = VERTICAL_RADIUS_DIRECTIONS[i] === 1 ? top : bottom;
          var x = 0;

          if (horizontalIndex === i) {
            x = distX;
          } else if (i === 0) {
            x = left + radiusX;
          } else if (HORIZONTAL_RADIUS_DIRECTIONS[i] === -1) {
            x = right - (poses[startIndex][0] - left);
          }

          controlPoses.splice(startIndex + i, 0, {
            horizontal: HORIZONTAL_RADIUS_DIRECTIONS[i],
            vertical: 0,
            pos: [x, y]
          });
          poses.splice(startIndex + i, 0, [x, y]);

          if (i === 0) {
            break;
          }
        }
      } else if (verticalIndex > -1) {
        var radiusY = VERTICAL_RADIUS_DIRECTIONS[verticalIndex] === 1 ? distY - top : bottom - distY;

        if (horizontalRange[1] === 0 && verticalRange[1] === 0) {
          var pos = [left + radiusY, top];
          controlPoses.push({
            horizontal: HORIZONTAL_RADIUS_DIRECTIONS[0],
            vertical: 0,
            pos: pos
          });
          poses.push(pos);
        }

        var startVerticalIndex = verticalRange[0];

        for (var i = verticalRange[1]; i <= verticalIndex; ++i) {
          var x = HORIZONTAL_RADIUS_DIRECTIONS[i] === 1 ? left : right;
          var y = 0;

          if (verticalIndex === i) {
            y = distY;
          } else if (i === 0) {
            y = top + radiusY;
          } else if (VERTICAL_RADIUS_DIRECTIONS[i] === 1) {
            y = poses[startIndex + startVerticalIndex][1];
          } else if (VERTICAL_RADIUS_DIRECTIONS[i] === -1) {
            y = bottom - (poses[startIndex + startVerticalIndex][1] - top);
          }

          controlPoses.push({
            horizontal: 0,
            vertical: VERTICAL_RADIUS_DIRECTIONS[i],
            pos: [x, y]
          });
          poses.push([x, y]);

          if (i === 0) {
            break;
          }
        }
      }
    }
    function splitRadiusPoses(controlPoses, raws) {
      if (raws === void 0) {
        raws = controlPoses.map(function (pos) {
          return pos.raw;
        });
      }

      var horizontals = controlPoses.map(function (pos, i) {
        return pos.horizontal ? raws[i] : null;
      }).filter(function (pos) {
        return pos != null;
      });
      var verticals = controlPoses.map(function (pos, i) {
        return pos.vertical ? raws[i] : null;
      }).filter(function (pos) {
        return pos != null;
      });
      return {
        horizontals: horizontals,
        verticals: verticals
      };
    }

    var CLIP_DIRECTIONS = [[0, -1, "n"], [1, 0, "e"]];
    var CLIP_RECT_DIRECTIONS = [[-1, -1, "nw"], [0, -1, "n"], [1, -1, "ne"], [1, 0, "e"], [1, 1, "se"], [0, 1, "s"], [-1, 1, "sw"], [-1, 0, "w"]]; // 1 2 5 6 0 3 4 7
    // 0 1 2 3 4 5 6 7

    function getClipStyles(moveable, clipPath, poses) {
      var clipRelative = moveable.props.clipRelative;
      var _a = moveable.state,
          width = _a.width,
          height = _a.height;
      var _b = clipPath,
          clipType = _b.type,
          clipPoses = _b.poses;
      var isRect = clipType === "rect";
      var isCircle = clipType === "circle";

      if (clipType === "polygon") {
        return poses.map(function (pos) {
          return convertCSSSize(pos[0], width, clipRelative) + " " + convertCSSSize(pos[1], height, clipRelative);
        });
      } else if (isRect || clipType === "inset") {
        var top = poses[1][1];
        var right = poses[3][0];
        var left = poses[7][0];
        var bottom = poses[5][1];

        if (isRect) {
          return [top, right, bottom, left].map(function (pos) {
            return pos + "px";
          });
        }

        var clipStyles = [top, width - right, height - bottom, left].map(function (pos, i) {
          return convertCSSSize(pos, i % 2 ? width : height, clipRelative);
        });

        if (poses.length > 8) {
          var _c = minus(poses[4], poses[0]),
              subWidth = _c[0],
              subHeight = _c[1];

          clipStyles.push.apply(clipStyles, __spreadArrays$1(["round"], getRadiusStyles(poses.slice(8), clipPoses.slice(8), clipRelative, subWidth, subHeight, left, top, right, bottom).styles));
        }

        return clipStyles;
      } else if (isCircle || clipType === "ellipse") {
        var center = poses[0];
        var ry = convertCSSSize(Math.abs(poses[1][1] - center[1]), isCircle ? Math.sqrt((width * width + height * height) / 2) : height, clipRelative);
        var clipStyles = isCircle ? [ry] : [convertCSSSize(Math.abs(poses[2][0] - center[0]), width, clipRelative), ry];
        clipStyles.push("at", convertCSSSize(center[0], width, clipRelative), convertCSSSize(center[1], height, clipRelative));
        return clipStyles;
      }
    }

    function getRectPoses(top, right, bottom, left) {
      var xs = [left, (left + right) / 2, right];
      var ys = [top, (top + bottom) / 2, bottom];
      return CLIP_RECT_DIRECTIONS.map(function (_a) {
        var dirx = _a[0],
            diry = _a[1],
            dir = _a[2];
        var x = xs[dirx + 1];
        var y = ys[diry + 1];
        return {
          vertical: Math.abs(diry),
          horizontal: Math.abs(dirx),
          direction: dir,
          pos: [x, y]
        };
      });
    }

    function getClipPath(target, width, height, defaultClip, customClip) {
      var _a, _b, _c, _d, _e, _f, _g;

      var clipText = customClip;

      if (!clipText) {
        var style = getComputedStyle(target);
        var clipPath = style.clipPath;
        clipText = clipPath !== "none" ? clipPath : style.clip;
      }

      if (!clipText || clipText === "none" || clipText === "auto") {
        clipText = defaultClip;

        if (!clipText) {
          return;
        }
      }

      var _h = splitBracket(clipText),
          _j = _h.prefix,
          clipPrefix = _j === void 0 ? clipText : _j,
          _k = _h.value,
          value = _k === void 0 ? "" : _k;

      var isCircle = clipPrefix === "circle";
      var splitter = " ";

      if (clipPrefix === "polygon") {
        var values = splitComma(value || "0% 0%, 100% 0%, 100% 100%, 0% 100%");
        splitter = ",";
        var poses = values.map(function (pos) {
          var _a = pos.split(" "),
              xPos = _a[0],
              yPos = _a[1];

          return {
            vertical: 1,
            horizontal: 1,
            pos: [convertUnitSize(xPos, width), convertUnitSize(yPos, height)]
          };
        });
        return {
          type: clipPrefix,
          clipText: clipText,
          poses: poses,
          splitter: splitter
        };
      } else if (isCircle || clipPrefix === "ellipse") {
        var xPos = "";
        var yPos = "";
        var radiusX_1 = 0;
        var radiusY_1 = 0;
        var values = splitSpace(value);

        if (isCircle) {
          var radius = "";
          _a = values[0], radius = _a === void 0 ? "50%" : _a, _b = values[2], xPos = _b === void 0 ? "50%" : _b, _c = values[3], yPos = _c === void 0 ? "50%" : _c;
          radiusX_1 = convertUnitSize(radius, Math.sqrt((width * width + height * height) / 2));
          radiusY_1 = radiusX_1;
        } else {
          var xRadius = "";
          var yRadius = "";
          _d = values[0], xRadius = _d === void 0 ? "50%" : _d, _e = values[1], yRadius = _e === void 0 ? "50%" : _e, _f = values[3], xPos = _f === void 0 ? "50%" : _f, _g = values[4], yPos = _g === void 0 ? "50%" : _g;
          radiusX_1 = convertUnitSize(xRadius, width);
          radiusY_1 = convertUnitSize(yRadius, height);
        }

        var centerPos_1 = [convertUnitSize(xPos, width), convertUnitSize(yPos, height)];

        var poses = __spreadArrays$1([{
          vertical: 1,
          horizontal: 1,
          pos: centerPos_1,
          direction: "nesw"
        }], CLIP_DIRECTIONS.slice(0, isCircle ? 1 : 2).map(function (dir) {
          return {
            vertical: Math.abs(dir[1]),
            horizontal: dir[0],
            direction: dir[2],
            sub: true,
            pos: [centerPos_1[0] + dir[0] * radiusX_1, centerPos_1[1] + dir[1] * radiusY_1]
          };
        }));

        return {
          type: clipPrefix,
          clipText: clipText,
          radiusX: radiusX_1,
          radiusY: radiusY_1,
          left: centerPos_1[0] - radiusX_1,
          top: centerPos_1[1] - radiusY_1,
          poses: poses,
          splitter: splitter
        };
      } else if (clipPrefix === "inset") {
        var values = splitSpace(value || "0 0 0 0");
        var roundIndex = values.indexOf("round");
        var rectLength = (roundIndex > -1 ? values.slice(0, roundIndex) : values).length;
        var radiusValues = values.slice(rectLength + 1);

        var _l = values.slice(0, rectLength),
            topValue = _l[0],
            _m = _l[1],
            rightValue = _m === void 0 ? topValue : _m,
            _o = _l[2],
            bottomValue = _o === void 0 ? topValue : _o,
            _p = _l[3],
            leftValue = _p === void 0 ? rightValue : _p;

        var _q = [topValue, bottomValue].map(function (pos) {
          return convertUnitSize(pos, height);
        }),
            top = _q[0],
            bottom = _q[1];

        var _r = [leftValue, rightValue].map(function (pos) {
          return convertUnitSize(pos, width);
        }),
            left = _r[0],
            right = _r[1];

        var nextRight = width - right;
        var nextBottom = height - bottom;
        var radiusPoses = getRadiusValues(radiusValues, nextRight - left, nextBottom - top, left, top);

        var poses = __spreadArrays$1(getRectPoses(top, nextRight, nextBottom, left), radiusPoses);

        return {
          type: "inset",
          clipText: clipText,
          poses: poses,
          top: top,
          left: left,
          right: nextRight,
          bottom: nextBottom,
          radius: radiusValues,
          splitter: splitter
        };
      } else if (clipPrefix === "rect") {
        // top right bottom left
        var values = splitComma(value || "0px, " + width + "px, " + height + "px, 0px");
        splitter = ",";

        var _s = values.map(function (pos) {
          var posValue = splitUnit(pos).value;
          return posValue;
        }),
            top = _s[0],
            right = _s[1],
            bottom = _s[2],
            left = _s[3];

        var poses = getRectPoses(top, right, bottom, left);
        return {
          type: "rect",
          clipText: clipText,
          poses: poses,
          top: top,
          right: right,
          bottom: bottom,
          left: left,
          values: values,
          splitter: splitter
        };
      }

      return;
    }

    function addClipPath(moveable, e) {
      var _a = caculatePointerDist(moveable, e),
          distX = _a[0],
          distY = _a[1];

      var _b = e.datas,
          clipPath = _b.clipPath,
          index = _b.index;
      var _c = clipPath,
          clipType = _c.type,
          clipPoses = _c.poses,
          splitter = _c.splitter;
      var poses = clipPoses.map(function (pos) {
        return pos.pos;
      });

      if (clipType === "polygon") {
        poses.splice(index, 0, [distX, distY]);
      } else if (clipType === "inset") {
        var horizontalIndex = HORIZONTAL_RADIUS_ORDER.indexOf(index);
        var verticalIndex = VERTICAL_RADIUS_ORDER.indexOf(index);
        var length = clipPoses.length;
        addRadiusPos(clipPoses, poses, 8, horizontalIndex, verticalIndex, distX, distY, poses[4][0], poses[4][1], poses[0][0], poses[0][1]);

        if (length === clipPoses.length) {
          return;
        }
      } else {
        return;
      }

      var clipStyles = getClipStyles(moveable, clipPath, poses);
      triggerEvent(moveable, "onClip", fillParams(moveable, e, {
        clipEventType: "added",
        clipType: clipType,
        poses: poses,
        clipStyles: clipStyles,
        clipStyle: clipType + "(" + clipStyles.join(splitter) + ")",
        distX: 0,
        distY: 0
      }));
    }

    function removeClipPath(moveable, e) {
      var _a = e.datas,
          clipPath = _a.clipPath,
          index = _a.index;
      var _b = clipPath,
          clipType = _b.type,
          clipPoses = _b.poses,
          splitter = _b.splitter;
      var poses = clipPoses.map(function (pos) {
        return pos.pos;
      });
      var length = poses.length;

      if (clipType === "polygon") {
        clipPoses.splice(index, 1);
        poses.splice(index, 1);
      } else if (clipType === "inset") {
        if (index < 8) {
          return;
        }

        removeRadiusPos(clipPoses, poses, index, 8, length);

        if (length === clipPoses.length) {
          return;
        }
      } else {
        return;
      }

      var clipStyles = getClipStyles(moveable, clipPath, poses);
      triggerEvent(moveable, "onClip", fillParams(moveable, e, {
        clipEventType: "removed",
        clipType: clipType,
        poses: poses,
        clipStyles: clipStyles,
        clipStyle: clipType + "(" + clipStyles.join(splitter) + ")",
        distX: 0,
        distY: 0
      }));
    }
    /**
     * @namespace Moveable.Clippable
     * @description Whether to clip the target.
     */


    var Clippable = {
      name: "clippable",
      props: {
        clippable: Boolean,
        defaultClipPath: String,
        customClipPath: String,
        clipRelative: Boolean,
        clipArea: Boolean,
        dragWithClip: Boolean,
        clipTargetBounds: Boolean,
        clipVerticalGuidelines: Array,
        clipHorizontalGuidelines: Array,
        clipSnapThreshold: Boolean
      },
      events: {
        onClipStart: "clipStart",
        onClip: "clip",
        onClipEnd: "clipEnd"
      },
      css: [".control.clip-control {\n    background: #6d6;\n    cursor: pointer;\n}\n.control.clip-control.clip-radius {\n    background: #d66;\n}\n.line.clip-line {\n    background: #6e6;\n    cursor: move;\n    z-index: 1;\n}\n.clip-area {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.clip-ellipse {\n    position: absolute;\n    cursor: move;\n    border: 1px solid #6d6;\n    border: var(--zoompx) solid #6d6;\n    border-radius: 50%;\n    transform-origin: 0px 0px;\n}", ":host {\n    --bounds-color: #d66;\n}", ".guideline {\n    pointer-events: none;\n    z-index: 2;\n}", ".line.guideline.bounds {\n    background: #d66;\n    background: var(--bounds-color);\n}"],
      render: function (moveable, React) {
        var _a = moveable.props,
            customClipPath = _a.customClipPath,
            defaultClipPath = _a.defaultClipPath,
            clipArea = _a.clipArea,
            zoom = _a.zoom;
        var _b = moveable.state,
            target = _b.target,
            width = _b.width,
            height = _b.height,
            allMatrix = _b.allMatrix,
            is3d = _b.is3d,
            left = _b.left,
            top = _b.top,
            pos1 = _b.pos1,
            pos2 = _b.pos2,
            pos3 = _b.pos3,
            pos4 = _b.pos4,
            clipPathState = _b.clipPathState,
            snapBoundInfos = _b.snapBoundInfos;

        if (!target) {
          return [];
        }

        var clipPath = getClipPath(target, width, height, defaultClipPath || "inset", clipPathState || customClipPath);

        if (!clipPath) {
          return [];
        }

        var n = is3d ? 4 : 3;
        var type = clipPath.type;
        var clipPoses = clipPath.poses;
        var poses = clipPoses.map(function (pos) {
          // return [x, y];
          var caculatedPos = caculatePosition(allMatrix, pos.pos, n);
          return [caculatedPos[0] - left, caculatedPos[1] - top];
        });
        var controls = [];
        var lines = [];
        var isRect = type === "rect";
        var isInset = type === "inset";
        var isPolygon = type === "polygon";

        if (isRect || isInset || isPolygon) {
          var linePoses_1 = isInset ? poses.slice(0, 8) : poses;
          lines = linePoses_1.map(function (to, i) {
            var from = i === 0 ? linePoses_1[linePoses_1.length - 1] : linePoses_1[i - 1];
            var rad = getRad$1(from, to);
            var dist = getDiagonalSize(from, to);
            return React.createElement("div", {
              key: "clipLine" + i,
              className: prefix("line", "clip-line", "snap-control"),
              "data-clip-index": i,
              style: {
                width: dist + "px",
                transform: "translate(" + from[0] + "px, " + from[1] + "px) rotate(" + rad + "rad)"
              }
            });
          });
        }

        controls = poses.map(function (pos, i) {
          return React.createElement("div", {
            key: "clipControl" + i,
            className: prefix("control", "clip-control", "snap-control"),
            "data-clip-index": i,
            style: {
              transform: "translate(" + pos[0] + "px, " + pos[1] + "px)"
            }
          });
        });

        if (isInset) {
          controls.push.apply(controls, poses.slice(8).map(function (pos, i) {
            return React.createElement("div", {
              key: "clipRadiusControl" + i,
              className: prefix("control", "clip-control", "clip-radius", "snap-control"),
              "data-clip-index": 8 + i,
              style: {
                transform: "translate(" + pos[0] + "px, " + pos[1] + "px)"
              }
            });
          }));
        }

        if (type === "circle" || type === "ellipse") {
          var clipLeft = clipPath.left,
              clipTop = clipPath.top,
              radiusX = clipPath.radiusX,
              radiusY = clipPath.radiusY;

          var _c = minus(caculatePosition(allMatrix, [clipLeft, clipTop], n), caculatePosition(allMatrix, [0, 0], n)),
              distLeft = _c[0],
              distTop = _c[1];

          var ellipseClipPath = "none";

          if (!clipArea) {
            var piece = Math.max(10, radiusX / 5, radiusY / 5);
            var areaPoses = [];

            for (var i = 0; i <= piece; ++i) {
              var rad = Math.PI * 2 / piece * i;
              areaPoses.push([radiusX + (radiusX - zoom) * Math.cos(rad), radiusY + (radiusY - zoom) * Math.sin(rad)]);
            }

            areaPoses.push([radiusX, -2]);
            areaPoses.push([-2, -2]);
            areaPoses.push([-2, radiusY * 2 + 2]);
            areaPoses.push([radiusX * 2 + 2, radiusY * 2 + 2]);
            areaPoses.push([radiusX * 2 + 2, -2]);
            areaPoses.push([radiusX, -2]);
            ellipseClipPath = "polygon(" + areaPoses.map(function (pos) {
              return pos[0] + "px " + pos[1] + "px";
            }).join(", ") + ")";
          }

          controls.push(React.createElement("div", {
            key: "clipEllipse",
            className: prefix("clip-ellipse", "snap-control"),
            style: {
              width: radiusX * 2 + "px",
              height: radiusY * 2 + "px",
              clipPath: ellipseClipPath,
              transform: "translate(" + (-left + distLeft) + "px, " + (-top + distTop) + "px) " + makeMatrixCSS(allMatrix)
            }
          }));
        }

        if (clipArea) {
          var _d = getRect(__spreadArrays$1([pos1, pos2, pos3, pos4], poses)),
              allWidth = _d.width,
              allHeight = _d.height,
              allLeft_1 = _d.left,
              allTop_1 = _d.top;

          if (isPolygon || isRect || isInset) {
            var areaPoses = isInset ? poses.slice(0, 8) : poses;
            controls.push(React.createElement("div", {
              key: "clipArea",
              className: prefix("clip-area", "snap-control"),
              style: {
                width: allWidth + "px",
                height: allHeight + "px",
                transform: "translate(" + allLeft_1 + "px, " + allTop_1 + "px)",
                clipPath: "polygon(" + areaPoses.map(function (pos) {
                  return pos[0] - allLeft_1 + "px " + (pos[1] - allTop_1) + "px";
                }).join(", ") + ")"
              }
            }));
          }
        }

        if (snapBoundInfos) {
          ["vertical", "horizontal"].forEach(function (directionType) {
            var info = snapBoundInfos[directionType];
            var isHorizontal = directionType === "horizontal";

            if (info.isSnap) {
              lines.push.apply(lines, info.snap.posInfos.map(function (_a, i) {
                var pos = _a.pos;
                var snapPos1 = minus(caculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]);
                var snapPos2 = minus(caculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]);
                return renderLine(React, "", snapPos1, snapPos2, "clip" + directionType + "snap" + i, "guideline");
              }));
            }

            if (info.isBound) {
              lines.push.apply(lines, info.bounds.map(function (_a, i) {
                var pos = _a.pos;
                var snapPos1 = minus(caculatePosition(allMatrix, isHorizontal ? [0, pos] : [pos, 0], n), [left, top]);
                var snapPos2 = minus(caculatePosition(allMatrix, isHorizontal ? [width, pos] : [pos, height], n), [left, top]);
                return renderLine(React, "", snapPos1, snapPos2, "clip" + directionType + "bounds" + i, "guideline", "bounds", "bold");
              }));
            }
          });
        }

        return __spreadArrays$1(controls, lines);
      },
      dragControlCondition: function (e) {
        return e.inputEvent && (e.inputEvent.target.className || "").indexOf("clip") > -1;
      },
      dragStart: function (moveable, e) {
        var props = moveable.props;
        var _a = props.dragWithClip,
            dragWithClip = _a === void 0 ? true : _a;

        if (dragWithClip) {
          return false;
        }

        return this.dragControlStart(moveable, e);
      },
      drag: function (moveable, e) {
        return this.dragControl(moveable, e);
      },
      dragEnd: function (moveable, e) {
        return this.dragControlEnd(moveable, e);
      },
      dragControlStart: function (moveable, e) {
        var state = moveable.state;
        var _a = moveable.props,
            defaultClipPath = _a.defaultClipPath,
            customClipPath = _a.customClipPath;
        var target = state.target,
            width = state.width,
            height = state.height;
        var inputTarget = e.inputEvent ? e.inputEvent.target : null;
        var className = inputTarget ? inputTarget.className : "";
        var datas = e.datas;
        var clipPath = getClipPath(target, width, height, defaultClipPath || "inset", customClipPath);

        if (!clipPath) {
          return false;
        }

        var clipText = clipPath.clipText,
            type = clipPath.type,
            poses = clipPath.poses;
        var result = triggerEvent(moveable, "onClipStart", fillParams(moveable, e, {
          clipType: type,
          clipStyle: clipText,
          poses: poses.map(function (pos) {
            return pos.pos;
          })
        }));

        if (result === false) {
          datas.isClipStart = false;
          return false;
        }

        datas.isControl = className.indexOf("clip-control") > -1;
        datas.isLine = className.indexOf("clip-line") > -1;
        datas.isArea = className.indexOf("clip-area") > -1 || className.indexOf("clip-ellipse") > -1;
        datas.index = inputTarget ? parseInt(inputTarget.getAttribute("data-clip-index"), 10) : -1;
        datas.clipPath = clipPath;
        datas.isClipStart = true;
        state.clipPathState = clipText;
        setDragStart(moveable, e);
        return true;
      },
      dragControl: function (moveable, e) {
        var datas = e.datas,
            originalDatas = e.originalDatas;

        if (!datas.isClipStart) {
          return false;
        }

        var draggableData = originalDatas && originalDatas.draggable || {};
        var _a = datas,
            isControl = _a.isControl,
            isLine = _a.isLine,
            isArea = _a.isArea,
            index = _a.index,
            clipPath = _a.clipPath;

        if (!clipPath) {
          return false;
        }

        var _b = draggableData.isDrag ? draggableData.prevDist : getDragDist(e),
            distX = _b[0],
            distY = _b[1];

        var props = moveable.props;
        var state = moveable.state;
        var width = state.width,
            height = state.height;
        var isDragWithTarget = !isArea && !isControl && !isLine;
        var clipType = clipPath.type,
            clipPoses = clipPath.poses,
            splitter = clipPath.splitter;
        var poses = clipPoses.map(function (pos) {
          return pos.pos;
        });

        if (isDragWithTarget) {
          distX = -distX;
          distY = -distY;
        }

        var isAll = !isControl || clipPoses[index].direction === "nesw";
        var isRect = clipType === "inset" || clipType === "rect";
        var dists = clipPoses.map(function () {
          return [0, 0];
        });

        if (isControl && !isAll) {
          var _c = clipPoses[index],
              horizontal = _c.horizontal,
              vertical = _c.vertical;
          var dist = [distX * Math.abs(horizontal), distY * Math.abs(vertical)];
          dists = moveControlPos(clipPoses, index, dist, isRect);
        } else if (isAll) {
          dists = poses.map(function () {
            return [distX, distY];
          });
        }

        var nextPoses = poses.map(function (pos, i) {
          return plus(pos, dists[i]);
        });

        var guidePoses = __spreadArrays$1(nextPoses);

        state.snapBoundInfos = null;
        var isCircle = clipPath.type === "circle";
        var isEllipse = clipPath.type === "ellipse";

        if (isCircle || isEllipse) {
          var guideRect = getRect(nextPoses);
          var ry = Math.abs(guideRect.bottom - guideRect.top);
          var rx = Math.abs(isEllipse ? guideRect.right - guideRect.left : ry);
          var bottom = nextPoses[0][1] + ry;
          var left = nextPoses[0][0] - rx;
          var right = nextPoses[0][0] + rx; // right

          if (isCircle) {
            guidePoses.push([right, guideRect.bottom]);
            dists.push([1, 0]);
          } // bottom


          guidePoses.push([guideRect.left, bottom]);
          dists.push([0, 1]); // left

          guidePoses.push([left, guideRect.bottom]);
          dists.push([1, 0]);
        }

        var guidelines = addGuidelines([], width, height, (props.clipHorizontalGuidelines || []).map(function (v) {
          return convertUnitSize("" + v, height);
        }), (props.clipVerticalGuidelines || []).map(function (v) {
          return convertUnitSize("" + v, width);
        }));
        var guideXPoses = [];
        var guideYPoses = [];

        if (isCircle || isEllipse) {
          guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
          guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
        } else if (isRect) {
          var rectPoses = [guidePoses[0], guidePoses[2], guidePoses[4], guidePoses[6]];
          var rectDists_1 = [dists[0], dists[2], dists[4], dists[6]];
          guideXPoses = rectPoses.filter(function (_, i) {
            return rectDists_1[i][0];
          }).map(function (pos) {
            return pos[0];
          });
          guideYPoses = rectPoses.filter(function (_, i) {
            return rectDists_1[i][1];
          }).map(function (pos) {
            return pos[1];
          });
        } else {
          guideXPoses = guidePoses.filter(function (_, i) {
            return dists[i][0];
          }).map(function (pos) {
            return pos[0];
          });
          guideYPoses = guidePoses.filter(function (_, i) {
            return dists[i][1];
          }).map(function (pos) {
            return pos[1];
          });
        }

        var _loop_1 = function (i) {
          var _a = checkSnapBounds(guidelines, props.clipTargetBounds && {
            left: 0,
            top: 0,
            right: width,
            bottom: height
          }, guideXPoses, guideYPoses, {
            snapThreshold: 5
          }),
              horizontalSnapInfo = _a.horizontal,
              verticalSnapInfo = _a.vertical;

          var snapOffsetY = horizontalSnapInfo.offset;
          var snapOffsetX = verticalSnapInfo.offset;

          if ((isEllipse || isCircle) && dists[0][0] === 0 && dists[0][1] === 0) {
            var guideRect = getRect(nextPoses);
            var cy = guideRect.bottom - guideRect.top;
            var cx = isEllipse ? guideRect.right - guideRect.left : cy;
            var distSnapX = verticalSnapInfo.isBound ? Math.abs(snapOffsetX) : verticalSnapInfo.snapIndex === 0 ? -snapOffsetX : snapOffsetX;
            var distSnapY = horizontalSnapInfo.isBound ? Math.abs(snapOffsetY) : horizontalSnapInfo.snapIndex === 0 ? -snapOffsetY : snapOffsetY;
            cx -= distSnapX;
            cy -= distSnapY;

            if (isCircle) {
              cy = checkSnapBoundPriority(verticalSnapInfo, horizontalSnapInfo) > 0 ? cy : cx;
              cx = cy;
            }

            var center = guidePoses[0];
            guidePoses[1][1] = center[1] - cy;
            guidePoses[2][0] = center[0] + cx;
            guidePoses[3][1] = center[1] + cy;
            guidePoses[4][0] = center[0] - cx;
          } else {
            guidePoses.forEach(function (pos, j) {
              var dist = dists[j];

              if (dist[0]) {
                pos[0] -= snapOffsetX;
              }

              if (dist[1]) {
                pos[1] -= snapOffsetY;
              }
            });
            return "break";
          }
        };

        for (var i = 0; i < 2; ++i) {
          var state_1 = _loop_1();

          if (state_1 === "break") break;
        }

        var nextClipStyles = getClipStyles(moveable, clipPath, nextPoses);
        var clipStyle = clipType + "(" + nextClipStyles.join(splitter) + ")";
        state.clipPathState = clipStyle;

        if (isCircle || isEllipse) {
          guideXPoses = [guidePoses[4][0], guidePoses[2][0]];
          guideYPoses = [guidePoses[1][1], guidePoses[3][1]];
        } else if (isRect) {
          var rectPoses = [guidePoses[0], guidePoses[2], guidePoses[4], guidePoses[6]];
          guideXPoses = rectPoses.map(function (pos) {
            return pos[0];
          });
          guideYPoses = rectPoses.map(function (pos) {
            return pos[1];
          });
        } else {
          guideXPoses = guidePoses.map(function (pos) {
            return pos[0];
          });
          guideYPoses = guidePoses.map(function (pos) {
            return pos[1];
          });
        }

        state.snapBoundInfos = checkSnapBounds(guidelines, props.clipTargetBounds && {
          left: 0,
          top: 0,
          right: width,
          bottom: height
        }, guideXPoses, guideYPoses, {
          snapThreshold: 1
        });
        triggerEvent(moveable, "onClip", fillParams(moveable, e, {
          clipEventType: "changed",
          clipType: clipType,
          poses: nextPoses,
          clipStyle: clipStyle,
          clipStyles: nextClipStyles,
          distX: distX,
          distY: distY
        }));
        return true;
      },
      dragControlEnd: function (moveable, e) {
        this.unset(moveable);
        var isDrag = e.isDrag,
            datas = e.datas,
            isDouble = e.isDouble;
        var isLine = datas.isLine,
            isClipStart = datas.isClipStart,
            isControl = datas.isControl;

        if (!isClipStart) {
          return false;
        }

        triggerEvent(moveable, "onClipEnd", fillEndParams(moveable, e, {}));

        if (isDouble) {
          if (isControl) {
            removeClipPath(moveable, e);
          } else if (isLine) {
            // add
            addClipPath(moveable, e);
          }
        }

        return isDouble || isDrag;
      },
      unset: function (moveable) {
        moveable.state.clipPathState = "";
        moveable.state.snapBoundInfos = null;
      }
    };
    /**
     * Whether to clip the target. (default: false)
     * @name Moveable.Clippable#clippable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     *  If clippath is not set, the default value can be set. (defaultClipPath < style < customClipPath < dragging clipPath)
     * @name Moveable.Clippable#defaultClipPath
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * % Can be used instead of the absolute px (`rect` not possible) (default: false)
     * @name Moveable.Clippable#clipRelative
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * You can force the custom clipPath. (defaultClipPath < style < customClipPath < dragging clipPath)
     * @name Moveable.Clippable#customClipPath
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When dragging the target, the clip also moves. (default: true)
     * @name Moveable.Clippable#dragWithClip
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * You can drag the clip by setting clipArea. (default: false)
     * @name Moveable.Clippable#clipArea
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
    * Whether the clip is bound to the target. (default: false)
    * @name Moveable.Clippable#clipTargetBounds
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     clippable: true,
    *     defaultClipPath: "inset",
    *     customClipPath: "",
    *     clipRelative: false,
    *     clipArea: false,
    *     dragWithClip: true,
    *     clipTargetBounds: true,
    * });
    * moveable.on("clipStart", e => {
    *     console.log(e);
    * }).on("clip", e => {
    *     if (e.clipType === "rect") {
    *         e.target.style.clip = e.clipStyle;
    *     } else {
    *         e.target.style.clipPath = e.clipStyle;
    *     }
    * }).on("clipEnd", e => {
    *     console.log(e);
    * });
    */

    /**
    * Add clip guidelines in the vertical direction. (default: [])
    * @name Moveable.Clippable#clipVerticalGuidelines
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     clippable: true,
    *     defaultClipPath: "inset",
    *     customClipPath: "",
    *     clipRelative: false,
    *     clipArea: false,
    *     dragWithClip: true,
    *     clipVerticalGuidelines: [0, 100, 200],
    *     clipHorizontalGuidelines: [0, 100, 200],
    *     clipSnapThreshold: 5,
    * });
    */

    /**
    * Add clip guidelines in the horizontal direction. (default: [])
    * @name Moveable.Clippable#clipHorizontalGuidelines
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     clippable: true,
    *     defaultClipPath: "inset",
    *     customClipPath: "",
    *     clipRelative: false,
    *     clipArea: false,
    *     dragWithClip: true,
    *     clipVerticalGuidelines: [0, 100, 200],
    *     clipHorizontalGuidelines: [0, 100, 200],
    *     clipSnapThreshold: 5,
    * });
    */

    /**
    * istance value that can snap to clip guidelines. (default: 5)
    * @name Moveable.Clippable#clipSnapThreshold
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     clippable: true,
    *     defaultClipPath: "inset",
    *     customClipPath: "",
    *     clipRelative: false,
    *     clipArea: false,
    *     dragWithClip: true,
    *     clipVerticalGuidelines: [0, 100, 200],
    *     clipHorizontalGuidelines: [0, 100, 200],
    *     clipSnapThreshold: 5,
    * });
    */

    /**
     * When drag start the clip area or controls, the `clipStart` event is called.
     * @memberof Moveable.Clippable
     * @event clipStart
     * @param {Moveable.Clippable.OnClipStart} - Parameters for the `clipStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When drag the clip area or controls, the `clip` event is called.
     * @memberof Moveable.Clippable
     * @event clip
     * @param {Moveable.Clippable.OnClip} - Parameters for the `clip` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When drag end the clip area or controls, the `clipEnd` event is called.
     * @memberof Moveable.Clippable
     * @event clipEnd
     * @param {Moveable.Clippable.OnClipEnd} - Parameters for the `clipEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     clippable: true,
     *     defaultClipPath: "inset",
     *     customClipPath: "",
     *     clipRelative: false,
     *     clipArea: false,
     *     dragWithClip: true,
     * });
     * moveable.on("clipStart", e => {
     *     console.log(e);
     * }).on("clip", e => {
     *     if (e.clipType === "rect") {
     *         e.target.style.clip = e.clipStyle;
     *     } else {
     *         e.target.style.clipPath = e.clipStyle;
     *     }
     * }).on("clipEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * @namespace OriginDraggable
     * @memberof Moveable
     * @description Whether to drag origin (default: false)
     */

    var OriginDraggable = {
      name: "originDraggable",
      props: {
        originDraggable: Boolean,
        originRelative: Boolean
      },
      events: {
        onDragOriginStart: "dragOriginStart",
        onDragOrigin: "dragOrigin",
        onDragOriginEnd: "dragOriginEnd"
      },
      css: [":host[data-able-origindraggable] .control.origin {\n    pointer-events: auto;\n}"],
      dragControlCondition: function (e) {
        if (e.isRequest) {
          return e.requestAble === "originDraggable";
        }

        return hasClass(e.inputEvent.target, prefix("origin"));
      },
      dragControlStart: function (moveable, e) {
        var datas = e.datas;
        setDragStart(moveable, e);
        var params = fillParams(moveable, e, {
          dragStart: Draggable.dragStart(moveable, new CustomGesto().dragStart([0, 0], e))
        });
        var result = triggerEvent(moveable, "onDragOriginStart", params);
        datas.startOrigin = moveable.state.transformOrigin;
        datas.startTargetOrigin = moveable.state.targetOrigin;
        datas.prevOrigin = [0, 0];
        datas.isDragOrigin = true;

        if (result === false) {
          datas.isDragOrigin = false;
          return false;
        }

        return params;
      },
      dragControl: function (moveable, e) {
        var datas = e.datas,
            isPinch = e.isPinch,
            isRequest = e.isRequest;

        if (!datas.isDragOrigin) {
          return false;
        }

        var _a = getDragDist(e),
            distX = _a[0],
            distY = _a[1];

        var state = moveable.state;
        var width = state.width,
            height = state.height,
            offsetMatrix = state.offsetMatrix,
            targetMatrix = state.targetMatrix,
            is3d = state.is3d;
        var _b = moveable.props.originRelative,
            originRelative = _b === void 0 ? true : _b;
        var n = is3d ? 4 : 3;
        var dist = [distX, distY];

        if (isRequest) {
          var distOrigin = e.distOrigin;

          if (distOrigin[0] || distOrigin[1]) {
            dist = distOrigin;
          }
        }

        var origin = plus(datas.startOrigin, dist);
        var targetOrigin = plus(datas.startTargetOrigin, dist);
        var delta = minus(dist, datas.prevOrigin);
        var nextMatrix = getNextMatrix(offsetMatrix, targetMatrix, origin, n);
        var rect = moveable.getRect();
        var nextRect = getRect(caculatePoses(nextMatrix, width, height, n));
        var dragDelta = [rect.left - nextRect.left, rect.top - nextRect.top];
        datas.prevOrigin = dist;
        var transformOrigin = [convertCSSSize(targetOrigin[0], width, originRelative), convertCSSSize(targetOrigin[1], height, originRelative)].join(" ");
        var params = fillParams(moveable, e, {
          width: width,
          height: height,
          origin: origin,
          dist: dist,
          delta: delta,
          transformOrigin: transformOrigin,
          drag: Draggable.drag(moveable, setCustomDrag(e, moveable.state, dragDelta, !!isPinch, false))
        });
        triggerEvent(moveable, "onDragOrigin", params);
        return params;
      },
      dragControlEnd: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isDragOrigin) {
          return false;
        }

        triggerEvent(moveable, "onDragOriginEnd", fillEndParams(moveable, e, {}));
        return true;
      },
      dragGroupControlCondition: function (e) {
        return this.dragControlCondition(e);
      },
      dragGroupControlStart: function (moveable, e) {
        var params = this.dragControlStart(moveable, e);

        if (!params) {
          return false;
        }

        return true;
      },
      dragGroupControl: function (moveable, e) {
        var params = this.dragControl(moveable, e);

        if (!params) {
          return false;
        }

        moveable.transformOrigin = params.transformOrigin;
        return true;
      },

      /**
      * @method Moveable.OriginDraggable#request
      * @param {object} e - the OriginDraggable's request parameter
      * @param {number} [e.x] - x position
      * @param {number} [e.y] - y position
      * @param {number} [e.deltaX] - x number to move
      * @param {number} [e.deltaY] - y number to move
      * @param {array} [e.deltaOrigin] - left, top number to move transform-origin
      * @param {array} [e.origin] - transform-origin position
      * @param {number} [e.isInstant] - Whether to execute the request instantly
      * @return {Moveable.Requester} Moveable Requester
      * @example
       * // Instantly Request (requestStart - request - requestEnd)
      * // Use Relative Value
      * moveable.request("originDraggable", { deltaX: 10, deltaY: 10 }, true);
      * // Use Absolute Value
      * moveable.request("originDraggable", { x: 200, y: 100 }, true);
      * // Use Transform Value
      * moveable.request("originDraggable", { deltaOrigin: [10, 0] }, true);
      * moveable.request("originDraggable", { origin: [100, 0] }, true);
      * // requestStart
      * const requester = moveable.request("originDraggable");
      *
      * // request
      * // Use Relative Value
      * requester.request({ deltaX: 10, deltaY: 10 });
      * requester.request({ deltaX: 10, deltaY: 10 });
      * requester.request({ deltaX: 10, deltaY: 10 });
      * // Use Absolute Value
      * moveable.request("originDraggable", { x: 200, y: 100 });
      * moveable.request("originDraggable", { x: 220, y: 100 });
      * moveable.request("originDraggable", { x: 240, y: 100 });
      *
      * // requestEnd
      * requester.requestEnd();
      */
      request: function (moveable) {
        var datas = {};
        var rect = moveable.getRect();
        var distX = 0;
        var distY = 0;
        var transformOrigin = rect.transformOrigin;
        var distOrigin = [0, 0];
        return {
          isControl: true,
          requestStart: function () {
            return {
              datas: datas
            };
          },
          request: function (e) {
            if ("deltaOrigin" in e) {
              distOrigin[0] += e.deltaOrigin[0];
              distOrigin[1] += e.deltaOrigin[1];
            } else if ("origin" in e) {
              distOrigin[0] = e.origin[0] - transformOrigin[0];
              distOrigin[1] = e.origin[1] - transformOrigin[1];
            } else {
              if ("x" in e) {
                distX = e.x - rect.left;
              } else if ("deltaX" in e) {
                distX += e.deltaX;
              }

              if ("y" in e) {
                distY = e.y - rect.top;
              } else if ("deltaY" in e) {
                distY += e.deltaY;
              }
            }

            return {
              datas: datas,
              distX: distX,
              distY: distY,
              distOrigin: distOrigin
            };
          },
          requestEnd: function () {
            return {
              datas: datas,
              isDrag: true
            };
          }
        };
      }
    };
    /**
     * Whether to drag origin (default: false)
     * @name Moveable.OriginDraggable#originDraggable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     * });
     * let translate = [0, 0];
     * moveable.on("dragOriginStart", e => {
     *     e.dragStart && e.dragStart.set(translate);
     * }).on("dragOrigin", e => {
     *     translate = e.drag.beforeTranslate;
     *     e.target.style.cssText
     *         = `transform-origin: ${e.transformOrigin};`
     *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
     * }).on("dragOriginEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * % Can be used instead of the absolute px (default: true)
     * @name Moveable.OriginDraggable#originRelative
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     originDraggable: true,
     *     originRelative: false,
     * });
     * moveable.originRelative = true;
     */

    /**
    * When drag start the origin, the `dragOriginStart` event is called.
    * @memberof Moveable.OriginDraggable
    * @event dragOriginStart
    * @param {Moveable.OriginDraggable.OnDragOriginStart} - Parameters for the `dragOriginStart` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     originDraggable: true,
    * });
    * let translate = [0, 0];
    * moveable.on("dragOriginStart", e => {
    *     e.dragStart && e.dragStart.set(translate);
    * }).on("dragOrigin", e => {
    *     translate = e.drag.beforeTranslate;
    *     e.target.style.cssText
    *         = `transform-origin: ${e.transformOrigin};`
    *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
    * }).on("dragOriginEnd", e => {
    *     console.log(e);
    * });
    */

    /**
    * When drag the origin, the `dragOrigin` event is called.
    * @memberof Moveable.OriginDraggable
    * @event dragOrigin
    * @param {Moveable.OriginDraggable.OnDragOrigin} - Parameters for the `dragOrigin` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     originDraggable: true,
    * });
    * let translate = [0, 0];
    * moveable.on("dragOriginStart", e => {
    *     e.dragStart && e.dragStart.set(translate);
    * }).on("dragOrigin", e => {
    *     translate = e.drag.beforeTranslate;
    *     e.target.style.cssText
    *         = `transform-origin: ${e.transformOrigin};`
    *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
    * }).on("dragOriginEnd", e => {
    *     console.log(e);
    * });
    */

    /**
    * When drag end the origin, the `dragOriginEnd` event is called.
    * @memberof Moveable.OriginDraggable
    * @event dragOriginEnd
    * @param {Moveable.OriginDraggable.OnDragOriginEnd} - Parameters for the `dragOriginEnd` event
    * @example
    * import Moveable from "moveable";
    *
    * const moveable = new Moveable(document.body, {
    *     originDraggable: true,
    * });
    * let translate = [0, 0];
    * moveable.on("dragOriginStart", e => {
    *     e.dragStart && e.dragStart.set(translate);
    * }).on("dragOrigin", e => {
    *     translate = e.drag.beforeTranslate;
    *     e.target.style.cssText
    *         = `transform-origin: ${e.transformOrigin};`
    *         + `transform: translate(${translate[0]}px, ${translate[1]}px)`;
    * }).on("dragOriginEnd", e => {
    *     console.log(e);
    * });
    */

    function addBorderRadius(controlPoses, poses, lineIndex, distX, distY, width, height) {
      var _a = splitRadiusPoses(controlPoses),
          horizontals = _a.horizontals,
          verticals = _a.verticals;

      var horizontalsLength = horizontals.length;
      var verticalsLength = verticals.length; // lineIndex
      // 0 top
      // 1 right
      // 2 left
      // 3 bottom
      // 0 top - left
      // 1 top - right
      // 2 bottom - right
      // 3 bottom - left
      // 0 left - top
      // 1 right - top
      // 2 right - bottom
      // 3 left - bottom

      var horizontalIndex = -1;
      var verticalIndex = -1;

      if (lineIndex === 0) {
        if (horizontalsLength === 0) {
          horizontalIndex = 0;
        } else if (horizontalsLength === 1) {
          horizontalIndex = 1;
        }
      } else if (lineIndex === 3) {
        if (horizontalsLength <= 2) {
          horizontalIndex = 2;
        } else if (horizontalsLength <= 3) {
          horizontalIndex = 3;
        }
      }

      if (lineIndex === 2) {
        if (verticalsLength === 0) {
          verticalIndex = 0;
        } else if (verticalsLength < 4) {
          verticalIndex = 3;
        }
      } else if (lineIndex === 1) {
        if (verticalsLength <= 1) {
          verticalIndex = 1;
        } else if (verticalsLength <= 2) {
          verticalIndex = 2;
        }
      }

      addRadiusPos(controlPoses, poses, 0, horizontalIndex, verticalIndex, distX, distY, width, height);
    }

    function getBorderRadius(target, width, height, state) {
      var borderRadius;

      if (!state) {
        var style = window.getComputedStyle(target);

        if (!style) {
          return null;
        }

        borderRadius = style.borderRadius || "";
      } else {
        borderRadius = state;
      }

      if (!borderRadius || !state && borderRadius === "0px") {
        return null;
      }

      var values = splitSpace(borderRadius);
      return getRadiusValues(values, width, height, 0, 0);
    }

    function triggerRoundEvent(moveable, e, dist, delta, controlPoses, nextPoses) {
      var state = moveable.state;
      var width = state.width,
          height = state.height;

      var _a = getRadiusStyles(nextPoses, controlPoses, moveable.props.roundRelative, width, height),
          raws = _a.raws,
          styles = _a.styles;

      var _b = splitRadiusPoses(controlPoses, raws),
          horizontals = _b.horizontals,
          verticals = _b.verticals;

      var borderRadius = styles.join(" ");
      state.borderRadiusState = borderRadius;
      triggerEvent(moveable, "onRound", fillParams(moveable, e, {
        horizontals: horizontals,
        verticals: verticals,
        borderRadius: borderRadius,
        width: width,
        height: height,
        delta: delta,
        dist: dist
      }));
    }
    /**
     * @namespace Moveable.Roundable
     * @description Whether to show and drag or double click border-radius
     */


    var Roundable = {
      name: "roundable",
      props: {
        roundable: Boolean,
        roundRelative: Boolean
      },
      events: {
        onRoundStart: "roundStart",
        onRound: "round",
        onRoundEnd: "roundEnd"
      },
      css: [".control.border-radius {\n    background: #d66;\n    cursor: pointer;\n}", ":host[data-able-roundable] .line.direction {\n    cursor: pointer;\n}"],
      render: function (moveable, React) {
        var _a = moveable.state,
            target = _a.target,
            width = _a.width,
            height = _a.height,
            allMatrix = _a.allMatrix,
            is3d = _a.is3d,
            left = _a.left,
            top = _a.top,
            borderRadiusState = _a.borderRadiusState;

        if (!target) {
          return null;
        }

        var n = is3d ? 4 : 3;
        var radiusValues = getBorderRadius(target, width, height, borderRadiusState);

        if (!radiusValues) {
          return null;
        }

        return radiusValues.map(function (v, i) {
          var pos = minus(caculatePosition(allMatrix, v.pos, n), [left, top]);
          return React.createElement("div", {
            key: "borderRadiusControl" + i,
            className: prefix("control", "border-radius"),
            "data-radius-index": i,
            style: {
              transform: "translate(" + pos[0] + "px, " + pos[1] + "px)"
            }
          });
        });
      },
      dragControlCondition: function (e) {
        if (!e.inputEvent || e.isRequest) {
          return false;
        }

        var className = e.inputEvent.target.className || "";
        return className.indexOf("border-radius") > -1 || className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
      },
      dragControlStart: function (moveable, e) {
        var inputEvent = e.inputEvent,
            datas = e.datas;
        var inputTarget = inputEvent.target;
        var className = inputTarget.className || "";
        var isControl = className.indexOf("border-radius") > -1;
        var isLine = className.indexOf("moveable-line") > -1 && className.indexOf("moveable-direction") > -1;
        var controlIndex = isControl ? parseInt(inputTarget.getAttribute("data-radius-index"), 10) : -1;
        var lineIndex = isLine ? parseInt(inputTarget.getAttribute("data-line-index"), 10) : -1;

        if (!isControl && !isLine) {
          return false;
        }

        var result = triggerEvent(moveable, "onRoundStart", fillParams(moveable, e, {}));

        if (result === false) {
          return false;
        }

        datas.lineIndex = lineIndex;
        datas.controlIndex = controlIndex;
        datas.isControl = isControl;
        datas.isLine = isLine;
        setDragStart(moveable, e);
        var roundRelative = moveable.props.roundRelative;
        var state = moveable.state;
        var target = state.target,
            width = state.width,
            height = state.height;
        datas.isRound = true;
        datas.prevDist = [0, 0];
        var controlPoses = getBorderRadius(target, width, height) || [];
        datas.controlPoses = controlPoses;
        state.borderRadiusState = getRadiusStyles(controlPoses.map(function (pos) {
          return pos.pos;
        }), controlPoses, roundRelative, width, height).styles.join(" ");
        return true;
      },
      dragControl: function (moveable, e) {
        var datas = e.datas;

        if (!datas.isRound || !datas.isControl || !datas.controlPoses.length) {
          return false;
        }

        var index = datas.controlIndex;
        var controlPoses = datas.controlPoses;

        var _a = getDragDist(e),
            distX = _a[0],
            distY = _a[1];

        var dist = [distX, distY];
        var delta = minus(dist, datas.prevDist);
        var dists = moveControlPos(controlPoses, index, dist);
        var nextPoses = controlPoses.map(function (pos, i) {
          return plus(pos.pos, dists[i]);
        });
        datas.prevDist = [distX, distY];
        triggerRoundEvent(moveable, e, dist, delta, controlPoses, nextPoses);
        return true;
      },
      dragControlEnd: function (moveable, e) {
        var state = moveable.state;
        state.borderRadiusState = "";
        var datas = e.datas,
            isDouble = e.isDouble;

        if (!datas.isRound) {
          return false;
        }

        var width = state.width,
            height = state.height;
        var isControl = datas.isControl,
            controlIndex = datas.controlIndex,
            isLine = datas.isLine,
            lineIndex = datas.lineIndex;
        var controlPoses = datas.controlPoses;
        var poses = controlPoses.map(function (pos) {
          return pos.pos;
        });
        var length = poses.length;

        if (isDouble) {
          if (isControl) {
            removeRadiusPos(controlPoses, poses, controlIndex, 0);
          } else if (isLine) {
            var _a = caculatePointerDist(moveable, e),
                distX = _a[0],
                distY = _a[1];

            addBorderRadius(controlPoses, poses, lineIndex, distX, distY, width, height);
          }

          if (length !== controlPoses.length) {
            triggerRoundEvent(moveable, e, [0, 0], [0, 0], controlPoses, poses);
          }

          triggerEvent(moveable, "onRoundEnd", fillEndParams(moveable, e, {}));
        }

        state.borderRadiusState = "";
        return true;
      },
      unset: function (moveable) {
        moveable.state.borderRadiusState = "";
      }
    };
    /**
     * Whether to show and drag or double click border-radius, (default: false)
     * @name Moveable.Roundable#roundable
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * % Can be used instead of the absolute px
     * @name Moveable.Roundable#roundRelative
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When drag start the clip area or controls, the `roundStart` event is called.
     * @memberof Moveable.Roundable
     * @event roundStart
     * @param {Moveable.Roundable.OnRoundStart} - Parameters for the `roundStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When drag or double click the border area or controls, the `round` event is called.
     * @memberof Moveable.Roundable
     * @event round
     * @param {Moveable.Roundable.OnRound} - Parameters for the `round` event
     * @example
      * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */

    /**
     * When drag end the border area or controls, the `roundEnd` event is called.
     * @memberof Moveable.Roundable
     * @event roundEnd
     * @param {Moveable.Roundable.onRoundEnd} - Parameters for the `roundEnd` event
     * @example
      * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     roundable: true,
     *     roundRelative: false,
     * });
     * moveable.on("roundStart", e => {
     *     console.log(e);
     * }).on("round", e => {
     *     e.target.style.borderRadius = e.borderRadius;
     * }).on("roundEnd", e => {
     *     console.log(e);
     * });
     */

    var BeforeRenderable = {
      isPinch: true,
      name: "beforeRenderable",
      props: {},
      events: {
        onBeforeRenderStart: "beforeRenderStart",
        onBeforeRender: "beforeRender",
        onBeforeRenderEnd: "beforeRenderEnd",
        onBeforeRenderGroupStart: "beforeRenderGroupStart",
        onBeforeRenderGroup: "beforeRenderGroup",
        onBeforeRenderGroupEnd: "beforeRenderGroupEnd"
      },
      setTransform: function (moveable, e) {
        var _a = moveable.state,
            is3d = _a.is3d,
            targetMatrix = _a.targetMatrix;
        var cssMatrix = is3d ? "matrix3d(" + targetMatrix.join(",") + ")" : "matrix(" + convertMatrixtoCSS(targetMatrix, true) + ")";
        e.datas.startTransforms = [cssMatrix];
      },
      resetTransform: function (moveable, e) {
        e.datas.nextTransforms = e.datas.startTransforms;
        e.datas.nextTransformAppendedIndexes = [];
      },
      fillDragStartParams: function (moveable, e) {
        return fillParams(moveable, e, {
          setTransform: function (transform) {
            e.datas.startTransforms = isArray$1(transform) ? transform : splitSpace(transform);
          },
          isPinch: !!e.isPinch
        });
      },
      fillDragParams: function (moveable, e) {
        return fillParams(moveable, e, {
          isPinch: !!e.isPinch
        });
      },
      dragStart: function (moveable, e) {
        this.setTransform(moveable, e);
        triggerEvent(moveable, "onBeforeRenderStart", this.fillDragStartParams(moveable, e));
      },
      drag: function (moveable, e) {
        this.resetTransform(moveable, e);
        triggerEvent(moveable, "onBeforeRender", fillParams(moveable, e, {
          isPinch: !!e.isPinch
        }));
      },
      dragEnd: function (moveable, e) {
        triggerEvent(moveable, "onBeforeRenderEnd", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          isDrag: e.isDrag
        }));
      },
      dragGroupStart: function (moveable, e) {
        var _this = this;

        this.dragStart(moveable, e);
        var events = fillChildEvents(moveable, "beforeRenderable", e);
        var moveables = moveable.moveables;
        var params = events.map(function (childEvent, i) {
          var childMoveable = moveables[i];

          _this.setTransform(childMoveable, childEvent);

          return _this.fillDragStartParams(childMoveable, childEvent);
        });
        triggerEvent(moveable, "onBeforeRenderGroupStart", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          targets: moveable.props.targets,
          setTransform: function () {},
          events: params
        }));
      },
      dragGroup: function (moveable, e) {
        var _this = this;

        this.drag(moveable, e);
        var events = fillChildEvents(moveable, "beforeRenderable", e);
        var moveables = moveable.moveables;
        var params = events.map(function (childEvent, i) {
          var childMoveable = moveables[i];

          _this.resetTransform(childMoveable, childEvent);

          return _this.fillDragParams(childMoveable, childEvent);
        });
        triggerEvent(moveable, "onBeforeRenderGroup", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          targets: moveable.props.targets,
          events: params
        }));
      },
      dragGroupEnd: function (moveable, e) {
        this.dragEnd(moveable, e);
        triggerEvent(moveable, "onBeforeRenderGroupEnd", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          isDrag: e.isDrag,
          targets: moveable.props.targets
        }));
      },
      dragControlStart: function (moveable, e) {
        return this.dragStart(moveable, e);
      },
      dragControl: function (moveable, e) {
        return this.drag(moveable, e);
      },
      dragControlEnd: function (moveable, e) {
        return this.dragEnd(moveable, e);
      },
      dragGroupControlStart: function (moveable, e) {
        return this.dragGroupStart(moveable, e);
      },
      dragGroupControl: function (moveable, e) {
        return this.dragGroup(moveable, e);
      },
      dragGroupControlEnd: function (moveable, e) {
        return this.dragGroupEnd(moveable, e);
      }
    };

    var Renderable = {
      name: "Renderable",
      props: {},
      events: {
        onRenderStart: "renderStart",
        onRender: "render",
        onRenderEnd: "renderEnd",
        onRenderGroupStart: "renderGroupStart",
        onRenderGroup: "renderGroup",
        onRenderGroupEnd: "renderGroupEnd"
      },
      dragStart: function (moveable, e) {
        triggerEvent(moveable, "onRenderStart", fillParams(moveable, e, {
          isPinch: !!e.isPinch
        }));
      },
      drag: function (moveable, e) {
        triggerEvent(moveable, "onRender", fillParams(moveable, e, {
          isPinch: !!e.isPinch
        }));
      },
      dragEnd: function (moveable, e) {
        triggerEvent(moveable, "onRenderEnd", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          isDrag: e.isDrag
        }));
      },
      dragGroupStart: function (moveable, e) {
        triggerEvent(moveable, "onRenderGroupStart", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          targets: moveable.props.targets
        }));
      },
      dragGroup: function (moveable, e) {
        triggerEvent(moveable, "onRenderGroup", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          targets: moveable.props.targets
        }));
      },
      dragGroupEnd: function (moveable, e) {
        triggerEvent(moveable, "onRenderGroupEnd", fillParams(moveable, e, {
          isPinch: !!e.isPinch,
          isDrag: e.isDrag,
          targets: moveable.props.targets
        }));
      },
      dragControlStart: function (moveable, e) {
        return this.dragStart(moveable, e);
      },
      dragControl: function (moveable, e) {
        return this.drag(moveable, e);
      },
      dragControlEnd: function (moveable, e) {
        return this.dragEnd(moveable, e);
      },
      dragGroupControlStart: function (moveable, e) {
        return this.dragGroupStart(moveable, e);
      },
      dragGroupControl: function (moveable, e) {
        return this.dragGroup(moveable, e);
      },
      dragGroupControlEnd: function (moveable, e) {
        return this.dragGroupEnd(moveable, e);
      }
    };

    function triggerAble(moveable, ableType, eventOperation, eventAffix, eventType, e, requestInstant) {
      var isStart = eventType === "Start";
      var target = moveable.state.target;
      var isRequest = e.isRequest;

      if (!target || isStart && eventAffix.indexOf("Control") > -1 && !isRequest && moveable.areaElement === e.inputEvent.target) {
        return false;
      }

      var eventName = "" + eventOperation + eventAffix + eventType;
      var conditionName = "" + eventOperation + eventAffix + "Condition";
      var isEnd = eventType === "End";
      var isAfter = eventType.indexOf("After") > -1;
      var isFirstStart = isStart && (!moveable.targetGesto || !moveable.controlGesto || !moveable.targetGesto.isFlag() || !moveable.controlGesto.isFlag());

      if (isFirstStart) {
        moveable.updateRect(eventType, true, false);
      }

      if (eventType === "" && !isAfter) {
        convertDragDist(moveable.state, e);
      }

      var isGroup = eventAffix.indexOf("Group") > -1;

      var ables = __spreadArrays$1([BeforeRenderable], moveable[ableType].slice(), [Renderable]);

      if (isRequest) {
        var requestAble_1 = e.requestAble;

        if (!ables.some(function (able) {
          return able.name === requestAble_1;
        })) {
          ables.push.apply(ables, moveable.props.ables.filter(function (able) {
            return able.name === requestAble_1;
          }));
        }
      }

      if (!ables.length) {
        return false;
      }

      var events = ables.filter(function (able) {
        return able[eventName];
      });
      var datas = e.datas;

      if (isFirstStart) {
        events.forEach(function (able) {
          able.unset && able.unset(moveable);
        });
      }

      var inputEvent = e.inputEvent;
      var inputTarget;

      if (isEnd && inputEvent) {
        inputTarget = document.elementFromPoint(e.clientX, e.clientY) || inputEvent.target;
      }

      var results = events.filter(function (able) {
        var hasCondition = isStart && able[conditionName];
        var ableName = able.name;
        var nextDatas = datas[ableName] || (datas[ableName] = {});

        if (!hasCondition || able[conditionName](e, moveable)) {
          return able[eventName](moveable, __assign$4(__assign$4({}, e), {
            datas: nextDatas,
            originalDatas: datas,
            inputTarget: inputTarget
          }));
        }

        return false;
      });
      var isUpdate = results.length;
      var isForceEnd = isStart && events.length && !isUpdate;

      if (isEnd || isForceEnd) {
        moveable.state.Gesto = null;

        if (moveable.moveables) {
          moveable.moveables.forEach(function (childMoveable) {
            childMoveable.state.gesto = null;
          });
        }
      }

      if (isFirstStart && isForceEnd) {
        events.forEach(function (able) {
          able.unset && able.unset(moveable);
        });
      }

      if (moveable.isUnmounted || isForceEnd) {
        return false;
      }

      if (!isStart && isUpdate && !requestInstant || isEnd) {
        if (results.some(function (able) {
          return able.updateRect;
        }) && !isGroup) {
          moveable.updateRect(eventType, false, false);
        } else {
          moveable.updateRect(eventType, true, false);
        }

        moveable.forceUpdate();
      }

      if (!isStart && !isEnd && !isAfter && isUpdate && !requestInstant) {
        triggerAble(moveable, ableType, eventOperation, eventAffix, eventType + "After", e);
      }

      return true;
    }
    function getTargetAbleGesto(moveable, moveableTarget, eventAffix) {
      var controlBox = moveable.controlBox.getElement();
      var targets = [];
      targets.push(controlBox);

      if (!moveable.props.dragArea) {
        targets.push(moveableTarget);
      }

      var startFunc = function (e) {
        var eventTarget = e.inputEvent.target;
        var areaElement = moveable.areaElement;
        return eventTarget === areaElement || !moveable.isMoveableElement(eventTarget) || eventTarget.className.indexOf("moveable-area") > -1 || eventTarget.className.indexOf("moveable-padding") > -1;
      };

      return getAbleGesto(moveable, targets, "targetAbles", eventAffix, {
        dragStart: startFunc,
        pinchStart: startFunc
      });
    }
    function getAbleGesto(moveable, target, ableType, eventAffix, conditionFunctions) {
      if (conditionFunctions === void 0) {
        conditionFunctions = {};
      }

      var _a = moveable.props,
          pinchOutside = _a.pinchOutside,
          pinchThreshold = _a.pinchThreshold;
      var options = {
        container: window,
        pinchThreshold: pinchThreshold,
        pinchOutside: pinchOutside
      };
      var gesto = new Gesto(target, options);
      ["drag", "pinch"].forEach(function (eventOperation) {
        ["Start", "", "End"].forEach(function (eventType) {
          gesto.on("" + eventOperation + eventType, function (e) {
            var eventName = e.eventType;

            if (conditionFunctions[eventName] && !conditionFunctions[eventName](e)) {
              e.stop();
              return;
            }

            var result = triggerAble(moveable, ableType, eventOperation, eventAffix, eventType, e);

            if (!result) {
              e.stop();
            }
          });
        });
      });
      return gesto;
    }

    var MoveableManager =
    /*#__PURE__*/
    function (_super) {
      __extends$6(MoveableManager, _super);

      function MoveableManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.state = __assign$4({
          container: null,
          target: null,
          gesto: null,
          renderPoses: [[0, 0], [0, 0], [0, 0], [0, 0]]
        }, getTargetInfo(null));
        _this.targetAbles = [];
        _this.controlAbles = [];
        _this.rotation = 0;
        _this.scale = [1, 1];
        _this.isUnmounted = false;
        return _this;
      }

      var __proto = MoveableManager.prototype;

      __proto.render = function () {
        var props = this.props;
        var state = this.state;
        var edge = props.edge,
            parentPosition = props.parentPosition,
            className = props.className,
            propsTarget = props.target,
            zoom = props.zoom,
            cspNonce = props.cspNonce,
            translateZ = props.translateZ,
            ControlBoxElement = props.cssStyled;
        this.checkUpdate();
        this.updateRenderPoses();

        var _a = parentPosition || {
          left: 0,
          top: 0
        },
            parentLeft = _a.left,
            parentTop = _a.top;

        var left = state.left,
            top = state.top,
            stateTarget = state.target,
            direction = state.direction,
            renderPoses = state.renderPoses;
        var groupTargets = props.targets;
        var isDisplay = (groupTargets && groupTargets.length || propsTarget) && stateTarget;
        var isDragging = this.isDragging();
        var ableAttributes = {};
        var Renderer = {
          createElement: createElement
        };
        this.getEnabledAbles().forEach(function (able) {
          ableAttributes["data-able-" + able.name.toLowerCase()] = true;
        });
        return createElement(ControlBoxElement, __assign$4({
          cspNonce: cspNonce,
          ref: ref(this, "controlBox"),
          className: prefix("control-box", direction === -1 ? "reverse" : "", isDragging ? "dragging" : "") + " " + className
        }, ableAttributes, {
          style: {
            "position": "absolute",
            "display": isDisplay ? "block" : "none",
            "transform": "translate(" + (left - parentLeft) + "px, " + (top - parentTop) + "px) translateZ(" + translateZ + "px)",
            "--zoom": zoom,
            "--zoompx": zoom + "px"
          }
        }), this.renderAbles(), renderLine(Renderer, edge ? "n" : "", renderPoses[0], renderPoses[1], 0), renderLine(Renderer, edge ? "e" : "", renderPoses[1], renderPoses[3], 1), renderLine(Renderer, edge ? "w" : "", renderPoses[0], renderPoses[2], 2), renderLine(Renderer, edge ? "s" : "", renderPoses[2], renderPoses[3], 3));
      };

      __proto.componentDidMount = function () {
        this.controlBox.getElement();
        var props = this.props;
        var parentMoveable = props.parentMoveable,
            container = props.container;
        this.updateEvent(props);

        if (!container && !parentMoveable) {
          this.updateRect("End", false, true);
        }

        this.updateCheckInput();
      };

      __proto.componentDidUpdate = function (prevProps) {
        this.updateEvent(prevProps);
        this.updateCheckInput();
      };

      __proto.componentWillUnmount = function () {
        this.isUnmounted = true;
        unset(this, "targetGesto");
        unset(this, "controlGesto");
      };

      __proto.getContainer = function () {
        var _a = this.props,
            parentMoveable = _a.parentMoveable,
            container = _a.container;
        return container || parentMoveable && parentMoveable.getContainer() || this.controlBox.getElement().parentElement;
      };
      /**
       * Check if the target is an element included in the moveable.
       * @method Moveable#isMoveableElement
       * @param - the target
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * window.addEventListener("click", e => {
       *     if (!moveable.isMoveableElement(e.target)) {
       *         moveable.target = e.target;
       *     }
       * });
       */


      __proto.isMoveableElement = function (target) {
        return target && (target.getAttribute("class") || "").indexOf(PREFIX) > -1;
      };
      /**
       * You can drag start the Moveable through the external `MouseEvent`or `TouchEvent`. (Angular: ngDragStart)
       * @method Moveable#dragStart
       * @param - external `MouseEvent`or `TouchEvent`
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * document.body.addEventListener("mousedown", e => {
       *     if (!moveable.isMoveableElement(e.target)) {
       *          moveable.dragStart(e);
       *     }
       * });
       */


      __proto.dragStart = function (e) {
        if (this.targetGesto) {
          this.targetGesto.triggerDragStart(e);
        }

        return this;
      };
      /**
       * Hit test an element or rect on a moveable target.
       * @method Moveable#hitTest
       * @param - element or rect to test
       * @return - Get hit test rate (rate > 0 is hitted)
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * document.body.addEventListener("mousedown", e => {
       *     if (moveable.hitTest(e.target) > 0) {
       *          console.log("hiited");
       *     }
       * });
       */


      __proto.hitTest = function (el) {
        var rect;

        if (el instanceof Element) {
          var clientRect = el.getBoundingClientRect();
          rect = {
            left: clientRect.left,
            top: clientRect.top,
            width: clientRect.width,
            height: clientRect.height
          };
        } else {
          rect = __assign$4({
            width: 0,
            height: 0
          }, el);
        }

        var _a = this.state.targetClientRect,
            rectLeft = _a.left,
            rectTop = _a.top,
            rectWidth = _a.width,
            rectHeight = _a.height;
        var left = rect.left,
            top = rect.top,
            width = rect.width,
            height = rect.height;
        var right = left + width;
        var bottom = top + height;
        var rectRight = rectLeft + rectWidth;
        var rectBottom = rectTop + rectHeight;
        var testLeft = Math.max(rectLeft, left);
        var testRight = Math.min(rectRight, right);
        var testTop = Math.max(rectTop, top);
        var testBottom = Math.min(rectBottom, bottom);

        if (testRight < testLeft || testBottom < testTop) {
          return 0;
        }

        var rectSize = (Math.min(rectRight, right) - Math.max(left, rectLeft)) * (Math.min(rectBottom, bottom) - Math.max(rectTop, top));
        return Math.min(100, (testRight - testLeft) * (testBottom - testTop) / rectSize * 100);
      };
      /**
       * Whether the coordinates are inside Moveable
       * @method Moveable#isInside
       * @param - x coordinate
       * @param - y coordinate
       * @return - True if the coordinate is in moveable or false
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * document.body.addEventListener("mousedown", e => {
       *     if (moveable.isInside(e.clientX, e.clientY)) {
       *          console.log("inside");
       *     }
       * });
       */


      __proto.isInside = function (clientX, clientY) {
        var _a = this.state,
            pos1 = _a.pos1,
            pos2 = _a.pos2,
            pos3 = _a.pos3,
            pos4 = _a.pos4,
            target = _a.target,
            targetClientRect = _a.targetClientRect;

        if (!target) {
          return false;
        }

        var left = targetClientRect.left,
            top = targetClientRect.top;
        var pos = [clientX - left, clientY - top];
        return isInside(pos, pos1, pos2, pos3, pos4);
      };
      /**
       * If the width, height, left, and top of all elements change, update the shape of the moveable.
       * @method Moveable#updateRect
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * window.addEventListener("resize", e => {
       *     moveable.updateRect();
       * });
       */


      __proto.updateRect = function (type, isTarget, isSetState) {
        if (isSetState === void 0) {
          isSetState = true;
        }

        var props = this.props;
        var parentMoveable = props.parentMoveable;
        var state = this.state;
        var target = state.target || this.props.target;
        var container = this.getContainer();
        var rootContainer = parentMoveable ? parentMoveable.props.rootContainer : props.rootContainer;
        this.updateState(getTargetInfo(this.controlBox && this.controlBox.getElement(), target, container, container, rootContainer || container, isTarget ? state : undefined), parentMoveable ? false : isSetState);
      };

      __proto.updateEvent = function (prevProps) {
        var controlBoxElement = this.controlBox.getElement();
        var hasTargetAble = this.targetAbles.length;
        var hasControlAble = this.controlAbles.length;
        var props = this.props;
        var target = props.dragTarget || props.target;
        var prevTarget = prevProps.dragTarget || prevProps.target;
        var dragArea = props.dragArea;
        var prevDragArea = prevProps.dragArea;
        var isTargetChanged = !dragArea && prevTarget !== target;
        var isUnset = !hasTargetAble && this.targetGesto || isTargetChanged || prevDragArea !== dragArea;

        if (isUnset) {
          unset(this, "targetGesto");
          this.updateState({
            gesto: null
          });
        }

        if (!hasControlAble) {
          unset(this, "controlGesto");
        }

        if (target && hasTargetAble && !this.targetGesto) {
          this.targetGesto = getTargetAbleGesto(this, target, "");
        }

        if (!this.controlGesto && hasControlAble) {
          this.controlGesto = getAbleGesto(this, controlBoxElement, "controlAbles", "Control");
        }

        if (isUnset) {
          this.unsetAbles();
        }
      };
      /**
       * Check if the moveable state is being dragged.
       * @method Moveable#isDragging
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * // false
       * console.log(moveable.isDragging());
       *
       * moveable.on("drag", () => {
       *   // true
       *   console.log(moveable.isDragging());
       * });
       */


      __proto.isDragging = function () {
        return (this.targetGesto ? this.targetGesto.isFlag() : false) || (this.controlGesto ? this.controlGesto.isFlag() : false);
      };
      /**
       * If the width, height, left, and top of the only target change, update the shape of the moveable.
       * @method Moveable#updateTarget
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * moveable.updateTarget();
       */


      __proto.updateTarget = function (type) {
        this.updateRect(type, true);
      };
      /**
       * You can get the vertex information, position and offset size information of the target based on the container.
       * @method Moveable#getRect
       * @return - The Rect Info
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * const rectInfo = moveable.getRect();
       */


      __proto.getRect = function () {
        var state = this.state;
        var poses = getAbsolutePosesByState(this.state);
        var pos1 = poses[0],
            pos2 = poses[1],
            pos3 = poses[2],
            pos4 = poses[3];
        var rect = getRect(poses);
        var offsetWidth = state.width,
            offsetHeight = state.height;
        var width = rect.width,
            height = rect.height,
            left = rect.left,
            top = rect.top;
        var statePos = [state.left, state.top];
        var origin = plus(statePos, state.origin);
        var beforeOrigin = plus(statePos, state.beforeOrigin);
        var transformOrigin = state.transformOrigin;
        return {
          width: width,
          height: height,
          left: left,
          top: top,
          pos1: pos1,
          pos2: pos2,
          pos3: pos3,
          pos4: pos4,
          offsetWidth: offsetWidth,
          offsetHeight: offsetHeight,
          beforeOrigin: beforeOrigin,
          origin: origin,
          transformOrigin: transformOrigin,
          rotation: this.getRotation()
        };
      };

      __proto.getRotation = function () {
        var _a = this.state,
            pos1 = _a.pos1,
            pos2 = _a.pos2,
            direction = _a.direction;
        var deg = getRad$1(pos1, pos2) / Math.PI * 180;
        deg = direction >= 0 ? deg : 180 - deg;
        deg = deg >= 0 ? deg : 360 + deg;
        return deg;
      };
      /**
       * Request able through a method rather than an event.
       * At the moment of execution, requestStart is executed,
       * and then request and requestEnd can be executed through Requester.
       * @method Moveable#request
       * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Draggable.html#request|Draggable Requester}
       * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Resizable.html#request|Resizable Requester}
       * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Scalable.html#request|Scalable Requester}
       * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.Rotatable.html#request|Rotatable Requester}
       * @see {@link https://daybrush.com/moveable/release/latest/doc/Moveable.OriginDraggable.html#request|OriginDraggable Requester}
       * @param - ableName
       * @param - request to be able params.
       * @param - If isInstant is true, request and requestEnd are executed immediately.
       * @return - Able Requester. If there is no request in able, nothing will work.
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * // Instantly Request (requestStart - request - requestEnd)
       * moveable.request("draggable", { deltaX: 10, deltaY: 10 }, true);
       *
       * // Start move
       * const requester = moveable.request("draggable");
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.request({ deltaX: 10, deltaY: 10 });
       * requester.requestEnd();
       */


      __proto.request = function (ableName, param, isInstant) {
        if (param === void 0) {
          param = {};
        }

        var _a = this.props,
            ables = _a.ables,
            groupable = _a.groupable;
        var requsetAble = ables.filter(function (able) {
          return able.name === ableName;
        })[0];

        if (this.isDragging() || !requsetAble || !requsetAble.request) {
          return {
            request: function () {
              return this;
            },
            requestEnd: function () {
              return this;
            }
          };
        }

        var self = this;
        var ableRequester = requsetAble.request(this);
        var requestInstant = isInstant || param.isInstant;
        var ableType = ableRequester.isControl ? "controlAbles" : "targetAbles";
        var eventAffix = "" + (groupable ? "Group" : "") + (ableRequester.isControl ? "Control" : "");
        var requester = {
          request: function (ableParam) {
            triggerAble(self, ableType, "drag", eventAffix, "", __assign$4(__assign$4({}, ableRequester.request(ableParam)), {
              requestAble: ableName,
              isRequest: true
            }), requestInstant);
            return this;
          },
          requestEnd: function () {
            triggerAble(self, ableType, "drag", eventAffix, "End", __assign$4(__assign$4({}, ableRequester.requestEnd()), {
              requestAble: ableName,
              isRequest: true
            }), requestInstant);
            return this;
          }
        };
        triggerAble(self, ableType, "drag", eventAffix, "Start", __assign$4(__assign$4({}, ableRequester.requestStart(param)), {
          requestAble: ableName,
          isRequest: true
        }), requestInstant);
        return requestInstant ? requester.request(param).requestEnd() : requester;
      };
      /**
       * Remove the Moveable object and the events.
       * @method Moveable#destroy
       * @example
       * import Moveable from "moveable";
       *
       * const moveable = new Moveable(document.body);
       *
       * moveable.destroy();
       */


      __proto.destroy = function () {
        this.componentWillUnmount();
      };

      __proto.updateRenderPoses = function () {
        var state = this.state;
        var props = this.props;
        var beforeOrigin = state.beforeOrigin,
            transformOrigin = state.transformOrigin,
            allMatrix = state.allMatrix,
            is3d = state.is3d,
            pos1 = state.pos1,
            pos2 = state.pos2,
            pos3 = state.pos3,
            pos4 = state.pos4,
            stateLeft = state.left,
            stateTop = state.top;

        var _a = props.padding || {},
            _b = _a.left,
            left = _b === void 0 ? 0 : _b,
            _c = _a.top,
            top = _c === void 0 ? 0 : _c,
            _d = _a.bottom,
            bottom = _d === void 0 ? 0 : _d,
            _e = _a.right,
            right = _e === void 0 ? 0 : _e;

        var n = is3d ? 4 : 3;
        var absoluteOrigin = props.groupable ? beforeOrigin : plus(beforeOrigin, [stateLeft, stateTop]);
        state.renderPoses = [plus(pos1, caculatePadding(allMatrix, [-left, -top], transformOrigin, absoluteOrigin, n)), plus(pos2, caculatePadding(allMatrix, [right, -top], transformOrigin, absoluteOrigin, n)), plus(pos3, caculatePadding(allMatrix, [-left, bottom], transformOrigin, absoluteOrigin, n)), plus(pos4, caculatePadding(allMatrix, [right, bottom], transformOrigin, absoluteOrigin, n))];
      };

      __proto.checkUpdate = function () {
        var _a = this.props,
            target = _a.target,
            container = _a.container,
            parentMoveable = _a.parentMoveable;
        var _b = this.state,
            stateTarget = _b.target,
            stateContainer = _b.container;

        if (!stateTarget && !target) {
          return;
        }

        this.updateAbles();
        var isChanged = !equals$1(stateTarget, target) || !equals$1(stateContainer, container);

        if (!isChanged) {
          return;
        }

        this.updateState({
          target: target,
          container: container
        });

        if (!parentMoveable && (container || this.controlBox)) {
          this.updateRect("End", false, false);
        }
      };

      __proto.triggerEvent = function (name, e) {
        var callback = this.props[name];
        return callback && callback(e);
      };

      __proto.unsetAbles = function () {
        var _this = this;

        if (this.targetAbles.filter(function (able) {
          if (able.unset) {
            able.unset(_this);
            return true;
          }

          return false;
        }).length) {
          this.forceUpdate();
        }
      };

      __proto.updateAbles = function (ables, eventAffix) {
        if (ables === void 0) {
          ables = this.props.ables;
        }

        if (eventAffix === void 0) {
          eventAffix = "";
        }

        var props = this.props;
        var triggerAblesSimultaneously = props.triggerAblesSimultaneously;
        var enabledAbles = ables.filter(function (able) {
          return able && (able.always || props[able.name]);
        });
        var dragStart = "drag" + eventAffix + "Start";
        var pinchStart = "pinch" + eventAffix + "Start";
        var dragControlStart = "drag" + eventAffix + "ControlStart";
        var targetAbles = filterAbles(enabledAbles, [dragStart, pinchStart], triggerAblesSimultaneously);
        var controlAbles = filterAbles(enabledAbles, [dragControlStart], triggerAblesSimultaneously);
        this.targetAbles = targetAbles;
        this.controlAbles = controlAbles;
      };

      __proto.updateState = function (nextState, isSetState) {
        if (isSetState) {
          this.setState(nextState);
        } else {
          var state = this.state;

          for (var name in nextState) {
            state[name] = nextState[name];
          }
        }
      };

      __proto.getEnabledAbles = function () {
        var props = this.props;
        var ables = props.ables;
        return ables.filter(function (able) {
          return able && props[able.name];
        });
      };

      __proto.renderAbles = function () {
        var _this = this;

        var props = this.props;
        var triggerAblesSimultaneously = props.triggerAblesSimultaneously;
        var Renderer = {
          createElement: createElement
        };
        return groupByMap(flat$1(filterAbles(this.getEnabledAbles(), ["render"], triggerAblesSimultaneously).map(function (_a) {
          var render = _a.render;
          return render(_this, Renderer) || [];
        })).filter(function (el) {
          return el;
        }), function (_a) {
          var key = _a.key;
          return key;
        }).map(function (group) {
          return group[0];
        });
      };

      __proto.updateCheckInput = function () {
        this.targetGesto && (this.targetGesto.options.checkInput = this.props.checkInput);
      };

      MoveableManager.defaultProps = {
        target: null,
        dragTarget: null,
        container: null,
        rootContainer: null,
        origin: true,
        edge: false,
        parentMoveable: null,
        parentPosition: null,
        ables: [],
        pinchThreshold: 20,
        dragArea: false,
        passDragArea: false,
        transformOrigin: "",
        className: "",
        zoom: 1,
        triggerAblesSimultaneously: false,
        padding: {},
        pinchOutside: true,
        checkInput: false,
        groupable: false,
        cspNonce: "",
        translateZ: 50,
        cssStyled: null
      };
      return MoveableManager;
    }(PureComponent);
    /**
     * The target to indicate Moveable Control Box.
     * @name Moveable#target
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.target = document.querySelector(".target");
     */

    /**
     * Zooms in the elements of a moveable. (default: 1)
     * @name Moveable#zoom
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.zoom = 2;
     */

    /**
     * Resize, Scale Events at edges
     * @name Moveable#edge
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.edge = true;
     */

    /**
     * You can specify the className of the moveable controlbox. (default: "")
     * @name Moveable#className
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *   className: "",
     * });
     *
     * moveable.className = "moveable1";
     */

    /**
     * The target(s) to drag Moveable target(s) (default: target)
     * @name Moveable#dragTarget
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body);
     * moveable.target = document.querySelector(".target");
     * moveable.dragTarget = document.querySelector(".dragTarget");
     */

    /**
     * `renderStart` event occurs at the first start of all events.
     * @memberof Moveable
     * @event renderStart
     * @param {Moveable.OnRenderStart} - Parameters for the `renderStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("renderStart", ({ target }) => {
     *     console.log("onRenderStart", target);
     * });
     */

    /**
     * `render` event occurs before the target is drawn on the screen.
     * @memberof Moveable
     * @event render
     * @param {Moveable.OnRender} - Parameters for the `render` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("render", ({ target }) => {
     *     console.log("onRender", target);
     * });
     */

    /**
     * `renderEnd` event occurs at the end of all events.
     * @memberof Moveable
     * @event renderEnd
     * @param {Moveable.OnRenderEnd} - Parameters for the `renderEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("renderEnd", ({ target }) => {
     *     console.log("onRenderEnd", target);
     * });
     */

    /**
     * `renderGroupStart` event occurs at the first start of all events in group.
     * @memberof Moveable
     * @event renderGroupStart
     * @param {Moveable.OnRenderGroupStart} - Parameters for the `renderGroupStart` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroupStart", ({ targets }) => {
     *     console.log("onRenderGroupStart", targets);
     * });
     */

    /**
     * `renderGroup` event occurs before the target is drawn on the screen in group.
     * @memberof Moveable
     * @event renderGroup
     * @param {Moveable.OnRenderGroup} - Parameters for the `renderGroup` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroup", ({ targets }) => {
     *     console.log("onRenderGroup", targets);
     * });
     */

    /**
     * `renderGroupEnd` event occurs at the end of all events in group.
     * @memberof Moveable
     * @event renderGroupEnd
     * @param {Moveable.OnRenderGroupEnd} - Parameters for the `renderGroupEnd` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("renderGroupEnd", ({ targets }) => {
     *     console.log("onRenderGroupEnd", targets);
     * });
     */

    var Groupable = {
      name: "groupable",
      props: {
        defaultGroupRotate: Number,
        defaultGroupOrigin: String,
        groupable: Boolean
      },
      events: {},
      render: function (moveable, React) {
        var targets = moveable.props.targets || [];
        moveable.moveables = [];
        var _a = moveable.state,
            left = _a.left,
            top = _a.top;
        var position = {
          left: left,
          top: top
        };
        return targets.map(function (target, i) {
          return React.createElement(MoveableManager, {
            key: "moveable" + i,
            ref: refs(moveable, "moveables", i),
            target: target,
            origin: false,
            cssStyled: moveable.props.cssStyled,
            parentMoveable: moveable,
            parentPosition: position
          });
        });
      }
    };

    var Clickable = {
      name: "clickable",
      props: {},
      events: {
        onClick: "click",
        onClickGroup: "clickGroup"
      },
      always: true,
      dragStart: function () {},
      dragGroupStart: function (moveable, e) {
        e.datas.inputTarget = e.inputEvent && e.inputEvent.target;
      },
      dragEnd: function (moveable, e) {
        var target = moveable.state.target;
        var inputEvent = e.inputEvent;
        var inputTarget = e.inputTarget;

        if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) // External event duplicate target or dragAreaElement
        ) {
            return;
          }

        var containsTarget = target.contains(inputTarget);
        triggerEvent(moveable, "onClick", fillParams(moveable, e, {
          isDouble: e.isDouble,
          inputTarget: inputTarget,
          isTarget: target === inputTarget,
          containsTarget: containsTarget
        }));
      },
      dragGroupEnd: function (moveable, e) {
        var inputEvent = e.inputEvent;
        var inputTarget = e.inputTarget;

        if (!inputEvent || !inputTarget || e.isDrag || moveable.isMoveableElement(inputTarget) // External event duplicate target or dragAreaElement
        || e.datas.inputTarget === inputTarget) {
          return;
        }

        var targets = moveable.props.targets;
        var targetIndex = targets.indexOf(inputTarget);
        var isTarget = targetIndex > -1;
        var containsTarget = false;

        if (targetIndex === -1) {
          targetIndex = findIndex(targets, function (parentTarget) {
            return parentTarget.contains(inputTarget);
          });
          containsTarget = targetIndex > -1;
        }

        triggerEvent(moveable, "onClickGroup", fillParams(moveable, e, {
          isDouble: e.isDouble,
          targets: targets,
          inputTarget: inputTarget,
          targetIndex: targetIndex,
          isTarget: isTarget,
          containsTarget: containsTarget
        }));
      }
    };
    /**
     * When you click on the element, the `click` event is called.
     * @memberof Moveable
     * @event click
     * @param {Moveable.OnClick} - Parameters for the `click` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: document.querySelector(".target"),
     * });
     * moveable.on("click", ({ hasTarget, containsTarget, targetIndex }) => {
     *     // If you click on an element other than the target and not included in the target, index is -1.
     *     console.log("onClickGroup", target, hasTarget, containsTarget, targetIndex);
     * });
     */

    /**
     * When you click on the element inside the group, the `clickGroup` event is called.
     * @memberof Moveable
     * @event clickGroup
     * @param {Moveable.OnClickGroup} - Parameters for the `clickGroup` event
     * @example
     * import Moveable from "moveable";
     *
     * const moveable = new Moveable(document.body, {
     *     target: [].slice.call(document.querySelectorAll(".target")),
     * });
     * moveable.on("clickGroup", ({ inputTarget, isTarget, containsTarget, targetIndex }) => {
     *     // If you click on an element other than the target and not included in the target, index is -1.
     *     console.log("onClickGroup", inputTarget, isTarget, containsTarget, targetIndex);
     * });
     */

    var MOVEABLE_ABLES = /*#__PURE__*/[BeforeRenderable, Default, Snappable, Pinchable, Draggable, Rotatable, Resizable, Scalable, Warpable, Scrollable, Padding, Origin, OriginDraggable, Clippable, Roundable, Groupable, Clickable, DragArea, Renderable];
    var MOVEABLE_EVENTS_PROPS_MAP = /*#__PURE__*/MOVEABLE_ABLES.reduce(function (current, able) {
      return __assign$4(__assign$4({}, current), able.events);
    }, {});
    var MOVEABLE_PROPS_MAP = /*#__PURE__*/MOVEABLE_ABLES.reduce(function (current, able) {
      return __assign$4(__assign$4({}, current), able.props);
    }, {});
    var MOVEABLE_EVENTS_MAP = /*#__PURE__*/invertObject(MOVEABLE_EVENTS_PROPS_MAP);
    var MOVEABLE_EVENTS = Object.keys(MOVEABLE_EVENTS_MAP);
    var MOVEABLE_PROPS = Object.keys(MOVEABLE_PROPS_MAP);

    function getMaxPos(poses, index) {
      return Math.max.apply(Math, poses.map(function (_a) {
        var pos1 = _a[0],
            pos2 = _a[1],
            pos3 = _a[2],
            pos4 = _a[3];
        return Math.max(pos1[index], pos2[index], pos3[index], pos4[index]);
      }));
    }

    function getMinPos(poses, index) {
      return Math.min.apply(Math, poses.map(function (_a) {
        var pos1 = _a[0],
            pos2 = _a[1],
            pos3 = _a[2],
            pos4 = _a[3];
        return Math.min(pos1[index], pos2[index], pos3[index], pos4[index]);
      }));
    }

    function getGroupRect(moveables, rotation) {
      if (!moveables.length) {
        return [0, 0, 0, 0];
      }

      var moveablePoses = moveables.map(function (_a) {
        var state = _a.state;
        return getAbsolutePosesByState(state);
      });
      var minX = MAX_NUM;
      var minY = MAX_NUM;
      var groupWidth = 0;
      var groupHeight = 0;
      var fixedRotation = throttle(rotation, TINY_NUM);

      if (fixedRotation % 90) {
        var rad_1 = rotation / 180 * Math.PI;
        var a1_1 = Math.tan(rad_1);
        var a2_1 = -1 / a1_1;
        var b1s_1 = [MIN_NUM, MAX_NUM];
        var b2s_1 = [MIN_NUM, MAX_NUM];
        moveablePoses.forEach(function (poses) {
          poses.forEach(function (pos) {
            // ax + b = y
            // ㅠ = y - ax
            var b1 = pos[1] - a1_1 * pos[0];
            var b2 = pos[1] - a2_1 * pos[0];
            b1s_1[0] = Math.max(b1s_1[0], b1);
            b1s_1[1] = Math.min(b1s_1[1], b1);
            b2s_1[0] = Math.max(b2s_1[0], b2);
            b2s_1[1] = Math.min(b2s_1[1], b2);
          });
        });
        b1s_1.forEach(function (b1) {
          // a1x + b1 = a2x + b2
          b2s_1.forEach(function (b2) {
            // (a1 - a2)x = b2 - b1
            var x = (b2 - b1) / (a1_1 - a2_1);
            var y = a1_1 * x + b1;
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
          });
        });
        var rotatePoses = moveablePoses.map(function (_a) {
          var pos1 = _a[0],
              pos2 = _a[1],
              pos3 = _a[2],
              pos4 = _a[3];
          return [rotate$1(pos1, -rad_1), rotate$1(pos2, -rad_1), rotate$1(pos3, -rad_1), rotate$1(pos4, -rad_1)];
        });
        groupWidth = getMaxPos(rotatePoses, 0) - getMinPos(rotatePoses, 0);
        groupHeight = getMaxPos(rotatePoses, 1) - getMinPos(rotatePoses, 1);
      } else {
        minX = getMinPos(moveablePoses, 0);
        minY = getMinPos(moveablePoses, 1);
        groupWidth = getMaxPos(moveablePoses, 0) - minX;
        groupHeight = getMaxPos(moveablePoses, 1) - minY;

        if (fixedRotation % 180) {
          var changedWidth = groupWidth;
          groupWidth = groupHeight;
          groupHeight = changedWidth;
        }
      }

      return [minX, minY, groupWidth, groupHeight];
    }
    /**
     * @namespace Moveable.Group
     * @description You can make targets moveable.
     */


    var MoveableGroup =
    /*#__PURE__*/
    function (_super) {
      __extends$6(MoveableGroup, _super);

      function MoveableGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.differ = new ChildrenDiffer();
        _this.moveables = [];
        _this.transformOrigin = "50% 50%";
        return _this;
      }

      var __proto = MoveableGroup.prototype;

      __proto.updateEvent = function (prevProps) {
        var state = this.state;
        var props = this.props;

        if (!state.target) {
          state.target = this.areaElement;
          this.controlBox.getElement().style.display = "block";
          this.targetGesto = getTargetAbleGesto(this, state.target, "Group");
          this.controlGesto = getAbleGesto(this, this.controlBox.getElement(), "controlAbles", "GroupControl");
        }

        var isContainerChanged = !equals$1(prevProps.container, props.container);

        if (isContainerChanged) {
          state.container = props.container;
        }

        var _a = this.differ.update(props.targets),
            added = _a.added,
            changed = _a.changed,
            removed = _a.removed;

        if (isContainerChanged || added.length || changed.length || removed.length) {
          this.updateRect();
        }
      };

      __proto.checkUpdate = function () {
        this.updateAbles();
      };

      __proto.updateRect = function (type, isTarget, isSetState) {
        var _a;

        if (isSetState === void 0) {
          isSetState = true;
        }

        if (!this.controlBox) {
          return;
        }

        this.moveables.forEach(function (moveable) {
          moveable.updateRect(type, false, false);
        });
        var state = this.state;
        var props = this.props;
        var target = state.target || props.target;

        if (!isTarget || type !== "" && props.updateGroup) {
          // reset rotataion
          this.rotation = props.defaultGroupRotate;
          this.transformOrigin = props.defaultGroupOrigin || "50% 50%";
          this.scale = [1, 1];
        }

        var rotation = this.rotation;
        var scale = this.scale;

        var _b = getGroupRect(this.moveables, rotation),
            left = _b[0],
            top = _b[1],
            width = _b[2],
            height = _b[3]; // tslint:disable-next-line: max-line-length


        target.style.cssText += "left:0px;top:0px; transform-origin: " + this.transformOrigin + "; width:" + width + "px; height:" + height + "px;transform:rotate(" + rotation + "deg)" + (" scale(" + (scale[0] >= 0 ? 1 : -1) + ", " + (scale[1] >= 0 ? 1 : -1) + ")");
        state.width = width;
        state.height = height;
        var container = this.getContainer();
        var info = getTargetInfo(this.controlBox.getElement(), target, this.controlBox.getElement(), this.getContainer(), this.props.rootContainer || container, state);
        var pos = [info.left, info.top];
        _a = getAbsolutePosesByState(info), info.pos1 = _a[0], info.pos2 = _a[1], info.pos3 = _a[2], info.pos4 = _a[3];
        info.origin = plus(pos, info.origin);
        info.beforeOrigin = plus(pos, info.beforeOrigin);
        var clientRect = info.targetClientRect;
        clientRect.top += top - info.top - state.top;
        clientRect.left += left - info.left - state.left;
        var direction = scale[0] * scale[1] > 0 ? 1 : -1;
        this.updateState(__assign$4(__assign$4({}, info), {
          direction: direction,
          beforeDirection: direction,
          left: left - info.left,
          top: top - info.top
        }), isSetState);
      };

      __proto.getRect = function () {
        return __assign$4(__assign$4({}, _super.prototype.getRect.call(this)), {
          children: this.moveables.map(function (child) {
            return child.getRect();
          })
        });
      };

      __proto.triggerEvent = function (name, e, isManager) {
        if (isManager || name.indexOf("Group") > -1) {
          return _super.prototype.triggerEvent.call(this, name, e);
        }
      };

      __proto.updateAbles = function () {
        _super.prototype.updateAbles.call(this, __spreadArrays$1(this.props.ables, [Groupable]), "Group");
      };

      MoveableGroup.defaultProps = __assign$4(__assign$4({}, MoveableManager.defaultProps), {
        transformOrigin: ["50%", "50%"],
        groupable: true,
        dragArea: true,
        keepRatio: true,
        targets: [],
        defaultGroupRotate: 0,
        defaultGroupOrigin: "50% 50%"
      });
      return MoveableGroup;
    }(MoveableManager);

    var InitialMoveable =
    /*#__PURE__*/
    function (_super) {
      __extends$6(InitialMoveable, _super);

      function InitialMoveable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.refTargets = [];
        _this.selectorMap = {};
        return _this;
      }

      var __proto = InitialMoveable.prototype;

      InitialMoveable.makeStyled = function () {
        var cssMap = {};
        var ables = this.getTotalAbles();
        ables.forEach(function (_a) {
          var css = _a.css;

          if (!css) {
            return;
          }

          css.forEach(function (text) {
            cssMap[text] = true;
          });
        });
        var style = getKeys(cssMap).join("\n");
        this.defaultStyled = styled$1("div", prefixCSS(PREFIX, MOVEABLE_CSS + style));
      };

      InitialMoveable.getTotalAbles = function () {
        return __spreadArrays$1([Default, Groupable, DragArea], this.defaultAbles);
      };

      __proto.render = function () {
        var moveableContructor = this.constructor;

        if (!moveableContructor.defaultStyled) {
          moveableContructor.makeStyled();
        }

        var refTargets = getRefTargets(this.props.target || this.props.targets);
        var elementTargets = getElementTargets(refTargets, this.selectorMap);
        this.refTargets = refTargets;
        var isGroup = elementTargets.length > 1;
        var totalAbles = moveableContructor.getTotalAbles();
        var userAbles = this.props.ables || [];

        var ables = __spreadArrays$1(totalAbles, userAbles);

        if (isGroup) {
          return createElement(MoveableGroup, __assign$4({
            key: "group",
            ref: ref(this, "moveable"),
            cssStyled: moveableContructor.defaultStyled
          }, this.props, {
            target: null,
            targets: elementTargets,
            ables: ables
          }));
        } else {
          return createElement(MoveableManager, __assign$4({
            key: "single",
            ref: ref(this, "moveable"),
            cssStyled: moveableContructor.defaultStyled
          }, this.props, {
            target: elementTargets[0],
            ables: ables
          }));
        }
      };

      __proto.componentDidMount = function () {
        this.updateRefs();
      };

      __proto.componentDidUpdate = function () {
        this.updateRefs();
      };

      __proto.updateRefs = function (isReset) {
        var refTargets = getRefTargets(this.props.target || this.props.targets);
        var isUpdate = this.refTargets.some(function (target, i) {
          var nextTarget = refTargets[i];

          if (!target && !nextTarget) {
            return false;
          } else if (target !== nextTarget) {
            return true;
          }

          return false;
        });
        var selectorMap = isReset ? {} : this.selectorMap;
        var nextSelectorMap = {};
        this.refTargets.forEach(function (target) {
          if (isString$1(target)) {
            if (!selectorMap[target]) {
              isUpdate = true;
              nextSelectorMap[target] = [].slice.call(document.querySelectorAll(target));
            } else {
              nextSelectorMap[target] = selectorMap[target];
            }
          }
        });
        this.selectorMap = nextSelectorMap;

        if (isUpdate) {
          this.forceUpdate();
        }
      };

      InitialMoveable.defaultAbles = [];
      InitialMoveable.defaultStyled = null;

      __decorate$1([withMethods(MOVEABLE_METHODS)], InitialMoveable.prototype, "moveable", void 0);

      return InitialMoveable;
    }(PureComponent);

    var Moveable =
    /*#__PURE__*/
    function (_super) {
      __extends$6(Moveable, _super);

      function Moveable() {
        return _super !== null && _super.apply(this, arguments) || this;
      }

      Moveable.defaultAbles = MOVEABLE_ABLES;
      return Moveable;
    }(InitialMoveable);

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
        return createPortal(createElement(Moveable, __assign({
          ref: ref(this, "moveable")
        }, this.state)), this.state.parentElement);
      };

      return InnerMoveable;
    }(Component$1);

    var PROPERTIES = MOVEABLE_PROPS;
    var METHODS = MOVEABLE_METHODS;
    var EVENTS = MOVEABLE_EVENTS;

    /**
     * Moveable is Draggable! Resizable! Scalable! Rotatable!
     * @sort 1
     * @extends eg.Component
     */

    var Moveable$1 =
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
          events[camelize("on " + name)] = function (e) {
            return _this.trigger(name, e);
          };
        });
        render(createElement(InnerMoveable, __assign({
          ref: ref(_this, "innerMoveable"),
          parentElement: parentElement
        }, nextOptions, events)), _this.tempElement);
        var target = nextOptions.target;

        if (isArray$3(target) && target.length > 1) {
          _this.updateRect();
        }

        return _this;
      }

      var __proto = Moveable.prototype;

      __proto.setState = function (state, callback) {
        this.innerMoveable.setState(state, callback);
      };

      __proto.destroy = function () {
        render(null, this.tempElement);
        this.off();
        this.tempElement = null;
        this.innerMoveable = null;
      };

      __proto.getMoveable = function () {
        return this.innerMoveable.moveable;
      };

      Moveable = __decorate([Properties(METHODS, function (prototype, property) {
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
      }), Properties(PROPERTIES, function (prototype, property) {
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
    }(Component);

    function getElementInfo$1(target, container, rootContainer) {
      return getElementInfo(target, container, rootContainer);
    }



    var modules = {
        __proto__: null,
        'default': Moveable$1,
        PROPERTIES: PROPERTIES,
        METHODS: METHODS,
        EVENTS: EVENTS,
        getElementInfo: getElementInfo$1
    };

    for (var name in modules) {
      Moveable$1[name] = modules[name];
    }

    return Moveable$1;

})));
//# sourceMappingURL=moveable.js.map
