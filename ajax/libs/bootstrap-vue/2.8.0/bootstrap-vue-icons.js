/*!
 * BootstrapVueIcons 2.8.0
 *
 * @link https://bootstrap-vue.js.org
 * @source https://github.com/bootstrap-vue/bootstrap-vue
 * @copyright (c) 2016-2020 BootstrapVue
 * @license MIT
 * https://github.com/bootstrap-vue/bootstrap-vue/blob/master/LICENSE
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.bootstrapVueIcons = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  //

  // --- Static ---
  var isArray = function isArray(val) {
    return Array.isArray(val);
  }; // --- Instance ---

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */

  var isPlainObject = function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };

  /**
   * Utilities to get information about the current environment
   */
  // --- Constants ---
  var hasWindowSupport = typeof window !== 'undefined';
  var hasDocumentSupport = typeof document !== 'undefined';
  var hasNavigatorSupport = typeof navigator !== 'undefined';
  var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

  var userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
  var isJSDOM = userAgent.indexOf('jsdom') > 0;
  var isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

  var hasPassiveEventSupport = function () {
    var passiveEventSupported = false;

    if (isBrowser) {
      try {
        var options = {
          get passive() {
            // This function will be called when the browser
            // attempts to access the passive property.

            /* istanbul ignore next: will never be called in JSDOM */
            passiveEventSupported = true;
          }

        };
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
      } catch (err) {
        /* istanbul ignore next: will never be called in JSDOM */
        passiveEventSupported = false;
      }
    }

    return passiveEventSupported;
  }();

  var getEnv = function getEnv(key) {
    var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var env = typeof process !== 'undefined' && process ? process.env || {} : {};

    if (!key) {
      /* istanbul ignore next */
      return env;
    }

    return env[key] || fallback;
  };
  var getNoWarn = function getNoWarn() {
    return getEnv('BOOTSTRAP_VUE_NO_WARN');
  };

  var isUndefined = function isUndefined(val) {
    return val === undefined;
  };
  var isNull = function isNull(val) {
    return val === null;
  };
  var isUndefinedOrNull = function isUndefinedOrNull(val) {
    return isUndefined(val) || isNull(val);
  };

  var identity = function identity(x) {
    return x;
  };

  /**
   * Log a warning message to the console with BootstrapVue formatting
   * @param {string} message
   */

  var warn = function warn(message)
  /* istanbul ignore next */
  {
    var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!getNoWarn()) {
      console.warn("[BootstrapVue warn]: ".concat(source ? "".concat(source, " - ") : '').concat(message));
    }
  };

  /**
   * Checks if there are multiple instances of Vue, and warns (once) about possible issues.
   * @param {object} Vue
   */

  var checkMultipleVue = function () {
    var checkMultipleVueWarned = false;
    var MULTIPLE_VUE_WARNING = ['Multiple instances of Vue detected!', 'You may need to set up an alias for Vue in your bundler config.', 'See: https://bootstrap-vue.js.org/docs#using-module-bundlers'].join('\n');
    return function (Vue$1) {
      /* istanbul ignore next */
      if (!checkMultipleVueWarned && Vue !== Vue$1 && !isJSDOM) {
        warn(MULTIPLE_VUE_WARNING);
      }

      checkMultipleVueWarned = true;
    };
  }();
  /**
   * Plugin install factory function (no plugin config option).
   * @param {object} { components, directives }
   * @returns {function} plugin install function
   */

  var installFactoryNoConfig = function installFactoryNoConfig() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        components = _ref2.components,
        directives = _ref2.directives,
        plugins = _ref2.plugins;

    var install = function install(Vue) {
      if (install.installed) {
        /* istanbul ignore next */
        return;
      }

      install.installed = true;
      checkMultipleVue(Vue);
      registerComponents(Vue, components);
      registerDirectives(Vue, directives);
      registerPlugins(Vue, plugins);
    };

    install.installed = false;
    return install;
  };
  /**
   * Plugin object factory function (no config option).
   * @param {object} { components, directives, plugins }
   * @returns {object} plugin install object
   */

  var pluginFactoryNoConfig = function pluginFactoryNoConfig() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var extend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _objectSpread2({}, extend, {
      install: installFactoryNoConfig(options)
    });
  };
  /**
   * Load a group of plugins.
   * @param {object} Vue
   * @param {object} Plugin definitions
   */

  var registerPlugins = function registerPlugins(Vue) {
    var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var plugin in plugins) {
      if (plugin && plugins[plugin]) {
        Vue.use(plugins[plugin]);
      }
    }
  };
  /**
   * Load a component.
   * @param {object} Vue
   * @param {string} Component name
   * @param {object} Component definition
   */

  var registerComponent = function registerComponent(Vue, name, def) {
    if (Vue && name && def) {
      Vue.component(name, def);
    }
  };
  /**
   * Load a group of components.
   * @param {object} Vue
   * @param {object} Object of component definitions
   */

  var registerComponents = function registerComponents(Vue) {
    var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var component in components) {
      registerComponent(Vue, component, components[component]);
    }
  };
  /**
   * Load a directive.
   * @param {object} Vue
   * @param {string} Directive name
   * @param {object} Directive definition
   */

  var registerDirective = function registerDirective(Vue, name, def) {
    if (Vue && name && def) {
      // Ensure that any leading V is removed from the
      // name, as Vue adds it automatically
      Vue.directive(name.replace(/^VB/, 'B'), def);
    }
  };
  /**
   * Load a group of directives.
   * @param {object} Vue
   * @param {object} Object of directive definitions
   */

  var registerDirectives = function registerDirectives(Vue) {
    var directives = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    for (var directive in directives) {
      registerDirective(Vue, directive, directives[directive]);
    }
  };
  /**
   * Install plugin if window.Vue available
   * @param {object} Plugin definition
   */

  var vueUse = function vueUse(VuePlugin) {
    /* istanbul ignore next */
    if (hasWindowSupport && window.Vue) {
      window.Vue.use(VuePlugin);
    }
    /* istanbul ignore next */


    if (hasWindowSupport && VuePlugin.NAME) {
      window[VuePlugin.NAME] = VuePlugin;
    }
  };

  var e=function(){return (e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l);}return a}function a(){for(var t,r,a={},c=arguments.length;c--;)for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++)switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments[c].style)?arguments[c].style:[arguments[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y));}arguments[c].style=i;}a[t]=a[t].concat(arguments[c][t]);break;case"staticClass":if(!arguments[c][t])break;void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++)r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments[c][t][r]):a[t][r]=arguments[c][t][r];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments[c][t]);}return a}

  // String utilities
  var RX_UN_KEBAB = /-(\w)/g;
  var RX_HYPHENATE = /\B([A-Z])/g; // --- Utilities ---
  // Converts PascalCase or camelCase to kebab-case

  var kebabCase = function kebabCase(str) {
    return str.replace(RX_HYPHENATE, '-$1').toLowerCase();
  }; // Converts a kebab-case or camelCase string to PascalCase

  var pascalCase = function pascalCase(str) {
    str = kebabCase(str).replace(RX_UN_KEBAB, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
    return str.charAt(0).toUpperCase() + str.slice(1);
  }; // Lowercases the first letter of a string and returns a new string
  // `undefined`/`null` will be converted to `''`
  // Plain objects and arrays will be JSON stringified

  var toString = function toString(val) {
    var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return isUndefinedOrNull(val) ? '' : isArray(val) || isPlainObject(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
  }; // Remove leading white space from a string

  var trim = function trim(str) {
    return toString(str).trim();
  }; // Lower case a string

  // Number utilities
  // Returns NaN if the value cannot be converted

  var toFloat = function toFloat(val) {
    return parseFloat(val);
  }; // Converts a value (string, number, etc) to a string

  var commonIconProps = {
    variant: {
      type: String,
      default: null
    },
    fontScale: {
      type: [Number, String],
      default: 1
    },
    scale: {
      type: [Number, String],
      default: 1
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    flipH: {
      type: Boolean,
      default: false
    },
    flipV: {
      type: Boolean,
      default: false
    },
    shiftH: {
      type: [Number, String],
      default: 0
    },
    shiftV: {
      type: [Number, String],
      default: 0
    },
    animation: {
      type: String,
      default: null
    }
  }; // Base attributes needed on all icons

  var baseAttrs = {
    viewBox: '0 0 16 16',
    width: '1em',
    height: '1em',
    focusable: 'false',
    role: 'img',
    alt: 'icon'
  }; // Attributes that are nulled out when stacked

  var stackedAttrs = {
    width: null,
    height: null,
    focusable: null,
    role: null,
    alt: null
  }; // Shared private base component to reduce bundle/runtime size
  // @vue/component

  var BVIconBase = /*#__PURE__*/Vue.extend({
    name: 'BVIconBase',
    functional: true,
    props: _objectSpread2({
      content: {
        type: String
      },
      stacked: {
        type: Boolean,
        default: false
      }
    }, commonIconProps),
    render: function render(h, _ref) {
      var _class;

      var data = _ref.data,
          props = _ref.props,
          children = _ref.children;
      var fontScale = Math.max(toFloat(props.fontScale) || 1, 0) || 1;
      var scale = Math.max(toFloat(props.scale) || 1, 0) || 1;
      var rotate = toFloat(props.rotate) || 0;
      var shiftH = toFloat(props.shiftH) || 0;
      var shiftV = toFloat(props.shiftV) || 0;
      var flipH = props.flipH;
      var flipV = props.flipV;
      var animation = props.animation; // Compute the transforms
      // Note that order is important as SVG transforms are applied in order from
      // left to right and we want flipping/scale to occur before rotation
      // Note shifting is applied separately
      // Assumes that the viewbox is `0 0 16 16` (`8 8` is the center)

      var hasScale = flipH || flipV || scale !== 1;
      var hasTransforms = hasScale || rotate;
      var hasShift = shiftH || shiftV;
      var transforms = [hasTransforms ? 'translate(8 8)' : null, hasScale ? "scale(".concat((flipH ? -1 : 1) * scale, " ").concat((flipV ? -1 : 1) * scale, ")") : null, rotate ? "rotate(".concat(rotate, ")") : null, hasTransforms ? 'translate(-8 -8)' : null].filter(identity); // Handling stacked icons

      var isStacked = props.stacked;
      var hasContent = !isUndefinedOrNull(props.content); // We wrap the content in a `<g>` for handling the transforms (except shift)

      var $inner = h('g', {
        attrs: {
          transform: transforms.join(' ') || null
        },
        domProps: hasContent ? {
          innerHTML: props.content || ''
        } : {}
      }, children); // If needed, we wrap in an additional `<g>` in order to handle the shifting

      if (hasShift) {
        $inner = h('g', {
          attrs: {
            transform: "translate(".concat(16 * shiftH / 16, " ").concat(-16 * shiftV / 16, ")")
          }
        }, [$inner]);
      }

      if (isStacked) {
        // Wrap in an additional `<g>` for proper
        // animation handling if stacked
        $inner = h('g', {}, [$inner]);
      }

      return h('svg', a({
        staticClass: 'b-icon bi',
        class: (_class = {}, _defineProperty(_class, "text-".concat(props.variant), !!props.variant), _defineProperty(_class, "b-icon-animation-".concat(animation), !!animation), _class),
        attrs: baseAttrs,
        style: isStacked ? {} : {
          fontSize: fontScale === 1 ? null : "".concat(fontScale * 100, "%")
        }
      }, // Merge in user supplied data
      data, // If icon is stacked, null out some attrs
      isStacked ? {
        attrs: stackedAttrs
      } : {}, // These cannot be overridden by users
      {
        attrs: {
          xmlns: isStacked ? null : 'http://www.w3.org/2000/svg',
          fill: 'currentColor'
        }
      }), [$inner]);
    }
  });

  /**
   * Icon component generator function
   *
   * @param {string} icon name (minus the leading `BIcon`)
   * @param {string} raw `innerHTML` for SVG
   * @return {VueComponent}
   */

  var makeIcon = function makeIcon(name, content) {
    // For performance reason we pre-compute some values, so that
    // they are not computed on each render of the icon component
    var iconName = "BIcon".concat(pascalCase(name));
    var iconNameClass = "bi-".concat(kebabCase(name));
    var svgContent = trim(content || ''); // Return the icon component definition

    return /*#__PURE__*/Vue.extend({
      name: iconName,
      functional: true,
      props: _objectSpread2({}, commonIconProps, {
        stacked: {
          type: Boolean,
          default: false
        }
      }),
      render: function render(h, _ref) {
        var data = _ref.data,
            props = _ref.props;
        return h(BVIconBase, a(data, {
          staticClass: iconNameClass,
          props: _objectSpread2({}, props, {
            content: svgContent
          })
        }));
      }
    });
  };

  // --- BEGIN AUTO-GENERATED FILE ---

  var BIconBlank = /*#__PURE__*/makeIcon('Blank', ''); // --- Bootstrap Icons ---
  // eslint-disable-next-line

  var BIconAlarm = /*#__PURE__*/makeIcon('Alarm', '<path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.053.224l-1.5 3a.5.5 0 11-.894-.448L7.5 8.882V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM11.613 1.86a2.5 2.5 0 113.527 3.527 8.035 8.035 0 00-3.527-3.527z"/><path fill-rule="evenodd" d="M11.646 14.146a.5.5 0 01.708 0l1 1a.5.5 0 01-.708.708l-1-1a.5.5 0 010-.708zm-7.292 0a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l1-1a.5.5 0 000-.708zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M7 1h2v2H7V1z"/>'); // eslint-disable-next-line

  var BIconAlarmFill = /*#__PURE__*/makeIcon('AlarmFill', '<path fill-rule="evenodd" d="M5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H9v1.07a7.002 7.002 0 013.537 12.26l.817.816a.5.5 0 01-.708.708l-.924-.925A6.967 6.967 0 018 16a6.967 6.967 0 01-3.722-1.07l-.924.924a.5.5 0 01-.708-.708l.817-.816A7.002 7.002 0 017 2.07V1H5.999a.5.5 0 01-.5-.5zM.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 013.527 3.527A2.5 2.5 0 0013.5 1zm-5 4a.5.5 0 00-1 0v3.882l-1.447 2.894a.5.5 0 10.894.448l1.5-3A.5.5 0 008.5 9V5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAlt = /*#__PURE__*/makeIcon('Alt', '<path fill-rule="evenodd" d="M1 13.5a.5.5 0 00.5.5h3.797a.5.5 0 00.439-.26L11 3h3.5a.5.5 0 000-1h-3.797a.5.5 0 00-.439.26L5 13H1.5a.5.5 0 00-.5.5zm10 0a.5.5 0 00.5.5h3a.5.5 0 000-1h-3a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconApp = /*#__PURE__*/makeIcon('App', '<path fill-rule="evenodd" d="M11 2H5a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V5a3 3 0 00-3-3zM5 1a4 4 0 00-4 4v6a4 4 0 004 4h6a4 4 0 004-4V5a4 4 0 00-4-4H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAppIndicator = /*#__PURE__*/makeIcon('AppIndicator', '<path fill-rule="evenodd" d="M5.5 2A3.5 3.5 0 002 5.5v5A3.5 3.5 0 005.5 14h5a3.5 3.5 0 003.5-3.5V8a.5.5 0 011 0v2.5a4.5 4.5 0 01-4.5 4.5h-5A4.5 4.5 0 011 10.5v-5A4.5 4.5 0 015.5 1H8a.5.5 0 010 1H5.5z" clip-rule="evenodd"/><path d="M16 3a3 3 0 11-6 0 3 3 0 016 0z"/>'); // eslint-disable-next-line

  var BIconArchive = /*#__PURE__*/makeIcon('Archive', '<path fill-rule="evenodd" d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArchiveFill = /*#__PURE__*/makeIcon('ArchiveFill', '<path fill-rule="evenodd" d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM6 7a.5.5 0 000 1h4a.5.5 0 000-1H6zM.8 1a.8.8 0 00-.8.8V3a.8.8 0 00.8.8h14.4A.8.8 0 0016 3V1.8a.8.8 0 00-.8-.8H.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrow90degDown = /*#__PURE__*/makeIcon('Arrow90degDown', '<path fill-rule="evenodd" d="M2.646 9.646a.5.5 0 01.708 0L6 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 13a.5.5 0 01-.5-.5V6A2.5 2.5 0 018 3.5h5.5a.5.5 0 010 1H8A1.5 1.5 0 006.5 6v6.5a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrow90degLeft = /*#__PURE__*/makeIcon('Arrow90degLeft', '<path fill-rule="evenodd" d="M6.104 2.396a.5.5 0 010 .708L3.457 5.75l2.647 2.646a.5.5 0 11-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.75 5.75a.5.5 0 01.5-.5h6.5a2.5 2.5 0 012.5 2.5v5.5a.5.5 0 01-1 0v-5.5a1.5 1.5 0 00-1.5-1.5h-6.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrow90degRight = /*#__PURE__*/makeIcon('Arrow90degRight', '<path fill-rule="evenodd" d="M9.896 2.396a.5.5 0 000 .708l2.647 2.646-2.647 2.646a.5.5 0 10.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 00-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.25 5.75a.5.5 0 00-.5-.5h-6.5a2.5 2.5 0 00-2.5 2.5v5.5a.5.5 0 001 0v-5.5a1.5 1.5 0 011.5-1.5h6.5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrow90degUp = /*#__PURE__*/makeIcon('Arrow90degUp', '<path fill-rule="evenodd" d="M2.646 6.854a.5.5 0 00.708 0L6 4.207l2.646 2.647a.5.5 0 10.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 3.5a.5.5 0 00-.5.5v6.5A2.5 2.5 0 008 13h5.5a.5.5 0 000-1H8a1.5 1.5 0 01-1.5-1.5V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowBarDown = /*#__PURE__*/makeIcon('ArrowBarDown', '<path fill-rule="evenodd" d="M11.354 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L8 12.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5V13a.5.5 0 01-1 0V6.5A.5.5 0 018 6zM2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowBarLeft = /*#__PURE__*/makeIcon('ArrowBarLeft', '<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708-.708L3.207 8l2.647-2.646a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 8a.5.5 0 00-.5-.5H3a.5.5 0 000 1h6.5A.5.5 0 0010 8zm2.5 6a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowBarRight = /*#__PURE__*/makeIcon('ArrowBarRight', '<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H6.5A.5.5 0 016 8zm-2.5 6a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowBarUp = /*#__PURE__*/makeIcon('ArrowBarUp', '<path fill-rule="evenodd" d="M11.354 5.854a.5.5 0 000-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L8 3.207l2.646 2.647a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 10a.5.5 0 00.5-.5V3a.5.5 0 00-1 0v6.5a.5.5 0 00.5.5zm-4.8 1.6c0-.22.18-.4.4-.4h8.8a.4.4 0 010 .8H3.6a.4.4 0 01-.4-.4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowClockwise = /*#__PURE__*/makeIcon('ArrowClockwise', '<path fill-rule="evenodd" d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowCounterclockwise = /*#__PURE__*/makeIcon('ArrowCounterclockwise', '<path fill-rule="evenodd" d="M12.83 6.706a5 5 0 00-7.103-3.16.5.5 0 11-.454-.892A6 6 0 112.545 5.5a.5.5 0 11.91.417 5 5 0 109.375.789z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.854.146a.5.5 0 00-.708 0l-2.5 2.5a.5.5 0 000 .708l2.5 2.5a.5.5 0 10.708-.708L5.707 3 7.854.854a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowDown = /*#__PURE__*/makeIcon('ArrowDown', '<path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowDownLeft = /*#__PURE__*/makeIcon('ArrowDownLeft', '<path fill-rule="evenodd" d="M3 7.5a.5.5 0 01.5.5v4.5H8a.5.5 0 010 1H3a.5.5 0 01-.5-.5V8a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowDownRight = /*#__PURE__*/makeIcon('ArrowDownRight', '<path fill-rule="evenodd" d="M12 7.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H7a.5.5 0 010-1h4.5V8a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.646 3.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowDownShort = /*#__PURE__*/makeIcon('ArrowDownShort', '<path fill-rule="evenodd" d="M4.646 7.646a.5.5 0 01.708 0L8 10.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowLeft = /*#__PURE__*/makeIcon('ArrowLeft', '<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowLeftRight = /*#__PURE__*/makeIcon('ArrowLeftRight', '<path fill-rule="evenodd" d="M10.146 7.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 11l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 11a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 11zm3.854-9.354a.5.5 0 010 .708L3.207 5l2.647 2.646a.5.5 0 11-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 5a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowLeftShort = /*#__PURE__*/makeIcon('ArrowLeftShort', '<path fill-rule="evenodd" d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowRepeat = /*#__PURE__*/makeIcon('ArrowRepeat', '<path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowReturnLeft = /*#__PURE__*/makeIcon('ArrowReturnLeft', '<path fill-rule="evenodd" d="M5.854 5.646a.5.5 0 010 .708L3.207 9l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 2.5a.5.5 0 01.5.5v4a2.5 2.5 0 01-2.5 2.5H3a.5.5 0 010-1h8.5A1.5 1.5 0 0013 7V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowReturnRight = /*#__PURE__*/makeIcon('ArrowReturnRight', '<path fill-rule="evenodd" d="M10.146 5.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 9l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 2.5a.5.5 0 00-.5.5v4A2.5 2.5 0 005 9.5h8.5a.5.5 0 000-1H5A1.5 1.5 0 013.5 7V3a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowRight = /*#__PURE__*/makeIcon('ArrowRight', '<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowRightShort = /*#__PURE__*/makeIcon('ArrowRightShort', '<path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowUp = /*#__PURE__*/makeIcon('ArrowUp', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowUpDown = /*#__PURE__*/makeIcon('ArrowUpDown', '<path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowUpLeft = /*#__PURE__*/makeIcon('ArrowUpLeft', '<path fill-rule="evenodd" d="M2.5 4a.5.5 0 01.5-.5h5a.5.5 0 010 1H3.5V9a.5.5 0 01-1 0V4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.646 3.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowUpRight = /*#__PURE__*/makeIcon('ArrowUpRight', '<path fill-rule="evenodd" d="M6.5 4a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4.5H7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowUpShort = /*#__PURE__*/makeIcon('ArrowUpShort', '<path fill-rule="evenodd" d="M8 5.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 5.707 5.354 8.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsAngleContract = /*#__PURE__*/makeIcon('ArrowsAngleContract', '<path fill-rule="evenodd" d="M9.5 2.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.708l4.5-4.5a.5.5 0 01.708 0zm-7.5 7.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.036 9.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V10h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsAngleExpand = /*#__PURE__*/makeIcon('ArrowsAngleExpand', '<path fill-rule="evenodd" d="M1.5 10.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.354 9.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm8.5-8.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.036 1.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 11-1 0V2h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsCollapse = /*#__PURE__*/makeIcon('ArrowsCollapse', '<path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11A.5.5 0 012 8zm6-7a.5.5 0 01.5.5V6a.5.5 0 01-1 0V1.5A.5.5 0 018 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 3.646a.5.5 0 010 .708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L8 5.293l1.646-1.647a.5.5 0 01.708 0zM8 15a.5.5 0 00.5-.5V10a.5.5 0 00-1 0v4.5a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 12.354a.5.5 0 000-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 00.708.708L8 10.707l1.646 1.647a.5.5 0 00.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsExpand = /*#__PURE__*/makeIcon('ArrowsExpand', '<path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11A.5.5 0 012 8zm6-1.5a.5.5 0 00.5-.5V1.5a.5.5 0 00-1 0V6a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 3.854a.5.5 0 000-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L8 2.207l1.646 1.647a.5.5 0 00.708 0zM8 9.5a.5.5 0 01.5.5v4.5a.5.5 0 01-1 0V10a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 12.146a.5.5 0 010 .708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L8 13.793l1.646-1.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsFullscreen = /*#__PURE__*/makeIcon('ArrowsFullscreen', '<path fill-rule="evenodd" d="M1.464 10.536a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.964 10a.5.5 0 010 .707l-4.146 4.147a.5.5 0 01-.707-.708L5.257 10a.5.5 0 01.707 0zm8.854-8.854a.5.5 0 010 .708L10.672 6a.5.5 0 01-.708-.707l4.147-4.147a.5.5 0 01.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.5 1.5A.5.5 0 0111 1h3.5a.5.5 0 01.5.5V5a.5.5 0 01-1 0V2h-3a.5.5 0 01-.5-.5zm4 9a.5.5 0 00-.5.5v3h-3a.5.5 0 000 1h3.5a.5.5 0 00.5-.5V11a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 9.964a.5.5 0 000 .708l4.146 4.146a.5.5 0 00.708-.707l-4.147-4.147a.5.5 0 00-.707 0zM1.182 1.146a.5.5 0 000 .708L5.328 6a.5.5 0 00.708-.707L1.889 1.146a.5.5 0 00-.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 1.5A.5.5 0 005 1H1.5a.5.5 0 00-.5.5V5a.5.5 0 001 0V2h3a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconArrowsMove = /*#__PURE__*/makeIcon('ArrowsMove', '<path fill-rule="evenodd" d="M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAspectRatio = /*#__PURE__*/makeIcon('AspectRatio', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9zM1.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 4.5a.5.5 0 01.5-.5h3a.5.5 0 010 1H3v2.5a.5.5 0 01-1 0v-3zm12 7a.5.5 0 01-.5.5h-3a.5.5 0 010-1H13V8.5a.5.5 0 011 0v3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAspectRatioFill = /*#__PURE__*/makeIcon('AspectRatioFill', '<path fill-rule="evenodd" d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm1 2a.5.5 0 00-.5.5v3a.5.5 0 001 0V5h2.5a.5.5 0 000-1h-3zm11 8a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0V11h-2.5a.5.5 0 000 1h3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAt = /*#__PURE__*/makeIcon('At', '<path fill-rule="evenodd" d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconAward = /*#__PURE__*/makeIcon('Award', '<path fill-rule="evenodd" d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z" clip-rule="evenodd"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>'); // eslint-disable-next-line

  var BIconAwardFill = /*#__PURE__*/makeIcon('AwardFill', '<path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>'); // eslint-disable-next-line

  var BIconBackspace = /*#__PURE__*/makeIcon('Backspace', '<path fill-rule="evenodd" d="M6.603 2h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L1 8l4.844-5.65A1 1 0 016.603 2zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L.241 8.65a1 1 0 010-1.302L5.084 1.7A2 2 0 016.603 1h7.08z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.83 5.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.537 5.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBackspaceFill = /*#__PURE__*/makeIcon('BackspaceFill', '<path fill-rule="evenodd" d="M15.683 3a2 2 0 00-2-2h-7.08a2 2 0 00-1.519.698L.241 7.35a1 1 0 000 1.302l4.843 5.65A2 2 0 006.603 15h7.08a2 2 0 002-2V3zM5.829 5.854a.5.5 0 11.707-.708l2.147 2.147 2.146-2.147a.5.5 0 11.707.708L9.39 8l2.146 2.146a.5.5 0 01-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 01-.707-.708L7.976 8 5.829 5.854z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBackspaceReverse = /*#__PURE__*/makeIcon('BackspaceReverse', '<path fill-rule="evenodd" d="M9.08 2H2a1 1 0 00-1 1v10a1 1 0 001 1h7.08a1 1 0 00.76-.35L14.682 8 9.839 2.35A1 1 0 009.08 2zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h7.08a2 2 0 001.519-.698l4.843-5.651a1 1 0 000-1.302L10.6 1.7A2 2 0 009.08 1H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.854 5.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 5.146a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBackspaceReverseFill = /*#__PURE__*/makeIcon('BackspaceReverseFill', '<path fill-rule="evenodd" d="M0 3a2 2 0 012-2h7.08a2 2 0 011.519.698l4.843 5.651a1 1 0 010 1.302L10.6 14.3a2 2 0 01-1.52.7H2a2 2 0 01-2-2V3zm9.854 2.854a.5.5 0 00-.708-.708L7 7.293 4.854 5.146a.5.5 0 10-.708.708L6.293 8l-2.147 2.146a.5.5 0 00.708.708L7 8.707l2.146 2.147a.5.5 0 00.708-.708L7.707 8l2.147-2.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBag = /*#__PURE__*/makeIcon('Bag', '<path fill-rule="evenodd" d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z" clip-rule="evenodd"/><path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>'); // eslint-disable-next-line

  var BIconBagFill = /*#__PURE__*/makeIcon('BagFill', '<path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>'); // eslint-disable-next-line

  var BIconBarChart = /*#__PURE__*/makeIcon('BarChart', '<path fill-rule="evenodd" d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1h-2zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1v-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBarChartFill = /*#__PURE__*/makeIcon('BarChartFill', '<rect width="4" height="5" x="1" y="10" rx="1"/><rect width="4" height="9" x="6" y="6" rx="1"/><rect width="4" height="14" x="11" y="1" rx="1"/>'); // eslint-disable-next-line

  var BIconBattery = /*#__PURE__*/makeIcon('Battery', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M14.5 9.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

  var BIconBatteryCharging = /*#__PURE__*/makeIcon('BatteryCharging', '<path d="M14.5 9.5a1.5 1.5 0 000-3v3z"/><path fill-rule="evenodd" d="M9.585 2.568a.5.5 0 01.226.58L8.677 6.832h1.99a.5.5 0 01.364.843l-5.334 5.667a.5.5 0 01-.842-.49L5.99 9.167H4a.5.5 0 01-.364-.843l5.333-5.667a.5.5 0 01.616-.09z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.332 4H2a2 2 0 00-2 2v4a2 2 0 002 2h2.072l.307-1H2a1 1 0 01-1-1V6a1 1 0 011-1h3.391l.941-1zM4.45 6H2v4h1.313a1.5 1.5 0 01-.405-2.361L4.45 6zm.976 5l-.308 1H6.96l.21-.224h.001l.73-.776H6.53l-.085.09.028-.09H5.426zm1.354-1H5.733l.257-.833H4a.5.5 0 01-.364-.843l.793-.843L5.823 6h1.373L5.157 8.167h1.51a.5.5 0 01.478.647L6.78 10zm.69 0h1.374l1.394-1.482.793-.842a.5.5 0 00-.364-.843h-1.99L8.933 6H7.887l-.166.54-.199.646A.5.5 0 008 7.833h1.51L7.47 10zm.725-5H9.24l.308-1H7.706l-.942 1h1.374l.085-.09-.028.09zm2.4-1l-.308 1H12a1 1 0 011 1v4a1 1 0 01-1 1H9.276l-.942 1H12a2 2 0 002-2V6a2 2 0 00-2-2h-1.405zm-.378 6H12V8.02a1.499 1.499 0 01-.241.341L10.217 10zM12 6.646V6h-.646a1.5 1.5 0 01.646.646z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBatteryFull = /*#__PURE__*/makeIcon('BatteryFull', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M2 6h10v4H2V6zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

  var BIconBatteryHalf = /*#__PURE__*/makeIcon('BatteryHalf', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M2 6h5v4H2V6zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

  var BIconBell = /*#__PURE__*/makeIcon('Bell', '<path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z"/><path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBellFill = /*#__PURE__*/makeIcon('BellFill', '<path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>'); // eslint-disable-next-line

  var BIconBlockquoteLeft = /*#__PURE__*/makeIcon('BlockquoteLeft', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm5 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M3.734 6.352a6.586 6.586 0 00-.445.275 1.94 1.94 0 00-.346.299 1.38 1.38 0 00-.252.369c-.058.129-.1.295-.123.498h.282c.242 0 .431.06.568.182.14.117.21.29.21.521a.697.697 0 01-.187.463c-.12.14-.289.21-.503.21-.336 0-.577-.108-.721-.327C2.072 8.619 2 8.328 2 7.969c0-.254.055-.485.164-.692.11-.21.242-.398.398-.562.16-.168.33-.31.51-.428.18-.117.33-.213.451-.287l.211.352zm2.168 0a6.588 6.588 0 00-.445.275 1.94 1.94 0 00-.346.299c-.113.12-.199.246-.257.375a1.75 1.75 0 00-.118.492h.282c.242 0 .431.06.568.182.14.117.21.29.21.521a.697.697 0 01-.187.463c-.12.14-.289.21-.504.21-.335 0-.576-.108-.72-.327-.145-.223-.217-.514-.217-.873 0-.254.055-.485.164-.692.11-.21.242-.398.398-.562.16-.168.33-.31.51-.428.18-.117.33-.213.451-.287l.211.352z"/>'); // eslint-disable-next-line

  var BIconBlockquoteRight = /*#__PURE__*/makeIcon('BlockquoteRight', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M12.168 6.352c.184.105.332.197.445.275.114.074.229.174.346.299.11.117.193.24.252.369s.1.295.123.498h-.281c-.243 0-.432.06-.569.182-.14.117-.21.29-.21.521 0 .164.062.318.187.463.121.14.289.21.504.21.336 0 .576-.108.72-.327.145-.223.217-.514.217-.873 0-.254-.054-.485-.164-.692a2.436 2.436 0 00-.398-.562c-.16-.168-.33-.31-.51-.428-.18-.117-.33-.213-.451-.287l-.211.352zm-2.168 0c.184.105.332.197.445.275.114.074.229.174.346.299.113.12.2.246.258.375.055.125.094.289.117.492h-.281c-.242 0-.432.06-.569.182-.14.117-.21.29-.21.521 0 .164.062.318.187.463.121.14.289.21.504.21.336 0 .576-.108.72-.327.145-.223.217-.514.217-.873 0-.254-.054-.485-.164-.692a2.438 2.438 0 00-.398-.562c-.16-.168-.33-.31-.51-.428-.18-.117-.33-.213-.451-.287L10 6.352z"/>'); // eslint-disable-next-line

  var BIconBook = /*#__PURE__*/makeIcon('Book', '<path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609zM15 2.82v9.908c-.846-.343-1.944-.672-3.074-.788-1.143-.118-2.387-.023-3.426.56V2.718c1.063-.929 2.631-.956 4.09-.664A11.956 11.956 0 0115 2.82z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookHalf = /*#__PURE__*/makeIcon('BookHalf', '<path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmark = /*#__PURE__*/makeIcon('Bookmark', '<path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 00-2-2H5a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmarkCheck = /*#__PURE__*/makeIcon('BookmarkCheck', '<path fill-rule="evenodd" d="M4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.854 2.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 4.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmarkDash = /*#__PURE__*/makeIcon('BookmarkDash', '<path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmarkFill = /*#__PURE__*/makeIcon('BookmarkFill', '<path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmarkPlus = /*#__PURE__*/makeIcon('BookmarkPlus', '<path fill-rule="evenodd" d="M4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4zm9-1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBookmarks = /*#__PURE__*/makeIcon('Bookmarks', '<path fill-rule="evenodd" d="M7 13l5 3V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V4a1 1 0 00-1-1H4a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/><path d="M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z"/>'); // eslint-disable-next-line

  var BIconBookmarksFill = /*#__PURE__*/makeIcon('BookmarksFill', '<path fill-rule="evenodd" d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V4z" clip-rule="evenodd"/><path d="M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z"/>'); // eslint-disable-next-line

  var BIconBootstrap = /*#__PURE__*/makeIcon('Bootstrap', '<path fill-rule="evenodd" d="M12 1H4a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V4a3 3 0 00-3-3zM4 0a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V4a4 4 0 00-4-4H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.537 12H5.062V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396zM6.375 4.658v2.467h1.558c1.16 0 1.764-.428 1.764-1.23 0-.78-.569-1.237-1.541-1.237H6.375zm1.898 6.229H6.375V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBootstrapFill = /*#__PURE__*/makeIcon('BootstrapFill', '<path fill-rule="evenodd" d="M4.002 0a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V4a4 4 0 00-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBootstrapReboot = /*#__PURE__*/makeIcon('BootstrapReboot', '<path fill-rule="evenodd" d="M1.161 8a6.84 6.84 0 106.842-6.84.58.58 0 010-1.16 8 8 0 11-6.556 3.412l-.663-.577a.58.58 0 01.227-.997l2.52-.69a.58.58 0 01.728.633l-.332 2.592a.58.58 0 01-.956.364l-.643-.56A6.812 6.812 0 001.16 8zm5.48-.079V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6zm0 3.75V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoundingBox = /*#__PURE__*/makeIcon('BoundingBox', '<path fill-rule="evenodd" d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1H5v2H3v6h2v2h6v-2h2V5h-2V3zm1-2v3h3V1h-3zm3 11h-3v3h3v-3zM4 15v-3H1v3h3zM1 4h3V1H1v3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoundingBoxCircles = /*#__PURE__*/makeIcon('BoundingBoxCircles', '<path fill-rule="evenodd" d="M12.5 2h-9V1h9v1zm-10 1.5v9h-1v-9h1zm11 9v-9h1v9h-1zM3.5 14h9v1h-9v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowDown = /*#__PURE__*/makeIcon('BoxArrowDown', '<path fill-rule="evenodd" d="M4.646 11.646a.5.5 0 01.708 0L8 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 2A1.5 1.5 0 014 .5h8A1.5 1.5 0 0113.5 2v7a1.5 1.5 0 01-1.5 1.5h-1.5a.5.5 0 010-1H12a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h1.5a.5.5 0 010 1H4A1.5 1.5 0 012.5 9V2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowDownLeft = /*#__PURE__*/makeIcon('BoxArrowDownLeft', '<path fill-rule="evenodd" d="M13 1.5A1.5 1.5 0 0114.5 3v8a1.5 1.5 0 01-1.5 1.5H9a.5.5 0 010-1h4a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H5a.5.5 0 00-.5.5v4a.5.5 0 01-1 0V3A1.5 1.5 0 015 1.5h8zm-11 7a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 000-1H2.5V9a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 14.354a.5.5 0 00.708 0l8-8a.5.5 0 00-.708-.708l-8 8a.5.5 0 000 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowDownRight = /*#__PURE__*/makeIcon('BoxArrowDownRight', '<path fill-rule="evenodd" d="M3 1.5A1.5 1.5 0 001.5 3v8A1.5 1.5 0 003 12.5h4a.5.5 0 000-1H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v4a.5.5 0 001 0V3A1.5 1.5 0 0011 1.5H3zm11 7a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H9a.5.5 0 010-1h4.5V9a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 14.354a.5.5 0 01-.708 0l-8-8a.5.5 0 11.708-.708l8 8a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInDown = /*#__PURE__*/makeIcon('BoxArrowInDown', '<path fill-rule="evenodd" d="M4.646 8.146a.5.5 0 01.708 0L8 10.793l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v9a.5.5 0 01-1 0v-9A.5.5 0 018 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 13.5A1.5 1.5 0 003 15h10a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0013 4h-1.5a.5.5 0 000 1H13a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-8A.5.5 0 013 5h1.5a.5.5 0 000-1H3a1.5 1.5 0 00-1.5 1.5v8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInDownLeft = /*#__PURE__*/makeIcon('BoxArrowInDownLeft', '<path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 10a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V5a.5.5 0 011 0v4.5H11a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 10.354a.5.5 0 010-.708l8-8a.5.5 0 01.708.708l-8 8a.5.5 0 01-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInDownRight = /*#__PURE__*/makeIcon('BoxArrowInDownRight', '<path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 13V8a.5.5 0 011 0v5a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H9a.5.5 0 010-1h4A1.5 1.5 0 0114.5 3v10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V5a.5.5 0 00-1 0v4.5H5a.5.5 0 00-.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 000-.708l-8-8a.5.5 0 10-.708.708l8 8a.5.5 0 00.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInLeft = /*#__PURE__*/makeIcon('BoxArrowInLeft', '<path fill-rule="evenodd" d="M7.854 11.354a.5.5 0 000-.708L5.207 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 8a.5.5 0 00-.5-.5h-9a.5.5 0 000 1h9A.5.5 0 0015 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 14.5A1.5 1.5 0 011 13V3a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0112 3v1.5a.5.5 0 01-1 0V3a.5.5 0 00-.5-.5h-8A.5.5 0 002 3v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V13a1.5 1.5 0 01-1.5 1.5h-8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInRight = /*#__PURE__*/makeIcon('BoxArrowInRight', '<path fill-rule="evenodd" d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInUp = /*#__PURE__*/makeIcon('BoxArrowInUp', '<path fill-rule="evenodd" d="M4.646 7.854a.5.5 0 00.708 0L8 5.207l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15a.5.5 0 00.5-.5v-9a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0113 12h-1.5a.5.5 0 010-1H13a.5.5 0 00.5-.5v-8A.5.5 0 0013 2H3a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h1.5a.5.5 0 010 1H3a1.5 1.5 0 01-1.5-1.5v-8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInUpLeft = /*#__PURE__*/makeIcon('BoxArrowInUpLeft', '<path fill-rule="evenodd" d="M1.5 3A1.5 1.5 0 013 1.5h10A1.5 1.5 0 0114.5 3v5a.5.5 0 01-1 0V3a.5.5 0 00-.5-.5H3a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h4a.5.5 0 010 1H3A1.5 1.5 0 011.5 13V3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 6a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v5a.5.5 0 001 0V6.5H11a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowInUpRight = /*#__PURE__*/makeIcon('BoxArrowInUpRight', '<path fill-rule="evenodd" d="M14.5 3A1.5 1.5 0 0013 1.5H3A1.5 1.5 0 001.5 3v5a.5.5 0 001 0V3a.5.5 0 01.5-.5h10a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H9a.5.5 0 000 1h4a1.5 1.5 0 001.5-1.5V3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 6a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6.5H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowLeft = /*#__PURE__*/makeIcon('BoxArrowLeft', '<path fill-rule="evenodd" d="M4.354 11.354a.5.5 0 000-.708L1.707 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 8a.5.5 0 00-.5-.5H2a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 13.5a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0014 2.5H7A1.5 1.5 0 005.5 4v1.5a.5.5 0 001 0V4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V12A1.5 1.5 0 007 13.5h7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowRight = /*#__PURE__*/makeIcon('BoxArrowRight', '<path fill-rule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowUp = /*#__PURE__*/makeIcon('BoxArrowUp', '<path fill-rule="evenodd" d="M4.646 4.354a.5.5 0 00.708 0L8 1.707l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11.5a.5.5 0 00.5-.5V2a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 14A1.5 1.5 0 004 15.5h8a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0012 5.5h-1.5a.5.5 0 000 1H12a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h1.5a.5.5 0 000-1H4A1.5 1.5 0 002.5 7v7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowUpLeft = /*#__PURE__*/makeIcon('BoxArrowUpLeft', '<path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 13V9a.5.5 0 011 0v4a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H9a.5.5 0 010-1h4A1.5 1.5 0 0114.5 5v8zm-7-11a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v5a.5.5 0 001 0V2.5H7a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBoxArrowUpRight = /*#__PURE__*/makeIcon('BoxArrowUpRight', '<path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h8a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 5v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.5H9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBraces = /*#__PURE__*/makeIcon('Braces', '<path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>'); // eslint-disable-next-line

  var BIconBriefcase = /*#__PURE__*/makeIcon('Briefcase', '<path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-6h-1v6a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-6H0v6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5v2.384l-7.614 2.03a1.5 1.5 0 01-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 00-.5.5v1.616l6.871 1.832a.5.5 0 00.258 0L15 6.116V4.5a.5.5 0 00-.5-.5h-13zM5 2.5A1.5 1.5 0 016.5 1h3A1.5 1.5 0 0111 2.5V3h-1v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V3H5v-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBriefcaseFill = /*#__PURE__*/makeIcon('BriefcaseFill', '<path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5V6.85L8.129 8.947a.5.5 0 01-.258 0L0 6.85v5.65z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5v1.384l-7.614 2.03a1.5 1.5 0 01-.772 0L0 5.884V4.5zm5-2A1.5 1.5 0 016.5 1h3A1.5 1.5 0 0111 2.5V3h-1v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V3H5v-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessAltHigh = /*#__PURE__*/makeIcon('BrightnessAltHigh', '<path fill-rule="evenodd" d="M5.041 10.5h5.918a3 3 0 00-5.918 0zM4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11zm4-8a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 3zm8 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 11a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM4.464 7.464a.5.5 0 01-.707 0L2.343 6.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessAltHighFill = /*#__PURE__*/makeIcon('BrightnessAltHighFill', '<path fill-rule="evenodd" d="M4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11zm4-8a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 3zm8 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 11a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM4.464 7.464a.5.5 0 01-.707 0L2.343 6.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessAltLow = /*#__PURE__*/makeIcon('BrightnessAltLow', '<path d="M8.5 5.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 6a.5.5 0 110-1 .5.5 0 010 1zm-11 0a.5.5 0 110-1 .5.5 0 010 1zm9.743-4.036a.5.5 0 11-.707-.707.5.5 0 01.707.707zm-8.486 0a.5.5 0 11.707-.707.5.5 0 01-.707.707z"/><path fill-rule="evenodd" d="M5.041 10.5h5.918a3 3 0 00-5.918 0zM4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessAltLowFill = /*#__PURE__*/makeIcon('BrightnessAltLowFill', '<path d="M8.5 5.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 6a.5.5 0 110-1 .5.5 0 010 1zm-11 0a.5.5 0 110-1 .5.5 0 010 1zm9.743-4.036a.5.5 0 11-.707-.707.5.5 0 01.707.707zm-8.486 0a.5.5 0 11.707-.707.5.5 0 01-.707.707z"/><path fill-rule="evenodd" d="M4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessHigh = /*#__PURE__*/makeIcon('BrightnessHigh', '<path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessHighFill = /*#__PURE__*/makeIcon('BrightnessHighFill', '<circle cx="8" cy="8" r="4"/><path fill-rule="evenodd" d="M8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBrightnessLow = /*#__PURE__*/makeIcon('BrightnessLow', '<path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><circle cx="8" cy="2.5" r=".5"/><circle cx="8" cy="13.5" r=".5"/><circle cx="13.5" cy="8" r=".5" transform="rotate(90 13.5 8)"/><circle cx="2.5" cy="8" r=".5" transform="rotate(90 2.5 8)"/><circle cx="11.889" cy="4.111" r=".5" transform="rotate(45 11.89 4.11)"/><circle cx="4.111" cy="11.889" r=".5" transform="rotate(45 4.11 11.89)"/><circle cx="11.889" cy="11.889" r=".5" transform="rotate(135 11.89 11.889)"/><circle cx="4.111" cy="4.111" r=".5" transform="rotate(135 4.11 4.11)"/>'); // eslint-disable-next-line

  var BIconBrightnessLowFill = /*#__PURE__*/makeIcon('BrightnessLowFill', '<circle cx="8" cy="8" r="4"/><circle cx="8" cy="2.5" r=".5"/><circle cx="8" cy="13.5" r=".5"/><circle cx="13.5" cy="8" r=".5" transform="rotate(90 13.5 8)"/><circle cx="2.5" cy="8" r=".5" transform="rotate(90 2.5 8)"/><circle cx="11.889" cy="4.111" r=".5" transform="rotate(45 11.89 4.11)"/><circle cx="4.111" cy="11.889" r=".5" transform="rotate(45 4.11 11.89)"/><circle cx="11.889" cy="11.889" r=".5" transform="rotate(135 11.89 11.889)"/><circle cx="4.111" cy="4.111" r=".5" transform="rotate(135 4.11 4.11)"/>'); // eslint-disable-next-line

  var BIconBrush = /*#__PURE__*/makeIcon('Brush', '<path d="M15.213 1.018a.572.572 0 01.756.05.57.57 0 01.057.746C15.085 3.082 12.044 7.107 9.6 9.55c-.71.71-1.42 1.243-1.952 1.596-.508.339-1.167.234-1.599-.197-.416-.416-.53-1.047-.212-1.543.346-.542.887-1.273 1.642-1.977 2.521-2.35 6.476-5.44 7.734-6.411z"/><path d="M7 12a2 2 0 01-2 2c-1 0-2 0-3.5-.5s.5-1 1-1.5 1.395-2 2.5-2a2 2 0 012 2z"/>'); // eslint-disable-next-line

  var BIconBucket = /*#__PURE__*/makeIcon('Bucket', '<path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 003.5 6h-1a5.5 5.5 0 1111 0h-1A4.5 4.5 0 008 1.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 012 5.5h12a.5.5 0 01.488.608l-1.826 8.217a1.5 1.5 0 01-1.464 1.175H4.802a1.5 1.5 0 01-1.464-1.175L1.512 6.108a.5.5 0 01.098-.42zm1.013.813l1.691 7.608a.5.5 0 00.488.392h6.396a.5.5 0 00.488-.392l1.69-7.608H2.624z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBucketFill = /*#__PURE__*/makeIcon('BucketFill', '<path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 003.5 6h-1a5.5 5.5 0 1111 0h-1A4.5 4.5 0 008 1.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 012 5.5h12a.5.5 0 01.488.608l-1.826 8.217a1.5 1.5 0 01-1.464 1.175H4.802a1.5 1.5 0 01-1.464-1.175L1.512 6.108a.5.5 0 01.098-.42z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconBuilding = /*#__PURE__*/makeIcon('Building', '<path fill-rule="evenodd" d="M15.285.089A.5.5 0 0115.5.5v15a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V14h-1v1.5a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5v-6a.5.5 0 01.418-.493l5.582-.93V3.5a.5.5 0 01.324-.468l8-3a.5.5 0 01.46.057zM7.5 3.846V8.5a.5.5 0 01-.418.493l-5.582.93V15h8v-1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V15h2V1.222l-7 2.624z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 15.5v-7h1v7h-1z" clip-rule="evenodd"/><path d="M2.5 11h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm6-10h1v1h-1V3zm2 0h1v1h-1V3zm-4 2h1v1h-1V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm-2 2h1v1h-1V7zm2 0h1v1h-1V7zm-4 0h1v1h-1V7zm0 2h1v1h-1V9zm2 0h1v1h-1V9zm2 0h1v1h-1V9zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1z"/>'); // eslint-disable-next-line

  var BIconBullseye = /*#__PURE__*/makeIcon('Bullseye', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 13A5 5 0 108 3a5 5 0 000 10zm0 1A6 6 0 108 2a6 6 0 000 12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><path d="M9.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>'); // eslint-disable-next-line

  var BIconCalendar = /*#__PURE__*/makeIcon('Calendar', '<path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCalendarFill = /*#__PURE__*/makeIcon('CalendarFill', '<path d="M0 2a2 2 0 012-2h12a2 2 0 012 2H0z"/><path fill-rule="evenodd" d="M0 3h16v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm6.5 4a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCamera = /*#__PURE__*/makeIcon('Camera', '<path d="M9 5C7.343 5 5 6.343 5 8a4 4 0 014-4v1z"/><path fill-rule="evenodd" d="M14.333 3h-2.015A5.97 5.97 0 009 2a5.972 5.972 0 00-3.318 1H1.667C.747 3 0 3.746 0 4.667v6.666C0 12.253.746 13 1.667 13h4.015c.95.632 2.091 1 3.318 1a5.973 5.973 0 003.318-1h2.015c.92 0 1.667-.746 1.667-1.667V4.667C16 3.747 15.254 3 14.333 3zM1.5 5a.5.5 0 100-1 .5.5 0 000 1zM9 13A5 5 0 109 3a5 5 0 000 10z" clip-rule="evenodd"/><path d="M2 3a1 1 0 011-1h1a1 1 0 010 2H3a1 1 0 01-1-1z"/>'); // eslint-disable-next-line

  var BIconCameraVideo = /*#__PURE__*/makeIcon('CameraVideo', '<path fill-rule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 01.5 11.333V4.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 01.482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCameraVideoFill = /*#__PURE__*/makeIcon('CameraVideoFill', '<path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/><path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

  var BIconCapslock = /*#__PURE__*/makeIcon('Capslock', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM14.346 8.5L8 1.731 1.654 8.5H4.5a1 1 0 011 1v1h5v-1a1 1 0 011-1h2.846zm-9.846 5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1zm6 0h-5v1h5v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCapslockFill = /*#__PURE__*/makeIcon('CapslockFill', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCardChecklist = /*#__PURE__*/makeIcon('CardChecklist', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCardHeading = /*#__PURE__*/makeIcon('CardHeading', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 8.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M3 5.5a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-1z"/>'); // eslint-disable-next-line

  var BIconCardImage = /*#__PURE__*/makeIcon('CardImage', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCardList = /*#__PURE__*/makeIcon('CardList', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 015 8zm0-2.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0 5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><circle cx="3.5" cy="5.5" r=".5"/><circle cx="3.5" cy="8" r=".5"/><circle cx="3.5" cy="10.5" r=".5"/>'); // eslint-disable-next-line

  var BIconCardText = /*#__PURE__*/makeIcon('CardText', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 5.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 8zm0 2.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCaretDown = /*#__PURE__*/makeIcon('CaretDown', '<path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCaretDownFill = /*#__PURE__*/makeIcon('CaretDownFill', '<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>'); // eslint-disable-next-line

  var BIconCaretLeft = /*#__PURE__*/makeIcon('CaretLeft', '<path fill-rule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 010-1.506l5.48-4.796A1 1 0 0111 3.204v9.592a1 1 0 01-1.659.753z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCaretLeftFill = /*#__PURE__*/makeIcon('CaretLeftFill', '<path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 00-1.659-.753l-5.48 4.796a1 1 0 000 1.506z"/>'); // eslint-disable-next-line

  var BIconCaretRight = /*#__PURE__*/makeIcon('CaretRight', '<path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 000-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 001.659.753z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCaretRightFill = /*#__PURE__*/makeIcon('CaretRightFill', '<path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"/>'); // eslint-disable-next-line

  var BIconCaretUp = /*#__PURE__*/makeIcon('CaretUp', '<path fill-rule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 011.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 01-.753-1.659z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCaretUpFill = /*#__PURE__*/makeIcon('CaretUpFill', '<path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>'); // eslint-disable-next-line

  var BIconChat = /*#__PURE__*/makeIcon('Chat', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatDots = /*#__PURE__*/makeIcon('ChatDots', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/><path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>'); // eslint-disable-next-line

  var BIconChatDotsFill = /*#__PURE__*/makeIcon('ChatDotsFill', '<path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatFill = /*#__PURE__*/makeIcon('ChatFill', '<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 008 15z"/>'); // eslint-disable-next-line

  var BIconChatQuote = /*#__PURE__*/makeIcon('ChatQuote', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/><path d="M7.468 7.667c0 .92-.776 1.666-1.734 1.666S4 8.587 4 7.667C4 6.747 4.776 6 5.734 6s1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M6.157 6.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.923.997.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.47-.563zm-.035-.012h-.001.001z" clip-rule="evenodd"/><path d="M11.803 7.667c0 .92-.776 1.666-1.734 1.666-.957 0-1.734-.746-1.734-1.666 0-.92.777-1.667 1.734-1.667.958 0 1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M10.492 6.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.924.997.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.469-.563zm-.034-.012h-.002.002z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatQuoteFill = /*#__PURE__*/makeIcon('ChatQuoteFill', '<path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 9.333 4 8.587 4 7.667 4 6.747 4.776 6 5.734 6c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 9.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c.42-.416.672-.831.81-1.22z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatSquare = /*#__PURE__*/makeIcon('ChatSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatSquareDots = /*#__PURE__*/makeIcon('ChatSquareDots', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M5 6a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>'); // eslint-disable-next-line

  var BIconChatSquareDotsFill = /*#__PURE__*/makeIcon('ChatSquareDotsFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.5a1 1 0 00-.8.4l-1.9 2.533a1 1 0 01-1.6 0L5.3 12.4a1 1 0 00-.8-.4H2a2 2 0 01-2-2V2zm5 4a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatSquareFill = /*#__PURE__*/makeIcon('ChatSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatSquareQuote = /*#__PURE__*/makeIcon('ChatSquareQuote', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M7.468 5.667c0 .92-.776 1.666-1.734 1.666S4 6.587 4 5.667C4 4.747 4.776 4 5.734 4s1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M6.157 4.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.923.997.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.47-.563z" clip-rule="evenodd"/><path d="M11.803 5.667c0 .92-.776 1.666-1.734 1.666-.957 0-1.734-.746-1.734-1.666 0-.92.777-1.667 1.734-1.667.958 0 1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M10.492 4.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.924.997.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.469-.563z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChatSquareQuoteFill = /*#__PURE__*/makeIcon('ChatSquareQuoteFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.5a1 1 0 00-.8.4l-1.9 2.533a1 1 0 01-1.6 0L5.3 12.4a1 1 0 00-.8-.4H2a2 2 0 01-2-2V2zm7.194 2.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 7.333 4 6.587 4 5.667 4 4.747 4.776 4 5.734 4c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 7.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c.42-.416.672-.831.81-1.22z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCheck = /*#__PURE__*/makeIcon('Check', '<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCheckAll = /*#__PURE__*/makeIcon('CheckAll', '<path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>'); // eslint-disable-next-line

  var BIconCheckBox = /*#__PURE__*/makeIcon('CheckBox', '<path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCheckCircle = /*#__PURE__*/makeIcon('CheckCircle', '<path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarContract = /*#__PURE__*/makeIcon('ChevronBarContract', '<path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 00.708 0L8 11.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zm0-13.708a.5.5 0 01.708 0L8 4.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zM1 8a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarDown = /*#__PURE__*/makeIcon('ChevronBarDown', '<path fill-rule="evenodd" d="M3.646 4.146a.5.5 0 01.708 0L8 7.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zM1 11.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarExpand = /*#__PURE__*/makeIcon('ChevronBarExpand', '<path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 01.708 0L8 13.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zm0-4.292a.5.5 0 00.708 0L8 2.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zM1 8a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarLeft = /*#__PURE__*/makeIcon('ChevronBarLeft', '<path fill-rule="evenodd" d="M11.854 3.646a.5.5 0 010 .708L8.207 8l3.647 3.646a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0zM4.5 1a.5.5 0 00-.5.5v13a.5.5 0 001 0v-13a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarRight = /*#__PURE__*/makeIcon('ChevronBarRight', '<path fill-rule="evenodd" d="M4.146 3.646a.5.5 0 000 .708L7.793 8l-3.647 3.646a.5.5 0 00.708.708l4-4a.5.5 0 000-.708l-4-4a.5.5 0 00-.708 0zM11.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronBarUp = /*#__PURE__*/makeIcon('ChevronBarUp', '<path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 00.708 0L8 8.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 000-.8H2.8a.4.4 0 00-.4.4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronCompactDown = /*#__PURE__*/makeIcon('ChevronCompactDown', '<path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronCompactLeft = /*#__PURE__*/makeIcon('ChevronCompactLeft', '<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronCompactRight = /*#__PURE__*/makeIcon('ChevronCompactRight', '<path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronCompactUp = /*#__PURE__*/makeIcon('ChevronCompactUp', '<path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 01.448 0l6 3a.5.5 0 11-.448.894L8 6.56 2.224 9.447a.5.5 0 11-.448-.894l6-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronContract = /*#__PURE__*/makeIcon('ChevronContract', '<path fill-rule="evenodd" d="M3.646 13.854a.5.5 0 00.708 0L8 10.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zm0-11.708a.5.5 0 01.708 0L8 5.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronDoubleDown = /*#__PURE__*/makeIcon('ChevronDoubleDown', '<path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 01.708 0L8 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 01.708 0L8 8.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronDoubleLeft = /*#__PURE__*/makeIcon('ChevronDoubleLeft', '<path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 010 .708L2.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 010 .708L6.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronDoubleRight = /*#__PURE__*/makeIcon('ChevronDoubleRight', '<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L9.293 8 3.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L13.293 8 7.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronDoubleUp = /*#__PURE__*/makeIcon('ChevronDoubleUp', '<path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 3.707 2.354 9.354a.5.5 0 11-.708-.708l6-6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronDown = /*#__PURE__*/makeIcon('ChevronDown', '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronExpand = /*#__PURE__*/makeIcon('ChevronExpand', '<path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 01.708 0L8 12.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zm0-2.292a.5.5 0 00.708 0L8 3.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronLeft = /*#__PURE__*/makeIcon('ChevronLeft', '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronRight = /*#__PURE__*/makeIcon('ChevronRight', '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconChevronUp = /*#__PURE__*/makeIcon('ChevronUp', '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCircle = /*#__PURE__*/makeIcon('Circle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCircleFill = /*#__PURE__*/makeIcon('CircleFill', '<circle cx="8" cy="8" r="8"/>'); // eslint-disable-next-line

  var BIconCircleHalf = /*#__PURE__*/makeIcon('CircleHalf', '<path fill-rule="evenodd" d="M8 15V1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCircleSquare = /*#__PURE__*/makeIcon('CircleSquare', '<path d="M0 6a6 6 0 1112 0A6 6 0 010 6z"/><path d="M12.93 5h1.57a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-1.57a6.953 6.953 0 01-1-.22v1.79A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4h-1.79c.097.324.17.658.22 1z"/>'); // eslint-disable-next-line

  var BIconClipboard = /*#__PURE__*/makeIcon('Clipboard', '<path fill-rule="evenodd" d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconClipboardData = /*#__PURE__*/makeIcon('ClipboardData', '<path fill-rule="evenodd" d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" clip-rule="evenodd"/><path d="M4 11a1 1 0 112 0v1a1 1 0 11-2 0v-1zm6-4a1 1 0 112 0v5a1 1 0 11-2 0V7zM7 9a1 1 0 012 0v3a1 1 0 11-2 0V9z"/>'); // eslint-disable-next-line

  var BIconClock = /*#__PURE__*/makeIcon('Clock', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconClockFill = /*#__PURE__*/makeIcon('ClockFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconClockHistory = /*#__PURE__*/makeIcon('ClockHistory', '<path fill-rule="evenodd" d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCloud = /*#__PURE__*/makeIcon('Cloud', '<path fill-rule="evenodd" d="M4.887 7.2l-.964-.165A2.5 2.5 0 103.5 12h10a1.5 1.5 0 00.237-2.981L12.7 8.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96zm9.084.341a5 5 0 00-9.88-1.492A3.5 3.5 0 103.5 13h9.999a2.5 2.5 0 00.394-4.968c.033-.16.06-.324.077-.49z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCloudDownload = /*#__PURE__*/makeIcon('CloudDownload', '<path d="M4.887 5.2l-.964-.165A2.5 2.5 0 103.5 10H6v1H3.5a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.501 2.501 0 0113.5 11H10v-1h3.5a1.5 1.5 0 00.237-2.981L12.7 6.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96z"/><path fill-rule="evenodd" d="M5 12.5a.5.5 0 01.707 0L8 14.793l2.293-2.293a.5.5 0 11.707.707l-2.646 2.646a.5.5 0 01-.708 0L5 13.207a.5.5 0 010-.707z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCloudFill = /*#__PURE__*/makeIcon('CloudFill', '<path fill-rule="evenodd" d="M3.5 13a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.5 2.5 0 0113.5 13h-10z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCloudUpload = /*#__PURE__*/makeIcon('CloudUpload', '<path d="M4.887 6.2l-.964-.165A2.5 2.5 0 103.5 11H6v1H3.5a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.501 2.501 0 0113.5 12H10v-1h3.5a1.5 1.5 0 00.237-2.981L12.7 7.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96z"/><path fill-rule="evenodd" d="M5 8.854a.5.5 0 00.707 0L8 6.56l2.293 2.293A.5.5 0 1011 8.146L8.354 5.5a.5.5 0 00-.708 0L5 8.146a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCode = /*#__PURE__*/makeIcon('Code', '<path fill-rule="evenodd" d="M5.854 4.146a.5.5 0 010 .708L2.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm4.292 0a.5.5 0 000 .708L13.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCodeSlash = /*#__PURE__*/makeIcon('CodeSlash', '<path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 01-.955-.294l4-13a.5.5 0 01.625-.33z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCollection = /*#__PURE__*/makeIcon('Collection', '<path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCollectionFill = /*#__PURE__*/makeIcon('CollectionFill', '<rect width="16" height="10" rx="1.5" transform="matrix(1 0 0 -1 0 14.5)"/><path fill-rule="evenodd" d="M2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCollectionPlay = /*#__PURE__*/makeIcon('CollectionPlay', '<path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.258 6.563a.5.5 0 01.507.013l4 2.5a.5.5 0 010 .848l-4 2.5A.5.5 0 016 12V7a.5.5 0 01.258-.437z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCollectionPlayFill = /*#__PURE__*/makeIcon('CollectionPlayFill', '<path fill-rule="evenodd" d="M1.5 14.5A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zm5.265-7.924A.5.5 0 006 7v5a.5.5 0 00.765.424l4-2.5a.5.5 0 000-.848l-4-2.5zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconColumns = /*#__PURE__*/makeIcon('Columns', '<path fill-rule="evenodd" d="M15 2H1v12h14V2zM1 1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 14V2h1v12h-1zm0-8H1V5h6.5v1zm7.5 5H8.5v-1H15v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconColumnsGap = /*#__PURE__*/makeIcon('ColumnsGap', '<path fill-rule="evenodd" d="M6 1H1v3h5V1zM1 0a1 1 0 00-1 1v3a1 1 0 001 1h5a1 1 0 001-1V1a1 1 0 00-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 00-1 1v3a1 1 0 001 1h5a1 1 0 001-1v-3a1 1 0 00-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 00-1 1v7a1 1 0 001 1h5a1 1 0 001-1V8a1 1 0 00-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 00-1 1v7a1 1 0 001 1h5a1 1 0 001-1V1a1 1 0 00-1-1h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCommand = /*#__PURE__*/makeIcon('Command', '<path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 003.5 5H5V3.5a1.5 1.5 0 10-3 0zM6 6V3.5A2.5 2.5 0 103.5 6H6zm8-2.5A1.5 1.5 0 0112.5 5H11V3.5a1.5 1.5 0 013 0zM10 6V3.5A2.5 2.5 0 1112.5 6H10zm-8 6.5A1.5 1.5 0 013.5 11H5v1.5a1.5 1.5 0 01-3 0zM6 10v2.5A2.5 2.5 0 113.5 10H6zm8 2.5a1.5 1.5 0 00-1.5-1.5H11v1.5a1.5 1.5 0 003 0zM10 10v2.5a2.5 2.5 0 102.5-2.5H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 6H6v4h4V6zM5 5v6h6V5H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCompass = /*#__PURE__*/makeIcon('Compass', '<path fill-rule="evenodd" d="M8 15.016a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0 1a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" clip-rule="evenodd"/><path d="M6 1a1 1 0 011-1h2a1 1 0 010 2H7a1 1 0 01-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z"/>'); // eslint-disable-next-line

  var BIconCone = /*#__PURE__*/makeIcon('Cone', '<path d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0L12 14H4L7.03 1.88z"/><path fill-rule="evenodd" d="M1.5 14a.5.5 0 01.5-.5h12a.5.5 0 010 1H2a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconConeStriped = /*#__PURE__*/makeIcon('ConeStriped', '<path fill-rule="evenodd" d="M7.879 11.015a.5.5 0 01.242 0l6 1.5a.5.5 0 01.037.96l-6 2a.499.499 0 01-.316 0l-6-2a.5.5 0 01.037-.96l6-1.5z" clip-rule="evenodd"/><path d="M11.885 12.538l-.72-2.877C10.303 9.873 9.201 10 8 10s-2.303-.127-3.165-.339l-.72 2.877c-.073.292-.002.6.256.756C4.86 13.589 5.916 14 8 14s3.14-.411 3.63-.706c.257-.155.328-.464.255-.756zM9.97 4.88l.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.159-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098z"/>'); // eslint-disable-next-line

  var BIconController = /*#__PURE__*/makeIcon('Controller', '<path fill-rule="evenodd" d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 01-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 01-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 01-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 00-.748 2.295 12.351 12.351 0 00-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 00.426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 00.426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 00-.339-2.406 13.753 13.753 0 00-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" clip-rule="evenodd"/><path d="M11.5 6.026a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm2 0a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm-7-2.5h1v3h-1v-3z"/><path d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 01.354-.613l1.932-.518a.5.5 0 01.258.966l-1.932.518a.5.5 0 01-.612-.354zm9.976 0a.5.5 0 00-.353-.613l-1.932-.518a.5.5 0 10-.259.966l1.932.518a.5.5 0 00.612-.354z"/>'); // eslint-disable-next-line

  var BIconCreditCard = /*#__PURE__*/makeIcon('CreditCard', '<path fill-rule="evenodd" d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" clip-rule="evenodd"/><rect width="3" height="3" x="2" y="9" rx="1"/><path d="M1 5h14v2H1z"/>'); // eslint-disable-next-line

  var BIconCrop = /*#__PURE__*/makeIcon('Crop', '<path fill-rule="evenodd" d="M3.5.5A.5.5 0 014 1v13h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5V1a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.5 3.5A.5.5 0 011 3h2.5a.5.5 0 010 1H1a.5.5 0 01-.5-.5zm5.5 0a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4H6.5a.5.5 0 01-.5-.5zM14.5 14a.5.5 0 01.5.5V17a.5.5 0 01-1 0v-2.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCursor = /*#__PURE__*/makeIcon('Cursor', '<path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103zM2.25 8.184l3.897 1.67a.5.5 0 01.262.263l1.67 3.897L12.743 3.52 2.25 8.184z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCursorFill = /*#__PURE__*/makeIcon('CursorFill', '<path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconCursorText = /*#__PURE__*/makeIcon('CursorText', '<path fill-rule="evenodd" d="M5 2a.5.5 0 01.5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0110.5 1.5a.5.5 0 010 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 00-.436.294V7.5H9a.5.5 0 010 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 010 1 4.165 4.165 0 01-2.06-.566A4.561 4.561 0 018 13.65a4.561 4.561 0 01-.44.285 4.165 4.165 0 01-2.06.566.5.5 0 010-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 010-1h.5V3.228a3.49 3.49 0 00-.436-.294A3.166 3.166 0 005.5 2.5.5.5 0 015 2zm3.352 1.355zm-.704 9.29z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDash = /*#__PURE__*/makeIcon('Dash', '<path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDashCircle = /*#__PURE__*/makeIcon('DashCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDashCircleFill = /*#__PURE__*/makeIcon('DashCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDashSquare = /*#__PURE__*/makeIcon('DashSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDashSquareFill = /*#__PURE__*/makeIcon('DashSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDiamond = /*#__PURE__*/makeIcon('Diamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDiamondFill = /*#__PURE__*/makeIcon('DiamondFill', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDiamondHalf = /*#__PURE__*/makeIcon('DiamondHalf', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zM8 .989a.493.493 0 00-.35.145L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.493.493 0 00.35.145V.989z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDisplay = /*#__PURE__*/makeIcon('Display', '<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 010 1H5a.5.5 0 010-1h.75z"/><path fill-rule="evenodd" d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDisplayFill = /*#__PURE__*/makeIcon('DisplayFill', '<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 010 1H5a.5.5 0 010-1h.75z"/><path fill-rule="evenodd" d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/><path d="M2 4h12v6H2z"/>'); // eslint-disable-next-line

  var BIconDot = /*#__PURE__*/makeIcon('Dot', '<path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDownload = /*#__PURE__*/makeIcon('Download', '<path fill-rule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDroplet = /*#__PURE__*/makeIcon('Droplet', '<path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDropletFill = /*#__PURE__*/makeIcon('DropletFill', '<path fill-rule="evenodd" d="M8 16a6 6 0 006-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 006 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconDropletHalf = /*#__PURE__*/makeIcon('DropletHalf', '<path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" clip-rule="evenodd"/><path d="M14 10a6 6 0 01-12 0s2.5 2.5 6.5.5S14 10 14 10z"/>'); // eslint-disable-next-line

  var BIconEgg = /*#__PURE__*/makeIcon('Egg', '<path fill-rule="evenodd" d="M8 15a5 5 0 005-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 005 5zm0 1a6 6 0 006-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 006 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEggFill = /*#__PURE__*/makeIcon('EggFill', '<path d="M14 10a6 6 0 01-12 0C2 5.686 5 0 8 0s6 5.686 6 10z"/>'); // eslint-disable-next-line

  var BIconEggFried = /*#__PURE__*/makeIcon('EggFried', '<path fill-rule="evenodd" d="M13.665 6.113a1 1 0 01-.667-.977L13 5a4 4 0 00-6.483-3.136 1 1 0 01-.8.2 4 4 0 00-3.693 6.61 1 1 0 01.2 1 4 4 0 006.67 4.087 1 1 0 011.262-.152 2.5 2.5 0 003.715-2.905 1 1 0 01.341-1.113 2.001 2.001 0 00-.547-3.478zM14 5c0 .057 0 .113-.003.17a3.001 3.001 0 01.822 5.216 3.5 3.5 0 01-5.201 4.065 5 5 0 01-8.336-5.109A5 5 0 015.896 1.08 5 5 0 0114 5z" clip-rule="evenodd"/><circle cx="8" cy="8" r="3"/>'); // eslint-disable-next-line

  var BIconEject = /*#__PURE__*/makeIcon('Eject', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM14.346 8.5L8 1.731 1.654 8.5h12.692zM.5 11.5a1 1 0 011-1h13a1 1 0 011 1v1a1 1 0 01-1 1h-13a1 1 0 01-1-1v-1zm14 0h-13v1h13v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEjectFill = /*#__PURE__*/makeIcon('EjectFill', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM.5 11.5a1 1 0 011-1h13a1 1 0 011 1v1a1 1 0 01-1 1h-13a1 1 0 01-1-1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEnvelope = /*#__PURE__*/makeIcon('Envelope', '<path fill-rule="evenodd" d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.071 4.243a.5.5 0 01.686-.172L8 8.417l7.243-4.346a.5.5 0 01.514.858L8 9.583.243 4.93a.5.5 0 01-.172-.686z" clip-rule="evenodd"/><path d="M6.752 8.932l.432-.252-.504-.864-.432.252.504.864zm-6 3.5l6-3.5-.504-.864-6 3.5.504.864zm8.496-3.5l-.432-.252.504-.864.432.252-.504.864zm6 3.5l-6-3.5.504-.864 6 3.5-.504.864z"/>'); // eslint-disable-next-line

  var BIconEnvelopeFill = /*#__PURE__*/makeIcon('EnvelopeFill', '<path d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z"/>'); // eslint-disable-next-line

  var BIconEnvelopeOpen = /*#__PURE__*/makeIcon('EnvelopeOpen', '<path fill-rule="evenodd" d="M.243 6.929l.514-.858L8 10.417l7.243-4.346.514.858L8 11.583.243 6.93z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.184 10.68L.752 14.432l-.504-.864L6.68 9.816l.504.864zm1.632 0l6.432 3.752.504-.864L9.32 9.816l-.504.864z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.47 1.318a1 1 0 00-.94 0l-6 3.2A1 1 0 001 5.4V14a1 1 0 001 1h12a1 1 0 001-1V5.4a1 1 0 00-.53-.882l-6-3.2zM7.06.435a2 2 0 011.882 0l6 3.2A2 2 0 0116 5.4V14a2 2 0 01-2 2H2a2 2 0 01-2-2V5.4a2 2 0 011.059-1.765l6-3.2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEnvelopeOpenFill = /*#__PURE__*/makeIcon('EnvelopeOpenFill', '<path fill-rule="evenodd" d="M8.941.435a2 2 0 00-1.882 0l-6 3.2A2 2 0 000 5.4v.125l8 4.889 8-4.889V5.4a2 2 0 00-1.059-1.765l-6-3.2zM16 6.697l-5.875 3.59L16 13.743V6.697zm-.168 8.108L9.246 10.93l-.089-.052-.896.548-.261.159-.26-.16-.897-.547-.09.052-6.585 3.874A2 2 0 002 16h12a2 2 0 001.832-1.195zM0 13.743l5.875-3.456L0 6.697v7.046z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclamation = /*#__PURE__*/makeIcon('Exclamation', '<path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

  var BIconExclamationCircle = /*#__PURE__*/makeIcon('ExclamationCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

  var BIconExclamationCircleFill = /*#__PURE__*/makeIcon('ExclamationCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclamationDiamond = /*#__PURE__*/makeIcon('ExclamationDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

  var BIconExclamationDiamondFill = /*#__PURE__*/makeIcon('ExclamationDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclamationOctagon = /*#__PURE__*/makeIcon('ExclamationOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

  var BIconExclamationOctagonFill = /*#__PURE__*/makeIcon('ExclamationOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclamationSquare = /*#__PURE__*/makeIcon('ExclamationSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

  var BIconExclamationSquareFill = /*#__PURE__*/makeIcon('ExclamationSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclamationTriangle = /*#__PURE__*/makeIcon('ExclamationTriangle', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L8.12 2.073a.146.146 0 00-.054-.057A.13.13 0 008.002 2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/><path d="M7.002 12a1 1 0 112 0 1 1 0 01-2 0zM7.1 5.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995z"/>'); // eslint-disable-next-line

  var BIconExclamationTriangleFill = /*#__PURE__*/makeIcon('ExclamationTriangleFill', '<path fill-rule="evenodd" d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 5zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconExclude = /*#__PURE__*/makeIcon('Exclude', '<path fill-rule="evenodd" d="M1.5 0A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12H4v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12V1.5A1.5 1.5 0 0010.5 0h-9zM12 4H5.5A1.5 1.5 0 004 5.5V12h6.5a1.5 1.5 0 001.5-1.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEye = /*#__PURE__*/makeIcon('Eye', '<path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEyeFill = /*#__PURE__*/makeIcon('EyeFill', '<path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/><path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEyeSlash = /*#__PURE__*/makeIcon('EyeSlash', '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconEyeSlashFill = /*#__PURE__*/makeIcon('EyeSlashFill', '<path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 01-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 002.79-.588zM5.21 3.088A7.028 7.028 0 018 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 00-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 002.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 012.829 2.829z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFile = /*#__PURE__*/makeIcon('File', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileArrowDown = /*#__PURE__*/makeIcon('FileArrowDown', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 8.146a.5.5 0 01.708 0L8 10.793l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4a.5.5 0 01.5.5v6a.5.5 0 01-1 0v-6A.5.5 0 018 4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileArrowUp = /*#__PURE__*/makeIcon('FileArrowUp', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 7.854a.5.5 0 00.708 0L8 5.207l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 12a.5.5 0 00.5-.5v-6a.5.5 0 00-1 0v6a.5.5 0 00.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileBreak = /*#__PURE__*/makeIcon('FileBreak', '<path fill-rule="evenodd" d="M0 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M12 1H4a2 2 0 00-2 2v6h1V3a1 1 0 011-1h8a1 1 0 011 1v6h1V3a2 2 0 00-2-2zm2 11h-1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1H2v1a2 2 0 002 2h8a2 2 0 002-2v-1z"/>'); // eslint-disable-next-line

  var BIconFileCheck = /*#__PURE__*/makeIcon('FileCheck', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M15.854 2.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 4.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileCode = /*#__PURE__*/makeIcon('FileCode', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L10.293 8 8.646 6.354a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L5.707 8l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileDiff = /*#__PURE__*/makeIcon('FileDiff', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 10.5A.5.5 0 016 10h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM8 4a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 016 6h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmark = /*#__PURE__*/makeIcon('FileEarmark', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

  var BIconFileEarmarkArrowDown = /*#__PURE__*/makeIcon('FileEarmarkArrowDown', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.646 9.146a.5.5 0 01.708 0L8 10.793l1.646-1.647a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkArrowUp = /*#__PURE__*/makeIcon('FileEarmarkArrowUp', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.646 8.854a.5.5 0 00.708 0L8 7.207l1.646 1.647a.5.5 0 00.708-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 12a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v4a.5.5 0 00.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkBreak = /*#__PURE__*/makeIcon('FileEarmarkBreak', '<path fill-rule="evenodd" d="M9 1H4a2 2 0 00-2 2v6h1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v3h1V6L9 1zm5 11h-1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1H2v1a2 2 0 002 2h8a2 2 0 002-2v-1zM0 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkCheck = /*#__PURE__*/makeIcon('FileEarmarkCheck', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkCode = /*#__PURE__*/makeIcon('FileEarmarkCode', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M8.646 6.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L10.293 9 8.646 7.354a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L5.707 9l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkDiff = /*#__PURE__*/makeIcon('FileEarmarkDiff', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.5 11.5A.5.5 0 016 11h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM8 5a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkMinus = /*#__PURE__*/makeIcon('FileEarmarkMinus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M11 11.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkPlus = /*#__PURE__*/makeIcon('FileEarmarkPlus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkRuled = /*#__PURE__*/makeIcon('FileEarmarkRuled', '<path fill-rule="evenodd" d="M13 9H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V9h1v5H5z" clip-rule="evenodd"/><path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

  var BIconFileEarmarkSpreadsheet = /*#__PURE__*/makeIcon('FileEarmarkSpreadsheet', '<path fill-rule="evenodd" d="M13 9H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V9h1v5H5zm4 0V9h1v5H9z" clip-rule="evenodd"/><path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

  var BIconFileEarmarkText = /*#__PURE__*/makeIcon('FileEarmarkText', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileEarmarkZip = /*#__PURE__*/makeIcon('FileEarmarkZip', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5 8.5a1 1 0 011-1h1a1 1 0 011 1v.938l.4 1.599a1 1 0 01-.416 1.074l-.93.62a1 1 0 01-1.11 0l-.929-.62a1 1 0 01-.415-1.074L5 9.438V8.5zm2 0H6v.938a1 1 0 01-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 017 9.438V8.5z" clip-rule="evenodd"/><path d="M6 2h1.5v1H6zM5 3h1.5v1H5zm1 1h1.5v1H6zM5 5h1.5v1H5zm1 1h1.5v1H6V6z"/>'); // eslint-disable-next-line

  var BIconFileMinus = /*#__PURE__*/makeIcon('FileMinus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFilePlus = /*#__PURE__*/makeIcon('FilePlus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M13.5 1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFilePost = /*#__PURE__*/makeIcon('FilePost', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path d="M4 5.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z"/><path fill-rule="evenodd" d="M4 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileRichtext = /*#__PURE__*/makeIcon('FileRichtext', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 015 11h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 9h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm1.639-3.708l1.33.886 1.854-1.855a.25.25 0 01.289-.047l1.888.974V7.5a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V7s1.54-1.274 1.639-1.208zM6.25 5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileRuled = /*#__PURE__*/makeIcon('FileRuled', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path stroke="currentColor" d="M3 5.5h10m-10 3h10m-10 3h10M5.5 6v8"/>'); // eslint-disable-next-line

  var BIconFileSpreadsheet = /*#__PURE__*/makeIcon('FileSpreadsheet', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 6H3V5h10v1zm0 3H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V6h1v8H5zm4 0V6h1v8H9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileText = /*#__PURE__*/makeIcon('FileText', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 015 10h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 6h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 4h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFileZip = /*#__PURE__*/makeIcon('FileZip', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 8.5a1 1 0 011-1h1a1 1 0 011 1v.938l.4 1.599a1 1 0 01-.416 1.074l-.93.62a1 1 0 01-1.109 0l-.93-.62a1 1 0 01-.415-1.074l.4-1.599V8.5zm2 0h-1v.938a1 1 0 01-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 01-.03-.243V8.5z" clip-rule="evenodd"/><path d="M7.5 2H9v1H7.5zm-1 1H8v1H6.5zm1 1H9v1H7.5zm-1 1H8v1H6.5zm1 1H9v1H7.5V6z"/>'); // eslint-disable-next-line

  var BIconFiles = /*#__PURE__*/makeIcon('Files', '<path fill-rule="evenodd" d="M3 2h8a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/><path d="M5 0h8a2 2 0 012 2v10a2 2 0 01-2 2v-1a1 1 0 001-1V2a1 1 0 00-1-1H5a1 1 0 00-1 1H3a2 2 0 012-2z"/>'); // eslint-disable-next-line

  var BIconFilesAlt = /*#__PURE__*/makeIcon('FilesAlt', '<path fill-rule="evenodd" d="M3 1h8a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H3z" clip-rule="evenodd"/><path d="M13 4V3a2 2 0 012 2v6a2 2 0 01-2 2v-1a1 1 0 001-1V5a1 1 0 00-1-1z"/>'); // eslint-disable-next-line

  var BIconFilm = /*#__PURE__*/makeIcon('Film', '<path fill-rule="evenodd" d="M0 1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm4 0h8v6H4V1zm8 8H4v6h8V9zM1 1h2v2H1V1zm2 3H1v2h2V4zM1 7h2v2H1V7zm2 3H1v2h2v-2zm-2 3h2v2H1v-2zM15 1h-2v2h2V1zm-2 3h2v2h-2V4zm2 3h-2v2h2V7zm-2 3h2v2h-2v-2zm2 3h-2v2h2v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFilter = /*#__PURE__*/makeIcon('Filter', '<path fill-rule="evenodd" d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFilterLeft = /*#__PURE__*/makeIcon('FilterLeft', '<path fill-rule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFilterRight = /*#__PURE__*/makeIcon('FilterRight', '<path fill-rule="evenodd" d="M14 10.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5zm0-3a.5.5 0 00-.5-.5h-7a.5.5 0 000 1h7a.5.5 0 00.5-.5zm0-3a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFlag = /*#__PURE__*/makeIcon('Flag', '<path fill-rule="evenodd" d="M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 11-.515-.858C4.735 7.909 5.348 7.5 6.5 7.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.456-.204 1-.43 1.64-.512V2.543c-.433.074-.83.234-1.234.414l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 3.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 01-.554-.832l.04-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFlagFill = /*#__PURE__*/makeIcon('FlagFill', '<path fill-rule="evenodd" d="M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 013.5 9V3a.5.5 0 01.223-.416l.04-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolder = /*#__PURE__*/makeIcon('Folder', '<path d="M9.828 4a3 3 0 01-2.12-.879l-.83-.828A1 1 0 006.173 2H2.5a1 1 0 00-1 .981L1.546 4h-1L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3v1z"/><path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0013.81 4zM2.19 3A2 2 0 00.198 5.181l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3H2.19z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolderCheck = /*#__PURE__*/makeIcon('FolderCheck', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolderFill = /*#__PURE__*/makeIcon('FolderFill', '<path fill-rule="evenodd" d="M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 006.172 2H2.5a1 1 0 00-1 .981l.006.139z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolderMinus = /*#__PURE__*/makeIcon('FolderMinus', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 11.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolderPlus = /*#__PURE__*/makeIcon('FolderPlus', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFolderSymlink = /*#__PURE__*/makeIcon('FolderSymlink', '<path d="M9.828 4a3 3 0 01-2.12-.879l-.83-.828A1 1 0 006.173 2H2.5a1 1 0 00-1 .981L1.546 4h-1L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3v1z"/><path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0013.81 4zM2.19 3A2 2 0 00.198 5.181l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3H2.19z" clip-rule="evenodd"/><path d="M8.616 10.24l3.182-1.969a.443.443 0 000-.742l-3.182-1.97c-.27-.166-.616.036-.616.372V6.7c-.857 0-3.429 0-4 4.8 1.429-2.7 4-2.4 4-2.4v.769c0 .336.346.538.616.371z"/>'); // eslint-disable-next-line

  var BIconFolderSymlinkFill = /*#__PURE__*/makeIcon('FolderSymlinkFill', '<path fill-rule="evenodd" d="M13.81 3H9.828a2 2 0 01-1.414-.586l-.828-.828A2 2 0 006.172 1H2.5a2 2 0 00-2 2l.04.87a1.99 1.99 0 00-.342 1.311l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3zM2.19 3c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293L7.586 3H2.19zm9.608 5.271l-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFonts = /*#__PURE__*/makeIcon('Fonts', '<path d="M12.258 3H3.747l-.082 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.43.013c1.935.062 2.434.301 2.694 1.846h.479L12.258 3z"/>'); // eslint-disable-next-line

  var BIconForward = /*#__PURE__*/makeIcon('Forward', '<path fill-rule="evenodd" d="M9.502 5.513a.144.144 0 00-.202.134V6.65a.5.5 0 01-.5.5H2.5v2.9h6.3a.5.5 0 01.5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.503H2a.5.5 0 01-.5-.5v-3.9a.5.5 0 01.5-.5h6.3v-.503z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconForwardFill = /*#__PURE__*/makeIcon('ForwardFill', '<path d="M9.77 12.11l4.012-2.953a.647.647 0 000-1.114L9.771 5.09a.644.644 0 00-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z"/>'); // eslint-disable-next-line

  var BIconFullscreen = /*#__PURE__*/makeIcon('Fullscreen', '<path fill-rule="evenodd" d="M1.5 1a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4A1.5 1.5 0 011.5 0h4a.5.5 0 010 1h-4zM10 .5a.5.5 0 01.5-.5h4A1.5 1.5 0 0116 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zM.5 10a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 010 14.5v-4a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v4a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFullscreenExit = /*#__PURE__*/makeIcon('FullscreenExit', '<path fill-rule="evenodd" d="M5.5 0a.5.5 0 01.5.5v4A1.5 1.5 0 014.5 6h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5zm5 0a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 0110 4.5v-4a.5.5 0 01.5-.5zM0 10.5a.5.5 0 01.5-.5h4A1.5 1.5 0 016 11.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zm10 1a1.5 1.5 0 011.5-1.5h4a.5.5 0 010 1h-4a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFunnel = /*#__PURE__*/makeIcon('Funnel', '<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 017 8.5v5.306l2-.666V8.5a.5.5 0 01.128-.334L13.5 3.308V2h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconFunnelFill = /*#__PURE__*/makeIcon('FunnelFill', '<path d="M2 3.5v-2h12v2l-4.5 5v5l-3 1v-6L2 3.5z"/><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 017 8.5v5.306l2-.666V8.5a.5.5 0 01.128-.334L13.5 3.308V2h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGear = /*#__PURE__*/makeIcon('Gear', '<path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGearFill = /*#__PURE__*/makeIcon('GearFill', '<path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 100-5.86 2.929 2.929 0 000 5.858z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGearWide = /*#__PURE__*/makeIcon('GearWide', '<path fill-rule="evenodd" d="M9.928 1.723c-.243-.97-1.62-.97-1.863 0l-.072.286a.96.96 0 01-1.622.435l-.204-.212c-.695-.718-1.889-.03-1.614.932l.08.283a.96.96 0 01-1.186 1.187l-.283-.081c-.961-.275-1.65.919-.932 1.614l.212.204a.96.96 0 01-.435 1.622l-.286.072c-.97.242-.97 1.62 0 1.863l.286.071a.96.96 0 01.435 1.622l-.212.205c-.718.695-.03 1.888.932 1.613l.283-.08a.96.96 0 011.187 1.187l-.081.283c-.275.96.919 1.65 1.614.931l.204-.211a.96.96 0 011.622.434l.072.286c.242.97 1.62.97 1.863 0l.071-.286a.96.96 0 011.622-.434l.205.212c.695.718 1.888.029 1.613-.932l-.08-.283a.96.96 0 011.187-1.188l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205A.96.96 0 0115.983 10l.286-.071c.97-.243.97-1.62 0-1.863l-.286-.072a.96.96 0 01-.434-1.622l.212-.204c.718-.695.029-1.889-.932-1.614l-.283.08a.96.96 0 01-1.188-1.186l.081-.283c.275-.961-.918-1.65-1.613-.932l-.205.212A.96.96 0 0110 2.009l-.071-.286zm-.932 12.27a4.998 4.998 0 100-9.994 4.998 4.998 0 000 9.995z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGearWideConnected = /*#__PURE__*/makeIcon('GearWideConnected', '<path fill-rule="evenodd" d="M9.928 1.723c-.243-.97-1.62-.97-1.863 0l-.072.286a.96.96 0 01-1.622.435l-.204-.212c-.695-.718-1.889-.03-1.614.932l.08.283a.96.96 0 01-1.186 1.187l-.283-.081c-.961-.275-1.65.919-.932 1.614l.212.204a.96.96 0 01-.435 1.622l-.286.072c-.97.242-.97 1.62 0 1.863l.286.071a.96.96 0 01.435 1.622l-.212.205c-.718.695-.03 1.888.932 1.613l.283-.08a.96.96 0 011.187 1.187l-.081.283c-.275.96.919 1.65 1.614.931l.204-.211a.96.96 0 011.622.434l.072.286c.242.97 1.62.97 1.863 0l.071-.286a.96.96 0 011.622-.434l.205.212c.695.718 1.888.029 1.613-.932l-.08-.283a.96.96 0 011.187-1.188l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205A.96.96 0 0115.983 10l.286-.071c.97-.243.97-1.62 0-1.863l-.286-.072a.96.96 0 01-.434-1.622l.212-.204c.718-.695.029-1.889-.932-1.614l-.283.08a.96.96 0 01-1.188-1.186l.081-.283c.275-.961-.918-1.65-1.613-.932l-.205.212A.96.96 0 0110 2.009l-.071-.286zm-.932 12.27a4.998 4.998 0 100-9.994 4.998 4.998 0 000 9.995z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.372 8.996L5.598 5.298l.8-.6 2.848 3.798h4.748v1H9.246l-2.849 3.798-.8-.6 2.775-3.698z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGem = /*#__PURE__*/makeIcon('Gem', '<path fill-rule="evenodd" d="M3.1.7a.5.5 0 01.4-.2h9a.5.5 0 01.4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 01-.8 0L.1 5.3a.5.5 0 010-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGeo = /*#__PURE__*/makeIcon('Geo', '<path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"/><path fill-rule="evenodd" d="M6.489 12.095a.5.5 0 01-.383.594c-.565.123-1.003.292-1.286.472-.302.192-.32.321-.32.339 0 .013.005.085.146.21.14.124.372.26.701.382.655.246 1.593.408 2.653.408s1.998-.162 2.653-.408c.329-.123.56-.258.701-.382.14-.125.146-.197.146-.21 0-.018-.018-.147-.32-.339-.283-.18-.721-.35-1.286-.472a.5.5 0 11.212-.977c.63.137 1.193.34 1.61.606.4.253.784.645.784 1.182 0 .402-.219.724-.483.958-.264.235-.618.423-1.013.57-.793.298-1.855.472-3.004.472s-2.21-.174-3.004-.471c-.395-.148-.749-.336-1.013-.571-.264-.234-.483-.556-.483-.958 0-.537.384-.929.783-1.182.418-.266.98-.47 1.611-.606a.5.5 0 01.595.383z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGeoAlt = /*#__PURE__*/makeIcon('GeoAlt', '<path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGift = /*#__PURE__*/makeIcon('Gift', '<path fill-rule="evenodd" d="M2 6v8.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V6h1v8.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 14.5V6h1zm8-5a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 009.96 3h.015L10 2.999l.025.002h.014A2.569 2.569 0 0010.293 3c.17-.006.387-.026.598-.073.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 0010 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 017.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.434 4.434 0 01-1.104.099H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 005.96 3h.015L6 2.999l.025.002h.014l.053.001a3.869 3.869 0 00.799-.076c.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 006 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 013.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.435 4.435 0 01-1.103.099H6zm1.5 12V6h1v10h-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 4H1v1h14V4zM1 3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGiftFill = /*#__PURE__*/makeIcon('GiftFill', '<path fill-rule="evenodd" d="M10 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 009.96 3h.015L10 2.999l.025.002h.014A2.569 2.569 0 0010.293 3c.17-.006.387-.026.598-.073.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 0010 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 017.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.434 4.434 0 01-1.104.099H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 005.96 3h.015L6 2.999l.025.002h.014l.053.001a3.869 3.869 0 00.799-.076c.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 006 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 013.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.435 4.435 0 01-1.103.099H6zm9 10.5V7H8.5v9h5a1.5 1.5 0 001.5-1.5zM7.5 16h-5A1.5 1.5 0 011 14.5V7h6.5v9z" clip-rule="evenodd"/><path d="M0 4a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H1a1 1 0 01-1-1V4z"/>'); // eslint-disable-next-line

  var BIconGraphDown = /*#__PURE__*/makeIcon('GraphDown', '<path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 9.041l-4.349-5.436L7 6.646 3.354 3l-.708.707L7 8.061l2.959-2.959 3.65 4.564.781-.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 9.854a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v3.5h-3.5a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGraphUp = /*#__PURE__*/makeIcon('GraphUp', '<path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGrid = /*#__PURE__*/makeIcon('Grid', '<path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zM2.5 2a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6.5.5A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zM1 10.5A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6.5.5A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGrid1x2 = /*#__PURE__*/makeIcon('Grid1x2', '<path fill-rule="evenodd" d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9h-5v5h5v-5zM0 1a1 1 0 011-1h5a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm9 0a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1zm1 8a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGrid1x2Fill = /*#__PURE__*/makeIcon('Grid1x2Fill', '<path d="M0 1a1 1 0 011-1h5a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm9 0a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1zm0 9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5z"/>'); // eslint-disable-next-line

  var BIconGrid3x2 = /*#__PURE__*/makeIcon('Grid3x2', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v8a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 11.5v-8zM1.5 3a.5.5 0 00-.5.5V7h4V3H1.5zM5 8H1v3.5a.5.5 0 00.5.5H5V8zm1 0h4v4H6V8zm4-1H6V3h4v4zm1 1v4h3.5a.5.5 0 00.5-.5V8h-4zm0-1V3h3.5a.5.5 0 01.5.5V7h-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGrid3x2Gap = /*#__PURE__*/makeIcon('Grid3x2Gap', '<path stroke="currentColor" d="M1.5 4a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V4zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V4zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V9zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V9zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V9z"/>'); // eslint-disable-next-line

  var BIconGrid3x2GapFill = /*#__PURE__*/makeIcon('Grid3x2GapFill', '<path d="M1 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM1 9a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V9zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V9zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9z"/>'); // eslint-disable-next-line

  var BIconGrid3x3 = /*#__PURE__*/makeIcon('Grid3x3', '<path fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 011.5 0h13A1.5 1.5 0 0116 1.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 14.5v-13zM1.5 1a.5.5 0 00-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4V6h4v4H6zm-1 1H1v3.5a.5.5 0 00.5.5H5v-4zm1 0h4v4H6v-4zm5 0v4h3.5a.5.5 0 00.5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 00-.5-.5H11v4zm-1 0H6V1h4v4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconGrid3x3Gap = /*#__PURE__*/makeIcon('Grid3x3Gap', '<path stroke="currentColor" d="M1.5 2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V2zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V7zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V7zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V7zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2z"/>'); // eslint-disable-next-line

  var BIconGrid3x3GapFill = /*#__PURE__*/makeIcon('Grid3x3GapFill', '<path d="M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V2zM1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7zM1 12a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"/>'); // eslint-disable-next-line

  var BIconGridFill = /*#__PURE__*/makeIcon('GridFill', '<path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHammer = /*#__PURE__*/makeIcon('Hammer', '<path d="M9.812 1.952a.5.5 0 01-.312.89c-1.671 0-2.852.596-3.616 1.185L4.857 5.073V6.21a.5.5 0 01-.146.354L3.425 7.853a.5.5 0 01-.708 0L.146 5.274a.5.5 0 010-.706l1.286-1.29a.5.5 0 01.354-.146H2.84C4.505 1.228 6.216.862 7.557 1.04a5.009 5.009 0 012.077.782l.178.129z"/><path fill-rule="evenodd" d="M6.012 3.5a.5.5 0 01.359.165l9.146 8.646A.5.5 0 0115.5 13L14 14.5a.5.5 0 01-.756-.056L4.598 5.297a.5.5 0 01.048-.65l1-1a.5.5 0 01.366-.147z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHash = /*#__PURE__*/makeIcon('Hash', '<path d="M8.39 12.648a1.32 1.32 0 00-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 00.016-.164.51.51 0 00-.516-.516.54.54 0 00-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 00-.523-.516.539.539 0 00-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>'); // eslint-disable-next-line

  var BIconHeart = /*#__PURE__*/makeIcon('Heart', '<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHeartFill = /*#__PURE__*/makeIcon('HeartFill', '<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHeartHalf = /*#__PURE__*/makeIcon('HeartHalf', '<path fill-rule="evenodd" d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHouse = /*#__PURE__*/makeIcon('House', '<path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHouseDoor = /*#__PURE__*/makeIcon('HouseDoor', '<path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHouseDoorFill = /*#__PURE__*/makeIcon('HouseDoorFill', '<path d="M6.5 10.995V14.5a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/><path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHouseFill = /*#__PURE__*/makeIcon('HouseFill', '<path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconHr = /*#__PURE__*/makeIcon('Hr', '<path fill-rule="evenodd" d="M0 8a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5A.5.5 0 010 8z" clip-rule="evenodd"/><path d="M4 3h8a1 1 0 011 1v2.5h1V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2.5h1V4a1 1 0 011-1zM3 9.5H2V12a2 2 0 002 2h8a2 2 0 002-2V9.5h-1V12a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>'); // eslint-disable-next-line

  var BIconImage = /*#__PURE__*/makeIcon('Image', '<path fill-rule="evenodd" d="M14.002 2h-12a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-12-1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2h-12z" clip-rule="evenodd"/><path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconImageAlt = /*#__PURE__*/makeIcon('ImageAlt', '<path d="M10.648 6.646a.5.5 0 01.577-.093l4.777 3.947V15a1 1 0 01-1 1h-14a1 1 0 01-1-1v-2l3.646-4.354a.5.5 0 01.63-.062l2.66 2.773 3.71-4.71z"/><path fill-rule="evenodd" d="M4.5 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconImageFill = /*#__PURE__*/makeIcon('ImageFill', '<path fill-rule="evenodd" d="M.002 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-12a2 2 0 01-2-2V3zm1 9l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71a.5.5 0 01.577-.094L15.002 9.5V13a1 1 0 01-1 1h-12a1 1 0 01-1-1v-1zm5-6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconImages = /*#__PURE__*/makeIcon('Images', '<path fill-rule="evenodd" d="M12.002 4h-10a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1zm-10-1a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-10z" clip-rule="evenodd"/><path d="M10.648 8.646a.5.5 0 01.577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10a1 1 0 011 1v8a1 1 0 01-1 1v1a2 2 0 002-2V3a2 2 0 00-2-2H4a2 2 0 00-2 2h1a1 1 0 011-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInbox = /*#__PURE__*/makeIcon('Inbox', '<path fill-rule="evenodd" d="M3.81 4.063A1.5 1.5 0 014.98 3.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H4.98a.5.5 0 00-.39.188L.89 9.312a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 8.67A.5.5 0 01.5 8.5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H10.45a2.5 2.5 0 01-4.9 0H1.066z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInboxFill = /*#__PURE__*/makeIcon('InboxFill', '<path fill-rule="evenodd" d="M3.81 4.063A1.5 1.5 0 014.98 3.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H4.98a.5.5 0 00-.39.188L.89 9.312a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 8.67A.5.5 0 01.5 8.5h5A.5.5 0 016 9c0 .828.625 2 2 2s2-1.172 2-2a.5.5 0 01.5-.5h5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInboxes = /*#__PURE__*/makeIcon('Inboxes', '<path fill-rule="evenodd" d="M.125 11.17A.5.5 0 01.5 11H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 16H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H10.45a2.5 2.5 0 01-4.9 0H1.066zM3.81.563A1.5 1.5 0 014.98 0h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624A.5.5 0 0011.02 1H4.98a.5.5 0 00-.39.188L.89 5.812a.5.5 0 11-.78-.624L3.81.563z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 5.17A.5.5 0 01.5 5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0A.5.5 0 0110 5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 10H1.883A1.5 1.5 0 01.394 8.686l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562A.5.5 0 001.884 9h12.234a.5.5 0 00.496-.438L14.933 6H10.45a2.5 2.5 0 01-4.9 0H1.066z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInboxesFill = /*#__PURE__*/makeIcon('InboxesFill', '<path fill-rule="evenodd" d="M.125 11.17A.5.5 0 01.5 11H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 16H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zM3.81.563A1.5 1.5 0 014.98 0h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624A.5.5 0 0011.02 1H4.98a.5.5 0 00-.39.188L.89 5.812a.5.5 0 11-.78-.624L3.81.563z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 5.17A.5.5 0 01.5 5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0A.5.5 0 0110 5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 10H1.883A1.5 1.5 0 01.394 8.686l-.39-3.124a.5.5 0 01.121-.393z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInfo = /*#__PURE__*/makeIcon('Info', '<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

  var BIconInfoCircle = /*#__PURE__*/makeIcon('InfoCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

  var BIconInfoCircleFill = /*#__PURE__*/makeIcon('InfoCircleFill', '<path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconInfoSquare = /*#__PURE__*/makeIcon('InfoSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

  var BIconInfoSquareFill = /*#__PURE__*/makeIcon('InfoSquareFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconIntersect = /*#__PURE__*/makeIcon('Intersect', '<path fill-rule="evenodd" d="M12 4v6.5a1.5 1.5 0 01-1.5 1.5H4V5.5A1.5 1.5 0 015.5 4H12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.5 5h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4h-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.5 1h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0h-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconJustify = /*#__PURE__*/makeIcon('Justify', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconJustifyLeft = /*#__PURE__*/makeIcon('JustifyLeft', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconJustifyRight = /*#__PURE__*/makeIcon('JustifyRight', '<path fill-rule="evenodd" d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconKanban = /*#__PURE__*/makeIcon('Kanban', '<path fill-rule="evenodd" d="M13.5 1h-11a1 1 0 00-1 1v12a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1zm-11-1a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V2a2 2 0 00-2-2h-11z" clip-rule="evenodd"/><rect width="3" height="5" x="6.5" y="2" rx="1"/><rect width="3" height="9" x="2.5" y="2" rx="1"/><rect width="3" height="12" x="10.5" y="2" rx="1"/>'); // eslint-disable-next-line

  var BIconKanbanFill = /*#__PURE__*/makeIcon('KanbanFill', '<path fill-rule="evenodd" d="M2.5 0a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V2a2 2 0 00-2-2h-11zm5 2a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1h-1zm-5 1a1 1 0 011-1h1a1 1 0 011 1v7a1 1 0 01-1 1h-1a1 1 0 01-1-1V3zm9-1a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLaptop = /*#__PURE__*/makeIcon('Laptop', '<path fill-rule="evenodd" d="M13.5 3h-11a.5.5 0 00-.5.5V11h12V3.5a.5.5 0 00-.5-.5zm-11-1A1.5 1.5 0 001 3.5V12h14V3.5A1.5 1.5 0 0013.5 2h-11z" clip-rule="evenodd"/><path d="M0 12h16v.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5V12z"/>'); // eslint-disable-next-line

  var BIconLayers = /*#__PURE__*/makeIcon('Layers', '<path fill-rule="evenodd" d="M3.188 8L.264 9.559a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882L12.813 8l-1.063.567L14.438 10 8 13.433 1.562 10 4.25 8.567 3.187 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayersFill = /*#__PURE__*/makeIcon('LayersFill', '<path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.125 8.567l-1.86.992a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 01-1.41 0l.418-.785-.419.785-5.169-2.756z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayersHalf = /*#__PURE__*/makeIcon('LayersHalf', '<path fill-rule="evenodd" d="M3.188 8L.264 9.559a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882L12.813 8l-4.578 2.441a.5.5 0 01-.47 0L3.188 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutSidebar = /*#__PURE__*/makeIcon('LayoutSidebar', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 14V2h1v12H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutSidebarInset = /*#__PURE__*/makeIcon('LayoutSidebarInset', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M3 4a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>'); // eslint-disable-next-line

  var BIconLayoutSidebarInsetReverse = /*#__PURE__*/makeIcon('LayoutSidebarInsetReverse', '<path fill-rule="evenodd" d="M2 2h12a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm12-1a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h12z" clip-rule="evenodd"/><path d="M13 4a1 1 0 00-1-1h-2a1 1 0 00-1 1v8a1 1 0 001 1h2a1 1 0 001-1V4z"/>'); // eslint-disable-next-line

  var BIconLayoutSidebarReverse = /*#__PURE__*/makeIcon('LayoutSidebarReverse', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 14V2h1v12h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutSplit = /*#__PURE__*/makeIcon('LayoutSplit', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 14V2h1v12h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutTextSidebar = /*#__PURE__*/makeIcon('LayoutTextSidebar', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 15V1h1v14h-1zM3 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutTextSidebarReverse = /*#__PURE__*/makeIcon('LayoutTextSidebarReverse', '<path fill-rule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V1H4v14h1zm8-11.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutTextWindow = /*#__PURE__*/makeIcon('LayoutTextWindow', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 15V4h1v11h-1zm4.5-11H.5V3h15v1zM3 6.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutTextWindowReverse = /*#__PURE__*/makeIcon('LayoutTextWindowReverse', '<path fill-rule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutThreeColumns = /*#__PURE__*/makeIcon('LayoutThreeColumns', '<path fill-rule="evenodd" d="M0 2.5A1.5 1.5 0 011.5 1h13A1.5 1.5 0 0116 2.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 13.5v-11zM1.5 2a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V1h1v14H5zm5 0V1h1v14h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLayoutWtf = /*#__PURE__*/makeIcon('LayoutWtf', '<path fill-rule="evenodd" d="M5 1H1v8h4V1zM1 0a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1V1a1 1 0 00-1-1H1zm13 2H9v5h5V2zM9 1a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V2a1 1 0 00-1-1H9zM5 13H3v2h2v-2zm-2-1a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H3zm12-1H9v2h6v-2zm-6-1a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1v-2a1 1 0 00-1-1H9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLifePreserver = /*#__PURE__*/makeIcon('LifePreserver', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><path d="M11.642 6.343L15 5v6l-3.358-1.343A3.99 3.99 0 0012 8a3.99 3.99 0 00-.358-1.657zM9.657 4.358L11 1H5l1.343 3.358A3.985 3.985 0 018 4c.59 0 1.152.128 1.657.358zM4.358 6.343L1 5v6l3.358-1.343A3.985 3.985 0 014 8c0-.59.128-1.152.358-1.657zm1.985 5.299L5 15h6l-1.343-3.358A3.984 3.984 0 018 12a3.99 3.99 0 01-1.657-.358z"/>'); // eslint-disable-next-line

  var BIconLightning = /*#__PURE__*/makeIcon('Lightning', '<path fill-rule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09zM4.157 8.5H7a.5.5 0 01.478.647L6.11 13.59l5.732-6.09H9a.5.5 0 01-.478-.647L9.89 2.41 4.157 8.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLightningFill = /*#__PURE__*/makeIcon('LightningFill', '<path fill-rule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLink = /*#__PURE__*/makeIcon('Link', '<path d="M6.354 5.5H4a3 3 0 000 6h3a3 3 0 002.83-4H9c-.086 0-.17.01-.25.031A2 2 0 017 10.5H4a2 2 0 110-4h1.535c.218-.376.495-.714.82-1z"/><path d="M6.764 6.5H7c.364 0 .706.097 1 .268A1.99 1.99 0 019 6.5h.236A3.004 3.004 0 008 5.67a3 3 0 00-1.236.83z"/><path d="M9 5.5a3 3 0 00-2.83 4h1.098A2 2 0 019 6.5h3a2 2 0 110 4h-1.535a4.02 4.02 0 01-.82 1H12a3 3 0 100-6H9z"/><path d="M8 11.33a3.01 3.01 0 001.236-.83H9a1.99 1.99 0 01-1-.268 1.99 1.99 0 01-1 .268h-.236c.332.371.756.66 1.236.83z"/>'); // eslint-disable-next-line

  var BIconLink45deg = /*#__PURE__*/makeIcon('Link45deg', '<path d="M4.715 6.542L3.343 7.914a3 3 0 104.243 4.243l1.828-1.829A3 3 0 008.586 5.5L8 6.086a1.001 1.001 0 00-.154.199 2 2 0 01.861 3.337L6.88 11.45a2 2 0 11-2.83-2.83l.793-.792a4.018 4.018 0 01-.128-1.287z"/><path d="M5.712 6.96l.167-.167a1.99 1.99 0 01.896-.518 1.99 1.99 0 01.518-.896l.167-.167A3.004 3.004 0 006 5.499c-.22.46-.316.963-.288 1.46z"/><path d="M6.586 4.672A3 3 0 007.414 9.5l.775-.776a2 2 0 01-.896-3.346L9.12 3.55a2 2 0 012.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 00-4.243-4.243L6.586 4.672z"/><path d="M10 9.5a2.99 2.99 0 00.288-1.46l-.167.167a1.99 1.99 0 01-.896.518 1.99 1.99 0 01-.518.896l-.167.167A3.004 3.004 0 0010 9.501z"/>'); // eslint-disable-next-line

  var BIconList = /*#__PURE__*/makeIcon('List', '<path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconListCheck = /*#__PURE__*/makeIcon('ListCheck', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3.854 2.146a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 3.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 7.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconListNested = /*#__PURE__*/makeIcon('ListNested', '<path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 015 11h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm-2-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm-2-4A.5.5 0 011 3h10a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconListOl = /*#__PURE__*/makeIcon('ListOl', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 01-.492.594v.033a.615.615 0 01.569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 00-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>'); // eslint-disable-next-line

  var BIconListTask = /*#__PURE__*/makeIcon('ListTask', '<path fill-rule="evenodd" d="M2 2.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H2zM3 3H2v1h1V3z" clip-rule="evenodd"/><path d="M5 3.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 4a.5.5 0 000 1h9a.5.5 0 000-1h-9z"/><path fill-rule="evenodd" d="M1.5 7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H2zm1 .5H2v1h1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconListUl = /*#__PURE__*/makeIcon('ListUl', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLock = /*#__PURE__*/makeIcon('Lock', '<path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 00-1 1v5a1 1 0 001 1h7a1 1 0 001-1V9a1 1 0 00-1-1zm-7-1a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2V9a2 2 0 00-2-2h-7zm0-3a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconLockFill = /*#__PURE__*/makeIcon('LockFill', '<rect width="11" height="9" x="2.5" y="7" rx="2"/><path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMap = /*#__PURE__*/makeIcon('Map', '<path fill-rule="evenodd" d="M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMic = /*#__PURE__*/makeIcon('Mic', '<path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 8V3a2 2 0 10-4 0v5a2 2 0 104 0zM8 0a3 3 0 00-3 3v5a3 3 0 006 0V3a3 3 0 00-3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMicFill = /*#__PURE__*/makeIcon('MicFill', '<path d="M5 3a3 3 0 016 0v5a3 3 0 01-6 0V3z"/><path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMicMute = /*#__PURE__*/makeIcon('MicMute', '<path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963l.845.845A2 2 0 0110 3v3.879l1 1zM8.738 9.86l.748.748A3 3 0 015 8V6.121l1 1V8a2 2 0 002.738 1.86z" clip-rule="evenodd"/><path stroke="currentColor" d="M2 1l12 12"/>'); // eslint-disable-next-line

  var BIconMicMuteFill = /*#__PURE__*/makeIcon('MicMuteFill', '<path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 015 8V6.121z" clip-rule="evenodd"/><path stroke="currentColor" d="M2 1l12 12"/>'); // eslint-disable-next-line

  var BIconMoon = /*#__PURE__*/makeIcon('Moon', '<path fill-rule="evenodd" d="M14.53 10.53a7 7 0 01-9.058-9.058A7.003 7.003 0 008 15a7.002 7.002 0 006.53-4.47z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMusicNote = /*#__PURE__*/makeIcon('MusicNote', '<path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M9 3v10H8V3h1z" clip-rule="evenodd"/><path d="M8 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0113 2.22V4L8 5V2.82z"/>'); // eslint-disable-next-line

  var BIconMusicNoteBeamed = /*#__PURE__*/makeIcon('MusicNoteBeamed', '<path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" clip-rule="evenodd"/><path d="M5 2.905a1 1 0 01.9-.995l8-.8a1 1 0 011.1.995V3L5 4V2.905z"/>'); // eslint-disable-next-line

  var BIconMusicNoteList = /*#__PURE__*/makeIcon('MusicNoteList', '<path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M12 3v10h-1V3h1z" clip-rule="evenodd"/><path d="M11 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0116 2.22V4l-5 1V2.82z"/><path fill-rule="evenodd" d="M0 11.5a.5.5 0 01.5-.5H4a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 7H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 3H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconMusicPlayer = /*#__PURE__*/makeIcon('MusicPlayer', '<path fill-rule="evenodd" d="M12 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1zM4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 3H5v3h6V3zM5 2a1 1 0 00-1 1v3a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H5zm3 11a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="8" cy="11" r="1"/>'); // eslint-disable-next-line

  var BIconMusicPlayerFill = /*#__PURE__*/makeIcon('MusicPlayerFill', '<path fill-rule="evenodd" d="M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm2 1a1 1 0 011-1h6a1 1 0 011 1v2.5a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm7 8a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="8" cy="11" r="1"/>'); // eslint-disable-next-line

  var BIconNewspaper = /*#__PURE__*/makeIcon('Newspaper', '<path fill-rule="evenodd" d="M0 2A1.5 1.5 0 011.5.5h11A1.5 1.5 0 0114 2v12a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 010 14V2zm1.5-.5A.5.5 0 001 2v12a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-11z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.5 3a.5.5 0 01.5.5V14a1.5 1.5 0 01-1.5 1.5h-3v-1h3a.5.5 0 00.5-.5V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>'); // eslint-disable-next-line

  var BIconOctagon = /*#__PURE__*/makeIcon('Octagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconOctagonFill = /*#__PURE__*/makeIcon('OctagonFill', '<path d="M11.107 0a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146A.5.5 0 014.893 0h6.214z"/>'); // eslint-disable-next-line

  var BIconOctagonHalf = /*#__PURE__*/makeIcon('OctagonHalf', '<path d="M4.893 16h3.214V0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146z"/><path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconOption = /*#__PURE__*/makeIcon('Option', '<path fill-rule="evenodd" d="M1 2.5a.5.5 0 01.5-.5h3.797a.5.5 0 01.439.26L11 13h3.5a.5.5 0 010 1h-3.797a.5.5 0 01-.439-.26L5 3H1.5a.5.5 0 01-.5-.5zm10 0a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconOutlet = /*#__PURE__*/makeIcon('Outlet', '<path fill-rule="evenodd" d="M3.34 2.994c.275-.338.68-.494 1.074-.494h7.172c.393 0 .798.156 1.074.494.578.708 1.84 2.534 1.84 5.006 0 2.472-1.262 4.297-1.84 5.006-.276.338-.68.494-1.074.494H4.414c-.394 0-.799-.156-1.074-.494C2.762 12.297 1.5 10.472 1.5 8c0-2.472 1.262-4.297 1.84-5.006zm1.074.506a.376.376 0 00-.299.126C3.599 4.259 2.5 5.863 2.5 8c0 2.137 1.099 3.74 1.615 4.374.06.073.163.126.3.126h7.17c.137 0 .24-.053.3-.126.516-.633 1.615-2.237 1.615-4.374 0-2.137-1.099-3.74-1.615-4.374a.376.376 0 00-.3-.126h-7.17z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 5.5a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M7 10v1h2v-1a1 1 0 00-2 0z"/>'); // eslint-disable-next-line

  var BIconPaperclip = /*#__PURE__*/makeIcon('Paperclip', '<path fill-rule="evenodd" d="M4.5 3a2.5 2.5 0 015 0v9a1.5 1.5 0 01-3 0V5a.5.5 0 011 0v7a.5.5 0 001 0V3a1.5 1.5 0 10-3 0v9a2.5 2.5 0 005 0V5a.5.5 0 011 0v7a3.5 3.5 0 11-7 0V3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPause = /*#__PURE__*/makeIcon('Pause', '<path fill-rule="evenodd" d="M6 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPauseFill = /*#__PURE__*/makeIcon('PauseFill', '<path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"/>'); // eslint-disable-next-line

  var BIconPen = /*#__PURE__*/makeIcon('Pen', '<path fill-rule="evenodd" d="M5.707 13.707a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391L10.086 2.5a2 2 0 012.828 0l.586.586a2 2 0 010 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 011.414 0l.586.586a1 1 0 010 1.414L5 13l-3 1 1-3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.854 2.56a.5.5 0 00-.708 0L5.854 5.855a.5.5 0 01-.708-.708L8.44 1.854a1.5 1.5 0 012.122 0l.293.292a.5.5 0 01-.707.708l-.293-.293z" clip-rule="evenodd"/><path d="M13.293 1.207a1 1 0 011.414 0l.03.03a1 1 0 01.03 1.383L13.5 4 12 2.5l1.293-1.293z"/>'); // eslint-disable-next-line

  var BIconPencil = /*#__PURE__*/makeIcon('Pencil', '<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPencilSquare = /*#__PURE__*/makeIcon('PencilSquare', '<path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPentagon = /*#__PURE__*/makeIcon('Pentagon', '<path fill-rule="evenodd" d="M8 1.288l-6.842 5.56L3.733 15h8.534l2.575-8.153L8 1.288zM16 6.5L8 0 0 6.5 3 16h10l3-9.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPentagonFill = /*#__PURE__*/makeIcon('PentagonFill', '<path d="M8 0l8 6.5-3 9.5H3L0 6.5 8 0z"/>'); // eslint-disable-next-line

  var BIconPentagonHalf = /*#__PURE__*/makeIcon('PentagonHalf', '<path fill-rule="evenodd" d="M8 1.288V15h4.267l2.575-8.153L8 1.288zM16 6.5L8 0 0 6.5 3 16h10l3-9.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPeople = /*#__PURE__*/makeIcon('People', '<path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002.002zM11 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zM6.936 9.28a5.88 5.88 0 00-1.23-.247A7.35 7.35 0 005 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 015 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPeopleCircle = /*#__PURE__*/makeIcon('PeopleCircle', '<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/><path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPeopleFill = /*#__PURE__*/makeIcon('PeopleFill', '<path fill-rule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPerson = /*#__PURE__*/makeIcon('Person', '<path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonBoundingBox = /*#__PURE__*/makeIcon('PersonBoundingBox', '<path fill-rule="evenodd" d="M1.5 1a.5.5 0 00-.5.5v3a.5.5 0 01-1 0v-3A1.5 1.5 0 011.5 0h3a.5.5 0 010 1h-3zM11 .5a.5.5 0 01.5-.5h3A1.5 1.5 0 0116 1.5v3a.5.5 0 01-1 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 01-.5-.5zM.5 11a.5.5 0 01.5.5v3a.5.5 0 00.5.5h3a.5.5 0 010 1h-3A1.5 1.5 0 010 14.5v-3a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v3a1.5 1.5 0 01-1.5 1.5h-3a.5.5 0 010-1h3a.5.5 0 00.5-.5v-3a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonCheck = /*#__PURE__*/makeIcon('PersonCheck', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm6.854.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 7.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonCheckFill = /*#__PURE__*/makeIcon('PersonCheckFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm9.854-2.854a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 7.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonDash = /*#__PURE__*/makeIcon('PersonDash', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm2 2.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonDashFill = /*#__PURE__*/makeIcon('PersonDashFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm5-.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonFill = /*#__PURE__*/makeIcon('PersonFill', '<path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonLinesFill = /*#__PURE__*/makeIcon('PersonLinesFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7 1.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm2 9a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonPlus = /*#__PURE__*/makeIcon('PersonPlus', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm4.5 0a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonPlusFill = /*#__PURE__*/makeIcon('PersonPlusFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7.5-3a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPersonSquare = /*#__PURE__*/makeIcon('PersonSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPhone = /*#__PURE__*/makeIcon('Phone', '<path fill-rule="evenodd" d="M11 1H5a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zM5 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPhoneLandscape = /*#__PURE__*/makeIcon('PhoneLandscape', '<path fill-rule="evenodd" d="M1 4.5v6a1 1 0 001 1h12a1 1 0 001-1v-6a1 1 0 00-1-1H2a1 1 0 00-1 1zm-1 6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H2a2 2 0 00-2 2v6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 7.5a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPieChart = /*#__PURE__*/makeIcon('PieChart', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 7.793V1h1v6.5H15v1H8.207l-4.853 4.854-.708-.708L7.5 7.793z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPieChartFill = /*#__PURE__*/makeIcon('PieChartFill', '<path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0013.277-5.5zM2 13.292A8 8 0 017.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 008.5.015z"/>'); // eslint-disable-next-line

  var BIconPip = /*#__PURE__*/makeIcon('Pip', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9zM1.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path d="M8 8.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-3z"/>'); // eslint-disable-next-line

  var BIconPipFill = /*#__PURE__*/makeIcon('PipFill', '<path fill-rule="evenodd" d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm7 6a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlay = /*#__PURE__*/makeIcon('Play', '<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlayFill = /*#__PURE__*/makeIcon('PlayFill', '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

  var BIconPlug = /*#__PURE__*/makeIcon('Plug', '<path d="M4 5h8v3a4 4 0 01-8 0V5z"/><path fill-rule="evenodd" d="M6 1.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zM7.115 13.651c.256-.511.385-1.408.385-2.651h1c0 1.257-.121 2.36-.49 3.099-.191.381-.47.707-.87.877-.401.17-.845.15-1.298-.002-.961-.32-1.534-.175-1.851.046-.33.23-.491.615-.491.98h-1c0-.635.278-1.353.918-1.8.653-.456 1.58-.561 2.74-.174.297.099.478.078.592.03.115-.05.244-.161.365-.405z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlus = /*#__PURE__*/makeIcon('Plus', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlusCircle = /*#__PURE__*/makeIcon('PlusCircle', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlusCircleFill = /*#__PURE__*/makeIcon('PlusCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlusSquare = /*#__PURE__*/makeIcon('PlusSquare', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPlusSquareFill = /*#__PURE__*/makeIcon('PlusSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPower = /*#__PURE__*/makeIcon('Power', '<path fill-rule="evenodd" d="M5.578 4.437a5 5 0 104.922.044l.5-.866a6 6 0 11-5.908-.053l.486.875z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconPuzzle = /*#__PURE__*/makeIcon('Puzzle', '<path d="M4.605 2.5V2v.5zM3.61 3.6l.498-.043V3.55l-.498.05zM7 2.5h.5A.5.5 0 007 2v.5zm-.676 1.454l.304.397-.304-.397zm3.352 0l-.304.397.304-.397zM9 2.5V2a.5.5 0 00-.5.5H9zm3.39 1.1l-.498-.05v.007l.498.043zM12.1 7l-.498-.043a.5.5 0 00.498.543V7zm1.854-.676l.397.304-.397-.304zm0 3.352l.397-.304-.397.304zM12.1 9v-.5a.5.5 0 00-.498.542L12.1 9zm.29 3.4l-.498.043v.007l.498-.05zM9 13.5h-.5a.5.5 0 00.5.5v-.5zm.676-1.454l-.304-.397.304.397zm-3.352 0l.304-.397-.304.397zM7 13.5v.5a.5.5 0 00.5-.5H7zm-2.395 0V13v.5zm-.995-1.1l.498.05v-.007L3.61 12.4zM3.9 9l.498.042A.5.5 0 003.9 8.5V9zm-1.854.676l-.397-.304.397.304zm0-3.352l-.397.304.397-.304zM3.9 7v.5a.5.5 0 00.498-.543L3.9 7zm.705-5a1.5 1.5 0 00-1.493 1.65l.995-.1A.5.5 0 014.605 3V2zM7 2H4.605v1H7V2zm.5.882V2.5h-1v.382h1zm-.872 1.469c.375-.287.872-.773.872-1.469h-1c0 .195-.147.42-.48.675l.608.794zM6.5 4.5l.001-.006a.113.113 0 01.012-.025.459.459 0 01.115-.118l-.608-.794c-.274.21-.52.528-.52.943h1zM8 5c-.491 0-.912-.1-1.19-.24a.86.86 0 01-.271-.194.213.213 0 01-.039-.063V4.5h-1c0 .568.447.947.862 1.154C6.807 5.877 7.387 6 8 6V5zm1.5-.5v.003a.213.213 0 01-.039.064.86.86 0 01-.27.193C8.91 4.9 8.49 5 8 5v1c.613 0 1.193-.123 1.638-.346.415-.207.862-.586.862-1.154h-1zm-.128-.15c.065.05.099.092.115.119.008.013.01.021.012.025L9.5 4.5h1c0-.415-.246-.733-.52-.943l-.608.794zM8.5 2.883c0 .696.497 1.182.872 1.469l.608-.794c-.333-.255-.48-.48-.48-.675h-1zm0-.382v.382h1V2.5h-1zm2.895-.5H9v1h2.395V2zm1.493 1.65A1.5 1.5 0 0011.395 2v1a.5.5 0 01.498.55l.995.1zm-.29 3.392l.29-3.4-.996-.085-.29 3.4.996.085zm.284-.542H12.1v1h.782v-1zm.675-.48c-.255.333-.48.48-.675.48v1c.696 0 1.182-.497 1.469-.872l-.794-.608zm.943-.52c-.415 0-.733.246-.943.52l.794.608a.459.459 0 01.118-.115.113.113 0 01.025-.012L14.5 6.5v-1zM16 8c0-.613-.123-1.193-.346-1.638-.207-.415-.586-.862-1.154-.862v1h.003l.01.003a.237.237 0 01.053.036.86.86 0 01.194.27c.14.28.24.7.24 1.191h1zm-1.5 2.5c.568 0 .947-.447 1.154-.862C15.877 9.193 16 8.613 16 8h-1c0 .491-.1.912-.24 1.19a.86.86 0 01-.194.271.214.214 0 01-.063.039H14.5v1zm-.943-.52c.21.274.528.52.943.52v-1l-.006-.001a.113.113 0 01-.025-.012.458.458 0 01-.118-.115l-.794.608zm-.675-.48c.195 0 .42.147.675.48l.794-.608c-.287-.375-.773-.872-1.469-.872v1zm-.782 0h.782v-1H12.1v1zm.788 2.858l-.29-3.4-.996.084.29 3.401.996-.085zM11.395 14a1.5 1.5 0 001.493-1.65l-.995.1a.5.5 0 01-.498.55v1zM9 14h2.395v-1H9v1zm.5-.5v-.382h-1v.382h1zm0-.382c0-.195.147-.42.48-.675l-.608-.794c-.375.287-.872.773-.872 1.469h1zm.48-.675c.274-.21.52-.528.52-.943h-1l-.001.006a.113.113 0 01-.012.025.459.459 0 01-.115.118l.608.794zm.52-.943c0-.568-.447-.947-.862-1.154C9.193 10.123 8.613 10 8 10v1c.492 0 .912.1 1.19.24.14.07.226.14.271.194a.214.214 0 01.039.063v.003h1zM8 10c-.613 0-1.193.123-1.638.346-.415.207-.862.586-.862 1.154h1v-.003l.003-.01a.214.214 0 01.036-.053.859.859 0 01.27-.194C7.09 11.1 7.51 11 8 11v-1zm-2.5 1.5c0 .415.246.733.52.943l.608-.794a.459.459 0 01-.115-.118.113.113 0 01-.012-.025L6.5 11.5h-1zm.52.943c.333.255.48.48.48.675h1c0-.696-.497-1.182-.872-1.469l-.608.794zm.48.675v.382h1v-.382h-1zM4.605 14H7v-1H4.605v1zm-1.493-1.65A1.5 1.5 0 004.605 14v-1a.5.5 0 01-.498-.55l-.995-.1zm.29-3.393l-.29 3.401.996.085.29-3.4-.996-.086zm-.284.543H3.9v-1h-.782v1zm-.675.48c.255-.333.48-.48.675-.48v-1c-.696 0-1.182.497-1.469.872l.794.608zm-.943.52c.415 0 .733-.246.943-.52l-.794-.608a.459.459 0 01-.118.115.112.112 0 01-.025.012L1.5 9.5v1zM0 8c0 .613.123 1.193.346 1.638.207.415.586.862 1.154.862v-1h-.003a.213.213 0 01-.064-.039.86.86 0 01-.193-.27C1.1 8.91 1 8.49 1 8H0zm1.5-2.5c-.568 0-.947.447-1.154.862C.123 6.807 0 7.387 0 8h1c0-.492.1-.912.24-1.19a.86.86 0 01.194-.271.213.213 0 01.063-.039H1.5v-1zm.943.52c-.21-.274-.528-.52-.943-.52v1l.006.001a.112.112 0 01.025.012c.027.016.068.05.118.115l.794-.608zm.675.48c-.195 0-.42-.147-.675-.48l-.794.608c.287.375.773.872 1.469.872v-1zm.782 0h-.782v1H3.9v-1zm-.788-2.858l.29 3.4.996-.085-.29-3.4-.996.085z"/>'); // eslint-disable-next-line

  var BIconPuzzleFill = /*#__PURE__*/makeIcon('PuzzleFill', '<path fill-rule="evenodd" d="M3.112 3.645A1.5 1.5 0 014.605 2H7a.5.5 0 01.5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 00-.115.118.113.113 0 00-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 00.27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 00.271-.194.213.213 0 00.036-.054l.003-.01v-.008a.112.112 0 00-.012-.025.459.459 0 00-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 019 2h2.395a1.5 1.5 0 011.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0111.395 14H9a.5.5 0 01-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 00.115-.118.113.113 0 00.012-.025L9.5 11.5v-.003l-.003-.01a.214.214 0 00-.036-.053.859.859 0 00-.27-.194C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 00-.271.194.214.214 0 00-.036.054l-.003.01v.002l.001.006a.113.113 0 00.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 01-.5.5H4.605a1.5 1.5 0 01-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconQuestion = /*#__PURE__*/makeIcon('Question', '<path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

  var BIconQuestionCircle = /*#__PURE__*/makeIcon('QuestionCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

  var BIconQuestionCircleFill = /*#__PURE__*/makeIcon('QuestionCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconQuestionDiamond = /*#__PURE__*/makeIcon('QuestionDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

  var BIconQuestionDiamondFill = /*#__PURE__*/makeIcon('QuestionDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconQuestionOctagon = /*#__PURE__*/makeIcon('QuestionOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

  var BIconQuestionOctagonFill = /*#__PURE__*/makeIcon('QuestionOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconQuestionSquare = /*#__PURE__*/makeIcon('QuestionSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

  var BIconQuestionSquareFill = /*#__PURE__*/makeIcon('QuestionSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconReply = /*#__PURE__*/makeIcon('Reply', '<path fill-rule="evenodd" d="M9.502 5.013a.144.144 0 00-.202.134V6.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 011.921-.306 7.403 7.403 0 01.798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 01.042-.028.147.147 0 000-.252.494.494 0 01-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconReplyAll = /*#__PURE__*/makeIcon('ReplyAll', '<path fill-rule="evenodd" d="M8.002 5.013a.144.144 0 00-.202.134V6.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C2.425 10.515 3.59 9.982 4.61 9.7a8.741 8.741 0 011.921-.306 7.403 7.403 0 01.798.008h.013l.005.001h.001L7.3 9.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 01.042-.028.147.147 0 000-.252.494.494 0 01-.042-.028L8.002 5.013zM6.8 10.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.868 4.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 01-.593-.805l4.012-2.954a.493.493 0 01.042-.028.147.147 0 000-.252.496.496 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconReplyAllFill = /*#__PURE__*/makeIcon('ReplyAllFill', '<path d="M8.079 11.9l4.568-3.281a.719.719 0 000-1.238L8.079 4.1A.716.716 0 007 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/><path fill-rule="evenodd" d="M10.868 4.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 01-.593-.805l4.012-2.954a.493.493 0 01.042-.028.147.147 0 000-.252.496.496 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconReplyFill = /*#__PURE__*/makeIcon('ReplyFill', '<path d="M9.079 11.9l4.568-3.281a.719.719 0 000-1.238L9.079 4.1A.716.716 0 008 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/>'); // eslint-disable-next-line

  var BIconScrewdriver = /*#__PURE__*/makeIcon('Screwdriver', '<path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L10.5 9.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L0 1zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSearch = /*#__PURE__*/makeIcon('Search', '<path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconServer = /*#__PURE__*/makeIcon('Server', '<path d="M13 2c0-1.105-2.239-2-5-2S3 .895 3 2s2.239 2 5 2 5-.895 5-2z"/><path d="M13 3.75c-.322.24-.698.435-1.093.593C10.857 4.763 9.475 5 8 5s-2.857-.237-3.907-.657A4.881 4.881 0 013 3.75V6c0 1.105 2.239 2 5 2s5-.895 5-2V3.75z"/><path d="M13 7.75c-.322.24-.698.435-1.093.593C10.857 8.763 9.475 9 8 9s-2.857-.237-3.907-.657A4.881 4.881 0 013 7.75V10c0 1.105 2.239 2 5 2s5-.895 5-2V7.75z"/><path d="M13 11.75c-.322.24-.698.435-1.093.593-1.05.42-2.432.657-3.907.657s-2.857-.237-3.907-.657A4.883 4.883 0 013 11.75V14c0 1.105 2.239 2 5 2s5-.895 5-2v-2.25z"/>'); // eslint-disable-next-line

  var BIconShield = /*#__PURE__*/makeIcon('Shield', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconShieldFill = /*#__PURE__*/makeIcon('ShieldFill', '<path fill-rule="evenodd" d="M5.187 1.025C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconShieldLock = /*#__PURE__*/makeIcon('ShieldLock', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/><path d="M9.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M7.411 8.034a.5.5 0 01.493-.417h.156a.5.5 0 01.492.414l.347 2a.5.5 0 01-.493.585h-.835a.5.5 0 01-.493-.582l.333-2z"/>'); // eslint-disable-next-line

  var BIconShieldLockFill = /*#__PURE__*/makeIcon('ShieldLockFill', '<path fill-rule="evenodd" d="M5.187 1.025C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815zm3.328 6.884a1.5 1.5 0 10-1.06-.011.5.5 0 00-.044.136l-.333 2a.5.5 0 00.493.582h.835a.5.5 0 00.493-.585l-.347-2a.5.5 0 00-.037-.122z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconShieldShaded = /*#__PURE__*/makeIcon('ShieldShaded', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/><path d="M8 2.25c.909 0 3.188.685 4.254 1.022a.94.94 0 01.656.773c.814 6.424-4.13 9.452-4.91 9.452V2.25z"/>'); // eslint-disable-next-line

  var BIconShift = /*#__PURE__*/makeIcon('Shift', '<path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5L8 2.731 1.654 9.5H4.5a1 1 0 011 1v3h5v-3a1 1 0 011-1h2.846z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconShiftFill = /*#__PURE__*/makeIcon('ShiftFill', '<path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconShuffle = /*#__PURE__*/makeIcon('Shuffle', '<path fill-rule="evenodd" d="M12.646 1.146a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L14.793 4l-2.147-2.146a.5.5 0 010-.708zm0 8a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L14.793 12l-2.147-2.146a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4a.5.5 0 01.5-.5h2c3.053 0 4.564 2.258 5.856 4.226l.08.123c.636.97 1.224 1.865 1.932 2.539.718.682 1.538 1.112 2.632 1.112h2a.5.5 0 010 1h-2c-1.406 0-2.461-.57-3.321-1.388-.795-.755-1.441-1.742-2.055-2.679l-.105-.159C6.186 6.242 4.947 4.5 2.5 4.5h-2A.5.5 0 010 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 12a.5.5 0 00.5.5h2c3.053 0 4.564-2.258 5.856-4.226l.08-.123c.636-.97 1.224-1.865 1.932-2.539C11.086 4.93 11.906 4.5 13 4.5h2a.5.5 0 000-1h-2c-1.406 0-2.461.57-3.321 1.388-.795.755-1.441 1.742-2.055 2.679l-.105.159C6.186 9.758 4.947 11.5 2.5 11.5h-2a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSkipBackward = /*#__PURE__*/makeIcon('SkipBackward', '<path fill-rule="evenodd" d="M.5 3.5A.5.5 0 011 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 01-1 0V4a.5.5 0 01.5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSkipBackwardFill = /*#__PURE__*/makeIcon('SkipBackwardFill', '<path fill-rule="evenodd" d="M.5 3.5A.5.5 0 000 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path d="M.904 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L.904 7.304a.802.802 0 000 1.393z"/><path d="M8.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L8.404 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

  var BIconSkipEnd = /*#__PURE__*/makeIcon('SkipEnd', '<path fill-rule="evenodd" d="M12 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSkipEndFill = /*#__PURE__*/makeIcon('SkipEndFill', '<path fill-rule="evenodd" d="M12 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

  var BIconSkipForward = /*#__PURE__*/makeIcon('SkipForward', '<path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 01.5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSkipForwardFill = /*#__PURE__*/makeIcon('SkipForwardFill', '<path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/><path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

  var BIconSkipStart = /*#__PURE__*/makeIcon('SkipStart', '<path fill-rule="evenodd" d="M4.5 3.5A.5.5 0 004 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.696 8L11.5 4.633v6.734L5.696 8zm-.792-.696a.802.802 0 000 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L4.904 7.304z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSkipStartFill = /*#__PURE__*/makeIcon('SkipStartFill', '<path fill-rule="evenodd" d="M4.5 3.5A.5.5 0 004 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path d="M4.903 8.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V4.308c0-.63-.692-1.01-1.232-.696L4.903 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

  var BIconSlash = /*#__PURE__*/makeIcon('Slash', '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSlashCircle = /*#__PURE__*/makeIcon('SlashCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSlashCircleFill = /*#__PURE__*/makeIcon('SlashCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708l-7 7a.5.5 0 00.708.708l7-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSlashSquare = /*#__PURE__*/makeIcon('SlashSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSlashSquareFill = /*#__PURE__*/makeIcon('SlashSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708l-7 7a.5.5 0 00.708.708l7-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSliders = /*#__PURE__*/makeIcon('Sliders', '<path d="M0 0h16v16H0z"/><path fill-rule="evenodd" d="M14 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM11.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM4.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM11.5 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 4H0V3h9.5v1zM16 4h-2.5V3H16v1zM9.5 14H0v-1h9.5v1zm6.5 0h-2.5v-1H16v1zM6.5 9H16V8H6.5v1zM0 9h2.5V8H0v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSoundwave = /*#__PURE__*/makeIcon('Soundwave', '<path stroke="currentColor" stroke-linecap="round" d="M2.5 7v2m12-2v2m-2-3v4m-8-4v4m4-7.5v11m-2-9v7m4-7v7"/>'); // eslint-disable-next-line

  var BIconSpeaker = /*#__PURE__*/makeIcon('Speaker', '<path d="M9 4a1 1 0 11-2 0 1 1 0 012 0zm-2.5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/><path fill-rule="evenodd" d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm6 4a2 2 0 11-4 0 2 2 0 014 0zM8 7a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSquare = /*#__PURE__*/makeIcon('Square', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSquareFill = /*#__PURE__*/makeIcon('SquareFill', '<rect width="16" height="16" rx="2"/>'); // eslint-disable-next-line

  var BIconSquareHalf = /*#__PURE__*/makeIcon('SquareHalf', '<path fill-rule="evenodd" d="M8 1H2a1 1 0 00-1 1v12a1 1 0 001 1h6V1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconStar = /*#__PURE__*/makeIcon('Star', '<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconStarFill = /*#__PURE__*/makeIcon('StarFill', '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'); // eslint-disable-next-line

  var BIconStarHalf = /*#__PURE__*/makeIcon('StarHalf', '<path fill-rule="evenodd" d="M5.354 5.119L7.538.792A.516.516 0 018 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0116 6.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 01-.171-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.906-2.77-4.052-.576a.525.525 0 01-.393-.288L8.002 2.223 8 2.226v9.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconStop = /*#__PURE__*/makeIcon('Stop', '<path fill-rule="evenodd" d="M3.5 5A1.5 1.5 0 015 3.5h6A1.5 1.5 0 0112.5 5v6a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 11V5zM5 4.5a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconStopFill = /*#__PURE__*/makeIcon('StopFill', '<path d="M5 3.5h6A1.5 1.5 0 0112.5 5v6a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 11V5A1.5 1.5 0 015 3.5z"/>'); // eslint-disable-next-line

  var BIconStopwatch = /*#__PURE__*/makeIcon('Stopwatch', '<path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4.5a.5.5 0 010-1h3V5a.5.5 0 01.5-.5zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M7 1h2v2H7V1z"/>'); // eslint-disable-next-line

  var BIconStopwatchFill = /*#__PURE__*/makeIcon('StopwatchFill', '<path fill-rule="evenodd" d="M5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H9v1.07A7.002 7.002 0 018 16 7 7 0 017 2.07V1H6a.5.5 0 01-.5-.5zm3 4.5a.5.5 0 00-1 0v3.5h-3a.5.5 0 000 1H8a.5.5 0 00.5-.5V5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSubtract = /*#__PURE__*/makeIcon('Subtract', '<path d="M4 12v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12v6.5a1.5 1.5 0 01-1.5 1.5H4z"/><path fill-rule="evenodd" d="M10.5 1h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0h-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconSun = /*#__PURE__*/makeIcon('Sun', '<path d="M3.5 8a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/><path fill-rule="evenodd" d="M8.202.28a.25.25 0 00-.404 0l-.91 1.255a.25.25 0 01-.334.067L5.232.79a.25.25 0 00-.374.155l-.36 1.508a.25.25 0 01-.282.19l-1.532-.245a.25.25 0 00-.286.286l.244 1.532a.25.25 0 01-.189.282l-1.509.36a.25.25 0 00-.154.374l.812 1.322a.25.25 0 01-.067.333l-1.256.91a.25.25 0 000 .405l1.256.91a.25.25 0 01.067.334L.79 10.768a.25.25 0 00.154.374l1.51.36a.25.25 0 01.188.282l-.244 1.532a.25.25 0 00.286.286l1.532-.244a.25.25 0 01.282.189l.36 1.508a.25.25 0 00.374.155l1.322-.812a.25.25 0 01.333.067l.91 1.256a.25.25 0 00.405 0l.91-1.256a.25.25 0 01.334-.067l1.322.812a.25.25 0 00.374-.155l.36-1.508a.25.25 0 01.282-.19l1.532.245a.25.25 0 00.286-.286l-.244-1.532a.25.25 0 01.189-.282l1.508-.36a.25.25 0 00.155-.374l-.812-1.322a.25.25 0 01.067-.333l1.256-.91a.25.25 0 000-.405l-1.256-.91a.25.25 0 01-.067-.334l.812-1.322a.25.25 0 00-.155-.374l-1.508-.36a.25.25 0 01-.19-.282l.245-1.532a.25.25 0 00-.286-.286l-1.532.244a.25.25 0 01-.282-.189l-.36-1.508a.25.25 0 00-.374-.155l-1.322.812a.25.25 0 01-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTable = /*#__PURE__*/makeIcon('Table', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 4H1V3h14v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z" clip-rule="evenodd"/><path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v2H0V2z"/>'); // eslint-disable-next-line

  var BIconTablet = /*#__PURE__*/makeIcon('Tablet', '<path fill-rule="evenodd" d="M12 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1zM4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTabletLandscape = /*#__PURE__*/makeIcon('TabletLandscape', '<path fill-rule="evenodd" d="M1 4v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H2a1 1 0 00-1 1zm-1 8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2a2 2 0 00-2 2v8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 8a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTag = /*#__PURE__*/makeIcon('Tag', '<path fill-rule="evenodd" d="M.5 2A1.5 1.5 0 012 .5h4.586a1.5 1.5 0 011.06.44l7 7a1.5 1.5 0 010 2.12l-4.585 4.586a1.5 1.5 0 01-2.122 0l-7-7A1.5 1.5 0 01.5 6.586V2zM2 1.5a.5.5 0 00-.5.5v4.586a.5.5 0 00.146.353l7 7a.5.5 0 00.708 0l4.585-4.585a.5.5 0 000-.708l-7-7a.5.5 0 00-.353-.146H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 4.5a2 2 0 114 0 2 2 0 01-4 0zm2-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTagFill = /*#__PURE__*/makeIcon('TagFill', '<path fill-rule="evenodd" d="M2 1a1 1 0 00-1 1v4.586a1 1 0 00.293.707l7 7a1 1 0 001.414 0l4.586-4.586a1 1 0 000-1.414l-7-7A1 1 0 006.586 1H2zm4 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTerminal = /*#__PURE__*/makeIcon('Terminal', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 9a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 9zM3.146 4.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 11-.708-.708L4.793 6.5 3.146 4.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTerminalFill = /*#__PURE__*/makeIcon('TerminalFill', '<path fill-rule="evenodd" d="M0 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm9.5 5.5h-3a.5.5 0 000 1h3a.5.5 0 000-1zm-6.354-.354L4.793 6.5 3.146 4.854a.5.5 0 11.708-.708l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextCenter = /*#__PURE__*/makeIcon('TextCenter', '<path fill-rule="evenodd" d="M4 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextIndentLeft = /*#__PURE__*/makeIcon('TextIndentLeft', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm.646 2.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L4.293 8 2.646 6.354a.5.5 0 010-.708zM7 6.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextIndentRight = /*#__PURE__*/makeIcon('TextIndentRight', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm10.646 2.146a.5.5 0 01.708.708L11.707 8l1.647 1.646a.5.5 0 01-.708.708l-2-2a.5.5 0 010-.708l2-2zM2 6.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextLeft = /*#__PURE__*/makeIcon('TextLeft', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextRight = /*#__PURE__*/makeIcon('TextRight', '<path fill-rule="evenodd" d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm4-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextarea = /*#__PURE__*/makeIcon('Textarea', '<path fill-rule="evenodd" d="M14 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v4h-1v-4A.5.5 0 0013 2H3a.5.5 0 00-.5.5v4h-1v-4zm1 7v4a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-4h1v4A1.5 1.5 0 0113 15H3a1.5 1.5 0 01-1.5-1.5v-4h1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTextareaT = /*#__PURE__*/makeIcon('TextareaT', '<path fill-rule="evenodd" d="M14 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v4h-1v-4A.5.5 0 0013 2H3a.5.5 0 00-.5.5v4h-1v-4zm1 7v4a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-4h1v4A1.5 1.5 0 0113 15H3a1.5 1.5 0 01-1.5-1.5v-4h1z" clip-rule="evenodd"/><path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z"/>'); // eslint-disable-next-line

  var BIconThreeDots = /*#__PURE__*/makeIcon('ThreeDots', '<path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconThreeDotsVertical = /*#__PURE__*/makeIcon('ThreeDotsVertical', '<path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconToggleOff = /*#__PURE__*/makeIcon('ToggleOff', '<path fill-rule="evenodd" d="M11 4a4 4 0 010 8H8a4.992 4.992 0 002-4 4.992 4.992 0 00-2-4h3zm-6 8a4 4 0 110-8 4 4 0 010 8zM0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconToggleOn = /*#__PURE__*/makeIcon('ToggleOn', '<path fill-rule="evenodd" d="M5 3a5 5 0 000 10h6a5 5 0 000-10H5zm6 9a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconToggles = /*#__PURE__*/makeIcon('Toggles', '<path fill-rule="evenodd" d="M11.5 1h-7a2.5 2.5 0 000 5h7a2.5 2.5 0 000-5zm-7-1a3.5 3.5 0 100 7h7a3.5 3.5 0 100-7h-7zm0 9a3.5 3.5 0 100 7h7a3.5 3.5 0 100-7h-7zm7 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM4.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTools = /*#__PURE__*/makeIcon('Tools', '<path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L10.5 9.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L0 1zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.898 2.223a3.003 3.003 0 01-3.679 3.674L5.878 12.15a3 3 0 11-2.027-2.027l6.252-6.341A3 3 0 0113.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTrash = /*#__PURE__*/makeIcon('Trash', '<path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTrash2 = /*#__PURE__*/makeIcon('Trash2', '<path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 00.986.836h4.612a1 1 0 00.986-.836L12.82 4H3.18zm.541 9.329A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671L14 3H2l1.721 10.329z" clip-rule="evenodd"/><path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTrash2Fill = /*#__PURE__*/makeIcon('Trash2Fill', '<path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTrashFill = /*#__PURE__*/makeIcon('TrashFill', '<path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTriangle = /*#__PURE__*/makeIcon('Triangle', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L8.12 2.073a.146.146 0 00-.054-.057A.13.13 0 008.002 2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTriangleFill = /*#__PURE__*/makeIcon('TriangleFill', '<path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTriangleHalf = /*#__PURE__*/makeIcon('TriangleHalf', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017l6.857-.017V2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTrophy = /*#__PURE__*/makeIcon('Trophy', '<path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 011-1h8a1 1 0 011 1H3zm2-1a1 1 0 011-1h4a1 1 0 011 1H5z"/><path fill-rule="evenodd" d="M12.5 3a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0zm-6-2a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0z" clip-rule="evenodd"/><path d="M7 10h2v4H7v-4z"/><path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>'); // eslint-disable-next-line

  var BIconTv = /*#__PURE__*/makeIcon('Tv', '<path fill-rule="evenodd" d="M2.5 13.5A.5.5 0 013 13h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zM13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTvFill = /*#__PURE__*/makeIcon('TvFill', '<path fill-rule="evenodd" d="M2.5 13.5A.5.5 0 013 13h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconType = /*#__PURE__*/makeIcon('Type', '<path d="M2.244 13.081l.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>'); // eslint-disable-next-line

  var BIconTypeBold = /*#__PURE__*/makeIcon('TypeBold', '<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 001.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>'); // eslint-disable-next-line

  var BIconTypeH1 = /*#__PURE__*/makeIcon('TypeH1', '<path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"/>'); // eslint-disable-next-line

  var BIconTypeH2 = /*#__PURE__*/makeIcon('TypeH2', '<path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"/>'); // eslint-disable-next-line

  var BIconTypeH3 = /*#__PURE__*/makeIcon('TypeH3', '<path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"/>'); // eslint-disable-next-line

  var BIconTypeItalic = /*#__PURE__*/makeIcon('TypeItalic', '<path d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>'); // eslint-disable-next-line

  var BIconTypeStrikethrough = /*#__PURE__*/makeIcon('TypeStrikethrough', '<path d="M8.527 13.164c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5h3.45c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967zM6.602 6.5H5.167a2.776 2.776 0 01-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607 0 .31.083.581.27.814z"/><path fill-rule="evenodd" d="M15 8.5H1v-1h14v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconTypeUnderline = /*#__PURE__*/makeIcon('TypeUnderline', '<path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136z"/><path fill-rule="evenodd" d="M12.5 15h-9v-1h9v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconUnion = /*#__PURE__*/makeIcon('Union', '<path d="M4 5.5A1.5 1.5 0 015.5 4h9A1.5 1.5 0 0116 5.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 14.5v-9z"/><path d="M0 1.5A1.5 1.5 0 011.5 0h9A1.5 1.5 0 0112 1.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 010 10.5v-9z"/>'); // eslint-disable-next-line

  var BIconUnlock = /*#__PURE__*/makeIcon('Unlock', '<path fill-rule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 00-.224.296 1.626 1.626 0 00-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 00.436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 00.224-.296 1.627 1.627 0 00.138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 00-.255-.237A1.122 1.122 0 009.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconUnlockFill = /*#__PURE__*/makeIcon('UnlockFill', '<path d="M.5 9a2 2 0 012-2h7a2 2 0 012 2v5a2 2 0 01-2 2h-7a2 2 0 01-2-2V9z"/><path fill-rule="evenodd" d="M8.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconUpload = /*#__PURE__*/makeIcon('Upload', '<path fill-rule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8zM5 4.854a.5.5 0 00.707 0L8 2.56l2.293 2.293A.5.5 0 1011 4.146L8.354 1.5a.5.5 0 00-.708 0L5 4.146a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconViewList = /*#__PURE__*/makeIcon('ViewList', '<path fill-rule="evenodd" d="M3 4.5h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3zM1 2a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 2zm0 12a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 14z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconViewStacked = /*#__PURE__*/makeIcon('ViewStacked', '<path fill-rule="evenodd" d="M3 0h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2V2a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1V2a1 1 0 00-1-1H3zm0 8h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconVolumeDown = /*#__PURE__*/makeIcon('VolumeDown', '<path fill-rule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM8 5.04L6.312 6.39A.5.5 0 016 6.5H4v3h2a.5.5 0 01.312.11L8 10.96V5.04z" clip-rule="evenodd"/><path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"/>'); // eslint-disable-next-line

  var BIconVolumeDownFill = /*#__PURE__*/makeIcon('VolumeDownFill', '<path fill-rule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/><path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"/>'); // eslint-disable-next-line

  var BIconVolumeMute = /*#__PURE__*/makeIcon('VolumeMute', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM6 5.04L4.312 6.39A.5.5 0 014 6.5H2v3h2a.5.5 0 01.312.11L6 10.96V5.04zm7.854.606a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.146 5.646a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconVolumeMuteFill = /*#__PURE__*/makeIcon('VolumeMuteFill', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 1.596a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.146 5.146a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconVolumeUp = /*#__PURE__*/makeIcon('VolumeUp', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM6 5.04L4.312 6.39A.5.5 0 014 6.5H2v3h2a.5.5 0 01.312.11L6 10.96V5.04z" clip-rule="evenodd"/><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"/>'); // eslint-disable-next-line

  var BIconVolumeUpFill = /*#__PURE__*/makeIcon('VolumeUpFill', '<path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"/><path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconVr = /*#__PURE__*/makeIcon('Vr', '<path d="M3 12V4a1 1 0 011-1h2.5V2H4a2 2 0 00-2 2v8a2 2 0 002 2h2.5v-1H4a1 1 0 01-1-1zm6.5 1v1H12a2 2 0 002-2V4a2 2 0 00-2-2H9.5v1H12a1 1 0 011 1v8a1 1 0 01-1 1H9.5z"/><path fill-rule="evenodd" d="M8 16a.5.5 0 01-.5-.5V.5a.5.5 0 011 0v15a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconWallet = /*#__PURE__*/makeIcon('Wallet', '<path fill-rule="evenodd" d="M1.5 3a.5.5 0 00-.5.5v2h5a.5.5 0 01.5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 01.5-.5h5v-2a.5.5 0 00-.5-.5h-13zM15 6.5h-4.551a2.678 2.678 0 01-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 015.551 6.5H1v6a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-6zm-15-3A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconWatch = /*#__PURE__*/makeIcon('Watch', '<path fill-rule="evenodd" d="M4 14.333v-1.86A5.985 5.985 0 012 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86A5.985 5.985 0 0114 8a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H5.667C4.747 16 4 15.254 4 14.333zM13 8A5 5 0 103 8a5 5 0 0010 0z" clip-rule="evenodd"/><rect width="1" height="2" x="13.5" y="7" rx=".5"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 010-1h1.5V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconWifi = /*#__PURE__*/makeIcon('Wifi', '<path fill-rule="evenodd" d="M6.858 11.858A1.991 1.991 0 018 11.5c.425 0 .818.132 1.142.358L8 13l-1.142-1.142z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.731 12.024l.269.269.269-.269a1.507 1.507 0 00-.538 0zm-1.159-.576A2.49 2.49 0 018 11c.53 0 1.023.165 1.428.448a.5.5 0 01.068.763l-1.142 1.143a.5.5 0 01-.708 0L6.504 12.21a.5.5 0 01.354-.853v.5l-.286-.41zM8 9.5a4.478 4.478 0 00-2.7.9.5.5 0 01-.6-.8c.919-.69 2.062-1.1 3.3-1.1s2.381.41 3.3 1.1a.5.5 0 01-.6.8A4.478 4.478 0 008 9.5zm0-3c-1.833 0-3.51.657-4.814 1.748a.5.5 0 01-.642-.766A8.468 8.468 0 018 5.5c2.076 0 3.98.745 5.456 1.982a.5.5 0 11-.642.766A7.468 7.468 0 008 6.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3.5c-2.657 0-5.082.986-6.932 2.613a.5.5 0 11-.66-.75A11.458 11.458 0 018 2.5c2.91 0 5.567 1.081 7.592 2.862a.5.5 0 11-.66.751A10.458 10.458 0 008 3.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconWindow = /*#__PURE__*/makeIcon('Window', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 6H1V5h14v1z" clip-rule="evenodd"/><path d="M3 3.5a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0z"/>'); // eslint-disable-next-line

  var BIconWrench = /*#__PURE__*/makeIcon('Wrench', '<path fill-rule="evenodd" d="M.102 2.223A3.004 3.004 0 003.78 5.897l6.341 6.252A3.003 3.003 0 0013 16a3 3 0 10-.851-5.878L5.897 3.781A3.004 3.004 0 002.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019L13 11l-.471.242-.529.026-.287.445-.445.287-.026.529L11 13l.242.471.026.529.445.287.287.445.529.026L13 15l.471-.242.529-.026.287-.445.445-.287.026-.529L15 13l-.242-.471-.026-.529-.445-.287-.287-.445-.529-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconX = /*#__PURE__*/makeIcon('X', '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXCircle = /*#__PURE__*/makeIcon('XCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXCircleFill = /*#__PURE__*/makeIcon('XCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXDiamond = /*#__PURE__*/makeIcon('XDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXDiamondFill = /*#__PURE__*/makeIcon('XDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.615L8 8.707l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.615-.707L7.293 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXOctagon = /*#__PURE__*/makeIcon('XOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXOctagonFill = /*#__PURE__*/makeIcon('XOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zm.394 4.708a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXSquare = /*#__PURE__*/makeIcon('XSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

  var BIconXSquareFill = /*#__PURE__*/makeIcon('XSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // --- END AUTO-GENERATED FILE ---

  var RX_ICON_PREFIX = /^BIcon/; // Helper BIcon component
  // Requires the requested icon component to be installed

  var BIcon = /*#__PURE__*/Vue.extend({
    name: 'BIcon',
    functional: true,
    props: _objectSpread2({
      icon: {
        type: String,
        default: null
      }
    }, commonIconProps, {
      stacked: {
        type: Boolean,
        default: false
      }
    }),
    render: function render(h, _ref) {
      var data = _ref.data,
          props = _ref.props,
          parent = _ref.parent;
      var icon = pascalCase(trim(props.icon || '')).replace(RX_ICON_PREFIX, '');
      var iconName = "BIcon".concat(icon); // If parent context exists, we check to see if the icon has been registered
      // Either locally in the parent component, or globally at the `$root` level
      // If not registered, we render a blank icon

      var components = ((parent || {}).$options || {}).components;
      var componentRefOrName = icon && components ? components[iconName] || BIconBlank : icon ? iconName : BIconBlank;
      return h(componentRefOrName, a(data, {
        props: _objectSpread2({}, props, {
          icon: null
        })
      }));
    }
  });

  var BIconstack = /*#__PURE__*/Vue.extend({
    name: 'BIconstack',
    functional: true,
    props: _objectSpread2({}, commonIconProps),
    render: function render(h, _ref) {
      var data = _ref.data,
          props = _ref.props,
          children = _ref.children;
      return h(BVIconBase, a(data, {
        staticClass: 'b-iconstack',
        props: _objectSpread2({}, props, {
          stacked: false
        })
      }), children);
    }
  });

  // --- BEGIN AUTO-GENERATED FILE ---

  var IconsPlugin = /*#__PURE__*/pluginFactoryNoConfig({
    components: {
      // Icon helper component
      BIcon: BIcon,
      // Icon stacking component
      BIconstack: BIconstack,
      // BootstrapVue custom icon components
      BIconBlank: BIconBlank,
      // Bootstrap icon components
      BIconAlarm: BIconAlarm,
      BIconAlarmFill: BIconAlarmFill,
      BIconAlt: BIconAlt,
      BIconApp: BIconApp,
      BIconAppIndicator: BIconAppIndicator,
      BIconArchive: BIconArchive,
      BIconArchiveFill: BIconArchiveFill,
      BIconArrow90degDown: BIconArrow90degDown,
      BIconArrow90degLeft: BIconArrow90degLeft,
      BIconArrow90degRight: BIconArrow90degRight,
      BIconArrow90degUp: BIconArrow90degUp,
      BIconArrowBarDown: BIconArrowBarDown,
      BIconArrowBarLeft: BIconArrowBarLeft,
      BIconArrowBarRight: BIconArrowBarRight,
      BIconArrowBarUp: BIconArrowBarUp,
      BIconArrowClockwise: BIconArrowClockwise,
      BIconArrowCounterclockwise: BIconArrowCounterclockwise,
      BIconArrowDown: BIconArrowDown,
      BIconArrowDownLeft: BIconArrowDownLeft,
      BIconArrowDownRight: BIconArrowDownRight,
      BIconArrowDownShort: BIconArrowDownShort,
      BIconArrowLeft: BIconArrowLeft,
      BIconArrowLeftRight: BIconArrowLeftRight,
      BIconArrowLeftShort: BIconArrowLeftShort,
      BIconArrowRepeat: BIconArrowRepeat,
      BIconArrowReturnLeft: BIconArrowReturnLeft,
      BIconArrowReturnRight: BIconArrowReturnRight,
      BIconArrowRight: BIconArrowRight,
      BIconArrowRightShort: BIconArrowRightShort,
      BIconArrowUp: BIconArrowUp,
      BIconArrowUpDown: BIconArrowUpDown,
      BIconArrowUpLeft: BIconArrowUpLeft,
      BIconArrowUpRight: BIconArrowUpRight,
      BIconArrowUpShort: BIconArrowUpShort,
      BIconArrowsAngleContract: BIconArrowsAngleContract,
      BIconArrowsAngleExpand: BIconArrowsAngleExpand,
      BIconArrowsCollapse: BIconArrowsCollapse,
      BIconArrowsExpand: BIconArrowsExpand,
      BIconArrowsFullscreen: BIconArrowsFullscreen,
      BIconArrowsMove: BIconArrowsMove,
      BIconAspectRatio: BIconAspectRatio,
      BIconAspectRatioFill: BIconAspectRatioFill,
      BIconAt: BIconAt,
      BIconAward: BIconAward,
      BIconAwardFill: BIconAwardFill,
      BIconBackspace: BIconBackspace,
      BIconBackspaceFill: BIconBackspaceFill,
      BIconBackspaceReverse: BIconBackspaceReverse,
      BIconBackspaceReverseFill: BIconBackspaceReverseFill,
      BIconBag: BIconBag,
      BIconBagFill: BIconBagFill,
      BIconBarChart: BIconBarChart,
      BIconBarChartFill: BIconBarChartFill,
      BIconBattery: BIconBattery,
      BIconBatteryCharging: BIconBatteryCharging,
      BIconBatteryFull: BIconBatteryFull,
      BIconBatteryHalf: BIconBatteryHalf,
      BIconBell: BIconBell,
      BIconBellFill: BIconBellFill,
      BIconBlockquoteLeft: BIconBlockquoteLeft,
      BIconBlockquoteRight: BIconBlockquoteRight,
      BIconBook: BIconBook,
      BIconBookHalf: BIconBookHalf,
      BIconBookmark: BIconBookmark,
      BIconBookmarkCheck: BIconBookmarkCheck,
      BIconBookmarkDash: BIconBookmarkDash,
      BIconBookmarkFill: BIconBookmarkFill,
      BIconBookmarkPlus: BIconBookmarkPlus,
      BIconBookmarks: BIconBookmarks,
      BIconBookmarksFill: BIconBookmarksFill,
      BIconBootstrap: BIconBootstrap,
      BIconBootstrapFill: BIconBootstrapFill,
      BIconBootstrapReboot: BIconBootstrapReboot,
      BIconBoundingBox: BIconBoundingBox,
      BIconBoundingBoxCircles: BIconBoundingBoxCircles,
      BIconBoxArrowDown: BIconBoxArrowDown,
      BIconBoxArrowDownLeft: BIconBoxArrowDownLeft,
      BIconBoxArrowDownRight: BIconBoxArrowDownRight,
      BIconBoxArrowInDown: BIconBoxArrowInDown,
      BIconBoxArrowInDownLeft: BIconBoxArrowInDownLeft,
      BIconBoxArrowInDownRight: BIconBoxArrowInDownRight,
      BIconBoxArrowInLeft: BIconBoxArrowInLeft,
      BIconBoxArrowInRight: BIconBoxArrowInRight,
      BIconBoxArrowInUp: BIconBoxArrowInUp,
      BIconBoxArrowInUpLeft: BIconBoxArrowInUpLeft,
      BIconBoxArrowInUpRight: BIconBoxArrowInUpRight,
      BIconBoxArrowLeft: BIconBoxArrowLeft,
      BIconBoxArrowRight: BIconBoxArrowRight,
      BIconBoxArrowUp: BIconBoxArrowUp,
      BIconBoxArrowUpLeft: BIconBoxArrowUpLeft,
      BIconBoxArrowUpRight: BIconBoxArrowUpRight,
      BIconBraces: BIconBraces,
      BIconBriefcase: BIconBriefcase,
      BIconBriefcaseFill: BIconBriefcaseFill,
      BIconBrightnessAltHigh: BIconBrightnessAltHigh,
      BIconBrightnessAltHighFill: BIconBrightnessAltHighFill,
      BIconBrightnessAltLow: BIconBrightnessAltLow,
      BIconBrightnessAltLowFill: BIconBrightnessAltLowFill,
      BIconBrightnessHigh: BIconBrightnessHigh,
      BIconBrightnessHighFill: BIconBrightnessHighFill,
      BIconBrightnessLow: BIconBrightnessLow,
      BIconBrightnessLowFill: BIconBrightnessLowFill,
      BIconBrush: BIconBrush,
      BIconBucket: BIconBucket,
      BIconBucketFill: BIconBucketFill,
      BIconBuilding: BIconBuilding,
      BIconBullseye: BIconBullseye,
      BIconCalendar: BIconCalendar,
      BIconCalendarFill: BIconCalendarFill,
      BIconCamera: BIconCamera,
      BIconCameraVideo: BIconCameraVideo,
      BIconCameraVideoFill: BIconCameraVideoFill,
      BIconCapslock: BIconCapslock,
      BIconCapslockFill: BIconCapslockFill,
      BIconCardChecklist: BIconCardChecklist,
      BIconCardHeading: BIconCardHeading,
      BIconCardImage: BIconCardImage,
      BIconCardList: BIconCardList,
      BIconCardText: BIconCardText,
      BIconCaretDown: BIconCaretDown,
      BIconCaretDownFill: BIconCaretDownFill,
      BIconCaretLeft: BIconCaretLeft,
      BIconCaretLeftFill: BIconCaretLeftFill,
      BIconCaretRight: BIconCaretRight,
      BIconCaretRightFill: BIconCaretRightFill,
      BIconCaretUp: BIconCaretUp,
      BIconCaretUpFill: BIconCaretUpFill,
      BIconChat: BIconChat,
      BIconChatDots: BIconChatDots,
      BIconChatDotsFill: BIconChatDotsFill,
      BIconChatFill: BIconChatFill,
      BIconChatQuote: BIconChatQuote,
      BIconChatQuoteFill: BIconChatQuoteFill,
      BIconChatSquare: BIconChatSquare,
      BIconChatSquareDots: BIconChatSquareDots,
      BIconChatSquareDotsFill: BIconChatSquareDotsFill,
      BIconChatSquareFill: BIconChatSquareFill,
      BIconChatSquareQuote: BIconChatSquareQuote,
      BIconChatSquareQuoteFill: BIconChatSquareQuoteFill,
      BIconCheck: BIconCheck,
      BIconCheckAll: BIconCheckAll,
      BIconCheckBox: BIconCheckBox,
      BIconCheckCircle: BIconCheckCircle,
      BIconChevronBarContract: BIconChevronBarContract,
      BIconChevronBarDown: BIconChevronBarDown,
      BIconChevronBarExpand: BIconChevronBarExpand,
      BIconChevronBarLeft: BIconChevronBarLeft,
      BIconChevronBarRight: BIconChevronBarRight,
      BIconChevronBarUp: BIconChevronBarUp,
      BIconChevronCompactDown: BIconChevronCompactDown,
      BIconChevronCompactLeft: BIconChevronCompactLeft,
      BIconChevronCompactRight: BIconChevronCompactRight,
      BIconChevronCompactUp: BIconChevronCompactUp,
      BIconChevronContract: BIconChevronContract,
      BIconChevronDoubleDown: BIconChevronDoubleDown,
      BIconChevronDoubleLeft: BIconChevronDoubleLeft,
      BIconChevronDoubleRight: BIconChevronDoubleRight,
      BIconChevronDoubleUp: BIconChevronDoubleUp,
      BIconChevronDown: BIconChevronDown,
      BIconChevronExpand: BIconChevronExpand,
      BIconChevronLeft: BIconChevronLeft,
      BIconChevronRight: BIconChevronRight,
      BIconChevronUp: BIconChevronUp,
      BIconCircle: BIconCircle,
      BIconCircleFill: BIconCircleFill,
      BIconCircleHalf: BIconCircleHalf,
      BIconCircleSquare: BIconCircleSquare,
      BIconClipboard: BIconClipboard,
      BIconClipboardData: BIconClipboardData,
      BIconClock: BIconClock,
      BIconClockFill: BIconClockFill,
      BIconClockHistory: BIconClockHistory,
      BIconCloud: BIconCloud,
      BIconCloudDownload: BIconCloudDownload,
      BIconCloudFill: BIconCloudFill,
      BIconCloudUpload: BIconCloudUpload,
      BIconCode: BIconCode,
      BIconCodeSlash: BIconCodeSlash,
      BIconCollection: BIconCollection,
      BIconCollectionFill: BIconCollectionFill,
      BIconCollectionPlay: BIconCollectionPlay,
      BIconCollectionPlayFill: BIconCollectionPlayFill,
      BIconColumns: BIconColumns,
      BIconColumnsGap: BIconColumnsGap,
      BIconCommand: BIconCommand,
      BIconCompass: BIconCompass,
      BIconCone: BIconCone,
      BIconConeStriped: BIconConeStriped,
      BIconController: BIconController,
      BIconCreditCard: BIconCreditCard,
      BIconCrop: BIconCrop,
      BIconCursor: BIconCursor,
      BIconCursorFill: BIconCursorFill,
      BIconCursorText: BIconCursorText,
      BIconDash: BIconDash,
      BIconDashCircle: BIconDashCircle,
      BIconDashCircleFill: BIconDashCircleFill,
      BIconDashSquare: BIconDashSquare,
      BIconDashSquareFill: BIconDashSquareFill,
      BIconDiamond: BIconDiamond,
      BIconDiamondFill: BIconDiamondFill,
      BIconDiamondHalf: BIconDiamondHalf,
      BIconDisplay: BIconDisplay,
      BIconDisplayFill: BIconDisplayFill,
      BIconDot: BIconDot,
      BIconDownload: BIconDownload,
      BIconDroplet: BIconDroplet,
      BIconDropletFill: BIconDropletFill,
      BIconDropletHalf: BIconDropletHalf,
      BIconEgg: BIconEgg,
      BIconEggFill: BIconEggFill,
      BIconEggFried: BIconEggFried,
      BIconEject: BIconEject,
      BIconEjectFill: BIconEjectFill,
      BIconEnvelope: BIconEnvelope,
      BIconEnvelopeFill: BIconEnvelopeFill,
      BIconEnvelopeOpen: BIconEnvelopeOpen,
      BIconEnvelopeOpenFill: BIconEnvelopeOpenFill,
      BIconExclamation: BIconExclamation,
      BIconExclamationCircle: BIconExclamationCircle,
      BIconExclamationCircleFill: BIconExclamationCircleFill,
      BIconExclamationDiamond: BIconExclamationDiamond,
      BIconExclamationDiamondFill: BIconExclamationDiamondFill,
      BIconExclamationOctagon: BIconExclamationOctagon,
      BIconExclamationOctagonFill: BIconExclamationOctagonFill,
      BIconExclamationSquare: BIconExclamationSquare,
      BIconExclamationSquareFill: BIconExclamationSquareFill,
      BIconExclamationTriangle: BIconExclamationTriangle,
      BIconExclamationTriangleFill: BIconExclamationTriangleFill,
      BIconExclude: BIconExclude,
      BIconEye: BIconEye,
      BIconEyeFill: BIconEyeFill,
      BIconEyeSlash: BIconEyeSlash,
      BIconEyeSlashFill: BIconEyeSlashFill,
      BIconFile: BIconFile,
      BIconFileArrowDown: BIconFileArrowDown,
      BIconFileArrowUp: BIconFileArrowUp,
      BIconFileBreak: BIconFileBreak,
      BIconFileCheck: BIconFileCheck,
      BIconFileCode: BIconFileCode,
      BIconFileDiff: BIconFileDiff,
      BIconFileEarmark: BIconFileEarmark,
      BIconFileEarmarkArrowDown: BIconFileEarmarkArrowDown,
      BIconFileEarmarkArrowUp: BIconFileEarmarkArrowUp,
      BIconFileEarmarkBreak: BIconFileEarmarkBreak,
      BIconFileEarmarkCheck: BIconFileEarmarkCheck,
      BIconFileEarmarkCode: BIconFileEarmarkCode,
      BIconFileEarmarkDiff: BIconFileEarmarkDiff,
      BIconFileEarmarkMinus: BIconFileEarmarkMinus,
      BIconFileEarmarkPlus: BIconFileEarmarkPlus,
      BIconFileEarmarkRuled: BIconFileEarmarkRuled,
      BIconFileEarmarkSpreadsheet: BIconFileEarmarkSpreadsheet,
      BIconFileEarmarkText: BIconFileEarmarkText,
      BIconFileEarmarkZip: BIconFileEarmarkZip,
      BIconFileMinus: BIconFileMinus,
      BIconFilePlus: BIconFilePlus,
      BIconFilePost: BIconFilePost,
      BIconFileRichtext: BIconFileRichtext,
      BIconFileRuled: BIconFileRuled,
      BIconFileSpreadsheet: BIconFileSpreadsheet,
      BIconFileText: BIconFileText,
      BIconFileZip: BIconFileZip,
      BIconFiles: BIconFiles,
      BIconFilesAlt: BIconFilesAlt,
      BIconFilm: BIconFilm,
      BIconFilter: BIconFilter,
      BIconFilterLeft: BIconFilterLeft,
      BIconFilterRight: BIconFilterRight,
      BIconFlag: BIconFlag,
      BIconFlagFill: BIconFlagFill,
      BIconFolder: BIconFolder,
      BIconFolderCheck: BIconFolderCheck,
      BIconFolderFill: BIconFolderFill,
      BIconFolderMinus: BIconFolderMinus,
      BIconFolderPlus: BIconFolderPlus,
      BIconFolderSymlink: BIconFolderSymlink,
      BIconFolderSymlinkFill: BIconFolderSymlinkFill,
      BIconFonts: BIconFonts,
      BIconForward: BIconForward,
      BIconForwardFill: BIconForwardFill,
      BIconFullscreen: BIconFullscreen,
      BIconFullscreenExit: BIconFullscreenExit,
      BIconFunnel: BIconFunnel,
      BIconFunnelFill: BIconFunnelFill,
      BIconGear: BIconGear,
      BIconGearFill: BIconGearFill,
      BIconGearWide: BIconGearWide,
      BIconGearWideConnected: BIconGearWideConnected,
      BIconGem: BIconGem,
      BIconGeo: BIconGeo,
      BIconGeoAlt: BIconGeoAlt,
      BIconGift: BIconGift,
      BIconGiftFill: BIconGiftFill,
      BIconGraphDown: BIconGraphDown,
      BIconGraphUp: BIconGraphUp,
      BIconGrid: BIconGrid,
      BIconGrid1x2: BIconGrid1x2,
      BIconGrid1x2Fill: BIconGrid1x2Fill,
      BIconGrid3x2: BIconGrid3x2,
      BIconGrid3x2Gap: BIconGrid3x2Gap,
      BIconGrid3x2GapFill: BIconGrid3x2GapFill,
      BIconGrid3x3: BIconGrid3x3,
      BIconGrid3x3Gap: BIconGrid3x3Gap,
      BIconGrid3x3GapFill: BIconGrid3x3GapFill,
      BIconGridFill: BIconGridFill,
      BIconHammer: BIconHammer,
      BIconHash: BIconHash,
      BIconHeart: BIconHeart,
      BIconHeartFill: BIconHeartFill,
      BIconHeartHalf: BIconHeartHalf,
      BIconHouse: BIconHouse,
      BIconHouseDoor: BIconHouseDoor,
      BIconHouseDoorFill: BIconHouseDoorFill,
      BIconHouseFill: BIconHouseFill,
      BIconHr: BIconHr,
      BIconImage: BIconImage,
      BIconImageAlt: BIconImageAlt,
      BIconImageFill: BIconImageFill,
      BIconImages: BIconImages,
      BIconInbox: BIconInbox,
      BIconInboxFill: BIconInboxFill,
      BIconInboxes: BIconInboxes,
      BIconInboxesFill: BIconInboxesFill,
      BIconInfo: BIconInfo,
      BIconInfoCircle: BIconInfoCircle,
      BIconInfoCircleFill: BIconInfoCircleFill,
      BIconInfoSquare: BIconInfoSquare,
      BIconInfoSquareFill: BIconInfoSquareFill,
      BIconIntersect: BIconIntersect,
      BIconJustify: BIconJustify,
      BIconJustifyLeft: BIconJustifyLeft,
      BIconJustifyRight: BIconJustifyRight,
      BIconKanban: BIconKanban,
      BIconKanbanFill: BIconKanbanFill,
      BIconLaptop: BIconLaptop,
      BIconLayers: BIconLayers,
      BIconLayersFill: BIconLayersFill,
      BIconLayersHalf: BIconLayersHalf,
      BIconLayoutSidebar: BIconLayoutSidebar,
      BIconLayoutSidebarInset: BIconLayoutSidebarInset,
      BIconLayoutSidebarInsetReverse: BIconLayoutSidebarInsetReverse,
      BIconLayoutSidebarReverse: BIconLayoutSidebarReverse,
      BIconLayoutSplit: BIconLayoutSplit,
      BIconLayoutTextSidebar: BIconLayoutTextSidebar,
      BIconLayoutTextSidebarReverse: BIconLayoutTextSidebarReverse,
      BIconLayoutTextWindow: BIconLayoutTextWindow,
      BIconLayoutTextWindowReverse: BIconLayoutTextWindowReverse,
      BIconLayoutThreeColumns: BIconLayoutThreeColumns,
      BIconLayoutWtf: BIconLayoutWtf,
      BIconLifePreserver: BIconLifePreserver,
      BIconLightning: BIconLightning,
      BIconLightningFill: BIconLightningFill,
      BIconLink: BIconLink,
      BIconLink45deg: BIconLink45deg,
      BIconList: BIconList,
      BIconListCheck: BIconListCheck,
      BIconListNested: BIconListNested,
      BIconListOl: BIconListOl,
      BIconListTask: BIconListTask,
      BIconListUl: BIconListUl,
      BIconLock: BIconLock,
      BIconLockFill: BIconLockFill,
      BIconMap: BIconMap,
      BIconMic: BIconMic,
      BIconMicFill: BIconMicFill,
      BIconMicMute: BIconMicMute,
      BIconMicMuteFill: BIconMicMuteFill,
      BIconMoon: BIconMoon,
      BIconMusicNote: BIconMusicNote,
      BIconMusicNoteBeamed: BIconMusicNoteBeamed,
      BIconMusicNoteList: BIconMusicNoteList,
      BIconMusicPlayer: BIconMusicPlayer,
      BIconMusicPlayerFill: BIconMusicPlayerFill,
      BIconNewspaper: BIconNewspaper,
      BIconOctagon: BIconOctagon,
      BIconOctagonFill: BIconOctagonFill,
      BIconOctagonHalf: BIconOctagonHalf,
      BIconOption: BIconOption,
      BIconOutlet: BIconOutlet,
      BIconPaperclip: BIconPaperclip,
      BIconPause: BIconPause,
      BIconPauseFill: BIconPauseFill,
      BIconPen: BIconPen,
      BIconPencil: BIconPencil,
      BIconPencilSquare: BIconPencilSquare,
      BIconPentagon: BIconPentagon,
      BIconPentagonFill: BIconPentagonFill,
      BIconPentagonHalf: BIconPentagonHalf,
      BIconPeople: BIconPeople,
      BIconPeopleCircle: BIconPeopleCircle,
      BIconPeopleFill: BIconPeopleFill,
      BIconPerson: BIconPerson,
      BIconPersonBoundingBox: BIconPersonBoundingBox,
      BIconPersonCheck: BIconPersonCheck,
      BIconPersonCheckFill: BIconPersonCheckFill,
      BIconPersonDash: BIconPersonDash,
      BIconPersonDashFill: BIconPersonDashFill,
      BIconPersonFill: BIconPersonFill,
      BIconPersonLinesFill: BIconPersonLinesFill,
      BIconPersonPlus: BIconPersonPlus,
      BIconPersonPlusFill: BIconPersonPlusFill,
      BIconPersonSquare: BIconPersonSquare,
      BIconPhone: BIconPhone,
      BIconPhoneLandscape: BIconPhoneLandscape,
      BIconPieChart: BIconPieChart,
      BIconPieChartFill: BIconPieChartFill,
      BIconPip: BIconPip,
      BIconPipFill: BIconPipFill,
      BIconPlay: BIconPlay,
      BIconPlayFill: BIconPlayFill,
      BIconPlug: BIconPlug,
      BIconPlus: BIconPlus,
      BIconPlusCircle: BIconPlusCircle,
      BIconPlusCircleFill: BIconPlusCircleFill,
      BIconPlusSquare: BIconPlusSquare,
      BIconPlusSquareFill: BIconPlusSquareFill,
      BIconPower: BIconPower,
      BIconPuzzle: BIconPuzzle,
      BIconPuzzleFill: BIconPuzzleFill,
      BIconQuestion: BIconQuestion,
      BIconQuestionCircle: BIconQuestionCircle,
      BIconQuestionCircleFill: BIconQuestionCircleFill,
      BIconQuestionDiamond: BIconQuestionDiamond,
      BIconQuestionDiamondFill: BIconQuestionDiamondFill,
      BIconQuestionOctagon: BIconQuestionOctagon,
      BIconQuestionOctagonFill: BIconQuestionOctagonFill,
      BIconQuestionSquare: BIconQuestionSquare,
      BIconQuestionSquareFill: BIconQuestionSquareFill,
      BIconReply: BIconReply,
      BIconReplyAll: BIconReplyAll,
      BIconReplyAllFill: BIconReplyAllFill,
      BIconReplyFill: BIconReplyFill,
      BIconScrewdriver: BIconScrewdriver,
      BIconSearch: BIconSearch,
      BIconServer: BIconServer,
      BIconShield: BIconShield,
      BIconShieldFill: BIconShieldFill,
      BIconShieldLock: BIconShieldLock,
      BIconShieldLockFill: BIconShieldLockFill,
      BIconShieldShaded: BIconShieldShaded,
      BIconShift: BIconShift,
      BIconShiftFill: BIconShiftFill,
      BIconShuffle: BIconShuffle,
      BIconSkipBackward: BIconSkipBackward,
      BIconSkipBackwardFill: BIconSkipBackwardFill,
      BIconSkipEnd: BIconSkipEnd,
      BIconSkipEndFill: BIconSkipEndFill,
      BIconSkipForward: BIconSkipForward,
      BIconSkipForwardFill: BIconSkipForwardFill,
      BIconSkipStart: BIconSkipStart,
      BIconSkipStartFill: BIconSkipStartFill,
      BIconSlash: BIconSlash,
      BIconSlashCircle: BIconSlashCircle,
      BIconSlashCircleFill: BIconSlashCircleFill,
      BIconSlashSquare: BIconSlashSquare,
      BIconSlashSquareFill: BIconSlashSquareFill,
      BIconSliders: BIconSliders,
      BIconSoundwave: BIconSoundwave,
      BIconSpeaker: BIconSpeaker,
      BIconSquare: BIconSquare,
      BIconSquareFill: BIconSquareFill,
      BIconSquareHalf: BIconSquareHalf,
      BIconStar: BIconStar,
      BIconStarFill: BIconStarFill,
      BIconStarHalf: BIconStarHalf,
      BIconStop: BIconStop,
      BIconStopFill: BIconStopFill,
      BIconStopwatch: BIconStopwatch,
      BIconStopwatchFill: BIconStopwatchFill,
      BIconSubtract: BIconSubtract,
      BIconSun: BIconSun,
      BIconTable: BIconTable,
      BIconTablet: BIconTablet,
      BIconTabletLandscape: BIconTabletLandscape,
      BIconTag: BIconTag,
      BIconTagFill: BIconTagFill,
      BIconTerminal: BIconTerminal,
      BIconTerminalFill: BIconTerminalFill,
      BIconTextCenter: BIconTextCenter,
      BIconTextIndentLeft: BIconTextIndentLeft,
      BIconTextIndentRight: BIconTextIndentRight,
      BIconTextLeft: BIconTextLeft,
      BIconTextRight: BIconTextRight,
      BIconTextarea: BIconTextarea,
      BIconTextareaT: BIconTextareaT,
      BIconThreeDots: BIconThreeDots,
      BIconThreeDotsVertical: BIconThreeDotsVertical,
      BIconToggleOff: BIconToggleOff,
      BIconToggleOn: BIconToggleOn,
      BIconToggles: BIconToggles,
      BIconTools: BIconTools,
      BIconTrash: BIconTrash,
      BIconTrash2: BIconTrash2,
      BIconTrash2Fill: BIconTrash2Fill,
      BIconTrashFill: BIconTrashFill,
      BIconTriangle: BIconTriangle,
      BIconTriangleFill: BIconTriangleFill,
      BIconTriangleHalf: BIconTriangleHalf,
      BIconTrophy: BIconTrophy,
      BIconTv: BIconTv,
      BIconTvFill: BIconTvFill,
      BIconType: BIconType,
      BIconTypeBold: BIconTypeBold,
      BIconTypeH1: BIconTypeH1,
      BIconTypeH2: BIconTypeH2,
      BIconTypeH3: BIconTypeH3,
      BIconTypeItalic: BIconTypeItalic,
      BIconTypeStrikethrough: BIconTypeStrikethrough,
      BIconTypeUnderline: BIconTypeUnderline,
      BIconUnion: BIconUnion,
      BIconUnlock: BIconUnlock,
      BIconUnlockFill: BIconUnlockFill,
      BIconUpload: BIconUpload,
      BIconViewList: BIconViewList,
      BIconViewStacked: BIconViewStacked,
      BIconVolumeDown: BIconVolumeDown,
      BIconVolumeDownFill: BIconVolumeDownFill,
      BIconVolumeMute: BIconVolumeMute,
      BIconVolumeMuteFill: BIconVolumeMuteFill,
      BIconVolumeUp: BIconVolumeUp,
      BIconVolumeUpFill: BIconVolumeUpFill,
      BIconVr: BIconVr,
      BIconWallet: BIconWallet,
      BIconWatch: BIconWatch,
      BIconWifi: BIconWifi,
      BIconWindow: BIconWindow,
      BIconWrench: BIconWrench,
      BIconX: BIconX,
      BIconXCircle: BIconXCircle,
      BIconXCircleFill: BIconXCircleFill,
      BIconXDiamond: BIconXDiamond,
      BIconXDiamondFill: BIconXDiamondFill,
      BIconXOctagon: BIconXOctagon,
      BIconXOctagonFill: BIconXOctagonFill,
      BIconXSquare: BIconXSquare,
      BIconXSquareFill: BIconXSquareFill
    }
  }); // Export the BootstrapVueIcons plugin installer
  // Mainly for the stand-alone bootstrap-vue-icons.xxx.js builds

  var BootstrapVueIcons = /*#__PURE__*/pluginFactoryNoConfig({
    plugins: {
      IconsPlugin: IconsPlugin
    }
  }, {
    NAME: 'BootstrapVueIcons'
  }); // --- END AUTO-GENERATED FILE ---

  // Main entry point for the browser icons-only build

  vueUse(BootstrapVueIcons);

  return BootstrapVueIcons;

})));
//# sourceMappingURL=bootstrap-vue-icons.js.map
