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
var http_1 = require('@angular/http');
require("rxjs/add/operator/toPromise");
var CommentCannotReviewService = (function () {
    function CommentCannotReviewService(_http) {
        this._http = _http;
        this.headers = new http_1.Headers({
            'Content-type': 'application/json'
        });
    }
    CommentCannotReviewService.prototype.getCannotReviewList = function () {
        var userContent = { "id": localStorage.getItem("loggedInUserId") };
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/chart/cannotReview/";
        return this._http.post(url, JSON.stringify(userContent), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CommentCannotReviewService.prototype.postCannotReview = function (crSelection) {
        crSelection["id"] = localStorage.getItem("loggedInUserId");
        var baseUrl = localStorage.getItem('baseUrl');
        var url = baseUrl + "/registerCannotReview";
        return this._http.post(url, JSON.stringify(crSelection), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CommentCannotReviewService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    CommentCannotReviewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommentCannotReviewService);
    return CommentCannotReviewService;
}());
exports.CommentCannotReviewService = CommentCannotReviewService;
//# sourceMappingURL=comment-cannot-review.service.js.map