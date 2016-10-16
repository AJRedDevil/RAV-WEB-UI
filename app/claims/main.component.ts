import { Component, OnInit } from "@angular/core";
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'main-app',
    templateUrl: 'app/claims/main.component.html'
})
export class MainComponent implements OnInit {
    private username = localStorage.getItem("username");
    // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        (<any>$('.dropdown')).dropdown();
        (<any>$('.ui.accordion')).accordion();
        (<any>$('.ui.checkbox')).checkbox();
        (<any>$("#chart-wrapper")).stick_in_parent();
        // System.import('assets/js/main.js');
    }
}