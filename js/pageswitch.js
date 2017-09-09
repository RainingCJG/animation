(function($,window,document,undefined){
	"use strict";  //严格模式下执行
	
	//定义页面切换动画
	var pageswitch = (function(){
		function pageswitch(ele,options){
			this.$ele = ele;
			this.opts = $.extend({},pageswitch.DEFALUTS, options);
			this.move(); //页面切换
		};
		
		pageswitch.DEFALUTS = {
			duration:0,     //默认持续时间
			marginLeft:"-100%", //默认向左切换-100%大小
			callback:null  //回调函数
		};
	
		pageswitch.prototype = {
			//页面切换
			move:function(){
				var $ele =this.$ele,
				    opts = this.opts;
				var duration = opts.duration;
				$ele.animate({marginLeft:opts.marginLeft},duration,"linear",opts.callback);
			},
		};
		
		return pageswitch;
	})();
	
	$.fn.pageswitch = function(options){
		return this.each(function(){
			var $this = $(this);
			new pageswitch($this,options);
		});
	};

    //定义人物动画
	var person = (function(){
		var timer = null;  //定时器
		function person(ele,options){
			this.$ele = ele;
			this.opts = $.extend({},person.DEFALUTS,options);
			
			this.backgroundPosition(); //切换背景动画
			if(this.opts.walkDistance){
				this.walk();  //走路动画
			}
		};
		
		person.DEFALUTS = {
			bgNumber:0,    //默认背景图片帧数
			scale:{        //默认与屏幕比例大小
				x:[],
				y:[]
			},
			walkDistance: 0, //默认行走距离
			walkToStoreTime: 0, //默认走到商店时间
			stop:true,    //是否停下脚步
			rtframes:0,   //默认停下时背景图片帧数
			callback:null //回调函数
		};
		
		person.prototype = {
			//走路动画
			walk:function(){
				var $ele =this.$ele,
				    opts = this.opts;
				var distance = opts.walkDistance,
					walkToStoreTime = opts.walkToStoreTime;
					$ele.animate({left:distance},walkToStoreTime,"linear",opts.callback);
			},
		    //设置背景图片动画
		    backgroundPosition:function(){
		    	var $ele =this.$ele,
				    opts = this.opts;
				
				var len = opts.bgNumber,
					slen = opts.scale.x.length,
					index = 0,
					i = 0,
					positionx = 100/(len - 1);
				
				//存放背景定位位置数组
			    var offsetx=[],offsety=[];
			    for(var j=0;j<len;j++){
					offsetx[j] = positionx*j;
					offsety[j] = 0;
				}
				var scalex = opts.scale.x,
					scaley = opts.scale.y,
					frames = opts.rtframes;
			    
			    //背景图片动画
				var moving = function(){
					if(!opts.stop){//循环动画
						//缩放
						if(slen > 1 && i < slen){
							$ele.css({"width":scalex[i],"height":scaley[i]});
							i++;
							 for(var j=0;j<len;j++){
								offsetx[j] = positionx*j;
								offsety[j] = 0;
							}
						}
						//背景切换
						$ele.css({"background-position":offsetx[index]+"% "+offsety[index]+"%"});
				    	index ++;
				    	if(index >= len){
				    		index = 0;
				    	}
					}else{//动画暂停
						var numx = opts.rtframes - 1,
					   		numy = 0;
						if(!frames){
							numx = 0;
						}
						$ele.css({"background-position":offsetx[numx]+"% "+offsety[numy]+"%"});
						clearInterval(timer);
					}
					
				};

				clearInterval(timer);
				timer =  setInterval(moving,200);		
		  }
		};
		
		return person;
	})();
	
	$.fn.person = function(options){
		return this.each(function(){
			var $this = $(this);
			new person($this, options);
		});
	};
	
	//定义物体特征动画
	var setCharactor = (function(){
		function setCharactor(ele,options){
			this.$ele = ele;
			this.opts = $.extend({},setCharactor.DEFALUTS,options);
			this.linearMove();//物体移动动画
			this.rotate();   //背景图片循环切换动画
		};
		
		setCharactor.DEFALUTS = {
			translate:{x:"",y:""}, //默认移动到的x：left和y：top值
			moveTime:8000,  //默认移动持续时间
			rotateBegin:0,  //旋转开始背景图片帧数
			rotateTo:0,     //旋转结束背景图片帧数
			bgNumber:0      //背景图片帧数
		};
		
		setCharactor.prototype = {
			//物体移动动画
			linearMove:function(){
				var $ele =this.$ele,
				    opts = this.opts;
				var translatex = opts.translate.x,
					translatey = opts.translate.y,
					time = opts.moveTime;
				if(!translatex || !translatey){
					return;
				}else{
					$ele.animate({left:translatex,top:translatey},time,"linear");
				}
			},
			//背景图片循环切换动画
			rotate:function(){
				var $ele =this.$ele,
				    opts = this.opts;
				
				var begin = opts.rotateBegin,
					end = opts.rotateTo,
					len = opts.bgNumber,
					index = 0,
					positionx = 100/(len - 1), 
					offsetx = [];
				for(var j=0;j<len;j++){
					offsetx[j] = positionx*j;
				}
				
				if(!end){
					setInterval(function(){//背景图片循环切换动画
						$ele.css({"background-position":offsetx[index]+"% 0"});
				    	index ++;
				    	if(index >= len){
				    		index = 0;
				    	}
					},200);
				}else{//返回指定背景图片的帧数
					if(begin){
						index = begin - 1;
					}
					var time = setInterval(function(){
						$ele.css({"background-position":offsetx[index]+"% 0"});
				    	index ++;
				    	
				    	if(index == end){
				    		clearInterval(time);
				    	}
					},120)
				}
			}
		}
		return setCharactor;
	})();
	
	$.fn.setCharactor = function(scalex,scaley,options){
		return this.each(function(){
			var $this = $(this);
			
			new setCharactor($this,scalex,scaley,options);
		});
	}

})(jQuery,window,document);





