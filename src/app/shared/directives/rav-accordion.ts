import { Directive, OnInit, OnDestroy, ElementRef} from '@angular/core';

declare var $: any

@Directive({
    selector: '.ui.accordion'
})
export class RavAccordion implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).accordion();
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).accordion('destroy');
    }
}