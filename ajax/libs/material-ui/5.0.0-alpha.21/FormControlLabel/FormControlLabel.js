import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { useFormControl } from '../FormControl';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16,
    // used for row presentation of radio/checkbox
    '&$disabled': {
      cursor: 'default'
    }
  },

  /* Styles applied to the root element if `labelPlacement="start"`. */
  labelPlacementStart: {
    flexDirection: 'row-reverse',
    marginLeft: 16,
    // used for row presentation of radio/checkbox
    marginRight: -11
  },

  /* Styles applied to the root element if `labelPlacement="top"`. */
  labelPlacementTop: {
    flexDirection: 'column-reverse',
    marginLeft: 16
  },

  /* Styles applied to the root element if `labelPlacement="bottom"`. */
  labelPlacementBottom: {
    flexDirection: 'column',
    marginLeft: 16
  },

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Styles applied to the label's Typography component. */
  label: {
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  }
});
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

const FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(props, ref) {
  const {
    classes,
    className,
    control,
    disabled: disabledProp,
    label,
    labelPlacement = 'end'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["checked", "classes", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);

  const muiFormControl = useFormControl();
  let disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  return /*#__PURE__*/React.createElement("label", _extends({
    className: clsx(classes.root, className, labelPlacement !== 'end' && classes[`labelPlacement${capitalize(labelPlacement)}`], disabled && classes.disabled),
    ref: ref
  }, other), /*#__PURE__*/React.cloneElement(control, controlProps), /*#__PURE__*/React.createElement(Typography, {
    component: "span",
    className: clsx(classes.label, disabled && classes.disabled)
  }, label));
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,

  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,

  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),

  /**
   * @ignore
   */
  name: PropTypes.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
export default withStyles(styles, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);