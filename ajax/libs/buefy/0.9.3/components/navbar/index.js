/*! Buefy v0.9.3 | MIT License | github.com/buefy/buefy */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Navbar = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: 'NavbarBurger',
    props: {
      isOpened: {
        type: Boolean,
        default: false
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',_vm._g({staticClass:"navbar-burger burger",class:{ 'is-active': _vm.isOpened },attrs:{"role":"button","aria-label":"menu","aria-expanded":_vm.isOpened}},_vm.$listeners),[_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}}),_c('span',{attrs:{"aria-hidden":"true"}})])};
  var __vue_staticRenderFns__ = [];

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarBurger = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      undefined,
      undefined
    );

  var isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.msMaxTouchPoints > 0);
  var events = isTouch ? ['touchstart', 'click'] : ['click'];
  var instances = [];

  function processArgs(bindingValue) {
    var isFunction = typeof bindingValue === 'function';

    if (!isFunction && _typeof(bindingValue) !== 'object') {
      throw new Error("v-click-outside: Binding value should be a function or an object, typeof ".concat(bindingValue, " given"));
    }

    return {
      handler: isFunction ? bindingValue : bindingValue.handler,
      middleware: bindingValue.middleware || function (isClickOutside) {
        return isClickOutside;
      },
      events: bindingValue.events || events
    };
  }

  function onEvent(_ref) {
    var el = _ref.el,
        event = _ref.event,
        handler = _ref.handler,
        middleware = _ref.middleware;
    var isClickOutside = event.target !== el && !el.contains(event.target);

    if (!isClickOutside) {
      return;
    }

    if (middleware(event, el)) {
      handler(event, el);
    }
  }

  function bind(el, _ref2) {
    var value = _ref2.value;

    var _processArgs = processArgs(value),
        _handler = _processArgs.handler,
        middleware = _processArgs.middleware,
        events = _processArgs.events;

    var instance = {
      el: el,
      eventHandlers: events.map(function (eventName) {
        return {
          event: eventName,
          handler: function handler(event) {
            return onEvent({
              event: event,
              el: el,
              handler: _handler,
              middleware: middleware
            });
          }
        };
      })
    };
    instance.eventHandlers.forEach(function (_ref3) {
      var event = _ref3.event,
          handler = _ref3.handler;
      return document.addEventListener(event, handler);
    });
    instances.push(instance);
  }

  function update(el, _ref4) {
    var value = _ref4.value;

    var _processArgs2 = processArgs(value),
        _handler2 = _processArgs2.handler,
        middleware = _processArgs2.middleware,
        events = _processArgs2.events; // `filter` instead of `find` for compat with IE


    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    instance.eventHandlers.forEach(function (_ref5) {
      var event = _ref5.event,
          handler = _ref5.handler;
      return document.removeEventListener(event, handler);
    });
    instance.eventHandlers = events.map(function (eventName) {
      return {
        event: eventName,
        handler: function handler(event) {
          return onEvent({
            event: event,
            el: el,
            handler: _handler2,
            middleware: middleware
          });
        }
      };
    });
    instance.eventHandlers.forEach(function (_ref6) {
      var event = _ref6.event,
          handler = _ref6.handler;
      return document.addEventListener(event, handler);
    });
  }

  function unbind(el) {
    // `filter` instead of `find` for compat with IE
    var instance = instances.filter(function (instance) {
      return instance.el === el;
    })[0];
    instance.eventHandlers.forEach(function (_ref7) {
      var event = _ref7.event,
          handler = _ref7.handler;
      return document.removeEventListener(event, handler);
    });
  }

  var directive = {
    bind: bind,
    update: update,
    unbind: unbind,
    instances: instances
  };

  var FIXED_TOP_CLASS = 'is-fixed-top';
  var BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top';
  var BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top';
  var FIXED_BOTTOM_CLASS = 'is-fixed-bottom';
  var BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom';
  var BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom';
  var BODY_CENTERED_CLASS = 'has-navbar-centered';

  var isFilled = function isFilled(str) {
    return !!str;
  };

  var script$1 = {
    name: 'BNavbar',
    components: {
      NavbarBurger: NavbarBurger
    },
    directives: {
      clickOutside: directive
    },
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
      prop: 'active',
      event: 'update:active'
    },
    props: {
      type: [String, Object],
      transparent: {
        type: Boolean,
        default: false
      },
      fixedTop: {
        type: Boolean,
        default: false
      },
      fixedBottom: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      centered: {
        type: Boolean,
        default: false
      },
      wrapperClass: {
        type: String
      },
      closeOnClick: {
        type: Boolean,
        default: true
      },
      mobileBurger: {
        type: Boolean,
        default: true
      },
      spaced: Boolean,
      shadow: Boolean
    },
    data: function data() {
      return {
        internalIsActive: this.active,
        _isNavBar: true // Used internally by NavbarItem

      };
    },
    computed: {
      isOpened: function isOpened() {
        return this.internalIsActive;
      },
      computedClasses: function computedClasses() {
        var _ref;

        return [this.type, (_ref = {}, _defineProperty(_ref, FIXED_TOP_CLASS, this.fixedTop), _defineProperty(_ref, FIXED_BOTTOM_CLASS, this.fixedBottom), _defineProperty(_ref, BODY_CENTERED_CLASS, this.centered), _defineProperty(_ref, 'is-spaced', this.spaced), _defineProperty(_ref, 'has-shadow', this.shadow), _defineProperty(_ref, 'is-transparent', this.transparent), _ref)];
      }
    },
    watch: {
      active: {
        handler: function handler(active) {
          this.internalIsActive = active;
        },
        immediate: true
      },
      fixedTop: {
        handler: function handler(isSet) {
          this.checkIfFixedPropertiesAreColliding();

          if (isSet) {
            // TODO Apply only one of the classes once PR is merged in Bulma:
            // https://github.com/jgthms/bulma/pull/2737
            this.setBodyClass(BODY_FIXED_TOP_CLASS);
            this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
          } else {
            this.removeBodyClass(BODY_FIXED_TOP_CLASS);
            this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS);
          }
        },
        immediate: true
      },
      fixedBottom: {
        handler: function handler(isSet) {
          this.checkIfFixedPropertiesAreColliding();

          if (isSet) {
            // TODO Apply only one of the classes once PR is merged in Bulma:
            // https://github.com/jgthms/bulma/pull/2737
            this.setBodyClass(BODY_FIXED_BOTTOM_CLASS);
            this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
          } else {
            this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS);
            this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS);
          }
        },
        immediate: true
      }
    },
    methods: {
      toggleActive: function toggleActive() {
        this.internalIsActive = !this.internalIsActive;
        this.emitUpdateParentEvent();
      },
      closeMenu: function closeMenu() {
        if (this.closeOnClick) {
          this.internalIsActive = false;
          this.emitUpdateParentEvent();
        }
      },
      emitUpdateParentEvent: function emitUpdateParentEvent() {
        this.$emit('update:active', this.internalIsActive);
      },
      setBodyClass: function setBodyClass(className) {
        if (typeof window !== 'undefined') {
          document.body.classList.add(className);
        }
      },
      removeBodyClass: function removeBodyClass(className) {
        if (typeof window !== 'undefined') {
          document.body.classList.remove(className);
        }
      },
      checkIfFixedPropertiesAreColliding: function checkIfFixedPropertiesAreColliding() {
        var areColliding = this.fixedTop && this.fixedBottom;

        if (areColliding) {
          throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both');
        }
      },
      genNavbar: function genNavbar(createElement) {
        var navBarSlots = [this.genNavbarBrandNode(createElement), this.genNavbarSlotsNode(createElement)];

        if (!isFilled(this.wrapperClass)) {
          return this.genNavbarSlots(createElement, navBarSlots);
        } // It wraps the slots into a div with the provided wrapperClass prop


        var navWrapper = createElement('div', {
          class: this.wrapperClass
        }, navBarSlots);
        return this.genNavbarSlots(createElement, [navWrapper]);
      },
      genNavbarSlots: function genNavbarSlots(createElement, slots) {
        return createElement('nav', {
          staticClass: 'navbar',
          class: this.computedClasses,
          attrs: {
            role: 'navigation',
            'aria-label': 'main navigation'
          },
          directives: [{
            name: 'click-outside',
            value: this.closeMenu
          }]
        }, slots);
      },
      genNavbarBrandNode: function genNavbarBrandNode(createElement) {
        return createElement('div', {
          class: 'navbar-brand'
        }, [this.$slots.brand, this.genBurgerNode(createElement)]);
      },
      genBurgerNode: function genBurgerNode(createElement) {
        if (this.mobileBurger) {
          var defaultBurgerNode = createElement('navbar-burger', {
            props: {
              isOpened: this.isOpened
            },
            on: {
              click: this.toggleActive
            }
          });
          var hasBurgerSlot = !!this.$scopedSlots.burger;
          return hasBurgerSlot ? this.$scopedSlots.burger({
            isOpened: this.isOpened,
            toggleActive: this.toggleActive
          }) : defaultBurgerNode;
        }
      },
      genNavbarSlotsNode: function genNavbarSlotsNode(createElement) {
        return createElement('div', {
          staticClass: 'navbar-menu',
          class: {
            'is-active': this.isOpened
          }
        }, [this.genMenuPosition(createElement, 'start'), this.genMenuPosition(createElement, 'end')]);
      },
      genMenuPosition: function genMenuPosition(createElement, positionName) {
        return createElement('div', {
          staticClass: "navbar-".concat(positionName)
        }, this.$slots[positionName]);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (this.fixedTop) {
        var className = this.spaced ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS;
        this.removeBodyClass(className);
      } else if (this.fixedBottom) {
        var _className = this.spaced ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS;

        this.removeBodyClass(_className);
      }
    },
    render: function render(createElement, fn) {
      return this.genNavbar(createElement);
    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = undefined;
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = undefined;
    /* style inject */
    
    /* style inject SSR */
    

    
    var Navbar = normalizeComponent_1(
      {},
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var clickableWhiteList = ['div', 'span', 'input'];
  var script$2 = {
    name: 'BNavbarItem',
    inheritAttrs: false,
    props: {
      tag: {
        type: String,
        default: 'a'
      },
      active: Boolean
    },
    methods: {
      /**
       * Keypress event that is bound to the document
       */
      keyPress: function keyPress(_ref) {
        var key = _ref.key;

        if (key === 'Escape' || key === 'Esc') {
          this.closeMenuRecursive(this, ['NavBar']);
        }
      },

      /**
       * Close parent if clicked outside.
       */
      handleClickEvent: function handleClickEvent(event) {
        var isOnWhiteList = clickableWhiteList.some(function (item) {
          return item === event.target.localName;
        });

        if (!isOnWhiteList) {
          var parent = this.closeMenuRecursive(this, ['NavbarDropdown', 'NavBar']);
          if (parent && parent.$data._isNavbarDropdown) this.closeMenuRecursive(parent, ['NavBar']);
        }
      },

      /**
       * Close parent recursively
       */
      closeMenuRecursive: function closeMenuRecursive(current, targetComponents) {
        if (!current.$parent) return null;
        var foundItem = targetComponents.reduce(function (acc, item) {
          if (current.$parent.$data["_is".concat(item)]) {
            current.$parent.closeMenu();
            return current.$parent;
          }

          return acc;
        }, null);
        return foundItem || this.closeMenuRecursive(current.$parent, targetComponents);
      }
    },
    mounted: function mounted() {
      if (typeof window !== 'undefined') {
        this.$el.addEventListener('click', this.handleClickEvent);
        document.addEventListener('keyup', this.keyPress);
      }
    },
    beforeDestroy: function beforeDestroy() {
      if (typeof window !== 'undefined') {
        this.$el.removeEventListener('click', this.handleClickEvent);
        document.removeEventListener('keyup', this.keyPress);
      }
    }
  };

  /* script */
  const __vue_script__$2 = script$2;

  /* template */
  var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,_vm._g(_vm._b({tag:"component",staticClass:"navbar-item",class:{
          'is-active': _vm.active
      }},'component',_vm.$attrs,false),_vm.$listeners),[_vm._t("default")],2)};
  var __vue_staticRenderFns__$1 = [];

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = undefined;
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarItem = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      undefined,
      undefined
    );

  //
  var script$3 = {
    name: 'BNavbarDropdown',
    directives: {
      clickOutside: directive
    },
    props: {
      label: String,
      hoverable: Boolean,
      active: Boolean,
      right: Boolean,
      arrowless: Boolean,
      boxed: Boolean,
      closeOnClick: {
        type: Boolean,
        default: true
      },
      collapsible: Boolean
    },
    data: function data() {
      return {
        newActive: this.active,
        isHoverable: this.hoverable,
        _isNavbarDropdown: true // Used internally by NavbarItem

      };
    },
    watch: {
      active: function active(value) {
        this.newActive = value;
      }
    },
    methods: {
      showMenu: function showMenu() {
        this.newActive = true;
      },

      /**
      * See naming convetion of navbaritem
      */
      closeMenu: function closeMenu() {
        this.newActive = !this.closeOnClick;

        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false;
        }
      },
      checkHoverable: function checkHoverable() {
        if (this.hoverable) {
          this.isHoverable = true;
        }
      }
    }
  };

  /* script */
  const __vue_script__$3 = script$3;

  /* template */
  var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"click-outside",rawName:"v-click-outside",value:(_vm.closeMenu),expression:"closeMenu"}],staticClass:"navbar-item has-dropdown",class:{
          'is-hoverable': _vm.isHoverable,
          'is-active': _vm.newActive
      },on:{"mouseenter":_vm.checkHoverable}},[_c('a',{staticClass:"navbar-link",class:{
              'is-arrowless': _vm.arrowless,
              'is-active': _vm.newActive && _vm.collapsible
          },attrs:{"role":"menuitem","aria-haspopup":"true","href":"#"},on:{"click":function($event){$event.preventDefault();_vm.newActive = !_vm.newActive;}}},[(_vm.label)?[_vm._v(_vm._s(_vm.label))]:_vm._t("label")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.collapsible || (_vm.collapsible && _vm.newActive)),expression:"!collapsible || (collapsible && newActive)"}],staticClass:"navbar-dropdown",class:{
              'is-right': _vm.right,
              'is-boxed': _vm.boxed,
          }},[_vm._t("default")],2)])};
  var __vue_staticRenderFns__$2 = [];

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = undefined;
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    

    
    var NavbarDropdown = normalizeComponent_1(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      undefined,
      undefined
    );

  var use = function use(plugin) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.use(plugin);
    }
  };
  var registerComponent = function registerComponent(Vue, component) {
    Vue.component(component.name, component);
  };

  var Plugin = {
    install: function install(Vue) {
      registerComponent(Vue, Navbar);
      registerComponent(Vue, NavbarItem);
      registerComponent(Vue, NavbarDropdown);
    }
  };
  use(Plugin);

  exports.BNavbar = Navbar;
  exports.BNavbarDropdown = NavbarDropdown;
  exports.BNavbarItem = NavbarItem;
  exports.default = Plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
