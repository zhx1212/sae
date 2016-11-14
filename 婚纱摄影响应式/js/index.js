/**
 * Created by hxsd on 2016/10/12.
 */
/*slide*/
$(function () {
   // slide();
  /* var odiv=document.getElementById('border'),
       ospan=document.getElementById('padding'),
       op=document.getElementsByTagName('p')[0];*/
  
    var time=10, timer=null,num=0;

     var len = $('.circle>li').length;
     var index = 0;
     var adTimer;

     $('.circle li').mouseover(function(){
     index = $('.circle li').index(this);
     showImg(index);
     }).eq().mouseover();

     $('.slider').mouseover(function(){
     clearInterval(adTimer);
     /*ospan.style.width='0px';
     num=0;*/
     clearInterval(timer);
     })
    $('.slider').mouseout(function(){

     /* timer=setInterval(function(){
     
          if(num<344)
            { 
               num=num+1;
               ospan.style.width=ospan.offsetWidth+ 1+ 'px';
            }
           else
            {
               num=0;
               ospan.style.width='0px';

            }
          },time);*/
     
         adTimer = setInterval(function(){
        index++;

        if(index==len)
            {   index=0;    }
            showImg(index);
         },3440)
         }).trigger('mouseleave')

    function showImg(index){
        var adWidth = $('.slider>ul>li:first').width();
        $('.slides').stop(true,false).animate({
            'marginLeft':-adWidth*index+'px'
        })
        $('.circle li').removeClass('cSpan').eq(index).addClass('cSpan');}
    // }
  
});
 
/*function slide(){
    var w=$(window).width()
    $('.slides').css('width',w*4)
    var slider=$('.slider');

    var ul=slider.find('.slides');
    var aLi=$('.circle>li');
    oW=slider.find('.slides li').eq(0).width();
    // console.log(oW);
    var timer=null;
    var iNow=0;
    $(aLi).on('click',function () {
        $(this).addClass('cSpan').siblings().removeClass('cSpan');
        var index=$(this).index();
        ul.animate({
            'left':-oW*iNow
        });
    });
    timer=setInterval(function () {
        iNow++;
        if (iNow>aLi.length-1){
           iNow=0;
        }
        aLi.eq(iNow).trigger("click");
    },3000);
};
window.onresize=function(){
    var w=$(window).width()
    $('.slides').css('width',w*4)
    console.log(w)
    console.log($('.slides').width())
    oW=$('.slides').find('li').eq(0).width();
};*/


