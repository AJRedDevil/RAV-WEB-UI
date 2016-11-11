import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { Chart } from './chart.model';
import { ChartService } from './chart.service';

@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
    providers: [ChartService]
})
export class ChartComponent implements OnInit{
    private chart: Chart;
    private fullScreen: boolean;
    @Output('goFullScreen')chartOut = new EventEmitter();

    private serverPolling() {
        Observable.interval(3000)
                  .switchMap(() => this._chartService.getChart())
                  .map(res => {
                      if (this.chart.id != res.id) {
                          this.chart = res;
                      }
                    })
                  .subscribe();
    }

    constructor(private _chartService: ChartService) {
        this.chart = null;
        this.fullScreen = Boolean(localStorage.getItem("fullScreen"));
        if (this.fullScreen) {
            this.serverPolling();
        }
    }

    private loadChart(): void {
        this._chartService.getChart()
            .then(res => {
                this.chart = res;
                localStorage.setItem("chartId", this.chart['id'].toString());
            });
    }

    ngOnInit(): void {
        this.loadChart();
    }
    
    getNextChart($event) {
        this.loadChart();
    }

    popOutChart(event) {
        event.stopPropagation();
        this.chartOut.emit(true);
    }
}