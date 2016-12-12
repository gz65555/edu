/**
 * Created by Saco on 16/3/21.
 */
var StageUtil = (function () {
    function StageUtil(stage) {
        this.init(stage);
    }
    var d = __define,c=StageUtil,p=c.prototype;
    p.init = function (stage) {
        this.stage = stage;
        this.stageHeight = stage.stageHeight;
        this.stageWidth = stage.stageWidth;
        this.stage.addEventListener(egret.Event.RESIZE, this.resizeStage, this);
    };
    p.resizeStage = function () {
        this.stageHeight = this.stage.stageHeight;
        this.stageWidth = this.stage.stageWidth;
        Api.Layers.resizeLayer();
    };
    return StageUtil;
}());
egret.registerClass(StageUtil,'StageUtil');
