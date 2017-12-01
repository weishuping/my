//写jQuey插件时需要注意的三点：
//避免全局依赖
//避免第三方依赖
//兼容jQuery操作符$和jQuery

//代码格式 需要使用闭包

// (function($) {
//     //内部代码
//     $.fn.userInfo = function(options) {
//         var dft = {
//             name: 'wwww',
//             email: '11111@123.com',
//             size: '14px',
//             align: 'center'
//         };
//         var opt = $.extend(dft, options); // 扩展方法，将options扩展到dft，最后赋给opt
//         var style = 'style="font-size:' + opt.size + ';text-align:' + opt.align + ';"'; //默认样式
//         var name = '<p ' + style + '>name:<a target="_blank" >' + opt.name + '</a></p>';
//         var email = '<p ' + style + '> email:<a target = "_blank">' + opt.email + '</a></p>';
//         $(this).append(name);
//         $(this).append(email);
//     }
// })(window.jQuery)
//但是上述方式不能满足性能和链式操作。所以把当前对象return回去，这样返回的又是jQueryUI小
// (function($) {
//     //内部代码
//     $.fn.userInfo = function(options) {
//         var dft = {
//             name: 'wwww',
//             email: '11111@123.com',
//             size: '14px',
//             align: 'center'
//         };
//         var opt = $.extend(dft, options); // 扩展方法，将options扩展到dft，最后赋给opt
//         var style = 'style="font-size:' + opt.size + ';text-align:' + opt.align + ';"'; //默认样式
//         var name = '<p ' + style + '>name:<a target="_blank" >' + opt.name + '</a></p>';
//         var email = '<p ' + style + '> email:<a target = "_blank">' + opt.email + '</a></p>';
//         $(this).append(name);
//         $(this).append(email);
//         return this;
//     }
// })(window.jQuery)
(function($, window) {
    var opt, tableC;
    tableC = (function() {
        tableC.prototype.defaults = { fixedColumns: 0 };

        function tableC($table, options) {
            this.options = $.extend({}, this.defaults, options);
            this.$table = $table;
            this.tableId = this.$table.data('tid');
            this.fixedAndResized();
        }
        tableC.prototype.fixedAndResized = function() {
            var size = this.options.size,
                otherLength = this.$table.find('th').length,
                trLength = this.$table.find('tbody').find('tr').length;
            //将固定列 absolute，再将每个的left按照宽度定好，上下padding
            for (var i = 0; i < size; i++) {
                this.$table.find('th').eq(i).addClass('fixedColumns');
                this.$table.find('th').eq(i).attr('width', this.options.fixWidth);
                var height = $('thead').height(),
                    padding = ((height - this.options.fontSize) / 2).toFixed(1) - 0;
                this.$table.find('th').eq(i).css({ 'left': (i * this.options.fixWidth) + 'px', 'paddingTop': padding, 'paddingBottom': padding });
                //表体 固定列
                for (var ii = 0; ii < trLength; ii++) {

                    this.$table.find('tbody').find('tr').eq(ii).find('td').eq(i).css({ 'left': (i * this.options.fixWidth) + 'px', 'paddingTop': padding, 'paddingBottom': padding });
                    this.$table.find('tbody').find('tr').eq(ii).find('td').eq(i).addClass('fixedColumns');

                }

                // this.$table.find('th').eq(i).attr('width', this.options.width);
            }
            //将可拖动列按照 自定义宽度显示
            for (var j = size; j < otherLength; j++) {
                //固定列的最后一个做特殊处理，否则，后面不固定的会挤上来
                if (i === size) {
                    this.$table.find('th').eq(i).css({ 'paddingLeft': (i * this.options.fixWidth) + 'px' });
                    this.$table.find('th').eq(i).attr('width', this.options.reWidth + (i * this.options.fixWidth));
                    //表体
                    for (var ii = 0; ii < trLength; ii++) {
                        this.$table.find('tbody').find('tr').eq(ii).find('td').eq(i).css({ 'paddingLeft': (i * this.options.fixWidth) + 'px' });
                        this.$table.find('tbody').find('tr').eq(ii).find('td').eq(i).attr('width', this.options.reWidth + (i * this.options.fixWidth));
                    }
                }
                this.$table.find('th').eq(j).attr('width', this.options.reWidth);

            }
        }
        return tableC;
    })();

    return $.fn.extend({

        tableC: function() {
            var option;
            option = arguments[0];
            return this.each(function() {
                var $table, data;
                $table = $(this);
                data = $table.data('tid');
                if (!data) { $table.data('fixedAndResized', (data = new tableC($table, option))); }
            });
        }

    });
})(window.jQuery, window);