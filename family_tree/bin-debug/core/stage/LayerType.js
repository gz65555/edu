/**
 * Created by Saco on 2014/11/20.
 */
var LayerType = (function () {
    function LayerType() {
    }
    var d = __define,c=LayerType,p=c.prototype;
    /*警告层*/
    LayerType.ALERT = "alert";
    /*引导层*/
    LayerType.GUIDE = "guide";
    /*提示层*/
    LayerType.TIPS = "tips";
    /*UI上层*/
    LayerType.UI_TOP = "ui_top";
    /*UI层*/
    LayerType.UI = "ui";
    /*UI底层*/
    LayerType.UI_BOTTOM = "ui_bottom";
    /*游戏层*/
    LayerType.GAME = "game";
    /*背景层*/
    LayerType.BACKGROUND = "background";
    return LayerType;
}());
egret.registerClass(LayerType,'LayerType');
