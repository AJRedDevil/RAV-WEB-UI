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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var main_component_1 = require('./claims/main.component');
var chart_component_1 = require('./chart/chart.component');
var claim_component_1 = require('./coding/claim.component');
var claims_component_1 = require('./coding/claims.component');
var coding_component_1 = require('./coding/coding.component');
var dxcodes_component_1 = require('./coding/dxcodes.component');
var cptcode_component_1 = require('./coding/cptcode.component');
var member_info_component_1 = require('./coding/member-info.component');
var comment_cannot_review_component_1 = require('./coding/comment-cannot-review.component');
var login_component_1 = require('./login/login.component');
var app_routing_1 = require('./app.routing');
var auth_service_1 = require('./login/auth.service');
var auth_guard_service_1 = require('./login/auth-guard.service');
var shared_pipe_1 = require('./shared/shared.pipe');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                main_component_1.MainComponent,
                chart_component_1.ChartComponent,
                claim_component_1.ClaimComponent,
                claims_component_1.ClaimsComponent,
                coding_component_1.CodingComponent,
                comment_cannot_review_component_1.CommentCannotReviewComponent,
                dxcodes_component_1.DXCodesComponent,
                cptcode_component_1.CPTCodesComponent,
                member_info_component_1.MemberInfoComponent,
                login_component_1.LoginComponent,
                shared_pipe_1.SafePipe
            ],
            providers: [
                auth_service_1.AuthService,
                auth_guard_service_1.AuthGuard
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map