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
var forms_1 = require('@angular/forms');
var claim_model_1 = require('./claim.model');
var claim_service_1 = require('./claim.service');
var ClaimComponent = (function () {
    function ClaimComponent(fb, _claimService) {
        this.fb = fb;
        this._claimService = _claimService;
        this.comment = "";
        this.commentClass = "";
        this.formClass = "hidden";
        this.claimCommentForm = fb.group({
            comment: ['', forms_1.Validators.required]
        });
    }
    ClaimComponent.prototype.ngOnInit = function () {
        this.comment = this.inputClaim.comment;
        $('.ui.checkbox').checkbox();
        $('.ui.button').popup({
            hoverable: false,
            position: 'bottom right',
            on: 'click'
        });
    };
    ClaimComponent.prototype.claimComment = function () {
        var claimContent = this.claimCommentForm.value;
        claimContent["claimId"] = this.inputClaim.claimId;
        this._claimService.postClaimComment(claimContent)
            .then(function (res) {
            if (res.flag) {
                $('.ui.button').popup('hide');
            }
        });
    };
    ClaimComponent.prototype.registerClaimReview = function () {
        this._claimService.postClaimReview({ "claimId": this.inputClaim.claimId });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', claim_model_1.Claim)
    ], ClaimComponent.prototype, "inputClaim", void 0);
    ClaimComponent = __decorate([
        core_1.Component({
            selector: 'claim',
            templateUrl: 'app/coding/claim.component.html',
            providers: [claim_service_1.ClaimService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, claim_service_1.ClaimService])
    ], ClaimComponent);
    return ClaimComponent;
}());
exports.ClaimComponent = ClaimComponent;
//# sourceMappingURL=claim.component.js.map