/**
 * Created by Saco at 2016/11/22
 **/
class TipsManager {
    private _tipsPool: TipsItem[];
    private _currTips: TipsItem[];
    private _itemType: any;
    private _margin: number;
    private _fadeTime: number;
    private _moveDis: number;
    private _maxTips: number;
    private _timer: number;
    public constructor() {
        this._margin = 5;
        this._maxTips = 5;
        this._fadeTime = 2000;
        this._moveDis = 150;
        this._tipsPool = [];
        this._currTips = [];
    }

    public setItemType(type: any): void {
        this._itemType = type;
    }

    /**
     * prop:margin/fadeTime/moveDis/maxTips
     */
    public setProp(prop: any): void {
        if (prop.margin) {
            this._margin = prop.margin;
        }
        if (prop.fadeTime) {
            this._fadeTime = prop.fadeTime;
        }
        if (prop.moveDis) {
            this._moveDis = prop.moveDis;
        }
        if (prop.maxTips) {
            this._maxTips = prop.maxTips;
        }
    }

    public showTips(txt: string) {
        var tip = this.getTips();
        tip.onShow(txt);
        tip.x = (Api.StageUtil.stageWidth - tip.width) / 2;
        tip.y = Api.StageUtil.stageHeight / 2;
        if (this._currTips.length) {
            var lastTip = this._currTips[this._currTips.length - 1];
            tip.y = lastTip.y + lastTip.height + this._margin;
        }
        if (this._currTips.length > this._maxTips) {
            this.recycleTip(<TipsItem>this._currTips[0]);
        }
        Api.Layers.getLayer(LayerType.TIPS).addChild(tip);
        this._currTips.push(tip);
        this.moveTips(tip);
    }

    private moveTips(tip): void {
        var tarY = tip.y - this._moveDis;
        egret.Tween.get(tip).to({ y: tarY }, this._fadeTime).call(this.onMoveEnd, this, [tip]);
    }

    private onMoveEnd(tip): void {
        this.recycleTip(tip);
    }

    //show tips by keys in global text
    public showTipsByKey(key: string): void {
        this.showTips(Api.GlobalRes.getText(key));
    }

    private getTips(): TipsItem {
        if (this._tipsPool.length) {
            return this._tipsPool.pop();
        }
        var tip = new this._itemType();
        tip.touchEnabled = false;
        return tip;
    }

    private recycleTip(tip: TipsItem): void {
        this._currTips.shift();
        egret.Tween.removeTweens(tip);
        if (tip.stage) {
            Api.Layers.getLayer(LayerType.TIPS).removeChild(tip);
        }
        this._tipsPool.push(tip);
        tip.onHide();
    }
}


interface TipsItem extends egret.DisplayObject {
    onShow(txt: string): void
    onHide(): void
}
