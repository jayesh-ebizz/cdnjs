/*!
  * vue-i18n v9.0.0-beta.13
  * (c) 2020 kazuya kawaguchi
  * Released under the MIT License.
  */
import { ref, getCurrentInstance, computed, watch, createVNode, Text, h, Fragment, inject, onMounted, onUnmounted, isRef } from 'vue';

/**
 * Original Utilities
 * written by kazuya kawaguchi
 */
const inBrowser = typeof window !== 'undefined';
let mark;
let measure;
{
    const perf = inBrowser && window.performance;
    if (perf &&
        perf.mark &&
        perf.measure &&
        perf.clearMarks &&
        perf.clearMeasures) {
        mark = (tag) => perf.mark(tag);
        measure = (name, startTag, endTag) => {
            perf.measure(name, startTag, endTag);
            perf.clearMarks(startTag);
            perf.clearMarks(endTag);
        };
    }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
/* eslint-disable */
function format(message, ...args) {
    if (args.length === 1 && isObject(args[0])) {
        args = args[0];
    }
    if (!args || !args.hasOwnProperty) {
        args = {};
    }
    return message.replace(RE_ARGS, (match, identifier) => {
        return args.hasOwnProperty(identifier) ? args[identifier] : '';
    });
}
const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
/** @internal */
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
/** @internal */
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
/** @internal */
const friendlyJSONstringify = (json) => JSON.stringify(json)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/\u0027/g, '\\u0027');
const isNumber = (val) => typeof val === 'number' && isFinite(val);
const isDate = (val) => toTypeString(val) === '[object Date]';
const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
    if (typeof console !== 'undefined') {
        const label =  'vue-i18n' ;
        console.warn(`[${label}] ` + msg);
        /* istanbul ignore if */
        if (err) {
            console.warn(err.stack);
        }
    }
}
let _globalThis;
const getGlobalThis = () => {
    // prettier-ignore
    return (_globalThis ||
        (_globalThis =
            typeof globalThis !== 'undefined'
                ? globalThis
                : typeof self !== 'undefined'
                    ? self
                    : typeof window !== 'undefined'
                        ? window
                        : typeof global !== 'undefined'
                            ? global
                            : {}));
};
function escapeHtml(rawText) {
    return rawText
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}
/* eslint-enable */
/**
 * Useful Utilites By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isBoolean = (val) => typeof val === 'boolean';
const isObject = (val) => // eslint-disable-line
 val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
// for converting list and named values to displayed strings.
const toDisplayString = (val) => {
    return val == null
        ? ''
        : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
            ? JSON.stringify(val, null, 2)
            : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var env = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.hook = exports.target = exports.isBrowser = void 0;
exports.isBrowser = typeof navigator !== 'undefined';
exports.target = exports.isBrowser
    ? window
    : typeof commonjsGlobal !== 'undefined'
        ? commonjsGlobal
        : {};
exports.hook = exports.target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

});

var _const = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiHookEvents = void 0;
var ApiHookEvents;
(function (ApiHookEvents) {
    ApiHookEvents["SETUP_DEVTOOLS_PLUGIN"] = "devtools-plugin:setup";
})(ApiHookEvents = exports.ApiHookEvents || (exports.ApiHookEvents = {}));

});

var api = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

});

var app = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

});

var component = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

});

var context = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

});

var hooks = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hooks = void 0;
var Hooks;
(function (Hooks) {
    Hooks["TRANSFORM_CALL"] = "transformCall";
    Hooks["GET_APP_RECORD_NAME"] = "getAppRecordName";
    Hooks["GET_APP_ROOT_INSTANCE"] = "getAppRootInstance";
    Hooks["REGISTER_APPLICATION"] = "registerApplication";
    Hooks["WALK_COMPONENT_TREE"] = "walkComponentTree";
    Hooks["WALK_COMPONENT_PARENTS"] = "walkComponentParents";
    Hooks["INSPECT_COMPONENT"] = "inspectComponent";
    Hooks["GET_COMPONENT_BOUNDS"] = "getComponentBounds";
    Hooks["GET_COMPONENT_NAME"] = "getComponentName";
    Hooks["GET_ELEMENT_COMPONENT"] = "getElementComponent";
    Hooks["GET_INSPECTOR_TREE"] = "getInspectorTree";
    Hooks["GET_INSPECTOR_STATE"] = "getInspectorState";
})(Hooks = exports.Hooks || (exports.Hooks = {}));

});

var api$1 = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(api, exports);
__exportStar(app, exports);
__exportStar(component, exports);
__exportStar(context, exports);
__exportStar(hooks, exports);

});

var lib = createCommonjsModule(function (module, exports) {
var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDevtoolsPlugin = void 0;


__exportStar(api$1, exports);
function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    if (env.hook) {
        env.hook.emit(_const.ApiHookEvents.SETUP_DEVTOOLS_PLUGIN, pluginDescriptor, setupFn);
    }
    else {
        const list = env.target.__VUE_DEVTOOLS_PLUGINS__ = env.target.__VUE_DEVTOOLS_PLUGINS__ || [];
        list.push({
            pluginDescriptor,
            setupFn
        });
    }
}
exports.setupDevtoolsPlugin = setupDevtoolsPlugin;

});

const pathStateMachine = [];
pathStateMachine[0 /* BEFORE_PATH */] = {
    ["w" /* WORKSPACE */]: [0 /* BEFORE_PATH */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[1 /* IN_PATH */] = {
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[2 /* BEFORE_IDENT */] = {
    ["w" /* WORKSPACE */]: [2 /* BEFORE_IDENT */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */]
};
pathStateMachine[3 /* IN_IDENT */] = {
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */, 1 /* PUSH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */, 1 /* PUSH */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */, 1 /* PUSH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */, 1 /* PUSH */]
};
pathStateMachine[4 /* IN_SUB_PATH */] = {
    ["'" /* SINGLE_QUOTE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */],
    ["\"" /* DOUBLE_QUOTE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [
        4 /* IN_SUB_PATH */,
        2 /* INC_SUB_PATH_DEPTH */
    ],
    ["]" /* RIGHT_BRACKET */]: [1 /* IN_PATH */, 3 /* PUSH_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */]
};
pathStateMachine[5 /* IN_SINGLE_QUOTE */] = {
    ["'" /* SINGLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */]
};
pathStateMachine[6 /* IN_DOUBLE_QUOTE */] = {
    ["\"" /* DOUBLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */]
};
/**
 * Check if an expression is a literal value.
 */
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
    return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */
function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */
function getPathCharType(ch) {
    if (ch === undefined || ch === null) {
        return "o" /* END_OF_FAIL */;
    }
    const code = ch.charCodeAt(0);
    switch (code) {
        case 0x5b: // [
        case 0x5d: // ]
        case 0x2e: // .
        case 0x22: // "
        case 0x27: // '
            return ch;
        case 0x5f: // _
        case 0x24: // $
        case 0x2d: // -
            return "i" /* IDENT */;
        case 0x09: // Tab (HT)
        case 0x0a: // Newline (LF)
        case 0x0d: // Return (CR)
        case 0xa0: // No-break space (NBSP)
        case 0xfeff: // Byte Order Mark (BOM)
        case 0x2028: // Line Separator (LS)
        case 0x2029: // Paragraph Separator (PS)
            return "w" /* WORKSPACE */;
    }
    return "i" /* IDENT */;
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */
function formatSubPath(path) {
    const trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
        return false;
    }
    return isLiteral(trimmed)
        ? stripQuotes(trimmed)
        : "*" /* ASTARISK */ + trimmed;
}
/**
 * Parse a string path into an array of segments
 */
function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0 /* BEFORE_PATH */;
    let subPathDepth = 0;
    let c;
    let key; // eslint-disable-line
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0 /* APPEND */] = () => {
        if (key === undefined) {
            key = newChar;
        }
        else {
            key += newChar;
        }
    };
    actions[1 /* PUSH */] = () => {
        if (key !== undefined) {
            keys.push(key);
            key = undefined;
        }
    };
    actions[2 /* INC_SUB_PATH_DEPTH */] = () => {
        actions[0 /* APPEND */]();
        subPathDepth++;
    };
    actions[3 /* PUSH_SUB_PATH */] = () => {
        if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4 /* IN_SUB_PATH */;
            actions[0 /* APPEND */]();
        }
        else {
            subPathDepth = 0;
            if (key === undefined) {
                return false;
            }
            key = formatSubPath(key);
            if (key === false) {
                return false;
            }
            else {
                actions[1 /* PUSH */]();
            }
        }
    };
    function maybeUnescapeQuote() {
        const nextChar = path[index + 1];
        if ((mode === 5 /* IN_SINGLE_QUOTE */ &&
            nextChar === "'" /* SINGLE_QUOTE */) ||
            (mode === 6 /* IN_DOUBLE_QUOTE */ &&
                nextChar === "\"" /* DOUBLE_QUOTE */)) {
            index++;
            newChar = '\\' + nextChar;
            actions[0 /* APPEND */]();
            return true;
        }
    }
    while (mode !== null) {
        index++;
        c = path[index];
        if (c === '\\' && maybeUnescapeQuote()) {
            continue;
        }
        type = getPathCharType(c);
        typeMap = pathStateMachine[mode];
        transition = typeMap[type] || typeMap["l" /* ELSE */] || 8 /* ERROR */;
        // check parse error
        if (transition === 8 /* ERROR */) {
            return;
        }
        mode = transition[0];
        if (transition[1] !== undefined) {
            action = actions[transition[1]];
            if (action) {
                newChar = c;
                if (action() === false) {
                    return;
                }
            }
        }
        // check parse finish
        if (mode === 7 /* AFTER_PATH */) {
            return keys;
        }
    }
}
// path token cache
const cache = new Map();
function resolveValue(obj, path) {
    // check object
    if (!isObject(obj)) {
        return null;
    }
    // parse path
    let hit = cache.get(path);
    if (!hit) {
        hit = parse(path);
        if (hit) {
            cache.set(path, hit);
        }
    }
    // check hit
    if (!hit) {
        return null;
    }
    // resolve path value
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
        const val = last[hit[i]];
        if (val === undefined) {
            return null;
        }
        last = val;
        i++;
    }
    return last;
}

const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
const DEFAULT_MESSAGE_DATA_TYPE = 'text';
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : values.join('');
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
        // prettier-ignore
        return choice
            ? choice > 1
                ? 1
                : 0
            : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
    // prettier-ignore
    const index = isNumber(options.pluralIndex)
        ? options.pluralIndex
        : -1;
    // prettier-ignore
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
        ? isNumber(options.named.count)
            ? options.named.count
            : isNumber(options.named.n)
                ? options.named.n
                : index
        : index;
}
function normalizeNamed(pluralIndex, props) {
    if (!props.count) {
        props.count = pluralIndex;
    }
    if (!props.n) {
        props.n = pluralIndex;
    }
}
function createMessageContext(options = {}) {
    const locale = options.locale;
    const pluralIndex = getPluralIndex(options);
    const pluralRule = isObject(options.pluralRules) &&
        isString(locale) &&
        isFunction(options.pluralRules[locale])
        ? options.pluralRules[locale]
        : pluralDefault;
    const orgPluralRule = isObject(options.pluralRules) &&
        isString(locale) &&
        isFunction(options.pluralRules[locale])
        ? pluralDefault
        : undefined;
    const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
    const _list = options.list || [];
    const list = (index) => _list[index];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    const named = (key) => _named[key];
    // TODO: need to design resolve message function?
    function message(key) {
        // prettier-ignore
        const msg = isFunction(options.messages)
            ? options.messages(key)
            : isObject(options.messages)
                ? options.messages[key]
                : false;
        return !msg
            ? options.parent
                ? options.parent.message(key) // resolve from parent messages
                : DEFAULT_MESSAGE
            : msg;
    }
    const _modifier = (name) => options.modifiers
        ? options.modifiers[name]
        : DEFAULT_MODIFIER;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize)
        ? options.processor.normalize
        : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) &&
        isFunction(options.processor.interpolate)
        ? options.processor.interpolate
        : DEFAULT_INTERPOLATE;
    const type = isPlainObject(options.processor) && isString(options.processor.type)
        ? options.processor.type
        : DEFAULT_MESSAGE_DATA_TYPE;
    const ctx = {
        ["list" /* LIST */]: list,
        ["named" /* NAMED */]: named,
        ["plural" /* PLURAL */]: plural,
        ["linked" /* LINKED */]: (key, modifier) => {
            // TODO: should check `key`
            const msg = message(key)(ctx);
            return isString(modifier) ? _modifier(modifier)(msg) : msg;
        },
        ["message" /* MESSAGE */]: message,
        ["type" /* TYPE */]: type,
        ["interpolate" /* INTERPOLATE */]: interpolate,
        ["normalize" /* NORMALIZE */]: normalize
    };
    return ctx;
}

/** @internal */
const errorMessages = {
    // tokenizer error messages
    [0 /* EXPECTED_TOKEN */]: `Expected token: '{0}'`,
    [1 /* INVALID_TOKEN_IN_PLACEHOLDER */]: `Invalid token in placeholder: '{0}'`,
    [2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */]: `Unterminated single quote in placeholder`,
    [3 /* UNKNOWN_ESCAPE_SEQUENCE */]: `Unknown escape sequence: \\{0}`,
    [4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */]: `Invalid unicode escape sequence: {0}`,
    [5 /* UNBALANCED_CLOSING_BRACE */]: `Unbalanced closing brace`,
    [6 /* UNTERMINATED_CLOSING_BRACE */]: `Unterminated closing brace`,
    [7 /* EMPTY_PLACEHOLDER */]: `Empty placeholder`,
    [8 /* NOT_ALLOW_NEST_PLACEHOLDER */]: `Not allowed nest placeholder`,
    [9 /* INVALID_LINKED_FORMAT */]: `Invalid linked format`,
    // parser error messages
    [10 /* MUST_HAVE_MESSAGES_IN_PLURAL */]: `Plural must have messages`,
    [11 /* UNEXPECTED_LEXICAL_ANALYSIS */]: `Unexpected lexical analysis in token: '{0}'`
};
/** @internal */
function createCompileError(code, loc, optinos = {}) {
    const { domain, messages, args } = optinos;
    const msg =  format((messages || errorMessages)[code] || '', ...(args || []))
        ;
    const error = new SyntaxError(String(msg));
    error.code = code;
    if (loc) {
        error.location = loc;
    }
    error.domain = domain;
    return error;
}

/** @internal */
const warnMessages = {
    [0 /* NOT_FOUND_KEY */]: `Not found '{key}' key in '{locale}' locale messages.`,
    [1 /* FALLBACK_TO_TRANSLATE */]: `Fall back to translate '{key}' key with '{target}' locale.`,
    [2 /* CANNOT_FORMAT_NUMBER */]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
    [3 /* FALLBACK_TO_NUMBER_FORMAT */]: `Fall back to number format '{key}' key with '{target}' locale.`,
    [4 /* CANNOT_FORMAT_DATE */]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
    [5 /* FALLBACK_TO_DATE_FORMAT */]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
/** @internal */
function getWarnMessage(code, ...args) {
    return format(warnMessages[code], ...args);
}

/** @internal */
const NOT_REOSLVED = -1;
/** @internal */
const MISSING_RESOLVE_VALUE = '';
function getDefaultLinkedModifiers() {
    return {
        upper: (val) => (isString(val) ? val.toUpperCase() : val),
        lower: (val) => (isString(val) ? val.toLowerCase() : val),
        // prettier-ignore
        capitalize: (val) => (isString(val)
            ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
            : val)
    };
}
let _compiler;
/** @internal */
function createCoreContext(options = {}) {
    // setup options
    const locale = isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = isArray(options.fallbackLocale) ||
        isPlainObject(options.fallbackLocale) ||
        isString(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const messages = isPlainObject(options.messages)
        ? options.messages
        : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [locale]: {} };
    const modifiers = Object.assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
        ? options.missingWarn
        : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
        ? options.fallbackWarn
        : true;
    const fallbackFormat = !!options.fallbackFormat;
    const unresolving = !!options.unresolving;
    const postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    const escapeParameter = !!options.escapeParameter;
    const messageCompiler = isFunction(options.messageCompiler)
        ? options.messageCompiler
        : _compiler;
    const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
    // setup internal options
    const internalOptions = options;
    const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters)
        ? internalOptions.__datetimeFormatters
        : new Map();
    const __numberFormatters = isObject(internalOptions.__numberFormatters)
        ? internalOptions.__numberFormatters
        : new Map();
    const context = {
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        modifiers,
        pluralRules,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackFormat,
        unresolving,
        postTranslation,
        processor,
        warnHtmlMessage,
        escapeParameter,
        messageCompiler,
        onWarn,
        __datetimeFormatters,
        __numberFormatters
    };
    // for vue-devtools timeline event
    {
        context.__emitter =
            internalOptions.__emitter != null ? internalOptions.__emitter : undefined;
    }
    return context;
}
/** @internal */
function isTranslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
/** @internal */
function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
}
/** @internal */
function handleMissing(context, key, locale, missingWarn, type) {
    const { missing, onWarn } = context;
    // for vue-devtools timeline event
    {
        const emitter = context.__emitter;
        if (emitter) {
            emitter.emit("missing" /* MISSING */, {
                locale,
                key,
                type
            });
        }
    }
    if (missing !== null) {
        const ret = missing(context, locale, key, type);
        return isString(ret) ? ret : key;
    }
    else {
        if ( isTranslateMissingWarn(missingWarn, key)) {
            onWarn(getWarnMessage(0 /* NOT_FOUND_KEY */, { key, locale }));
        }
        return key;
    }
}
/** @internal */
function getLocaleChain(ctx, fallback, start = '') {
    const context = ctx;
    if (start === '') {
        return [];
    }
    if (!context.__localeChainCache) {
        context.__localeChainCache = new Map();
    }
    let chain = context.__localeChainCache.get(start);
    if (!chain) {
        chain = [];
        // first block defined by start
        let block = [start];
        // while any intervening block found
        while (isArray(block)) {
            block = appendBlockToChain(chain, block, fallback);
        }
        // prettier-ignore
        // last block defined by default
        const defaults = isArray(fallback)
            ? fallback
            : isPlainObject(fallback)
                ? fallback['default']
                    ? fallback['default']
                    : null
                : fallback;
        // convert defaults to array
        block = isString(defaults) ? [defaults] : defaults;
        if (isArray(block)) {
            appendBlockToChain(chain, block, false);
        }
        context.__localeChainCache.set(start, chain);
    }
    return chain;
}
function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
        const locale = block[i];
        if (isString(locale)) {
            follow = appendLocaleToChain(chain, block[i], blocks);
        }
    }
    return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split('-');
    do {
        const target = tokens.join('-');
        follow = appendItemToChain(chain, target, blocks);
        tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
}
function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
        follow = true;
        if (target) {
            follow = target[target.length - 1] !== '!';
            const locale = target.replace(/!/g, '');
            chain.push(locale);
            if ((isArray(blocks) || isPlainObject(blocks)) &&
                blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
            ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                follow = blocks[locale];
            }
        }
    }
    return follow;
}
/** @internal */
function updateFallbackLocale(ctx, locale, fallback) {
    const context = ctx;
    context.__localeChainCache = new Map();
    getLocaleChain(ctx, fallback, locale);
}

/** @internal */
function createCoreError(code) {
    return createCompileError(code, null,  { messages: errorMessages$1 } );
}
/** @internal */
const errorMessages$1 = {
    [12 /* INVALID_ARGUMENT */]: 'Invalid arguments',
    [13 /* INVALID_DATE_ARGUMENT */]: 'The date provided is an invalid Date object.' +
        'Make sure your Date represents a valid date.',
    [14 /* INVALID_ISO_DATE_ARGUMENT */]: 'The argument provided is not a valid ISO date string'
};

const NOOP_MESSAGE_FUNCTION = () => '';
const isMessageFunction = (val) => isFunction(val);
// implementationo of `translate` function
/** @internal */
function translate(context, ...args) {
    const { fallbackFormat, postTranslation, unresolving, fallbackLocale } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const escapeParameter = isBoolean(options.escapeParameter)
        ? options.escapeParameter
        : context.escapeParameter;
    // prettier-ignore
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) // default by function option
        ? !isBoolean(options.default)
            ? options.default
            : key
        : fallbackFormat // default by `fallbackFormat` option
            ? key
            : '';
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
    const locale = isString(options.locale) ? options.locale : context.locale;
    // escape params
    escapeParameter && escapeParams(options);
    // resolve message format
    // eslint-disable-next-line prefer-const
    let [format, targetLocale, message] = resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn);
    // if you use default message, set it as message format!
    let cacheBaseKey = key;
    if (!(isString(format) || isMessageFunction(format))) {
        if (enableDefaultMsg) {
            format = defaultMsgOrKey;
            cacheBaseKey = format;
        }
    }
    // checking message format and target locale
    if (!(isString(format) || isMessageFunction(format)) ||
        !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    if ( isString(format) && context.messageCompiler == null) {
        warn(`Message format compilation is not supported in this build, because message compiler isn't included, you need to pre-compilation all message format.`);
        return key;
    }
    // setup compile error detecting
    let occured = false;
    const errorDetector = () => {
        occured = true;
    };
    // compile message format
    const msg = compileMessasgeFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector);
    // if occured compile error, return the message format
    if (occured) {
        return format;
    }
    // evaluate message with context
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = evaluateMessage(context, msg, msgContext);
    // if use post translation option, procee it with handler
    return postTranslation ? postTranslation(messaged) : messaged;
}
function escapeParams(options) {
    if (isArray(options.list)) {
        options.list = options.list.map(item => isString(item) ? escapeHtml(item) : item);
    }
    else if (isObject(options.named)) {
        Object.keys(options.named).forEach(key => {
            if (isString(options.named[key])) {
                options.named[key] = escapeHtml(options.named[key]);
            }
        });
    }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
    const { messages, onWarn } = context;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    let message = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'translate';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (
            locale !== targetLocale &&
            isTranslateFallbackWarn(fallbackWarn, key)) {
            onWarn(getWarnMessage(1 /* FALLBACK_TO_TRANSLATE */, {
                key,
                target: targetLocale
            }));
        }
        // for vue-devtools timeline event
        if ( locale !== targetLocale) {
            const emitter = context.__emitter;
            if (emitter) {
                emitter.emit("fallback" /* FALBACK */, {
                    type,
                    key,
                    from,
                    to
                });
            }
        }
        message =
            messages[targetLocale] || {};
        // for vue-devtools timeline event
        let start = null;
        let startTag;
        let endTag;
        if ( inBrowser) {
            start = window.performance.now();
            startTag = 'intlify-message-resolve-start';
            endTag = 'intlify-message-resolve-end';
            mark && mark(startTag);
        }
        if ((format = resolveValue(message, key)) === null) {
            // if null, resolve with object key path
            format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
        }
        // for vue-devtools timeline event
        if ( inBrowser) {
            const end = window.performance.now();
            const emitter = context.__emitter;
            if (emitter && start && format) {
                emitter.emit("message-resolve" /* MESSAGE_RESOLVE */, {
                    type: "message-resolve" /* MESSAGE_RESOLVE */,
                    key,
                    message: format,
                    time: end - start
                });
            }
            if (startTag && endTag && mark && measure) {
                mark(endTag);
                measure('intlify message resolve', startTag, endTag);
            }
        }
        if (isString(format) || isFunction(format))
            break;
        const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
        if (missingRet !== key) {
            format = missingRet;
        }
        from = to;
    }
    return [format, targetLocale, message];
}
function compileMessasgeFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
    const { messageCompiler, warnHtmlMessage } = context;
    if (isMessageFunction(format)) {
        const msg = format;
        msg.locale = msg.locale || targetLocale;
        msg.key = msg.key || key;
        return msg;
    }
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if ( inBrowser) {
        start = window.performance.now();
        startTag = 'intlify-message-compilation-start';
        endTag = 'intlify-message-compilation-end';
        mark && mark(startTag);
    }
    const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
    // for vue-devtools timeline event
    if ( inBrowser) {
        const end = window.performance.now();
        const emitter = context.__emitter;
        if (emitter && start) {
            emitter.emit("message-compilation" /* MESSAGE_COMPILATION */, {
                type: "message-compilation" /* MESSAGE_COMPILATION */,
                message: format,
                time: end - start
            });
        }
        if (startTag && endTag && mark && measure) {
            mark(endTag);
            measure('intlify message compilation', startTag, endTag);
        }
    }
    msg.locale = targetLocale;
    msg.key = key;
    msg.source = format;
    return msg;
}
function evaluateMessage(context, msg, msgCtx) {
    // for vue-devtools timeline event
    let start = null;
    let startTag;
    let endTag;
    if ( inBrowser) {
        start = window.performance.now();
        startTag = 'intlify-message-evaluation-start';
        endTag = 'intlify-message-evaluation-end';
        mark && mark(startTag);
    }
    const messaged = msg(msgCtx);
    // for vue-devtools timeline event
    if ( inBrowser) {
        const end = window.performance.now();
        const emitter = context.__emitter;
        if (emitter && start) {
            emitter.emit("message-evaluation" /* MESSAGE_EVALUATION */, {
                type: "message-evaluation" /* MESSAGE_EVALUATION */,
                value: messaged,
                time: end - start
            });
        }
        if (startTag && endTag && mark && measure) {
            mark(endTag);
            measure('intlify message evaluation', startTag, endTag);
        }
    }
    return messaged;
}
/** @internal */
function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1)) {
        throw createCoreError(12 /* INVALID_ARGUMENT */);
    }
    const key = arg1;
    if (isNumber(arg2)) {
        options.plural = arg2;
    }
    else if (isString(arg2)) {
        options.default = arg2;
    }
    else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
        options.named = arg2;
    }
    else if (isArray(arg2)) {
        options.list = arg2;
    }
    if (isNumber(arg3)) {
        options.plural = arg3;
    }
    else if (isString(arg3)) {
        options.default = arg3;
    }
    else if (isPlainObject(arg3)) {
        Object.assign(options, arg3);
    }
    return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
    return {
        warnHtmlMessage,
        onError: (err) => {
            errorDetector && errorDetector(err);
            {
                const message = `Message compilation error: ${err.message}`;
                const codeFrame = err.location &&
                    generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
                const emitter = context.__emitter;
                if (emitter) {
                    emitter.emit("compile-error" /* COMPILE_ERROR */, {
                        message: source,
                        error: err.message,
                        start: err.location && err.location.start.offset,
                        end: err.location && err.location.end.offset
                    });
                }
                console.error(codeFrame ? `${message}\n${codeFrame}` : message);
            }
        },
        onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
    };
}
function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules } = context;
    const resolveMessage = (key) => {
        const val = resolveValue(message, key);
        if (isString(val)) {
            let occured = false;
            const errorDetector = () => {
                occured = true;
            };
            const msg = compileMessasgeFormat(context, key, locale, val, key, errorDetector);
            return !occured
                ? msg
                : NOOP_MESSAGE_FUNCTION;
        }
        else if (isMessageFunction(val)) {
            return val;
        }
        else {
            // TODO: should be implemented warning message
            return NOOP_MESSAGE_FUNCTION;
        }
    };
    const ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: resolveMessage
    };
    if (context.processor) {
        ctxOptions.processor = context.processor;
    }
    if (options.list) {
        ctxOptions.list = options.list;
    }
    if (options.named) {
        ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
        ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
}

const intlDefined = typeof Intl !== 'undefined';
const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
    numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
};

// implementation of `datetime` function
/** @internal */
function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __datetimeFormatters } = context;
    if ( !Availabilities.dateTimeFormat) {
        onWarn(getWarnMessage(4 /* CANNOT_FORMAT_DATE */));
        return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, orverrides] = parseDateTimeArgs(...args);
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === '') {
        return new Intl.DateTimeFormat(locale).format(value);
    }
    // resolve format
    let datetimeFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'datetime format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (
            locale !== targetLocale &&
            isTranslateFallbackWarn(fallbackWarn, key)) {
            onWarn(getWarnMessage(5 /* FALLBACK_TO_DATE_FORMAT */, {
                key,
                target: targetLocale
            }));
        }
        // for vue-devtools timeline event
        if ( locale !== targetLocale) {
            const emitter = context.__emitter;
            if (emitter) {
                emitter.emit("fallback" /* FALBACK */, {
                    type,
                    key,
                    from,
                    to
                });
            }
        }
        datetimeFormat =
            datetimeFormats[targetLocale] || {};
        format = datetimeFormat[key];
        if (isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!isPlainObject(format) || !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(orverrides)) {
        id = `${id}__${JSON.stringify(orverrides)}`;
    }
    let formatter = __datetimeFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(targetLocale, Object.assign({}, format, orverrides));
        __datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let orverrides = {};
    let value;
    if (isString(arg1)) {
        // Only allow ISO strings - other date formats are often supported,
        // but may cause different results in different browsers.
        if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
            throw createCoreError(14 /* INVALID_ISO_DATE_ARGUMENT */);
        }
        value = new Date(arg1);
        try {
            // This will fail if the date is not valid
            value.toISOString();
        }
        catch (e) {
            throw createCoreError(14 /* INVALID_ISO_DATE_ARGUMENT */);
        }
    }
    else if (isDate(arg1)) {
        if (isNaN(arg1.getTime())) {
            throw createCoreError(13 /* INVALID_DATE_ARGUMENT */);
        }
        value = arg1;
    }
    else if (isNumber(arg1)) {
        value = arg1;
    }
    else {
        throw createCoreError(12 /* INVALID_ARGUMENT */);
    }
    if (isString(arg2)) {
        options.key = arg2;
    }
    else if (isPlainObject(arg2)) {
        options = arg2;
    }
    if (isString(arg3)) {
        options.locale = arg3;
    }
    else if (isPlainObject(arg3)) {
        orverrides = arg3;
    }
    if (isPlainObject(arg4)) {
        orverrides = arg4;
    }
    return [options.key || '', value, options, orverrides];
}
/** @internal */
function clearDateTimeFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__datetimeFormatters.has(id)) {
            continue;
        }
        context.__datetimeFormatters.delete(id);
    }
}

// implementation of `number` function
/** @internal */
function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
    const { __numberFormatters } = context;
    if ( !Availabilities.numberFormat) {
        onWarn(getWarnMessage(2 /* CANNOT_FORMAT_NUMBER */));
        return MISSING_RESOLVE_VALUE;
    }
    const [key, value, options, orverrides] = parseNumberArgs(...args);
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = !!options.part;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key) || key === '') {
        return new Intl.NumberFormat(locale).format(value);
    }
    // resolve format
    let numberFormat = {};
    let targetLocale;
    let format = null;
    let from = locale;
    let to = null;
    const type = 'number format';
    for (let i = 0; i < locales.length; i++) {
        targetLocale = to = locales[i];
        if (
            locale !== targetLocale &&
            isTranslateFallbackWarn(fallbackWarn, key)) {
            onWarn(getWarnMessage(3 /* FALLBACK_TO_NUMBER_FORMAT */, {
                key,
                target: targetLocale
            }));
        }
        // for vue-devtools timeline event
        if ( locale !== targetLocale) {
            const emitter = context.__emitter;
            if (emitter) {
                emitter.emit("fallback" /* FALBACK */, {
                    type,
                    key,
                    from,
                    to
                });
            }
        }
        numberFormat =
            numberFormats[targetLocale] || {};
        format = numberFormat[key];
        if (isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, type);
        from = to;
    }
    // checking format and target locale
    if (!isPlainObject(format) || !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(orverrides)) {
        id = `${id}__${JSON.stringify(orverrides)}`;
    }
    let formatter = __numberFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.NumberFormat(targetLocale, Object.assign({}, format, orverrides));
        __numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
/** @internal */
function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let orverrides = {};
    if (!isNumber(arg1)) {
        throw createCoreError(12 /* INVALID_ARGUMENT */);
    }
    const value = arg1;
    if (isString(arg2)) {
        options.key = arg2;
    }
    else if (isPlainObject(arg2)) {
        options = arg2;
    }
    if (isString(arg3)) {
        options.locale = arg3;
    }
    else if (isPlainObject(arg3)) {
        orverrides = arg3;
    }
    if (isPlainObject(arg4)) {
        orverrides = arg4;
    }
    return [options.key || '', value, options, orverrides];
}
/** @internal */
function clearNumberFormat(ctx, locale, format) {
    const context = ctx;
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context.__numberFormatters.has(id)) {
            continue;
        }
        context.__numberFormatters.delete(id);
    }
}

const DevToolsLabels = {
    ["vue-devtools-plugin-vue-i18n" /* PLUGIN */]: 'Vue I18n devtools',
    ["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]: 'I18n Resources',
    ["vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */]: 'Vue I18n: Compile Errors',
    ["vue-i18n-missing" /* TIMELINE_MISSING */]: 'Vue I18n: Missing',
    ["vue-i18n-fallback" /* TIMELINE_FALLBACK */]: 'Vue I18n: Fallback',
    ["vue-i18n-performance" /* TIMELINE_PERFORMANCE */]: 'Vue I18n: Performance'
};
const DevToolsPlaceholders = {
    ["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]: 'Search for scopes ...'
};
const DevToolsTimelineColors = {
    ["vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */]: 0xff0000,
    ["vue-i18n-missing" /* TIMELINE_MISSING */]: 0xffcd19,
    ["vue-i18n-fallback" /* TIMELINE_FALLBACK */]: 0xffcd19,
    ["vue-i18n-performance" /* TIMELINE_PERFORMANCE */]: 0xffcd19
};
const DevToolsTimelineLayerMaps = {
    ["compile-error" /* COMPILE_ERROR */]: "vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */,
    ["missing" /* MISSING */]: "vue-i18n-missing" /* TIMELINE_MISSING */,
    ["fallback" /* FALBACK */]: "vue-i18n-fallback" /* TIMELINE_FALLBACK */,
    ["message-resolve" /* MESSAGE_RESOLVE */]: "vue-i18n-performance" /* TIMELINE_PERFORMANCE */,
    ["message-compilation" /* MESSAGE_COMPILATION */]: "vue-i18n-performance" /* TIMELINE_PERFORMANCE */,
    ["message-evaluation" /* MESSAGE_EVALUATION */]: "vue-i18n-performance" /* TIMELINE_PERFORMANCE */
};

/**
 * Event emitter, forked from the below:
 * - original repository url: https://github.com/developit/mitt
 * - code url: https://github.com/developit/mitt/blob/master/src/index.ts
 * - author: Jason Miller (https://github.com/developit)
 * - license: MIT
 */
/**
 * Create a event emitter
 *
 * @returns An event emitter
 */
function createEmitter() {
    const events = new Map();
    const emitter = {
        events,
        on(event, handler) {
            const handlers = events.get(event);
            const added = handlers && handlers.push(handler);
            if (!added) {
                events.set(event, [handler]);
            }
        },
        off(event, handler) {
            const handlers = events.get(event);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        emit(event, payload) {
            (events.get(event) || [])
                .slice()
                .map(handler => handler(payload));
            (events.get('*') || [])
                .slice()
                .map(handler => handler(event, payload));
        }
    };
    return emitter;
}

let devtools;
function setDevtoolsHook(hook) {
    devtools = hook;
}
function devtoolsRegisterI18n(i18n, version) {
    if (!devtools) {
        return;
    }
    devtools.emit("intlify:register" /* REGISTER */, i18n, version);
}
let devtoolsApi;
async function enableDevTools(app, i18n) {
    return new Promise((resolve, reject) => {
        try {
            lib.setupDevtoolsPlugin({
                id: "vue-devtools-plugin-vue-i18n" /* PLUGIN */,
                label: DevToolsLabels["vue-devtools-plugin-vue-i18n" /* PLUGIN */],
                app
            }, api => {
                devtoolsApi = api;
                api.on.inspectComponent(payload => {
                    const componentInstance = payload.componentInstance;
                    if (componentInstance.vnode.el.__INTLIFY__ &&
                        payload.instanceData) {
                        inspectComposer(payload.instanceData, componentInstance.vnode.el.__INTLIFY__);
                    }
                });
                api.addInspector({
                    id: "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */,
                    label: DevToolsLabels["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */],
                    icon: 'language',
                    treeFilterPlaceholder: DevToolsPlaceholders["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]
                });
                api.on.getInspectorTree(payload => {
                    if (payload.app === app &&
                        payload.inspectorId === "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */) {
                        registerScope(payload, i18n);
                    }
                });
                api.on.getInspectorState(payload => {
                    if (payload.app === app &&
                        payload.inspectorId === "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */) {
                        inspectScope(payload, i18n);
                    }
                });
                api.addTimelineLayer({
                    id: "vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */,
                    label: DevToolsLabels["vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */],
                    color: DevToolsTimelineColors["vue-i18n-compile-error" /* TIMELINE_COMPILE_ERROR */]
                });
                api.addTimelineLayer({
                    id: "vue-i18n-performance" /* TIMELINE_PERFORMANCE */,
                    label: DevToolsLabels["vue-i18n-performance" /* TIMELINE_PERFORMANCE */],
                    color: DevToolsTimelineColors["vue-i18n-performance" /* TIMELINE_PERFORMANCE */]
                });
                api.addTimelineLayer({
                    id: "vue-i18n-missing" /* TIMELINE_MISSING */,
                    label: DevToolsLabels["vue-i18n-missing" /* TIMELINE_MISSING */],
                    color: DevToolsTimelineColors["vue-i18n-missing" /* TIMELINE_MISSING */]
                });
                api.addTimelineLayer({
                    id: "vue-i18n-fallback" /* TIMELINE_FALLBACK */,
                    label: DevToolsLabels["vue-i18n-fallback" /* TIMELINE_FALLBACK */],
                    color: DevToolsTimelineColors["vue-i18n-fallback" /* TIMELINE_FALLBACK */]
                });
                resolve(true);
            });
        }
        catch (e) {
            console.error(e);
            reject(false);
        }
    });
}
function inspectComposer(instanceData, composer) {
    const type = 'vue-i18n: composer properties';
    instanceData.state.push({
        type,
        key: 'locale',
        editable: false,
        value: composer.locale.value
    });
    instanceData.state.push({
        type,
        key: 'availableLocales',
        editable: false,
        value: composer.availableLocales
    });
    instanceData.state.push({
        type,
        key: 'fallbackLocale',
        editable: false,
        value: composer.fallbackLocale.value
    });
    instanceData.state.push({
        type,
        key: 'inheritLocale',
        editable: false,
        value: composer.inheritLocale
    });
    instanceData.state.push({
        type,
        key: 'messages',
        editable: false,
        value: composer.messages.value
    });
    instanceData.state.push({
        type,
        key: 'datetimeFormats',
        editable: false,
        value: composer.datetimeFormats.value
    });
    instanceData.state.push({
        type,
        key: 'numberFormats',
        editable: false,
        value: composer.numberFormats.value
    });
}
function registerScope(payload, i18n) {
    const children = [];
    for (const [keyInstance, instance] of i18n.__instances) {
        // prettier-ignore
        const composer = i18n.mode === 'composition'
            ? instance
            : instance.__composer;
        const label = keyInstance.type.name ||
            keyInstance.type.displayName ||
            keyInstance.type.__file;
        children.push({
            id: composer.id.toString(),
            label: `${label} Scope`
        });
    }
    payload.rootNodes.push({
        id: 'global',
        label: 'Global Scope',
        children
    });
}
function inspectScope(payload, i18n) {
    if (payload.nodeId === 'global') {
        payload.state = makeScopeInspectState(i18n.mode === 'composition'
            ? i18n.global
            : i18n.global.__composer);
    }
    else {
        const instance = Array.from(i18n.__instances.values()).find(item => item.id.toString() === payload.nodeId);
        if (instance) {
            const composer = i18n.mode === 'composition'
                ? instance
                : instance.__composer;
            payload.state = makeScopeInspectState(composer);
        }
    }
}
function makeScopeInspectState(composer) {
    const state = {};
    const localeType = 'Locale related info';
    const localeStates = [
        {
            type: localeType,
            key: 'locale',
            editable: false,
            value: composer.locale.value
        },
        {
            type: localeType,
            key: 'fallbackLocale',
            editable: false,
            value: composer.fallbackLocale.value
        },
        {
            type: localeType,
            key: 'availableLocales',
            editable: false,
            value: composer.availableLocales
        },
        {
            type: localeType,
            key: 'inheritLocale',
            editable: false,
            value: composer.inheritLocale
        }
    ];
    state[localeType] = localeStates;
    const localeMessagesType = 'Locale messages info';
    const localeMessagesStates = [
        {
            type: localeMessagesType,
            key: 'messages',
            editable: false,
            value: composer.messages.value
        }
    ];
    state[localeMessagesType] = localeMessagesStates;
    const datetimeFormatsType = 'Datetime formats info';
    const datetimeFormatsStates = [
        {
            type: datetimeFormatsType,
            key: 'datetimeFormats',
            editable: false,
            value: composer.datetimeFormats.value
        }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = 'Datetime formats info';
    const numberFormatsStates = [
        {
            type: numberFormatsType,
            key: 'numberFormats',
            editable: false,
            value: composer.numberFormats.value
        }
    ];
    state[numberFormatsType] = numberFormatsStates;
    return state;
}
function addTimelineEvent(event, payload) {
    if (devtoolsApi) {
        devtoolsApi.addTimelineEvent({
            layerId: DevToolsTimelineLayerMaps[event],
            event: {
                time: Date.now(),
                meta: {},
                data: payload || {}
            }
        });
    }
}

/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
const VERSION = '9.0.0-beta.13';
/**
 * This is only called development env
 * istanbul-ignore-next
 */
function initDev() {
    const target = getGlobalThis();
    target.__INTLIFY__ = true;
    setDevtoolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
    {
        console.info(`You are running a development build of vue-i18n.\n` +
            `Make sure to use the production build (*.prod.js) when deploying for production.`);
    }
}

const warnMessages$1 = {
    [6 /* FALLBACK_TO_ROOT */]: `Fall back to {type} '{key}' with root locale.`,
    [7 /* NOT_SUPPORTED_PRESERVE */]: `Not supportted 'preserve'.`,
    [8 /* NOT_SUPPORTED_FORMATTER */]: `Not supportted 'formatter'.`,
    [9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */]: `Not supportted 'preserveDirectiveContent'.`,
    [10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */]: `Not supportted 'getChoiceIndex'.`,
    [11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */]: `Component name legacy compatible: '{name}' -> 'i18n'`,
    [12 /* NOT_FOUND_PARENT_SCOPE */]: `Not found parent scope. use the global scope.`
};
function getWarnMessage$1(code, ...args) {
    return format(warnMessages$1[code], ...args);
}

function createI18nError(code, ...args) {
    return createCompileError(code, null,  { messages: errorMessages$2, args } );
}
const errorMessages$2 = {
    [12 /* UNEXPECTED_RETURN_TYPE */]: 'Unexpected return type in composer',
    [13 /* INVALID_ARGUMENT */]: 'Invalid argument',
    [14 /* MUST_BE_CALL_SETUP_TOP */]: 'Must be called at the top of a `setup` function',
    [15 /* NOT_INSLALLED */]: 'Need to install with `app.use` function',
    [20 /* UNEXPECTED_ERROR */]: 'Unexpected error',
    [16 /* NOT_AVAILABLE_IN_LEGACY_MODE */]: 'Not available in legacy mode',
    [17 /* REQUIRED_VALUE */]: `Required in value: {0}`,
    [18 /* INVALID_VALUE */]: `Invalid value`,
    [19 /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */]: `Cannot setup vue-devtools plugin`
};

/**
 *  Composer
 *
 *  Composer is offered composable API for Vue 3
 *  This module is offered new style vue-i18n API
 */
const TransrateVNodeSymbol = makeSymbol('__transrateVNode');
const DatetimePartsSymbol = makeSymbol('__datetimeParts');
const NumberPartsSymbol = makeSymbol('__numberParts');
const EnableEmitter = makeSymbol('__enableEmitter');
const DisableEmitter = makeSymbol('__disableEmitter');
let composerID = 0;
function defineCoreMissingHandler(missing) {
    return ((ctx, locale, key, type) => {
        return missing(locale, key, getCurrentInstance() || undefined, type);
    });
}
function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    // prettier-ignore
    const ret = isPlainObject(messages)
        ? messages
        : isArray(__i18n)
            ? {}
            : { [locale]: {} };
    // merge locale messages of i18n custom block
    if (isArray(__i18n)) {
        __i18n.forEach(raw => {
            deepCopy(isString(raw) ? JSON.parse(raw) : raw, ret);
        });
        return ret;
    }
    if (isFunction(__i18n)) {
        const { functions } = __i18n();
        addPreCompileMessages(ret, functions);
    }
    return ret;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(source, destination) {
    for (const key in source) {
        if (hasOwn(source, key)) {
            if (!isObject(source[key])) {
                destination[key] = destination[key] != null ? destination[key] : {};
                destination[key] = source[key];
            }
            else {
                destination[key] = destination[key] != null ? destination[key] : {};
                deepCopy(source[key], destination[key]);
            }
        }
    }
}
function addPreCompileMessages(messages, functions) {
    const keys = Object.keys(functions);
    keys.forEach(key => {
        const compiled = functions[key];
        const { l, k } = JSON.parse(key);
        if (!messages[l]) {
            messages[l] = {};
        }
        const targetLocaleMessage = messages[l];
        const paths = parse(k);
        if (paths != null) {
            const len = paths.length;
            let last = targetLocaleMessage; // eslint-disable-line @typescript-eslint/no-explicit-any
            let i = 0;
            while (i < len) {
                const path = paths[i];
                if (i === len - 1) {
                    last[path] = compiled;
                    break;
                }
                else {
                    let val = last[path];
                    if (!val) {
                        last[path] = val = {};
                    }
                    last = val;
                    i++;
                }
            }
        }
    });
}
/**
 * Create composer interface factory
 *
 * @internal
 */
function createComposer(options = {}) {
    const { __root } = options;
    const _isGlobal = __root === undefined;
    let _inheritLocale = isBoolean(options.inheritLocale)
        ? options.inheritLocale
        : true;
    const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.locale.value
        : isString(options.locale)
            ? options.locale
            : 'en-US');
    const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.fallbackLocale.value
        : isString(options.fallbackLocale) ||
            isArray(options.fallbackLocale) ||
            isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = ref(isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [_locale.value]: {} });
    const _numberFormats = ref(isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [_locale.value]: {} });
    // warning suppress options
    // prettier-ignore
    let _missingWarn = __root
        ? __root.missingWarn
        : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    let _fallbackWarn = __root
        ? __root.fallbackWarn
        : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    let _fallbackRoot = isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    // configure fall bakck to root
    let _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing)
        ? defineCoreMissingHandler(options.missing)
        : null;
    // postTranslation handler
    let _postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    let _warnHtmlMessage = isBoolean(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    let _escapeParameter = !!options.escapeParameter;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root
        ? __root.modifiers
        : isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    const _pluralRules = options.pluralRules;
    // runtime context
    // eslint-disable-next-line prefer-const
    let _context;
    function getCoreContext() {
        return createCoreContext({
            locale: _locale.value,
            fallbackLocale: _fallbackLocale.value,
            messages: _messages.value,
            datetimeFormats: _datetimeFormats.value,
            numberFormats: _numberFormats.value,
            modifiers: _modifiers,
            pluralRules: _pluralRules,
            missing: _runtimeMissing === null ? undefined : _runtimeMissing,
            missingWarn: _missingWarn,
            fallbackWarn: _fallbackWarn,
            fallbackFormat: _fallbackFormat,
            unresolving: true,
            postTranslation: _postTranslation === null ? undefined : _postTranslation,
            warnHtmlMessage: _warnHtmlMessage,
            escapeParameter: _escapeParameter,
            __datetimeFormatters: isPlainObject(_context)
                ? _context.__datetimeFormatters
                : undefined,
            __numberFormatters: isPlainObject(_context)
                ? _context.__numberFormatters
                : undefined,
            __emitter: isPlainObject(_context)
                ? _context.__emitter
                : undefined
        });
    }
    _context = getCoreContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    /*!
     * define properties
     */
    // locale
    const locale = computed({
        get: () => _locale.value,
        set: val => {
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = computed({
        get: () => _fallbackLocale.value,
        set: val => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = computed(() => _messages.value);
    // datetimeFormats
    const datetimeFormats = computed(() => _datetimeFormats.value);
    // numberFormats
    const numberFormats = computed(() => _numberFormats.value);
    /**
     * define methods
     */
    // getPostTranslationHandler
    function getPostTranslationHandler() {
        return isFunction(_postTranslation) ? _postTranslation : null;
    }
    // setPostTranslationHandler
    function setPostTranslationHandler(handler) {
        _postTranslation = handler;
        _context.postTranslation = handler;
    }
    // getMissingHandler
    function getMissingHandler() {
        return _missing;
    }
    // setMissingHandler
    function setMissingHandler(handler) {
        if (handler !== null) {
            _runtimeMissing = defineCoreMissingHandler(handler);
        }
        _missing = handler;
        _context.missing = _runtimeMissing;
    }
    function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
        const context = getCoreContext();
        const ret = fn(context); // track reactive dependency, see the getRuntimeContext
        if (isNumber(ret) && ret === NOT_REOSLVED) {
            const key = argumentParser();
            if ( _fallbackRoot && __root) {
                warn(getWarnMessage$1(6 /* FALLBACK_TO_ROOT */, {
                    key,
                    type: warnType
                }));
                // for vue-devtools timeline event
                {
                    const { __emitter: emitter } = context;
                    if (emitter) {
                        emitter.emit("fallback" /* FALBACK */, {
                            type: warnType,
                            key,
                            to: 'global'
                        });
                    }
                }
            }
            return _fallbackRoot && __root
                ? fallbackSuccess(__root)
                : fallbackFail(key);
        }
        else if (successCondition(ret)) {
            return ret;
        }
        else {
            /* istanbul ignore next */
            throw createI18nError(12 /* UNEXPECTED_RETURN_TYPE */);
        }
    }
    // t
    function t(...args) {
        return wrapWithDeps(context => translate(context, ...args), () => parseTranslateArgs(...args)[0], 'translate', root => root.t(...args), key => key, val => isString(val));
    }
    // d
    function d(...args) {
        return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', root => root.d(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
    }
    // n
    function n(...args) {
        return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', root => root.n(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
    }
    // for custom processor
    function normalize(values) {
        return values.map(val => isString(val) ? createVNode(Text, null, val, 0) : val);
    }
    const interpolate = (val) => val;
    const processor = {
        normalize,
        interpolate,
        type: 'vnode'
    };
    // __transrateVNode, using for `i18n-t` component
    function __transrateVNode(...args) {
        return wrapWithDeps(context => {
            let ret;
            const _context = context;
            try {
                _context.processor = processor;
                ret = translate(_context, ...args);
            }
            finally {
                _context.processor = null;
            }
            return ret;
        }, () => parseTranslateArgs(...args)[0], 'translate', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[TransrateVNodeSymbol](...args), key => [createVNode(Text, null, key, 0)], val => isArray(val));
    }
    // __numberParts, using for `i18n-n` component
    function __numberParts(...args) {
        return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args)[0], 'number format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[NumberPartsSymbol](...args), () => [], val => isString(val) || isArray(val));
    }
    // __datetimeParts, using for `i18n-d` component
    function __datetimeParts(...args) {
        return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args)[0], 'datetime format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[DatetimePartsSymbol](...args), () => [], val => isString(val) || isArray(val));
    }
    // te
    function te(key, locale) {
        const targetLocale = isString(locale) ? locale : _locale.value;
        const message = getLocaleMessage(targetLocale);
        return resolveValue(message, key) !== null;
    }
    // tm
    function tm(key) {
        const messages = _messages.value[_locale.value] || {};
        const target = resolveValue(messages, key);
        // prettier-ignore
        return target != null
            ? target
            : __root
                ? __root.tm(key) || {}
                : {};
    }
    // getLocaleMessage
    function getLocaleMessage(locale) {
        return (_messages.value[locale] || {});
    }
    // setLocaleMessage
    function setLocaleMessage(locale, message) {
        _messages.value[locale] = message;
        _context.messages = _messages.value;
    }
    // mergeLocaleMessage
    function mergeLocaleMessage(locale, message) {
        _messages.value[locale] = Object.assign(_messages.value[locale] || {}, message);
        _context.messages = _messages.value;
    }
    // getDateTimeFormat
    function getDateTimeFormat(locale) {
        return _datetimeFormats.value[locale] || {};
    }
    // setDateTimeFormat
    function setDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = format;
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    }
    // mergeDateTimeFormat
    function mergeDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = Object.assign(_datetimeFormats.value[locale] || {}, format);
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    }
    // getNumberFormat
    function getNumberFormat(locale) {
        return _numberFormats.value[locale] || {};
    }
    // setNumberFormat
    function setNumberFormat(locale, format) {
        _numberFormats.value[locale] = format;
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    }
    // mergeNumberFormat
    function mergeNumberFormat(locale, format) {
        _numberFormats.value[locale] = Object.assign(_numberFormats.value[locale] || {}, format);
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    }
    // for debug
    composerID++;
    // watch root locale & fallbackLocale
    if (__root) {
        watch(__root.locale, (val) => {
            if (_inheritLocale) {
                _locale.value = val;
                _context.locale = val;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
        watch(__root.fallbackLocale, (val) => {
            if (_inheritLocale) {
                _fallbackLocale.value = val;
                _context.fallbackLocale = val;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
    }
    // export composition API!
    const composer = {
        // properties
        id: composerID,
        locale,
        fallbackLocale,
        get inheritLocale() {
            return _inheritLocale;
        },
        set inheritLocale(val) {
            _inheritLocale = val;
            if (val && __root) {
                _locale.value = __root.locale.value;
                _fallbackLocale.value = __root.fallbackLocale.value;
                updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        },
        get availableLocales() {
            return Object.keys(_messages.value).sort();
        },
        messages,
        datetimeFormats,
        numberFormats,
        get modifiers() {
            return _modifiers;
        },
        get pluralRules() {
            return _pluralRules || {};
        },
        get isGlobal() {
            return _isGlobal;
        },
        get missingWarn() {
            return _missingWarn;
        },
        set missingWarn(val) {
            _missingWarn = val;
            _context.missingWarn = _missingWarn;
        },
        get fallbackWarn() {
            return _fallbackWarn;
        },
        set fallbackWarn(val) {
            _fallbackWarn = val;
            _context.fallbackWarn = _fallbackWarn;
        },
        get fallbackRoot() {
            return _fallbackRoot;
        },
        set fallbackRoot(val) {
            _fallbackRoot = val;
        },
        get fallbackFormat() {
            return _fallbackFormat;
        },
        set fallbackFormat(val) {
            _fallbackFormat = val;
            _context.fallbackFormat = _fallbackFormat;
        },
        get warnHtmlMessage() {
            return _warnHtmlMessage;
        },
        set warnHtmlMessage(val) {
            _warnHtmlMessage = val;
            _context.warnHtmlMessage = val;
        },
        get escapeParameter() {
            return _escapeParameter;
        },
        set escapeParameter(val) {
            _escapeParameter = val;
            _context.escapeParameter = val;
        },
        // methods
        t,
        d,
        n,
        te,
        tm,
        getLocaleMessage,
        setLocaleMessage,
        mergeLocaleMessage,
        getDateTimeFormat,
        setDateTimeFormat,
        mergeDateTimeFormat,
        getNumberFormat,
        setNumberFormat,
        mergeNumberFormat,
        getPostTranslationHandler,
        setPostTranslationHandler,
        getMissingHandler,
        setMissingHandler,
        [TransrateVNodeSymbol]: __transrateVNode,
        [NumberPartsSymbol]: __numberParts,
        [DatetimePartsSymbol]: __datetimeParts
    };
    // for vue-devtools timeline event
    {
        composer[EnableEmitter] = (emitter) => {
            _context.__emitter = emitter;
        };
        composer[DisableEmitter] = () => {
            _context.__emitter = undefined;
        };
    }
    return composer;
}

/**
 *  Legacy
 *
 *  This module is offered legacy vue-i18n API compatibility
 */
/**
 * Convert to I18n Composer Options from VueI18n Options
 *
 * @internal
 */
function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = isString(options.fallbackLocale) ||
        isArray(options.fallbackLocale) ||
        isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const missing = isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = isBoolean(options.silentTranslationWarn) ||
        isRegExp(options.silentTranslationWarn)
        ? !options.silentTranslationWarn
        : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) ||
        isRegExp(options.silentFallbackWarn)
        ? !options.silentFallbackWarn
        : true;
    const fallbackRoot = isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : undefined;
    const warnHtmlMessage = isString(options.warnHtmlInMessage)
        ? options.warnHtmlInMessage !== 'off'
        : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = isBoolean(options.sync) ? options.sync : true;
    if ( options.formatter) {
        warn(getWarnMessage$1(8 /* NOT_SUPPORTED_FORMATTER */));
    }
    if ( options.preserveDirectiveContent) {
        warn(getWarnMessage$1(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
        const sharedMessages = options.sharedMessages;
        const locales = Object.keys(sharedMessages);
        messages = locales.reduce((messages, locale) => {
            const message = messages[locale] || (messages[locale] = {});
            Object.assign(message, sharedMessages[locale]);
            return messages;
        }, (messages || {}));
    }
    const { __i18n, __root } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    return {
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackRoot,
        fallbackFormat,
        modifiers,
        pluralRules: pluralizationRules,
        postTranslation,
        warnHtmlMessage,
        escapeParameter,
        inheritLocale,
        __i18n,
        __root
    };
}
/**
 * create VueI18n interface factory
 *
 * @internal
 */
function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    // defines VueI18n
    const vueI18n = {
        /**
         * properties
         */
        // id
        id: composer.id,
        // locale
        get locale() {
            return composer.locale.value;
        },
        set locale(val) {
            composer.locale.value = val;
        },
        // fallbackLocale
        get fallbackLocale() {
            return composer.fallbackLocale.value;
        },
        set fallbackLocale(val) {
            composer.fallbackLocale.value = val;
        },
        // messages
        get messages() {
            return composer.messages.value;
        },
        // datetimeFormats
        get datetimeFormats() {
            return composer.datetimeFormats.value;
        },
        // numberFormats
        get numberFormats() {
            return composer.numberFormats.value;
        },
        // availableLocales
        get availableLocales() {
            return composer.availableLocales;
        },
        // formatter
        get formatter() {
             warn(getWarnMessage$1(8 /* NOT_SUPPORTED_FORMATTER */));
            // dummy
            return {
                interpolate() {
                    return [];
                }
            };
        },
        set formatter(val) {
             warn(getWarnMessage$1(8 /* NOT_SUPPORTED_FORMATTER */));
        },
        // missing
        get missing() {
            return composer.getMissingHandler();
        },
        set missing(handler) {
            composer.setMissingHandler(handler);
        },
        // silentTranslationWarn
        get silentTranslationWarn() {
            return isBoolean(composer.missingWarn)
                ? !composer.missingWarn
                : composer.missingWarn;
        },
        set silentTranslationWarn(val) {
            composer.missingWarn = isBoolean(val) ? !val : val;
        },
        // silentFallbackWarn
        get silentFallbackWarn() {
            return isBoolean(composer.fallbackWarn)
                ? !composer.fallbackWarn
                : composer.fallbackWarn;
        },
        set silentFallbackWarn(val) {
            composer.fallbackWarn = isBoolean(val) ? !val : val;
        },
        // modifiers
        get modifiers() {
            return composer.modifiers;
        },
        // formatFallbackMessages
        get formatFallbackMessages() {
            return composer.fallbackFormat;
        },
        set formatFallbackMessages(val) {
            composer.fallbackFormat = val;
        },
        // postTranslation
        get postTranslation() {
            return composer.getPostTranslationHandler();
        },
        set postTranslation(handler) {
            composer.setPostTranslationHandler(handler);
        },
        // sync
        get sync() {
            return composer.inheritLocale;
        },
        set sync(val) {
            composer.inheritLocale = val;
        },
        // warnInHtmlMessage
        get warnHtmlInMessage() {
            return composer.warnHtmlMessage ? 'warn' : 'off';
        },
        set warnHtmlInMessage(val) {
            composer.warnHtmlMessage = val !== 'off';
        },
        // escapeParameterHtml
        get escapeParameterHtml() {
            return composer.escapeParameter;
        },
        set escapeParameterHtml(val) {
            composer.escapeParameter = val;
        },
        // preserveDirectiveContent
        get preserveDirectiveContent() {
            
                warn(getWarnMessage$1(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
            return true;
        },
        set preserveDirectiveContent(val) {
            
                warn(getWarnMessage$1(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
        },
        // pluralizationRules
        get pluralizationRules() {
            return composer.pluralRules || {};
        },
        // for internal
        __composer: composer,
        /**
         * methods
         */
        // t
        t(...args) {
            const [arg1, arg2, arg3] = args;
            const options = {};
            let list = null;
            let named = null;
            if (!isString(arg1)) {
                throw createI18nError(13 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (isString(arg2)) {
                options.locale = arg2;
            }
            else if (isArray(arg2)) {
                list = arg2;
            }
            else if (isPlainObject(arg2)) {
                named = arg2;
            }
            if (isArray(arg3)) {
                list = arg3;
            }
            else if (isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        // tc
        tc(...args) {
            const [arg1, arg2, arg3] = args;
            const options = { plural: 1 };
            let list = null;
            let named = null;
            if (!isString(arg1)) {
                throw createI18nError(13 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (isString(arg2)) {
                options.locale = arg2;
            }
            else if (isNumber(arg2)) {
                options.plural = arg2;
            }
            else if (isArray(arg2)) {
                list = arg2;
            }
            else if (isPlainObject(arg2)) {
                named = arg2;
            }
            if (isString(arg3)) {
                options.locale = arg3;
            }
            else if (isArray(arg3)) {
                list = arg3;
            }
            else if (isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        // te
        te(key, locale) {
            return composer.te(key, locale);
        },
        // tm
        tm(key) {
            return composer.tm(key);
        },
        // getLocaleMessage
        getLocaleMessage(locale) {
            return composer.getLocaleMessage(locale);
        },
        // setLocaleMessage
        setLocaleMessage(locale, message) {
            composer.setLocaleMessage(locale, message);
        },
        // mergeLocaleMessasge
        mergeLocaleMessage(locale, message) {
            composer.mergeLocaleMessage(locale, message);
        },
        // d
        d(...args) {
            return composer.d(...args);
        },
        // getDateTimeFormat
        getDateTimeFormat(locale) {
            return composer.getDateTimeFormat(locale);
        },
        // setDateTimeFormat
        setDateTimeFormat(locale, format) {
            composer.setDateTimeFormat(locale, format);
        },
        // mergeDateTimeFormat
        mergeDateTimeFormat(locale, format) {
            composer.mergeDateTimeFormat(locale, format);
        },
        // n
        n(...args) {
            return composer.n(...args);
        },
        // getNumberFormat
        getNumberFormat(locale) {
            return composer.getNumberFormat(locale);
        },
        // setNumberFormat
        setNumberFormat(locale, format) {
            composer.setNumberFormat(locale, format);
        },
        // mergeNumberFormat
        mergeNumberFormat(locale, format) {
            composer.mergeNumberFormat(locale, format);
        },
        // getChoiceIndex
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getChoiceIndex(choice, choicesLength) {
            
                warn(getWarnMessage$1(10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */));
            return -1;
        },
        // for internal
        __onComponentInstanceCreated(target) {
            const { componentInstanceCreatedListener } = options;
            if (componentInstanceCreatedListener) {
                componentInstanceCreatedListener(target, vueI18n);
            }
        }
    };
    // for vue-devtools timeline event
    {
        vueI18n.__enableEmitter = (emitter) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const __composer = composer;
            __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
        };
        vueI18n.__disableEmitter = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const __composer = composer;
            __composer[DisableEmitter] && __composer[DisableEmitter]();
        };
    }
    return vueI18n;
}

const baseFormatProps = {
    tag: {
        type: [String, Object]
    },
    locale: {
        type: String
    },
    scope: {
        type: String,
        validator: (val) => val === 'parent' || val === 'global',
        default: 'parent'
    }
};

/**
 * Translation Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [TranslationProps](component#translationprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Component Interpolation](../advanced/component)
 *
 * @example
 * ```html
 * <div id="app">
 *   <!-- ... -->
 *   <i18n path="term" tag="label" for="tos">
 *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
 *   </i18n>
 *   <!-- ... -->
 * </div>
 * ```
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * const messages = {
 *   en: {
 *     tos: 'Term of Service',
 *     term: 'I accept xxx {0}.'
 *   },
 *   ja: {
 *     tos: '利用規約',
 *     term: '私は xxx の{0}に同意します。'
 *   }
 * }
 *
 * const i18n = createI18n({
 *   locale: 'en',
 *   messages
 * })
 *
 * const app = createApp({
 *   data: {
 *     url: '/term'
 *   }
 * }).use(i18n).mount('#app')
 * ```
 *
 * @VueI18nComponent
 */
const Translation = {
    /* eslint-disable */
    name: 'i18n-t',
    props: {
        ...baseFormatProps,
        keypath: {
            type: String,
            required: true
        },
        plural: {
            type: [Number, String],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val) => isNumber(val) || !isNaN(val)
        }
    },
    /* eslint-enable */
    setup(props, context) {
        const { slots, attrs } = context;
        const i18n = useI18n({ useScope: props.scope });
        const keys = Object.keys(slots).filter(key => key !== '_');
        return () => {
            const options = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (props.plural !== undefined) {
                options.plural = isString(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
            // prettier-ignore
            return isString(props.tag)
                ? h(props.tag, { ...attrs }, children)
                : isObject(props.tag)
                    ? h(props.tag, { ...attrs }, children)
                    : h(Fragment, { ...attrs }, children);
        };
    }
};
function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === 'default') {
        // default slot only
        return slots.default ? slots.default() : [];
    }
    else {
        // named slots
        return keys.reduce((arg, key) => {
            const slot = slots[key];
            if (slot) {
                arg[key] = slot();
            }
            return arg;
        }, {});
    }
}

function renderFormatter(props, context, slotKeys, partFormatter) {
    const { slots, attrs } = context;
    return () => {
        const options = { part: true };
        let orverrides = {};
        if (props.locale) {
            options.locale = props.locale;
        }
        if (isString(props.format)) {
            options.key = props.format;
        }
        else if (isObject(props.format)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (isString(props.format.key)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                options.key = props.format.key;
            }
            // Filter out number format options only
            orverrides = Object.keys(props.format).reduce((options, prop) => {
                return slotKeys.includes(prop)
                    ? Object.assign({}, options, { [prop]: props.format[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
                    : options;
            }, {});
        }
        const parts = partFormatter(...[props.value, options, orverrides]);
        let children = [options.key];
        if (isArray(parts)) {
            children = parts.map((part, index) => {
                const slot = slots[part.type];
                return slot
                    ? slot({ [part.type]: part.value, index, parts })
                    : [part.value];
            });
        }
        else if (isString(parts)) {
            children = [parts];
        }
        // prettier-ignore
        return isString(props.tag)
            ? h(props.tag, { ...attrs }, children)
            : isObject(props.tag)
                ? h(props.tag, { ...attrs }, children)
                : h(Fragment, { ...attrs }, children);
    };
}

const NUMBER_FORMAT_KEYS = [
    'localeMatcher',
    'style',
    'unit',
    'unitDisplay',
    'currency',
    'currencyDisplay',
    'useGrouping',
    'numberingSystem',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'notation',
    'formatMatcher'
];
/**
 * Number Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../essentials/number#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.NumberForamt#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
 *
 * @VueI18nComponent
 */
const NumberFormat = {
    /* eslint-disable */
    name: 'i18n-n',
    props: {
        ...baseFormatProps,
        value: {
            type: Number,
            required: true
        },
        format: {
            type: [String, Object]
        }
    },
    /* eslint-enable */
    setup(props, context) {
        const i18n = useI18n({ useScope: 'parent' });
        return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[NumberPartsSymbol](...args));
    }
};

const DATETIME_FORMAT_KEYS = [
    'dateStyle',
    'timeStyle',
    'fractionalSecondDigits',
    'calendar',
    'dayPeriod',
    'numberingSystem',
    'localeMatcher',
    'timeZone',
    'hour12',
    'hourCycle',
    'formatMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName'
];
/**
 * Datetime Format Component
 *
 * @remarks
 * See the following items for property about details
 *
 * @VueI18nSee [FormattableProps](component#formattableprops)
 * @VueI18nSee [BaseFormatProps](component#baseformatprops)
 * @VueI18nSee [Custom Formatting](../essentials/datetime#custom-formatting)
 *
 * @VueI18nDanger
 * Not supported IE, due to no support `Intl.DateTimeForamt#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
 *
 * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
 *
 * @VueI18nComponent
 */
const DatetimeFormat = {
    /* eslint-disable */
    name: 'i18n-d',
    props: {
        ...baseFormatProps,
        value: {
            type: [Number, Date],
            required: true
        },
        format: {
            type: [String, Object]
        }
    },
    /* eslint-enable */
    setup(props, context) {
        const i18n = useI18n({ useScope: 'parent' });
        return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        i18n[DatetimePartsSymbol](...args));
    }
};

function getComposer(i18n, instance) {
    const i18nInternal = i18n;
    if (i18n.mode === 'composition') {
        return (i18nInternal.__getInstance(instance) || i18n.global);
    }
    else {
        const vueI18n = i18nInternal.__getInstance(instance);
        return vueI18n != null
            ? vueI18n.__composer
            : i18n.global.__composer;
    }
}
function vTDirective(i18n) {
    const bind = (el, { instance, value, modifiers }) => {
        /* istanbul ignore if */
        if (!instance || !instance.$) {
            throw createI18nError(20 /* UNEXPECTED_ERROR */);
        }
        const composer = getComposer(i18n, instance.$);
        if ( modifiers.preserve) {
            warn(getWarnMessage$1(7 /* NOT_SUPPORTED_PRESERVE */));
        }
        const parsedValue = parseValue(value);
        el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
        beforeMount: bind,
        beforeUpdate: bind
    };
}
function parseValue(value) {
    if (isString(value)) {
        return { path: value };
    }
    else if (isPlainObject(value)) {
        if (!('path' in value)) {
            throw createI18nError(17 /* REQUIRED_VALUE */, 'path');
        }
        return value;
    }
    else {
        throw createI18nError(18 /* INVALID_VALUE */);
    }
}
function makeParams(value) {
    const { path, locale, args, choice, plural } = value;
    const options = {};
    const named = args || {};
    if (isString(locale)) {
        options.locale = locale;
    }
    if (isNumber(choice)) {
        options.plural = choice;
    }
    if (isNumber(plural)) {
        options.plural = plural;
    }
    return [path, named, options];
}

function apply(app, i18n, ...options) {
    const pluginOptions = isPlainObject(options[0])
        ? options[0]
        : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = isBoolean(pluginOptions.globalInstall)
        ? pluginOptions.globalInstall
        : true;
    if ( globalInstall && useI18nComponentName) {
        warn(getWarnMessage$1(11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */, {
            name: Translation.name
        }));
    }
    if (globalInstall) {
        // install components
        app.component(!useI18nComponentName ? Translation.name : 'i18n', Translation);
        app.component(NumberFormat.name, NumberFormat);
        app.component(DatetimeFormat.name, DatetimeFormat);
    }
    // install directive
    app.directive('t', vTDirective(i18n));
}

// supports compatibility for legacy vue-i18n APIs
function defineMixin(vuei18n, composer, i18n) {
    return {
        beforeCreate() {
            const instance = getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(20 /* UNEXPECTED_ERROR */);
            }
            const options = this.$options;
            if (options.i18n) {
                const optionsI18n = options.i18n;
                if (options.__i18n) {
                    optionsI18n.__i18n = options.__i18n;
                }
                optionsI18n.__root = composer;
                if (this === this.$root) {
                    this.$i18n = mergeToRoot(vuei18n, optionsI18n);
                }
                else {
                    this.$i18n = createVueI18n(optionsI18n);
                }
            }
            else if (options.__i18n) {
                if (this === this.$root) {
                    this.$i18n = mergeToRoot(vuei18n, options);
                }
                else {
                    this.$i18n = createVueI18n({
                        __i18n: options.__i18n,
                        __root: composer
                    });
                }
            }
            else {
                // set global
                this.$i18n = vuei18n;
            }
            vuei18n.__onComponentInstanceCreated(this.$i18n);
            i18n.__setInstance(instance, this.$i18n);
            // defines vue-i18n legacy APIs
            this.$t = (...args) => this.$i18n.t(...args);
            this.$tc = (...args) => this.$i18n.tc(...args);
            this.$te = (key, locale) => this.$i18n.te(key, locale);
            this.$d = (...args) => this.$i18n.d(...args);
            this.$n = (...args) => this.$i18n.n(...args);
            this.$tm = (key) => this.$i18n.tm(key);
        },
        mounted() {
            /* istanbul ignore if */
            {
                this.$el.__INTLIFY__ = this.$i18n.__composer;
                const emitter = (this.__emitter = createEmitter());
                const _vueI18n = this.$i18n;
                _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                emitter.on('*', addTimelineEvent);
            }
        },
        beforeUnmount() {
            const instance = getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(20 /* UNEXPECTED_ERROR */);
            }
            /* istanbul ignore if */
            {
                if (this.__emitter) {
                    this.__emitter.off('*', addTimelineEvent);
                    delete this.__emitter;
                }
                const _vueI18n = this.$i18n;
                _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
                delete this.$el.__INTLIFY__;
            }
            delete this.$t;
            delete this.$tc;
            delete this.$te;
            delete this.$d;
            delete this.$n;
            delete this.$tm;
            i18n.__deleteInstance(instance);
            delete this.$i18n;
        }
    };
}
function mergeToRoot(root, optoins) {
    root.locale = optoins.locale || root.locale;
    root.fallbackLocale = optoins.fallbackLocale || root.fallbackLocale;
    root.missing = optoins.missing || root.missing;
    root.silentTranslationWarn =
        optoins.silentTranslationWarn || root.silentFallbackWarn;
    root.silentFallbackWarn =
        optoins.silentFallbackWarn || root.silentFallbackWarn;
    root.formatFallbackMessages =
        optoins.formatFallbackMessages || root.formatFallbackMessages;
    root.postTranslation = optoins.postTranslation || root.postTranslation;
    root.warnHtmlInMessage = optoins.warnHtmlInMessage || root.warnHtmlInMessage;
    root.escapeParameterHtml =
        optoins.escapeParameterHtml || root.escapeParameterHtml;
    root.sync = optoins.sync || root.sync;
    const messages = getLocaleMessages(root.locale, {
        messages: optoins.messages,
        __i18n: optoins.__i18n
    });
    Object.keys(messages).forEach(locale => root.mergeLocaleMessage(locale, messages[locale]));
    if (optoins.datetimeFormats) {
        Object.keys(optoins.datetimeFormats).forEach(locale => root.mergeDateTimeFormat(locale, optoins.datetimeFormats[locale]));
    }
    if (optoins.numberFormats) {
        Object.keys(optoins.numberFormats).forEach(locale => root.mergeNumberFormat(locale, optoins.numberFormats[locale]));
    }
    return root;
}

/**
 * Vue I18n factory
 *
 * @param options - An options, see the {@link I18nOptions}
 *
 * @returns {@link I18n} instance
 *
 * @remarks
 * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
 *
 * If you use composition API mode, you need to specify {@link ComposerOptions}.
 *
 * @VueI18nSee [Getting Started](../essentials/started)
 * @VueI18nSee [Composition API](../advanced/composition)
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for composition API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: false, // you must specify 'lagacy: false' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @VueI18nGeneral
 */
function createI18n(options = {}) {
    // prettier-ignore
    const __legacyMode =  isBoolean(options.legacy)
        ? options.legacy
        : true;
    const __globalInjection =  !!options.globalInjection;
    const __instances = new Map();
    // prettier-ignore
    const __global =  __legacyMode
        ? createVueI18n(options)
        : createComposer(options);
    const symbol = makeSymbol( 'vue-i18n' );
    const i18n = {
        // mode
        get mode() {
            // prettier-ignore
            return  __legacyMode
                    ? 'legacy'
                    : 'composition'
                ;
        },
        // install plugin
        async install(app, ...options) {
            {
                app.__VUE_I18N__ = i18n;
            }
            // setup global provider
            app.__VUE_I18N_SYMBOL__ = symbol;
            app.provide(app.__VUE_I18N_SYMBOL__, i18n);
            // global method and properties injection for Composition API
            if (!__legacyMode && __globalInjection) {
                injectGlobalFields(app, i18n.global);
            }
            // install built-in components and directive
            {
                apply(app, i18n, ...options);
            }
            // setup mixin for Legacy API
            if ( __legacyMode) {
                app.mixin(defineMixin(__global, __global.__composer, i18n));
            }
            // setup vue-devtools plugin
            {
                const ret = await enableDevTools(app, i18n);
                if (!ret) {
                    throw createI18nError(19 /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */);
                }
                const emitter = createEmitter();
                if (__legacyMode) {
                    const _vueI18n = __global;
                    _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const _composer = __global;
                    _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
                }
                emitter.on('*', addTimelineEvent);
            }
        },
        // global accsessor
        get global() {
            return __global;
        },
        // @internal
        __instances,
        // @internal
        __getInstance(component) {
            return __instances.get(component) || null;
        },
        // @internal
        __setInstance(component, instance) {
            __instances.set(component, instance);
        },
        // @internal
        __deleteInstance(component) {
            __instances.delete(component);
        }
    };
    {
        devtoolsRegisterI18n(i18n, VERSION);
    }
    return i18n;
}
/**
 * Use Composition API for Vue I18n
 *
 * @param options - An options, see {@link UseI18nOptions}
 *
 * @returns {@link Composer} instance
 *
 * @remarks
 * This function is mainly used by `setup`.
 *
 * If options are specified, Composer instance is created for each component and you can be localized on the component.
 *
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 *
 * @VueI18nComposition
 */
function useI18n(options = {}) {
    const instance = getCurrentInstance();
    if (instance == null) {
        throw createI18nError(14 /* MUST_BE_CALL_SETUP_TOP */);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
        throw createI18nError(15 /* NOT_INSLALLED */);
    }
    const i18n = inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    /* istanbul ignore if */
    if (!i18n) {
        throw createI18nError(20 /* UNEXPECTED_ERROR */);
    }
    // prettier-ignore
    const global = i18n.mode === 'composition'
        ? i18n.global
        : i18n.global.__composer;
    // prettier-ignore
    const scope = isEmptyObject(options)
        ? ('__i18n' in instance.type)
            ? 'local'
            : 'global'
        : !options.useScope
            ? 'local'
            : options.useScope;
    if (scope === 'global') {
        let messages = isObject(options.messages) ? options.messages : {};
        if ('__i18nGlobal' in instance.type) {
            messages = getLocaleMessages(global.locale.value, {
                messages,
                __i18n: instance.type.__i18nGlobal
            });
        }
        // merge locale messages
        const locales = Object.keys(messages);
        if (locales.length) {
            locales.forEach(locale => {
                global.mergeLocaleMessage(locale, messages[locale]);
            });
        }
        // merge datetime formats
        if (isObject(options.datetimeFormats)) {
            const locales = Object.keys(options.datetimeFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
                });
            }
        }
        // merge number formats
        if (isObject(options.numberFormats)) {
            const locales = Object.keys(options.numberFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    global.mergeNumberFormat(locale, options.numberFormats[locale]);
                });
            }
        }
        return global;
    }
    if (scope === 'parent') {
        let composer = getComposer$1(i18n, instance);
        if (composer == null) {
            {
                warn(getWarnMessage$1(12 /* NOT_FOUND_PARENT_SCOPE */));
            }
            composer = global;
        }
        return composer;
    }
    // scope 'local' case
    if (i18n.mode === 'legacy') {
        throw createI18nError(16 /* NOT_AVAILABLE_IN_LEGACY_MODE */);
    }
    const i18nInternal = i18n;
    let composer = i18nInternal.__getInstance(instance);
    if (composer == null) {
        const type = instance.type;
        const composerOptions = {
            ...options
        };
        if (type.__i18n) {
            composerOptions.__i18n = type.__i18n;
        }
        if (global) {
            composerOptions.__root = global;
        }
        composer = createComposer(composerOptions);
        setupLifeCycle(i18nInternal, instance, composer);
        i18nInternal.__setInstance(instance, composer);
    }
    return composer;
}
function getComposer$1(i18n, target) {
    let composer = null;
    const root = target.root;
    let current = target.parent;
    while (current != null) {
        const i18nInternal = i18n;
        if (i18n.mode === 'composition') {
            composer = i18nInternal.__getInstance(current);
        }
        else {
            const vueI18n = i18nInternal.__getInstance(current);
            if (vueI18n != null) {
                composer = vueI18n
                    .__composer;
            }
        }
        if (composer != null) {
            break;
        }
        if (root === current) {
            break;
        }
        current = current.parent;
    }
    return composer;
}
function setupLifeCycle(i18n, target, composer) {
    let emitter = null;
    onMounted(() => {
        // inject composer instance to DOM for intlify-devtools
        if (
            target.vnode.el) {
            target.vnode.el.__INTLIFY__ = composer;
            emitter = createEmitter();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _composer = composer;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
            emitter.on('*', addTimelineEvent);
        }
    }, target);
    onUnmounted(() => {
        // remove composer instance from DOM for intlify-devtools
        if (
            target.vnode.el &&
            target.vnode.el.__INTLIFY__) {
            emitter && emitter.off('*', addTimelineEvent);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const _composer = composer;
            _composer[DisableEmitter] && _composer[DisableEmitter]();
            delete target.vnode.el.__INTLIFY__;
        }
        i18n.__deleteInstance(target);
    }, target);
}
const globalExportProps = [
    'locale',
    'fallbackLocale',
    'availableLocales'
];
const globalExportMethods = ['t', 'd', 'n', 'tm'];
function injectGlobalFields(app, composer) {
    const i18n = Object.create(null);
    globalExportProps.forEach(prop => {
        const desc = Object.getOwnPropertyDescriptor(composer, prop);
        if (!desc) {
            throw createI18nError(20 /* UNEXPECTED_ERROR */);
        }
        const wrap = isRef(desc.value) // check computed props
            ? {
                get() {
                    return desc.value.value;
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                set(val) {
                    desc.value.value = val;
                }
            }
            : {
                get() {
                    return desc.get && desc.get();
                }
            };
        Object.defineProperty(i18n, prop, wrap);
    });
    app.config.globalProperties.$i18n = i18n;
    globalExportMethods.forEach(method => {
        const desc = Object.getOwnPropertyDescriptor(composer, method);
        if (!desc) {
            throw createI18nError(20 /* UNEXPECTED_ERROR */);
        }
        Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
    });
}

initDev();

export { DatetimeFormat, NumberFormat, Translation, VERSION, createI18n, useI18n, vTDirective };
