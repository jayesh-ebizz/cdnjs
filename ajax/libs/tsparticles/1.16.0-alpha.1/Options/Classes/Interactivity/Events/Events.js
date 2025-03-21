"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
var ClickEvent_1 = require("./ClickEvent");
var DivEvent_1 = require("./DivEvent");
var HoverEvent_1 = require("./HoverEvent");
var Events = (function () {
    function Events() {
        this.onClick = new ClickEvent_1.ClickEvent();
        this.onDiv = new DivEvent_1.DivEvent();
        this.onHover = new HoverEvent_1.HoverEvent();
        this.resize = true;
    }
    Object.defineProperty(Events.prototype, "onclick", {
        get: function () {
            return this.onClick;
        },
        set: function (value) {
            this.onClick = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Events.prototype, "ondiv", {
        get: function () {
            return this.onDiv;
        },
        set: function (value) {
            this.onDiv = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Events.prototype, "onhover", {
        get: function () {
            return this.onHover;
        },
        set: function (value) {
            this.onHover = value;
        },
        enumerable: false,
        configurable: true
    });
    Events.prototype.load = function (data) {
        var _a, _b, _c;
        if (data !== undefined) {
            this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
            var onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
            if (onDiv !== undefined) {
                if (onDiv instanceof Array) {
                    this.onDiv = onDiv.map(function (div) {
                        var tmp = new DivEvent_1.DivEvent();
                        tmp.load(div);
                        return tmp;
                    });
                }
                else {
                    this.onDiv = new DivEvent_1.DivEvent();
                    this.onDiv.load(onDiv);
                }
            }
            this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
            if (data.resize !== undefined) {
                this.resize = data.resize;
            }
        }
    };
    return Events;
}());
exports.Events = Events;
