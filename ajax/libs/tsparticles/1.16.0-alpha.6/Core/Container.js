"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const Canvas_1 = require("./Canvas");
const Particles_1 = require("./Particles");
const Retina_1 = require("./Retina");
const FrameManager_1 = require("./FrameManager");
const Options_1 = require("../Options/Classes/Options");
const Utils_1 = require("../Utils");
class Container {
    constructor(id, sourceOptions, ...presets) {
        this.id = id;
        this.sourceOptions = sourceOptions;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.pageHidden = false;
        this.retina = new Retina_1.Retina(this);
        this.canvas = new Canvas_1.Canvas(this);
        this.particles = new Particles_1.Particles(this);
        this.drawer = new FrameManager_1.FrameManager(this);
        this.noiseGenerator = () => {
            return {
                angle: Math.random() * Math.PI * 2,
                length: Math.random(),
            };
        };
        this.interactivity = {
            mouse: {},
        };
        this.bubble = {};
        this.repulse = { particles: [] };
        this.plugins = new Map();
        this.drawers = new Map();
        this.density = 1;
        this.options = new Options_1.Options();
        for (const preset of presets) {
            this.options.load(Utils_1.Plugins.getPreset(preset));
        }
        const shapes = Utils_1.Plugins.getSupportedShapes();
        for (const type of shapes) {
            const drawer = Utils_1.Plugins.getShapeDrawer(type);
            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }
        if (this.sourceOptions) {
            this.options.load(this.sourceOptions);
        }
        this.eventListeners = new Utils_1.EventListeners(this);
    }
    static requestFrame(callback) {
        return window.customRequestAnimationFrame(callback);
    }
    static cancelAnimation(handle) {
        window.cancelAnimationFrame(handle);
    }
    play(force) {
        const needsUpdate = this.paused || force;
        if (this.paused) {
            this.paused = false;
        }
        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
            this.lastFrameTime = performance.now();
        }
        this.draw();
    }
    pause() {
        if (this.drawAnimationFrame !== undefined) {
            Container.cancelAnimation(this.drawAnimationFrame);
            delete this.drawAnimationFrame;
        }
        if (!this.paused) {
            for (const [, plugin] of this.plugins) {
                if (plugin.pause) {
                    plugin.pause();
                }
            }
            if (!this.pageHidden) {
                this.paused = true;
            }
        }
    }
    draw() {
        this.drawAnimationFrame = Container.requestFrame((t) => { var _a; return (_a = this.drawer) === null || _a === void 0 ? void 0 : _a.nextFrame(t); });
    }
    getAnimationStatus() {
        return !this.paused;
    }
    densityAutoParticles() {
        this.initDensityFactor();
        const numberOptions = this.options.particles.number;
        const optParticlesNumber = numberOptions.value;
        const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
        const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * this.density;
        const particlesCount = this.particles.count;
        if (particlesCount < particlesNumber) {
            this.particles.push(Math.abs(particlesNumber - particlesCount));
        }
        else if (particlesCount > particlesNumber) {
            this.particles.removeQuantity(particlesCount - particlesNumber);
        }
    }
    initDensityFactor() {
        const densityOptions = this.options.particles.number.density;
        if (!this.canvas.element || !densityOptions.enable) {
            return;
        }
        const canvas = this.canvas.element;
        const pxRatio = this.retina.pixelRatio;
        this.density = (canvas.width * canvas.height) / (densityOptions.factor * pxRatio * densityOptions.area);
    }
    destroy() {
        this.stop();
        this.retina.reset();
        this.canvas.destroy();
        delete this.interactivity;
        delete this.options;
        delete this.retina;
        delete this.canvas;
        delete this.particles;
        delete this.bubble;
        delete this.repulse;
        delete this.drawer;
        delete this.eventListeners;
        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }
        this.drawers = new Map();
        this.destroyed = true;
    }
    exportImg(callback) {
        this.exportImage(callback);
    }
    exportImage(callback, type, quality) {
        var _a;
        return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
    }
    exportConfiguration() {
        return JSON.stringify(this.options, undefined, 2);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stop();
            yield this.start();
        });
    }
    stop() {
        if (!this.started) {
            return;
        }
        this.started = false;
        this.eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.retina.reset();
        this.canvas.clear();
        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }
        this.plugins = new Map();
        this.particles.linksColors = {};
        delete this.particles.linksColor;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.started) {
                return;
            }
            yield this.init();
            this.started = true;
            this.eventListeners.addListeners();
            for (const [, plugin] of this.plugins) {
                if (plugin.startAsync !== undefined) {
                    yield plugin.startAsync();
                }
                else if (plugin.start !== undefined) {
                    plugin.start();
                }
            }
            this.play();
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.retina.init();
            this.canvas.init();
            const availablePlugins = Utils_1.Plugins.getAvailablePlugins(this);
            for (const [id, plugin] of availablePlugins) {
                this.plugins.set(id, plugin);
            }
            for (const [, drawer] of this.drawers) {
                if (drawer.init) {
                    yield drawer.init(this);
                }
            }
            for (const [, plugin] of this.plugins) {
                if (plugin.init) {
                    plugin.init(this.options);
                }
                else if (plugin.initAsync !== undefined) {
                    yield plugin.initAsync(this.options);
                }
            }
            this.particles.init();
            this.densityAutoParticles();
        });
    }
}
exports.Container = Container;
