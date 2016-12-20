import { Component } from "@angular/core";


import { AuthService } from './login/auth.service';

@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>' 
})
export class AppComponent {
    constructor() {
        var RAV_SERVICE_URL = process.env.RAV_SERVICE || "http://localhost:8080/ravnepal";
        localStorage.setItem('baseUrl', RAV_SERVICE_URL);
    }
}