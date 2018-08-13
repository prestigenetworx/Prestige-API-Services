import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { SigninComponent } from './account/signin/signin.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                ...LAYOUT_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#PrestigeAdminModule'
                },
                {
                    path: '',
                    redirectTo: '/signin',
                    pathMatch: 'full'
                },
                {
                    path: 'signin',
                    component: SigninComponent
                }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class PrestigeAppRoutingModule {}
