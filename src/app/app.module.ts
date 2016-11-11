import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import { NgSemanticModule } from 'ng-semantic';

import { AppComponent }   from './app.component';
import { MainComponent } from './home/main.component';
import { ChartComponent } from './chart/chart.component';
import { ClaimComponent } from './coding/claim.component';
import { ClaimsComponent } from './coding/claims.component';
import { CodingComponent } from './coding/coding.component';
import { ChartService } from './chart/chart.service';
import { DXCodesComponent } from './coding/dxcodes.component';
import { CPTCodesComponent } from './coding/cptcode.component';
import { MemberInfoComponent } from './coding/member-info.component';
import { CommentCannotReviewComponent } from './coding/comment-cannot-review.component';

import { LoginComponent } from './login/login.component'

import { routing } from './app.routes'

import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

import { SafePipe } from './shared/shared.pipe';


let toastOptions = <ToastOptions> {
    toastLife: 4000,
    dismiss: 'auto',
    animate: 'flyRight',
    positionClass: 'toast-bottom-right'
};


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        ToastModule.forRoot(toastOptions),
        NgSemanticModule
    ],
    declarations: [
        AppComponent,
        MainComponent,
        ChartComponent,
        ClaimComponent,
        ClaimsComponent,
        CodingComponent,
        CommentCannotReviewComponent,
        DXCodesComponent,
        CPTCodesComponent,
        MemberInfoComponent,
        LoginComponent,
        SafePipe
    ],
    providers: [
        AuthService,
        AuthGuard
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }

// import {NgModule} from '@angular/core'
// import {RouterModule} from "@angular/router";
// import {rootRouterConfig} from "./app.routes";
// import {AppComponent} from "./app.component";
// import {GithubService} from "./github/shared/github.service";
// import {FormsModule} from "@angular/forms";
// import {BrowserModule} from "@angular/platform-browser";
// import {HttpModule} from "@angular/http";
// import {AboutComponent} from './about/about.component';
// import {HomeComponent} from './home/home.component';
// import {RepoBrowserComponent} from './github/repo-browser/repo-browser.component';
// import {RepoListComponent} from './github/repo-list/repo-list.component';
// import {RepoDetailComponent} from './github/repo-detail/repo-detail.component';
// import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// @NgModule({
//   declarations: [AppComponent, AboutComponent, RepoBrowserComponent, RepoListComponent, RepoDetailComponent, HomeComponent],
//   imports     : [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(rootRouterConfig)],
//   providers   : [GithubService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
//   bootstrap   : [AppComponent]
// })
// export class AppModule {

// }
