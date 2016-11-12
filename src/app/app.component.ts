import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>` 
})
export class AppComponent { 
    constructor() {
        var RAV_SERVICE_URL = process.env.RAV_SERVICE || "http://localhost:8080/ravnepal";
        localStorage.setItem('baseUrl', RAV_SERVICE_URL);
    }
}


// import {Component} from '@angular/core';

// @Component({
//   selector   : 'app',
//   templateUrl: './app.component.html',
// })
// export class AppComponent {
// }
