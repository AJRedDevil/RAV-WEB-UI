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
    private dashboardStats: Array<number> = [];
    private userStats: Array<Array<any>> = [];

    constructor(
        private dashboardService: DashboardService,
        public _toastr: ToastsManager,) {
        (<any>$('.maindropdown')).dropdown();
    }

    ngOnInit() {
        this.dashboardService.getDashboardStats()
                             .then(res => this.dashboardStats = res);
        // if the response is sent in json obj.
        //this.dashboardStats = res.get('data') 
        //this.dashboardStats = [1,2,3,4,5,6,7,8,9,10,11,12];
        
        // this.dashboardService.getUserStats()
        //                      .then(res => this.userStats = res);
        this.userStats = [
            ['user1',1,2,3,4,5,6,7,8,9],
            ['user2',10,20,30,40,50,60,70,80,90]
        ];
    }
}
