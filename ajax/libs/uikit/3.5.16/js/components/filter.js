/*! UIkit 3.5.16 | https://www.getuikit.com | (c) 2014 - 2020 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitfilter', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitFilter = factory(global.UIkit.util));
}(this, (function (uikitUtil) { 'use strict';

    var targetClass = 'uk-animation-target';

    var Animate = {

        props: {
            animation: Number
        },

        data: {
            animation: 150
        },

        methods: {

            animate: function(action, target) {
                var this$1 = this;
                if ( target === void 0 ) target = this.$el;


                addStyle();

                var children = uikitUtil.children(target);
                var propsFrom = children.map(function (el) { return getProps(el, true); });

                var oldHeight = uikitUtil.height(target);
                var oldScrollY = window.pageYOffset;

                action();

                uikitUtil.Transition.cancel(target);
                children.forEach(uikitUtil.Transition.cancel);

                reset(target);
                this.$update(target, 'resize');
                uikitUtil.fastdom.flush();

                var newHeight = uikitUtil.height(target);

                children = children.concat(uikitUtil.children(target).filter(function (el) { return !uikitUtil.includes(children, el); }));

                var propsTo = children.map(function (el, i) { return el.parentNode && i in propsFrom
                        ? propsFrom[i]
                        ? uikitUtil.isVisible(el)
                            ? getPositionWithMargin(el)
                            : {opacity: 0}
                        : {opacity: uikitUtil.isVisible(el) ? 1 : 0}
                        : false; }
                );

                propsFrom = propsTo.map(function (props, i) {
                    var from = children[i].parentNode === target
                        ? propsFrom[i] || getProps(children[i])
                        : false;

                    if (from) {
                        if (!props) {
                            delete from.opacity;
                        } else if (!('opacity' in props)) {
                            var opacity = from.opacity;

                            if (opacity % 1) {
                                props.opacity = 1;
                            } else {
                                delete from.opacity;
                            }
                        }
                    }

                    return from;
                });

                uikitUtil.addClass(target, targetClass);
                children.forEach(function (el, i) { return propsFrom[i] && uikitUtil.css(el, propsFrom[i]); });
                uikitUtil.css(target, {height: oldHeight, display: 'block'});
                uikitUtil.scrollTop(window, oldScrollY);

                return uikitUtil.Promise.all(
                    children.map(function (el, i) { return ['top', 'left', 'height', 'width'].some(function (prop) { return propsFrom[i][prop] !== propsTo[i][prop]; }
                        ) && uikitUtil.Transition.start(el, propsTo[i], this$1.animation, 'ease'); }
                    ).concat(oldHeight !== newHeight && uikitUtil.Transition.start(target, {height: newHeight}, this.animation, 'ease'))
                ).then(function () {
                    children.forEach(function (el, i) { return uikitUtil.css(el, {display: propsTo[i].opacity === 0 ? 'none' : '', zIndex: ''}); });
                    reset(target);
                    this$1.$update(target, 'resize');
                    uikitUtil.fastdom.flush(); // needed for IE11
                }, uikitUtil.noop);

            }
        }
    };

    function getProps(el, opacity) {

        var zIndex = uikitUtil.css(el, 'zIndex');

        return uikitUtil.isVisible(el)
            ? uikitUtil.assign({
                display: '',
                opacity: opacity ? uikitUtil.css(el, 'opacity') : '0',
                pointerEvents: 'none',
                position: 'absolute',
                zIndex: zIndex === 'auto' ? uikitUtil.index(el) : zIndex
            }, getPositionWithMargin(el))
            : false;
    }

    function reset(el) {
        uikitUtil.css(el.children, {
            height: '',
            left: '',
            opacity: '',
            pointerEvents: '',
            position: '',
            top: '',
            width: ''
        });
        uikitUtil.removeClass(el, targetClass);
        uikitUtil.css(el, {height: '', display: ''});
    }

    function getPositionWithMargin(el) {
        var ref = uikitUtil.offset(el);
        var height = ref.height;
        var width = ref.width;
        var ref$1 = uikitUtil.position(el);
        var top = ref$1.top;
        var left = ref$1.left;

        return {top: top, left: left, height: height, width: width};
    }

    var style;

    function addStyle() {
        if (style) {
            return;
        }
        style = uikitUtil.append(document.head, '<style>').sheet;
        style.insertRule(
            ("." + targetClass + " > * {\n            margin-top: 0 !important;\n            transform: none !important;\n        }"), 0
        );
    }

    var Component = {

        mixins: [Animate],

        args: 'target',

        props: {
            target: Boolean,
            selActive: Boolean
        },

        data: {
            target: null,
            selActive: false,
            attrItem: 'uk-filter-control',
            cls: 'uk-active',
            animation: 250
        },

        computed: {

            toggles: {

                get: function(ref, $el) {
                    var attrItem = ref.attrItem;

                    return uikitUtil.$$(("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]"), $el);
                },

                watch: function() {
                    var this$1 = this;


                    this.updateState();

                    if (this.selActive !== false) {
                        var actives = uikitUtil.$$(this.selActive, this.$el);
                        this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, uikitUtil.includes(actives, el)); });
                    }

                },

                immediate: true

            },

            children: {

                get: function(ref, $el) {
                    var target = ref.target;

                    return uikitUtil.$$((target + " > *"), $el);
                },

                watch: function(list, old) {
                    if (!isEqualList(list, old)) {
                        this.updateState();
                    }
                }
            }

        },

        events: [

            {

                name: 'click',

                delegate: function() {
                    return ("[" + (this.attrItem) + "],[data-" + (this.attrItem) + "]");
                },

                handler: function(e) {

                    e.preventDefault();
                    this.apply(e.current);

                }

            }

        ],

        methods: {

            apply: function(el) {
                this.setState(mergeState(el, this.attrItem, this.getState()));
            },

            getState: function() {
                var this$1 = this;

                return this.toggles
                    .filter(function (item) { return uikitUtil.hasClass(item, this$1.cls); })
                    .reduce(function (state, el) { return mergeState(el, this$1.attrItem, state); }, {filter: {'': ''}, sort: []});
            },

            setState: function(state, animate) {
                var this$1 = this;
                if ( animate === void 0 ) animate = true;


                state = uikitUtil.assign({filter: {'': ''}, sort: []}, state);

                uikitUtil.trigger(this.$el, 'beforeFilter', [this, state]);

                this.toggles.forEach(function (el) { return uikitUtil.toggleClass(el, this$1.cls, !!matchFilter(el, this$1.attrItem, state)); });

                uikitUtil.Promise.all(uikitUtil.$$(this.target, this.$el).map(function (target) {
                    var children = uikitUtil.children(target);
                    return animate
                        ? this$1.animate(function () { return applyState(state, target, children); }, target)
                        : applyState(state, target, children);
                })).then(function () { return uikitUtil.trigger(this$1.$el, 'afterFilter', [this$1]); });

            },

            updateState: function() {
                var this$1 = this;

                uikitUtil.fastdom.write(function () { return this$1.setState(this$1.getState(), false); });
            }

        }

    };

    function getFilter(el, attr) {
        return uikitUtil.parseOptions(uikitUtil.data(el, attr), ['filter']);
    }

    function applyState(state, target, children) {
        var selector = getSelector(state);

        children.forEach(function (el) { return uikitUtil.css(el, 'display', selector && !uikitUtil.matches(el, selector) ? 'none' : ''); });

        var ref = state.sort;
        var sort = ref[0];
        var order = ref[1];

        if (sort) {
            var sorted = sortItems(children, sort, order);
            if (!uikitUtil.isEqual(sorted, children)) {
                uikitUtil.append(target, sorted);
            }
        }
    }

    function mergeState(el, attr, state) {

        var filterBy = getFilter(el, attr);
        var filter = filterBy.filter;
        var group = filterBy.group;
        var sort = filterBy.sort;
        var order = filterBy.order; if ( order === void 0 ) order = 'asc';

        if (filter || uikitUtil.isUndefined(sort)) {

            if (group) {

                if (filter) {
                    delete state.filter[''];
                    state.filter[group] = filter;
                } else {
                    delete state.filter[group];

                    if (uikitUtil.isEmpty(state.filter) || '' in state.filter) {
                        state.filter = {'': filter || ''};
                    }

                }

            } else {
                state.filter = {'': filter || ''};
            }

        }

        if (!uikitUtil.isUndefined(sort)) {
            state.sort = [sort, order];
        }

        return state;
    }

    function matchFilter(el, attr, ref) {
        var stateFilter = ref.filter; if ( stateFilter === void 0 ) stateFilter = {'': ''};
        var ref_sort = ref.sort;
        var stateSort = ref_sort[0];
        var stateOrder = ref_sort[1];


        var ref$1 = getFilter(el, attr);
        var filter = ref$1.filter; if ( filter === void 0 ) filter = '';
        var group = ref$1.group; if ( group === void 0 ) group = '';
        var sort = ref$1.sort;
        var order = ref$1.order; if ( order === void 0 ) order = 'asc';

        return uikitUtil.isUndefined(sort)
            ? group in stateFilter && filter === stateFilter[group]
                || !filter && group && !(group in stateFilter) && !stateFilter['']
            : stateSort === sort && stateOrder === order;
    }

    function isEqualList(listA, listB) {
        return listA.length === listB.length
            && listA.every(function (el) { return ~listB.indexOf(el); });
    }

    function getSelector(ref) {
        var filter = ref.filter;

        var selector = '';
        uikitUtil.each(filter, function (value) { return selector += value || ''; });
        return selector;
    }

    function sortItems(nodes, sort, order) {
        return uikitUtil.assign([], nodes).sort(function (a, b) { return uikitUtil.data(a, sort).localeCompare(uikitUtil.data(b, sort), undefined, {numeric: true}) * (order === 'asc' || -1); });
    }

    if (typeof window !== 'undefined' && window.UIkit) {
        window.UIkit.component('filter', Component);
    }

    return Component;

})));
