/*活换灯片效果 obj:对象，time:播放时间*/
function slidesFadeImg(obj,time){
	//给对象添加css样式
	$("#"+obj).addClass('slidesFadeImg');
	var $imgList = $("#"+obj+">a>img");
	var len=$imgList.length;
	var $imgBar=$("#"+obj+">div>div>div");
	var $imgBar_a=$imgBar.children('a');
	var index = 0;
	var Timer = null;
	$imgBar_a.mouseover(function(){
		index = $imgBar_a.index(this);
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
		var newhref = $imgBar_a.eq(index).attr("href");
		$("#"+obj+">a").attr("href",newhref);
		$imgList.eq(index).stop(true,true).fadeIn().siblings('img').fadeOut();
		$imgBar_a.removeClass('slides_active').css("opacity","0.7")
				 .eq(index).addClass('slides_active').css("opacity","1");	
		var w=0;
		for(var j=0;j<len;j++){
			w+=$imgBar_a.eq(j).width();
		}
		$imgBar.css("margin-left",(990-w)/2);
	}
}


//显示企业文化内容
$(function(){
	var $tabs=$('.main_c2_tab>span');
	var index=0;
	$tabs.hover(function(){
			 $(this).addClass("tab_active")
			 .siblings().removeClass("tab_active");
		var index=$tabs.index(this);
		$("div.main_c2 dl")
			.eq(index).show()
			.siblings().hide();
		}
	).eq(0).hover();
});