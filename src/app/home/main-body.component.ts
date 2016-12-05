import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ChartComponent } from '../chart/chart.component';
import { CodingComponent } from '../coding/coding.component'


@Component({
    selector: 'main-body',
    templateUrl: './main-body.component.html'
})
export class MainBodyComponent implements OnInit, OnDestroy {
    private fullScreen: boolean;
    private reloaded: boolean;
    private chartWindow = null;
    @ViewChild(ChartComponent) chart: ChartComponent;
    @ViewChild(CodingComponent) codingComponent: CodingComponent;
    
    constructor(private _toastr: ToastsManager,
                private elemRef: ElementRef) {
        this.fullScreen = Boolean(localStorage.getItem("fullScreen"));
    }

    ngOnInit() {
        if (this.fullScreen && this.chartWindow == null) {
            this.fullScreenSingleton();
        }
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

    ngOnDestroy() {
        this.closeChartWindow();
    }
}