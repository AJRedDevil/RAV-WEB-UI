import {
    Directive,
    HostBinding,
    HostListener,
    ContentChild,
    AfterContentInit
} from '@angular/core';

import { DropdownMenuDirective } from './dropdown-menu';
import { DropdownService } from './dropdown-service';

@Directive({
  selector: '[ravDropdown]',
  exportAs:'ravDropdown' 
})
class DropdownDirective implements AfterContentInit{
    protected _service: DropdownService;
    @ContentChild(DropdownMenuDirective) protected _menu: DropdownMenuDirective;

    @HostBinding('class.active') get active() {
        return this._service.isOpen;
    }
    @HostBinding('class.visible') get visible() {
        return this._service.isOpen;
    }
    @HostListener('click') open() 
    {
        console.log("clicked");
        this._service.isOpen = true;
    }
    // @HostListener('mouseleave') inActive() {
    //     console.log("close");
    //     this._service.isOpen = false;
    // }
    public set close(close: boolean) {
        this._service.isOpen = close;
    }
    
    ngAfterContentInit():void {
        console.log("ngAfterContentInit");
        this._menu.service = this._service;
    }

    constructor() {
        this._service = new DropdownService();
    }

}

export const DROPDOWN_DIRECTIVES = [DropdownDirective, DropdownMenuDirective]