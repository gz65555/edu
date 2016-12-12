/**
 * Created by Saco on 16/4/4.
 */
var URLLoaderPool = (function () {
    function URLLoaderPool() {
        this._loaderPool = [];
        this._loaderCallBack = new Dict();
    }
    var d = __define,c=URLLoaderPool,p=c.prototype;
    p.load = function (url, callback, callbackObj, type, data) {
        if (type === void 0) { type = egret.URLRequestMethod.POST; }
        var loader = this.getNewLoader();
        var urlReq = loader["_request"];
        urlReq.method = type;
        urlReq.url = url;
        if (data) {
            var urlReqData = new egret.URLVariables();
            urlReqData.variables = data;
        }
        urlReq.data = urlReqData;
        this._loaderCallBack[loader.hashCode] = { call: callback, obj: callbackObj };
        loader.load(urlReq);
    };
    p.recycleLoader = function (loader) {
        this._loaderPool.push(loader);
    };
    p.getNewLoader = function () {
        if (this._loaderPool.length) {
            return this._loaderPool.shift();
        }
        var loader = new egret.URLLoader();
        this.initLoaderEvent(loader);
        var loadReq = new egret.URLRequest();
        loader["_request"] = loadReq;
        return loader;
    };
    p.initLoaderEvent = function (loader) {
        loader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
    };
    p.onLoadComplete = function (e) {
        var callInfo = this._loaderCallBack[e.currentTarget.hashCode];
        callInfo.call.call(callInfo.obj, e.currentTarget.data);
        e.currentTarget["_request"].data = null;
        this.recycleLoader(e.currentTarget);
        delete this._loaderCallBack[e.currentTarget.hashCode];
    };
    p.onLoadError = function (e) {
        Api.Log.error("urlloader ioerror :" + e.currentTarget._request.url);
        this.recycleLoader(e.currentTarget);
        e.currentTarget["_request"].data = null;
        delete this._loaderCallBack[e.currentTarget.hashCode];
    };
    return URLLoaderPool;
}());
egret.registerClass(URLLoaderPool,'URLLoaderPool');
