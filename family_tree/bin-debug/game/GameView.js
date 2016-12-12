/**
 * Created by HuSong on 2016/12/10.
 */
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.skinName = new GameSkin();
    }
    var d = __define,c=GameView,p=c.prototype;
    p.initView = function () {
        var _this = this;
        _super.prototype.initView.call(this);
        this.forEachDragItem(function (item, index) {
            item.init(index);
        });
        this.forEachDragAccept(function (item, index) {
            item.init(index);
        });
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            if (_this.btn.source == 'check_png') {
                _this.check();
                Api.ViewManager.openView(4, GameData.score);
                _this.btn.source = 'submit_png';
            }
            else {
                Api.ViewManager.openView(3, GameData.score);
            }
        }, this);
    };
    p.check = function () {
        GameData.score = 0;
        this.forEachDragAccept(function (item) {
            if (item.check()) {
                GameData.score += 1;
            }
        });
        this.tf_total.text = GameData.score.toString();
    };
    p.reset = function () {
        GameData.score = 0;
        this.tf_total.text = "0";
        this.btn.source = 'check_png';
        this.forEachDragItem(function (item) {
            item.reset();
        });
        this.forEachDragAccept(function (item) {
            item.reset();
        });
    };
    p.forEachDragItem = function (func) {
        this.forEachItem('drag', func);
    };
    p.forEachDragAccept = function (func) {
        this.forEachItem('drag_ac', func);
    };
    p.forEachItem = function (name, func) {
        for (var i = 0; i < 6; i++) {
            func(this[name + '_' + i], i);
        }
    };
    return GameView;
}(BaseView));
egret.registerClass(GameView,'GameView');
