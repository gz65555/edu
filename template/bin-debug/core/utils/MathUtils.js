/**
 * Created by Saco on 16/4/18.
 */
var MathUtils = (function () {
    function MathUtils() {
        this.PI = 3.14;
    }
    var d = __define,c=MathUtils,p=c.prototype;
    p.angleToArc = function (angle) {
        return angle / 180 * this.PI;
    };
    p.distance = function (p1x, p1y, p2x, p2y) {
        var total = Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2);
        return Math.sqrt(total);
    };
    p.pointDistance = function (p1, p2) {
        return this.distance(p1.x, p1.y, p2.x, p2.y);
    };
    p.getArc = function (startX, startY, endX, endY) {
        return Math.atan2(endY - startY, endX - startX);
    };
    p.getAngle = function (startX, startY, endX, endY) {
        return Math.atan2(endY - startY, endX - startX) / this.PI * 180;
    };
    return MathUtils;
}());
egret.registerClass(MathUtils,'MathUtils');
