import { Directive, HostBinding } from '@angular/core';

import { DropdownService } from './dropdown-service';

@Directive({
  selector: '[ravDropdownMenu]'
})
export class DropdownMenuDirective {
    private _service: DropdownService;

    public set service(service: DropdownService) {
        console.log("active menu");
        this._service = service;
    }
    
    @HostBinding('class.visible') get visible() {
        return this._service.isOpen;
    }
    
    constructor() { }

}