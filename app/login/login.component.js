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
var auth_service_1 = require('./auth.service');
var router_1 = require('@angular/router');
var LoginComponent = (function () {
    function LoginComponent(_service, _router) {
        this._service = _service;
        this._router = _router;
        this.user = new auth_service_1.User('test@test.com', 'test');
        this.errorMsg = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this._service.loggedIn()) {
            this._router.navigate(['Home']);
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this._service.login(this.user)
            .then(function (res) {
            if (res) {
                _this._router.navigate(['Home']);
            }
            else {
                _this.errorMsg = 'Failed to login';
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            templateUrl: "app/login/login.component.html"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map