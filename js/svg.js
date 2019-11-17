var li = document.getElementsByTagName('li');
var box = document.getElementById('box');
for(let kay in li){
    li[kay].onmousedown = function(e){
        console.log('已经点击的li',e);
   //event的兼容性
   var e = e||event;

   //获取鼠标按下的坐标
   var x1 = e.clientX;
   var y1 = e.clientY;

   //获取元素的left，top值
   var l = li[kay].offsetLeft;
   var t = li[kay].offsetTop;
   
       box.style.top = t +'px';
       box.style.left = l + 'px'
       box.innerHTML = e.target.innerHTML;
     
   document.onmousemove = function(ev){ 
        box.style.display = 'block'
        var ev = ev||event;
       //获取鼠标移动时的坐标
       var x2 = ev.clientX;
       var y2 = ev.clientY;

       //计算出鼠标的移动距离
       var x = x2-x1;
       var y = y2-y1;

       //移动的数值与元素的left，top相加，得出元素的移动的距离
       var lt = y+t;
       var ls = x+l;

       //更改元素的left，top值
       box.style.top = lt+'px';
       box.style.left = ls+'px';
     } 

     //清除
     document.onmouseup = function(ev){
        //  console.log( parseInt(box.style.left),parseInt(box.style.top) );
        document.onmousemove = null;
        let top = parseInt(box.style.top);
            left = parseInt(box.style.left)
        if((top >77 && top < 644)&&(left > 260 && left < 1354)){
          
          let  obj ={
              rx: parseInt(box.style.left) -260,
              ry: parseInt(box.style.top) - 77,
              text: box.innerHTML
          }
          createMoudle(obj)
        
        }

            box.style.top = box.style.left = 0 + 'px';
            box.style.display = 'none';
            box.innerHTML = '';
     }
    }
};

// document.onmouseup= function(e){
//     console.log(e.clientX,e.clientY)
// }
