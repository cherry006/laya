var Mole=(function(){
    function Mole(normal,hit,downY){
        this.normal=normal;
        this.hit=hit;
        this.downY=downY;
        this.upY=this.normal.y;

        this.reset();    
        //监听敲击事件
        this.normal.on(Laya.Event.CLICK,this,this.hitting);
    }
    var _proto=Mole.prototype;
    //初始状态
    _proto.reset=function(){
        this.normal.visible=false;
        this.hit.visible=false;      
        this.isShow=false;
        this.isHit=false;  
    }
    //显示
    _proto.show=function(){
        this.isShow=true;
        this.normal.visible=true;
        this.normal.y=this.downY;
        //缓动显示
        Laya.Tween.to(this.normal,{y:this.upY},500,Laya.Ease.backOut,Laya.Handler.create(this,this.showComplete))
    }
    //停留
    _proto.showComplete=function(){
        if(this.isShow && !this.isHit){
            Laya.timer.once(2000,this,this.hide);
        }
    }
    //隐藏
    _proto.hide=function(){
        if(this.isHit || !this.isShow) return;
        //缓动隐藏
        this.isShow=false;
        Laya.Tween.to(this.normal,{y:this.downY},300,Laya.Ease.backIn,Laya.Handler.create(this,this.reset))

    }
    //敲击
    _proto.hitting=function(){
        if(!this.isShow || this.isHit) return;
        this.isShow=false;
        this.isHit=true;
        Laya.timer.clear(this,this.hide);
        this.normal.visible=false;
        this.hit.visible=true;
        Laya.timer.once(500,this,this.reset)
    }
    return Mole;
})()