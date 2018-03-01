var Game=(function(_super){
    function Game(){
        Game.super(this);   
        this.mole = new Mole(this.normal,this.hit,21);        
        this.mole.show();
        Laya.timer.loop(4000,this,this.onloop)
    }
    Laya.class(Game,"Game",_super);    
    var _proto=Game.prototype;
    _proto.onloop=function(){
        this.mole.show();
    }
    return Game;
})(ui.gameUI)