import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    overflowX: 'auto'
  }
};
const TableContainer = /*#__PURE__*/React.forwardRef(function TableContainer(props, ref) {
  const {
    classes,
    className,
    component: Component = 'div'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "component"]);

  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? TableContainer.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The table itself, normally `<Table />`.
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
  component: PropTypes.elementType
} : void 0;
export default withStyles(styles, {
  name: 'MuiTableContainer'
})(TableContainer);