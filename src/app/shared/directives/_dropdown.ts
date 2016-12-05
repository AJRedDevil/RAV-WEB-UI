import {
    Directive,
    HostBinding,
    HostListener,
    ContentChild,
    AfterContentInit,
    ElementRef
} from '@angular/core';

import { DropdownMenuDirective } from './_dropdown-menu';
import { DropdownService } from './_dropdown-service';

@Directive({
  selector: '[ravDropdown]',
  exportAs:'ravDropdown' 
})
export class DropdownDirective implements AfterContentInit{
    protected _service: DropdownService;
    @ContentChild(DropdownMenuDirective) protected _menu: DropdownMenuDirective;

    private toggle() {
        this._service.isOpen = !this._service.isOpen
    }

    @HostBinding('class.active') get active() {
        return this._service.isOpen;
    }
    
    @HostBinding('class.visible') get visible() {
        return this._service.isOpen;
    }

    @HostListener('click', ['$event'])
    private open(event) {
        event.stopPropagation()
        this.toggle();
    }

    public set registerClick(event: Event) {
        if (this.elemRef.nativeElement.contains(event.target)) {
            this.toggle();
        } else {
            this._service.isOpen = false;
        }
    }
    
    ngAfterContentInit():void {
        this._menu.service = this._service;
    }

    constructor(private elemRef: ElementRef) {
        this._service = new DropdownService();
    }

}

export const DROPDOWN_DIRECTIVES = [DropdownDirective, DropdownMenuDirective]