/**
 * Created by Saco at 2016/12/ 5
 **/
var GameOverView = (function (_super) {
    __extends(GameOverView, _super);
    function GameOverView() {
        _super.call(this);
        this.skinName = new GameOverSkin();
    }
    var d = __define,c=GameOverView,p=c.prototype;
    p.initView = function () {
        this.btn_restart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    };
    p.open = function (para) {
        _super.prototype.open.call(this);
        this.tf_total.text = para;
        if (para <= 2) {
            this.tf_evalue.text = "Try Again";
        }
        else if (para <= 4) {
            this.tf_evalue.text = "Very Good!";
            egret.setTimeout(function () {
                RES.getRes("good_mp3").play(0, 1);
            }, this, 500);
        }
        else {
            this.tf_evalue.text = "Excellent!";
            egret.setTimeout(function () {
                RES.getRes("verygood_mp3").play(0, 1);
            }, this, 500);
        }
        this.tf_score.text = "总分数：" + para + "分";
    };
    p.onRestart = function () {
        this.close();
    };
    p.close = function () {
        _super.prototype.close.call(this);
        Api.ViewManager.getView(2).reset();
    };
    return GameOverView;
}(BaseView));
egret.registerClass(GameOverView,'GameOverView');
