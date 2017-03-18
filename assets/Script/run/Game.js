var Cat = require("Cat");
var Trail = require("Trail");
var Camera = require("CameraManager");
var CatLayout = require("CatLayout");

var GAMESTATE = cc.Enum({
    RUN:1,
    UP:2,
    DOWN:3,
    STOP:4,
});

var STATE = cc.Enum({
    NONE:0,
    NORMAL:1,
    DEAD:3,
});

var poolList1 = [];
var poolList2 = [[],[],[]];

cc.Class({
    extends: cc.Component,

    properties: {
        smallPre:cc.Prefab,//预制资源，分别是小，中，大的地面障碍物
        middlePre:cc.Prefab,
        bigPre:cc.Prefab,
        cat:Cat,
        trail:Trail,
        camera:Camera,
        catlayout:CatLayout,
        layer1:cc.Node,//放置锥子的层
        layer2:cc.Node,
        shuipingJiange:0,//锥子的水平间隔
        shuipingJiangeS:0,//水平间隔的随机量
        chuizhiJiange:0,//锥子的垂直间隔
        chuizhiJiangeS:0,//垂直间隔的随机量
        gameOverMenu:cc.Node,
        //sceneName:"wula",
    },

    loadprefab:function(){
        this.pool1 = new cc.NodePool();//预制资源的三个对应的对象池
        this.pool2 = new cc.NodePool();
        this.pool3 = new cc.NodePool();
        for(var i=0;i<12;i++){
            this.pool1.put(cc.instantiate(this.smallPre));
            this.pool2.put(cc.instantiate(this.middlePre));
            this.pool3.put(cc.instantiate(this.bigPre));
        }

    },
    spawnZhuizi1:function(){
        var count_s = 0;
        for(var i=0;i<2;i++){
            if(Math.random()<0.5){
                let a = this.pool1.get();
                a.name = "pool1";
                poolList1[count_s]=a;
                count_s+=1;
            }
            if(Math.random()<0.5){
                let a = this.pool2.get();
                a.name = "pool2";
                poolList1[count_s]=a;
                count_s+=1;
            }
        }
        if(Math.random()<0.5){
                let a = this.pool3.get();
                a.name = "pool3";
                poolList1[count_s]=a;
                count_s+=1;
            }
        console.log(poolList1);
        var shuipingX = -1200*Math.random();
        for (var i=0;i<poolList1.length;i++){
            var n = poolList1[i];
            n.x  = shuipingX;
            shuipingX += this.shuipingJiange+Math.random()*this.shuipingJiangeS;
            n.y = -175+n.height/2;
            this.layer1.addChild(n);
        }
    },
    spawnZhuizi2:function(){
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        console.log("poolList2");
        console.log(poolList2);

        //锥子列表，这么奇怪是因为最后发现放多了玩不了
        for(var i=0;i<2;i++){
            if(Math.random()<0.5){
                console.log(poolList2);
                let a = this.pool1.get();
                a.name = "pool1";
                poolList2[0][count1]=a;
                count1+=1;
            }
           if(Math.random()<0.5){
                console.log(poolList2);
                let a = this.pool2.get();
                a.name = "pool2";
                poolList2[0][count1]=a;
                count1+=1;
            } 
        }
        
        if(Math.random()<0.5){
                console.log(poolList2);
                let a = this.pool3.get();
                a.name = "pool3";
                poolList2[0][count1]=a;
                count1+=1;
            }
        

        for(var i=0;i<2;i++){
            if(Math.random()<0.5){
                let a = this.pool1.get();
                a.name = "pool1";
                poolList2[1][count2]=a;
                count2+=1;
            }
            if(Math.random()<0.5){
                let a = this.pool2.get();
                a.name = "pool2";
                poolList2[1][count2]=a;
                count2+=1;
            }
        }
        
        if(Math.random()<0.5){
            let a = this.pool3.get();
            a.name = "pool3";
            poolList2[1][count2]=a;
            count2+=1;
        }


        for(var i=0;i<2;i++){
            if(Math.random()<0.5){
                let a = this.pool1.get();
                a.name = "pool1";
                poolList2[2][count3]=a;
                count3+=1;
            }
            if(Math.random()<0.5){
                let a = this.pool2.get();
                a.name = "pool2";
                poolList2[2][count3]=a;
                count3+=1;
            }
        }


        var chuizhiy1 = -1089+300*Math.random();
        for (var i=0;i<poolList2[0].length;i++){
            var n = poolList2[0][i];
            if(Math.random()<0.5){
                n.x = -1515+n.height/2;
                n.rotation = 90;
                n.y = chuizhiy1;
                chuizhiy1 += this.chuizhiJiange+this.chuizhiJiangeS*Math.random();
                this.layer2.addChild(n);
            }else{
                n.x = -1197-n.height/2;
                n.rotation = -90;
                n.y = chuizhiy1;
                chuizhiy1 += this.chuizhiJiange+this.chuizhiJiangeS*Math.random();
                this.layer2.addChild(n);
            }
        }
        var chuizhiy2 = -1089+300*Math.random();
        for (var i=0;i<poolList2[1].length;i++){
            var n = poolList2[1][i];
            if(Math.random()<0.5){
                n.x = 1197+n.height/2;
                n.rotation = 90;
                n.y = chuizhiy2;
                chuizhiy2 += this.chuizhiJiange+this.chuizhiJiangeS*Math.random();
                this.layer2.addChild(n);
            }else{
                n.x = 1515-n.height/2;
                n.rotation = -90;
                n.y = chuizhiy2;
                chuizhiy2 += this.chuizhiJiange+this.chuizhiJiangeS*Math.random();
                this.layer2.addChild(n);
            }
        }
        var shuipingX = -897+100 *Math.random();
        for (var i=0;i<poolList2[2].length;i++){
            var n = poolList2[2][i];
            n.x  = shuipingX;
            shuipingX += this.shuipingJiange+Math.random()*this.shuipingJiangeS;
            n.y = 1189+n.height/2;
            this.layer2.addChild(n);
        }

    },
    desZhuizi1:function(){
        var children = this.layer1.children;
        console.log(children.length);
        var j = children.length;
        for (var i=0;i<j;i++){
            console.log(i);
            var n = children[0];//children 是动态的
            n.rotation = 0;
            console.log(n);
            if(n.name=="pool1"){
                this.pool1.put(n);
            }else if(n.name=="pool2"){
                this.pool2.put(n);
            }else if(n.name=="pool3"){
                this.pool3.put(n);
            }
        }
        poolList1 = [];
    },
    desZhuizi2:function(){
        var children = this.layer2.children;
        console.log(children.length);
        var j = children.length;
        for (var i=0;i<j;i++){
            console.log(i);
            var n = children[0];//children 是动态的，因为放进对象池后就不在children里面了。
            n.rotation = 0;
            console.log(n);
            if(n.name=="pool1"){
                this.pool1.put(n);
            }else if(n.name=="pool2"){
                this.pool2.put(n);
            }else if(n.name=="pool3"){
                this.pool3.put(n);
            }
        }
        poolList2 = [[],[],[]];
    },

    // use this for initialization
    onLoad: function () {
        this.cat.init(this);
        this.trail.init(this);
        this.camera.init(this);
        this.catlayout.init(this);
        this.state = GAMESTATE.RUN;
        cc.director.getCollisionManager().enabled = true;//开启碰撞检测
        this.loadprefab();
        this.spawnZhuizi2();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.state == GAMESTATE.RUN){
            this.camera.horMove();
        }
        if(this.state == GAMESTATE.UP){
            this.camera.upMove();
        }
        if(this.state==GAMESTATE.DOWN){
            this.camera.downMove();
        }
    },
    dead:function(){
        this.state = GAMESTATE.STOP;
        this.cat.state = STATE.DEAD;
        this.gameOverMenu.active = true;
        this.desZhuizi2();
        this.desZhuizi1();
    },
    restartGame:function(){
        cc.director.loadScene("run");
    },
    quitGame:function(){
        cc.director.end();
    },
});
