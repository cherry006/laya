var Role=(function(_super){
    function Role(){
        Role.super(this);
        //初始化
        //this.init();
    }
    Role.cache=0;
    //注册类
    Laya.class(Role,"Role",_super);
    var _proto=Role.prototype;
    _proto.init=function(_type,_camp,_hp,_speed,_hitRadius,_heroType){
        this.type=_type;
        this.camp=_camp;
        this.hp=_hp;        
        this.speed=_speed;
        this.hitRadius=_hitRadius;
        //0普通，1子弹，2增强包，3血瓶
        this.heroType = _heroType; 
        //射击类型
        this.shootType=0;
        //射击间隔
        this.shootInterval=500;
        //射击时间
        this.shootTime=Laya.Browser.now()+1000;
        this.action="fly";
        this.isBullet=false;

        if(!Role.cache){
            Role.cache=1;
            //缓存飞机的动作
            Laya.Animation.createFrames(["war/hero_fly1.png","war/hero_fly2.png"],"hero_fly");
            //缓存飞机击中爆炸动作
            Laya.Animation.createFrames(["war/hero_down1.png","war/hero_down2.png","war/hero_down3.png","war/hero_down4.png"],"hero_down");
            
            //缓存敌机一的动作
            Laya.Animation.createFrames(["war/enemy1_fly1.png"],"enemy1_fly");
            //缓存敌机一击中爆炸动作
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png","war/enemy1_down4.png"],"enemy1_down");
            

            //缓存敌机二的动作
            Laya.Animation.createFrames(["war/enemy2_fly1.png"],"enemy2_fly");
            //缓存敌机二击中爆炸动作
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png","war/enemy2_down4.png"],"enemy2_down");
            //缓存敌机二碰撞动作
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");

            //缓存敌机三的动作
            Laya.Animation.createFrames(["war/enemy3_fly1.png","war/enemy3_fly2.png"],"enemy3_fly");
            //缓存敌机三击中爆炸动作
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png","war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");
            //缓存敌机三碰撞动作
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");

            //缓存子弹动作
            Laya.Animation.createFrames(["war/bullet1.png"],"bullet_fly");

            //缓存增强包
            Laya.Animation.createFrames(["war/ufo1.png"],"ufo1_fly");

            //缓存血量包
            Laya.Animation.createFrames(["war/ufo2.png"],"ufo2_fly");
        }  
        if(!this.body){
            //创建一个动画作为飞机的身体
            this.body=new Laya.Animation();
            //把机体添加到容器内
            this.addChild(this.body);
            this.body.on(Laya.Event.COMPLETE,this,this.onPlayComplete);
        }  
        //测试状态
        this.playAction(this.action);
    }
    _proto.onPlayComplete=function(){
        //如果是击毁动画，则隐藏对象
        if(this.action === "down"){
            this.body.stop();
            this.visible=false;
        }else if(this.action === "hit"){
            //如果被击动画播放完毕，刚接着播放飞行动画
            this.playAction("fly")
        }
    }
    _proto.playAction=function(action){
        //根据类型播放动画
        this.action=action;
        this.body.play(0,true,this.type+"_"+action);
        this.bound=this.body.getBounds();
        this.body.pos(-this.bound.width/2,-this.bound.height/2);
    }
    return Role;
})(Laya.Sprite)