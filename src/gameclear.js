//myScene.js
var MyLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var TitleBG_png = cc.Sprite.create(res.TitleBG_png);
         TitleBG_png.setPosition(size.width / 2, size.height / 2);
        this.addChild(TitleBG_png);

        var Title_png = cc.Sprite.create(res.Title_png);
         Title_png.setPosition(size.width / 2, size.height / 2 + 50);
        this.addChild(Title_png);

        var start_png = cc.Sprite.create(res.start_png);
        start_png.setPosition(size.width / 2, size.height / 6);
        this.addChild(start_png);

        //雲
        this.schedule(this.addCloud, 4);

        //add code
         //タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },
    //雲
    addCloud: function(/*event*/) {
      var cloud = new Cloud();
      this.addChild(cloud);
    },
    removeCloud: function(cloud) {
      this.removeChild(cloud);
    },

    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new gameScene());
    },
});

//雲クラス
var Cloud = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile(res.kumo_png);
    },
    onEnter: function() {
        this._super();
        this.setPosition(500, 280);
        var moveAction = cc.MoveTo.create(5.5, new cc.Point( -100, 275));
        this.runAction(moveAction);
        this.scheduleUpdate();
    },
  /*  //画面の外にでた雲を消去する処理
            if (this.getPosition().x < -50) {
                gameLayer.removeCloud(this)
            }*/
});

var MyScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
    }
});
