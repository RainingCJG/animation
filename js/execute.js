$(window).ready(function(){
	var $container = $(".container"),  //主容器
		$page3 = $(".page3");          //页面三
	var $boy = $(".boy"),              //小男孩
	 	$girl = $(".girl")             //小女孩
	    $sun = $(".sun"),			   //太阳
	    $cloud1 = $(".cloud1"),        //云朵1
	    $cloud2 = $(".cloud2"),        //云朵2
	    $bird = $(".bird"),            //小鸟
	    $door = $(".door"),            //门
	    $halfdoor = $(".halfdoor"),    //半门
	    $doorLeft = $(".door-left"),   //左半门
	    $doorRight = $(".door-right"); //右半门
	    
	var $parent = $boy.parent();   //主屏幕
	
	//背景音乐
	function bgAudio(url,isloop){
		var audio = new Audio(url);
		audio.autoplay = true;
		audio.loop = isloop || false;
		audio.play();
		
		return {
			end : function(callback){ //音频执行完毕的回调函数
				audio.addEventListener("ended",function(){
					callback();
				},false)
			},
			getTime:function(pausetime){
				var t = setInterval(function(){ //播放到第几秒暂停
					var time = audio.currentTime;
					console.log(pausetime)
					if(time >= 12){
						audio.pause();
						clearInterval(t);
					}
				},1000);
			}
		}
	}
	
	//星星闪烁效果
	function star(){
		setInterval(function(){
			$stars = $(".star > li");
			$.each($stars,function(index){
				var nb = Math.random().toFixed(2),
				    $this = $(this);
				$this.animate({"opacity":nb + ""},1000);
			});
		},200);
	}
	
	//水波浪效果
	function water(){
		var $water1 = $(".water1"),
			$water2 = $(".water2"),
			$water3 = $(".water3"),
			$water4 = $(".water4");
		setInterval(function(){		
			$water2.animate({"left":"43%"},3000).animate({"left":"45%"},3000);
			$water4.animate({"left":"40%"},3000).animate({"left":"42%"},3000);
			$water1.animate({"left":"42%"},3000).animate({"left":"40%"},3000);
			$water3.animate({"left":"37%"},3000).animate({"left":"35%"},3000);
		},200);
	}

	//花的url
	var flowerurl = [
		"images/snowflake/snowflake1.png",
		"images/snowflake/snowflake2.png",
		"images/snowflake/snowflake3.png",
		"images/snowflake/snowflake4.png",
		"images/snowflake/snowflake5.png",
		"images/snowflake/snowflake6.png"
	];
	
	var timer = null; //撒花定时器
	    parentHeight = $page3.height();//页面三的高度
	
	//撒花效果
	function spillFlower(){
		//获取随机花瓣图片
		function getflowerImage(){
			return flowerurl[Math.floor(Math.random()*6)];
		}
		
		//创建一个花瓣对象
		function createflower(){
			var flowerimg = getflowerImage(),
				$flower = $("<div></div>");
				
			return $flower.css({
				"top":"-5%",
				"width": "3%",
				"height": "5%",
				"background":"url(" + flowerimg + ")",
				"backgroundSize":"cover"
			}).addClass("flower");
		}
		
		//撒花
		clearInterval(timer);
		timer = setInterval(function(){
			//按百分比来算
			var startLeft = Math.random()*100 - 10,
				startOpacity = 1,
				endTop = Math.random()*19.8 + 80.2,
				endLeft = startLeft + Math.random()*100,
				duration = Math.random()*5000 + 6000;
			
			//设置随机透明度
			var randomstart = Math.random();
			randomstart = randomstart < 0.5 ? startOpacity : randomstart;
			
			//创建一个花瓣对象
			var $flowerobj = createflower();
			
			//设置花瓣对象的起始位置
			$flowerobj.css({
				left: startLeft + "%",
				opacity: randomstart
			});
			
			//将花瓣对象加入容器
			$(".spillflower").append($flowerobj);
			
			//开始撒花
			$flowerobj.animate({left:endLeft + "%",top:endTop + "%",opacity:0.7},duration,function(){
				$(this).remove();
			});
		},150);
	};
	
	
	
	//动画过程
	function dating(){
	    //设置小男孩行走distance距离
		$boy.person({
			bgNumber:4, //背景图片帧数
			walkDistance: "50%", //小男孩行走距离
			walkToStoreTime: 3500, //行走时间
			stop:false          //是否停止走动
		});
		
		setTimeout(function(){
			//小男孩行走distance距离后切换第一张页面
			$container.pageswitch({marginLeft:"-100%",duration:6500,callback:function(){ 
				 	//走到商店门前停下
				 	//rtframes：停下时图片的帧数
				 	$boy.person({stop:true,bgNumber:4,rtframes:4});
					
					//小男孩走进商店
					setTimeout(function(){
						//开门
						$doorLeft.setCharactor({translate:{x:"-50%",y:"0"},moveTime:200});
						$doorRight.setCharactor({translate:{x:"100%",y:"0"},moveTime:200});
						//小男孩走进商店
						$boy.animate({left:"57%",top:"50%"},1000);
						//小男孩走进商店变化
						$boy.person({
							scale:{
								x:["10%","8%",0],
								y:["23%","15.3%",0]
							},
							bgNumber:4,
							stop:false
						});
						//灯亮
						$(".page2").addClass("preloadbg").fadeIn();
					},250)
					
					//小鸟飞出
					$bird.setCharactor({translate:{x:"48%",y:"10%"},moveTime:8000,bgNumber:3});
					
					//小男孩从商店走出
					setTimeout(function(){
						//顶灭
						$(".page2").removeClass("preloadbg");
						//小男孩拿着鲜花
						$boy.addClass("boy-bg").fadeIn();
						//门关
						$doorLeft.setCharactor({translate:{x:"0",y:"0"},moveTime:1000});
						$doorRight.setCharactor({translate:{x:"50%",y:"0"},moveTime:1000});
						//小男孩从商店走出
						$boy.animate({left:"54%",top:"54%"},600);
						//走出商店变化
						$boy.person({
							scale:{
								x:["0","8%","10%"],
								y:["0","15.3%","23%"]
							},
							bgNumber:4,
							stop:false
						});
					},1200);
					
					//男女孩在桥上相见
					setTimeout(function(){
						//切换第二张页面
						$container.pageswitch({marginLeft:"-200%",duration:6500});
						//小男孩往前走到距离屏幕左边15%距离
						$boy.animate({left:"15%",top:"54%"},6500);
						setTimeout(function(){
							//小男孩往前走到桥下以及桥上
							$boy.animate({left:"35%",top:"49%"},2000,"linear").animate({left:"40%",top:"49%"},1000,"linear",function(){
								//小男孩停下
								$boy.person({stop:true,bgNumber:6,rtframes:3});
								//给花
								setTimeout(function(){
									$boy.addClass('boy-rotate').fadeIn();
								},200);
								//男女孩转身
								setTimeout(function(){
									$boy.setCharactor({rotateBegin:3,rotateTo:6,bgNumber:6});
									$girl.setCharactor({rotateBegin:2,rotateTo:6,bgNumber:7});
								},1000);
								//撒花
								setTimeout(function(){
									spillFlower();
								},1600)
							});
						},6000);
					},1700);
				}
			});
		},3400);
		
		//小女孩开始背景帧数
		$girl.setCharactor({rotateBegin:2,rotateTo:2,bgNumber:7});
		//云朵1移动
		$cloud1.setCharactor({translate:{x:"60%",y:"15%"},moveTime:12000});
		//云朵2移动
		$cloud2.setCharactor({translate:{x:"60%",y:"0%"},moveTime:12000});
		//太阳移动
		$sun.setCharactor({translate:{x:"-10%",y:"20%"},moveTime:8000});
	};
	
	//动画执行过程
	dating();
	//星星闪动
	star();
	//水波飘荡
	water();
	//执行音频播放
	bgAudio("music/happy.wav"); 
})