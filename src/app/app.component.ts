import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>` 
})
export class AppComponent { 
    constructor() {
        console.log(process.env.RAV_SERVICE);
        localStorage.setItem('baseUrl', "http://localhost:8080/ravnepal");
    }
}


// import {Component} from '@angular/core';

// @Component({
//   selector   : 'app',
//   templateUrl: './app.component.html',
// })
// export class AppComponent {
// }
