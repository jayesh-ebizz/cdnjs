/**
 * @license Highcharts JS v7.1.0 (2019-04-01)
 *
 * Advanced Highstock tools
 *
 * (c) 2010-2019 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/price-indicator', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'modules/price-indicator.src.js', [_modules['parts/Globals.js']], function (H) {
        /**
         * (c) 2009-2019 Sebastian Bochann
         *
         * Price indicator for Highcharts
         *
         * License: www.highcharts.com/license
         */

        var addEvent = H.addEvent,
            merge = H.merge,
            isArray = H.isArray;

        /**
         * The line marks the last price from visible range of points.
         *
         * @product   highstock
         * @sample {highstock} stock/indicators/last-visible-price
         *         Last visible price
         * @apioption   plotOptions.series.lastVisiblePrice
         */

        /**
         * Enable or disable the indicator.
         *
         * @type      {boolean}
         * @product   highstock
         * @default true
         * @apioption   plotOptions.series.lastVisiblePrice.enabled
         */

        /**
         * Enable or disable the label.
         *
         * @type      {boolean}
         * @product   highstock
         * @default true
         * @apioption   plotOptions.series.lastVisiblePrice.label.enabled
         *
         */

        /**
         * The line marks the last price from all points.
         *
         * @product   highstock
         * @sample {highstock} stock/indicators/last-price
         *         Last price
         * @apioption   plotOptions.series.lastPrice
         */

        /**
         * Enable or disable the indicator.
         *
         * @type      {boolean}
         * @product   highstock
         * @default true
         * @apioption   plotOptions.series.lastPrice.enabled
         */

        /**
         * The color of the line of last price.
         *
         * @type      {string}
         * @product   highstock
         * @default red
         * @apioption   plotOptions.series.lastPrice.color
         *
         */

        addEvent(H.Series, 'afterRender', function () {
            var serie = this,
                seriesOptions = serie.options,
                lastVisiblePrice = seriesOptions.lastVisiblePrice,
                lastPrice = seriesOptions.lastPrice;

            if ((lastVisiblePrice || lastPrice) &&
                    seriesOptions.id !== 'highcharts-navigator-series') {

                var xAxis = serie.xAxis,
                    yAxis = serie.yAxis,
                    origOptions = yAxis.crosshair,
                    origGraphic = yAxis.cross,
                    origLabel = yAxis.crossLabel,
                    points = serie.points,
                    x = serie.xData[serie.xData.length - 1],
                    y = serie.yData[serie.yData.length - 1],
                    lastPoint,
                    yValue,
                    crop;

                if (lastPrice && lastPrice.enabled) {

                    yAxis.crosshair = yAxis.options.crosshair = seriesOptions.lastPrice;

                    yAxis.cross = serie.lastPrice;
                    yValue = isArray(y) ? y[3] : y;

                    yAxis.drawCrosshair(null, {
                        x: x,
                        y: yValue,
                        plotX: xAxis.toPixels(x, true),
                        plotY: yAxis.toPixels(yValue, true)
                    });

                    // Save price
                    if (serie.yAxis.cross) {
                        serie.lastPrice = serie.yAxis.cross;
                        serie.lastPrice.y = yValue;
                    }
                }

                if (lastVisiblePrice &&
                    lastVisiblePrice.enabled &&
                    points.length > 0
                ) {

                    crop = points[points.length - 1].x === x ? 1 : 2;

                    yAxis.crosshair = yAxis.options.crosshair = merge({
                        color: 'transparent'
                    }, seriesOptions.lastVisiblePrice);

                    yAxis.cross = serie.lastVisiblePrice;
                    lastPoint = points[points.length - crop];
                    // Save price
                    yAxis.drawCrosshair(null, lastPoint);

                    if (yAxis.cross) {
                        serie.lastVisiblePrice = yAxis.cross;
                        serie.lastVisiblePrice.y = lastPoint.y;
                    }

                    if (serie.crossLabel) {
                        serie.crossLabel.destroy();
                    }

                    serie.crossLabel = yAxis.crossLabel;

                }

                // Restore crosshair:
                yAxis.crosshair = origOptions;
                yAxis.cross = origGraphic;
                yAxis.crossLabel = origLabel;

            }
        });

    });
    _registerModule(_modules, 'masters/modules/price-indicator.src.js', [], function () {


    });
}));