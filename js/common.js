// JavaScript Document

/*导航栏nav效果*/
$(function(){
	$('.nav>div>ul>li').hover(function(){
		$(this).children('ul').stop().slideDown('fast');
		$(this).children('a').eq(0).css('background','#375679');
		}, 
		function(){
			$(this).children('ul').stop().hide();
			$(this).children('a').eq(0).css('background','');
		})
});



/*点击右侧标题后，切换标题下内容的可见状态*/
$(function(){
	$('h4.green').click(function(){
	$(this).next().toggle();
	});
});



/*员工生活幻灯片效果 obj:对象，time:播放时间*/
function slidesFade(obj,time){
	//给对象添加css样式
	$("#"+obj).addClass('slidesFade');
	var $imgList = $("#"+obj+" img");
	var len=$imgList.length;
	$("#"+obj).append("<div></div>");
	var $imgBar=$("#"+obj+" div");
	for(var i=0;i<len;i++){
		$imgBar.append("<span></span>");
	}
	var $imagBar_span=$imgBar.children('span');
	var index = 0;
	var Timer = null;
	$imagBar_span.mouseover(function(){
		index = $imagBar_span.index(this);
		showSlides(index);
	}).eq(0).mouseover();
	
	$("#"+obj).hover(function(){
			if(Timer){ 
				clearInterval(Timer);
			}
		 },function(){
			Timer = setInterval(function(){
			    showSlides(index);
				index++;
				if(index==len){index=0;}
			} , time);
	}).trigger("mouseleave");
	
	function showSlides(index){
		$imgList.eq(index).stop(true,true).fadeIn().siblings('img').fadeOut();
		$("#"+obj+">span").eq(index).stop(true,true).fadeIn().siblings('span').fadeOut();
		$imagBar_span.removeClass('slides_active').eq(index).addClass('slides_active');
	}
}

/*社会责任幻灯片效果 obj:对象，time:播放时间*/
/*连续点击时有bug*/
function slidesSlide(obj,time){
	//给对象添加css样式
	$("#"+obj).addClass('slidesSlide');
	var $obj=$("#"+obj+">div");
	$obj.find('li').append("<div></div>");
	var Timer=time;
	var len=$obj.find('ul').length;
	var widthUL=$obj.children('ul').eq(0).width();
	var heightUL=$obj.children('ul').eq(0).height();
	var w=len*widthUL;
	$obj.width(w);
	//为在#obj外部添加左右按键，因为#obj已经设置了overflow:hidden
	$("#"+obj).wrap("<div id='slidesSlide_parent' style='position:relative;'></div>");
	var $obj_parent=$("#slidesSlide_parent");
	$obj_parent.append("<div id='click_prev' style='position:absolute;left:-27px;height:80px;width:25px;'title='上一个'></div>")
	.append("<div id='click_next' style='position:absolute;right:-17px;height:80px;width:25px;'title='下一个'></div>");
	var topclick=(heightUL-$('#click_prev').height())/2;
	$('#click_next').css("top",topclick);
	$('#click_prev').css("top",topclick);
	//这里直接用click也可以？连续多次点击有bug
	$('#click_next').on('click',
		function(){
				$obj.children('ul').eq(0).animate({"margin-left":"-"+widthUL},"slow",
					function(){
						$obj.append($obj.children('ul').eq(0).css("margin-left",0));	
					});
		}
	);
	$('#click_prev').click(
		function(){
			$obj.prepend($obj.children('ul').last().css("margin-left","-"+widthUL+"px"));
			$obj.children('ul').eq(0).animate({"margin-left":0},"slow");
		});
	
	var Timer = null;
	$obj_parent.hover(function(){
			if(Timer){ 
				clearInterval(Timer);
			}
		 },function(){
			Timer = setInterval(function(){
				//调用显示函数,以后再优化
				$obj.children('ul').eq(0).animate({"margin-left":"-"+widthUL},"slow",
						function(){
							$obj.append($obj.children('ul').eq(0).css("margin-left",0));	
						}
				);
			} , time);
	}).trigger("mouseleave");
	
	/*图片遮罩*/
	$("body").append("<div id='overlay'></div><div id='win'><h2><span>关闭</span></h2><img id='winimg'/></div>");
	$obj.find('li').click(function(){
		$("#overlay").css({
			"display": "block",
		});
		var newsrc =$(this).find('img').attr('src');
		$("#winimg").attr('src',newsrc);
		$("#win").css({
			"display": "block",
			"left":$(document).scrollLeft()+($(window).width()-$("#win").width())/2,
           	"top": $(document).scrollTop()+($(window).height()-$("#win").height())/2
		});
	});
	$("#overlay,#win span").click(closeOverlay);
	
	$("#win h2").mousedown(function(e){
		$(this).css("cursor","move");//改变鼠标指针的形状
		var offset = $(this).offset();//DIV在页面的位置  
       	var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离  
      	var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离  
		$(document).on("mousemove",function(ev){//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件    
			$("#win").stop();//加上这个之后  
			var _x = ev.pageX - x;//获得X轴方向移动的值  
			var _y = ev.pageY - y;//获得Y轴方向移动的值  
			$("#win").animate({left:_x+"px",top:_y+"px"},10);  
		}); 
	});
	$(document).mouseup(function(){  
		$("#win h2").css("cursor","default");  
		$(this).off("mousemove");  
	});
	
	$(document).keydown(function(e){ 	
		if(e.keyCode == 27){ // close
			closeOverlay();
		}
	});
	
	//关闭弹窗
	function closeOverlay(){
		$("#overlay").css({
		"display": "none"
		});
		$("#win").css({
			"display": "none"
		});
	}
}
/*社会责任幻灯片效果结束*/
