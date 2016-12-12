/**
 * Created by Saco on 16/4/4.
 */
class URLLoaderPool {
    private _loaderPool: egret.URLLoader[];
    private _loaderCallBack: Dict;

    public constructor() {
        this._loaderPool = [];
        this._loaderCallBack = new Dict();
    }

    public load(url: string, callback: Function, callbackObj: any, type: string = egret.URLRequestMethod.POST, data?: any): void {
        var loader: egret.URLLoader = this.getNewLoader();
        var urlReq: egret.URLRequest = loader["_request"];
        urlReq.method = type;
        urlReq.url = url;
        if (data) {
            var urlReqData: egret.URLVariables = new egret.URLVariables();
            urlReqData.variables = data;
        }
        urlReq.data = urlReqData;
        this._loaderCallBack[loader.hashCode] = { call: callback, obj: callbackObj };
        loader.load(urlReq);
    }

    private recycleLoader(loader: egret.URLLoader): void {
        this._loaderPool.push(loader);
    }

    private getNewLoader(): egret.URLLoader {
        if (this._loaderPool.length) {
            return this._loaderPool.shift();
        }
        var loader: egret.URLLoader = new egret.URLLoader();
        this.initLoaderEvent(loader);
        var loadReq: egret.URLRequest = new egret.URLRequest();
        loader["_request"] = loadReq;
        return loader;
    }

    private initLoaderEvent(loader: egret.URLLoader): void {
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    }

    private onLoadComplete(e: egret.Event): void {
        var callInfo = this._loaderCallBack[e.currentTarget.hashCode];
        callInfo.call.call(callInfo.obj, e.currentTarget.data);
        e.currentTarget["_request"].data = null;
        this.recycleLoader(e.currentTarget);
        delete this._loaderCallBack[e.currentTarget.hashCode];
    }

    private onLoadError(e: egret.IOErrorEvent): void {
        Api.Log.error("urlloader ioerror :" + e.currentTarget._request.url);
        this.recycleLoader(e.currentTarget);
        e.currentTarget["_request"].data = null;
        delete this._loaderCallBack[e.currentTarget.hashCode];
    }
}
