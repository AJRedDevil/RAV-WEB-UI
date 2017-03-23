import { Component ,OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { ChartComponent } from '../chart/chart.component';
import { CodingComponent } from '../coding/coding.component'
import { AuthService } from '../login/auth.service'

@Component({
    selector: 'main-app',
    templateUrl: './main-header.component.html'
})
export class MainHeaderComponent implements OnInit {
    private username = localStorage.getItem("username");
    private _timeout = 5*60; // 5 minutes

    // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
    constructor(
        private authService: AuthService,
        private _idle: Idle,
        public _toastr: ToastsManager,
        vRef: ViewContainerRef) {
            this._toastr.setRootViewContainerRef(vRef);
            _idle.setIdle(this._timeout);
            _idle.setTimeout(1);
            _idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
            _idle.onTimeout.subscribe(() => { this.logout(); });
            this.reset();
    }

    ngOnInit() {
        this.authService.sessionTimeout()
            .then(res => {
                if (!res) {
                    this.authService.logout();
                }
            });
    }

    reset() {
        this._idle.watch();
    }

    logout() {
        this.authService.logout();
    }

}