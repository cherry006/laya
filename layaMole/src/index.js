var mole=(function(){
    (function(){
        //初始化引擎
        var canvas=Laya.init(800,600);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;        
        //设置背景颜色
        Laya.stage.bgColor="#fff";
        //加载资源（所有用到的图集）
        Laya.loader.load("res/atlas/ui.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
    })()
    function onLoaded(){
        var game=new Game();
        Laya.stage.addChild(game);
    }
})()