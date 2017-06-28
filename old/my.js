function load(){
	$(".option").click(function(event){
		$(".options").toggle()
		if (event.stopPropagation){ 
			event.stopPropagation(); 
		} else {
			event.cancelBubble = true;  
		} 
	})

	$("ul.options").on('click','li',function(){
		//$(".option").attr("value",this.firstChild);
		$(".option").val($(this).attr('val'));
		$(".options").toggle()
	})

	var date = new Date();
	var year = date.getFullYear() - 0;
	var month = date.getMonth() +1;
	var str = "";
	for(var i=0; i< 5; i++){
		/*str += "<li val=\"year-i\">"+(year-i)+"</li>"*/
		str += "<li val="+(year-i)+">"+(year-i)+"</li>"
	}
	$(".options").append(str);
	var result = [];
	for (var i=0; i < 5; i++) {
	    result.push(function () { return i });  // (*)
	}
	//关键字
	$('.keywords').on('click','.close',function(event){
		$(this).parent().remove()
	});
    $('#input').keydown(function(event) {
        if(event.keyCode == '13' || event.keyCode == '32') {
            var word = $('#input').val();
            if(word.trim()!= '') {
                var s = '<span class="word">'+ word +'<i class="close">x</i></span>';
                $(s).insertBefore($('#input'));
                $('#input').val('')
            }
        }
    });
    //新增标签
    var arr = ['erty','oopp'];
    for(var i=0, len = arr.length; i< len; i++ ) {
        var s = '<span class="word">'+ arr[i] +'<i class="close">x</i></span>';
        $(s).insertBefore($('#input'));
    }
    var a = [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47]
    var b = [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48];
    console.log(intersection(a,b));
    //
    $('#addTwo').click(function(){

    });
}
var result = [];
for (var i=0; i < 5; i++) {
    (function (i2) {
        result.push(function () { return i2 });
    }(i));  // 复制当前的i
}
//
/*var a = [{name:1,value:2},{name:3,value:4}];
var str="";
var arr =new Array();
for(var i=0; i<a.length; i++) {
	str = "{value"+"\:"+"\'"+a[i].value+"\'"+"\,"+"name:"+"\'"+a[i].name+"\'"+"}";
	arr.push(str);
}*/
/*var x = '\['+arr+'\]';
var data =eval('('+x+')');
document.getElementById('combo1')['u.Combo'].setComboData(data);*/
var isPalindrome = function(x) {
    if(x < 0) return false;
    if(x === 0) return true;
    var b = x.toString();
    var a =b.split('');
    var low=0,high=a.length-1;
    for(var i=0,len=a.length; i<len; i++ ) {
        while(low != high) {
            if(a[low] === a[high]) {
                low++;
                high--;
            }else {
                return false;
            }
        }
        
    }
    return true;
};

//c1
//c3//这个是develop
//这个是pp第一次提交
//Leecode
var hammingDistance = function(x, y) {
    
    var ban = x ^ y, res = 0;
    for (var i =0; i< 32; ++i ) {
        //得到的异或值右移位数，与1做和运算。
        res += (ban >> i) & 1;
    }
    return res;
};
//测试字符串i++和++i
var beforePlus = function() {
    for(var i = 0; i< 3; ++i) {
        console.log(i)
    }
    alert(i);
};
var afterPlus = function() {
    for(var i = 0; i< 3; i++) {
        console.log(i)
    }
    alert(i);
};
// leecode
var reverseWords = function() {
    s = "let's go home";
    var ns = s.split(' ');
    for(var i=0, len=ns.length; i<len; ++i) {
        ns[i] = ns[i].split('').reverse().join('');
    }
    return ns.join(' ');
};
//this对象
var globle = function() {
    var l = '1232';
    var obj = {
        l : 'new123',
        fun: {
            //l: 'fun123'
            sayHello: function() {
                console.log(this);
                return this.l
            }
        }
    }
    console.log(obj.fun.sayHello())//undifined 
    console.log(obj.fun.sayHello)//函数
    var test = obj.fun.sayHello;
    console.log(test());// 1232
};
//
var globle2 = function() {
    var name = 'window';
    var Tom = {
        name: 'Tom',
        show: function() {
            console.log(this.name);
        },
        wait: function() {
            var fun = this.show;
            fun();//函数调用，this指全局对象
        }
    };
    Tom.wait();//window//方法调用，指得是调用的对象
}
/**
 * 问题描述
 * 在String对象上定义一个repeatify函数，这个函数接受一个整数参数，来明确字符串需要重复几次，
 * 这个函数要求字符串重复指定的次数。比如‘abc’.repeatify(3);
 */
String.prototype.repeatify = function(number) {
    return this.repeat(number);
}
//数组去重
//js有5个迭代方法。
//some 根据表达式 返回TRUE false
//every 根据表达式 返回TRUE false
//map 返回新数组
//filter 返回新数组
//forEach 没有返回值
//
//查找数组元素位置 arr.indexOf(item)或者 arr.lastIndexOf(item)
var globle3 = function() {
    var arr = [1,2,2,1,4,5,6,5];
    //var arr = ['a','b','c','a','d','b','e','f','e'];
    arr.filter(function(item,index,arr){
        return (arr.indexOf(item) !== index);
    })
}
//102ms
// var intersection = function(nums1, nums2) {
//     if(nums1.length === 0 || nums2.length === 0) {
//         return [];
//     }
//     var nums11 = nums1.filter(function(item, index, array){
//         return (nums1.indexOf(item) === index);
//     })
//     var nums21 = nums2.filter(function(item, index, array){
//         return (nums2.indexOf(item) === index);
//     })
//     var a1 = nums11.concat(nums21);
//     console.log(a1);
//     var a2 = a1.filter(function(item, index, array){
//         return (a1.indexOf(item) !== index);
//     })
//     return a2;
// };

//将两个数组排序，然后根据长度 判断每个值的大小。以防有重复元素加入，再用一个变量把上次push进去的元素存起来，比较。
//108ms
var intersection = function(nums1, nums2) {
    var arr = [];
    if(nums1.length === 0 || nums2.length === 0) {
        return arr;
    }
    var temp, i = 0, j = 0;
    nums1 = nums1.sort(sortFunction);
    nums2 = nums2.sort(sortFunction);
    while(nums1.length > i && nums2.length > j) {
        if(nums1[i] == nums2[j]) {
            if(nums1[i] != temp) {
                arr.push(nums1[i]);
            }
            temp = nums1[i];
            i++;
            j++;
        } else if(nums1[i] > nums2[j]) {
            j++;
        } else {
            i++;
        }
    }
    return arr;
};
//升序排序
function sortFunction(a, b) {
    return a - b;
}
//降序排序
function sorFunction2(a, b) {
	return b - a;
}
//如果将排序方式写到一起
function sortAll(a, b) {
	if(a>b) {
		return 1;
	} else if(a<b) {
		return -1;
	} else {
		return 0;
	}
}
//用异或和与操作 进行数值+
var addTwo = function(a, b) {
    if(b==0) return a;
    var sum = a;
    var bit = b;
    while(bit) {
        var t = sum;
        sum = t^bit;
        //console.log(sum.toString(2));
        bit = (t&bit)<<1;
        //console.log((t&bit).toString(2));
    }
    return sum;
}