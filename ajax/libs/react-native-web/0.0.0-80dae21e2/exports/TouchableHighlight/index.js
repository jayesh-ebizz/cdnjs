/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import { useCallback, useMemo, useState, useRef } from 'react';
import usePressEvents from '../../modules/usePressEvents';
import setAndForwardRef from '../../modules/setAndForwardRef';
import StyleSheet from '../StyleSheet';
import View from '../View';

function createExtraStyles(activeOpacity, underlayColor) {
  return {
    child: {
      opacity: activeOpacity !== null && activeOpacity !== void 0 ? activeOpacity : 0.85
    },
    underlay: {
      backgroundColor: underlayColor === undefined ? 'black' : underlayColor
    }
  };
}

function hasPressHandler(props) {
  return props.onPress != null || props.onPressIn != null || props.onPressOut != null || props.onLongPress != null;
}
/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 */


function TouchableHighlight(props, forwardedRef) {
  var accessible = props.accessible,
      activeOpacity = props.activeOpacity,
      children = props.children,
      delayPressIn = props.delayPressIn,
      delayPressOut = props.delayPressOut,
      delayLongPress = props.delayLongPress,
      disabled = props.disabled,
      focusable = props.focusable,
      onHideUnderlay = props.onHideUnderlay,
      onLongPress = props.onLongPress,
      onPress = props.onPress,
      onPressIn = props.onPressIn,
      onPressOut = props.onPressOut,
      onShowUnderlay = props.onShowUnderlay,
      rejectResponderTermination = props.rejectResponderTermination,
      style = props.style,
      testOnly_pressed = props.testOnly_pressed,
      underlayColor = props.underlayColor,
      rest = _objectWithoutPropertiesLoose(props, ["accessible", "activeOpacity", "children", "delayPressIn", "delayPressOut", "delayLongPress", "disabled", "focusable", "onHideUnderlay", "onLongPress", "onPress", "onPressIn", "onPressOut", "onShowUnderlay", "rejectResponderTermination", "style", "testOnly_pressed", "underlayColor"]);

  var hostRef = useRef(null);
  var setRef = setAndForwardRef({
    getForwardedRef: function getForwardedRef() {
      return forwardedRef;
    },
    setLocalRef: function setLocalRef(hostNode) {
      hostRef.current = hostNode;
    }
  });

  var _useState = useState(testOnly_pressed === true ? createExtraStyles(activeOpacity, underlayColor) : null),
      extraStyles = _useState[0],
      setExtraStyles = _useState[1];

  var showUnderlay = useCallback(function () {
    if (!hasPressHandler(props)) {
      return;
    }

    setExtraStyles(createExtraStyles(activeOpacity, underlayColor));

    if (onShowUnderlay != null) {
      onShowUnderlay();
    }
  }, [activeOpacity, onShowUnderlay, props, underlayColor]);
  var hideUnderlay = useCallback(function () {
    if (testOnly_pressed === true) {
      return;
    }

    if (hasPressHandler(props)) {
      setExtraStyles(null);

      if (onHideUnderlay != null) {
        onHideUnderlay();
      }
    }
  }, [onHideUnderlay, props, testOnly_pressed]);
  var pressConfig = useMemo(function () {
    return {
      cancelable: !rejectResponderTermination,
      disabled: disabled,
      delayLongPress: delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      onLongPress: onLongPress,
      onPress: onPress,
      onPressStart: function onPressStart(event) {
        showUnderlay();

        if (onPressIn != null) {
          onPressIn(event);
        }
      },
      onPressEnd: function onPressEnd(event) {
        hideUnderlay();

        if (onPressOut != null) {
          onPressOut(event);
        }
      }
    };
  }, [delayLongPress, delayPressIn, delayPressOut, disabled, onLongPress, onPress, onPressIn, onPressOut, rejectResponderTermination, showUnderlay, hideUnderlay]);
  var pressEventHandlers = usePressEvents(hostRef, pressConfig);
  var child = React.Children.only(children);
  return React.createElement(View, _extends({}, rest, pressEventHandlers, {
    accessibilityState: _objectSpread({
      disabled: disabled
    }, props.accessibilityState),
    accessible: accessible !== false,
    focusable: focusable !== false && onPress !== undefined,
    ref: setRef,
    style: [styles.root, style, !disabled && styles.actionable, extraStyles && extraStyles.underlay]
  }), React.cloneElement(child, {
    style: StyleSheet.compose(child.props.style, extraStyles && extraStyles.child)
  }));
}

var styles = StyleSheet.create({
  root: {
    userSelect: 'none'
  },
  actionable: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  }
});
var MemoedTouchableHighlight = React.memo(React.forwardRef(TouchableHighlight));
MemoedTouchableHighlight.displayName = 'TouchableHighlight';
export default MemoedTouchableHighlight;