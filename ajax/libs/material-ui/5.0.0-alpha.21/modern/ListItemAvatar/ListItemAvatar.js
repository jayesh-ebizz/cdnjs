import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ListContext from '../List/ListContext';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    minWidth: 56,
    flexShrink: 0
  },

  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    marginTop: 8
  }
};
/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */

const ListItemAvatar = /*#__PURE__*/React.forwardRef(function ListItemAvatar(props, ref) {
  const {
    classes,
    className
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className"]);

  const context = React.useContext(ListContext);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className, context.alignItems === 'flex-start' && classes.alignItemsFlexStart),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemAvatar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component – normally `Avatar`.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string
} : void 0;
export default withStyles(styles, {
  name: 'MuiListItemAvatar'
})(ListItemAvatar);