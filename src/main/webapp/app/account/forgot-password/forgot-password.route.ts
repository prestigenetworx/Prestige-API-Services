import { Route } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';

export const ForgotPasswordRoute: Route = {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
        authorities: [],
        pageTitle: 'register.title'
    }
};
