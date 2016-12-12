/**
 * Created by Saco on 16/3/14.
 */
var GlobalRes = (function () {
    function GlobalRes() {
        this._textBaseConfig = {};
        this._textConfig = {};
        this.setLanguage();
    }
    var d = __define,c=GlobalRes,p=c.prototype;
    p.setLanguage = function (para) {
        var lang;
        if (para) {
            lang = para;
        }
        else {
            //判断浏览器参数
            lang = egret.getOption("lang");
        }
        if (lang == Lang.LANG_CN || lang == Lang.LANG_EN || lang == Lang.LANG_TW) {
            GlobalRes.Lang = lang;
        }
        else {
            //判断ua语言
            var ua = navigator.userAgent;
            if (ua.indexOf("; " + Lang.LANG_EN) != -1) {
                GlobalRes.Lang = Lang.LANG_EN;
            }
            else if (ua.indexOf("; " + Lang.LANG_CN) != -1) {
                GlobalRes.Lang = Lang.LANG_CN;
            }
            else if (ua.indexOf("; " + Lang.LANG_TW) != -1) {
                GlobalRes.Lang = Lang.LANG_TW;
            }
            else {
                GlobalRes.Lang = Lang.LANG_CN;
            }
        }
    };
    p.initTextBaseConfig = function (config) {
        this._textBaseConfig = config;
    };
    p.initTextConfig = function (config) {
        this._textConfig = config;
    };
    p.initGameConfig = function (config) {
        this._config = config;
        if (this._config) {
            EventCenter.dispatchWith("config_complete");
        }
    };
    p.getConfig = function (name) {
        var info = name.split(".");
        return this.getConfigByParas(info[0], info[1], info[2]);
    };
    p.getConfigByParas = function (table, id, key) {
        if (key) {
            return this._config[table][id][key];
        }
        if (id) {
            return this._config[table][id];
        }
        return this._config[table];
    };
    p.getText = function (key) {
        if (this._textConfig[key]) {
            return this._textConfig[key];
        }
        if (this._textBaseConfig[key]) {
            return this._textBaseConfig[key];
        }
        console.log("Global Text '" + key + "' not defined!");
        return "";
    };
    p.getNotice = function (notice_num) {
        var key = 'notice_' + notice_num;
        if (this._textConfig[key]) {
            return this._textConfig[key];
        }
        if (this._textBaseConfig[key]) {
            return this._textBaseConfig[key];
        }
        console.log("Global Text '" + key + "' not defined!");
        return "";
    };
    return GlobalRes;
}());
egret.registerClass(GlobalRes,'GlobalRes');
