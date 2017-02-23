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
		$(".option").html(this.firstChild);
		$(".options").toggle()
	})

	var date = new Date();
	var year = date.getFullYear() - 0;
	var month = date.getMonth() +1;
	var str = "";
	for(var i=0; i< 5; i++){
		/*str += "<li val=\"year-i\">"+(year-i)+"</li>"*/
		str += "<li>"+(year-i)+"</li>"
	}
	$(".options").append(str);
	var result = [];
	for (var i=0; i < 5; i++) {
	    result.push(function () { return i });  // (*)
	}
	//关键字
	$('.word').click(function(event){
		alert('hello');
	})
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
//isPalindrome(1221)
///*改派转发url*/
        ,flowForwardUrl=hrPath+"/ssc/task/reassignmentTask" 
/**
         * 选择转发用户后对话框中的转发按钮
         */
        forwardTo:function(){
            var o=this
                ,target = o.forwardTarget();
            if(target == null){
                u.messageDialog({msg: "请选择转发接收人", title: "提示", btnText: "确定"});
                return;
            }
            $.post(flowForwardUrl,{
                taskID:o.params.taskId,
                userID:target,
                comment:o.approveOpinion()
            },function() {
                u.messageDialog({msg: "转发完成", title: "提示", btnText: "确定哈哈"});
                o.back();
            });
            $("#forwardTaskDialog").modal('hide');
            //91,c4//第一次提交develop,pp已经有改动
        },
//c1
//c3//这个是develop