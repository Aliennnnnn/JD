/*
* @Author: Administrator
* @Date:   2016-11-25 16:13:47
* @Last Modified by:   Administrator
* @Last Modified time: 2016-12-06 21:15:25
*/

'use strict';
$(function(){
	//下拉-收回
	dropdown($('.address'),$('.add_dropdown'));	
	dropdown($('.mine_jd'),$('.mine_dropdown'));	
	dropdown($('.service'),$('.ser_dropdown'));	
	dropdown($('.nav_nav'),$('.nav_dropdown'));	
	dropdown($('.address'),$('.add_dropdown'));
	dropdown($('.cart'),$('.cart_dropdown'));

	//轮播图
	carousel();

	//选项卡切换
	handover();

	//图片上下移动
	moveUD($('.sk_item_pic_lk'));

	//图片左右移动
	moveLR($('.moveLR'));

	ho($('.top_tab_head'));

	//顶部下拉搜索框
	topSearch($('.search_fix'));

	//左侧定位导航栏
	posNav($('.left_nav'));
});


//鼠标悬浮下拉函数-移出收回函数
function dropdown(e1,e2){
	$(e1).hover(
		function(){
			$(e2).css({
				'position':'absolute',
				'z-index':'99'
			});
			$(e2).css({'display':'block'});
		},
		function(){
			$(e2).css({'display':'none'});
		}	
	)
}

//轮播函数
function carousel(){
	var i = 0;
	var len = $('.slider_list li').length;
	//将第一张图片复制粘贴到图片队列最后
	var clone = $('.carousel li').first().clone();
	$('.slider_list').append(clone);

	//点击prev按钮的函数
	$('.carousel .prev').click(function(){
		i--;	
		if(i == -1){
			i = len;
			$('.carousel .slider_list').css({
				'left': i*(-790)+'px'
			})
			i--;
		}	
		$('.carousel .slider_list').stop().animate({
			'left': i*(-790)+'px'
		},500)		
		$('.slider_dot').eq(i).addClass('active').siblings().removeClass('active')
	})
	
	$('.carousel .next').click(function(){
		moveR();
	});

	//点击next按钮的函数
	function moveR(){
		i++;
		if(i == len+1){
			$('.carousel .slider_list').css({
				'left':'0'
			})	
			i = 1;
		}
		$('.carousel .slider_list').stop().animate({
			'left': i*(-790)+'px'
		},500)
		if( i == len ){
			$('.slider_dot').eq(0).addClass('active').siblings().removeClass('active');
		}else{
			$('.slider_dot').eq(i).addClass('active').siblings().removeClass('active');
		}
		
	}

	//自动播放
	var timer = setInterval(function(){
		moveR();
	},2500)

	//鼠标悬浮在图片上停止自动播放
	$('.slider_list').hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(function(){
			moveR();
		},2500)
	})

	//鼠标悬浮在圆点上自动切换
	$('.slider_dot').mouseover(function(){
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		$('.slider_list').stop().animate({
			'left':-index*790 + 'px'
		})
		i = index;
	});
}

//选项卡切换函数
function handover(){
	$('.side_mes_tab1').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab_content1').addClass('active').siblings().removeClass('active');
	});
	$('.side_mes_tab2').mouseover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tab_content2').addClass('active').siblings().removeClass('active');
	});
}

//图片上下移动函数--可用CSS3transition完成
function moveUD(e1){	
	$(e1).hover(
		function(){
			var pic = $(this).find('img')
			$(pic).stop().animate({
				'top':'-7px'
			},350);
		},
		function(){
			var pic = $(this).find('img')
			$(pic).stop().animate({
				'top':'0px'
			},350);
		}
	)
}

//图片左右移动函数--可用CSS3transition完成
function moveLR(e1){
	var l;	
	$(e1).hover(
		function(){
			var pic = $(this).find('img');
			var l1 = pic.position().left;
			l = l1;
			$(pic).css({
				'position':'absolute'
			})
			$(pic).stop().animate({
				'left': (-6+l1)+'px'
			},400);
		},
		function(){
			var pic = $(this).find('img');

			$(pic).stop().animate({
				'left': l+'px'
			},400);
		}
	)
}

//滑动选项卡切换
function ho(e1){
	var op =  $(e1).find('.top_tab_head_item');
	op.mouseover(function(){
		var index = $(this).index();
		e1.find('.top_tab_active').stop().animate({
			'left':5+index*74+'px'
		},350);
		e1.siblings('.top_tab_content').children().eq(index).addClass('top_tab_content_item_on')
			.siblings().removeClass('top_tab_content_item_on')
	});
}

//下拉顶部搜索栏
function topSearch(e1){
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		var aimTop = 670;
		if (top>aimTop) {
			e1.slideDown(350);
		} else{
			e1.css({
				'display':'none'
			})
		}
	});
}

//左侧定位导航栏
function posNav(e1){
	$(window).scroll(function(){
		var aimTop = 1560;
		var top = $(document).scrollTop();
		if (top>aimTop) {
			e1.fadeIn('fast');
		} else{
			e1.fadeOut('fast');
		}
		var menu = $('.left_nav_list');
		var items = $('.J_f_lift');
		var currentId = ""; //当前所在楼层的Id

		items.each(function(){
			var itemTop = $(this).offset().top-50;
			if (top > itemTop) {
				currentId = '"#'+$(this).attr("id")+'"';
			}else{
				return false;
			}
		});

		//给相应的楼层设置class
		var currentLink = menu.find('.left_nav_item_act');
		if (currentId && currentLink.attr("href") != currentId) {
			currentLink.removeClass('left_nav_item_act');
			menu.find('[href='+currentId+']').parent('.left_nav_item').addClass('left_nav_item_act');
		}

	})
}




