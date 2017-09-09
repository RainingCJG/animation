(function($){
	function PreLoad(imgs,options){
		this.imgs = (typeof imgs === "string")?[imgs]:imgs;  //图片数组或者字符串
		this.opts = $.extend({}, PreLoad.DEFAULTS , options); //传入参数覆盖默认参数
		
		if(this.opts.order === true){
			this._ordered();   //执行有序预加载
		}else{
			this._unordered(); //执行无序预加载
		}	
	}
	
	PreLoad.DEFAULTS = {
		each: null,   //每一张图片加载完成后执行
		all: null,     //所有图片加载完成后执行
		order: false, //默认为无序预加载
	};
	
	//无序预加载
	PreLoad.prototype._unordered = function(){
		var imgs = this.imgs,
		 	opts = this.opts;
		 	
		var count = 0,
			len = imgs.length; 	
	
		    
		$.each(imgs,function(i,src){
			if(typeof src != "string") return;
			var imgobj = new Image();
			//预加载事件
			$(imgobj).on("load error",function(){
				opts.each && opts.each(count);   //每一张图片加载完成后执行
				if(count >= len-1){
					opts.all && opts.all();  //所有图片已经加载完成执行
				}
				count++;
			});
			imgobj.src = src;
		})
	}
	//有序预加载
	PreLoad.prototype._ordered = function(){
		var imgs = this.imgs,
		    opts = this.opts;
		    
		var count = 0,
		    len = imgs.length; 	
		
		load();
		
		function load(){
			var imgobj = new Image();
			//预加载事件
			$(imgobj).on("load error",function(){
				opts.each && opts.each(count); //每一张图片加载完成后执行
				
				if(count >= len){
					opts.all && opts.all();  //所有图片已经加载完成执行
				}else{
					
					load();
				}
				count++;
			});
			imgobj.src = imgs[count];
		};
		
	}

	//导出api
	$.extend({
		preload: function(imgs,opts){
			new PreLoad(imgs,opts);
		}
	});
	
})(jQuery);
