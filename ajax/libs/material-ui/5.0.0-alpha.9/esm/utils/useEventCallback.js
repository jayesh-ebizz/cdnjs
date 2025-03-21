import * as React from 'react';
import useEnhancedEffect from './useEnhancedEffect';
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */

export default function useEventCallback(fn) {
  var ref = React.useRef(fn);
  useEnhancedEffect(function () {
    ref.current = fn;
  });
  return React.useCallback(function () {
    return (0, ref.current).apply(void 0, arguments);
  }, []);
}