import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import { darken, fade, lighten } from '../styles/colorManipulator';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: _extends({}, theme.typography.body2, {
      display: 'table-cell',
      verticalAlign: 'inherit',
      // Workaround for a rendering bug with spanned columns in Chrome 62.0.
      // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
      borderBottom: "1px solid\n    ".concat(theme.palette.type === 'light' ? lighten(fade(theme.palette.divider, 1), 0.88) : darken(fade(theme.palette.divider, 1), 0.68)),
      textAlign: 'left',
      padding: 16
    }),

    /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
    head: {
      color: theme.palette.text.primary,
      lineHeight: theme.typography.pxToRem(24),
      fontWeight: theme.typography.fontWeightMedium
    },

    /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
    body: {
      color: theme.palette.text.primary
    },

    /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
    footer: {
      color: theme.palette.text.secondary,
      lineHeight: theme.typography.pxToRem(21),
      fontSize: theme.typography.pxToRem(12)
    },

    /* Styles applied to the root element if `size="small"`. */
    sizeSmall: {
      padding: '6px 16px',
      '&$paddingCheckbox': {
        width: 24,
        // prevent the checkbox column from growing
        padding: '0 12px 0 16px',
        '& > *': {
          padding: 0
        }
      }
    },

    /* Styles applied to the root element if `padding="checkbox"`. */
    paddingCheckbox: {
      width: 48,
      // prevent the checkbox column from growing
      padding: '0 0 0 4px'
    },

    /* Styles applied to the root element if `padding="none"`. */
    paddingNone: {
      padding: 0
    },

    /* Styles applied to the root element if `align="left"`. */
    alignLeft: {
      textAlign: 'left'
    },

    /* Styles applied to the root element if `align="center"`. */
    alignCenter: {
      textAlign: 'center'
    },

    /* Styles applied to the root element if `align="right"`. */
    alignRight: {
      textAlign: 'right',
      flexDirection: 'row-reverse'
    },

    /* Styles applied to the root element if `align="justify"`. */
    alignJustify: {
      textAlign: 'justify'
    },

    /* Styles applied to the root element if `context.table.stickyHeader={true}`. */
    stickyHeader: {
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 2,
      backgroundColor: theme.palette.background.default
    }
  };
};
/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */

var TableCell = /*#__PURE__*/React.forwardRef(function TableCell(props, ref) {
  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      classes = props.classes,
      className = props.className,
      component = props.component,
      paddingProp = props.padding,
      scopeProp = props.scope,
      sizeProp = props.size,
      sortDirection = props.sortDirection,
      variantProp = props.variant,
      other = _objectWithoutProperties(props, ["align", "classes", "className", "component", "padding", "scope", "size", "sortDirection", "variant"]);

  var table = React.useContext(TableContext);
  var tablelvl2 = React.useContext(Tablelvl2Context);
  var isHeadCell = tablelvl2 && tablelvl2.variant === 'head';
  var role;
  var Component;

  if (component) {
    Component = component;
    role = isHeadCell ? 'columnheader' : 'cell';
  } else {
    Component = isHeadCell ? 'th' : 'td';
  }

  var scope = scopeProp;

  if (!scope && isHeadCell) {
    scope = 'col';
  }

  var padding = paddingProp || (table && table.padding ? table.padding : 'default');
  var size = sizeProp || (table && table.size ? table.size : 'medium');
  var variant = variantProp || tablelvl2 && tablelvl2.variant;
  var ariaSort = null;

  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: clsx(classes.root, classes[variant], className, align !== 'inherit' && classes["align".concat(capitalize(align))], padding !== 'default' && classes["padding".concat(capitalize(padding))], size !== 'medium' && classes["size".concat(capitalize(size))], variant === 'head' && table && table.stickyHeader && classes.stickyHeader),
    "aria-sort": ariaSort,
    role: role,
    scope: scope
  }, other));
});
process.env.NODE_ENV !== "production" ? TableCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The table cell contents.
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
   * Sets the padding applied to the cell.
   * By default, the Table parent component set the value (`default`).
   */
  padding: PropTypes.oneOf(['checkbox', 'default', 'none']),

  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,

  /**
   * Specify the size of the cell.
   * By default, the Table parent component set the value (`medium`).
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),

  /**
   * Specify the cell type.
   * By default, the TableHead, TableBody or TableFooter parent component set the value.
   */
  variant: PropTypes.oneOf(['body', 'footer', 'head'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiTableCell'
})(TableCell);