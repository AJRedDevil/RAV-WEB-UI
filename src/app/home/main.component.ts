import { Component, OnInit, ViewChild } from "@angular/core";
import {Observable} from 'rxjs/Rx';

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
    @ViewChild(ChartComponent) chart: ChartComponent;
    @ViewChild(CodingComponent) codingComponent: CodingComponent;

    // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
    constructor(private authService: AuthService) {
        this.fullScreen = Boolean(localStorage.getItem("fullScreen"));
    }

    ngOnInit() {
        (<any>$('.dropdown')).dropdown();
        (<any>$('.ui.accordion')).accordion();
        (<any>$('.ui.checkbox')).checkbox();
        if (this.fullScreen && this.chartWindow == null) {
            this.fullScreenSingleton();
        }
        // System.import('assets/js/main.js');
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
            setInterval(this.clientPolling, 3000);
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