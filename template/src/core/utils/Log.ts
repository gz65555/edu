/**
 * Created by Saco on 16/1/18.
 */
class Log {
    private _logLevel;

    public constructor() {
        this._logLevel = LogLevel.ERROR;
        if (egret.getOption("debug") == "1") {
            this._logLevel = LogLevel.DEBUG;
        }
        // this._logLevel = 100;
    }

    public setLevel(level: number): void {
        this._logLevel = level;
    }

    public debug(msg: any): void {
        if (this._logLevel <= LogLevel.DEBUG) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.debug("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    }

    public info(msg: any): void {
        if (this._logLevel <= LogLevel.INFO) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.log("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    }

    public warn(msg: any): void {
        if (this._logLevel <= LogLevel.WARN) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.warn("[" + Api.DateUtil.getTimeInfo() + "]" + msg);

        }
    }

    public error(msg: any): void {
        if (this._logLevel <= LogLevel.ERROR) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.error("[" + Api.DateUtil.getTimeInfo() + "]" + msg);
        }
    }

    public fatal(msg: any): void {
        if (this._logLevel <= LogLevel.FATAL) {
            if (msg instanceof Object) {
                msg = JSON.stringify(msg);
            }
            console.error("[" + Api.DateUtil.getTimeInfo() + "]" + msg);

        }
    }
}

enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL
}

