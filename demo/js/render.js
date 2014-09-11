/**
 * @file render.js
 * @author mengke01
 * @date 
 * @description
 * render 组件测试
 */

define(
    function(require) {

        var render = require('render/main');
        var shape_baidu = require('./shape-baidu');
        var shape_bdjk = require('./shape-bdjk');
        var glyfAdjust = require('ttf/util/glyfAdjust');
        var glyf2path = require('ttf/util/glyf2path');
        var lang = require('common/lang');

        var currentRender;

        var entry = {

            /**
             * 初始化
             */
            init: function () {
                currentRender = render.create($('#render-view').get(0));

                var cover = currentRender.addLayer('cover', {
                    level: 20
                });

                cover.options.fill = false;
                cover.options.strokeColor = 'green';

                cover.addShape('circle', {
                    x: 234,
                    y: 213,
                    r: 10
                });

                cover.addShape('circle', {
                    x: 55,
                    y: 464,
                    r: 10
                });

                cover.addShape('circle', {
                    x: 55,
                    y: 212,
                    r: 50
                });

                var shape1 = cover.addShape('rect', {
                    x: 55,
                    y: 464,
                    width: 30,
                    height: 32
                });

                var shape2 = cover.addShape('rect', {
                    x: 344,
                    y: 78,
                    width: 30,
                    height: 42
                });

                var font = currentRender.addLayer('font', {
                    level: 10
                });
                var scale = 200 / 512;
                shape_bdjk = glyfAdjust(shape_bdjk, scale, -shape_bdjk.xMin * scale, -shape_bdjk.yMin * scale);
                shape_bdjk.x = 444;
                shape_bdjk.y = 55;
                font.addShape('font', shape_bdjk);

                var pathPanel = currentRender.addLayer('path', {
                    level: 11,
                    stroke: false
                });

                var pathArray = glyf2path(shape_baidu);
                var computeBoundingBox = require('graphics/computeBoundingBox');
                var pathAdjust = require('render/util/pathAdjust');

                pathArray.forEach(function(path) {
                    var shape = {};
                    shape.points = path;
                    shape.points = pathAdjust(path, 1, 1, 100, 400);

                    pathPanel.addShape('path', shape);
                });
                
                currentRender.refresh();
            }
        };

        entry.init();
        
        return entry;
    }
);