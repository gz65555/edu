/**
 * Created by Saco at 2016/11/24
 **/
class Dialogue {
    private _confirm: BaseView;
    private _dialogue: BaseView;
    public constructor() {
    }

    public regConfirm(view: BaseView): void {
        this._confirm = view;
    }

    public regDialogue(view: BaseView): void {
        this._dialogue = view;
    }

    public confirm(title: string, txt: string): void {
        this._confirm["openView"](arguments);
    }

    public dialogue(title: string, txt: string, confirmCall: Function, cancelCall: Function, callObj: any): void {
        this._dialogue["openView"](arguments);
    }
}



interface ConfirmPanel extends BaseView {
    onShow(title: string, txt: string): void
}

interface DialoguePanel extends BaseView {
    onShow(title: string, txt: string, confirmCall: Function, cancelCall: Function, callObj: any): void
}
