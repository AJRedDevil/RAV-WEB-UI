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
    private selectedCannotReview: any = "";
    private chartComment: string;
    private fieldForShow: string;
    private cannotReviewModal: boolean;
    private modalOptions: any;
    @Output('getNextChart') loadNextChart = new EventEmitter();

    constructor(
        private _commentCannotReviewService: CommentCannotReviewService,
        private ref: ChangeDetectorRef,
        private _toastr: ToastsManager
        ) {
        this.cannotReviews = [];
        this.chartComment = "";
        this.cannotReviewModal = false;
    }

    private loadCommentCannotReview(): void {
        this._commentCannotReviewService.getCannotReviewList()
            .then(res => {
                this.cannotReviews = res;
            });
    }

    ngOnInit(): void {
        this.loadCommentCannotReview();
        this.fieldForShow = "statement";
        this.modalOptions = {
            "size": "small",
            "type": "default",
            "closeable": true
        }
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

    cannotReviewSelected() {
        if (this.selectedCannotReview) {
            this.cannotReviewModal = true;
        }
    }

    registerCannotReview(event) {
        event.stopPropagation();
        var crComponent = {
            reasonId: this.selectedCannotReview.id,
            id: localStorage.getItem('chartId')
        }
        this._commentCannotReviewService.postCannotReview(crComponent)
            .then(res => {
                if (res.flag) {
                    this._toastr.success("Review has been registered.")
                    this.loadNextChart.emit({'newChart': true});
                } else {
                    this._toastr.error("Problem encountered during cannot review registration");
                }
            });
    }

    cancelCannotReviewModal() {
        this.cannotReviewModal = false;
    }

    reloadCannotReview() {
        this.selectedCannotReview = "";
        this.loadCommentCannotReview();
    }

    nextChart($event) {
        this.reloadCannotReview();
    }
}
