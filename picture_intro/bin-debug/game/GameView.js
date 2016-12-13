/**
 * Created by HuSong on 2016/12/12.
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.MAX_QUESTION = 6;
        this.index = 0;
        this.skinName = new GameSkin();
    }
    var d = __define,c=GameView,p=c.prototype;
    p.initView = function () {
        _super.prototype.initView.call(this);
        this.forEachDragItem(function (item, index) {
            item.init(index);
        });
        this.dragAccept.addEventListener(GameDragAcceptItem.DRAG_IN, this.onDragIn, this);
        this.gameGroup.touchChildren = false;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTouch, this);
    };
    p.onBtnTouch = function () {
        if (this.index == 0) {
            this.start();
        }
        else {
            Api.ViewManager.close(this);
            Api.ViewManager.openView(3, GameData.score);
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        this.index = 0;
    };
    p.start = function () {
        var _this = this;
        this.gameGroup.touchChildren = true;
        this.btn.visible = false;
        var config = GameData.pic_mapping;
        config.forEach(function (item) {
            item.randomKey = Math.random();
        });
        config.sort(function (t1, t2) { return t1.randomKey - t2.randomKey; });
        config.forEach(function (item, index) {
            _this.resetImage(index);
        });
        this.forEachDragItem(function (item) {
            item.visible = true;
        });
        this.index = 0;
        GameData.score = 0;
        this.tf_total.text = '0';
        this.next();
    };
    p.next = function () {
        if (this.index > 0) {
            this.resetImage(this.index - 1);
        }
        if (this.index >= this.MAX_QUESTION) {
            this.end();
            return;
        }
        this.markImage(this.index);
        this.dragAccept.reset();
        this.dragAccept.init(this.index);
        this.txtMark.text = (this.index + 1) + '/' + this.MAX_QUESTION;
        this.index++;
    };
    p.end = function () {
        this.btn.source = 'submit_png';
        this.btn.visible = true;
    };
    p.resetImage = function (index) {
        var config = GameData.pic_mapping[index];
        this[config.text].source = config.normal;
    };
    p.markImage = function (index) {
        var config = GameData.pic_mapping[index];
        this[config.text].source = config.select;
    };
    p.forEachDragItem = function (func) {
        this.forEachItem('drag', func);
    };
    p.forEachItem = function (name, func) {
        for (var i = 0; i < 6; i++) {
            func(this[name + '_' + i], i);
        }
    };
    p.onDragIn = function () {
        if (this.dragAccept.check()) {
            Api.ViewManager.openView(4, 1);
            GameData.score++;
            this.tf_total.text = GameData.score.toString();
            RES.getRes('welldone_mp3').play(0, 1);
        }
        else {
            RES.getRes('oops_mp3').play(0, 1);
        }
        egret.setTimeout(this.next, this, 2000);
    };
    return GameView;
}(BaseView));
egret.registerClass(GameView,'GameView');
