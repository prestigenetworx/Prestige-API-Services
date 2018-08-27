import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { SigninComponent } from './account/signin/signin.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                { path: '', redirectTo: '/signin', pathMatch: 'full' },
                {
                    path: 'signin',
                    component: SigninComponent,
                    data: {
                        pageTitle: 'login.title'
                    }
                },
                { path: 'admin', loadChildren: './admin/admin.module#PrestigeAdminModule' }
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class PrestigeAppRoutingModule {}
