function shape(canvas,copy,cobj) {
    if (canvas===undefined||cobj===undefined){
        console.log("传入参数有误");
        return false;
    }

    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    //默认图形
    this.type="arc";
    //默认风格
    this.style="stroke";
    //历史记录
    this.historyArr=[];
    //填充颜色
    this.fillStyle="#000";
    //线条颜色
    this.strokeStyle="#000";
    //线条宽度
    this.lineWidth=1;
    //多边形边数
    this.bianNum=5;
    //多角行角数
    this.jiaoNum=5;
    //橡皮的尺寸
    this.xpsize=10;

}
shape.prototype={
    init:function () {
        //填充的颜色
        this.cobj.fillStyle=this.fillStyle;
        //线条的颜色
        this.cobj.strokeStyle=this.strokeStyle;
        //线条的宽度
        this.cobj.lineWidth=this.lineWidth;
    },

    draw:function () {
        this.init();
        var that=this;
        that.copy.onmousedown=function (e) {
            var startx=e.offsetX;
            var starty=e.offsetY;
            that.copy.onmousemove=function (e) {
                var endx=e.offsetX;
                var endy=e.offsetY;

                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.historyArr.length>0){
                    that.cobj.putImageData(that.historyArr[that.historyArr.length-1],0,0)
                }

                if(that.type==="line"){
                    that.line(startx,starty,endx,endy)
                }else if(that.type==="rect"){
                    that.rect(startx,starty,endx,endy)
                }else if(that.type==="arc"){
                    that.arc(startx,starty,endx,endy)
                }else if(that.type==="bian"){
                    that.bian(startx,starty,endx,endy)
                }else if(that.type==="jiao"){
                    that.jiao(startx,starty,endx,endy)
                }

            }
            that.copy.onmouseup=function (e) {
                // if(that.historyArr.length>20){
                //     that.historyArr.length.shift()
                // }
                that.historyArr.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }


        }

    },

    line:function (x1,y1,x2,y2) {
        this.cobj.beginPath()
        this.cobj.moveTo(x1,y1);
        this.cobj.lineTo(x2,y2);
        this.cobj.stroke();
    },

    rect:function (x1,y1,x2,y2) {
        this.cobj.beginPath()
        this.cobj.rect(x1,y1,x2-x1,y2-y1);
        this.cobj[this.style]();
    },

    arc:function (x1,y1,x2,y2) {
        this.cobj.beginPath()
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        this.cobj.arc(x1,y1,r,0,2*Math.PI);
        this.cobj[this.style]();
    },

    bian:function (x1,y1,x2,y2) {
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            var x=x1+Math.cos(angle*i)*r;
            var y=y1+Math.sin(angle*i)*r;
            this.cobj.lineTo(x,y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },

    jiao:function (x1,y1,x2,y2) {
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0){
                var x=x1+Math.cos(angle*i)*r;
                var y=y1+Math.sin(angle*i)*r;
            }else {
                var x=x1+Math.cos(angle*i)*r1;
                var y=y1+Math.sin(angle*i)*r1;
            }
            this.cobj.lineTo(x,y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },

    pen:function () {
        var that=this;
        that.copy.onmousedown=function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx ,starty);
            that.copy.onmousemove=function (e) {
                var endx=e.offsetX;
                var endy=e.offsetY;
                that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.historyArr.length>0){
                    that.cobj.putImageData(that.historyArr[that.historyArr.length-1],0,0)
                }

                // this.cobj.moveTo(x1,y1);
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function (e) {
                that.historyArr.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
            }
        }
    },

    xp:function (ele) {
        var that=this;
        that.copy.onmousemove=function (e) {
            var ox=e.offsetX;
            var oy=e.offsetY;
            var left=ox-that.xpsize/2;
            var top=oy-that.xpsize/2;

            if(left<0){
                left=0;
            }
            if(left>$(that.copy).width()-that.xpsize){
                left=$(that.copy).width()-that.xpsize;
            }
            if(top<0){
                top=0;
            }
            if(top>$(that.copy).height()-that.xpsize){
                top>$(that.copy).height()-that.xpsize;
            }
            // ele.css("display","block").css("left",left).css("top",top).css({"width":"that.xpsize","height":"that.xpsize"});
            ele.css("display","block").css("left",left).css("top",top).css({
                width:that.xpsize,
                height:that.xpsize,
            });

            that.copy.onmousedown=function(){
                that.copy.onmousemove=function(e){
                    var ox=e.offsetX;
                    var oy=e.offsetY;
                    var left=ox-that.xpsize/2;
                    var top=oy-that.xpsize/2;

                    if(left<0){
                        left=0;
                    }
                    if(left>$(that.copy).width()-that.xpsize){
                        left=$(that.copy).width()-that.xpsize;
                    }
                    if(top<0){
                        top=0;
                    }
                    if(top>$(that.copy).height()-that.xpsize){
                        top>$(that.copy).height()-that.xpsize;
                    }

                    ele.css("left",left).css("top",top);
                    that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
                }
                that.copy.onmouseup=function(){
                    that.historyArr.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                    that.xp(ele);
                }
            }





        }
    }






}

