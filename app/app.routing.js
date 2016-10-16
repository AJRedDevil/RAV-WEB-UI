"use strict";
var router_1 = require('@angular/router');
var auth_guard_service_1 = require('./login/auth-guard.service');
var main_component_1 = require('./claims/main.component');
var login_component_1 = require('./login/login.component');
var appRoutes = [
    {
        path: '',
        redirectTo: '/Home',
        pathMatch: 'full'
    },
    {
        path: 'Login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'Home',
        component: main_component_1.MainComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map