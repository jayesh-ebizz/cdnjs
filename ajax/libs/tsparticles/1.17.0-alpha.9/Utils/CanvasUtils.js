"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasUtils = void 0;
const ColorUtils_1 = require("./ColorUtils");
const Utils_1 = require("./Utils");
class CanvasUtils {
    static paintBase(context, dimension, baseColor) {
        context.save();
        context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
        context.fillRect(0, 0, dimension.width, dimension.height);
        context.restore();
    }
    static clear(context, dimension) {
        context.clearRect(0, 0, dimension.width, dimension.height);
    }
    static drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, colorLine, opacity, shadow) {
        let drawn = false;
        if (Utils_1.Utils.getDistance(begin, end) <= maxDistance) {
            this.drawLine(context, begin, end);
            drawn = true;
        }
        else if (warp) {
            let pi1;
            let pi2;
            const endNE = {
                x: end.x - canvasSize.width,
                y: end.y,
            };
            const { dx, dy, distance } = Utils_1.Utils.getDistances(begin, endNE);
            if (distance <= maxDistance) {
                const yi = begin.y - (dy / dx) * begin.x;
                pi1 = { x: 0, y: yi };
                pi2 = { x: canvasSize.width, y: yi };
            }
            else {
                const endSW = {
                    x: end.x,
                    y: end.y - canvasSize.height,
                };
                const { dx, dy, distance } = Utils_1.Utils.getDistances(begin, endSW);
                if (distance <= maxDistance) {
                    const yi = begin.y - (dy / dx) * begin.x;
                    const xi = -yi / (dy / dx);
                    pi1 = { x: xi, y: 0 };
                    pi2 = { x: xi, y: canvasSize.height };
                }
                else {
                    const endSE = {
                        x: end.x - canvasSize.width,
                        y: end.y - canvasSize.height,
                    };
                    const { dx, dy, distance } = Utils_1.Utils.getDistances(begin, endSE);
                    if (distance <= maxDistance) {
                        const yi = begin.y - (dy / dx) * begin.x;
                        const xi = -yi / (dy / dx);
                        pi1 = { x: xi, y: yi };
                        pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                    }
                }
            }
            if (pi1 && pi2) {
                this.drawLine(context, begin, pi1);
                this.drawLine(context, end, pi2);
                drawn = true;
            }
        }
        if (!drawn) {
            return;
        }
        context.lineWidth = width;
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        if (shadow.enable) {
            const shadowColor = ColorUtils_1.ColorUtils.colorToRgb(shadow.color);
            if (shadowColor) {
                context.shadowBlur = shadow.blur;
                context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            }
        }
        context.stroke();
    }
    static drawLinkTriangle(context, width, pos1, pos2, pos3, backgroundMask, colorTriangle, opacityTriangle) {
        this.drawTriangle(context, pos1, pos2, pos3);
        context.lineWidth = width;
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        context.fillStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorTriangle, opacityTriangle);
        context.fill();
    }
    static drawConnectLine(context, width, lineStyle, begin, end) {
        context.save();
        this.drawLine(context, begin, end);
        context.lineWidth = width;
        context.strokeStyle = lineStyle;
        context.stroke();
        context.restore();
    }
    static gradient(context, p1, p2, opacity) {
        const gradStop = Math.floor(p2.size.value / p1.size.value);
        const color1 = p1.getColor();
        const color2 = p2.getColor();
        if (!color1 || !color2) {
            return;
        }
        const sourcePos = p1.getPosition();
        const destPos = p2.getPosition();
        const midRgb = ColorUtils_1.ColorUtils.mix(color1, color2, p1.size.value, p2.size.value);
        const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
        grad.addColorStop(0, ColorUtils_1.ColorUtils.getStyleFromHsl(color1, opacity));
        grad.addColorStop(gradStop > 1 ? 1 : gradStop, ColorUtils_1.ColorUtils.getStyleFromRgb(midRgb, opacity));
        grad.addColorStop(1, ColorUtils_1.ColorUtils.getStyleFromHsl(color2, opacity));
        return grad;
    }
    static drawGrabLine(context, width, begin, end, colorLine, opacity) {
        context.save();
        this.drawLine(context, begin, end);
        context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(colorLine, opacity);
        context.lineWidth = width;
        context.stroke();
        context.restore();
    }
    static drawParticle(container, context, particle, delta, colorValue, backgroundMask, radius, opacity, shadow) {
        const pos = particle.getPosition();
        context.save();
        context.translate(pos.x, pos.y);
        context.beginPath();
        if (particle.angle !== 0) {
            context.rotate(particle.angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        const shadowColor = particle.shadowColor;
        if (shadow.enable && shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = ColorUtils_1.ColorUtils.getStyleFromRgb(shadowColor);
            context.shadowOffsetX = shadow.offset.x;
            context.shadowOffsetY = shadow.offset.y;
        }
        context.fillStyle = colorValue;
        const stroke = particle.stroke;
        context.lineWidth = stroke.width;
        if (particle.strokeColor) {
            context.strokeStyle = ColorUtils_1.ColorUtils.getStyleFromRgb(particle.strokeColor, particle.stroke.opacity);
        }
        if (particle.close) {
            context.closePath();
        }
        this.drawShape(container, context, particle, radius, opacity, delta);
        if (stroke.width > 0 && particle.strokeColor) {
            context.stroke();
        }
        if (particle.fill) {
            context.fill();
        }
        context.restore();
        context.save();
        context.translate(pos.x, pos.y);
        if (particle.angle !== 0) {
            context.rotate(particle.angle);
        }
        if (backgroundMask) {
            context.globalCompositeOperation = "destination-out";
        }
        this.drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
        context.restore();
    }
    static drawShape(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!drawer) {
            return;
        }
        drawer.draw(context, particle, radius, opacity, delta);
    }
    static drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
        if (!particle.shape) {
            return;
        }
        const drawer = container.drawers.get(particle.shape);
        if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
            return;
        }
        drawer.afterEffect(context, particle, radius, opacity, delta);
    }
    static drawPlugin(context, plugin, delta) {
        if (plugin.draw !== undefined) {
            context.save();
            plugin.draw(context, delta);
            context.restore();
        }
    }
    static drawLine(context, begin, end) {
        context.beginPath();
        context.moveTo(begin.x, begin.y);
        context.lineTo(end.x, end.y);
        context.closePath();
    }
    static drawTriangle(context, p1, p2, p3) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.lineTo(p3.x, p3.y);
        context.closePath();
    }
}
exports.CanvasUtils = CanvasUtils;
