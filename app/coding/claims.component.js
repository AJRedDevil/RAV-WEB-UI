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
var claims_service_1 = require('./claims.service');
var ClaimsComponent = (function () {
    function ClaimsComponent(_claimService, fb) {
        this._claimService = _claimService;
        this.addClaimForm = fb.group({
            dos: ['', forms_1.Validators.required],
            provider: ['', forms_1.Validators.required]
        });
    }
    ClaimsComponent.prototype.ngOnInit = function () {
        this.loadClaims();
        $('.ui.button').popup({
            hoverable: false,
            position: 'bottom right',
            on: 'click'
        });
    };
    ClaimsComponent.prototype.loadClaims = function () {
        var _this = this;
        this._claimService.getClaims()
            .then(function (res) {
            _this.claims = res;
        });
    };
    ClaimsComponent.prototype.addClaim = function () {
        var _this = this;
        this._claimService.addClaim(this.addClaimForm.value)
            .then(function (res) {
            $('.ui.button').popup('hide');
            _this.loadClaims();
        });
    };
    ClaimsComponent.prototype.codingComplete = function () {
        var _this = this;
        var proceed = confirm("Are you done with coding?");
        if (proceed) {
            this._claimService.codingComplete()
                .then(function (res) {
                if (res.flag) {
                    _this.goToNext();
                }
            });
        }
    };
    ClaimsComponent.prototype.saveForLater = function () {
        console.log("Save for later");
    };
    ClaimsComponent.prototype.goToNext = function () {
        this._claimService.goToNextChart()
            .then(function (res) {
            if (res.flag) {
                window.location.reload();
            }
        });
        // alert("Next claim please");
    };
    ClaimsComponent = __decorate([
        core_1.Component({
            selector: 'claims',
            templateUrl: 'app/coding/claims.component.html',
            providers: [claims_service_1.ClaimsService]
        }), 
        __metadata('design:paramtypes', [claims_service_1.ClaimsService, forms_1.FormBuilder])
    ], ClaimsComponent);
    return ClaimsComponent;
}());
exports.ClaimsComponent = ClaimsComponent;
//# sourceMappingURL=claims.component.js.map