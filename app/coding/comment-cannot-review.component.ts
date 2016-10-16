import { Component, OnInit } from '@angular/core';

import { CommentCannotReviewService } from './comment-cannot-review.service';

@Component({
    selector: 'comment-cannot-review',
    templateUrl: 'app/coding/comment-cannot-review.entryComponents.html',
    providers: [CommentCannotReviewService]
})
export class CommentCannotReviewComponent implements OnInit {
    private cannotReviews: any[];
    constructor(private _commentCannotReviewService: CommentCannotReviewService) {
        this.cannotReviews = null;
    }

    private loadCommentCannotReview(): void {
        this._commentCannotReviewService.getCannotReviewList()
            .then(res => this.cannotReviews = res);
    }

    ngOnInit(): void {
        this.loadCommentCannotReview();
    }

    registerCannotReview(crSelection): void {
        // console.log(crSelection);
        this._commentCannotReviewService.postCannotReview(crSelection);
    }
}