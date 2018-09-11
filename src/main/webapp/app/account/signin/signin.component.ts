import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { LoginService } from 'app/core/login/login.service';
import { StateStorageService } from 'app/core/auth/state-storage.service';

import { Principal } from 'app/core/auth/principal.service';

@Component({
    selector: 'jhi-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['signin.scss']
})
export class SigninComponent implements OnInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private principal: Principal
    ) {
        this.credentials = {};
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // // since login is succesful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                } else {
                    this.stateStorageService.storeUrl(null);
                    if (this.principal.hasAuthority('ROLE_ADMIN')) {
                        console.log('entróooooo admin');
                        this.router.navigate(['/business-app']);
                    } else if (this.principal.hasAuthority('ROLE_USER')) {
                        console.log('entróooooo user');
                        this.router.navigate(['/business-app/view']);
                    }
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    register() {
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }

    ngOnInit() {
        this.loginService.logout();
    }
}
