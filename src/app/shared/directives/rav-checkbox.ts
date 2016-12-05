import { Directive, OnInit, OnDestroy, ElementRef} from '@angular/core';

declare var $: any

@Directive({
    selector: '.ui.checkbox'
})
export class RavCheckbox implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).checkbox();
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).checkbox('destroy');
    }
}