"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _InputBase = _interopRequireDefault(require("../InputBase"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

const styles = theme => {
  const light = theme.palette.mode === 'light';
  const bottomLineColor = light ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.7)';
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative'
    },

    /* Styles applied to the root element if the component is a descendant of `FormControl`. */
    formControl: {
      'label + &': {
        marginTop: 16
      }
    },

    /* Styles applied to the root element if the component is focused. */
    focused: {},

    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if color secondary. */
    colorSecondary: {
      '&$underline:after': {
        borderBottomColor: theme.palette.secondary.main
      }
    },

    /* Styles applied to the root element if `disableUnderline={false}`. */
    underline: {
      '&:after': {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&$focused:after': {
        transform: 'scaleX(1)'
      },
      '&$error:after': {
        borderBottomColor: theme.palette.error.main,
        transform: 'scaleX(1)' // error is always underlined in red

      },
      '&:before': {
        borderBottom: `1px solid ${bottomLineColor}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
        content: '"\\00a0"',
        position: 'absolute',
        right: 0,
        transition: theme.transitions.create('border-bottom-color', {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: 'none' // Transparent to the hover style.

      },
      '&:hover:not($disabled):before': {
        borderBottom: `2px solid ${theme.palette.text.primary}`,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          borderBottom: `1px solid ${bottomLineColor}`
        }
      },
      '&$disabled:before': {
        borderBottomStyle: 'dotted'
      }
    },

    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},

    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},

    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {},

    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: {},

    /* Styles applied to the `input` element. */
    input: {},

    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {},

    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {},

    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: {}
  };
};

exports.styles = styles;
const Input = /*#__PURE__*/React.forwardRef(function Input(props, ref) {
  const {
    disableUnderline,
    classes,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /*#__PURE__*/React.createElement(_InputBase.default, (0, _extends2.default)({
    classes: (0, _extends2.default)({}, classes, {
      root: (0, _clsx.default)(classes.root, !disableUnderline && classes.underline),
      underline: null
    }),
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other));
});
process.env.NODE_ENV !== "production" ? Input.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: _propTypes.default.string,

  /**
   * If `true`, the `input` element will be focused during the first mount.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: _propTypes.default.oneOf(['primary', 'secondary']),

  /**
   * The default `input` element value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.any,

  /**
   * If `true`, the `input` element will be disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the input will not have an underline.
   */
  disableUnderline: _propTypes.default.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: _propTypes.default.node,

  /**
   * If `true`, the input will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: _propTypes.default.bool,

  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The id of the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: _propTypes.default.elementType,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: _propTypes.default.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: _utils.refType,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: _propTypes.default.oneOf(['dense', 'none']),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * If `true`, a textarea element will be rendered.
   * @default false
   */
  multiline: _propTypes.default.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: _propTypes.default.func,

  /**
   * The short hint displayed in the input before the user enters a value.
   */
  placeholder: _propTypes.default.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: _propTypes.default.bool,

  /**
   * If `true`, the `input` element will be required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: _propTypes.default.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: _propTypes.default.node,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: _propTypes.default.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: _propTypes.default.any
} : void 0;
Input.muiName = 'Input';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiInput'
})(Input);

exports.default = _default;