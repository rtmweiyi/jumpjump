var GAMESTATE = cc.Enum({
    RUN:1,
    UP:2,
    DOWN:3,
    STOP:4,
});

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    init:function(game){
        this.game = game;
    },
    
    onCollisionEnter:function(other,self){
        if(other.tag == 233){
            this.game.state = GAMESTATE.UP;
        }
        if(other.tag ==333){
            this.game.state = GAMESTATE.RUN;
        }
        if(other.tag == 222){
            this.game.state = GAMESTATE.DOWN;
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
//注意要还原事y是275