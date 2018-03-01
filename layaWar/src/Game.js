//var Game=(function(){
    //(function Game(){   
       
        //敌机的血量
        this.hp=[1,2,2];
        //敌机的速度
        this.speed=[3,2,1];
        //敌机的半径
        this.hitRadius=[15,30,70];

        //初始化引擎，设置游戏宽高
        Laya.init(480,852);
        //创建循环滚动的背景
        this.bg=new Background();
        Laya.stage.addChild(this.bg);
        //加载图集资源
        Laya.loader.load("res/atlas/war.atlas",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
    //})();
    //暂停
    function pause(){
        //停止游戏主循环
        Laya.timer.clear(this,onLoop);
        //移除舞台鼠标事件
        Laya.stage.off(Laya.Event,onMouseMove,this,onMouseMove);
    }
    //继续
    function resume(){
        //监听舞台上鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE,this,onMouseMove);
        //创建敌机
        Laya.timer.frameLoop(1,this,onLoop);
    }
    //重新开始
    function restart(){   
        //关卡等级
        this.level = 0;
        //升级关卡等级所需要的成绩
        this.levelUpScore = 10;
        //子弹级别
        this.bulletLevel = 0;
        //子弹发射偏移位置(相对于主机的偏移量)
        this.bulletPos=[[0],[-15,15],[-30,0,30],[-45,-15,15,45]];
        //积分
        this.score = 0;
        //初始化UI界面
        this.gameInfo.reset();

         //类型，阵营，血量，速度，半径
        this.hero.init("hero",0,5,0,30);
        //设置射击类型
        this.hero.shootType=1;
        //设置主角位置
        this.hero.pos(200,500);
        //重重置射击间隔
        this.hero.shootInterval=500;
        //显示角色
        this.hero.visible=true;

        for(var i=this.roleBox.numChildren-1;i>-1;i--){
            var role=this.roleBox.getChildAt(i);
            if(role!=this.hero){
                role.removeSelf();
                role.visible=true;
                Laya.Pool.recover("role",role);
            }
        }

        //继续游戏
        resume();
    }
    function onLoaded(){
        //实例化角色容器
        this.roleBox=new Laya.Sprite();
        //添加到舞台上
        Laya.stage.addChild(this.roleBox);

        //创建游戏UI界面
        this.gameInfo=new GameInfo();
        //添加到舞台
        Laya.stage.addChild(this.gameInfo);

        //创建主角
        this.hero=new Role();
        //添加到舞台上
        this.roleBox.addChild(this.hero);     
       

        restart();
    }
    function onMouseMove(){
        this.hero.pos(Laya.stage.mouseX,Laya.stage.mouseY);
    }
    function onLoop(){
        //遍历舞台所有飞机
        for(var i=this.roleBox.numChildren-1;i>=0;i--){
            var role=this.roleBox.getChildAt(i);
            if(role && role.speed){
                role.y+=role.speed;
                if(role.y>1000 || !role.visible || (role.isBullet && role.y < -20)){
                    role.removeSelf();
                    //回收前重置属性信息
                    role.isBullet = false;
                    role.visible = true;
                    Laya.Pool.recover("role",role);
                }
            }
            if(role.shootType>0){
               var pos=this.bulletPos[role.shootType-1];
               var time=Laya.Browser.now();
               if(time > role.shootTime){
                    role.shootTime=time+role.shootInterval;
                    for(var index=0;index<pos.length;index++){ 
                            //从对象池里创建一个子弹
                            var bullet=Laya.Pool.getItemByClass("role",Role); 
                            //类型，阵营，血量，速度，半径
                            bullet.init("bullet",role.camp,1,-5,1);
                            bullet.isBullet=true;
                            bullet.pos(role.x+pos[index],role.y-role.hitRadius-30);
                            this.roleBox.addChild(bullet);
                    }
                }                
            }
        }
        //检测踫撞
        for(var i=this.roleBox.numChildren-1;i>=0;i--){
            var role1=this.roleBox.getChildAt(i);
            if(role1.hp<=0 || !role1.visible) continue;
            
            for(var j=i-1;j>=0;j--){
                var role2=this.roleBox.getChildAt(j);
                if(role2.hp>0 && role1.camp!= role2.camp){
                    var hitRadius=role1.hitRadius + role2.hitRadius;
                    if(Math.abs(role1.x-role2.x) < hitRadius && Math.abs(role1.y-role2.y) < hitRadius){
                        lostHp(role1,1);
                        lostHp(role2,1);

                        //掉血增加积分
                        this.score++;
                        this.gameInfo.score(this.score);
                        if(this.score > this.levelUpScore){
                            this.level++;
                            this.levelUpScore += this.level *5;
                            this.gameInfo.level(this.level);
                        }
                    }
                }
            }
        }
        //如果主角死亡，结束游戏
        if(this.hero.hp<1){
            Laya.timer.clear(this,onLoop);
            this.gameInfo.infoLabel.text="游戏结束";
            //注册点击事件，点击重新开始游戏
            this.gameInfo.infoLabel.once(Laya.Event.CLICK,this,restart);
        }
        // if(Laya.timer.currTimer%60 ==0){
        //     createEnemy(2);
        // }

        //根据关卡提升敌机
        //相关属性基数
        //创建时间
        var cutTime = this.level < 30 ? this.level * 2 : 60;
        //血量
        var hpUp = Math.floor(this.level / 8);
        //速度
        var speedUp = Math.floor(this.level / 6);
        //数量
        var numUp = Math.floor(this.level / 10);
        
        //创建小敌机
        if(Laya.timer.currTimer % (80 - cutTime) === 0){
            //类型，数量，速度，血量
            createEnemy(0,2+numUp,3+speedUp,1);
        }
        //创建中敌机
        if(Laya.timer.currTimer % (150 - cutTime * 4) === 0){
            //类型，数量，速度，血量
            createEnemy(1,1+numUp,2+speedUp,2+hpUp*2);
        }
        //创建大敌机
        if(Laya.timer.currTimer % (900 - cutTime * 4) === 0){  
            //类型，数量，速度，血量
            createEnemy(2,1,1+speedUp,10+hpUp*6);
        }
    }
    //掉血
    function lostHp(role,hp){
        role.hp-=hp;
        this.gameInfo.hp(role.hp);
        if(role.hp>0){
            role.playAction("hit");
        }else{
            if(role.isBullet){
                role.visible=false;
            }else if(role.heroType === 2){
                //击毁增强包(hp:1)
                this.bulletLevel++;
                //最多同时发射4颗子弹
                this.hero.shootType=Math.min(Math.floor(this.bulletLevel/2)+1,4);
                //速度增加
                this.hero.shootInterval=500- 20* (this.bulletLevel > 20 ? 20 : this.bulletLevel);
                //增加包隐藏
                role.visible = false;
            }else if(role.heroType === 3){
                //击毁血瓶(hp:1)
                this.hero.hp++;
                //血量不大于10
                if(this.hero.hp>10) this.hero.hp=10;
                //血瓶隐藏
                role.visible = false;
            }else{
                role.playAction("down");
                //大Boss被击毁，随机出现增强包或血瓶
                if(role.type=="enemy3"){
                     var type=Math.random() > 0.4 ? 2:3;
                     //从对象池里创建
                     var ufo=Laya.Pool.getItemByClass("role",Role);
                     //初始化  类型，阵营，血量，速度，半径
                     ufo.init("ufo"+(type-1),role.camp,1,1,15,type);
                     //位置
                     ufo.pos(role.x,role.y);
                     //添加到舞台
                     this.roleBox.addChild(ufo);
                }
            }
        }
    }
    //类型，数量，速度，血量
    function createEnemy(type,num,speed,hp){
        
        for(var i=0;i<num;i++){
            // var r=Math.random();
            // var type=r<0.7?0:r<0.95?1:2;

            //var enemy=new Role();         
            var enemy=Laya.Pool.getItemByClass("role",Role);   
            //类型，阵营，血量，速度，半径
            enemy.init("enemy"+(type+1),1,hp,speed,this.hitRadius[type]);
            enemy.pos(Math.random()*400+40,Math.random()*200);
            this.roleBox.addChild(enemy);            
        }
    }   
//})()