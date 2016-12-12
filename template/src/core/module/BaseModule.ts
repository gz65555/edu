/**
 * Created by Saco on 16/3/14.
 */
class BaseModule {

    public constructor() {
    }

    public regMsgListener(msg: any, listener: Function): void {
        Api["MessageCenter"].regMsgListener(msg, listener, this);
    }

    public sendMsg(msg: any): void {
        Api["GameSocket"].sendMsg(msg);
    }
}
