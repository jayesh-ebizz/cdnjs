/* Tabulator v4.9.0 (c) Oliver Folkerd */

var FrozenColumns = function FrozenColumns(table) {
	this.table = table; //hold Tabulator object
	this.leftColumns = [];
	this.rightColumns = [];
	this.leftMargin = 0;
	this.rightMargin = 0;
	this.rightPadding = 0;
	this.initializationMode = "left";
	this.active = false;
	this.scrollEndTimer = false;
};

//reset initial state
FrozenColumns.prototype.reset = function () {
	this.initializationMode = "left";
	this.leftColumns = [];
	this.rightColumns = [];
	this.leftMargin = 0;
	this.rightMargin = 0;
	this.rightMargin = 0;
	this.active = false;

	this.table.columnManager.headersElement.style.marginLeft = 0;
	this.table.columnManager.element.style.paddingRight = 0;
};

//initialize specific column
FrozenColumns.prototype.initializeColumn = function (column) {
	var config = { margin: 0, edge: false };

	if (!column.isGroup) {

		if (this.frozenCheck(column)) {

			config.position = this.initializationMode;

			if (this.initializationMode == "left") {
				this.leftColumns.push(column);
			} else {
				this.rightColumns.unshift(column);
			}

			this.active = true;

			column.modules.frozen = config;
		} else {
			this.initializationMode = "right";
		}
	}
};

FrozenColumns.prototype.frozenCheck = function (column) {
	var frozen = false;

	if (column.parent.isGroup && column.definition.frozen) {
		console.warn("Frozen Column Error - Parent column group must be frozen, not individual columns or sub column groups");
	}

	if (column.parent.isGroup) {
		return this.frozenCheck(column.parent);
	} else {
		return column.definition.frozen;
	}

	return frozen;
};

//quick layout to smooth horizontal scrolling
FrozenColumns.prototype.scrollHorizontal = function () {
	var _this = this;

	var rows;

	if (this.active) {
		clearTimeout(this.scrollEndTimer);

		//layout all rows after scroll is complete
		this.scrollEndTimer = setTimeout(function () {
			_this.layout();
		}, 100);

		rows = this.table.rowManager.getVisibleRows();

		this.calcMargins();

		this.layoutColumnPosition();

		this.layoutCalcRows();

		rows.forEach(function (row) {
			if (row.type === "row") {
				_this.layoutRow(row);
			}
		});

		this.table.rowManager.tableElement.style.marginRight = this.rightMargin;
	}
};

//calculate margins for rows
FrozenColumns.prototype.calcMargins = function () {
	this.leftMargin = this._calcSpace(this.leftColumns, this.leftColumns.length) + "px";
	this.table.columnManager.headersElement.style.marginLeft = this.leftMargin;

	this.rightMargin = this._calcSpace(this.rightColumns, this.rightColumns.length) + "px";
	this.table.columnManager.element.style.paddingRight = this.rightMargin;

	//calculate right frozen columns
	this.rightPadding = this.table.rowManager.element.clientWidth + this.table.columnManager.scrollLeft;
};

//layout calculation rows
FrozenColumns.prototype.layoutCalcRows = function () {
	if (this.table.modExists("columnCalcs")) {
		if (this.table.modules.columnCalcs.topInitialized && this.table.modules.columnCalcs.topRow) {
			this.layoutRow(this.table.modules.columnCalcs.topRow);
		}
		if (this.table.modules.columnCalcs.botInitialized && this.table.modules.columnCalcs.botRow) {
			this.layoutRow(this.table.modules.columnCalcs.botRow);
		}
	}
};

//calculate column positions and layout headers
FrozenColumns.prototype.layoutColumnPosition = function (allCells) {
	var _this2 = this;

	var leftParents = [];

	this.leftColumns.forEach(function (column, i) {
		column.modules.frozen.margin = _this2._calcSpace(_this2.leftColumns, i) + _this2.table.columnManager.scrollLeft + "px";

		if (i == _this2.leftColumns.length - 1) {
			column.modules.frozen.edge = true;
		} else {
			column.modules.frozen.edge = false;
		}

		if (column.parent.isGroup) {
			var parentEl = _this2.getColGroupParentElement(column);
			if (!leftParents.includes(parentEl)) {
				_this2.layoutElement(parentEl, column);
				leftParents.push(parentEl);
			}

			if (column.modules.frozen.edge) {
				parentEl.classList.add("tabulator-frozen-" + column.modules.frozen.position);
			}
		} else {
			_this2.layoutElement(column.getElement(), column);
		}

		if (allCells) {
			column.cells.forEach(function (cell) {
				_this2.layoutElement(cell.getElement(true), column);
			});
		}
	});

	this.rightColumns.forEach(function (column, i) {
		column.modules.frozen.margin = _this2.rightPadding - _this2._calcSpace(_this2.rightColumns, i + 1) + "px";

		if (i == _this2.rightColumns.length - 1) {
			column.modules.frozen.edge = true;
		} else {
			column.modules.frozen.edge = false;
		}

		if (column.parent.isGroup) {
			_this2.layoutElement(_this2.getColGroupParentElement(column), column);
		} else {
			_this2.layoutElement(column.getElement(), column);
		}

		if (allCells) {
			column.cells.forEach(function (cell) {
				_this2.layoutElement(cell.getElement(true), column);
			});
		}
	});
};

FrozenColumns.prototype.getColGroupParentElement = function (column) {
	return column.parent.isGroup ? this.getColGroupParentElement(column.parent) : column.getElement();
};

//layout columns appropropriatly
FrozenColumns.prototype.layout = function () {
	var self = this,
	    rightMargin = 0;

	if (self.active) {

		//calculate row padding
		this.calcMargins();

		// self.table.rowManager.activeRows.forEach(function(row){
		// 	self.layoutRow(row);
		// });

		// if(self.table.options.dataTree){
		self.table.rowManager.getDisplayRows().forEach(function (row) {
			if (row.type === "row") {
				self.layoutRow(row);
			}
		});
		// }

		this.layoutCalcRows();

		//calculate left columns
		this.layoutColumnPosition(true);

		// if(tableHolder.scrollHeight > tableHolder.clientHeight){
		// 	rightMargin -= tableHolder.offsetWidth - tableHolder.clientWidth;
		// }

		this.table.rowManager.tableElement.style.marginRight = this.rightMargin;
	}
};

FrozenColumns.prototype.layoutRow = function (row) {
	var _this3 = this;

	var rowEl = row.getElement();

	rowEl.style.paddingLeft = this.leftMargin;
	// rowEl.style.paddingRight = this.rightMargin + "px";

	this.leftColumns.forEach(function (column) {
		var cell = row.getCell(column);

		if (cell) {
			_this3.layoutElement(cell.getElement(true), column);
		}
	});

	this.rightColumns.forEach(function (column) {
		var cell = row.getCell(column);

		if (cell) {
			_this3.layoutElement(cell.getElement(true), column);
		}
	});
};

FrozenColumns.prototype.layoutElement = function (element, column) {

	if (column.modules.frozen) {
		element.style.position = "absolute";
		element.style.left = column.modules.frozen.margin;

		element.classList.add("tabulator-frozen");

		if (column.modules.frozen.edge) {
			element.classList.add("tabulator-frozen-" + column.modules.frozen.position);
		}
	}
};

FrozenColumns.prototype._calcSpace = function (columns, index) {
	var width = 0;

	for (var i = 0; i < index; i++) {
		if (columns[i].visible) {
			width += columns[i].getWidth();
		}
	}

	return width;
};

Tabulator.prototype.registerModule("frozenColumns", FrozenColumns);