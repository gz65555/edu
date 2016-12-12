/**
 * Created by Saco on 16/3/14.
 */
class ViewManager {
    private _views: any;
    private backBlack: eui.Rect;

    public constructor() {
        this._views = Object.create(null);
    }

    private initMask(): void {
        this.backBlack = new eui.Rect(Api.StageUtil.stageWidth, Api.StageUtil.stageHeight, 0x000000);
        this.backBlack.alpha = 0.6;
        this.backBlack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    public regView(viewConst: number, view: any, layer: string): void {
        this._views[viewConst] = new view();
        this._views[viewConst].viewID = viewConst;
        this._views[viewConst].viewParent = Api.Layers.getLayer(layer);
    }

    public openView(viewConst: number, param: any = null): void {
        if (this._views[viewConst]) {
            var view = this._views[viewConst];
            view.openView(param);
        }
    }

    public openViewAndClose(viewConst: number, closeView: any, param?): void {
        if (this._views[viewConst]) {
            var view = this._views[viewConst];
            view.closeHookView = closeView;
            view.openView(param);
        }
    }

    public getView(viewConst: number): any {
        return this._views[viewConst];
    }

    public closeView(viewConst: number): void {
        if (this._views[viewConst]) {
            this._views[viewConst].close();
        }
    }

    public closeViewsByLayer(layer: string) {
        var thisLayer = Api.Layers.getLayer(layer);
        while (thisLayer.numChildren > 0) {
            var child: BaseView = <BaseView>thisLayer.getChildAt(0);
            child.close();
        }
    }

    public close(view: BaseView): void {
        view.close();
    }

    public closeAll(view?: BaseView): void {
        var layers = Api.Layers.getLayers();
        for (var key in layers) {
            var numChild = layers[key].numChildren - 1;
            while (numChild >= 0) {
                var child: any = layers[key].getChildAt(numChild);
                numChild--;
                if (child == view) continue;
                if (child instanceof BaseView) {
                    child.close();
                } else {
                    child.parent.removeChild(child);
                }
            }
        }
    }
}
