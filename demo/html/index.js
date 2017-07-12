define(function (require, module, exports) {
    // 引入相关的功能插件或模块
    var html = require('text!./index.html');
    var styles = require('css!./index.css');
    require('css!/hrcloud/vendor/fullcalendar/fullcalendar.css');
    var tool = require('/hrcloud/util/hrTool.js');
    //require('/hrcloud/util/require-conf.js');
    require('fullcalendar');
    require('zh');
    var app;
    var viewModel = {
        //有无事项
        isItem: ko.observable(true),
        //默认日历选中的日期数组
        dates: ko.observableArray(),
        //获取被选中的数组
        modifDates: ko.observableArray(),
        //点击之后获取或者要取消的数组
        selectDates: ko.observableArray(),
        //转换之后的新数组
        newDates: ko.observableArray(),
        //左边树选中的事项 全局
        item_id: ko.observable(),
        //年月选择器 是否联动，初次选择不联动，自己发生变化才联动
        isYearMon: ko.observable(false),
        //下拉联动
        relateName: null,
        listData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                item_name: {
                    type: 'string',
                    notipFlag: true,
                    hasSuccess: true,
                    required: true
                },
                begindate: {
                    type: 'long',
                    required: true,
                    nullMsg: '开始日期不能为空！',
                    notipFlag: true
                },
                enddate: {
                    type: 'long',
                    required: true,
                    nullMsg: '结束日期不能为空！',
                    notipFlag: true
                },
                datebyweek: {
                    type: 'string'
                },
                datebymonth: {
                    type: 'string'
                },
                knowledge_id: {
                    type: 'string'
                },
                knowledge_name: {
                    type: 'string'
                },
                remark: {
                    type: 'string'
                }
            }
        }),
        relateData: new u.DataTable({
            meta: {
                id: {
                    type: 'string'
                },
                yearMonth: {
                    type: 'date'
                }
            }
        }),
        comboData: [],
        
        
        /**
         * 新增 首次加载 左树切换 就近原则选择月份进行显示（除了左右月份切换）
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        nearestOption: function (index) {
             viewModel.index = index;
             viewModel.listData.setRowSelect(index);
            
            //毫秒数
            var begintime = viewModel.listData.getValue('begindate'),
                begin = new Date(begintime),
                begin_year = begin.getFullYear(),
                begin_month = begin.getMonth() + 1,
                endtime = viewModel.listData.getValue('enddate'),
                end = new Date(endtime),
                end_year = end.getFullYear(),
                end_month = end.getMonth() + 1,
                nowdate = new Date(),
                now_year = nowdate.getFullYear(),
                now_month = nowdate.getMonth() + 1,
                //手动获取起始时间月份起始日期起始
                new_b = new Date(`${begin_year}\/${begin_month}\/01`).getTime() || begintime,
                new_e = new Date(`${end_year}\/${end_month}\/01`).getTime() || endtime,
                new_now = new Date(`${now_year}\/${now_month}\/01`).getTime() || nowdate.getTime(),
                //传参用的两个变量
                year, month;
            //现在当前时间在设置范围内
            if(new_now >= new_b && new_now <= new_e) {
                //除去所有禁止翻页
                if(new_now === new_b) {
                    //现在的时间等于起始时间，不允许向前翻页
                    year = begin_year;
                    month = begin_month;
                    viewModel.relateData.setValue('yearMonth', u.dateRender(begin,'YYYY-M'));
                    $('#calendar').fullCalendar('gotoDate', begin);
                } else if(new_now === new_e) {
                    //现在的时间等于结束时间，不允许向后翻页
                    year = end_year;
                    month = end_month;
                    viewModel.relateData.setValue('yearMonth', u.dateRender(end,'YYYY-M'));
                    $('#calendar').fullCalendar('gotoDate', end);
                } else {
                    year = now_year;
                    month = now_month;
                    viewModel.relateData.setValue('yearMonth', u.dateRender(nowdate,'YYYY-M'));
                    $('#calendar').fullCalendar('gotoDate', nowdate);
                }
            } else {
                //不在现在的范围内，起码不让朝前翻页
                viewModel.relateData.setValue('yearMonth', u.dateRender(begin,'YYYY-M'));
                $('#calendar').fullCalendar('gotoDate', begin);
                year = begin_year;
                month = begin_month;
            }
            
            viewModel.item_id = viewModel.listData.getValue('id');
            var arg = {
                'hrcal_id': viewModel.item_id,
                'year': year,
                'month': month
            };
            viewModel.setSelect(arg);
        },
        /**
         * 公共方法
         * [setSelect 左边树切换之后，右边日历被选中] 
         * @param {[type]} arg [description]
         */
        setSelect: function (arg) {
            //去除原本所有的颜色
            $(".bg-color").removeClass("bg-color");
            viewModel.dates([]);
            tool.showLoading();
            $.ajax({
                type: 'get',
                dataType: 'json',
                data: arg,
                url: hrPath + '/corehr/cal/queryTransactDate',
                success: function (res) {
                    tool.hideLoading();
                    //年月联动限制取消
                    viewModel.isYearMon(true);
                    if (res.statusCode == 200) {
                        var data = res.data.dates;
                        //res.data.itemname="test1";
                        //res.data.among = "among";
                        //viewModel.dates();
                        for (var i = 0, len = data.length; i < len; i++) {
                            var time = tool.formateDate(new Date(data[i]), 'yyyy-MM-dd');
                            viewModel.dates.push(time);
                        }
                        viewModel.setDayByData(viewModel.dates());
                        //
                        
                    } else if (res.statusCode == 300) {
//                      u.messageDialog({
//                          msg: res.message,
//                          title: "提示",
//                          btnText: "确定"
//                      });
                        tool.errorMessage(res.message, "提示");
                    }
                },
                error:function() {
                    tool.hideLoading();
                    tool.errorMessage('服务器错误，请稍后重试！', "提示");
                }
            });
        },
        /**
         * [createCalendar 创建日历，包括点击事件等等]
         * @return {[type]} [description]
         */
        createCalendar: function () {
            var calendar = $('#calendar').fullCalendar({
                header: false,
                firstDay: 0,
                dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
                weekMode: 'liquid',
                height: 300,
                fixedWeekCount: false,
                selectHelper: true
            });
        },
        /**
         * 修改日历的年月，前后翻页
         * @return {[type]} [description]
         */
        changeCal: function () {
            //var date0 = $('#calendar').fullCalendar('getDate'),
            //去除原来写的翻页限制
            var date0 = viewModel.relateData.getValue('yearMonth'),
                year = new Date(date0).getFullYear(),
                month = new Date(date0).getMonth() + 1,
                arg = {
                    'hrcal_id': viewModel.item_id,
                    'year': year,
                    'month': month
                };
            viewModel.setSelect(arg);
            //日历变动
            $('#calendar').fullCalendar('gotoDate', date0);
        },        
        
        /**
         * 根据已知数据选中日期,
         * @param {[array]} data ['2016-09-12','2016-09-11']
         */
        setDayByData: function (data) {
            //获取所有td
            var $arr = $('.fc-day-top,.fc-day');
            $.each($arr, function (k, v) {
                $.each(data, function (m, n) {
                    if ($(v).attr('data-date') == n) {
                        $(v).addClass('bg-color');
                    }
                });
            });
            // viewModel.hoverSOItem();
        },
        /**
         * 获取所有选中日期
         * @return {[type]} [description]
         */
        getAllData: function () {
            //获取所有td
            var $arr = $('.fc-day-top,.fc-day');
            //获取选中的td
            var dataArr = [];
            $.each($arr, function (k, v) {
                if ($(v).hasClass('bg-color')) {
                    dataArr.push($(v).attr('data-date'));
                }
            });
            return dataArr;
        },

        /*
         * 页面初始化
         */
        pageInit: function () {

            //清除联动
            if(viewModel.relateName) {
                viewModel.relateName.dispose();
            }
            if(viewModel.relateYearMon) {
                viewModel.relateYearMon.dispose();
            }
            viewModel.relateData.clear();
            viewModel.relateData.createEmptyRow();
            //联动下拉框
            viewModel.relateName = viewModel.relateData.ref('id').subscribe(function(value) {
                if(value) {
                    var b = viewModel.transformOption(value);
                    //禁止 年月选择器 联动
                    viewModel.isYearMon(false);
                    //选中日历
                    viewModel.nearestOption(b);
                    
                }
            });
            //联动年月选择器
            viewModel.relateYearMon = viewModel.relateData.ref('yearMonth').subscribe(function(value) {
                //首次选择下拉框之后给年月赋值，但是此时不需要年月联动。只有年月自己联动自己
                if(value && viewModel.isYearMon()) {
                    viewModel.changeCal();
                    //viewModel.nearestOption(viewModel.listData.getCurrentIndex());
                }
            });   
            
            app = u.createApp({
                el: '#main-cal',
                model: viewModel
            });
            viewModel.loadList();
        },
        /**
         * 根据id查找index
         */
        transformOption: function (id) {
            var opts = viewModel.listData.getSimpleData();
            if (opts) {
                var index;
                $.each(opts, function (k, v) {
                    if (v['id'] === id) {
                        index = k;
                        return false;
                    }
                });
                return index;
            }
        },
        /**
         * [loadList description] 初始加载
         * @return {[type]} [description]
         */
        loadList: function () {
            // tool.showLoading();
            // tool.getPromise(hrPath + '/corehr/cal/queryItemWeb', null).then(function(res1) {
            //     tool.hideLoading();
            //请求数据
            var obj = {
                url: hrPath + '/corehr/cal/queryItemWeb'
            };
            var successCallback = function (res1) {
                var data = res1.data, comb;
                //第一条显示
                if (data.length) {
                    $('.small-midTop').show();
                    $('#warn_image').hide();
                    //viewModel.isItem(true);
                    viewModel.comboData = [];
                    data.forEach(function(item){
                        var ii = {};
                        ii.value = item.id;
                        ii.name = item.item_name;
                        viewModel.comboData.push(ii);
                    });
                    for(var i=0;i<data.length;i++){

                        var showamong = tool.formateDate(new Date(data[i].begindate), 'M月d日')+" - "+tool.formateDate(new Date(data[i].enddate), 'M月d日');
                        data[i].showamong = showamong;
                    }
                    comb = document.getElementById('combo')['u.Combo'];
                    comb.setComboData(viewModel.comboData);
                    
                    viewModel.listData.setSimpleData(data);
                    comb.selectItem(0);
                    viewModel.relateData.setValue('id', data[0].id);
                } else {
                    $('.small-midTop').hide();
                    $("#emptyImage").hide();
                    $('#warn_image').show();
                }
                
             //});
            };
            viewModel.rewriteLoadingAjax(obj, successCallback);
        },
         /**
         *
         * @param obj {type:'get',dataType:'json',url:'sdsd',data:{id:'sds'}||null}
         * @param successCallback
         */
        rewriteLoadingAjax: function (obj, successCallback) {
            return function () {
                $("#LoadingImage").show();
                // $("#emptyImage").hide();
                // $('#warn_image').hide();
                $('#LoadingImage').parent().find('table tbody').hide();
                $.ajax({
                    type: obj.type || 'get',
                    dataType: obj.dataType || 'json',
                    url: obj.url,
                    data: obj.data || null,
                    success: function (res) {
                        // $('.small-midTop').show();
                        // $("#emptyImage").show();
                        $("#LoadingImage").hide();
                        $('#LoadingImage').parent().find('table tbody').show();
                        // $('#warn_image').show();
                        successCallback(res);
                    },
                    //timeout:3000,
                    error: function (e) {
                        if (e.status == 500 && e.responseText == 'Internal Server Error') {
                            $('.cal-explain').hide();
                            $('#emptyImage').show();
                            $('#emptyImage span').html('服务连接错误');
                            $('#emptyImage span').css({
                                'margin-left': '-46px'
                            });
                        }
                        $("#LoadingImage").hide();
                    }
                });
            }();
        },
        /**
         * hover事件所以就可以看见item
         */
        hoverSOItem: function() {
            $('.fc-view').on('mouseenter mouseleave', 'td.bg-color', function (event) {
                if (event.type === 'mouseenter') {
                    var _top_ = $(event.target).offset().top + $('#cshowhide .jianxian').height()/2,
                        _left_ = $(event.target).offset().left - ($('#cshowhide .discrib').width() - $(event.target).width()) / 2;
                    $('#cshowhide').show().offset({
                        "top" : _top_,
                        "left" : _left_
                    })
                } else if (event.type === 'mouseleave') {
                    $('#cshowhide').hide();
                }
            });
        }
       
    };

    return {
        init: function (content) {
            // 插入内容
            content.innerHTML = html;
            viewModel.createCalendar();
            viewModel.pageInit();
            
            viewModel.hoverSOItem();
        }
    };
});