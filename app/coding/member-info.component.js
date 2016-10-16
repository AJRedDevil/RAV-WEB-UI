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
var member_info_service_1 = require('./member-info.service');
var MemberInfoComponent = (function () {
    function MemberInfoComponent(_memberInfoService) {
        this._memberInfoService = _memberInfoService;
        this.memberInfo = null;
    }
    MemberInfoComponent.prototype.loadMemberInfo = function () {
        var _this = this;
        this._memberInfoService.getMemberInfo()
            .then(function (res) { return _this.memberInfo = res; });
    };
    MemberInfoComponent.prototype.ngOnInit = function () {
        this.loadMemberInfo();
    };
    MemberInfoComponent = __decorate([
        core_1.Component({
            selector: 'member-info',
            templateUrl: 'app/coding/member-info.component.html',
            providers: [member_info_service_1.MemberInfoService]
        }), 
        __metadata('design:paramtypes', [member_info_service_1.MemberInfoService])
    ], MemberInfoComponent);
    return MemberInfoComponent;
}());
exports.MemberInfoComponent = MemberInfoComponent;
//# sourceMappingURL=member-info.component.js.map