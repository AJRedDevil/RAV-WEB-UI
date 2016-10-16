import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { MainComponent } from './claims/main.component';
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

import { routing } from './app.routing'

import { AuthService } from './login/auth.service';
import { AuthGuard } from './login/auth-guard.service';

import { SafePipe } from './shared/shared.pipe';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
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
    ]
})
export class AppModule { }
