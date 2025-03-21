import { Actor } from '../Actor';
import { Vector, GlobalCoordinates } from '../Algebra';
import { Pointer, PointerType } from './Pointer';
import { GameEvent } from '../Events';
/**
 * Native browser button enumeration
 */
export declare enum NativePointerButton {
    NoButton = -1,
    Left = 0,
    Middle = 1,
    Right = 2,
    Unknown = 3
}
/**
 * The mouse button being pressed.
 */
export declare enum PointerButton {
    Left = "Left",
    Middle = "Middle",
    Right = "Right",
    Unknown = "Unknown",
    NoButton = "NoButton"
}
export declare enum WheelDeltaMode {
    Pixel = "Pixel",
    Line = "Line",
    Page = "Page"
}
/**
 * Type that indicates Excalibur's valid synthetic pointer events
 */
export declare type PointerEventName = 'pointerdragstart' | 'pointerdragend' | 'pointerdragmove' | 'pointerdragenter' | 'pointerdragleave' | 'pointermove' | 'pointerenter' | 'pointerleave' | 'pointerup' | 'pointerdown';
/**
 * Pointer events
 *
 * Represents a mouse, touch, or stylus event. See [[Pointers]] for more information on
 * handling pointer input.
 *
 * For mouse-based events, you can inspect [[PointerEvent.button]] to see what button was pressed.
 */
export declare class PointerEvent extends GameEvent<Actor> {
    protected coordinates: GlobalCoordinates;
    pointer: Pointer;
    index: number;
    pointerType: PointerType;
    button: PointerButton;
    ev: any;
    protected _name: string;
    get name(): string;
    /** The world coordinates of the event. */
    get worldPos(): Vector;
    /** The page coordinates of the event. */
    get pagePos(): Vector;
    /** The screen coordinates of the event. */
    get screenPos(): Vector;
    /**
     * @param coordinates         The [[GlobalCoordinates]] of the event
     * @param pointer             The [[Pointer]] of the event
     * @param index               The index of the pointer (zero-based)
     * @param pointerType         The type of pointer
     * @param button              The button pressed (if [[PointerType.Mouse]])
     * @param ev                  The raw DOM event being handled
     * @param pos                 (Will be added to signature in 0.14.0 release) The position of the event (in world coordinates)
     */
    constructor(coordinates: GlobalCoordinates, pointer: Pointer, index: number, pointerType: PointerType, button: PointerButton, ev: any);
    get pos(): Vector;
    propagate(actor: Actor): void;
    /**
     * Action, that calls when event happens
     */
    doAction(actor: Actor): void;
    protected _onActionStart(_actor?: Actor): void;
    protected _onActionEnd(_actor?: Actor): void;
}
export declare class PointerEventFactory<T extends PointerEvent> {
    protected _pointerEventType: new (coordinates: GlobalCoordinates, pointer: Pointer, index: number, pointerType: PointerType, button: PointerButton, ev: any) => T;
    constructor(_pointerEventType: new (coordinates: GlobalCoordinates, pointer: Pointer, index: number, pointerType: PointerType, button: PointerButton, ev: any) => T);
    /**
     * Create specific PointerEvent
     */
    create(coordinates: GlobalCoordinates, pointer: Pointer, index: number, pointerType: PointerType, button: PointerButton, ev: any): T;
}
export declare class PointerDragEvent extends PointerEvent {
}
export declare class PointerUpEvent extends PointerEvent {
    protected _name: string;
    protected _onActionEnd(actor: Actor): void;
}
export declare class PointerDownEvent extends PointerEvent {
    protected _name: string;
    protected _onActionEnd(actor: Actor): void;
}
export declare class PointerMoveEvent extends PointerEvent {
    protected _name: string;
    propagate(actor: Actor): void;
    protected _onActionStart(actor: Actor): void;
}
export declare class PointerEnterEvent extends PointerEvent {
    protected _name: string;
    protected _onActionStart(actor: Actor): void;
    protected _onActionEnd(actor: Actor): void;
}
export declare class PointerLeaveEvent extends PointerEvent {
    protected _name: string;
    protected _onActionStart(actor: Actor): void;
    protected _onActionEnd(actor: Actor): void;
}
export declare class PointerCancelEvent extends PointerEvent {
    protected _name: string;
}
/**
 * Wheel Events
 *
 * Represents a mouse wheel event. See [[Pointers]] for more information on
 * handling point input.
 */
export declare class WheelEvent extends GameEvent<Actor> {
    x: number;
    y: number;
    pageX: number;
    pageY: number;
    screenX: number;
    screenY: number;
    index: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    deltaMode: WheelDeltaMode;
    ev: any;
    /**
     * @param x            The `x` coordinate of the event (in world coordinates)
     * @param y            The `y` coordinate of the event (in world coordinates)
     * @param pageX        The `x` coordinate of the event (in document coordinates)
     * @param pageY        The `y` coordinate of the event (in document coordinates)
     * @param screenX      The `x` coordinate of the event (in screen coordinates)
     * @param screenY      The `y` coordinate of the event (in screen coordinates)
     * @param index        The index of the pointer (zero-based)
     * @param deltaX       The type of pointer
     * @param deltaY       The type of pointer
     * @param deltaZ       The type of pointer
     * @param deltaMode    The type of movement [[WheelDeltaMode]]
     * @param ev           The raw DOM event being handled
     */
    constructor(x: number, y: number, pageX: number, pageY: number, screenX: number, screenY: number, index: number, deltaX: number, deltaY: number, deltaZ: number, deltaMode: WheelDeltaMode, ev: any);
}
export declare function createPointerEventByName(eventName: string, coordinates: GlobalCoordinates, pointer: Pointer, index: number, pointerType: PointerType, button: PointerButton, ev: any): PointerEvent;
