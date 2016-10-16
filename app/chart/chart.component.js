"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var chart_service_1 = require('./chart.service');
var ChartComponent = (function () {
    function ChartComponent(_chartService) {
        this._chartService = _chartService;
        this.chart = null;
    }
    ChartComponent.prototype.loadChart = function () {
        var _this = this;
        this._chartService.getChart()
            .then(function (res) {
            _this.chart = res;
        });
    };
    ChartComponent.prototype.ngOnInit = function () {
        this.loadChart();
    };
    ChartComponent = __decorate([
        core_1.Component({
            selector: 'chart',
            templateUrl: 'app/chart/chart.component.html',
            providers: [chart_service_1.ChartService]
        }), 
        __metadata('design:paramtypes', [chart_service_1.ChartService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map