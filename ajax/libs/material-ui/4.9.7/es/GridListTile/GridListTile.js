import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import debounce from '../utils/debounce';
import withStyles from '../styles/withStyles';
import isMuiElement from '../utils/isMuiElement';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    flexShrink: 0
  },

  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: 'relative',
    display: 'block',
    // In case it's not rendered with a div.
    height: '100%',
    overflow: 'hidden'
  },

  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%'
  },

  /* Styles applied to an `img` element child, if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: '100%',
    position: 'relative',
    transform: 'translateY(-50%)',
    top: '50%'
  }
};

const fit = (imgEl, classes) => {
  if (!imgEl || !imgEl.complete) {
    return;
  }

  if (imgEl.width / imgEl.height > imgEl.parentElement.offsetWidth / imgEl.parentElement.offsetHeight) {
    imgEl.classList.remove(...classes.imgFullWidth.split(' '));
    imgEl.classList.add(...classes.imgFullHeight.split(' '));
  } else {
    imgEl.classList.remove(...classes.imgFullHeight.split(' '));
    imgEl.classList.add(...classes.imgFullWidth.split(' '));
  }
};

function ensureImageCover(imgEl, classes) {
  if (!imgEl) {
    return;
  }

  if (imgEl.complete) {
    fit(imgEl, classes);
  } else {
    imgEl.addEventListener('load', () => {
      fit(imgEl, classes);
    });
  }
}

const GridListTile = React.forwardRef(function GridListTile(props, ref) {
  // cols rows default values are for docs only
  const {
    children,
    classes,
    className,
    // eslint-disable-next-line no-unused-vars
    cols = 1,
    component: Component = 'li',
    // eslint-disable-next-line no-unused-vars
    rows = 1
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "cols", "component", "rows"]);

  const imgRef = React.useRef(null);
  React.useEffect(() => {
    ensureImageCover(imgRef.current, classes);
  });
  React.useEffect(() => {
    const handleResize = debounce(() => {
      fit(imgRef.current, classes);
    });
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [classes]);
  return React.createElement(Component, _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other), React.createElement("div", {
    className: classes.tile
  }, React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (child.type === 'img' || isMuiElement(child, ['Image'])) {
      return React.cloneElement(child, {
        ref: imgRef
      });
    }

    return child;
  })));
});
process.env.NODE_ENV !== "production" ? GridListTile.propTypes = {
  /**
   * Theoretically you can pass any node as children, but the main use case is to pass an img,
   * in which case GridListTile takes care of making the image "cover" available space
   * (similar to `background-size: cover` or to `object-fit: cover`).
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Width of the tile in number of grid cells.
   */
  cols: PropTypes.number,

  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Height of the tile in number of grid cells.
   */
  rows: PropTypes.number
} : void 0;
export default withStyles(styles, {
  name: 'MuiGridListTile'
})(GridListTile);