/**
 * Created by Saco at 2016/6/19
 */
class ArrayUtil {
    public constructor() {
    }

    public sortBy(arr: any[], key: string): void {
        arr.sort(this.sortByKeyFun(key));
    }

    private sortByKeyFun(key: string): (a: any, b: any) => number {
        return function(item1: any, item2: any): number {
            if (item1[key] > item2[key]) {
                return -1;
            } else if (item1[key] == item2[key]) {
                return 0;
            } else {
                return 1;
            }
        };
    }

    public getRandomArray(len: number): number[] {
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr.sort(this.randomSort);
    }

    public randomSort(t1, t2): number {
        return Math.random() > .5 ? -1 : 1;
    }
}
