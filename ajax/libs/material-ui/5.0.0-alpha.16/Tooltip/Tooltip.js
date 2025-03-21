import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { elementAcceptingRef } from '@material-ui/utils';
import { alpha } from '../styles/colorManipulator';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/useId';
import useIsFocusVisible from '../utils/useIsFocusVisible';
import useControlled from '../utils/useControlled';
import useTheme from '../styles/useTheme';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

function arrowGenerator() {
  return {
    '&[data-popper-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.71em',
      '&::before': {
        transformOrigin: '0 100%'
      }
    },
    '&[data-popper-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.71em',
      '&::before': {
        transformOrigin: '100% 0'
      }
    },
    '&[data-popper-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '100% 100%'
      }
    },
    '&[data-popper-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '0 0'
      }
    }
  };
}

export const styles = theme => ({
  /* Styles applied to the Popper component. */
  popper: {
    zIndex: theme.zIndex.tooltip,
    pointerEvents: 'none' // disable jss-rtl plugin

  },

  /* Styles applied to the Popper component unless `disableInteractive={true}`. */
  popperInteractive: {
    pointerEvents: 'auto'
  },

  /* Styles applied to the Popper component if `arrow={true}`. */
  popperArrow: arrowGenerator(),

  /* Styles applied to the tooltip (label wrapper) element. */
  tooltip: {
    backgroundColor: alpha(theme.palette.grey[700], 0.92),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(11),
    maxWidth: 300,
    margin: 2,
    wordWrap: 'break-word',
    fontWeight: theme.typography.fontWeightMedium
  },

  /* Styles applied to the tooltip (label wrapper) element if `arrow={true}`. */
  tooltipArrow: {
    position: 'relative',
    margin: 0
  },

  /* Styles applied to the arrow element. */
  arrow: {
    overflow: 'hidden',
    position: 'absolute',
    width: '1em',
    height: '0.71em'
    /* = width / sqrt(2) = (length of the hypotenuse) */
    ,
    boxSizing: 'border-box',
    color: alpha(theme.palette.grey[700], 0.9),
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: '100%',
      height: '100%',
      backgroundColor: 'currentColor',
      transform: 'rotate(45deg)'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: {
    padding: '8px 16px',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${round(16 / 14)}em`,
    fontWeight: theme.typography.fontWeightRegular
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: {
    transformOrigin: 'right center',
    marginRight: '24px',
    [theme.breakpoints.up('sm')]: {
      marginRight: '14px'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: {
    transformOrigin: 'left center',
    marginLeft: '24px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '14px'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: {
    transformOrigin: 'center bottom',
    marginBottom: '24px',
    [theme.breakpoints.up('sm')]: {
      marginBottom: '14px'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: {
    transformOrigin: 'center top',
    marginTop: '24px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '14px'
    }
  }
});
let hystersisOpen = false;
let hystersisTimer = null;
export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer);
}

function composeEventHandler(handler, eventHandler) {
  return event => {
    if (eventHandler) {
      eventHandler(event);
    }

    handler(event);
  };
}

const Tooltip = /*#__PURE__*/React.forwardRef(function Tooltip(props, ref) {
  const {
    arrow = false,
    children,
    classes,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    disableInteractive: disableInteractiveProp = false,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent = Popper,
    PopperProps = {},
    title,
    TransitionComponent = Grow,
    TransitionProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["arrow", "children", "classes", "describeChild", "disableFocusListener", "disableHoverListener", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "disableInteractive", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"]);

  const theme = useTheme();
  const [childNode, setChildNode] = React.useState();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = React.useRef();
  const enterTimer = React.useRef();
  const leaveTimer = React.useRef();
  const touchTimer = React.useRef();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  });
  let open = openState;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {
      current: isControlled
    } = React.useRef(openProp !== undefined); // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(() => {
      if (childNode && childNode.disabled && !isControlled && title !== '' && childNode.tagName.toLowerCase() === 'button') {
        console.error(['Material-UI: You are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Add a simple wrapper element, such as a `span`.'].join('\n'));
      }
    }, [title, childNode, isControlled]);
  }

  const id = useId(idProp);
  const prevUserSelect = React.useRef();
  const stopTouchInteraction = React.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }

    clearTimeout(touchTimer.current);
  }, []);
  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = event => {
    clearTimeout(hystersisTimer);
    hystersisOpen = true; // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.

    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  event => {
    clearTimeout(hystersisTimer);
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, theme.transitions.duration.shortest);
  });

  const handleEnter = event => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    if (childNode) {
      childNode.removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);

    if (enterDelay || hystersisOpen && enterNextDelay) {
      event.persist();
      enterTimer.current = setTimeout(() => {
        handleOpen(event);
      }, hystersisOpen ? enterNextDelay : enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = event => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible(); // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.

  const [, setChildIsFocusVisible] = React.useState(false);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event);
    }
  };

  const handleFocus = event => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event);
    }
  };

  const detectTouchStart = event => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = event => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();
    event.persist();
    prevUserSelect.current = document.body.style.WebkitUserSelect; // Prevent iOS text selection on long-tap.

    document.body.style.WebkitUserSelect = 'none';
    touchTimer.current = setTimeout(() => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleEnter(event);
    }, enterTouchDelay);
  };

  const handleTouchEnd = event => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(touchTimer.current);
    clearTimeout(leaveTimer.current);
    event.persist();
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }
    /**
     * @param {KeyboardEvent} nativeEvent
     */


    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef); // There is no point in displaying an empty tooltip.

  if (title === '') {
    open = false;
  }

  const positionRef = React.useRef({
    x: 0,
    y: 0
  });
  const popperRef = React.useRef();

  const handleMouseMove = event => {
    const childrenProps = children.props;

    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    if (popperRef.current) {
      popperRef.current.update();
    }
  };

  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';

  if (describeChild) {
    nameOrDescProps['title'] = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = _extends({}, nameOrDescProps, other, children.props, {
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef
  }, followCursor ? {
    onMouseMove: handleMouseMove
  } : {});

  if (process.env.NODE_ENV !== 'production') {
    childrenProps['data-mui-internal-clone-element'] = true; // eslint-disable-next-line react-hooks/rules-of-hooks

    React.useEffect(() => {
      if (childNode && !childNode.getAttribute('data-mui-internal-clone-element')) {
        console.error(['Material-UI: The `children` component of the Tooltip is not forwarding its props correctly.', 'Please make sure that props are spread on the same element that the ref is applied to.'].join('\n'));
      }
    }, [childNode]);
  }

  const interactiveWrapperListeners = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    if (children.props.title) {
      console.error(['Material-UI: You have provided a `title` prop to the child of <Tooltip />.', `Remove this title prop \`${children.props.title}\` or the Tooltip component.`].join('\n'));
    }
  }

  const popperOptions = React.useMemo(() => {
    var _PopperProps$popperOp;

    let tooltipModifiers = [{
      name: 'arrow',
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];

    if ((_PopperProps$popperOp = PopperProps.popperOptions) === null || _PopperProps$popperOp === void 0 ? void 0 : _PopperProps$popperOp.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }

    return _extends({}, PopperProps.popperOptions, {
      modifiers: tooltipModifiers
    });
  }, [arrowRef, PopperProps]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.cloneElement(children, childrenProps), /*#__PURE__*/React.createElement(PopperComponent, _extends({
    className: clsx(classes.popper, !disableInteractive && classes.popperInteractive, arrow && classes.popperArrow),
    placement: placement,
    anchorEl: followCursor ? {
      getBoundingClientRect: () => ({
        top: positionRef.current.y,
        left: positionRef.current.x,
        right: positionRef.current.x,
        bottom: positionRef.current.y,
        width: 0,
        height: 0
      })
    } : childNode,
    popperRef: popperRef,
    open: childNode ? open : false,
    id: id,
    transition: true
  }, interactiveWrapperListeners, PopperProps, {
    popperOptions: popperOptions
  }), ({
    placement: placementInner,
    TransitionProps: TransitionPropsInner
  }) => /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    timeout: theme.transitions.duration.shorter
  }, TransitionPropsInner, TransitionProps), /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.tooltip, classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`], ignoreNonTouchEvents.current && classes.touch, arrow && classes.tooltipArrow)
  }, title, arrow ? /*#__PURE__*/React.createElement("span", {
    className: classes.arrow,
    ref: setArrowRef
  }) : null))));
});
process.env.NODE_ENV !== "production" ? Tooltip.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,

  /**
   * Tooltip reference element.
   */
  children: elementAcceptingRef.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,

  /**
   * Do not respond to focus events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,

  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,

  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,

  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,

  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,

  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,

  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,

  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,

  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,

  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,

  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,

  /**
   * Callback fired when the component requests to be open.
   *
   * @param {object} event The event source of the callback.
   */
  onOpen: PropTypes.func,

  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,

  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf(['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   * @default {}
   */
  PopperProps: PropTypes.object,

  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiTooltip',
  flip: false
})(Tooltip);