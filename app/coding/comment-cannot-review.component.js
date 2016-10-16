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
var comment_cannot_review_service_1 = require('./comment-cannot-review.service');
var CommentCannotReviewComponent = (function () {
    function CommentCannotReviewComponent(_commentCannotReviewService) {
        this._commentCannotReviewService = _commentCannotReviewService;
        this.cannotReviews = null;
    }
    CommentCannotReviewComponent.prototype.loadCommentCannotReview = function () {
        var _this = this;
        this._commentCannotReviewService.getCannotReviewList()
            .then(function (res) { return _this.cannotReviews = res; });
    };
    CommentCannotReviewComponent.prototype.ngOnInit = function () {
        this.loadCommentCannotReview();
    };
    CommentCannotReviewComponent.prototype.registerCannotReview = function (crSelection) {
        // console.log(crSelection);
        this._commentCannotReviewService.postCannotReview(crSelection);
    };
    CommentCannotReviewComponent = __decorate([
        core_1.Component({
            selector: 'comment-cannot-review',
            templateUrl: 'app/coding/comment-cannot-review.entryComponents.html',
            providers: [comment_cannot_review_service_1.CommentCannotReviewService]
        }), 
        __metadata('design:paramtypes', [comment_cannot_review_service_1.CommentCannotReviewService])
    ], CommentCannotReviewComponent);
    return CommentCannotReviewComponent;
}());
exports.CommentCannotReviewComponent = CommentCannotReviewComponent;
//# sourceMappingURL=comment-cannot-review.component.js.map