(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vega-util')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vega-util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vegaTooltip = {}, global.vega));
}(this, (function (exports, vegaUtil) { 'use strict';

  var name = "vega-tooltip";
  var version = "0.24.0";
  var description = "A tooltip plugin for Vega-Lite and Vega visualizations.";
  var keywords = [
  	"vega-lite",
  	"vega",
  	"tooltip"
  ];
  var repository = {
  	type: "git",
  	url: "https://github.com/vega/vega-tooltip.git"
  };
  var author = {
  	name: "UW Interactive Data Lab",
  	url: "https://idl.cs.washington.edu"
  };
  var collaborators = [
  	"Dominik Moritz",
  	"Sira Horradarn",
  	"Zening Qu",
  	"Kanit Wongsuphasawat",
  	"Yuri Astrakhan",
  	"Jeffrey Heer"
  ];
  var license = "BSD-3-Clause";
  var bugs = {
  	url: "https://github.com/vega/vega-tooltip/issues"
  };
  var homepage = "https://github.com/vega/vega-tooltip#readme";
  var main = "build/vega-tooltip.js";
  var module = "build/vega-tooltip.module.js";
  var unpkg = "build/vega-tooltip.min.js";
  var jsdelivr = "build/vega-tooltip.min.js";
  var types = "build/vega-tooltip.module.d.ts";
  var files = [
  	"src",
  	"build",
  	"types"
  ];
  var scripts = {
  	prebuild: "yarn clean && yarn build:style",
  	build: "rollup -c",
  	"build:style": "./build-style.sh",
  	clean: "rimraf build && rimraf src/style.ts",
  	"copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
  	"copy:build": "rsync -r build/* examples/build",
  	"deploy:gh": "yarn build && yarn copy:build && gh-pages -d examples && yarn clean",
  	prepublishOnly: "yarn clean && yarn build",
  	preversion: "yarn lint && yarn test",
  	serve: "browser-sync start -s -f build examples --serveStatic examples",
  	start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
  	pretest: "yarn build:style",
  	test: "beemo jest",
  	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
  	prepare: "beemo create-config",
  	prettierbase: "beemo prettier '*.{css,scss,html}'",
  	eslintbase: "beemo eslint .",
  	format: "yarn eslintbase --fix && yarn prettierbase --write",
  	lint: "yarn eslintbase && yarn prettierbase --check"
  };
  var devDependencies = {
  	"@rollup/plugin-json": "^4.1.0",
  	"@rollup/plugin-node-resolve": "^9.0.0",
  	"@wessberg/rollup-plugin-ts": "^1.3.4",
  	"browser-sync": "^2.26.12",
  	concurrently: "^5.3.0",
  	"gh-pages": "^3.1.0",
  	"node-sass": "^4.14.1",
  	path: "^0.12.7",
  	rollup: "^2.26.10",
  	"rollup-plugin-bundle-size": "^1.0.3",
  	"rollup-plugin-terser": "^7.0.2",
  	typescript: "~4.0.2",
  	"vega-datasets": "^2.1.0",
  	"vega-lite-dev-config": "^0.14.6",
  	"vega-typings": "^0.18.2"
  };
  var dependencies = {
  	"vega-util": "^1.15.1"
  };
  var beemo = {
  	module: "vega-lite-dev-config",
  	drivers: [
  		"typescript",
  		"prettier",
  		"eslint",
  		"babel",
  		"jest"
  	],
  	eslint: {
  		ignore: [
  			"types"
  		]
  	},
  	typescript: {
  		compilerOptions: {
  			typeRoots: [
  				"node_modules/@types",
  				"types"
  			]
  		}
  	}
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	keywords: keywords,
  	repository: repository,
  	author: author,
  	collaborators: collaborators,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	main: main,
  	module: module,
  	unpkg: unpkg,
  	jsdelivr: jsdelivr,
  	types: types,
  	files: files,
  	scripts: scripts,
  	devDependencies: devDependencies,
  	dependencies: dependencies,
  	beemo: beemo
  };

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  // generated with build-style.sh
  var defaultStyle = "#vg-tooltip-element {\n  visibility: hidden;\n  padding: 8px;\n  position: fixed;\n  z-index: 1000;\n  font-family: sans-serif;\n  font-size: 11px;\n  border-radius: 3px;\n  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);\n  /* The default theme is the light theme. */\n  background-color: rgba(255, 255, 255, 0.95);\n  border: 1px solid #d9d9d9;\n  color: black; }\n  #vg-tooltip-element.visible {\n    visibility: visible; }\n  #vg-tooltip-element h2 {\n    margin-top: 0;\n    margin-bottom: 10px;\n    font-size: 13px; }\n  #vg-tooltip-element img {\n    max-width: 200px;\n    max-height: 200px; }\n  #vg-tooltip-element table {\n    border-spacing: 0; }\n    #vg-tooltip-element table tr {\n      border: none; }\n      #vg-tooltip-element table tr td {\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-top: 2px;\n        padding-bottom: 2px; }\n        #vg-tooltip-element table tr td.key {\n          color: #808080;\n          max-width: 150px;\n          text-align: right;\n          padding-right: 4px; }\n        #vg-tooltip-element table tr td.value {\n          display: block;\n          max-width: 300px;\n          max-height: 7em;\n          text-align: left; }\n  #vg-tooltip-element.dark-theme {\n    background-color: rgba(32, 32, 32, 0.9);\n    border: 1px solid #f5f5f5;\n    color: white; }\n    #vg-tooltip-element.dark-theme td.key {\n      color: #bfbfbf; }\n";

  var EL_ID = 'vg-tooltip-element';
  var DEFAULT_OPTIONS = {
      /**
       * X offset.
       */
      offsetX: 10,
      /**
       * Y offset.
       */
      offsetY: 10,
      /**
       * ID of the tooltip element.
       */
      id: EL_ID,
      /**
       * ID of the tooltip CSS style.
       */
      styleId: 'vega-tooltip-style',
      /**
       * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
       *
       * There are two predefined themes: "light" (default) and "dark".
       */
      theme: 'light',
      /**
       * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
       */
      disableDefaultStyle: false,
      /**
       * HTML sanitizer function that removes dangerous HTML to prevent XSS.
       *
       * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
       */
      sanitize: escapeHTML,
      /**
       * The maximum recursion depth when printing objects in the tooltip.
       */
      maxDepth: 2
  };
  /**
   * Escape special HTML characters.
   *
   * @param value A value to convert to string and HTML-escape.
   */
  function escapeHTML(value) {
      return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }
  function createDefaultStyle(id) {
      // Just in case this id comes from a user, ensure these is no security issues
      if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
          throw new Error('Invalid HTML ID');
      }
      return defaultStyle.toString().replace(EL_ID, id);
  }

  /**
   * Format the value to be shown in the tooltip.
   *
   * @param value The value to show in the tooltip.
   * @param valueToHtml Function to convert a single cell value to an HTML string
   */
  function formatValue(value, valueToHtml, maxDepth) {
      if (vegaUtil.isArray(value)) {
          return "[" + value.map(function (v) { return valueToHtml(vegaUtil.isString(v) ? v : stringify(v, maxDepth)); }).join(', ') + "]";
      }
      if (vegaUtil.isObject(value)) {
          var content = '';
          var _a = value, title = _a.title, image = _a.image, rest = __rest(_a, ["title", "image"]);
          if (title) {
              content += "<h2>" + valueToHtml(title) + "</h2>";
          }
          if (image) {
              content += "<img src=\"" + valueToHtml(image) + "\">";
          }
          var keys = Object.keys(rest);
          if (keys.length > 0) {
              content += '<table>';
              for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                  var key = keys_1[_i];
                  var val = rest[key];
                  // ignore undefined properties
                  if (val === undefined) {
                      continue;
                  }
                  if (vegaUtil.isObject(val)) {
                      val = stringify(val, maxDepth);
                  }
                  content += "<tr><td class=\"key\">" + valueToHtml(key) + ":</td><td class=\"value\">" + valueToHtml(val) + "</td></tr>";
              }
              content += "</table>";
          }
          return content || '{}'; // show empty object if there are no properties
      }
      return valueToHtml(value);
  }
  function replacer(maxDepth) {
      var stack = [];
      return function (key, value) {
          if (typeof value !== 'object' || value === null) {
              return value;
          }
          var pos = stack.indexOf(this) + 1;
          stack.length = pos;
          if (stack.length > maxDepth) {
              return '[Object]';
          }
          if (stack.indexOf(value) >= 0) {
              return '[Circular]';
          }
          stack.push(value);
          return value;
      };
  }
  /**
   * Stringify any JS object to valid JSON
   */
  function stringify(obj, maxDepth) {
      return JSON.stringify(obj, replacer(maxDepth));
  }

  /**
   * Position the tooltip
   *
   * @param event The mouse event.
   * @param tooltipBox
   * @param offsetX Horizontal offset.
   * @param offsetY Vertical offset.
   */
  function calculatePosition(event, tooltipBox, offsetX, offsetY) {
      var x = event.clientX + offsetX;
      if (x + tooltipBox.width > window.innerWidth) {
          x = +event.clientX - offsetX - tooltipBox.width;
      }
      var y = event.clientY + offsetY;
      if (y + tooltipBox.height > window.innerHeight) {
          y = +event.clientY - offsetY - tooltipBox.height;
      }
      return { x: x, y: y };
  }

  /**
   * The tooltip handler class.
   */
  var Handler = /** @class */ (function () {
      /**
       * Create the tooltip handler and initialize the element and style.
       *
       * @param options Tooltip Options
       */
      function Handler(options) {
          this.options = __assign(__assign({}, DEFAULT_OPTIONS), options);
          var elementId = this.options.id;
          // bind this to call
          this.call = this.tooltipHandler.bind(this);
          // prepend a default stylesheet for tooltips to the head
          if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
              var style = document.createElement('style');
              style.setAttribute('id', this.options.styleId);
              style.innerHTML = createDefaultStyle(elementId);
              var head = document.head;
              if (head.childNodes.length > 0) {
                  head.insertBefore(style, head.childNodes[0]);
              }
              else {
                  head.appendChild(style);
              }
          }
          // append a div element that we use as a tooltip unless it already exists
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          this.el = document.getElementById(elementId);
          if (!this.el) {
              this.el = document.createElement('div');
              this.el.setAttribute('id', elementId);
              this.el.classList.add('vg-tooltip');
              document.body.appendChild(this.el);
          }
      }
      /**
       * The tooltip handler function.
       */
      Handler.prototype.tooltipHandler = function (handler, event, item, value) {
          // console.log(handler, event, item, value);
          // hide tooltip for null, undefined, or empty string values
          if (value == null || value === '') {
              this.el.classList.remove('visible', this.options.theme + "-theme");
              return;
          }
          // set the tooltip content
          this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
          // make the tooltip visible
          this.el.classList.add('visible', this.options.theme + "-theme");
          var _a = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY), x = _a.x, y = _a.y;
          this.el.setAttribute('style', "top: " + y + "px; left: " + x + "px");
      };
      return Handler;
  }());

  var version$1 = pkg.version;
  /**
   * Create a tooltip handler and register it with the provided view.
   *
   * @param view The Vega view.
   * @param opt Tooltip options.
   */
  function index (view, opt) {
      var handler = new Handler(opt);
      view.tooltip(handler.call).run();
      return handler;
  }

  exports.DEFAULT_OPTIONS = DEFAULT_OPTIONS;
  exports.Handler = Handler;
  exports.calculatePosition = calculatePosition;
  exports.createDefaultStyle = createDefaultStyle;
  exports.default = index;
  exports.escapeHTML = escapeHTML;
  exports.formatValue = formatValue;
  exports.replacer = replacer;
  exports.stringify = stringify;
  exports.version = version$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
