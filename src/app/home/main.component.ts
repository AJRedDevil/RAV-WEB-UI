import { Component, HostListener ,OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { ChartComponent } from '../chart/chart.component';
import { CodingComponent } from '../coding/coding.component'
import { AuthService } from '../login/auth.service'

@Component({
    selector: 'main-app',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
    private username = localStorage.getItem("username");
    private fullScreen: boolean;
    private reloaded: boolean;
    private chartWindow = null;
    private _timeout = 5*60; // 5 minutes
    @ViewChild(ChartComponent) chart: ChartComponent;
    @ViewChild(CodingComponent) codingComponent: CodingComponent;

    // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
    constructor(
        private authService: AuthService,
        private _idle: Idle,
        public _toastr: ToastsManager,
        vRef: ViewContainerRef) {
            _idle.setIdle(this._timeout);
            _idle.setTimeout(1);
            _idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
            _idle.onTimeout.subscribe(() => { this.logout(); });
            this.fullScreen = Boolean(localStorage.getItem("fullScreen"));
            this.reset();
            this._toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        // this.authService.sessionTimeout()
        //     .then(res => {
        //         if (!res) {
        //             this.authService.logout();
        //         }
        //     });
        (<any>$('.maindropdown')).dropdown();
        (<any>$('.ui.accordion')).accordion();
        (<any>$('.ui.checkbox')).checkbox();
        if (this.fullScreen && this.chartWindow == null) {
            this.fullScreenSingleton();
        }
        // System.import('assets/js/main.js');
    }

    logout() {
        this.closeChartWindow();
        this.authService.logout();
    }

    @HostListener('window:beforeunload', [ '$event' ])
    onBeforeUnloadHandler(event) {
        this.closeChartWindow();
    }

    @HostListener('window:unload', [ '$event' ])
    onUnloadHandler(event) {
    }

    reset() {
        this._idle.watch();
    }

    getNextChart($event) {
        this.chart.getNextChart($event);
    }

    private clientPolling() {
        if (!Boolean(localStorage.getItem("fullScreen"))) {
            this.reloaded = true;
            window.location.reload();
        }
    }

    private fullScreenMode() {
        if (this.fullScreen) {
            this.clientPolling();
            this.reloaded = false;
            setInterval(this.clientPolling, 1000);
        }
    }

    private fullScreenSingleton() {
        var CHART_URL = "/Chart";
        this.chartWindow = window.open(CHART_URL, "popup", "location=no");
        this.chartWindow.onbeforeunload = function () {
            localStorage.setItem("fullScreen", "");
        };
        this.chartWindow.onunload = function () {
        };
        this.fullScreenMode();
    }

    goFullScreen(event) {
        localStorage.setItem("fullScreen", "true");
        this.fullScreen = true;
        if (this.fullScreen && this.chartWindow == null) {
            this.fullScreenSingleton();   
        }
    }

    closeChartWindow() {
        if (this.chartWindow != null && !this.chartWindow.closed) {
            this.chartWindow.close();
        }
    }
}