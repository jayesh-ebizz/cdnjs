import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
// @inheritedComponent ButtonBase
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, withStyles } from '../styles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils';
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.button, {
      borderRadius: theme.shape.borderRadius,
      padding: 11,
      border: "1px solid ".concat(alpha(theme.palette.action.active, 0.12)),
      color: alpha(theme.palette.action.active, 0.38),
      '&$selected': {
        color: theme.palette.action.active,
        backgroundColor: alpha(theme.palette.action.active, 0.12),
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.active, 0.15)
        }
      },
      '&$disabled': {
        color: alpha(theme.palette.action.disabled, 0.12)
      },
      '&:hover': {
        textDecoration: 'none',
        // Reset on mouse devices
        backgroundColor: alpha(theme.palette.text.primary, 0.05),
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }),

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Pseudo-class applied to the root element if `selected={true}`. */
    selected: {},

    /* Styles applied to the `label` wrapper element. */
    label: {
      width: '100%',
      // Ensure the correct width for iOS Safari
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: 7,
      fontSize: theme.typography.pxToRem(13)
    },

    /* Styles applied to the root element if `size="large"`. */
    sizeLarge: {
      padding: 15,
      fontSize: theme.typography.pxToRem(15)
    }
  };
};
var ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      onChange = props.onChange,
      onClick = props.onClick,
      selected = props.selected,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      value = props.value,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);

  var handleChange = function handleChange(event) {
    if (onClick) {
      onClick(event, value);

      if (event.isDefaultPrevented()) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    className: clsx(classes.root, className, disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes["size".concat(capitalize(size))]),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    "aria-pressed": selected
  }, other), /*#__PURE__*/React.createElement("span", {
    className: classes.label
  }, children));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the button.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the button is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * @ignore
   */
  onChange: PropTypes.func,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: PropTypes.bool,

  /**
   * The size of the button.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: PropTypes.any.isRequired
} : void 0;
export default withStyles(styles, {
  name: 'MuiToggleButton'
})(ToggleButton);