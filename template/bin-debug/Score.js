/**
 * Created by Saco at 2016/12/10
 **/
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.call(this);
        this.skinName = new ScoreSkin();
        this.width = 195;
        this.height = 95;
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    var d = __define,c=Score,p=c.prototype;
    p.setSize = function () { };
    p.initView = function () {
    };
    p.open = function (txt) {
        var _this = this;
        _super.prototype.open.call(this);
        this.tf_score.text = txt;
        egret.callLater(function () {
            var tarY = _this.y - 100;
            egret.Tween.get(_this).to({ y: tarY }, 1000).call(_this.close, _this);
        }, this);
    };
    return Score;
}(BaseView));
egret.registerClass(Score,'Score');
