/*!
  * vue-i18n v9.0.0-beta.13
  * (c) 2020 kazuya kawaguchi
  * Released under the MIT License.
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var shared = require('@intlify/shared');
var coreBase = require('@intlify/core-base');
var vue = require('vue');

/**
 * Vue I18n Version
 *
 * @remarks
 * Semver format. Same format as the package.json `version` field.
 *
 * @VueI18nGeneral
 */
const VERSION = '9.0.0-beta.13';

function createI18nError(code, ...args) {
    return coreBase.createCompileError(code, null,  undefined);
}

/**
 *  Composer
 *
 *  Composer is offered composable API for Vue 3
 *  This module is offered new style vue-i18n API
 */
const TransrateVNodeSymbol = shared.makeSymbol('__transrateVNode');
const DatetimePartsSymbol = shared.makeSymbol('__datetimeParts');
const NumberPartsSymbol = shared.makeSymbol('__numberParts');
const EnableEmitter = shared.makeSymbol('__enableEmitter');
const DisableEmitter = shared.makeSymbol('__disableEmitter');
let composerID = 0;
function defineCoreMissingHandler(missing) {
    return ((ctx, locale, key, type) => {
        return missing(locale, key, vue.getCurrentInstance() || undefined, type);
    });
}
function getLocaleMessages(locale, options) {
    const { messages, __i18n } = options;
    // prettier-ignore
    const ret = shared.isPlainObject(messages)
        ? messages
        : shared.isArray(__i18n)
            ? {}
            : { [locale]: {} };
    // merge locale messages of i18n custom block
    if (shared.isArray(__i18n)) {
        __i18n.forEach(raw => {
            deepCopy(shared.isString(raw) ? JSON.parse(raw) : raw, ret);
        });
        return ret;
    }
    if (shared.isFunction(__i18n)) {
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
            if (!shared.isObject(source[key])) {
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
        const paths = coreBase.parse(k);
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
    let _inheritLocale = shared.isBoolean(options.inheritLocale)
        ? options.inheritLocale
        : true;
    const _locale = vue.ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.locale.value
        : shared.isString(options.locale)
            ? options.locale
            : 'en-US');
    const _fallbackLocale = vue.ref(
    // prettier-ignore
    __root && _inheritLocale
        ? __root.fallbackLocale.value
        : shared.isString(options.fallbackLocale) ||
            shared.isArray(options.fallbackLocale) ||
            shared.isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = vue.ref(getLocaleMessages(_locale.value, options));
    const _datetimeFormats = vue.ref(shared.isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [_locale.value]: {} });
    const _numberFormats = vue.ref(shared.isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [_locale.value]: {} });
    // warning suppress options
    // prettier-ignore
    let _missingWarn = __root
        ? __root.missingWarn
        : shared.isBoolean(options.missingWarn) || shared.isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    let _fallbackWarn = __root
        ? __root.fallbackWarn
        : shared.isBoolean(options.fallbackWarn) || shared.isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    let _fallbackRoot = shared.isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    // configure fall bakck to root
    let _fallbackFormat = !!options.fallbackFormat;
    // runtime missing
    let _missing = shared.isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = shared.isFunction(options.missing)
        ? defineCoreMissingHandler(options.missing)
        : null;
    // postTranslation handler
    let _postTranslation = shared.isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    let _warnHtmlMessage = shared.isBoolean(options.warnHtmlMessage)
        ? options.warnHtmlMessage
        : true;
    let _escapeParameter = !!options.escapeParameter;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root
        ? __root.modifiers
        : shared.isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    const _pluralRules = options.pluralRules;
    // runtime context
    // eslint-disable-next-line prefer-const
    let _context;
    function getCoreContext() {
        return coreBase.createCoreContext({
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
            __datetimeFormatters: shared.isPlainObject(_context)
                ? _context.__datetimeFormatters
                : undefined,
            __numberFormatters: shared.isPlainObject(_context)
                ? _context.__numberFormatters
                : undefined,
            __emitter: shared.isPlainObject(_context)
                ? _context.__emitter
                : undefined
        });
    }
    _context = getCoreContext();
    coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    /*!
     * define properties
     */
    // locale
    const locale = vue.computed({
        get: () => _locale.value,
        set: val => {
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = vue.computed({
        get: () => _fallbackLocale.value,
        set: val => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            coreBase.updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = vue.computed(() => _messages.value);
    // datetimeFormats
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    // numberFormats
    const numberFormats = vue.computed(() => _numberFormats.value);
    /**
     * define methods
     */
    // getPostTranslationHandler
    function getPostTranslationHandler() {
        return shared.isFunction(_postTranslation) ? _postTranslation : null;
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
        if (shared.isNumber(ret) && ret === coreBase.NOT_REOSLVED) {
            const key = argumentParser();
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
        return wrapWithDeps(context => coreBase.translate(context, ...args), () => coreBase.parseTranslateArgs(...args)[0], 'translate', root => root.t(...args), key => key, val => shared.isString(val));
    }
    // d
    function d(...args) {
        return wrapWithDeps(context => coreBase.datetime(context, ...args), () => coreBase.parseDateTimeArgs(...args)[0], 'datetime format', root => root.d(...args), () => coreBase.MISSING_RESOLVE_VALUE, val => shared.isString(val));
    }
    // n
    function n(...args) {
        return wrapWithDeps(context => coreBase.number(context, ...args), () => coreBase.parseNumberArgs(...args)[0], 'number format', root => root.n(...args), () => coreBase.MISSING_RESOLVE_VALUE, val => shared.isString(val));
    }
    // for custom processor
    function normalize(values) {
        return values.map(val => shared.isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
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
                ret = coreBase.translate(_context, ...args);
            }
            finally {
                _context.processor = null;
            }
            return ret;
        }, () => coreBase.parseTranslateArgs(...args)[0], 'translate', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[TransrateVNodeSymbol](...args), key => [vue.createVNode(vue.Text, null, key, 0)], val => shared.isArray(val));
    }
    // __numberParts, using for `i18n-n` component
    function __numberParts(...args) {
        return wrapWithDeps(context => coreBase.number(context, ...args), () => coreBase.parseNumberArgs(...args)[0], 'number format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[NumberPartsSymbol](...args), () => [], val => shared.isString(val) || shared.isArray(val));
    }
    // __datetimeParts, using for `i18n-d` component
    function __datetimeParts(...args) {
        return wrapWithDeps(context => coreBase.datetime(context, ...args), () => coreBase.parseDateTimeArgs(...args)[0], 'datetime format', 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        root => root[DatetimePartsSymbol](...args), () => [], val => shared.isString(val) || shared.isArray(val));
    }
    // te
    function te(key, locale) {
        const targetLocale = shared.isString(locale) ? locale : _locale.value;
        const message = getLocaleMessage(targetLocale);
        return coreBase.resolveValue(message, key) !== null;
    }
    // tm
    function tm(key) {
        const messages = _messages.value[_locale.value] || {};
        const target = coreBase.resolveValue(messages, key);
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
        coreBase.clearDateTimeFormat(_context, locale, format);
    }
    // mergeDateTimeFormat
    function mergeDateTimeFormat(locale, format) {
        _datetimeFormats.value[locale] = Object.assign(_datetimeFormats.value[locale] || {}, format);
        _context.datetimeFormats = _datetimeFormats.value;
        coreBase.clearDateTimeFormat(_context, locale, format);
    }
    // getNumberFormat
    function getNumberFormat(locale) {
        return _numberFormats.value[locale] || {};
    }
    // setNumberFormat
    function setNumberFormat(locale, format) {
        _numberFormats.value[locale] = format;
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale, format);
    }
    // mergeNumberFormat
    function mergeNumberFormat(locale, format) {
        _numberFormats.value[locale] = Object.assign(_numberFormats.value[locale] || {}, format);
        _context.numberFormats = _numberFormats.value;
        coreBase.clearNumberFormat(_context, locale, format);
    }
    // for debug
    composerID++;
    // watch root locale & fallbackLocale
    if (__root) {
        vue.watch(__root.locale, (val) => {
            if (_inheritLocale) {
                _locale.value = val;
                _context.locale = val;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
            }
        });
        vue.watch(__root.fallbackLocale, (val) => {
            if (_inheritLocale) {
                _fallbackLocale.value = val;
                _context.fallbackLocale = val;
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
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
                coreBase.updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
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
    const locale = shared.isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = shared.isString(options.fallbackLocale) ||
        shared.isArray(options.fallbackLocale) ||
        shared.isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const missing = shared.isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = shared.isBoolean(options.silentTranslationWarn) ||
        shared.isRegExp(options.silentTranslationWarn)
        ? !options.silentTranslationWarn
        : true;
    const fallbackWarn = shared.isBoolean(options.silentFallbackWarn) ||
        shared.isRegExp(options.silentFallbackWarn)
        ? !options.silentFallbackWarn
        : true;
    const fallbackRoot = shared.isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    const fallbackFormat = !!options.formatFallbackMessages;
    const modifiers = shared.isPlainObject(options.modifiers) ? options.modifiers : {};
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = shared.isFunction(options.postTranslation)
        ? options.postTranslation
        : undefined;
    const warnHtmlMessage = shared.isString(options.warnHtmlInMessage)
        ? options.warnHtmlInMessage !== 'off'
        : true;
    const escapeParameter = !!options.escapeParameterHtml;
    const inheritLocale = shared.isBoolean(options.sync) ? options.sync : true;
    let messages = options.messages;
    if (shared.isPlainObject(options.sharedMessages)) {
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
            // dummy
            return {
                interpolate() {
                    return [];
                }
            };
        },
        set formatter(val) {
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
            return shared.isBoolean(composer.missingWarn)
                ? !composer.missingWarn
                : composer.missingWarn;
        },
        set silentTranslationWarn(val) {
            composer.missingWarn = shared.isBoolean(val) ? !val : val;
        },
        // silentFallbackWarn
        get silentFallbackWarn() {
            return shared.isBoolean(composer.fallbackWarn)
                ? !composer.fallbackWarn
                : composer.fallbackWarn;
        },
        set silentFallbackWarn(val) {
            composer.fallbackWarn = shared.isBoolean(val) ? !val : val;
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
            return true;
        },
        set preserveDirectiveContent(val) {
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
            if (!shared.isString(arg1)) {
                throw createI18nError(13 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (shared.isString(arg2)) {
                options.locale = arg2;
            }
            else if (shared.isArray(arg2)) {
                list = arg2;
            }
            else if (shared.isPlainObject(arg2)) {
                named = arg2;
            }
            if (shared.isArray(arg3)) {
                list = arg3;
            }
            else if (shared.isPlainObject(arg3)) {
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
            if (!shared.isString(arg1)) {
                throw createI18nError(13 /* INVALID_ARGUMENT */);
            }
            const key = arg1;
            if (shared.isString(arg2)) {
                options.locale = arg2;
            }
            else if (shared.isNumber(arg2)) {
                options.plural = arg2;
            }
            else if (shared.isArray(arg2)) {
                list = arg2;
            }
            else if (shared.isPlainObject(arg2)) {
                named = arg2;
            }
            if (shared.isString(arg3)) {
                options.locale = arg3;
            }
            else if (shared.isArray(arg3)) {
                list = arg3;
            }
            else if (shared.isPlainObject(arg3)) {
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
            validator: (val) => shared.isNumber(val) || !isNaN(val)
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
                options.plural = shared.isString(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
            // prettier-ignore
            return shared.isString(props.tag)
                ? vue.h(props.tag, { ...attrs }, children)
                : shared.isObject(props.tag)
                    ? vue.h(props.tag, { ...attrs }, children)
                    : vue.h(vue.Fragment, { ...attrs }, children);
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
        if (shared.isString(props.format)) {
            options.key = props.format;
        }
        else if (shared.isObject(props.format)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (shared.isString(props.format.key)) {
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
        if (shared.isArray(parts)) {
            children = parts.map((part, index) => {
                const slot = slots[part.type];
                return slot
                    ? slot({ [part.type]: part.value, index, parts })
                    : [part.value];
            });
        }
        else if (shared.isString(parts)) {
            children = [parts];
        }
        // prettier-ignore
        return shared.isString(props.tag)
            ? vue.h(props.tag, { ...attrs }, children)
            : shared.isObject(props.tag)
                ? vue.h(props.tag, { ...attrs }, children)
                : vue.h(vue.Fragment, { ...attrs }, children);
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
        const parsedValue = parseValue(value);
        el.textContent = composer.t(...makeParams(parsedValue));
    };
    return {
        beforeMount: bind,
        beforeUpdate: bind
    };
}
function parseValue(value) {
    if (shared.isString(value)) {
        return { path: value };
    }
    else if (shared.isPlainObject(value)) {
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
    if (shared.isString(locale)) {
        options.locale = locale;
    }
    if (shared.isNumber(choice)) {
        options.plural = choice;
    }
    if (shared.isNumber(plural)) {
        options.plural = plural;
    }
    return [path, named, options];
}

function apply(app, i18n, ...options) {
    const pluginOptions = shared.isPlainObject(options[0])
        ? options[0]
        : {};
    const useI18nComponentName = !!pluginOptions.useI18nComponentName;
    const globalInstall = shared.isBoolean(pluginOptions.globalInstall)
        ? pluginOptions.globalInstall
        : true;
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
            const instance = vue.getCurrentInstance();
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
        },
        beforeUnmount() {
            const instance = vue.getCurrentInstance();
            /* istanbul ignore if */
            if (!instance) {
                throw createI18nError(20 /* UNEXPECTED_ERROR */);
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
    const __legacyMode =  shared.isBoolean(options.legacy)
        ? options.legacy
        : true;
    const __globalInjection =  !!options.globalInjection;
    const __instances = new Map();
    // prettier-ignore
    const __global =  __legacyMode
        ? createVueI18n(options)
        : createComposer(options);
    const symbol = shared.makeSymbol( '');
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
    const instance = vue.getCurrentInstance();
    if (instance == null) {
        throw createI18nError(14 /* MUST_BE_CALL_SETUP_TOP */);
    }
    if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
        throw createI18nError(15 /* NOT_INSLALLED */);
    }
    const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
    /* istanbul ignore if */
    if (!i18n) {
        throw createI18nError(20 /* UNEXPECTED_ERROR */);
    }
    // prettier-ignore
    const global = i18n.mode === 'composition'
        ? i18n.global
        : i18n.global.__composer;
    // prettier-ignore
    const scope = shared.isEmptyObject(options)
        ? ('__i18n' in instance.type)
            ? 'local'
            : 'global'
        : !options.useScope
            ? 'local'
            : options.useScope;
    if (scope === 'global') {
        let messages = shared.isObject(options.messages) ? options.messages : {};
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
        if (shared.isObject(options.datetimeFormats)) {
            const locales = Object.keys(options.datetimeFormats);
            if (locales.length) {
                locales.forEach(locale => {
                    global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
                });
            }
        }
        // merge number formats
        if (shared.isObject(options.numberFormats)) {
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
        setupLifeCycle(i18nInternal, instance);
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
    vue.onMounted(() => {
    }, target);
    vue.onUnmounted(() => {
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
        const wrap = vue.isRef(desc.value) // check computed props
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

// register message compiler at vue-i18n
coreBase.registerMessageCompiler(coreBase.compileToFunction);

exports.DatetimeFormat = DatetimeFormat;
exports.NumberFormat = NumberFormat;
exports.Translation = Translation;
exports.VERSION = VERSION;
exports.createI18n = createI18n;
exports.useI18n = useI18n;
exports.vTDirective = vTDirective;
