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
var dxcode_service_1 = require('./dxcode.service');
var DXCodesComponent = (function () {
    function DXCodesComponent(_dxcodeService) {
        this._dxcodeService = _dxcodeService;
        this.dxcodes = [];
    }
    DXCodesComponent.prototype.loadDxCodes = function () {
        var _this = this;
        if (this.claimId == null) {
            this.dxcodes = [];
        }
        else {
            this._dxcodeService.getDxcodes({ "claimId": this.claimId })
                .then(function (res) { return _this.dxcodes = res; });
        }
    };
    DXCodesComponent.prototype.ngOnInit = function () {
        this.loadDxCodes();
    };
    DXCodesComponent.prototype.ngAfterViewInit = function () {
        $('.floating.dropdown.button').dropdown({
            direction: 'auto'
        });
    };
    DXCodesComponent.prototype.clicked = function (dxcode) {
        // http://stackoverflow.com/questions/35054004/how-to-use-jquery-with-javascript-in-angular-2
        // http://www.code-sample.com/2016/07/use-jquery-with-angular-2.html
        // https://www.youtube.com/watch?v=vrdHEBkGAow
        // http://www.syntaxsuccess.com/viewarticle/using-jquery-with-angular-2.0
        // https://www.jamestease.co.uk/blether/add-remove-or-toggle-classes-using-vanilla-javascript
        if (dxcode.commentClass == "") {
            dxcode.commentClass = "is-visible";
        }
        else {
            dxcode.commentClass = "";
        }
        // var _id = "#" + dxcode.id;
        // this.elementRef.nativeElement.querySelector(_id).textContent = "BAM!";
        // https://jsfiddle.net/4tuavhL2/
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DXCodesComponent.prototype, "claimId", void 0);
    DXCodesComponent = __decorate([
        core_1.Component({
            selector: "dxcodes",
            templateUrl: "app/coding/dxcodes.component.html",
            providers: [dxcode_service_1.DxCodeService]
        }), 
        __metadata('design:paramtypes', [dxcode_service_1.DxCodeService])
    ], DXCodesComponent);
    return DXCodesComponent;
}());
exports.DXCodesComponent = DXCodesComponent;
//# sourceMappingURL=dxcodes.component.js.map