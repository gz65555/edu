/**
 * Created by Saco on 16/5/13.
 */
class DropDownListItem extends eui.Label implements eui.IItemRenderer {
    private _data:any;
    public selected:boolean;
    public itemIndex:number;
    public constructor() {
        super();
        this.initDisplay();
    }

    private initDisplay():void {
        this.left = 0;
        this.right = 0;
        this.height = 30;
        this.stroke = 1;
        this.size = 20;
        this.verticalAlign = "middle";
        this.textAlign = "center";
    }
    
    public set data(data:any) {
        this._data = data;
        this.dataChanged();
    }
    
    public get data():any {
        return this._data;
    }

    public dataChanged():void {
        this.text = this._data.label;
    }
}