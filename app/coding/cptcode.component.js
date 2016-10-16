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
var core_1 = require("@angular/core");
var cptcode_service_1 = require('./cptcode.service');
var CPTCodesComponent = (function () {
    function CPTCodesComponent(_cptcodeService) {
        this._cptcodeService = _cptcodeService;
        this.cptcodes = [];
    }
    CPTCodesComponent.prototype.loadCptCodes = function () {
        var _this = this;
        if (this.claimId == null) {
            this.cptcodes = [];
        }
        else {
            this._cptcodeService.getCptCodes({ "claimId": this.claimId })
                .then(function (res) { return _this.cptcodes = res; });
        }
    };
    CPTCodesComponent.prototype.ngOnInit = function () {
        this.loadCptCodes();
    };
    CPTCodesComponent.prototype.clicked = function (cptcode) {
        if (cptcode.class == "") {
            cptcode.class = "is-visible";
        }
        else {
            cptcode.class = "";
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CPTCodesComponent.prototype, "claimId", void 0);
    CPTCodesComponent = __decorate([
        core_1.Component({
            selector: "cptcodes",
            templateUrl: "app/coding/cptcodes.component.html",
            providers: [cptcode_service_1.CptCodeService]
        }), 
        __metadata('design:paramtypes', [cptcode_service_1.CptCodeService])
    ], CPTCodesComponent);
    return CPTCodesComponent;
}());
exports.CPTCodesComponent = CPTCodesComponent;
//# sourceMappingURL=cptcode.component.js.map