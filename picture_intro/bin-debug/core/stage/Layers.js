/**
 * Created by Saco on 2014/11/20.
 */
var Layers = (function () {
    function Layers(stage) {
        this.init(stage);
    }
    var d = __define,c=Layers,p=c.prototype;
    /*
    * stage:游戏文档类初始化，传入游戏stage
    * */
    p.init = function (stage) {
        if (this._layers)
            return;
        this._layers = {};
        this.addLayer(this._layers, LayerType.BACKGROUND, stage);
        this.addLayer(this._layers, LayerType.GAME, stage);
        this.addLayer(this._layers, LayerType.UI_BOTTOM, stage);
        this.addLayer(this._layers, LayerType.UI, stage);
        this.addLayer(this._layers, LayerType.UI_TOP, stage);
        this.addLayer(this._layers, LayerType.TIPS, stage);
        this.addLayer(this._layers, LayerType.GUIDE, stage);
        this.addLayer(this._layers, LayerType.ALERT, stage);
        this.resizeLayer();
    };
    p.addLayer = function (layers, type, stage) {
        var layer = new eui.Group();
        layer.touchEnabled = false;
        layers[type] = layer;
        stage.addChild(layer);
    };
    p.resizeLayer = function () {
        for (var key in this._layers) {
            this._layers[key].width = Api.StageUtil.stageWidth;
            this._layers[key].height = Api.StageUtil.stageHeight;
        }
    };
    /*
    * type : 取值于LayerType
    * 获取目标层
    * */
    p.getLayer = function (type) {
        return this._layers[type];
    };
    /**
     * 获取所有显示层级
     * @returns {any}
     */
    p.getLayers = function () {
        return this._layers;
    };
    return Layers;
}());
egret.registerClass(Layers,'Layers');
