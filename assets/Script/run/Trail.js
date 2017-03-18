cc.Class({
    extends: cc.Component,

    properties: {
    },
    init:function(game){
        this.game = game;
    },
    start:function(){
        this.trail = this.getComponent(dragonBones.ArmatureDisplay);
        //console.log(this.trail);
        this._armature = this.trail.armature();
        //console.log(this._armature.animation.fadeIn);
    },
    left:function(){
        this._armature.animation.fadeIn("left",-1,1);
    },

    up:function(){
        //console.log("尾巴  ");
        this._armature.animation.fadeIn("up",-1,1);
    },
    right:function(){
        this._armature.animation.fadeIn("right",-1,1);
    },
    // use this for initialization
    //onLoad: function () {

    //},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
