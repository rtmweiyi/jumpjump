var STATE = cc.Enum({
	NONE:0,
	NORMAL:1,
	DEAD:3,
});

var GAMESTATE = cc.Enum({
    RUN:1,
    UP:2,
    DOWN:3,
    STOP:4,
});

var Atime;

cc.Class({
    extends: cc.Component,

    properties: {
        jumpDuration:0,
        jumpHeight:0,
        MaxDuration:0,
        shuiJuli:0,
    	//gravity:0,
    	//ySpeed:0,
    	//jumpSpeed:0,
    	//backGroundy:0,
    },

    // use this for initialization
    //onLoad: function () {

    //},
    init:function(game){
        console.log("this"+this);
    	this.game = game;
    	this.state = STATE.NORMAL;
    	this.ySpeed = 0;
    	this.registerInput();
        
        this.hold = true;//已经跳跃的话不能再跳的标志

        this.toLeft = true;
        this.toRight = false;
        this.countTime = false;//按下以后一定时间跳跃标志
    },
    registerInput:function(){
        console.log("this2"+this);
        var self = this;
        var startX,endX;
    	cc.eventManager.addListener({
    		event:cc.EventListener.TOUCH_ONE_BY_ONE,
    		onTouchBegan:function(touch,event){
                console.log("this3"+self);
                self.countTime = true;
    			//console.log("点击");
                var D = new Date();
                Atime = D.getTime();
                startX = touch.getLocationX();
                //console.log(startX);
                return true;
    		},
            onTouchMoved:function(touch,event){
                //var touchLoc = touch.getLocation();
                //console.log(touchLoc);
            },
            onTouchEnded:function(touch,event){
                console.log("跳");
                endX = touch.getLocationX();
                var D = new Date();
                var duration = D.getTime()-Atime;
                //if(self.game.state == GAMESTATE.RUN)self.jump();
                console.log("holdhold"+self.hold);
                if(self.game.state == GAMESTATE.RUN&&duration<self.MaxDuration&&self.hold){
                    console.log("www");

                    self.jump(duration)
                };
                self.countTime = false;
                if(self.game.state==GAMESTATE.UP||self.game.state==GAMESTATE.DOWN){
                    if(endX-startX<0){
                        self.jumpLeft();
                        self.toLeft = false;
                        self.toRight = true;
                    }
                    if(endX-startX>0){
                        self.jumpRight();
                        self.toRight = false;
                        self.toLeft = true;
                    }
                };
            }
    		},self.node);
    },
    //111是右边碰撞组件,222是左边碰撞组件,
    onCollisionEnter:function(other,self){
        /*if(other.tag==111){
            self.node.stopActionByTag(111);
            console.log("停止向右");
            self.toRight = false;
            self.toLeft = true;
        }
        if(other.tag==222){
            self.node.stopActionByTag(222);
            console.log("停止向左");
            self.toRight = true;
            self.toLeft = false;
        }
        if(other.tag==444){
            self.node.stopActionByTag(444);
            console.log("停止向上");
        }*/
        if(other.tag==911){
        	this.game.dead();
        }
    },
    jumpLeft:function(){
        if(this.toLeft){
            var jumpToLeft = cc.moveBy(this.jumpDuration,cc.p(-this.shuiJuli,0)).easing(cc.easeCubicActionOut());
            this.game.trail.left();
            //jumpToLeft.setTag(222);
            return this.node.runAction(jumpToLeft);
        }
    },
    jumpRight:function(){
        if(this.toRight){
            var jumpToRight = cc.moveBy(this.jumpDuration,cc.p(this.shuiJuli,0)).easing(cc.easeCubicActionOut());
            this.game.trail.right();
            //jumpToRight.setTag(111);
            return this.node.runAction(jumpToRight);
        }
    },
    jump:function(duration=this.MaxDuration){
        console.log("jump 了"+this.hold);
        this.hold = false;
        this.countTime = false;
        var proportion = duration/this.MaxDuration;
        var jumpUp = cc.moveBy(this.jumpDuration*proportion,cc.p(0,this.jumpHeight*proportion)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration*proportion,cc.p(0,-this.jumpHeight*proportion)).easing(cc.easeCubicActionOut());
    	//this.ySpeed = this.jumpSpeed;
    	//var animationUp = 
        //jumpUp.setTag(444);
        this.game.trail.up();
        var finished = cc.callFunc(function(){this.hold=true},this);
        //console.log("移动");

        return this.node.runAction(cc.sequence(jumpUp, jumpDown,finished));
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    	if(this.state != STATE.DEAD){
            if(this.countTime&&this.game.state==GAMESTATE.RUN){
                //console.log(this.game.state);
                var D = new Date();
                var duration = D.getTime()-Atime;
                if(duration>this.MaxDuration&this.hold){
                    console.log(duration);
                    console.log("dt jump");
                    console.log("this.hold");
                    this.jump();
                }
            }
    		/*this.ySpeed -= this.gravity * dt;
    		this.node.y += this.ySpeed*dt;
    		if(this.node.y <= this.backGroundy){
    			this.node.y = this.backGroundy;
    		}*/
    	}
    },
});
