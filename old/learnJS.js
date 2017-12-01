/*var person = {
	name: 'xx',
	birth: 1993,
	age: function() {
		var nyear = (new Date()).getFullYear();
		return nyear - this.birth;
	}
}*/
/*'use strict'
//在非严格模式下，this指向了window，所以返回NAN； 在严格模式下，this指向undefined
var person = {
    name: 'xx',
    birth: 1993,
    age: function() {
        function getAge() {
            var nyear = new Date().getFullYear();
            console.log(nyear - this.birth);
            return nyear - this.birth;
        }
        return getAge();
    }
}
person.age();*/
//用that捕获this

/*var person = {
    name: 'xx',
    birth: 1993,
    age: function() {
    	var that = this;
        function getAge() {
            var nyear = new Date().getFullYear();
            console.log(nyear - that.birth);
            return nyear - that.birth;
        }
        return getAge();
    }
}
person.age();*/

//用apply方法修正this指向的对象

/*var person = {
	name: 'xx',
	birth: 1993,
	age: getAge
};
function getAge() {
	var nyear = (new Date()).getFullYear();
	console.log(nyear - this.birth);
	return nyear - this.birth;
}
person.age();//24
getAge.apply(person,[]);//24*/

//类似的还有call，不过他的参数是按照顺序传； apply是封装成数组传递
//对于普通函数的调用，把this绑定为null
//高阶函数，接受别的函数作为函数的参数
//map () 
//例如把数字转换为字符串
//arr.map(String)
//reduce()
//接受两个参数，把结果和下一次结果做运算
//arr.reduce(function (x,y ){
//retun x+y});
/*把一个字符串转换为数字，不用parseInt和Number
var a = s.split("");
var arr = a.map(function(x){
    return x - 0;
})
return arr.reduce(function(x,y) {
return x*10 +y;
})
 */
/*var arr = ['Adam', 'Lisa', 'Bart']
function toUp(arr) {
	return arr.map(function(x) {
      return x.charAt(0).toUpperCase()+ x.slice(1).toLowerCase();
    })
}
toUp(arr);*/
var arr = [1, 2, 3, 4, 5, 7, 11, 13];
// arr.filter(function(elem) {
// 	var flag = true ;
//        if(elem<2){
//        	flag = false;
// 		}else {
// 			for(var i=2; i<=Math.sqrt(elem);i++) {
// 				if(elem%i == 0) {
// 					flag = false;
// 					break;
// 				}
// 			}
// 		}
// 		console.log(flag)
// 		return flag;
// })
/*arr.filter(function(elem,index,self) {
	var flag = true;
       if(elem<2){
       	flag = false;
		}else {
			for(var i=2; i<Math.sqrt(elem);i++) {
				if(elem%i == 0) {
					flag = false;
					break;
				}else {
					flag = true;
				}
			}
		}
		console.log(flag)
		return flag;
});*/
//闭包自增
/*function idAdd(z) {
	var z = 0||z;
	return function add() {
		z++;
		return z;
	}
}*/
//调用
//var ids = idAdd(0);
//ids()//1
//ods()//2
//生成器generater自增
/*
function idAdd() {
	var i =1;
	while(true){
		yield i;
		i++
	}
}
 */
/*var re = /^[\w.]+@\w+\.\w+$/;*/
/*var re = /^[\w.]+@\w+\.\w+(\.\w{2,5})*$/;
var
    i,
    success = true,
    should_pass = ['someone@gmail.com', 'bill.gates@microsoft.com', 'tom@voyager.org', 'bob2015@163.com'],
    should_fail = ['test#gmail.com', 'bill@microsoft', 'bill%gates@ms.com', '@voyager.org'];
for (i = 0; i < should_pass.length; i++) {
    if (!re.test(should_pass[i])) {
        alert('测试失败: ' + should_pass[i]);
        success = false;
        break;
    }
}
for (i = 0; i < should_fail.length; i++) {
    if (re.test(should_fail[i])) {
        alert('测试失败: ' + should_fail[i]);
        success = false;
        break;
    }
}
if (success) {
    alert('测试通过!');
}*/
//面向对象编程
//Object.create()方法可以传入一个原型对象，并创建一个基于该原型的新对象，但是新对象什么属性都没有，因此，
//我们可以编写一个函数来创建xiaoming:
////原型对象
/*var Student = {
	name: 'Robot',
	height: '1.2',
	run: function() {
		console.log(this.name + 'is running...');
	}
};
function createStudent(name) {
	var s = Object.create(Student);
	s.name = name;
	return s;
}
//创建基于原型的对象
var xiaoming = createStudent('sam');
xiaoming.run();*/
/*Student 构造函数*/
// function Student(props) {
// 	this.name = props.name;
// 	this.x = props.x;
// }
// Student.prototype.hello = function() {
// 	console.log(this.name)
// 	alert(this.name);
// }
/*基于Student扩展primaryStudent 构造函数*/
/*function PrimaryStudent(props) {
	Student.call(this, props);
	this.grade = props.grade || 1;
}
//形成一个继承关系
//空函数
function F(){}
F.prototype = Student.prototype;
PrimaryStudent.prototype = new F();
PrimaryStudent.prototype.constructor = PrimaryStudent;
PrimaryStudent.prototype.getGrade = function() {
	console.log(this.grade);
	return this.grade;
}
var xiaoming = new PrimaryStudent({
	name: 'x小米',
	grade: '123'
});
xiaoming.hello();
xiaoming.getGrade(0);*/