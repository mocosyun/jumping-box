var world;
var shapeArray=[];
var startTouch;
var endTouch;
var dX = 0;
var dY = 0;
var dZ = 0;
var shape;
var bo
var node;
var arrow_line;
var debug_label1;
var debug_label2;
var touching = false;
var touchflag = false;
var jumpText;
var bonusText;

if (typeof SpriteTag == "undefined") {
   var SpriteTag = {};
   SpriteTag.totem = 0; // トーテム
   SpriteTag.destroyable = 1; //
   SpriteTag.solid = 2; //
   SpriteTag.ground = 3; //地面
   SpriteTag.teki1 = 4; //敵
   SpriteTag.teki2 = 5; //敵
   SpriteTag.goal = 6; //ゴール

};
var gameLayer;
var gameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        gameLayer = new game();
        gameLayer.init();
        this.addChild(gameLayer);

        var size = cc.director.getWinSize();

      // debug_label1 = cc.LabelTTF.create("Click", "Arial", 26);
      // debug_label1.setPosition(size.width / 2, size.height * 0.8);
      // this.addChild(debug_label1, 1);
      // debug_label2 = cc.LabelTTF.create(" and Drag", "Arial", 26);
      // debug_label2.setPosition(size.width * 2 / 3, size.height * 0.74);
      // this.addChild(debug_label2, 1);


        node = new cc.DrawNode();
        this.addChild(node, 10);
        arrow_line = new cc.DrawNode();
        this.addChild(arrow_line, 11);

        cc.eventManager.addListener;
        var sankaku = [
            new cc.Point(0, 0),
            new cc.Point(-8, -10),
            new cc.Point(-3, -10),
            new cc.Point(0, -20),
            new cc.Point(3, -10),
            new cc.Point(8, -10),
      ]
        var fillColor = new cc.Color(128, 128, 128, 128);
        var lineWidth = 1;
        var lineColor = new cc.Color(255, 255, 255, 128);
        node.drawPoly(sankaku, fillColor, lineWidth, lineColor);
        node.setPosition(size.width / 2, size.height / 2);
        node.setScale(1.5);

        this.scheduleUpdate();

        cc.eventManager.addListener({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: this.onTouchBegan,
         onTouchMoved: this.onTouchMoved,
         onTouchEnded: this.onTouchEnded
      }, this);
      return true;
   },
   //タッチ開始時の処理
   onTouchBegan:function (touch,event) {
       startTouch = touch.getLocation();

       node.setPosition(startTouch)
       return true;
   },
   //タッチ移動時の処理
   onTouchMoved:function(touch, event){
       cc.log("Touch Moved!");
       endTouch = touch.getLocation();
       touching = true;

       //calcDirection(); //角度計算と矢印の長さを設定
   },
   //タッチ終了時の処理
   onTouchEnded:function(touch, event){
       endTouch = touch.getLocation();
       touching = false
       //calcDirection();//角度計算と矢印の長さを設定

       if (touchflag == true) {
         shape.body.applyImpulse(cp.v(dX * -2, dY * -2), cp.v(10, 0));
         f = f -1;
         jumpText.setString("jump:" + f);
         console.log("とんだよ");
       }
   },

   update: function(dt) {
      if (touching) {
         //現在タッチしているX座標と前回の座標の差分をとる
         arrow_line.setVisible(true);
         node.setVisible(true);

         this.calcDirection();
      } else {
         arrow_line.setVisible(false);
         arrow_line.clear();
         node.setVisible(false);
         node.clear();
      }
   },

   calcDirection: function(){
       dX = endTouch.x - startTouch.x ;
       dY = endTouch.y - startTouch.y ;
       //角度（ラジアン）を求める
       var dZ = Math.sqrt(dX * dX + dY * dY);

       //debug_label1.setString(Math.floor(dZ * Math.pow(10, 2)) / Math.pow(10, 2));

       //ドラックした距離が閾値（しきい値）をこえたら、矢印を表示する
         if (dZ > 60) {
           var radin = Math.atan2(dY, dX);
           //角度（ラジアン）を角度（度数）に変換
           angle = radin * 180 / Math.PI ;
           //前回の描画を消す
           arrow_line.clear();
           node.clear();

           var pos = node.getPosition();
           //中央に線を引いてみた　これはなくてもいいな
           arrow_line.drawSegment(cc.p(pos.x, pos.y),
              cc.p(endTouch.x, endTouch.y), 1,
              new cc.Color(255, 255, 255, 64));
           //debug_label2.setString(Math.floor(angle * Math.pow(10, 2)) / Math.pow(10, 2));


           var sankaku = [
               new cc.Point(0, 0),
               new cc.Point(-8, -10),
               new cc.Point(-3, -10),
               new cc.Point(0, -(dZ - 10)),
               new cc.Point(3, -10),
               new cc.Point(8, -10),
             ]

             //矢印を描画する
             var fillColor = new cc.Color(128, 128, 128, 128);
             var lineWidth = 1;
             var lineColor = new cc.Color(255, 255, 255, 128);
             node.drawPoly(sankaku, fillColor, lineWidth, lineColor);
             node.setRotation(270 - angle);

             //this.scheduleUpdate()

        }
      }

});


/*var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    //タッチ開始時の処理
    onTouchBegan:function (touch,event) {
        startTouch = touch.getLocation();

        node.setPosition(startTouch)
        return true;
    },
    //タッチ移動時の処理
    onTouchMoved:function(touch, event){
        cc.log("Touch Moved!");
        endTouch = touch.getLocation();
        calcDirection(); //角度計算と矢印の長さを設定
    },
    //タッチ終了時の処理
    onTouchEnded:function(touch, event){
        endTouch = touch.getLocation();
        calcDirection();//角度計算と矢印の長さを設定

        if (touchflag == true) {
          shape.bady.applyImpulse(cp.v(dX * -2, dY * -2), cp,v(10, 0))
          f = f -1;
          jumpText.setString("jump:" + f);
        }
    }
});*/

var game = cc.Layer.extend({
    init:function () {
        this._super();
        var size = cc.director.getWinSize();
        background = new cc.Sprite(res.TitleBG_png);
        background.getPosition(size.width / 2, size.height / 2);
        this.addChild(background);
        world = new cp.Space();
        world.gravity = cp.v(0, -100);
        var debugDraw = cc.PhysicsDebugNode.create(world);
        debugDraw.setVisible(true);
        this.addChild(debugDraw);


        var wallBottom = new cp.SegmentShape(world.staticBody,
          cp.v(-4294967294, -100), // start point
          cp.v(4294967295, -100), // MAX INT:4294967295
          0); // thickness of wall
        world.addStaticShape(wallBottom);


        // this.addBody(240,10,480,20,false,res.ground_png,"ground");
        // this.addBody(204,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(276,32,24,24,true,res.brick1x1_png,"destroyable");
        // this.addBody(240,56,96,24,true,res.brick4x1_png,"destroyable");
        // this.addBody(240,80,48,24,true,res.brick2x1_png,"solid");
        // this.addBody(228,104,72,24,true,res.brick3x1_png,"destroyable");
        // this.addBody(240,140,96,48,true,res.brick4x2_png,"solid");
        // this.addBody(240,188,24,48,true,res.totem_png,"totem");

        // this.addBody(240,10,480,20,false,res.ground_png,SpriteTag.ground);
        // this.addBody(204,32,24,24,true,res.brick1x1_png,SpriteTag.solid);
        // this.addBody(276,32,24,24,true,res.brick1x1_png,SpriteTag.solid);
        // this.addBody(240,56,96,24,true,res.brick4x1_png,SpriteTag.solid);
        // this.addBody(240,80,48,24,true,res.brick2x1_png,SpriteTag.solid);
        // this.addBody(228,104,72,24,true,res.brick3x1_png,SpriteTag.solid);
        // this.addBody(240,140,96,48,true,res.brick4x2_png,SpriteTag.solid);
        this.addBody(240,270,75,15,false,res.yuka1_png,SpriteTag.ground);
        this.addBody(40,160,75,15,false,res.yuka1_png,SpriteTag.ground);
        this.addBody(440,160,75,15,false,res.yuka1_png,SpriteTag.ground);
        this.addBody(235,80,75,15,false,res.yuka1_png,SpriteTag.ground);
        this.addBody(40,20,75,15,false,res.yuka1_png,SpriteTag.ground);
        this.addBody(240,317,50,77,true,res.hata_png,SpriteTag.goal);
        this.addBody(40,60,65,65,true,res.totem_png,SpriteTag.totem);


        this.scheduleUpdate();
        cc.eventManager.addListener(touchListener, this);
        world.setDefaultCollisionHandler (this.collisionBegin,null,null,null);

    },
    addBody: function(posX,posY,width,height,isDynamic,spriteImage,type){
        if(isDynamic){
            var body = new cp.Body(1,cp.momentForBox(1,width,height));
        }
        else{
            var body = new cp.Body(Infinity,Infinity);
        }
        body.setPos(cp.v(posX,posY));
        var bodySprite = cc.Sprite.create(spriteImage);
        gameLayer.addChild(bodySprite,0);
        bodySprite.setPosition(posX,posY);
        if(isDynamic){
           world.addBody(body);
        }
        shape = new cp.BoxShape(body, width, height);
        shape.setFriction(1);
        shape.setElasticity(0);
        shape.name=type;
        shape.setCollisionType(type);
        shape.image=bodySprite;
        world.addShape(shape);
        shapeArray.push(shape);
    },
    update:function(dt){
        world.step(dt);
        for(var i=shapeArray.length-1;i>=0;i--){
            shapeArray[i].image.x=shapeArray[i].body.p.x
            shapeArray[i].image.y=shapeArray[i].body.p.y
            var angle = Math.atan2(-shapeArray[i].body.rot.y,shapeArray[i].body.rot.x);
            shapeArray[i].image.rotation= angle*57.2957795;
        }
    },
    collisionBegin : function (arbiter, space ) {
      /*
        if((arbiter.a.name=="totem" && arbiter.b.name=="ground") || (arbiter.b.name=="totem" && arbiter.a.name=="ground")){
            console.log("Oh no!!!!");
        }
        */

        if(arbiter.a.name== SpriteTag.totem && arbiter.b.name== SpriteTag.ground ) {
           cc.audioEngine.playEffect(res.landing_mp3);
        }
        if(arbiter.a.name== SpriteTag.totem && arbiter.b.name== SpriteTag.goal ) {
           cc.audioEngine.playEffect(res.landing_mp3);
           cc.director.runScene(new gameclearScene());
        }
        return true;
    },


});


var touchListener = cc.EventListener.create({
   event: cc.EventListener.TOUCH_ONE_BY_ONE, // シングルタッチのみ対応
   swallowTouches: false, // 以降のノードにタッチイベントを渡す
   onTouchBegan: function(touch, event) { // タッチ開始時
      var pos = touch.getLocation();

      console.log("shapeArray.length:", shapeArray.length)
         // すべてのshapをチェックする
      for (var i = 0; i < shapeArray.length; i++) {
         var shape = shapeArray[i];
         console.log("shape.type:", i, shape.type)
         if (shape.name == SpriteTag.totem) {
           touchflag = true;
           return;
         }
      }
  }
});

/*
var touchListener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    onTouchBegan: function (touch, event) {
        for(var i=shapeArray.length-1;i>=0;i--){
            if(shapeArray[i].pointQuery(cp.v(touch.getLocation().x,touch.getLocation().y))!=undefined){
                if(shapeArray[i].name== SpriteTag.destroyable ){
                    gameLayer.removeChild(shapeArray[i].image);
                    world.removeBody(shapeArray[i].getBody())
                    world.removeShape(shapeArray[i])
                    shapeArray.splice(i,1);
                }
            }
        }
    }
});
*/
