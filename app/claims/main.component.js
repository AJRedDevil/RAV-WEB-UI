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
var core_1 = require("@angular/core");
var auth_service_1 = require('../login/auth.service');
var MainComponent = (function () {
    // We'll need to include a reference to our authService in the constructor to gain access to the API's in the view
    function MainComponent(authService) {
        this.authService = authService;
        this.username = localStorage.getItem("username");
    }
    MainComponent.prototype.ngOnInit = function () {
        $('.dropdown').dropdown();
        $('.ui.accordion').accordion();
        $('.ui.checkbox').checkbox();
        $("#chart-wrapper").stick_in_parent();
        // System.import('assets/js/main.js');
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'main-app',
            templateUrl: 'app/claims/main.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map