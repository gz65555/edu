/**
 * Created by Saco on 2014/12/10.
 */
class JsonpManager
{
    private static _regID:number = 0;
    private static _callbackCount:number = 0;
    public static completeCall:any = {};
    public static process(url:string, callback:Function, callobj:any):void {
        JsonpManager.completeCall["call_"+JsonpManager._regID] = ()=>{
			callback.bind(callobj)();
			JsonpManager._callbackCount ++;
			if (JsonpManager._callbackCount == JsonpManager._regID) {
				JsonpManager.completeCall = {};
			}
		}
        JsonpManager.startLoader(url, JsonpManager._regID++);
    }

    private static startLoader(url:string, id:number):void{
        var script = document.createElement('script');
        script.src = url + "JsonpManager.completeCall.call_" + id +"";
        document.body.appendChild(script);
        var xhr = this.getXHR();
        xhr.open("HEAD", "index.html", true);
        xhr.send();
    }

    private static getXHR():any {
        if (window["XMLHttpRequest"]) {
            return new window["XMLHttpRequest"]();
        } else {
            return new ActiveXObject("MSXML2.XMLHTTP");
        }
    }
}
