import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { MemberInfoComponent } from './member-info.component';
import { CommentCannotReviewComponent } from './comment-cannot-review.component';
import { ClaimsComponent } from './claims.component'

@Component({
    selector: 'coding',
    templateUrl: './coding.component.html'
})
export class CodingComponent {
    @ViewChild(MemberInfoComponent) private memberInfo: MemberInfoComponent;
    @ViewChild(CommentCannotReviewComponent) private commentCannotReview: CommentCannotReviewComponent;
    @ViewChild(ClaimsComponent) private claimsComponent: ClaimsComponent;
    @Output() getNextChart = new EventEmitter();

    nextChart($event) {
        console.log("CodingComponent");
        console.log($event);
        this.claimsComponent.registerNext($event);
        this.memberInfo.nextChart($event);
        this.commentCannotReview.nextChart($event);
        this.getNextChart.emit($event);
    }
}