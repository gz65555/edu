
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/core/api/API.js",
	"bin-debug/core/common/EventCenter.js",
	"bin-debug/core/common/GameEvent.js",
	"bin-debug/core/common/JsonpManager.js",
	"bin-debug/core/const/ButtonState.js",
	"bin-debug/core/const/Lang.js",
	"bin-debug/core/control/DragManager.js",
	"bin-debug/core/control/Gesture.js",
	"bin-debug/core/control/Keyboard.js",
	"bin-debug/core/display/Button.js",
	"bin-debug/core/display/CCDisplayObjectContainer.js",
	"bin-debug/core/display/DropDownList.js",
	"bin-debug/core/display/DropDownListItem.js",
	"bin-debug/core/display/Tabbar.js",
	"bin-debug/core/display/GameTabBar.js",
	"bin-debug/core/display/HotspotBitmap.js",
	"bin-debug/core/display/ImgButton.js",
	"bin-debug/core/display/ImgNumManager.js",
	"bin-debug/core/display/MovieClip.js",
	"bin-debug/core/display/MovieClipPool.js",
	"bin-debug/core/display/ScaleView.js",
	"bin-debug/core/display/ScrollRectView.js",
	"bin-debug/core/display/TabbarButton.js",
	"bin-debug/core/display/UnderLineLabel.js",
	"bin-debug/core/extends/HashMap.js",
	"bin-debug/core/loading/SimpleLoading.js",
	"bin-debug/core/module/BaseModule.js",
	"bin-debug/core/module/ModuleManager.js",
	"bin-debug/core/resource/GlobalRes.js",
	"bin-debug/core/stage/Layers.js",
	"bin-debug/core/stage/LayerType.js",
	"bin-debug/core/stage/StageUtil.js",
	"bin-debug/core/timer/TimerManager.js",
	"bin-debug/core/tips/Dialogue.js",
	"bin-debug/core/tips/TipsManager.js",
	"bin-debug/core/urlLoader/URLLoaderPool.js",
	"bin-debug/core/utils/ArrayUtil.js",
	"bin-debug/core/utils/DateUtil.js",
	"bin-debug/core/utils/DelayOptManager.js",
	"bin-debug/core/utils/LocationProperty.js",
	"bin-debug/core/utils/Log.js",
	"bin-debug/core/utils/MathUtils.js",
	"bin-debug/core/utils/NumberFormat.js",
	"bin-debug/core/utils/ResourceUtil.js",
	"bin-debug/core/utils/TextFlowMaker.js",
	"bin-debug/core/view/BaseView.js",
	"bin-debug/core/view/ViewManager.js",
	"bin-debug/game/GameControl.js",
	"bin-debug/game/GameData.js",
	"bin-debug/game/GameDragAcceptItem.js",
	"bin-debug/game/GameDragItem.js",
	"bin-debug/game/GameView.js",
	"bin-debug/GameOverView.js",
	"bin-debug/GameStartView.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/Score.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 960,
		contentHeight: 640,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};