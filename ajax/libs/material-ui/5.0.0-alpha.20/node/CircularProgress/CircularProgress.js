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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

const SIZE = 44;

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-block'
  },

  /* Styles applied to the root element if `variant="determinate"`. */
  determinate: {
    transition: theme.transitions.create('transform')
  },

  /* Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: {
    animation: '$circular-rotate 1.4s linear infinite'
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the `svg` element. */
  svg: {
    display: 'block' // Keeps the progress centered

  },

  /* Styles applied to the `circle` svg path. */
  circle: {
    stroke: 'currentColor' // Use butt to follow the specification, by chance, it's already the default CSS value.
    // strokeLinecap: 'butt',

  },

  /* Styles applied to the `circle` svg path if `variant="determinate"`. */
  circleDeterminate: {
    transition: theme.transitions.create('stroke-dashoffset')
  },

  /* Styles applied to the `circle` svg path if `variant="indeterminate"`. */
  circleIndeterminate: {
    animation: '$circular-dash 1.4s ease-in-out infinite',
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: '80px, 200px',
    strokeDashoffset: '0px' // Add the unit to fix a Edge 16 and below bug.

  },
  '@keyframes circular-rotate': {
    '0%': {
      transform: 'rotate(0deg)'
    },
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  '@keyframes circular-dash': {
    '0%': {
      strokeDasharray: '1px, 200px',
      strokeDashoffset: '0px'
    },
    '50%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-15px'
    },
    '100%': {
      strokeDasharray: '100px, 200px',
      strokeDashoffset: '-125px'
    }
  },

  /* Styles applied to the `circle` svg path if `disableShrink={true}`. */
  circleDisableShrink: {
    animation: 'none'
  }
});
/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */


exports.styles = styles;
const CircularProgress = /*#__PURE__*/React.forwardRef(function CircularProgress(props, ref) {
  const {
    classes,
    className,
    color = 'primary',
    disableShrink = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "color", "disableShrink", "size", "style", "thickness", "value", "variant"]);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }

  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, variant === 'determinate' ? classes.determinate : classes.indeterminate, color !== 'inherit' && classes[`color${(0, _capitalize.default)(color)}`]),
    style: (0, _extends2.default)({
      width: size,
      height: size
    }, rootStyle, style),
    ref: ref,
    role: "progressbar"
  }, rootProps, other), /*#__PURE__*/React.createElement("svg", {
    className: classes.svg,
    viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`
  }, /*#__PURE__*/React.createElement("circle", {
    className: (0, _clsx.default)(classes.circle, variant === 'determinate' ? classes.circleDeterminate : classes.circleIndeterminate, disableShrink && classes.circleDisableShrink),
    style: circleStyle,
    cx: SIZE,
    cy: SIZE,
    r: (SIZE - thickness) / 2,
    fill: "none",
    strokeWidth: thickness
  })));
});
process.env.NODE_ENV !== "production" ? CircularProgress.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * If `true`, the shrink animation is disabled.
   * This only works if variant is `indeterminate`.
   * @default false
   */
  disableShrink: (0, _utils.chainPropTypes)(_propTypes.default.bool, props => {
    if (props.disableShrink && props.variant && props.variant !== 'indeterminate') {
      return new Error('Material-UI: You have provided the `disableShrink` prop ' + 'with a variant other than `indeterminate`. This will have no effect.');
    }

    return null;
  }),

  /**
   * The size of the circle.
   * If using a number, the pixel unit is assumed.
   * If using a string, you need to provide the CSS unit, e.g '3rem'.
   * @default 40
   */
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * The thickness of the circle.
   * @default 3.6
   */
  thickness: _propTypes.default.number,

  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: _propTypes.default.number,

  /**
   * The variant to use.
   * Use indeterminate when there is no progress value.
   * @default 'indeterminate'
   */
  variant: _propTypes.default.oneOf(['determinate', 'indeterminate'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiCircularProgress',
  flip: false
})(CircularProgress);

exports.default = _default;