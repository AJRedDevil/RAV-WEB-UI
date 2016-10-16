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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var User = (function () {
    function User(email, password) {
        this.email = email;
        this.password = password;
    }
    return User;
}());
exports.User = User;
// var users = [
//   new User('admin@admin.com','adm9'),
//   new User('test@test.com','test')
// ];
var AuthService = (function () {
    function AuthService(_router, _http) {
        this._router = _router;
        this._http = _http;
        this.headers = new http_1.Headers({
            'Content-type': 'application/json'
        });
    }
    AuthService.prototype.logout = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedInUserId");
        localStorage.removeItem("username");
        this._router.navigate(['Login']);
    };
    AuthService.prototype.login = function (user) {
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/user/login/";
        var authResponse;
        return this._http.post(url, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function (res) {
            authResponse = res.json();
            if (authResponse.flag == true) {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem('loggedInUserId', authResponse.id);
                localStorage.setItem('username', authResponse.username);
                return true;
            }
            else {
                return false;
            }
        })
            .catch(this.handleError);
    };
    AuthService.prototype.loggedIn = function () {
        // this.logout();
        if (localStorage.getItem("user") === null) {
            return false;
        }
        return true;
    };
    AuthService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map