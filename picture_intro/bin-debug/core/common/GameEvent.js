/**
 * Created by Saco on 2014/8/2.
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, body) {
        _super.call(this, type);
        this.eventBody = body;
    }
    var d = __define,c=GameEvent,p=c.prototype;
    GameEvent.GAME_EVENT_GAMEOVER = "game_over";
    GameEvent.GAME_EVENT_GAMESTART = "game_start";
    GameEvent.GAME_EVENT_GAMERESTART = "game_restart";
    GameEvent.GAME_EVENT_SHARE = "game_share";
    GameEvent.SERVER_CONNECTED = "server_connected";
    GameEvent.SERVER_CONNECT_CLOSE = "server_connect_close";
    GameEvent.DRAG_BEGIN = "drag_begin";
    GameEvent.DRAG_MOVE = "drag_move";
    GameEvent.DRAG_END = "drag_end";
    return GameEvent;
}(egret.Event));
egret.registerClass(GameEvent,'GameEvent');
