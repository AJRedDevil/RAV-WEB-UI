import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Claim } from './claim.model';
import { ClaimService } from './claim.service';

@Component({
    selector: 'claim',
    templateUrl: 'app/coding/claim.component.html',
    providers: [ClaimService]
})
export class ClaimComponent implements OnInit {
    @Input() inputClaim: Claim;
    private comment = "";
    private claimCommentForm: FormGroup;
    private commentClass = ""
    private formClass = "hidden"

    constructor(private fb: FormBuilder, private _claimService: ClaimService) {
        this.claimCommentForm = fb.group({
            comment: ['', Validators.required]
        });
    }
    
    ngOnInit() {
        this.comment = this.inputClaim.comment;
        (<any>$('.ui.checkbox')).checkbox();
        (<any>$('.ui.button')).popup({
            hoverable  : false,
            position   : 'bottom right',
            on    : 'click'
        });
    }

    claimComment() {
        var claimContent = this.claimCommentForm.value;
        claimContent["claimId"] = this.inputClaim.claimId;
        this._claimService.postClaimComment(claimContent)
            .then(res => {
                if (res.flag) {
                    (<any>$('.ui.button')).popup('hide');
                }
            });
    }

    registerClaimReview() {
        this._claimService.postClaimReview({"claimId": this.inputClaim.claimId});
    }
}
