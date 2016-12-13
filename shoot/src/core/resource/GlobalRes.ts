/**
 * Created by Saco on 16/3/14.
 */
class GlobalRes {
    public static Lang: string;
    private _config: any;
    private _textConfig: any;
    private _textBaseConfig: any;
    public constructor() {
        this._textBaseConfig = {};
        this._textConfig = {};
        this.setLanguage();
    }

    public setLanguage(para?): void {
        var lang;
        if (para) {
            lang = para;
        } else {
            //判断浏览器参数
            lang = egret.getOption("lang");
        }

        if (lang == Lang.LANG_CN || lang == Lang.LANG_EN || lang == Lang.LANG_TW) {
            GlobalRes.Lang = lang;
        } else {
            //判断ua语言
            var ua = navigator.userAgent;
            if (ua.indexOf("; " + Lang.LANG_EN) != -1) {
                GlobalRes.Lang = Lang.LANG_EN;
            } else if (ua.indexOf("; " + Lang.LANG_CN) != -1) {
                GlobalRes.Lang = Lang.LANG_CN;
            } else if (ua.indexOf("; " + Lang.LANG_TW) != -1) {
                GlobalRes.Lang = Lang.LANG_TW;
            } else {
                GlobalRes.Lang = Lang.LANG_CN;
            }
        }
    }

    public initTextBaseConfig(config: any): void {
        this._textBaseConfig = config;
    }

    public initTextConfig(config: any): void {
        this._textConfig = config;
    }

    public initGameConfig(config: any): void {
        this._config = config;
        if (this._config) {
            EventCenter.dispatchWith("config_complete");
        }
    }

    public getConfig(name: string): any {
        var info = name.split(".");
        return this.getConfigByParas(info[0], info[1], info[2]);
    }

    public getConfigByParas(table: string, id?: string, key?: string): any {
        if (key) {
            return this._config[table][id][key];
        }
        if (id) {
            return this._config[table][id];
        }
        return this._config[table];
    }

    public getText(key: string): string {
        if (this._textConfig[key]) {
            return this._textConfig[key];
        }
        if (this._textBaseConfig[key]) {
            return this._textBaseConfig[key];
        }
        console.log("Global Text '" + key + "' not defined!");
        return "";
    }

    public getNotice(notice_num: number): string {
        var key = 'notice_' + notice_num;
        if (this._textConfig[key]) {
            return this._textConfig[key];
        }
        if (this._textBaseConfig[key]) {
            return this._textBaseConfig[key];
        }
        console.log("Global Text '" + key + "' not defined!");
        return "";
    }
}
