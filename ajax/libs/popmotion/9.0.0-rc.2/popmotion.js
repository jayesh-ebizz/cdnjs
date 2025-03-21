(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.popmotion = {}));
}(this, (function (exports) { 'use strict';

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

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var SpringAnimator = (function () {
        function SpringAnimator(options) {
            this.isComplete = false;
            this.updateOptions(options);
            this.createSpring();
        }
        SpringAnimator.prototype.createSpring = function () {
            var _a = this.options, velocity = _a.velocity, from = _a.from, to = _a.to, damping = _a.damping, stiffness = _a.stiffness, mass = _a.mass;
            var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
            var initialDelta = to - from;
            var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
            var angularFreq = Math.sqrt(stiffness / mass) / 1000;
            if (dampingRatio < 1) {
                this.resolveSpring = function (t) {
                    var envelope = Math.exp(-dampingRatio * angularFreq * t);
                    var expoDecay = angularFreq * Math.sqrt(1.0 - dampingRatio * dampingRatio);
                    return (to -
                        envelope *
                            (((initialVelocity +
                                dampingRatio * angularFreq * initialDelta) /
                                expoDecay) *
                                Math.sin(expoDecay * t) +
                                initialDelta * Math.cos(expoDecay * t)));
                };
            }
            else if (dampingRatio === 1) {
                this.resolveSpring = function (t) {
                    var envelope = Math.exp(-angularFreq * t);
                    return to - envelope * (1 + angularFreq * t);
                };
            }
            else {
                var dampedAngularFreq_1 = angularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
                this.resolveSpring = function (t) {
                    var envelope = Math.exp(-dampingRatio * angularFreq * t);
                    return (to -
                        (envelope *
                            ((initialVelocity +
                                dampingRatio * angularFreq * initialDelta) *
                                Math.sinh(dampedAngularFreq_1 * t) +
                                dampedAngularFreq_1 *
                                    initialDelta *
                                    Math.cosh(dampedAngularFreq_1 * t))) /
                            dampedAngularFreq_1);
                };
            }
        };
        SpringAnimator.prototype.update = function (t) {
            var latest = this.resolveSpring(t);
            var _a = this.options, velocity = _a.velocity, restSpeed = _a.restSpeed, restDelta = _a.restDelta, to = _a.to;
            var isBelowVelocityThreshold = Math.abs(velocity) <= restSpeed;
            var isBelowDisplacementThreshold = Math.abs(to - latest) <= restDelta;
            this.isComplete =
                isBelowVelocityThreshold && isBelowDisplacementThreshold;
            return this.isComplete ? to : latest;
        };
        SpringAnimator.prototype.updateOptions = function (_a) {
            var _b = _a.from, from = _b === void 0 ? 0.0 : _b, _c = _a.to, to = _c === void 0 ? 0.0 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0.0 : _d, _e = _a.stiffness, stiffness = _e === void 0 ? 100 : _e, _f = _a.damping, damping = _f === void 0 ? 10 : _f, _g = _a.mass, mass = _g === void 0 ? 1.0 : _g, _h = _a.restSpeed, restSpeed = _h === void 0 ? 0.005 : _h, _j = _a.restDelta, restDelta = _j === void 0 ? 0.5 : _j;
            this.options = {
                from: from,
                to: to,
                velocity: velocity,
                stiffness: stiffness,
                damping: damping,
                mass: mass,
                restSpeed: restSpeed,
                restDelta: restDelta,
            };
        };
        SpringAnimator.prototype.flipTarget = function () {
            var _a = this.options, from = _a.from, to = _a.to, velocity = _a.velocity;
            this.options.velocity = -velocity;
            this.options.from = to;
            this.options.to = from;
            this.createSpring();
        };
        SpringAnimator.needsInterpolation = function (from, to) {
            return typeof from === "string" || typeof to === "string";
        };
        SpringAnimator.uniqueOptionKeys = new Set([
            "velocity",
            "stiffness",
            "damping",
            "mass",
            "restSpeed",
            "restDelta",
        ]);
        return SpringAnimator;
    }());

    var progress = function (from, to, value) {
        var toFromDifference = to - from;
        return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };

    var mix = function (from, to, progress) {
        return -progress * from + progress * to + from;
    };

    var clamp = function (min, max) { return function (v) {
        return Math.max(Math.min(v, max), min);
    }; };
    var sanitize = function (v) { return (v % 1 ? Number(v.toFixed(5)) : v); };
    var floatRegex = /(-)?(\d[\d\.]*)/g;
    var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
    var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;

    var number = {
        test: function (v) { return typeof v === 'number'; },
        parse: parseFloat,
        transform: function (v) { return v; }
    };
    var alpha = __assign(__assign({}, number), { transform: clamp(0, 1) });
    var scale = __assign(__assign({}, number), { default: 1 });

    var createUnitType = function (unit) { return ({
        test: function (v) {
            return typeof v === 'string' && v.endsWith(unit) && v.split(' ').length === 1;
        },
        parse: parseFloat,
        transform: function (v) { return "" + v + unit; }
    }); };
    var percent = createUnitType('%');
    var progressPercentage = __assign(__assign({}, percent), { parse: function (v) { return percent.parse(v) / 100; }, transform: function (v) { return percent.transform(v * 100); } });

    var getValueFromFunctionString = function (value) {
        return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
    };
    var clampRgbUnit = clamp(0, 255);
    var isRgba = function (v) { return v.red !== undefined; };
    var isHsla = function (v) { return v.hue !== undefined; };
    function getValuesAsArray(value) {
        return getValueFromFunctionString(value)
            .replace(/(,|\/)/g, ' ')
            .split(/ \s*/);
    }
    var splitColorValues = function (terms) {
        return function (v) {
            if (typeof v !== 'string')
                return v;
            var values = {};
            var valuesArray = getValuesAsArray(v);
            for (var i = 0; i < 4; i++) {
                values[terms[i]] =
                    valuesArray[i] !== undefined ? parseFloat(valuesArray[i]) : 1;
            }
            return values;
        };
    };
    var rgbaTemplate = function (_a) {
        var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
        return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    };
    var hslaTemplate = function (_a) {
        var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha = _b === void 0 ? 1 : _b;
        return "hsla(" + hue + ", " + saturation + ", " + lightness + ", " + alpha + ")";
    };
    var rgbUnit = __assign(__assign({}, number), { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
    function isColorString(color, colorType) {
        return color.startsWith(colorType) && singleColorRegex.test(color);
    }
    var rgba = {
        test: function (v) { return (typeof v === 'string' ? isColorString(v, 'rgb') : isRgba(v)); },
        parse: splitColorValues(['red', 'green', 'blue', 'alpha']),
        transform: function (_a) {
            var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
            return rgbaTemplate({
                red: rgbUnit.transform(red),
                green: rgbUnit.transform(green),
                blue: rgbUnit.transform(blue),
                alpha: sanitize(alpha.transform(alpha$1))
            });
        }
    };
    var hsla = {
        test: function (v) { return (typeof v === 'string' ? isColorString(v, 'hsl') : isHsla(v)); },
        parse: splitColorValues(['hue', 'saturation', 'lightness', 'alpha']),
        transform: function (_a) {
            var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
            return hslaTemplate({
                hue: Math.round(hue),
                saturation: percent.transform(sanitize(saturation)),
                lightness: percent.transform(sanitize(lightness)),
                alpha: sanitize(alpha.transform(alpha$1))
            });
        }
    };
    var hex = __assign(__assign({}, rgba), { test: function (v) { return typeof v === 'string' && isColorString(v, '#'); }, parse: function (v) {
            var r = '';
            var g = '';
            var b = '';
            if (v.length > 4) {
                r = v.substr(1, 2);
                g = v.substr(3, 2);
                b = v.substr(5, 2);
            }
            else {
                r = v.substr(1, 1);
                g = v.substr(2, 1);
                b = v.substr(3, 1);
                r += r;
                g += g;
                b += b;
            }
            return {
                red: parseInt(r, 16),
                green: parseInt(g, 16),
                blue: parseInt(b, 16),
                alpha: 1
            };
        } });
    var color = {
        test: function (v) {
            return (typeof v === 'string' && singleColorRegex.test(v)) ||
                isRgba(v) ||
                isHsla(v);
        },
        parse: function (v) {
            if (rgba.test(v)) {
                return rgba.parse(v);
            }
            else if (hsla.test(v)) {
                return hsla.parse(v);
            }
            else if (hex.test(v)) {
                return hex.parse(v);
            }
            return v;
        },
        transform: function (v) {
            if (isRgba(v)) {
                return rgba.transform(v);
            }
            else if (isHsla(v)) {
                return hsla.transform(v);
            }
            return v;
        }
    };

    var COLOR_TOKEN = '${c}';
    var NUMBER_TOKEN = '${n}';
    var convertNumbersToZero = function (v) {
        return typeof v === 'number' ? 0 : v;
    };
    var complex = {
        test: function (v) {
            if (typeof v !== 'string' || !isNaN(v))
                return false;
            var numValues = 0;
            var foundNumbers = v.match(floatRegex);
            var foundColors = v.match(colorRegex);
            if (foundNumbers)
                numValues += foundNumbers.length;
            if (foundColors)
                numValues += foundColors.length;
            return numValues > 0;
        },
        parse: function (v) {
            var input = v;
            var parsed = [];
            var foundColors = input.match(colorRegex);
            if (foundColors) {
                input = input.replace(colorRegex, COLOR_TOKEN);
                parsed.push.apply(parsed, foundColors.map(color.parse));
            }
            var foundNumbers = input.match(floatRegex);
            if (foundNumbers) {
                parsed.push.apply(parsed, foundNumbers.map(number.parse));
            }
            return parsed;
        },
        createTransformer: function (prop) {
            var template = prop;
            var token = 0;
            var foundColors = prop.match(colorRegex);
            var numColors = foundColors ? foundColors.length : 0;
            if (foundColors) {
                for (var i = 0; i < numColors; i++) {
                    template = template.replace(foundColors[i], COLOR_TOKEN);
                    token++;
                }
            }
            var foundNumbers = template.match(floatRegex);
            var numNumbers = foundNumbers ? foundNumbers.length : 0;
            if (foundNumbers) {
                for (var i = 0; i < numNumbers; i++) {
                    template = template.replace(foundNumbers[i], NUMBER_TOKEN);
                    token++;
                }
            }
            return function (v) {
                var output = template;
                for (var i = 0; i < token; i++) {
                    output = output.replace(i < numColors ? COLOR_TOKEN : NUMBER_TOKEN, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
                }
                return output;
            };
        },
        getAnimatableNone: function (target) {
            var parsedTarget = complex.parse(target);
            var targetTransformer = complex.createTransformer(target);
            return targetTransformer(parsedTarget.map(convertNumbersToZero));
        }
    };

    var invariant = function () { };
    {
        invariant = function (check, message) {
            if (!check) {
                throw new Error(message);
            }
        };
    }

    var mixLinearColor = function (from, to, v) {
        var fromExpo = from * from;
        var toExpo = to * to;
        return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
    };
    var colorTypes = [hex, rgba, hsla];
    var getColorType = function (v) {
        return colorTypes.find(function (type) { return type.test(v); });
    };
    var notAnimatable = function (color) {
        return "'" + color + "' is not an animatable color. Use the equivalent color code instead.";
    };
    var mixColor = function (from, to) {
        var fromColorType = getColorType(from);
        var toColorType = getColorType(to);
        invariant(!!fromColorType, notAnimatable(from));
        invariant(!!toColorType, notAnimatable(to));
        invariant(fromColorType.transform === toColorType.transform, 'Both colors must be hex/RGBA, OR both must be HSLA.');
        var fromColor = fromColorType.parse(from);
        var toColor = toColorType.parse(to);
        var blended = __assign({}, fromColor);
        var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
        return function (v) {
            for (var key in blended) {
                if (key !== 'alpha') {
                    blended[key] = mixFunc(fromColor[key], toColor[key], v);
                }
            }
            blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
            return fromColorType.transform(blended);
        };
    };

    var zeroPoint = {
        x: 0,
        y: 0,
        z: 0
    };
    var isNum = function (v) { return typeof v === 'number'; };

    var combineFunctions = function (a, b) { return function (v) { return b(a(v)); }; };
    var pipe = function () {
        var transformers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            transformers[_i] = arguments[_i];
        }
        return transformers.reduce(combineFunctions);
    };

    function getMixer(origin, target) {
        if (isNum(origin)) {
            return function (v) { return mix(origin, target, v); };
        }
        else if (color.test(origin)) {
            return mixColor(origin, target);
        }
        else {
            return mixComplex(origin, target);
        }
    }
    var mixArray = function (from, to) {
        var output = __spreadArrays(from);
        var numValues = output.length;
        var blendValue = from.map(function (fromThis, i) { return getMixer(fromThis, to[i]); });
        return function (v) {
            for (var i = 0; i < numValues; i++) {
                output[i] = blendValue[i](v);
            }
            return output;
        };
    };
    var mixObject = function (origin, target) {
        var output = __assign(__assign({}, origin), target);
        var blendValue = {};
        for (var key in output) {
            if (origin[key] !== undefined && target[key] !== undefined) {
                blendValue[key] = getMixer(origin[key], target[key]);
            }
        }
        return function (v) {
            for (var key in blendValue) {
                output[key] = blendValue[key](v);
            }
            return output;
        };
    };
    function analyse(value) {
        var parsed = complex.parse(value);
        var numValues = parsed.length;
        var numNumbers = 0;
        var numRGB = 0;
        var numHSL = 0;
        for (var i = 0; i < numValues; i++) {
            if (numNumbers || typeof parsed[i] === 'number') {
                numNumbers++;
            }
            else {
                if (parsed[i].hue !== undefined) {
                    numHSL++;
                }
                else {
                    numRGB++;
                }
            }
        }
        return { parsed: parsed, numNumbers: numNumbers, numRGB: numRGB, numHSL: numHSL };
    }
    var mixComplex = function (origin, target) {
        var template = complex.createTransformer(target);
        var originStats = analyse(origin);
        var targetStats = analyse(target);
        invariant(originStats.numHSL === targetStats.numHSL &&
            originStats.numRGB === targetStats.numRGB &&
            originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    };

    var clamp$1 = function (min, max, v) {
        return Math.min(Math.max(v, min), max);
    };

    var mixNumber = function (from, to) { return function (p) { return mix(from, to, p); }; };
    function detectMixerFactory(v) {
        if (typeof v === 'number') {
            return mixNumber;
        }
        else if (typeof v === 'string') {
            if (color.test(v)) {
                return mixColor;
            }
            else {
                return mixComplex;
            }
        }
        else if (Array.isArray(v)) {
            return mixArray;
        }
        else if (typeof v === 'object') {
            return mixObject;
        }
    }
    function createMixers(output, ease, customMixer) {
        var mixers = [];
        var mixerFactory = customMixer || detectMixerFactory(output[0]);
        var numMixers = output.length - 1;
        for (var i = 0; i < numMixers; i++) {
            var mixer = mixerFactory(output[i], output[i + 1]);
            if (ease) {
                var easingFunction = Array.isArray(ease) ? ease[i] : ease;
                mixer = pipe(easingFunction, mixer);
            }
            mixers.push(mixer);
        }
        return mixers;
    }
    function fastInterpolate(_a, _b) {
        var from = _a[0], to = _a[1];
        var mixer = _b[0];
        return function (v) { return mixer(progress(from, to, v)); };
    }
    function slowInterpolate(input, mixers) {
        var inputLength = input.length;
        var lastInputIndex = inputLength - 1;
        return function (v) {
            var mixerIndex = 0;
            var foundMixerIndex = false;
            if (v <= input[0]) {
                foundMixerIndex = true;
            }
            else if (v >= input[lastInputIndex]) {
                mixerIndex = lastInputIndex - 1;
                foundMixerIndex = true;
            }
            if (!foundMixerIndex) {
                var i = 1;
                for (; i < inputLength; i++) {
                    if (input[i] > v || i === lastInputIndex) {
                        break;
                    }
                }
                mixerIndex = i - 1;
            }
            var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
            return mixers[mixerIndex](progressInRange);
        };
    }
    function interpolate(input, output, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
        var inputLength = input.length;
        invariant(inputLength === output.length, 'Both input and output ranges must be the same length');
        invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
        if (input[0] > input[inputLength - 1]) {
            input = [].concat(input);
            output = [].concat(output);
            input.reverse();
            output.reverse();
        }
        var mixers = createMixers(output, ease, mixer);
        var interpolator = inputLength === 2
            ? fastInterpolate(input, mixers)
            : slowInterpolate(input, mixers);
        return isClamp
            ? function (v) { return interpolator(clamp$1(input[0], input[inputLength - 1], v)); }
            : interpolator;
    }

    var reverseEasing = function (easing) { return function (p) { return 1 - easing(1 - p); }; };
    var mirrorEasing = function (easing) { return function (p) {
        return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    }; };
    var createExpoIn = function (power) { return function (p) { return Math.pow(p, power); }; };
    var createBackIn = function (power) { return function (p) {
        return p * p * ((power + 1) * p - power);
    }; };
    var createAnticipate = function (power) {
        var backEasing = createBackIn(power);
        return function (p) {
            return (p *= 2) < 1
                ? 0.5 * backEasing(p)
                : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
        };
    };

    var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
    var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
    var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
    var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
    var linear = function (p) { return p; };
    var easeIn = createExpoIn(2);
    var easeOut = reverseEasing(easeIn);
    var easeInOut = mirrorEasing(easeIn);
    var circIn = function (p) { return 1 - Math.sin(Math.acos(p)); };
    var circOut = reverseEasing(circIn);
    var circInOut = mirrorEasing(circOut);
    var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
    var backOut = reverseEasing(backIn);
    var backInOut = mirrorEasing(backIn);
    var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
    var ca = 4356.0 / 361.0;
    var cb = 35442.0 / 1805.0;
    var cc = 16061.0 / 1805.0;
    var bounceOut = function (p) {
        if (p === 1 || p === 0)
            return p;
        var p2 = p * p;
        return p < BOUNCE_FIRST_THRESHOLD
            ? 7.5625 * p2
            : p < BOUNCE_SECOND_THRESHOLD
                ? 9.075 * p2 - 9.9 * p + 3.4
                : p < BOUNCE_THIRD_THRESHOLD
                    ? ca * p2 - cb * p + cc
                    : 10.8 * p * p - 20.52 * p + 10.72;
    };
    var bounceIn = reverseEasing(bounceOut);
    var bounceInOut = function (p) {
        return p < 0.5
            ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
            : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
    };

    function defaultEasing(values, easing) {
        return values.map(function () { return easing || easeInOut; }).splice(0, values.length - 1);
    }
    function defaultOffset(values) {
        var numValues = values.length;
        return values.map(function (_value, i) {
            return i !== 0 ? i / (numValues - 1) : 0;
        });
    }
    function convertOffsetToTimes(offset, duration) {
        return offset.map(function (o) { return o * duration; });
    }
    var KeyframesAnimator = (function () {
        function KeyframesAnimator(options) {
            this.isComplete = false;
            this.updateOptions(options);
            var _a = this.options, from = _a.from, to = _a.to;
            this.values = Array.isArray(to) ? to : [from, to];
            this.createInterpolator();
        }
        KeyframesAnimator.prototype.createInterpolator = function () {
            var _a = this.options, duration = _a.duration, ease = _a.ease, offset = _a.offset;
            ease = Array.isArray(ease) ? ease : defaultEasing(this.values, ease);
            offset = offset || defaultOffset(this.values);
            var times = convertOffsetToTimes(offset, duration);
            this.interpolator = interpolate(times, this.values, { ease: ease });
        };
        KeyframesAnimator.prototype.update = function (t) {
            var duration = this.options.duration;
            this.isComplete = t >= duration;
            return this.interpolator(t);
        };
        KeyframesAnimator.prototype.updateOptions = function (_a) {
            var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration = _d === void 0 ? 300 : _d;
            this.options = { from: from, to: to, ease: ease, offset: offset, duration: duration };
        };
        KeyframesAnimator.prototype.flipTarget = function () {
            this.values.reverse();
            this.createInterpolator();
        };
        KeyframesAnimator.needsInterpolation = function () { return false; };
        KeyframesAnimator.uniqueOptionKeys = new Set([
            "duration",
            "ease",
        ]);
        return KeyframesAnimator;
    }());

    var DecayAnimator = (function () {
        function DecayAnimator(options) {
            this.isComplete = false;
            this.updateOptions(options);
            var _a = this.options, power = _a.power, velocity = _a.velocity, modifyTarget = _a.modifyTarget, from = _a.from;
            var amplitude = power * velocity;
            var idealTarget = from + amplitude;
            var target = typeof modifyTarget === "undefined"
                ? idealTarget
                : modifyTarget(idealTarget);
            if (target !== idealTarget)
                amplitude = target - from;
            this.target = target;
            this.amplitude = amplitude;
        }
        DecayAnimator.prototype.flipTarget = function () { };
        DecayAnimator.prototype.update = function (t) {
            var _a = this.options, timeConstant = _a.timeConstant, restDelta = _a.restDelta;
            var delta = -this.amplitude * Math.exp(-t / timeConstant);
            this.isComplete = !(delta > restDelta || delta < -restDelta);
            return this.isComplete ? this.target : this.target + delta;
        };
        DecayAnimator.prototype.updateOptions = function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.velocity, velocity = _c === void 0 ? 0 : _c, _d = _b.from, from = _d === void 0 ? 0 : _d, _e = _b.power, power = _e === void 0 ? 0.8 : _e, _f = _b.timeConstant, timeConstant = _f === void 0 ? 350 : _f, _g = _b.restDelta, restDelta = _g === void 0 ? 0.5 : _g, modifyTarget = _b.modifyTarget;
            this.options = {
                velocity: velocity,
                from: from,
                power: power,
                timeConstant: timeConstant,
                restDelta: restDelta,
                modifyTarget: modifyTarget,
            };
        };
        DecayAnimator.needsInterpolation = function () { return false; };
        DecayAnimator.uniqueOptionKeys = new Set([
            "power",
            "timeConstant",
            "modifyTarget",
        ]);
        return DecayAnimator;
    }());

    var animators = [KeyframesAnimator, DecayAnimator, SpringAnimator];
    var types = {
        keyframes: KeyframesAnimator,
        spring: SpringAnimator,
        decay: DecayAnimator,
    };
    var numAnimators = animators.length;
    function detectAnimationFromOptions(config) {
        if (types[config.type])
            return types[config.type];
        for (var key in config) {
            for (var i = 0; i < numAnimators; i++) {
                var animator = animators[i];
                if (animator.uniqueOptionKeys.has(key))
                    return animator;
            }
        }
        return KeyframesAnimator;
    }

    var prevTime = 0;
    var onNextFrame = typeof window !== 'undefined' && window.requestAnimationFrame !== undefined
        ? function (callback) { return window.requestAnimationFrame(callback); }
        : function (callback) {
            var timestamp = Date.now();
            var timeToCall = Math.max(0, 16.7 - (timestamp - prevTime));
            prevTime = timestamp + timeToCall;
            setTimeout(function () { return callback(prevTime); }, timeToCall);
        };

    var createStep = (function (setRunNextFrame) {
        var processToRun = [];
        var processToRunNextFrame = [];
        var numThisFrame = 0;
        var isProcessing = false;
        var i = 0;
        var cancelled = new WeakSet();
        var toKeepAlive = new WeakSet();
        var renderStep = {
            cancel: function (process) {
                var indexOfCallback = processToRunNextFrame.indexOf(process);
                cancelled.add(process);
                if (indexOfCallback !== -1) {
                    processToRunNextFrame.splice(indexOfCallback, 1);
                }
            },
            process: function (frame) {
                var _a;
                isProcessing = true;
                _a = [
                    processToRunNextFrame,
                    processToRun
                ], processToRun = _a[0], processToRunNextFrame = _a[1];
                processToRunNextFrame.length = 0;
                numThisFrame = processToRun.length;
                if (numThisFrame) {
                    var process_1;
                    for (i = 0; i < numThisFrame; i++) {
                        process_1 = processToRun[i];
                        process_1(frame);
                        if (toKeepAlive.has(process_1) === true && !cancelled.has(process_1)) {
                            renderStep.schedule(process_1);
                            setRunNextFrame(true);
                        }
                    }
                }
                isProcessing = false;
            },
            schedule: function (process, keepAlive, immediate) {
                if (keepAlive === void 0) { keepAlive = false; }
                if (immediate === void 0) { immediate = false; }
                invariant(typeof process === 'function', 'Argument must be a function');
                var addToCurrentBuffer = immediate && isProcessing;
                var buffer = addToCurrentBuffer ? processToRun : processToRunNextFrame;
                cancelled.delete(process);
                if (keepAlive)
                    toKeepAlive.add(process);
                if (buffer.indexOf(process) === -1) {
                    buffer.push(process);
                    if (addToCurrentBuffer)
                        numThisFrame = processToRun.length;
                }
            }
        };
        return renderStep;
    });

    var StepId;
    (function (StepId) {
        StepId["Read"] = "read";
        StepId["Update"] = "update";
        StepId["Render"] = "render";
        StepId["PostRender"] = "postRender";
        StepId["FixedUpdate"] = "fixedUpdate";
    })(StepId || (StepId = {}));

    var maxElapsed = 40;
    var defaultElapsed = (1 / 60) * 1000;
    var useDefaultElapsed = true;
    var willRunNextFrame = false;
    var isProcessing = false;
    var frame = {
        delta: 0,
        timestamp: 0
    };
    var stepsOrder = [
        StepId.Read,
        StepId.Update,
        StepId.Render,
        StepId.PostRender
    ];
    var setWillRunNextFrame = function (willRun) { return (willRunNextFrame = willRun); };
    var _a = stepsOrder.reduce(function (acc, key) {
        var step = createStep(setWillRunNextFrame);
        acc.sync[key] = function (process, keepAlive, immediate) {
            if (keepAlive === void 0) { keepAlive = false; }
            if (immediate === void 0) { immediate = false; }
            if (!willRunNextFrame)
                startLoop();
            step.schedule(process, keepAlive, immediate);
            return process;
        };
        acc.cancelSync[key] = function (process) { return step.cancel(process); };
        acc.steps[key] = step;
        return acc;
    }, {
        steps: {},
        sync: {},
        cancelSync: {}
    }), steps = _a.steps, sync = _a.sync, cancelSync = _a.cancelSync;
    var processStep = function (stepId) { return steps[stepId].process(frame); };
    var processFrame = function (timestamp) {
        willRunNextFrame = false;
        frame.delta = useDefaultElapsed
            ? defaultElapsed
            : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
        if (!useDefaultElapsed)
            defaultElapsed = frame.delta;
        frame.timestamp = timestamp;
        isProcessing = true;
        stepsOrder.forEach(processStep);
        isProcessing = false;
        if (willRunNextFrame) {
            useDefaultElapsed = false;
            onNextFrame(processFrame);
        }
    };
    var startLoop = function () {
        willRunNextFrame = true;
        useDefaultElapsed = true;
        if (!isProcessing)
            onNextFrame(processFrame);
    };
    var getFrameData = function () { return frame; };

    function loopElapsed(elapsed, duration, delay) {
        if (delay === void 0) { delay = 0; }
        return elapsed - duration - delay;
    }
    function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
        if (delay === void 0) { delay = 0; }
        if (isForwardPlayback === void 0) { isForwardPlayback = true; }
        return isForwardPlayback
            ? loopElapsed(duration + -elapsed, duration, delay)
            : duration - (elapsed - duration) + delay;
    }
    function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
        return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
    }

    var framesync = function (update) {
        var passTimestamp = function (_a) {
            var delta = _a.delta;
            return update(delta);
        };
        return {
            start: function () { return sync.update(passTimestamp, true, true); },
            stop: function () { return cancelSync.update(passTimestamp); },
        };
    };
    function animate(_a) {
        var from = _a.from, to = _a.to, _b = _a.autoplay, autoplay = _b === void 0 ? true : _b, _c = _a.driver, driver = _c === void 0 ? framesync : _c, _d = _a.elapsed, elapsed = _d === void 0 ? 0 : _d, _e = _a.repeat, repeatMax = _e === void 0 ? 0 : _e, _f = _a.repeatType, repeatType = _f === void 0 ? "loop" : _f, _g = _a.repeatDelay, repeatDelay = _g === void 0 ? 0 : _g, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest(_a, ["from", "to", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
        var driverControls;
        var repeatCount = 0;
        var computedDuration = options.duration;
        var isForwardPlayback = true;
        var interpolateFromNumber;
        var Animator = detectAnimationFromOptions(options);
        if (Animator.needsInterpolation(from, to)) {
            interpolateFromNumber = interpolate([0, 100], [from, to], {
                clamp: false,
            });
            from = 0;
            to = 100;
        }
        var animation = new Animator(__assign(__assign({}, options), { from: from, to: to }));
        function repeat() {
            repeatCount++;
            if (repeatType === "reverse") {
                isForwardPlayback = repeatCount % 2 === 0;
                elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
            }
            else {
                elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
                if (repeatType === "mirror")
                    animation.flipTarget();
            }
            animation.isComplete = false;
            onRepeat && onRepeat();
        }
        function complete() {
            driverControls.stop();
            onComplete && onComplete();
        }
        function update(delta) {
            var _a;
            if (!isForwardPlayback)
                delta = -delta;
            elapsed += delta;
            var latest = animation.update(Math.max(0, elapsed));
            if (interpolateFromNumber) {
                latest = interpolateFromNumber(latest);
            }
            (_a = onUpdate) === null || _a === void 0 ? void 0 : _a(latest);
            var isComplete = isForwardPlayback
                ? animation.isComplete
                : elapsed <= 0;
            if (isComplete) {
                if (repeatCount === 0 && computedDuration === undefined) {
                    computedDuration = elapsed;
                }
                if (repeatCount < repeatMax) {
                    hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
                }
                else {
                    complete();
                }
            }
        }
        function play() {
            var _a;
            (_a = onPlay) === null || _a === void 0 ? void 0 : _a();
            driverControls = driver(update);
            driverControls.start();
        }
        autoplay && play();
        return {
            play: play,
            pause: function () { },
            resume: function () { },
            reverse: function () { },
            seek: function () { },
            stop: function () {
                var _a;
                (_a = onStop) === null || _a === void 0 ? void 0 : _a();
                driverControls.stop();
            },
        };
    }

    function velocityPerSecond(velocity, frameDuration) {
        return frameDuration ? velocity * (1000 / frameDuration) : 0;
    }

    function inertia(_a) {
        var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
        var currentAnimation;
        function isOutOfBounds(v) {
            return (min !== undefined && v < min) || (max !== undefined && v > max);
        }
        function boundaryNearest(v) {
            if (min === undefined)
                return max;
            if (max === undefined)
                return min;
            return Math.abs(min - v) < Math.abs(max - v) ? min : max;
        }
        function startAnimation(options) {
            var _a;
            (_a = currentAnimation) === null || _a === void 0 ? void 0 : _a.stop();
            currentAnimation = animate(__assign(__assign({}, options), { driver: driver, onUpdate: function (v) {
                    var _a, _b, _c;
                    (_a = onUpdate) === null || _a === void 0 ? void 0 : _a(v);
                    (_c = (_b = options).onUpdate) === null || _c === void 0 ? void 0 : _c.call(_b, v);
                }, onComplete: onComplete }));
        }
        function startSpring(options) {
            startAnimation(__assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta: restDelta }, options));
        }
        if (isOutOfBounds(from)) {
            startSpring({ from: from, velocity: velocity, to: boundaryNearest(from) });
        }
        else {
            var target = power * velocity + from;
            if (typeof modifyTarget !== "undefined")
                target = modifyTarget(target);
            var boundary_1 = boundaryNearest(target);
            var heading_1 = boundary_1 === min ? -1 : 1;
            var prev_1;
            var current_1;
            var checkBoundary = function (v) {
                prev_1 = current_1;
                velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
                current_1 = v;
                if (!(boundary_1 - v * heading_1 > 0)) {
                    startSpring({ from: current_1, to: boundary_1, velocity: velocity });
                }
            };
            startAnimation({
                type: "decay",
                from: from,
                velocity: velocity,
                timeConstant: timeConstant,
                power: power,
                restDelta: restDelta,
                modifyTarget: modifyTarget,
                onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
            });
        }
        return {
            stop: function () { var _a; return (_a = currentAnimation) === null || _a === void 0 ? void 0 : _a.stop(); },
        };
    }

    var radiansToDegrees = function (radians) { return (radians * 180) / Math.PI; };

    var angle = function (a, b) {
        if (b === void 0) { b = zeroPoint; }
        return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
    };

    var applyOffset = function (from, to) {
        var hasReceivedFrom = true;
        if (to === undefined) {
            to = from;
            hasReceivedFrom = false;
        }
        return function (v) {
            if (hasReceivedFrom) {
                return v - from + to;
            }
            else {
                from = v;
                hasReceivedFrom = true;
                return to;
            }
        };
    };

    var identity = function (v) { return v; };
    var createAttractor = function (alterDisplacement) {
        if (alterDisplacement === void 0) { alterDisplacement = identity; }
        return function (constant, origin, v) {
            var displacement = origin - v;
            var springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
            return displacement <= 0
                ? origin + springModifiedDisplacement
                : origin - springModifiedDisplacement;
        };
    };
    var attract = createAttractor();
    var attractExpo = createAttractor(Math.sqrt);

    var degreesToRadians = function (degrees) { return (degrees * Math.PI) / 180; };

    var isPoint = function (point) {
        return point.hasOwnProperty('x') && point.hasOwnProperty('y');
    };

    var isPoint3D = function (point) {
        return isPoint(point) && point.hasOwnProperty('z');
    };

    var distance1D = function (a, b) { return Math.abs(a - b); };
    function distance(a, b) {
        if (isNum(a) && isNum(b)) {
            return distance1D(a, b);
        }
        else if (isPoint(a) && isPoint(b)) {
            var xDelta = distance1D(a.x, b.x);
            var yDelta = distance1D(a.y, b.y);
            var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
            return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
        }
    }

    var pointFromVector = function (origin, angle, distance) {
        angle = degreesToRadians(angle);
        return {
            x: distance * Math.cos(angle) + origin.x,
            y: distance * Math.sin(angle) + origin.y
        };
    };

    var toDecimal = function (num, precision) {
        if (precision === void 0) { precision = 2; }
        precision = Math.pow(10, precision);
        return Math.round(num * precision) / precision;
    };

    var smoothFrame = function (prevValue, nextValue, duration, smoothing) {
        if (smoothing === void 0) { smoothing = 0; }
        return toDecimal(prevValue +
            (duration * (nextValue - prevValue)) / Math.max(smoothing, duration));
    };

    var smooth = function (strength) {
        if (strength === void 0) { strength = 50; }
        var previousValue = 0;
        var lastUpdated = 0;
        return function (v) {
            var currentFramestamp = getFrameData().timestamp;
            var timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
            var newValue = timeDelta
                ? smoothFrame(previousValue, v, timeDelta, strength)
                : previousValue;
            lastUpdated = currentFramestamp;
            previousValue = newValue;
            return newValue;
        };
    };

    var snap = function (points) {
        if (typeof points === 'number') {
            return function (v) { return Math.round(v / points) * points; };
        }
        else {
            var i_1 = 0;
            var numPoints_1 = points.length;
            return function (v) {
                var lastDistance = Math.abs(points[0] - v);
                for (i_1 = 1; i_1 < numPoints_1; i_1++) {
                    var point = points[i_1];
                    var distance = Math.abs(point - v);
                    if (distance === 0)
                        return point;
                    if (distance > lastDistance)
                        return points[i_1 - 1];
                    if (i_1 === numPoints_1 - 1)
                        return point;
                    lastDistance = distance;
                }
            };
        }
    };

    function velocityPerFrame(xps, frameDuration) {
        return xps / (1000 / frameDuration);
    }

    var wrap = function (min, max, v) {
        var rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    var a = function (a1, a2) { return 1.0 - 3.0 * a2 + 3.0 * a1; };
    var b = function (a1, a2) { return 3.0 * a2 - 6.0 * a1; };
    var c = function (a1) { return 3.0 * a1; };
    var calcBezier = function (t, a1, a2) {
        return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
    };
    var getSlope = function (t, a1, a2) {
        return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
    };
    var subdivisionPrecision = 0.0000001;
    var subdivisionMaxIterations = 10;
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX;
        var currentT;
        var i = 0;
        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            }
            else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > subdivisionPrecision &&
            ++i < subdivisionMaxIterations);
        return currentT;
    }
    var newtonIterations = 8;
    var newtonMinSlope = 0.001;
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < newtonIterations; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0) {
                return aGuessT;
            }
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    var kSplineTableSize = 11;
    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
    function cubicBezier(mX1, mY1, mX2, mY2) {
        if (mX1 === mY1 && mX2 === mY2)
            return linear;
        var sampleValues = new Float32Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
        function getTForX(aX) {
            var intervalStart = 0.0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
            }
            --currentSample;
            var dist = (aX - sampleValues[currentSample]) /
                (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= newtonMinSlope) {
                return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            }
            else if (initialSlope === 0.0) {
                return guessForT;
            }
            else {
                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }
        }
        return function (t) {
            return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
        };
    }

    var steps$1 = function (steps, direction) {
        if (direction === void 0) { direction = 'end'; }
        return function (progress) {
            progress =
                direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
            var expanded = progress * steps;
            var rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
            return clamp$1(0, 1, rounded / steps);
        };
    };

    exports.DecayAnimator = DecayAnimator;
    exports.KeyframesAnimator = KeyframesAnimator;
    exports.SpringAnimator = SpringAnimator;
    exports.angle = angle;
    exports.animate = animate;
    exports.anticipate = anticipate;
    exports.applyOffset = applyOffset;
    exports.attract = attract;
    exports.attractExpo = attractExpo;
    exports.backIn = backIn;
    exports.backInOut = backInOut;
    exports.backOut = backOut;
    exports.bounceIn = bounceIn;
    exports.bounceInOut = bounceInOut;
    exports.bounceOut = bounceOut;
    exports.circIn = circIn;
    exports.circInOut = circInOut;
    exports.circOut = circOut;
    exports.clamp = clamp$1;
    exports.createAnticipate = createAnticipate;
    exports.createAttractor = createAttractor;
    exports.createBackIn = createBackIn;
    exports.createExpoIn = createExpoIn;
    exports.cubicBezier = cubicBezier;
    exports.degreesToRadians = degreesToRadians;
    exports.distance = distance;
    exports.easeIn = easeIn;
    exports.easeInOut = easeInOut;
    exports.easeOut = easeOut;
    exports.inertia = inertia;
    exports.interpolate = interpolate;
    exports.isPoint = isPoint;
    exports.isPoint3D = isPoint3D;
    exports.linear = linear;
    exports.mirrorEasing = mirrorEasing;
    exports.mix = mix;
    exports.mixColor = mixColor;
    exports.mixComplex = mixComplex;
    exports.pipe = pipe;
    exports.pointFromVector = pointFromVector;
    exports.progress = progress;
    exports.radiansToDegrees = radiansToDegrees;
    exports.reverseEasing = reverseEasing;
    exports.smooth = smooth;
    exports.smoothFrame = smoothFrame;
    exports.snap = snap;
    exports.steps = steps$1;
    exports.toDecimal = toDecimal;
    exports.velocityPerFrame = velocityPerFrame;
    exports.velocityPerSecond = velocityPerSecond;
    exports.wrap = wrap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
