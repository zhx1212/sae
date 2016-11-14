/**
 * Created by hxsd on 2016/8/16.
 */
window.onload=function(){
    //IE兼容性
    if (!document.getElementsByClassName){
        document.getElementsByClassName=function(cls){
            var ret=[];
            var els=document.getElementsByTagName('*');
            for (var i= 0,len=els.length;i<len;i++){
                if (els[i].className===cls
                    ||els[i].className.indexOf(cls+' ')>=0
                    ||els[i].className.indexOf(' '+cls+' ')>=0
                    ||els[i].className.indexOf(' '+cls)>=0){

                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }

    var cartTable = document.getElementById('cartTable');  //
    var tr = cartTable.children[1].rows;  //每一行
    var checkInputs = document.getElementsByClassName('check');  //选择按钮
    var checkAllInputs = document.getElementsByClassName('check-all'); //全选按钮
    var selectedTotal = document.getElementById('selectedTotal');  //已选商品数量
    var priceTotal = document.getElementById('priceTotal');  //价格总数
    var selected = document.getElementById('selected');    //已选商品
    var foot=document.getElementById('foot');
    var selectedViewList=document.getElementById('selectedViewList'); //可视商品悬浮层
    var deleteAll=document.getElementById('deleteAll');  //多项删除按钮

//计算
    function  getTotal(){
        var selected=0;
        var price=0;
        var HTMLstr='';
        for (var i= 0,len=tr.length;i<len;i++){
            if (tr[i].getElementsByTagName('input')[0].checked){
                tr[i].className="on";
                selected+=parseInt(tr[i].getElementsByTagName('input')[1].value);
                price+=parseFloat(tr[i].cells[4].innerHTML);//当前行的所有TD
                HTMLstr+='<div><img src="'+tr[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">取消选择</span></div>';
            }else {
                tr[i].className='';
            }
        }
        selectedTotal.innerHTML=selected;       //总数目
        priceTotal.innerHTML=price.toFixed(2);  //总价格
        selectedViewList.innerHTML=HTMLstr;  //缩略图显示图层
        if(selected==0){
            foot.className='foot';
        }
    }
//选择事件
    for (var i= 0,len=checkInputs.length;i<len;i++){
        checkInputs[i].onclick=function(){
            if (this.className==='check-all check'){
                for (var j=0;j<checkInputs.length;j++){
                    checkInputs[j].checked=this.checked;
                }
            }
            if (this.checked==false){
                for (var k=0;k<checkAllInputs.length;k++){
                    checkAllInputs[k].checked=false;
                }
            }
            getTotal();
        }
    }
//选择框显示与隐藏
    selected.onclick=function () {
        if (foot.className=='foot'){
            if (selectedTotal.innerHTML!=0){
                foot.className='foot show';
            }

        }else {
            foot.className='foot';
        }
    };

    //小计
    function getSubTotal(tr) {
        var tds=tr.cells;
        var price=parseFloat(tds[2].innerHTML);
        var count=parseInt(tr.getElementsByTagName('input')[1].value);
        var SubTotal=parseFloat(price*count);
        tds[4].innerHTML=SubTotal;
    }

//取消事件
    selectedViewList.onclick=function (e) {
        e=e||window.event;
        var el=e.srcElement;
        if (el.className=='del'){
            var index=el.getAttribute('index');
            var input=tr[index].getElementsByTagName('input')[0];
            input.checked=false;
            input.onclick();
        }
    };
    //数量加减
    for(var i=0;i<tr.length;i++){
        tr[i].onclick=function (e) {
            var oEv=e||window.event;
            var el=oEv.srcElement;
            var cls=el.className;
            var input=this.getElementsByTagName('input')[1];
            var val=parseInt(input.value);
            var reduce=this.getElementsByTagName('span')[1];

            switch (cls){
                case 'add':
                    input.value=val+1;
                    reduce.innerHTML='-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (input.value>1){
                        input.value=val-1;
                    }

                    if (input.value<=1){
                        reduce.innerHTML='';
                    }
                    getSubTotal(this);
                    break;
                case 'delete':
                    var conf=confirm('确定要删除吗？');
                    if (conf){
                        this.parentNode.removeChild(this);
                    }
                    break;
                default:
                    break;
            }
            getTotal();
        }
    }


    deleteAll.onclick=function () {
        if (selectedTotal.innerHTML!=0){
            var conf=confirm('确定要删除吗？');
            if (conf){
                for(var i=0;i<tr.length;i++){
                    var input=tr[i].getElementsByTagName('input')[0];
                    if (input.checked){
                        tr[i].parentNode.removeChild(tr[i]);
                        i--;
                    }
                }
            }
        }

    }

    checkAllInputs[0].checked=true;
    checkAllInputs[0].onclick();

};
