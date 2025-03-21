import type { Container } from "./Container";
import type { IDimension } from "./Interfaces/IDimension";
import type { IRgb } from "./Interfaces/IRgb";
import type { ICoordinates } from "./Interfaces/ICoordinates";
import type { IParticle } from "./Interfaces/IParticle";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { ILink } from "./Interfaces/ILink";
export declare class Canvas {
    element?: HTMLCanvasElement;
    readonly size: IDimension;
    context: CanvasRenderingContext2D | null;
    private readonly container;
    private generatedCanvas;
    private coverColor?;
    private trailFillColor?;
    constructor(container: Container);
    init(): void;
    loadCanvas(canvas: HTMLCanvasElement, generatedCanvas?: boolean): void;
    destroy(): void;
    resize(): void;
    paint(): void;
    clear(): void;
    isPointInPath(path: Path2D, point: ICoordinates): boolean;
    drawLinkedLine(p1: IParticle, link: ILink): void;
    drawConnectLine(p1: IParticle, p2: IParticle): void;
    drawGrabLine(particle: IParticle, lineColor: IRgb, opacity: number, mousePos: ICoordinates): void;
    drawParticle(particle: IParticle, delta: number): void;
    drawPlugin(plugin: IContainerPlugin, delta: number): void;
    private paintBase;
    private lineStyle;
    private initBackground;
}
