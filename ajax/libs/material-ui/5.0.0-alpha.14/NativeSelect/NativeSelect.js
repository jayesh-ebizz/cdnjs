import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import NativeSelectInput from './NativeSelectInput';
import withStyles from '../styles/withStyles';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
export const styles = theme => ({
  /* Styles applied to the select component `root` class. */
  root: {},

  /* Styles applied to the select component `select` class. */
  select: {
    '-moz-appearance': 'none',
    // Reset
    '-webkit-appearance': 'none',
    // Reset
    // When interacting quickly, the text can end up selected.
    // Native select can't be selected either.
    userSelect: 'none',
    borderRadius: 0,
    // Reset
    minWidth: 16,
    // So it doesn't collapse.
    cursor: 'pointer',
    '&:focus': {
      // Show that it's not an text input
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: 0 // Reset Chrome style

    },
    // Remove IE11 arrow
    '&::-ms-expand': {
      display: 'none'
    },
    '&$disabled': {
      cursor: 'default'
    },
    '&[multiple]': {
      height: 'auto'
    },
    '&:not([multiple]) option, &:not([multiple]) optgroup': {
      backgroundColor: theme.palette.background.paper
    },
    '&&': {
      paddingRight: 24
    }
  },

  /* Styles applied to the select component if `variant="filled"`. */
  filled: {
    '&&': {
      paddingRight: 32
    }
  },

  /* Styles applied to the select component if `variant="outlined"`. */
  outlined: {
    borderRadius: theme.shape.borderRadius,
    '&&': {
      paddingRight: 32
    }
  },

  /* Styles applied to the select component `selectMenu` class. */
  selectMenu: {
    height: 'auto',
    // Resets for multpile select with chips
    minHeight: '1.4375em',
    // Required for select\text-field height consistency
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },

  /* Pseudo-class applied to the select component `disabled` class. */
  disabled: {},

  /* Styles applied to the icon component. */
  icon: {
    // We use a position absolute over a flexbox in order to forward the pointer events
    // to the input and to support wrapping tags..
    position: 'absolute',
    right: 0,
    top: 'calc(50% - 12px)',
    // Center vertically
    pointerEvents: 'none',
    // Don't block pointer events on the select under the icon.
    color: theme.palette.action.active,
    '&$disabled': {
      color: theme.palette.action.disabled
    }
  },

  /* Styles applied to the icon component if the popup is open. */
  iconOpen: {
    transform: 'rotate(180deg)'
  },

  /* Styles applied to the icon component if `variant="filled"`. */
  iconFilled: {
    right: 7
  },

  /* Styles applied to the icon component if `variant="outlined"`. */
  iconOutlined: {
    right: 7
  },

  /* Styles applied to the underlying native input component. */
  nativeInput: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0,
    pointerEvents: 'none',
    width: '100%'
  }
});
const defaultInput = /*#__PURE__*/React.createElement(Input, null);
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */

const NativeSelect = /*#__PURE__*/React.forwardRef(function NativeSelect(props, ref) {
  const {
    children,
    classes,
    IconComponent = ArrowDropDownIcon,
    input = defaultInput,
    inputProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "IconComponent", "input", "inputProps", "variant"]);

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant']
  });
  return /*#__PURE__*/React.cloneElement(input, _extends({
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: NativeSelectInput,
    inputProps: _extends({
      children,
      classes,
      IconComponent,
      variant: fcs.variant,
      type: undefined
    }, inputProps, input ? input.props.inputProps : {}),
    ref
  }, other));
});
process.env.NODE_ENV !== "production" ? NativeSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,

  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: PropTypes.element,

  /**
   * Attributes applied to the `select` element.
   */
  inputProps: PropTypes.object,

  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * The input value. The DOM API casts this to a string.
   */
  value: PropTypes.any,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
NativeSelect.muiName = 'Select';
export default withStyles(styles, {
  name: 'MuiNativeSelect'
})(NativeSelect);