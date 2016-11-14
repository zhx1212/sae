/**
 * Created by hxsd on 2016/8/22.
 */
window.onload=function () {
    var oUs=document.getElementById('subject');
    var ali=oUs.getElementsByTagName('li');

    for(var i=0;i<ali.length;i++){
        ali[i].onmouseover=function () {
            for (var i=0;i<ali.length;i++){
                ali[i].className='';
            }
            this.className='big';
        };
        ali[i].onmouseout=function () {
            for (var i=0;i<ali.length;i++){
                ali[i].className='';
            }
            this.className='big';
        }
    }
   /* function bind(el,eventType) {
        if (typeof el.addEventListener==='function'){
            el.addEventListener(el,eventType,false);
        }else  if (typeof el.attachEvent==='function'){
            el.attachEvent('on'+eventType);
          //
        }
    }
    function mouseoverHandler(e) {
        alert("bbbbb");
        var oEv=e||window.event;
        var target=oEv.target||oEv.srcElement;

        for(var i=0;i<ali.length;i++){
            ali[i].className='';
        }
      /!*  while (target.tagName!='LI'){
            target=target.parentNode;
        }*!/
        target.className='big';
    }
    function initList() {

        for(var i=0;i<ali.length;i++){
            bind(ali[i],'mouseover', mouseoverHandler());

        }

    }
    initList();
*/
};


