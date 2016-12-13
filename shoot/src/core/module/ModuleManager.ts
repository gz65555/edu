/**
 * Created by Saco on 16/3/14.
 */
class ModuleManager {
    private _modules:any;
    public constructor() {
        this._modules = Object.create(null);
    }

    public regModule(moduleKey:number, cls:any):void {
        if(this._modules[moduleKey]) {
            console.error("duplicate module reg:" + moduleKey);
            return;
        }
        this._modules[moduleKey] = new cls();
    }

    public getModule(moduleKey):any {
        if (!this._modules[moduleKey]) {
            console.error("cant find module:" + moduleKey);
            return null;
        }
        return this._modules[moduleKey];
    }
}