/**
 * Created by Saco on 2015/6/2.
 */
class CCDisplayObjectContainer extends egret.DisplayObjectContainer
{
    private _childIndex:any;

    public constructor()
    {
        super();
        this._childIndex = {};
    }

    public addChild(item:egret.DisplayObject):egret.DisplayObject{
        this._childIndex[this.getNewMaxIndex()] = item;
        return super.addChild(item);
    }

    public addChildAt(item:egret.DisplayObject, index:number):egret.DisplayObject{
        this.validateChildrenIndex(index);
        this._childIndex[index] = item;
        this.addChild(item);
        this.sortChildren(index);
        return item;
    }

    public removeChild(item:egret.DisplayObject):egret.DisplayObject{
        this.deleteChild(item);
        return super.removeChild(item);
    }

    private getNewMaxIndex():number{
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        return parseFloat(childKeys[childKeys.length-1]) + 1;
    }

    private deleteChild(item:egret.DisplayObject):void{
        var keys = Object.keys(this._childIndex);
        for(var i = 0, len = keys.length; i < len; i ++){
            if(this._childIndex[keys[i]] == item){
                delete this._childIndex[keys[i]];
                break;
            }
        }
    }

    private validateChildrenIndex(index:number):void{
        var tempIndex = index;
        while(this._childIndex[tempIndex]){
            tempIndex -= 0.01;
            if(this._childIndex[tempIndex] == undefined){
                for(var i = tempIndex; i < index; i += 0.01){
                    this._childIndex[i] = this._childIndex[i + 0.01];
                }
                break;
            }
        }
    }

    private sortChildren(index:number):void{
        var childKeys = Object.keys(this._childIndex);
        childKeys.sort();
        for(var i = 0, len = childKeys.length; i < len; i ++){
            if(i < index) continue;
            this.addChild(this._childIndex[childKeys[i]]);
        }
    }

    public setChildZIndex(item:egret.DisplayObject, zindex:number):void{
        this.validateChildrenIndex(zindex);
        this.addChild(item);
        this.sortChildren(zindex);
    }
}