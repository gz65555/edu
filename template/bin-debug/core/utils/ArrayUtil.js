/**
 * Created by Saco at 2016/6/19
 */
var ArrayUtil = (function () {
    function ArrayUtil() {
    }
    var d = __define,c=ArrayUtil,p=c.prototype;
    p.sortBy = function (arr, key) {
        arr.sort(this.sortByKeyFun(key));
    };
    p.sortByKeyFun = function (key) {
        return function (item1, item2) {
            if (item1[key] > item2[key]) {
                return -1;
            }
            else if (item1[key] == item2[key]) {
                return 0;
            }
            else {
                return 1;
            }
        };
    };
    p.getRandomArray = function (len) {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr.sort(this.randomSort);
    };
    p.randomSort = function (t1, t2) {
        return Math.random() > .5 ? -1 : 1;
    };
    return ArrayUtil;
}());
egret.registerClass(ArrayUtil,'ArrayUtil');
