/**
 * Created by Saco at 2016/9/1
 **/
class SimpleLoading {
    private static _instance: SimpleLoading;
    public constructor() {

    }

    public static i(): SimpleLoading {
        if (!this._instance) {
            this._instance = new SimpleLoading();
        }
        return this._instance;
    }

    public showLoading(): void {

    }

    public hideLoading(): void {

    }

    public setProgress(value: number): void {

    }
}
