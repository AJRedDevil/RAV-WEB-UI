import { Component, Input, OnInit } from '@angular/core';

import { Chart } from './chart.model';
import { ChartService } from './chart.service';

@Component({
    selector: 'chart',
    templateUrl: 'app/chart/chart.component.html',
    providers: [ChartService]
})
export class ChartComponent implements OnInit{
    private chart: Chart;

    constructor(private _chartService: ChartService) {
        this.chart = null;
    }

    private loadChart(): void {
        this._chartService.getChart()
            .then(res => {
                this.chart = res;
            });
    }

    ngOnInit(): void {
        this.loadChart();
    }
    
}