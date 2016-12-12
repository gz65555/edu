/**
 * Created by Saco on 16/5/11.
 */
class NumberFormat {
    public constructor() {

    }

    public formatNumber(num: number): string {
        return this.formatString(num + "");
    }

    public formatString(str: string): string {
        var len = str.length;
        if (len < 5) return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        } else if (unit == 2) {
            flag = "M";
        } else if (unit == 3) {
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
    }

    public formatString2(str: string): string {
        var len = str.length;
        if (len < 8) return str;
        var unit = Math.floor((len - 1) / 3);
        var flag;
        if (unit == 1) {
            flag = "K";
        } else if (unit == 2) {
            flag = "M";
        } else if (unit == 3) {
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
    }
}
