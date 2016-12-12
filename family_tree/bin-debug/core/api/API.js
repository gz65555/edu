/**
 * Created by Saco on 16/3/14.
 */
var Api = (function () {
    function Api() {
    }
    var d = __define,c=Api,p=c.prototype;
    /**
     * exclude valid value:GameSocket,Log,NumberFormat,DragManager,Gesture,Keyboard,URLLoaderPool
     * module excluded wouldnt be inited
     */
    Api.Init = function (stage, exclude) {
        Api.GlobalRes = new GlobalRes();
        Api.StageUtil = new StageUtil(stage);
        Api.ModuleManager = new ModuleManager();
        // Api.MessageCenter = new MessageCenter();
        Api.DateUtil = new DateUtil();
        Api.ResourceUtil = new ResourceUtil();
        Api.Layers = new Layers(stage);
        Api.ViewManager = new ViewManager();
        Api.TimerManager = new TimerManager();
        Api.ArrayUtil = new ArrayUtil();
        Api.TipsManager = new TipsManager();
        Api.Dialogue = new Dialogue();
        Api.MathUtils = new MathUtils();
        Api.URLLoaderPool = new URLLoaderPool();
        // Api.GameSocket = new GameSocket();
        Api.TextFlowMaker = new TextFlowMaker();
        Api.Log = new Log();
        Api.NumberFormat = new NumberFormat();
        Api.DragManager = new DragManager();
        Api.Gesture = new Gesture();
        Api.Keyboard = new Keyboard();
    };
    return Api;
}());
egret.registerClass(Api,'Api');
