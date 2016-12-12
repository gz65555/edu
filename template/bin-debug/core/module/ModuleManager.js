/**
 * Created by Saco on 16/3/14.
 */
var ModuleManager = (function () {
    function ModuleManager() {
        this._modules = Object.create(null);
    }
    var d = __define,c=ModuleManager,p=c.prototype;
    p.regModule = function (moduleKey, cls) {
        if (this._modules[moduleKey]) {
            console.error("duplicate module reg:" + moduleKey);
            return;
        }
        this._modules[moduleKey] = new cls();
    };
    p.getModule = function (moduleKey) {
        if (!this._modules[moduleKey]) {
            console.error("cant find module:" + moduleKey);
            return null;
        }
        return this._modules[moduleKey];
    };
    return ModuleManager;
}());
egret.registerClass(ModuleManager,'ModuleManager');
