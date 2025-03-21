import { SimpleSpringOptions } from './types';
/**
 * A simple spring function for animating DOM properties.
 * Returns a function that will immediately cancel the in-progress animation.
 * */
declare const createSimpleSpring: ({ config, values, onUpdate, delay, onComplete }: SimpleSpringOptions) => import("../forked-rebound/types").Spring;
export default createSimpleSpring;
