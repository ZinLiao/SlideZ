/*
 * slideZ 0.1
 * Copyright (c) 2016 Zin Leo http://ZinLeo.sinaapp.com/
 * Date: 2016.5.4
 *  1、无缝轮播
 *  2、可自定义轮播速度、是否自动播放、是否显示左右控制按钮、是否显示底部小圆点控制按钮
 *  3、适用于PC端非全屏宽轮播的需求
 *  4、兼容IE8+，若不需要底部小圆点控制按钮，可支持IE6+
 */

(function ($) {
    $.fn.slideZ = function (options) {
        //设置默认属性
        var defaults = {
            speed: 600,
            autoPlay: true,
            beginTime: 3000,
            haveBtn: true,
            haveCircle: false
        };

        //获取目标元素及其属性
        var ul = this.find(".slide_img");
        ul.append(ul.find("li").eq(0).clone());
        var btnL = this.find(".btn_l");
        var btnR = this.find(".btn_r");
        var length = ul.find("li").length;
        var imgWidth = ul.find("li").eq(0).find("img").eq(0).width();
        var timer;
        var index = 0;
        var i = 0;
        var circleStr = "<ul class='slide_circle'>";
        var circle = "";

        //合并自定义属性与默认属性
        var opt = $.extend(defaults, options);

        //插件功能实现代码
        this.each(function () {
            //是否有小圆点控制
            if(opt.haveCircle){

                //动态生成小圆点
                for(; i < length-1 ; i++){
                    circleStr += "<li></li>";
                }
                circleStr += "</ul>";
                $(this).append(circleStr);
                circle = $(this).find(".slide_circle");
                circle.find("li").eq(index).addClass("on");

                circle.find("li").on("click",function(){
                    var e = $(this).index();
                    index = e;
                    ul.stop().animate({
                        left: -index * imgWidth + 'px'
                    },600);
                    $(this).addClass("on").siblings().removeClass("on");
                });
            }

            //是否有左右按钮控制
            if(!opt.haveBtn){
                btnL.hide();
                btnR.hide();
            }

            //左按钮点击事件
            btnL.on("click", function () {
                index--;
                slideMove();
            });

            //右按钮点击事件
            btnR.on("click", function () {
                index++;
                slideMove();
            });

            //是否自动播放
            if (opt.autoPlay) {
                timer = setInterval(function () {
                    index++;
                    slideMove();
                }, opt.beginTime);

                $(this).hover(function(){
                    clearInterval(timer);
                },function(){
                    timer = setInterval(function () {
                        index++;
                        slideMove();
                    }, opt.beginTime);
                });
            }
        });

        function slideMove(){
            if (index == -1) {
                ul.css("left", -(length - 1) * imgWidth);
                index = length - 2;
            }

            if (index == length) {
                ul.css("left", "0");
                index = 1;
            }

            ul.animate({
                left: -index * imgWidth + 'px'
            }, opt.speed);

            if(opt.haveCircle){
                if(index == length - 1){
                    circle.find("li").eq(0).addClass("on").siblings().removeClass("on");
                }else{
                    circle.find("li").eq(index).addClass("on").siblings().removeClass("on");
                }
            }
        }
    };
})(jQuery);