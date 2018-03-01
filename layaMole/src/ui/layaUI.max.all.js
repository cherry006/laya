var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var gameUI=(function(_super){
		function gameUI(){
			
		    this.normal=null;
		    this.hit=null;

			gameUI.__super.call(this);
		}

		CLASS$(gameUI,'ui.gameUI',_super);
		var __proto__=gameUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(gameUI.uiView);

		}

		gameUI.uiView={"type":"View","props":{"width":800,"height":600},"child":[{"type":"Image","props":{"y":25,"x":25,"skin":"ui/back.png"}},{"type":"Box","props":{"y":193,"x":156},"child":[{"type":"Image","props":{"y":2,"x":5,"var":"normal","skin":"ui/mouse_normal_1.png"}},{"type":"Image","props":{"y":15,"x":6,"var":"hit","skin":"ui/mouse_hit_1.png"}},{"type":"Image","props":{"y":86,"skin":"ui/mask-01.png"}}]}]};
		return gameUI;
	})(View);