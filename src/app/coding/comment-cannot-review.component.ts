import { ChangeDetectorRef, Component, Directive, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { CommentCannotReviewService } from './comment-cannot-review.service';

@Component({
    selector: 'comment-cannot-review',
    templateUrl: './comment-cannot-review.component.html',
    providers: [CommentCannotReviewService]
})
export class CommentCannotReviewComponent implements OnInit {
    private cannotReviews: any[];
    private selectedId: number;
    private chartComment: string;
    @Output('getNextChart') loadNextChart = new EventEmitter();

    constructor(
        private _commentCannotReviewService: CommentCannotReviewService,
        private ref: ChangeDetectorRef,
        private _toastr: ToastsManager
        ) {
        this.cannotReviews = [];
        this.chartComment = "";
        this.selectedId = 0;
    }

    private loadCommentCannotReview(): void {
        this._commentCannotReviewService.getCannotReviewList()
            .then(res => {
                this.cannotReviews = res;
            });
    }

    ngOnInit(): void {
        this.loadCommentCannotReview();
        (<any>$('.ui.dropdown')).dropdown();
    }

    saveComment() {
        var commentComponent = {
            comment: this.chartComment,
            id: parseInt(localStorage.getItem('chartId'))
        }
        this._commentCannotReviewService.postChartComment(commentComponent)
            .then(res => {
                if (res.flag)
                    this._toastr.success("Chart comment submitted.", null);
            });
    }

    holdCannotReview(event, cr): void {
        event.stopPropagation();
        this.selectedId = cr.id == "" ? 0 : parseInt(cr.id);
    }

    registerCannotReview(event) {
        event.stopPropagation();
        var crComponent = {
            reasonId: this.selectedId,
            id: localStorage.getItem('chartId')
        }
        this._commentCannotReviewService.postCannotReview(crComponent)
            .then(res => {
                if (res.flag) {
                    this._toastr.success("Review has been registered.")
                    this.loadNextChart.emit({'newChart': true});
                }
            });
    }

    reloadCannotReview() {
        this.selectedId = 0;
        (<any>$('.ui.dropdown')).dropdown('restore defaults');
        this.loadCommentCannotReview();
    }

    nextChart($event) {
        console.log("commentCannotReview");
        this.reloadCannotReview();
    }
}
