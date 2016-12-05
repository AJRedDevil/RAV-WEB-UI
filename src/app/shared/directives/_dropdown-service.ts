

export class DropdownService {
    private _isOpen: boolean;

    constructor() {
        this.isOpen = false;
    }

    public get isOpen():boolean {
        return this._isOpen;
    }

    public set isOpen(value: boolean) {
        this._isOpen = value;
    }
}