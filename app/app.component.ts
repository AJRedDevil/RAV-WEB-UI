import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>` 
})
export class AppComponent { 
    constructor() {
        localStorage.setItem('baseUrl', "http://localhost:8080/ravnepal");
    }
}
