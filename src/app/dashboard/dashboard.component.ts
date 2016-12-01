import { Component, OnInit }  from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { DashboardService } from './dashboard.service'

@Component({
    selector: "rav-dashboard",
    templateUrl: "./dashboard.html",
    styles: [`
        #main-header {
            padding-top: 20px;
        }
    `]
})
export class DashboardComponent implements OnInit {
    private dashboardLabels: Array<string>;
    private dashboardStats: Array<any> = [];
    private userStats: Array<Array<any>> = [];

    constructor(
        private dashboardService: DashboardService,
        public _toastr: ToastsManager,) {
        (<any>$('.maindropdown')).dropdown();
    }

    ngOnInit() {
        this.dashboardLabels = [
            "Total number of Charts",
            "Total number of Completed",
            "Total Number of Saved for later",
            "Total in Progress",
            "Total Charts that cannot be reviewed",
            "Total no. of Claims/Encounters",
            "Total Claims Reviewed",
            "Total no. of Claims/Encounters added",
            "Total Dx Codes",
            "Total Invalid Dx Codes",
            "Total Dx Code Added",
            "Total Cpt Codes",
            "Total Cpt Codes Added"
        ]
        this.dashboardService.getDashboardStats()
                             .then(res => {
                                 var _temp = res['data'];
                                 var index = 0;
                                 this.dashboardLabels.forEach(element => {
                                     this.dashboardStats.push({
                                         label: element,
                                         value: _temp[index]
                                     });
                                     index += 1;
                                 });
                             });
        // this.dashboardStats = [1,2,3,4,5,6,7,8,9,10,11,12,13];
        
        this.dashboardService.getUserStats()
                             .then(res => this.userStats = res['data']);
        // this.userStats = [
        //     ['user1',1,2,3,4,5,6,7,8,9],
        //     ['user2',10,20,30,40,50,60,70,80,90]
        // ];
    }
}