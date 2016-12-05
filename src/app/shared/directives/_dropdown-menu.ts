import { Directive, HostBinding } from '@angular/core';

import { DropdownService } from './_dropdown-service';

@Directive({
  selector: '[ravDropdownMenu]'
})
export class DropdownMenuDirective {
    private _service: DropdownService;

    public set service(service: DropdownService) {
        this._service = service;
    }
    
    @HostBinding('class.visible') get visible() {
        return this._service.isOpen;
    }
    
    constructor() { }

}