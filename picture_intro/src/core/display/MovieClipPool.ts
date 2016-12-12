/**
* Created By Saco At 2016.06.29
* Last Modified: 2016.06.29
**/
class MovieClipPool {
    private _pool:MovieClip[];
    private static _instance:MovieClipPool;
    public constructor() {
        this._pool = [];
    }

    public static i():MovieClipPool {
        if (!this._instance) {
            this._instance = new MovieClipPool();
        }
        return this._instance;
    }

    public recycleMC(mc:MovieClip):void {
        mc.reset();
        if (mc.parent) {
            mc.parent.removeChild(mc);
        }
        this._pool.push(mc);
    } 

    public getMC():MovieClip {
        if (this._pool.length) {
            return this._pool.shift();
        }
        return new MovieClip();
    }
}
