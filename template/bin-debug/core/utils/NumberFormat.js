/**
 * Created by Saco on 16/5/11.
 */
var NumberFormat = (function () {
    function NumberFormat() {
    }
    var d = __define,c=NumberFormat,p=c.prototype;
    p.formatNumber = function (num) {
        return this.formatString(num + "");
    };
    p.formatString = function (str) {
        var len = str.length;
        if (len < 5)
            return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        }
        else if (unit == 2) {
            flag = "M";
        }
        else if (unit == 3) {
            flag = "B";
        }
        var final = "";
        var index = 0;
        for (var i = len - 1; i >= 0; i--) {
            index++;
            final = str.charAt(i) + final;
            if (index % 3 == 0 && i != 0) {
                final = "." + final;
            }
        }
        final = final.slice(0, 4);
        if (final.charAt(3) == ".") {
            final = final.slice(0, 3);
        }
        return final + flag;
    };
    p.formatString2 = function (str) {
        var len = str.length;
        if (len < 8)
            return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        }
        else if (unit == 2) {
            flag = "M";
        }
        else if (unit == 3) {
            flag = "B";
        }
        var final = "";
        var index = 0;
        for (var i = len - 1; i >= 0; i--) {
            index++;
            final = str.charAt(i) + final;
            if (index % 3 == 0 && i != 0) {
                final = "." + final;
            }
        }
        final = final.slice(0, 6);
        if (final.charAt(5) == ".") {
            final = final.slice(0, 5);
        }
        return final + flag;
    };
    return NumberFormat;
}());
egret.registerClass(NumberFormat,'NumberFormat');
