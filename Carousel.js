
        //需求：无缝滚动。
        //思路：赋值第一张图片放到ul的最后，然后当图片切换到第五张的时候
        //     直接切换第六章，再次从第一张切换到第二张的时候先瞬间切换到
        //     第一张图片，然后滑动到第二张
        //步骤：
        //1.获取事件源及相关元素。（老三步）
        //2.复制第一张图片所在的li,添加到ul的最后面。
        //3.给ol中添加li，ul中的个数-1个，并点亮第一个按钮。
        //4.鼠标放到ol的li上切换图片
        //5.添加定时器
        //6.左右切换图片（鼠标放上去隐藏，移开显示）


        //1.获取事件源及相关元素。（老三步）
        var all=document.getElementById("all");
        var screen=all.firstElementChild||all.firstChild;
        var imgWidth=screen.offsetWidth;
        var ul=screen.firstElementChild||screen.firstChild;
        var ol=screen.children[1];
        var div=screen.children[2];
        var spanArr=div.children;
        // 2.复制第一张图片所在的li,添加到ul的最后面。
        var newLi=ul.children[0].cloneNode(true);
        ul.appendChild(newLi);
        //3.给ol中添加li，ul中的个数-1个，并点亮第一个按钮。
        for(var i=0;i<ul.children.length-1;i++){
            var olNewli=document.createElement("li");
            olNewli.innerHTML= i+1;
            ol.appendChild(olNewli);
        }
        var olLiArr=ol.children;
        olLiArr[0].className="current";
        //4.鼠标放到ol的li上切换图片
        for(var i=0;i<olLiArr.length;i++){
            olLiArr[i].index=i;
            olLiArr[i].onmouseover=function () {
                for(var j=0;j<olLiArr.length;j++){
                    olLiArr[j].className="";
                }
                this.className="current";
                key=square=this.index;
                animate(ul,-this.index*imgWidth);
            }

        }
        //5.添加定时器
        var timer=setInterval(autoPlay,1500);
        //固定向右切换图片
        //两个计数器（一个记录图片，一个记录小方块）
        var key=0;
        var square=0;
        function autoPlay() {
            key++;
            if(key>olLiArr.length){
                //图片已经滑动到最后一张，接下来，跳转到第一张，然后在滑动到第二张
                ul.style.left = 0;
                key=1;
            }
            animate(ul,-key*imgWidth);
            square++;
            if(square>olLiArr.length-1){
                square=0;
            }
            for(var i=0;i<olLiArr.length;i++){
                olLiArr[i].className="";
            }
            olLiArr[square].className="current";
        }
        all.onmouseover=function () {
            div.style.display="block";
            clearInterval(timer);
        }
        all.onmouseout=function (ev) {
            div.style.display="none";
            timer=setInterval(autoPlay,1000);
        }
        spanArr[0].onclick=function () {
            key--;
            if(key<0){
                ul.style.left=-imgWidth*(olLiArr.length)+"px";
                key=olLiArr.length-1;
            }
            animate(ul,-key*imgWidth);
            //通过控制square的自增来模拟小方块的索引值，然后点亮盒子
            //排他思想做小方块
            square--;
            if(square<0){
                square=olLiArr.length-1;
            }
            for(var i=0;i<olLiArr.length;i++){
                olLiArr[i].className="";
            }
            olLiArr[square].className="current";
        }
        spanArr[1].onclick=function () {
            autoPlay();
        }

        //封装后的动画
        function animate(ele,target){
            clearInterval(ele.timer);
            var speed = target>ele.offsetLeft?10:-10;
            ele.timer = setInterval(function () {
                var val = target - ele.offsetLeft;
                ele.style.left = ele.offsetLeft + speed + "px";
                if(Math.abs(val)<Math.abs(speed)){
                    ele.style.left = target + "px";
                    clearInterval(ele.timer);
                }
            },10)
        }
