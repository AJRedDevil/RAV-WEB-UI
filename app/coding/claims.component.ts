import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Claim } from './claim.model';
import { ClaimsService } from './claims.service';

@Component({
    selector: 'claims',
    templateUrl: 'app/coding/claims.component.html',
    providers: [ClaimsService]
})
export class ClaimsComponent implements OnInit{
    private claims: Claim[];
    private addClaimForm: FormGroup;

    constructor(private _claimService: ClaimsService, fb: FormBuilder) {
        this.addClaimForm = fb.group({
            dos: ['', Validators.required],
            provider: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadClaims();
        (<any>$('.ui.button')).popup({
                                    hoverable  : false,
                                    position   : 'bottom right',
                                    on    : 'click'
        });
    }
    
    private loadClaims(): void {
        this._claimService.getClaims()
            .then(res => {
                this.claims = res;
            });
    }

    addClaim() {
        this._claimService.addClaim(this.addClaimForm.value)
            .then(res => {
                (<any>$('.ui.button')).popup('hide');
                this.loadClaims();
            });
    }
    

    codingComplete() {
        var proceed = confirm("Are you done with coding?");
        if (proceed) {
            this._claimService.codingComplete()
                .then(res => {
                    if (res.flag) {
                        this.goToNext();
                    }
                })
        }
    }

    saveForLater() {
        console.log("Save for later");
    }

    goToNext() {
        this._claimService.goToNextChart()
            .then(res => {
                if (res.flag) {
                    window.location.reload();
                }
            })
        // alert("Next claim please");
    }
}