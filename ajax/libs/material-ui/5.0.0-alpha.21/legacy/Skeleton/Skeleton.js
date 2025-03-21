import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { alpha, withStyles, unstable_toUnitless as toUnitless, unstable_getUnit as getUnit, useThemeVariants } from '../styles';
export var styles = function styles(theme) {
  var radiusUnit = getUnit(theme.shape.borderRadius) || 'px';
  var radiusValue = toUnitless(theme.shape.borderRadius);
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'block',
      // Create a "on paper" color with sufficient contrast retaining the color
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.11 : 0.13),
      height: '1.2em'
    },

    /* Styles applied to the root element if `variant="text"`. */
    text: {
      marginTop: 0,
      marginBottom: 0,
      height: 'auto',
      transformOrigin: '0 55%',
      transform: 'scale(1, 0.60)',
      borderRadius: "".concat(radiusValue).concat(radiusUnit, "/").concat(Math.round(radiusValue / 0.6 * 10) / 10).concat(radiusUnit),
      '&:empty:before': {
        content: '"\\00a0"'
      }
    },

    /* Styles applied to the root element if `variant="rectangular"`. */
    rectangular: {},

    /* Styles applied to the root element if `variant="circular"`. */
    circular: {
      borderRadius: '50%'
    },

    /* Styles applied to the root element if `animation="pulse"`. */
    pulse: {
      animation: '$pulse 1.5s ease-in-out 0.5s infinite'
    },
    '@keyframes pulse': {
      '0%': {
        opacity: 1
      },
      '50%': {
        opacity: 0.4
      },
      '100%': {
        opacity: 1
      }
    },

    /* Styles applied to the root element if `animation="wave"`. */
    wave: {
      position: 'relative',
      overflow: 'hidden',
      // Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196
      WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      '&::after': {
        animation: '$wave 1.6s linear 0.5s infinite',
        background: "linear-gradient(90deg, transparent, ".concat(theme.palette.action.hover, ", transparent)"),
        content: '""',
        position: 'absolute',
        transform: 'translateX(-100%)',
        // Avoid flash during server-side hydration
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
      }
    },
    '@keyframes wave': {
      '0%': {
        transform: 'translateX(-100%)'
      },
      '60%': {
        // +0.5s of delay between each loop
        transform: 'translateX(100%)'
      },
      '100%': {
        transform: 'translateX(100%)'
      }
    },

    /* Styles applied when the component is passed children. */
    withChildren: {
      '& > *': {
        visibility: 'hidden'
      }
    },

    /* Styles applied when the component is passed children and no width. */
    fitContent: {
      maxWidth: 'fit-content'
    },

    /* Styles applied when the component is passed children and no height. */
    heightAuto: {
      height: 'auto'
    }
  };
};
var Skeleton = /*#__PURE__*/React.forwardRef(function Skeleton(props, ref) {
  var _props$animation = props.animation,
      animation = _props$animation === void 0 ? 'pulse' : _props$animation,
      classes = props.classes,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'span' : _props$component,
      height = props.height,
      style = props.style,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      width = props.width,
      other = _objectWithoutProperties(props, ["animation", "classes", "className", "component", "height", "style", "variant", "width"]);

  var themeVariantsClasses = useThemeVariants(_extends({}, props, {
    animation: animation,
    component: Component,
    variant: variant
  }), 'MuiSkeleton');
  var hasChildren = Boolean(other.children);
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, classes[variant], themeVariantsClasses, className, hasChildren && [classes.withChildren, !width && classes.fitContent, !height && classes.heightAuto], animation !== false && classes[animation])
  }, other, {
    style: _extends({
      width: width,
      height: height
    }, style)
  }));
});
process.env.NODE_ENV !== "production" ? Skeleton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation: PropTypes.oneOf(['pulse', 'wave', false]),

  /**
   * Optional children to infer width and height from.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['circular', 'rectangular', 'text']), PropTypes.string]),

  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export default withStyles(styles, {
  name: 'MuiSkeleton'
})(Skeleton);