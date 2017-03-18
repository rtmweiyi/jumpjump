cc.Class({
    extends: cc.Component,

    properties: {
        bg1:cc.Node,
        bg2:cc.Node,
        bgSpeed:0,
    },
    init:function(game){
        this.game = game;
    },

    horMove:function(){
        this.bg1.x -=  this.bgSpeed;
        //console.log(this.bg1.x);
        if(this.bg1.x<=-2085){
            this.game.desZhuizi1();
            this.bg1.x = 3900;
            this.game.spawnZhuizi1();
        }
        this.bg2.x -=  this.bgSpeed;
        if(this.bg2.x<=-2085){
            this.game.desZhuizi2();
            this.bg2.x = 3900;
            this.game.spawnZhuizi2();
        }
    },
    upMove:function(){
        this.bg1.y -=this.bgSpeed;
        this.bg2.y -=this.bgSpeed;
    },
    downMove:function(){
        this.bg1.y +=this.bgSpeed;
        this.bg2.y +=this.bgSpeed;
    },

    //onCollisionEnter:function(other,self){
    //    console.log("移动");
    //},
    // use this for initialization

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {
    //},
});

//jus*****eanl
//ee668f26
//b489d80c