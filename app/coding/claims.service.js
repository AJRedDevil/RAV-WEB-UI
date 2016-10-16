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
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var ClaimsService = (function () {
    function ClaimsService(_http) {
        this._http = _http;
        this.headers = new http_1.Headers({
            'Content-type': 'application/json'
        });
    }
    ClaimsService.prototype.getClaims = function () {
        var userContent = { "id": localStorage.getItem('loggedInUserId') };
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/claim/get/";
        return this._http.post(url, JSON.stringify(userContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimsService.prototype.addClaim = function (claimContent) {
        claimContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/addClaim";
        return this._http.post(url, JSON.stringify(claimContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimsService.prototype.codingComplete = function () {
        var userContent = { "id": localStorage.getItem('loggedInUserId') };
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/chart/complete/";
        return this._http.post(url, JSON.stringify(userContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimsService.prototype.goToNextChart = function () {
        var userContent = { "id": localStorage.getItem('loggedInUserId') };
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/chart/next/";
        return this._http.post(url, JSON.stringify(userContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimsService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ClaimsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClaimsService);
    return ClaimsService;
}());
exports.ClaimsService = ClaimsService;
//# sourceMappingURL=claims.service.js.map