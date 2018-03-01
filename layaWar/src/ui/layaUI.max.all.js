var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.pauseBtn=null;
		    this.hpLabel=null;
		    this.scoreLabel=null;
		    this.levelLabel=null;
		    this.infoLabel=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);

		}

		GameInfoUI.uiView={"type":"View","props":{"width":400,"height":852},"child":[{"type":"Button","props":{"y":33,"x":310,"var":"pauseBtn","stateNum":1,"skin":"war/btn_pause.png"}},{"type":"Label","props":{"y":50,"x":24,"var":"hpLabel","text":"hp:0","fontSize":24,"color":"#2c8833","align":"center"}},{"type":"Label","props":{"y":51,"x":114,"var":"scoreLabel","text":"score:0","fontSize":24,"color":"#067721"}},{"type":"Label","props":{"y":52,"x":226,"var":"levelLabel","text":"level:0","fontSize":24,"color":"#22ab43"}},{"type":"Label","props":{"y":348,"x":36,"wordWrap":true,"width":322,"var":"infoLabel","text":"游戏结果","height":96,"fontSize":24,"align":"center"}}]};
		return GameInfoUI;
	})(View);