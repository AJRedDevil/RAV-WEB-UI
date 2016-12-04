import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Claim } from './claim.model';
import { ClaimService } from './claim.service';
import { DXCodesComponent } from "../dxCode/dxcodes.component"
import { CPTCodesComponent } from "../cptCode/cptcode.component"
import { DateValidators } from '../../shared/dateValidators';
import { DateLib } from '../../shared/dateLibrary';

@Component({
    selector: 'claim',
    templateUrl: './claim.component.html',
    providers: [ClaimService]
})
export class ClaimComponent implements OnInit {
    @Input() inputClaim: Claim;
    private _isAccordianActive: boolean;
    private dosForm: FormGroup;
    private claimCommentForm: FormGroup;
    private comment = "";
    private todayDate: Date;
    private dosDate: Date;
    private dosUpdated: boolean;
    private dateChanged: boolean;
    private yearRange: string;
    @Output("reloadClaims")loadClaims = new EventEmitter();

    @ViewChild(DXCodesComponent) dxcodeComponent: DXCodesComponent;
    @ViewChild(CPTCodesComponent) cptcodeComponent: CPTCodesComponent;

    constructor(
        private fb: FormBuilder,
        private _claimService: ClaimService,
        private _toastr: ToastsManager) {
            this.claimCommentForm = fb.group({
                comment: ['', Validators.required]
            });
            this.dosForm = fb.group({
                dos: ['', Validators.required]
            });
            this.dosUpdated = false;
    }
    ngOnInit() {
        this.todayDate = new Date();
        this._isAccordianActive = false;
        this.comment = this.inputClaim.comment;
        this.dosDate = new Date(this.inputClaim.dateOfService);
        this.dateChanged = false;
        // this.dosForm.patchValue({dos: DateLib.convertToyyyymmdd(this.dosDate)});
        (<any>$('.ui.checkbox')).checkbox();
        (<any>$('.ui.button')).popup({
            hoverable  : false,
            position   : 'bottom right',
            lastResort   : 'bottom right',
            on    : 'click'
        });
        (<any>$('span#dos-date')).popup({
            hoverable  : false,
            position   : 'bottom right',
            lastResort   : 'bottom right',
            on    : 'click'
        });
        this.yearRange = "1990:" + this.todayDate.getFullYear();
        console.log(this.yearRange);
    }

    private resetChildForms() {
        this.dxcodeComponent.resetForm();
        this.cptcodeComponent.resetForm();
    }

    private activeInactive() {
        this._isAccordianActive = !this._isAccordianActive
        if (this._isAccordianActive) {
            this.resetChildForms();
            this._isAccordianActive
        }
    }

    popDosDate() {
        this.dosDate = new Date(this.inputClaim.dateOfService);
        this.dateChanged = false;
    }

    updateDOS() {
        var claimComponent = {
            claimId: this.inputClaim.claimId,
            dateOfService: DateLib.convertTommddyyyy(this.dosDate)
        }
        this._claimService.updateDos(claimComponent)
            .then(res => {
                if (res.flag) {
                    (<any>$('span#dos-date')).popup('hide');
                    this.inputClaim.dateOfService = DateLib.convertTommddyyyy(this.dosDate);
                    this.dosUpdated = true;
                    this.dateChanged = false;
                    this._toastr.success("Date of Service Updated");
                } else {
                    this._toastr.error("Problem while updating Date Of Service");
                }
            });
    }

    resetForm() {
        this.claimCommentForm.reset();
        this.claimCommentForm.patchValue({comment: this.inputClaim.comment});
    }

    claimComment() {
        var claimContent = this.claimCommentForm.value;
        claimContent["claimId"] = this.inputClaim.claimId;
        this._claimService.postClaimComment(claimContent)
            .then(res => {
                if (res.flag) {
                    (<any>$('.ui.button')).popup('hide');
                    this.loadClaims.emit({"load": true});
                    this._toastr.success("Comment submitted.");
                }
            });
    }

    registerClaimReview(event) {
        event.stopPropagation();
        this._claimService.postClaimReview({
            "claimId": this.inputClaim.claimId,
            "reviewed": !this.inputClaim.reviewed
            })
            .then(res => {
                if (res.flag) {
                    this.loadClaims.emit({"load": true});
                    this._toastr.success("Claim " + (this.inputClaim.reviewed ? "review removed." : "reviewed."));
                }
        });
    }
}
