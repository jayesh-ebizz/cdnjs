'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
require('./helpers.js');
var __chunk_2 = require('./chunk-805257cc.js');
var __chunk_4 = require('./chunk-4e86763f.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_23 = require('./chunk-3dffe6e7.js');

var _components;
var script = {
  name: 'BSteps',
  components: (_components = {}, __chunk_1._defineProperty(_components, __chunk_4.Icon.name, __chunk_4.Icon), __chunk_1._defineProperty(_components, __chunk_23.SlotComponent.name, __chunk_23.SlotComponent), _components),
  props: {
    value: Number,
    type: [String, Object],
    size: String,
    animated: {
      type: Boolean,
      default: true
    },
    destroyOnHide: {
      type: Boolean,
      default: false
    },
    iconPack: String,
    iconPrev: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultIconPrev;
      }
    },
    iconNext: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultIconNext;
      }
    },
    hasNavigation: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    position: String,
    labelPosition: {
      type: String,
      validator: function validator(value) {
        return ['bottom', 'right', 'left'].indexOf(value) > -1;
      },
      default: 'bottom'
    },
    rounded: {
      type: Boolean,
      default: true
    },
    ariaNextLabel: String,
    ariaPreviousLabel: String
  },
  data: function data() {
    return {
      activeStep: this.value || 0,
      defaultSlots: [],
      contentHeight: 0,
      isTransitioning: false,
      _isSteps: true // Used internally by StepItem

    };
  },
  computed: {
    wrapperClasses: function wrapperClasses() {
      return [this.size, __chunk_1._defineProperty({
        'is-vertical': this.vertical
      }, this.position, this.position && this.vertical)];
    },
    mainClasses: function mainClasses() {
      return [this.type, {
        'has-label-right': this.labelPosition === 'right',
        'has-label-left': this.labelPosition === 'left',
        'is-animated': this.animated,
        'is-rounded': this.rounded
      }];
    },
    stepItems: function stepItems() {
      return this.defaultSlots.filter(function (vnode) {
        return vnode.componentInstance && vnode.componentInstance.$data && vnode.componentInstance.$data._isStepItem;
      }).map(function (vnode) {
        return vnode.componentInstance;
      });
    },
    reversedStepItems: function reversedStepItems() {
      return this.stepItems.slice().reverse();
    },

    /**
     * Check the first visible step index.
     */
    firstVisibleStepIndex: function firstVisibleStepIndex() {
      return this.stepItems.map(function (step, idx) {
        return step.visible;
      }).indexOf(true);
    },

    /**
     * Check if previous button is available.
     */
    hasPrev: function hasPrev() {
      return this.firstVisibleStepIndex >= 0 && this.activeStep > this.firstVisibleStepIndex;
    },

    /**
     * Check the last visible step index.
     */
    lastVisibleStepIndex: function lastVisibleStepIndex() {
      var idx = this.reversedStepItems.map(function (step, idx) {
        return step.visible;
      }).indexOf(true);

      if (idx >= 0) {
        return this.stepItems.length - 1 - idx;
      }

      return idx;
    },

    /**
     * Check if next button is available.
     */
    hasNext: function hasNext() {
      return this.lastVisibleStepIndex >= 0 && this.activeStep < this.lastVisibleStepIndex;
    },
    navigationProps: function navigationProps() {
      return {
        previous: {
          disabled: !this.hasPrev,
          action: this.prev
        },
        next: {
          disabled: !this.hasNext,
          action: this.next
        }
      };
    }
  },
  watch: {
    /**
    * When v-model is changed set the new active step.
    */
    value: function value(_value) {
      this.changeStep(_value);
    },

    /**
    * When step-items are updated, set active one.
    */
    stepItems: function stepItems() {
      var _this = this;

      if (this.activeStep < this.stepItems.length) {
        var previous = this.activeStep;
        this.stepItems.map(function (step, idx) {
          if (step.isActive) {
            previous = idx;

            if (previous < _this.stepItems.length) {
              _this.stepItems[previous].isActive = false;
            }
          }
        });
        this.stepItems[this.activeStep].isActive = true;
      } else if (this.activeStep > 0) {
        this.changeStep(this.activeStep - 1);
      }
    }
  },
  methods: {
    refreshSlots: function refreshSlots() {
      this.defaultSlots = this.$slots.default || [];
    },

    /**
     * Change the active step and emit change event.
     */
    changeStep: function changeStep(newIndex) {
      if (this.activeStep === newIndex) return;
      if (newIndex > this.stepItems.length) throw new Error('The index you trying to set is bigger than the steps length');

      if (this.activeStep < this.stepItems.length) {
        this.stepItems[this.activeStep].deactivate(this.activeStep, newIndex);
      }

      this.stepItems[newIndex].activate(this.activeStep, newIndex);
      this.activeStep = newIndex;
      this.$emit('change', newIndex);
    },

    /**
     * Return if the step should be clickable or not.
     */
    isItemClickable: function isItemClickable(stepItem, index) {
      if (stepItem.clickable === undefined) {
        return this.activeStep > index;
      }

      return stepItem.clickable;
    },

    /**
     * Step click listener, emit input event and change active step.
     */
    stepClick: function stepClick(value) {
      this.$emit('input', value);
      this.changeStep(value);
    },

    /**
     * Previous button click listener.
     */
    prev: function prev() {
      var _this2 = this;

      if (!this.hasPrev) return;
      var prevItemIdx = this.reversedStepItems.map(function (step, idx) {
        return _this2.stepItems.length - 1 - idx < _this2.activeStep && step.visible;
      }).indexOf(true);

      if (prevItemIdx >= 0) {
        prevItemIdx = this.stepItems.length - 1 - prevItemIdx;
      }

      this.$emit('input', prevItemIdx);
      this.changeStep(prevItemIdx);
    },

    /**
     * Previous button click listener.
     */
    next: function next() {
      var _this3 = this;

      if (!this.hasNext) return;
      var nextItemIdx = this.stepItems.map(function (step, idx) {
        return idx > _this3.activeStep && step.visible;
      }).indexOf(true);
      this.$emit('input', nextItemIdx);
      this.changeStep(nextItemIdx);
    }
  },
  mounted: function mounted() {
    if (this.activeStep < this.stepItems.length) {
      this.stepItems[this.activeStep].isActive = true;
    }

    this.refreshSlots();
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"b-steps",class:_vm.wrapperClasses},[_c('nav',{staticClass:"steps",class:_vm.mainClasses},[_c('ul',{staticClass:"step-items"},_vm._l((_vm.stepItems),function(stepItem,index){return _c('li',{directives:[{name:"show",rawName:"v-show",value:(stepItem.visible),expression:"stepItem.visible"}],key:index,staticClass:"step-item",class:[stepItem.type || _vm.type, {
                        'is-active': _vm.activeStep === index,
                        'is-previous': _vm.activeStep > index
                }]},[_c('a',{staticClass:"step-link",class:{'is-clickable': _vm.isItemClickable(stepItem, index)},on:{"click":function($event){_vm.isItemClickable(stepItem, index) && _vm.stepClick(index);}}},[_c('div',{staticClass:"step-marker"},[(stepItem.icon)?_c('b-icon',{attrs:{"icon":stepItem.icon,"pack":stepItem.iconPack,"size":_vm.size}}):(stepItem.step)?_c('span',[_vm._v(_vm._s(stepItem.step))]):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"step-details"},[_c('span',{staticClass:"step-title"},[_vm._v(_vm._s(stepItem.label))])])])])}))]),_vm._v(" "),_c('section',{staticClass:"step-content",class:{'is-transitioning': _vm.isTransitioning}},[_vm._t("default")],2),_vm._v(" "),_vm._t("navigation",[(_vm.hasNavigation)?_c('nav',{staticClass:"step-navigation"},[_c('a',{staticClass:"pagination-previous",attrs:{"role":"button","disabled":_vm.navigationProps.previous.disabled,"aria-label":_vm.ariaPreviousLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.previous.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconPrev,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1),_vm._v(" "),_c('a',{staticClass:"pagination-next",attrs:{"role":"button","disabled":_vm.navigationProps.next.disabled,"aria-label":_vm.ariaNextLabel},on:{"click":function($event){$event.preventDefault();return _vm.navigationProps.next.action($event)}}},[_c('b-icon',{attrs:{"icon":_vm.iconNext,"pack":_vm.iconPack,"both":"","aria-hidden":"true"}})],1)]):_vm._e()],{previous:_vm.navigationProps.previous,next:_vm.navigationProps.next})],2)};
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
  

  
  var Steps = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = {
  name: 'BStepItem',
  props: {
    step: String | Number,
    label: String,
    type: String | Object,
    icon: String,
    iconPack: String,
    clickable: {
      type: Boolean,
      default: undefined
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      isActive: false,
      transitionName: null,
      _isStepItem: true // Used internally by Step

    };
  },
  methods: {
    /**
    * Activate step, alter animation name based on the index.
    */
    activate: function activate(oldIndex, index) {
      this.transitionName = index < oldIndex ? this.$parent.vertical ? 'slide-down' : 'slide-next' : this.$parent.vertical ? 'slide-up' : 'slide-prev';
      this.isActive = true;
    },

    /**
    * Deactivate step, alter animation name based on the index.
    */
    deactivate: function deactivate(oldIndex, index) {
      this.transitionName = index < oldIndex ? this.$parent.vertical ? 'slide-down' : 'slide-next' : this.$parent.vertical ? 'slide-up' : 'slide-prev';
      this.isActive = false;
    }
  },
  created: function created() {
    if (!this.$parent.$data._isSteps) {
      this.$destroy();
      throw new Error('You should wrap bStepItem on a bSteps');
    }

    this.$parent.refreshSlots();
  },
  beforeDestroy: function beforeDestroy() {
    this.$parent.refreshSlots();
  },
  render: function render(createElement) {
    var _this = this;

    // if destroy apply v-if
    if (this.$parent.destroyOnHide) {
      if (!this.isActive || !this.visible) {
        return;
      }
    }

    var vnode = createElement('div', {
      directives: [{
        name: 'show',
        value: this.isActive && this.visible
      }],
      attrs: {
        'class': 'step-item'
      }
    }, this.$slots.default); // check animated prop

    if (this.$parent.animated) {
      return createElement('transition', {
        props: {
          'name': this.transitionName
        },
        on: {
          'before-enter': function beforeEnter() {
            _this.$parent.isTransitioning = true;
          },
          'after-enter': function afterEnter() {
            _this.$parent.isTransitioning = false;
          }
        }
      }, [vnode]);
    }

    return vnode;
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
  

  
  var StepItem = __chunk_5.__vue_normalize__(
    {},
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, Steps);
    __chunk_5.registerComponent(Vue, StepItem);
  }
};
__chunk_5.use(Plugin);

exports.BStepItem = StepItem;
exports.BSteps = Steps;
exports.default = Plugin;
