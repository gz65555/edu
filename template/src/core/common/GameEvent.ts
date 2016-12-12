/**
 * Created by Saco on 2014/8/2.
 */
class GameEvent extends egret.Event {
    public static GAME_EVENT_GAMEOVER: string = "game_over";
    public static GAME_EVENT_GAMESTART: string = "game_start";
    public static GAME_EVENT_GAMERESTART: string = "game_restart";
    public static GAME_EVENT_SHARE: string = "game_share";
    public static SERVER_CONNECTED: string = "server_connected";
    public static SERVER_CONNECT_CLOSE: string = "server_connect_close";
    public static DRAG_BEGIN: string = "drag_begin";
    public static DRAG_MOVE: string = "drag_move";
    public static DRAG_END: string = "drag_end";

    public type: string;
    public eventBody: any;
    public constructor(type: string, body?: any) {
        super(type);
        this.eventBody = body;
    }
}
