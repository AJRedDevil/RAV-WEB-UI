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
var ClaimService = (function () {
    function ClaimService(_http) {
        this._http = _http;
        this.headers = new http_1.Headers({
            'Content-type': 'application/json'
        });
    }
    ClaimService.prototype.postClaimComment = function (claimComment) {
        claimComment['id'] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/claimComment";
        return this._http.post(url, JSON.stringify(claimComment), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimService.prototype.postClaimReview = function (claimContent) {
        claimContent["id"] = localStorage.getItem('loggedInUserId');
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/registerClaimReview";
        return this._http.post(url, JSON.stringify(claimContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ClaimService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    ClaimService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClaimService);
    return ClaimService;
}());
exports.ClaimService = ClaimService;
//# sourceMappingURL=claim.service.js.map