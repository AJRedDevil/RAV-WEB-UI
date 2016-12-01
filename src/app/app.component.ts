import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { MainComponent } from './home/main.component';
import { AuthService } from './login/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html' 
})
export class AppComponent implements OnInit {
    private username = localStorage.getItem("username");
    private _timeout = 5*60; // 5 minutes
    @ViewChild(MainComponent) mainComponent: MainComponent;
    
    constructor(
        private authService: AuthService,
        private _idle: Idle,
        public _toastr: ToastsManager,
        vRef: ViewContainerRef) {
            var RAV_SERVICE_URL = process.env.RAV_SERVICE || "http://localhost:8080/ravnepal";
            localStorage.setItem('baseUrl', RAV_SERVICE_URL);
            this._toastr.setRootViewContainerRef(vRef);
            _idle.setIdle(this._timeout);
            _idle.setTimeout(1);
            _idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
            _idle.onTimeout.subscribe(() => { this.logout(); });
            this.reset();
    }

    ngOnInit() {
        // this.authService.sessionTimeout()
        //     .then(res => {
        //         if (!res) {
        //             this.authService.logout();
        //         }
        //     });
    }

    logout() {
        if (this.mainComponent != null) {
            this.mainComponent.logout();
        } else {
            this.authService.logout();
        }
    }

    reset() {
        this._idle.watch();
    }
}