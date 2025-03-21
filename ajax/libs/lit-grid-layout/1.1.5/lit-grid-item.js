var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, LitElement, css, property, internalProperty, query, } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { fireEvent } from "./util/fire-event";
import "./lit-draggable";
import "./lit-resizable";
let LitGridItem = class LitGridItem extends LitElement {
    constructor() {
        super(...arguments);
        this.minWidth = 1;
        this.minHeight = 1;
        this.isDraggable = true;
        this.isResizable = true;
        this._isDragging = false;
        this._isResizing = false;
        this._firstLayoutFinished = false;
    }
    updated(changedProps) {
        // Set up all the calculations that are needed in the drag/resize events
        // No need to calculate them all the time unless they change
        if (changedProps.has("parentWidth") ||
            changedProps.has("margin") ||
            changedProps.has("columns") ||
            changedProps.has("containerPadding") ||
            changedProps.has("minHeight") ||
            changedProps.has("minWidth") ||
            changedProps.has("maxWidth") ||
            changedProps.has("maxHeight") ||
            changedProps.has("rowHeight") ||
            changedProps.has("posX") ||
            (changedProps.has("_isDragging") && !this._isDragging)) {
            this._columnWidth =
                (this.parentWidth -
                    this.margin[0] * (this.columns - 1) -
                    this.containerPadding[0] * 2) /
                    this.columns;
            this._fullColumnWidth = this._columnWidth + this.margin[0];
            this._fullRowHeight = this.rowHeight + this.margin[1];
            this._minWidthPX =
                this._fullColumnWidth * this.minWidth - this.margin[0];
            const maxWidthUnits = this.maxWidth !== undefined
                ? Math.min(this.maxWidth, this.columns - this.posX)
                : this.columns - this.posX;
            this._maxWidthPX =
                this._fullColumnWidth * maxWidthUnits - this.margin[0];
            this._minHeightPX =
                this._fullRowHeight * this.minHeight - this.margin[1];
            this._maxHeightPX =
                this._fullRowHeight * (this.maxHeight || Infinity) - this.margin[1];
        }
        if (this._isDragging) {
            return;
        }
        this._itemLeftPX = Math.round(this.posX * this._fullColumnWidth + this.containerPadding[0]);
        this._itemTopPX = !this.parentWidth
            ? 0
            : Math.round(this.posY * this._fullRowHeight + this.containerPadding[1]);
        if (this._isResizing) {
            return;
        }
        this._itemWidthPX =
            this.width * this._columnWidth +
                Math.max(0, this.width - 1) * this.margin[0];
        this._itemHeightPX =
            this.height * this.rowHeight +
                Math.max(0, this.height - 1) * this.margin[1];
        if (!this._firstLayoutFinished && this.parentWidth > 0) {
            setTimeout(() => (this._firstLayoutFinished = true), 200);
        }
    }
    render() {
        let gridItemHTML = html `<slot></slot>`;
        if (this.isDraggable) {
            gridItemHTML = html `
        <lit-draggable
          .handle=${this.dragHandle}
          @dragStart=${this._dragStart}
          @dragging=${this._drag}
          @dragEnd=${this._dragEnd}
        >
          ${gridItemHTML}
        </lit-draggable>
      `;
        }
        if (this.isResizable) {
            gridItemHTML = html `
        <lit-resizable
          .handle=${this.resizeHandle}
          @resizeStart=${this._resizeStart}
          @resize=${this._resize}
          @resizeEnd=${this._resizeEnd}
        >
          ${gridItemHTML}
        </lit-resizable>
      `;
        }
        return html `<div
      class="grid-item-wrapper ${classMap({
            dragging: this._isDragging,
            resizing: this._isResizing,
            finished: this._firstLayoutFinished,
        })}"
      style="transform: translate(${this._itemLeftPX}px, ${this
            ._itemTopPX}px); width: ${this._itemWidthPX}px; height: ${this
            ._itemHeightPX}px"
    >
      ${gridItemHTML}
    </div>`;
    }
    _resizeStart() {
        this.isDraggable = false;
        this._isResizing = true;
        this._isDragging = false;
        fireEvent(this, "resizeStart");
    }
    _resize(ev) {
        if (!this._isResizing) {
            return;
        }
        let { width, height } = ev.detail;
        // update width and height to be within contraints
        width = Math.max(this._minWidthPX, width);
        width = Math.min(this._maxWidthPX, width);
        height = Math.max(this._minHeightPX, height);
        height = Math.min(this._maxHeightPX, height);
        // Go ahead an update the width and height of the element (this won't affect the layout)
        this._itemWidthPX = width;
        this._itemHeightPX = height;
        // Calculate the new width and height in grid units
        const newWidth = Math.round((width + this.margin[0]) / this._fullColumnWidth);
        const newHeight = Math.round((height + this.margin[1]) / this._fullRowHeight);
        // if the grid units don't change, don't send the update to the layout
        if (newWidth === this.width && newHeight === this.height) {
            return;
        }
        fireEvent(this, "resize", { newWidth, newHeight });
    }
    _resizeEnd() {
        this.isDraggable = true;
        this._isResizing = false;
        fireEvent(this, "resizeEnd");
    }
    _dragStart() {
        if (!this.isDraggable) {
            return;
        }
        const rect = this.gridItem.getBoundingClientRect();
        const parentRect = this.offsetParent.getBoundingClientRect();
        this._startLeft = rect.left - parentRect.left;
        this._startTop = rect.top - parentRect.top;
        this._startPosX = this.posX;
        this._startPosY = this.posY;
        this._isDragging = true;
        fireEvent(this, "dragStart");
    }
    _drag(ev) {
        if (this._startPosX === undefined ||
            this._startPosY === undefined ||
            this._startLeft === undefined ||
            this._startTop === undefined ||
            !this.isDraggable) {
            return;
        }
        const { deltaX, deltaY } = ev.detail;
        // Go ahead an update the position of the item, this won't affect the layout
        this._itemLeftPX = this._startLeft + deltaX;
        this._itemTopPX = this._startTop + deltaY;
        // Get the change in grid units from the change in pixels
        const deltaCols = Math.round(deltaX / this._fullColumnWidth);
        const deltaRows = Math.round(deltaY / this._fullRowHeight);
        // If change in grid units from both axis are 0, no need to go forward
        if (!deltaRows && !deltaCols) {
            return;
        }
        // Add the delta to the orginal, to get the new position
        let newPosX = this._startPosX + deltaCols;
        let newPosY = this._startPosY + deltaRows;
        // Positions have to stay within bounds
        newPosX = Math.max(0, newPosX);
        newPosY = Math.max(0, newPosY);
        newPosX = Math.min(this.columns - this.width, newPosX);
        fireEvent(this, "dragging", { newPosX, newPosY });
    }
    _dragEnd() {
        this._isDragging = false;
        this._startLeft = undefined;
        this._startTop = undefined;
        this._startPosX = undefined;
        this._startPosY = undefined;
        fireEvent(this, "dragEnd");
    }
    static get styles() {
        return css `
      .grid-item-wrapper {
        position: absolute;
        transition: var(--grid-item-transition, all 200ms);
        z-index: 2;
        opacity: 0;
      }

      .grid-item-wrapper.dragging {
        transition: none;
        z-index: 3;
        opacity: var(--grid-item-dragging-opacity, 0.8) !important;
      }

      .grid-item-wrapper.resizing {
        transition-property: transform;
        z-index: 3;
        opacity: var(--grid-item-resizing-opacity, 0.8) !important;
      }

      .grid-item-wrapper.finished {
        opacity: 1;
      }

      :host([placeholder]) .grid-item-wrapper {
        background-color: var(--placeholder-background-color, red);
        opacity: var(--placeholder-background-opacity, 0.2);
        z-index: 1;
      }

      lit-resizable {
        width: 100%;
        height: 100%;
      }
    `;
    }
};
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "width", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "height", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "posX", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "posY", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "rowHeight", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "columns", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "parentWidth", void 0);
__decorate([
    property({ type: Array })
], LitGridItem.prototype, "margin", void 0);
__decorate([
    property({ type: Array })
], LitGridItem.prototype, "containerPadding", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "minWidth", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "minHeight", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "maxWidth", void 0);
__decorate([
    property({ type: Number })
], LitGridItem.prototype, "maxHeight", void 0);
__decorate([
    property({ type: Boolean })
], LitGridItem.prototype, "isDraggable", void 0);
__decorate([
    property({ type: Boolean })
], LitGridItem.prototype, "isResizable", void 0);
__decorate([
    property({ type: Boolean })
], LitGridItem.prototype, "_isDragging", void 0);
__decorate([
    property({ type: Boolean })
], LitGridItem.prototype, "_isResizing", void 0);
__decorate([
    property({ type: Boolean })
], LitGridItem.prototype, "_firstLayoutFinished", void 0);
__decorate([
    property({ attribute: false })
], LitGridItem.prototype, "resizeHandle", void 0);
__decorate([
    property({ attribute: false })
], LitGridItem.prototype, "dragHandle", void 0);
__decorate([
    property()
], LitGridItem.prototype, "key", void 0);
__decorate([
    query(".grid-item-wrapper")
], LitGridItem.prototype, "gridItem", void 0);
__decorate([
    internalProperty()
], LitGridItem.prototype, "_itemTopPX", void 0);
__decorate([
    internalProperty()
], LitGridItem.prototype, "_itemLeftPX", void 0);
__decorate([
    internalProperty()
], LitGridItem.prototype, "_itemWidthPX", void 0);
__decorate([
    internalProperty()
], LitGridItem.prototype, "_itemHeightPX", void 0);
LitGridItem = __decorate([
    customElement("lit-grid-item")
], LitGridItem);
export { LitGridItem };
//# sourceMappingURL=lit-grid-item.js.map