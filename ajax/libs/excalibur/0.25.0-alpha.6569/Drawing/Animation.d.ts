import { Sprite } from './Sprite';
import * as Effects from './SpriteEffects';
import { Color } from './Color';
import { Drawable, DrawOptions } from '../Interfaces/Drawable';
import { Vector } from '../Algebra';
import { Engine } from '../Engine';
/**
 * @hidden
 */
export declare class AnimationImpl implements Drawable {
    /**
     * The sprite frames to play, in order. See [[SpriteSheet.getAnimationForAll]] to quickly
     * generate an [[Animation]].
     */
    sprites: Sprite[];
    /**
     * Duration to show each frame (in milliseconds)
     */
    speed: number;
    /**
     * Current frame index being shown
     */
    currentFrame: number;
    private _oldTime;
    anchor: Vector;
    rotation: number;
    scale: Vector;
    /**
     * Indicates whether the animation should loop after it is completed
     */
    loop: boolean;
    /**
     * Indicates the frame index the animation should freeze on for a non-looping
     * animation. By default it is the last frame.
     */
    freezeFrame: number;
    private _engine;
    /**
     * Flip each frame vertically. Sets [[Sprite.flipVertical]].
     */
    flipVertical: boolean;
    /**
     * Flip each frame horizontally. Sets [[Sprite.flipHorizontal]].
     */
    flipHorizontal: boolean;
    drawWidth: number;
    drawHeight: number;
    width: number;
    height: number;
    /**
     * Typically you will use a [[SpriteSheet]] to generate an [[Animation]].
     *
     * @param engine  Reference to the current game engine
     * @param images  An array of sprites to create the frames for the animation
     * @param speed   The number in milliseconds to display each frame in the animation
     * @param loop    Indicates whether the animation should loop after it is completed
     */
    constructor(engineOrConfig: Engine | AnimationArgs, sprites: Sprite[], speed: number, loop?: boolean);
    /**
     * Applies the opacity effect to a sprite, setting the alpha of all pixels to a given value
     */
    opacity(value: number): void;
    /**
     * Applies the grayscale effect to a sprite, removing color information.
     */
    grayscale(): void;
    /**
     * Applies the invert effect to a sprite, inverting the pixel colors.
     */
    invert(): void;
    /**
     * Applies the fill effect to a sprite, changing the color channels of all non-transparent pixels to match a given color
     */
    fill(color: Color): void;
    /**
     * Applies the colorize effect to a sprite, changing the color channels of all pixels to be the average of the original color and the
     * provided color.
     */
    colorize(color: Color): void;
    /**
     * Applies the lighten effect to a sprite, changes the lightness of the color according to hsl
     */
    lighten(factor?: number): void;
    /**
     * Applies the darken effect to a sprite, changes the darkness of the color according to hsl
     */
    darken(factor?: number): void;
    /**
     * Applies the saturate effect to a sprite, saturates the color according to hsl
     */
    saturate(factor?: number): void;
    /**
     * Applies the desaturate effect to a sprite, desaturates the color according to hsl
     */
    desaturate(factor?: number): void;
    /**
     * Add a [[SpriteEffect]] manually
     */
    addEffect(effect: Effects.SpriteEffect): void;
    /**
     * Removes an [[SpriteEffect]] from this animation.
     * @param effect Effect to remove from this animation
     */
    removeEffect(effect: Effects.SpriteEffect): void;
    /**
     * Removes an effect given the index from this animation.
     * @param index  Index of the effect to remove from this animation
     */
    removeEffect(index: number): void;
    /**
     * Clear all sprite effects
     */
    clearEffects(): void;
    private _setAnchor;
    private _setRotation;
    private _setScale;
    /**
     * Resets the animation to first frame.
     */
    reset(): void;
    /**
     * Indicates whether the animation is complete, animations that loop are never complete.
     */
    isDone(): boolean;
    /**
     * Not meant to be called by game developers. Ticks the animation forward internally and
     * calculates whether to change to the frame.
     * @internal
     */
    tick(): void;
    private _updateValues;
    /**
     * Skips ahead a specified number of frames in the animation
     * @param frames  Frames to skip ahead
     */
    skip(frames: number): void;
    /**
     * Draws the animation appropriately to the 2D rendering context, at an x and y coordinate.
     * @param ctx  The 2D rendering context
     * @param x    The x coordinate of where to draw
     * @param y    The y coordinate of where to draw
     */
    draw(ctx: CanvasRenderingContext2D, x: number, y: number): void;
    /**
     * Draws the animation with custom options to override internals without mutating them.
     * @param options
     */
    draw(options: DrawOptions): void;
    private _drawWithOptions;
    /**
     * Plays an animation at an arbitrary location in the game.
     * @param x  The x position in the game to play
     * @param y  The y position in the game to play
     */
    play(x: number, y: number): void;
}
/**
 * [[include:Constructors.md]]
 */
export interface AnimationArgs extends Partial<AnimationImpl> {
    engine: Engine;
    sprites: Sprite[];
    speed: number;
    loop?: boolean;
    anchor?: Vector;
    rotation?: number;
    scale?: Vector;
    flipVertical?: boolean;
    flipHorizontal?: boolean;
    width?: number;
    height?: number;
}
declare const Animation_base: typeof AnimationImpl;
/**
 * Animations allow you to display a series of images one after another,
 * creating the illusion of change. Generally these images will come from a [[SpriteSheet]] source.
 *
 * [[include:Animations.md]]
 */
export declare class Animation extends Animation_base {
    constructor(config: AnimationArgs);
    constructor(engine: Engine, images: Sprite[], speed: number, loop?: boolean);
}
export {};
