/**
 * Created by Saco on 2014/11/20.
 */
class Layers {
    private _layers: any;

    public constructor(stage: egret.Stage) {
        this.init(stage);
    }
    /*
    * stage:游戏文档类初始化，传入游戏stage
    * */
    public init(stage: egret.Stage): void {
        if (this._layers) return;
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
    }

    private addLayer(layers: any, type: string, stage: egret.Stage): void {
        var layer: eui.Group = new eui.Group();
        layer.touchEnabled = false;
        layers[type] = layer;
        stage.addChild(layer);
    }

    public resizeLayer(): void {
        for (var key in this._layers) {
            this._layers[key].width = Api.StageUtil.stageWidth;
            this._layers[key].height = Api.StageUtil.stageHeight;
        }
    }

    /*
    * type : 取值于LayerType
    * 获取目标层
    * */
    public getLayer(type: string): egret.DisplayObjectContainer {
        return this._layers[type];
    }

    /**
     * 获取所有显示层级
     * @returns {any}
     */
    public getLayers(): any {
        return this._layers;
    }
}
