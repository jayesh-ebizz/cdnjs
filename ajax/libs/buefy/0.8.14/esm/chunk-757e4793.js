import { b as _typeof } from './chunk-6ea13200.js';
import { c as config } from './chunk-17222463.js';
import { _ as __vue_normalize__ } from './chunk-cca88db8.js';
import { t as trapFocus } from './chunk-42f463e6.js';

var DEFAULT_CLOSE_OPTIONS = ['escape', 'outside'];
var script = {
  name: 'BDropdown',
  directives: {
    trapFocus: trapFocus
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    disabled: Boolean,
    hoverable: Boolean,
    inline: Boolean,
    position: {
      type: String,
      validator: function validator(value) {
        return ['is-top-right', 'is-top-left', 'is-bottom-left', 'is-bottom-right'].indexOf(value) > -1;
      }
    },
    mobileModal: {
      type: Boolean,
      default: function _default() {
        return config.defaultDropdownMobileModal;
      }
    },
    ariaRole: {
      type: String,
      validator: function validator(value) {
        return ['menu', 'list', 'dialog'].indexOf(value) > -1;
      },
      default: null
    },
    animation: {
      type: String,
      default: 'fade'
    },
    multiple: Boolean,
    trapFocus: {
      type: Boolean,
      default: function _default() {
        return config.defaultTrapFocus;
      }
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    canClose: {
      type: [Array, Boolean],
      default: true
    },
    expanded: Boolean,
    appendToBody: Boolean,
    appendToBodyCopyParent: Boolean
  },
  data: function data() {
    return {
      selected: this.value,
      style: {},
      isActive: false,
      isHoverable: this.hoverable,
      _isDropdown: true,
      // Used internally by DropdownItem
      _div: undefined // Used to append to body

    };
  },
  computed: {
    rootClasses: function rootClasses() {
      return [this.position, {
        'is-disabled': this.disabled,
        'is-hoverable': this.hoverable,
        'is-inline': this.inline,
        'is-active': this.isActive || this.inline,
        'is-mobile-modal': this.isMobileModal,
        'is-expanded': this.expanded
      }];
    },
    isMobileModal: function isMobileModal() {
      return this.mobileModal && !this.inline && !this.hoverable;
    },
    cancelOptions: function cancelOptions() {
      return typeof this.canClose === 'boolean' ? this.canClose ? DEFAULT_CLOSE_OPTIONS : [] : this.canClose;
    }
  },
  watch: {
    /**
    * When v-model is changed set the new selected item.
    */
    value: function value(_value) {
      this.selected = _value;
    },

    /**
    * Emit event when isActive value is changed.
    */
    isActive: function isActive(value) {
      var _this = this;

      this.$emit('active-change', value);

      if (this.appendToBody) {
        this.$nextTick(function () {
          _this.updateAppendToBody();
        });
      }
    }
  },
  methods: {
    /**
    * Click listener from DropdownItem.
    *   1. Set new selected item.
    *   2. Emit input event to update the user v-model.
    *   3. Close the dropdown.
    */
    selectItem: function selectItem(value) {
      if (this.multiple) {
        if (this.selected) {
          var index = this.selected.indexOf(value);

          if (index === -1) {
            this.selected.push(value);
          } else {
            this.selected.splice(index, 1);
          }
        } else {
          this.selected = [value];
        }

        this.$emit('change', this.selected);
      } else {
        if (this.selected !== value) {
          this.selected = value;
          this.$emit('change', this.selected);
        }
      }

      this.$emit('input', this.selected);

      if (!this.multiple) {
        this.isActive = !this.closeOnClick;

        if (this.hoverable && this.closeOnClick) {
          this.isHoverable = false;
        }
      }
    },

    /**
    * White-listed items to not close when clicked.
    */
    isInWhiteList: function isInWhiteList(el) {
      if (el === this.$refs.dropdownMenu) return true;
      if (el === this.$refs.trigger) return true; // All chidren from dropdown

      if (this.$refs.dropdownMenu !== undefined) {
        var children = this.$refs.dropdownMenu.querySelectorAll('*');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (el === child) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } // All children from trigger


      if (this.$refs.trigger !== undefined) {
        var _children = this.$refs.trigger.querySelectorAll('*');

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _child = _step2.value;

            if (el === _child) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }

      return false;
    },

    /**
    * Close dropdown if clicked outside.
    */
    clickedOutside: function clickedOutside(event) {
      if (this.cancelOptions.indexOf('outside') < 0) return;
      if (this.inline) return;
      if (!this.isInWhiteList(event.target)) this.isActive = false;
    },

    /**
     * Keypress event that is bound to the document
     */
    keyPress: function keyPress(event) {
      // Esc key
      if (this.isActive && event.keyCode === 27) {
        if (this.cancelOptions.indexOf('escape') < 0) return;
        this.isActive = false;
      }
    },

    /**
    * Toggle dropdown if it's not disabled.
    */
    toggle: function toggle() {
      var _this2 = this;

      if (this.disabled) return;

      if (!this.isActive) {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        this.$nextTick(function () {
          var value = !_this2.isActive;
          _this2.isActive = value; // Vue 2.6.x ???

          setTimeout(function () {
            return _this2.isActive = value;
          });
        });
      } else {
        this.isActive = !this.isActive;
      }
    },
    checkHoverable: function checkHoverable() {
      if (this.hoverable) {
        this.isHoverable = true;
      }
    },
    updateAppendToBody: function updateAppendToBody() {
      var dropdownMenu = this.$refs.dropdownMenu;
      var trigger = this.$refs.trigger;

      if (dropdownMenu && trigger) {
        // update wrapper dropdown
        var dropdown = this.$data._div.children[0];
        dropdown.classList.forEach(function (item) {
          return dropdown.classList.remove(item);
        });
        dropdown.classList.add('dropdown');
        dropdown.classList.add('dropdown-menu-animation');
        this.rootClasses.forEach(function (item) {
          // skip position prop
          if (item && _typeof(item) === 'object') {
            for (var key in item) {
              if (item[key]) {
                dropdown.classList.add(key);
              }
            }
          }
        });

        if (this.appendToBodyCopyParent) {
          var parentNode = this.$refs.dropdown.parentNode;
          var parent = this.$data._div;
          parent.classList.forEach(function (item) {
            return parent.classList.remove(item);
          });
          parentNode.classList.forEach(function (item) {
            parent.classList.add(item);
          });
        }

        var rect = trigger.getBoundingClientRect();
        var top = rect.top + window.scrollY;
        var left = rect.left + window.scrollX;

        if (!this.position || this.position.indexOf('bottom') >= 0) {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }

        if (this.position && this.position.indexOf('left') >= 0) {
          left -= dropdownMenu.clientWidth - trigger.clientWidth;
        }

        this.style = {
          position: 'absolute',
          top: "".concat(top, "px"),
          left: "".concat(left, "px"),
          zIndex: '99'
        };
      }
    }
  },
  mounted: function mounted() {
    if (this.appendToBody) {
      var root = document.createElement('div');
      root.style.position = 'absolute';
      root.style.left = '0px';
      root.style.top = '0px';
      var dropdown = document.createElement('div');
      var dropdownMenu = this.$refs.dropdownMenu;
      root.appendChild(dropdown);
      dropdown.appendChild(dropdownMenu);
      document.body.appendChild(root);
      this.$data._div = root;
      this.updateAppendToBody();
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
      document.addEventListener('keyup', this.keyPress);
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
      document.removeEventListener('keyup', this.keyPress);
    }

    if (this.appendToBody) {
      document.body.removeChild(this.$data._div);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"dropdown",staticClass:"dropdown dropdown-menu-animation",class:_vm.rootClasses},[(!_vm.inline)?_c('div',{ref:"trigger",staticClass:"dropdown-trigger",attrs:{"role":"button","aria-haspopup":"true"},on:{"click":_vm.toggle,"mouseenter":_vm.checkHoverable}},[_vm._t("trigger",null,{active:_vm.isActive})],2):_vm._e(),_vm._v(" "),_c('transition',{attrs:{"name":_vm.animation}},[(_vm.isMobileModal)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"background",attrs:{"aria-hidden":!_vm.isActive}}):_vm._e()]),_vm._v(" "),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:((!_vm.disabled && (_vm.isActive || _vm.isHoverable)) || _vm.inline),expression:"(!disabled && (isActive || isHoverable)) || inline"},{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],ref:"dropdownMenu",staticClass:"dropdown-menu",style:(_vm.style),attrs:{"aria-hidden":!_vm.isActive}},[_c('div',{staticClass:"dropdown-content",attrs:{"role":_vm.ariaRole}},[_vm._t("default")],2)])])],1)};
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
  

  
  var Dropdown = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
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
//
//
//
//
//
//
//
//
var script$1 = {
  name: 'BDropdownItem',
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Function],
      default: null
    },
    separator: Boolean,
    disabled: Boolean,
    custom: Boolean,
    focusable: {
      type: Boolean,
      default: true
    },
    paddingless: Boolean,
    hasLink: Boolean,
    ariaRole: {
      type: String,
      default: ''
    }
  },
  computed: {
    anchorClasses: function anchorClasses() {
      return {
        'is-disabled': this.$parent.disabled || this.disabled,
        'is-paddingless': this.paddingless,
        'is-active': this.isActive
      };
    },
    itemClasses: function itemClasses() {
      return {
        'dropdown-item': !this.hasLink,
        'is-disabled': this.disabled,
        'is-paddingless': this.paddingless,
        'is-active': this.isActive,
        'has-link': this.hasLink
      };
    },
    ariaRoleItem: function ariaRoleItem() {
      return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
    },
    isClickable: function isClickable() {
      return !this.$parent.disabled && !this.separator && !this.disabled && !this.custom;
    },
    isActive: function isActive() {
      if (this.$parent.selected === null) return false;
      if (this.$parent.multiple) return this.$parent.selected.indexOf(this.value) >= 0;
      return this.value === this.$parent.selected;
    },
    isFocusable: function isFocusable() {
      return this.hasLink ? false : this.focusable;
    }
  },
  methods: {
    /**
    * Click listener, select the item.
    */
    selectItem: function selectItem() {
      if (!this.isClickable) return;
      this.$parent.selectItem(this.value);
      this.$emit('click');
    }
  },
  created: function created() {
    if (!this.$parent.$data._isDropdown) {
      this.$destroy();
      throw new Error('You should wrap bDropdownItem on a bDropdown');
    }
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.separator)?_c('hr',{staticClass:"dropdown-divider"}):(!_vm.custom && !_vm.hasLink)?_c('a',{staticClass:"dropdown-item",class:_vm.anchorClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2):_c('div',{class:_vm.itemClasses,attrs:{"role":_vm.ariaRoleItem,"tabindex":_vm.isFocusable ? 0 : null},on:{"click":_vm.selectItem}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownItem = __vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

export { Dropdown as D, DropdownItem as a };
