/**
* Created By Saco At 2016.06.29
* Last Modified: 2016.06.29
**/
var MovieClipPool = (function () {
    function MovieClipPool() {
        this._pool = [];
    }
    var d = __define,c=MovieClipPool,p=c.prototype;
    MovieClipPool.i = function () {
        if (!this._instance) {
            this._instance = new MovieClipPool();
        }
        return this._instance;
    };
    p.recycleMC = function (mc) {
        mc.reset();
        if (mc.parent) {
            mc.parent.removeChild(mc);
        }
        this._pool.push(mc);
    };
    p.getMC = function () {
        if (this._pool.length) {
            return this._pool.shift();
        }
        return new MovieClip();
    };
    return MovieClipPool;
}());
egret.registerClass(MovieClipPool,'MovieClipPool');
