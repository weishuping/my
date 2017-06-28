define(function(require, module, exports) {

    var html = require('text!./index.html');
    var viewModel = {
    	// getOptions: function(url, param) {
     //        return new Promise(function(resolve, reject) {
     //            var leftXData = [];
     //            var leftYData = [];
     //            var leftShadows = [];
     //            var rightData = [];
        		
     //    		$.get(url, param, function(res) {
     //                if (res.statusCode == 200) {
     //                    var maxValue = 0;
     //                    var length = 0;
     //                    res.data.entrydimi.forEach(function(item) {
     //                        leftXData.push(item.name);
     //                        leftYData.push(item.count);
     //                        length++;
     //                        maxValue = item.count <= maxValue ? maxValue : item.count;
     //                    });
     //                    if (maxValue == 0) {
     //                        maxValue = 1;
     //                    }
     //                    for (var i = 0; i < length; i++) {
     //                        leftShadows.push(maxValue);
     //                    }
     //                     resolve(viewModel.comboOption(leftXData, leftYData, leftShadows));
     //                } else {
     //                    reject({});
     //                }
     //            }, 'json');
     //        });
    	// },
        getOptions: function() {
            var leftXData = [];
            var leftYData = [];
            var leftShadows = [];
            var rightData = [];
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: hrPath + '/corehr/report/queryAgeEduStructure',
                success: function(res){
                    if (res.statusCode == 200) {
                        var maxValue = 0;
                        var length = 0;
                        res.data.entrydimi.forEach(function(item) {
                            leftXData.push(item.name);
                            leftYData.push(item.count);
                            length++;
                            maxValue = item.count <= maxValue ? maxValue : item.count;
                        });
                        if (maxValue == 0) {
                            maxValue = 1;
                        }
                        for (var i = 0; i < length; i++) {
                            leftShadows.push(maxValue);
                        }
                        viewModel.comboOption(leftXData, leftYData, leftShadows);
                    } else {
                        
                    }
                },
                error: function(res) {

                }
            });
        },
    	comboOption: function(leftXData, leftYData, leftShadows) {
            var left = echarts.init(document.getElementById('view-left'));
    		// var optionLeft = {
    		// 	title: {
    		// 		text: null
    		// 	},
    		// 	tooltip: {
    		// 		trigger: 'axis',
    		// 		axisPointer: {
    		// 			type: 'shadow'
    		// 		},
    		// 		formatter: '年龄范围：{b}<br/>人数:{c}'
    		// 	},
    		// 	grid: {
    		// 		left: '3%',
    		// 		right: '4%',
    		// 		bottom: '3%',
    		// 		containLabel: 'true'
    		// 	},
    		// 	//x
    		// 	xAxis: {
    		// 		type: 'category',
    		// 		data: leftXData,
    		// 		splitLine: {
    		// 			show: false
    		// 		},
    		// 		axisLine: {
    		// 			show: 'true',
    		// 			lineStyle: {
    		// 				color: '#ccc'
    		// 			}
    		// 		},
    		// 		axisTick: {
    		// 			show: false
    		// 		},
    		// 		axisLabel: {
    		// 			interval: 0,
    		// 			textStyel: {
    		// 				color: '#999'
    		// 			}
    		// 		}
    		// 	},
    		// 	//y
    		// 	yAxis: {
    		// 		tyep: 'value',
    		// 		splitLine: {
    		// 			show: false
    		// 		},
    		// 		axisLine: {
    		// 			true,
    		// 			lineStyle: {
    		// 				color: '#ccc'
    		// 			}
    		// 		},
    		// 		axisTick: {
    		// 			show: false
    		// 		},
    		// 		axisLabel: {
    		// 			textStyel: {
    		// 				color: '#999'
    		// 			}
    		// 		}
    		// 	},
    		// 	series: [{
    		// 		name: '年龄',
    		// 		type: 'bar',
    		// 		data: leftXData,
    		// 		barMaxWidth: 25,
    		// 		itemStyle: {
	     //                normal: {
	     //                    color: '#44bde4',
	     //                    label: {
	     //                        show: true,
	     //                        position: 'top',
	     //                        textStyle: {
	     //                            color: '#666'
	     //                        }
	     //                    }
	     //                }
	     //            }
    		// 	},{ // For shadow
      //                   type: 'bar',
      //                   itemStyle: {
      //                       normal: { color: 'rgba(0,0,0,0.05)' }
      //                   },
      //                   barGap: '-100%',
      //                   barCategoryGap: '40%',
      //                   barMaxWidth: 25,
      //                   //data: [500, 500, 500, 500, 500],
      //                   data: leftShadows,
      //                   animation: false
      //               }]
    		// };
            var optionLeft = {
            title: {
                text: null
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '年龄范围: {b}<br />人数: {c}'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                //data: ['0-25', '26-30', '31-45', '46-55', '56以上'],
                data: leftXData,
                splitLine: { //隐藏网格线
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    interval: 0,
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            series: [{
                name: '年龄',
                type: 'bar',
                //data: [480, 385, 342, 480, 205], // @1: data
                data: leftYData,
                barMaxWidth: 25,
                itemStyle: {
                    normal: {
                        color: '#44bde4',
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                color: '#666'
                            }
                        }
                    }
                }
            }, { // For shadow
                type: 'bar',
                itemStyle: {
                    normal: { color: 'rgba(0,0,0,0.05)' }
                },
                barGap: '-100%',
                barCategoryGap: '40%',
                barMaxWidth: 25,
                //data: [500, 500, 500, 500, 500],
                data: leftShadows,
                animation: false
            }]
        };
            left.setOption(optionLeft);
    	},
    	pageInit: function() {
            u.createApp({
                el: '#content',
                model: viewModel
            });
            viewModel.getOptions();
    		// var obj = {
    		// 	url: hrPath + '/corehr/report/queryAgeEduStructure',
	     //        domId: 'view-left',
	     //        param: ''
    		// }
    		// var left = echarts.init(document.getElementById(obj.domId));
    		// var chartPromise = viewModel.getOptions(obj.url).then({function(options){
    		// 	left.setOptions(options[0]);
    		// }});
    		// return {left: left}
            
    		
    	}
    	
    };
    return {
        init: function(content) {

            content.innerHTML = html;
            viewModel.pageInit();
        },
        HTML : html
    };
});